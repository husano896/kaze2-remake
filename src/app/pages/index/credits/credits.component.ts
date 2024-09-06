import { Component } from '@angular/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [SeparateTextPipe, TranslateModule, RouterModule],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent {

}
