import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev087 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char02')
        /**
            いろいろあって棚上げしてたっすが、「忌地への道標」に
            書かれてたヒント、何とかして解かないといけないっすね。
            どうっすか？  {{yourName}} さんは、分かったっすか？
            ボク……こういうの苦手っすよぅ……。
         */
        await Content(`Scripts.Ev087.1`)
        Face('char02a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            うーん……{{my}}……こういうの苦手……。
            {{you}}は、何か分かった{{go03}}
         */
        Content(`Scripts.Ev087.2.Content`)
        const result = (await Options([
            // 自分も苦手……。
            `Scripts.Ev087.2.1.Action`,
            // 謎は全て解けた！
            `Scripts.Ev087.2.2.Action`,
            // こんなのも分かんないの？
            `Scripts.Ev087.2.3.Action`,
            // もう、どうでもいいや。
            `Scripts.Ev087.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // くすっ、なんだかおかしい{{go01}}！
                await Content(`Scripts.Ev087.2.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // きゅう！  やっぱり{{you}}ってすごい！
                await Content(`Scripts.Ev087.2.2.Reply`)
                break;
            case 2:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // ぷぅ……だって{{my}}、まだ仔ども{{go00}}{{go01}}！
                await Content(`Scripts.Ev087.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情 
                EmojiAndAdjustLove(6)
                // そんなこと、言わないでほしい{{go01}}……。
                await Content(`Scripts.Ev087.2.4.Reply`)
                break;
        }
    } else {
        Face('char02')
        /**
            ……どうして、この手の文章ってのは、謎かけになってるんっすかねぇ？
            ボクたち、もうせっぱ詰まってるんっすから、
            もうちょっと簡単なヒントをもらいたかったっすよ～。
         */
        await Content(`Scripts.Ev087.3`)
        Face('char02a')
    }
    SetContentCompleted()
}

export default ev087;