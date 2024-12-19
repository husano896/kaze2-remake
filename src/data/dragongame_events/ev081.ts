import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev081 = async (component: DragongameComponent) => {

    const { saveData, appServ, Emoji, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        Emoji(6)
        /**
            すまんっす、{{yourName}}さん。
            ちょっと調べ物があるんで、あんまりお相手できないっす。
            でも、何か用事があるときは呼んでくださいっす！
            それじゃ！
         */
        await Content(`Scripts.Ev081.1`)
        Face('char01a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ニエルサン、最近一緒に遊んでくれない{{go01}}。
            本読んだり、お話聞いたりしてて……。
            {{my}}……さみしい{{go01}}。
         */
        Content(`Scripts.Ev081.2.Content`)
        Emoji(6)
        const result = (await Options([
            // キミのことを思ってんだぞ？
            `Scripts.Ev081.2.1.Action`,
            // わがまま言うな。
            `Scripts.Ev081.2.2.Action`,
            // キミを嫌いになったのかも。
            `Scripts.Ev081.2.3.Action`,
            // もっとたくさん来てやるよ。
            `Scripts.Ev081.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // うん……分かってる{{go01}}。分かっているんだけれど…。
                await Content(`Scripts.Ev081.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // うっ…分かった{{go01}}。
                await Content(`Scripts.Ev081.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // え！？  そんなの嫌{{go00}}{{go01}}！　悲しい{{go01}}…。
                await Content(`Scripts.Ev081.2.3.Reply`)
                break;
            case 3:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ホント！？  うれしい{{go01}}♪
                await Content(`Scripts.Ev081.2.4.Reply`)
                break;
        }
    } else {
        Face('char00')
        /**
            あのね……。
            ニエルサン、このごろあんまり寝てないみたい{{go00}}{{go01}}。
            {{my}}、ちょっと心配{{go00}}{{go01}}。
         */
        await Content(`Scripts.Ev081.3`)
    }
    SetContentCompleted()
}

export default ev081;