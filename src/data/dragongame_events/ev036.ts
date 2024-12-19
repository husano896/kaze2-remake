import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev036 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char01');
        /**
            『悲しみに瞳を濡らす翠星、地に嘆き木霊しては泣き、
            天に苦しみの声響きては泣く……』
            ……ニステアは、優しくてとっても泣き虫の星だったっす。
            悲しみにくれている人たち、そして竜たちのために涙を流すんっすよ。
            ニステアの涙は翡翠色の石になって、今も海に沈んでいるって言われてるっす。
         */
        await Content(`Scripts.Ev036.1`)
        Face('char01a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
            泣き虫星さんの涙は、やさしい気持ちの結晶{{go00}}{{go01}}。
            持っていると、悪いことやつらいことを追い払ってくれる{{go01}}。
            ときどき、漁師サンが海の底から拾ってくるみたいだけれど…。
         */
        Content(`Scripts.Ev036.2.Content`)
        const result = (await Options([
            // 星は今も泣いてるのかな？
            `Scripts.Ev036.2.1.Action`,
            // そんなの迷信だろ。
            `Scripts.Ev036.2.2.Action`,
            // 高そうだな、その石…。
            `Scripts.Ev036.2.3.Action`,
            // それがあれば病気治るかも。
            `Scripts.Ev036.2.4.Action`
        ]));
        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] 
                EmojiAndAdjustLove(14)
                // みんなが病気で悲しいって、泣いてるかもしれない{{go01}}。
                await Content(`Scripts.Ev036.2.1.Reply`)
                break;
            case 1:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // そんなことない{{go01}}！ {{you}}のバカっ!
                await Content(`Scripts.Ev036.2.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // うーん… {{my}}は、高いかどうかは分からない{{go01}}。
                await Content(`Scripts.Ev036.2.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // だと、いいよね…。
                await Content(`Scripts.Ev036.2.4.Reply`)
                break;
        }
    } else {
        Face('char01');
        /*
            たしかに、「ニステアの滴」はお守りとして珍重されてるっす。
            でも、さすがに竜死病には……効きそうもないっすね。
            残念だけど、治療法は地道に探すしかないっす。
        */
        await Content(`Scripts.Ev036.3`);
        Face('char01a');
    }
    SetContentCompleted()
}

export default ev036;