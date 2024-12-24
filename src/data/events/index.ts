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
import { Quest03 } from "./Quest03";
import { Quest03a } from "./Quest03a";
import { Quest04 } from "./Quest04";
import { Quest04a } from "./Quest04a";
import { Quest06 } from "./Quest06";
import { Quest06a } from "./Quest06a";
import { Quest07 } from "./Quest07";
import { Quest07a } from "./Quest07a";
import { Quest08 } from "./Quest08";
import { Quest08a } from "./Quest08a";
import { Quest09 } from "./Quest09";
import { Quest09a } from "./Quest09a";
import { Quest10 } from "./Quest10";
import { Quest10a } from "./Quest10a";
import { Games02 } from "./Games02";
import { Games08 } from "./Games08";
import { Games08a } from "./Games08a";
import { Quest05 } from "./Quest05";
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

    /** 研究者的小屋 */
    Games02,

    /** 神獸之祠 */
    Games04,
    Games04a,

    /** トピリアの森 */
    Quest01,
    Quest01a,

    /** カザリナ山・幸いの地フッフール */
    Quest02,

    /** ドラゴンの古代遺跡 */
    Quest03,
    Quest03a,

    /** 幻の浮島ラグナルクス */
    Quest04,
    Quest04a,

    /** ドラゴンの丘 */
    Quest05,
    
    /** 魔獣の森 */
    Quest06,
    Quest06a,

    /** 忘れ去られし古城 */
    Quest07,
    Quest07a,

    /** サラ平原 */
    Quest08,
    Quest08a,

    /** 街の雑木林 */
    Quest09,
    Quest09a,
    
    /** ウリア大砂漠地帯 */
    Quest10,
    Quest10a,
    
    /** 滅びの都ヒディ */
    Games07,
    Games08,
    Games08a
}