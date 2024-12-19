import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";

const ev064 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char08')
        /**
            {{yourName}}さん！  朗報っす！
            実は、入手した資料のなかに『万能薬』について書かれた部分があったんっす。
            『万能薬を作るには、二つの素材が必要』ということらしいっすが……
            詳しいことは、もう少し調べてからお教えするっすよ！
         */
        await Content(`Scripts.Ev064.1` )
        Face('char08a')

    } else {
        /** …。 */
        await Content(`Scripts.Ev064.2`)
    }
    SetContentCompleted()
}

export default ev064;