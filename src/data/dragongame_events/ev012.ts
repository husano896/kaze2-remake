import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { BioFlag } from "../BioFlag";

const ev012 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    if (appServ.waitTimeMinutes >= 60) {
        if (appServ.saveData.bio & BioFlag.発作) {

            Face('char02');
            appServ.setBGM('music05')
            /**
            あっ！ {{yourName}} さん、{{dragonName}} の回復は順調っす♪
            {{yourName}} さんに会いたがってたっすよ。行ってあげるっす。
            だいぶ元気になってきてるみたいっすしね。
            ただ、発作自体は続いてるみたいで、少し苦しそうっす…。
            なんとかしてあげられないっすかね……。
             */
            await Content(`Scripts.Ev012.1`)
            Face('char02a');
        }
        else {
            Face('char08');
            appServ.setBGM('music01')
            /**
            {{yourName}} さん！
            こんなに孤竜が元気になって、ボクまでうれしいくらいっす！
            今までのあの発作がウソみたいっす！
            薬が発作に効くのは知ってたっすが、こんなに効くと思ってなかったっす！
            感謝のしるしに… この {{varItemName[14]}}、受け取ってくださいっす。
            そうそう、{{dragonName}} が会いたがってたっすよ、{{yourName}} さんに。
             */
            appServ.saveData.item[14] += 1;
            await Content(`Scripts.Ev012.2`, {varItemName: 'Data.Item.14.Title'})
            Face('char08a');
        }
    } else {
        // 根據發作是否已恢復，變更音樂
        if (appServ.saveData.bio & BioFlag.発作) {
            appServ.setBGM('music05')
        }
        else {
            appServ.setBGM('music01')
        }
    }
    SetContentCompleted()
}

export default ev012;