import { AppService } from '@/app/app.service';
import { BioFlag } from '@/data/BioFlag';
import { ItemID } from '@/data/ItemID';
import { SeparateTextPipe } from '@/pipes/separate-text.pipe';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterModule, TranslateModule, SeparateTextPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

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
          case 0: {
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
      } else if (url === 'dialogue' && state?.event === 'Games04') {
        // 寺廟
        this.appServ.Confirm(
          this.appServ.t(title),
          `この祠を現在の健康状態で探索するのは危険です。`)

        return;
      } else if (url === 'dialogue' && state?.event === 'Games05') {
        switch (state.lv) {
          //ト ピ リ ア の 森
          case 1:
            this.appServ.Confirm(
              this.appServ.t(title),
              `この森を現在の健康状態で探索するのは危険です。`)
            return;

          //カ ザ リ ナ 山 ・ 幸 い の 地 フ ッ フ ー ル
          case 2:
            this.appServ.Confirm(
              this.appServ.t(title),
              `この森を現在の健康状態で探索するのは危険です。`)
            return;

          //ド ラ ゴ ン の 古 代 遺 跡
          case 3:
            this.appServ.Confirm(
              this.appServ.t(title),
              `この遺跡を現在の健康状態で探索するのは危険です。`)
            return;
          // 幻 の 浮 島 ラ グ ナ ル ク ス
          case 4:
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの島に渡るのは危険です。`)
            return;
          // 飛 竜 保 護 区 ド ラ ゴ ン バ レ ー
          case 5:
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの丘に行くのは危険です。`)
            return;
          // 魔 獣 の 森
          case 6:
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの森に入るのは危険です。`)
            return;
          // 忘 れ 去 ら れ し 古 城
          case 7:
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの古城に入るのは危険です。`)
            return;
          // サ ラ 平 原
          case 8:
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの平原に行くのは危険です。`)
            return;
          // 街 の 雑 木 林
          case 9:
            this.appServ.Confirm(
              this.appServ.t(title),
              `現在の健康状態でこの林に入るのは危険です。`)
            return;
          // ウリア大砂漠地帯
          // 林北家（笑）
          case 'A':
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

    // 還在測試階段 先把神獸寺廟跟家裡跟地下城以外的擋起來
    if (!(
      url.includes('dungeon') ||
      (url.includes('dialogue') && ['Games04', 'Games07', 'Quest01', 'Quest02'].includes(state?.event || '')) ||
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
}
