import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev018 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music20')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04');
        /**
ちょっと厳しかった……っすか？
まだ小さい{{dragonName}} にとっては残酷なことかもしれないっすが、
これから {{dragonName}} が、病気という現実と向き合って、闘っていくためには、
どうしても言っておきたかったんっす。
ボクは、数えきれないほど多くの孤竜たちに このことを告げてきたっすが、
何度伝えても、胸が苦しくなるっすね……。
         */
        await Content(`Scripts.Ev018.1`);
        Face('char04a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
さっき、トモダチに、{{my}}がかかってる病気のことを聞いてみた{{go01}}。
竜死病って、世界じゅうで流行してるんだって。
そして、治す方法がまだ見つかってないんだ……って。
やっぱり、{{my}}は……死んじゃうんだ……。
         */
        Content(`Scripts.Ev018.2.Content`)
        const result = (await Options([
            // ……。
            `Scripts.Ev018.2.1.Action`,
            // そんなに悲観しちゃダメだ。
            `Scripts.Ev018.2.2.Action`,
            // 短い余生を大切に送ろう。
            `Scripts.Ev018.2.3.Action`,
            // 死ぬのが怖い？
            `Scripts.Ev018.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // 答非所問
                EmojiAndAdjustLove(11)
                // はぁ……もうダメ{{go00}}{{go01}}…。
                await Content(`Scripts.Ev018.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そ、そうだよね……。
                await Content(`Scripts.Ev018.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……。
                await Content(`Scripts.Ev018.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……。
                await Content(`Scripts.Ev018.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev018;