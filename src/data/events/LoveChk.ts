import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";

export const LoveChk = async (component: DialogueComponent) => {

  const { setBG, setDragonCG, setBGOpticity, setDialogOpticity, SetSkipCallback, setDragonCGOpticity, Face, Content, ClearContent, router, appServ, dialogStart$ } = component;
  const { toggleRay1, setNotice, Wait } = appServ

  setBG('welcome')
  setDragonCG('nomal01');
  setBGOpticity(1);
  appServ.setAmbient('snd16')
}