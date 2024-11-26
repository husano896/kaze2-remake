import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev019 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01');
        /**
いよいよ、初めての孤竜検診っすね。
主に、里親にふさわしいかどうかを、友好度から判断するんっすが、
それ以外にも、病気にかかっていないかどうかや、成長具合も診てくれるっすよ。
なかでも成長の度合いは、これから予想される試練に向けて重要になってくるっす。
孤竜のために、お互い頑張ろうっす！"
         */
        await Content(`Scripts.Ev019.1`);
        Face('char01a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
「こりゅうけんしん」って、何をする{{go04}}？
注射とかされたら、イヤ{{go00}}{{go01}}…。"
         */
        Content(`Scripts.Ev019.2.Content`)
        const result = (await Options([
            // 痛くはないと思う。
            `Scripts.Ev019.2.1.Action`,
            // キミのためなんだから。
            `Scripts.Ev019.2.2.Action`,
            // 診断ミスが心配。
            `Scripts.Ev019.2.3.Action`,
            // すっごく痛いかも？
            `Scripts.Ev019.2.4.Action`
        ]));

        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // そ…そぉ？ ならいいんだけれど…。
                await Content(`Scripts.Ev019.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // う…うん。
                await Content(`Scripts.Ev019.2.2.Reply`)
                break;
            case 2:
                 // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // えぇ？　診断ミスっ…？
                await Content(`Scripts.Ev019.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // うぁぁ……。
                await Content(`Scripts.Ev019.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev019;