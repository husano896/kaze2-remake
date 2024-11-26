import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";

/** 地下城通關失敗...!! */
const Miss = async (component: DialogueComponent) => {
    const { setBG, Face, setBGOpticity, setDragonCGOpticity, Content, appServ, SetSkipCallback, setDialogOpticity, router } = component;

    let skipped = false;
    /** SKIP: 回到龍窩 */
    const skipCallBack = () => {
        if (skipped) {
            return;
        }
        router.navigate(['/game/dragongame'], { replaceUrl: true })
        skipped = true;
    }
    SetSkipCallback(skipCallBack)

    // 關音樂
    appServ.setBGM()
    setBG('')
    setBGOpticity(0)
    setDragonCGOpticity(0)
    setDialogOpticity(1)
    await Content('Scripts.Miss')
    skipCallBack();
}

export { Miss }