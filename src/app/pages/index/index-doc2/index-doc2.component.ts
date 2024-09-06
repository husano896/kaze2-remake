import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';

@Component({
  selector: 'app-index-doc2',
  standalone: true,
  imports: [RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './index-doc2.component.html',
  styleUrl: './index-doc2.component.scss'
})
export class IndexDoc2Component {

}
