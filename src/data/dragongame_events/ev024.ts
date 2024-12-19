import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev024 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char02');
        /**
            発作を和らげる薬は見つかってるけれど、竜死病そのものを
            根本的に治療する薬は、まだできていないっすね…。
            世界中の人たちが研究してるのに、少しも成果が上がっていないなんて……。
            とにかく、ボクもいろいろと調べてみようと思ってるっす。
            資料館に行って、資料をかたっぱしから読んでみるっすよ！
            {{yourName}}さんは、{{dragonName}} のコト、よろしくお願いするっす！
         */
        await Content(`Scripts.Ev024.1`)
        Face('char02a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
            むにゃむにゃ…… なんだか、眠い{{go01}}……。
            せっかく、{{you}}が来てくれたのにぃ……。
         */
        Content(`Scripts.Ev024.2.Content`)
        const result = (await Options([
            // 無理しなくていいよ。
            `Scripts.Ev024.2.1.Action`,
            // しっかりしてほしい。
            `Scripts.Ev024.2.2.Action`,
            // 具合でも悪い？
            `Scripts.Ev024.2.3.Action`,
            // だらしないな。
            `Scripts.Ev024.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ありがとう♪ {{you}}が帰ったら寝る{{go01}}。
                await Content(`Scripts.Ev024.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ごめん…できるだけがんばる{{go01}}。
                await Content(`Scripts.Ev024.2.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // 気づかってくれて、ありがとう。今は大丈夫{{go00}}{{go01}}。
                await Content(`Scripts.Ev024.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …ごめん……。
                await Content(`Scripts.Ev024.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev024;