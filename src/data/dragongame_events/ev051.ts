import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev051 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music18')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char09')
        /**
            なんだか最近、孤竜の具合が良くないみたいっすねぇ…。
            少し嫌な予感がするっす。
            明日にでも、診療所に連れて行って見てもらったほうがいいっすかね。
            {{yourName}}さんも、無理はさせないようにお願いするっすよ。
         */
        await Content(`Scripts.Ev051.1`)
        Face('char09a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ねぇ、{{you}}は {{my}}のこと、好き？
            ………………
            ごめん。変なこと聞いちゃって……。
            でも、{{you}}の言葉を聞かないと、安心できなくて……。
         */
        Content(`Scripts.Ev051.2.Content`)
        const result = (await Options([
            // 言わせるなよ。
            `Scripts.Ev051.2.1.Action`,
            // 別に……。
            `Scripts.Ev051.2.2.Action`,
            // 大好きだよ。
            `Scripts.Ev051.2.3.Action`,
            // キミが思ってるのと一緒。
            `Scripts.Ev051.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ご…ごめん…。でも……
                await Content(`Scripts.Ev051.2.1.Reply`)
                break;
            case 1:
                // [答非所問]+ 表情
                EmojiAndAdjustLove(1)
                // えっ……！？
                await Content(`Scripts.Ev051.2.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // よかった…安心した{{go01}}。
                await Content(`Scripts.Ev051.2.3.Reply`)
                break;
            case 3:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // わぁ…（ポッ）
                await Content(`Scripts.Ev051.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev051;