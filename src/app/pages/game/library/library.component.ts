import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AfterContentChecked, AfterViewChecked, Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements AfterViewChecked {

  displayItem: string = '';

  constructor(private el: ElementRef<HTMLElement>) { }

  ngAfterViewChecked(): void {
    if (!this.displayItem || !this.el?.nativeElement) {
      return;
    }

    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
  }
}
