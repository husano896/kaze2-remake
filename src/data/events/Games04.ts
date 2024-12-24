import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { RootAnimations } from "@/app/app.service";
import _ from "lodash";
import { ItemID } from "../ItemID";
import { IBattleRouteState } from "@/app/pages/game/battle/battle.service";

export const Games04 = async (component: DialogueComponent) => {
  const { ClearContent, Content, location, router, SetSkipCallback, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;
  let skipped = false;

  const { lv, debugMenu } = location.getState() as { event: string, lv: string, debugMenu: boolean };
  appServ.setAmbient('snd18')
  let bossBattleID = '';
  let DragonChip_ChkBit: DragonChipFlag = 0;
  let ItemID_Chk: ItemID = 0;
  let elementName = ''
  switch (Number(lv)) {
    case 1:
      ItemID_Chk = ItemID.太陽の珠;
      DragonChip_ChkBit = DragonChipFlag.ボルガノドン;
      bossBattleID = '-boss01';
      elementName = '炎';
      break;
    case 2:
      ItemID_Chk = ItemID.銀峰の雫;
      DragonChip_ChkBit = DragonChipFlag.パイロヒドラ;
      bossBattleID = '-boss02';
      elementName = '水';
      break;
    case 3:
      ItemID_Chk = ItemID.風の翼;
      DragonChip_ChkBit = DragonChipFlag.ギガウインド;
      bossBattleID = '-boss03';
      elementName = '風';
      break;
    case 4:
      ItemID_Chk = ItemID.大地の琥珀;
      DragonChip_ChkBit = DragonChipFlag.ヘイズロック;
      bossBattleID = '-boss04';
      elementName = '地';
      break;
    default:
      throw new Error('lv引數無效！這不該發生！')
  }
  setBG('hokora')
  setDragonCG('nomal01');
  setBGOpticity(1);

  /** SKIP: 開始檢定 */
  const skipCallBack = async () => {
    if (skipped) {
      return;
    }
    // TODO: 孤龍從右側滑入
    setDragonCG(appServ.saveData.cgName)
    setDragonCGOpticity(1);
    skipped = true;
    SetSkipCallback()

    // 未持有該屬性的結晶道具
    if (!appServ.saveData.item[ItemID_Chk]) {
      /**
       *証なき、か弱き竜よ…。
        ここから立ち去るがよい。
       */
      await Content(`Scripts.Games04.1.3.Fail`)
      // 扔回家
      router.navigate(['/game/dragongame'], { replaceUrl: true })
      return;
    }

    /**
     * 証を持つ者よ…。
       我のもとへ来るがよい…… そして、己の力を試してみよ。
     */
    await Content(`Scripts.Games04.1.3.Success`)

    const onWinURL = '/game/dialogue'
    const onWinState = { event: 'Games04a', lv, debugMenu }

    if (debugMenu) {
      alert('因在測試模式下，跳過戰鬥。')
      await router.navigate([onWinURL], { replaceUrl: true, onSameUrlNavigation: 'reload', state: onWinState })
      return;

    }
    router.navigate(['/game/battle'], {
      replaceUrl: true, state: {
        battle: bossBattleID, onWin: { href: onWinURL, state: onWinState }
      } as IBattleRouteState
    })

  }

  setDialogOpticity(1);
  await appServ.Anim(RootAnimations.FadeIn, 3000);
  //#region 已經跟BOSS打完架了
  if (appServ.saveData.DragonChip1 & DragonChip_ChkBit) {
    appServ.setBGM('music13')
    // 未持有忌地への道標
    if (!appServ.saveData.item[ItemID.忌地への道標]) {
      /**
       *ここは、{{elementName}}の力を封印する 神獣の祠。
        そなたは既に、力を与えし者…。
        道標なき者が、むやみに訪れるべきではない。
        我の力を必要とした時、再び立ち寄るがよいだろう…。
       */
      await Content(`Scripts.Games04.2.NoItem25`, { elementName })
      // 扔回家
      router.navigate(['/game/dragongame'], { replaceUrl: true })
      return;
    }

    // 未持有水晶ランタン（通關道具）
    if (!appServ.saveData.item[ItemID.水晶ランタン]) {
      /**
       *ここは、{{elementName}}の力を封印する 神獣の祠。
        我に打ち勝ちし者よ…。 そなたの手にする道標…それを何処で…？
        ……なるほど。そなたは「竜をくびきより解き放つ力」を欲する者だな？
        では…道標を携える者に、我と古代人との契りを果たすべく、そなたに鍵を託す。
        我ら竜族には繁栄を…。 星の彼方の訪問者には災いを…。
        [{{itemName}}を手に入れた！！]
       */
      await Content(`Scripts.Games04.2.NoItem33`, { elementName, itemName: 'Data.Item.33.Title' })
      appServ.saveData.item[ItemID.水晶ランタン] = 1;
      // 扔回家
      router.navigate(['/game/dragongame'], { replaceUrl: true })
      return;
    }

    // 已經都有道具了
    /**
     *ここは、{{elementName}}の力を封印する 神獣の祠。
      竜をくびきより解き放つ力を欲する者よ……。
      そなたは既に、力の鍵を我々 神獣より託されている。
      さあ…行くがよい。
      たとえどのような結果であろうとも、現実を受け入れ、
      そして学ぶのだ…。
     */
    await Content(`Scripts.Games04.2.Completed`, { elementName })
  }
  //#endregion

  appServ.setBGM('music25')
  SetSkipCallback(skipCallBack)
  /**
   *ここは、{{elementName}}の力を封印する 神獣の祠。
    {{elementName}}を極めし証を持つ者のみ、立ち入ることの許される場所…。
    お前はその証を持つ者か…？
   */
  await Content(`Scripts.Games04.1.1`, { elementName })
  ClearContent();

  if (skipped) {
    return;
  }
  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  await appServ.Wait(3000);
  await Content(`Scripts.Games04.1.2`)
  if (skipped) {
    return;
  }
  skipCallBack();
}