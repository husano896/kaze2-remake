import { Ending1 } from "./Ending1";
import { Opening } from "./Opening";

/**
 * 當執行帶有await的腳本時，如果離開該Component了，會不會造成Memory Leak?
 * -- 不會，他會被GC給回收掉
 * ref: https://stackoverflow.com/questions/61136851/memory-leak-in-promise
 */

export const Events: { [eventName: string]: Function } = {
    Opening,
    Ending1
    
}