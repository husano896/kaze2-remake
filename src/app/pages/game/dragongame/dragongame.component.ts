import { AppService } from '@/app/app.service';
import { SaveDataEditorComponent } from '@/components/save-data-editor/save-data-editor.component';
import { EventFlag } from '@/data/EventFlag';
import { DragonGameEvents } from '@/data/dragongame_events';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-dragongame',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, SaveDataEditorComponent],
  templateUrl: './dragongame.component.html',
  styleUrl: './dragongame.component.scss'
})
export class DragongameComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('dialog') dialog!: ElementRef<HTMLDivElement>;
  @ViewChild('face') face!: ElementRef<HTMLImageElement>;
  content: string = '';

  public dialogStart$: Subject<any> = new Subject<any>();
  public dialogComplete$: Subject<any> = new Subject<any>();
  pendingTexts: string[] = [];
  textInterval?: any;

  constructor(
    public appServ: AppService,
    private router: Router,
    private translateServ: TranslateService) {

  }
  ngOnDestroy(): void {
    clearInterval(this.textInterval);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

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
    
    const ev = DragonGameEvents[this.appServ.saveData.numVisits];
    if (!ev) {
      DragonGameEvents[1].bind(this)(this);
      console.warn(`[Dragongame] 尚未對應進行度 = ${this.appServ.saveData.numVisits}之事件！`)
    }
    else {
      ev.bind(this)(this);
    }
    this.SetInterval();

    this.appServ.setLastLogin();
  }

  //#region 育成操作
  GoToEarn() {
    this.appServ.Confirm('注意', '尚未實作');
  }

  GoToBattle() {
    this.appServ.Confirm('注意', '尚未實作');
  }

  GoToMap() {
    this.appServ.Confirm('注意', '尚未實作');
  }
  //#endregion

  //#region 對話系統
  SetInterval(interval: number = 100) {
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
    this.textInterval = setInterval(() => {
      if (this.pendingTexts.length > 0) {
        if (this.pendingTexts[0] === '\n') {
          this.appServ.setMessageSE();
          return;
        }

        this.appServ.setMessageSE(true);
        this.dialog.nativeElement.innerText += this.pendingTexts.shift();
        this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
      } else {
        this.appServ.setMessageSE();
        this.dialogComplete$.next(0);
      }
    }, interval);
  }



  Face = (c: string) => {
    this.face.nativeElement.src = `/assets/imgs/${c}.gif`;
  }

  ClearContent = () => {
    this.dialog.nativeElement.innerText = '';
  }

  /** 文章 */
  Content = (c: string) => {
    const r = (
      this.translateServ.instant(c, this.appServ.saveData.talkingParam)
    );
    this.pendingTexts.push(...r);
    return firstValueFrom(this.dialogComplete$);
  }

  FastForward = () => {
    this.dialogStart$.next(0);
    if (this.pendingTexts.length == 0) {
      this.dialogComplete$.next(0);
      return;
    }
    let nextReturnPos = this.pendingTexts.findIndex(t => t === '\n');
    // -1時表示整句已經沒有下個換行符號，因此把剩下的文字都顯示
    if (nextReturnPos === -1) {
      nextReturnPos = this.pendingTexts.length
    }
    // 若nextReturnPos == 0時, 表示接下來的字就是換行符號，因此顯示換行符號後即會繼續顯示
    this.dialog.nativeElement.innerText += this.pendingTexts.splice(0, nextReturnPos || 1).join('');
    this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
  }

  isWaiting() {
    return this.pendingTexts.length === 0 || this.pendingTexts[0] === '\n';
  }
  IsContentComplete = () => {
    return this.pendingTexts.length === 0
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
      if (this.appServ.saveData.ivent & 2048) this.appServ.saveData.ivent ^= 2048;
    }

    // 期間限定イベント
    if (!(this.appServ.saveData.ivent & 2048)) {
      if ((date == "1224") || (date == "1225")) {
        varSysMsg += "メリークリスマス！<BR>そちらの世界の風習にちなみ、病竜保護協会から プレゼントとして " + this.translateServ.instant('Data.Item.18') + " を贈らせていただきます。<BR><BR>病竜保護協会一同<BR><BR>";
        this.appServ.saveData.item[18] += 1;
        this.appServ.saveData.ivent = (this.appServ.saveData.ivent | 2048);
      }

      if ((date == "11") || (date == "0101")) {
        varSysMsg += "明けましておめでとうございます。そちらの世界でも祝日のようですね。<BR>そちらの風習にちなみ、病竜保護協会から 80 シェルをお贈りいたします。<BR><BR>病竜保護協会一同<BR><BR>";
        this.appServ.saveData.food += 80;
        this.appServ.saveData.ivent = (this.appServ.saveData.ivent | 2048);
      }
    }
    return varSysMsg;
  }
  // TODO: 狀態事件確認
  BioEventCheck() {

    var varSysMsg = '';
    if ((this.appServ.saveData.bio & 8) && (this.appServ.waitTimeMinutes > 10)) { // 風邪の進行
      varSysMsg += "病状報告: 風邪の症状により\n生命力が低下しています。<BR>";
      this.appServ.saveData.hp -= 25; if (this.appServ.saveData.hp < 0) this.appServ.saveData.hp = 1;
    }

    if ((this.appServ.saveData.bio & 64) && (this.appServ.waitTimeMinutes > 30)) {// 麻酔の効果切れ
      if (this.appServ.saveData.bio & 8) {
        varSysMsg += "病状報告: 麻酔が切れました。<br>十分な休息により風邪が完治しました。<BR>";
        this.appServ.saveData.bio ^= 8;
      } else {
        varSysMsg += "状態報告: 麻酔が切れ、孤竜が目覚めました。<br>体力が回復しました。<BR>";
      }
      this.appServ.saveData.hp = this.appServ.saveData.Maxhp;
      this.appServ.saveData.bio ^= 64;
    }



    if ((this.appServ.waitTimeMinutes > 70) && (this.appServ.saveData.bio & 32)) {// 重症の症状
      varSysMsg += "病状報告： " + this.appServ.saveData.dragonName + " は、重症による影響でステータスが低下しています。<BR>";
      varSysMsg += `${this.appServ.t('Game.DragonGame.Maxhp')}:- 1　　　　${this.appServ.t('Game.DragonGame.At')}:- 1　　　　${this.appServ.t('Game.DragonGame.Df')}:- 1<BR>`;
      this.appServ.saveData.hp -= 10;
      this.appServ.saveData.Maxhp -= 1;
      this.appServ.saveData.at -= 1;
      this.appServ.saveData.df -= 1;
    }

    if ((this.appServ.saveData.bio & 1) && (this.appServ.saveData.hp > 2) && (this.appServ.saveData.hp >= (this.appServ.saveData.Maxhp / 8))) { // 衰弱の治癒
      varSysMsg += "病状報告： 体力が十分に回復したため、衰弱が完治しました。<BR>";
      this.appServ.saveData.bio ^= 1;
    }

    if (
      this.appServ.waitTimeMinutes > 70 &&
      this.appServ.saveData.bio &&
      (Math.round(Math.random() * 10) == 1) &&
      !(this.appServ.saveData.bio & 32) && !(this.appServ.saveData.bio & 128)) { // 重症発症
      varSysMsg += "病状報告： 現在かかっている病気が悪化し、「重症」に陥りました。<BR>";
      this.appServ.saveData.bio ^= 32;
    }
    return varSysMsg;
  }

  LoveCheck() {

    var varSysMsg = ''

    return varSysMsg;
  }
  /**
   * 元素上限生成變身時確認
   * @returns 
   */
  ElementItemCheck() {
    var varSysMsg = ''
    if ((this.appServ.saveData.element1 <= 0) && !this.appServ.saveData.item[2]) {
      this.appServ.saveData.item[2]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxFire',
        { ...this.appServ.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.2.Title') })
    }
    else if ((this.appServ.saveData.element1 >= 100) && !this.appServ.saveData.item[3]) {
      this.appServ.saveData.item[3]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxWater',
        { ...this.appServ.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.3.Title') })
    }

    if ((this.appServ.saveData.element2 <= 0) && !this.appServ.saveData.item[4]) {
      this.appServ.saveData.item[4]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxWind',
        { ...this.appServ.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.4.Title') })
    }
    else if ((this.appServ.saveData.element2 >= 100) && !this.appServ.saveData.item[5]) {
      this.appServ.saveData.item[5]++;
      varSysMsg += this.translateServ.instant('Scripts.Confirm.ElementMaxEarth',
        { ...this.appServ.saveData.talkingParam, varItemName: this.translateServ.instant('Data.Item.5.Title') })
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
    this.router.navigate(['..']);
  }
  //#endregion

  get talkingParam() {
    return this.appServ.saveData.talkingParam;
  }
  //#region 需計算之數值
  get loveBuff() {
    return Math.round((this.appServ.saveData?.love || 0) / 100) + 1;
  }

  get loveText() {
    return `Data.Love.${Math.round((this.appServ.saveData?.love || 0) / 100)}`;
  }
  get hyoukaBuff() {
    // 進行度99時要求LV = 12, 100時的要求LV = 13, 但...
    return Math.floor(this.numVisits / 10) + 3;
  }
  //#endregion

  //#region 龍能力值

  get stLv() {
    return this.appServ.saveData?.lv || 0;
  }
  get stHp() {
    return this.appServ.saveData?.hp || 0;
  }
  get stMaxhp() {
    return this.appServ.saveData?.Maxhp || 0;
  }

  get stAt() {
    return this.appServ.saveData?.at || 0;
  }

  get stDf() {
    return this.appServ.saveData?.df || 0;
  }
  get stSpeed() {
    return this.appServ.saveData?.speed || 0;
  }

  get stExp() {
    return this.appServ.saveData?.exp || 0;
  }
  get stBio() {
    return this.appServ.saveData?.bioText || '';
  }

  get stElement() {
    return this.appServ.saveData?.elementText || '';
  }
  get stGender() {
    return ((this.appServ.saveData?.ivent || 0) & EventFlag.性別) ? 'メス' : 'オス';
  }
  //#endregion

  //#region 其他數值

  get numVisits() {
    return this.appServ.saveData?.numVisits || 0;
  }
  get dragonName() {
    return this.appServ.saveData?.dragonName || '孤竜';
  }

  get cgName() {
    return this.appServ.saveData?.cgName || '/assets/imgs/dragon/nomal00.gif';
  }
  get money() {
    return this.appServ.saveData?.food || 0;
  }

  get turn() {
    return this.appServ.saveData?.turn || 0;
  }
  //#endregion
}
