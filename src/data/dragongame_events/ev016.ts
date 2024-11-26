import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev016 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01');
        /**
病竜保護協会から、育成方針の規定書が回ってきたっすよ。
えっと……「竜死病の進行が 10 進むたびに友好度をチェックし、
一定の友好度に達してない者は里親の権利を剥奪する」…と書いてあるっす。
1回目のチェックは、進行度が 20 の時に行うらしいっす。 もうすぐっすね…。
友好度をできるだけ高めに上げておくっすよ。
今、里親をやめるわけにはいかないっすよね。苦しい時期っすが、ファイトっす！
         */
        await Content(`Scripts.Ev016.1`);
        Face('char01a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
早く、成竜になりたい{{go01}}。 強くてカッコよくて、優しい竜に……。
家族といっしょに暮らしながら、いつまでも元気でいたい{{go01}}。
……？　どうして{{you}}は、そんな顔をする{{go03}}？
         */
        Content(`Scripts.Ev016.2.Content`)
        const result = (await Options([
            // 何でもない。
            `Scripts.Ev016.2.1.Action`,
            // 少し具合が悪いだけ。
            `Scripts.Ev016.2.2.Action`,
            // 気になることがある。
            `Scripts.Ev016.2.3.Action`,
            // 夢なんてはかないものだ。
            `Scripts.Ev016.2.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [不懂] + 表情
                EmojiAndAdjustLove(3)
                // …そぅ？
                await Content(`Scripts.Ev016.2.1.Reply`)
                break;
            case 1:
                // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // おろおろ…　だ…大丈夫？
                await Content(`Scripts.Ev016.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // 気になること…？　それって{{my}}に関係がある{{go03}}？
                await Content(`Scripts.Ev016.2.3.Reply`)
                break;
            case 3:
                // [生氣]
                EmojiAndAdjustLove(12)
                // な…何が言いたい{{go03}}？
                await Content(`Scripts.Ev016.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev016;