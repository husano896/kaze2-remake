import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import * as _ from "lodash-es";
import { DragonChipFlag } from "../DragonChipFlag";
import { ItemID } from "../ItemID";

/** カ ザ リ ナ 山 ・ 幸 い の 地 フ ッ フ ー ル */
export const Quest02 = async (component: DialogueComponent) => {
  const { saveData, AllFadeOut, ClearContent, setDragonCG2Opticity, setDragonCG2, Content, Back, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('fufuru')
  setBGOpticity(1);

  appServ.setAmbient('')
  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // BGM設定
  appServ.setBGM('music01')

  setDialogOpticity(1);
  //#region 謝謝你救了我們 我們永遠感謝你.mp4
  if (appServ.saveData.DragonChip1 & DragonChipFlag.ショコラフッフール) {

    // TODO: 孤龍從右側滑入
    setDragonCG(appServ.saveData.cgName)
    setDragonCGOpticity(1);
    setDragonCG2('best14')
    setDragonCG2Opticity(1);
    const varsam = Math.round(Math.random() * 5) + 2;
    /**
     *孤竜：……こんにちは{ { go00 } } { { go01 } }…。
      フッフール：いらっしゃい。私の巣、ちょっと狭いけれどゆっくりしてくれると嬉しいわ。
      何にもない所だけれど、住みやすくていい場所よ。
      こんなに平和なのに…世の中は竜死病の猛威に蝕まれているのね…。
      孤竜：う…うん……。
      [{{varsam}}ポイントの疲労を感じたと同時に、友好値が + 1上昇した]
     */
    await Content(`Scripts.Quest02.2`, { varsam: String(varsam) })
    appServ.saveData.hp -= varsam;
    appServ.saveData.love++;
    Back();
    return;
  }
  //#endregion


  setDragonCG2('best14')
  setDragonCG2Opticity(1);
  /**
   *……どうしよう…。困ったわ。
    私の仔が「重症」にかかっちゃって……治療薬の材料がないと、あの仔が…。
    …でも、どこに行けばあるのかしら…？
   */
  await Content(`Scripts.Quest02.1.1`)

  ClearContent();

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.cgName)
  setDragonCGOpticity(1);
  /**
   *フッフール：きゃ……だ…誰？
    孤竜：…!
    フッフール：あら？ お客さん？　こんな所に珍しいわね。
    でも今はちょっと困るわ…。私の仔が重病にかかってて、看病しないといけないの。
    どうしたらいいものか…。
   */
  await Content(`Scripts.Quest02.1.2`);

  if (saveData.item[ItemID.ナーガ草] && saveData.item[ItemID.抗生薬]) {
    //#region 藥都齊了！
    saveData.item[ItemID.ナーガ草]--
    saveData.item[ItemID.抗生薬]--
    /**
     *孤竜：そういえば{{you}} と一緒に集めたアイテムの中に、それらしい素材があった{{go01}}。
      …これなんだけれど、使える{{go03}}？ よかったらあげる{{go01}}。
      フッフール：えっ？ いいの？…あ、ありがとう…。
      ……。じゃ、せめてお礼に、私の力をアナタに授けるわ…。
      手を差し出してね…。　力ある限り、私はアナタの味方よ♪
      [精霊{{dragonTypeName}}の力を手に入れた！]
     */
    await Content(`Scripts.Quest02.1.3.1`, { dragonTypeName: appServ.t('Data.DragonType.15.Title') })
    appServ.setSE('snd15')
    saveData.DragonChip1 |= DragonChipFlag.ショコラフッフール;
    await AllFadeOut();
    Back()
    return;
    //#endregion
  }

  if (saveData.item[ItemID.ナーガ草] || saveData.item[ItemID.抗生薬]) {
    //#region 缺ナーガ草 或 抗生薬
    /**
     *孤竜：そういえば{{you}}と一緒に集めたアイテムの中に、それらしい素材があった{{go01}}。
      …これなんだけれど、使える{{go03}}？
      フッフール：えっ？ …あ、ありがとう…。
      材料は使えそうなんだけれど、まだ、材料が足りないみたいだわ…。
      重症について書いてある本はないかしら…。
      はぁ、ユニコーンの角が私たちの種族にも効けば、苦労しなくてすむんだけれど…。
     */
    await Content(`Scripts.Quest02.1.3.2`)
    //#endregion
  }
  else if (saveData.item[ItemID.ユニコーン角]) {
    //#region 很可惜的 ユニコーン角 沒有用
    /**
     *孤竜：そういえば{{you}}と集めたアイテムの中に、ユニコーンの角があった{{go01}}。
      色々な病気に効くと聞いている{{go01}}。
      フッフール：えっ？ …あ、ありがとう…。
      でも…私達の種族には、ほとんど効果がないの。ごめんなさいね。
      重症についての文献があればいいのに…。いったい、何が必要なのかしら。
     */
    await Content(`Scripts.Quest02.1.3.3`)
    //#endregion
  } else {
    // 什麼藥都沒有:(
    setDragonCG2Opticity(0)
    /**
     *んん…なんだか邪魔してしまった{{go01}}。
      でも、仔どもが病気って、大変{{go00}} {{go01}}。 病気ってすごく辛くて、苦しいもの{{go00}} {{go01}}。"
      ねぇ…重症に効くアイテム、持ってきてあげれない{{go03}}？
     */
    await Content(`Scripts.Quest02.1.3.4`)
  }
  Back();
}