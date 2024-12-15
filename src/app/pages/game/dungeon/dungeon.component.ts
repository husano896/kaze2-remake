import { AppService, RootAnimations } from '@/app/app.service';
import { ItemID } from '@/data/ItemID';
import { DialogueSystem } from '@/entities/DialogueSystem';
import { AfterViewInit, Component, HostListener, Injector, OnDestroy, OnInit, } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, Location } from '@angular/common';
import { SaveData } from '@/entities/SaveData';
import * as _ from 'lodash-es';
import { BioFlag } from '@/data/BioFlag';
import { firstValueFrom } from 'rxjs';

/** 其他龍的名字 */
const DrNam = ["かげまる", "ヒミコ", "タカマガハラ", "カントク", "ミッチャン", "サンペイ", "神威", "狸饂飩", "土竜餅", "影虎", "きよひめ", "おしず", "まさむね", "ごえもん", "りゅういち", "しんげん", "タマ", "ミケ", "ポチ", "アルギズ", "イェーラ", "ハガル", "ケーナズ", "ウル", "フェオ", "テティス", "サテラ", "リベウス", "ジーク", "プラウン", "ライデン", "スルムル", "ダンテ", "ユット", "カイル", "アーティ", "ファウス", "ラムダ", "サヌータ", "ヴィンス"];

/** 玩家開始位置常數 */
const StartPosX = 1;
const StartPosY = 1;

/** 地下城結構 */
interface IDungeonData {
  /** 地圖等級 */
  varMapLv: number,
  /** 原版遊戲中MapNo似乎固定為1 */
  varMapNo: number,
  /** 地圖高度 */
  MazeH: number,
  /** 地圖寬度 */
  MazeW: number
  /** 可取得的道具 */
  varGetItem: ItemID[]
  /** 地圖BGM */
  bgm: string;
  /* 地圖寶箱數量，未指定時為公式Math.round(varMapLv*1.5) */
  treasureCount?: number;
}
/** 面對方向 */
enum DungeonDirection {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3
}

enum DungeonMazeCode {
  Empty = "0",
  Wall = "1",
  Exit = "2",
  Treasure = "3",
  E = "E"
}
/** 地城資料 */
const dungeonData: { [id: string]: IDungeonData } = {
  'lv0': {
    varMapLv: 4,			// イベント用ダンジョン
    varMapNo: 1,
    MazeH: 20,
    MazeW: 20,
    bgm: 'music18',
    treasureCount: 1,
    varGetItem: [ItemID.精竜水]
  },
  'lv1': {
    varMapLv: 1,
    varMapNo: 1,
    MazeH: 9,
    MazeW: 9,
    varGetItem: [ItemID.魔法のクジ, ItemID.万物の素, ItemID.光りキノコ],
    bgm: 'music15'
  },
  'lv2': {
    varMapLv: 2,
    varMapNo: 1,
    MazeH: 15,
    MazeW: 15,
    varGetItem: [ItemID.魔法のクジ, ItemID.万物の素, ItemID.光りキノコ, ItemID.ナーガ草, ItemID.精霊根, ItemID.ユニコーン角],
    bgm: 'music16'
  },
  'lv3': {
    varMapLv: 3,
    varMapNo: 1,
    MazeH: 25,
    MazeW: 25,
    varGetItem: [ItemID.魔法のクジ, ItemID.万物の素, ItemID.光りキノコ, ItemID.精霊根, ItemID.友情の証],
    bgm: 'music17'
  },
  /** 「廃 坑」 跟 「星 降 る 海 底 洞 窟」其實是同一張地圖，只是能進入的時間點不同 */
  'lv4': {
    varMapLv: 4,
    varMapNo: 1,
    MazeH: 20,
    MazeW: 20,
    varGetItem: [ItemID.誇りの賞状, ItemID.生ケーキ, ItemID.友情の証, ItemID.復活の玉, ItemID.召喚の杖],
    bgm: 'music18',
    treasureCount: 1
  },
  /** 「廃 坑」(原版沒有lv5) */
  'lv5': {
    varMapLv: 4,
    varMapNo: 1,
    MazeH: 20,
    MazeW: 20,
    varGetItem: [ItemID.誇りの賞状, ItemID.生ケーキ, ItemID.友情の証, ItemID.復活の玉, ItemID.召喚の杖],
    bgm: 'music16',
    treasureCount: 1
  }
}
@Component({
  selector: 'app-dungeon',
  standalone: true,
  imports: [TranslateModule, RouterModule, CommonModule],
  templateUrl: './dungeon.component.html',
  styleUrl: './dungeon.component.scss'
})
export class DungeonComponent extends DialogueSystem implements OnInit, OnDestroy, AfterViewInit {
  /** 地下城中取得的道具,可被用掉 */
  getItems: ItemID[] = [];
  /** 取得的道具紀錄 */
  getItemsLog: ItemID[] = [];
  /** 地下城中取得的金錢 */
  getMoney: number = 0;

  //#region 地城資料
  mazeH: number = 10;
  mazeW: number = 0;
  dungeon!: IDungeonData;
  mazeData: Array<Array<DungeonMazeCode>> = [];

  miniMapOpen?: boolean;
  //#endregion

  disableAllActions?: boolean;

  //#region 目前玩家狀態

  /** 地圖圖片，橫向排列 */
  mapImages: string[] = [];

  playerX: number = StartPosX;
  playerY: number = StartPosY;

  playerDirection: DungeonDirection = DungeonDirection.Up;
  playerOldDirection: DungeonDirection = DungeonDirection.Up;

  saveDataWhenEnter!: SaveData;

  /** 該回合是否已撿拾過地上的金錢 */
  varShellGet?: boolean;

  /** 沒遇到其他龍的回合數 */
  varDragonCnt: number = 0;

  varPresentItem: number = 0;
  debugMenu?: boolean;

  damageToPlayer: number = 0;
  guestDragon?: SaveData;
  dragonCg?: string;
  //#endregion

  constructor(injector: Injector, private readonly location: Location, private readonly router: Router) {
    super(injector);
  }

  onMiniMapPress($event: Event) {
    if (this.disableAllActions || !this.contentCompleted) {
      return;
    }
    console.log('press')
    this.miniMapOpen = !this.miniMapOpen;
    $event.stopPropagation();
    $event.preventDefault();
  }
  async ngOnInit() {
    const state = this.location.getState() as { lv: string, debugMenu: boolean };
    const dungeon = dungeonData[state.lv];
    this.debugMenu = state.debugMenu;
    if (!dungeon) {
      this.router.navigate(['/'])
      throw new Error('[Dungeon] 未指定lv或地城不存在！');
    }

    // 備份入場前的存檔
    this.saveDataWhenEnter = _.cloneDeep(this.appServ.saveData);
    this.dungeon = dungeon;
    this.mazeW = dungeon.MazeW;
    this.mazeH = dungeon.MazeH;

    this.mazeData = this.CreateMaze(dungeon.MazeW, dungeon.MazeH, dungeon.varMapLv, dungeon.treasureCount || Math.round(dungeon.varMapLv * 1.5));

    //#region 面向決定
    // 初期状態のプレイヤーの向きを決定
    if (this.mazeData[this.playerY - 1][this.playerX] != DungeonMazeCode.Wall)
      this.playerDirection = DungeonDirection.Up;
    if (this.mazeData[this.playerY][this.playerX + 1] != DungeonMazeCode.Wall)
      this.playerDirection = DungeonDirection.Right;
    if (this.mazeData[this.playerY + 1][this.playerX] != DungeonMazeCode.Wall)
      this.playerDirection = DungeonDirection.Down;
    if (this.mazeData[this.playerY][this.playerX - 1] != DungeonMazeCode.Wall)
      this.playerDirection = DungeonDirection.Left;

    this.playerOldDirection = this.playerDirection;
    //#endregion
    this.updateMapImage();
    this.setDialogueSE('')

    //#region debug用
    console.log(this.mazeData.map(r => r.join(' ')).join('\n'));

    const text = {
      [DungeonMazeCode.Empty]: '⬜',
      [DungeonMazeCode.Wall]: '⬛',
      [DungeonMazeCode.Exit]: "🟪",
      [DungeonMazeCode.Treasure]: "🟨",
      [DungeonMazeCode.E]: "⬜"
    }
    console.log
      (this.mazeData.map(r => r.map(c => text[c]).join(' ')).join('\n'));
    //#endregion

    this.skipWait = true;
    this.Content(`Scripts.Dungeon.Enter`)
    // this.SetContentCompleted();

  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.appServ.setBGM(this.dungeon.bgm)

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.appServ.setRadialEffect()
  }
  CreateMaze(mazeW: number, mazeH: number, level: number, treasureCount: number) {
    /** 檢查通過變數 */
    let cnt: number = 0;
    let x: number = 0;
    let y: number = 0;
    let i: number = 0;

    //#region 初始化迷宮矩陣 (MakeMaze)
    /** 原版for迴圈時是用<=，請參找（i<=MazeH, i<） */
    const mazeData = new Array(mazeH + 1)
      .fill(null)
      .map((_, index) => index !== mazeW ? new Array(mazeW + 1)
        .fill(DungeonMazeCode.Wall) :
        new Array(mazeW)
      );
    mazeData[StartPosY][StartPosX] = DungeonMazeCode.Empty;
    //#endregion 

    //#region 開路 不過這三小
    // 一開始禁掉左上的方向
    let MovTop = 0;
    let MovLeft = 0;
    let MovBottom = 1;
    let MovRight = 1;
    let PosX = StartPosX;
    let PosY = StartPosY;

    function NewMovFlag() {
      MovTop = 1;
      MovBottom = 1;
      MovLeft = 1;
      MovRight = 1;
    }

    function MovFlagChk() {
      return (MovTop) || (MovBottom) || (MovLeft) || (MovRight);
    }
    function ReturnPos() {

      let MovY = 0;
      let MovX = 0;
      try {
        mazeData[PosY][PosX] = DungeonMazeCode.E;
        if (PosY + 1 < mazeH && mazeData[PosY + 1][PosX] === DungeonMazeCode.Empty) {
          MovY = 1;
          MovX = 0;
        } else if (PosY - 1 >= 0 && mazeData[PosY - 1][PosX] === DungeonMazeCode.Empty) {
          MovY = -1;
          MovX = 0;
        } else if (PosX + 1 < mazeH && mazeData[PosY][PosX + 1] === DungeonMazeCode.Empty) {
          MovY = 0;
          MovX = 1;
        } else if (PosX - 1 >= 0 && mazeData[PosY][PosX - 1] === DungeonMazeCode.Empty) {
          MovY = 0;
          MovX = -1;
        }
        PosY = PosY + MovY;
        PosX = PosX + MovX;
        mazeData[PosY][PosX] = DungeonMazeCode.E;
        PosY = PosY + MovY;
        PosX = PosX + MovX;
        NewMovFlag();
      } catch (err) {
        console.error(err);
        console.log(PosX, PosY, MovX, MovY, mazeData);
        throw err;

      }
      return;
    }
    /** 檢查該格是否在界線範圍內且為牆壁 */
    function CodeChk(Y: number, X: number) {

      return ((Y >= 1) && (Y <= mazeH - 2) && (X >= 1) && (X <= mazeW - 2)) &&
        mazeData[Y][X] === DungeonMazeCode.Wall
    }
    function DigMaze() {
      var NumTbl: number[] = new Array();
      if (MovTop) {
        NumTbl.push(0);
      }
      if (MovBottom) {
        NumTbl.push(1);
      }
      if (MovLeft) {
        NumTbl.push(2);
      }
      if (MovRight) {
        NumTbl.push(3);
      }
      let Direction = NumTbl[Math.floor(Math.random() * NumTbl.length)];

      switch (Direction) {
        case 0:			// Top
          if (CodeChk(PosY - 2, PosX)) {
            mazeData[PosY - 1][PosX] = DungeonMazeCode.Empty;
            mazeData[PosY - 2][PosX] = DungeonMazeCode.Empty;
            PosY -= 2;
            NewMovFlag();
          } else {
            MovTop = 0;
          }
          break;
        case 1:			// Bottom
          if (CodeChk(PosY + 2, PosX)) {
            mazeData[PosY + 1][PosX] = DungeonMazeCode.Empty;
            mazeData[PosY + 2][PosX] = DungeonMazeCode.Empty;
            PosY += 2;
            NewMovFlag();
          } else {
            MovBottom = 0;
          }
          break;
        case 2:			// Left
          if (CodeChk(PosY, PosX - 2)) {
            mazeData[PosY][PosX - 1] = DungeonMazeCode.Empty;
            mazeData[PosY][PosX - 2] = DungeonMazeCode.Empty;
            PosX -= 2;
            NewMovFlag();
          } else {
            MovLeft = 0;
          }
          break;
        case 3:			// Right
          if (CodeChk(PosY, PosX + 2)) {
            mazeData[PosY][PosX + 1] = DungeonMazeCode.Empty;
            mazeData[PosY][PosX + 2] = DungeonMazeCode.Empty;
            PosX += 2;
            NewMovFlag();
          } else {
            MovRight = 0;
          }
          break;
      }
      return;
    }

    DigMaze();
    while (((PosY != StartPosY) || (PosX != StartPosX))) { // && returnPosTime !== 0
      // 哪都不能挖時
      if (!MovFlagChk()) {
        // 回復上一動
        ReturnPos();
        // returnPosTime--;
      } else {
        // 挖
        DigMaze();
      }
    }
    //#endregion
    console.log('開路完畢', mazeData)

    //#region 生成出口
    // 若該點非牆壁，且該點的周圍是單行道（僅有一條路通到該點），設為終點
    do {
      cnt = 0;
      x = Math.round(Math.random() * (mazeW - 2)) + 1;
      y = Math.round(Math.random() * (mazeH - 2)) + 1;
      if (mazeData[y - 1][x] == DungeonMazeCode.Wall) cnt++;
      if (mazeData[y][x + 1] == DungeonMazeCode.Wall) cnt++;
      if (mazeData[y + 1][x] == DungeonMazeCode.Wall) cnt++;
      if (mazeData[y][x - 1] == DungeonMazeCode.Wall) cnt++;
      if (mazeData[y][x] != DungeonMazeCode.Wall) cnt += 10;
      if ((y == StartPosX) && (x == StartPosY)) cnt = 0;	// スタート位置に出口は作れない
    } while (cnt < 13)
    mazeData[y][x] = DungeonMazeCode.Exit;

    //#region 生成寶箱
    cnt = 0;
    console.log('寶箱放置開始')

    if (treasureCount > 0) {
      do {
        x = Math.round(Math.random() * (mazeW - 2)) + 1;
        y = Math.round(Math.random() * (mazeH - 2)) + 1;
        if ((y != StartPosY) && (x != StartPosX) && (![DungeonMazeCode.Exit, DungeonMazeCode.Wall, DungeonMazeCode.Treasure].includes(mazeData[y][x]))) {
          // 周圍已有寶箱，跳過
          if ((mazeData[y - 1][x] === DungeonMazeCode.Treasure) ||
            (mazeData[y + 1][x] === DungeonMazeCode.Treasure) ||
            (mazeData[y][x + 1] === DungeonMazeCode.Treasure) ||
            (mazeData[y][x - 1] === DungeonMazeCode.Treasure)) {
            continue;
          }
          // 周圍有出口，跳過
          if ((mazeData[y - 1][x] === DungeonMazeCode.Exit) ||
            (mazeData[y + 1][x] === DungeonMazeCode.Exit) ||
            (mazeData[y][x + 1] === DungeonMazeCode.Exit) ||
            (mazeData[y][x - 1] === DungeonMazeCode.Exit)) {
            continue;
          }
          console.log('放置寶箱於', 'y', y, 'x', x)
          mazeData[y][x] = DungeonMazeCode.Treasure;
          cnt++;

          i++;
          // 寶箱嘗試次數過多，且非龍死病專用地城跳過寶箱生成
          if (i > 5900 && level !== 4) cnt = 99;
        }
      } while (treasureCount > cnt)
    }
    //#endregion

    return mazeData;
  }

  //動作區
  async HPRecover() {
    this.disableAllActions = true;
    if (this.recoverItemCount <= 0) {
      await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Caution'),
        this.appServ.t('Scripts.Confirm.Dungeon.RecoverNoItem', {
          varItemName: this.appServ.t(`Data.Item.${ItemID.精霊根}.Title`)
        })
      );
    }
    else if (await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Confirm'),
      this.appServ.t('Scripts.Confirm.Dungeon.RecoverConfirm', {
        varItemName: this.appServ.t(`Data.Item.${ItemID.精霊根}.Title`)
      }), true)) {
      // 若取得道具內有精霊根，先以取得道具使用
      const itemIndex = this.getItems.findIndex(v => v === ItemID.精霊根);
      if (itemIndex !== -1) {
        _.remove(this.getItems, (_, index) => index === itemIndex);
      } else {
        this.appServ.saveData.item[ItemID.精霊根]--
      }

      this.appServ.setSE('snd08')
      const recoverAmount = Math.round((Math.random() * 20) + (this.appServ.saveData.Maxhp / 3));
      this.appServ.saveData.hp = Math.min(this.appServ.saveData.Maxhp, this.appServ.saveData.hp + recoverAmount);
      this.damageToPlayer = -recoverAmount;
      this.appServ.setRadialEffect('#34E034', false, 1000);
      await this.Content(`Scripts.Dungeon.Recover`, {
        varItemName: this.appServ.t(`Data.Item.${ItemID.精霊根}.Title`),
        recoverAmount: String(recoverAmount)
      })
    }

    this.disableAllActions = false;
  }

  async GiveUp() {
    this.disableAllActions = true;
    this.appServ.setSE('snd10')

    if (this.debugMenu) {
      if (!(await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Confirm'), `將退出地下城測試，是否繼續？`, true))) {
        this.disableAllActions = false;
        return;
      }

      this.router.navigate(['/game/debug_dungeon'], { replaceUrl: true })
      this.appServ.saveData.hp = this.appServ.saveData.Maxhp;
      return;
    }
    if (!this.appServ.saveData.item[ItemID.召喚の杖]) {
      await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Caution'),
        this.appServ.t('Scripts.Confirm.Dungeon.GiveUpNoItem', {
          varItemName: this.appServ.t(`Data.Item.${ItemID.召喚の杖}.Title`)
        }));
      this.disableAllActions = false;
      return;
    }

    if (!(await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.Confirm'),
      this.appServ.t('Scripts.Confirm.Dungeon.GiveUpConfirm', {
        varItemName: this.appServ.t(`Data.Item.${ItemID.召喚の杖}.Title`)
      }), true))) {
      this.disableAllActions = false;
      return;
    }
    this.appServ.saveData.hp = this.appServ.saveData.Maxhp;
    this.appServ.saveData.item[ItemID.召喚の杖]--;
    this.router.navigate(['/game/dragongame'], { replaceUrl: true })
  }
  /** 檢查面前的道具 */
  async Check() {
    if (this.disableAllActions) {
      return;
    }

    // 寶箱！
    if (this.mazeData[this.playerY][this.playerX] === DungeonMazeCode.Treasure) {
      this.Content(`Scripts.Dungeon.Check.1`)
      this.appServ.setSE('snd09')
      // 龍死病發作藥優先判定
      if (this.dungeon.varMapLv === 4 && this.appServ.saveData.bio & BioFlag.発作) {
        this.getItems.push(ItemID.精竜水);
        this.getItemsLog.push(ItemID.精竜水)
        await this.Content('Scripts.Dungeon.Check.2.1', {
          varItemName: this.appServ.t(`Data.Item.${ItemID.精竜水}.Title`)
        })
      }
      // 過關道具
      else if (this.dungeon.varMapLv === 4 && !this.appServ.saveData.item[ItemID.ニステアの滴] && !this.getItems.includes(ItemID.ニステアの滴)) {
        this.getItems.push(ItemID.ニステアの滴);
        this.getItemsLog.push(ItemID.ニステアの滴)
        await this.Content('Scripts.Dungeon.Check.2.1', {
          varItemName: this.appServ.t(`Data.Item.${ItemID.ニステアの滴}.Title`)
        })
      }
      // 貓咪先生的財寶！
      else if (this.dungeon.varMapLv === 4 && this.appServ.saveData.numVisits >= 41 && this.appServ.saveData.numVisits <= 44) {
        this.getItems.push(ItemID.ささやかな財宝);
        this.getItemsLog.push(ItemID.ささやかな財宝);
        await this.Content('Scripts.Dungeon.Check.2.1', {
          varItemName: this.appServ.t(`Data.Item.${ItemID.ささやかな財宝}.Title`)
        })
      }
      // 4 / 11 機率獲得金錢
      else if (Math.round(Math.random() * 10) <= 3) {
        const money = Math.round(Math.random() * 40 + 80);
        this.getMoney += money;
        await this.Content('Scripts.Dungeon.Check.2.2', {
          money: String(money)
        })
      }
      // 自目前地下城資料讀取可取得物品選項
      else {
        const itemID: ItemID = this.dungeon.varGetItem[Math.floor((this.dungeon.varGetItem.length - 1) * Math.random() + 1)];
        this.getItems.push(itemID);
        this.getItemsLog.push(itemID);
        await this.Content('Scripts.Dungeon.Check.2.1', {
          varItemName: this.appServ.t(`Data.Item.${itemID}.Title`)
        })
      }

      // 移除寶箱標誌以及重新繪製地圖
      this.mazeData[this.playerY][this.playerX] = DungeonMazeCode.Empty;
      this.updateMapImage();
      return
    }

    if ((this.playerDirection == DungeonDirection.Up) && (this.mazeData[this.playerY - 1][this.playerX] == DungeonMazeCode.Wall)) {
      this.Content(`Scripts.Dungeon.Check.3.1`)
    } else if ((this.playerDirection == DungeonDirection.Right) && (this.mazeData[this.playerY][this.playerX + 1] == DungeonMazeCode.Wall)) {
      this.Content(`Scripts.Dungeon.Check.3.2`)
    } else if ((this.playerDirection == DungeonDirection.Down) && (this.mazeData[this.playerY + 1][this.playerX] == DungeonMazeCode.Wall)) {
      this.Content(`Scripts.Dungeon.Check.3.3`)
    } else if ((this.playerDirection == DungeonDirection.Left) && (this.mazeData[this.playerY][this.playerX - 1] == DungeonMazeCode.Wall)) {
      this.Content(`Scripts.Dungeon.Check.3.4`)
    } else {
      this.Content(`Scripts.Dungeon.Check.3.5`)
    }
    if (this.varShellGet) {
      this.Content(`Scripts.Dungeon.Check.4.1`)
    } else {
      this.varShellGet = true;
      if (Math.round(Math.random() * 10) <= 3) {
        this.Content(`Scripts.Dungeon.Check.4.2`)
        this.getMoney++;
      } else {
        this.Content(`Scripts.Dungeon.Check.4.3`)
      }
    }

  }

  Next(direction: DungeonDirection) {
    if (this.disableAllActions || !this.contentCompleted) {
      return;
    }


    this.damageToPlayer = 0;
    switch (direction) {
      //#region 處理轉向
      case DungeonDirection.Left:
        this.playerDirection--;
        break;
      case DungeonDirection.Right:
        this.playerDirection++;
        break;
      case DungeonDirection.Down:
        this.playerDirection += 2;
        break;
      //#endregion

      //#region 直行
      default: {
        /** 各個轉向的移動變量 */
        const directionMovements = {
          [DungeonDirection.Up]: [0, -1],
          [DungeonDirection.Right]: [1, 0],
          [DungeonDirection.Down]: [0, 1],
          [DungeonDirection.Left]: [-1, 0]
        }
        let [newX, newY] = directionMovements[this.playerDirection];
        newX += this.playerX;
        newY += this.playerY;
        // 界限判定及是否為牆
        if (newX < 1 || newX > this.mazeW - 1 || newY < 1 || newY > this.mazeH - 1 ||
          this.mazeData[newY][newX] === DungeonMazeCode.Wall) {
          this.appServ.setSE('snd14')
          return;
        }
        this.playerX = newX;
        this.playerY = newY;

      }
      //#endregion
    }

    this.playerDirection = (this.playerDirection + 4) % 4;
    this.updateMapImage();
    console.log('newX', this.playerX, 'newY', this.playerY, 'direction', this.playerDirection)
    this.varShellGet = false;
    this.varDragonCnt++;		// 竜一定期間出会わないカウンタ加算
    this.appServ.setSE('snd11')
    this.playerData.hp--;
    if (this.playerData.hp <= this.playerData.Maxhp * 0.2 && this.playerData.hp > 0) {
      // 瀕死警告
      this.appServ.setRadialEffect('#FF343477', true, 1000);
    }
    else {
      this.appServ.setRadialEffect();
    }
    // GAME OVER判定
    if (this.playerData.hp <= 0) {
      this.Death()
      return;
    }
    // 過關判定
    if (this.currentMazeCode === DungeonMazeCode.Exit) {
      this.Clear();
      return;
    }

    // 有寶箱時不做相遇龍處理
    if (this.currentMazeCode === DungeonMazeCode.Treasure) {
      return;
    }
    // 發作及Lv4地城不做相遇龍處理
    if (this.dungeon.varMapLv === 4 || this.appServ.saveData.bio & BioFlag.発作) {
      return;
    }
    if (this.varDragonCnt >= 5 && Math.round(Math.random() * 25) == 1) {
      // 相遇龍處理
      this.DragonCome();
      this.varDragonCnt = 0;
    }
  }

  async Death() {
    this.disableAllActions = true;
    if (this.appServ.saveData.item[ItemID.復活の玉] || this.getItems.includes(ItemID.復活の玉)) {
      // 若取得道具內有復活之玉，先以取得道具使用
      const itemIndex = this.getItems.findIndex(v => v === ItemID.復活の玉);
      if (itemIndex !== -1) {
        _.remove(this.getItems, (_, index) => index === itemIndex);
      } else {
        this.appServ.saveData.item[ItemID.復活の玉]--
      }
      const recoverAmount = Math.round(this.appServ.saveData.Maxhp / 3)
      this.appServ.saveData.hp = recoverAmount;
      this.damageToPlayer = -recoverAmount;
      this.appServ.setSE('snd08')
      this.appServ.setRadialEffect('#34E034', false, 1000);

      await this.appServ.Confirm(
        this.appServ.t('Scripts.Confirm.Title.DungeonRevive'),
        this.appServ.t('Scripts.Confirm.Dungeon.Revive', {
          varItemName: this.appServ.t(`Data.Item.${ItemID.復活の玉}.Title`),
          recoverAmount
        }))
      this.disableAllActions = false;
      return;
    }
    this.appServ.setBGM();
    this.appServ.setSE('snd12');
    this.appServ.setRadialEffect('#000', true, 1000);
    await this.appServ.Confirm(
      this.appServ.t('Scripts.Confirm.Title.DungeonFail'),
      this.appServ.t('Scripts.Confirm.Dungeon.Gameover'))
    return this.router.navigate(['/game/dialogue'], { replaceUrl: true, state: { event: 'Miss' } })
  }
  /** 迷宮通關！ */
  async Clear() {
    this.disableAllActions = true;
    if (!this.getItemsLog.length) {
      await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.DungeonClear'), this.appServ.t('Scripts.Confirm.Dungeon.ClearNoItem'))
    } else {
      await this.appServ.Confirm(this.appServ.t('Scripts.Confirm.Title.DungeonClear'), `
      ${this.getItemsLog.map(id => this.appServ.t(`Data.Item.${id}.Title`)).join('\n')} \n ${this.appServ.t('Scripts.Confirm.Dungeon.ClearItemGet')}`)
    }

    this.appServ.saveData.food += this.getMoney;
    this.getItems.forEach(itemID => this.appServ.saveData.item[itemID]++);
    this.appServ.saveData.hp = this.appServ.saveData.Maxhp;
    if (this.debugMenu) {
      this.router.navigate(['/game/debug_dungeon'], { replaceUrl: true })
    }
    else {
      this.router.navigate(['/game/dragongame'], { replaceUrl: true })
    }
  }

  /** 根據目前場景物件以及面對方向更新地圖圖片 */
  private updateMapImage() {
    let varFil0: string = '';
    let varFil1: string = '';
    let varFil2: string = '';
    let varFil3: string = '';
    let varFil4: string = '';
    switch (this.playerDirection) {
      case DungeonDirection.Up:
        if (this.mazeData[this.playerY - 1][this.playerX] == DungeonMazeCode.Wall) {
          varFil0 = "09";
          varFil1 = "10";
          varFil2 = "11";
          varFil3 = "12";
          varFil4 = "13";
        } else if (this.mazeData[this.playerY - 1][this.playerX] === DungeonMazeCode.Exit) {
          varFil0 = "01";
          varFil4 = "02";
          varFil1 = "03";
          varFil2 = "16";
          varFil3 = "04";
        } else if (this.mazeData[this.playerY - 1][this.playerX] == DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY][this.playerX - 1] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY - 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY - 2][this.playerX] != DungeonMazeCode.Wall) ? "14" : "15";
          varFil3 = (this.mazeData[this.playerY - 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY][this.playerX + 1] != DungeonMazeCode.Wall) ? "20" : "02";
        } else if (this.mazeData[this.playerY][this.playerX] == DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY][this.playerX - 1] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY - 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY - 2][this.playerX] != DungeonMazeCode.Wall) ? "17" : "18";
          varFil3 = (this.mazeData[this.playerY - 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY][this.playerX + 1] != DungeonMazeCode.Wall) ? "20" : "02";
        } else {
          varFil0 = (this.mazeData[this.playerY][this.playerX - 1] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY - 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY - 2][this.playerX] != DungeonMazeCode.Wall) ? "05" : "08";
          varFil3 = (this.mazeData[this.playerY - 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY][this.playerX + 1] != DungeonMazeCode.Wall) ? "20" : "02";
        }
        break;
      case DungeonDirection.Right:
        if (this.mazeData[this.playerY][this.playerX + 1] == DungeonMazeCode.Wall) {
          varFil0 = "09";
          varFil1 = "10";
          varFil2 = "11";
          varFil3 = "12";
          varFil4 = "13";
        } else if (this.mazeData[this.playerY][this.playerX + 1] === DungeonMazeCode.Exit) {
          varFil0 = "01";
          varFil4 = "02";
          varFil1 = "03";
          varFil2 = "16";
          varFil3 = "04";
        } else if (this.mazeData[this.playerY][this.playerX + 1] === DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY - 1][this.playerX] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY - 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY][this.playerX + 2] != DungeonMazeCode.Wall) ? "14" : "15";
          varFil3 = (this.mazeData[this.playerY + 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY + 1][this.playerX] != DungeonMazeCode.Wall) ? "20" : "02";
        } else if (this.mazeData[this.playerY][this.playerX] === DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY - 1][this.playerX] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY - 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY][this.playerX + 2] != DungeonMazeCode.Wall) ? "17" : "18";
          varFil3 = (this.mazeData[this.playerY + 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY + 1][this.playerX] != DungeonMazeCode.Wall) ? "20" : "02";
        } else {
          varFil0 = (this.mazeData[this.playerY - 1][this.playerX] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY - 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY][this.playerX + 2] != DungeonMazeCode.Wall) ? "05" : "08";
          varFil3 = (this.mazeData[this.playerY + 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY + 1][this.playerX] != DungeonMazeCode.Wall) ? "20" : "02";
        }
        break;
      case DungeonDirection.Down:
        if (this.mazeData[this.playerY + 1][this.playerX] == DungeonMazeCode.Wall) {
          varFil0 = "09";
          varFil1 = "10";
          varFil2 = "11";
          varFil3 = "12";
          varFil4 = "13";
        } else if (this.mazeData[this.playerY + 1][this.playerX] === DungeonMazeCode.Exit) {
          varFil0 = "01";
          varFil4 = "02";
          varFil1 = "03";
          varFil2 = "16";
          varFil3 = "04";
        } else if (this.mazeData[this.playerY + 1][this.playerX] === DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY][this.playerX + 1] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY + 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY + 2][this.playerX] != DungeonMazeCode.Wall) ? "14" : "15";
          varFil3 = (this.mazeData[this.playerY + 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY][this.playerX - 1] != DungeonMazeCode.Wall) ? "20" : "02";
        } else if (this.mazeData[this.playerY][this.playerX] === DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY][this.playerX + 1] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY + 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY + 2][this.playerX] != DungeonMazeCode.Wall) ? "17" : "18";
          varFil3 = (this.mazeData[this.playerY + 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY][this.playerX - 1] != DungeonMazeCode.Wall) ? "20" : "02";
        } else {
          varFil0 = (this.mazeData[this.playerY][this.playerX + 1] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY + 1][this.playerX + 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY + 2][this.playerX] != DungeonMazeCode.Wall) ? "05" : "08";
          varFil3 = (this.mazeData[this.playerY + 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY][this.playerX - 1] != DungeonMazeCode.Wall) ? "20" : "02";
        }
        break;
      case DungeonDirection.Left:
        if (this.mazeData[this.playerY][this.playerX - 1] === DungeonMazeCode.Wall) {
          varFil0 = "09";
          varFil1 = "10";
          varFil2 = "11";
          varFil3 = "12";
          varFil4 = "13";
        } else if (this.mazeData[this.playerY][this.playerX - 1] === DungeonMazeCode.Exit) {
          varFil0 = "01";
          varFil4 = "02";
          varFil1 = "03";
          varFil2 = "16";
          varFil3 = "04";
        } else if (this.mazeData[this.playerY][this.playerX - 1] === DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY + 1][this.playerX] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY + 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY][this.playerX - 2] != DungeonMazeCode.Wall) ? "14" : "15";
          varFil3 = (this.mazeData[this.playerY - 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY - 1][this.playerX] != DungeonMazeCode.Wall) ? "20" : "02";
        } else if (this.mazeData[this.playerY][this.playerX] === DungeonMazeCode.Treasure) {
          varFil0 = (this.mazeData[this.playerY + 1][this.playerX] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY + 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY][this.playerX - 2] != DungeonMazeCode.Wall) ? "17" : "18";
          varFil3 = (this.mazeData[this.playerY - 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY - 1][this.playerX] != DungeonMazeCode.Wall) ? "20" : "02";
        } else {
          varFil0 = (this.mazeData[this.playerY + 1][this.playerX] != DungeonMazeCode.Wall) ? "19" : "01";
          varFil1 = (this.mazeData[this.playerY + 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "06" : "03";
          varFil2 = (this.mazeData[this.playerY][this.playerX - 2] != DungeonMazeCode.Wall) ? "05" : "08";
          varFil3 = (this.mazeData[this.playerY - 1][this.playerX - 1] != DungeonMazeCode.Wall) ? "07" : "04";
          varFil4 = (this.mazeData[this.playerY - 1][this.playerX] != DungeonMazeCode.Wall) ? "20" : "02";
        }
        break;
    }


    if (this.mazeData[this.playerY][this.playerX] === DungeonMazeCode.Exit) {
      varFil0 = "21";
      varFil4 = "21";
      varFil1 = "22";
      varFil3 = "22";
      varFil2 = "23";
    }
    this.mapImages = [varFil0, varFil1, varFil2, varFil3, varFil4]
  }

  private async DragonCome() {
    this.disableAllActions = true;

    //#region 測定其他龍的資料
    const guestDragon = new SaveData();
    guestDragon.Maxhp = Math.round(Math.random() * this.playerData.hp + 50);
    guestDragon.hp = guestDragon.Maxhp;
    guestDragon.at = Math.round(Math.random() * this.playerData.at + 50);
    guestDragon.df = Math.round(Math.random() * this.playerData.df + 50);
    guestDragon.speed = Math.round(Math.random() * this.playerData.speed + 50);
    guestDragon.element1 = Math.round(Math.random() * 100);
    guestDragon.element2 = Math.round(Math.random() * 100);
    guestDragon.dragonName = _.sample(DrNam) || '';
    guestDragon.PS_RyuCG();
    this.guestDragon = guestDragon;
    this.dragonCg = guestDragon.cgName;
    //#endregion

    /**
      偶然にも、別の里親の孤竜 {{varDragonNm}} と出会った！
      {{varDragonNm}} は突然の遭遇に戸惑っている。
      {{dragonName}}にどう指示しますか？
     */
    await this.Content(`Scripts.Dungeon.Incoming`, this.guestDragonTalkingParam)
    this.skipWait = false;
    switch ((await this.Options([`Scripts.Dungeon.Answer.Talk`, `Scripts.Dungeon.Answer.Escape`, `Scripts.Dungeon.Answer.Present`])).index) {
      //#region 說話
      case 0: {
        this.appServ.setSE('snd10')
        const messageID = Math.floor(Math.random() * 32)

        switch (messageID) {
          case 0:
            /** 
             *…ゴホッゴホッ…！！
              どうやら{{varDragonNm}}は、風邪をひいてしまっているらしい。
              {{dragonName}}は、苦しくせき込む{{varDragonNm}}を沈痛な面持ちで見送った……。
             */
            this.Content('Scripts.Dungeon.Talk.0.1', this.guestDragonTalkingParam);
            if (this.playerData.hp < this.playerData.Maxhp / 3) {
              // 趕貓了
              this.playerData.bio |= BioFlag.風邪;
              /** …気のせいか、せきを吸い込んだ{{dragonName}}は、喉に違和感を感じた。 */
              this.Content('Scripts.Dungeon.Talk.0.2', this.guestDragonTalkingParam);
            }
            break;

          case 2:
            const damage = Math.round((guestDragon.at / 4) + Math.random() * 25) + 4;
            this.appServ.setSE('snd01')
            this.appServ.setRadialEffect('#E03434', false, 1000);
            this.appServ.Anim(RootAnimations.PlayerDamage, 1000);
            this.playerData.hp = Math.max(0, this.playerData.hp - damage);
            this.damageToPlayer = damage
            /**
             *{{dragonName}}: ！！？う、うわ～～～～っ！！
              突然{{varDragonNm}}が襲い掛かってきた！ {{dragonName}}は{{damage}}の傷を負った。
              {{varDragonNm}}：え？あっ……ごめん。 てっきり魔獣だと思った{{go201}}…。
              ホントにごめん{{go00}}{{go01}}…。
             */
            await this.Content('Scripts.Dungeon.Talk.2', {
              ...this.guestDragonTalkingParam,
              damage: String(damage)
            });
            break;
          case 11: {
            // 已經被贈送過太多次道具了
            const itemID: ItemID = this.dungeon.varGetItem[Math.floor(Math.random() * this.dungeon.varGetItem.length - 1 + 1)]
            if (this.varPresentItem >= 3) {
              /**
               *{{varDragonNm}}：さっき、{{varItemName}}を手に入れたんだ。
                {{varDragonNm}}：もう持てないから…これ、あげる{{go201}}！
                {{dragonName}}：……でも… やっぱり悪い{{go01}}。
                {{varDragonNm}}：うぅん…そう。分かった{{go201}}。 じゃぁ、他竜にあげる{{go201}}。
               */
              this.Content('Scripts.Dungeon.Talk.11.1', {
                ...this.guestDragonTalkingParam,
                varItemName: this.appServ.t(`Data.Item.${itemID}.Title`)
              });
            } else {
              this.getItems.push(itemID);
              this.getItemsLog.push(itemID);
              this.varPresentItem++;

              /**
               *{{varDragonNm}}：さっき、{{varItemName}}を手に入れたんだ。
                {{varDragonNm}}：もう持てないから…これ、あげる{{go201}}！
                [{{dragonName}}は {{varItemName}} を受け取ったが、遠慮している。]
                [{{varDragonNm}}は「いいよ」と身振りをしながら 横を通り過ぎていった。]"
               */
              this.Content('Scripts.Dungeon.Talk.11.2', {
                ...this.guestDragonTalkingParam,
                varItemName: this.appServ.t(`Data.Item.${itemID}.Title`)
              });
            }
            break;
          }
          case 18: {
            /**
              *{{varDragonNm}}：ちょうどよかった。ちょっと、そこに立っていてくれる？
               {{varDragonNm}}：今、新しく覚えた回復魔法の練習をしてた{{go201}}。
               [普段話している言葉とも、ただの竜の鳴き声ともつかない竜語魔法が唱えられる。]
               [暖かい光が{{dragonName}}の体を包み込み、疲れが和らいでいくのが感じられた。]
             */

            this.appServ.setSE('snd08')
            const recoverAmount = Math.round((Math.random() * 20) + (this.playerData.Maxhp / 3));
            this.playerData.hp = Math.min(this.playerData.Maxhp, this.playerData.hp + recoverAmount);
            this.damageToPlayer = -recoverAmount;
            this.appServ.setRadialEffect('#34E034', false, 1000);
            await this.Content('Scripts.Dungeon.Talk.18',
              this.guestDragonTalkingParam
            );
            break;
          }
          case 19: {
            /**
             *{{varDragonNm}}：ちょうどよかった。今新しく覚えた回復魔法の練習をしてた{{go201}}。
              [普段話している言葉とも、ただの竜の鳴き声ともつかない竜語魔法が唱えられる。]
              [その瞬間、鋭い閃光が走り、収束した力が暴発して孤竜たちの体を吹き飛ばした！！]
              {{varDragonNm}}：ごっ…ごめん……。まだ上手に使いこなせない{{go201}}…。
             */
            this.appServ.setSE('snd01')
            this.playerData.hp = Math.max(0, this.playerData.hp - 10);
            this.damageToPlayer = 10;
            this.appServ.setRadialEffect('#E03434', false, 1000);
            this.appServ.Anim(RootAnimations.PlayerDamage, 1000);

            await this.Content('Scripts.Dungeon.Talk.19',
              this.guestDragonTalkingParam
            );
            break;
          }
          /** 因為其他都只有純對話 省時間(欸) */
          default:
            this.Content(`Scripts.Dungeon.Talk.${messageID}`,
              this.guestDragonTalkingParam,
            );
            break;
        }
        break;
      }
      //#endregion

      //#region 逃跑
      case 1:

        this.appServ.setSE('snd10')
        /** {{dragonName}} は 言いようのない不安を覚え、駆け足で走り出した。*/
        await this.Content(`Scripts.Dungeon.Escape.1`)
        // 很好心的幫忙回血了 <3
        if ((Math.round(Math.random() * 2) == 1) && (this.playerData.hp < (this.playerData.Maxhp / 1.2))) {
          this.appServ.setSE('snd08')
          /**
           *{{varDragonNm}} は {{dragonName}} を取り押さえ、体中のケガを心配そうに見つめている。
            {{varDragonNm}} は、リカーブを {{dragonName}} にかけた。 {{dragonName}} の傷が回復してゆく…。
            {{varDragonNm}} は、ケガが癒えるのを確認すると、そのままどこかへ立ち去っていった……。
           */
          const recoverAmount = Math.round((Math.random() * 20) + (this.playerData.Maxhp / 3));
          this.playerData.hp = Math.min(this.playerData.Maxhp, this.playerData.hp + recoverAmount);
          this.damageToPlayer = -recoverAmount;
          this.appServ.setRadialEffect('#34E034', false, 1000);
          await this.Content(`Scripts.Dungeon.Escape.2.1`, this.guestDragonTalkingParam)
        }
        // 什麼都不關心
        else if (Math.round(Math.random() * 2) == 1) {
          /** しかし {{varDragonNm}} は関心がないようで、追うこともせず 次第に闇へと消えていってしまった。 */
          this.Content(`Scripts.Dungeon.Escape.2.2`, this.guestDragonTalkingParam)
        }
        // 跌了個超大的倒
        else {
          this.appServ.setSE('snd01')
          const damage = Math.max(5, Math.round((Math.random() * 20) + (this.playerData.Maxhp / 2)))
          this.playerData.hp = Math.max(0, this.playerData.hp - damage);
          this.damageToPlayer = damage;
          this.appServ.setRadialEffect('#E03434', false, 1000);
          this.appServ.Anim(RootAnimations.PlayerDamage, 1000)
          /** しかし 床に脚をとられてスリップし、そのまま大きく倒れ、{{damage}}の傷を負ってしまった！ */
          await this.Content(`Scripts.Dungeon.Escape.2.3`, { damage: damage.toString() })
        }
        break;
      //#endregion

      //#region 贈禮
      case 2: {
        this.appServ.setSE('snd10')
        const donateAmount = Math.min(
          this.playerData.food + this.getMoney,
          Math.round(Math.random() * (20 * this.dungeon.varMapLv) + 5)
        )
        if (donateAmount === 0) {
          // 拿了空氣出來
          /** {{dragonName}} は {{varDragonNm}} にあげるだけのシェルを持ち合わせてはいなかった。 */
          await this.Content(`Scripts.Dungeon.Present.1.1`, this.guestDragonTalkingParam)
        } else {
          /** {{dragonName}} は {{varDragonNm}} に、{{money}}シェルをそっと手渡した。 */
          await this.Content(`Scripts.Dungeon.Present.1.2`, {
            ...this.guestDragonTalkingParam,
            money: donateAmount.toString()
          })
          // 若大於原本玩家持有的錢，先扣掉在地下城獲得的
          if (donateAmount > this.playerData.food) {
            this.playerData.food += this.getMoney;
            this.playerData.food -= donateAmount;
            this.getMoney = 0;
          } else {
            this.playerData.food -= donateAmount;
          }
        }
        if (Math.round(Math.random() * 3) == 1) {
          // 笑笑不說話
          /** {{varDragonNm}}は  {{dragonName}}の顔をしばらく見つめると、無言のまま去っていった……。 */
          this.Content('Scripts.Dungeon.Present.2.1', this.guestDragonTalkingParam)
          if (this.debugMenu) {
            this.Content('TEST:第一階段笑笑不說話')
          }
        }
        else if ((donateAmount < 13) || (this.varPresentItem >= 3)) {
          // 給錢給太少了或拿過太多禮物了！
          this.appServ.setRadialEffect('#E03434', false, 1000);
          this.appServ.Anim(RootAnimations.PlayerDamage, 1000);
          const damage = Math.max(5,
            // 高等地下城就乖乖聊天吧...。
            Math.round(
              this.playerData.Maxhp * (0.2 * (this.dungeon.varMapLv + 1))
              + (Math.random() * 9))
          );
          this.playerData.hp = Math.max(0, this.playerData.hp - damage);
          this.damageToPlayer = damage;
          /** 
           *{{varDragonNm}}は 機嫌がよくないのか、{{dragonName}} の手を爪で乱暴に振りはらった！
            {{dragonName}}は 鋭い爪で引っかかれ {{damage}}の傷を負った…。
            {{varDragonNm}}は やがて その場からいなくなってしまった……
           */

          this.appServ.setSE('snd01')
          await this.Content('Scripts.Dungeon.Present.2.2', {
            ...this.guestDragonTalkingParam,
            damage: String(damage)
          })
        }
        else {
          let itemID: ItemID | null = null;

          if (Math.round(Math.random() * (21 - donateAmount)) <= 4) {
            // 自當前地下城取得道具
            itemID = this.dungeon.varGetItem[Math.floor(Math.random() * (this.dungeon.varGetItem.length - 1) + 1)];
          } else if (Math.round(Math.random() * (21 - donateAmount)) <= 10) {
            // 自低一等級的地下城取得道具
            const dungeon = Object.values(dungeonData).find(d => d.varMapLv === this.dungeon.varMapLv - 1);
            if (dungeon) {
              itemID = dungeon.varGetItem[Math.floor(Math.random() * (dungeon.varGetItem.length - 1) + 1)];
            }
          }
          if (itemID) {
            this.getItems.push(itemID);
            this.getItemsLog.push(itemID);
            this.varPresentItem++;
            /**
             * {{varDragonNm}}は にっこりと微笑むと、お礼に {{varItemName}} を手渡し、再び闇の中へと消えていった……
             */
            this.Content(`Scripts.Dungeon.Present.2.3`, {
              ...this.guestDragonTalkingParam,
              varItemName: this.appServ.t(`Data.Item.${itemID}.Title`)
            })
          }
          else {
            this.Content(`Scripts.Dungeon.Present.2.4`, this.guestDragonTalkingParam)
            if (this.debugMenu) {
              this.Content('TEST:第二階段笑笑不說話')
            }
          }
        }
        break;
      }
      //#endregion
    }
    if (this.appServ.saveData.hp <= 0) {
      // 真的掛掉時不做後續動作
      if (await this.Death()) {
        return
      }
    }
    // 還沒死那就等對話跑完再繼續
    await firstValueFrom(this.dialogComplete$);
    this.skipWait = true;
    this.guestDragon = undefined;
    await this.appServ.Wait(1000)
    this.dragonCg = '';
    this.disableAllActions = false;
  }

  get guestDragonTalkingParam() {
    if (!this.guestDragon) {
      return {
        go200: 'go200', go201: 'go201', go202: 'go202', go203: 'go203', go204: 'go204',
        my2: 'my2',
        varDragonNm: 'varDragonNm'
      };
    }
    return {
      go200: this.guestDragon.talkingGO.go00,
      go201: this.guestDragon.talkingGO.go01,
      go202: this.guestDragon.talkingGO.go02,
      go203: this.guestDragon.talkingGO.go03,
      go204: this.guestDragon.talkingGO.go04,
      my2: this.guestDragon.talkingGO.my,
      varDragonNm: this.guestDragon.dragonName
    }
  }
  @HostListener('document:keypress', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    switch ($event.key.toLowerCase()) {
      case 'arrowup':
      case 'w':
        this.Next(DungeonDirection.Up);
        $event.preventDefault();
        break;
      case 'arrowright':
      case 'd':
        this.Next(DungeonDirection.Right);
        $event.preventDefault();
        break;
      case 'arrowdown':
      case 's':
        this.Next(DungeonDirection.Down);
        $event.preventDefault();
        break;
      case 'arrowleft':
      case 'a':
        this.Next(DungeonDirection.Left);
        $event.preventDefault();
        break;
      case 'space':
      case 'return':
        this.Check()
        $event.preventDefault();
        break;
    }
  }

  get playerData() {
    return this.appServ.saveData;
  }

  get recoverItemCount() {
    return this.playerData.item[ItemID.精霊根] + _.filter(this.getItems, (v) => v === ItemID.精霊根).length;
  }

  get currentMazeCode() {
    return this.mazeData?.[this.playerY]?.[this.playerX];
  }

  /** 眼前正在面對的下一格 */
  get aimingNextPosX() {
    switch (this.playerDirection) {
      case DungeonDirection.Left:
        return this.playerX - 1;
      case DungeonDirection.Right:
        return this.playerX + 1
    }
    return this.playerX;
  }
  get aimingNextPosY() {
    switch (this.playerDirection) {
      case DungeonDirection.Up:
        return this.playerY - 1;
      case DungeonDirection.Down:
        return this.playerY + 1
    }
    return this.playerY;
  }
}
