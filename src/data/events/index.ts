import { Ending1 } from "./Ending1";
import { Ending2 } from "./Ending2";
import { Opening } from "./Opening";
import { Miss } from './Miss'
import { Eventend } from "./Eventend";
import { LoveChk } from "./LoveChk";
import { Games04a } from "./Games04a";
import { Games04 } from "./Games04";
import { Games07 } from "./Games07";
import { Quest01 } from "./Quest01";
import { Quest01a } from "./Quest01a";
import { Quest02 } from "./Quest02";
/**
 * 當執行帶有await的腳本時，如果離開該Component了，會不會造成Memory Leak?
 * -- 不會，他會被GC給回收掉
 * ref: https://stackoverflow.com/questions/61136851/memory-leak-in-promise
 */

export const Events: { [eventName: string]: Function } = {
    Opening,
    Ending1,
    Ending2,
    Miss,
    Eventend,
    LoveChk,

    /** 神獸之祠 */
    Games04,
    Games04a,
    
    /** ト ピ リ ア の 森 */
    Quest01,
    Quest01a,
    
    /** カザリナ山・幸いの地フッフール */
    Quest02,
    
    /** 滅 び の 都 ヒ デ ィ */
    Games07
}