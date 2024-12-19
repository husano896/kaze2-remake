import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev034 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char01');
        /**
            {{yourName}}さんの世界には、星の伝説はあるっすか？
            ボクたちの世界にはいっぱいあるっす。そのなかでも、『ニステア』という
            星には、とっても不思議な言い伝えが残ってるんっすよ。
            『翠の星は涙星、遠い空から地を見つめ、翠の滴で海満たす』

            泣き虫の星、ニステアの物語っす。"
         */
        await Content(`Scripts.Ev034.1`)
        Face('char01a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
         * きゅ？  さっき、ニエルサンとどんな話をしてた{{go04}}？
         */
        Content(`Scripts.Ev034.2.Content`)
        const result = (await Options([
            // 「ニステア」の話。
            `Scripts.Ev034.2.1.Action`,
            // 泣き虫の星の話。
            `Scripts.Ev034.2.2.Action`,
            // 惑星の話。
            `Scripts.Ev034.2.3.Action`,
            // キミが泣き虫だって話。
            `Scripts.Ev034.2.4.Action`
        ]));
        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // えっと……泣き虫のお星さまのこと？
                await Content(`Scripts.Ev034.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // 知ってる！  優しくて、でも泣き虫のお星さま{{go00}}{{go01}}。
                await Content(`Scripts.Ev034.2.2.Reply`)
                break;
            case 2:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // わくせい？  わくわく？  わくわくせい～？
                await Content(`Scripts.Ev034.2.3.Reply`)
                break;
            case 3:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // ちがう{{go01}}！ {{my}}、泣き虫なんかじゃない{{go01}}！
                await Content(`Scripts.Ev034.2.4.Reply`)
                break;
        }
    } else {
        Face('char01');
        /*
        泣き虫の星の話は、子守り歌にもなってるっす。
        もしかすると{{dragonName}} も、お母さんに歌ってもらったことが
        あるかもしれないっすね……。
        */
        await Content(`Scripts.Ev034.3`);
        Face('char01a');
    }
    SetContentCompleted()
}

export default ev034;