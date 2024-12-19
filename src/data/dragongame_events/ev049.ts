import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev049 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music11')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char08')
        /**
            あ、{{yourName}} さん。孤竜の話を聞いたっすか？
            実は、ピクニックの提案をしたのは{{dragonName}} なんっすよ。
            みんなとっても楽しみにしてるっす。
            …実は、ボクもなんっすけどね♪
         */
        await Content(`Scripts.Ev049.1`)
        Face('char08a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            あしたはピクニック～♪  あしたは楽しいピクニック～♪
         */
        Content(`Scripts.Ev049.2.Content`)
        const result = (await Options([
            // 楽しそうだな。
            `Scripts.Ev049.2.1.Action`,
            // お弁当はどうするの？
            `Scripts.Ev049.2.2.Action`,
            // はしゃいでると、疲れるぞ。
            `Scripts.Ev049.2.3.Action`,
            // 病気のくせに、浮かれすぎ。
            `Scripts.Ev049.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // うんっ！ {{you}} も来れたら、最高なんだけど…。
                await Content(`Scripts.Ev049.2.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // ニエルサンと、{{my}}たちみんなでつくる{{go01}}。
                await Content(`Scripts.Ev049.2.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // へーき{{go00}}{{go01}}！
                await Content(`Scripts.Ev049.2.3.Reply`)
                break;
            case 3:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // ……分かってる{{go01}}！
                await Content(`Scripts.Ev049.2.4.Reply`)
                break;
        }
    } else {
        Face('char00')
        /** 
            あ、ごめん。
            これからニエルサンと、買い物に行ってくる{{go01}}。
            また後で♪ 
        */
        await Content(`Scripts.Ev049.3`)
    }
    SetContentCompleted()
}

export default ev049;