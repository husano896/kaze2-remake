import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev096 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Emoji, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music10')
    Emoji(6)
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        /**
            すまないっす、{{yourName}} さん。
            今日は、{{dragonName}} を連れ出させないでほしいっす。
            具合が……悪すぎるんっすよ……。
         */
        await Content(`Scripts.Ev096.1`)
        Face('char01a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char00')
        /**
            あ、{{yourName}}。
            ごめんね、次までにはちゃんとよく……なってる……から。
        */
        await Content(`Scripts.Ev096.2`)

    } else {
        Face('char00')
        /**
         * うぅ…。ゴホッゴホッ…。
         */
        await Content(`Scripts.Ev096.3`)
    }
    SetContentCompleted()
}

export default ev096;