import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** ト ピ リ ア の 森 After */
export const Quest01a = async (component: DialogueComponent) => {
  const { setDragonCG2, ClearContent, Content, Back, AllFadeOut, setDialogOpticity, Anim, saveData, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, setDragonCG2Opticity } = component;

  setBG('forest')
  setBGOpticity(1);
  appServ.setAmbient('snd17')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);

  // BGM設定
  appServ.setBGM('music11')

  //#region 一般事件
  // TODO: 孤龍從右側滑入
  setDragonCG2(appServ.saveData.cgName)
  setDragonCG('best06')

  setDragonCG2Opticity(1);
  Anim('dragoncg2', RootAnimations.SlideInFromRight, 1000, 'ease-out');

  /**
   *ふぅ……一時はどうなるかと思った{{go01}}。
    うっかり精霊の領域に踏み込まないようにしないといけない{{go01}}。
    …ちょっと勉強になった{{go01}}。
   */
  await Content(`Scripts.Quest01.1.3.1`)

  ClearContent();
  setDragonCGOpticity(1);
  await Anim('dragoncg', RootAnimations.SlideInFromRight, 500, 'ease-out');
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
  await Content(`Scripts.Quest01.1.3.3`, { dragonTypeName: appServ.t('Data.DragonType.7.Title') })
  await appServ.Wait(3000)

  await AllFadeOut();

  Back()
}