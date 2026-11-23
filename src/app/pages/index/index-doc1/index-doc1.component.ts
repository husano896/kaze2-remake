import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';

@Component({
    selector: 'app-index-doc1',
    imports: [RouterModule, TranslateModule, SeparateTextPipe],
    templateUrl: './index-doc1.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './index-doc1.component.scss'
})
export class IndexDoc1Component {

}
