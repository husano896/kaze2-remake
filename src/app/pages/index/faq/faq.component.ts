import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-faq',
    imports: [RouterModule, TranslateModule, SeparateTextPipe],
    templateUrl: './faq.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './faq.component.scss'
})
export class FaqComponent {

}
