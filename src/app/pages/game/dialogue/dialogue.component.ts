import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, ViewChild } from '@angular/core';
import { Events } from '@/data/events';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, EventType, Router, RouterModule } from '@angular/router';
import { DialogueSystem } from '@/entities/DialogueSystem';
import { debounceTime, Subscription } from 'rxjs';
import { SaveData } from '@/entities/SaveData';
import * as _ from 'lodash-es';
import { ChessGameComponent } from "@/components/chess-game/chess-game.component";
import { SnakeGameComponent } from '@/components/snake-game/snake-game.component';
import { RootAnimations } from '@/app/app.service';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [CommonModule, RouterModule, ChessGameComponent, SnakeGameComponent],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss'
})

export class DialogueComponent extends DialogueSystem implements AfterViewInit, OnDestroy {
  @ViewChild('bg') bg!: ElementRef<HTMLDivElement>;
  @ViewChild(ChessGameComponent) chessGameComponent?: ChessGameComponent;

  @ViewChild(SnakeGameComponent) snackGameComponent?: SnakeGameComponent;

  //#region 龍1
  dragonCg?: string;
  opacity: number = 0;
  //#endregion

  //#region 龍2
  dragonCg2?: string;
  emoji2?: string;
  opacity2: number = 0;
  //#endregion

  /** 跳過事件的Callback, 若未設定時則無法跳過 */
  skipCallBack?: Function;

  /** 入場時的存檔, for Debug menu 測試劇情完後回復狀態用  */
  private origSave!: SaveData;

  /** 路由聆聽事件 */
  private routerSubscription?: Subscription;

  /** 是否啟用下棋小遊戲 */
  enableChessGame?: boolean = false;
  /** 是否將下棋小遊戲設為前景 */
  chessGameActive?: boolean = false;
  /** 下棋小遊戲是否開始 */
  chessGameStart?: boolean = false;

  /** 是否啟用貪吃蛇小遊戲 */
  enableSnakeGame?: boolean = false;
  /** 是否將貪吃蛇小遊戲設為前景 */
  snakeGameActive?: boolean = false;
  /** 貪吃蛇小遊戲是否開始 */
  snakeGameStart?: boolean = false;

  constructor(injector: Injector,
    public route: ActivatedRoute, public router: Router) {
    super(injector);
  }

  override async ngAfterViewInit() {

    super.ngAfterViewInit();
    this.routerSubscription = this.router.events.pipe(debounceTime(100)).subscribe(async (ev) => {
      console.log('ev')
      const state = this.location.getState() as { event: string };
      if (state?.event) {
        await this.appServ.Wait(100)
        console.log('event', state.event)
        const ev = Events[state.event];
        if (ev) {
          this.origSave = _.clone(this.appServ.saveData);
          ev.bind(this)(this);
        }
        else {
          this.router.navigate(['/'], { replaceUrl: true });
          throw new Error(`未指定Event或找不到Event '${state.event}'!`)
        }
      } else {
        console.warn('state is not exist!');
      }
    })
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /** 點選跳過 */
  async onSkipClick() {
    if (!this.skipCallBack) {
      this.appServ.Confirm(this.translateServ.instant('Scripts.Confirm.Title.Caution'), this.translateServ.instant('Noskip'))
      return;
    }

    if (await this.appServ.Confirm(
      this.translateServ.instant('Scripts.Confirm.Title.Caution'),
      this.translateServ.instant('Scripts.Confirm.ContentSkip'),
      true)) {
      this.ClearContent();

      this.skipCallBack.bind(this)(this)
    }
  }

  SetSkipCallback = (callback?: Function) => {
    this.skipCallBack = callback
  }

  setBG = (bg: string) => {
    this.bg.nativeElement.style.backgroundImage = `url(/assets/imgs/bg/${bg}.jpg)`
  }

  setDragonCG = (cg: string) => {
    // this.dragoncg.nativeElement.src = `/assets/imgs/dragon/${cg}.gif`
    this.dragonCg = cg;
  }

  setDragonCG2 = (cg: string) => {
    this.dragonCg2 = cg;
  }
  setBGOpticity = (v: number) => {
    this.bg.nativeElement.style.backgroundColor = `rgba(0,0,0,${1.0 - v})`;
  }

  setDragonCGOpticity = (v: number) => {
    this.opacity = v;
  }

  setDragonCG2Opticity = (v: number) => {
    this.opacity2 = v;
  }
  setDialogOpticity = (v: number) => {
    this.dialog.nativeElement.style.opacity = String(v);
  }

  AllFadeOut = async () => {
    this.setDialogOpticity(0);
    this.setDragonCGOpticity(0);
    this.setDragonCG2Opticity(0);
    this.setBGOpticity(0);
    this.Face()
    this.SetContentCompleted();
    this.ClearContent();
    this.Emoji();
    if (this.opacity > 0) {
      this.Anim('dragoncg', RootAnimations.FadeOut, 2000);
    }

    if (this.opacity2 > 0) {
      this.Anim('dragoncg2', RootAnimations.FadeOut, 2000);
    }
    await this.appServ.Wait(3000);
  }

  Back = async () => {
    const { debugMenu } = this.location.getState() as { event: string, lv: string, debugMenu: boolean };
    if (debugMenu) {
      this.appServ.saveData = this.origSave;
      this.router.navigate(['/game/debug_events'], { replaceUrl: true })
      return;
    }
    this.appServ.saveData.Save();
    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }

  get saveData() {
    return this.appServ.saveData;
  }
}
