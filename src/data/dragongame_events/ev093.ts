import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev093 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Emoji, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        /**
            {{dragonName}} 、反省してるっす。
            これから謝りたいって、言ってるっすよ。
         */
        await Content(`Scripts.Ev093.1`)
        Face('char01a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ……んと……その……。
         */
        Content(`Scripts.Ev093.2.Content`)
        Emoji(1)
        const result = (await Options([
            // 病気なんだから仕方ないさ。
            `Scripts.Ev093.2.1.Action`,
            // もう、あんなこと言うな。
            `Scripts.Ev093.2.2.Action`,
            // いつか、必ず会いに行くよ。
            `Scripts.Ev093.2.3.Action`,
            // もう、うんざりだ。
            `Scripts.Ev093.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // でも、ごめん……。
                await Content(`Scripts.Ev093.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // うん……。
                await Content(`Scripts.Ev093.2.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // きゅ……きゅうぅ～……。
                await Content(`Scripts.Ev093.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // う、うえええぇぇん！！
                await Content(`Scripts.Ev093.2.4.Reply`)
                break;
        }
    } else {
        Face('char08')
        /**
            ボクたちが孤竜にできることは、多くはないっすよね。
            なけなしの看病で、苦しみを和らげることくらいしかできないっす。
            でも、想いを伝えようとすることはできるっす。
            それが「おもいやり」ってことなんっすよね！
         */
        await Content(`Scripts.Ev093.3`)
        Face('char08a')
    }
    SetContentCompleted()
}

export default ev093;