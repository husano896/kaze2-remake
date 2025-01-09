import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev040 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove, saveData } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char00');
        /**
            さっき、竜舎の前に、ちっちゃいねこさんがいた{{go01}}。
            独りぼっちでさみしそうにしてた{{go01}}。
            飼ってもいい？　ってニエルサンに聞いたんだけど、
            「{{dragonName}}には無理っすよ～」って言う{{go01}}。
            ……ねぇ、{{you}}からも頼んでくれないかな？
         */
        Content(`Scripts.Ev040.1.Content`)

        const result = (await Options([
            // キミも病気なんだし、ダメ。
            `Scripts.Ev040.1.1.Action`,
            // 寝場所や餌はどうするんだ？
            `Scripts.Ev040.1.2.Action`,
            // ちゃんと世話できるなら…。
            `Scripts.Ev040.1.3.Action`,
            // うーん…いいよ、飼っても。
            `Scripts.Ev040.1.4.Action`
        ]));
        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情 
                EmojiAndAdjustLove(6)
                // {{you}}なら、いいって言ってくれると思ったのに……きらい{{go00}}{{go01}}！
                await Content(`Scripts.Ev040.1.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情 
                EmojiAndAdjustLove(6)
                // ……だって、ねこさん……かわいそう{{go00}}{{go01}}。
                await Content(`Scripts.Ev040.1.2.Reply`)
                break;
            case 2:
                // 開啟貓分支
                saveData.ivent |= EventFlag.貓事件;
                // [高興] + 表情 
                EmojiAndAdjustLove(14)
                // 大丈夫{{go00}}{{go01}}。 ちゃんと世話できる{{go01}}。
                await Content(`Scripts.Ev040.1.3.Reply`)

                break;
            case 3:
                // 開啟貓分支
                saveData.ivent |= EventFlag.貓事件;
                // [高興] + 表情 
                EmojiAndAdjustLove(4)
                // ありがとう！  {{my}}、ちゃんと世話する{{go01}}♪
                await Content(`Scripts.Ev040.1.4.Reply`)

                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char04')
        /**
            たまに、どういうわけか、孤竜院の前に犬や猫を捨てていく人たちがいるっす。
            そういうのを見るたびに、悲しいっていうか、頭にくるっていうか……。
            捨てられるために生まれてくる命なんて、あっちゃいけないっすよね！
         */
        await Content(`Scripts.Ev040.2`)
        Face('char04a')
    }
    SetContentCompleted()
}

export default ev040;