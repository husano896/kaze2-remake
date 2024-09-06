import { Component } from '@angular/core';
import { AppService } from './app.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  subscriptions: Array<Subscription> = [

  ]
  constructor(private appServ: AppService, private router: Router) {

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
  }

  set loading(v: boolean) {
    this.appServ.loading = v;
  }
  get loading() {
    return this.appServ.loading;
  }
}
