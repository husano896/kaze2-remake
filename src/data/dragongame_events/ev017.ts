import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev017 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char02');
        Emoji(6)
        /**
{{dragonName}}、今から話すことは、本当のことっす。 …いいっすか？
その…何というか……、{{dragonName}} は……怖い病気にかかってるんっす。
孤竜：…………………。{{my}}、もしかして、死ぬ{{go03}}？
…だ…大丈夫っす。きっと治る方法はあるっすよ。
孤竜：…………。
これから多くの困難が待ってるっす。{{dragonName}}にも、分かってほしいっすよ。
         */
        await Content(`Scripts.Ev017.1`);
        Face('char02a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        Emoji(6)
        /**
……{{my}}……死んじゃう{{go03}}？
         */
        Content(`Scripts.Ev017.2.Content`)
        const result = (await Options([
            // きっと大丈夫だよ。
            `Scripts.Ev017.2.1.Action`,
            // 死病だからな…。
            `Scripts.Ev017.2.2.Action`,
            // きっと治療方法があるはず。
            `Scripts.Ev017.2.3.Action`,
            // …かもね？
            `Scripts.Ev017.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……。
                await Content(`Scripts.Ev017.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …うぅ……。
                await Content(`Scripts.Ev017.2.2.Reply`)
                break;
            case 2:
                // 理解不能
                EmojiAndAdjustLove(13)
                // ……{{my}}、希望を持っても、いい{{go03}}？
                await Content(`Scripts.Ev017.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……{{my}}、きっと死ぬ{{go01}}……。
                await Content(`Scripts.Ev017.2.4.Reply`)
                break;
        }
        Emoji(6)
    }
    SetContentCompleted()
}

export default ev017;