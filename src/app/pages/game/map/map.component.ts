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
        name: 'Game.Map.Quest10.Title',
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
        name: 'Game.Map.Dungeon.5.Title',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv5' }
      }
    },
    {
      x: 548, y: 482, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: 'Game.Map.Dungeon.4.Title',
        turn: 5, url: 'dungeon',
        state: { lv: 'lv4' }
      }
    },
    {
      x: 252, y: 392, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'Game.Map.Quest09.Title',
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
        name: 'Game.Map.Quest08.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest08' }
      }
    },
    {
      x: 990, y: 310, fill: 'point1', stroke: "#2962FF",
      location: {
        name: 'Game.Map.Quest07.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest07' }
      }
    },
    {
      x: 926, y: 484, fill: 'point1', stroke: "#2962FF",
      location: {
        name: 'Game.Map.Quest06.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest06' }
      }
    },
    {
      x: 342, y: 48, fill: 'point1', stroke: "#2962FF",
      location: {
        name: 'Game.Map.Quest05.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest05' }
      }
    },
    {
      x: 152, y: 598, fill: 'point1', stroke: "#2962FF",
      location: {
        name: 'Game.Map.Quest04.Title',
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
        name: 'Game.Map.Quest02.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest02' }
      }
    },
    {
      x: 684, y: 354, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'Game.Map.Quest01.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Quest01' }
      }
    },
    {
      x: 948, y: 104, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'Game.Map.Temple.Earth.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 4 }
      }
    },
    {
      x: 682, y: 80, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'Game.Map.Temple.Wind.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 3 }
      }
    },
    {
      x: 446, y: 246, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'Game.Map.Temple.Water.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 2 }
      }
    },
    {
      x: 276, y: 334, fill: "point1", stroke: "#2962FF",
      location: {
        name: 'Game.Map.Temple.Fire.Title',
        turn: 5,
        url: 'dialogue',
        bioCheck: true,
        state: { event: 'Games04', lv: 1 }
      }
    },
    {
      x: 118, y: 228, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: 'Game.Map.Dungeon.1.Title',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv1' }
      }
    },
    {
      x: 256, y: 226, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: 'Game.Map.Dungeon.2.Title',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv2' }
      }
    },
    {
      x: 656, y: 282, fill: "pointCave", stroke: "#FFA726",
      location: {
        name: 'Game.Map.Dungeon.3.Title',
        turn: 5,
        url: 'dungeon',
        state: { lv: 'lv3' }
      }
    },
    {
      x: 318, y: 310, fill: "pointHome", stroke: "#00C853",
      location: {
        name: 'Game.Map.Home.Title', turn: 0, url: 'dragongame'
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
      if (url === 'dialogue') {
        switch (state?.event) {
          // 神獸寺廟
          case 'Games04':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Temple.Bio'))
            return;
          //ト ピ リ ア の 森
          case 'Quest01':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest01.Bio'))
            return;

          //カ ザ リ ナ 山 ・ 幸 い の 地 フ ッ フ ー ル
          case 'Quest02':
            this.appServ.Confirm(
              this.appServ.t(title),
              
              this.appServ.t('Game.Map.Quest02.Bio'))
            return;

          //ド ラ ゴ ン の 古 代 遺 跡
          case 'Quest03':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest03.Bio'))
            return;
          // 幻 の 浮 島 ラ グ ナ ル ク ス
          case 'Quest04':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest04.Bio'))
            return;
          // 飛 竜 保 護 区 ド ラ ゴ ン バ レ ー
          case 'Quest05':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest05.Bio'))
            return;
          // 魔 獣 の 森
          case 'Quest06':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest06.Bio'))
            return;
          // 忘 れ 去 ら れ し 古 城
          case 'Quest07':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest07.Bio'))
            return;
          // サ ラ 平 原
          case 'Quest08':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest08.Bio'))
            return;
          // 街 の 雑 木 林
          case 'Quest09':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest09.Bio'))
            return;
          // ウリア大砂漠地帯
          // 林北家（笑）
          case 'Quest10':
            this.appServ.Confirm(
              this.appServ.t(title),
              this.appServ.t('Game.Map.Quest10.Bio'))
            return;
        }
      }
    }
    //#endregion

    switch (url) {

      case 'dialogue': {
        if (state?.event === 'Games07') {
          // 滅 び の 都 ヒ デ ィ ー ル
          if ([82, 83].includes(this.appServ.saveData.numVisits)) {
            // 看護人生病了QQ
            this.appServ.Confirm(this.appServ.t(title), this.appServ.t('Game.Map.TheFinal.NoCompanion'))
            return;
          }
        }
        break;
      }
      case 'dungeon': {
        // 針對不同地方有不同的禁止進入提示文字
        switch (state?.lv) {

          case 'lv0': {
            // 發作藥洞窟
            if (this.appServ.saveData.numVisits >= 40) {
              this.appServ.Confirm(
                this.appServ.t(title),
                this.appServ.t('Game.Map.Dungeon.0.Blocked'))
              return;
            }
            break;
          }
          case 'lv4':
            // 星 降 る 海 底 洞 窟
            if (!this.appServ.saveData.item[ItemID.忌地への道標]) {
              this.appServ.Confirm(this.appServ.t(title), 
              this.appServ.t('Game.Map.Dungeon.4.Requirement'))
              return;
            }
            break;
          case 'lv5':
            // 廃 坑
            if (!((this.appServ.saveData.numVisits >= 41) && (this.appServ.saveData.numVisits <= 44))) {
              this.appServ.Confirm(this.appServ.t(title),  this.appServ.t('Game.Map.Dungeon.5.Blocked'))
              return;
            }
            break;

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
    // 劇情做完啦！恭喜！
    /**
      this.appServ.Confirm(this.appServ.t(title), '尚未實作')
      return;
     */
    this.appServ.saveData.turn -= turn;
    this.router.navigate([`/game/${url}`], { replaceUrl: true, state })
  }
  /** 是否可點選 忌まわしき地 */
  get game07ON() {
    return this.appServ.saveData.item[ItemID.忌地への道標];
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
          name: "Game.Map.TheFinal.Title",
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

          name: "Game.Map.Dungeon.0.Title",
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

            name: "Game.Map.Researcher.Title",
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
