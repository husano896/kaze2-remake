import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";

const ev027 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        // 先前有拿到發作藥的場合
        if (saveData.item[ItemID.精竜水]) {
            Face('char09');

            /**
                クンクン……クンクン……なんか臭うっすね。
                …………あっ！　大変っす、{{yourName}} さん！
                この前、必死で手に入れた発作の薬が…腐っちゃってるっす……。
                これじゃ、もう使えないっすねぇ。うーん…保管が難しい薬っすね。
                ボクが代わりに捨てておくっすよ。
                [{{varItemName}}を失ってしまった]
             */
            await Content(`Scripts.Ev027.1.1`, { varItemName: 'Data.Item.15.Title' })
            Face('char09a');
            saveData.item[ItemID.精竜水] = 0;
        }
        else {
            Face('char00');
            /**
                どうして{{you}}は、{{my}}に優しくしてくれる{{go04}}？
                優しくされたのって初めてだから、{{my}}にはよく分からない{{go01}}。
             */
            Content(`Scripts.Ev027.1.2.Content`)
            const result = (await Options([
                // 誰も本心からじゃない。
                `Scripts.Ev027.1.2.1.Action`,
                // いつも人に親切にすること。
                `Scripts.Ev027.1.2.2.Action`,
                // 日ごろから感謝すること。
                `Scripts.Ev027.1.2.3.Action`,
                // あまりうまく説明できない。
                `Scripts.Ev027.1.2.4.Action`
            ]));

            switch (result.index) {
                case 0:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // …じゃ、{{my}}を助けてくれるのも、そうなの……？
                    await Content(`Scripts.Ev027.1.2.1.Reply`)
                    break;
                case 1:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // そうなの？ じゃ、{{my}}もいいコトしたら分かる{{go03}}？
                    await Content(`Scripts.Ev027.1.2.2.Reply`)
                    break;
                case 2:
                    // [理解不能] + 表情
                    EmojiAndAdjustLove(3)
                    // なんだか難しい{{go01}}…。 どういうコトに感謝すればいい{{go04}}？
                    await Content(`Scripts.Ev027.1.2.3.Reply`)
                    break;
                case 3:
                    // [理解不能]
                    EmojiAndAdjustLove(13)
                    // うーん…なんだか難しい{{go01}}。
                    await Content(`Scripts.Ev027.1.2.4.Reply`)
                    break;
            }
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
"実は……今日、他の竜とケンカした{{go01}}。
だって、あっちが{{you}}のコト、笑うんだ。
{{my}}、くやしくなっちゃった{{go01}}。"
         */
        Content(`Scripts.Ev027.2.Content`)
        const result = (await Options([
            // ありがとう。
            `Scripts.Ev027.2.1.Action`,
            // ケンカは悪いことだ。
            `Scripts.Ev027.2.2.Action`,
            // で、勝ったの？
            `Scripts.Ev027.2.3.Action`,
            // ケンカは楽しいよな。
            `Scripts.Ev027.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(4)
                // …{{my}}、がんばった{{go01}}。へへ♪
                await Content(`Scripts.Ev027.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ごめん… でも、どうしても許せなかった{{go01}}。
                await Content(`Scripts.Ev027.2.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // うっ…それは、あんまり聞かないでほしい{{go01}}。
                await Content(`Scripts.Ev027.2.3.Reply`)
                break;
            case 3:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // べ…別に好きでケンカしたわけじゃない{{go01}}！
                await Content(`Scripts.Ev027.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev027;