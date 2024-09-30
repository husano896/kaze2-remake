import ev001 from "./ev001";
import ev097 from "./ev097";
import ev100 from "./ev100";
export const DragonGameEvents: { [eventName: string]: Function } = {
    1: ev001,
    /**「わずかな灯火」*/
    97: ev097,
    /** 「去り逝く者」 */
    100: ev100
}