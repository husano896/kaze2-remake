import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";

const ev059 = async (component: DragongameComponent) => {

    const { saveData, appServ, Face, Content, SetContentCompleted, EmojiAndAdjustLove, Options } = component

    appServ.setBGM('music01')
    if (appServ.waitTimeMinutes >= 60) {
        Face('char00');
        /**
            昨日、みんなと一緒に、ちょっと遠くの砂浜に行った{{go01}}。
            海の水、とっても青くてきれい{{go01}}！
            {{you}} にも見せてあげようと思って、すくってみたんだけど、
            手の中にいれると、透明になっちゃう{{go01}}。
            どうして、海の水は青くなったり、透明になったりする{{go04}}？
         */
        Content(`Scripts.Ev059.1.Content`)
        const result = (await Options([
            // 光の波長とスペクトルが…。
            `Scripts.Ev059.1.1.Action`,
            // ごめん、よく分からない。
            `Scripts.Ev059.1.2.Action`,
            // 触ると青色が驚いて逃げる。
            `Scripts.Ev059.1.3.Action`,
            // 空の青が反射してるから。
            `Scripts.Ev059.1.4.Action`
        ]));
        switch (result.index) {
            case 0:
                // [答非所問] + 表情
                EmojiAndAdjustLove(1)
                // はちょうちょ？　すぺくる？　わかんない{{go01}}…。
                await Content(`Scripts.Ev059.1.1.Reply`)
                break;
            case 1:
                // [高興]
                EmojiAndAdjustLove(14)
                // むう、謎はふかまるばかり{{go00}}{{go01}}。
                await Content(`Scripts.Ev059.1.2.Reply`)
                break;
            case 2:
                // [理解不能]
                EmojiAndAdjustLove(13)
                // じゃあ、今度はそーっと触る{{go01}}！
                await Content(`Scripts.Ev059.1.3.Reply`)
                break;
            case 3:
                // [理解不能] + 表情
                EmojiAndAdjustLove(3)
                // それじゃあ、何で空は青い{{go04}}？
                await Content(`Scripts.Ev059.1.4.Reply`)
                break;
        }
    } else if (!(saveData.ivent & EventFlag.回答事件)) {
        saveData.ivent |= EventFlag.回答事件;
        Face('char01');
        /** 
            海の青い色は、ボクも昔追いかけたことがあるっす。
            虹も、夕焼けも、ボクたちには絶対手の届かない、きれいなもの…。
            気がつくと、ボクたちはいろんなきれいなものに囲まれてるんっすね……。
        */
        await Content(`Scripts.Ev059.2`)
        Face('char01a')
    }
    else {
        Face('char08');
        /** 
            {{yourName}}さんと{{dragonName}} を見てると、
            なんだか、本当の親子みたいに思えてくるっす。
            {{dragonName}}  、ちょっと前まではあんなにいろいろ悩んでたのに、
            今ではすっかり落ち着いてるっすよ。
            こんなに幸せそうな姿を見てると、ボクまで幸せな気分になるっす！
        */
        await Content(`Scripts.Ev059.3`)
        Face('char08a')
    }
    SetContentCompleted()
}

export default ev059;