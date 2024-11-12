import { ErrorHandler, Injectable } from "@angular/core";
import { AppService } from "./app.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AppErrorHandler implements ErrorHandler {
    constructor(private readonly appService: AppService, private readonly router: Router) {}
    
    handleError = (error: any) => {
        console.error(error);

        // NG0100: ExpressionChangedAfterItHasBeenCheckedError
        if (error?.code === -100) {
            return;
        }

        this.appService.setBGM()
        this.appService.setAmbient()
        this.appService.setMessageSE()

        // 播放告警音
        this.appService.setSE('snd12');

        console.error(error);
        this.appService.error.push(error);

        // 若錯誤大於一次時不做多次重複跳轉
        if (this.appService.error.length === 1) {
            alert('An error has occurred, returning to homepage.');
            this.router.navigate(['/'])
        }

    }
}