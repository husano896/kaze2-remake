import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { firstValueFrom } from "rxjs";

export const Ending1 = async (component: DialogueComponent) => {
    const { location, setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, Content, setDialogOpticity, router, appServ, dialogComplete$, SetContentCompleted } = component;
    const { Anim, Wait } = appServ

    const state = location.getState() || {};

    appServ.setBGM('music22')
    setBG('welcome')
    setDragonCG('nomal00');
    setDragonCGOpticity(0);
    await Wait(1000)
    setDragonCGOpticity(1);
    await Wait(3000)
    setBGOpticity(1);
    await Wait(3000)
    console.log('set2')
    setDialogOpticity(1);
    await Content(`Scripts.Ending1.1`)
    await Content(`Scripts.Ending1.2`)
    await Content(`Scripts.Ending1.3`)
    SetContentCompleted()
    await firstValueFrom(dialogComplete$);
    await Anim(RootAnimations.FadeOut);
    router.navigate(['/game/ending'], { state: { ...state, ending: 'Ending1b' }, replaceUrl: true });

    await Anim(RootAnimations.FadeIn);
}