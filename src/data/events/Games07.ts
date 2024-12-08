import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { DragonChipFlag } from "../DragonChipFlag";
import { RootAnimations } from "@/app/app.service";
import _ from "lodash";
import { ItemID } from "../ItemID";
import { IBattleRouteState } from "@/app/pages/game/battle/battle.service";
import { EventFlag } from "../EventFlag";
import { Games07a } from "./Games07a";

/** 滅 び の 都 ヒ デ ィ ー ル */
export const Games07 = async (component: DialogueComponent) => {
  const { SetContentCompleted, ClearContent, AllFadeOut, Emoji, Content, Face, location, router, SetSkipCallback, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  const { debugMenu, lv } = location.getState() as { event: string, lv: string, debugMenu: boolean };

  const { ivent } = appServ.saveData;

  appServ.setAmbient('snd18')

  console.log(lv)
  /** 若已被入侵過第二次且非戰鬥完回到這邊，進行最終決戰腳本 */
  if (ivent & EventFlag.ハッキング二回目 && !lv) {
    return Games07a(component);
  }

  setBG('last')
  setBGOpticity(1);
  await appServ.Wait(3000);
  setDialogOpticity(1);

  //#region 初次到訪
  console.log('a')
  if (!(ivent & EventFlag.ニステアイベント終了)) {

  }
  //#endregion

  //#region 戰鬥完且帶著lv標籤回到這邊代表打完了！
  if (lv && (ivent & EventFlag.ニステアイベント終了) && (ivent & EventFlag.水晶ランタンイベント終了)) {
    console.log('in')
    appServ.setBGM('music28')

    Face('char30')
    /** よく、がんばったね。辛かったろう。 */
    await Content(`よく、がんばったね。辛かったろう。`)

    Face('char02')
    /** ……知っていたんすね。 */
    await Content(`……知っていたんすね。`)

    Face('char30')
    /** すまない。我々に出来ることは、君達の無事を祈って見つめること以外なかった。 */
    await Content(`すまない。我々に出来ることは、君達の無事を祈って見つめること以外なかった。`)

    Face('char02')
    /**
     *いや、いいっすよ。あなた達に何かあったら、それこそ一大事っす。
      ボクたちは自分に出来ることを、精一杯やるだけっすから。
     */
    await Content(`いや、いいっすよ。あなた達に何かあったら、それこそ一大事っす。
ボクたちは自分に出来ることを、精一杯やるだけっすから。`)

    Face('char30')
    /** ありがとう。それでは早速治療に入ろうか……。 */
    await Content(`ありがとう。それでは早速治療に入ろうか……。`);

    await AllFadeOut()

    appServ.setAmbient('snd19')
    appServ.setSE('snd11')
    setBG('last2')
    setBGOpticity(1)
    setDragonCG(appServ.saveData.PS_RyuCG())
    await appServ.Wait(3000)

    setDragonCGOpticity(1)
    setDialogOpticity(1)
    /**
     *……。
      まって！
     */
    await Content(`……。
まって！`)

    Face('char01')
    /**
     *どうしたんっす？
      せっかく治るんっすよ？　怖いんっすか？
     */
    await Content(`どうしたんっす？
せっかく治るんっすよ？　怖いんっすか？`)

    Emoji(3)
    Face()
    /** これは……{{my}}にしか使えないもの？ */
    await Content(`これは……{{my}}にしか使えないもの？`)

    Emoji()
    Face('char31')
    /**
     *……残念ながらね。
      ミーミルは、この二つのアイテムを使ってやっと一竜分にしかならない……。
     */
    await Content(`……残念ながらね。
ミーミルは、この二つのアイテムを使ってやっと一竜分にしかならない……。`)

    Face('char02')
    /**
     *……気持ちはわかるっすが、
      でもまず{{dragonName}} が治ることが先っすよ。
     */
    await Content(`……気持ちはわかるっすが、
でもまず{{dragonName}} が治ることが先っすよ。`)

    Face('char31')
    /**
     *それに、このミーミルはまだ不完全だ。
      成功例も数件しかない。
     */
    await Content(`それに、このミーミルはまだ不完全だ。
成功例も数件しかない。`)

    Face('char07')
    await Content(`……！？
つまり、この仔に実験台になれ、っていうことっすね？`)

    Face('char30')
    await Content(`成功すれば、生きられる。
だが、失敗すれば、死ぬ。`)

    Face('char04')
    await Content(`でも…
でも、このままでも、どちらにせよ死ぬだけっす！`)

    Emoji(5)
    Face()
    await Content(`それに{{my}}がじっけんだいになれば…
もっと成功するようになる{{go03}}？`)

    Emoji()
    Face('char02')
    await Content(`……。`)

    Face('char31')
    await Content(`
……それでは、行こうか。
ああ、君はそこで待っていてくれないかな。
それに、里親のモジュールも外してほしい。
彼らが、それを通してモニターしているから。`)

    Face('char01')
    await Content(`
……わ、分かったっす。
んじゃ、{{yourName}} さん、行こうっす。`)
    SetContentCompleted();
    await AllFadeOut();

    await appServ.Wait(3000);
    router.navigate(['/game/dialogue'],
      {
        onSameUrlNavigation: 'reload',
        state: { event: 'Ending2', debugMenu }
      })
    return
  }
  //#endregion

  //#region 持有水晶ランタン但還沒鑑定過
  // 水晶ランタンイベント　メッセージ表示ルーチン
  if (appServ.saveData.item[ItemID.水晶ランタン] && !(ivent & EventFlag.水晶ランタンイベント終了)) {
    Face('char07')
    /**
     * どうもっす。アイテムの鑑定 お願いするっす！
     */
    await Content('どうもっす。アイテムの鑑定 お願いするっす！')

    Face('char31')
    /**
     *……ああ、よく見つけてきたね。
      現在手にしている『水晶ランタン』これが、その一つだよ。
     */
    await Content(`……ああ、よく見つけてきたね。
現在手にしている『水晶ランタン』これが、その一つだよ。`)

    Face('char01')
    /**
     * これが……っすか？　たしかにきれいで便利なものっすが……。
     */
    await Content(`これが……っすか？　たしかにきれいで便利なものっすが……。`)

    Face('char31')
    /**
     *これは星の船に使われていた、極小のモノポールジェネレータなのさ。
      これによって「ミーミル」に使用する膨大な電力が、まかなえるようになるんだ。
     */
    await Content(`これは星の船に使われていた、極小のモノポールジェネレータなのさ。
これによって「ミーミル」に使用する膨大な電力が、まかなえるようになるんだ。`)

    Face('')
    setDragonCG(appServ.saveData.PS_RyuCG())
    setDragonCGOpticity(1)
    /**
     * ものー……もーじぇ？　みーみる！？
     */
    await Content(`ものー……もーじぇ？　みーみる！？`)

    Face('char31')
    /** 『高密度情報集積管理機構・ミーミル』それが「万能薬」と伝承されたものの正体さ。 */
    await Content(`『高密度情報集積管理機構・ミーミル』それが「万能薬」と伝承されたものの正体さ。`)

    Face('char02')
    /**
     *う、うう～……。
      もっと簡単に言ってほしいっすぅ～。
     */
    await Content(`う、うう～……。
もっと簡単に言ってほしいっすぅ～。`)

    Face('char31')
    /**
     *ははは。すまないね。
      どうしても科学者というものは、難しい物言いをしてしまうようだ。
      まぁ、要するに「ミーミル」というのは、竜たちに個別の「悪魔の樹」をつけることなんだ。
     */
    await Content(`ははは。すまないね。
どうしても科学者というものは、難しい物言いをしてしまうようだ。
まぁ、要するに「ミーミル」というのは、竜たちに個別の「悪魔の樹」をつけることなんだ。`)

    Face('char09')
    Emoji(5)
    /**
     *えええええっ！！？？
      だって、そんなことしたら！！
     */
    await Content(`えええええっ！！？？
だって、そんなことしたら！！`)

    Emoji()
    Face('char32')
    /**
     *おいおい。
      悪魔の樹、と言ったのは、その性質をもっとも表現しやすかったからで、
      悪魔の樹とは姿も形も全く別のものだよ。
     */
    await Content(`おいおい。
悪魔の樹、と言ったのは、その性質をもっとも表現しやすかったからで、
悪魔の樹とは姿も形も全く別のものだよ。`)

    Face('char02')
    /** どういうことっすか？ */
    await Content(`どういうことっすか？`)

    Face('char31')
    /**
     *竜たちの体を維持する目的で悪魔の樹が使われていることは知っているね？
      そして、それは破綻をきたし、「竜死病」というかたちで
      再び竜を絶滅に追いやろうとしている……。
     */
    await Content(`竜たちの体を維持する目的で悪魔の樹が使われていることは知っているね？
そして、それは破綻をきたし、「竜死病」というかたちで
再び竜を絶滅に追いやろうとしている……。`)

    Face('char01')
    /** で、ボクたちはそれを治す万能薬を探してきた……。 */
    await Content(`で、ボクたちはそれを治す万能薬を探してきた……。`)

    Face('char31')
    /**
     *しかし、この病気は従来のものとは違い、かりそめの体に処置を施しても無駄だ。
      第二の体ともいえる悪魔の樹が狂いだしているのだから。
      いわば、体そのものが病原体と言ってもいい。
     */
    await Content(`しかし、この病気は従来のものとは違い、かりそめの体に処置を施しても無駄だ。
第二の体ともいえる悪魔の樹が狂いだしているのだから。
いわば、体そのものが病原体と言ってもいい。`)

    Face('char04')
    /** それじゃ……どうしようもないっすよ。 */
    await Content(`それじゃ……どうしようもないっすよ。`)

    Face('char31')
    Emoji(3)
    /**
     *そこで「ミーミル」が考案されたのさ。
      竜たちの体を構成する基本パターンを悪魔の樹から収集した後、
      それをもとに個々の竜たち専用の記憶装置と情報処理機構を取り付ける……
      竜たちを悪魔の樹の拘束から開放するもの……。
     */
    await Content(`そこで「ミーミル」が考案されたのさ。
竜たちの体を構成する基本パターンを悪魔の樹から収集した後、
それをもとに個々の竜たち専用の記憶装置と情報処理機構を取り付ける……
竜たちを悪魔の樹の拘束から開放するもの……。`)

    Face('char05')
    Emoji()
    /** 
     *いいことづくめじゃないっすか！
      それなら、初めから全部公開して、そのミーミルとかを付けられる準備をすればよかったっすのに！ */
    await Content(`いいことづくめじゃないっすか！
それなら、初めから全部公開して、そのミーミルとかを付けられる準備をすればよかったっすのに！`)


    Face('char30')
    /**
     *……だが、私たちの先祖は恐れてしまった。
      そうしてしまえば、竜は造られし生き物としてのレッテルを貼られて生き続け、
      私たち人間は、竜を殺して絶滅させた者としての業を背負い続けることになる…。
     */
    await Content(`……だが、私たちの先祖は恐れてしまった。
そうしてしまえば、竜は造られし生き物としてのレッテルを貼られて生き続け、
私たち人間は、竜を殺して絶滅させた者としての業を背負い続けることになる…。`)

    Face('char04')
    /**
     * う……。
     */
    await Content(`う……。`)

    Face('char30')
    /**
     * だから、私たちは隠すことにした。そして彼らもそれに賛同した。
     */
    await Content(`だから、私たちは隠すことにした。そして彼らもそれに賛同した。`)

    Face('char07')
    /** 
     * あなたたちと……全てを知る者っすね？
     */
    await Content(`あなたたちと……全てを知る者っすね？`)

    Face('char30')
    await Content(`だが、私たちの祖先はそれに納得せず「ミーミル」を開発し、竜たちを
一個の生命として蘇生させることを研究していた。
それを知った彼らは、私たちをこの地へ追いやり、外部との接触を禁じた。
従わなければ、悪魔の樹を破壊して、全ての竜を殺す、と。`)

    Face()
    Emoji(5)
    /** ！？ */
    await Content(`！？`)

    Emoji()
    /**
     *私たちは、仕方なく彼らの要求を呑み、同時にミーミルの研究を進めた。
      彼らには秘密でね。
     */
    await Content(`私たちは、仕方なく彼らの要求を呑み、同時にミーミルの研究を進めた。
彼らには秘密でね。`)

    Face('char04')
    /**
     *…どうして全てを知る者は、竜が生きものとして独立することを
      そんなに嫌がってるんっすかね？
     */
    await Content(`…どうして全てを知る者は、竜が生きものとして独立することを
そんなに嫌がってるんっすかね？`)

    Face('char30')
    /**
     *おそらくは、支配のためだよ。
      竜たちを支配し、操るために。
     */
    await Content(`おそらくは、支配のためだよ。
竜たちを支配し、操るために。`)

    Face('char07')
    /** なんのために！？ */
    await Content(`なんのために！？`)

    Face('char30')
    /**
     *星の海へ、故郷へ、そして……
      いや、これ以上は語らないほうがいいだろう。
      彼らに知られれば、君たちの存在が危うくなる。
     */
    await Content(`星の海へ、故郷へ、そして……
いや、これ以上は語らないほうがいいだろう。
彼らに知られれば、君たちの存在が危うくなる。`)

    Face('char04')
    await Content(`……そうっすね。
じゃ、今回はいったん 戻るっす。`)

    Face('char31')
    await Content(`ああ。また次にでもおいで。
待っているから。`)

    await AllFadeOut();
    await appServ.Wait(3000);
    appServ.saveData.ivent |= EventFlag.水晶ランタンイベント終了;
    return
  }
  //#endregion

  // 我沒任何通關道具！
  throw new Error('本部分還沒做完！')
}