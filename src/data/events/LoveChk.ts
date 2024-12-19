import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import * as _ from "lodash-es";
import { BioFlag } from "../BioFlag";

export const LoveChk = async (component: DialogueComponent) => {

  const { ClearContent, setBG, setDragonCG, setBGOpticity, setDialogOpticity, Face, Content, router, appServ } = component;
  const { setNotice, saveData } = appServ

  setBG('welcome')
  setDragonCG('nomal01');
  setBGOpticity(1);
  appServ.setAmbient('snd16')

  // 孤龍檢診日
  await appServ.toggleRay1();
  appServ.setBGM('music21');

  Face('char01');
  setDialogOpticity(1);
  /**
今回は竜の検診っす。{{yourName}}さん、準備はいいっすか？
竜との友好度から、{{yourName}}さんが里親に適任かどうか、判断が下されるっす。
あぁ…どうか合格できますように！
   */
  await Content('Scripts.LoveChk.1');
  Face('char01a');
  // Ray07 友好度視窗
  Face('');
  const nowLevel = Math.round(saveData.love / 100)
  const nowStars = _.range(nowLevel).map(() => '★').join('');
  const nowName = appServ.t(`Data.Love.${nowLevel}`)
  appServ.setNotice(
    'Scripts.LoveChk.Ray.LoveNow',
    appServ.t("Scripts.LoveChk.Ray.LoveRankingAndName", {
      stars: nowStars, loveName: nowName
    })
  )
  component.skipWait = true;
  ClearContent()
  /**
  -　検診中　-
  …ふむ、キミか……。どれどれ？
  ふむふむ………
  …………………
   */
  await Content('Scripts.LoveChk.2');
  await appServ.Wait(1500)

  Face('char01');

  component.skipWait = false;
  ClearContent()
  /** あ…終わったみたいっすよ。 */
  await Content('Scripts.LoveChk.3');
  Face('char01a');

  /// #region 命運的判斷
  // Ray07 友好度視窗
  Face('');
  const reqLevel = Math.floor(saveData.numVisits / 10) + 1;
  const reqStars = _.range(reqLevel).map(() => '★').join('');
  const reqName = appServ.t(`Data.Love.${reqLevel}`);

  appServ.setNotice(
    'Scripts.LoveChk.Ray.LoveNow',
    appServ.t("Scripts.LoveChk.Ray.LoveRankingAndName", {
      stars: nowStars, loveName: nowName
    }) + appServ.t('\r\n') +
    appServ.t("Scripts.LoveChk.Ray.LoveRequired") +
    appServ.t("Scripts.LoveChk.Ray.LoveRankingAndName", {
      stars: reqStars, loveName: reqName
    })
  )

  if (nowLevel >= reqLevel) {

    const nextLevel = Math.floor(saveData.numVisits / 10) + 2;
    if (saveData.bio && (saveData.bio != BioFlag.眠酔)) {
      // 生病了
      Face('char06');
      await Content('Scripts.LoveChk.4.Success.Bio', { loveName: `Data.Love.${nextLevel}` })
      Face('char06a');
    } else if ((saveData.overLv + 5) <= saveData.numVisits) {
      // 沒吃飽！（等級不夠）
      Face('char01');
      await Content('Scripts.LoveChk.4.Success.Level', { loveName: `Data.Love.${nextLevel}` })
      Face('char01a');
    } else {
      // 平安無事～
      Face('char08');
      await Content('Scripts.LoveChk.4.Success.Normal', { loveName: `Data.Love.${nextLevel}` })
      Face('char08a');
    }
    setNotice()
    router.navigate(['/game/dragongame'], { replaceUrl: true })
    return;
  }

  // 再見了。
  appServ.setBGM('music12')
  Face('char10');
  /**
  ……診断結果は、最悪っす。
  残念ながら、{{yourName}}さんは里親として不適切だと判断されたっす。
  ボクとしては何とかしたいんっすが、遺跡管理局の規定のとおり、
  {{yourName}}さんから里親の権利を剥奪しないといけなくなったっす。
  ……孤竜のことはボクが何とかするっすから、安心してくださいっす。
  突然のことで、なごり惜しいっすが……さようならっす……。
  */
  await Content('Scripts.LoveChk.4.Fail');
  Face('char10a');

  setNotice()
  router.navigate(['/game/gameover'], { replaceUrl: true, state: { delete: 'delete' } })

  /// #endregion
}