import { EventFlag } from '@/data/EventFlag';
import { snd } from '@/data/snd';
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
export class AppService implements ErrorHandler {
  static registered: boolean;
  /** 背景音樂元素 */
  public static bgmEl?: ElementRef<HTMLAudioElement>;

  /** 效果音元素 */
  public static seEl?: ElementRef<HTMLAudioElement>;

  /** 環境音元素 */
  public static ambientEl?: ElementRef<HTMLAudioElement>;

  /** 對話音元素 */
  public static messageSEEl?: ElementRef<HTMLAudioElement>;

  /** 讀取旗標 */
  public loading: boolean = true;

  /** Debug旗標 */
  public debug?: boolean;

  /** 遊戲存檔 */
  public saveData: SaveData = new SaveData();

  /** 創龍曆展示中 */
  public Ray1Open: boolean = false;

  public settingsOn?: boolean;
  // Ray7對應
  public noticeTitle: string = '';
  public noticeContent: string = '';

  // Ray8對應
  public confirmTitle: string = '';
  public confirmContent: string = '';
  public confirmStyle?: boolean;
  private confirmResolver?: Function;
  //
  private static error: any[] = [];

  constructor(
    private translateServ: TranslateService,
    private router: Router,
    private swUpdate: SwUpdate) {

    // 因為ErrorHandler也會註冊實例，避免重複註冊
    if (!AppService.registered) {
      this.swUpdate.unrecoverable.subscribe(ev => {

        if (ev.type === 'UNRECOVERABLE_STATE') {
          this.ForceUpdate().then(() => {
            alert('Local version broken, refreshing.')
            location.reload()
          });
        }
      })
      this.swUpdate.versionUpdates.subscribe((ev) => {
        if (ev.type === 'VERSION_DETECTED') {
          alert('New version detected')
        }
        else if (ev.type === 'VERSION_READY') {
          alert('New version installed, refreshing.')
          location.reload()
        }
      })
      AppService.registered = true;
    }

    // 在網站生成階段時給予localhost Debug標籤才有效
    if (window.location.href.includes('localhost')) {
      this.debug = true;
    }
    this.saveData = SaveData.Load();

  }

  handleError = (error: any) => {
    console.error(error);

    // NG0100: ExpressionChangedAfterItHasBeenCheckedError
    if (error?.code === -100) {
      return;
    }

    AppService.bgmEl?.nativeElement.pause();
    // AppService.seEl?.nativeElement.pause();
    AppService.ambientEl?.nativeElement.pause();
    AppService.messageSEEl?.nativeElement.pause();
    this.setSE('snd12');
    if (this.error.length === 0) {
      alert('An error has occurred, returning to homepage.');
      this.router.navigate(['/'])
    }
    this.error.push(error);
    console.error(this.error);

  }

  //#region 因從ErrorHandler跟providedIn root的service為兩個實例, 將error存成靜態
  set error(v) {
    AppService.error = v;
  }
  get error() {
    return AppService.error;
  }
  //#endregion

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
    AppService.bgmEl = bgmEl;
    AppService.seEl = seEl;
    AppService.ambientEl = ambientEl;
    AppService.messageSEEl = messageSEEl;
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
    if (!AppService.messageSEEl) {
      return;
    }
    if (v) {
      if (AppService.messageSEEl.nativeElement.paused) {
        AppService.messageSEEl.nativeElement.currentTime = 0;
        AppService.messageSEEl.nativeElement.play()
      }
    } else if (!AppService.messageSEEl.nativeElement.paused) {
      AppService.messageSEEl.nativeElement.pause();
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
    if (!AppService.bgmEl?.nativeElement) {
      return;
    }
    if (!bgm?.length) {
      if (!AppService.bgmEl.nativeElement.paused) {
        AppService.bgmEl?.nativeElement.pause()
      }
      return;
    }
    if (!AppService.bgmEl.nativeElement.src.includes(bgm)) {
      AppService.bgmEl.nativeElement.src = `/assets/audio/bgm/${bgm}.mp3`
      AppService.bgmEl.nativeElement.play();
    }

  }

  setSE = (se?: string | null | undefined) => {
    if (!AppService.seEl?.nativeElement) {
      return;
    }

    if (!se?.length) {

      if (!AppService.seEl.nativeElement.paused) {
        AppService.seEl?.nativeElement.pause()
      }
      return;
    }

    const s = snd[se];
    if (!s) {
      console.warn('尚未支援的音效：', se)
      return;
    }
    AppService.seEl.nativeElement.src = `/assets/audio/se/${s.f}`
    AppService.seEl.nativeElement.currentTime = 0;
    AppService.seEl.nativeElement.loop = s.loop;
    AppService.seEl.nativeElement.play();

  }

  setAmbient = (am?: string | null | undefined) => {
    if (!AppService.ambientEl?.nativeElement) {
      return;
    }

    if (!am?.length) {
      if (!AppService.ambientEl.nativeElement.paused) {
        AppService.ambientEl?.nativeElement.pause()
      }
      return;
    }

    const s = snd[am];
    if (!s) {
      console.warn('尚未支援的音效：', am)
      return;
    }

    if (AppService.ambientEl) {
      AppService.ambientEl.nativeElement.src = `/assets/audio/se/${s.f}`
      AppService.ambientEl.nativeElement.play();
      AppService.ambientEl.nativeElement.loop = s.loop;
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

  isAudioON(): boolean {
    if (!AppService.bgmEl) {
      return false;
    }
    return !AppService.bgmEl.nativeElement.muted;
  }

  toggleAudio() {
    if (!AppService.bgmEl || !AppService.seEl || !AppService.ambientEl || !AppService.messageSEEl) {
      return;
    }
    AppService.bgmEl.nativeElement.muted = this.isAudioON();
    AppService.ambientEl.nativeElement.muted = AppService.bgmEl.nativeElement.muted;
    AppService.seEl.nativeElement.muted = AppService.bgmEl.nativeElement.muted;
    AppService.messageSEEl.nativeElement.muted = AppService.bgmEl.nativeElement.muted;
    if (AppService.bgmEl.nativeElement.paused) {
      AppService.bgmEl.nativeElement.play()
    }
    if (AppService.ambientEl.nativeElement.paused) {
      AppService.ambientEl.nativeElement.play()
    }
  }

}
