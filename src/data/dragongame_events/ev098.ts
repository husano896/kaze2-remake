import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

/** 「想いの絵」 */
const ev098 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music20')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char06');
        /**
もう……{{yourName}} さんからもやめるよう言ってくださいっす！
{{dragonName}} 、夜も寝ないで絵を描いていたんっすよ！
無理は命取りになるっすのに……。
         */
        await Content(`Scripts.Ev098.1`);
        Face('char06a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
えへへ……ニエルサンには怒られちゃったけど、
{{my}}が死んじゃう前に、どうしてもやっておきたかった{{go01}}。
はい……これ。
{{you}}の顔、ぼんやりとしか見えないから、記憶と想像を頼りに描いたけど、
{{my}}への感謝の気持ち{{go00}}{{go01}}。
[{{varItemName[22]}} をプレゼントされた]
         */
        Content(`Scripts.Ev098.2.Content`, {varItemName: 'Data.Item.22.Title'})
        const result = (await Options([
            // ありがとう……。
            `Scripts.Ev098.2.1.Action`,
            // どうやって描いたんだ？
            `Scripts.Ev098.2.2.Action`,
            // 安静にしてなくちゃダメだ！
            `Scripts.Ev098.2.3.Action`,
            // いらないよ、こんなもの。
            `Scripts.Ev098.2.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ううん、{{my}}の方こそ……。
                await Content(`Scripts.Ev098.2.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // 前に聞いたこと、いろいろ思い返しながら描いた{{go01}}。
                await Content(`Scripts.Ev098.2.2.Reply`)
                break;
            case 2:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // …でも、{{my}}、いっしょうけんめい描いた{{go01}}…。
                await Content(`Scripts.Ev098.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // うっ……うわああああん！
                await Content(`Scripts.Ev098.2.4.Reply`)
                break;
        }
    }
    else {
        Face('char06');
        /**
ボクは、孤竜たちに治ってもらいたいんっす！
生き物はいつか死ぬ、でも絶対、こんな結末があっちゃダメなんっすよ！
ボクは、ボクは絶対認めないっす！
         */
        await Content(`Scripts.Ev098.3`)
        Face('char06a');
    }
    SetContentCompleted()
}

export default ev098;