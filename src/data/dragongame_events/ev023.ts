import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev023 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04');
        /**
            孤竜、あれからいろいろ悩んでるみたいで…元気ないっす…。
            ボクも元気づけてあげようと いろいろ考えてるっすけど、
            なかなかいいアイディアが浮かんでこないんっすよ……。
            {{yourName}}さん、孤竜のところにいってやってくださいっす！
            そばにいてあげるだけでも、きっと違うはずっすから…。
         */
        await Content(`Scripts.Ev023.1`)
        Face('char04a');
    } else {
        Face('char00');
        /**
         * …。
         */
        await Content(`Scripts.Ev023.2`)
    }
    SetContentCompleted()
}

export default ev023;