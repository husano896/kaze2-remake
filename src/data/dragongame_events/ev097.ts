import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

/**「わずかな灯火」*/
const ev097 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char00');
        /**
{{you}}、{{my}}ね…今日は体の調子、すごくいい{{go01}}……。
これから、どうする{{go04}}…？
         */
        Content(`Scripts.Ev097.1.Content`)
        const result = (await Options([
            // じゃ、探検にでも行こうか。
            `Scripts.Ev097.1.1.Action`,
            // 試合しに行ってみる？
            `Scripts.Ev097.1.2.Action`,
            // おしゃべりでもしよう。
            `Scripts.Ev097.1.3.Action`,
            // 何もしないってのは？
            `Scripts.Ev097.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(14)
                // うん！ 早く、全部のアイテム集める{{go01}}。
                await Content(`Scripts.Ev097.1.1.Reply`)
                break;
            case 1:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // うん、{{you}}がそう言うなら……。
                await Content(`Scripts.Ev097.1.2.Reply`)
                break;
            case 2:
                // [開心]
                EmojiAndAdjustLove(1)
                // それは……今はいい{{go01}}。
                await Content(`Scripts.Ev097.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …{{my}}には、もう時間がない{{go01}}…。
                await Content(`Scripts.Ev097.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char06');
        /*
            {{dragonName}}……平気そうな顔してるけど、本当はすごくつらいはずっす……。
            一刻も早く、孤竜を治してあげようっす！
        */
        await Content(`Scripts.Ev097.2`)
        Face('char06a');
    } else {
        Face('char00');
        /** {{my}}、今日はとっても気分がいい{{go01}} …。 */
        await Content(`Scripts.Ev097.3`)
    }
    SetContentCompleted()
}

export default ev097;