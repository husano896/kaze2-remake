import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev074 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            もう一つ、{{you}}に聞きたいことがある{{go01}}！
            {{you}}のいる世界って、どんなところなのか、気になる{{go01}}。
            教えてほしい{{go01}}！
         */
        Content(`Scripts.Ev074.1.Content`)
        const result = (await Options([
            // ビルやコンクリートだらけ。
            `Scripts.Ev074.1.1.Action`,
            // 緑いっぱいの田舎。
            `Scripts.Ev074.1.2.Action`,
            // 住宅街の中の一軒家。
            `Scripts.Ev074.1.3.Action`,
            // 教える必要はないな。
            `Scripts.Ev074.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // それってどんなもの！？  知りたい{{go01}}！
                await Content(`Scripts.Ev074.1.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そっか♪  この辺りとおんなじ{{go00}}{{go01}}。
                await Content(`Scripts.Ev074.1.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // ふ～ん？  お家がいっぱいある町？
                await Content(`Scripts.Ev074.1.3.Reply`)
                break;
            case 3:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // そうだけど……。
                await Content(`Scripts.Ev074.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char00');
        /** 
            んと、{{my}}は{{you}}のこと、知りたいだけ{{go00}}{{go01}}。
            でも…ニエルサンは「あんまり聞きすぎるのもよくないっすよ」って言う{{go01}}。
            {{you}}はいろいろ聞かれるのって、困る{{go03}}？
        */
        await Content(`Scripts.Ev074.2`)
    }
    SetContentCompleted()
}

export default ev074;