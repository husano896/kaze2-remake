import { AppService } from "@/app/app.service";
import { EventFlag } from "@/data/EventFlag";
import { snd } from "@/data/snd";
import { LocalStorageKey } from "@/entities/LocalStorageKey";
import { SaveData } from "@/entities/SaveData";
import { ElementRef } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom, timer } from "rxjs";

/** 待重做 */
export class MockAppService {
}