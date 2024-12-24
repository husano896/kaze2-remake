import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/**
 *                     BossName = 2;
                    bossDat = "Quest08";
                    bossNm = "-hei";
                    BossCG = "best04";
                    DragonChip_ChkBit = 16;
                    varURL = "games05a.html?Lv8";
                    document.write("<DIV ID = 'BG' STYLE='position:absolute;top:8px;left:0px; visibility:hidden;'>");
                    document.write("<IMG width=100% src='image/bg_heigen.jpg' border=0></DIV>");
 */
/** サラ平原 */
export const Quest08 = async (component: DialogueComponent) => {
  const { saveData, SetContentCompleted, setDragonCG2, setDragonCG2Opticity, Content, Back, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('heigen')
  setBGOpticity(1);

  appServ.setAmbient('snd03')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  setDialogOpticity(1);

  // BGM設定
  appServ.setBGM('music11')

  //#region 需要帶能隱形的龍
  if (!(saveData.DragonChip2 & DragonChipFlag.ジン)) {
    /*
      空一面 晴れわたってて、とっても気持ちいい{{go01}}。
      太陽にさらされた草の匂いがいっぱいする{{go01}}。 それに小さな生き物の気配もしてる{{go01}}。
      …けれど、{{my}}がいるせいかな？ 誰も姿を表さない{{go01}}。
      姿が隠せるようなドラゴンでないとダメかな…。ちょっとショック{{go00}} {{go01}}…。
    */
    await Content(`Scripts.Quest08.1.1`)
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion


  //#region 一般事件
  setDragonCG2('best04')
  setDragonCG2Opticity(1);
  /**
    空一面 晴れわたってて、とっても気持ちいい{{go01}}。
    太陽にさらされた草の匂いがいっぱいする{{go01}}。 それに小さな生き物の気配もしてる{{go01}}。
    …あっ。{{my}}が気配を消していると、そこの茂みから何か出てくる{{go01}}。
  */
  await Content(`Scripts.Quest08.1.2`)

  /*
    管狐：んきゅ？
    さっき何かいたような気がしたよぅー？　気のせいだったのかなぅ。
    孤竜：…♪　挨拶してみる{{go01}}。
    こ…こんにちは！
    管狐：？！？！
  */
  await Content(`Scripts.Quest08.1.3`)
  router.navigate(['/game/battle'], {
    state: {
      battle: '-hei',
      onWin: {
        href: '/game/dialogue',
        state: {
          event: 'Quest08a'
        }
      }
    },
    replaceUrl: true
  })
  //#endregion
}