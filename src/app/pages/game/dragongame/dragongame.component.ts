import { SaveDataEditorComponent } from '@/components/save-data-editor/save-data-editor.component';
import { EventFlag } from '@/data/EventFlag';
import { DragonGameEvents } from '@/data/dragongame_events';
import { DialogueSystem } from '@/entities/DialogueSystem';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dragongame',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, SaveDataEditorComponent],
  templateUrl: './dragongame.component.html',
  styleUrl: './dragongame.component.scss'
})
export class DragongameComponent extends DialogueSystem implements  OnDestroy, AfterViewInit {

  public disableAllActions?: boolean;
  constructor(injector: Injector,
    public router: Router) {
    super(injector);
  }

  override ngAfterViewInit(): void {

    // TODO: 環境音跟音樂應綁在進行度
    this.appServ.setAmbient('snd16');

    // TODO: 特別事件檢查

    const varSysMsg = [
      this.SpecialEventCheck(),
      this.BioEventCheck(),
      this.LoveCheck(),
      this.ElementItemCheck()
    ].join('\r\n').trim();

    if (varSysMsg) {
      this.appServ.Confirm('', varSysMsg)
    }

    const ev = DragonGameEvents[this.saveData.numVisits];
    if (!ev) {
      DragonGameEvents[1].bind(this)(this);
      console.warn(`[Dragongame] 尚未對應進行度 = ${this.saveData.numVisits}之事件！`)
    }
    else {
      ev.bind(this)(this);
    }

    this.appServ.setLastLogin();
    super.ngAfterViewInit();
  }

  //#region 育成操作
  GoToEarn() {
    if (this.saveData.turn <= 0) {
      this.appServ.Confirm('注意', '尚未實作');
      return;
    }
    this.appServ.Confirm('注意', '尚未實作');
  }

  GoToBattle() {

    if (this.saveData.turn <= 0) {
      this.appServ.Confirm('注意', '尚未實作');
      return;
    }
    this.appServ.Confirm('注意', '尚未實作');
  }

  GoToMap() {

    if (this.saveData.turn <= 0) {
      this.appServ.Confirm('注意', '尚未實作');
      return;
    }
    this.appServ.Confirm('注意', '尚未實作');
  }
  //#endregion

  //#region 啟動時事件檢查
  // TODO: 特別事件檢查
  SpecialEventCheck() {
    var varSysMsg = '';
    // 月份範圍為0~11, 日範圍為1~31
    var date = `${new Date().getMonth() + 1}${new Date().getDate()}`
    // 期間イベントフラグのリセット
    if ((date == "1223") || (date == "1222") || (date == "1230") || (date == "1231")) {
      if (this.saveData.ivent & 2048) this.saveData.ivent ^= 2048;
    }

    // 期間限定イベント
    if (!(this.saveData.ivent & 2048)) {
      if ((date == "1224") || (date == "1225")) {
        varSysMsg += "メリークリスマス！<BR>そちらの世界の風習にちなみ、病竜保護協会から プレゼントとして " + this.translateServ.instant('Data.Item.18') + " を贈らせていただきます。<BR><BR>病竜保護協会一同<BR><BR>";
        this.saveData.item[18] += 1;
        this.saveData.ivent = (this.saveData.ivent | 2048);
      }

      if ((date == "11") || (date == "0101")) {
        varSysMsg += "明けましておめでとうございます。そちらの世界でも祝日のようですね。<BR>そちらの風習にちなみ、病竜保護協会から 80 シェルをお贈りいたします。<BR><BR>病竜保護協会一同<BR><BR>";
        this.saveData.food += 80;
        this.saveData.ivent = (this.saveData.ivent | 2048);
      }
    }
    return varSysMsg;
  }
  // TODO: 狀態事件確認
  BioEventCheck() {

    var varSysMsg = '';
    if ((this.saveData.bio & 8) && (this.appServ.waitTimeMinutes > 10)) { // 風邪の進行
      varSysMsg += "病状報告: 風邪の症状により\n生命力が低下しています。<BR>";
      this.saveData.hp -= 25; if (this.saveData.hp < 0) this.saveData.hp = 1;
    }

    if ((this.saveData.bio & 64) && (this.appServ.waitTimeMinutes > 30)) {// 麻酔の効果切れ
      if (this.saveData.bio & 8) {
        varSysMsg += "病状報告: 麻酔が切れました。<br>十分な休息により風邪が完治しました。<BR>";
        this.saveData.bio ^= 8;
      } else {
        varSysMsg += "状態報告: 麻酔が切れ、孤竜が目覚めました。<br>体力が回復しました。<BR>";
      }
      this.saveData.hp = this.saveData.Maxhp;
      this.saveData.bio ^= 64;
    }

    if ((this.appServ.waitTimeMinutes > 70) && (this.saveData.bio & 32)) {// 重症の症状
      varSysMsg += "病状報告： " + this.saveData.dragonName + " は、重症による影響でステータスが低下しています。<BR>";
      varSysMsg += `${this.translateServ.instant('Game.DragonGame.Maxhp')}:- 1　　　　${this.translateServ.instant('Game.DragonGame.At')}:- 1　　　　${this.translateServ.instant('Game.DragonGame.Df')}:- 1<BR>`;
      this.saveData.hp -= 10;
      this.saveData.Maxhp -= 1;
      this.saveData.at -= 1;
      this.saveData.df -= 1;
    }

    if ((this.saveData.bio & 1) && (this.saveData.hp > 2) && (this.saveData.hp >= (this.saveData.Maxhp / 8))) { // 衰弱の治癒
      varSysMsg += "病状報告： 体力が十分に回復したため、衰弱が完治しました。<BR>";
      this.saveData.bio ^= 1;
    }

    if (
      this.appServ.waitTimeMinutes > 70 &&
      this.saveData.bio &&
      (Math.round(Math.random() * 10) == 1) &&
      !(this.saveData.bio & 32) && !(this.saveData.bio & 128)) { // 重症発症
      varSysMsg += "病状報告： 現在かかっている病気が悪化し、「重症」に陥りました。<BR>";
      this.saveData.bio ^= 32;
    }
    return varSysMsg;
  }

  LoveCheck() {

    let varSysMsg = ''
    return varSysMsg;
  }
  /**
   * 元素上限生成變身時確認
   * @returns 
   */
  ElementItemCheck() {
    let varSysMsg = ''
    if ((this.saveData.element1 <= 0) && !this.saveData.item[2]) {
      this.saveData.item[2]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxFire',
        { ...this.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.2.Title') })
    }
    else if ((this.saveData.element1 >= 100) && !this.saveData.item[3]) {
      this.saveData.item[3]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxWater',
        { ...this.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.3.Title') })
    }

    if ((this.saveData.element2 <= 0) && !this.saveData.item[4]) {
      this.saveData.item[4]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxWind',
        { ...this.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.4.Title') })
    }
    else if ((this.saveData.element2 >= 100) && !this.saveData.item[5]) {
      this.saveData.item[5]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxEarth',
        { ...this.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.5.Title') })
    }
    return varSysMsg;
  }

  //#endregion

  //#region 系統操作
  isAudioON(): boolean {
    return this.appServ.isAudioON()
  }

  toggleAudio() {
    this.appServ.toggleAudio();
  }

  async Save() {
    this.appServ.loading = true;
    // TODO: 存檔API
    await Promise.resolve()
    this.router.navigate(['/game']);
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
