import { EventFlag } from '@/data/EventFlag';
import { snd } from '@/data/snd';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { SaveData } from '@/entities/SaveData';
import { ChangeDetectorRef, ElementRef, ErrorHandler, Injectable, ɵformatRuntimeError } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, timer } from 'rxjs';

export enum RootAnimations {
  FadeIn = 'fadeIn',
  FadeOut = 'fadeOut'
}

@Injectable({
  providedIn: 'root'
})

export class AppService implements ErrorHandler {

  /** 背景音樂元素 */
  public bgmEl?: ElementRef<HTMLAudioElement>;

  /** 效果音元素 */
  public seEl?: ElementRef<HTMLAudioElement>;

  /** 環境音元素 */
  public ambientEl?: ElementRef<HTMLAudioElement>;

  /** 對話音元素 */
  public messageSEEl?: ElementRef<HTMLAudioElement>;

  /** 讀取旗標 */
  public loading: boolean = true;

  /** Debug旗標 */
  public debug?: boolean;

  /** 遊戲存檔 */
  public saveData: SaveData = new SaveData();

  /** 創龍曆展示中 */
  public Ray1Open: boolean = false;

  public noticeTitle: string = '';
  public noticeContent: string = '';

  public error: any;

  constructor(private translateServ: TranslateService, private router: Router) {
    // 在網站生成階段時給予localhost Debug標籤才有效
    if (window.location.href.includes('localhost')) {
      this.debug = true;
    }
    this.Load();
  }

  handleError = (error: any) => {
    console.error(error);
    // NG0100: ExpressionChangedAfterItHasBeenCheckedError
    if (error?.code === -100) {
      return;
    }
    console.log(error.code, error.messge);
    alert('An error has occurred, returning to homepage.');
    this.error = error;
    this.router.navigate(['/'])
  }

  /** 將生成的元素與Service綁定 */
  Init = ({ bgmEl, seEl, ambientEl, messageSEEl }: {
    bgmEl: ElementRef<HTMLAudioElement>,
    seEl: ElementRef<HTMLAudioElement>,
    ambientEl: ElementRef<HTMLAudioElement>,
    messageSEEl: ElementRef<HTMLAudioElement>,
  }) => {
    this.bgmEl = bgmEl;
    this.seEl = seEl;
    this.ambientEl = ambientEl;
    this.messageSEEl = messageSEEl;
    bgmEl.nativeElement.volume = 0.5;
    seEl.nativeElement.volume = 0.4;
    ambientEl.nativeElement.volume = 0.3;
    
    console.log(`[AppService] 綁定聲音元素：\r\n`,
      'BGM', bgmEl, '\r\n',
      'SE', seEl, '\r\n',
      'Ambient', ambientEl, '\r\n',
      '[AppService] 自體', this, '\r\n'
    )
  }

  Dialog = async () => {
    return new Promise((resolve) => {

    });
  }

  setMessageSE(v?: boolean) {
    if (!this.messageSEEl) {
      return;
    }
    if (v) {
      if (this.messageSEEl.nativeElement.paused) {
        this.messageSEEl.nativeElement.play()
      }
    } else if (!this.messageSEEl.nativeElement.paused) {
      this.messageSEEl.nativeElement.pause();
    }
  }
  // Ray7對應
  setNotice = (title?: string, content?: string) => {
    this.noticeTitle = title ?? '';
    this.noticeContent = content ?? '';
  }


  setBGM = (bgm?: string | null | undefined) => {
    if (!this.bgmEl?.nativeElement) {
      return;
    }
    if (!bgm?.length) {
      if (!this.bgmEl.nativeElement.paused) {
        this.bgmEl?.nativeElement.pause()
      }
      return;
    }
    this.bgmEl.nativeElement.src = `/assets/audio/bgm/${bgm}.mp3`
    this.bgmEl.nativeElement.play();

  }

  setSE = (se?: string | null | undefined) => {
    if (!this.seEl?.nativeElement) {
      return;
    }

    if (!se?.length) {

      if (!this.seEl.nativeElement.paused) {
        this.seEl?.nativeElement.pause()
      }
      return;
    }

    const s = snd[se];
    if (!s) {
      console.warn('尚未支援的音效：', se)
      return;
    }
    this.seEl.nativeElement.src = `/assets/audio/se/${s.f}`
    this.seEl.nativeElement.currentTime = 0;
    this.seEl.nativeElement.loop = s.loop;
    this.seEl.nativeElement.play();

  }

  setAmbient = (am?: string | null | undefined) => {
    if (!this.ambientEl?.nativeElement) {
      return;
    }

    if (!am?.length) {
      if (!this.ambientEl.nativeElement.paused) {
        this.ambientEl?.nativeElement.pause()
      }
      return;
    }

    const s = snd[am];
    if (!s) {
      console.warn('尚未支援的音效：', am)
      return;
    }

    if (this.ambientEl) {
      this.ambientEl.nativeElement.src = `/assets/audio/se/${s.f}`
      this.ambientEl.nativeElement.play();
      this.ambientEl.nativeElement.loop = s.loop;
    }
  }

  Anim = async (animName: string, length = 3000) => {
    document.querySelector('app-root')?.classList.add(`anim-${animName}`)
    await this.Wait(length)
    document.querySelector('app-root')?.classList.remove(`anim-${animName}`)
  };

  Wait = async (time: number) => {
    return firstValueFrom(timer(time))
  }
  Save = () => {
    localStorage.setItem(LocalStorageKey.save, JSON.stringify(this.saveData));
    console.log('[SaveData]存檔：', this.saveData);
  }

  Load = () => {
    const s = localStorage.getItem(LocalStorageKey.save);
    if (!s) {
      return;
    }
    try {
      const o = JSON.parse(s);
      Object.entries(o).forEach(([key, v]) => {
        (this.saveData as any)[key] = v;
      });

      console.log(`[SaveDate] 讀取存檔：`, this.saveData);
    } catch (err) {
      console.warn(`[SaveDate] 讀取存檔失敗：`, err);
      this.saveData = new SaveData();
    }
  }

  t = (key: string, param?: any) => {
    return this.translateServ.get(key, {
      ...this.saveData.talkingGO,
      ...this.saveData.talkingParam,
      ...(param ? param : {})
    })
  };

  /** 是否為二週目新開場 */
  get newGamePlus() {
    return (this.saveData.ivent & EventFlag.周目通關) && this.saveData.numVisits === -1;
  }

  /** 龍日曆開場 */
  toggleRay1 = async () => {

    this.Ray1Open = true;
    await this.Wait(5000);
    this.Ray1Open = false;
  }

  setLastLogin = (time?: number) => {
    this.saveData.lastLogin = time || new Date().getTime();
  }

  get lastLogin() {
    return new Date(this.saveData.lastLogin);
  }

  get waitTimeMinutes() {
    return Math.floor((new Date().getTime() - (this.saveData.lastLogin || 0)) / 60000);
  }

  get waitTimeHours() {
    return Math.floor(this.waitTimeMinutes / 60);
  }
}
