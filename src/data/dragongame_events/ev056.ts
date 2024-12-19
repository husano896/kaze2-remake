import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev056 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music11')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        /**
            調子が良くなったみたいで、さっそくワンパクっぷりが見れるっすね♪
            子どもはやっぱり、無邪気に遊んでるのが一番っすよ。
            病気だからって、部屋の中にこもってたり、安静にしてちゃ、治るものまで
            治らなくなるっすからね。 幸いこちらでは天気もいいみたいっすし。
            今日は、あとで孤竜たちと一緒に散歩しようっすね。
         */
        await Content(`Scripts.Ev056.1`)
        Face('char01a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            今日は、ニエルサンが散歩に連れてってくれる{{go01}}。
            {{you}}が帰ったあとだから、まだ時間はあるみたい。
            最近のニエルサン、調べものばっかりしてるから、
            今日はとっても楽しみにしてる{{go01}}！
         */
        Content(`Scripts.Ev056.2.Content`)
        const result = (await Options([
            // あ、そう。
            `Scripts.Ev056.2.1.Action`,
            // 一緒について行きたいな。
            `Scripts.Ev056.2.2.Action`,
            // 迷惑かけないようにね。
            `Scripts.Ev056.2.3.Action`,
            // 楽しんできてね。
            `Scripts.Ev056.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // 関心…ない{{go03}}？ どうしてそんなこと言う{{go04}}……？
                await Content(`Scripts.Ev056.2.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // ホントに来れたらいいのに…そしたらもっともっと、楽しいのに……。
                await Content(`Scripts.Ev056.2.2.Reply`)
                break;
            case 2:
                // [高興] 
                EmojiAndAdjustLove(14)
                // うん。はしゃぎ過ぎないように気をつける{{go01}}。
                await Content(`Scripts.Ev056.2.3.Reply`)
                break;
            case 3:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // また、お話聞かせてあげる{{go01}}♪
                await Content(`Scripts.Ev056.2.4.Reply`)
                break;
        }
    }
    SetContentCompleted()
}

export default ev056;