import { RootAnimations } from "@/app/app.service";
import { EndingComponent } from "@/app/pages/game/ending/ending.component";
import { firstValueFrom, } from "rxjs";

export async function Ending1b(component: EndingComponent) {
    const { location, setBG, setBGOpticity, Content, startEndRoll, setDialogOpticity, router, appServ, Save, dialogComplete$ } = component;

    const { debugMenu } = location.getState() as { event: string, lv: string, debugMenu: boolean };

    setBG('badend');
    Content(`Scripts.Ending1.4`)
    await firstValueFrom(dialogComplete$);
    await appServ.Anim(RootAnimations.FadeOut);
    setDialogOpticity(0);
    await appServ.Anim(RootAnimations.FadeIn);
    setBGOpticity(1);
    startEndRoll();
    await firstValueFrom(dialogComplete$);
    await appServ.Anim(RootAnimations.FadeOut);

    // 周目結束處理
    if (debugMenu) {
        await appServ.Confirm('注意', '因為Debug, 不做二週目處理.');
    } else {
        appServ.saveData.NewGamePlus(false)
        
    }
    await Save()
    router.navigate(['/'], { replaceUrl: true });
    appServ.Anim(RootAnimations.FadeIn);
}