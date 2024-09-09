import { AppService } from '@/app/app.service';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-debug-audio',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './debug-audio.component.html',
  styleUrl: './debug-audio.component.scss'
})
export class DebugAudioComponent implements OnDestroy {
  constructor(private router: Router, private appServ: AppService) {

  }
  playBGM(bgm: string) {
    this.appServ.setBGM(bgm)
  }

  ngOnDestroy(): void {
    this.appServ.setBGM('');
  }
}
