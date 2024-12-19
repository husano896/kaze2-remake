import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev071 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            "ねぇ、{{yourName}}……。
            {{you}}って、どんな人？
         */
        Content(`Scripts.Ev071.1.Content`)
        const result = (await Options([
            // どんな、って……？
            `Scripts.Ev071.1.1.Action`,
            // 「人間」だね。
            `Scripts.Ev071.1.2.Action`,
            // 「子ども」だよ。
            `Scripts.Ev071.1.3.Action`,
            // 「大人」かな。
            `Scripts.Ev071.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [驚訝]
                EmojiAndAdjustLove(15)
                // だから～、「オス」とか「メス」とか、そういうやつ{{go00}}{{go01}}～。
                await Content(`Scripts.Ev071.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // そっか～♪
                await Content(`Scripts.Ev071.1.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(3)
                // あ！  {{my}}とおんなじ{{go00}}{{go01}}！
                await Content(`Scripts.Ev071.1.3.Reply`)
                break;
            case 3:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // んじゃ、ニエルサンとおんなじ{{go00}}{{go01}}。
                await Content(`Scripts.Ev071.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char00');
        /** 
            あのね、{{you}}は{{my}}のこと、いっぱい知ってるかもしれないけど、
            {{my}}は{{you}}のこと、まだまだ知らない{{go01}}。
            だから、{{you}}のいろんなことを知りたい{{go01}}！
        */
        await Content(`Scripts.Ev071.2`)
    }
    SetContentCompleted()
}

export default ev071;