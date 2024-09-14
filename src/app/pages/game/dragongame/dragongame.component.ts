import { AppService } from '@/app/app.service';
import { SaveDataEditorComponent } from '@/components/save-data-editor/save-data-editor.component';
import { EventFlag } from '@/data/EventFlag';
import { DragonGameEvents } from '@/data/dragongame_events';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-dragongame',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, SaveDataEditorComponent],
  templateUrl: './dragongame.component.html',
  styleUrl: './dragongame.component.scss'
})
export class DragongameComponent implements OnInit, AfterViewInit {
  content: string = '';

  headerImg: string = '/assets/imgs/char00.gif';
  constructor(private appServ: AppService) {

  }
  ngOnInit(): void {
    this.content = `Scripts.DragonGameEvents.Opening.3`;
    this.appServ.setLastLogin();
  }

  ngAfterViewInit(): void {

    this.appServ.setAmbient('snd16');
    this.appServ.setBGM('music21')
    const ev = DragonGameEvents[this.appServ.saveData.numVisits];
    if (!ev) {
      console.warn(`[Dragongame] 尚未對應進行度 = ${this.appServ.saveData.numVisits}之事件！`)
      return;
    }

    ev.bind(this)(this);
  }

  isAudioON(): boolean {
    if (!this.appServ.bgmEl) {
      return false;
    }
    return !this.appServ.bgmEl.nativeElement.muted;
  }

  toggleAudio() {
    if (!this.appServ.bgmEl || !this.appServ.seEl || !this.appServ.ambientEl || !this.appServ.messageSEEl) {
      return;
    }
    this.appServ.bgmEl.nativeElement.muted = this.isAudioON();
    this.appServ.ambientEl.nativeElement.muted = this.isAudioON();
    this.appServ.seEl.nativeElement.muted = this.isAudioON();
    this.appServ.messageSEEl.nativeElement.muted = this.isAudioON();
  }

  get contentFills() {
    return this.appServ.saveData;
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
