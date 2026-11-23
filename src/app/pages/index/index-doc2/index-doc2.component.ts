import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';

@Component({
    selector: 'app-index-doc2',
    imports: [RouterModule, TranslateModule, SeparateTextPipe],
    templateUrl: './index-doc2.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './index-doc2.component.scss'
})
export class IndexDoc2Component {

}
