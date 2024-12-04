import { BattleData } from '@/data/battle';
import { SaveData } from '@/entities/SaveData';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';

export interface IBattleRouteState {

  battle: string,
  onWin: {
    href: string, state: any,
  }
  onLose: { href: string, state: any }
  debugMenu: boolean,
  restoreOnLose: boolean
}

export interface IBattleServiceResolveData {
  /** 敵人數值 */
  battleData: SaveData;

  /** 對方ID, -開頭時為本地戰鬥 */
  battleID: string;

  /** 音樂 */
  battleMusic: string;

  /** 背景 */
  battleBG: string;

  onWin: {
    href: string, state: any,
  }
  onLose: { href: string, state: any }
}

function GetBattleMusic(battle: string) {
  switch (battle) {
    case '-last': {
      return 'music33';
    }
    case '-boss01':
    case '-boss02':
    case '-boss03':
    case '-boss04': {
      return 'music30';
    }
    // lv1
    case '-Forest': {
      return 'music26'
    }
    // lv2, 但應該沒打架...?
    case '-':
    case '-Forest2':
    // lv3
    case '-iseki': {
      return 'music26'
    }
    // lv4
    case '-rag': {
      return 'music27'
    }
    // lv7
    case '-koj': {
      return 'music26'
    }
    case '-hei': {
      return 'music26'
    }
    case '-sabaku': {
      return 'music33'
    }
    default:
      return 'music08'
  }
}
function GetBattleBG(battle: string) {
  switch (battle) {
    case '-': {
      return 'hokora';
    }
    case '-Forest': {
      return 'forest';
    }
    case '-iseki': {
      return 'iseki';
    }
    case '-rag': {
      return 'ragunaroku';
    }
    case '-koj': {
      return 'kojyou';
    }
    case '-hei': {
      return 'heigen';
    }
    case '-Forest2': {
      return 'forest2';
    }
    case '-last': {
      return 'last';
    }
    case '-sabaku': {
      return 'sabaku2';
    }
    default:
      return 'battle';
  }
}

@Injectable({
  providedIn: 'root'
})
export class BattleService implements Resolve<IBattleServiceResolveData> {

  constructor(private location: Location) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<IBattleServiceResolveData> {
    const locationState = this.location.getState() as IBattleRouteState
    const battleID = locationState.battle;

    const battleMusic = GetBattleMusic(battleID);
    const battleBG = GetBattleBG(battleID);
    const enemySaveData = new SaveData();

    if (battleID.startsWith('-')) {
      // 若為-開頭則為本地戰鬥
      const battleData = BattleData[battleID];
      if (!battleData) {
        throw new Error('[ERROR] 未指定Battle或找不到Battle!')
      }
      // 敵人資料
      Object.entries(battleData).forEach(([key, value]) => {
        try {
          (enemySaveData as any)[key] = value;
        } finally {

        }
      })

    } else {
      throw new Error('[ERROR] 尚未實作連線對戰!')
    }
    enemySaveData.PS_RyuCG();
    console.log('enemy', enemySaveData);
    return { battleData: enemySaveData, battleID, battleMusic, battleBG, onLose: locationState.onLose, onWin: locationState.onWin }
  }
}
