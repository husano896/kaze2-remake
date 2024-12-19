import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev075 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            {{you}}……。
            トモダチから聞いたんだけど……{{you}}の住む世界には、
            {{my}}たちみたいな竜はいないって、ホント？
         */
        Content(`Scripts.Ev075.1.Content`)
        const result = (await Options([
            // しつこく聞きすぎだ！
            `Scripts.Ev075.1.1.Action`,
            // 大昔にはいたかもね。
            `Scripts.Ev075.1.2.Action`,
            // いや、ちゃんといるよ。
            `Scripts.Ev075.1.3.Action`,
            // いないよ…残念だけど。
            `Scripts.Ev075.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ご、ごめん……。
                await Content(`Scripts.Ev075.1.1.Reply`)
                break;
            case 1:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // そっかあ…。 じゃ、今はいないってことだよね？
                await Content(`Scripts.Ev075.1.2.Reply`)
                break;
            case 2:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // じゃあ、トモダチから聞いたことって、ウソだった{{go03}}？
                await Content(`Scripts.Ev075.1.3.Reply`)
                break;
            case 3:
                // [高興]
                EmojiAndAdjustLove(14)
                // そっかぁ……じゃ、{{my}}が行ってあげる{{go01}}！
                await Content(`Scripts.Ev075.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char01');
        /** 
            {{yourName}}さんの世界には、竜という種族はいないんっすか～。
            もしかしたら、{{yourName}}さんの世界でも、
            こちらの世界のように大きな戦いがあって……。
            いや、ボクの考えすぎっすね。
        */
        await Content(`Scripts.Ev075.2`)
        Face('char01a')
    }
    SetContentCompleted()
}

export default ev075;