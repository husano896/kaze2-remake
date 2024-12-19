import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";

const ev069 = async (component: DragongameComponent) => {

    const { saveData, appServ, Emoji, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        if (saveData.ivent & EventFlag.貓事件) {
            /**
                {{you}}……ねこさんが……死んじゃった。
                おまもり、役に立たなかった{{go01}}。
                {{my}}……何もしてあげられなかった{{go01}}……。
             */
            Content(`Scripts.Ev069.Neko.1.Content`)
            Emoji(6)
            const result = (await Options([
                // そんなこと、ないと思うぞ。
                `Scripts.Ev069.Neko.1.1.Action`,
                // お葬式、あげてやろうよ。
                `Scripts.Ev069.Neko.1.2.Action`,
                // ずっと一緒だったよね…。
                `Scripts.Ev069.Neko.1.3.Action`,
                // そうだな。
                `Scripts.Ev069.Neko.1.4.Action`
            ]));

            switch (result.index) {
                case 0:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // ……ありがとう……。
                    await Content(`Scripts.Ev069.Neko.1.1.Reply`)
                    break;
                case 1:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // うん……。
                    await Content(`Scripts.Ev069.Neko.1.2.Reply`)
                    break;
                case 2:
                    // [高興]
                    EmojiAndAdjustLove(14)
                    // うん……う、うええぇぇん！
                    await Content(`Scripts.Ev069.Neko.1.3.Reply`)
                    break;
                case 3:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // ぐすっ、ひっく……。
                    await Content(`Scripts.Ev069.Neko.1.4.Reply`)
                    break;
            }
        }
        else {
            Face('char02')
            /**
                この前の里親の話を聞いてから、{{dragonName}}、いろいろ考えてるみたいっす。
                字の勉強をしたり、難しい本を読もうとしたりして……。
                まあ、疲れてすぐやめちゃうんっすが。
            */
            await Content(`Scripts.Ev069.Normal.1`)
            Face('char02a')
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        if (saveData.ivent & EventFlag.貓事件) {
            saveData.ivent |= EventFlag.回答事件;
            saveData.item[ItemID.ニステアの滴] = 1;
            /**
                あのね……ねこさんにお墓つくって、埋めちゃう{{go01}}。
                それで、おまもり、ニエルサンが「かたみ」にしようって。
                いなくなっちゃったのは悲しいけど、でも楽しいことも、うれしいことも、
                一緒に埋めちゃうのはよくないって。
                {{my}}も……そう思う{{go01}}。
                [猫の形見 {{varItemName[32]}} を入手した…]
             */
            await Content(`Scripts.Ev069.Neko.2`, { varItemName: appServ.t(`Data.Item.${ItemID.ニステアの滴}.Title`) })
        } else {
            /**
                {{you}}……。
                {{you}}は、もし{{my}}と実際に会ったときにも、
                ホントに今までどおり、仲良くしてくれる{{go03}}？
            */
            Content(`Scripts.Ev069.Normal.2.Content`)
            const result = (await Options([
                // できないかも。
                `Scripts.Ev069.Normal.2.1.Action`,
                // できるさ！
                `Scripts.Ev069.Normal.2.2.Action`,
                // いきなりは難しいかも。
                `Scripts.Ev069.Normal.2.3.Action`,
                // うーん、どうだろう…。
                `Scripts.Ev069.Normal.2.4.Action`
            ]));

            saveData.ivent |= EventFlag.回答事件;
            switch (result.index) {
                case 0:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // じゃあ、{{my}}ともケンカしちゃう{{go03}}？
                    await Content(`Scripts.Ev069.Normal.2.1.Reply`)
                    break;
                case 1:
                    // [理解不能] + 表情
                    EmojiAndAdjustLove(3)
                    // ……会ったこともないのに？
                    await Content(`Scripts.Ev069.Normal.2.2.Reply`)
                    break;
                case 2:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(16)
                    // そっか……そう{{go00}}{{go01}}。
                    await Content(`Scripts.Ev069.Normal.2.3.Reply`)
                    break;
                case 3:
                    // [沮喪] + 表情
                    EmojiAndAdjustLove(6)
                    // きゅ……ぐすっ。
                    await Content(`Scripts.Ev069.Normal.2.4.Reply`)
                    break;
            }
        }

    } else {
        if (saveData.ivent & EventFlag.貓事件) {
            Face('char02')
            /**
                ……猫、ちょっと目を離したすきに、馬車にひかれてしまったんっす。
                でも、生き物を飼うときには、必ず「死」というものを
                考えなくちゃならないんっすよね。
                たとえ、どんな理不尽な結末に、なったとしても……。
             */
            await Content(`Scripts.Ev069.Neko.3`)
            Face('char02a')
        } else {
            /**
                {{my}}、考えた{{go01}}。
                きっと、{{you}}の世界の人は、「竜」のことを勘違いしてると思う{{go01}}。
                {{my}}たちは、{{you}}たちと同じ、生き物{{go00}}{{go01}}。
                それを、{{you}}の世界の人にも、分かってほしい{{go01}}…。
             */
            await Content(`Scripts.Ev069.Normal.3`)
        }
    }
    SetContentCompleted()
}

export default ev069;