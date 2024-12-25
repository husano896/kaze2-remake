import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** 幻の浮島ラグナルクス After */
export const Quest04a = async (component: DialogueComponent) => {
  const { setDragonCG2, ClearContent, Content, Back, AllFadeOut, setDialogOpticity, Anim, saveData, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, setDragonCG2Opticity } = component;

  setBG('ragunaroku')
  setBGOpticity(1);
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);
  // BGM設定
  appServ.setBGM('music25')

  //#region 一般事件
  setDragonCG2(appServ.saveData.cgName)
  setDragonCG('best11')

  setDragonCG2Opticity(1);
  Anim('dragoncg2', RootAnimations.SlideInFromRight, 1000, 'ease-out');
  /**
    …ハアッ、ハアッ…。
    ……。
   */
  await Content(`Scripts.Quest04.1.5`)

  ClearContent();
  setDragonCGOpticity(1);
  Anim('dragoncg', RootAnimations.SlideInFromRight, 500, 'ease-out');
  await appServ.Wait(1500)
  /**
    …馬鹿な…この私が、こんな奴に負けるだと…？
    亡霊とはいえ、私よりも現代竜の力の方が、強いというのか…
    この千年の間に一体、何があったというのだ…。
    貴様…… 貴様は…… 本当に人間を恨んでおらぬのか…？
    孤竜：……。 うん。
    {{my}} は何があったとしても、人間を…{{you}}を信じる{{go01}}。
   */
  await Content(`Scripts.Quest04.1.6`)
  /**
    千年前、我々が滅びの一途を辿った時の 奴らの蛮行を許すというのか…。
    ふっ…面白い。
    ならば、私の力を貴様に授け、その力で貴様の行く末を見届けてやろう。
    …さぁ、さっさと手をかざすがいい。
    力ある限り、私は貴様の味方である…。
    [古代霊{{dragonTypeName}}の力を手に入れた！]
   */
  await Content(`Scripts.Quest04.1.7`,
    { dragonTypeName: appServ.t('Data.DragonType.12.Title') })

  saveData.DragonChip1 |= DragonChipFlag.ケツァルコアトル;
  appServ.setSE('snd15')
  await AllFadeOut();
  Back()
}