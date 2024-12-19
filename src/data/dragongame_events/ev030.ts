import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev030 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char05');
        /**
            {{yourName}}さん！  すごいことを発見したっす！
            図書館にあった、竜の病気について書かれた専門書の中に、
            「病に打ち克つ術の一つは　属性を極めその証を手にすべし」
            って部分があったんっす！　ただ……それ以上は書いてなかったっすが。
            でもこの際だから、どんなことでも試してみるっすよ！
         */
        await Content(`Scripts.Ev030.1`);
        Face('char05a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
            ねえねえ、今度はいつ来てくれる{{go04}}？
            {{my}}、{{you}}のことが待ちどおしくて、夜もあんまり眠れない{{go01}}…。
         */
        Content(`Scripts.Ev030.2.Content`)
        const result = (await Options([
            // 今日中にもう一回来るよ。
            `Scripts.Ev030.2.1.Action`,
            // また明日にでも。
            `Scripts.Ev030.2.2.Action`,
            // ヒマができたらね。
            `Scripts.Ev030.2.3.Action`,
            // 次はいつか分からない。
            `Scripts.Ev030.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // またすぐに{{you}}に会える{{go03}}？ わぁ…すごくうれしい{{go01}}♪
                await Content(`Scripts.Ev030.2.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // 一晩寝たらまた、{{you}}に会える{{go03}}？ うれしい…♪
                await Content(`Scripts.Ev030.2.2.Reply`)
                break;
            case 2:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // えぇ…地球の生活のほうが忙しい{{go03}}？ …さみしいけど、ガマンする{{go01}}。
                await Content(`Scripts.Ev030.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // えぇ…そ…そんな……。
                await Content(`Scripts.Ev030.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev030;