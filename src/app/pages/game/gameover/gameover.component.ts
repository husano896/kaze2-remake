import { AfterViewInit, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { AppService } from '@/app/app.service';
@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [SeparateTextPipe, CommonModule],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.scss'
})
export class GameoverComponent implements AfterViewInit {
  constructor(private readonly location: Location, private appServ: AppService) {

  }
  ngAfterViewInit(): void {
      this.appServ.setSE()
      // 若非刪檔時, 停止GameOver音樂
      if (!this.isDelete) {
        this.appServ.setBGM()
      }
  }
  backToHome() {
    if (this.isDelete) {
      // 若是因友好度不足導致的GAME OVER, 將進行刪檔...!!!
      localStorage.removeItem(LocalStorageKey.save);
    }
    this.appServ.setBGM()
    this.appServ.setSE()
    location.href = '/'
  }

  get isDelete() {
    const state = this.location.getState() as { delete: string };
    return Boolean(state.delete)
  }
}
