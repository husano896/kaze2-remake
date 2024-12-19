import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev086 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component
 
    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music01')
        Face('char00');
        /**
            {{you}}って、どんな顔してる{{go04}}？
            カッコいい？　かわいい？　それとも「シヴイ」？
         */
        Content(`Scripts.Ev086.1.Content`)
        const result = (await Options([
            // あまり触れてほしくないな。
            `Scripts.Ev086.1.1.Action`,
            // カッコいい……かなぁ？
            `Scripts.Ev086.1.2.Action`,
            // 「きれい」はないの？
            `Scripts.Ev086.1.3.Action`,
            // シヴイ？それも友だちから？
            `Scripts.Ev086.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // ご、ごめんなさい……。
                await Content(`Scripts.Ev086.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // ふぅ～ん……分かった{{go01}}。
                await Content(`Scripts.Ev086.1.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(14)
                // きゅ！？　そっかぁ、そういうのもあった{{go01}}。
                await Content(`Scripts.Ev086.1.3.Reply`)
                break;
            case 3:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // うん！　で、「シヴイ」って、なに？
                await Content(`Scripts.Ev086.1.4.Reply`)
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
        await Content(`Scripts.Ev086.2`)
        Face('char01a')
    }
    SetContentCompleted()
}

export default ev086;