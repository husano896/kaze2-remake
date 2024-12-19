import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev060 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char07')
        /**
            {{yourName}}さん、実はこの前、怪しげな行商人から
            ぼろぼろの古文書をもらったんっす。
            それによると、竜のどんな病気も治す「万能薬」というものがあるとか……。
            ガセかもしれないけれど、一応調べてみるっすよ。
         */
        await Content(`Scripts.Ev060.1`)
        Face('char07a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ねぇ、{{you}}……。 {{my}}たちの世界には、とても怖い伝説がある{{go01}}。
            竜と人との戦争に使われたっていう、悪魔の樹の話……。
            星の海を越えた樹は この地に根を下ろして、真っ赤な、血の色みたいな光で
            世界を燃やして、滅ぼした…って言われてる{{go01}}。
         */
        Content(`Scripts.Ev060.2.Content`)
        const result = (await Options([
            // どうしてそんな話を？
            `Scripts.Ev060.2.1.Action`,
            // その樹は、どうなったんだ？
            `Scripts.Ev060.2.2.Action`,
            // こっちには関係ない話だな。
            `Scripts.Ev060.2.3.Action`,
            // よく生き残れたよな、竜。
            `Scripts.Ev060.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興]
                EmojiAndAdjustLove(14)
                // この前、海面に突き刺さった星の船を見たときのことを思い出した{{go01}}…。
                await Content(`Scripts.Ev060.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // 知らない……海のかなたにある、って聞いたことがある{{go01}}。
                await Content(`Scripts.Ev060.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // きゅ……そう、だよね……。
                await Content(`Scripts.Ev060.2.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ……うん……。
                await Content(`Scripts.Ev060.2.4.Reply`)
                break;
        }
    } else {
        Face('char01')
        /**
            『天を突く　ざわめく魔樹　紅と蒼を湛えん
            紅き珠は　戦乱の鏑矢　遍く満ちて強者を焼く
            蒼き珠は　安寧の息吹　闇を裂きて争いを鎮む』
            
            ……これが、「悪魔の樹と二つの珠」と呼ばれる伝承っす。
            でも、普段は語らないようにしてるっす。災いを招くから、って。
         */
        await Content(`Scripts.Ev060.3`)
        Face('char01a')
    }
    SetContentCompleted()
}

export default ev060;