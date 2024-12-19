import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev077 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music20')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        /**
            昨日の晩、レビアタンの海のほうの空に、ものすごい流れ星が現れたっす！
            空の星が全部落っこちてくるかと思うくらいの……。
            「ニステア流星群」……ほら、ちょっと前に言った泣き虫星のお話。
            そのもとになった流星群っすよ。
         */
        await Content(`Scripts.Ev077.1`)
        Face('char01a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            聞いて聞いて！ 昨日の流れ星、すっごくきれいだった{{go01}}！
            {{you}}の住んでるところは、お星様にお願いしたりする{{go03}}？
            もしするとしたら、どんなお願いをする{{go04}}？
         */
        Content(`Scripts.Ev077.2.Content`)
        const result = (await Options([
            // キミの病気が治るように。
            `Scripts.Ev077.2.1.Action`,
            // 大金持ちになりたい！
            `Scripts.Ev077.2.2.Action`,
            // みんなが幸せになるように。
            `Scripts.Ev077.2.3.Action`,
            // 願掛けなんて、迷信だよ。
            `Scripts.Ev077.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // {{my}}……す…少し照れる{{go01}}。ありがとう♪
                await Content(`Scripts.Ev077.2.1.Reply`)
                break;
            case 1:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // お金、そんなに欲しい{{go03}}？
                await Content(`Scripts.Ev077.2.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そう{{go00}}{{go01}}……。  みんな幸せなら、{{my}}もうれしい{{go01}}♪
                await Content(`Scripts.Ev077.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……{{my}}、そうは思わない{{go01}}。
                await Content(`Scripts.Ev077.2.4.Reply`)
                break;
        }
    } else {
        Face('char10')
        /**
            あんなに星が流れたなら、孤竜たちの病を治してほしいってお願いも、
            一つぐらいは聞いてくれたかもしれないっすね。
            こういうことは 子どものすることかもしれないっすけれど、
            不幸な運命を背負う多くの孤竜のために、ボク、一生懸命お願いしたっすよ。
         */
        await Content(`Scripts.Ev077.3`)
        Face('char10a')
    }
    SetContentCompleted()
}

export default ev077;