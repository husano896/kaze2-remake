import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev004 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music20')
        Face('char00');
        /**
        きゅう…… {{you}}には、母さん、いる{{go03}}？
        {{my}}のお母さんは 今、どこかにいってる{{go01}}。
        広い砂漠に{{my}} を置いて…………………
        ねぇ…。
        {{my}}って……やっぱり、捨てられちゃった{{go03}}？
         */
        Content(`Scripts.Ev004.1.Content`)
        const result = (await Options([
            // その通り。
            `Scripts.Ev004.1.1.Action`,
            // そんなことはないよ。
            `Scripts.Ev004.1.2.Action`,
            // きっと、事情があるはず。
            `Scripts.Ev004.1.3.Action`,
            // ………。
            `Scripts.Ev004.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……やっぱり…。
                await Content(`Scripts.Ev004.1.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // …ホントにそう思う{{go03}}？
                await Content(`Scripts.Ev004.1.2.Reply`)
                break;
            case 2:
                // [開心]
                EmojiAndAdjustLove(14)
                // もそう信じたい{{go01}}…。
                await Content(`Scripts.Ev004.1.3.Reply`)
                break;
            case 3:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // ね…ねぇ……。
                await Content(`Scripts.Ev004.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        appServ.setBGM('music21')
        Face('char02');
        /*
        {{dragonName}} の心の傷は、意外と深いっすね…。
        さて、{{yourName}} さんは {{varItemName[17]}} というのを知ってるっすか？
        これは、他のアイテムと一緒に使うことで アイテムが持つ属性の力を引き出す、
        特殊なアイテムっす。 ただ、このアイテムを使って竜に属性を与え続けていると
        突然 竜の姿が変化してしまう、そんな事例も確認されてるっす。
        孤竜に属性を与えると試合でも有利になるっすから、ぜひ使ってみようっす。
        */
        await Content(`Scripts.Ev004.2`, { varItemName: 'Data.Item.17.Title' })
        Face('char02a');
    } else {
        appServ.setBGM('music21')
    }
    SetContentCompleted()
}

export default ev004;