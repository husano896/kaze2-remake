import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";

const ev041 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove, saveData } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char00');
        if (saveData.ivent & EventFlag.貓事件) {
            //#region 貓分支 
            /**
                あのね、ニエルサンと約束した{{go01}}。 ちゃんとねこさんのお世話するって。
                それでね、ねこさんのごはんのお代……{{my}}が稼ぎたい{{go01}}。
                でね、{{my}}、街の酒場でいいこと聞いちゃった{{go01}}！
                「『ワビ湖沿いの街道が交わる地点にある廃坑』に財宝が眠っているらしい」
                ……って。
                ねぇ、一緒に行ってほしい{{go01}}。
             */
            Content(`Scripts.Ev041.Neko.1.Content`)

            const result = (await Options([
                // ああ、いいよ。
                `Scripts.Ev041.Neko.1.1.Action`,
                // そんなことのために？
                `Scripts.Ev041.Neko.1.2.Action`,
                // いろいろ考えてるんだなぁ。
                `Scripts.Ev041.Neko.1.3.Action`,
                // そこまでしなくても！
                `Scripts.Ev041.Neko.1.4.Action`
            ]));
            saveData.ivent |= EventFlag.回答事件;
            switch (result.index) {
                case 0:
                    // [高興] + 表情 
                    EmojiAndAdjustLove(4)
                    // きゅ。ありがと♪ じゃ、早速、廃坑まで連れて行ってほしい{{go01}}！
                    await Content(`Scripts.Ev041.Neko.1.1.Reply`)
                    break;
                case 1:
                    // [生氣] + 表情 
                    EmojiAndAdjustLove(2)
                    // 「そんなこと」なんかじゃない{{go01}}！！
                    await Content(`Scripts.Ev041.Neko.1.2.Reply`)
                    break;
                case 2:
                    // [高興] + 表情 
                    EmojiAndAdjustLove(4)
                    // う～！！　{{you}}のバカっ！！
                    await Content(`Scripts.Ev041.Neko.1.3.Reply`)
                    break;
                case 3:
                    // [生氣] + 表情 
                    EmojiAndAdjustLove(2)
                    // ありがとう！  {{my}}、ちゃんと世話する{{go01}}♪
                    await Content(`Scripts.Ev041.Neko.1.4.Reply`)
                    break;
            }
            //#endregion
        } else {
            //#region 一般分支
            await Content(`Scripts.Ev041.Normal.1`)
            //#endregion
        }
    } else {
        if (saveData.ivent & EventFlag.貓事件) {
            if (saveData.item[ItemID.ささやかな財宝]) {
                //#region 財寶事件完成
                Face('char01')
                /**
                    おやっ？　もう財宝を見つけてきたんっすか？
                    うーん……これだけあれば、猫の餌代はなんとかなるっすね！
                    お疲れさまっす♪
                 */
                await Content(`Scripts.Ev041.Neko.2.Complete`)
                Face('char01a')
                //#endregion
            }
            else {
                //#region 財寶事件未完成
                Face('char04')
                /**
                遊び半分だと思ってたんっすが、ずいぶんしっかりと考えてるもんなんっすねぇ。
                『ワビ湖沿いの街道が交わる地点にある廃坑』の場所がすんなり分かれば
                いいんっすが、お金を稼いでくれるなら、なるべく早めにしてほしいんっす……。
                しばらくの間は、ボクのヘソクリで猫の餌代をまかなうっすが、
                あまり長くはもたないっすよ。
                さすがに、仔猫の餌にまで 協会のお金を使うわけにはいかないっすから。
                 */
                await Content(`Scripts.Ev041.Neko.2.Normal`)
                Face('char04a')
                //#endregion
            }
        }
        else {
            //#region 一般分支
            Face('char01')
            /**
                今日は一日中雨っすから、外に出られないっすね。
                孤竜たちも退屈してて、お話ねだられまくっられるっすよ。
             */
            await Content(`Scripts.Ev041.Normal.2`)
            Face('char01a')
            //#endregion
        }
    }
    SetContentCompleted()
}

export default ev041;