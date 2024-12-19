import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";

const ev058 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options, Emoji } = component

    appServ.setBGM('music13')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            ねぇ、{{you}}って、こことは違う世界にいるんだよね。
            {{you}}の住んでる世界って、どんなところ～？
            {{my}}たちみたいな竜とか、他の動物がいっぱいいる{{go03}}？
            食べ物とか、街の風景とか、森とか山とか、きっとこの世界とは
            全然違った、想像できないような世界なんだろうな。
            でも、{{my}}も、{{you}}の世界に、一度でいいから行ってみたい{{go01}}！
         */
        await Content(`Scripts.Ev058.1`)
    } 
    SetContentCompleted()
}

export default ev058;