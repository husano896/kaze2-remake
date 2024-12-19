import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev026 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            さっき、ニエルサンに頼まれて、街の外におつかいに出かけた{{go01}}。
            そうしたら、海岸に大きな鉄の舟が突き刺さって立ってた{{go01}}。
            もしかしたら、あれが、大昔に人と竜のケンカで使われた{{go03}}？
            {{my}}は…あんな怖い舟とは戦いたくない{{go01}}。
            命がいくつあっても、足りなそうな気がする{{go01}}……。
         */
        Content(`Scripts.Ev026.1.Content`)
        const result = (await Options([
            // 冒険してみたいな。
            `Scripts.Ev026.1.1.Action`,
            // キミなら大丈夫。
            `Scripts.Ev026.1.2.Action`,
            // またケンカが起こるかも。
            `Scripts.Ev026.1.3.Action`,
            // 近づかない方がいい。
            `Scripts.Ev026.1.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [驚訝]
                EmojiAndAdjustLove(15)
                // でも少し無理っぽかった{{go01}}。入口がなさそうだったし…。
                await Content(`Scripts.Ev026.1.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …ぶるぶるっ！ そんな自信、ない{{go01}}。
                await Content(`Scripts.Ev026.1.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // そんなの、イヤ{{go00}}{{go01}}。
                await Content(`Scripts.Ev026.1.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // そうだよね…。今度からそうする{{go01}}。
                await Content(`Scripts.Ev026.1.4.Reply`)
                break;
        }
    } else {
        Face('char00');
        /** 大昔の人たちは、どうして竜と仲良くできなかったんだろう……。 */
        await Content(`Scripts.Ev026.2`)
    }
    SetContentCompleted()
}

export default ev026;