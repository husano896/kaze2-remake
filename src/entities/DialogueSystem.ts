import { AppService, RootAnimations } from "@/app/app.service";
import { Location } from '@angular/common';
import { ViewChild, ElementRef, Directive, AfterViewInit, OnDestroy, Injector, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject, firstValueFrom } from "rxjs";
import * as _ from 'lodash-es';

@Directive()
export class DialogueSystem implements OnDestroy, AfterViewInit {

    /** 網頁上的#dialog文章元素，繼承DialogueSystem的Component必須實作此元素 */
    @ViewChild('dialog') dialog!: ElementRef<HTMLDivElement>;

    /** 對話結束聆聽事件 */
    public dialogComplete$: Subject<any> = new Subject<any>();

    /** 對話結束聆聽事件 */
    private readonly optionSelect$: Subject<{ index: number, value: string }> = new Subject<{ index: number, value: string }>()

    /** 已加入佇列，待顯示到畫面上的文字 */
    public pendingTexts: string[] = [];

    /** 對話是否已結束，會影響「▼」符號的顯示 */
    public contentCompleted?: boolean;

    /** 目前顯示中的文本 */
    public content: string = '';

    /** 給劇本用，因此設定為public */
    public appServ: AppService;

    /** 對話選項 */
    public options: Array<string> | null | undefined = new Array();

    public faceSrc: string = '';

    /** 表情, 為1~6 */
    public emoji: number = 0;

    /** 翻譯Service */
    protected translateServ: TranslateService;

    /** 文本輸入字Interval */
    private textInterval?: any;

    /** 是否換行時跳過按鍵等待 */
    public skipWait?: boolean;

    /** 指向時的提示文字 */
    doc: string = '';

    /** 目前位置以及位置資訊，例如lv, debugMenu */
    public readonly location: Location;
    public changeDetectionRef!: ChangeDetectorRef;

    constructor(injector: Injector) {
        this.appServ = injector.get(AppService);
        this.translateServ = injector.get(TranslateService);
        this.changeDetectionRef = injector.get(ChangeDetectorRef);

        this.location = injector.get(Location);
    }

    ngOnDestroy(): void {
        clearInterval(this.textInterval);
        this.appServ.setMessageSE(false);
    }

    ngAfterViewInit(): void {
        const interval = this.appServ.textSpeed * 100;
        this.SetDialogueInterval(interval);
    }

    setDialogueSE = (fileName = 'snd04') => {
        this.appServ.setMessageSE(false, fileName)
    }

    //#region 對話系統
    SetDialogueInterval(interval: number = 100) {
        if (this.textInterval) {
            clearInterval(this.textInterval);
        }
        this.textInterval = setInterval(() => {
            if (this.pendingTexts.length > 0) {
                // 有換行符號時點擊，但是出現選項時繼續讓文章跑完
                if (!this.skipWait
                    && (this.pendingTexts[0] === '\r' || this.pendingTexts[0] === '\n' || this.pendingTexts[0] === '\r\n')
                    && !this.options?.length
                    && interval > 10) {
                    this.appServ.setMessageSE();
                    return;
                }

                this.appServ.setMessageSE(true);
                this.content += this.pendingTexts.shift();
                if (!this.pendingTexts.length) {
                    this.content += '\r\n';
                }
                // 若對話還在進行，進行捲動
                if (this.dialog?.nativeElement) {
                    this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
                }
            } else {
                this.appServ.setMessageSE();
                this.dialogComplete$.next(0);
                if (!this.contentCompleted) {
                    this.SetContentCompleted();
                }
            }
        }, interval);
    }

    /** 文章全部顯示完用，隱藏「▼」提醒玩家不會有後續對話 */
    SetContentCompleted = () => {
        if (this.dialog?.nativeElement) {
            this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
        }
        this.contentCompleted = true;
        this.appServ.setMessageSE();
    }

    /** 設定頭圖 */
    Face = (c?: string) => {
        this.faceSrc = (c && c.length > 0) ? `/assets/imgs/${c}.gif` : '';
    }

    /** 角色表情 */
    Emoji = (e?: number) => {
        this.emoji = e ?? 0;
    };

    /** 設定心情與友好度 */
    EmojiAndAdjustLove = (e: number) => {
        this.ClearContent();
        const emojiId = e % 10;
        let result = '[' + this.translateServ.instant("Scripts.EffectStatusLove")
        switch (emojiId) {
            case 1:	// 場違い返答
                this.appServ.saveData.love -= 30;
                result += "↓]";
                break;

            case 2:	// 怒る
                this.appServ.saveData.love -= 40;
                result += "↓]";
                break;

            case 3:	// 理解不能
                result += "→]";
                break;

            case 4:	// 喜ぶ
                this.appServ.saveData.love += 5;
                result += "↑]";
                break;

            case 5:	// 驚く
                result += "→]";
                break;

            case 6:	// 凹む
                this.appServ.saveData.love -= 50;
                result += "↓↓]";
                break;
        }
        this.Content(result);
        // 原版中若表情符號ID > 0 則不顯示表情
        if (e >= 10) {
            return;
        }
        this.emoji = emojiId;

    }
    /** 清除文字 */
    ClearContent = (crash?: boolean) => {
        this.content = '';
        this.pendingTexts = [];
        this.options = [];
        if (crash) {
            this.dialogComplete$.error(0);
        }
    }

    /** 文章 */
    Content = (c: string, exParam?: { [param: string]: string }) => {
        // 若字串長度過長，先清空
        if (this.content.length > 10000) {
            this.content = '';
        }
        if (c) {
            const r = this.translateServ.instant(c, {
                ...this.appServ.saveData.talkingParam,
                ...(exParam ? _.mapValues(exParam, (translateKey: string) => (translateKey ? this.appServ.t(translateKey) : '')) : {})
            })
            this.pendingTexts.push(...r);
        }
        this.pendingTexts.push('\r\n');
        this.contentCompleted = false;
        return firstValueFrom(this.dialogComplete$);
    }

    /** 對話選擇選項 */
    Options = (options: Array<string>) => {
        this.options = options.map(o => this.translateServ.instant(o, this.appServ.saveData.talkingParam));
        return firstValueFrom(this.optionSelect$);
    }

    /** 選項選擇完畢 */
    onOptionClick = (index: number, value: string) => {
        this.optionSelect$.next({ index, value });
        this.options = null;
    }

    /** 點擊對話框的快轉 */
    FastForward() {
        if (this.pendingTexts.length == 0) {
            this.dialogComplete$.next(0);
            this.SetContentCompleted();
            return;
        }
        let nextReturnPos = this.pendingTexts.findIndex(t => t === '\n' || t === '\r' || t === '\r\n');
        // -1時表示整句已經沒有下個換行符號，因此把剩下的文字都顯示
        if (nextReturnPos === -1) {
            nextReturnPos = this.pendingTexts.length
        }
        // 若nextReturnPos == 0時, 表示接下來的字就是換行符號，因此顯示換行符號後即會繼續顯示
        this.content += this.pendingTexts.splice(0, nextReturnPos || 1).join('');
        this.changeDetectionRef.detectChanges();
        if (this.dialog?.nativeElement) {
            this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
        }
    }

    /** 是否等待下一句對話 */
    isWaiting() {
        return this.pendingTexts.length === 0 || this.pendingTexts[0] === '\n' || this.pendingTexts[0] === '\r' || this.pendingTexts[0] === '\r\n';
    }

    /** 是否對話已完成 */
    IsContentComplete = () => {
        return this.pendingTexts.length === 0
    }

    hideLayer = (layer: string) => {
        const el = document.querySelector(`#${layer}`) as HTMLElement
        if (el) {
            el.style.visibility = 'hidden';
        } else {
            console.warn(`[hideLayer]指定的Layer ${layer}不存在！`)
            console.trace();
        }
    }

    Anim = async (layer: string, animName: RootAnimations, duration: number, func: string = 'linear') => {
        const el = document.querySelector(`#${layer}`) as HTMLElement
        if (el) {
            el.classList.add(`anim-${animName}`)
            el.style.animationTimingFunction = func;
            el.style.animationDuration = `${duration}ms`;
            await this.appServ.Wait(duration)
            el.classList.remove(`anim-${animName}`);
        } else {
            console.warn(`[hideLayer]指定的Layer ${layer}不存在！`)
            console.trace();
        }
    }
    abs(n: number) {
        return Math.abs(n)
    }

    /** 講話參數, 用於日文句尾稱呼 */
    get talkingParam() {
        return this.appServ.saveData.talkingParam;
    }
    //#endregion

}