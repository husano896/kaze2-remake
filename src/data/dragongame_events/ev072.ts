import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev072 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            最近、{{my}}のトモダチで、すごく具合の悪くなっちゃった仔がいる{{go01}}。
            ちょっと心配{{go00}}{{go01}}…。
         */
        Content(`Scripts.Ev072.1.Content`)
        const result = (await Options([
            // 気にすることないよ。
            `Scripts.Ev072.1.1.Action`,
            // そうか、心配だな。
            `Scripts.Ev072.1.2.Action`,
            // お見舞いには行った？
            `Scripts.Ev072.1.3.Action`,
            // 同病相憐れむ、か…。
            `Scripts.Ev072.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // でも…。
                await Content(`Scripts.Ev072.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // うん……。
                await Content(`Scripts.Ev072.1.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // もう行ってきた{{go01}}！  大丈夫だって言ってたけど…。
                await Content(`Scripts.Ev072.1.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ……なんだか、むつかしいコトバ……。
                await Content(`Scripts.Ev072.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char00');
        /** 
            {{dragonName}}  と同じ時期に入ってきた孤竜たちの容態が、悪くなってきたっす…。
            実は、他の里親の竜で危篤状態になった仔もいて……。
            まずいっすよ……。
        */
        await Content(`Scripts.Ev072.2`)
    }
    SetContentCompleted()
}

export default ev072;