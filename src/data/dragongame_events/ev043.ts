import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev043 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music11')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char01');
        /**
            あ、{{yourName}} さん。この前はごめんっす。
            え！？  ……ま、まあ一応、歌えるっすよ。
            いや！ そっそんな、{{yourName}} さんにお聞かせできるほどの腕前じゃないっす！
            リクエストは、カンベンしてほしいっすぅ…。
         */
        await Content(`Scripts.Ev043.1`)
        Face('char01a');
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        /**
            くすくす…。
            ホントはね、ニエルサンの歌は、とてもじょうず{{go00}}{{go01}}！
            {{my}}たち、みんな大好き{{go00}}{{go01}}！
         */
        Content(`Scripts.Ev043.2.Content`)
        const result = (await Options([
            // 犬のおまわりさん歌ったの？
            `Scripts.Ev043.2.1.Action`,
            // キミの耳、大丈夫？
            `Scripts.Ev043.2.2.Action`,
            // 一度、聞いてみたいな。
            `Scripts.Ev043.2.3.Action`,
            // へぇ～、それは意外。
            `Scripts.Ev043.2.4.Action`
        ]));
        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // それ、どんな歌？
                await Content(`Scripts.Ev043.2.1.Reply`)
                break;
            case 1:
                // [生氣] + 表情 
                EmojiAndAdjustLove(2)
                // ぷぅ……もう知らない{{go01}}！
                await Content(`Scripts.Ev043.2.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ホントに、きれいな声{{go00}}{{go01}}～。
                await Content(`Scripts.Ev043.2.3.Reply`)
                break;
            case 3:
                // [驚訝]
                EmojiAndAdjustLove(15)
                // そう？  でもホントに上手{{go00}}{{go01}}。
                await Content(`Scripts.Ev043.2.4.Reply`)
                break;
        }
    } else {
        Face('char09');
        /*
            がらがらがらがら……… （ごくっ！）
            あ、あーっ！  うがい薬飲んじゃったっすぅ！
            うげぇ……。
        */
        await Content(`Scripts.Ev043.3`);
        Face('char09a');
    }
    SetContentCompleted()
}

export default ev043;