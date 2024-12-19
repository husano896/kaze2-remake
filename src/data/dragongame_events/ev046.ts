import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev046 = async (component: DragongameComponent) => {

    const { Emoji, saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    // 若先前貓事件失敗，則取消貓事件開關
    if (saveData.ivent & EventFlag.貓事件 && saveData.ivent & EventFlag.貓事件失敗) {
        saveData.ivent ^= EventFlag.貓事件;
    }
    appServ.setBGM('music05')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00')
        if (saveData.ivent & EventFlag.貓事件) {
            //#region 貓事件分歧
            appServ.setBGM('music05')
            /**
                ……どうしよう……。
                ねこさん……病気になっちゃった{{go01}}……。
                体が震えてて、今すぐにも死んじゃいそう{{go00}}{{go01}}…。
                ニエルサンは、「街の東街道沿いの『トピリアの森』に生えている草を
                今すぐ採ってきて、煎じて飲ませれば助かるかもしれない」って言うんだけど…
                ……これから、採りに行きたい{{go01}}！ …行っても、いい{{go03}}？
                [今すぐここから出なければ、失敗する。]
             */
            Content(`Scripts.Ev046.Neko.1.Content`)
            Emoji(6)
            const result = (await Options([
                // そうだな、早く治さないと。
                `Scripts.Ev046.Neko.1.1.Action`,
                // ああ、十分気をつけろよ。
                `Scripts.Ev046.Neko.1.2.Action`,
                // 少したてば、治るかも？
                `Scripts.Ev046.Neko.1.3.Action`,
                // ダメ。猫よりキミが心配。
                `Scripts.Ev046.Neko.1.4.Action`
            ]));
            switch (result.index) {
                case 0:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // うん！  ありがとう。
                    await Content(`Scripts.Ev046.Neko.1.1.Reply`)
                    break;
                case 1:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // うん…分かった{{go01}}。
                    await Content(`Scripts.Ev046.Neko.1.2.Reply`)
                    break;
                case 2:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // でも……でも……すごく苦しそう{{go00}}{{go01}}。
                    await Content(`Scripts.Ev046.Neko.1.3.Reply`)
                    break;
                case 3:
                    // [生氣] + 表情 
                    EmojiAndAdjustLove(2)
                    // {{you}}の……バカっ！
                    await Content(`Scripts.Ev046.Neko.1.4.Reply`)
                    break;
            }
            //#endregion
        }
        else {
            //#region 一般事件
            appServ.setBGM('music21')
            /**
                ねぇ……{{you}}……。
                {{you}} には「夢」ってある{{go03}}？
                大きくなったら、何になりたい{{go04}}？
             */
            Content(`Scripts.Ev046.Normal.1.Content`)
            const result = (await Options([
                // いや、もう大人だし…。
                `Scripts.Ev046.Normal.1.1.Action`,
                // あまり考えたことはない。
                `Scripts.Ev046.Normal.1.2.Action`,
                // まだ決まってないんだ。
                `Scripts.Ev046.Normal.1.3.Action`,
                // 今、夢を追って頑張ってる。
                `Scripts.Ev046.Normal.1.4.Action`
            ]));
            switch (result.index) {
                case 0:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // 大人になると、夢は見ない{{go03}}？
                    await Content(`Scripts.Ev046.Normal.1.1.Reply`)
                    break;
                case 1:
                    // [高興
                    EmojiAndAdjustLove(14)
                    // なーんだぁ……つまんない{{go01}}。
                    await Content(`Scripts.Ev046.Normal.1.2.Reply`)
                    break;
                case 2:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // そっかぁ……。
                    await Content(`Scripts.Ev046.Normal.1.3.Reply`)
                    break;
                case 3:
                    // [生氣] + 表情 
                    EmojiAndAdjustLove(2)
                    // そうなの？  すごい{{go01}}！ 頑張ってね！
                    await Content(`Scripts.Ev046.Normal.1.4.Reply`)
                    break;
            }
            //#endregion
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        saveData.ivent |= EventFlag.回答事件;


        if (saveData.ivent & EventFlag.貓事件) {
            //#region 貓事件分歧
            if (saveData.ivent & EventFlag.貓咪飼料草) {
                //#region 貓事件成功
                appServ.setBGM('music01')
                await Content(`Scripts.Ev046.Neko.2.Complete`)
                //#endregion
            }
            else {
                //#region 貓事件失敗
                appServ.setBGM('music20')
                Emoji(6)
                saveData.ivent ^= EventFlag.貓事件;
                await Content(`Scripts.Ev046.Neko.2.Fail`)
                //#endregion
            }
            //#endregion
        } else {
            //#region 一般事件
            await Content(`Scripts.Ev046.Normal.2`)
            //#endregion
        }
    } else {
        appServ.setBGM('music21')
    }
    SetContentCompleted()
}

export default ev046;