import { RootAnimations } from "@/app/app.service";
import { EndingComponent } from "@/app/pages/game/ending/ending.component";
import { firstValueFrom } from "rxjs";

export async function Ending2b(component: EndingComponent) {
    const { setBG, setBGOpticity, Content, Clear, setDialogOpticity, startEndRoll, router, appServ, dialogComplete$ } = component;
    const { Wait } = appServ

    component.goodEnding = true;
    setBG('goodend');

    Content(`Scripts.Ending2.48`)
    await firstValueFrom(dialogComplete$);
    await Wait(3000);

    Clear()
    Content(`Scripts.Ending2.49`)
    await firstValueFrom(dialogComplete$);
    await Wait(3000);

    Clear()
    Content(`Scripts.Ending2.50`)
    await firstValueFrom(dialogComplete$);
    await Wait(3000);
    await appServ.Anim(RootAnimations.FadeOut);
    setDialogOpticity(0);
    setBGOpticity(1);
    appServ.Anim(RootAnimations.FadeIn);
    startEndRoll();
    await firstValueFrom(dialogComplete$);
    setBGOpticity(0);
    setDialogOpticity(0);

    // 1
    appServ.setNotice('Scripts.Notice.SystemDown.Title', 'Scripts.Notice.SystemDown.01')
    await Wait(1800);

    // 7
    appServ.setNotice('Scripts.Notice.SystemDown.Title', 'Scripts.Notice.SystemDown.02')
    await Wait(3900);

    // 20
    appServ.setNotice('Scripts.Notice.SystemDown.Title', 'Scripts.Notice.SystemDown.03')
    await Wait(3000);

    // 30
    appServ.setNotice('Scripts.Notice.SystemDown.Title', 'Scripts.Notice.SystemDown.04')
    await Wait(1500);

    // 35
    appServ.setSE('snd07')
    appServ.setNotice('Scripts.Notice.SystemRecovery.Title', 'Scripts.Notice.SystemRestart.11')
    await Wait(3000);

    // 45
    appServ.setNotice('Scripts.Notice.SystemRecovery.Title', 'Scripts.Notice.SystemRestart.12')
    await Wait(4500);

    // 60
    appServ.setNotice('Scripts.Notice.SystemRecovery.Title', 'Scripts.Notice.SystemRestart.13')
    await Wait(1500);

    // 65
    appServ.setNotice('Scripts.Notice.SystemRecovery.Title', 'Scripts.Notice.SystemRestart.14')
    await Wait(3000);

    // 75
    appServ.Anim(RootAnimations.FadeOut);
    await Wait(3000);

    // 80
    // TODO: 周目結束處理
    appServ.setNotice()
    router.navigate(['/'], { replaceUrl: true });
    appServ.Anim(RootAnimations.FadeIn);
}