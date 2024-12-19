import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { EventFlag } from "../EventFlag";

/**
 *                     bossDat = "QuestA";
                    bossNm = "-sabaku";
                    BossCG = "best20";
                    DragonChip_ChkBit = 4;
                    varURL = "games05a.html?lvA";
                    document.write("<DIV ID = 'BG' STYLE='position:absolute;top:8px;left:0px; visibility:hidden;'>");
                    document.write("<IMG width=100% src='image/bg_sabaku.jpg' border=0></DIV>");
 */
/** ウリア大砂漠地帯 */
export const Quest10 = async (component: DialogueComponent) => {
  const { AllFadeOut, Back, Emoji, ClearContent, saveData, Content, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('sabaku')
  setBGOpticity(1);

  appServ.setAmbient('snd18')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.PS_RyuCG())
  setDragonCGOpticity(1);
  setDialogOpticity(1);

  //#region 已經打完你爸
  if (saveData.ivent & EventFlag.ウリア大砂漠地帯イベント) {
    //#region 為何你還要來這裡呢...
    if (saveData.DragonChip1 & DragonChipFlag.べトリブニス) {
      appServ.setBGM('music34')
      const varsam = Math.round(Math.random() * 5) + 2;
      /**
         ……何だかココへ来るのが辛い{{go01}}。
        {{my}}、あの洞窟もこの風景ももう見たくない{{go01}}…。
        …そろそろ帰りたい{{go01}}…
        [HPが - {{varsam}}。友好値が - 1 変化した]
       */
      await Content(`Scripts.Quest10.3`, { varsam: String(varsam) })
      saveData.hp -= varsam;
      saveData.love--;
      Back();
      return;
    }
    //#endregion

    //#region 鼓起勇氣，再見一次
    /**
      ……おとうさん…。
      {{my}}…嫌われちゃったみたいだけど…。
      でも、もう一度会いたい{{go01}}…
      ……。　　　　　　
      …ちょっと行ってもいい{{go03}}？
     */
    appServ.setBGM('music35')
    await Content('Scripts.Quest10.2.1')
    //#endregion
  } else {
    appServ.setBGM('music34')
    await Content(`Scripts.Quest10.1.1`)
  }
  //#endregion

  //#region 探索中
  ClearContent();
  component.skipWait = true;
  /** - 探索中 - */
  await Content(`Scripts.Quest.Discovering`)
  await appServ.Wait(1500)
  component.skipWait = false;
  //#endregion

  //#region 運氣不好
  if (Math.round(Math.random() * 50) < 25) {
    const varsam = Math.round(Math.random() * 15) + 5;
    if (saveData.ivent & EventFlag.ウリア大砂漠地帯イベント) {
      //#region 先前已打過老爸
      /**
        ……砂嵐のせいで道が分からなくなった{{go01}}。
        なんとなく、{{my}}のこの思い伝えたい{{go01}}…。
        …今日は一旦出直したい{{go01}}…
        [HPが - {{varsam}}。友好値が + 1 変化した]
       */
      await Content(`Scripts.Quest10.2.2`, { varsam: String(varsam) })
      //#endregion
    }
    else {
      //#region 先前未打過老爸
      /**
       ……遠くまで行ったけど、今回は分からなかった{{go01}}。
      気のせいならいい{{go01}}。気のせいなら…
      ふぅ…そろそろ帰りたい{{go01}}…
      [HPが - {{varsam}}。友好値が + 1 変化した]
       */
      await Content(`Scripts.Quest10.1.2`, { varsam: String(varsam) })
      //#endregion
    }
    saveData.hp -= varsam;
    saveData.love++;
    Back();
    return;
  }
  //#endregion

  //#region 一般事件
  setBG('sabaku2')

  if (saveData.ivent & EventFlag.ウリア大砂漠地帯イベント) {
    //#region 先前已打過老爸
    appServ.setBGM('music00')
    /**
      あった{{go01}}……。
      …おとうさん…{{my}}やっぱりココが忘れられない{{go01}}…。
      ニエルさんや{{you}}も大好きだけれど…それでも…
      {{my}}やっぱり、おとうさんと一緒に暮らしたい{{go01}}…。
      ………　　　おとうさん…？　　　　…
     */
    await Content('Scripts.Quest10.2.3')

    ClearContent()

    appServ.setRadialEffect('#1A237E', true, 10000)
    appServ.setBGM('music20')
    Emoji(6)
    /**
      おと…う…さ…。 
      …………　　あ…あぁ……嘘…。
      [そこにいる巨竜は目を閉じたまま動くことは無かった…]
      […巨竜の手には契約印が譲渡可能な形で施されている]
      [弧竜は静かにそれを受け取った…]
     */
    await Content('Scripts.Quest10.2.4')
    saveData.DragonChip1 |= DragonChipFlag.べトリブニス;
    await AllFadeOut()
    await appServ.Wait(1500)
    setDialogOpticity(1)

    appServ.setRadialEffect('#000000', true, 10000)
    /** ………………………グスッ…うあ…あぁ…あぁ…。 */
    await Content(`Scripts.Quest10.2.5`)
    await appServ.Anim(RootAnimations.FadeOut, 3000)
    Back();
    appServ.Anim(RootAnimations.FadeIn, 500);

    appServ.setRadialEffect()
    return;
    //#endregion
  }
  //#region 先前未打過老爸
  Emoji(6)
  appServ.setBGM('music20')
  /**
    見つかった{{go01}}……。
    ……やっぱりそう{{go00}} {{go01}}…。
    ここに…あった{{go01}}…{{my}}の家…。
    おかあさん…おとうさん……帰ってきた{{go01}}。
    ねぇ…！　どこにいる{{go01}}…？
    あぁ……。
   */
  await Content('Scripts.Quest10.1.3')

  /**
    声:…………。
    仔竜:…そこに誰かいる{{go03}}？　おかあさん？
    声:…来てはならぬ……ここには決して！
    仔竜:？！！　その声は……まさか、おとう……
    声: しらん!!　今すぐ戻るがいい!!!
   */
  await Content(`Scripts.Quest10.1.4`)

  router.navigate(['/game/battle'], {
    state: {
      battle: '-sabaku',
      onWin: {
        href: '/game/dialogue',
        state: {
          event: 'Quest10a'
        }
      }
    },
    replaceUrl: true
  })
  //#endregion
}