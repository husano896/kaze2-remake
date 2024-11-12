import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev009 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    if (appServ.waitTimeMinutes >= 60) {

        appServ.setBGM('music21')
        Face('char08');
        /**
        そういえば、{{yourName}} さんがここに来て以来、なんだかいろいろと
        あわただしくて、ゆっくりしてなかったっすね。
        こっちの世界はどうっすか？ ネットを介してるんで情報は制限されてるっすが、
        意外とのんびりしてるっすよね。 ボクは地球の様子はあまり知らないっすが、
        みんな忙しく暮らしていて、世の中は目まぐるしく動いてる、って聞いたっすよ。
        ゆっくり生きるのも楽しいのに、どうしてそんなに急ぐんっすかね…。
         */
        await Content(`Scripts.Ev009.1`)
        Face('char08a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        appServ.setBGM('music11')
        appServ.saveData.ivent |= EventFlag.回答事件;
        Face('char00');
        /**
        走るのって、とっても楽しい{{go01}}！ 景色がどんどん変わっていくのがおもしろい{{go01}}。
        ゆっくり歩くのもいいけど、全速力で走るのも 気持ちいい{{go01}}。
         */
        Content(`Scripts.Ev009.2.Content`)
        const result = (await Options([
            // 無理だけはするなよ。
            `Scripts.Ev009.2.1.Action`,
            // 走るのって楽しいな。
            `Scripts.Ev009.2.2.Action`,
            // あんまり興味ないな。
            `Scripts.Ev009.2.3.Action`,
            // こけるなよ？
            `Scripts.Ev009.2.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うん♪…少しぐらい運動しないと、体がなまってしまう{{go01}}。
                await Content(`Scripts.Ev009.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // {{you}}も走るの、好きなんだ♪ {{you}}と一緒に走ってみたい{{go01}}。
                await Content(`Scripts.Ev009.2.2.Reply`)
                break;
            case 2:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // うっ…そ…そぅ。
                await Content(`Scripts.Ev009.2.3.Reply`)
                break;
            case 3:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // そんなドジはしない{{go01}}！
                await Content(`Scripts.Ev009.2.4.Reply`)
                break;
        }
    } else {
        appServ.setBGM('music21')
    }
    SetContentCompleted()
}

export default ev009;