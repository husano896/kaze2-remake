import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

/** 「意外な歌い手」 */
const ev042 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char09');
        /**
            "あ゛ー……{{yourName}} ざん……。
            ごめんっず……うまぐじゃべれぞうにないっず……。
            今はぢょっど…がんべんじでおじいっず……。"
         */
        await Content(`Scripts.Ev042.1`)
        Face('char09a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
            きゅ……ニエルサン、具合悪いみたい{{go00}}{{go01}}。
         */
        Content(`Scripts.Ev042.2.Content`)
        const result = (await Options([
            // 風邪でもひいたのか？
            `Scripts.Ev042.2.1.Action`,
            // 声、がらがらだったぞ。
            `Scripts.Ev042.2.2.Action`,
            // またイタズラしたのか？
            `Scripts.Ev042.2.3.Action`,
            // データがバグったかなぁ。
            `Scripts.Ev042.2.4.Action`
        ]));
        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // 違う{{go01}}～。ニエルサン、お歌を歌いすぎた{{go01}}。
                await Content(`Scripts.Ev042.2.1.Reply`)
                break;
            case 1:
                // [驚訝] 
                EmojiAndAdjustLove(15)
                // 歌いすぎると、あんなになっちゃう{{go01}}～。
                await Content(`Scripts.Ev042.2.2.Reply`)
                break;
            case 2:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // 違う{{go01}}！　もうそんなことしない{{go01}}。
                await Content(`Scripts.Ev042.2.3.Reply`)
                break;
            case 3:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // ……？  でぇー、たがばぐった？
                await Content(`Scripts.Ev042.2.4.Reply`)
                break;
        }
    } else {
        Face('char00');
        /*
            ニエルサン、何回もうがいしてた{{go01}}。
            大丈夫だといいんだけど…。
        */
        await Content(`Scripts.Ev042.3`);
    }
    SetContentCompleted()
}

export default ev042;