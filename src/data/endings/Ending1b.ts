import { RootAnimations } from "@/app/app.service";
import { EndingComponent } from "@/app/pages/game/ending/ending.component";
import { firstValueFrom, } from "rxjs";

export async function Ending1b(component: EndingComponent) {
    const { setBG, setBGOpticity, Content, startEndRoll, setDialogOpticity, router, appServ, dialogComplete$ } = component;
    const { Wait } = appServ
    setBG('badend');
    Content(`Scripts.Ending1.4`)
    await firstValueFrom(dialogComplete$);
    await Wait(3000);
    setDialogOpticity(0);
    await appServ.Anim(RootAnimations.FadeIn);
    setBGOpticity(1);
    startEndRoll();
    await firstValueFrom(dialogComplete$);
    await appServ.Anim(RootAnimations.FadeOut);

    // 周目結束處理
    if (appServ.saveData.numVisits !== 100) {
        await appServ.Confirm('注意', '因爲跳關，將跳過二週目處理。');
    } else {
        appServ.saveData.NewGamePlus(false)
    }

    router.navigate(['/'], { replaceUrl: true });
    appServ.Anim(RootAnimations.FadeIn);
}