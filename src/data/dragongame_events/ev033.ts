import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev033 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01');
        /**
"あ、{{yourName}} さん♪
ちょうど{{dragonName}} が起きたところっすよ。
グッドタイミングっすね～。"
         */
        await Content(`Scripts.Ev033.1`)
        Face('char01a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {

        appServ.saveData.ivent |= EventFlag.回答事件;
        Face('char00');
        /** 
"あのね……さっき、夢を見た{{go01}}。
{{my}}が、{{you}}と一緒に遊ぶ夢……。
顔も……声も分からなかったけど……幸せな気持ちで
胸がいっぱいになった{{go01}}。
なんだか……ふしぎ……。"
*/
        await Content(`Scripts.Ev033.2`)
    } else {
        Face('char08');
        /**
"{{dragonName}} 、最近 {{yourName}} さんのことばかり話すんっすよ。
正直、ちょっとうらやましいっすよぉ…。"
         */
        await Content(`Scripts.Ev033.3`)
        Face('char08a');
    }
    SetContentCompleted()
}

export default ev033;