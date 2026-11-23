import { Howler, Howl } from "howler"
const BGMBase = '/assets/audio/bgm/'
const SEBase = '/assets/audio/se/'

Howler.volume(0.5);

export const HowlAudio: {
  BGM: { [musicKey: string]: Howl },
  SE: { [musicKey: string]: Howl }
} = {
  BGM: {
    music01: new Howl({ src: [BGMBase + 'music01.mp3'], preload: false, loop: true }),
    music02: new Howl({ src: [BGMBase + 'music02.mp3'], preload: false, loop: true }),
    // music03: new Howl({ src: [BGMBase + 'music03.mp3'], preload: false, loop: true }),
    /** jazz (資金調度) */
    music04: new Howl({ src: [BGMBase + 'music04.mp3'], preload: false, loop: true }),
    /** 粉雪 */
    music05: new Howl({ src: [BGMBase + 'music05.mp3'], preload: false, loop: true }),
    /** (進度51 - 遠足取消) */
    music07: new Howl({ src: [BGMBase + 'music07.mp3'], preload: false, loop: true }),
    /** 一般戰鬥 */
    music08: new Howl({ src: [BGMBase + 'music08.mp3'], preload: false, loop: true }),
    /** 戰鬥失敗 */
    music09: new Howl({ src: [BGMBase + 'music09.mp3'], preload: false, loop: true }),
    /** 高昂時 / ねこイベント */
    music11: new Howl({ src: [BGMBase + 'music11.mp3'], preload: false, loop: true }),
    /** 龍死病發現 / 檢診失敗 */
    music12: new Howl({ src: [BGMBase + 'music12.mp3'], preload: false, loop: true }),
    /** 命ゆくもの、星にくるもの */
    music13: new Howl({ src: [BGMBase + 'music13.mp3'], preload: false, loop: true }),
    /** ドラゴンの古代遺跡イベント / cave00 */
    music15: new Howl({ src: [BGMBase + 'music15.mp3'], preload: false, loop: true }),
    /** cave01 */
    music16: new Howl({ src: [BGMBase + 'music16.mp3'], preload: false, loop: true }),
    /** cave02 */
    music17: new Howl({ src: [BGMBase + 'music17.mp3'], preload: false, loop: true }),
    /** アツィルトの森 */
    music18: new Howl({ src: [BGMBase + 'music18.mp3'], preload: false, loop: true }),
    /** 発作、ハッキング */
    music19: new Howl({ src: [BGMBase + 'music19.mp3'], preload: false, loop: true }),
    /** 蒼い夜半 */
    music20: new Howl({ src: [BGMBase + 'music20.mp3'], preload: false, loop: true }),
    /** 春の向日葵 */
    music21: new Howl({ src: [BGMBase + 'music21.mp3'], preload: false, loop: true }),
    /** victim */
    music22: new Howl({ src: [BGMBase + 'music22.mp3'], preload: false, loop: true }),
    /** 最期 */
    music23: new Howl({ src: [BGMBase + 'music23.mp3'], preload: false, loop: true }),
    /** 研究者的小屋小遊戲 */
    music24: new Howl({ src: [BGMBase + 'music24.mp3'], preload: false, loop: true }),
    /** 神廟 / 幻 の 浮 島 ラ グ ナ ル ク ス */
    music25: new Howl({ src: [BGMBase + 'music25.mp3'], preload: false, loop: true }),
    /** battle02 / 一般劇情戰鬥 */
    music26: new Howl({ src: [BGMBase + 'music26.mp3'], preload: false, loop: true }),
    /** battle01/ 幻 の 浮 島 ラ グ ナ ル ク ス 戰鬥 */
    music27: new Howl({ src: [BGMBase + 'music27.mp3'], preload: false, loop: true }),
    /** victim2 / BadEnding曲 / 劇情講解龍死病曲 */
    music28: new Howl({ src: [BGMBase + 'music28.mp3'], preload: false, loop: true }),
    /**「桜舞風」*/
    music29: new Howl({ src: [BGMBase + 'music29.mp3'], preload: false, loop: true }),
    /** 神廟戰鬥 */
    music30: new Howl({ src: [BGMBase + 'music30.mp3'], preload: false, loop: true }),
    /** 對戰選擇BGM */
    music31: new Howl({ src: [BGMBase + 'music31.mp3'], preload: false, loop: true }),
    /** 最終戰 vs region前 */
    music32: new Howl({ src: [BGMBase + 'music32.mp3'], preload: false, loop: true }),
    /**「踊れ我が手で」最終BOSS & 老爸戰鬥 */
    music33: new Howl({ src: [BGMBase + 'music33.mp3'], preload: false, loop: true }),
    /** ウリア大砂漠地帯 (after) */
    music34: new Howl({ src: [BGMBase + 'music34.mp3'], preload: false, loop: true }),
    /** ウリア大砂漠地帯 */
    music35: new Howl({ src: [BGMBase + 'music35.mp3'], preload: false, loop: true })
  },
  
  SE: {

    //snd01: new Howl({ src: [SEBase + 'snd01.wav'] }),
    //snd02: new Howl({ src: [SEBase + 'snd02.wav'] }),

    // 環境音：サラ平原 
    //snd03: new Howl({ src: [SEBase + 'snd03.mp3'] }),
    snd04: new Howl({ src: [SEBase + 'snd04.wav'] }),

    // 入侵者音效！
    snd05: new Howl({ src: [SEBase + 'snd05.wav'] }),
    //snd06: new Howl({ src: [SEBase + 'snd06.mp3'] }),
    //snd07: new Howl({ src: [SEBase + 'snd07.wav'] }),

    // 回復音效 //
    //snd08: new Howl({ src: [SEBase + 'snd08.mp3'] }),

    // 寶箱開啟音效 
    //snd09: new Howl({ src: [SEBase + 'snd09.wav'] }),

    // 選取音效 
    //snd10: new Howl({ src: [SEBase + 'snd10.wav'] }),

    // 走路音效 
    //snd11: new Howl({ src: [SEBase + 'snd11.wav'] }),

    // 通信機錯誤音效 
    //snd12: new Howl({ src: [SEBase + 'snd12.wav'] }),

    // 拉霸音效 
    //snd13: new Howl({ src: [SEBase + 'snd13.wav'] }),

    // 失敗 / 禁止 音效 
    //snd14: new Howl({ src: [SEBase + 'snd14.wav'] }),

    // 成功 / 解鎖 音效 
    //snd15: new Howl({ src: [SEBase + 'snd15.mp3'] }),

    // 環境音：海浪聲（預設） 
    //snd16: new Howl({ src: [SEBase + 'snd16New.mp3'], loop: true }),

    // 環境音：森林（トピリアの森） 
    //snd17: new Howl({ src: [SEBase + 'snd17.mp3'], loop: true }),

    // 環境音：風聲（神獸廟） 
    //snd18: new Howl({ src: [SEBase + 'snd18.mp3'], loop: true }),

    // 環境音：實驗室 
    //snd19: new Howl({ src: [SEBase + 'snd19.mp3'], loop: true }),

    // 地震
    //snd20: new Howl({ src: [SEBase + 'snd20.mp3'], loop: true }),

    // 殺掉
    //snd21: new Howl({ src: [SEBase + 'snd21.mp3'] }),

    // 新Re加入：戰鬥護盾Buff 
    //sndCounter: new Howl({ src: [SEBase + 'sndCounter.mp3'] })
  }
    
}

export const SESprite = new Howl({
  src: '/assets/audio/SESprite.mp3',
  preload: true,
  sprite: {

    snd01: [0, 172],
    snd02: [500, 215],

    /* 環境音：サラ平原 */
    snd03: [1000, 2669, true],
    /** 通信機聲音 */
    snd04: [4000, 166, true],
    /** 通信機聲音 */
    'empty': [0, 1],

    /* 入侵者音效！*/
    snd05: [4500, 734, true],
    /** 歡迎使用！ */
    snd06: [5500, 4653],
    snd07: [10500, 164],

    /** 回復音效 */
    snd08: [11000, 1013],

    /** 寶箱開啟音效 */
    snd09: [12500, 207],

    /** 選取音效 */
    snd10: [13000, 71],

    /** 走路音效 */
    snd11: [13500, 231],

    /** 通信機錯誤音效 */
    snd12: [14000, 524],

    /** 拉霸音效 */
    snd13: [15000, 33],

    /** 失敗 / 禁止 音效 */
    snd14: [15500, 116],

    /** 成功 / 解鎖 音效 */
    snd15: [16000, 1229],

    /** 環境音：海浪聲（預設） */
    snd16: [17500, 39525, true],

    /** 環境音：森林（トピリアの森） */
    snd17: [57500, 3267, true],

    /** 環境音：風聲（神獸廟）/ 沙漠 */
    snd18: [61000, 6989, true],

    /** 環境音：實驗室 */
    snd19: [68500, 3633, true],

    // 地震
    snd20: [72500, 3452, true],

    // 殺掉
    snd21: [76500, 2407],

    /** 新Re加入：戰鬥護盾Buff */
    sndCounter: [79500, 1111],
  }

})
