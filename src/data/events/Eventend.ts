import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";

/** 發作事件結束 */
export const Eventend = async (component: DialogueComponent) => {
  const {Content,router, SetSkipCallback, setDialogOpticity, appServ} = component;
  let skipped = false;
  appServ.setBGM()
  
  /** SKIP: 回到龍窩 */
  const skipCallBack = () => {
      if (skipped) {
          return;
      }
      router.navigate(['/game/dragongame'], {replaceUrl: true})
      skipped = true;
  }

  SetSkipCallback(skipCallBack)
  setDialogOpticity(1);
  await Content('Scripts.Disease.Restore.2')

}