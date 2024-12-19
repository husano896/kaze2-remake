import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { ItemID } from "../ItemID";

/** サラ平原 After */
export const Quest08a = async (component: DialogueComponent) => {
  const { AllFadeOut, saveData, setDragonCG2, setDragonCG2Opticity, Content, Back, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('heigen')
  setBGOpticity(1);

  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // BGM設定
  appServ.setBGM('music11')

  // TODO: 孤龍從右側滑入
  setDragonCG(appServ.saveData.PS_RyuCG())
  setDragonCGOpticity(1);
  setDragonCG2('best04')
  setDragonCG2Opticity(1);

  await appServ.Wait(1500)
  setDialogOpticity(1);

  //#region 先前已經有打架過則是拿道具
  if (saveData.DragonChip1 & DragonChipFlag.管狐) {
    /*
      管狐:うわぁ…ビックリしたよぅー！！　またやっちゃったよぅー！
      孤竜：いきなり、牙むかれるの、少しこっちも怖い{{go01}}。
      管狐：きゅぅぅ～～……。"
    */
    await Content(`Scripts.Quest08.2.1`)

    const itemID = Math.round(Math.random() * 4) == 1 ? ItemID.虚無の塊 : ItemID.精霊根;
    await Content(`Scripts.Quest08.2.2`, { varItemName: appServ.t(`Data.Item.${itemID}.Title`) })
    saveData.item[itemID]++;
  }
  else {
    /**
      管狐:うわぁ…ビックリしたよぅー！！　怖かったよぅー！
      孤竜：あぁ、ごめんなさい。突然、牙をむかれたから、てっきり…
      悪気はなかった{{go01}}。
      管狐：……。ドキドキ……。
      ボ…ボクの方こそ、突然襲いかかったりして、ごめんだよぅー。
      ケガ、しなかった…？
     */
    await Content(`Scripts.Quest08.1.4`)

    /**
      孤竜：少しはあるかもしれないけれど、大丈夫♪
      管狐：はぅ……。ごめんよぅ。
      ボクの些細な力だけれど、もらっておくれよぅー。
      力ある限り、ボクはキミの味方だよぅー。
      [{{dragonTypeName}}の力を手に入れた！]"
     */
    await Content(`Scripts.Quest08.1.5`, { dragonTypeName: appServ.t('Data.DragonType.5.Title') })
    saveData.DragonChip1 |= DragonChipFlag.管狐;
  }
  appServ.setSE('snd15')
  await AllFadeOut()
  Back()
}