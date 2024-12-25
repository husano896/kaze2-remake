import { IBattleRouteState } from "@/app/pages/game/battle/battle.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { EventFlag } from "../EventFlag";
import { RootAnimations } from "@/app/app.service";

/** 滅 び の 都 ヒ デ ィ ー ル 最終決戰腳本 */
export const Games08 = async (component: DialogueComponent) => {
  const { saveData, Content, Face, location, router, setDialogOpticity, appServ, Anim, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  const { debugMenu } = location.getState() as { event: string, lv: string, debugMenu: boolean };

  const onWinURL = '/game/dialogue'
  const onLoseURL = '/game/gameover'
  const onWinState = { event: 'Games08a', debugMenu }

  appServ.setBGM('music32')
  setBG('last')
  setBGOpticity(1);
  await appServ.Wait(3000);
  setDialogOpticity(1);

  Face('char42')
  /** やはり来たか……愚かな竜よ。 */
  await Content(`Scripts.Games08.1.01`)

  Face('char07')
  /**
    ……くっ。…お前がレギオンっすね。
    勝手なことばかり言って、お前たちは何様のつもりなんすか！？
   */
  await Content(`Scripts.Games08.1.02`)

  Face('char40')
  /**
    この世の全てを知り、命を作り出し、人知れず世界を支配する者。
    それをお前たちは何と呼んでいる？
   */
  await Content(`Scripts.Games08.1.03`)

  Face('char00')
  /**
    ……っ！
    お前なんかを神さまなんて、ぜったい認めない{{go01}}！
   */
  await Content(`Scripts.Games08.1.04`)

  Face('char42')
  /**
    フッ、少なくとも、造られし者である竜たちにとっては、神に等しい。
    そうは思わないかね？
   */
  await Content(`Scripts.Games08.1.05`)

  Face('char07')
  /**
    そこをどくっすよ！　こう見えても、{{dragonName}}はかなり強いっす！
    ケガしたくなかったら、ボクたちの邪魔はやめるっす！
   */
  await Content(`Scripts.Games08.1.06`)

  Face('char40')
  // TODO: 地震效果
  appServ.setRadialEffect('#000000', true, 1000)
  appServ.setAmbient('snd20')
  /** っ、はははははは！！ */
  await Content(`Scripts.Games08.1.07`)

  Face('char00')
  /** な、何……！？ */
  await Content(`Scripts.Games08.1.08`)

  Face('char09')
  /** 地震っすか！？ */
  await Content(`Scripts.Games08.1.09`)

  Face('char40')
  /**
    愚かな竜だ。
    貴様の力など、そのモジュールを通して全てモニターしてある。
    そして、我らの力をもってすれば、
    お前たちの力を凌駕する者を生み出すことなど、たやすい事だ。
   */
  await Content(`Scripts.Games08.1.10`)

  Face()
  setDragonCG('boss')
  setDragonCGOpticity(1)
  Anim('dragoncg', RootAnimations.FadeIn, 500);
  appServ.setRadialEffect('#000000', true, 1000)
  /** キシャァァー――！！ */
  await Content(`Scripts.Games08.1.11`)

  Face('char09')
  /** うぐ……なんなんすか、これ……。 */
  await Content(`Scripts.Games08.1.12`)

  Face('char00')
  /** ば、化けもの！ */
  await Content(`Scripts.Games08.1.13`)

  Face('char42')
  /**
    どうだ、すばらしいだろう！
    これが、お前のような愚か者を抹消するために生み出した戦闘個体、
    「シュブニグラス」だ！
   */
  await Content(`Scripts.Games08.1.14`)

  Face()
  appServ.setRadialEffect('#000000', true, 1000)
  /** ア、アアア、ガアアア！！ */
  await Content(`Scripts.Games08.1.15`)

  appServ.setRadialEffect()
  Face('char40')
  /**
    ドラゴンの体に隠された最大の謎である「属性」。
    こいつはその全てを極限まで発現させて生み出したものだ。
    機能性を重視したせいか、デザインは著しく悪いがな。
   */
  await Content(`Scripts.Games08.1.16`)

  Face('char10')
  /** お前は……命を、なんだと思ってるんっすか！！ */
  await Content(`Scripts.Games08.1.17`)

  Face('char40')
  /** フン！そもそも我々が蘇生させたのだ。どう扱おうと自由だろう？ */
  await Content(`Scripts.Games08.1.18`)

  Face('char00')
  /** ……。 */
  await Content(`Scripts.Games08.1.19`)

  Face()
  /**
    シュブニグラス：タ……タスケ……て…。
    イタい……くルシイ…。
   */
  await Content(`Scripts.Games08.1.20`)

  Face('char00')
  /** え！？ */
  await Content(`Scripts.Games08.1.21`)

  Face('char09')
  /** しゃべったっす！？ */
  await Content(`Scripts.Games08.1.22`)

  Face('char40')
  /**
    ああ。まだ自我が残っていたか。
    残念ながら、一体の竜では発現できる属性が限られていてな。
    数体の個体を結合して、シュブニグラスの土台にしたのだ。
   */
  await Content(`Scripts.Games08.1.23`)

  Face('char09')
  /** 結合！？ */
  await Content(`Scripts.Games08.1.24`)

  Face('char40')
  /**
    ちなみに、シュブニグラスの基礎には、街でさらって来た
    竜死病にかかって死にかけた個体を使っている。
    見事な廃物利用だとは思わないか？
   */
  await Content(`Scripts.Games08.1.25`)

  Face('char00')
  if (saveData.ivent & EventFlag.性別) {
    /**
      ………あっ……ああぁぁ…。
      な……なん…て……こと………。
     */
    await Content(`Scripts.Games08.1.26`)

  } else {
    /**
      ………あっ……うぁぁ…。
      う……うわあああああっ！！！！
     */
    await Content(`Scripts.Games08.1.27`)
  }

  Face('char42')
  /**
    一つ教えておいてやるが、結合した個体を元に戻す方法はない。
    無駄な情けをかけず、全力で殺しあうがいい。
   */
  await Content(`Scripts.Games08.1.28`)

  Face()
  /**
    シュブニグラス：ボ、くを……コロしデ……。
    オネガい………オネガぃ………。
   */
  await Content(`Scripts.Games08.1.29`)

  Face('char40')
  /**
    負けた時には、お前の体もシュブニグラスの一部にしてやろう。
    この状態になれば、竜死病で死ぬこともないしな。
    ははははは！！
   */
  await Content(`Scripts.Games08.1.30`)

  appServ.setAmbient()
  if (debugMenu) {
    alert('因在測試模式下，跳過戰鬥。')
    await router.navigate(['/'], { replaceUrl: true, onSameUrlNavigation: 'reload', state: onWinState })
    await router.navigate([onWinURL], { replaceUrl: true, onSameUrlNavigation: 'reload', state: onWinState })
    return;
  }
  router.navigate(['/game/battle'], {
    replaceUrl: true, state: {
      battle: '-last', onWin: { href: onWinURL, state: onWinState },
      onLose: { href: onLoseURL }
    } as IBattleRouteState
  })
}