import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev031 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
ニエルサンから聞いた{{go01}}。{{my}}の病気、もしかしたら治るかもしれないんだって。
まだちょっぴり不安だけど、でも、治るかもしれないんだって思うと、
心の底から勇気がわいてくる{{go01}}。
{{you}}も一緒にいてくれるから、きっと…大丈夫{{go00}}{{go01}}！
病気と戦いつづけてれば、いつかきっと、幸せになれそうな気がする{{go01}}！
         */
        Content(`Scripts.Ev031.1.Content`)
        const result = (await Options([
            // 希望が見えてきたね。
            `Scripts.Ev031.1.1.Action`,
            // これでもう安心。
            `Scripts.Ev031.1.2.Action`,
            // …ウソでもいいから、治るかもって信じてみたかったのに……。
            `Scripts.Ev031.1.3.Action`,
            // しかし…不治の病だからな。
            `Scripts.Ev031.1.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うん。　生きる気力がわいてきた{{go01}}♪
                await Content(`Scripts.Ev031.1.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // そ…そんなに期待してもいい{{go03}}？ 信用していい{{go03}}？
                await Content(`Scripts.Ev031.1.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …ウソでもいいから、治るかもって信じてみたかったのに……。
                await Content(`Scripts.Ev031.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(13)
                // き…きっと大丈夫{{go00}}{{go01}}。
                await Content(`Scripts.Ev031.1.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev031;