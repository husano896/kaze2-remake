import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** ドラゴンの古代遺跡 */
export const Quest03 = async (component: DialogueComponent) => {
  const { SetContentCompleted, setDragonCG2, setDragonCG2Opticity, ClearContent, Content, Back, Emoji, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('iseki')
  setBGOpticity(1);

  appServ.setAmbient('')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);
  // BGM設定
  appServ.setBGM('music11')

  //#region 先前有成功打過架了
  if (appServ.saveData.DragonChip1 & DragonChipFlag.ゾンドドレイク) {
    appServ.setBGM('music01')
    // TODO: 孤龍從右側滑入
    setDragonCG(appServ.saveData.cgName)
    setDragonCGOpticity(1);
    /** ……ドキドキ。…ゾンドドレイク、いる{{go03}}…？ */
    await Content(`Scripts.Quest03.2.1`)
    /*ゾンドドレイク：…うむ。聞こえておるぞ…。
      孤竜：あれ？　姿が見えない{{go01}}。
      ゾンドドレイク：姿を現す必要もないからな。それに姿ならお前も変身できるんだろう？
      再び訪れてくれて感謝する…。今のところ問題はない。
      いつまでも、この遺跡を守り、人々に過去の忌まわしき歴史を伝えていこうぞ！
      うん…。
    */
    await Content(`Scripts.Quest03.2.2`)
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion

  //#region 一般事件
  appServ.setBGM('music15')
  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  /**
   *……ドキドキ…ビクビク…。なんだか暗くて重々しい空気が流れている{{go01}}…。
    薄暗くて、よく見えないけれど、壁には、ドラゴンのような生き物と…。
    …空飛ぶ大舟のようなモノが争ってる絵が描かれてある{{go01}}。
    きっと、昔話で良く聞く”竜と人の戦争”なんだと思う{{go01}}。
    昔こんな大きな争いがあったのに、どうして今は、お互いが仲良くして……。
    姿なき声：………おぃ…。
   */
  await Content(`Scripts.Quest03.1.1`)
  ClearContent()

  /** 姿なき声：………おぃ…。 */
  await Content(`Scripts.Quest03.1.2`)

  Emoji(6)
  /** 孤竜：びくぅぅっ？！？！ */
  await Content(`Scripts.Quest03.1.3`)

  setDragonCG2('best12')
  setDragonCG2Opticity(1)
  await appServ.Wait(1500)

  Emoji(1)
  /**
   *孤竜:…誰…？？？
    姿なき声：我はこの地を守りし者…。墓荒しの罪人め。
    恐怖をもってその罪を 償うがいい！！
    孤竜：え？　え？
   */
  await Content(`Scripts.Quest03.1.4`)
  router.navigate(['/game/battle'], {
    state: {
      battle: '-iseki',
      onWin: {
        href: '/game/dialogue',
        state: {
          event: 'Quest03a'
        }
      }
    },
    replaceUrl: true
  })
  //#endregion
}