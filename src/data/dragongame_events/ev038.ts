import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev038 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char07');
        /**
"街で耳にしたことなんっすが、どこかに竜死病を治す、
『翠の星の使者』と呼ばれる医者がいる、って噂を耳にしたっす。
薬も使わずに、触れただけで治す――って。
でも、これは本当に噂でしかないと思うっす。そんなことで治ったら……
死んでいった孤竜たちは…………
いや、何でもないっす。"
         */
        await Content(`Scripts.Ev038.1`)
        Face('char07a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
"ねぇ、{{you}}……。
どうして、病気ってある{{go04}}？
いくら考えても、{{my}}には分からない{{go01}}…。"
         */
        Content(`Scripts.Ev038.2.Content`)
        const result = (await Options([
            // きっと悪いことをした罰だ。
            `Scripts.Ev038.2.1.Action`,
            // ウイルスやプリオンのせい。
            `Scripts.Ev038.2.2.Action`,
            // 神が与えた試練、なのかも。
            `Scripts.Ev038.2.3.Action`,
            // ごめん……分からない。
            `Scripts.Ev038.2.4.Action`
        ]));
        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [生氣] + 表情 
                EmojiAndAdjustLove(2)
                // でも{{my}}、なんにも悪いことしてない{{go01}}！
                await Content(`Scripts.Ev038.2.1.Reply`)
                break;
            case 1:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // ういすきー？  ぷるりん～？
                await Content(`Scripts.Ev038.2.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // なら、神さまってとってもいじわる{{go00}}{{go01}}…。
                await Content(`Scripts.Ev038.2.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // そう……ごめん……。
                await Content(`Scripts.Ev038.2.4.Reply`)
                break;
        }
    } else {
        Face('char04');
        /*
"さっきはあんなこと言っちゃったっすが、本当はボクも信じてみたいんっす。
あの孤竜たちには、世界中の誰よりも奇跡が必要だと思うっすから……。"
        */
        await Content(`Scripts.Ev038.3`);
        Face('char04a');
    }
    SetContentCompleted()
}

export default ev038;