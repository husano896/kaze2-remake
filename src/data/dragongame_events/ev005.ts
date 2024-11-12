import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev005 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
        {{you}}は、{{my}}のこと、怖くない{{go03}}？
        だって……
        {{my}}は、竜  {{go00}}  {{go01}}  ……。
         */
        Content(`Scripts.Ev005.1.Content`)
        const result = (await Options([
            // はっきり言えば怖い。
            `Scripts.Ev005.1.1.Action`,
            // 大きくなると不安かも。
            `Scripts.Ev005.1.2.Action`,
            // 結構かわいいよ。
            `Scripts.Ev005.1.3.Action`,
            // 少しだけ……。
            `Scripts.Ev005.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …やっぱり、そう。
                await Content(`Scripts.Ev005.1.1.Reply`)
                break;
            case 1:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // …{{my}}は、大きくならない方がいい{{go03}}？
                await Content(`Scripts.Ev005.1.2.Reply`)
                break;
            case 2:
                // [開心] + 表情
                EmojiAndAdjustLove(4)
                // う…うれしい{{go01}}♪
                await Content(`Scripts.Ev005.1.3.Reply`)
                break;
            case 3:
                // [驚訝] + 表情
                EmojiAndAdjustLove(5)
                // はうっ…。
                await Content(`Scripts.Ev005.1.4.Reply`)
                break;
        }
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        appServ.saveData.ivent |= EventFlag.回答事件;
        Face('char01');
        /*
        {{yourName}} さん、今日も頑張ってるっすね♪
        そういえばさっき、竜舎の前にサザムの実と手紙が置いてあったっす。
        手紙には 「ごめんなさい」 としか書かれてなかったっすが…。
        この実、たしか仔竜たちに人気の甘いフルーツだったっすね。
        とりあえずここに、この実をこの部屋に置いておくっすね。
        [ニエルは 実を部屋の片隅に そっと置いた。]
        */
        await Content(`Scripts.Ev005.2`)
        Face('char01a');
    } else {
        await Content(`Scripts.Ev005.3`)
    }
    SetContentCompleted()
}

export default ev005;