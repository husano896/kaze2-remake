import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev021 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char02');
        /**
"この死病、つい最近になって、世界中の竜に拡がっていったんっす。
本当に、あっという間のことだったっすよ……。
いったい何が原因で、どうやって感染するのかを、いろんな人々が
研究をしてるっすけど、今のところまったく分かっていないっす…。
だから、今 健康な竜も、その感染の恐怖におびえながら暮らしてるんっす…。
何とかならないもんっすかね……。"
         */
        await Content(`Scripts.Ev021.1`)
        Face('char02a');
    } else {
        Face('char00')
        await Content(`Scripts.Ev021.2`)
    }
    SetContentCompleted()
}

export default ev021;