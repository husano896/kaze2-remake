import { AppService } from '@/app/app.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

/** 版面大小 */
const BOARD_WIDTH = 20
const BOARD_HEIGHT = 20

const CLEAR_TARGET = 15;

/** 面對方向 */
enum SnakeDirection {
  None = 0,
  Up = 1,
  Right = 2,
  Down = 3,
  Left = 4
}

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.scss'
})

/** 對應ドラゴンの丘的貪吃蛇小遊戲, 你這頑皮龍~ */
export class SnakeGameComponent {

  private direction: SnakeDirection = SnakeDirection.None;
  private _gameStart?: boolean;

  public playerX: number = BOARD_WIDTH / 2;
  public playerY: number = BOARD_HEIGHT / 2;

  public pointX: number = 0;
  public pointY: number = 0;

  boardWidth = BOARD_WIDTH;
  boardHeight = BOARD_HEIGHT;

  public playerBodies: Array<{ x: number, y: number }> = []
  private GameInterval?: any;

  constructor(private appServ: AppService) {

  }
  @Input() get gameStart() {
    return this._gameStart;
  }
  set gameStart(v) {
    if (v) {
      this.Reset();
    }
    this._gameStart = v;
  }

  @Output() onGameCompleted = new EventEmitter<{ success: boolean }>()

  Reset() {
    this.playerX = BOARD_WIDTH / 2;
    this.playerY = BOARD_HEIGHT / 2;
    this.SetNextPoint();
  }

  onTimerTick() {
    if (!this.direction) {
      return;
    }

    // 尾巴移位判定
    if (this.playerBodies.length > 0) {
      // 移除尾巴最後端（陣列最前）
      this.playerBodies.shift();
      // 將玩家最後的位置移置前端（陣列最後）
      this.playerBodies.push({ x: this.playerX, y: this.playerY })
    }

    //#region 移動
    switch (this.direction) {
      case SnakeDirection.Up:
        this.playerY--;
        break;
      case SnakeDirection.Down:
        this.playerY++;
        break;
      case SnakeDirection.Left:
        this.playerX--;
        break;
      case SnakeDirection.Right:
        this.playerX++;
        break;
    }
    //#endregion

    //#region 死亡判定
    if (this.playerX <= 0 || this.playerX >= BOARD_WIDTH - 1 ||
      this.playerY <= 0 || this.playerY >= BOARD_HEIGHT - 1 ||
      this.playerBodies.find(b => b.x === this.playerX && b.y === this.playerY)
    ) {
      this.onGameCompleted.emit({ success: false })
      this._gameStart = false;
      this.appServ.setSE('snd14')
      clearInterval(this.GameInterval);
      return;
    }
    //#endregion

    //#region 吃點點判定
    if (this.pointX === this.playerX && this.pointY === this.playerY) {
      // 將吃到的點點納入身體<3
      this.playerBodies.push({ x: this.playerX, y: this.playerY })
      //#region 勝利判定
      if (this.playerBodies.length >= CLEAR_TARGET) {
        this.appServ.setSE('snd15')
        clearInterval(this.GameInterval);
        this.pointX = 0;
        this.pointY = 0;
        this.onGameCompleted.emit({ success: true })
      } else {
        this.appServ.setSE('snd08')
        this.SetNextPoint();
      }
      //#endregion


    }
    //#endregion
  }

  /** 設定下一個目標點位置 */
  SetNextPoint() {
    while (true) {
      const x = Math.floor(Math.random() * (BOARD_WIDTH - 2)) + 1;
      const y = Math.floor(Math.random() * (BOARD_HEIGHT - 2)) + 1;
      if (x <= 0 || x >= BOARD_WIDTH - 1 ||
        y <= 0 || y >= BOARD_HEIGHT - 1 ||
        this.playerBodies.find(b => b.x === x && b.y === y)) {
        continue;
      }
      this.pointX = x;
      this.pointY = y;
      break;
    }
  }
  SetDirection(direction: SnakeDirection) {
    if (!this._gameStart) {
      return;
    }
    if (!this.direction) {
      this.direction = direction;
      clearInterval(this.GameInterval);
      this.GameInterval = setInterval(this.onTimerTick.bind(this), 100)
      return;
    }
    if (direction === SnakeDirection.Down && this.direction === SnakeDirection.Up ||
      direction === SnakeDirection.Up && this.direction === SnakeDirection.Down ||
      direction === SnakeDirection.Left && this.direction === SnakeDirection.Right ||
      direction === SnakeDirection.Right && this.direction === SnakeDirection.Left
    ) {
      this.appServ.setSE('snd14')
      return;
    }

    this.direction = direction;
  }
  @HostListener('document:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent) {
    if (!this._gameStart) {
      return;
    }
    switch ($event.key?.toLowerCase()) {
      case 'arrowup':
      case 'w':
        $event.preventDefault();
        this.SetDirection(SnakeDirection.Up);
        break;
      case 'arrowright':
      case 'd':
        $event.preventDefault();
        this.SetDirection(SnakeDirection.Right);
        break;
      case 'arrowleft':
      case 'a':
        $event.preventDefault();
        this.SetDirection(SnakeDirection.Left);
        break;
      case 'arrowdown':
      case 's':
        $event.preventDefault();
        this.SetDirection(SnakeDirection.Down);
        break;
    }
  }
}
