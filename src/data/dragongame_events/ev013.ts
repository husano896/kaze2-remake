import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { BioFlag } from "../BioFlag";

const ev013 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        if (appServ.saveData.bio & BioFlag.発作) {

            Face('char04');
            appServ.setBGM('music05')
            /**
            {{yourName}} さん、孤竜の発作は自然に治まって、姿も戻ったみたいっすよ。
            治ってよかったっす♪　ただ、少しやせちゃったみたいっすけど……。
            まだまだ安心はできないっすよ。 近いうちにまた、
            発作が起こるかもしれないっすから…。

            [発作の影響でやせたため、生命 -5 体格 -5 下がってしまった]
             */
            appServ.saveData.Maxhp -= 5;
            appServ.saveData.at -= 5;
            // 避免沒移除發作，這邊也做一次
            appServ.saveData.bio ^= BioFlag.発作
            appServ.saveData.hp = Math.min(appServ.saveData.hp, appServ.saveData.Maxhp);
            
            await Content(`Scripts.Ev013.1`)
            Face('char04a');
        }
        else {
            Face('char08');
            /**
            {{yourName}} さん、やっぱり特効薬を取りに行くって判断は正解だったっすね！
            普通、孤竜は発作の影響で弱るっすが、これだけ元気なら心配もいらないっす。
            でも、まだ安心はできないっす。近いうちに再発するかもしれないっすから。
            {{dragonName}} は元気そうには見えるっすけど…
            発作にもう何度も耐えられるような体じゃないはずなんっす。
            …………。
             */
            await Content(`Scripts.Ev013.2`)
            Face('char08a');
        }
    } else {
    }
    SetContentCompleted()
}

export default ev013;