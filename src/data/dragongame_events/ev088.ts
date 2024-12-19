import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev088 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04')
        /**
            うぐぅ……もう文字を見るのもいやっすぅ……。
            でも、頑張らないと……でも、しんどいっすぅ……。
         */
        await Content(`Scripts.Ev088.1`)
        Face('char04a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            きゅぅ～う。
            {{my}}、目がチカチカする{{go01}}～。
         */
        Content(`Scripts.Ev088.2.Content`)
        const result = (await Options([
            // おいおい……。
            `Scripts.Ev088.2.1.Action`,
            // 無茶しすぎ！
            `Scripts.Ev088.2.2.Action`,
            // 肩もんでもらったら？
            `Scripts.Ev088.2.3.Action`,
            // 何か、できることない？
            `Scripts.Ev088.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [驚訝]
                EmojiAndAdjustLove(15)
                // だって、もう少しで{{my}}たちの病気、治る{{go01}}。
                await Content(`Scripts.Ev088.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // うん。でも…がんばりたい{{go01}}。
                await Content(`Scripts.Ev088.2.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // うん。そうする{{go01}}！
                await Content(`Scripts.Ev088.2.3.Reply`)
                break;
            case 3:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ありがと♪ その気持ちだけでもうれしい{{go01}}！
                await Content(`Scripts.Ev088.2.4.Reply`)
                break;
        }
    } else {
        Face('char01')
        /**
            う～、さっき孤竜と肩のもみ合いっこしたっす。 ずいぶん楽になったっす♪
            もうお世話する側とか、される側とかなんて関係ないっすよ！
            みんな、一緒に戦う仲間っす！
            もちろん{{yourName}} さんもっすよ！
         */
        await Content(`Scripts.Ev088.3`)
        Face('char01a')
    }
    SetContentCompleted()
}

export default ev088;