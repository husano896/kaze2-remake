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
import ev040 from "./ev040";
import ev041 from "./ev041";
import ev042 from "./ev042";
import ev043 from "./ev043";
import ev044 from "./ev044";
import ev045 from "./ev045";
import ev046 from "./ev046";
import ev047 from "./ev047";
import ev048 from "./ev048";
import ev049 from "./ev049";
import ev050 from "./ev050";
import ev051 from "./ev051";
import ev052 from "./ev052";
import ev053 from "./ev053";
import ev054 from "./ev054";
import ev055 from "./ev055";
import ev056 from "./ev056";
import ev057 from "./ev057";
import ev058 from "./ev058";
import ev059 from "./ev059";
import ev060 from "./ev060";
import ev061 from "./ev061";
import ev062 from "./ev062";
import ev063 from "./ev063";
import ev064 from "./ev064";
import ev065 from "./ev065";
import ev066 from "./ev066";
import ev067 from "./ev067";
import ev068 from "./ev068";
import ev069 from "./ev069";
import ev070 from "./ev070";
import ev071 from "./ev071";
import ev072 from "./ev072";
import ev073 from "./ev073";
import ev074 from "./ev074";
import ev075 from "./ev075";
import ev076 from "./ev076";
import ev077 from "./ev077";
import ev078 from "./ev078";
import ev079 from "./ev079";
import ev080 from "./ev080";
import ev081 from "./ev081";
import ev082 from "./ev082";
import ev083 from "./ev083";
import ev084 from "./ev084";
import ev085 from "./ev085";
import ev086 from "./ev086";
import ev087 from "./ev087";
import ev088 from "./ev088";
import ev089 from "./ev089";
import ev090 from "./ev090";
import ev091 from "./ev091";
import ev092 from "./ev092";
import ev093 from "./ev093";
import ev094 from "./ev094";
import ev095 from "./ev095";
import ev096 from "./ev096";

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
    /**「猫を飼う」 */
    40: ev040,
    /**「何気ない会話、その二」*/
    41: ev041,
    /**「意外な歌い手」*/
    42: ev042,
    /**「歌い手ニエル」*/
    43: ev043,
    /**「学校創設？」*/
    44: ev044,
    /**「ガセ発覚」*/
    45: ev045,
    /**「あこがれ」*/
    46: ev046,
    /**「愛を請う者達」*/
    47: ev047,
    /**「ピクニックイベント」*/
    48: ev048,
    /**「ピクニック前夜」*/
    49: ev049,
    /**「ピクニック中止、そして……」*/
    50: ev050,
    /**「体の不調」*/
    51: ev051,
    //#region 二次發作
    //
    52: ev052,
    53: ev053,
    54: ev054,
    55: ev055,
    //#endregion
    56: ev056,
    57: ev057,
    58: ev058,
    59: ev059,
    60: ev060,
    61: ev061,
    62: ev062,
    63: ev063,
    64: ev064,
    65: ev065,
    66: ev066,
    67: ev067,
    68: ev068,
    69: ev069,
    70: ev070,
    71: ev071,
    72: ev072,
    73: ev073,
    74: ev074,
    75: ev075,
    76: ev076,
    77: ev077,
    78: ev078,
    79: ev079,
    80: ev080,
    81: ev081,
    82: ev082,
    83: ev083,
    84: ev084,
    85: ev085,
    86: ev086,
    87: ev087,
    88: ev088,
    89: ev089,
    90: ev090,
    91: ev091,
    92: ev092,
    93: ev093,
    94: ev094,
    95: ev095,
    96: ev096,
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