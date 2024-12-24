import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { BioFlag } from "../BioFlag";

const ev052 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted } = component

    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music19')
        Face('char09');
        /**
            ああっ！{{yourName}} さん……やっと来てくれたっす！
            {{dragonName}}  が、また発作を起こしてしまったっすよ！！
            この前の発作なんかよりもずっと苦しんでるっす！！
            お願いっす！！ どうか看病してあげてほしいっす！！
            今は{{yourName}} さんがそばにいてやることが、一番の薬なんっす！！
         */
        await Content(`Scripts.Ev052.1`)
        Face('char09a');    
    } else {
        // 根據發作是否已恢復，變更音樂
        if (saveData.bio & BioFlag.発作) {
            appServ.setBGM('music05')
            // …。
            await Content(`Scripts.Ev052.2`)
        } else {
            appServ.setBGM('music01')
        }
    }
    SetContentCompleted()
}

export default ev052;