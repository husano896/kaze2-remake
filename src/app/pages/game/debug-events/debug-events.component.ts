import { AppService } from '@/app/app.service';
import { SaveDataEditorComponent } from '@/components/save-data-editor/save-data-editor.component';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-debug-events',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SaveDataEditorComponent],
  templateUrl: './debug-events.component.html',
  styleUrl: './debug-events.component.scss'
})
export class DebugEventsComponent implements AfterViewInit, OnDestroy {
  waiting?: boolean;
  constructor(private router: Router, private appServ: AppService) {

  }
  ngAfterViewInit(): void {
    this.appServ.setBGM();
    this.appServ.setAmbient();
    this.appServ.setSE();
  }
  ngOnDestroy(): void {
    this.appServ.setBGM();
    this.appServ.setAmbient();
    this.appServ.setSE();
  }

  goDialog(eventName: string, state?: {}) {
    this.router.navigate(['/game/dialogue'], { state: { event: eventName, ...(state ? state : {}) } });
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

  get debug() {
    return this.appServ.debug;
  }
}
