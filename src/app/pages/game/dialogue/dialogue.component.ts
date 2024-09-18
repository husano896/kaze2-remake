import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, OnDestroy, ViewChild, viewChild } from '@angular/core';
import { Events } from '@/data/events';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '@/app/app.service';
import { Subject, firstValueFrom, } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss'
})
export class DialogueComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bg') bg!: ElementRef<HTMLDivElement>;
  @ViewChild('dialog') dialog!: ElementRef<HTMLDivElement>;
  @ViewChild('dragoncg') dragoncg!: ElementRef<HTMLImageElement>;
  @ViewChild('face') face!: ElementRef<HTMLImageElement>;

  public dialogStart$: Subject<any> = new Subject<any>();
  public dialogComplete$: Subject<any> = new Subject<any>();
  pendingTexts: string[] = [];
  textInterval?: any;

  /** 跳過事件的Callback, 若未設定時則無法跳過 */
  skipCallBack?: Function;

  constructor(private location: Location,
    public router: Router,
    public appServ: AppService,
    private translateServ: TranslateService) {
  }

  async ngAfterViewInit() {
    console.log(this.bg.nativeElement);

    const state = this.location.getState() as { event: string };
    if (state) {

      console.log('event', state.event)
      const ev = Events[state.event];
      if (ev) {
        setTimeout(() => {
          ev.bind(this)(this);
        }, 10)
      }
      else {
        alert('未指定Event或找不到Event!')
        this.router.navigate(['/']);
      }
    }
    this.SetInterval();
  }

  async ngOnDestroy() {
    clearInterval(this.textInterval);
  }

  onSkipClick() {
    if (!this.skipCallBack) {
      
    }
  }
  SetInterval(interval: number = 100) {
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
    this.textInterval = setInterval(() => {
      if (this.pendingTexts.length > 0) {
        if (this.pendingTexts[0] === '\n') {
          this.appServ.setMessageSE();
          return;
        }

        this.appServ.setMessageSE(true);
        this.dialog.nativeElement.innerText += this.pendingTexts.shift();
        this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
      } else {
        this.appServ.setMessageSE();
        this.dialogComplete$.next(0);
      }
    }, interval);
  }

  SetSkipCallback(callback: Function) {

  }
  
  Face = (c: string) => {
    this.face.nativeElement.src = `/assets/imgs/${c}.gif`;
  }

  ClearContent = () => {
    this.dialog.nativeElement.innerText = '';
  }

  Content = (c: string) => {
    this.setDialogOpticity(1);
    const r = (
      this.translateServ.instant(c, {
        ...this.appServ.saveData.talkingGO,
        ...this.appServ.saveData.talkingParam
      })
    );
    this.pendingTexts.push(...r);

    return firstValueFrom(this.dialogComplete$);
  }

  FastForward = () => {
    this.dialogStart$.next(0);
    if (this.pendingTexts.length == 0) {
      if (this.dialog.nativeElement.innerText.length > 0) {
        this.dialog.nativeElement.innerText +=
          `
`;
      }
      this.dialogComplete$.next(0);
      return;
    }
    let nextReturnPos = this.pendingTexts.findIndex(t => t === '\n');
    // -1時表示整句已經沒有下個換行符號，因此把剩下的文字都顯示
    if (nextReturnPos === -1) {
      nextReturnPos = this.pendingTexts.length
    }
    // 若nextReturnPos == 0時, 表示接下來的字就是換行符號，因此顯示換行符號後即會繼續顯示
    this.dialog.nativeElement.innerText += this.pendingTexts.splice(0, nextReturnPos || 1).join('');
    this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
  }

  isWaiting() {
    return this.pendingTexts.length === 0 || this.pendingTexts[0] === '\n';
  }
  IsContentComplete = () => {
    return this.pendingTexts.length === 0
  }
  setBG = (bg: string) => {
    this.bg.nativeElement.style.backgroundImage = `url(/assets/imgs/bg/${bg}.jpg)`
  }

  setDragonCG = (cg: string) => {
    this.dragoncg.nativeElement.src = `/assets/imgs/dragon/${cg}.gif`
  }
  setBGOpticity = (v: number) => {
    this.bg.nativeElement.style.backgroundColor = `rgba(0,0,0,${1.0 - v})`;
  }
  setDragonCGOpticity = (v: number) => {
    this.dragoncg.nativeElement.style.opacity = String(v);
  }
  setDialogOpticity = (v: number) => {
    this.dialog.nativeElement.style.opacity = String(v);
  }
}
