import { Howler, Howl } from "howler"
const BGMBase = '/assets/audio/bgm/'
const SEBase = '/assets/audio/se/'


Howler.volume(0.5);

Howler.html5PoolSize = 128;

export const HowlAudio: {
  BGM: { [musicKey: string]: Howl },
  SE: { [musicKey: string]: Howl }
} = {
  BGM: {
    music01: new Howl({ src: [BGMBase + 'music01.mp3'], preload: 'metadata', loop: true }),
    music02: new Howl({ src: [BGMBase + 'music02.mp3'], preload: 'metadata', loop: true }),
    music03: new Howl({ src: [BGMBase + 'music03.mp3'], preload: 'metadata', loop: true }),
    music04: new Howl({ src: [BGMBase + 'music04.mp3'], preload: 'metadata', loop: true }),
    music05: new Howl({ src: [BGMBase + 'music05.mp3'], preload: 'metadata', loop: true }),
    music07: new Howl({ src: [BGMBase + 'music07.mp3'], preload: 'metadata', loop: true }),
    music08: new Howl({ src: [BGMBase + 'music08.mp3'], preload: 'metadata', loop: true }),
    music09: new Howl({ src: [BGMBase + 'music09.mp3'], preload: 'metadata', loop: true }),
    music11: new Howl({ src: [BGMBase + 'music11.mp3'], preload: 'metadata', loop: true }),
    music12: new Howl({ src: [BGMBase + 'music12.mp3'], preload: 'metadata', loop: true }),
    music13: new Howl({ src: [BGMBase + 'music13.mp3'], preload: 'metadata', loop: true }),
    music15: new Howl({ src: [BGMBase + 'music15.mp3'], preload: 'metadata', loop: true }),
    music16: new Howl({ src: [BGMBase + 'music16.mp3'], preload: 'metadata', loop: true }),
    music17: new Howl({ src: [BGMBase + 'music17.mp3'], preload: 'metadata', loop: true }),
    music18: new Howl({ src: [BGMBase + 'music18.mp3'], preload: 'metadata', loop: true }),
    music19: new Howl({ src: [BGMBase + 'music19.mp3'], preload: 'metadata', loop: true }),
    music20: new Howl({ src: [BGMBase + 'music20.mp3'], preload: 'metadata', loop: true }),
    music21: new Howl({ src: [BGMBase + 'music21.mp3'], preload: 'metadata', loop: true }),
    music22: new Howl({ src: [BGMBase + 'music22.mp3'], preload: 'metadata', loop: true }),
    music23: new Howl({ src: [BGMBase + 'music23.mp3'], preload: 'metadata', loop: true }),
    music24: new Howl({ src: [BGMBase + 'music24.mp3'], preload: 'metadata', loop: true }),
    music25: new Howl({ src: [BGMBase + 'music25.mp3'], preload: 'metadata', loop: true }),
    music26: new Howl({ src: [BGMBase + 'music26.mp3'], preload: 'metadata', loop: true }),
    music27: new Howl({ src: [BGMBase + 'music27.mp3'], preload: 'metadata', loop: true }),
    music28: new Howl({ src: [BGMBase + 'music28.mp3'], preload: 'metadata', loop: true }),
    music29: new Howl({ src: [BGMBase + 'music29.mp3'], preload: 'metadata', loop: true }),
    music30: new Howl({ src: [BGMBase + 'music30.mp3'], preload: 'metadata', loop: true }),
    music32: new Howl({ src: [BGMBase + 'music32.mp3'], preload: 'metadata', loop: true }),
    music33: new Howl({ src: [BGMBase + 'music33.mp3'], preload: 'metadata', loop: true }),
    music34: new Howl({ src: [BGMBase + 'music34.mp3'], preload: 'metadata', loop: true }),
    music35: new Howl({ src: [BGMBase + 'music35.mp3'], preload: 'metadata', loop: true })
  },
  SE: {
    snd01: new Howl({ src: [SEBase + 'snd01.wav'] }),
    snd02: new Howl({ src: [SEBase + 'snd02.wav'] }),

    /* 環境音：サラ平原 */
    snd03: new Howl({ src: [SEBase + 'snd03.wav'] }),
    snd04: new Howl({ src: [SEBase + 'snd04.wav'] }),

    /* 入侵者音效！*/
    snd05: new Howl({ src: [SEBase + 'snd05.wav'] }),
    snd06: new Howl({ src: [SEBase + 'snd06.mp3'] }),
    snd07: new Howl({ src: [SEBase + 'snd07.wav'] }),
    /** 回復音效 */
    snd08: new Howl({ src: [SEBase + 'snd08.wav'] }),

    /** 寶箱開啟音效 */
    snd09: new Howl({ src: [SEBase + 'snd09.wav'] }),

    /** 選取音效 */
    snd10: new Howl({ src: [SEBase + 'snd10.wav'] }),

    /** 走路音效 */
    snd11: new Howl({ src: [SEBase + 'snd11.wav'] }),

    /** 通信機錯誤音效 */
    snd12: new Howl({ src: [SEBase + 'snd12.wav'] }),


    /** 拉霸音效 */
    snd13: new Howl({ src: [SEBase + 'snd13.wav'] }),

    /** 失敗 / 禁止 音效 */
    snd14: new Howl({ src: [SEBase + 'snd14.wav'] }),
    
    /** 成功 / 解鎖 音效 */
    snd15: new Howl({ src: [SEBase + 'snd15.wav'] }),

    /** 環境音：海浪聲（預設） */
    snd16: new Howl({ src: [SEBase + 'snd16New.mp3'] }),

    /** 環境音：森林（トピリアの森） */
    snd17: new Howl({ src: [SEBase + 'snd17.wav'] }),

    /** 環境音：風聲（神獸廟） */
    snd18: new Howl({ src: [SEBase + 'snd18.wav'] }),

    /** 環境音：實驗室 */
    snd19: new Howl({ src: [SEBase + 'snd19.wav'] }),
    // 地震
    snd20: new Howl({ src: [SEBase + 'snd20.wav'] }),
    // 殺掉
    snd21: new Howl({ src: [SEBase + 'snd21.wav'] }),

    /** 新Re加入：戰鬥護盾Buff */
    sndCounter: new Howl({ src: [SEBase + 'sndCounter.mp3'] })
  }
}
