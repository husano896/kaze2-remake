import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev035 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char04');
        /**
"いやぁ……ひどい目にあったっす！
最近、孤竜たちの間で、服や毛に引っつく草の実をぶつけ合う遊びが
流行ってるみたいなんっすが、さっきも{{dragonName}} とその友だちに
いっぱいくっつけられたっすぅ……。
{{yourName}}さんからも叱っといてくださいっす。"
         */
        await Content(`Scripts.Ev035.1`)
        Face('char04a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
         * "さっき、ニエルサンに ゲンコツされた{{go01}}…。
ニエルサンに「いたずらもほどほどにするっす！」って怒られて、
すっごく痛かった{{go01}}……。
ねぇ、やっぱり{{my}}が悪い{{go03}}？"
         */
        Content(`Scripts.Ev035.2.Content`)
        const result = (await Options([
            // ちゃんと謝っとけよ。
            `Scripts.Ev035.2.1.Action`,
            // たまにはいいんじゃない？
            `Scripts.Ev035.2.2.Action`,
            // もっと大きな事してみたら？
            `Scripts.Ev035.2.3.Action`,
            // やり過ぎると捨てられるぞ。
            `Scripts.Ev035.2.4.Action`
        ]));
        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] 
                EmojiAndAdjustLove(14)
                // たまにはいいんじゃない？
                await Content(`Scripts.Ev035.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // もっと大きな事してみたら？
                await Content(`Scripts.Ev035.2.2.Reply`)
                break;
            case 2:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // え……{{my}}……そんなこと、したくない{{go01}}。
                await Content(`Scripts.Ev035.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……やだ……そんなのやだぁ……ぐすっ……。
                await Content(`Scripts.Ev035.2.4.Reply`)
                break;
        }
    } else {
        Face('char01');
        /*
"まぁ、元気なのはいいことなんっすが、ボクの体毛にアレがひっつくと、
なかなか取るのが大変なんっす……。
{{yourName}}さんは、どうっすか？  毛の手入れとか大丈夫っすか？"
        */
        await Content(`Scripts.Ev035.3`);
        Face('char01a');
    }
    SetContentCompleted()
}

export default ev035;