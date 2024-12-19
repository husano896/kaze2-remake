import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev022 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music18')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            ねぇ、{{you}}はどうして、{{my}}を拾ってくれた{{go04}}？
            {{my}}を生んでくれたお母さんでさえ、病気を怖がって{{my}}を捨てたのに。
            {{you}}は、{{my}}の病気が怖くない{{go03}}？
            {{my}}は………怖い{{go01}}。
            死んだらどうなるんだろうとか、死ぬときはやっぱり苦しいのかな、とか、
            考えたくもないことが頭の中を回って、おかしくなっちゃいそう{{go00}}{{go01}}…。
         */
        Content(`Scripts.Ev022.1.Content`)
        const result = (await Options([
            // キミも病気も恐ろしい。
            `Scripts.Ev022.1.1.Action`,
            // キミを放ってはおけない。
            `Scripts.Ev022.1.2.Action`,
            // ゲーム目的の軽い気持ちだ。
            `Scripts.Ev022.1.3.Action`,
            // 怖いのはみんな、当たり前。
            `Scripts.Ev022.1.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [生氣]
                EmojiAndAdjustLove(12)
                // じゃぁ、どうして{{my}} を拾ってくれた{{go04}}…？
                await Content(`Scripts.Ev022.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // {{you}}……助けてほしい{{go01}}…。 お願い、{{my}}のそばにいてほしい{{go01}}…。
                await Content(`Scripts.Ev022.1.2.Reply`)
                break;
            case 2:
                // [生氣]
                EmojiAndAdjustLove(12)
                // 怖い{{go01}}……。 {{you}}は{{my}}を助けてくれない{{go03}}？
                await Content(`Scripts.Ev022.1.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // うぅ……そ、そうだよね。
                await Content(`Scripts.Ev022.1.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev022;