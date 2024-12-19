import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

/** 「想いの絵」 */
const ev099 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music23')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char06');
        /**
            ……ごめんなさいっす。
            {{dragonName}} 、もう起き上がれそうもないっす。
            探索も、試合も、治療のために移動するのも、もう無理っすよ……。
            多分……次の発作がくるのも、時間の問題っす……。
         */
        await Content(`Scripts.Ev099.1`);
        Face('char06a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
            夢を……見た{{go01}}……。
            {{my}}と、トモダチと、ニエルサンと……{{you}}がいて……。
            歌ったり、いたずらしたり、ピクニック行ったりした{{go01}}。
            すごく……楽しかった。
         */
        Content(`Scripts.Ev099.2.Content`)
        const result = (await Options([
            // …………。
            `Scripts.Ev099.2.1.Action`,
            // 夢なんかじゃ、ないよ。
            `Scripts.Ev099.2.2.Action`,
            // やめろよ！ そんな話！
            `Scripts.Ev099.2.3.Action`,
            // 夢より、現実を見ろ。
            `Scripts.Ev099.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // そんな顔……しないでほしい{{go01}}……。
                await Content(`Scripts.Ev099.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // うん……きっと、夢なんかじゃ……ない{{go01}}……。
                await Content(`Scripts.Ev099.2.2.Reply`)
                break;
            case 2:
                // [高興...]
                EmojiAndAdjustLove(14)
                // くすっ……心配しなくても、{{my}}は平気{{go00}}{{go01}}……♪
                await Content(`Scripts.Ev099.2.3.Reply`)
                break;
            case 3:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // もうすぐ、「てんごく」が{{my}}の現実になる{{go00}}{{go01}}……。
                await Content(`Scripts.Ev099.2.4.Reply`)
                break;
        }
    }
    else {
        Face('char06');
        /**
            ボクは……。
            ボクたちは……もう間に合わなかったっす。
            あの仔に、何も……してあげられなかった……。
         */
        await Content(`Scripts.Ev099.3`)
        Face('char06a');
    }
    SetContentCompleted()
}

export default ev099;