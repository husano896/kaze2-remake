import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev078 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            今度、具合の悪いトモダチのお見舞いにお花を持っていくんだけど、
            どんな花を摘んで行こうか、迷っている{{go01}}。
            {{you}}なら、どういう花がいい{{go04}}？
         */
        Content(`Scripts.Ev078.1.Content`)
        const result = (await Options([
            // バラのような、派手な花。
            `Scripts.Ev078.1.1.Action`,
            // 紫陽花みたいな落ち着いた花。
            `Scripts.Ev078.1.2.Action`,
            // タンポポみたいな野草かな。
            `Scripts.Ev078.1.3.Action`,
            // 花は好きじゃない。
            `Scripts.Ev078.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // うーん…トモダチもそういうものを欲しがってる{{go03}}？
                await Content(`Scripts.Ev078.1.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // お見舞いに似あいそう{{go00}}{{go01}}。…じゃ、アジサイにする{{go01}}。
                await Content(`Scripts.Ev078.1.2.Reply`)
                break;
            case 2:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // そ……そう{{go00}}{{go01}}。
                await Content(`Scripts.Ev078.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // そう……でも、花ってきれい{{go00}}{{go01}}。
                await Content(`Scripts.Ev078.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char02');
        /** 
            最近、竜舎の中に花が絶えないっす……。
            お祝いの花だったらいいんっすが…お弔いの献花だったりすることが
            多いっすから、気がめいるっす。
            もちろん、花には何の罪もないんっすがね。
        */
        await Content(`Scripts.Ev078.2`)
        Face('char02a')
    }
    SetContentCompleted()
}

export default ev078;