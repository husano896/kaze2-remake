import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { RootAnimations } from "@/app/app.service";
import { ItemID } from "../ItemID";
import { firstValueFrom } from "rxjs";
/** 研究者的小屋 */
export const Games02 = async (component: DialogueComponent) => {
  const { Back, ClearContent, Content, setDialogOpticity, AllFadeOut, saveData, Face, Anim, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  appServ.setAmbient('')
  appServ.setBGM('music13')
  setBG('kenkyu')
  setDragonCG('nomal00');
  setBGOpticity(1);
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  appServ.setBGM('music21')
  Face('char20')
  setDialogOpticity(1)
  /**
    …？誰だ？
    ……孤竜か…？…なんだ…この子、発作を起こしているじゃないか！
    この通信機に映ってる顔が、里親か…？　ふぅん…地球の民か。
    ここへ何しにきた？　ひょっとすると特効薬でも探しにきたのか？
    残念ながら、あの薬はすぐに傷む上に、入手も難しいんでな。
    君に分けられる分はないんだよ。さぁ、帰った帰った！
   */
  await Content(`Scripts.Games02.1`)
  ClearContent()
  // TODO: 孤龍從右側滑入
  setDragonCGOpticity(1);
  await Anim('dragoncg', RootAnimations.SlideInFromRight, 1000, 'ease-out');
  /**
    孤竜：でも…
   */
  await Content(`Scripts.Games02.2`)
  await appServ.Wait(600)
  /**
    でも…… か。
    この仔、意外としっかりしてるな。それだけ里親が優秀というわけか？
    面白い。それでは一つ、ゲームをしてみるか。もし勝ったら、
    分けてやってもいいぞ。
    小屋の奥に来るといい…。なぁにリバーシだよ。地球でも有名だろ？
  */
  await Content(`Scripts.Games02.3`)

  await AllFadeOut();
  setBG('kenkyu')
  setBGOpticity(1);
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // 下棋區
  ClearContent();

  component.chessGameActive = true;
  component.enableChessGame = true;
  Face('char20')

  setDialogOpticity(1)
  await Content(`Scripts.Games02.4`)
  appServ.setBGM('music24')

  component.chessGameStart = true;
  setDialogOpticity(0)
  if (!component.chessGameComponent) {
    throw new Error('棋盤元件未準備好！')
  }
  const playResult = await firstValueFrom(component.chessGameComponent.onGameCompleted.asObservable())
  component.chessGameStart = false;
  setDialogOpticity(1)
  if (playResult.player > playResult.enemy) {
    appServ.setSE('snd15')
    Face('char21')
    /**
      ぬっ……やるな…。ちぃっ！
      オレの負けだ。しょうがない…約束通りくれてやるよ。
      まぁ、竜死病の研究もちょうど、煮詰まってたところだしな…
      少しぐらいやったところで、進捗に影響はないだろう。
      …意地悪してすまなかったな。ほらよ。
      [{{varItemName}}を少し分けてもらった！！]
     */
    await Content(`Scripts.Games02.5.Win`, { varItemName: appServ.t(`Data.Item.${ItemID.精竜水}.Title`) })
    component.chessGameActive = false;
    await AllFadeOut()
    saveData.item[ItemID.精竜水] = 1;
  } else if (playResult.player === playResult.enemy) {
    /**
      おっ…引き分けか…。まぁまぁだな…
      だが、薬はオレに勝ってからだ。もう一度出直してこい。
      さぁ、 帰れ 帰れ！
     */
    await Content(`Scripts.Games02.5.Draw`)
  } else {
    /**
      フン…弱い…。話にならんな…
      もう一度出直してこい。 こんなのでは気晴らしにもならんわ。
      さぁ、 帰れ 帰れ！
     */
    await Content(`Scripts.Games02.5.Lose`)
  }
  Back()
}