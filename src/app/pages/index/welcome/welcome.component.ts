import { AppService } from '@/app/app.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit, OnDestroy {
  tick: number = 0;
  interval?: any;

  constructor(private appServ: AppService, private router: Router) {

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
        case 42:
          this.router.navigate(['/game/dialogue'], {
            replaceUrl: true, state: {
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
