import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import _ from "lodash";
import { ItemID } from "../ItemID";
import { EventFlag } from "../EventFlag";
import { Games08 } from "./Games08";

/** 滅 び の 都 ヒ デ ィ ー ル */
export const Games07 = async (component: DialogueComponent) => {
    const { Back, saveData, ClearContent, SetContentCompleted, AllFadeOut, Emoji, Content, Face, location, router, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

    const { debugMenu, lv } = location.getState() as { event: string, lv: string, debugMenu: boolean };

    const { ivent } = appServ.saveData;

    appServ.setAmbient('snd18')
    console.log(lv)

    //#region 若已被入侵過第二次且非戰鬥完回到這邊，進行最終決戰腳本(games08)
    if (ivent & EventFlag.ハッキング二回目 && !lv) {
        return Games08(component);
    }
    //#endregion

    appServ.setBGM('music28')
    setBG('last')
    setBGOpticity(1);
    await appServ.Wait(3000);
    setDialogOpticity(1);

    if (!(ivent & EventFlag.滅びの都ヒディール)) {
        //#region 初次到訪 PS_OP_Ivent
        Face('char07')
        /**
            滅びの都……。星の海より渡来した者たちの住まった旧文明の墓場…。
            たしかに、ここに 遺跡があることは、以前から知られていたっすが…
            道標はどうして、こんなに人気のない場所を指したんっすかね…。
         */
        await Content(`Scripts.Games07.First.01`)

        Face()
        /** ……おや？ */
        await Content(`Scripts.Games07.First.02`)

        Face(`char31`)
        /** 
            ……君たちは何者かね？  ここは世を捨てた者たちの集まる場所だ。
            すぐに立ち去りなさい……。
         */
        await Content(`Scripts.Games07.First.03`)

        Face('char04')
        /**
            ！！？　こんな所に人が住んでるっすか？　あ…あの… 
            ボクたち、竜死病の治療法を探しにきたっす！ 
            道標に書いてある、この場所に手がかりがあるって……
         */
        await Content(`Scripts.Games07.First.04`)

        Face('char30')
        /* 竜死病……では、その仔竜も…… */
        await Content(`Scripts.Games07.First.05`)

        Face()
        setDragonCG(saveData.cgName)
        setDragonCGOpticity(1)
        /* きゅ？ */
        await Content(`Scripts.Games07.First.06`)

        Face('char30')
        /**
            …なるほど……。よろしい…。
            あのビルの奥に、隠された施設がある。
            私について来なさい……。
         */
        await Content(`Scripts.Games07.First.07`)

        await AllFadeOut();

        setBG('last2')
        await appServ.Wait(1500);
        appServ.setAmbient('snd19')
        appServ.setSE('snd11')

        setBGOpticity(1);
        await appServ.Wait(3000);

        setDialogOpticity(1);

        Face('char01')
        /**
            へぇ…！？
            なんだか、不思議な家っすね……ドアとか、自然と開いちゃうし…
         */
        await Content(`Scripts.Games07.First.08`)

        Face('char30')
        /**
            君たちの持ってきたプレートは、確かに私の祖先が残したものだ……。
            いつか、こんな日が来た時のために。
         */
        await Content(`Scripts.Games07.First.09`)

        Face()
        setDragonCG(saveData.cgName)
        setDragonCGOpticity(1)
        /** じゃあ！ {{my}}達が病気になることって、ずっと昔から分かってた{{go03}}？ */
        await Content(`Scripts.Games07.First.10`)

        Face('char30')
        /**
            ……その通りだ。
            私たちは、それを知りながら、それを公言する事はできなかった。
         */
        await Content(`Scripts.Games07.First.11`)

        Face('char02')
        /**
            どうしてっすか！？
            それが分かっていれば、みんなこんなに苦しまなくってすんだんっすよ！？
         */
        await Content(`Scripts.Games07.First.12`)

        Face('char30')
        /**
            「全てを知る者」との約定……
            そして、今の竜と人との関わりを、乱すことはできなかったのだ……。
         */
        await Content(`Scripts.Games07.First.13`)

        Face('char02')
        /** 約定？  全てを知るもの？ */
        await Content(`Scripts.Games07.First.14`)

        Face()
        Emoji(3)
        /** それってどういうこと！？  病気とどんな関係がある{{go04}}？ */
        await Content(`Scripts.Games07.First.15`)

        Face('char30')
        Emoji()
        /**
            これから私の語ることは、君たちの常識を壊し、今までどおりの生活には
            決して戻れないようにしてしまうものだ。
         */
        await Content(`Scripts.Games07.First.16`)

        Face('char04')
        /** そ、そんな…… */
        await Content(`Scripts.Games07.First.17`)

        Face('char30')
        /** それでも聞きたいかね？ */
        await Content(`Scripts.Games07.First.18`)

        Face()
        Emoji(1)
        /** でも、病気を治すためには……必要なことなの？ */
        await Content(`Scripts.Games07.First.19`)

        Emoji()
        Face('char30')
        /** そうだ。 */
        await Content(`Scripts.Games07.First.20`)

        setDragonCGOpticity(0)
        Face('char02')
        /** ……わかったっす……聞かせてほしいっす。 */
        await Content(`Scripts.Games07.First.21`)

        appServ.BGM?.fade(1, 0, 1000);
        await appServ.Wait(1000)
        appServ.setBGM('music22')
        appServ.setRadialEffect('#000000', true, 10000)

        ClearContent()
        Face('char30')
        /**
            １０００年前、私たちの祖先は、星の海より舞い降り、
            この星に生きていた知的生命体、すなわち「竜」と戦った……。
         */
        await Content(`Scripts.Games07.First.22`)

        Face('char01')
        /**
            知ってるっすよ。その後、生き残った竜と人とは和解して、
            世界は復活したんっすよね。
         */
        await Content(`Scripts.Games07.First.23`)

        Face('char30')
        /**
            いや……人は結局、和解などできはしなかった。
            １０００年前に全ての竜は、我々人間が、星の海より持ち込んできた
            「悪魔の樹」の力によって……滅びてしまった。
         */
        await Content(`Scripts.Games07.First.24`)

        Face()
        setDragonCGOpticity(1)
        Emoji(5)
        /** ……うそっ！　だって{{my}}たち、こうして生きてる{{go01}}。 */
        await Content(`Scripts.Games07.First.25`)

        Face('char30')
        Emoji()
        /**
            ………。
            その後、われわれは失われてしまった命を復活させようと試みた。
            だが、その特異に進化した肉体は、ＤＮＡから組みなおすことを拒んだ。
            複雑に絡み合う塩基配列、『属性』と言う理解困難な要素……
            結局、その複雑な演算処理を……
            コンピュータＧＴＭ、通称「悪魔の樹」に依存することになった。
         */
        await Content(`Scripts.Games07.First.26`)

        Face('char04')
        /**
            ……よく分かんないけど、一つだけ分かったことがあるっす。
            あなたたちは、竜を滅ぼした力で、竜をよみがえらせようとした…
            ってことっすよね？
         */
        await Content(`Scripts.Games07.First.27`)

        Face('char30')
        /**
            ……だが、その存在は、悪魔の樹が常に管制・制御しなくてはならない
            擬似生命体、つまり「かりそめ」の生き物でしかない……。
         */
        await Content(`Scripts.Games07.First.28`)

        Emoji(6)
        Face()
        /** かり、そめ…… */
        await Content(`Scripts.Games07.First.29`)

        Emoji()
        Face('char30')
        /**
            悪魔の樹の持つ力は、確かに強力だ。
            しかし、どこかで必ず破綻が生じることは、竜を蘇生させる計画の発足当時から
            分かっていたことだった。
            我々の祖先は、それを解決する方法を模索していた。
            だが、全ての事実を隠蔽する方向で動いていた一派が、我々の祖先と対立し、
            主導権を勝ち取ってしまった。
         */
        await Content(`Scripts.Games07.First.30`)

        Face('char07')
        /**
            以前{{yourName}}さんにハッキングをかけて脅迫してきたのは、
            そいつらっすね！？
         */
        await Content(`Scripts.Games07.First.31`)

        Face('char30')
        /**
            全てを知る者……彼らは自らをそう名乗り、悪魔の樹に住まって
            世界を監視している。事実に近づく者が現れないように……
         */
        await Content(`Scripts.Games07.First.32`)

        Face('char04')
        /** どうして、どうしてそんなことを！？ */
        await Content(`Scripts.Games07.First.33`)

        Face('char30')
        /** ならば、君達はこの事実を世界に広めたいと、思うかね？ */
        await Content(`Scripts.Games07.First.34`)

        Face('char02')
        /** …………。 */
        await Content(`Scripts.Games07.First.35`)

        Face('char30')
        /** もちろん、彼らが考えているのは、そんなことではないとは思うがね。 */
        await Content(`Scripts.Games07.First.36`)

        Face('char07')
        /** それって、どういう……。 */
        await Content(`Scripts.Games07.First.37`)

        Face('char31')
        /** そんなことより、孤竜の病気を治す方法、だったね。 */
        await Content(`Scripts.Games07.First.38`)

        Face('char07')
        /** ……。 */
        await Content(`Scripts.Games07.First.39`)

        Face('char31')
        /**
            その通りだよ。だが……
            私たちは必要なアイテムについて、直接語ることを禁じられている。
            それが、全てを知る者との約定だからだ。
         */
        await Content(`Scripts.Games07.First.40`)

        Face('char02')
        /** それじゃ、ボク達が探しようがないっすよ！？ */
        await Content(`Scripts.Games07.First.41`)

        Face('char31')
        /** 
            大丈夫だ。ここにくるたびに、君達のアイテムをチェックするから、
            その時に正しいアイテムを持っていれば、教えてあげるよ。
         */
        await Content(`Scripts.Games07.First.42`)

        Face('char07')
        /** ……なんか、すごいこと聞いちゃったっす……。 */
        await Content(`Scripts.Games07.First.43`)

        Emoji(6)
        Face()
        await appServ.Wait(900)
        /** もう、帰ろう？ */
        await Content(`Scripts.Games07.First.44`)

        Emoji()
        Face('char02')
        /** ……そうっすね。ひとまず、帰るっす……。 */
        await Content(`Scripts.Games07.First.45`)

        SetContentCompleted()
        appServ.setRadialEffect()
        await AllFadeOut();
        await appServ.Wait(1500);
        saveData.ivent |= EventFlag.滅びの都ヒディール;
        Back()
        return;
        //#endregion
    }

    if (lv && (ivent & EventFlag.ニステアイベント終了) && (ivent & EventFlag.水晶ランタンイベント終了)) {
        //#region 戰鬥完且帶著lv標籤回到這邊代表打完了！ (PS_OP_End)
        Face('char30')
        /** よく、がんばったね。辛かったろう。 */
        await Content(`Scripts.Games07.END.01`)

        Face('char02')
        /** ……知っていたんすね。 */
        await Content(`Scripts.Games07.END.02`)

        Face('char30')
        /** すまない。我々に出来ることは、君達の無事を祈って見つめること以外なかった。 */
        await Content(`Scripts.Games07.END.03`)

        Face('char02')
        /**
         *いや、いいっすよ。あなた達に何かあったら、それこそ一大事っす。
          ボクたちは自分に出来ることを、精一杯やるだけっすから。
         */
        await Content(`Scripts.Games07.END.04`)

        Face('char30')
        /** ありがとう。それでは早速治療に入ろうか……。 */
        await Content(`Scripts.Games07.END.05`);

        await AllFadeOut()

        appServ.setAmbient('snd19')
        appServ.setSE('snd11')
        setBG('last2')
        setBGOpticity(1)
        setDragonCG(appServ.saveData.cgName)
        await appServ.Wait(3000)

        setDragonCGOpticity(1)
        setDialogOpticity(1)
        /**
         *……。
          まって！
         */
        await Content(`Scripts.Games07.END.06`)

        Face('char01')
        /**
         *どうしたんっす？
          せっかく治るんっすよ？　怖いんっすか？
         */
        await Content(`Scripts.Games07.END.07`)

        Emoji(3)
        Face()
        /** これは……{{my}}にしか使えないもの？ */
        await Content(`Scripts.Games07.END.08`)

        Emoji()
        Face('char31')
        /**
         *……残念ながらね。
          ミーミルは、この二つのアイテムを使ってやっと一竜分にしかならない……。
         */
        await Content(`Scripts.Games07.END.09`)

        Face('char02')
        /**
         *……気持ちはわかるっすが、
          でもまず{{dragonName}} が治ることが先っすよ。
         */
        await Content(`Scripts.Games07.END.10`)

        Face('char31')
        /**
         *それに、このミーミルはまだ不完全だ。
          成功例も数件しかない。
         */
        await Content(`Scripts.Games07.END.11`)

        Face('char07')
        /**
            ……！？
            つまり、この仔に実験台になれ、っていうことっすね？
         */
        await Content(`Scripts.Games07.END.12`)

        Face('char30')
        /**
            成功すれば、生きられる。
            だが、失敗すれば、死ぬ。
         */
        await Content(`Scripts.Games07.END.13`)

        Face('char04')
        /**
            でも…
            でも、このままでも、どちらにせよ死ぬだけっす！
         */
        await Content(`Scripts.Games07.END.14`)

        Emoji(5)
        Face()
        /**
            それに{{my}}がじっけんだいになれば…
            もっと成功するようになる{{go03}}？
         */
        await Content(`Scripts.Games07.END.15`)

        Emoji()
        Face('char02')
        /** ……。 */
        await Content(`……。`)

        Face('char31')
        /**
            ……それでは、行こうか。
            ああ、君はそこで待っていてくれないかな。
            それに、里親のモジュールも外してほしい。
            彼らが、それを通してモニターしているから。
         */
        await Content(`Scripts.Games07.END.17`)

        Face('char01')
        /**
            ……わ、分かったっす。
            んじゃ、{{yourName}} さん、行こうっす。
         */
        await Content(`Scripts.Games07.END.18`)
        SetContentCompleted();
        await AllFadeOut();

        await appServ.Wait(3000);
        router.navigate(['/game/dialogue'],
            {
                onSameUrlNavigation: 'reload',
                state: { event: 'Ending2', debugMenu }
            })
        return
        //#endregion
    }

    if (appServ.saveData.item[ItemID.ニステアの滴] && !(ivent & EventFlag.ニステアイベント終了)) {
        //#region 持有ニステアの滴但還沒鑑定過 (PS_OP_Ivent2)
        Face('char07')
        /** どうもっす。今日持ってきたアイテムの中に、あるっすかね？ */
        await Content(`Scripts.Games07.Event2.01`)

        Face('char31')
        /** ……ああ、これだよ。キミが持っている、これが材料の一つだ。 */
        await Content(`Scripts.Games07.Event2.02`)

        Face('char01')
        /** それって…「ニステアの滴」じゃないっすか！？ */
        await Content(`Scripts.Games07.Event2.03`)

        Face('char31')
        /**
            ニステアは悪魔の樹ほどではないが、膨大な量の情報体を収めることができる、
            高性能の情報集積回路に転用可能なものなのだよ。
         */
        await Content(`Scripts.Games07.Event2.04`)

        Face('char02')
        /** うう～……よくわからないっす。そもそも竜死病って、何なんっすか？ */
        await Content(`Scripts.Games07.Event2.05`)

        Face('char31')
        /**
            簡単に言えば、孤竜と里親を結ぶのに用いるインターフェイスユニットを
            考えてもらえばいい。君たちの見ている孤竜は、いわば「モニター」にあたる。
            だが、その本体はべつにある。つまりハニカムホログラフィックスメモリー、
            いわゆる記憶装置だ。それにあたるものが『悪魔の樹』なのだよ。
         */
        await Content(`Scripts.Games07.Event2.06`)

        Face('char02')
        /** でも……竜たちには触れらるし、ご飯も食べるんっすよ？ */
        await Content(`Scripts.Games07.Event2.07`)

        Face('char31')
        /** 
            それについては、難しい概念なので説明はしにくいが……
            とにかく悪魔の樹は、高度な情報集積回路であるのと同時に、
            竜たちの存在を維持する、第二の脳、第二の心臓ともいえるものなのだよ。
         */
        await Content(`Scripts.Games07.Event2.08`)

        Face('char02')
        /** ……竜死病は、その悪魔の樹の異常が原因なんっすか！？ */
        await Content(`Scripts.Games07.Event2.09`)

        Face('char31')
        /** 
            そうだよ。
            プログラムのバグか、もしくは竜たちの数が増えすぎたための処理オーバーなのか…
            理由は知るよしもないがね。
         */
        await Content(`Scripts.Games07.Event2.10`)

        Face('char07')
        /** それなら、悪魔の樹を治すとかすればいいんじゃないっすか？ */
        await Content(`Scripts.Games07.Event2.11`)

        Face('char30')
        /** 全てを知る者……、彼らはそれを拒んだよ。 */
        await Content(`Scripts.Games07.Event2.12`)

        Face('char07')
        /** どうして……そいつらは、何もしないんっすか！？ */
        await Content(`Scripts.Games07.Event2.13`)

        Face('char30')
        /** 事実を隠しておきたい……世界の平穏のために、だそうだ。 */
        await Content(`Scripts.Games07.Event2.14`)

        Face('char01')
        /** でも、それだけが理由じゃ、ないんっすよね？ */
        await Content(`Scripts.Games07.Event2.15`)

        Face('char30')
        /** おそらくはね……。 */
        await Content(`Scripts.Games07.Event2.16`)

        Face('char31')
        /**
            さあ、長話をしてしまった。いったん戻りなさい。
            彼らは君たちがここに滞在しすぎることを嫌い、恐れているのだから。
         */
        await Content(`Scripts.Games07.Event2.17`)

        Face('char01')
        /** 恐れて……いる？ */
        await Content(`Scripts.Games07.Event2.18`)

        await AllFadeOut();
        await appServ.Wait(1500);
        appServ.saveData.ivent |= EventFlag.ニステアイベント終了;
        Back();

        return
        //#endregion
    }

    if (appServ.saveData.item[ItemID.水晶ランタン] && !(ivent & EventFlag.水晶ランタンイベント終了)) {
        //#region 持有水晶ランタン但還沒鑑定過 (PS_OP_Ivent1)
        Face('char07')
        /**
         * どうもっす。アイテムの鑑定 お願いするっす！
         */
        await Content('Scripts.Games07.Event1.01')

        Face('char31')
        /**
         *……ああ、よく見つけてきたね。
          現在手にしている『水晶ランタン』これが、その一つだよ。
         */
        await Content(`Scripts.Games07.Event1.02`)

        Face('char01')
        /**
         * これが……っすか？　たしかにきれいで便利なものっすが……。
         */
        await Content(`Scripts.Games07.Event1.03`)

        Face('char31')
        /**
         *これは星の船に使われていた、極小のモノポールジェネレータなのさ。
          これによって「ミーミル」に使用する膨大な電力が、まかなえるようになるんだ。
         */
        await Content(`Scripts.Games07.Event1.04`)

        Face('')
        setDragonCG(appServ.saveData.cgName)
        setDragonCGOpticity(1)
        /**
         * ものー……もーじぇ？　みーみる！？
         */
        await Content(`Scripts.Games07.Event1.05`)

        Face('char31')
        /** 『高密度情報集積管理機構・ミーミル』それが「万能薬」と伝承されたものの正体さ。 */
        await Content(`Scripts.Games07.Event1.06`)

        Face('char02')
        /**
         *う、うう～……。
          もっと簡単に言ってほしいっすぅ～。
         */
        await Content(`Scripts.Games07.Event1.07`)

        Face('char31')
        /**
         *ははは。すまないね。
          どうしても科学者というものは、難しい物言いをしてしまうようだ。
          まぁ、要するに「ミーミル」というのは、竜たちに個別の「悪魔の樹」をつけることなんだ。
         */
        await Content(`Scripts.Games07.Event1.08`)

        Face('char09')
        Emoji(5)
        /**
         *えええええっ！！？？
          だって、そんなことしたら！！
         */
        await Content(`Scripts.Games07.Event1.09`)

        Emoji()
        Face('char32')
        /**
         *おいおい。
          悪魔の樹、と言ったのは、その性質をもっとも表現しやすかったからで、
          悪魔の樹とは姿も形も全く別のものだよ。
         */
        await Content(`Scripts.Games07.Event1.10`)

        Face('char02')
        /** どういうことっすか？ */
        await Content(`Scripts.Games07.Event1.11`)

        Face('char31')
        /**
         *竜たちの体を維持する目的で悪魔の樹が使われていることは知っているね？
          そして、それは破綻をきたし、「竜死病」というかたちで
          再び竜を絶滅に追いやろうとしている……。
         */
        await Content(`Scripts.Games07.Event1.12`)

        Face('char01')
        /** で、ボクたちはそれを治す万能薬を探してきた……。 */
        await Content(`Scripts.Games07.Event1.13`)

        Face('char31')
        /**
         *しかし、この病気は従来のものとは違い、かりそめの体に処置を施しても無駄だ。
          第二の体ともいえる悪魔の樹が狂いだしているのだから。
          いわば、体そのものが病原体と言ってもいい。
         */
        await Content(`Scripts.Games07.Event1.14`)

        Face('char04')
        /** それじゃ……どうしようもないっすよ。 */
        await Content(`Scripts.Games07.Event1.15`)

        Face('char31')
        Emoji(3)
        /**
         *そこで「ミーミル」が考案されたのさ。
          竜たちの体を構成する基本パターンを悪魔の樹から収集した後、
          それをもとに個々の竜たち専用の記憶装置と情報処理機構を取り付ける……
          竜たちを悪魔の樹の拘束から開放するもの……。
         */
        await Content(`Scripts.Games07.Event1.16`)

        Face('char05')
        Emoji()
        /** 
         *いいことづくめじゃないっすか！
          それなら、初めから全部公開して、そのミーミルとかを付けられる準備をすればよかったっすのに！ */
        await Content(`Scripts.Games07.Event1.17`)

        Face('char30')
        /**
         *……だが、私たちの先祖は恐れてしまった。
          そうしてしまえば、竜は造られし生き物としてのレッテルを貼られて生き続け、
          私たち人間は、竜を殺して絶滅させた者としての業を背負い続けることになる…。
         */
        await Content(`Scripts.Games07.Event1.18`)

        Face('char04')
        /**
         * う……。
         */
        await Content(`Scripts.Games07.Event1.19`)

        Face('char30')
        /**
         * だから、私たちは隠すことにした。そして彼らもそれに賛同した。
         */
        await Content(`Scripts.Games07.Event1.20`)

        Face('char07')
        /** 
         * あなたたちと……全てを知る者っすね？
         */
        await Content(`Scripts.Games07.Event1.21`)

        Face('char30')
        /**
            だが、私たちの祖先はそれに納得せず「ミーミル」を開発し、竜たちを
            一個の生命として蘇生させることを研究していた。
            それを知った彼らは、私たちをこの地へ追いやり、外部との接触を禁じた。
            従わなければ、悪魔の樹を破壊して、全ての竜を殺す、と。
         */
        await Content(`Scripts.Games07.Event1.22`)

        Face()
        Emoji(5)
        /** ！？ */
        await Content(`Scripts.Games07.Event1.23`)

        Emoji()
        /**
         *私たちは、仕方なく彼らの要求を呑み、同時にミーミルの研究を進めた。
          彼らには秘密でね。
         */
        await Content(`Scripts.Games07.Event1.24`)

        Face('char04')
        /**
         *…どうして全てを知る者は、竜が生きものとして独立することを
          そんなに嫌がってるんっすかね？
         */
        await Content(`Scripts.Games07.Event1.25`)

        Face('char30')
        /**
         *おそらくは、支配のためだよ。
          竜たちを支配し、操るために。
         */
        await Content(`Scripts.Games07.Event1.26`)

        Face('char07')
        /** なんのために！？ */
        await Content(`Scripts.Games07.Event1.27`)

        Face('char30')
        /**
         *星の海へ、故郷へ、そして……
          いや、これ以上は語らないほうがいいだろう。
          彼らに知られれば、君たちの存在が危うくなる。
         */
        await Content(`Scripts.Games07.Event1.28`)

        Face('char04')
        /**
            ……そうっすね。
            じゃ、今回はいったん 戻るっす。
         */
        await Content(`Scripts.Games07.Event1.29`)

        /**
            ああ。また次にでもおいで。
            待っているから。
         */
        Face('char31')
        await Content(`Scripts.Games07.Event1.30`)

        await AllFadeOut();
        await appServ.Wait(1500);
        appServ.saveData.ivent |= EventFlag.水晶ランタンイベント終了;
        Back();
        return
        //#endregion 
    }

    if (!appServ.saveData.item[ItemID.水晶ランタン] && !(ivent & EventFlag.ニステアイベント終了)) {
        //#region ランタンのヒント　メッセージ表示ルーチン PS_OP_Help2

        Face('char07')
        /* どうもっす。アイテムの鑑定、してもらえるっすか？*/
        await Content(`Scripts.Games07.Help2.01`)

        Face('char31')
        /** 今のところ、該当するのはニステアだけだね。 */
        await Content(`Scripts.Games07.Help2.02`)

        Face('char02')
        /** そうっすか……。すまないっすが、もう少し情報をもらえないっすか？ */
        await Content(`Scripts.Games07.Help2.03`)

        Face('char31')
        /** それを語ることは禁じられているんだ。すまないね。 */
        await Content(`Scripts.Games07.Help2.04`)

        Face('char02')
        /** うう～…… */
        await Content(`Scripts.Games07.Help2.05`)

        Face('char31')
        /**
            光だ。
            四神獣の光を求めたまえ。
         */
        await Content(`Scripts.Games07.Help2.06`)

        Face('char01')
        /**
            ほぇ？
            そ、それって……。
         */
        await Content(`Scripts.Games07.Help2.07`)

        Face('char31')
        /**
            「消えることなき属性神の光」、それだけしか言えない……。
            辛いだろうが、がんばってくれたまえ。
         */
        await Content(`Scripts.Games07.Help2.08`)

        Face('char08')
        /** はいっす。 */
        await Content(`Scripts.Games07.Help2.09`)

        await AllFadeOut();
        await appServ.Wait(1500);
        Back();
        return;
        //#endregion
    }
    //#region PS_OP_Help1
    // 我沒任何通關道具！（或已有水晶ランタン但無ニステアの滴）
    Face('char07')
    /** どうもっす。アイテムの鑑定、してもらえるっすか？ */
    await Content(`Scripts.Games07.Help1.01`)

    Face('char31')
    /** ……残念なことだが、新しく該当するようなアイテムは手に入れていないようだ。 */
    await Content(`Scripts.Games07.Help1.02`)

    Face('char02')
    /** ……そうっすか……。 */
    await Content(`Scripts.Games07.Help1.03`)

    Face('char31')
    /**
        ………。
        一つだけ、ヒントを教えてあげよう。
        「涙を探しなさい。」
     */
    await Content(`Scripts.Games07.Help1.04`)

    Face('char01')
    /** へ！？　な、涙！？ */
    await Content(`Scripts.Games07.Help1.05`)

    Face('char31')
    /**
        どこかにあるはずだ。暗く深い世界に閉ざされて、一粒の涙が……。
        私に言えることはそれだけだ。
     */
    await Content(`Scripts.Games07.Help1.06`)

    Face('char08')
    /** あ、ありがとうっす。 */
    await Content(`Scripts.Games07.Help1.07`)

    await AllFadeOut();
    await appServ.Wait(1500);
    Back();
    //#endregion
}