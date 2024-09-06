import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';

@Component({
  selector: 'app-index-doc3',
  standalone: true,
  imports: [RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './index-doc3.component.html',
  styleUrl: './index-doc3.component.scss'
})
export class IndexDoc3Component {

}
