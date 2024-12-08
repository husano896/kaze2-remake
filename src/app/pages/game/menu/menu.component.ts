import { AfterViewInit, Component } from '@angular/core';
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
export class MenuComponent implements AfterViewInit {
  constructor(private appServ: AppService) {

  }
  ngAfterViewInit(): void {
    this.appServ.setBGM()
    this.appServ.setAmbient()
    this.appServ.setMessageSE()
    this.appServ.setSE();
  }

  resetLoginTime() {
    this.appServ.setLastLogin(new Date().getTime() - 3600000);
  }

  toggleAudio() {
    this.appServ.toggleAudio();
  }

  get isAudioON(): boolean {
    return this.appServ.isAudioON();
  }

  get debug() {
    return this.appServ.debug;
  }

  get waitM() {
    return this.appServ.waitTimeMinutes;
  }

  get waitH() {
    return this.appServ.waitTimeHours;
  }
}
