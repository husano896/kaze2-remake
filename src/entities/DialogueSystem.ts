import { AppService } from "@/app/app.service";
import { ViewChild, ElementRef, Directive, AfterViewInit, OnDestroy, OnInit, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject, firstValueFrom } from "rxjs";
import _ from 'lodash-es';
@Directive()
export class DialogueSystem implements OnDestroy, AfterViewInit {

    /** 網頁上的#dialog文章元素，繼承DialogueSystem的Component必須實作此元素 */
    @ViewChild('dialog') dialog!: ElementRef<HTMLDivElement>;

    /** 對話開始聆聽事件 */
    public dialogStart$: Subject<any> = new Subject<any>();

    /** 對話結束聆聽事件 */
    public dialogComplete$: Subject<any> = new Subject<any>();

    /** 對話結束聆聽事件 */
    public optionSelect$: Subject<{ index: number, value: string }> = new Subject<{ index: number, value: string }>()

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

    constructor(injector: Injector) {
        this.appServ = injector.get(AppService);
        this.translateServ = injector.get(TranslateService);
    }

    ngOnDestroy(): void {
        clearInterval(this.textInterval);
    }

    ngAfterViewInit(): void {
        const interval = this.appServ.textSpeed * 100;
        this.SetDialogueInterval(interval);
    }

    //#region 對話系統
    SetDialogueInterval(interval: number = 100) {
        if (this.textInterval) {
            clearInterval(this.textInterval);
        }
        this.textInterval = setInterval(() => {
            if (this.pendingTexts.length > 0) {
                // 有換行符號時點擊，但是出現選項時繼續讓文章跑完
                if (this.pendingTexts[0] === '\n' && !this.options?.length && interval > 10) {
                    this.appServ.setMessageSE();
                    return;
                }

                this.appServ.setMessageSE(true);
                this.content += this.pendingTexts.shift();
                if (!this.pendingTexts.length) {
                    this.content += '\n';
                }
                if (this.dialog?.nativeElement) {
                    this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
                }
            } else {
                this.appServ.setMessageSE();
                this.dialogComplete$.next(0);
            }
        }, interval);
    }

    /** 文章全部顯示完用，隱藏「▼」提醒玩家不會有後續對話 */
    SetContentCompleted = () => {
        if (this.dialog?.nativeElement) {
            this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
        }
        this.contentCompleted = true;
    }

    /** 設定頭圖 */
    Face = (c: string) => {
        this.faceSrc = c.length > 0 ? `/assets/imgs/${c}.gif` : '';
    }

    Emoji = (e: number) => {
        this.emoji = e;
    };

    /** TODO: 設定心情與友好度 */
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
                // if (numVisits == 40) ivent |= 32;	// 猫イベント許可
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
        // outputLAYER('Ray6', "<IMG src='image/mark_" + ref[varAns] + ".gif'>");

    }
    /** 清除文字 */
    ClearContent = () => {
        this.content = '';
        this.pendingTexts = [];
    }

    /** 文章 */
    Content = (c: string, exParam?: { [param: string]: string }) => {
        const r = this.translateServ.instant(c, {
            ...this.appServ.saveData.talkingParam,
            ...(exParam ? _.mapValues(exParam, (translateKey: string) => this.appServ.t(translateKey)) : {})
        })
        this.pendingTexts.push(...r);
        this.pendingTexts.push('\r\n');
        this.contentCompleted = false;
        return firstValueFrom(this.dialogComplete$);
    }

    /** TODO: 對話選樣 */
    Options = (options: Array<string>) => {
        this.options = options.map(o => this.translateServ.instant(o, this.appServ.saveData.talkingParam));
        return firstValueFrom(this.optionSelect$);
    }

    onOptionClick = (index: number, value: string) => {
        console.log(this.dialogComplete$);
        this.optionSelect$.next({ index, value });
        this.options = null;
    }

    /** 點擊對話框的快轉 */
    FastForward = () => {
        this.dialogStart$.next(0);
        if (this.pendingTexts.length == 0) {
            this.dialogComplete$.next(0);
            return;
        }
        let nextReturnPos = this.pendingTexts.findIndex(t => t === '\n');
        // -1時表示整句已經沒有下個換行符號，因此把剩下的文字都顯示
        if (nextReturnPos === -1) {
            nextReturnPos = this.pendingTexts.length
        }
        // 若nextReturnPos == 0時, 表示接下來的字就是換行符號，因此顯示換行符號後即會繼續顯示
        this.content += this.pendingTexts.splice(0, nextReturnPos || 1).join('');
        if (this.dialog?.nativeElement) {
            this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
        }
    }

    /** 是否等待下一句對話 */
    isWaiting() {
        return this.pendingTexts.length === 0 || this.pendingTexts[0] === '\n';
    }

    /** 是否對話已完成 */
    IsContentComplete = () => {
        return this.pendingTexts.length === 0
    }

    /** 講話參數, 用於日文句尾稱呼 */
    get talkingParam() {
        return this.appServ.saveData.talkingParam;
    }

    //#endregion

}