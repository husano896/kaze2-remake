import { EventFlag } from '@/data/EventFlag';
import { HowlAudio, SESprite } from '@/data/HowlAudio';
import { LocalStorageKey } from '@/entities/LocalStorageKey';
import { SaveData } from '@/entities/SaveData';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, timer } from 'rxjs';

export enum RootAnimations {
  FadeIn = 'fadeIn',
  FadeOut = 'fadeOut',
  PlayerDamage = 'playerDamage',
  Blinking = 'blinking',
  Shock = 'shock',
  SlideInFromLeft = 'slideInFromLeft',
  SlideInFromRight = 'slideInFromRight',
  SlideOutToLeft = 'slideOutToLeft',
  SlideOutToRight = 'slideOutToRight',
  // Quest09使用：被嚇跑後又從左邊偷看
  SlideOutToLeftPeek = 'slideOutToLeftPeek',
}

@Injectable({
  providedIn: 'root'
})

// 語言更新：https://script.google.com/macros/s/AKfycbzLoAh5UiwgocMpwopJsRTpQkhBlbsqatHJxvk1BTd3vqxS3VG8B5S14tNjBNvsyQ35/exec
export class AppService {

  /** Service用, 被註冊的次數 */
  public static registeredTimes: number = 0;

  /** 背景音樂元素 */
  // public bgmEl?: ElementRef<HTMLAudioElement>;

  public BGM?: Howl;
  public BGMString?: string | null;

  public SE?: Howl;
  public Ambient?: number; // Howl;
  public MessageSE?: Howl = HowlAudio.SE['snd04']; // number; // string = 'snd04'; //
  public MessageSEFileName: string = 'snd04'
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

  // Ray72對應
  public noticeTitle2: string = '';
  public noticeContent2: SafeHtml = '';

  // Ray8對應
  public confirmTitle: string = '';
  public confirmContent: string = '';
  public confirmStyle?: boolean;
  private confirmResolver?: Function;

  /** 設定 */
  public settingsOn?: boolean;

  //
  public error: any[] = [];

  /** 全景效果設定 */
  public RadialColor: string = '';
  public RadialRepeat?: boolean;
  public RadialInterval: string = '3s';

  public saveFailed?: boolean
  /**  */
  constructor(
    private readonly translateServ: TranslateService,
    private readonly swUpdate: SwUpdate,
    /** 就跟你說程式留漏洞會被入侵了吼（入侵事件捏他） */
    public sanitizer: DomSanitizer) {

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
    if (window.location.href.includes('localhost')) {
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


  setMessageSE(v?: boolean, fileName?: string) {

    /*
    if (fileName !== undefined) {
      if (this.MessageSE)
        SESprite.stop(this.MessageSE);
      this.MessageSE = SESprite.play(fileName || 'empty')
      this.MessageSEFileName = filename
    }
    if (v) {
      if (this.MessageSE) {
        this.MessageSE = SESprite.play(this.MessageSE)
      }
      else {
        console.log(fileName)
        this.MessageSE = SESprite.play(fileName !== undefined ? fileName : 'snd04')
      }
    } else if (this.MessageSE) {
      SESprite.pause(this.MessageSE)
    }
*/

    if (fileName !== undefined) {
      this.MessageSE?.stop();
      this.MessageSE = HowlAudio.SE[fileName]
    }

    // 設定為不存在的語音時不動作
    if (!this.MessageSE) {
      return;
    }

    if (v && this.MessageSE.playing()) {
      return;
    }
    this.MessageSE?.mute(false)
    this.MessageSE?.pause()
    if (v) {
      this.MessageSE?.loop(true)
      this.MessageSE?.play();
    } else {
      this.MessageSE?.pause();
    }

  }

  // Ray7對應
  setNotice = (title?: string, content?: string) => {
    this.noticeTitle = title ? this.translateServ.instant(title) : '';
    this.noticeContent = content ? this.translateServ.instant(content) : '';
  }

  setNotice2 = (title?: string, content?: string) => {
    this.noticeTitle2 = title ? this.translateServ.instant(title) : '';
    this.noticeContent2 = content ? this.sanitizer.bypassSecurityTrustHtml(this.translateServ.instant(content)) : '';
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

  getBGM() {
    return this.BGMString ?? '';
  }

  setBGM = (bgm?: string | null | undefined) => {
    if (this.BGM && (!bgm || this.BGM !== HowlAudio.BGM[bgm])) {
      this.BGM.loop(false);
      this.BGM.stop();
      this.BGM.off('load')
      this.BGM.unload();
    }
    this.BGMString = bgm;
    if (!bgm) {
      return
    }

    if (this.BGMString === bgm && this.BGM?.playing()) {
      return;
    }
    this.BGM = HowlAudio.BGM[bgm];
    if (!this.BGM) {
      return;
    }
    if (this.BGM.state() === 'loaded') {
      this.BGM.play()
      this.BGM?.loop(true)
    } else {
      this.BGM.load();
      this.BGM.once('load', () => {
        this.BGM?.seek(0);
        this.BGM?.loop(true)
        this.BGM?.play();
      });
    }
  }

  setSE = (se?: string | null | undefined) => {
    if (!se) {
      SESprite.stop();
      return;
    }
    /*
    this.SE = HowlAudio.SE[se];
    this.SE?.play();
    */
    SESprite.play(se);

  }

  setAmbient = (am?: string | null | undefined) => {
    if (this.Ambient) {
      SESprite.stop(this.Ambient);
    }
    // this.Ambient?.pause();
    if (!am) {
      return;
    }
    this.Ambient = SESprite.play('am')
    /*
    this.Ambient = HowlAudio.SE[am];
    this.Ambient?.loop(true);
    this.Ambient.play();
    */
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

  Wait = async (timeMs: number) => {
    return firstValueFrom(timer(timeMs))
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
  get AudioON() {
    return !(this.saveData?.ivent & EventFlag.開啟音樂);
  }

  toggleAudio() {
    if (this.saveData.ivent & EventFlag.開啟音樂) {
      this.saveData.ivent ^= EventFlag.開啟音樂;
    } else {
      this.saveData.ivent |= EventFlag.開啟音樂;
    }
    Howler.mute(!this.AudioON);
    this.setSE('snd10')

  }

  get textSpeed() {
    const c = localStorage.getItem(LocalStorageKey.textSpeed) ?? "1";
    try {
      return Number(c)
    }
    catch (err) {
      return 1;
    }
  }
  set textSpeed(v: number) {
    localStorage.setItem(LocalStorageKey.textSpeed, String(v));
  }


  get theme() {
    return localStorage.getItem(LocalStorageKey.theme) || '';
  }

  set theme(v: string) {
    if (v) {
      document.body.setAttribute('theme', v);
    } else {
      document.body.removeAttribute('theme')
    }
    localStorage.setItem(LocalStorageKey.theme, v);
  }

  radialTimeOut?: any;
  setRadialEffect = (RadialColor?: string, RadialRepeat?: boolean, RadialIntervalMs?: number) => {
    if (this.radialTimeOut) {
      this.RadialColor = '';
      clearTimeout(this.radialTimeOut)
    }
    this.RadialColor = RadialColor || '';
    this.RadialRepeat = RadialRepeat;
    this.RadialInterval = `${RadialIntervalMs}ms` || '3s';
    if (!RadialRepeat) {
      this.radialTimeOut = setTimeout(() => { this.RadialColor = '' }, RadialIntervalMs);
    }
  }
}
