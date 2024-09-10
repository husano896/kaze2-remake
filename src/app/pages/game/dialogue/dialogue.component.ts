import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, ViewChild, viewChild } from '@angular/core';
import { Events } from '@/data/events';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { Subject, firstValueFrom, timer } from 'rxjs';
@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss'
})
export class DialogueComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bg') bg!: ElementRef<HTMLDivElement>;
  @ViewChild('dialog') dialog!: ElementRef<HTMLDivElement>;
  @ViewChild('dragoncg') dragoncg!: ElementRef<HTMLImageElement>;
  public dialogComplete$: Subject<any> = new Subject<any>();
  pendingTexts: string[] = [];
  textInterval?: any;
  constructor(private location: Location, public router: Router, public appServ: AppService) {
  }
  async ngAfterViewInit() {
    console.log(this.bg.nativeElement);

    const state = this.location.getState() as { event: string };
    if (state) {

      const ev = Events[state.event];
      if (ev) {
        await firstValueFrom(timer(1000));
        ev(this);
      }
      else {
        alert('未指定Event!')
      }
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
    this.setDialogOpticity(1);
    this.pendingTexts.push(...c);
  }
  
  FastForward() {
    this.dialog.nativeElement.innerText += this.pendingTexts.join('');
    this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
    this.dialogComplete$.next(0);

  }
  IsContentComplete() {
    return this.pendingTexts.length === 0
  }
  setBG(bg: string) {
    this.bg.nativeElement.style.backgroundImage = `url(/assets/imgs/bg/${bg}.jpg)`
  }
  setDragonCG(cg: string) {
    this.dragoncg.nativeElement.src = `/assets/imgs/dragon/${cg}.gif`
  }
  setBGOpticity(v: number) {
    this.bg.nativeElement.style.backgroundColor = `rgba(0,0,0,${1.0 - v})`;
  }
  setDragonCGOpticity(v: number) {
    this.dragoncg.nativeElement.style.opacity = String(v);
  }
  setDialogOpticity(v: number) {
    this.dialog.nativeElement.style.opacity = String(v);
  }
}
