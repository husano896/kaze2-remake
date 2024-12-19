import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev045 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted } = component
    appServ.setBGM('music05')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char02');
        /**
            {{yourName}}さん……言いにくいことなんっすが……
            この前話した「属性を極めることで、病気の治療になる」って噂のことっす。
            本当はそうじゃなくて、「神獣」と面会する時に極めとかなきゃいけないだけで、
            どうやら竜死病には、直接の効果はないらしいんっすよ……。
            また、振り出しに戻ってしまったっす……。
         */
        await Content(`Scripts.Ev045.1`)
        Face('char02');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        saveData.ivent |= EventFlag.回答事件;
        /**
            ……？
            どうした{{go04}}？  なんだか元気ないみたい{{go00}}{{go01}}……。
            {{my}}も元気出すから、{{you}}も元気、出してほしい{{go01}}！
         */
        await Content(`Scripts.Ev045.2`)

    } else {
        Face('char09');
        /*
            今、全力で新しい資料を探してるっす。
            何かあったら{{yourName}}さんも、協力よろしくお願いするっすよ！
        */
        await Content(`Scripts.Ev045.3`);
        Face('char09a');
    }
    SetContentCompleted()
}

export default ev045;