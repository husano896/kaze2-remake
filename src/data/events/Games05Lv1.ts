import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";

export const Games05Lv1 = async (component: DialogueComponent) => {
  const { Content, router, SetSkipCallback, setDialogOpticity, appServ } = component;
  let skipped = false;
  appServ.setBGM()

  /** SKIP: 回到龍窩 */
  const skipCallBack = () => {
    if (skipped) {
      return;
    }
    router.navigate(['/game/dragongame'], { replaceUrl: true })
    skipped = true;
  }

  SetSkipCallback(skipCallBack)
  setDialogOpticity(1);

}