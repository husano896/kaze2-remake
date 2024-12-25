import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { firstValueFrom } from "rxjs";

export const Ending1 = async (component: DialogueComponent) => {
    const { location, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, Anim, AllFadeOut, Content, setDialogOpticity, router, appServ, dialogComplete$, SetContentCompleted } = component;
    const { Wait } = appServ

    const state = location.getState() || {};

    appServ.setBGM('music22')
    setBG('welcome')
    setDragonCG('nomal00');
    await Anim('dragoncg', RootAnimations.FadeIn, 1000)

    await Wait(3000)
    setBGOpticity(1);
    await Wait(3000)

    setDialogOpticity(1);
    await Content(`Scripts.Ending1.1`)
    await Content(`Scripts.Ending1.2`)
    await Content(`Scripts.Ending1.3`)
    SetContentCompleted()

    await AllFadeOut()
    router.navigate(['/game/ending'], { state: { ...state, ending: 'Ending1b' }, replaceUrl: true });

    await appServ.Anim(RootAnimations.FadeIn);
}