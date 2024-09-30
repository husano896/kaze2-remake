import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '@/components/language/language.component';
import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, SeparateTextPipe, TranslateModule, LanguageComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  constructor(private appServ: AppService) {
  }

  get newGamePlus() {
    return this.appServ.newGamePlus;
  }

  set settingsOn(v: boolean) {
    this.appServ.settingsOn = v;
  }

}
