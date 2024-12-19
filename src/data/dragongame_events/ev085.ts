import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev085 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component
 
    if (appServ.waitTimeMinutes >= 60) {
        appServ.setBGM('music05')
        Face('char00');
        /**
            ねね、少し聞きたいんだけれど。
            {{you}}って、疲れてる時どんなことする{{go04}}？
         */
        Content(`Scripts.Ev085.1.Content`)
        const result = (await Options([
            // お茶でも飲むかな。
            `Scripts.Ev085.1.1.Action`,
            // どうしてそんなことを？
            `Scripts.Ev085.1.2.Action`,
            // 寝ちゃうな。
            `Scripts.Ev085.1.3.Action`,
            // そういう質問が疲れるんだ。
            `Scripts.Ev085.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // それじゃ、{{my}}が薬草茶のいれ方 教えてあげる{{go01}}！
                await Content(`Scripts.Ev085.1.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ニエルサン、またがんばってるから、心配{{go00}}{{go01}}。
                await Content(`Scripts.Ev085.1.2.Reply`)
                break;
            case 2:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // やっぱり、そうなの？
                await Content(`Scripts.Ev085.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……ごめん…。
                await Content(`Scripts.Ev085.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        appServ.setBGM('music01')
        Face('char00');
        /** 
            {{my}}たち、ただお世話されてるだけなのはイヤ{{go00}}{{go01}}。
            だから、いろいろお手伝いしたい{{go01}}。
            いつか{{you}}のことも、いろいろお世話してあげたい{{go01}}！
        */
        await Content(`Scripts.Ev085.2`)
    } else {
        appServ.setBGM('music01')
    }
    SetContentCompleted()
}

export default ev085;