import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  bgmEl?: ElementRef<HTMLAudioElement>;
  public loading: boolean = true;

  constructor() { }
  Init(bgmEl: ElementRef<HTMLAudioElement>) {
    this.bgmEl = bgmEl;
  }

  setBGM(bgm: string) {
    if (this.bgmEl) {
      this.bgmEl.nativeElement.src = `/assets/audio/bgm/${bgm}.mp3`
      this.bgmEl.nativeElement.play();
    }
  }

  async fadeIn() {
    document.querySelector('app-root')?.classList.add('anim-fadeIn')
    return new Promise((resolve) => setTimeout(() => {
      document.querySelector('app-root')?.classList.remove('anim-fadeIn')
      resolve(0);
    }, 3000));
  }
}
