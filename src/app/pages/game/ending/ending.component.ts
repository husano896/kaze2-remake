import { AppService } from '@/app/app.service';
import { Endings } from '@/data/endings';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject, firstValueFrom } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ending',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './ending.component.html',
  styleUrl: './ending.component.scss'
})
export class EndingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bg') bg!: ElementRef<HTMLDivElement>;
  @ViewChild('dialog') dialog!: ElementRef<HTMLDivElement>;
  @ViewChild('endroll') endroll!: ElementRef<HTMLDivElement>;

  public dialogComplete$: Subject<any> = new Subject<any>();
  pendingTexts: string[] = [];
  textInterval?: any;
  endrollProcess = 0;
  goodEnding?: boolean

  constructor(private readonly location: Location,
    public readonly router: Router,
    private readonly translateServ: TranslateService,
    public readonly appServ: AppService) {
  }

  async ngAfterViewInit() {
    console.log(this.bg.nativeElement);

    const state = this.location.getState() as { ending: string };
    if (state) {

      const ev = Endings[state.ending];
      if (!ev) {
        this.router.navigate(['/'])
        throw new Error('[Ending] 未指定Event或不存在！');
      }
      await this.appServ.Wait(1000);
      ev.bind(this)(this);

    }
    this.textInterval = setInterval(() => {
      if (this.pendingTexts.length > 0) {
        this.dialog.nativeElement.innerText += this.pendingTexts.shift();
        this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
      } else {
        this.dialogComplete$.next(0);
      }
    }, 150);
  }

  async ngOnDestroy() {
    clearInterval(this.textInterval);
  }

  Content = (c: string) => {
    this.pendingTexts.push(...(
      this.translateServ.instant(c, {
        ...this.appServ.saveData.talkingGO,
        ...this.appServ.saveData.talkingParam
      })
    ));
    return firstValueFrom(this.dialogComplete$);
  }

  Clear = () => {
    this.dialog.nativeElement.innerText = '';
  }
  setBG = (bg: string) => {
    this.bg.nativeElement.style.backgroundImage = `url(/assets/imgs/bg/${bg}.jpg)`
  }
  setBGOpticity = (v: number) => {
    this.bg.nativeElement.style.backgroundColor = `rgba(0,0,0,${1.0 - v})`;
  }
  setDialogOpticity = (v: number) => {
    this.dialog.nativeElement.style.opacity = String(v);
  }

  startEndRoll = () => {
    clearInterval(this.textInterval);
    this.endroll.nativeElement.style.opacity = `1`;
    this.textInterval = setInterval(() => {
      this.endroll.nativeElement.style.transform = `translateY(${this.endrollProcess}px)`;
      this.endrollProcess -= this.endroll.nativeElement.scrollHeight / 2000;
      if (this.endrollProcess < -this.endroll.nativeElement.scrollHeight - this.endroll.nativeElement.clientHeight) {
        clearInterval(this.textInterval);
        this.dialogComplete$.next(0)
      }
    }, 30)
  }
}