import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AppService } from '@/app/app.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Howler } from 'howler';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, SeparateTextPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit {
  constructor(private readonly appServ: AppService, private router: Router) {

  }
  ngAfterViewInit(): void {
    Howler.stop();
    this.appServ.setBGM()
  }

  startGame($event: Event) {
    this.router.navigate(['/game/begin'], { replaceUrl: true })
    $event.preventDefault();
  }
  resetLoginTime() {
    this.appServ.setLastLogin(new Date().getTime() - 3600000);
  }

  toggleAudio() {
    this.appServ.toggleAudio();
  }

  unLink()  {
    if (!window.confirm('是否解除存檔中的帳號連結記錄？')) {
      return;
    }

    this.appServ.saveData.btlid = '';
    this.appServ.saveData.guid = '';
  }

  get isAudioON(): boolean {
    return this.appServ.AudioON;
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

  get registered() {
    return this.appServ.saveData.registered;
  }

  get saveFailed() {
    return this.appServ.saveFailed;
  }
}
