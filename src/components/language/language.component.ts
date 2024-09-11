import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {
  constructor(private translateServ: TranslateService) {

  }
  get language() {
    return this.translateServ.currentLang;
  }
  set language(v: string) {
    this.translateServ.use(v);
    localStorage.setItem(LocalStorageKey.language, v);
  }
}
