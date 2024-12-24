import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { ItemID } from "../ItemID";


/** 魔獣の森 */
export const Quest06 = async (component: DialogueComponent) => {
  const { AllFadeOut, saveData, SetContentCompleted, setDragonCG2, setDragonCG2Opticity, ClearContent, Content, Back, Emoji, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('woods')
  setBGOpticity(1);

  appServ.setAmbient('snd17')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);


  //#region 先前有成功救援過了
  if (saveData.DragonChip1 & DragonChipFlag.DragonHeadBuck) {
    /*
      魔獣：また来たのか…。
      いいか？ここは魔獣の森。人との共存を望まぬ竜が住まう地だ。
      民は畏れ、近寄ることすらないこの地に、オマエはなぜ来るのだ？
      孤竜：{{my}}、もちろん、人も好きだけれど…その前に、竜だから…。
      魔獣：ここにいるのを他の者に見られると、オマエまで悪い噂がたつ。
      来てくれるのはありがたいが、早く帰らねばならない…。
    */
    // BGM設定
    appServ.setBGM('music01')

    // TODO: 孤龍從右側滑入
    setDragonCG(appServ.saveData.cgName)
    setDragonCGOpticity(1);

    // TODO: 孤龍從右側滑入
    setDragonCG2('best03')
    setDragonCG2Opticity(1);

    await Content(`Scripts.Quest06.2.1`)
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion

  appServ.setBGM('music25')
  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);

  //#region 未帶狗狗型態龍「ゾンドドレイク」入場
  if (!(saveData.DragonChip2 & DragonChipFlag.ゾンドドレイク)) {
    /*
      んんっ…うす暗くて、邪気にあふれてる{{go01}}。
      クンクン…。それに、よく分からないけれど、何か不穏な臭いもする{{go01}}。
      …クンクン…　うぅん……どこから臭ってくるのかよく分からない{{go01}}。
      もっと、犬のような、鼻のいいドラゴンでないと分からない{{go01}}…。
    */
    await Content(`Scripts.Quest06.1.1`)
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion 

  //#region 一般事件

  /**
    んんっ…うす暗くて、邪気にあふれてる{{go01}}。
    クンクン…。ん？ 何だか、大きな動物の臭いがする{{go01}}。
    …クンクン…………。
    ……。向こうの方からする{{go01}}。
    ちょっと、行ってみる{{go01}}！
  */
  await Content(`Scripts.Quest06.1.2`)

  ClearContent();
  component.skipWait = true;

  /** - 探索中 - */
  await Content(`Scripts.Quest.Discovering`)
  await appServ.Wait(1500)
  component.skipWait = false;

  //#region 運氣不好 沒聞到東西QQ
  if (Math.round(Math.random() * 10) < 1) {
    const varsam = Math.round(Math.random() * 5) + 2;
    /**
      ふぅ…臭いをたどって探してみたけれど、今回は ちょっと分かんなかった{{go01}}。
      でも、この近くにはきっと何かいる{{go01}}。 次来たときには会いたい{{go01}}。
      [HPが - {{varsam}}。友好値が + 1 変化した]
     */
    await Content(`Scripts.Quest06.1.3`, { varsam: String(varsam) })
    appServ.saveData.hp -= varsam;
    appServ.saveData.love++;
    Back();
    return;
  }
  //#endregion 

  setDragonCG2('best03')
  setDragonCG2Opticity(1);
  Emoji(1)
  /*
    大変っ！　そこの茂みに、なにやら大きな動物が横たわっている{{go01}}！
    ケガ…してる{{go01}}？ 息はあるけれど動かない{{go01}}…。
    [どうやら大怪我をしているらしく、多量の回復薬を必要としているらしい]
    …助けてあげたい{{go01}}…。
  */
  await Content(`Scripts.Quest06.1.4`)

  //#region 精靈根攜帶不足
  if (saveData.item[ItemID.精霊根] < 5) {
    /** 
     {{my}}が持ってる{{varItemName}}だけじゃ、少し足りない{{go01}}。
      あぁ…どうしたらいいのかな。
    */
    await Content(`Scripts.Quest06.1.5`, { varItemName: appServ.t('Data.Item.9.Title') })
    Back();
    return;
  }
  //#endregion

  /** 
    {{my}}が持ってる{{varItemName}}だけで、なんとかなりそう…。
    [孤竜は{{varItemName}}を多量に投与した。傷が見る間にふさがってゆく…]
   */
  await Content(`Scripts.Quest06.1.6`, { varItemName: appServ.t('Data.Item.9.Title') })
  await AllFadeOut();
  router.navigate(['/game/dialogue'], {
    state: {
      event: 'Quest06a'
    },
    replaceUrl: true
  })
  //#endregion
}