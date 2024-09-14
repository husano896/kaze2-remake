import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-to-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-to-image.component.html',
  styleUrl: './number-to-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberToImageComponent {
  @Input() number: number = 0;

  numberToStringArray() {
    console.log(this.number)
    return [...String(this.number)]
  }
}
