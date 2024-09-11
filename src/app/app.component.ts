import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  @ViewChild('bgm') bgm!: ElementRef<HTMLAudioElement>;
  @ViewChild('se') se!: ElementRef<HTMLAudioElement>;
  @ViewChild('ambient') ambient!: ElementRef<HTMLAudioElement>;

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

        // 再找找看有沒有比較好的地方計算CG
        this.appServ.saveData.PS_RyuCG();
        this.appServ.Save();
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
  ngAfterViewInit(): void {

    this.appServ.Init({ bgmEl: this.bgm, seEl: this.se, ambientEl: this.ambient });
  }

  set loading(v: boolean) {
    this.appServ.loading = v;
  }
  get loading() {
    return this.appServ.loading;
  }
}
