import { AppService } from '@/app/app.service';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-debug-audio',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './debug-audio.component.html',
  styleUrl: './debug-audio.component.scss'
})
export class DebugAudioComponent implements OnDestroy {
  constructor(private readonly appServ: AppService) {

  }
  playBGM(bgm?: string) {
    this.appServ.setBGM(bgm)
  }
  playSE(se?: string) {
    
    this.appServ.setSE(se);
  }

  ngOnDestroy(): void {
    this.appServ.setBGM();
    this.appServ.setSE();
  }
}
