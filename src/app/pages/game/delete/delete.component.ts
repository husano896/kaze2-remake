import { AppService } from '@/app/app.service';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [RouterModule, SeparateTextPipe, CommonModule, TranslateModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent implements OnInit, OnDestroy {
  countDown: number = 20;
  interval: any;
  constructor(private router: Router, private appServ: AppService, private http: HttpClient) { }

  ngOnInit(): void {
    this.interval = setInterval(() => { this.countDown-- }, 1000)
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  async Delete() {
    if (this.countDown > 0) {
      return;
    }
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
    location.href = '/'
  }
}
