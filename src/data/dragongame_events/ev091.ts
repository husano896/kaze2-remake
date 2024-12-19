import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev091 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music18')
        Face('char00');
        /**
            {{my}}ね……最近よく眠れない{{go01}}……
            眠っちゃうと……二度と……目が覚めない気がする{{go01}}……。
         */
        Content(`Scripts.Ev091.1.Content`)
        const result = (await Options([
            // そんなことあるもんか！
            `Scripts.Ev091.1.1.Action`,
            // 寝ないと元気になれないぞ？
            `Scripts.Ev091.1.2.Action`,
            // …怖いのか？
            `Scripts.Ev091.1.3.Action`,
            // そのほうが幸せかもな……。
            `Scripts.Ev091.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // そうだね……。そんなのなんて、イヤ{{go00}}{{go01}}……。
                await Content(`Scripts.Ev091.1.1.Reply`)
                break;
            case 1:
                // [答非所問]
                EmojiAndAdjustLove(11)
                // でも…{{my}}……病気{{go00}}{{go01}}。
                await Content(`Scripts.Ev091.1.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // こわい……こわい{{go01}}……。
                await Content(`Scripts.Ev091.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …………。
                await Content(`Scripts.Ev091.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        appServ.setBGM('music01')
        Face('char01');
        /** 
            かお…っすか～。ボクの顔は、この世界では まぁ…平均的っすね。
            「かっこいい」ってのは種族によっても、時代によっても違うっすから、
            気にしても仕方ないって思うっす。
            でも、ボクも{{yourName}} さんの姿かたちには、ちょっと興味あるっすよ。
        */
        await Content(`Scripts.Ev091.2`)
        Face('char01a')
    } else {
        /* ……。  */
        await Content('Scripts.Ev091.3')
    }
    SetContentCompleted()
}

export default ev091;