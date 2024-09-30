import { AppService } from "@/app/app.service";
import { ViewChild, ElementRef, Directive, AfterViewInit, OnDestroy, OnInit, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject, firstValueFrom } from "rxjs";
@Directive()
export class DialogueSystem implements OnDestroy, AfterViewInit {

    /** 網頁上的#dialog文章元素，繼承DialogueSystem的Component必須實作此元素 */
    @ViewChild('dialog') dialog!: ElementRef<HTMLDivElement>;

    /** 網頁上的#face頭圖元素，繼承DialogueSystem的Component必須實作此元素 */
    @ViewChild('face') face!: ElementRef<HTMLImageElement>;

    /** 對話開始聆聽事件 */
    public dialogStart$: Subject<any> = new Subject<any>();
    /** 對話結束聆聽事件 */
    public dialogComplete$: Subject<any> = new Subject<any>();
    
    /** 已加入佇列，待顯示到畫面上的文字 */
    public pendingTexts: string[] = [];

    /** 對話是否已結束，會影響「▼」符號的顯示 */
    public contentCompleted?: boolean;

    /** 目前顯示中的文本 */
    public content: string = '';

    /** 給劇本用，因此設定為public */
    public appServ: AppService;
    
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
        this.SetDialogueInterval();
    }

    //#region 對話系統
    SetDialogueInterval(interval: number = 100) {
        if (this.textInterval) {
            clearInterval(this.textInterval);
        }
        this.textInterval = setInterval(() => {
            if (this.pendingTexts.length > 0) {
                if (this.pendingTexts[0] === '\n') {
                    this.appServ.setMessageSE();
                    return;
                }

                this.appServ.setMessageSE(true);
                this.content += this.pendingTexts.shift();
                if (!this.pendingTexts.length) {
                    this.content += '\n';
                }
                this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
            } else {
                this.appServ.setMessageSE();
                this.dialogComplete$.next(0);
            }
        }, interval);
    }

    /** 文章全部顯示完用，隱藏「▼」提醒玩家不會有後續對話 */
    SetContentCompleted = () => {
        this.contentCompleted = true;
    }

    /** 設定頭圖 */
    Face = (c: string) => {
        if (!c) {
            this.face.nativeElement.style.visibility = 'hidden';
            return;
        }
        this.face.nativeElement.src = `/assets/imgs/${c}.gif`;
        this.face.nativeElement.style.visibility = 'visible';
    }
    /** 清除文字 */
    ClearContent = () => {
        this.content = '';
    }

    /** 文章 */
    Content = (c: string) => {
        const r = this.translateServ.instant(c, this.appServ.saveData.talkingParam)
        this.pendingTexts.push(...r);
        this.pendingTexts.push('\n');
        this.contentCompleted = false;
        return firstValueFrom(this.dialogComplete$);
    }

    /** TODO: 對話選樣 */
    Options = (options: Array<any>) => {

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
        this.dialog.nativeElement.scrollTo({ top: this.dialog.nativeElement.scrollHeight });
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