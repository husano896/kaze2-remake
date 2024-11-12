import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { BioFlag } from "../BioFlag";

const ev011 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    if (appServ.waitTimeMinutes >= 60) {
        if (appServ.saveData.bio & BioFlag.発作) {

            Face('char09');
            appServ.setBGM('music05')
            /**
            {{yourName}}さん、ちょっと話があるんっすが……。
            孤竜の状態はだいぶ良くはなってきたっすが、回復にはほど遠いっす。
            …ここから少し離れた湖の小島の洞窟に、発作に効く薬があるんっす。
            地図に記述がない場所にある洞窟の奥のほうでしか取れない水で…
            今の孤竜に行かせるのはちょっと危険かもしれないっすね。
            でも…孤竜のつらい時間が少しでも縮まるのなら……。
             */
            await Content(`Scripts.Ev011.1`)
            Face('char09a');
        }
        else {
            Face('char00');
            appServ.setBGM('music21')
            /**
            見て！{{you}}が教えてくれた特効薬のおかげで、もう苦しくない{{go01}}♪
            洞窟へ行ったとき、とても苦しかったけど、不安なんてなかった{{go01}}。
            だって、{{you}}が、絶対治るんだって信じてくれてたもの。
            そうだ！これ、薬をとった帰りに、洞窟で見つけた{{go01}}。
            {{you}}にあげる{{go01}}！
            [{{varItemName[21]}} を手に入れた！！]
             */
            appServ.saveData.item[21] += 1;
            await Content(`Scripts.Ev011.2`, { varItemName: 'Data.Item.21.Title' })
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

export default ev011;