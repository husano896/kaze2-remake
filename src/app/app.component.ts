import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKey } from '@/entities/LocalStorageKey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('bgm') bgm!: ElementRef<HTMLAudioElement>;
  @ViewChild('se') se!: ElementRef<HTMLAudioElement>;
  @ViewChild('messageSE') messageSE!: ElementRef<HTMLAudioElement>;
  @ViewChild('ambient') ambient!: ElementRef<HTMLAudioElement>;

  /** 創龍曆年數字 */
  year: number = 0;
  /** 創龍曆月份名 */
  monthImageName: string = '';

  /** 創龍歷日：記住這邊與現實日不一樣！ */
  day: number = 0;
  subscriptions: Array<Subscription> = [

  ]
  constructor(private appServ: AppService, private router: Router, private translateServ: TranslateService) {

    // 路由事件訂閱
    this.subscriptions.push(router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.loading = true;
      }

      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.loading = false;

        this.calculateDate();
        // 再找找看有沒有比較好的地方計算CG
        this.appServ.saveData.PS_RyuCG();
        this.appServ.Save();
        this.messageSE?.nativeElement?.pause();
      }
    }));

    // 預設語言設定
    this.translateServ.setDefaultLang('zh-hant');
    const localStorageLang = localStorage.getItem(LocalStorageKey.language);
    if (localStorageLang) {
      this.translateServ.use(localStorageLang);
    }
    else {
      const navigatorLang = navigator.language;
      if (navigatorLang.includes('ja')) {
        this.translateServ.use('ja')
      }
    }

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
  ngOnInit(): void {
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
  ngAfterViewInit(): void {
    // 初始化與綁定聲音元素
    this.appServ.Init({ bgmEl: this.bgm, seEl: this.se, ambientEl: this.ambient, messageSEEl: this.messageSE });
  }


  set loading(v: boolean) {
    this.appServ.loading = v;
  }
  get loading() {
    return this.appServ.loading;
  }

  get noticeTitle() {
    return this.appServ.noticeTitle;
  }

  get noticeContent() {
    return this.appServ.noticeContent;
  }

  get Ray1Open() {
    return this.appServ.Ray1Open;
  }

  set error(v: any) {
    this.appServ.error = v;
  }
  get error() {
    return this.appServ.error;
  }
}
