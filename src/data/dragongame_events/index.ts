import ev001 from "./ev001";
import ev002 from "./ev002";
import ev003 from './ev003';
import ev004 from './ev004';
import ev005 from './ev005';
import ev006 from './ev006';
import ev007 from "./ev007";
import ev008 from "./ev008";
import ev009 from "./ev009";
import ev010 from "./ev010";
import ev011 from "./ev011";
import ev012 from "./ev012";
import ev013 from "./ev013";
import ev014 from "./ev014";
import ev015 from "./ev015";
import ev097 from "./ev097";
import ev100 from "./ev100";
import { PostEventAfterDragonGameEvent } from './postEv';

const DragonGameEvents: { [eventName: string]: Function } = {
    1: ev001,
    2: ev002,
    3: ev003,
    4: ev004,
    /** 送り主の分からぬプレゼント */
    5: ev005,
    /** 母親からのプレゼント */
    6: ev006,
    7: ev007,
    8: ev008,
    9: ev009,
    //#region 一次発作
    /** 一次発作発症 */
    10: ev010,
    /** 一次発作期間中 */
    11: ev011,
    /** 一次発作期間中 */
    12: ev012,
    /** 一次発作回復 */
    13: ev013,
    //#endregion
    /** 発作のその後 */
    14: ev014,
    /** 発作の原因 */
    15: ev015,
    // 52: TODO: 發作發生
    // 13: TODO: 發作自然治癒
    // 55: TODO: 發作自然治癒
    /**「わずかな灯火」*/
    97: ev097,
    //#region BAD END確認
    /**「去り逝く者」 */
    100: ev100
    //#endregion
}

export { DragonGameEvents, PostEventAfterDragonGameEvent };