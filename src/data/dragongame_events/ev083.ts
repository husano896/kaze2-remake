import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev083 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music05')
        Face('char00');
        /**
            あれから考えてたんだけれど、みんなで相談して、
            ニエルサンにお見舞いの贈りものを持っていくことにした{{go01}}！
            {{yourName}}は、病気の時って、何をしてほしい{{go04}}？
         */
        Content(`Scripts.Ev083.1.Content`)
        const result = (await Options([
            // ……桃缶かな。
            `Scripts.Ev083.1.1.Action`,
            // そばにいるだけでいいんだ。
            `Scripts.Ev083.1.2.Action`,
            // 独りでいるのが一番だ。
            `Scripts.Ev083.1.3.Action`,
            // 見舞いの花が欲しいな。
            `Scripts.Ev083.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // ももかん？  それってなに？
                await Content(`Scripts.Ev083.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // そっか……うん、{{my}}もそう思う{{go01}}。
                await Content(`Scripts.Ev083.1.2.Reply`)
                break;
            case 2:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // だから、何かしたいって言ってる{{go01}}ー！
                await Content(`Scripts.Ev083.1.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // それ、他のトモダチがやるって言ってた{{go01}}。
                await Content(`Scripts.Ev083.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        appServ.setBGM('music01')
        Face('char00');
        /** 
            あのね！  ニエルサン、だいぶよくなったって連絡があった{{go01}}！
            ぐすっ……{{my}}……ホントに心配してた{{go01}}。
            ホントに、よかった{{go01}}。
        */
        await Content(`Scripts.Ev083.2`)
    } else {
        appServ.setBGM('music01')
    }
    SetContentCompleted()
}

export default ev083;