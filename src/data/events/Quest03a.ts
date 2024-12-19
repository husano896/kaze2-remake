import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** ドラゴンの古代遺跡 After */
export const Quest03a = async (component: DialogueComponent) => {
  const { setDragonCG2, ClearContent, Content, Back, AllFadeOut, setDialogOpticity, saveData, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, setDragonCG2Opticity } = component;

  setBG('iseki')
  setBGOpticity(1);
  appServ.setAmbient('snd17')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);
  // BGM設定
  appServ.setBGM('music11')

  //#region 一般事件
  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.PS_RyuCG())
  setDragonCGOpticity(1);
  /**
   *……すっごく怖かった{{go01}}…。
    あの……ごめんなさい。 でも、{{my}}は墓荒らしなんかじゃない{{go01}}。
    ちょっと、興味本位で入っただけで…。
   */
  await Content(`Scripts.Quest03.1.5`)

  ClearContent();

  setDragonCG2('best12')
  setDragonCG2Opticity(1);
  await appServ.Wait(1500)
  /**
   *ゾンドドレイク：…スマヌ。どうやら墓荒らしではないようだな…。
    私は、この地を守るべく遺跡に仕えし者。見ての通り亡霊ではあるが、
    意思を持った、れっきとしたドラゴンの末裔だ。
    …しかし、この私を負かすとは… 惜しい逸材だ。
    どうだ？私の力を分け与えてやるから、私とこの地を守ってはみぬか？
    孤竜：えっ、でも……
   */
  await Content(`Scripts.Quest03.1.6`)
  /**
   *ゾンドドレイク：ウム…。まぁ、私は亡霊であり、そなたは生ける者。
    時々でいいから、ここを訪れてくれるだけでよい。さぁ…手をかざすのだ。
    力ある限り、私はそなたの味方である…。
    [亡霊{{draognTypeName}}の力を手に入れた！]
   */
  await Content(`Scripts.Quest03.1.7`,
    { dragonTypeName: appServ.t('Data.DragonType.13.Title') })

  saveData.DragonChip1 |= DragonChipFlag.ゾンドドレイク;
  component.skipWait = true;
  appServ.setSE('snd15')
  await AllFadeOut();

  Back()
}