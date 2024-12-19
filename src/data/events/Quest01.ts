import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { EventFlag } from "../EventFlag";

/** ト ピ リ ア の 森 */
export const Quest01 = async (component: DialogueComponent) => {
  const { SetContentCompleted, ClearContent, Content, Back, Emoji, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('forest')
  setBGOpticity(1);

  appServ.setAmbient('snd17')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);
  //#region 猫イベントの脅威
  if ((appServ.saveData.numVisits == 46) && (appServ.saveData.ivent & EventFlag.貓事件) && !(appServ.saveData.ivent & EventFlag.貓咪飼料草)) {
    appServ.setBGM('music18')
    // TODO: 孤龍從右側滑入
    setDragonCG(appServ.saveData.PS_RyuCG())
    setDragonCGOpticity(1);

    /**
     * ふぅ、ふぅ……。この森のどこかに薬草があるはず{{go00}} {{go01}}。
      きゅぅ…どこ…？　どこに生えてる{{go04}}？ あぁ……。
      急がないといけないのに…。
      あっちの茂みに行ってみる{{go01}}。
     */
    await Content(`Scripts.Quest01.3.1`)
    ClearContent();

    /** - 探索中 - */
    await Content(`Scripts.Quest.Discovering`)
    Emoji(5)
    /**
     *見つけたっ！　でも、どれがその草なんだろう…。
      あっ。たぶん、この草のような気がする{{go01}}。
      うん…これをもってすぐに帰る{{go01}}！
     */
    await Content(`Scripts.Quest01.3.2`)
    appServ.saveData.ivent |= EventFlag.貓咪飼料草;
    Back();
    return
  }
  //#endregion

  // BGM設定
  appServ.setBGM('music11')

  //#region 先前有成功打過架了
  if (appServ.saveData.DragonChip1 & DragonChipFlag.トピリア) {

    // TODO: 孤龍從右側滑入
    setDragonCG(appServ.saveData.PS_RyuCG())
    setDragonCGOpticity(1);
    const varsam = Math.round(Math.random() * 5) + 2;
    await Content(`Scripts.Quest01.2`, {varsam: String(varsam)})
    appServ.saveData.hp -= varsam;
    appServ.saveData.love++;
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion

  //#region 一般事件
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
  if (Math.round(Math.random() * 10) < 8) {
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