import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('bgm') bgm!: ElementRef<HTMLAudioElement>;
  subscriptions: Array<Subscription> = [

  ]
  constructor(private appServ: AppService, private router: Router, private translateServ: TranslateService) {

    // 路由事件訂閱
    this.subscriptions.push(router.events.subscribe(e => {
      console.log(e);
      if (e instanceof NavigationStart) {
        this.loading = true;
        console.log(true)
      }

      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        this.loading = false;
        console.log(false)
      }
    }));

    this.translateServ.setDefaultLang('zh-hant');

    this.translateServ.use('zh-hant');
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
    this.appServ.Init(this.bgm);
  }

  set loading(v: boolean) {
    this.appServ.loading = v;
  }
  get loading() {
    return this.appServ.loading;
  }
}
