import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";

const ev066 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {
        if (saveData.ivent & EventFlag.貓事件) {
            Face('char05')
            /*
                この前、孤竜たちと散歩してたときなんっすが、
                浜辺に「ニステアの滴」が打ち上げられてたんっす。
                {{dragonName}} 、みんなに頼みこんで自分の物にしてたみたいっすが、
                多分、{{yourName}} さんへの贈りものにするつもりっすよ。
            */
            await Content(`Scripts.Ev066.Neko.1`)
            Face('char05a')
        }
        else {
            Face('char01')
            /*
                この前 託された「忌地への道標」っすが、この道標に書かれていた文章の中に
                竜死病を治す手がかりのありかも書かれているみたいっすよ！
                ちょっと古風な文っすから 分かりづらいっすが、
                道具として使ってみて、確認してみてくださいっす。
            */
            await Content(`Scripts.Ev066.Normal.1`)
            Face('char01a')
        }

    } else if (!(saveData.ivent & EventFlag.回答事件)) {

        if (appServ.saveData.ivent & EventFlag.貓事件) {
            /*
                "あ、{{you}}……。 あのね、これ、{{you}}にあげるんじゃない{{go01}}…。
                飼ってるねこさんの「おまもり」にしたい{{go01}}。
                ねこさんにあげていい…？"
            */
            Content(`Scripts.Ev066.Neko.2.Content`)
            const result = (await Options([
                // うん。
                `Scripts.Ev066.Neko.2.1.Action`,
                // なんで猫なんかに！
                `Scripts.Ev066.Neko.2.2.Action`,
                // どうでもいいよ。
                `Scripts.Ev066.Neko.2.3.Action`,
                // 優しいんだな。
                `Scripts.Ev066.Neko.2.4.Action`
            ]));

            saveData.ivent |= EventFlag.回答事件;
            switch (result.index) {
                case 0:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // ごめん……あと、ありがと……。
                    await Content(`Scripts.Ev066.Neko.2.1.Reply`)
                    break;
                case 1:
                    // [沮喪]
                    EmojiAndAdjustLove(16)
                    // きゅっ、ご、ごめん！
                    await Content(`Scripts.Ev066.Neko.2.2.Reply`)
                    break;
                case 2:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // う………分かった{{go01}}……。
                    await Content(`Scripts.Ev066.Neko.2.3.Reply`)
                    break;
                case 3:
                    // [理解不能]
                    EmojiAndAdjustLove(13)
                    // ううん。 {{you}}もやさしい{{go01}}！
                    await Content(`Scripts.Ev066.Neko.2.4.Reply`)
                    break;
            }
        }
        else {
            Face('char01')
            /*
                これで「忌まわしき地」へ行くことができるっす！
                地図をとことん調べて、「忌まわしき地」の位置を探すっすよ。
                きっと、今まで見すごしていたところにあるはずっす。
                {{yourName}}さん、ファイトっすよ！
            */
            await Content(`Scripts.Ev066.Normal.2`)
            Face('char01a')
        }
    } else {
        if (saveData.ivent & EventFlag.貓事件) {
            Face('char02')
            /**
                あ……ごめんなさいっす。
                例の石、ボクの勘違いだったみたいっすね。
                ご、ごめんっす、そんな顔、しないでほしいっすよぅ～。
             */
            await Content(`Scripts.Ev066.Neko.3`)
            Face('char02a')
        }
    }
    SetContentCompleted()
}

export default ev066;