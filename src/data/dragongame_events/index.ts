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
import ev016 from "./ev016";
import ev017 from "./ev017";
import ev018 from "./ev018";
import ev019 from "./ev019";
import ev020 from "./ev020";
import ev021 from "./ev021";
import ev022 from "./ev022";
import ev023 from "./ev023";
import ev024 from "./ev024";
import ev025 from "./ev025";
import ev026 from "./ev026";
import ev027 from "./ev027";
import ev028 from "./ev028";
import ev029 from "./ev029";
import ev030 from "./ev030";
import ev031 from "./ev031";
import ev032 from "./ev032";
import ev033 from "./ev033";
import ev034 from "./ev034";
import ev035 from "./ev035";
import ev036 from "./ev036";
import ev037 from "./ev037";
import ev038 from "./ev038";
import ev039 from "./ev039";

import ev097 from "./ev097";
import ev098 from "./ev098";
import ev099 from "./ev099";
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
    // 16
    16: ev016,
    /** 衝撃の告白 */
    17: ev017,
    // 18
    18: ev018,
    // 19
    19: ev019,
    /** 悩む孤竜 */
    20: ev020,
    // 21
    21: ev021,
    /** 孤竜の不安 */
    22: ev022,
    // 23
    23: ev023,
    /** 発作のその後 */
    24: ev024,
    /** 昔話 */
    25: ev025,
    // 26
    26: ev026,
    /** 発作薬の消失(分歧) */
    27: ev027,
    // 28
    28: ev028,
    /** 手がかり */
    29: ev029,
    /** 竜死病速報 */
    30: ev030,
    /** 僅かな希望 */
    31: ev031,
    /**「仲直り」*/
    32: ev032,
    /**「夢」*/
    33: ev033,
    /**「翠の星」*/
    34: ev034,
    /**「いたずら好き？」*/
    35: ev035,
    /**「翠の星の伝説」*/
    36: ev036,
    /**「学校って？」*/
    37: ev037,
    /**「奇跡と神秘」*/
    38: ev038,
    /**「学校へ行こう？」*/
    39: ev039,
    // 52: TODO: 發作發生
    // 55: TODO: 發作自然治癒
    /**「わずかな灯火」*/
    97: ev097,
    //#region BAD END確認
    /** 想いの絵 */
    98: ev098,
    /** いつか見た夢 */
    99: ev099,
    /**「去り逝く者」 */
    100: ev100,
    //#endregion
    postEv: PostEventAfterDragonGameEvent
}

export { DragonGameEvents };