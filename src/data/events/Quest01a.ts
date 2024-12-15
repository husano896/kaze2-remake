import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import * as _ from "lodash-es";
import { DragonChipFlag } from "../DragonChipFlag";

/** ト ピ リ ア の 森 After */
export const Quest01a = async (component: DialogueComponent) => {
  const { setDragonCG2, ClearContent, Content, Back, AllFadeOut, setDialogOpticity, saveData, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, setDragonCG2Opticity } = component;

  setBG('forest')
  setBGOpticity(1);
  appServ.setAmbient('snd17')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);

  // BGM設定
  appServ.setBGM('music11')

  //#region 一般事件
  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.PS_RyuCG())
  setDragonCG2('best06')
  setDragonCGOpticity(1);
  setDragonCG2Opticity(1);
  /**
   *ふぅ……一時はどうなるかと思った{{go01}}。
    うっかり精霊の領域に踏み込まないようにしないといけない{{go01}}。
    …ちょっと勉強になった{{go01}}。
   */
  await Content(`Scripts.Quest01.1.3.1`)

  ClearContent();
  /**
   *トピリア：オマエ イガイト ツヨイナ……
    チカラ アルモノニ キョウリョク スルノガ ボクラ セイレイノ ツトメ。
    コンカイハ ブレイモ イイトコロダガ、ソノツヨサニ メンジテ
    ボクラノ チカラヲ キミニ アタエルコトニ スルヨ。
    …クヤシイケレドネ！  サァ、テヲ カザシテゴラン…
   */
  await Content(`Scripts.Quest01.1.3.2`)

  saveData.DragonChip1 |= DragonChipFlag.トピリア;
  component.skipWait = true;
  appServ.setSE('snd15')
  /**
   * 
   *
   * チカラアルカギリ ボクハ キミノ ミカタダ……。
   * [精霊{{dragonTypeName}}の力を手に入れた！]
   *
   *
   */
  await Content(`Scripts.Quest01.1.3.3`, {dragonTypeName: appServ.t('Data.DragonType.7.Title')})
  await appServ.Wait(3000)
  
  await AllFadeOut();

  Back()
}