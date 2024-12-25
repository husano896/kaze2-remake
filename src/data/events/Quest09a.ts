import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";

/** 街の雑木林 After */
export const Quest09a = async (component: DialogueComponent) => {
  const { ClearContent, AllFadeOut, saveData, setDragonCG2, setDragonCG2Opticity, Content, Back, Anim, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  setBG('forest2')
  setBGOpticity(1);

  await appServ.Anim(RootAnimations.FadeIn, 3000);

  // BGM設定
  appServ.setBGM('music11')

  // TODO: 孤龍從右側滑入
  setDragonCG2(appServ.saveData.cgName)
  setDragonCG('best02')

  setDragonCG2Opticity(1);
  setDialogOpticity(1);
  Anim('dragoncg2', RootAnimations.SlideInFromRight, 1000, 'ease-out')
  /**
   *…はぁはぁ…かなりビビった{{go01}}。
    これは何なのかな。植物のような…竜のような…。
    なんか動かなくなっちゃった{{go01}}。
    やりすぎちゃった{{go01}}…。
   */
  await Content(`Scripts.Quest09.1.5`)

  ClearContent()
  setDragonCGOpticity(1);

  Anim('dragoncg', RootAnimations.SlideInFromRight, 1000, 'ease-out')
  await appServ.Wait(1500)
  /**
   *マンドレイク：…ぐるる、我は残留思念が植物に宿いし者なり。
    お前が手を出したおかげで、植物の体が傷ついてしまった。
    孤竜：ごっ、ごめんなさい…。{{my}}……。
    マンドレイク：構わんよ。どうせこの体も、雑草を集めてできたもの。
    大分ガタがきてたしな。 まぁ、体は探し直さないといけないが…。
    孤竜：ぐぅ…。
   */
  await Content(`Scripts.Quest09.1.6`)

  /**
    マンドレイク：ウム…。そうだ。頼みといってはなんだが、
    新しい体が見つかるまで、お前さんの肉体に、力を宿らせてはもらえぬか？
    孤竜：そんなことでいいのなら、喜んで。
    力ある限り 私はお前の味方だ…。これからも宜しく頼むぞ…。
    [残留思念{{dragonTypeName}}の力を手に入れた！]
   */
  await Content(`Scripts.Quest09.1.7`, { dragonTypeName: appServ.t(`Data.DragonType.3.Title`) })
  saveData.DragonChip1 |= DragonChipFlag.マンドレイク;
  appServ.setSE('snd15')
  await AllFadeOut()
  Back()
}