import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import * as _ from "lodash-es";
import { DragonChipFlag } from "../DragonChipFlag";
import { EventFlag } from "../EventFlag";
import { ItemID } from "../ItemID";
import { firstValueFrom } from "rxjs";

/**
BossName = 15;
bossDat = Quest05
BossCG = best08
DragonChip_ChkBit = 256;
varURL = games05a.html?Lv5
document.write(<DIV ID = 'BG' STYLE='position:absolute;top:8px;left:0px; visibility:hidden;'>);
document.write(<IMG width=100% src='image/bg_dragonhill.jpg' border=0></DIV>);
 */
/** ドラゴンの丘 */
export const Quest05 = async (component: DialogueComponent) => {
  const { AllFadeOut, saveData, setDragonCG2, Emoji, setDragonCG2Opticity, Anim, ClearContent, Content, Back, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('dragonhill')
  setBGOpticity(1);
  appServ.setAmbient('snd18')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);
  // BGM設定
  appServ.setBGM('music11')

  setDragonCG(saveData.cgName)
  Anim('dragoncg', RootAnimations.SlideInFromRight, 1000, 'ease-out')
  setDragonCGOpticity(1)

  if (saveData.DragonChip1 & DragonChipFlag.ママルバーン) {
    //#region 你抓過人家了～再跟人家玩吧～
    /*
      わぁ、また来てくれたんだね♪
      ちょうど、退屈してたところだったんだ。
      ねぇ…。僕と遊ぼうよ。
    */

    setDragonCG2(saveData.cgName)
    setDragonCG('best08')
    setDragonCG2Opticity(1)
    Anim('dragoncg2', RootAnimations.SlideInFromRight, 1000, 'ease-out')
    await Content(`Scripts.Quest05.2.1`)
    //#endregion
  } else {
    //#region 初見
    /**
      …ひぁ。凄い崖っ。
      あ……向こうに鳥の群れを見つけた{{go01}}。 んん～～、何だかダイナミック{{go00}} {{go01}}！
      …！？　今度はあっちから、翼の生えた大きな生き物が……！
     */
    await Content(`Scripts.Quest05.1.1`)

    ClearContent()
    setDragonCG2('best08')
    setDragonCG2Opticity(1)
    await Anim('dragoncg2', RootAnimations.SlideInFromRight, 1000, 'ease-out')
    /** 
      バサッバササッ！！
      孤竜：あっ…こ、こんにちわ…
      ママルバーン：おや…ここは保護区域だよ。ボクら以外の種族は来ちゃダメなんだけどな。
      まぁいいや。 ここでこうやって出会ったのも、何かの縁だよね。
      そこで…ちょっとボクとゲームをしていかないかい？
     */
    await Content(`Scripts.Quest05.1.2`)

    Emoji(4)
    /**
      "ルールはとっても簡単。キミが(●)、ボク(▲)を15回捕まえるだけ。
      ボクは逃げも隠れもしないけれどね。
      その代わり、ボクを捕まえるたびに、キミの後ろにどんどん分身がついていく。
      壁やその分身にぶつかるとキミの負け。ボクを15回つかまえたらボクの負けだよ。
      操作は、キーボードの矢印キーだけだから、シンプルだと思う。　ねぇ…やろうよ。"
     */
    await Content(`Scripts.Quest05.1.3`)
    //#endregion
  }

  component.enableSnakeGame = true;
  component.snakeGameActive = true;
  setDragonCG('')
  setDragonCG2('best08')
  ClearContent()
  /**
    じゃ、さっそく僕を捕まえてごらん。
    連続15回捕まえるか失敗すれば、そこでゲーム終了だからね！
    NEXT▼ボタンを押した後、キーボードの矢印キーで●を操作してね。
    準備はいいかい？じゃ、始めるよ！
   */

  await Content(`Scripts.Quest05.Game.1`)
  Emoji()
  appServ.setBGM('music08')
  component.snakeGameStart = true;
  setDialogOpticity(0)

  if (!component.snackGameComponent) {
    throw new Error('貪吃蛇元件未準備好！')
  }

  const { success } = await firstValueFrom(component.snackGameComponent.onGameCompleted.asObservable())
  component.snakeGameStart = false;
  setDialogOpticity(1)

  if (!success) {
    //#region 輸了QQ
    appServ.setBGM('music09')
    /**
      えっ…もう終わり？
      なんだよ…もう少し楽しませてよ。
      じゃ、また機会があれば、遊びにきてね。待ってるよ♪
     */
    await Content(`Scripts.Quest05.Game.Lose`)
    Back();
    return;
    //#endregion
  }

  appServ.setBGM('music11')
  /** 
    …あれっ？　もう僕が負けちゃったの？
    キミ、なかなかやるなぁ…。
  */
  await Content(`Scripts.Quest05.Game.Win`)
  component.enableSnakeGame = false;

  // 因初見跟二見時的站位可能不同，因此需再度設定CG
  setDragonCG(saveData.cgName)
  setDragonCG2('best08')
  Anim('dragoncg', RootAnimations.SlideInFromRight, 1000, 'ease-out')
  await Anim('dragoncg2', RootAnimations.SlideInFromRight, 1000, 'ease-out')
  ClearContent()

  if (saveData.DragonChip1 & DragonChipFlag.ママルバーン) {
    /**
      ふぅ…今回も楽しかったよ。キミと一緒にいると楽しいなぁ。
      んん、また やることなくなるし、独りになるから少し寂しいけれど…。
      また、いつでも来ていいからね♪
     */
    await Content(`Scripts.Quest05.2.2`)

    // 隨機給予道具
    if (Math.round(Math.random() * 4) == 1) {
      /** 
        そうそう、今日遊んでくれたお礼に…コレあげるよ。
        近くで拾った珍しい石だよ♪　滅多に手に入らないんだ♪
        [なんと {{varItemName}} をもらってしまった！]
       */
      await Content(`Scripts.Quest05.2.3`, {
        varItemName: appServ.t(`Data.Item.${ItemID.幻の秘石}.Title`)
      })
      appServ.saveData.item[ItemID.幻の秘石]++;
    } else {
      /** 
        そうそう、今日遊んでくれたお礼に…コレあげるよ♪
        本当は、珍しい石とかあげたいんだけど、今はちょっとないんだ。
        [なんと {{varItemName}} をもらってしまった！]
       */
      await Content(`Scripts.Quest05.2.4`, {
        varItemName: appServ.t(`Data.Item.${ItemID.光りキノコ}.Title`)
      })
      appServ.saveData.item[ItemID.光りキノコ]++;
    }
  } else {
    /**
      うん、まぁ平和で退屈な時間しのぎにしては、十分楽しめたよ。
      にしても、また やることなくなったなぁ…。どうしよう…。
      ん－……。あっ！そうだ！　今度はキミに憑いていくことにしようか♪
      大丈夫大丈夫♪　迷惑はかけないからね。あ、ちょっと手をかざしてくれる？
     */
    await Content(`Scripts.Quest05.1.4`)
    saveData.DragonChip1 |= DragonChipFlag.ママルバーン;
    /** 
      力ある限り、ボクはキミの味方だよ～♪
      [翼竜{{dragonTypeName}}の力を手に入れた！]
     */
    await Content(`Scripts.Quest05.1.5`, {
      dragonTypeName:
        appServ.t('Data.DragonType.9.Title')
    })
  }
  appServ.setSE('snd15')

  await AllFadeOut();
  Back()
}