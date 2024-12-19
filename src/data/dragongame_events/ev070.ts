import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev070 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music27')
        Face('char07')
        /**
            {{yourName}}さん！　大変っす！
            {{dragonName}}  のところへ強盗が……っていうか
            誘拐犯が侵入したっす！
            ……でも、マヌケっすよ。
            いくら仔どもっていったって、相手は竜なんっすからね～。
            あえなく返り討ちにされたっす。
         */
        await Content(`Scripts.Ev070.1`)
        Face('char07a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {

        appServ.setBGM('music02')
        /**
            ……まだ胸がドキドキしてる{{go01}}。
            あ、そんな顔、しないでほしい{{go01}}……。
            {{my}}だって、どんなに強くなっても、怖いことはある{{go01}}。
         */
        Content(`Scripts.Ev070.2.Content`)
        const result = (await Options([
            // ケガはなかった？
            `Scripts.Ev070.2.1.Action`,
            // 分かってるよ。
            `Scripts.Ev070.2.2.Action`,
            // そんな図体で？
            `Scripts.Ev070.2.3.Action`,
            // 自分もそういうことあるよ。
            `Scripts.Ev070.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [驚訝]
                EmojiAndAdjustLove(15)
                // うん。{{my}}、もう平気{{go00}}{{go01}}。
                await Content(`Scripts.Ev070.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うん！  {{you}}、大好き！
                await Content(`Scripts.Ev070.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // う…………。
                await Content(`Scripts.Ev070.2.3.Reply`)
                break;
            case 3:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そっか……なんだかうれしい{{go01}}♪
                await Content(`Scripts.Ev070.2.4.Reply`)
                break;
        }
    } else {

        appServ.setBGM('music02')
        Face('char07')
        /**
            ……でも、今回は事なきを得たっすが、
            目的が分からないっすよ。盗むお金なんてないのに、誘拐だなんて…。
            もしかして、以前ハッキングした者のしわざっすかね？
            最近、病気の研究に進展があったっすから…。
            とにかく、また同じことがないよう、警戒を厳重にしておくっすよ！
         */
        await Content(`Scripts.Ev070.3`)
        Face('char07a')
    }
    SetContentCompleted()
}

export default ev070;