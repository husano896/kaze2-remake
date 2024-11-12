import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev008 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    if (appServ.waitTimeMinutes >= 60) {

        appServ.setBGM('music21')
        Face('char08');
        /**
        外を歩いていると、野生竜や精霊獣が住んでるところを見つけることがあるっす。
        見つけたら、ぜひ立ち寄ってみたいっすね。
        精霊獣の多くは、「契約加護印」という術を持っていて、運がよければ
        彼らの力を授かることもできるかもしれないっすよ。
        この「契約加護印」は強力で、彼らの姿や巨大な能力を獲得できるんっす。
        孤竜のことを考えているのなら、探してみるっすよ♪
         */
        await Content(`Scripts.Ev008.1`)
        Face('char08a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        appServ.setBGM('music13')
        appServ.saveData.ivent |= EventFlag.回答事件;
        Face('char00');
        /**
         …ときどき、夢を見る{{go01}}。
        {{my}}が病気になって、苦しんでる夢――。
        なんで、{{my}}はこんな夢を見る{{go04}}？
         */
        Content(`Scripts.Ev008.2.Content`)
        const result = (await Options([
            // 気にすることないよ。
            `Scripts.Ev008.2.1.Action`,
            // ストレスたまってるんだよ。
            `Scripts.Ev008.2.2.Action`,
            // キミの心が弱いから。
            `Scripts.Ev008.2.3.Action`,
            // そんなこと分からない。
            `Scripts.Ev008.2.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // 理解不能
                EmojiAndAdjustLove(13)
                // ならいいんだけど……。
                await Content(`Scripts.Ev008.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // {{my}}、疲れてるように見える{{go03}}？
                await Content(`Scripts.Ev008.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // これって甘えてる{{go03}}？
                await Content(`Scripts.Ev008.2.3.Reply`)
                break;
            case 3:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // …だ…だよね。
                await Content(`Scripts.Ev008.2.4.Reply`)
                break;
        }
    } else {
        appServ.setBGM('music21')
    }
    SetContentCompleted()
}

export default ev008;