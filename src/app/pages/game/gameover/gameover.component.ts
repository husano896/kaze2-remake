import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [SeparateTextPipe, CommonModule],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.scss'
})
export class GameoverComponent {
  constructor(private readonly location: Location) {

  }
  backToHome() {
    if (this.isDelete) {
      // 若是因友好度不足導致的GAME OVER, 將進行刪檔...!!!
      localStorage.removeItem(LocalStorageKey.save);
    }
    location.href = '/'
  }

  get isDelete() {
    const state = this.location.getState() as { delete: string };
    return Boolean(state.delete)
  }
}
