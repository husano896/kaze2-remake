import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '../../../components/language/language.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, SeparateTextPipe, TranslateModule, LanguageComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
