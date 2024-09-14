import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { firstValueFrom, timer } from "rxjs";

// varBaseFaice為說完話後的頭圖
export const Opening = async (component: DialogueComponent) => {
    console.log(this)
    const { setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, Face, Content, ClearContent, router, appServ, dialogStart$ } = component;
    const { toggleRay1, setNotice, Wait } = appServ
    setBG('welcome')
    setDragonCG('nomal01');
    setBGOpticity(1);

    await toggleRay1();

    // 20
    Face('char04');
    await Content(
        `ふぅふぅ… {{dragonName}} 、どこに行ったんっすかねぇ…。
やっと里親希望の信号を受け取ったっすのに。
…確か、今日は外れの草原で昼寝するって言ってたっすよね。
この辺に間違いないはずなんっすが…。
`)
    Face('char04a');
    await firstValueFrom(dialogStart$);

    // 24
    setDragonCGOpticity(1);
    ClearContent();
    await Wait(1500);

    // 30
    
    await Content(
        `孤竜：ニエルサン…？
孤竜：どうした{{go03}}？　まさか「さとおや」っていうのが見つかった{{go03}}？
孤竜：……きゅぅぅ…。
孤竜：{{my}}まだ心の準備ができてない{{go01}}。
`)
await firstValueFrom(dialogStart$);

    // 32
    Face('char09');
    
    await Content(`あっ……。`)
    Face('char09a');
    await firstValueFrom(dialogStart$);

    // 33
    setDragonCGOpticity(0);
    await Content(`[{{dragonName}}は 突然の知らせに戸惑い 驚いて街の方へ逃げていった]`);
    await firstValueFrom(dialogStart$);

    //34
    
    Face('char04');
    await Content(`ちょ…。まさか逃げるとは思ってなかったっす。
いきなり初対面で印象悪いっすねぇ…もうっ。
ま、まぁ…そのうち慣れてくると期待するっすか。`);
    Face('char04a');
    await firstValueFrom(dialogStart$);

    // 36
    
    Face('char01');
    await Content(`さて…と……。
そういえば、まだボクの事説明してなかったっすね。ボクはニエルっていうっす。
病竜保護協会に仕え、あの街で毎日竜の世話をしてる者っすよ。
さっきの子が、これから育成することになる竜なんっすが…。
先に、竜舎のほうから紹介しておこうっすかね。
こちらっす！`);
    Face('char01a');
    await firstValueFrom(dialogStart$);

    // 38
    setBGOpticity(0);
    await Wait(1500);
    setBG('home');
    setBGOpticity(1);
    await Wait(1500);
    appServ.setBGM ('music21');

    // 44
    
    Face('char01a');
    await Content(`ちょっと小汚いっすかね？　今日から、ここであの子の面倒を見るっすよ。
訪ねては お話したり、餌をあげたり……出来ることは限られるっすが
なんせ人手不足で困ってる街っす。一生懸命飼育に励んでもらいたいっすね♪
あ！ 無論 {{yourName}}さんも、地球の生活があるっすから キミが来れない時は
ボクが 最低限の餌や飼育をしておくっすから 時間があるときにきてくださいっすね。
孤竜が育つと、試合や冒険にもいけるっすから 先ずは それを目標に頑張ろうっす。`);
    Face('char01');
    await firstValueFrom(dialogStart$);

    // 47
    
    await Content(`孤竜：きゅうぅぅ～…。`);
    await firstValueFrom(dialogStart$);

    // 49
    
    Face('char04');
    await Content(
        `あ…{{dragonName}} 全く どこに行ってたっすか？
改めて紹介するっすよ。 この通信機に映っているのが{{yourName}} さんっす。
……きゅぅぅ…（おどおど）
ふぅ…普段はもう少し ワンパクなんっすが。　まぁ、これも何かの機会っす。
まずは 餌でもあげて お互いを知り合ったほうがいいかも知れないっすね。
今から{{yourName}} さんに育成モジュールを送るっすね。   
`);
    Face('char04a');
    await firstValueFrom(dialogStart$);

    // 52
    Face('char01');
    appServ.setSE ('snd07');
    setNotice('システムの更新', 'モジュールを組み込みます');
    await Wait(3900);
    // 65
    setNotice('システムの更新', 'モジュールを組み込みます\r\nモジュールが実行されました');
    await Wait(3000)
    // 75
    router.navigate(['/game/dragongame']);
    setNotice('', '');
}