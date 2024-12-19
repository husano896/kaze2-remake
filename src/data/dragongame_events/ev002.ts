import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev002 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music21')

    console.log('waitMinutes', appServ.waitTimeMinutes);
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /*
            ビクッ！！　おどおど……
        */
        Content(`Scripts.Ev002.1.Content`)
        const result = (await Options([
            `Scripts.Ev002.1.1.Action`, // 微笑む
            `Scripts.Ev002.1.2.Action`, // 見つめる
            `Scripts.Ev002.1.3.Action`, // 挨拶する
            `Scripts.Ev002.1.4.Action` // 叱る
        ]));
        switch (result.index) {
            case 0:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // ……きゅぅ？
                await Content(`Scripts.Ev002.1.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ドキドキ……。
                await Content(`Scripts.Ev002.1.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // おどおど……。
                await Content(`Scripts.Ev002.1.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ………。
                await Content(`Scripts.Ev002.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char01')
        /*
        {{DragonName}} とは仲良くなれたっすか？
        時間が経ってから孤竜を訪ねると、対話が楽しめるんっすよ。
        応答次第で、{{DragonName}}が喜んだり悲しんだりするっす。
        コミュニケーションは、やっぱり直接対話するのが基本っす。
        孤竜のことを思って接してあげるのが、仲良くなるコツっすね♪
        うまくしないと、これからの成長にも影響を与えてしまうっすからね。
        */
        await Content(`Scripts.Ev002.2`)
        Face('char01a')
    }
    SetContentCompleted()
}

export default ev002;