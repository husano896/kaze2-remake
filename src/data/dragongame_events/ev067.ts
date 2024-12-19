import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev067 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music25')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04')
        /**
            ん？　うん……。
            あ、{{yourName}} さん、実は……。
            この前から、あたりに妙な視線を感じるんっす。
            ちょうど「忌地への道標」を手に入れてからなんっすよ……。
            もしかすると……ま、まさかっすよねぇ。
         */
        await Content(`Scripts.Ev067.1`)
        Face('char04a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            きゅ？　どうかした{{go03}}？
         */
        Content(`Scripts.Ev067.2.Content`)
        const result = (await Options([
            // いや、何でもない。
            `Scripts.Ev067.2.1.Action`,
            // 何か変なヤツがいるって…。
            `Scripts.Ev067.2.2.Action`,
            // 調子はどう？
            `Scripts.Ev067.2.3.Action`,
            // キミ、狙われてるぞ。
            `Scripts.Ev067.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // ふ～ん？
                await Content(`Scripts.Ev067.2.1.Reply`)
                break;
            case 1:
                // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // えええっ！？  {{you}}……{{my}}、怖い{{go01}}……。
                await Content(`Scripts.Ev067.2.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うん。今は平気{{go00}}{{go01}}。
                await Content(`Scripts.Ev067.2.3.Reply`)
                break;
            case 3:
                // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // や、ヤなこと言わないでほしい{{go01}}！
                await Content(`Scripts.Ev067.2.4.Reply`)
                break;
        }
    } else {
        Face('char02')
        /**
            ボクの気のせいだといいんっすが……
            これから気をつけるっすね。
         */
        await Content(`Scripts.Ev067.3`)
        Face('char02a')
    }
    SetContentCompleted()
}

export default ev067;