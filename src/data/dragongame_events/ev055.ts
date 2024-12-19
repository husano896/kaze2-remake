import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { BioFlag } from "../BioFlag";
import { ItemID } from "../ItemID";

const ev055 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted } = component
    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        if (saveData.item[ItemID.精竜水]) {

            Face('char02')
            /**
                {{yourName}}さん、やっぱり特効薬を取りに行くって判断は正解だったっすね！
                今のところ、発作による後遺症もなさそうっすし、心配ないっす。
                でも…着実に{{dragonName}} は弱っていってるっす。
                おそらく…次に起こる発作に、もう孤竜は耐えられないはずっす……。
                もう、ボクらに残された時間は限られてきてるっす。
                できる限り急いで、病気を治す方法を見つけるっすよ！
             */
            await Content(`Scripts.Ev055.1`)
            Face('char02a')
        } else {
            Face('char08')
            /**
                {{yourName}}さん、孤竜の発作はどうやら収まったみたいっす。
                だけど、目に見えて弱ってきてるっす。これは確かなんっす。
                …あまり考えたくないっすけど……
                おそらく…次に起こる発作に、もう孤竜は耐えられないはずっす……。
                できる限り急いで、病気を治す方法を見つけるっすよ！
                [発作の影響により 生命 -5 体格 -5 下がってしまった]
             */
            saveData.Maxhp -= 5;
            saveData.df -= 5;
            await Content(`Scripts.Ev055.2`)
            Face('char08a')
        }
    } else {
        // …。
        await Content(`Scripts.Ev055.3`)
    }
    SetContentCompleted()
}

export default ev055;