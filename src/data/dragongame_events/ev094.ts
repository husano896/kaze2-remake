import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev094 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Emoji, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music13')

    if (appServ.waitTimeMinutes >= 60) {

        Face('char00');
        /**
            あのね、{{you}}。
            みんな、{{my}}たちのことを「かわいそう」って言う{{go01}}。
            でも、{{my}}は「かわいそう」じゃないと思う{{go01}}。
            だって、トモダチもニエルサンも{{you}}もいるし……
            「かわいそう」って、どういう人のことを言う{{go04}}？
         */
        Content(`Scripts.Ev094.1.Content`)
        const result = (await Options([
            // 「病を患う者」のこと。
            `Scripts.Ev094.1.1.Action`,
            // 「年老いた者」のこと。
            `Scripts.Ev094.1.2.Action`,
            // 「捨てられた者」のこと。
            `Scripts.Ev094.1.3.Action`,
            // 「忘れられた者」のこと。
            `Scripts.Ev094.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // じゃあ、{{my}}は「かわいそう」{{go00}}{{go01}}…？
                await Content(`Scripts.Ev094.1.1.Reply`)
                break;
            case 1:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // {{my}}、まだ仔ども{{go00}}{{go01}}？
                await Content(`Scripts.Ev094.1.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……ぐす、ぐすっ……。
                await Content(`Scripts.Ev094.1.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // そっかあ……それなら{{my}}、「かわいそう」じゃない{{go01}}。
                await Content(`Scripts.Ev094.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char04');
        /** 
            孤竜舎には、時々有志の人が慰問にやってくるんっす。
            その人たちは きまって、口々に「かわいそう」って言うんっすよ。
            ……ボクはその言葉、キライっす。
            うまく言えないけれど、その人たちが悪いんじゃないけれど…
            腹が、立ってくるんっすよ……。
        */
        await Content(`Scripts.Ev094.2`)
        Face('char04a')
    } else {
        /* …。 */
        await Content('Scripts.Ev094.3')
    }
    SetContentCompleted()
}

export default ev094;