import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { BioFlag } from "../BioFlag";

/** 發作事件結束 */
export const Eventend = async (component: DialogueComponent) => {
  const { Content, setDialogOpticity, appServ, Back } = component;
  appServ.setBGM()

  setDialogOpticity(1);
  await Content('Scripts.Disease.Restore.2')
  appServ.saveData.bio ^= BioFlag.発作;
  Back()
}