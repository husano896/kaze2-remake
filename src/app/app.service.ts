import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  /** 背景音樂元素 */
  public bgmEl?: ElementRef<HTMLAudioElement>;

  /** 效果音元素 */
  public seEl?: ElementRef<HTMLAudioElement>;

  /** 環境音元素 */
  public ambientEl?: ElementRef<HTMLAudioElement>;

  /** 讀取旗標 */
  public loading: boolean = true;

  /** Debug旗標 */
  public debugEnabled?: boolean;

  
  constructor() {
    // 在網站生成階段時給予localhost Debug標籤才有效
    if (window.location.href.includes('localhost')) {
      this.debugEnabled = true;
    }
  }

  isDebug(): boolean {
    return Boolean(this.debugEnabled);
  }

  /** 將生成的元素與Service綁定 */
  Init({ bgmEl, seEl, ambientEl }: { bgmEl: ElementRef<HTMLAudioElement>, seEl: ElementRef<HTMLAudioElement>, ambientEl: ElementRef<HTMLAudioElement> }) {
    this.bgmEl = bgmEl;
    this.seEl = seEl;
    this.ambientEl = ambientEl;
  }

  async Dialog(): Promise<number> {
    return new Promise((resolve)=>{

    });
  }
  setBGM(bgm?: string) {
    if (!bgm?.length) {
      this.bgmEl?.nativeElement.pause()
      return;
    }
    if (this.bgmEl) {
      this.bgmEl.nativeElement.src = `/assets/audio/bgm/${bgm}.mp3`
      this.bgmEl.nativeElement.play();
    }
  }
  setSE(se?: string) {
    if (!se?.length) {
      this.bgmEl?.nativeElement.pause()
      return;
    }
    if (this.seEl) {
      this.seEl.nativeElement.src = `/assets/audio/se/${se}.mp3`
      this.seEl.nativeElement.play();
    }
  }
  setAmbient(am?: string) {
    if (!am?.length) {
      this.bgmEl?.nativeElement.pause()
      return;
    }
    if (this.ambientEl) {
      this.ambientEl.nativeElement.src = `/assets/audio/se/${am}.mp3`
      this.ambientEl.nativeElement.play();
    }
  }

  async fadeOut() {
    document.querySelector('app-root')?.classList.add('anim-fadeOut')
    return new Promise((resolve) => setTimeout(() => {
      document.querySelector('app-root')?.classList.remove('anim-fadeOut')
      resolve(0);
    }, 3000));
  }

  async fadeIn() {
    document.querySelector('app-root')?.classList.add('anim-fadeIn')
    return new Promise((resolve) => setTimeout(() => {
      document.querySelector('app-root')?.classList.remove('anim-fadeIn')
      resolve(0);
    }, 3000));
  }
}
