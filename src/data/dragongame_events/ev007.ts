import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev007 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music21')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char08');
        /**
        あの実、結局 食べちゃったっすね。 まぁ、過ぎたことはしょうがないっす。
        そうそう、そういえば病竜保護協会から、ついに冒険の許可が下りたっすよ！
        いよいよ外へ出かけられるっすよ♪　下の [冒険する] を選んでみるっす。
        画面に地図が表示されるっすから、冒険してみたい地点をクリックっす。
        そしたら、モジュールがそこへワープさせてくれるっすよ。
        「ポイルトップの街」をクリックすると、またここに戻って来れるっす。
         */
        await Content(`Scripts.Ev007.1`)
        Face('char08a');
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        appServ.saveData.ivent |= EventFlag.回答事件;
        Face('char01');
        /*
        冒険に行ってみたっすか？
        街の周辺の洞窟は、地図にも記されているから簡単に行けるっすけど、
        洞窟の中は毒気が立ちこめてて、歩くたびに体力を消耗していくんっす。
        孤竜の負担が大きいっすから、出発前には必ず、回復薬を買っておくっすよ。
        生命値は減るし、途中、行き倒れると病気にかかることもあるっすからね。
        もし冒険が失敗したら、孤竜をゆっくり休ませて、傷を癒してあげるっすよ。
        */
        await Content(`Scripts.Ev007.2`)
        Face('char01a');
    }
    SetContentCompleted()
}

export default ev007;