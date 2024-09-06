import { AfterViewInit, Component, ElementRef, Injector, ViewChild, viewChild } from '@angular/core';
import { Events } from '../../../events';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss'
})
export class DialogueComponent implements AfterViewInit {
  @ViewChild('bg') bg!: ElementRef<HTMLImageElement>;
  constructor(private location: Location, public router: Router, public appServ: AppService) {
  }
  ngAfterViewInit(): void {
    console.log(this.bg.nativeElement);

    const state = this.location.getState() as { event: string };
    if (state) {

      const ev = Events[state.event];
      if (ev) {
        ev(this);
      }
      else {
        alert('未指定Event!')
      }
    }
  }
  setBG(bg: string) {
    this.bg.nativeElement.src = `/assets/imgs/bg/${bg}.jpg`
    console.log(bg);
  }
}
