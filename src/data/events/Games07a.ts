import { IBattleRouteState } from "@/app/pages/game/battle/battle.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";

/** 滅 び の 都 ヒ デ ィ ー ル 最終決戰腳本 */
export const Games07a = async (component: DialogueComponent) => {
  const { ClearContent, AllFadeOut, Emoji, Content, Face, location, router, SetSkipCallback, setDialogOpticity, appServ, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity } = component;

  const { debugMenu } = location.getState() as { event: string, lv: string, debugMenu: boolean };

  const onWinURL = '/game/dialogue'
  const onWinState = { event: 'Games07', lv: 1, debugMenu }

  if (debugMenu) {
    alert('因在測試模式下，跳過戰鬥。')
    await router.navigate(['/'], { replaceUrl: true, onSameUrlNavigation: 'reload', state: onWinState })
    await router.navigate([onWinURL], { replaceUrl: true, onSameUrlNavigation: 'reload', state: onWinState })
    return;

  }
  router.navigate(['/game/battle'], {
    replaceUrl: true, state: {
      battle: '-last', onWin: { href: onWinURL, state: onWinState }
    } as IBattleRouteState
  })
}