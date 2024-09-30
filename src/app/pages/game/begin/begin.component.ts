import { AppService } from '@/app/app.service';
import { EventFlag } from '@/data/EventFlag';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-begin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './begin.component.html',
  styleUrl: './begin.component.scss'
})
export class BeginComponent implements OnInit, AfterViewInit {
  constructor(private appServ: AppService, private router: Router, private translateServ: TranslateService) {

  }
  ngOnInit(): void {
  }
  async ngAfterViewInit() {

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

    // 因為恐怖症降低好感, 注意這發生在檢查友好度之前...!!
    if ((this.appServ.saveData.bio & 16) && (minutesSinceLastLogin >= 30)) {
      // 好痛
      this.appServ.saveData.love -= 65;
    }

    // 距離上次訪問時間不滿60分鐘, 直接進
    if (minutesSinceLastLogin < 60) {
      this.appServ.saveData.Save();
      this.router.navigate(['/game/dragongame'])
      return
    }

    // 超過60分鐘了！

    this.appServ.saveData.numVisits++;
    this.appServ.saveData.turn += 24;

    /*
  // 友好度檢查還沒做
  // 如果進行度為10的倍數，進行友好度檢查
  if ((this.appServ.saveData.numVisits % 10) === 0 && this.appServ.saveData.numVisits > 0) {
    this.router.navigate(['/game/love_check'])
    return;
  }
*/

    this.appServ.setAmbient('snd16');
    if (this.appServ.saveData.ivent & EventFlag.回答事件) {
      this.appServ.saveData.ivent ^= EventFlag.回答事件;
    }

    // 進行度100時龍死病......。
    if (this.appServ.saveData.numVisits >= 100) {
      this.appServ.saveData.numVisits = 100;
      this.appServ.saveData.bio = 256;
    }

    // 顯示日期與開場
    await this.appServ.toggleRay1();

    this.appServ.setNotice(
      'Scripts.Notice.SystemUpdate.Title',
      'Scripts.Notice.SystemUpdate.11'
    );
    await this.appServ.Wait(900);

    this.appServ.setNotice(
      'Scripts.Notice.SystemUpdate.Title',
      'Scripts.Notice.SystemUpdate.12'
    );
    await this.appServ.Wait(900);

    this.appServ.setNotice(
      'Scripts.Notice.SystemUpdate.Title',
      'Scripts.Notice.SystemUpdate.13'
    );
    await this.appServ.Wait(1500);

    this.router.navigate(['/game/dragongame'])
    this.appServ.setNotice();
  }

}
