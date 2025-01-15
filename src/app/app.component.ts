import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { Howler } from 'howler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //#region 創龍曆
  /** 創龍曆年數字 */
  year: number = 0;
  /** 創龍曆月份名 */
  monthImageName: string = '';
  /** 創龍曆日：記住這邊與現實日不一樣！ */
  day: number = 0;

  //#endregion
  private readonly subscriptions: Array<Subscription> = []

  constructor(private readonly appServ: AppService, readonly router: Router, private readonly translateServ: TranslateService) {

    // 路由事件訂閱
    this.subscriptions.push(router.events.subscribe(e => {

      if (e instanceof NavigationStart) {
        this.loading = true;

        if (this.theme) {
          document.body.setAttribute('theme', this.theme);
        }
      }

      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        // Android 防誤觸返回？（加了之後會變成按一次原地，第二次才會關閉）
        // Note: 想在返回後直接再加一個state變成無限防止Back，似乎瀏覽器會防止這件事
        history.pushState(history.state, '')
        this.loading = false;

        this.calculateDate();
        Howler.mute(!this.isAudioON);

        // 再找找看有沒有比較好的地方計算CG
        this.appServ.saveData.PS_RyuCG();
        this.appServ.saveData.Save();

        // 避免遊戲中直接打叉離開
        window.onbeforeunload = (ev) => {
          if (window.location.href.includes('/game/') && !window.location.href.includes('delete') && !window.location.href.includes('gameover')) {
            ev.preventDefault();
            return '是否離開？'
          }
          return 0;
        }
      }
    }));

    // 預設語言設定
    this.translateServ.setDefaultLang('ja');
    const localStorageLang = localStorage.getItem(LocalStorageKey.language);
    if (localStorageLang) {
      this.translateServ.use(localStorageLang).subscribe({
        error: (err) => {
          console.warn(`[TranslateServ] 讀取語言 ${localStorageLang} 失敗！回退至預設語言`, err);
          this.translateServ.use(this.translateServ.defaultLang);
          localStorage.setItem(LocalStorageKey.language, this.translateServ.defaultLang);
        }
      });
    }
    else {
      const navigatorLang = navigator.language;
      if (navigatorLang.includes('zh')) {
        this.translateServ.use('zh-hant')
      } else if (navigatorLang.includes('en')) {
        this.translateServ.use('en')
      } else {
        this.translateServ.use('ja');
      }

      localStorage.setItem(LocalStorageKey.language, this.translateServ.currentLang);
    }
    this.translateServ.onTranslationChange.subscribe((event) => {
      localStorage.setItem(LocalStorageKey.language, event.lang);
    })

    // 修正部分裝置點兩下會放大的問題
    document.body.addEventListener('dblclick', (ev) => ev.preventDefault())
    // 設定完後儲存到LocalStorage供下次進入網站使用
    // Anti debugger
    /*
    setInterval(() => {
      const currentTime = new Date().getTime()
      eval('(function(){debugger;})()');
      const nextTime = new Date().getTime()
      if (nextTime - currentTime > 200) {
        location.href = 'about:blank';
      }
    }, 1000)
    */

  }

  calculateDate() {

    const expire = new Date()
    // 誰知道兩千年後還會不會有人玩這遊戲呢 :P
    this.year = (expire.getFullYear() - 1900 + 966) % 2000;

    // XX龍月 與
    const ans1 = expire.getMonth() + 1;
    const ans = expire.getDate();
    const ans2 = ans1 * 100 + ans;
    let ans3 = 0;
    if ((ans2 >= 116) && (ans2 <= 229)) {
      this.monthImageName = 'font04';
      if (ans1 == 1) ans3 = ans - 15;
      if (ans1 == 2) ans3 = 15 + ans;
    }
    if ((ans2 >= 301) && (ans2 <= 415)) {
      this.monthImageName = 'font05';
      if (ans1 == 3) ans3 = ans;
      if (ans1 == 4) ans3 = 31 + ans;
    }
    if ((ans2 >= 416) && (ans2 <= 531)) {
      this.monthImageName = 'font06';
      if (ans1 == 4) ans3 = ans - 15;
      if (ans1 == 5) ans3 = 15 + ans;
    }
    if ((ans2 >= 601) && (ans2 <= 715)) {
      this.monthImageName = 'font07';
      if (ans1 == 6) ans3 = ans;
      if (ans1 == 7) ans3 = 30 + ans;
    }
    if ((ans2 >= 716) && (ans2 <= 831)) {
      this.monthImageName = 'font08';
      if (ans1 == 7) ans3 = ans - 15;
      if (ans1 == 8) ans3 = 15 + ans;
    }
    if ((ans2 >= 901) && (ans2 <= 1015)) {
      this.monthImageName = 'font09';
      if (ans1 == 9) ans3 = ans;
      if (ans1 == 10) ans3 = 30 + ans;
    }
    if ((ans2 >= 1016) && (ans2 <= 1130)) {
      this.monthImageName = 'font09';
      if (ans1 == 10) ans3 = ans - 15;
      if (ans1 == 11) ans3 = 15 + ans;
    }
    if ((ans2 >= 1201) || (ans2 <= 115)) {
      this.monthImageName = 'font10';
      if (ans1 == 12) ans3 = ans;
      if (ans1 == 1) ans3 = 31 + ans;
    }
    this.day = ans3;
  }

  ForceUpdate() {
    if (window.confirm('Force update?')) {
      this.appServ.loading = true;
      this.appServ.ForceUpdate();
    }
  }

  toggleAudio() {
    this.appServ.toggleAudio();
  }


  get isAudioON(): boolean {
    return this.appServ.AudioON;
  }

  set loading(v: boolean) {
    this.appServ.loading = v;
  }
  get loading() {
    return this.appServ.loading;
  }

  //#region Ray7
  get noticeTitle() {
    return this.appServ.noticeTitle;
  }

  get noticeContent() {
    return this.appServ.noticeContent;
  }

  //#endregion

  //#region Ray72
  get noticeTitle2() {
    return this.appServ.noticeTitle2;
  }

  get noticeContent2() {
    return this.appServ.noticeContent2;
  }

  //#endregion


  get Ray1Open() {
    return this.appServ.Ray1Open;
  }

  set error(v: any) {
    this.appServ.error = v;
  }
  get error() {
    return this.appServ.error;
  }

  get confirmStyle() {
    return this.appServ.confirmStyle;
  }

  get confirmTitle() {
    return this.appServ.confirmTitle;
  }

  set confirmContent(v) {
    this.appServ.confirmContent = v;
  }
  get confirmContent() {
    return this.appServ.confirmContent;
  }

  ConfirmResult(result?: number) {
    return this.appServ.ConfirmResult(result);
  }

  get settingsOn() {
    return this.appServ.settingsOn;
  }

  set settingsOn(v) {
    this.appServ.settingsOn = v;
  }

  get textSpeed() {
    return this.appServ.textSpeed;
  }

  set textSpeed(v: number) {
    this.appServ.textSpeed = v;
  }

  get isProgressLoveChk() {
    return this.appServ.isProgressLoveChk;
  }

  // 防止右鍵
  @HostListener('document:contextmenu', ['$event'])
  onContextMenu($event: Event) {
    if (this.appServ.debug) {
      return;
    }
    $event.preventDefault();
  }

  get theme() {
    return this.appServ.theme;
  }

  set theme(v: string) {
    this.appServ.theme = v;
  }

  /** 全景效果設定 */
  get RadialColor() {
    return this.appServ.RadialColor;
  }

  get RadialRepeat() {
    return this.appServ.RadialRepeat;
  }
  get RadialInterval() {
    return this.appServ.RadialInterval;
  }
  set RadialColor(v) {
    this.appServ.RadialColor = v;
  }
  set RadialRepeat(v) {
    this.appServ.RadialRepeat = v;
  }
  set RadialInterval(v) {
    this.appServ.RadialInterval = v;
  }
}
