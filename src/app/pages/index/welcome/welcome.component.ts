import { AppService } from '@/app/app.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit, OnDestroy {
  tick: number = 0;
  interval?: any;

  constructor(private appServ: AppService, private router: Router, private location: Location) {

  }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.tick++;
      switch (this.tick) {
        // 啟動音
        case 1:
          this.appServ.setSE('snd07')
          break;
        // 歡迎使用！
        case 20:
          this.appServ.setSE('snd06')
          break;
        // 跳轉至開場事件
        case 45:
          const state = this.location.getState() as { debugMenu: boolean };
          if (state?.debugMenu) {
            alert('因偵錯模式，跳過開場劇情')
            this.router.navigate(['/game/debug_events'], { replaceUrl: true })
            return
          }
          this.router.navigate(['/game/dialogue'], {
            replaceUrl: true,
            state: {
              event: 'Opening'
            }
          })
      }
    }, 400)
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
