import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev076 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music20')
    if (appServ.waitTimeMinutes >= 60) {
       
        Face('char06')
        /**
            先日、別舎の孤竜が亡くなったっす……。
            しばらくそういうことがなかったから、みんなかなり動揺してるっすよ…。
            {{dragonName}} も、それ以来ひどく落ち込んでるみたいっすから、
            早く顔を見せてあげてくださいっす。
         */
        await Content(`Scripts.Ev076.1`)
        Face('char06a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            …………………………。
            ねぇ……{{my}}がいなくなったら、{{you}}は、どう思う{{go04}}？
         */
        Content(`Scripts.Ev076.2.Content`)
        const result = (await Options([
            // うーん……。
            `Scripts.Ev076.2.1.Action`,
            // そんなこと言うな！
            `Scripts.Ev076.2.2.Action`,
            // ……考えたくない。
            `Scripts.Ev076.2.3.Action`,
            // そうならないよう頑張ろう。
            `Scripts.Ev076.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // {{my}}……いなくなっても、いい{{go03}}…？
                await Content(`Scripts.Ev076.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(14)
                // うん……ごめん。
                await Content(`Scripts.Ev076.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // でも、いつか{{my}}も、そうなるかもしれない{{go01}}…。
                await Content(`Scripts.Ev076.2.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // きゅ……うん……。
                await Content(`Scripts.Ev076.2.4.Reply`)
                break;
        }
    } else {
        Face('char10')
        /**
            生きものって、何で死ぬんっすかね……？
            どんなに懸命に生きていても、何かの拍子に、取り返しのつかないことになるっす。
            ボクも {{yourName}} さんも、生きている限り、いずれは死ぬ宿命にあるっすよね。
            生きてるから死んでしまうのか、それとも、死ぬために生きてるのか……
            ふと、分からなくなることがあるっすよ。
         */
        await Content(`Scripts.Ev076.3`)
        Face('char10a')
    }
    SetContentCompleted()
}

export default ev076;