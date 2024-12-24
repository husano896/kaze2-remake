import { AfterViewInit, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { AppService } from '@/app/app.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [SeparateTextPipe, CommonModule],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.scss'
})
export class GameoverComponent implements AfterViewInit {
  constructor(private readonly location: Location, private appServ: AppService, private http: HttpClient) {

  }
  ngAfterViewInit(): void {
    this.appServ.setSE()
    // 若非刪檔時, 停止GameOver音樂
    if (!this.isDelete) {
      this.appServ.setBGM()
    }
  }
  async backToHome() {
    if (this.isDelete) {
      // 若是因友好度不足導致的GAME OVER, 將進行刪檔...!!!
      // 若有註冊則刪除遠端資料
      if (this.appServ.saveData.registered) {
        try {
          await firstValueFrom(
            this.http.delete(`/save?guid=${this.appServ.saveData.guid}&btlid=${this.appServ.saveData.btlid}`));
        }
        catch (err) {
          console.warn('刪除資料時發生錯誤：', err);
        }
      }
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
