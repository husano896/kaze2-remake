import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** 魔獣の森 After */
export const Quest06a = async (component: DialogueComponent) => {
  const { setDragonCG2, Content, Back, AllFadeOut, setDialogOpticity, saveData, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, setDragonCG2Opticity } = component;

  setBG('woods')
  setBGOpticity(1);
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);
  // BGM設定
  appServ.setBGM('music11')

  //#region 一般事件
  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  // TODO: 孤龍從右側滑入
  setDragonCG2('best03')
  setDragonCG2Opticity(1);
  /**
    魔獣：うっ……痛みが…ない？？
    オマエか？　オマエがオレの傷を癒してくれたのか？
    孤竜：う…うん。
    魔獣：ふっ。もはや観念し、ここで朽ち果てるはずだったんだが…
    こんなモノに助けられるとは…。
   */
  await Content(`Scripts.Quest06.1.7`)

  /**
    よかろう。オレも助けられた身。
    本来ならあり得んことだが、オマエに礼として、力を授けるとしよう。
    その厚意、感謝するぞ。
   */
  await Content(`Scripts.Quest06.1.8`)

  /**
    力ある限り、オレはオマエの味方だ…。
    [魔獣{{dragonTypeName}}の力を手に入れた！]
  */
  await Content(`Scripts.Quest06.1.9`,
    { dragonTypeName: appServ.t('Data.DragonType.4.Title') })
  saveData.DragonChip1 |= DragonChipFlag.DragonHeadBuck;

  appServ.setSE('snd15')
  await AllFadeOut();
  Back()
}