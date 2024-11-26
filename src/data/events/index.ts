import { Ending1 } from "./Ending1";
import { Ending2 } from "./Ending2";
import { Opening } from "./Opening";
import { Miss } from './Miss'
import { Eventend } from "./Eventend";
import { LoveChk } from "./LoveChk";
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
    LoveChk
}