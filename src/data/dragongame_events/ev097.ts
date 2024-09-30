import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

/**「わずかな灯火」*/
const ev097 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music21')
    Face('char01');
    if (appServ.saveData.turn >= 40) {
        await Content(`Scripts.Ev001.1`)
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        appServ.saveData.ivent |= 4;
        await Content(`Scripts.Ev001.2`)
    } else {
        await Content(`Scripts.Ev001.3`);
    }
    Face('char01a')
    SetContentCompleted()
}

export default ev097;