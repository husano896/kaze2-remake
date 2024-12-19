import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev082 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Emoji, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component
    Emoji(1)
    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music19')
        Face('char00');
        /**
            たいへん！たいへん！
            あのね！ ニエルサン、倒れちゃった{{go01}}！
            {{yourName}}……ニエルサン、大丈夫かな。
         */
        Content(`Scripts.Ev082.1.Content`)
        const result = (await Options([
            // キミが心配しても仕方ない。
            `Scripts.Ev082.1.1.Action`,
            // 無理がたたったのかもな。
            `Scripts.Ev082.1.2.Action`,
            // 大丈夫だよ、きっと。
            `Scripts.Ev082.1.3.Action`,
            // お見舞いに行くといい。
            `Scripts.Ev082.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // でも……心配でしょうがない{{go01}}。
                await Content(`Scripts.Ev082.1.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // もしかして、{{my}}たちが、心配かけたから…？
                await Content(`Scripts.Ev082.1.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // うん……ぐすっ。
                await Content(`Scripts.Ev082.1.3.Reply`)
                break;
            case 3:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そっか！  じゃ、{{you}} が帰ったあとにでも、少し考えてみる{{go01}}。
                await Content(`Scripts.Ev082.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        appServ.setBGM('music05')
        Face('char00');
        /** 
            "……どうしよう……
            {{my}}には、どんな手助けができる{{go04}}？"
        */
        await Content(`Scripts.Ev082.2`)
    } else {
        appServ.setBGM('music05')
    }
    SetContentCompleted()
}

export default ev082;