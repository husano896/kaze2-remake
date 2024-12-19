import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev057 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        /**
            あの孤竜は運が悪い、この孤竜は運がいい…。本当、運命って不平等っすよね。
            まぁ…こうやって不平を言って、どうにかなることでもないっすが…。
            考え方次第で、楽にも苦にもなるような気がしたっす。
            どんなことでも、「アイツのせいだ」「誰のせいだ」ってなすりつけるよりも、
            これは試練なんだって考えれば、気も楽になるかもしれないって思うんっす。
            ただ、竜死病まで自分のせいにしてしまうのは、あれっすが…ねぇ。
         */
        await Content(`Scripts.Ev057.1`)
        Face('char01a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            {{you}}と一緒に冒険できれば、なんだか自然と勇気がわいてくる{{go01}}！
            でも……どうして？
            どうして{{you}}は、こっちに来れない{{go04}}？
         */
        Content(`Scripts.Ev057.2.Content`)
        const result = (await Options([
            // 行きたくない。
            `Scripts.Ev057.2.1.Action`,
            // どうしてって言われても…。
            `Scripts.Ev057.2.2.Action`,
            // 今度そっちへ行くよ。
            `Scripts.Ev057.2.3.Action`,
            // 行きたくても行けないんだ。
            `Scripts.Ev057.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // そ…そうなんだ。
                await Content(`Scripts.Ev057.2.1.Reply`)
                break;
            case 1:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // う……ごめん……。
                await Content(`Scripts.Ev057.2.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ホント？信じられない{{go01}}！　うれしい{{go01}}♪
                await Content(`Scripts.Ev057.2.3.Reply`)
                break;
            case 3:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // うーん……どうしてなんだろう…。
                await Content(`Scripts.Ev057.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev057;