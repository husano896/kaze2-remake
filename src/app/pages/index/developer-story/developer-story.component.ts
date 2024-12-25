import { AppService } from '@/app/app.service';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-developer-story',
  standalone: true,
  imports: [SeparateTextPipe, TranslateModule, RouterModule],
  templateUrl: './developer-story.component.html',
  styleUrl: './developer-story.component.scss'
})
export class DeveloperStoryComponent implements OnInit, OnDestroy {

  constructor(private appServ: AppService) {

  }

  ngOnInit(): void {
      this.appServ.setBGM('music29')
  }
  ngOnDestroy(): void {
    // 退出時結束音樂（如果播放中）
    this.appServ.setBGM()
  }


  playBGM(bgm?: string) {
    this.appServ.setBGM(bgm)
  }
}
