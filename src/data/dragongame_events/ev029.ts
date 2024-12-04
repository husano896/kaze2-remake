import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev029 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01');
        /**
次は、2度目の孤竜検診っすね。
前回の反省点はちゃんと改善したっすか？
こんな時に里親の権利を剥奪ってことになったら、シャレにならないっすからね。
この仔には まだまだ{{yourName}} さんが必要なんっす…。
いつもよりもしっかり{{dragonName}} の世話をしてやるっすよ！
         */
        await Content(`Scripts.Ev029.1`);
        Face('char01a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
前の診察の時はドキドキしたけれど、痛くなかった{{go01}}。
だから、だんだんへっちゃらになってきた{{go01}}♪
これってきっと、怖いことに立ち向かうことができるようにって
神さまが与えてくれた力に違いない{{go01}}。 感謝しなくちゃ♪
         */
        Content(`Scripts.Ev029.2.Content`)
        const result = (await Options([
            // 次の検診も頑張ろう！
            `Scripts.Ev029.2.1.Action`,
            // 神様なんていないよ。
            `Scripts.Ev029.2.2.Action`,
            // この調子で元気でいよう。
            `Scripts.Ev029.2.3.Action`,
            // 自分にも感謝してよ。
            `Scripts.Ev029.2.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うん…がんばって合格する{{go01}}♪
                await Content(`Scripts.Ev029.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……でも…。
                await Content(`Scripts.Ev029.2.2.Reply`)
                break;
            case 2:
                // [驚訝] + 表情
                EmojiAndAdjustLove(4)
                // うん。 {{my}}、もっとがんばる{{go01}}♪
                await Content(`Scripts.Ev029.2.3.Reply`)
                break;
            case 3:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // あ…もちろん、{{you}} にも感謝してる{{go01}}…。
                await Content(`Scripts.Ev029.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev029;