import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev047 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        appServ.setBGM('music13')
        /**
            そういえば、実は……この保護計画が実施される前に、{{yourName}} さんたち
            地球の民に里親を依頼するのを、反対する人もいたんっすよ。
            今までこの世界と全くつながりのなかった人たちだし、直接会うこともできない
            っすから、遊び半分で参加して、途中で投げ出してしまうかもしれないって……。 
            でも、{{yourName}} さんなら、そんな心配も無用っすね。
            孤竜のことが…竜のことが好きだから、ここに来てくれるんっすものね…。
         */
        await Content(`Scripts.Ev047.1`)

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        appServ.setBGM('music02')
        /**
            ……もう一度だけ、聞きたい{{go01}}。
            {{you}}は{{my}}のこと……見捨てたり、しないよね？
         */
        Content(`Scripts.Ev047.2.Content`)
        const result = (await Options([
            // もちろん！
            `Scripts.Ev047.2.1.Action`,
            // どうして、そんなことを？
            `Scripts.Ev047.2.2.Action`,
            // さぁ、どうだろう…。
            `Scripts.Ev047.2.3.Action`,
            // こっちにも都合があるから。
            `Scripts.Ev047.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [高興] + 表情
                EmojiAndAdjustLove(4)
                // そっか……よかった{{go01}}♪
                await Content(`Scripts.Ev047.2.1.Reply`)
                break;
            case 1:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ううん……なんでもない{{go01}}。
                await Content(`Scripts.Ev047.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // う……ううっ……ぐすっ。
                await Content(`Scripts.Ev047.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // イヤ…、そんなこと言っちゃイヤ{{go00}}{{go01}}！
                await Content(`Scripts.Ev047.2.4.Reply`)
                break;
        }
    } else {
        appServ.setBGM('music13')
        Face('char02')
        /**
            実は、突然行方不明になっちゃう里親が、けっこういるんっす。
            病気が進行するに従って、そういう人がだんだん増えていく……。
            すぐ向かいの部屋にも、そういう仔がいて……
            …………。
            {{yourName}}さんはあの仔を、裏切ったりなんて、しないっすよね？
         */
        await Content(`Scripts.Ev047.3`)
        Face('char02a')
    }
    SetContentCompleted()
}

export default ev047;