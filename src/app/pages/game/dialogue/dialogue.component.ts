import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, ViewChild } from '@angular/core';
import { Events } from '@/data/events';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, EventType, Router, RouterModule } from '@angular/router';
import { DialogueSystem } from '@/entities/DialogueSystem';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss'
})
export class DialogueComponent extends DialogueSystem implements AfterViewInit, OnDestroy {
  @ViewChild('bg') bg!: ElementRef<HTMLDivElement>;
  @ViewChild('dragoncg') dragoncg!: ElementRef<HTMLImageElement>;

  /** 跳過事件的Callback, 若未設定時則無法跳過 */
  skipCallBack?: Function;

  routerSubscription?: Subscription;
  constructor(injector: Injector, public readonly location: Location,
    public route: ActivatedRoute, public router: Router) {
    super(injector);
  }

  override async ngAfterViewInit() {

    super.ngAfterViewInit();
    console.log(this.bg.nativeElement);
    this.routerSubscription = this.router.events.pipe(debounceTime(100)).subscribe((ev) => {
      console.log('ev')
      const state = this.location.getState() as { event: string };
      if (state) {

        console.log('event', state.event)
        const ev = Events[state.event];
        if (ev) {
          ev.bind(this)(this);
          
        }
        else {
          this.router.navigate(['/'], { replaceUrl: true });
          throw new Error('[ERROR] 未指定Event或找不到Event!')
        }
      }
    })
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  async onSkipClick() {
    if (!this.skipCallBack) {
      this.appServ.Confirm(this.translateServ.instant('Scripts.Confirm.Title.Caution'), this.translateServ.instant('Noskip'))
      return;
    }

    if (await this.appServ.Confirm(
      this.translateServ.instant('Scripts.Confirm.Title.Caution'),
      this.translateServ.instant('Scripts.Confirm.ContentSkip'),
      true)) {
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

  AllFadeOut = async () => {
    this.setDialogOpticity(0);
    this.setDragonCGOpticity(0);
    this.setBGOpticity(0);
    this.Face()
    this.SetContentCompleted();
    this.ClearContent();
    await this.appServ.Wait(3000);
  }
}
