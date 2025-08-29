import { RootAnimations } from '@/app/app.service';
import { SaveDataEditorComponent } from '@/components/save-data-editor/save-data-editor.component';
import { BioFlag } from '@/data/BioFlag';
import { EventFlag } from '@/data/EventFlag';
import { ItemID } from '@/data/ItemID';
import { DragonGameEvents } from '@/data/dragongame_events';
import { DialogueSystem } from '@/entities/DialogueSystem';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import Encoding from 'encoding-japanese';

@Component({
  selector: 'app-dragongame',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, SaveDataEditorComponent, SeparateTextPipe],
  templateUrl: './dragongame.component.html',
  styleUrl: './dragongame.component.scss'
})

export class DragongameComponent extends DialogueSystem implements OnDestroy, OnInit, AfterViewInit {

  public disableAllActions?: boolean;
  public petDaDragon!: boolean;

  public openDialog?: string;

  public hacked?: boolean;
  constructor(injector: Injector,
    public router: Router,
    public http: HttpClient,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    //#region 數值的檢查修正
    const save = this.appServ.saveData;
    this.appServ.saveData.numVisits = Math.max(1, Math.min(save.numVisits, 100))
    if (save.hp <= 0) {
      // ごく稀に破傷風をもらう
      if (Math.round(Math.random() * 10) == 1) {
        save.bio |= BioFlag.破傷;
      }
      if (Math.round(Math.random() * 10) == 1) {
        save.bio |= BioFlag.育障;
      } else {
        save.bio |= BioFlag.衰弱;
      }
    }

    this.appServ.saveData.Maxhp = Math.min(9999, Math.max(save.Maxhp, 10))
    this.appServ.saveData.hp = Math.max(1, Math.min(save.hp, save.Maxhp))
    this.appServ.saveData.at = Math.min(9999, Math.max(save.at, 1))
    this.appServ.saveData.df = Math.min(9999, Math.max(save.df, 1))
    this.appServ.saveData.speed = Math.min(9999, Math.max(save.speed, 1))
    this.appServ.saveData.love = Math.min(1100, Math.max(save.love, 0))
    this.appServ.saveData.turn = Math.min(99999, Math.max(save.turn, 0))
    this.appServ.saveData.food = Math.min(99999, Math.max(save.food, 0))
    this.appServ.saveData.element1 = Math.max(-9999, Math.min(save.element1, 9999))
    this.appServ.saveData.element2 = Math.max(-9999, Math.min(save.element2, 9999))
    this.appServ.saveData.exp = Math.min(999999, Math.max(save.exp, 0))
    //#endregion 
    this.skipWait = true;
  }

  override ngAfterViewInit(): void {

    this.appServ.Anim(RootAnimations.FadeIn, 300);
    // 環境音
    this.appServ.setAmbient('snd16');

    const isFromBegin = (this.location.getState() as { fromBegin: boolean })?.fromBegin;
    if (this.appServ.waitTimeMinutes >= 60 && (!isFromBegin || this.saveData.ivent & EventFlag.回答事件)) {
      // 避免直接60分鐘未存檔
      this.appServ.setLastLogin();
    }

    const ev = DragonGameEvents[this.saveData.numVisits];
    // 入侵二周目時不進行原先事件
    if (!(this.saveData.ivent & EventFlag.ニステアイベント終了) || !(this.saveData.ivent & EventFlag.水晶ランタンイベント終了) ||
      (this.saveData.ivent & EventFlag.ハッキング二回目)) {
      if (!ev) {
        DragonGameEvents[1].bind(this)(this);
        // 曾經的進度鎖應該用不到了...。
        console.warn(`[Dragongame] 尚未對應進行度 = ${this.saveData.numVisits}之事件！`)
      }
      else {
        ev.bind(this)(this);
      }
    }
    // 特別事件於主線後檢查
    const varSysMsg = [
      this.SpecialEventCheck(),
      this.BioEventCheck(),
      this.LoveCheck(),
      this.ElementItemCheck()
    ].join('\r\n').trim();

    // 主線後觸發事件，如狀態文字，發作恢復
    DragonGameEvents['postEv'].bind(this)(this)

    // 計算完狀態後，設定龍CG圖
    this.appServ.saveData.PS_RyuCG();
    if (varSysMsg) {
      this.appServ.Confirm('', varSysMsg)
    }
    this.appServ.setLastLogin();
    this.appServ.saveData.Save();
    super.ngAfterViewInit();
    this.changeDetectionRef.detectChanges();

    //#region PostEffect
    // 根據背景音樂加濾鏡
    const bgm = this.appServ.getBGM()
    if (bgm.includes('music11')) {
      // 貓BGM
      this.appServ.setRadialEffect('#FFCA2877', true, 10000)
    }
    else if (bgm.includes('music20')) {
      // midnight
      this.appServ.setRadialEffect('#1A237EAA', true, 10000)
    }
    else if (bgm.includes('music23')) {
      // 最期
      this.appServ.setRadialEffect('#000000', true, 5000)
    }
    //#endregion
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.appServ.setRadialEffect();
    this.appServ.setNotice2();
    this.appServ.setNotice()
  }
  async petDragon() {
    if (this.petDaDragon) {
      return;
    }
    this.petDaDragon = true;
    await this.appServ.Wait(100);
    this.petDaDragon = false;
  }
  //#region 育成操作

  /** 是否可進行其他動作，通常為有劇情或選項發生時 */
  get isAbleToLeave() {
    if (this.options && this.options.length > 0) {
      return false;
    }
    if (this.disableAllActions) {
      return false;
    }
    return true;
  }

  GoToEarn() {
    if (!this.isAbleToLeave) {
      return;
    }
    if (this.saveData.turn <= 0) {
      this.appServ.Confirm(this.t('Scripts.Confirm.Title.Caution'), this.t('Scripts.Confirm.Action.NoTurn'));
      return;
    }
    this.openDialog = 'earn'
  }

  GoToBattle() {
    if (!this.isAbleToLeave) {
      return;
    }
    if ((this.saveData.numVisits == 96) || (this.saveData.numVisits >= 98)) {
      this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Fatal'))
      return;
    }
    if (this.saveData.bio & BioFlag.眠酔) {
      this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Battle.Bio64'))
      return;
    }
    if (this.saveData.bio & BioFlag.発作) {
      this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Battle.Bio128'))
      return;
    }
    if (this.saveData.bio & BioFlag.破傷) {
      this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Caution'), this.appServ.t('Scripts.Confirm.Action.Battle.Bio2'))
      return;
    }
    this.openDialog = 'battle'
  }

  GoToMap() {
    if (!this.isAbleToLeave) {
      return;
    }
    if ((this.saveData.numVisits == 96) || (this.saveData.numVisits >= 98)) {
      this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Fatal'))
      return;
    }
    if (this.saveData.bio & BioFlag.眠酔) {
      this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Warning'), this.appServ.t('Scripts.Confirm.Action.Map.Bio64'))
      return;
    }

    if (this.saveData.bio & BioFlag.破傷) {
      this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Caution'), this.appServ.t('Scripts.Confirm.Action.Map.Bio2'))
      return;
    }

    this.router.navigate(['/game/map'], { replaceUrl: true });
  }

  GoToChat() {

    if (!this.isAbleToLeave) {
      return;
    }
    this.router.navigate(['/chat'], { replaceUrl: true });
    /*
    Game-Can暫時掛了
    //window.location.href = `http://kaze2.game-can.com/Game2/Chat/chat.cgi?mode=regist&name=${this.saveData.yourName}&color=#0000ff&email=`;
    // return;
    // console.log(`http://kaze2.game-can.com/Game2/Chat/chat.cgi?mode=regist&name=${Encoding.urlEncode(this.saveData.yourName)}&color=#0000ff&email=`)
    const encodedName: string = Encoding.urlEncode(Encoding.convert(Encoding.stringToCode(this.saveData.yourName), {
      to: 'SJIS',
      from: 'UNICODE'
    }));
    const win = window.open(
      `http://kaze2.game-can.com/Game2/Chat/chat.cgi?mode=regist&name=${encodedName}`
      , '_blank')
    if (!win) {
      return;
    }
    win.addEventListener('onload', () => {
      console.log(this)
    })*/
  }
  //#endregion

  //#region 啟動時事件檢查
  // TODO: 特別事件檢查
  SpecialEventCheck(): string {
    var varSysMsg = [];
    // 月份範圍為0~11, 日範圍為1~31
    var date = `${new Date().getMonth() + 1}${new Date().getDate()}`
    // 期間イベントフラグのリセット
    if ((date == "1223") || (date == "1222") || (date == "1230") || (date == "1231")) {
      if (this.saveData.ivent & EventFlag.期間限定) this.saveData.ivent ^= EventFlag.期間限定;
    }

    // 期間限定イベント
    if (!(this.saveData.ivent & EventFlag.期間限定)) {
      if ((date == "1224") || (date == "1225")) {
        // 聖誕快樂
        varSysMsg.push(this.t('Scripts.Confirm.MerryChirstmas',
          { ...this.saveData.talkingParam, varItemName: this.t('Data.Item.18.Title') }));
        this.saveData.item[ItemID.生ケーキ] += 1;
        this.saveData.ivent |= EventFlag.期間限定;
      }

      if ((date == "11") || (date == "0101")) {
        // 新年快樂
        varSysMsg.push(this.t('Scripts.Confirm.HappyNewYear'));
        this.saveData.food += 80;
        this.saveData.ivent |= EventFlag.期間限定;
      }
    }
    return varSysMsg.join('\r\n');
  }
  // 狀態事件確認
  BioEventCheck(): string {

    if (this.appServ.waitTimeMinutes >= 60) {
      // 発作の発生
      if ([10, 52].includes(this.appServ.saveData.numVisits)) {
        this.appServ.saveData.bio |= BioFlag.発作;
      }

      if (this.saveData.bio & BioFlag.発作) {
        // 発作の自然治癒
        if ([13, 55].includes(this.appServ.saveData.numVisits)) {
          this.appServ.saveData.bio ^= BioFlag.発作;
        }
      }
    }
    var varSysMsg = [];
    if ((this.saveData.bio & BioFlag.風邪) && (this.appServ.waitTimeMinutes > 10)) { // 風邪の進行
      varSysMsg.push(this.t('Scripts.Confirm.Bio.Kaze'));
      this.saveData.hp -= 25;
    }

    if ((this.saveData.bio & BioFlag.眠酔) && (this.appServ.waitTimeMinutes > 30)) {// 麻酔の効果切れ
      if (this.saveData.bio & BioFlag.風邪) {
        varSysMsg.push(this.t('Scripts.Confirm.Bio.KazeSleep'));
        this.saveData.bio ^= BioFlag.風邪;
      } else {
        varSysMsg.push(this.t('Scripts.Confirm.Bio.Sleep'));
      }
      this.saveData.hp = this.saveData.Maxhp;
      this.saveData.bio ^= BioFlag.眠酔;
    }

    if ((this.appServ.waitTimeMinutes > 70) && (this.saveData.bio & BioFlag.重症)) {// 重症の症状
      varSysMsg.push(this.t('Scripts.Confirm.Bio.SeriousGoing', { ...this.talkingParam }));
      varSysMsg.push(`
${this.t('Game.DragonGame.Maxhp')}:- 1
${this.t('Game.DragonGame.At')}:- 1
${this.t('Game.DragonGame.Df')}:- 1`);
      // 文字沒有標不該扣
      // this.saveData.hp -= 10;
      this.saveData.Maxhp -= 1;
      this.saveData.at -= 1;
      this.saveData.df -= 1;
    }

    if ((this.saveData.bio & BioFlag.衰弱) && (this.saveData.hp > 2) && (this.saveData.hp >= (this.saveData.Maxhp / 8))) { // 衰弱の治癒
      varSysMsg.push(this.t('Scripts.Confirm.Bio.RecoverFromWeak'));
      this.saveData.bio ^= BioFlag.衰弱;
    }

    if (
      this.appServ.waitTimeMinutes > 70 &&
      this.saveData.bio &&
      (Math.round(Math.random() * 10) == 1) &&
      !(this.saveData.bio & BioFlag.重症) && !(this.saveData.bio & BioFlag.発作)) { // 重症発症
      varSysMsg.push(this.t('Scripts.Confirm.Bio.BecomeSerious'));
      this.saveData.bio ^= BioFlag.重症;
    }

    // 避免超過最大HP的情況
    this.saveData.hp = Math.max(1, Math.min(this.saveData.hp, this.saveData.Maxhp));
    return varSysMsg.join('\r\n');
  }

  LoveCheck(): string {
    let varSysMsg = []
    // 友好度の変動---------------------------------------------------------------------------------
    if (this.appServ.waitTimeMinutes <= 60) {
      this.appServ.saveData.love += 1;
    }
    // 期間離しによる友好度の減退
    if (this.appServ.saveData.ivent & EventFlag.孤龍寄養) {
      this.appServ.saveData.ivent ^= EventFlag.孤龍寄養;
      varSysMsg.push(this.t('Scripts.Confirm.BackFromDeposit'));
    } else {
      // 超過42小時未拜訪時的友好度低下
      let ans = 42 - Math.floor(this.appServ.waitTimeMinutes / 60);
      if (ans < -10) ans = -10;
      if (ans < 0) {
        this.appServ.saveData.love += ans;
        varSysMsg.push(this.t('Scripts.Confirm.LoveDownFromIdle', { love: Math.abs(ans) }));
      }
    }

    // 恐怖症的友好度在begin.html變更
    if ((this.appServ.saveData.bio & 16) && (this.appServ.waitTimeMinutes >= 30)) {
      varSysMsg.push(this.t('Scripts.Confirm.LoveDownFromAfraid'));
    }

    return varSysMsg.join('\r\n');
  }
  /**
   * 元素上限生成變身時確認
   * @returns 
   */
  ElementItemCheck(): string {
    let varSysMsg = []
    if ((this.saveData.element1 <= 0) && !this.saveData.item[ItemID.太陽の珠]) {
      this.saveData.item[ItemID.太陽の珠]++;
      varSysMsg.push(this.t('Scripts.Confirm.ElementMaxFire',
        { ...this.saveData.talkingParam, varItemName: this.t('Data.Item.2.Title') }));
    }
    else if ((this.saveData.element1 >= 100) && !this.saveData.item[ItemID.銀峰の雫]) {
      this.saveData.item[ItemID.銀峰の雫]++;
      varSysMsg.push(this.t('Scripts.Confirm.ElementMaxWater',
        { ...this.saveData.talkingParam, varItemName: this.t('Data.Item.3.Title') }));
    }

    if ((this.saveData.element2 <= 0) && !this.saveData.item[ItemID.風の翼]) {
      this.saveData.item[ItemID.風の翼]++;
      varSysMsg.push(this.t('Scripts.Confirm.ElementMaxWind',
        { ...this.saveData.talkingParam, varItemName: this.t('Data.Item.4.Title') }));
    }
    else if ((this.saveData.element2 >= 100) && !this.saveData.item[ItemID.大地の琥珀]) {
      this.saveData.item[ItemID.大地の琥珀]++;
      varSysMsg.push(this.t('Scripts.Confirm.ElementMaxEarth',
        { ...this.saveData.talkingParam, varItemName: this.t('Data.Item.5.Title') }));
    }
    return varSysMsg.join('\r\n');
  }

  //#endregion

  t = (key: string, obj?: {}) => {
    return this.translateServ.instant(key, obj)
  }

  //#region 系統操作
  isAudioON(): boolean {
    return this.appServ.AudioON;
  }

  toggleAudio() {
    this.appServ.toggleAudio();
  }

  Library() {
    this.appServ.loading = true;
    this.router.navigate(['/game/library'], { replaceUrl: true });
  }

  async Save() {
    this.appServ.loading = true;
    // 存檔API
    if (this.saveData.registered) {
      try {
        await firstValueFrom(
          this.http.put('/save', {
            saveData: this.saveData.ToOnlineSave(),
            btlid: this.saveData.btlid,
            guid: this.saveData.guid
          })
        )
      } catch (err) {
        this.appServ.Confirm(
          this.appServ.t('Scripts.Confirm.Title.Warning'),
          "將進度保存至量子網時發生問題！"
        )
        this.appServ.saveFailed = true;
      }
    }
    this.router.navigate(['/game'], { replaceUrl: true });
  }
  //#endregion

  /** 你會希望遊戲中不要觸發到這個... */
  DisableAllActions = (v: boolean = true) => {
    this.disableAllActions = v;
  }

  get saveData() {
    return this.appServ.saveData;
  }

  //#region 需計算之數值
  get loveBuff() {
    return Math.round((this.saveData?.love || 0) / 100) + 1;
  }

  /** 親密度文字 */
  get loveText() {
    return `Data.Love.${Math.round((this.saveData?.love || 0) / 100)}`;
  }

  get hyoukaBuff() {
    // 進行度99時要求LV = 12, 100時的要求LV = 13, 但...
    return Math.floor(this.numVisits / 10) + 3;
  }
  //#endregion

  //#region 龍能力值

  get stLv() {
    return this.saveData?.nowLv || 1;
  }

  get stNextLv() {
    return this.saveData?.nextLv || 1;
  }
  get stHp() {
    return this.saveData?.hp || 0;
  }
  get stMaxhp() {
    return this.saveData?.Maxhp || 0;
  }

  get stAt() {
    return this.saveData?.at || 0;
  }

  get stDf() {
    return this.saveData?.df || 0;
  }
  get stSpeed() {
    return this.saveData?.speed || 0;
  }

  get stExp() {
    return this.saveData?.exp || 0;
  }

  get stBio() {
    return this.saveData?.bio;
  }

  // 是否於恐怖症
  get isInAfraidBio() {
    return this.saveData?.bio & BioFlag.恐怖;
  }

  get stBioText() {
    return (this.saveData?.bioText || []).map(bio => this.t(bio)).join(',');
  }

  get stElement() {
    return this.saveData?.elementText || '';
  }
  get stGender() {
    return this.t(
      ((this.saveData?.ivent || 0) & EventFlag.性別) ? 'Game.DragonGame.Female' : 'Game.DragonGame.Male'
    );
  }

  get stMagic() {
    return this.saveData?.magic;
  }
  //#endregion

  //#region 其他數值

  get numVisits() {
    return this.saveData?.numVisits || 0;
  }
  get dragonName() {
    return this.saveData?.dragonName || '孤竜';
  }

  get cgName() {
    return this.saveData?.cgName || 'nomal00';
  }
  get money() {
    return this.saveData?.food || 0;
  }

  get turn() {
    return this.saveData?.turn || 0;
  }
  //#endregion

  //#region 加強畫面顯示
  get readyToEat() {
    return !this.saveData.eatFailMessage
  }
  //#region 設定
  get settingsOn() {
    return this.appServ.settingsOn
  }
  set settingsOn(v) {
    this.appServ.settingsOn = v;
  }

  get debug() {
    return this.appServ.debug;
  }

  get newGamePlusTimes() {
    return this.appServ.saveData?.newGamePlusTimes;
  }

  get lang() {
    return this.translateServ.currentLang;
  }

  get isJapaneseLang() {
    return this.lang.includes('ja');
  }
  //#endregion
}
