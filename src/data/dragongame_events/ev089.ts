import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev089 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04')
        /**
            うん……やっぱりそれしか考えられないっす。
            {{yourName}}さん！  「道標」に書かれていた
            「島持つ岬より降りし知恵の滴り」っていう一文。
            まだ確かな証拠はつかんでないっすが、あれはきっと
            「ニステアの滴」のことっすよ！
         */
        await Content(`Scripts.Ev089.1`)
        Face('char04a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ねぇ！ ニエルサンの話聞いた！？
            泣き虫の星さんは、やっぱりすごい{{go01}}！
         */
        Content(`Scripts.Ev089.2.Content`)
        const result = (await Options([
            // うん。そうだな。
            `Scripts.Ev089.2.1.Action`,
            // 単なる偶然だよ。
            `Scripts.Ev089.2.2.Action`,
            // そんなことがあるんだなぁ。
            `Scripts.Ev089.2.3.Action`,
            // ニエルの勘違いかも。
            `Scripts.Ev089.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // きゅぅ～♪
                await Content(`Scripts.Ev089.2.1.Reply`)
                break;
            case 1:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // むぅ……{{you}}って「げんじつてき」{{go00}}{{go01}}。
                await Content(`Scripts.Ev089.2.2.Reply`)
                break;
            case 2:
                // [驚訝]
                EmojiAndAdjustLove(15)
                // ホント……ふしぎ{{go00}}{{go01}}。
                await Content(`Scripts.Ev089.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // う……そうだったら、イヤ{{go00}}{{go01}}。
                await Content(`Scripts.Ev089.2.4.Reply`)
                break;
        }
    } else {
        Face('char01')
        /**
            もし、これで答えが合っているなら、後はもう一つのヒントの
            「尽きる事無き神獣の持つ灯火」、これだけっすね……。
            {{yourName}}さんも、一緒に考えてくださいっす！
         */
        await Content(`Scripts.Ev089.3`)
        Face('char01a')
    }
    SetContentCompleted()
}

export default ev089;