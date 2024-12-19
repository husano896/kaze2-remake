import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev090 = async (component: DragongameComponent) => {

    const { saveData, appServ, Emoji, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04')
        /**
            ……もう、何度目になるんっすかね、孤竜の検診……。
            多分、次の検診は……。
            いや！  まだっす！  ボクは絶対、諦めないっす！
            {{yourName}}さんも、諦めてなんてないっすよね？
            ここまで来ているんだから…あと少しなんっすから…！
         */
        await Content(`Scripts.Ev090.1`)
        Face('char04a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            きゅっきゅー♪
            これからトモダチと　お花をつみにいく{{go01}}。
            またあとで！
         */
        Face('char00')
        Emoji(4)
        await Content(`Scripts.Ev090.2`)

    }
    SetContentCompleted()
}

export default ev090;