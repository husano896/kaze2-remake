import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { ItemID } from "../ItemID";

/** 幻の浮島ラグナルクス */
export const Quest04 = async (component: DialogueComponent) => {
  const { saveData, SetContentCompleted, setDragonCG2, setDragonCG2Opticity, ClearContent, Content, Back, Emoji, setDialogOpticity, appServ, router, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('ragunaroku')
  setBGOpticity(1);

  appServ.setAmbient('snd16')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  setDialogOpticity(1);
  // BGM設定
  appServ.setBGM('music25')

  //#region 先前有成功打過架了
  if (saveData.DragonChip1 & DragonChipFlag.ケツァルコアトル) {
    /*…どうした？ 私に会いに来たとでもいうのか？
      安心しろ。私は貴様と契約した時から、常に貴様の意識を共有している。
      いつ、いかなる時も、私の呪縛からは逃れられんということだ。
      ……。
      しかし、貴様という竜は面白いものだな…。なぜ、そのように生きる？
      命のともし火が消えようとしている今、なぜにそんなに前向きなのか…？
      */
    await Content(`Scripts.Quest04.2.1`)
    SetContentCompleted();
    Back();
    return;
  }
  //#endregion

  //#region 未湊滿四屬性登峰造極道具
  if (!saveData.item[ItemID.太陽の珠] || !saveData.item[ItemID.銀峰の雫] || !saveData.item[ItemID.風の翼] || !saveData.item[ItemID.大地の琥珀]) {
    /*…この地は始まりと終わりの地。歴史の始まりを見つめ、人と竜の行く末を見届ける島。
      ここに足を踏み入れることができるのは、全ての属性を極めし者だけだ…。
      貴様には、まだその資格はない。早々に立ち去るがよい。命あるうちにな…。
    */
      await Content(`Scripts.Quest04.1.1`)
      SetContentCompleted();
      Back();
      return;
  }
  //#endregion 

  //#region 一般事件

  /**
   *…ここは滅びの都。およそ千年の昔に、人間が築き上げた文明の末路。
    ここは、全ての属性を極めし者のみが立ち入ることの許される聖域…。
    貴様には、辛うじて その資格があるようだな…。では貴様に尋ねよう。
    かつてこの地は、竜の楽園であった。しかし、人間どもが渡来してからというもの
    巨大建造物が建ち、竜類は衰え、その痕跡はもはや、遺跡でしか辿ることができぬ。
    …貴様は、現代の竜として人間をどうとらえる？　宿敵か？ 餌か？ 奴隷か？
   */
  await Content(`Scripts.Quest04.1.2`)

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.PS_RyuCG())
  setDragonCGOpticity(1);
  ClearContent()
  /*
    …{{my}} は、人間のことをそうは思わない{{go01}}。
    昔のことはよく知らないけれど、たとえ、人間が悪いことをしていたとしても、
    今 こうして手を取り合って生きているのなら、それでいい{{go01}}…。
   */
  await Content(`Scripts.Quest04.1.3`)

  /** 
   *…クックッ…どうやら千年の間に、ドラゴン自身がどうかなってしまったらしいな。
    お前は、千年前に人間が犯した罪を赦すというのか…？　馬鹿馬鹿しい…。
    良いだろう…。分からないならば、身をもって教えてやるまでだ！
   */
  await Content(`Scripts.Quest04.1.4`)
  router.navigate(['/game/battle'], {
    state: {
      battle: '-rag',
      onWin: {
        href: '/game/dialogue',
        state: {
          event: 'Quest04a'
        }
      }
    },
    replaceUrl: true
  })
  //#endregion
}