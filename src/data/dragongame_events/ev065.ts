import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";

const ev065 = async (component: DragongameComponent) => {

    const { hideLayer, saveData, appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music23')
    if (appServ.waitTimeMinutes >= 60) {
        hideLayer('Ray1');
        Face('char04')
        saveData.item[ItemID.忌地への道標] = 1;
        /**
            街外れで、竜死病にかかって亡くなった成竜が発見されたっす。
            傷だらけな上に ひどい病状で…この街にたどり着く途中に力尽きたみたいっすが、
            その竜の持っていた物だけは、大切に守られていたっすよ。
            「私が死んでも、あの仔に渡してほしい」と書かれた
            {{dragonName}}  宛の手紙と… これが……。
            竜死病治療の手がかり[{{varItemName[25]}} を受け取った]
         */
        await Content(`Scripts.Ev065.1`)
        Face('char04a')

    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        /**
            ……え？
            ……どうした{{go04}}？
         */
        Content(`Scripts.Ev065.2.Content`)
        const result = (await Options([
            // これを……。
            `Scripts.Ev065.2.1.Action`,
            // いや、何でもない。
            `Scripts.Ev065.2.2.Action`,
            // キミの母さん、死んだって。
            `Scripts.Ev065.2.3.Action`,
            // 治す手がかり見つかったよ。
            `Scripts.Ev065.2.4.Action`
        ]));

        saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // ……おかあさんの、匂い……ぐすっ。
                await Content(`Scripts.Ev065.2.1.Reply`)
                break;
            case 1:
                // [沮喪]
                EmojiAndAdjustLove(16)
                // そう……。
                await Content(`Scripts.Ev065.2.2.Reply`)
                break;
            case 2:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // うっ……うわあああああああん！！
                await Content(`Scripts.Ev065.2.3.Reply`)
                break;
            case 3:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // 手がかり……？  {{my}}、治る{{go03}}？
                await Content(`Scripts.Ev065.2.4.Reply`)
                break;
        }
    } else {
        Face('char06')
        /**
            ボク、恥ずかしいっすよ。
            今まで{{dragonName}} のお母さんのこと、軽蔑してたんっす。
            竜死病を恐れるあまりにわが子を捨てる、そんな親たちの一人だと思ってたっす。
            でも、本当は自分の子供のこと、ちゃんと心配してたんっすね…。
            この思い……無事、{{dragonName}} に届いたっすよ…お母さん……！
         */
        await Content(`Scripts.Ev065.3`)
        Face('char06a')
    }
    SetContentCompleted()
}

export default ev065;