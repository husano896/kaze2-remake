
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-number-to-image',
    imports: [],
    templateUrl: './number-to-image.component.html',
    styleUrl: './number-to-image.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberToImageComponent {
  @Input() number: number = 0;

  numberToStringArray() {
    return [...String(this.number)]
  }
}
