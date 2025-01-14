import { DragonChipFlag } from "../DragonChipFlag";

interface IBattleData {
  dragonName: string;
  yourName: string
  lvOffset: number;
  // 相容舊版
  lv?: number;
  Maxhp: number;
  hp: number;
  at: number;
  df: number;
  speed: number;
  /** 炎 < [50] < 水 */
  element1: number;
  /** 風 < [50] < 地 */
  element2: number;
  magic?: any;
  magicS: any;
  // 有道具時的魔防++
  item: any;
  DragonChip1?: number;
  DragonChip2: number;
  btlid?: string;
  battlePower?: number;
}

const BattleData: { [key: string]: IBattleData } = {
  '-last': {
    yourName: '-last',
    dragonName: 'シュブニグラス',
    lvOffset: 1600,
    Maxhp: 1270,
    hp: 1270,
    at: 325,
    df: 31,
    speed: 444,
    element1: 99999999,
    element2: 99999999,
    magic: 1 + 2 + 4 + 8 + 64 + 128 + 2048 + 4096 + 8192 + 16384,
    magicS: 1 + 2 + 4 + 8 + 64 + 128 + 2048 + 4096 + 8192 + 16384,
    item: 'A',
    DragonChip1: -1,
    DragonChip2: -1,
  },
  '-Forest': {
    yourName: '-Forest',
    dragonName: '精霊獣トピリア',
    lvOffset: 0,
    Maxhp: 220,
    hp: 220,
    at: 152,
    df: 157,
    speed: 154,
    element1: 50,
    element2: 80,
    magic: 0,
    magicS: 0,
    item: 'A',
    DragonChip1: DragonChipFlag.トピリア,
    DragonChip2: DragonChipFlag.トピリア,
  },
  '-iseki': {
    yourName: '-iseki',
    dragonName: '番竜ゾンドドレイク',
    lvOffset: 0,
    Maxhp: 200,
    hp: 200,
    at: 123,
    df: 126,
    speed: 120,
    element1: 30,
    element2: 50,
    magic: 0,
    magicS: 0,
    item: 'A',
    DragonChip1: DragonChipFlag.ゾンドドレイク,
    DragonChip2: DragonChipFlag.ゾンドドレイク,
  },
  '-rag': {
    yourName: '-rag',
    dragonName: '古代霊ケツァルコアトル',
    lvOffset: 1000,
    Maxhp: 1600,
    hp: 1600,
    at: 525,
    df: 531,
    speed: 544,
    element1: 0,
    element2: 0,
    magic: 131072 + 64 + 512 + 16,
    magicS: 131072 + 64 + 512 + 16,
    item: 'A',
    DragonChip1: DragonChipFlag.ケツァルコアトル,
    DragonChip2: DragonChipFlag.ケツァルコアトル,
  },
  '-koj': {
    yourName: '-koj',
    dragonName: 'ヴァンパネラ',
    lvOffset: 0,
    Maxhp: 250,
    hp: 250,
    at: 210,
    df: 235,
    speed: 210,
    element1: 50,
    element2: 0,
    magic: 0,
    magicS: 0,
    item: 'A',
    DragonChip1: DragonChipFlag.ヴァンパネラ,
    DragonChip2: DragonChipFlag.ヴァンパネラ,
  },
  '-hei': {
    yourName: '-hei',
    dragonName: '管狐',
    lvOffset: 0,
    Maxhp: 270,
    hp: 270,
    at: 239,
    df: 255,
    speed: 248,
    element1: 15,
    element2: 16,
    magic: 0,
    magicS: 0,
    item: 'A',
    DragonChip1: DragonChipFlag.管狐,
    DragonChip2: DragonChipFlag.管狐,
  },
  '-Forest2': {
    yourName: '-Forest2',
    dragonName: 'マンドレイク',
    lvOffset: 0,
    Maxhp: 150,
    hp: 150,
    at: 95,
    df: 90,
    speed: 95,
    element1: 60,
    element2: 50,
    magic: 0,
    magicS: 0,
    item: 'A',
    DragonChip1: DragonChipFlag.マンドレイク,
    DragonChip2: DragonChipFlag.マンドレイク,
  },
  '-boss01': {
    yourName: '-boss01',
    dragonName: '神獣ボルガノドン',
    lvOffset: 0,
    Maxhp: 400,
    hp: 400,
    at: 280,
    df: 200,
    speed: 280,
    element1: 0,
    element2: 50,
    magic: 16384 + 8 + 64,
    magicS: 16384 + 8 + 64,
    item: 'A',
    DragonChip1: DragonChipFlag.ボルガノドン,
    DragonChip2: DragonChipFlag.ボルガノドン,
  },
  '-boss02': {
    yourName: '-boss02',
    dragonName: '神獣パイロヒドラ',
    lvOffset: 0,
    Maxhp: 400,
    hp: 400,
    at: 280,
    df: 200,
    speed: 280,
    element1: 100,
    element2: 50,
    magic: 8192 + 4 + 64,
    magicS: 8192 + 4 + 64,
    item: 'A',
    DragonChip1: DragonChipFlag.パイロヒドラ,
    DragonChip2: DragonChipFlag.パイロヒドラ,
  },
  '-boss03': {
    yourName: '-boss03',
    dragonName: '神獣ギガウインド',
    lvOffset: 0,
    Maxhp: 400,
    hp: 400,
    at: 280,
    df: 170,
    speed: 380,
    element1: 50,
    element2: 0,
    magic: 2048 + 1 + 64,
    magicS: 2048 + 1 + 64,
    item: 'A',
    DragonChip1: DragonChipFlag.ギガウインド,
    DragonChip2: DragonChipFlag.ギガウインド,
  },
  '-boss04': {
    yourName: '-boss04',
    dragonName: '神獣ヘイズロック',
    lvOffset: 0,
    Maxhp: 400,
    hp: 400,
    at: 280,
    df: 200,
    speed: 280,
    element1: 50,
    element2: 100,
    magic: 4096 + 2 + 1024,
    magicS: 4096 + 2 + 1024,
    item: 'A',
    DragonChip1: DragonChipFlag.ヘイズロック,
    DragonChip2: DragonChipFlag.ヘイズロック,
  },
  '-sabaku': {
    yourName: '-sabaku',
    dragonName: 'ベトリブニス',
    lvOffset: 1000,
    Maxhp: 5999,
    hp: 5999,
    at: 1500,
    df: 1500,
    speed: 2100,
    element1: 50,
    element2: 50,
    magic: 256 + 64 + 16,
    magicS: 256 + 64 + 16,
    item: 'A',
    DragonChip1: DragonChipFlag.べトリブニス,
    DragonChip2: DragonChipFlag.べトリブニス,
  }
}

export { BattleData, type IBattleData }