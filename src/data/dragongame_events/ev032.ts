import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev032 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
……この前、トモダチとケンカしたって言ったよね？
実はあれから、その仔と仲直りした{{go01}}。
また一緒に遊ぼうね、って言ってくれた{{go01}}！
         */
        Content(`Scripts.Ev032.1.Content`)
        const result = (await Options([
            // そうか、よかったね！
            `Scripts.Ev032.1.1.Action`,
            // どうやって仲直りしたの？
            `Scripts.Ev032.1.2.Action`,
            // 相手も仲直りしたかった？
            `Scripts.Ev032.1.3.Action`,
            // なんだ、ケンカやめたのか。
            `Scripts.Ev032.1.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うん♪  やっぱり仲直りしてよかった{{go01}}。
                await Content(`Scripts.Ev032.1.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ……ないしょ！
                await Content(`Scripts.Ev032.1.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // うん……きっと、そう思ってるはず{{go00}}{{go01}}。
                await Content(`Scripts.Ev032.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(16)
                // {{you}} は、ケンカが好きだった{{go03}}？
                await Content(`Scripts.Ev032.1.4.Reply`)
                break;
        }
    } else {
        Face('char01');
        /** 
"そういえば{{dragonName}}、最近 他の孤竜たちとも仲良くなってきたっす。
ボクたちとの接し方にも、余裕が感じられる気がするっすよ。
今までずっと、自分の病気のことで精一杯だったっすからね…。
これも{{yourName}} さんのおかげっすね♪"
*/
        await Content(`Scripts.Ev032.2`)
        Face('char01a');
    }
    SetContentCompleted()
}

export default ev032;