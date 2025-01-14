import { DialogueSystem } from '@/entities/DialogueSystem';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IBattleRouteState, IBattleServiceResolveData } from './battle.service';
import { SaveData } from '@/entities/SaveData';
import * as _ from 'lodash-es';
import { ItemID } from '@/data/ItemID';
import { BioFlag } from '@/data/BioFlag';
import { BattleSkillResult, BattleSkills } from '@/data/battle';
import { RootAnimations } from '@/app/app.service';
import { TranslateModule } from '@ngx-translate/core';

const actionTimeMaxPerRound = 4;		// 連続攻撃回数最大上限

const actionString = ['', 'Game.Battle.Action.Attack', 'Game.Battle.Action.Special', 'Game.Battle.Action.CounterSpecial', 'Game.Battle.Action.Dodge']
enum BattleAction {
  None = 0,
  Attack = 1,
  SpecialAttack = 2,
  CounterSpecialAttack = 3,
  DodgeAttack = 4
}

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent extends DialogueSystem implements AfterViewInit, OnDestroy {

  ///#region UI資料設定
  battleBG: string = 'battle.jpg';

  ///#endregion 

  /** 對手ID, -開頭時為本地ID */
  battleID?: string;

  /** 敵方角色資料 */
  enemyData!: SaveData;

  /** 我方Buff */
  PlayerBuffFlags: { [buffName: string]: number } = {};

  /** 敵方Buff */
  EnemyBuffFlags: { [buffName: string]: number } = {};

  /** 入場時的玩家狀態，計算獎勵用 */
  startPlayerData?: SaveData;
  startEnemyData?: SaveData;

  enemyLastAction?: BattleAction;

  enemyAction!: BattleAction;

  playerLastAction?: BattleAction;

  playerAction!: BattleAction;

  damageToEnemy: number = 0;

  damageToPlayer: number = 0;

  /** 玩家行動冷卻 */
  playerCooldown: number = 99999;

  /** 敵方行動冷卻 */
  enemyCooldown: number = 99999;
  // playerCooldown_BK: number = 0;
  // enemyCooldown_BK: number = 0;

  /** 攻擊順序佇列 */
  actionQueue: number[] = []

  battleResult: '' | 'win' | 'lose' | 'giveup' = '';

  enterAnim?: boolean;
  onWin?: {
    href: string, state: any,
  }
  onLose?: { href: string, state: any }

  constructor(injector: Injector,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {
    super(injector)
  }

  override async ngAfterViewInit() {
    this.appServ.Anim(RootAnimations.FadeIn, 1000);
    super.ngAfterViewInit();
    const resolvedData = ((await firstValueFrom(this.activatedRoute.data)) as { data: IBattleServiceResolveData }).data

    // 敵人數值
    this.enemyData = resolvedData.battleData;

    // 設定背景
    this.battleBG = resolvedData.battleBG;

    // 設定音樂
    this.appServ.setBGM(resolvedData.battleMusic)

    // 我方入場時的狀態
    this.startPlayerData = _.clone(this.playerData);

    // 敵方入場時的狀態
    this.startEnemyData = _.clone(this.startEnemyData);

    // 戰鬥ID
    this.battleID = resolvedData.battleID;

    // 雙方初始化（例如MP)
    this.playerData.PS_BattleInit();
    this.enemyData.PS_BattleInit();

    // 勝利或失敗時的Callback
    const location = this.location.getState() as IBattleRouteState;
    this.onWin = location.onWin;
    this.onLose = location.onLose

    // 戰鬥中不使用通信機音效
    this.setDialogueSE('');

    // 戰鬥訊息固定速度
    this.SetDialogueInterval(20);
    
    // 開場的戰鬥訊息, 本地與里親對戰時的ID不同
    this.Content(this.battleID.startsWith('-') ?
      this.appServ.t('Game.Battle.StartMessage.1', { dragonName: this.enemyData.dragonName }) :
      this.appServ.t('Game.Battle.StartMessage.2', { yourName: this.enemyData.yourName, dragonName: this.enemyData.dragonName })
    );
    await this.appServ.Wait(2000);

    this.SetContentCompleted();
    this.ClearContent()

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.setDialogueSE();
    this.appServ.setRadialEffect();
  }

  async onActionClick(action: BattleAction) {
    console.log(action)

    // 防止快轉中誤操作
    if (this.skipWait) {
      return;
    }

    // 阻擋多次選擇動作
    if (this.playerAction || this.enemyAction || this.actionQueue.length > 0) {
      return;
    }

    this.enterAnim = true;

    // 我方行動決定
    this.playerAction = action;
    this.playerLastAction = this.playerAction;

    // 敵方行動決定
    do {
      this.enemyAction = Math.round((Math.random() * (BattleAction.DodgeAttack - 1)) + 1)
    } while (this.enemyAction == this.enemyLastAction)
    this.enemyLastAction = this.enemyAction;

    this.Content(this.translateServ.instant('Game.Battle.Player') + ':' + this.appServ.t(actionString[this.playerAction]))
    this.Content(this.translateServ.instant('Game.Battle.Opponent') + ':' + this.appServ.t(actionString[this.enemyAction]))
    await this.appServ.Wait(300);

    // 速度計算修正
    // 敵方速度
    const speed = Math.min(this.playerData.speed * actionTimeMaxPerRound, this.enemyData.speed);
    // 我方速度
    const Mspeed = Math.min(this.enemyData.speed * actionTimeMaxPerRound, this.playerData.speed);

    // 攻擊次序決定，直到雙方都攻擊過才結束本回合
    // 先制攻撃相手決定 (AtFlg=1:自分 2:相手 3:同着)
    do {
      // 若其中一方已達攻擊次數上限，直接加入另一方攻擊
      // 因為while迴圈可直接判斷是否兩邊都有攻擊過，因此當迴圈還有在執行時，一定有其中一方尚未攻擊過
      if (this.actionQueue.length >= actionTimeMaxPerRound) {
        this.actionQueue.push(this.actionQueue[0] === 1 ? 2 : 1);
        continue;
      }
      var AtFlg = 0;
      this.playerCooldown -= Mspeed;
      this.enemyCooldown -= speed;
      if (this.playerCooldown <= 0) { this.playerCooldown += 99999; AtFlg += 1; }
      if (this.enemyCooldown <= 0) { this.enemyCooldown += 99999; AtFlg += 2; }
      // 這邊的遊戲平衡有點可惜...會讓對方回合被吃掉
      // #平衡
      if (AtFlg == 3) {															// 同点の時は先行を決める
        if (speed >= (Mspeed * actionTimeMaxPerRound)) {
          AtFlg = 1;
        } else if (Mspeed >= (speed * actionTimeMaxPerRound)) {
          AtFlg = 2;
        } else {
          AtFlg = Math.round(Math.random() * 1) + 1;
        }
      }
      if (AtFlg) {
        this.actionQueue.push(AtFlg);
      }
    } while (!(this.actionQueue.includes(1) && this.actionQueue.includes(2)));

    console.log('[Battle] 攻擊次序', this.actionQueue);

    await firstValueFrom(this.dialogComplete$);
    // 觸發攻擊次序判斷事件
    this.FastForward();
  }

  async Phase_Player() {

    let result: BattleSkillResult;
    do {
      let skill = Math.round(Math.random() * 19);
      if (this.playerAction === 1) skill = 20;	// 通常攻撃
      if (this.playerAction === 4) skill = 98;	// 回避
      if (this.playerAction === 3) skill = 99;	// 防御

      const prePlayerHp = this.playerData.hp;
      const preEnemyHp = this.enemyData.hp;
      const battleSkill = BattleSkills[skill];
      result = battleSkill(this.playerData, this.enemyData, this.enemyAction, this.PlayerBuffFlags, this.EnemyBuffFlags, 1);
      if (result) {
        if (result.snd) {
          this.appServ.setSE(result.snd)
        }

        this.damageToPlayer = prePlayerHp - this.playerData.hp;
        this.damageToEnemy = preEnemyHp - this.enemyData.hp;

        let params: { [paramName: string]: string } = result.params || {};
        // 翻譯參數
        Object.entries(params).forEach(([key, value]) => {
          params[key] = this.appServ.t(value);
        })

        if (result.messages.length > 0) {
          result.messages.forEach(m => this.Content(m, {
            ...params,
            skillName: this.appServ.t(`Data.Skill.${skill}.Title`),
            victimName: this.enemyData.dragonName,
            attackerName: this.playerData.dragonName,
            damageToVictim: String(Math.abs(this.damageToEnemy)),
            damageToAttacker: String(Math.abs(this.damageToPlayer))
          }))
        }

      }
    } while (!result);

    // 敵方的Buff時間計算
    Object.entries(this.EnemyBuffFlags).forEach(([key, value]) => {
      if (this.EnemyBuffFlags[key] > 0) {
        this.EnemyBuffFlags[key]--;
      }
    })
    await firstValueFrom(this.dialogComplete$);
    this.FastForward()
  }

  async Phase_Enemy() {
    let result: BattleSkillResult;
    do {
      let skill = Math.round(Math.random() * 19);
      if (this.enemyAction === 1) skill = 20;	// 通常攻撃
      if (this.enemyAction === 4) skill = 98;	// 回避
      if (this.enemyAction === 3) skill = 99;	// 防御

      const prePlayerHp = this.playerData.hp;
      const preEnemyHp = this.enemyData.hp;
      const battleSkill = BattleSkills[skill];
      result = battleSkill(this.enemyData, this.playerData, this.playerAction, this.EnemyBuffFlags, this.PlayerBuffFlags, 0);
      if (result) {
        if (result.snd) {
          this.appServ.setSE(result.snd)
        }

        this.damageToPlayer = prePlayerHp - this.playerData.hp;
        this.damageToEnemy = preEnemyHp - this.enemyData.hp;
        let params: { [paramName: string]: string } = result.params || {};
        // 翻譯參數
        Object.entries(params).forEach(([key, value]) => {
          params[key] = this.appServ.t(value);
        })

        if (result.messages.length > 0) {
          result.messages.forEach(m => this.Content(m, {
            ...params,
            skillName: this.appServ.t(`Data.Skill.${skill}.Title`),
            victimName: this.playerData.dragonName,
            attackerName: this.enemyData.dragonName,
            damageToVictim: String(Math.abs(this.damageToPlayer)),
            damageToAttacker: String(Math.abs(this.damageToEnemy)),
          }))
        }

      }
    } while (!result)
    // 我方的Buff時間計算
    Object.entries(this.PlayerBuffFlags).forEach(([key, value]) => {
      if (this.PlayerBuffFlags[key] > 0) {
        this.PlayerBuffFlags[key]--;
      }
    })
    this.FastForward()
  }

  async Result_Win() {
    if (!this.enemyData || !this.battleID || !this.startPlayerData) {
      throw new Error('無敵人的狀態下獲勝！這不該發生。')
    }
    this.skipWait = false;
    this.battleResult = 'win';
    this.startPlayerData.turn--;

    ///#region 獎勵計算

    ///#endregion
    let sum = Math.round(
      ((this.enemyData.Maxhp + this.enemyData.at + this.enemyData.df + this.enemyData.speed) -
        (this.startPlayerData.Maxhp + this.startPlayerData.at + this.startPlayerData.df + this.startPlayerData.speed)) / 2);
    let sum2 = Math.round((this.playerData.Maxhp - this.playerData.hp) / 10) * 2;	// HPの残量の1割
    if (sum < 0) sum = 1;

    const GetExp = Math.max(0, Math.min(100, Math.round(sum + sum2 + (Math.random() * 3) / 10)));
    const GetFood = Math.max(0, Math.min(Math.round((sum + sum2) / 10 + (Math.random() * 5)), 200));

    this.startPlayerData.exp += GetExp;
    this.startPlayerData.food += GetFood;

    let msg = `${this.appServ.t('Game.Battle.WinMessage.1', { dragonName: this.enemyData.dragonName })}
${this.appServ.t('Game.Battle.WinMessage.2', { dragonName: this.playerData.dragonName, exp: GetExp, food: GetFood })}`;

    if (this.battleID.startsWith('-')) {
      //varMsgColor[3] = "#ffffff";
      // varMsgColor[4] = "#ffffff";
      await this.Content(msg);
    } else {
      this.startPlayerData.item[ItemID.万物の素]++;
      // varMsgColor[3] = "#ffffff";
      // varMsgColor[4] = "#ffffff";
      await this.Content(`${msg}
${this.appServ.t('Game.Battle.WinMessage.3', { itemName: this.appServ.t('Data.Item.17.Title') })}
      `);
    }

    if (this.startPlayerData.hp - this.playerData.hp > 4) {
      const varWinUp = Math.round(Math.random() * 2 + 1);
      // varMsgColor[5] = "#ffffff";
      this.startPlayerData.Maxhp += varWinUp;
      await this.Content(this.appServ.t('Game.Battle.WinBuff', { dragonName: this.playerData.dragonName, winUp: varWinUp }));
    }
    await this.Content(``);

    this.appServ.setBGM()
    this.appServ.setSE()
    this.startPlayerData.hp = this.startPlayerData.Maxhp;							// 勝利時は体力自動回復
    if (this.isFromDebugMenu) {

      this.appServ.saveData = _.clone(this.startPlayerData);
      this.router.navigate(['/game/debug_battle'], { replaceUrl: true })
      return;
    }
    // 將新的玩家資料往回帶
    this.appServ.saveData = _.clone(this.startPlayerData);
    this.appServ.saveData.Save();
    if (this.onWin) {
      // 通常用到這個就是Last boss打輸了......。
      this.router.navigate([this.onWin.href], { replaceUrl: true, state: this.onWin.state })
    } else {
      // 贏了預設帶回龍舍
      this.router.navigate(['/game/dragongame'], { replaceUrl: true })
    }
  }

  async Result_Lose() {

    if (!this.enemyData || !this.battleID || !this.startPlayerData) {
      throw new Error('無敵人的狀態下戰敗！這不該發生。')
    }

    //#region 有復活之玉時的判定
    if (this.startPlayerData.item[ItemID.復活の玉]) {
      this.startPlayerData.item[ItemID.復活の玉]--
      const restorePoint = Math.round(this.startPlayerData.Maxhp / 3);
      this.playerData.hp = restorePoint;
      await this.Content(`Game.Battle.PlayerRevive`, {
        dragonName: this.startPlayerData.dragonName,
        varItemName: this.appServ.t(`Data.Item.${ItemID.復活の玉}.Title`),
        restorePoint: String(restorePoint)
      })
      this.appServ.setSE('snd08')
      return;
    }
    //#endregion

    this.skipWait = false;
    // 回合數代價
    const sum = 3 + Math.round(Math.random() * 7);					// 負けた時の代償
    this.startPlayerData.turn = Math.max(0, this.startPlayerData.turn - sum);
    this.battleResult = 'lose';

    // 戰敗音樂設定
    if (this.battleID === '-last') {
      this.appServ.setBGM('music23')
    } else {
      this.appServ.setBGM('music09')
    }
    const params = {
      dragonName: this.playerData.dragonName,
      yourName: this.playerData.yourName,
      sum: String(sum)
    }

    //#region 戰敗時低機率出現恐怖症
    if (Math.round(Math.random() * 10) == 1) {
      await this.Content(`Game.Battle.LoseMessage.1`, params)
      this.startPlayerData.bio |= BioFlag.恐怖;
    } else {
      await this.Content(`Game.Battle.LoseMessage.2`, params)
    }
    //#endregion
    await this.Content(`
`);
    this.appServ.setBGM()
    this.appServ.setSE()
    if (this.isFromDebugMenu) {
      this.appServ.saveData = _.clone(this.startPlayerData);
      this.router.navigate(['/game/debug_battle'], { replaceUrl: true })
      return;
    }
    this.startPlayerData.hp = 1;
    this.appServ.saveData = _.clone(this.startPlayerData);
    if (this.onLose) {
      // 通常用到這個就是Last boss打輸了......。
      this.router.navigate([this.onLose.href], { replaceUrl: true, state: this.onLose.state })
    } else {
      this.router.navigate(['/game/dragongame'], { replaceUrl: true })
    }
  }

  async Result_Escape() {
    if (!this.enemyData || !this.battleID || !this.startPlayerData) {
      throw new Error('無敵人的狀態下逃跑！這不該發生。')
    }

    this.battleResult = 'giveup'
    const sum = 2 + Math.round(Math.random() * 3);	// 負けた時の代償
    await this.Content(`Game.Battle.GiveupMessage.1`, {
      dragonName: this.playerData.dragonName,
      enemyDragonName: this.enemyData.dragonName,
      yourName: this.playerData.yourName,
      sum: String(sum)
    })
    await this.Content(`
`);
    this.appServ.setBGM()
    this.appServ.setSE()
    // Debug目錄來的
    if (this.isFromDebugMenu) {
      this.router.navigate(['/game/debug_battle'], { replaceUrl: true })
      return;
    }
    this.startPlayerData.hp = this.appServ.saveData.hp;
    this.appServ.saveData = _.clone(this.startPlayerData);
    this.appServ.saveData.Save();

    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }

  async onEscapeClick() {
    if (this.battleResult) {
      return;
    }

    if (!(await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Game.Battle.GiveUp.Confirm'), true))) {
      return;
    }
    this.Result_Escape();
  }

  /** 最後BOSS時無法逃跑 */
  get IsAbleToEscape() {
    return !this.battleID?.includes('-last')
  }

  get isFromDebugMenu() {
    return (this.location.getState() as { debugMenu: boolean })?.debugMenu
  }

  get playerData() {
    return this.appServ.saveData;
  }

  NewSkillCheck() {
    if (!this.startPlayerData) {
      return;
    }
    // 若技能指標變動時，視為取得新技能
    const oldMagic = this.startPlayerData.magic;
    if (this.startPlayerData.exp > 800) {	// 戦闘Expが70以上であればエキスパートクラスの技を閃き
      if (Math.round(Math.random() * 200) == 10) {
        switch (Math.round(Math.random() * 2)) {
          case 0: this.startPlayerData.magic |= 65536; break;
          case 1: this.startPlayerData.magic |= 131072; break;
          case 2: this.startPlayerData.magic |= 262144; break;
        }
      }
    }
    if (this.startPlayerData.exp > 300) {	// 戦闘Expが50以上であれば上級クラスの技を閃き
      if (Math.round(Math.random() * 100) == 10) {
        switch (Math.round(Math.random() * 3)) {
          case 0: if (this.startPlayerData.element1 < 45) this.startPlayerData.magic |= 32; break;
          case 1: if (this.startPlayerData.element1 > 55) this.startPlayerData.magic |= 64; break;
          case 2: if (this.startPlayerData.element2 < 45) this.startPlayerData.magic |= 16; break;
          case 3: if (this.startPlayerData.element2 > 55) this.startPlayerData.magic |= 32768; break;
        }
      }
    }
    if (this.startPlayerData.exp > 25) {	// 戦闘Expが25以上であれば中級クラスの技を閃き
      if (Math.round(Math.random() * 40) == 5) {
        switch (Math.round(Math.random() * 3)) {
          case 0: if (this.startPlayerData.element1 < 45) this.startPlayerData.magic |= 1024; break;
          case 1: if (this.startPlayerData.element1 > 55) this.startPlayerData.magic |= 512; break;
          case 2: if (this.startPlayerData.element2 < 45) this.startPlayerData.magic |= 256; break;
          case 3: if (this.startPlayerData.element2 > 55) this.startPlayerData.magic |= 128; break;
        }
      }
    }
    if (this.startPlayerData.exp > 15) {	// 戦闘Expが15以上であれば初級クラスの技を閃き
      if (Math.round(Math.random() * 30) == 10) {
        switch (Math.round(Math.random() * 3)) {
          case 0: if (this.startPlayerData.element1 < 45) this.startPlayerData.magic |= 16384; break;
          case 1: if (this.startPlayerData.element1 > 55) this.startPlayerData.magic |= 8192; break;
          case 2: if (this.startPlayerData.element2 < 45) this.startPlayerData.magic |= 2048; break;
          case 3: if (this.startPlayerData.element2 > 55) this.startPlayerData.magic |= 4096; break;
        }
      }
    }

    if (this.startPlayerData.exp > 5) {	// 戦闘Expが5以上であれば入門クラスの技を閃き
      if (Math.round(Math.random() * 5) >= 1) {
        switch (Math.round(Math.random() * 3)) {
          case 0: if (this.startPlayerData.element1 < 45) this.startPlayerData.magic |= 8; break;
          case 1: if (this.startPlayerData.element1 > 55) this.startPlayerData.magic |= 4; break;
          case 2: if (this.startPlayerData.element2 < 45) this.startPlayerData.magic |= 1; break;
          case 3: if (this.startPlayerData.element2 > 55) this.startPlayerData.magic |= 2; break;
        }
      }
    }
    return this.startPlayerData.magic !== oldMagic;
  }
  /** 對話系統的覆蓋, 點擊對話框之後才會繼續戰鬥回合 */
  override async FastForward() {
    // 修正提早按對話框導致戰鬥直接開始的問題
    if (!this.enterAnim) {
      return;
    }
    super.FastForward();
    // 目前對話執行完後才執行下次的攻擊指令處理
    if (!this.IsContentComplete()) {
      return;
    }

    if (!this.enemyData || !this.battleID || !this.playerData) {
      throw new Error('無敵人或玩家資料！這不該發生。')
    }

    if (this.battleResult) {
      return;
    }
    this.damageToEnemy = 0;
    this.damageToPlayer = 0;
    // 將上次處理傷害歸0反映至畫面上
    this.changeDetectionRef.detectChanges();
    console.log('剩餘攻擊佇列', this.actionQueue);
    ///#region 處理攻擊佇列
    if (this.actionQueue.length > 0) {

      // 雙方本回合皆攻擊過後才會執行下一回合Command
      const attacker = this.actionQueue[0];
      if (attacker === 1) {
        // 戰值足夠下獲得新技能
        if (this.NewSkillCheck()) {
          this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Information'), this.appServ.t(`Game.Battle.NewSkill`))
        }
        this.Phase_Player()
      } else if (attacker === 2) {
        this.Phase_Enemy();
      }
      this.enemyData.hp = Math.max(0, Math.min(this.enemyData.Maxhp, this.enemyData.hp));
      this.playerData.hp = Math.max(0, Math.min(this.playerData.Maxhp, this.playerData.hp));
      this.enemyData.mp = Math.max(0, Math.min(this.enemyData.Maxmp, this.enemyData.mp));
      this.playerData.mp = Math.max(0, Math.min(this.playerData.Maxmp, this.playerData.mp));

      //#region PostEffect
      if (this.playerData.hp <= this.playerData.Maxhp * 0.2 && this.playerData.hp > 0) {
        // 瀕死警告
        this.appServ.setRadialEffect('#FF343477', true, 1000);
      }
      else {
        if (this.damageToPlayer > 0) {
          this.appServ.setRadialEffect('#E03434', false, 500);
        } else {
          this.appServ.setRadialEffect();
        }
      }
      //#endregion
      this.actionQueue.shift();
    } else {
      // 攻擊次序處理完畢
      this.playerAction = 0;
      this.enemyAction = 0;
      console.log('攻擊次序處理完畢')
      this.ClearContent();
      // this.changeDetectionRef.detectChanges();
    }
    ///#endregion

    ///#region 勝負判定
    if (this.enemyData.hp <= 0) {
      this.Result_Win();
      return;
    }
    if (this.playerData.hp <= 0) {
      this.Result_Lose();
      return;
    }
    ///#endregion
  }


  get playerBuffText() {
    let varP1 = "";
    if (this.EnemyBuffFlags['Flg06']) varP1 += "[封]";
    if (this.PlayerBuffFlags['Flg04']) varP1 += "[反]";
    if (this.PlayerBuffFlags['Flg03']) varP1 += "[水]";
    if (this.PlayerBuffFlags['Flg02']) varP1 += "[地]";
    if (this.PlayerBuffFlags['Flg01']) varP1 += "[風]";
    if (this.PlayerBuffFlags['Flg00']) varP1 += "[炎]";
    return varP1;

  }
  get enemyBuffText() {
    let varP2 = "";
    if (this.PlayerBuffFlags['Flg06']) varP2 += "[封]";
    if (this.EnemyBuffFlags['Flg04']) varP2 += "[反]";
    if (this.EnemyBuffFlags['Flg03']) varP2 += "[水]";
    if (this.EnemyBuffFlags['Flg02']) varP2 += "[地]";
    if (this.EnemyBuffFlags['Flg01']) varP2 += "[風]";
    if (this.EnemyBuffFlags['Flg00']) varP2 += "[炎]";
    return varP2;
  }

}
