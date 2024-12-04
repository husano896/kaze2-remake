import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev025 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
"ねぇ、{{you}}は知ってる？
{{my}}たち、竜 はね、この世界に人間がやって来るずっと昔からいる{{go01}}。
人間は、今から1000年くらい前に、宇宙船に乗ってやって来たんだって。
大昔に一度、人間と竜はすごく大きなケンカをしたんだけど、今では仲直りして、
それからはずっと、お互い助け合いながら暮らしてる{{go01}}。
ずっと前に、お母さんから聞いた昔話{{go00}}{{go01}}……。"
         */
        Content(`Scripts.Ev025.1.Content`)
        const result = (await Options([
            // そうなんだ…。
            `Scripts.Ev025.1.1.Action`,
            // どうやって仲直りしたんだ？
            `Scripts.Ev025.1.2.Action`,
            // 竜って一体？
            `Scripts.Ev025.1.3.Action`,
            // 興味ないな。
            `Scripts.Ev025.1.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // 竜の間では、有名な昔話だった{{go01}}。
                await Content(`Scripts.Ev025.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // {{my}}もよく知らないんだけど、悪魔の樹っていうのがあったらしい{{go01}}…。
                await Content(`Scripts.Ev025.1.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // お母さんは…{{my}}たちのことを… うぅん、なんでもない。
                await Content(`Scripts.Ev025.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // あぁ…突然、変な話しちゃってごめん…。
                await Content(`Scripts.Ev025.1.4.Reply`)
                break;
        }
    } else {
        Face('char00');
        /** {{my}}、もっともっと、{{you}}のこと、たくさん知りたい{{go01}}！ */
        await Content(`Scripts.Ev025.2`)
    }
    SetContentCompleted()
}

export default ev025;