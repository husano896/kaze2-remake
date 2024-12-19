import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { BioFlag } from "../BioFlag";

const ev079 = async (component: DragongameComponent) => {

    const { hideLayer, saveData, appServ, Emoji, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music20')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char06')
        /**
            はぁ…今朝、また孤竜が亡くなったっす。手のつけようのない発作だったっすよ。
            {{dragonName}}  と仲の良かった仔だったっすのに……。
            お見舞いのためにつんだ花……間に合わなかったっすね…。
            {{dragonName}} 、すごくショックだったみたいで……
            しばらく声がかけられなかったっすよ。
            今はそっとしておいたほうがいいかもしれないっすね……。
         */
        await Content(`Scripts.Ev079.1`)
        Face('char06a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ……ぐすっ……ひっく……。
         */
        Content(`Scripts.Ev079.2.Content`)
        Emoji(6)
        const result = (await Options([
            // 泣くなよ……な？
            `Scripts.Ev079.2.1.Action`,
            // 泣いても何も変わらないぞ。
            `Scripts.Ev079.2.2.Action`,
            // 泣くな！
            `Scripts.Ev079.2.3.Action`,
            // キミが泣くと自分も悲しい。
            `Scripts.Ev079.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // だって……ひっく。
                await Content(`Scripts.Ev079.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // うえ……うえええええん！
                await Content(`Scripts.Ev079.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // うっ……うわぁぁぁぁ！
                await Content(`Scripts.Ev079.2.3.Reply`)
                break;
            case 3:
                // [高興]
                EmojiAndAdjustLove(14)
                // うん、ごめん……ぐすっ。
                await Content(`Scripts.Ev079.2.4.Reply`)
                break;
        }
    } else {
        Face('char04')
        hideLayer('Ray1')
        saveData.bio |= BioFlag.眠酔;
        /**
            あんなに星が流れたなら、孤竜たちの病を治してほしいってお願いも、
            一つぐらいは聞いてくれたかもしれないっすね。
            こういうことは 子どものすることかもしれないっすけれど、
            不幸な運命を背負う多くの孤竜のために、ボク、一生懸命お願いしたっすよ。
         */
        await Content(`Scripts.Ev079.3`)
        Face('char04a')
    }
    SetContentCompleted()
}

export default ev079;