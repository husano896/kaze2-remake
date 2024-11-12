import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev015 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music12')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char10');
        await Content(`Scripts.Ev015.1`);
        Face('char10a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
        ねえねえ、さっきは何を話していた{{go03}}…？
         */
        Content(`Scripts.Ev015.2.Content`)
        const result = (await Options([
            // とりとめのない話。
            `Scripts.Ev015.2.1.Action`,
            // キミの体のこと。
            `Scripts.Ev015.2.2.Action`,
            // 今日の晩ごはんのこと。
            `Scripts.Ev015.2.3.Action`,
            // 竜死病について。
            `Scripts.Ev015.2.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [不懂]
                EmojiAndAdjustLove(13)
                // …なんか気になる{{go01}}。
                await Content(`Scripts.Ev015.2.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // {{my}}の体に…何かあった{{go03}}？
                await Content(`Scripts.Ev015.2.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // …♪ 楽しそうなお話{{go00}}{{go01}}♪
                await Content(`Scripts.Ev015.2.3.Reply`)
                break;
            case 3:
                // [不懂] + 表情
                EmojiAndAdjustLove(3)
                // りゅぅ…しびょう？
                await Content(`Scripts.Ev015.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev015;