import { AppService } from '@/app/app.service';
import { BioFlag } from '@/data/BioFlag';
import { ItemID } from '@/data/ItemID';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface IMapLocation {
  x: number,
  y: number,
  fill: string,
  stroke: string,
  location: {
    name: string,
    turn: number,
    url: string,
    bioCheck?: boolean,
    state?: {
      event?: string,
      lv?: string | number
    }
  }
}
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  private _locations: Array<IMapLocation> = [
    {
      x: 926, y: 284, fill: "point1", stroke: "#2962FF", location: {
        name: 'ウリア大砂漠地帯(CAUTION:危険地帯!)',
        turn: 15,
        url: 'dialogue',
        bioCheck: true,
        state: {
          event: 'Quest10'
        }
      }
    },
    {
      x: 772, y: 374, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: ' 廃 坑 　　　(難易度　中)',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv5' }
      }
    },
    {
      x: 548, y: 482, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: '星 降 る 海 底 洞 窟 　　　(難易度　中)',
        turn: 5, url: 'dungeon',
        state: { lv: 'lv4' }
      }
    },
    {
      x: 252, y: 392, fill: "point1", stroke: "#2962FF",
      location: {
        name: '街 の 雑 木 林',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: {
          event: 'Quest09'
        }
      }
    },
    {
      x: 660, y: 426, fill: 'point1', stroke: "#2962FF",
      location: {
        name: 'サ ラ 平 原',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest08' }
      }
    },
    {
      x: 990, y: 310, fill: 'point1', stroke: "#2962FF",
      location: {
        name: '忘 れ 去 ら れ し 古 城',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest07' }
      }
    },
    {
      x: 926, y: 484, fill: 'point1', stroke: "#2962FF",
      location: {
        name: '魔 獣 の 森',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest06' }
      }
    },
    {
      x: 342, y: 48, fill: 'pointNotReady', stroke: "#546E7A",
      location: {
        name: '飛 竜 保 護 区 ド ラ ゴ ン バ レ ー',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { lv: 5 }
      }
    },
    {
      x: 152, y: 598, fill: 'point1', stroke: "#2962FF",
      location: {
        name: '幻 の 浮 島 ラ グ ナ ル ク ス',
        turn: 40,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest04' }
      }
    },
    {
      x: 296, y: 170, fill: 'point1', stroke: "#2962FF",
      location: {
        name: 'ド ラ ゴ ン の 古 代 遺 跡',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest03' }
      }
    },
    {
      x: 536, y: 176, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'カ ザ リ ナ 山 ・ 幸 い の 地 フ ッ フ ー ル',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest02' }
      }
    },
    {
      x: 684, y: 354, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'ト ピ リ ア の 森',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest01' }
      }
    },
    {
      x: 948, y: 104, fill: "point1", stroke: "#2962FF",
      location: {
        name: '玄 武 洞 の ほ こ ら',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 4 }
      }
    },
    {
      x: 682, y: 80, fill: "point1", stroke: "#2962FF",
      location: {
        name: '魔 風 穴 の ほ こ ら',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 3 }
      }
    },
    {
      x: 446, y: 246, fill: "point1", stroke: "#2962FF",
      location: {
        name: '滑 昇 霧 の ほ こ ら',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 2 }
      }
    },
    {
      x: 276, y: 334, fill: "point1", stroke: "#2962FF",
      location: {
        name: '陽 炎 の ほ こ ら',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 1 }
      }
    },
    {
      x: 118, y: 228, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: '海 流 の 洞 窟 　　　(難易度　低)',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv1' }
      }
    },
    {
      x: 256, y: 226, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: 'ド ラ ゴ ン の 洞 窟 　　　(難易度　中)',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv2' }
      }
    },
    {
      x: 656, y: 282, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: '風 鳴 り の 洞 窟 　　　(難易度　高)',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv3' }
      }
    },
    {
      x: 318, y: 310, fill: "pointHome", stroke: "#00C853",
      location: {
        name: 'ポ イ ル ト ッ プ の 街', turn: 0, url: 'dragongame'
      },
    }
  ]
  constructor(private appServ: AppService, private router: Router) {

  }

  ngAfterViewInit(): void {
    this.appServ.setBGM('music13')
  }

  /** 是否為發作 */
  get bio() {
    return this.appServ.saveData.bio & BioFlag.発作;
  }

  get numVisits() {
    return this.appServ.saveData.numVisits;
  }

  async GoTo(title: string, turn: number, url: string, bioCheck?: boolean, state?: { event?: string, lv?: any }) {
    this.appServ.setSE('snd10')

    if (turn > this.appServ.saveData.turn) {
      this.appServ.Confirm(this.appServ.t(title), this.appServ.t('Game.Map.NotEnoughTurn'))
      return
    }

    //#region 發作中禁止前往
    if (bioCheck && this.appServ.saveData.bio) {
      if (url === 'dungeon') {
        // 針對不同地方有不同的禁止進入提示文字
        switch (state?.lv) {
          case 'lv0': {
            // 發作藥洞窟
            if (this.appServ.saveData.numVisits >= 40) {
              this.appServ.Confirm(
                this.appServ.t(title),
                `この洞窟の入り口は土砂で塞がってしまっている。
復旧するまで立ち入れません。`)
              return;
            }
            break;
          }
        }
      } else if (url === 'dialogue') {
        switch (state?.event) {
          // 神獸寺廟
          case 'Games04':
            this.appServ.Confirm(
              this.appServ.t(title),
              `この祠を現在の健康状態で探索するのは危険です。`)
            return;
          //ト ピ リ ア の 森
          case 'Quest01':
            this.appServ.Confirm(
              this.appServ.t(title),
              `この森を現在の健康状態で探索するのは危険です。`)
            return;

          //カ ザ リ ナ 山 ・ 幸 い の 地 フ ッ フ ー ル
          case 'Quest02':
            this.appServ.Confirm(
              this.appServ.t(title),
              `この森を現在の健康状態で探索するのは危険です。`)
            return;

          //ド ラ ゴ ン の 古 代 遺 跡
          case 'Quest03':
            this.appServ.Confirm(
              this.appServ.t(title),
              `この遺跡を現在の健康状態で探索するのは危険です。`)
            return;
          // 幻 の 浮 島 ラ グ ナ ル ク ス
          case 'Quest04':
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの島に渡るのは危険です。`)
            return;
          // 飛 竜 保 護 区 ド ラ ゴ ン バ レ ー
          case 'Quest05':
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの丘に行くのは危険です。`)
            return;
          // 魔 獣 の 森
          case 'Quest06':
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの森に入るのは危険です。`)
            return;
          // 忘 れ 去 ら れ し 古 城
          case 'Quest07':
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの古城に入るのは危険です。`)
            return;
          // サ ラ 平 原
          case 'Quest08':
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの平原に行くのは危険です。`)
            return;
          // 街 の 雑 木 林
          case 'Quest09':
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの林に入るのは危険です。`)
            return;
          // ウリア大砂漠地帯
          // 林北家（笑）
          case 'Quest10':
            this.appServ.Confirm(
              this.appServ.t(title),
              `この遺跡を現在の健康状態で探索するのは危険です。`)
            return;
        }
      }
    }
    //#endregion

    switch (url) {
      case 'map': {
        switch (state?.lv) {
          case 'lv4':
            // 星 降 る 海 底 洞 窟
            if (!this.appServ.saveData.item[ItemID.忌地への道標]) {
              this.appServ.Confirm(this.appServ.t(title), `今の段階では、この洞窟に入るのは非常に危険です。
入るには「道標」などが必要です。`)
              return;
            }
            break;
          case 'lv5':
            // 廃 坑
            if (!((this.appServ.saveData.numVisits >= 41) && (this.appServ.saveData.numVisits <= 44))) {
              this.appServ.Confirm(this.appServ.t(title), `有刺鉄線と「立ち入り禁止」の立て札があり、入ることができない。`)
              return;
            }
            break;
        }
        break;
      }
      case 'dialogue': {
        if (state?.event === 'Games07') {
          // 滅 び の 都 ヒ デ ィ ー ル
          if ([82, 83].includes(this.appServ.saveData.numVisits)) {
            // 看護人生病了QQ
            this.appServ.Confirm(this.appServ.t(title), `この地へは、ニエルが同伴しなければ行くことができません。`)
            return;
          }
        }
      }
    }
    // 最後確認
    if (!(await this.appServ.Confirm(
      this.appServ.t(title),
      this.appServ.t(url.includes('dragongame') ? 'Game.Map.Home.Description' : 'Game.Map.GoToConfirm', { turn }), true))) {
      return;
    }

    console.log(url, state);
    // 還在測試階段 先把神獸寺廟跟家裡跟地下城以外的擋起來
    if (!(
      url.includes('dungeon') ||
      (url.includes('dialogue') && [
        'Games04',
        'Games02',
        // 'Games07', 
        'Quest01',
        'Quest02',
        'Quest03',
        'Quest04',
        'Quest06',
        'Quest07',
        'Quest08',
        'Quest09',
        'Quest10'].includes(state?.event || '')) ||
      url.includes('dragongame'))) {

      this.appServ.Confirm(this.appServ.t(title), '尚未實作')
      return;
    }
    this.appServ.saveData.turn -= turn;
    this.router.navigate([`/game/${url}`], { replaceUrl: true, state })
  }
  /** 是否可點選 忌まわしき地 */
  get game07ON() {
    return this.appServ.saveData.item[ItemID.忌地への道標] || this.appServ.debug;
  }

  get locations() {
    let extraLocations: Array<IMapLocation> = [];

    // 在這裡加入需條件判定的地點
    if (this.game07ON) {
      extraLocations.push({
        x: 858,
        y: 614,
        fill: 'pointImportant', stroke: "#FDD835",
        location: {
          name: "GoTo('滅 び の 都 ヒ デ ィ ー ル [通称 : 忌 ま わ し き 地]",
          turn: 5,
          url: 'dialogue',
          state: { event: 'Games07' }
        }
      })
    }

    if (this.appServ.saveData.bio) {
      extraLocations.push({
        x: 542,
        y: 236,
        fill: 'pointImportant', stroke: "#FDD835",
        location: {

          name: "湖 ほ と り の 洞 窟　　　(特効薬の？？？)",
          turn: 5,
          url: 'dungeon',
          state: { lv: 'lv0' }
        }
      })
      if (this.appServ.saveData.numVisits > 40) {
        extraLocations.push({
          x: 856,
          y: 432,
          fill: 'pointImportant', stroke: "#FDD835",
          location: {

            name: "研 究 者 の 小 屋",
            turn: 10,
            url: 'dialogue',
            state: {
              event: 'Games02'
            }
          }
        })
      }
    }
    return [...this._locations, ...extraLocations];
  }

  get turn() {
    return this.appServ.saveData.turn;
  }
}
