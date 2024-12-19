import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev039 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char01');
        /**
            えっと、{{yourName}} さん。なんだか、孤竜たちがおかしなことを始めたっす。
            {{yourName}}さんたちの世界の「がっこう」のことを聞き回って、
            自分たちも「がっこう」をやってみようとかって。
            ……ところで、「がっこう」って何なんっすか？
         */
        await Content(`Scripts.Ev039.1`)
        Face('char01a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
            あ！　{{you}}！
            「がっこう」では、いつも何をやってる{{go04}}？
         */
        Content(`Scripts.Ev039.2.Content`)
        const result = (await Options([
            // ある意味、拷問だ。
            `Scripts.Ev039.2.1.Action`,
            // みんなで遊ぶところ。
            `Scripts.Ev039.2.2.Action`,
            // いろいろ勉強するんだ。
            `Scripts.Ev039.2.3.Action`,
            // 給食、うまいぞ～。
            `Scripts.Ev039.2.4.Action`
        ]));
        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情 
                EmojiAndAdjustLove(6)
                // じゃあ……楽しいとこっていうのは、ウソだった{{go03}}？
                await Content(`Scripts.Ev039.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // きゅ～♪ {{my}}も行ってみたい{{go01}}！
                await Content(`Scripts.Ev039.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情 
                EmojiAndAdjustLove(6)
                // 「べんきょう」って、やなことって聞いた{{go01}}……。
                await Content(`Scripts.Ev039.2.3.Reply`)
                break;
            case 3:
                // [高興]
                EmojiAndAdjustLove(14)
                // 知ってる！ {{my}}も食べてみたい{{go01}}～！
                await Content(`Scripts.Ev039.2.4.Reply`)
                break;
        }
    } else {
        Face('char01');
        /*
            ようやく「がっこう」っていうものが何なのか、分かってきたっすよ。
            こっちの世界には、{{yourName}} さんの世界のほうにある
            「だいがく」に当たるものがあるだけっす。
            簡単な読み書きや計算だけなら、親や近所のお年寄りから教わるんっすが、
            ちゃんとした教育や習い事を受けられるのは、人も竜も、お金持ちだけなんっす。
        */
        await Content(`Scripts.Ev039.3`);
        Face('char01a');
    }
    SetContentCompleted()
}

export default ev039;