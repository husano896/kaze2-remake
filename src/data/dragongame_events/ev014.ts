import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";

const ev014 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
         …ときどき、夢を見る{{go01}}。
        {{my}}が病気になって、苦しんでる夢――。
        なんで、{{my}}はこんな夢を見る{{go04}}？
         */
        Content(`Scripts.Ev014.1.Content`)
        const result = (await Options([
            // 甘ったれるなよ？
            `Scripts.Ev014.1.1.Action`,
            // 苦しい時はいつでも言って。
            `Scripts.Ev014.1.2.Action`,
            // こちらこそ！
            `Scripts.Ev014.1.3.Action`,
            // 無視
            `Scripts.Ev014.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ……ビクッ！
                await Content(`Scripts.Ev014.1.1.Reply`)
                break;
            case 1:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // …ありがとう…。
                await Content(`Scripts.Ev014.1.2.Reply`)
                break;
            case 2:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // ……♪
                await Content(`Scripts.Ev014.1.3.Reply`)
                break;
            case 3:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // あのぅ……。
                await Content(`Scripts.Ev014.1.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev014;