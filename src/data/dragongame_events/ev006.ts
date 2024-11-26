import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev006 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, Emoji, hideLayer } = component

    appServ.setBGM('music20')
    if (appServ.waitTimeMinutes >= 60) {
        hideLayer('Ray1');
        Face('char04');
        /**
        そういえば、前に渡したサザムの実、{{dragonName}} の部屋に
        置いておいたのは、少し軽率すぎたかもしれないっす。
        今から思うと、あの実の差出人は おそらく…。
        とにかく、今 {{dragonName}} に未練がましいことをするのは、
        {{dragonName}} 自身を苦しめることっすから…。
        うーん……。 今から、こっそり取りに行ってこようっすかねぇ…。
         */
        await Content(`Scripts.Ev006.1`)
        Face('char04a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        appServ.saveData.ivent |= EventFlag.回答事件;
        Face('char00');
        Emoji(6)
        /*
        きゅう…？ なんだか、なつかしい匂いがする{{go01}}。
        そこの実……それ、{{my}}にくれない？
        [孤竜は通信機の応答を待たずに実を手に取り、ほおばりはじめた]
        んぐ…はもはも………………
        うぇ…グスグス……甘い{{go01}}…。お母さんの匂いが、する{{go01}}……。
        お母さん……。
        */
        await Content(`Scripts.Ev006.2`)
    } else {
        Face('char00');
        Emoji(6);
        // お母さん……。
        await Content(`Scripts.Ev006.3`)
    }
    SetContentCompleted()
}

export default ev006;