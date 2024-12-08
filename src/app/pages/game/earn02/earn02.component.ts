import { AppService } from '@/app/app.service';
import { ChessGameComponent } from '@/components/chess-game/chess-game.component';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-earn02',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, SeparateTextPipe, ChessGameComponent],
  templateUrl: './earn02.component.html',
  styleUrl: './earn02.component.scss'
})
export class Earn02Component implements AfterViewInit, OnDestroy {

  @ViewChild(ChessGameComponent) chessGameComponent?: ChessGameComponent;
  /** 拉霸中的隨機計時器 */
  started?: boolean;
  scorePlayer: number = 0;
  scoreEnemy: number = 0;
  constructor(private appServ: AppService) {

  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    this.appServ.setBGM('music04')
  }

  onStartClick() {
    if (!this.chessGameComponent) {
      return;
    }
    this.chessGameComponent.Reset();
    this.appServ.saveData.turn -= 5;
    this.started = true;
  }

  onGameProcess(ev: { enemy: number, player: number }) {
    this.scoreEnemy = ev.enemy;
    this.scorePlayer = ev.player;
  }

  onGameCompleted(ev: { enemy: number, player: number }) {
    this.started = false;
    this.scoreEnemy = ev.enemy;
    this.scorePlayer = ev.player;

    if (this.scorePlayer > this.scoreEnemy) {
      let varP, varget;
      if ((this.scorePlayer < 64) && (this.scoreEnemy == 0)) {
        varP = 2;
      } else if (this.scorePlayer == 64) {
        varP = 2.5;
      } else {
        varP = 1.5;
      }
      varget = Math.round(
        (
          (this.scorePlayer + 64) *
          (this.scorePlayer + 64) *
          (varP - (this.scoreEnemy / 64)) -
          (
            (
              (this.scoreEnemy + 32) * (this.scoreEnemy + 32)
            ) * (2.5 - varP)
          )
        ) / 102.4
      );

      this.appServ.saveData.food += varget;
      this.appServ.Confirm('勝 負 判 定', `報奨金として、${varget}シェルを手に入れた！`)
      this.appServ.setSE('snd15');
    } else if (this.scoreEnemy > this.scorePlayer) {
      this.appServ.Confirm('勝 負 判 定', `アナタの負けです。`)
      this.appServ.setSE('snd10');
    } else if (this.scorePlayer == this.scoreEnemy) {
      this.appServ.Confirm('勝 負 判 定', `引き分けとなりました。`)
      this.appServ.setSE('snd10');
    }
  }
  get turn() {
    return this.appServ.saveData?.turn || 0;
  }
  get money() {
    return this.appServ.saveData?.food || 0;
  }
}
