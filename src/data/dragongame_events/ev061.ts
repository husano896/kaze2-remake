import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";

const ev061 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {
        if (saveData.item[ItemID.精竜水]) {
            Face('char07')
            /**
                クンクン…クンクン… また臭うっすね。
                ……あぁっ！！ {{yourName}} さん、またっすよ～。
                必死で手に入れた発作の薬なのに…また腐っちゃってたっす。
                保存が効かないのが痛いっすねぇ。 …もったいないっす。
                じゃ、これ…捨てておくっすよ。
                [{{varItemName[15]}} を失ってしまった]
             */
            saveData.item[ItemID.精竜水] = 0;
            await Content(`Scripts.Ev061.1`, { varItemName: appServ.t(`Data.Item.${ItemID.精竜水}.Title`) })
            Face('char07a')
        }
        else {
            /**
                ねえねえ。{{you}}のところにはいろんなゲームがある、って聞いたけど、
                どんなものがある{{go04}}？
             */
            Content(`Scripts.Ev061.2.Content`)
            const result = (await Options([
                // ＲＰＧとかアクションかな。
                `Scripts.Ev061.2.1.Action`,
                // カードゲームが好きだな。
                `Scripts.Ev061.2.2.Action`,
                // 囲碁とか将棋とかかな。
                `Scripts.Ev061.2.3.Action`,
                // 実は、この会話もゲーム。
                `Scripts.Ev061.2.4.Action`
            ]));

            saveData.ivent |= EventFlag.回答事件;
            switch (result.index) {
                case 0:
                    // [理解不能] + 表情
                    EmojiAndAdjustLove(3)
                    // きゅ～？　そういうゲームは、こっちの世界にはない{{go01}}。
                    await Content(`Scripts.Ev061.2.1.Reply`)
                    break;
                case 1:
                    // [高興] + 表情
                    EmojiAndAdjustLove(4)
                    // こっちにある{{go01}}！　たろっとかーど{{go00}}{{go01}}。
                    await Content(`Scripts.Ev061.2.2.Reply`)
                    break;
                case 2:
                    // [理解不能] + 表情
                    EmojiAndAdjustLove(3)
                    // それって、どんなゲーム？
                    await Content(`Scripts.Ev061.2.3.Reply`)
                    break;
                case 3:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // …………ゲームだった{{go03}}？
                    await Content(`Scripts.Ev061.2.4.Reply`)
                    break;
            }
        }
    }
    SetContentCompleted()
}

export default ev061;