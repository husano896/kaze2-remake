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
/** ウリア大砂漠地帯 After aka 家暴完現場 */
export const Quest10a = async (component: DialogueComponent) => {
  const { setDragonCG2, setDragonCG2Opticity, AllFadeOut, Back, Anim, saveData, Content, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('sabaku2')
  setBGOpticity(1);

  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCG2('best20')

  setDragonCGOpticity(1);
  Anim('dragoncg', RootAnimations.SlideInFromRight, 500, 'ease-out');
  Anim('dragoncg2', RootAnimations.SlideInFromLeft, 500, 'ease-out');
  setDialogOpticity(1);

  appServ.setBGM('music35')

  /**
    弧竜：そんな……おとうさんどうして…。
    べトリブニス：……。
    弧竜：…ひょっとして{{my}}のこと嫌い…？
    べトリブニス：……。
    弧竜：ねぇ…何とかいって欲しい{{go01}}…。
    弧竜：……………………………………。
   */
  await Content(`Scripts.Quest10.1.5`)



  /**
    弧竜：グスッ……うぁぁ…あぁ…。
    おとうさん：……。
   */
  await Content(`Scripts.Quest10.1.6`)

  await Anim('dragoncg', RootAnimations.FadeOut, 1000);
  setDragonCGOpticity(0);
  
  await appServ.Wait(1500)
  /**
    さらばだ…私のかわいい息子よ…。
    私たちの余命は幾ばくも無い。お前がここに戻ってきた所で
    一人悲しみに嘆くことになる…。だから…お前は…もっと…
    暖かい多くの人に囲まれ…楽しく生きるべきなのだ…。
    …ゼェゼェ…
   */
  await Content(`Scripts.Quest10.1.7`)

  /** 
    元気でな……。
    もう、ここへはくるんじゃないぞ…。
    次来たら、私はお前に……。ゴホッ！ゼェゼェ…
   */
  await Content(`Scripts.Quest10.1.8`)
  saveData.ivent |= EventFlag.ウリア大砂漠地帯イベント;
  await AllFadeOut();
  Back()
}