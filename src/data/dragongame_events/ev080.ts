import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev080 = async (component: DragongameComponent) => {

    const { saveData, appServ, Emoji, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component
    appServ.setBGM('music20')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char04')
        Emoji(6)
        /**
            あれから{{dragonName}}、すっかりふさぎ込んじゃったっす。
            話し掛けても、ちゃんと返事してくれないし……。
            治療法も、今のところは手がかりさえつかめないっす……。
            {{dragonName}}  にとって、今は{{yourName}} さんだけが頼りっす。
            …{{dragonName}} のこと、励ましてあげてほしいっす！
         */
        await Content(`Scripts.Ev080.1`)
        Face('char04a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ねぇ、{{you}}……。ニエルサンが言ってたけれど、
            {{my}}のトモダチは、「てんごく」に行った{{go01}}……。
            空よりもずっと高くて、きれいなところだ…って教わった{{go01}}。
            でも、「てんごく」なんて…あるのかな。
            {{you}}は、「てんごく」って……あると思う？
         */
        Content(`Scripts.Ev080.2.Content`)
        Emoji(6)
        const result = (await Options([
            // あるわけないだろ。
            `Scripts.Ev080.2.1.Action`,
            // あるんじゃないかな…。
            `Scripts.Ev080.2.2.Action`,
            // それを考えるのはまだ早い。
            `Scripts.Ev080.2.3.Action`,
            // キミは、行きたいの？
            `Scripts.Ev080.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ウソでもいいから、そうだって言ってほしかった{{go01}}……。
                await Content(`Scripts.Ev080.2.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // そっか……。
                await Content(`Scripts.Ev080.2.2.Reply`)
                break;
            case 2:
                // [高興]
                EmojiAndAdjustLove(14)
                // ……うん、分かった{{go01}}……。
                await Content(`Scripts.Ev080.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // 分かんない{{go01}}……そんなこと。
                await Content(`Scripts.Ev080.2.4.Reply`)
                break;
        }
    } else {
        Face('char04')
        /**
            ボクには、あんなことしか言えなかったっす。
            本当は天国なんかより、みんなで一緒に生きていくほうが
            百倍も、千倍も幸せだと思うっすよ！
            そうでなきゃ…そうでなきゃ……。
         */
        await Content(`Scripts.Ev080.3`)
        Face('char04a')
    }
    SetContentCompleted()
}

export default ev080;