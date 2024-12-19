import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";

const ev062 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char01')
        /**
            {{yourName}}さん、竜の病気についての資料、だんだんまとまってきたっす！
            万能薬は今よりず～っと昔に、『罪深き民』と呼ばれる人々が作り出したんっす。
            その万能薬は絶対に腐ったりなくなったりしないものらしくって、
            見つけさえすれば、いつでも使うことができるらしいっす！
            でも、そんなすごい人々が、どうして『罪深き』なんて書き残されるんだろう…。
            気になるんっすけど、それについて書いてある本はまったく見つからないんっす。
         */
        await Content(`Scripts.Ev062.1` )
        Face('char01a')

    } else {
        await Content(`Scripts.Ev062.2`)
    }
    SetContentCompleted()
}

export default ev062;