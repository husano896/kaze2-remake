import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev020 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music18')
    if (appServ.waitTimeMinutes >= 60) {
        Emoji(6)
        Face('char00');
        /**
"{{my}}、やっぱり、どうしても不安{{go00}}{{go01}}…。
怖い{{go01}}。{{my}}、これからだんだん病気がひどくなって、そして死んじゃう{{go03}}？
どうして……どうして{{my}}は、死ななきゃいけない{{go04}}？
こんな怖い思いをして、苦しんで、死んでいくなんて…。
{{my}}は、どうして生まれてきた{{go01}}……。"
         */
        Content(`Scripts.Ev020.1.Content`)
        const result = (await Options([
            // キミを必要とする人がいる。
            `Scripts.Ev020.1.1.Action`,
            // 生まれた理由なんてない。
            `Scripts.Ev020.1.2.Action`,
            // 必要のない命なんてない。
            `Scripts.Ev020.1.3.Action`,
            // 小さいことにこだわるな。
            `Scripts.Ev020.1.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // で…でも、{{my}}のお母さんは、{{my}}のことを……。
                await Content(`Scripts.Ev020.1.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // {{my}} は深く考えすぎだった{{go03}}？
                await Content(`Scripts.Ev020.1.2.Reply`)
                break;
            case 2:
                // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // うぅ……。
                await Content(`Scripts.Ev020.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // 小さくなんかない{{go01}}！ {{you}}は、死ぬってこと、考えたことがある{{go03}}？
                await Content(`Scripts.Ev020.1.4.Reply`)
                break;
        }
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00')
        Emoji(6)
        await Content(`Scripts.Ev020.2`)
    }
    SetContentCompleted()
}

export default ev020;