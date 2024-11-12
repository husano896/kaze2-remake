import { SaveDataEditorComponent } from '@/components/save-data-editor/save-data-editor.component';
import { BioFlag } from '@/data/BioFlag';
import { EventFlag } from '@/data/EventFlag';
import { ItemID } from '@/data/ItemID';
import { DragonGameEvents } from '@/data/dragongame_events';
import { DialogueSystem } from '@/entities/DialogueSystem';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Injector, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dragongame',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, SaveDataEditorComponent],
  templateUrl: './dragongame.component.html',
  styleUrl: './dragongame.component.scss'
})

export class DragongameComponent extends DialogueSystem implements OnDestroy, AfterViewInit {

  public disableAllActions?: boolean;
  public petDaDragon!: boolean;

  constructor(injector: Injector,
    public router: Router) {
    super(injector);
  }

  override ngAfterViewInit(): void {

    // 環境音
    this.appServ.setAmbient('snd16');

    const ev = DragonGameEvents[this.saveData.numVisits];
    if (!ev) {
      DragonGameEvents[1].bind(this)(this);
      console.warn(`[Dragongame] 尚未對應進行度 = ${this.saveData.numVisits}之事件！`)
    }
    else {
      ev.bind(this)(this);
    }

    // 特別事件於主線後檢查
    const varSysMsg = [
      this.SpecialEventCheck(),
      this.BioEventCheck(),
      this.LoveCheck(),
      this.ElementItemCheck()
    ].join('\r\n').trim();

    // 計算完狀態後，設定龍CG圖
    this.appServ.saveData.PS_RyuCG();
    if (varSysMsg) {
      this.appServ.Confirm('', varSysMsg)
    }
    this.appServ.setLastLogin();
    super.ngAfterViewInit();

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
    return true;
  }

  GoToEarn() {
    if (!this.isAbleToLeave) {
      return;
    }
    if (this.saveData.turn <= 0) {
      this.appServ.Confirm(this.t('Scripts.Confirm.Title.Caution'), '尚未實作');
      return;
    }
    this.appServ.Confirm(this.t('Scripts.Confirm.Title.Caution'), '尚未實作');
  }

  GoToBattle() {
    if (!this.isAbleToLeave) {
      return;
    }
    if (this.saveData.turn <= 0) {
      this.appServ.Confirm(this.t('Scripts.Confirm.Title.Caution'), '尚未實作');
      return;
    }
    this.appServ.Confirm(this.t('Scripts.Confirm.Title.Caution'), '尚未實作');
  }

  GoToMap() {
    if (!this.isAbleToLeave) {
      return;
    }
    if (this.saveData.turn <= 0) {
      this.appServ.Confirm(this.t('Scripts.Confirm.Title.Caution'), '尚未實作');
      return;
    }
    this.appServ.Confirm(this.t('Scripts.Confirm.Title.Caution'), '尚未實作');
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
    if (!(this.saveData.ivent & 2048)) {
      if ((date == "1224") || (date == "1225")) {
        // 聖誕快樂
        varSysMsg.push(this.t('Scripts.Confirm.MerryChirstmas'),
          { ...this.saveData.talkingParam, varItemName: this.t('Data.Item.18.Title') });
        this.saveData.item[ItemID.生ケーキ] += 1;
        this.saveData.ivent = (this.saveData.ivent | EventFlag.期間限定);
      }

      if ((date == "11") || (date == "0101")) {
        // 新年快樂
        varSysMsg.push(this.t('Scripts.Confirm.HappyNewYear'));
        this.saveData.food += 80;
        this.saveData.ivent = (this.saveData.ivent | EventFlag.期間限定);
      }
    }
    return varSysMsg.join('\r\n');
  }
  // TODO: 狀態事件確認
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
    console.log('waitMinutes', this.appServ.waitTimeMinutes);
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
    if (this.appServ.saveData.ivent & 2) {
      this.appServ.saveData.ivent ^= 2;
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
    return this.appServ.isAudioON()
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
    // TODO: 存檔API
    await Promise.resolve()
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
    return this.saveData?.lv || 0;
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
    return this.saveData?.bioText || '';
  }

  get stElement() {
    return this.saveData?.elementText || '';
  }
  get stGender() {
    return ((this.saveData?.ivent || 0) & EventFlag.性別) ? 'メス' : 'オス';
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
    return this.saveData?.cgName || '/assets/imgs/dragon/nomal00.gif';
  }
  get money() {
    return this.saveData?.food || 0;
  }

  get turn() {
    return this.saveData?.turn || 0;
  }
  //#endregion

  //#region 設定
  get settingsOn() {
    return this.appServ.settingsOn
  }
  set settingsOn(v) {
    this.appServ.settingsOn = v;
  }
  //#endregion
}
