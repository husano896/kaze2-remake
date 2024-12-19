import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev050 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music07')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char02')
        /**
            あ……{{yourName}} さん。
            ピクニックは、中止になったっす。
            {{dragonName}}の具合が急に悪くなったんっすよ……。
            {{dragonName}}、かなり落ち込んでるっす。様子、見てやってほしいっすよ。
         */
        await Content(`Scripts.Ev050.1`)
        Face('char02a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            {{you}}……。
            {{my}}のせいで、ピクニック、ダメになっちゃった{{go01}}……。
            みんなは 気にしないで、って言ってくれたけど……。
         */
        Content(`Scripts.Ev050.2.Content`)
        const result = (await Options([
            // 具合悪いんじゃ仕方ないな。
            `Scripts.Ev050.2.1.Action`,
            // もう一度計画すればいいよ。
            `Scripts.Ev050.2.2.Action`,
            // 少しはしゃぎすぎたんじゃ？
            `Scripts.Ev050.2.3.Action`,
            // その体で行こうとするから。
            `Scripts.Ev050.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // うん……でも、行きたかった{{go01}}。
                await Content(`Scripts.Ev050.2.1.Reply`)
                break;
            case 1:
                // [答非所問]
                EmojiAndAdjustLove(11)
                // もう一度……って、ホントにある{{go03}}…？
                await Content(`Scripts.Ev050.2.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // そうだね…反省する{{go01}}……。
                await Content(`Scripts.Ev050.2.3.Reply`)
                break;
            case 3:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // そんなこと、{{you}}に言われなくても分かってる{{go01}}！
                await Content(`Scripts.Ev050.2.4.Reply`)
                break;
        }
    } else {
        Face('char04')
        /** 
            やっぱり{{dragonName}}、元気ないっす。
            もしかすると…… いや、なんでもないっすよ。
        */
        await Content(`Scripts.Ev050.3`)
        Face('char04a')
    }
    SetContentCompleted()
}

export default ev050;