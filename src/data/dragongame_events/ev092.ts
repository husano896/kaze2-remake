import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev092 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Emoji, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music20')
    Emoji(6)
    if (appServ.waitTimeMinutes >= 60) {

        Face('char00');
        /**
            怖い……怖い{{go01}}……。
            ねぇ！
            今すぐ{{my}}のところに来てほしい{{go01}}！
         */
        Content(`Scripts.Ev092.1.Content`)
        const result = (await Options([
            // できるわけないだろ。
            `Scripts.Ev092.1.1.Action`,
            // 分かったよ。
            `Scripts.Ev092.1.2.Action`,
            // わがまま言うな！
            `Scripts.Ev092.1.3.Action`,
            // ごめん…ごめんよ……。
            `Scripts.Ev092.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // そんなこと分かってる{{go01}}！
                await Content(`Scripts.Ev092.1.1.Reply`)
                break;
            case 1:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // ………うそつき！
                await Content(`Scripts.Ev092.1.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // う……うわあああん！
                await Content(`Scripts.Ev092.1.3.Reply`)
                break;
            case 3:
                // [高興]
                EmojiAndAdjustLove(14)
                // ううん、{{my}}こそ、ごめん……。
                await Content(`Scripts.Ev092.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char02');
        /** 
            {{dragonName}} ……かなり弱ってきてるっす。
            どうにか、してあげたいっすよ……。
        */
        await Content(`Scripts.Ev092.2`)
        Face('char02a')
    } else {
        /* ……。  */
        await Content('Scripts.Ev092.3')
    }
    SetContentCompleted()
}

export default ev092;