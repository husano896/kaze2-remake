import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-begin',
  standalone: true,
  imports: [],
  templateUrl: './begin.component.html',
  styleUrl: './begin.component.scss'
})
export class BeginComponent implements OnInit, AfterViewInit {
  constructor(private appServ: AppService, private router: Router) {

  }
  ngOnInit(): void {

    // 若有前次已登入標記，重設
    if (this.appServ.saveData.ivent & EventFlag.遊戲登入) {
      this.appServ.saveData.ivent ^= EventFlag.遊戲登入;
    }

    const minutesSinceLastLogin = this.appServ.waitTimeMinutes;
    // 超過10分鐘時生命恢復
    if (minutesSinceLastLogin > 10) {
      this.appServ.saveData.hp = Math.min(
        // 40分鐘回覆1HP
        this.appServ.saveData.hp + minutesSinceLastLogin + Math.round(minutesSinceLastLogin / 40),
        this.appServ.saveData.Maxhp,
      )
    }

    // 因為恐怖症降低好感
    if ((this.appServ.saveData.bio & 16) && (minutesSinceLastLogin >= 30)) {
      // 好痛
      this.appServ.saveData.love -= 65;
    }

    // 音效清除
    this.appServ.setSE();

    // 距離上次訪問時間不滿60分鐘, 直接進
    if (minutesSinceLastLogin < 60) {
      this.appServ.Save();
      this.router.navigate(['/game/dragongame'])
      return
    }
    // 如果進行度為10的倍數，進行友好度檢查
    if ((this.appServ.saveData.numVisits % 10) === 0) {
      this.router.navigate(['/game/love_check'])
      return;
    }


    this.appServ.saveData.numVisits++;
    this.appServ.saveData.turn += 24;
  }
  async ngAfterViewInit() {

    const minutesSinceLastLogin = this.appServ.waitTimeMinutes;
    if (minutesSinceLastLogin < 60) {
      return;
    }
    this.appServ.setAmbient('snd16');
    // 顯示日期與開場
    await this.appServ.toggleRay1();

    this.appServ.setNotice("システムの更新", "異世界ドラグードに接続中");
    await this.appServ.Wait(900);

    this.appServ.setNotice("システムの更新", "異世界ドラグードに接続完了\n育成モジュールの読み込み中");
    await this.appServ.Wait(900);

    this.appServ.setNotice("システムの更新", "異世界ドラグードに接続完了\n育成モジュールの組み込み完了\n竜舎へジャンプ");
    await this.appServ.Wait(1500);
    this.router.navigate(['/game/dragongame'])
    this.appServ.setNotice();
  }

}
