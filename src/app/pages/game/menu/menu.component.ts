import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AppService } from '@/app/app.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, SeparateTextPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(private appServ: AppService) {

  }
  isDebug() {
    return this.appServ.isDebug()
  }
  isAudioON(): boolean {
    if (!this.appServ.bgmEl) {
      return false;
    }
    return this.appServ.bgmEl.nativeElement.volume > 0;
  }

  toggleAudio() {
    if (!this.appServ.bgmEl) {
      return;
    }
    this.appServ.bgmEl.nativeElement.volume = this.isAudioON() ? 0 : 1;
  }
}
