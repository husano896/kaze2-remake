import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";

const ev044 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove, saveData } = component

    if (appServ.waitTimeMinutes >= 60) {

        if (saveData.ivent & EventFlag.貓事件) {
            //#region 貓分支 
            if (saveData.item[ItemID.ささやかな財宝]) {
                //#region 財寶事件完成
                appServ.setBGM('music11')
                Face('char01')
                /**
                    {{dragonName}} が見つけた財宝のおかげで、猫の餌代には
                    当分の間、困らなそうっすね。
                    いい餌が買えるっすから、猫も満足してるみたいっすよ。
                    これで何も起こらなければ、ばっちりっすね♪
                 */
                await Content(`Scripts.Ev044.Neko.1.Complete`)
                Face('char01a')
                //#endregion
            }
            else {
                //#region 貓事件失敗
                appServ.setBGM('music02')
                saveData.ivent |= EventFlag.貓事件失敗;
                Face('char04')
                /**
                    う～ん……どこ行ったんっすかねぇ？
                    あ、{{yourName}} さん、猫が……
                    {{dragonName}}  の飼ってた猫が、いなくなっちゃったんっす……。
                    ずっと探してるんっすがねぇ…。
                 */
                await Content(`Scripts.Ev044.Neko.1.Fail`)
                Face('char04a')
                //#endregion
            }
            //#endregion
        } else {
            //#region 一般分支
            /**
                ……っと、今日の「じゅぎょう」を始めるっすよ～。
                …ああっ！？ {{yourName}} さん！  ごっごめんっす！
                実はボク、孤竜たちから「せんせい」になってほしいって
                頼まれちゃって、その練習をしてたっすよ。
                な、なんだかめちゃくちゃ緊張するっすぅ～。
             */
            appServ.setBGM('music11')
            Face('char09')
            await Content(`Scripts.Ev044.Normal.1`)
            Face('char09a')
            //#endregion
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {

        if (saveData.ivent & EventFlag.貓事件) {
            if (saveData.item[ItemID.ささやかな財宝]) {
                //#region 財寶事件完成

                saveData.ivent |= EventFlag.回答事件;
                appServ.setBGM('music11')
                Face('char00')
                /**
                    ねこさん、最近元気がいい{{go01}}。
                    {{my}}、なんだかすごくうれしい{{go01}}♪
                    お世話するのは大変だけど、でも、すごくやりがいがあること{{go00}}{{go01}}。
                 */
                await Content(`Scripts.Ev044.Neko.2.Complete`)
                //#endregion
            }
            else {
                //#region 財寶事件未完成
                Face('char00')
                /**
                    ねぇ……{{you}}……ねこさん、いなくなっちゃった{{go01}}。
                    どうしたんだろう……。
                */
                Content(`Scripts.Ev044.Neko.2.Fail.Content`)
                appServ.setBGM('music02')
                const result = (await Options([
                    // そのうち帰ってくるよ。
                    `Scripts.Ev044.Neko.2.Fail.1.Action`,
                    // どうしたんだろうな。
                    `Scripts.Ev044.Neko.2.Fail.2.Action`,
                    // 別にいいじゃない。
                    `Scripts.Ev044.Neko.2.Fail.3.Action`,
                    // 飼う環境が悪かったのかも。
                    `Scripts.Ev044.Neko.2.Fail.4.Action`
                ]));

                saveData.ivent |= EventFlag.回答事件;
                switch (result.index) {
                    case 0:
                        // [沮喪] + 表情 
                        EmojiAndAdjustLove(6)
                        // うん……心配{{go00}}{{go01}}。
                        await Content(`Scripts.Ev044.Neko.2.Fail.1.Reply`)
                        break;
                    case 1:
                        // [沮喪] + 表情 
                        EmojiAndAdjustLove(6)
                        // ね？　ずっと探してるんだけど……。
                        await Content(`Scripts.Ev044.Neko.2.Fail.2.Reply`)
                        break;
                    case 2:
                        // [沮喪] + 表情 
                        EmojiAndAdjustLove(6)
                        // でも……{{my}}……心配してる{{go01}}。
                        await Content(`Scripts.Ev044.Neko.2.Fail.3.Reply`)
                        break;
                    case 3:
                        //[沮喪] + 表情 
                        EmojiAndAdjustLove(6)
                        // きゅうぅ……やっぱりそうだった{{go03}}？
                        await Content(`Scripts.Ev044.Neko.2.Fail.4.Reply`)
                        break;
                }

                //#endregion
            }
        }
        else {
            //#region 一般分支
            appServ.setBGM('music11')
            Face('char00')
            /**
                "はじめは{{my}}たち、みんなで「せんせい」やってた{{go01}}。
                けど、すぐうまくいかなくなっちゃった{{go01}}。
                だからニエルサンに頼んだんだけど……
                {{you}}は「せんせい」、できる？
             */
            Content(`Scripts.Ev044.Normal.2.Content`)
            const result = (await Options([
                // うん、任せてよ。
                `Scripts.Ev044.Normal.2.1.Action`,
                // まねくらいならできるかも。
                `Scripts.Ev044.Normal.2.2.Action`,
                // 先生なんて大嫌いだ。
                `Scripts.Ev044.Normal.2.3.Action`,
                // 先生よりも生徒がいいな。
                `Scripts.Ev044.Normal.2.4.Action`
            ]));

            saveData.ivent |= EventFlag.回答事件;
            switch (result.index) {
                case 0:
                    // [高興] + 表情 
                    EmojiAndAdjustLove(4)
                    // わぁ～！  じゃあこっちに来て「べんきょう」教えてほしい{{go01}}！
                    await Content(`Scripts.Ev044.Normal.2.1.Reply`)
                    break;
                case 1:
                    // [高興] + 表情 
                    EmojiAndAdjustLove(4)
                    // まねっこ……じゃあ、{{my}}とおんなじ{{go00}}{{go01}}。
                    await Content(`Scripts.Ev044.Normal.2.2.Reply`)
                    break;
                case 2:
                    // [答非所問]
                    EmojiAndAdjustLove(11)
                    // ……なにか、イヤなことあった{{go03}}？
                    await Content(`Scripts.Ev044.Normal.2.3.Reply`)
                    break;
                case 3:
                    // [理解不能] 
                    EmojiAndAdjustLove(13)
                    // えー、でも「がっこう」は「せんせい」もいないとだめ{{go00}}{{go01}}。
                    await Content(`Scripts.Ev044.Normal.2.4.Reply`)
                    break;
            }
            //#endregion
        }

    } else {
        if (saveData.ivent & EventFlag.貓事件) {
            if (saveData.item[ItemID.ささやかな財宝]) {
                //#region 財寶任務完成
                appServ.setBGM('music11')
                Face('char01')
                /**
                    お恥ずかしい話なんっすが、病竜保護協会はいつも資金不足なんっす。
                    だから、猫の餌代はボクたちでまかなわないといけないんっすね。
                    今回は{{dragonName}} がお宝を見つけてきてくれたから問題なかったっすが、
                    もし手に入っていなかったら、この猫は今ごろ、どうなってたっすかねぇ……。
                 */
                await Content(`Scripts.Ev044.Neko.3.Complete`)
                Face('char01a')
                //#endregion
            } else {
                //#region 貓事件失敗
                appServ.setBGM('music02')
                Face('char01')
                /**
                    お恥ずかしい話なんっすが、病竜保護協会はいつも資金不足なんっす。
                    猫の餌代、今までボクの少ないヘソクリでやりくりしてたんっすが、
                    やっぱり口に合わなかったみたいなんっすよ……。
                    あの時、お金を工面して餌を買っておけば、あんなことにはならなかったのに…。
                    {{dragonName}} 、何とかしてお金を稼ぎたいって言ってたんっすけどねぇ。
                    間に合わなかったっす……。
                 */
                await Content(`Scripts.Ev044.Neko.3.Fail`)
                Face('char01a')
                //#endregion
            }
        }
        else {
            // #region 一般事件
            appServ.setBGM('music11')
            Face('char05')
            /**
                あー……緊張したっすぅ。
                でも、どの仔も真剣にボクの話を聞いてくれたっすよ！
                え？  「じゅぎょう」の内容っすか？ 「おいしいシチューの作り方」っすよ♪
                でも、あんな感じでよかったんっすかねぇ…？
             */
            await Content(`Scripts.Ev044.Normal.3`)
            Face('char05a')
            //#endregion 
        }
    }
    SetContentCompleted()
}

export default ev044;