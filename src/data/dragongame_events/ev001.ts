import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev001 = async (component: DragongameComponent) => {

    const { appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music21')
    Face('char01');
    if (appServ.saveData.turn >= 40) {
        /*
"モジュールが実行されて、画面にパラメータやコマンドが表示されたっすね。
これらは飼育する上での基本になるっすから、また勉強してくださいっす。
まずは餌やりっす。下の[餌をやる]を選んで、餌を孤竜に与えるっすよ♪"
        */
        await Content(`Scripts.Ev001.1`)
    } else if (!(appServ.saveData.ivent & EventFlag.回答事件)) {
        appServ.saveData.ivent |= EventFlag.回答事件;
        /*
"餌やりはどうっすか？
遺跡管理局が支給する餌以外の食事を与えると、どんどんお金(シェル)を
使ってしまうんっす。　普段の餌は、管理局から支給されてるんっすよ。
お金そのものは、{{yourName}} さんが直接 手に入れる必要があるんっす。
下の[資金調達]を選んで、ちょっとしたゲームをすることになるっす。
成績に応じてもらえる金額が決定されるっすから、頑張るっすよ！"
        */
        await Content(`Scripts.Ev001.2`)
    } else {
        /*
"ターンがなくなると、孤竜に指示を送ることができなくなるっす。
この通信機では、行動を起こすたびにターンを消費してゆくんっす。
これは、街が支給してるこの通信機の性能が悪いせいなんっすがね。
今回はこれで終わりっすが、ターンが回復すればまた行動できるっすよ。
ターン数は、そっちの世界で60分以上がたつと、自動的に回復するっす。
覚えておくといいっすよ♪"
        */
        await Content(`Scripts.Ev001.3`);
    }
    Face('char01a')
    SetContentCompleted()
}

export default ev001;