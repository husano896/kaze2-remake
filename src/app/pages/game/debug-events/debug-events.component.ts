import { AppService } from '@/app/app.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-debug-events',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './debug-events.component.html',
  styleUrl: './debug-events.component.scss'
})
export class DebugEventsComponent implements OnDestroy {
  waiting?: boolean;
  constructor(private router: Router, private appServ: AppService) {

  }
  ngOnDestroy(): void {
    this.appServ.setBGM();
    this.appServ.setAmbient();
    this.appServ.setSE();
  }

  goDialog(eventName: string) {
    this.router.navigate(['/game/dialogue'], { state: { event: eventName } });
  }

  async noticeTest(n?: number) {
    this.waiting = true;
    switch (n) {
      default: {
        this.appServ.setSE('snd07');
        this.appServ.setNotice('システムの更新', 'モジュールを組み込みます');
        await this.appServ.Wait(3900);
        // 65
        this.appServ.setNotice('システムの更新', 'モジュールを組み込みます\r\nモジュールが実行されました');
        await this.appServ.Wait(3000);
        this.appServ.setNotice();
      }
    }
    this.waiting = false;
  }

  async Ray1Test() {
    this.waiting = true;
    await this.appServ.toggleRay1();
    this.waiting = false;
  }
}
