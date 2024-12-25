
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { EventFlag } from "../EventFlag";
import { RootAnimations } from "@/app/app.service";

/** 滅 び の 都 ヒ デ ィ ー ル After 最終決戰腳本 After*/
export const Games08a = async (component: DialogueComponent) => {
  const { saveData, ClearContent, AllFadeOut, Content, Face, location, router, Anim, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  const { debugMenu } = location.getState() as { event: string, lv: string, debugMenu: boolean };

  appServ.setBGM('music32')
  setBG('last')
  setBGOpticity(1);
  await appServ.Wait(3000);
  setDialogOpticity(1);

  // TODO: 地震效果
  appServ.setRadialEffect('#000000', true, 500)
  /** シュブニグラス：お、アアアっ！！！ */
  await Content(`Scripts.Games08.2.01`)

  appServ.setAmbient('snd18')
  Face('char00')
  /** …………。 */
  await Content(`Scripts.Games08.2.02`)

  appServ.setRadialEffect()
  Face('char10')

  /** 
    ごめんなさいっす……。ボクたちには、これくらいしか
    キミたちにしてあげられることが、なかったんっす……。
   */
  await Content(`Scripts.Games08.2.03`)

  Face('char41')
  /** ば…ばかなっ！　理論値では完全に凌駕していたはずだ！ */
  await Content(`Scripts.Games08.2.04`)

  Face('char00')
  if (saveData.ivent & EventFlag.性別) {
    /** 次は、アナタの番{{go00}}{{go01}}！ */
    await Content(`Scripts.Games08.2.05`)
  } else {
    /** 次は、お前の番{{go00}}{{go01}}！ */
    await Content(`Scripts.Games08.2.06`)
  }

  Face('char40')
  /**
    ……少々侮っていたというわけか……。
    なるほど、お前はかなり面白いサンプルのようだ。
    このままプログラム異常で消滅させるには惜しい……
    本部にはお前の延命を進言しておいてやるとしよう。
   */
  await Content(`Scripts.Games08.2.07`)

  Face('char07')
  /** 何を言ってるんっすか！？ */
  await Content(`Scripts.Games08.2.08`)

  appServ.setAmbient('snd20')
  appServ.setRadialEffect('#000000', true, 500)
  setDragonCG('boss')
  setDragonCGOpticity(1)

  Anim('dragoncg', RootAnimations.FadeIn, 500);
  Face()
  /** シュブニグラス：グルル……！ */
  await Content(`Scripts.Games08.2.09`)

  Face('char10')
  /** …そ…そんな！？ */
  await Content(`Scripts.Games08.2.10`)

  appServ.setRadialEffect()
  Face('char42')
  /** 
    シュブニグラスの細胞核全てに、
    細胞分裂を異常活性させるトリガーナノマシンが組み込んである。
    全身を粉々に砕かない限り、何度でも蘇生するように製作したのだが……。
   */
  await Content(`Scripts.Games08.2.11`)

  Face()
  /** シュブニグラス：ア、オ……ウガアアッ！！ */
  await Content(`Scripts.Games08.2.12`)

  appServ.setRadialEffect('#000000', true, 500)
  appServ.setSE('snd04')
  Face('char41')
  /** チィッ！ */
  await Content(`Scripts.Games08.2.13`)

  Face('char09')
  /**
    ？！？！
    な、仲間を攻撃してるっすか！？
   */
  await Content(`Scripts.Games08.2.14`)

  Face('char41')
  /** 暴走したか……っ。 */
  await Content(`Scripts.Games08.2.15`)

  Face()
  /** アガアアアッ！！ */
  await Content(`Scripts.Games08.2.16`)

  Face('char40')
  /** 見苦しい失敗作め。消えろ！ */
  await Content(`Scripts.Games08.2.17`)

  appServ.setRadialEffect('#FF0000', false, 1000)
  appServ.setAmbient('snd18')
  appServ.setSE('snd21')
  setDragonCGOpticity(0)
  Anim('dragoncg', RootAnimations.FadeOut, 250, 'ease-out');
  await appServ.Wait(1500)

  Face('char07')
  appServ.setRadialEffect()
  /** あれだけ苦労したあいつを、一瞬で……。 */
  await Content(`Scripts.Games08.2.18`)

  Face('char42')
  /**
    お前の未知数の力に免じて、今回は見逃してやる。
    だが、いずれまた会うこともあるだろう……その時を楽しみにしているぞ。
   */
  await Content(`Scripts.Games08.2.19`)

  Face('char00')
  setBGOpticity(0)
  /** ……！ */
  await Content(`Scripts.Games08.2.20`)

  Face()
  ClearContent()
  await appServ.Wait(1500)

  appServ.setBGM('music13')
  appServ.setAmbient('snd18')
  setBGOpticity(1)
  await appServ.Wait(3000)

  Face('char00')
  /**
    ………。
    どうして、こんなことになった{{go04}}……。
   */
  await Content(`Scripts.Games08.2.21`)

  Face('char02')
  /** {{dragonName}}……。 */
  await Content(`Scripts.Games08.2.22`)

  Face('char00')
  /**
    {{my}}はただ、病気を治したくて……このドラゴンたちも、そうだったはずなのに！
    ねぇ…{{you}}！　{{my}}って…、ドラゴンって一体、何…？
   */
  await Content(`Scripts.Games08.2.23`)

  Face('char06a')
  /** {{dragonName}}……。 */
  await Content(`Scripts.Games08.2.24`)

  Face('char00')
  /**
    病気ですごく苦しい思いして、それ以上に辛いことを聞いて…。
    こんな思いするくらいなら、{{my}}……
    生まれてなんかこなければよかった{{go01}}……。
   */
  await Content(`Scripts.Games08.2.25`)

  Face('char06')
  /**
    そんな悲しいこと、言わないでほしいっすよ。
    確かに、いっぱい辛いことも、悲しいことも見てきたっす。
    でも、{{dragonName}}は……キミたちは今生きていてボクらと一緒にいるんっす！
    それは絶対、辛くて悲しいことだけじゃなくて、
    楽しいことも、うれしいこともいっぱいあったはずっす！
   */
  await Content(`Scripts.Games08.2.26`)

  Face('char00')
  /* ニエルサン……。 */
  await Content(`Scripts.Games08.2.27`)

  Face('char06')
  /**
    ボクは、{{dragonName}}が生まれてきて、一緒に過ごしてくれて、うれしいっす。
    もしキミが「生きてる理由」が欲しいっていうんなら、ボクがそれになるっすよ！
    {{yourName}}さんも、きっとそう思ってるはずっすよ。
   */
  await Content(`Scripts.Games08.2.28`)

  Face('char00')
  /** {{yourName}}…………。 */
  await Content(`Scripts.Games08.2.29`)

  Face('char06a')
  /** ………？ */
  await Content(`Scripts.Games08.2.30`)

  Face('char02')
  /**
    見てみるっす。
    ニステアの滴……光ってるっす……。
   */
  await Content(`Scripts.Games08.2.31`)

  Face('char00')
  /** うん……。  */
  await Content(`Scripts.Games08.2.32`)

  Face('char05')
  /** きっとみんな、{{dragonName}}が元気になってほしいって、思ってるんっすよ。 */
  await Content(`Scripts.Games08.2.33`)

  Face('char00')
  /**
    ニエルサン…………。
    {{my}}、このドラゴンたちに、お墓作ってあげたい{{go01}}…。
   */
  await Content(`Scripts.Games08.2.34`)

  Face('char04')
  /** 
    …うん。
    ボクたちには、まだやるべきことがあるっすから、すぐには無理っすが、
    終わって、帰ってきたらゆっくり、お弔いしてあげようっす。
   */
  await Content(`Scripts.Games08.2.35`)

  Face('char00')
  /** うん……みんな、ごめんね。 */
  await Content(`Scripts.Games08.2.36`)

  await AllFadeOut()

  router.navigate(['/game/dialogue'],
    {
      onSameUrlNavigation: 'reload',
      state: { event: 'Games07', lv: 1, debugMenu }
    })
}