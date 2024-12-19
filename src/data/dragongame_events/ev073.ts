import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev073 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            ねぇねぇ、ちょっと質問がある{{go01}}～。
            {{you}}って、「オス」？  それとも「メス」？。
         */
        Content(`Scripts.Ev073.1.Content`)
        const result = (await Options([
            // 女の人♪
            `Scripts.Ev073.1.1.Action`,
            // 男だよ。
            `Scripts.Ev073.1.2.Action`,
            // どっちでもいいだろ。
            `Scripts.Ev073.1.3.Action`,
            // 実はオ・カ・マ♪
            `Scripts.Ev073.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そっか、優しそうな感じがするのはそのせいだった{{go03}}？
                await Content(`Scripts.Ev073.1.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // おとこ……オスのこと？　うん、分かった{{go01}}！
                await Content(`Scripts.Ev073.1.2.Reply`)
                break;
            case 2:
                // [理解不能] + 表情
                EmojiAndAdjustLove(6)
                // ビクッ…………。
                await Content(`Scripts.Ev073.1.3.Reply`)
                break;
            case 3:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // きゅぅ？  それってどんな「にんげん」？
                await Content(`Scripts.Ev073.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char04');
        /** 
            くすくす。
            また質問ぜめっすね？  孤竜たちは何にでも興味を持つ時期っすから。
            でも、通信機の性能上、会話が限られてるのもあって、
            質問選びには孤竜なりに苦労してるみたいっすよ。
        */
        await Content(`Scripts.Ev073.2`)
        Face('char04a')
    }
    SetContentCompleted()
}

export default ev073;