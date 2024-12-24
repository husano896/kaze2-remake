import { AppService } from '@/app/app.service';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-earn01',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, SeparateTextPipe],
  templateUrl: './earn01.component.html',
  styleUrl: './earn01.component.scss'
})
export class Earn01Component implements AfterViewInit, OnDestroy {
  moji: Array<string> = [
    '#', 'A', '7', '@', 'O', '?', '*'
  ]

  val: Array<number> = [0, 0, 0];
  winResult?: string;

  /** 拉霸中的隨機計時器 */
  rollingInterval?: number;
  constructor(private appServ: AppService) {

  }

  ngOnDestroy(): void {
    clearInterval(this.rollingInterval);
  }

  ngAfterViewInit(): void {
    this.appServ.setBGM('music04')
  }

  onStartClick() {
    // 尚未開始拉霸
    if (!this.rollingInterval) {
      this.appServ.saveData.turn--;
      this.rollingInterval = window.setInterval(this.onRollingTick.bind(this), 10)
      this.winResult = ''
      this.appServ.setSE('snd13')
      return;
    }
    // 已經在拉霸中, 停止拉霸
    clearInterval(this.rollingInterval);
    this.rollingInterval = 0;

    // 原作中10%的機率會使第二三順位數字強制一樣
    if (Math.floor(Math.random() * 10) == 1) {
      this.val = [
        this.val[0], this.val[0], this.val[0]
      ]
    }

    // 勝利判定

    // 777
    if (this.val[0] === 2 && this.val[1] === 2 && this.val[2] === 2) {
      // 獲得道具
      this.appServ.saveData.item[1]++;
      this.appServ.saveData.food += 300;
      this.winResult = "ＬＵＣＫＹ７！！　ITEM & 300　Ｇｅｔ！！";
    }

    // @@@
    if (this.val[0] === 3 && this.val[1] === 3 && this.val[2] === 3) {
      this.appServ.saveData.food += 200;
      this.winResult = "ＹＥＡＨ！！200Ｇｅｔ！！";
    }
    // AAA
    if (this.val[0] === 1 && this.val[1] === 1 && this.val[2] === 1) {
      this.appServ.saveData.food += 150;
      this.winResult = "ＣＯＯＬ！！150Ｇｅｔ！！";
    }
    // ###
    if (this.val[0] === 0 && this.val[1] === 0 && this.val[2] === 0) {
      this.appServ.saveData.food += 100;
      this.winResult = "ＧＯＯＤ！！100Ｇｅｔ！！";
    }
    // ???
    if (this.val[0] === 5 && this.val[1] === 5 && this.val[2] === 5) {
      this.appServ.saveData.food += 50;
      this.winResult = "ＮＩＣＥ！！50Ｇｅｔ！！";
    }
    // *** 
    if (this.val[0] === 6 && this.val[1] === 6 && this.val[2] === 6) {
      this.appServ.saveData.food += 35;
      this.winResult = "ＷＩＮ！！　35Ｇｅｔ！！";
    }
    // OOO
    if (this.val[0] === 4 && this.val[1] === 4 && this.val[2] === 4) {
      this.appServ.saveData.food += 25;
      this.winResult = "ＷＩＮ！！　25Ｇｅｔ！！";
    }
    if (this.val[0] !== this.val[1] || this.val[1] !== this.val[2] || this.val[0] !== this.val[2]) {
      if (this.val[0] === this.val[1] || this.val[1] === this.val[2]) {
        this.appServ.saveData.food += 10;
        this.winResult = "ＷＩＮ！！　10Ｇｅｔ！！";

      } else {
        if (this.val[0] === 4) {
          this.appServ.saveData.turn++;
          this.winResult = "ＲＥＰＬＡＹ";

        }
      }
    }
    if (this.winResult) {
      this.appServ.Confirm(this.appServ.t('Game.Earn01.Result'), this.winResult)
      this.appServ.setSE('snd15')
    } else {
      this.appServ.setSE();
    }
  }

  onRollingTick() {
    this.val = [
      Math.floor(Math.random() * this.moji.length),
      // 中間格是固定-1
      (this.val[0] - 1 + this.moji.length) % this.moji.length,
      Math.floor(Math.random() * this.moji.length),
    ]
  }
  get turn() {
    return this.appServ.saveData?.turn || 0;
  }
  get money() {
    return this.appServ.saveData?.food || 0;
  }
}
