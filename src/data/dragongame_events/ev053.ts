import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { BioFlag } from "../BioFlag";
import { ItemID } from "../ItemID";

const ev053 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted } = component

    if (appServ.waitTimeMinutes >= 60) {
        if (saveData.bio & BioFlag.発作) {
            appServ.setBGM('music05')
            Face('char02')
            /**
                …前にも増して発作がひどくて、衰弱も激しいっす。
                特効薬の水がある洞窟、この前の嵐で入口が崩れて入れなくなってるんっす。
                あぁ…あの水、保存さえきけば、こんな時でもすぐ使えるっすのに……。
                あの薬、しばらくすると、発作を鎮める成分が抜けてしまうんっす。
                誰かが、特効薬を持っていればいいんっすが……。
                そういえば、ワビ湖のほとりにそんな研究者が住んでた気もするっすが…。
             */
            await Content(`Scripts.Ev053.1`)
            Face('char02a')
        } else {
            appServ.setBGM('music21')
            /**
                見て！ {{you}}が手に入れてくれた薬のおかげで、もう苦しくない{{go01}}！
                小屋で勝負してた{{you}}、すっごくカッコよかった{{go01}}。
                …改めて、見直しちゃった{{go01}}♪
                そうだ！これ、特効薬をもって帰る時に、平野で拾った{{go01}}。
                {{you}}に……あげる{{go01}}！
                [{{varItemName[21]}}を手に入れた！！]
             */
            await Content(`Scripts.Ev053.2`, { varItemName: appServ.t(`Data.Item.${ItemID.幻の秘石}.Title`) })
            saveData.item[ItemID.幻の秘石]++;
        }
    } else {
        // 根據發作是否已恢復，變更音樂
        if (saveData.bio & BioFlag.発作) {
            appServ.setBGM('music05')
            // …。
            await Content(`Scripts.Ev053.3`)
        } else {
            appServ.setBGM('music01')
        }
    }
    SetContentCompleted()
}

export default ev053;