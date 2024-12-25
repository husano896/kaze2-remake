import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** 古城 After */
export const Quest07a = async (component: DialogueComponent) => {
  const { setDragonCG2, ClearContent, Content, Back, AllFadeOut, setDialogOpticity, Anim, saveData, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, setDragonCG2Opticity } = component;

  setBG('kojyou')
  setBGOpticity(1);
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);

  // BGM設定
  appServ.setBGM('music11')

  setDragonCG2(appServ.saveData.cgName)
  setDragonCG('best01')

  setDragonCGOpticity(1)
  Anim('dragoncg2', RootAnimations.SlideInFromRight, 1000, 'ease-out');
  /**
   *突然何をする{{go01}}！？
    この城には悪い魔物が住んでる{{go01}}！
    ……後で、街の皆に伝えておく{{go01}}。
   */
  await Content(`Scripts.Quest07.1.3`)

  // TODO: 孤龍從右側滑入
  setDragonCGOpticity(1)
  Anim('dragoncg', RootAnimations.SlideInFromRight, 1000, 'ease-out');
  ClearContent()
  await appServ.Wait(1500)

  /**
   *ヴァンパネラ：アアッ!　ソレダケハ 勘弁ヲ。
    悪イ噂ガ広マリ コノ城ノ解体…ナンテ事ニトナレバ、我ラノ主ノ顔ガ立タン。
    マサカ、コノ子がコンナニ強イナンテ…。
    孤竜：…おばさん。まだ何か企んでいる{{go01}}？
   */
  await Content(`Scripts.Quest07.1.4`)

  ClearContent();
  /**
   *ヴァンパネラ：ドキッ！　モ…モウ悪イコト考エナイカラ、ホントニ。
    ソ…ソウダ。我ノ力ヲ、与エルカラ…。ソレデ許シテ。
    孤竜：んんー。考えてあげてもいい{{go01}}。
    ホッ…… デハ、力在ル限リ 我ハ オ主ノ味方ダ！
    [{{dragonTypeName}}の力を手に入れた！]
   */
  await Content(`Scripts.Quest07.1.5`, { dragonTypeName: appServ.t('Data.DragonType.2.Title') })
  saveData.DragonChip1 |= DragonChipFlag.ヴァンパネラ;
  component.skipWait = true;
  appServ.setSE('snd15')

  await AllFadeOut();

  Back()
}