import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev003 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Options, EmojiAndAdjustLove } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {

        Face('char08');
        /**
         * 病竜保護協会から試合出場権が与えられたっすよ！
        この街では、孤竜のためのスポーツとして、試合が行われてるんっす。
        街の外れが試合会場になってて、多くの竜が、そこで毎日勝負してるっす。
        いきなり出場するのは無謀っすが… 能力と自信がついたら出場してみるっすよ。
        戦いに勝てば、景品として属性強化アイテムがもらえるし、戦値も上がるっす。
        参加するだけでも、時々、必殺技なんかを覚えちゃったりもするんっすよ♪
         */
        await Content(`Scripts.Ev003.1`)
        Face('char08a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        Face('char00');
        Content(`Scripts.Ev003.2.Content`)
        const result = (await Options([
            // キミと友だちになりたい。
            `Scripts.Ev003.2.1.Action`,
            // ただの気晴らし。
            `Scripts.Ev003.2.2.Action`,
            // 理由なんてない。
            `Scripts.Ev003.2.3.Action`,
            // かわいそうだから。
            `Scripts.Ev003.2.4.Action`
        ]));
        appServ.saveData.ivent |= EventFlag.回答事件;
        switch (result.index) {
            case 0:
                // [開心] + 表情
                EmojiAndAdjustLove(4)
                // …きゅきゅぅ♪
                await Content(`Scripts.Ev003.2.1.Reply`)
                break;
            case 1:
                // [生氣] + 表情
                EmojiAndAdjustLove(2)
                // ………。
                await Content(`Scripts.Ev003.2.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // おろおろ…
                await Content(`Scripts.Ev003.2.3.Reply`)
                break;
            case 3:
                // [沮喪] + 表情
                EmojiAndAdjustLove(6)
                // ………。
                await Content(`Scripts.Ev003.2.4.Reply`)
                break;
        }
    } else {
        Face('char08');
        /*
        っと！　言い忘れたっすが、試合に負けると、時々破傷風や衰弱症などの
        病気にかかることがあるんっす。たいていの病気は、店で売っているアイテムで
        治せるはずっす。 例えば、「破傷風」にかかったら「抗生薬」を与えるっすよ。
        たまに、複数のアイテムを使わないと治せない病気もあるみたいっすから、
        病気ごとに、最善の治療方法を探し出すことっす。
        「図書館」に行けば大まかな治療法が分かるから、参考にするっすよ♪
        */
        await Content(`Scripts.Ev003.3`);
        Face('char08a');
    }
    SetContentCompleted()
}

export default ev003;