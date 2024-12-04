import { AppService } from '@/app/app.service';
import { SaveData } from '@/entities/SaveData';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { delay, of, pipe, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleListService implements Resolve<Array<SaveData>> {

  constructor(private appServ: AppService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SaveData[]> {
    return this.GetBattleList()
  }

  GetBattleList() {
    // 若不足人數的部分，以假資料補齊
    return of([]).pipe(
      delay(200),
      map(() =>
        new Array(10).fill({}).map(() => this.CreateFakePlayer())
      )
    )
  }

  CreateFakePlayer(): SaveData {
    const p = new SaveData()

    // 除基礎數值外額外的能力點, 玩家基礎數值的+-15%
    let plusPoint = Math.max(0, Math.round(this.currentPlayerBattlePower * (0.85 + Math.random() * 0.3) - 10 - 1 - 1 - 1));
    // #region 能力值
    while (plusPoint > 0) {
      const increseAmount = Math.min(plusPoint, Math.max(1, Math.round(plusPoint * Math.random())))
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          p.Maxhp += increseAmount;
          break;
        case 1:
          p.at += increseAmount;
          break;
        case 2:
          p.df += increseAmount;
          break;
        case 3:
          p.speed += increseAmount;
          break;
      }
      plusPoint -= increseAmount;
    }
    //#endregion

    // #region 屬性及DragonChip
    // 屬性設定
    p.element1 = Math.round(Math.random() * 100);
    p.element2 = Math.round(Math.random() * 100);
    // DragonChip設定
    if (Math.random() * 0.5) {
      p.DragonChip1 = (0x1 << (Math.round(Math.random() * 20)));
      p.DragonChip2 = p.DragonChip1;
    }
    // #endregion
    return p;
  }

  /** 取得目前存檔的戰力 */
  get currentPlayerBattlePower() {
    const s = this.appServ.saveData;
    return s.battlePower;
  }
}
