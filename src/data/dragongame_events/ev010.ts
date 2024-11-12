import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { BioFlag } from "../BioFlag";

const ev010 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music19')
        Face('char09');
        /**
        "{{yourName}}さん！　た　た　たいへんっす！！
        さっき突然 {{dragonName}} が苦しみだして、姿も元に戻ったんっす！
        これは、竜に特有の「発作」なんっす！
        今 痛み止めをあげているっすけど、正直、気休め程度にしかならないっす…
        ああ…どうしよう…特効薬は地図に無き『湖の洞窟』にしかないっすのに！
        どうか看病してあげてくださいっす… お願いっす！！"
         */
        await Content(`Scripts.Ev010.1`)
        Face('char09a');
    } else {
        // 根據發作是否已恢復，變更音樂
        if (appServ.saveData.bio & BioFlag.発作) {
            appServ.setBGM('music05')
        } else {
            appServ.setBGM('music01')
        }
    }
    SetContentCompleted()
}

export default ev010;