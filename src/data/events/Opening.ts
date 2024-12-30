import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { EventFlag } from "../EventFlag";

// varBaseFaice為說完話後的頭圖
export const Opening = async (component: DialogueComponent) => {
    const { saveData, Back, setBG, Anim, setDragonCG, setBGOpticity, setDialogOpticity, setDragonCGOpticity, Face, Content, ClearContent, appServ } = component;
    const { toggleRay1, setNotice, Wait } = appServ

    const skip = () => {
        Back()
    }
    
    setBG('welcome')
    setDragonCG('nomal01');
    setBGOpticity(1);
    appServ.setBGM('music01')
    appServ.setAmbient('snd16')
    await toggleRay1();

    // 20
    setDialogOpticity(1)

    if (saveData.ivent & EventFlag.周目通關) {

        Face('char01');
        /**
            ふぅふぅ。遅れて申し訳ないっす。{{yourName}}さん。
            旅先から戻ってきたばかりで、まだ落ち着いていないんっすよ。ん……？　どうかしたっす？
            ボクの顔にでも何か付いてるっすか？　まぁ…まぁいいっす。
            さて、先ほど書いて貰った登録書より、条件に一致するような子を探してきたんっすが
            ちょっと 今 機嫌よくないみたいんっす…。　上手く馴染んでくれればいいんっすがね。
            …{{dragonName}}…。さぁ！ こっちに来るっす。
         */
        await Content(`Scripts.Opening2.1`)
        Face('char01a');
        ClearContent();

        await Anim('dragoncg', RootAnimations.FadeIn, 1500);
        setDragonCGOpticity(1)

        /** 孤竜：…。きゅぅ… */
        await Content(`Scripts.Opening2.2`)

        Face('char09');
        /** あっ……。 */
        Content(`Scripts.Opening2.3`)

        await Anim('dragoncg', RootAnimations.FadeOut, 1500);
        setDragonCGOpticity(0)

        Face('char09a');

        /** [{DragonName}}は 突然の訪問者に戸惑い 驚いて竜舎の中へ逃げていった] */
        await Content(`Scripts.Opening2.4`);

        Face('char04')
        /**
            ちょ…。ちょっと第一印象悪かったっすね。あは あはあは…
            ま…まぁ、そのうち慣れてくると思うっすよ。 さ…先に竜舎を紹介するっすね
            こちらっすよ。
         */
        await Content(`Scripts.Opening2.5`)
        Face('char04a')

    } else {
        Face('char04');
        /**
            ふぅふぅ… {{dragonName}} 、どこに行ったんっすかねぇ…。
            やっと里親希望の信号を受け取ったっすのに。
            …確か、今日は外れの草原で昼寝するって言ってたっすよね。
            この辺に間違いないはずなんっすが…。
         */
        await Content(`Scripts.Opening1.1`)
        Face('char04a');


        // 24
        ClearContent();

        await Anim('dragoncg', RootAnimations.FadeIn, 1500);
        setDragonCGOpticity(1)

        // 30
        /**
            孤竜：ニエルサン…？
            孤竜：どうした{{go03}}？　まさか「さとおや」っていうのが見つかった{{go03}}？
            孤竜：……きゅぅぅ…。
            孤竜：{{my}}まだ心の準備ができてない{{go01}}。
         */
        await Content(`Scripts.Opening1.2`)


        // 32
        Face('char09');

        /** あっ……。 */
        Content(`Scripts.Opening1.3`)
        await Anim('dragoncg', RootAnimations.FadeOut, 1500);
        setDragonCGOpticity(0);

        Face('char09a');


        // 33
        /** [{{dragonName}}は 突然の知らせに戸惑い 驚いて街の方へ逃げていった] */
        await Content(`Scripts.Opening1.4`);


        //34
        Face('char04');
        /**
            ちょ…。まさか逃げるとは思ってなかったっす。
            いきなり初対面で印象悪いっすねぇ…もうっ。
            ま、まぁ…そのうち慣れてくると期待するっすか。
         */
        await Content(`Scripts.Opening1.5`);
        Face('char04a');


        // 36
        Face('char01');
        /**
            さて…と……。
            そういえば、まだボクの事説明してなかったっすね。ボクはニエルっていうっす。
            病竜保護協会に仕え、あの街で毎日竜の世話をしてる者っすよ。
            さっきの子が、これから育成することになる竜なんっすが…。
            先に、竜舎のほうから紹介しておこうっすかね。
            こちらっす！
         */
        await Content(`Scripts.Opening1.6`);
        Face('char01a');

    }


    // 38
    setBGOpticity(0);
    setBG('home');
    await Wait(1500);
    setBGOpticity(1);
    await Wait(1500);
    appServ.setBGM('music21');

    // 44
    Face('char01a');
    /**
        ちょっと小汚いっすかね？　今日から、ここであの子の面倒を見るっすよ。
        訪ねては お話したり、餌をあげたり……出来ることは限られるっすが
        なんせ人手不足で困ってる街っす。一生懸命飼育に励んでもらいたいっすね♪
        あ！ 無論 {{yourName}}さんも、地球の生活があるっすから キミが来れない時は
        ボクが 最低限の餌や飼育をしておくっすから 時間があるときにきてくださいっすね。
        孤竜が育つと、試合や冒険にもいけるっすから 先ずは それを目標に頑張ろうっす。
     */
    await Content(`Scripts.Opening1.7`);
    Face('char01');


    // 47
    await Anim('dragoncg', RootAnimations.FadeIn, 1500);
    setDragonCGOpticity(1)

    /**
        孤竜：きゅうぅぅ～…。
     */
    await Content(`Scripts.Opening1.8`);


    // 49

    Face('char04');
    /**
        "あ…{{dragonName}} 全く どこに行ってたっすか？
        改めて紹介するっすよ。 この通信機に映っているのが{{yourName}} さんっす。
        ……きゅぅぅ…（おどおど）
        ふぅ…普段はもう少し ワンパクなんっすが。　まぁ、これも何かの機会っす。
        まずは 餌でもあげて お互いを知り合ったほうがいいかも知れないっすね。
        今から{{yourName}} さんに育成モジュールを送るっすね。"
     */
    await Content(`Scripts.Opening1.9`);
    Face('char04a');


    // 52
    Face('char01');
    appServ.setSE('snd07');
    setNotice('Scripts.Notice.SystemUpdate.Title', 'Scripts.Notice.SystemUpdate.01');
    await Wait(3900);
    // 65
    setNotice('Scripts.Notice.SystemUpdate.Title', 'Scripts.Notice.SystemUpdate.02');
    await Wait(3000)
    // 75
    skip();
    setNotice();
}