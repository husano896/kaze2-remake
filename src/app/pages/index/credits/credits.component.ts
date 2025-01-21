import { Component, OnDestroy } from '@angular/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { AppService } from '@/app/app.service';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [SeparateTextPipe, TranslateModule, RouterModule],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent implements OnDestroy {
  constructor(private readonly appServ: AppService) {

  }

  ngOnDestroy(): void {
    this.appServ.setBGM();
  }

  playBGM(m?: string) {
    this.appServ.setBGM(m)
  }
}
