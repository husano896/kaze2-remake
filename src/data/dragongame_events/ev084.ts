import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev084 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char02')
        /**
            ……ご心配おかけしたっす。
            他の係の人たちからも怒られたっすよ、「頑張りすぎだ」って。
            孤竜たちにも迷惑かけちゃって、申しわけないっす。
            これからは頑張りすぎないように、頑張るっすよ！
         */
        await Content(`Scripts.Ev084.1`)
        Face('char02a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            あのね……ニエルサンには内緒なんだけど、
            病気が治ったお祝いをしようって、みんなで相談してる{{go01}}。
            {{you}}は何をしてあげたらいいと思う？
         */
        Content(`Scripts.Ev084.2.Content`)
        const result = (await Options([
            // やめといたほうがいいぞ。
            `Scripts.Ev084.2.1.Action`,
            // 料理でも作ってあげたら？
            `Scripts.Ev084.2.2.Action`,
            // キミの病が治ってないのに？
            `Scripts.Ev084.2.3.Action`,
            // いい仔にしたらいいと思う。
            `Scripts.Ev084.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [生氣]
                EmojiAndAdjustLove(12)
                // なんで？  どうしてそうなる{{go04}}？
                await Content(`Scripts.Ev084.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // あっ、そういえば前に、シチューの作り方教えてもらった{{go01}}。
                await Content(`Scripts.Ev084.2.2.Reply`)
                break;
            case 2:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // ……そうだけど……。
                await Content(`Scripts.Ev084.2.3.Reply`)
                break;
            case 3:
                // [高興] 
                EmojiAndAdjustLove(14)
                // むー……{{you}}のいじわる～！
                await Content(`Scripts.Ev084.2.4.Reply`)
                break;
        }
    } else {
        Face('char02')
        /**
            孤竜たち、ボクの全快祝いをしてくれるそうっす。
            {{yourName}}さん……ボクが、あの仔らに
            お返しのお祝いをしてあげられる日は、来るんっすかね…。
            …………………
            ……いや、絶対にしてあげるっす！
            {{yourName}}さんも、協力 お願いするっすよ！
         */
        await Content(`Scripts.Ev084.3`)
        Face('char02a')
    }
    SetContentCompleted()
}

export default ev084;