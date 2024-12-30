import { AppService } from '@/app/app.service';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-earn03',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, SeparateTextPipe],
  templateUrl: './earn03.component.html',
  styleUrl: './earn03.component.scss'
})
export class Earn03Component implements AfterViewInit, OnDestroy {

  /** 版面大小 */
  difficulty: number = 4;

  board: number[] = [];

  timeLeft = 0;
  timeInterval: any;
  constructor(private appServ: AppService) {

  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  ngAfterViewInit(): void {
    this.appServ.setBGM('music04')
  }

  onStartClick() {
    this.appServ.saveData.turn -= 5;
    // 初始化版面
    this.board = _.range(this.difficulty ** 2);

    //#region 亂數處理
    let currentWhiteSpacePos = this.board.length - 1;
    /** 決定各個方向的移動變化量 */
    let directionMovements = [
      // 上
      -this.difficulty,
      // 左
      -1,
      // 下
      this.difficulty,
      // 右
      1
    ];
    let lastDirection: number = 0;
    let newWhiteSpacePos: number = 0;

    // 打亂移動次數：難度^3
    let runCount = (this.personalBest && this.personalBest < 40) ? this.difficulty ** 4 : this.difficulty ** 3;
    while (runCount--) {
      let newDirection = 0;

      // 決定方向，並排除上次的反方向以及無法通行的路徑
      do {
        newDirection = Math.round(Math.random() * 3)
        newWhiteSpacePos = currentWhiteSpacePos + directionMovements[newDirection];
      } while (
        // 避免走回上次方向
        newDirection === ((lastDirection + 2) % 4) ||
        // 避免超出範圍
        newWhiteSpacePos < 0 || newWhiteSpacePos >= this.board.length ||
        // 在最左時不可往左
        directionMovements[newDirection] === -1 && (currentWhiteSpacePos % this.difficulty === 0) ||
        // 在最右時不可往右
        directionMovements[newDirection] === 1 && ((currentWhiteSpacePos) % this.difficulty === this.difficulty - 1)
      )

      // 將新舊方向的數值兌換
      [this.board[currentWhiteSpacePos], this.board[newWhiteSpacePos]] = [this.board[newWhiteSpacePos], this.board[currentWhiteSpacePos]]
      // 記錄上次方向
      lastDirection = newDirection;
      currentWhiteSpacePos = newWhiteSpacePos;

    }
    //#endregion

    this.timeLeft = 120;
    this.timeInterval = setInterval(() => {
      if (this.timeLeft <= 0) {
        // GAME OVER
        clearInterval(this.timeInterval);
        this.appServ.setSE('snd14')
        this.appServ.Confirm(this.appServ.t('Game.Earn03.Lose.Title'), this.appServ.t('Game.Earn03.Lose.Description'))
        this.timeInterval = null;
      } else {
        this.timeLeft--;
      }
    }, 1000);
  }

  async onCellClick(index: number) {
    if (!this.timeInterval) {
      return;
    }

    // 檢查該點是否可往方向走
    /** 決定各個方向的移動變化量 */
    let directionMovements = [
      // 上
      -this.difficulty,
      // 左
      -1,
      // 下
      this.difficulty,
      // 右
      1
    ];

    let moveSuccess = false;
    for (const movement of directionMovements) {

      if (
        // 於左邊界時不做往左判定
        (movement === -1 && (index % this.difficulty === 0)) ||
        // 於右邊界時不做往右判定
        movement === 1 && (index % this.difficulty === this.difficulty - 1)
      ) {
        continue;
      }

      const newIndex = index + movement;
      if (newIndex < 0 || newIndex > this.board.length) {
        continue;
      }
      // 若與空格交換，則成功
      if (this.board[newIndex] === this.lastNumber) {
        moveSuccess = true;
        // 進行移動
        [this.board[index], this.board[newIndex]] =
          [this.board[newIndex], this.board[index]]

        break;
      }
    }
    if (!moveSuccess) {
      this.appServ.setSE('snd14')
      return;
    }

    // 過關！
    if (this.CheckGameCompleted()) {
      const usedTime = 120 - this.timeLeft;
      const varCnt = Math.round(((this.timeLeft + 120) * (this.timeLeft + 120) + 40000) / 500);
      this.appServ.saveData.food += varCnt;
      this.appServ.Confirm(this.appServ.t('Game.Earn03.Win.Title'),
        this.appServ.t('Game.Earn03.Win.Description', {timeLeft: String(this.timeLeft), varCnt: String(varCnt)})
      )
      this.appServ.setSE('snd15')
      if (!this.personalBest || usedTime < this.personalBest) {
        this.personalBest = usedTime;
      }
      clearInterval(this.timeInterval);
      this.timeInterval = null;
    }
  }
  CheckGameCompleted() {
    return _.every(this.board, (value, index) => {
      return value === index;
    })
  }


  get turn() {
    return this.appServ.saveData?.turn || 0;
  }
  get money() {
    return this.appServ.saveData?.food || 0;
  }

  get lastNumber() {
    return this.difficulty * this.difficulty - 1
  }

  get personalBest() {
    return Number(localStorage.getItem(LocalStorageKey.earn03best) || '0')
  }
  set personalBest(v: number) {
    localStorage.setItem(LocalStorageKey.earn03best, String(v))
  }
}
