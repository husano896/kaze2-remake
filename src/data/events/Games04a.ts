import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { RootAnimations } from "@/app/app.service";
import * as _ from "lodash-es";

export const Games04a = async (component: DialogueComponent) => {
  const { SetContentCompleted, ClearContent, AllFadeOut, Content, location, Back, SetSkipCallback, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;
  let skipped = false;
  const { lv, } = location.getState() as { event: string, lv: string, debugMenu: boolean };

  let BossNameID = 0;
  switch (Number(lv)) {
    case 1:
      appServ.saveData.DragonChip1 |= DragonChipFlag.ボルガノドン;
      BossNameID = 10;
      break;
    case 2:
      appServ.saveData.DragonChip1 |= DragonChipFlag.パイロヒドラ;
      BossNameID = 6;
      break;
    case 3:
      appServ.saveData.DragonChip1 |= DragonChipFlag.ギガウインド;
      BossNameID = 16;
      break;
    case 4:
      appServ.saveData.DragonChip1 |= DragonChipFlag.ヘイズロック;
      BossNameID = 11;
      break;
    default:
      throw new Error('未給予lv引數！這不該發生！')
  }

  setBG('hokora')
  setBGOpticity(1);
  /** SKIP: 回到龍窩 */
  const skipCallBack = async () => {
    if (skipped) {
      return;
    }
    skipped = true;
    SetContentCompleted();
    await AllFadeOut();

    Back()
  }

  SetSkipCallback(skipCallBack)
  setDialogOpticity(1);
  await appServ.Anim(RootAnimations.FadeIn, 3000);
  appServ.setBGM('music11')
  /**
…そなたの力、見事であった！
我は、この地に住まう精霊神。 悠久の時のなか、
この祠の扉を叩く者を待ち、力ある者には試練と慈恵を授けし者なり。
そなたは我に打ち勝ち、見事 慈恵を得る資格を得た。
さあ、そこに立つがよい……。"
   */
  await Content(`Scripts.Games04a.1`)
  ClearContent();

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  await appServ.Wait(3000);


  /**
   * 孤竜：ドキドキドキ……
   */
  await Content(`Scripts.Games04a.2`)
  appServ.setSE('snd15')
  SetSkipCallback()

  /**
我が力を そなたに分け与える…。
力ある限り、我はそなたの味方だ…。
[神獣{{bossName}}の力を手に入れた！]"
   */
  await Content(`Scripts.Games04a.3`, { bossName: `Data.DragonType.${BossNameID}.Title` })
  skipCallBack();
}