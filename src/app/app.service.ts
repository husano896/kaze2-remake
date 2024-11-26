import { BioFlag } from '@/data/BioFlag';
import { EventFlag } from '@/data/EventFlag';
import { snd } from '@/data/snd';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { SaveData } from '@/entities/SaveData';
import { ElementRef, ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, timer } from 'rxjs';

export enum RootAnimations {
  FadeIn = 'fadeIn',
  FadeOut = 'fadeOut'
}

@Injectable({
  providedIn: 'root'
})

// 語言更新：https://script.google.com/macros/s/AKfycbzLoAh5UiwgocMpwopJsRTpQkhBlbsqatHJxvk1BTd3vqxS3VG8B5S14tNjBNvsyQ35/exec
export class AppService {

  /** Service用, 被註冊的次數 */
  public static registeredTimes: number = 0;

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

  // Ray7對應
  public noticeTitle: string = '';
  public noticeContent: string = '';

  // Ray8對應
  public confirmTitle: string = '';
  public confirmContent: string = '';
  public confirmStyle?: boolean;
  private confirmResolver?: Function;

  /** 設定 */
  public settingsOn?: boolean;

  //
  public error: any[] = [];

  constructor(
    private readonly translateServ: TranslateService,
    private readonly swUpdate: SwUpdate) {

    // 因為ErrorHandler也會註冊實例，避免重複註冊
    if (!AppService.registeredTimes) {
      this.swUpdate.unrecoverable.subscribe(ev => {

        if (ev.type === 'UNRECOVERABLE_STATE') {
          this.ForceUpdate().then(() => {
            alert(this.translateServ.instant('ServiceWorker.UnRecoverable'))
            location.reload()
          });
        }
      })
      this.swUpdate.versionUpdates.subscribe((ev) => {
        if (ev.type === 'VERSION_DETECTED') {
          alert(this.translateServ.instant('ServiceWorker.VersionDetected'))
        }
        else if (ev.type === 'VERSION_READY') {
          alert(this.translateServ.instant('ServiceWorker.VersionReady'))
          location.reload()
        }
      })
      AppService.registeredTimes += 1;
    }
    else {
      console.warn('[AppService] 服務嘗試被重複註冊！')
    }
    // 在網站生成階段時給予localhost Debug標籤才有效
    if (window.location.search.includes('localhost')) {
      this.debug = true;
    }
    this.saveData = SaveData.Load();

  }

  /* 強制更新 */
  async ForceUpdate() {
    const removalPromises: Promise<any>[] = [];

    // 清除所有Cache
    if ('caches' in window) {
      const cacheKeys = await caches.keys();
      cacheKeys.forEach(key => {
        removalPromises.push(caches.delete(key));
      });
    }
    // 解除所有ServiceWorker
    if (window.navigator && navigator.serviceWorker) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      registrations.forEach(r => {
        removalPromises.push(r.unregister());
      });
    }
    await Promise.all(removalPromises);
    location.href = '/';
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
      'this', this, '\r\n'
    )
  }

  setMessageSE(v?: boolean) {
    if (!this.messageSEEl) {
      return;
    }
    if (v) {
      if (this.messageSEEl.nativeElement.paused) {
        this.messageSEEl.nativeElement.currentTime = 0;
        this.messageSEEl.nativeElement.play()
      }
    } else if (!this.messageSEEl.nativeElement.paused) {
      this.messageSEEl.nativeElement.pause();
    }
  }

  // Ray7對應
  setNotice = (title?: string, content?: string) => {
    this.noticeTitle = title ? this.translateServ.instant(title) : '';
    this.noticeContent = content ? this.translateServ.instant(content) : '';
  }

  // Ray8對應
  Confirm = async (title: string, content: string, confirmStyle?: boolean) => {
    this.confirmTitle = title;
    this.confirmContent = content;
    this.confirmStyle = confirmStyle;
    return new Promise(resolve => {
      this.confirmResolver = resolve;
    })
  }

  ConfirmResult(res?: number) {
    this.confirmResolver?.(res);
  }

  setBGM = (bgm?: string | null | undefined) => {
    if (!this.bgmEl?.nativeElement) {
      return;
    }
    if (!bgm?.length) {
      if (!this.bgmEl.nativeElement.paused) {
        this.bgmEl.nativeElement.src = '';
        this.bgmEl?.nativeElement.pause()
      }
      return;
    }
    if (!this.bgmEl.nativeElement.src.includes(bgm) || this.bgmEl.nativeElement.paused) {
      this.bgmEl.nativeElement.src = `/assets/audio/bgm/${bgm}.mp3`
      this.bgmEl.nativeElement.currentTime = 0;
      try {
        this.bgmEl.nativeElement.play();
      } finally {

      }
      this.bgmEl.nativeElement.onload = (() => {
        this.bgmEl?.nativeElement.play();
      }).bind(this)
    }

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
    const root = document.querySelector('app-root') as HTMLElement;
    if (!root) {
      return;
    }
    root.classList.add(`anim-${animName}`)
    root.style.animationDuration = `${length}ms`;
    await this.Wait(length)
    root.classList.remove(`anim-${animName}`)
  };

  Wait = async (time: number) => {
    return firstValueFrom(timer(time))
  }

  t = (key: string, param?: any) => {
    return this.translateServ.instant(key, {
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
  /** 是否為檢診日 */
  get isProgressLoveChk() {
    return (
      this.saveData?.numVisits % 10 === 0 &&
      ![0, 10, 100].includes(this.saveData?.numVisits)
    )
  }
  isAudioON(): boolean {
    if (!this.bgmEl) {
      return false;
    }
    return !this.bgmEl.nativeElement.muted;
  }

  toggleAudio() {
    if (!this.bgmEl || !this.seEl || !this.ambientEl || !this.messageSEEl) {
      return;
    }
    this.bgmEl.nativeElement.muted = this.isAudioON();
    this.ambientEl.nativeElement.muted = this.bgmEl.nativeElement.muted;
    this.seEl.nativeElement.muted = this.bgmEl.nativeElement.muted;
    this.messageSEEl.nativeElement.muted = this.bgmEl.nativeElement.muted;
    if (this.bgmEl.nativeElement.paused) {
      this.bgmEl.nativeElement.play()
    }
    if (this.ambientEl.nativeElement.paused) {
      this.ambientEl.nativeElement.play()
    }
  }

  get textSpeed() {
    const c = localStorage.getItem(LocalStorageKey.textSpeed) || "3";
    try {
      return Number(c)
    }
    catch (err) {
      return 3;
    }
  }
  set textSpeed(v: number) {
    localStorage.setItem(LocalStorageKey.textSpeed, String(v));
  }


}
