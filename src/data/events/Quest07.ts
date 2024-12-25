import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** 被遺忘的古城 */
export const Quest07 = async (component: DialogueComponent) => {
  const { setDragonCG2, setDragonCG2Opticity, SetContentCompleted, Content, Back, Anim, Emoji, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('kojyou')
  setBGOpticity(1);

  appServ.setAmbient('')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);

  // BGM設定
  appServ.setBGM('music13')

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  Anim('dragoncg', RootAnimations.SlideInFromRight, 1000, 'ease-out');

  //#region 先前有成功打過架了
  if (appServ.saveData.DragonChip1 & DragonChipFlag.ヴァンパネラ) {


    // const varsam = Math.round(Math.random() * 5) + 2;
    /**
      …おばさん…また何か企んでない{{go01}}。
      近づくと、また血 取られちゃいそうになる{{go01}}。
      なんか物騒{{go00}} {{go01}}…。
     */
    await Content(`Scripts.Quest07.2.1`) // , {varsam: String(varsam)})
    /** 理論上這邊沒有文字提示，不太應該對友好度跟血量動作...? */
    // appServ.saveData.hp -= varsam;
    // appServ.saveData.love++;
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion

  //#region 一般事件

  /** 
   ……こんなところにお城がある{{go01}}…。
    いつつくられた{{go04}}？ そこら中、ホコリとクモの巣だらけ{{go00}} {{go01}}…。"
  */
  await Content(`Scripts.Quest07.1.1`)
  setDragonCG2('best01')
  setDragonCG2Opticity(1);
  Anim('dragoncg2', RootAnimations.SlideInFromLeft, 1000, 'ease-out');
  await appServ.Wait(1500)
  Emoji(1)
  /**
   ヴァンパネラ：オヤ？客人カネ？
    久々ダネェ。ソレニ、マダ若イ竜ジャナイカ。
    サァ！ コッチニ オイデ…
    孤竜：えっ？　うん……。
    ヴァンパネラ：イイ子ダネ。　サァ、早ク首筋ヲ……
    孤竜：…ちょ…ちょっと…！？
   */
  await Content(`Scripts.Quest07.1.2`)
  router.navigate(['/game/battle'], {
    state: {
      battle: '-koj',
      onWin: {
        href: '/game/dialogue',
        state: {
          event: 'Quest07a'
        }
      }
    },
    replaceUrl: true
  })
  //#endregion
}