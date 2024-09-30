import { RootAnimations } from "@/app/app.service";
import { EndingComponent } from "@/app/pages/game/ending/ending.component";
import { firstValueFrom, timer } from "rxjs";

export async function Ending1b(component: EndingComponent) {
    const { setBG, setBGOpticity, Content, startEndRoll, router, appServ, dialogComplete$ } = component;
    const { Wait } = appServ
    setBG('badend');
    Content(`Scripts.Ending1.4`)
    await firstValueFrom(dialogComplete$);
    await appServ.Anim(RootAnimations.FadeOut);
    await Wait(3000);
    await appServ.Anim(RootAnimations.FadeIn);

    setBGOpticity(1);
    startEndRoll();
    await firstValueFrom(dialogComplete$);
    await appServ.Anim(RootAnimations.FadeOut);

    // TODO: 周目結束處理
    router.navigate(['/']);
    appServ.Anim(RootAnimations.FadeIn);
}