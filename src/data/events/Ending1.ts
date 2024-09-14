import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { firstValueFrom } from "rxjs";

export const Ending1 = async (component: DialogueComponent) => {
    console.log(this as any);
    const { setBG, setDragonCG, setBGOpticity, setDragonCGOpticity, Content, setDialogOpticity, router, appServ, dialogComplete$ } = component;
    const { Anim, Wait } = appServ

    appServ.setBGM('victim')
    setBG('welcome')
    setDragonCG('nomal00');
    setDragonCGOpticity(1);

    console.log('set')
    await Wait(3000)
    console.log('set2')
    setBGOpticity(1);
    await Wait(3000)
    console.log('set3')
    setDialogOpticity(1);
    await Content(`Scripts.Ending1.1`)
    await Content(`Scripts.Ending1.2`)
    await Content(`Scripts.Ending1.3`)
    await firstValueFrom(dialogComplete$);
    await Anim(RootAnimations.FadeOut);
    router.navigate(['/game/ending'], { state: { ending: 'Ending1b' } });

    await Anim(RootAnimations.FadeIn);
}