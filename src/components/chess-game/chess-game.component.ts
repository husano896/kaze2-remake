import { AppService } from '@/app/app.service';
import { BioFlag } from '@/data/BioFlag';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash-es';

const BOARD_SIZE = 8;
enum CellType {
  None = 0,
  White = 1,
  Black = 2
}

@Component({
  selector: 'app-chess-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chess-game.component.html',
  styleUrl: './chess-game.component.scss'
})
export class ChessGameComponent {
  static EnemyCellType = CellType.White;
  static PlayerCellType = CellType.Black;

  private _gameStart?: boolean;
  @Input() get gameStart() {
    return this._gameStart;
  }
  set gameStart(v) {
    if (v) {
      this.Reset();
    }
    this._gameStart = v;
  }

  @Output() onGameProcess = new EventEmitter<{ enemy: number, player: number }>()
  @Output() onGameCompleted = new EventEmitter<{ enemy: number, player: number }>()

  cpuRandCnt: number = 0;
  message?: string;
  board: Array<number> = new Array(BOARD_SIZE ** 2).fill(CellType.None);

  playerPutIndex?: number = undefined;
  enemyPutIndex?: number = undefined;

  constructor(private readonly appServ: AppService) { }

  async onCellClick(index: number) {
    if (!this.gameStart) {
      return;
    }
    if (this.playerPutIndex !== undefined) {
      return;
    }

    if (this.message) {
      return;
    }

    if (this.board[index] !== CellType.None) {
      this.Message('該位置已下過不能再下。');
      return;
    }

    const results = this.GetPutResult(ChessGameComponent.PlayerCellType, index);
    if (!results.length) {
      this.Message('該位置無法放置');
      return;
    }
    this.playerPutIndex = index;

    // 翻牌！
    results.forEach(index => this.board[index] = ChessGameComponent.PlayerCellType);

    this.CalculateCellCount();
    await this.appServ.Wait(500);

    let cpuAvailableMoves: Array<{ index: number, results: number[] }>
    // CPU思考
    while (true) {
      cpuAvailableMoves = this.GetAvailableMoves(ChessGameComponent.EnemyCellType);
      if (!cpuAvailableMoves.length) {
        this.playerPutIndex = undefined;
        this.Message('CPU PASS');
        break;
      }
      this.CPUThink(cpuAvailableMoves);
      await this.appServ.Wait(500);
      this.CalculateCellCount();

      if (this.GetAvailableMoves(ChessGameComponent.PlayerCellType).length) {
        this.playerPutIndex = undefined;
        break;
      }
      this.Message('PLAYER PASS');
      await this.appServ.Wait(500);
    }
    // 若雙方都無法下了，完場
    if (!this.GetAvailableMoves(ChessGameComponent.EnemyCellType).length &&
      !this.GetAvailableMoves(ChessGameComponent.PlayerCellType).length) {
      this.onGameCompleted.emit({
        enemy: this.board.filter(i => i === ChessGameComponent.EnemyCellType).length,
        player: this.board.filter(i => i === ChessGameComponent.PlayerCellType).length
      })
      this.Message('GAME SET')
    }
  }

  CalculateCellCount() {
    this.onGameProcess.emit({
      enemy: this.board.filter(i => i === ChessGameComponent.EnemyCellType).length,
      player: this.board.filter(i => i === ChessGameComponent.PlayerCellType).length
    })
  }

  async Message(m: string) {
    this.message = m;
    await this.appServ.Wait(500);
    this.message = '';
  }
  CPUThink(cpuAvailableMoves: Array<{ index: number, results: number[] }>) {
    this.cpuRandCnt++
    let move: { index: number, results: number[] } | undefined;
    // 原作四回合電腦換方式思考一次
    if (this.cpuRandCnt > 3) {
      this.cpuRandCnt = 0;
      // 從能放的清單中隨機選一個能放的
      move = cpuAvailableMoves[Math.floor(Math.random() * cpuAvailableMoves.length)];
      // 翻牌！
    } else {
      if (!(this.appServ.saveData.bio & BioFlag.発作) && (
        this.appServ.saveData.food > 3000 ||
        this.appServ.saveData.numVisits > 52 ||
        this.appServ.saveData.newGamePlusTimes > 0
      )) {
        // 若可以佔四個角，優先佔
        move = cpuAvailableMoves.find(m => {
          return ((m.index % BOARD_SIZE === 0 || m.index % BOARD_SIZE === BOARD_SIZE - 1) &&
            (Math.floor(m.index / BOARD_SIZE) === 0 || Math.floor(m.index / BOARD_SIZE) === BOARD_SIZE - 1))
        })
        if (move) {
          console.log('四角優先算法', move)
          // debugger;
        }
      }
      // 基礎採用利益最大化
      if (!move) {
        move = _.maxBy(cpuAvailableMoves, m => m.results.length);
      }
    }
    if (move) {
      this.enemyPutIndex = move.index;
      move.results.forEach(index => this.board[index] = ChessGameComponent.EnemyCellType);
    }
  }

  GetPutResult(cellType: CellType, index: number): number[] {
    let results: number[] = []

    if (this.board[index] != CellType.None) {
      return results;
    }
    const putX = index % BOARD_SIZE;
    const putY = Math.floor(index / BOARD_SIZE);
    // 八方向檢查
    const directionsCheck = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (const direction of directionsCheck) {
      const [movementX, movementY] = direction;
      let currentX = putX; let currentY = putY;

      while (true) {
        currentX += movementX;
        currentY += movementY;

        // 若超出範圍，停止執行
        if (currentX < 0 || currentX >= BOARD_SIZE || currentY < 0 || currentY >= BOARD_SIZE) {
          break;
        }

        const currentIndex = currentY * BOARD_SIZE + currentX;
        // 該區若為空，停止判斷
        if (this.board[currentIndex] === CellType.None) {
          break;
        }

        // 該區為自己顏色，進行路徑中所有格子處理
        if (this.board[currentIndex] === cellType) {

          let x = putX + movementX; let y = putY + movementY;
          while (x !== currentX || y !== currentY) {
            // 若顏色相同，跳過處理（以防萬一）
            const index = y * BOARD_SIZE + x;
            if (this.board[index] === cellType) {
              break;
            }
            results.push(index);
            x += movementX; y += movementY;
          }
          break;
        }

        // 別人顏色，繼續處理直到超出邊界
      }
    }
    // 若成功放置，加入放置點
    if (results.length > 0) {
      results.push(index)
    }
    return results;
  }

  // 檢查是否有位置可以放
  GetAvailableMoves(cellType: CellType): Array<{ index: number, results: number[] }> {
    return this.board.map((occupied, index) => ({
      results: occupied ? [] : this.GetPutResult(cellType, index), index
    })).filter(i => i.results.length > 0);
  }

  Reset() {
    this.message = '';
    this.playerPutIndex = undefined;
    this.enemyPutIndex = undefined;
    this.board = this.board.fill(CellType.None);
    this.board[BOARD_SIZE * (BOARD_SIZE / 2 - 1) + (BOARD_SIZE / 2 - 1)] = ChessGameComponent.PlayerCellType;
    this.board[BOARD_SIZE * (BOARD_SIZE / 2 - 1) + (BOARD_SIZE / 2)] = ChessGameComponent.EnemyCellType;
    this.board[BOARD_SIZE * (BOARD_SIZE / 2) + (BOARD_SIZE / 2 - 1)] = ChessGameComponent.EnemyCellType;
    this.board[BOARD_SIZE * (BOARD_SIZE / 2) + (BOARD_SIZE / 2)] = ChessGameComponent.PlayerCellType;
  }
}
