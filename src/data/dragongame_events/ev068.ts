import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev068 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music05')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04')
        /**
            {{yourName}}さん、聞いてくださいっす！
            別の竜舎での話なんっすが、里親と孤竜がケンカしたんっす。
            その理由が「孤竜が思うとおりに育たないから」らしいんっすよ！
            まったく、何を考えてるんっすかね！！
         */
        await Content(`Scripts.Ev068.1`)
        Face('char04a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ニエルサンのお話……聞いた？
            {{my}}……信じられない……。
         */
        Content(`Scripts.Ev068.2.Content`)
        const result = (await Options([
            // 誰なんだろうな…そいつ。
            `Scripts.Ev068.2.1.Action`,
            // 気晴らしだからな、これ。
            `Scripts.Ev068.2.2.Action`,
            // いろいろいるんだよ…。
            `Scripts.Ev068.2.3.Action`,
            // 信じられないなぁ…。
            `Scripts.Ev068.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // ホント！　{{my}}も許せない{{go01}}！
                await Content(`Scripts.Ev068.2.1.Reply`)
                break;
            case 1:
                // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // じゃあ、{{you}}も「みがって」なの？
                await Content(`Scripts.Ev068.2.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そうだね……{{you}}みたいな、やさしい「さとおや」もいる{{go01}}。
                await Content(`Scripts.Ev068.2.3.Reply`)
                break;
            case 3:
                // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // {{my}}も今まで、考えたこともなかった{{go01}}！
                await Content(`Scripts.Ev068.2.4.Reply`)
                break;
        }
    } else {
        Face('char02')
        /**
            孤竜はオモチャじゃないっす！
            ボクたちは少なくともそう思ってるっす。
            でも、それを里親のみんなに求めるのは、やっぱり難しいんっすかね……。
            ボクは、悲しいっすよ……。
         */
        await Content(`Scripts.Ev068.3`)
        Face('char02a')
    }
    SetContentCompleted()
}

export default ev068;