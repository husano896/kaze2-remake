import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev095 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Emoji, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music10')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        /**
            {{yourName}}さん、ようやく分かったっす！
            「忌地への道標」に書かれた「尽きる事無き神獣の持つ灯火」の意味が！
            「水晶ランタン」、これが必要なんっす。
            「ニステアの滴」と「水入り水晶ランタン」……これがあれば
            研究者さんたちに、{{dragonName}} を治してもらえるっすよ。
         */
        await Content(`Scripts.Ev095.1`)
        Face('char01a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            …………ん？
            {{you}}…ごめん。{{my}}、なんだか起きてるのがつらい{{go01}}…。
            今日も、どこかに行く{{go03}}？
         */
        Content(`Scripts.Ev095.2.Content`)
        const result = (await Options([
            // 今日も元気にいくぞ！
            `Scripts.Ev095.2.1.Action`,
            // 今日は、やめとこう。
            `Scripts.Ev095.2.2.Action`,
            // 苦しいけどあと少しだから。
            `Scripts.Ev095.2.3.Action`,
            // 無理は禁物だよ。
            `Scripts.Ev095.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // …………うん。
                await Content(`Scripts.Ev095.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ごめんね……。
                await Content(`Scripts.Ev095.2.2.Reply`)
                break;
            case 2:
                // [沮喪]
                EmojiAndAdjustLove(6)
                // ……それって、{{my}}の命のこと？
                await Content(`Scripts.Ev095.2.3.Reply`)
                break;
            case 3:
                // [高興]
                EmojiAndAdjustLove(14)
                // ありがとう……{{you}}。
                await Content(`Scripts.Ev095.2.4.Reply`)
                break;
        }
    } else {
        Face('char02')
        /**
            もう、あんまり無理はできないっす。
            時間が……もう……。
            あと少し、あと少しっすのに……。
         */
        await Content(`Scripts.Ev095.3`)
        Face('char02a')
    }
    SetContentCompleted()
}

export default ev095;