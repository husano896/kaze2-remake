import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { BioFlag } from "../BioFlag";

const ev054 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted } = component

    if (appServ.waitTimeMinutes >= 60) {
        if (saveData.bio & BioFlag.発作) {
            appServ.setBGM('music05')
            Face('char02')
            /**
                {{yourName}}さんのおかげで、孤竜も発作からだいぶ立ち直ったっす。
                ……でも今度ばかりは、なかなかよくならないっすね。
                元気づけてあげられたらいいんっすが。
                {{dragonName}}  が{{yourName}} さんに会いたがってるっすよ。
                なんとかしてあげられないっすかね……。
             */
            await Content(`Scripts.Ev054.1`)
            Face('char02a')
        } else {
            appServ.setBGM('music21')
            Face('char06')
            /**
                孤竜が元気になって、ホッとしたっす！
                このまま治らないんじゃないかって、縁起でもないこと考えてたボクが、
                少し恥ずかしいっすよ…。
                本当に…よかった…っす……。
             */
            await Content(`Scripts.Ev054.2`)
            Face('char06a')
        }
    } else {
        // 根據發作是否已恢復，變更音樂
        if (saveData.bio & BioFlag.発作) {
            appServ.setBGM('music05')
            // ……。
            await Content(`Scripts.Ev054.3`)
        } else {
            appServ.setBGM('music01')
        }
    }
    SetContentCompleted()
}

export default ev054;