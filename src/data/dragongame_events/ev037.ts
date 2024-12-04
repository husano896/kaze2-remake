import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev037 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
"ねえねえ、{{you}}！
さっきトモダチから聞いたんだけど、{{you}}のいる世界には
「がっこう」ってところがあるって、ホント？"
         */
        Content(`Scripts.Ev037.1.Content`)
        const result = (await Options([
            // よけいなことは聞くな。
            `Scripts.Ev037.1.1.Action`,
            // うん、本当だよ。
            `Scripts.Ev037.1.2.Action`,
            // さぁ、どうだろう？
            `Scripts.Ev037.1.3.Action`,
            // 毎日行ってるよ。
            `Scripts.Ev037.1.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // う……ごめん。
                await Content(`Scripts.Ev037.1.1.Reply`)
                break;
            case 1:
                // [高興] +
                EmojiAndAdjustLove(14)
                // そっかぁ～、{{my}}も行ってみたい{{go01}}！
                await Content(`Scripts.Ev037.1.2.Reply`)
                break;
            case 2:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // むー、ちゃんと答えてほしい{{go01}}！！
                await Content(`Scripts.Ev037.1.3.Reply`)
                break;
            case 3:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ホント！？  あとでお話聞かせてほしい{{go01}}！
                await Content(`Scripts.Ev037.1.4.Reply`)
                break;
        }
    } else {
        Face('char00');
        /** 
"あのね、他のトモダチも「がっこう」のこと、教えてほしいって。
{{my}}にも、いっぱいお話 聞かせてほしい{{go01}}。"
*/
        await Content(`Scripts.Ev037.2`)
    }
    SetContentCompleted()
}

export default ev037;