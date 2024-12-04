import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev028 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
昔の人と竜って、ケンカしたけれど、今は仲直りしてるんだよね。
じゃあ、どんなに仲が悪くたって、お互い歩み寄れば仲直りできる{{go03}}？
…………今、同じ竜舎のトモダチとケンカ中{{go00}}{{go01}}。
やっぱり、{{my}}の方から歩み寄ればいい{{go03}}？
でも、それはちょっとしたくない{{go00}}{{go01}}…。
         */
        Content(`Scripts.Ev028.1.Content`)
        const result = (await Options([
            // こちらから歩み寄るべき。
            `Scripts.Ev028.1.1.Action`,
            // 向こうから歩み寄るべき。
            `Scripts.Ev028.1.2.Action`,
            // 絶交しちゃえ。
            `Scripts.Ev028.1.3.Action`,
            // うーん…分からない。
            `Scripts.Ev028.1.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // そっか…そうだよね。今度、{{my}}の方から声をかけてみる{{go01}}。
                await Content(`Scripts.Ev028.1.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // そうだよね。じゃ、むこうが声をかけてくるまで、知らんぷりしてる{{go01}}。
                await Content(`Scripts.Ev028.1.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // え？　でも…そこまではイヤ{{go00}}{{go01}}……。
                await Content(`Scripts.Ev028.1.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // うーん…もうしばらく考えてみる{{go01}}。
                await Content(`Scripts.Ev028.1.4.Reply`)
                break;
        }
    } else {
        Face('char00');
        /** 最近、いろいろ悩んでる{{go01}}…。 */
        await Content(`Scripts.Ev028.2`)
    }
    SetContentCompleted()
}

export default ev028;