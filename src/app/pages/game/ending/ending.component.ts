import { AppService } from '@/app/app.service';
import { Endings } from '@/data/endings';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject, firstValueFrom, timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ending',
  standalone: true,
  imports: [RouterModule],
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
  endrollProcess = -window.innerHeight / 2;
  constructor(private location: Location, public router: Router, public appServ: AppService) {
  }
  async ngAfterViewInit() {
    console.log(this.bg.nativeElement);

    const state = this.location.getState() as { ending: string };
    if (state) {

      const ev = Endings[state.ending];
      if (!ev) {
        alert('未指定Event!')
        this.router.navigate(['/'])
        return;
      }
      await firstValueFrom(timer(1000));
      ev(this);

    }
    this.textInterval = setInterval(() => {
      if (this.pendingTexts.length > 0) {
        this.dialog.nativeElement.innerText += this.pendingTexts.shift();
        this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
      } else {
        this.dialogComplete$.next(0);
      }
    }, 200);
  }

  async ngOnDestroy() {
    clearInterval(this.textInterval);
  }

  Content(c: string) {
    this.pendingTexts.push(...c);
  }

  setBG(bg: string) {
    this.bg.nativeElement.style.backgroundImage = `url(/assets/imgs/bg/${bg}.jpg)`
  }
  setBGOpticity(v: number) {
    this.bg.nativeElement.style.backgroundColor = `rgba(0,0,0,${1.0 - v})`;
  }
  setDialogOpticity(v: number) {
    this.dialog.nativeElement.style.opacity = String(v);
  }

  startEndRoll() {
    clearInterval(this.textInterval);
    this.endroll.nativeElement.style.opacity = `1`;
    this.textInterval = setInterval(() => {
      this.endroll.nativeElement.style.transform = `translateY(${this.endrollProcess}px)`;
      this.endrollProcess -= 1;
      if (this.endrollProcess < -2600) {
        clearInterval(this.textInterval);
        this.dialogComplete$.next(0)
      }
    }, 20)
  }
}