import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev048 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music11')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            ねぇねぇ、あのね！
            今度、ニエルサンとトモダチと一緒に、ピクニックに行く{{go01}}。
            {{you}}はピクニックって行ったこと、ある{{go03}}？
         */
        Content(`Scripts.Ev048.1.Content`)
        const result = (await Options([
            // ピクニックかぁ、いいね。
            `Scripts.Ev048.1.1.Action`,
            // まあ、一回くらいは。
            `Scripts.Ev048.1.2.Action`,
            // あまり外って好きじゃない。
            `Scripts.Ev048.1.3.Action`,
            // どうしてそんなことを？
            `Scripts.Ev048.1.4.Action`
        ]));
        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うん！  今からすっごく楽しみ{{go00}}{{go01}}。
                await Content(`Scripts.Ev048.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // {{my}}も、あんまり行ったことない{{go01}}。
                await Content(`Scripts.Ev048.1.2.Reply`)
                break;
            case 2:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // 外って気持ちいいと思うけど…？
                await Content(`Scripts.Ev048.1.3.Reply`)
                break;
            case 3:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // ううん、ちょっと聞いてみたかっただけ{{go00}}{{go01}}。
                await Content(`Scripts.Ev048.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char01');
        /** 
            {{yourName}}さんは、家の外って好きっすか？
            ボクは大好きっすよ！
            海辺もいいっすし、山に木の実や山菜を採りにでかけるのも好きっすね♪
            この街の周辺にはいろんな植物が生えていて、眺めてるだけでも楽しいっすよ。
        */
        await Content(`Scripts.Ev048.2`)
        Face('char01a')
    }
    SetContentCompleted()
}

export default ev048;