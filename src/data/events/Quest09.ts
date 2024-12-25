import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** 街の雑木林 */
export const Quest09 = async (component: DialogueComponent) => {
  const { Emoji, ClearContent, saveData, SetContentCompleted, Anim, Content, Back, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('forest2')
  setBGOpticity(1);

  appServ.setAmbient('snd17')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  Anim('dragoncg', RootAnimations.SlideInFromRight, 1000, 'ease-out');
  setDialogOpticity(1);

  // BGM設定
  appServ.setBGM('music16')

  //#region 已經打架過
  if ((saveData.DragonChip2 & DragonChipFlag.ヴァンパネラ)) {
    /*
      ……まだ{{my}} が倒した植物の体、残ってる{{go01}}。
      やっぱり悪いことしちゃった{{go01}}。
      早く、かわりの体見つかるといいな…。
    */
    await Content(`Scripts.Quest09.2`)
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion


  //#region 一般事件
  /**
    …街からそれほど離れてないのに、ここは手つかずの自然が残ってる{{go01}}。
    そういえば…街の人は、大昔、ここに大沼があったって言ってた{{go01}}。
    …それを利用して用水路をつくったって言ってたけれど、何だか難しい話{{go00}} {{go01}}。
    ひょっとしたら、その時に追い出された生き物が、まだこの森で生きてるかも…。
  */
  await Content(`Scripts.Quest09.1.1`)

  ClearContent()
  await appServ.Wait(1000);

  /*
    謎の声：シギャァァァーーー‥‥
  */
  await Content(`Scripts.Quest09.1.2`)

  Emoji(6)
  /** 孤竜：どきぃぃっ？！？！ */
  Content(`Scripts.Quest09.1.3`)
  await Anim('dragoncg', RootAnimations.SlideOutToLeftPeek, 2000, 'ease-out');
  (document.querySelector('#dragoncg') as HTMLElement).style.transform = 'translateX(-50%)';
  /**
    孤竜：…ハラハラ
    謎の声：モゾモゾ…ズズズズ…。
    孤竜：何かが…茂みの奥からやってくる{{go01}}！
    謎の声：シャゲェーーー！
   */
  await Content(`Scripts.Quest09.1.4`)

  router.navigate(['/game/battle'], {
    state: {
      battle: '-Forest2',
      onWin: {
        href: '/game/dialogue',
        state: {
          event: 'Quest09a'
        }
      }
    },
    replaceUrl: true
  })
  //#endregion
}