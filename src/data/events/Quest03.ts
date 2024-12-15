import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import * as _ from "lodash-es";
import { DragonChipFlag } from "../DragonChipFlag";
import { EventFlag } from "../EventFlag";

/** ドラゴンの古代遺跡 */
export const Quest03 = async (component: DialogueComponent) => {
  const { SetContentCompleted, ClearContent, Content, Back, Emoji, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

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
    setDragonCG(appServ.saveData.PS_RyuCG())
    setDragonCGOpticity(1);
    await Content(`……ドキドキ。…ゾンドドレイク、いる{{go03}}…？`)
    await Content(`ゾンドドレイク：…うむ。聞こえておるぞ…。
孤竜：あれ？　姿が見えない{{go01}}。
ゾンドドレイク：姿を現す必要もないからな。それに姿ならお前も変身できるんだろう？
再び訪れてくれて感謝する…。今のところ問題はない。
いつまでも、この遺跡を守り、人々に過去の忌まわしき歴史を伝えていこうぞ！
うん…。
`)
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion

  //#region 一般事件
  appServ.setBGM('music15')
  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.PS_RyuCG())
  setDragonCGOpticity(1);
  /**
   *……なんだか新鮮な空気…。すごく心地いい{{go01}}。
    木漏れ日が気持ちいい{{go01}}。 耳を澄ますと、森の中のいろんな音が響く{{go01}}。
    …この森には「トピリア」っていう精霊がいるって、竜舎で聞いたことがある{{go01}}。
    少し探してみる{{go01}}！
   */
  await Content(`Scripts.Quest01.1.1`)

  ClearContent();
  component.skipWait = true;

  /** - 探索中 - */
  await Content(`Scripts.Quest.Discovering`)
  await appServ.Wait(1500)
  component.skipWait = false;

  //#region 運氣不好沒被精靈獸襲擊（？？？）
  // 2 / 11 的機率
  if (Math.round(Math.random() * 10) < 9) {
    const varsam = Math.round(Math.random() * 5) + 2;
    /**
     *ふぅ……あちこち行ったけれど、今回は見つけられなかった{{go01}}。
      けれど、気配はいつもしてるから、いつか出会えるような気がする{{go01}}。
      少し疲れたけれど、でも とても楽しかった{{go01}}！
      [HPが - ${varsam}。 友好値が + 1 変化した]
     */
    await Content(`Scripts.Quest01.1.2.1`, { varsam: String(varsam) })
    appServ.saveData.hp -= varsam;
    appServ.saveData.love++;
    Back();
    return;
  }
  //#endregion

  //#region 被襲擊了！
  Emoji(1)
  /**
   *いたっ！　いた{{go01}}！
    なんだか縄張りに入っちゃったみたいで、今追っかけられてる{{go01}}。
    た…助けて～！
   */
  await Content(`Scripts.Quest01.1.2.2`)
  router.navigate(['/game/battle'], {
    state: {
      battle: '-Forest',
      onWin: {
        href: '/game/dialogue',
        state: {
          event: 'Quest01a'
        }
      }
    },
    replaceUrl: true
  })
  //#endregion
  //#endregion
}