export enum EventFlag {
    /** 1: 音樂選項是否開啟 */
    開啟音樂 = 0B0000000000000001,
    /** 2: 孤龍寄養 */
    孤龍寄養 = 0B0000000000000010,
    /** 4: 該次(visit)的後續事件（如問答） */
    回答事件 = 0B0000000000000100,
    /** 8: 開啟時為メス（雌性） 否則為オス（雄性*/
    性別 = 0B0000000000001000,
    /** 16: 有取得給貓咪的草 */
    貓咪飼料草 = 0B0000000000010000,
    /** 32: 貓事件主線 */
    貓事件 = 0B0000000000100000,
    /** 64: 貓事件失敗 (進行度44) */
    貓事件失敗 = 0B0000000001000000,
    /** 256: Game Clear */
    周目通關 = 0B0000000100000000,
    /** 1024: 獲得通關道具後的侵入事件(第二次警告) */
    _1024 = 0B000010000000000,
    /** 2048: 期間限定事件（聖誕節和新年） */
    期間限定 = 0B0000100000000000,
    _8192 =  0B0010000000000000,
    /** 16384: 強制登出遊戲, 通常用於禁止按鍵或登入逾時*/
    強制登出遊戲 = 0B0100000000000000,
    /** 32768: 遊戲登入 */
    遊戲登入 = 0B1000000000000000
}