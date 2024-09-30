import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { EventFlag } from "../EventFlag";
import { firstValueFrom } from "rxjs";
import { RootAnimations } from "@/app/app.service";

/**「去り逝く者」*/
const ev100 = async (component: DragongameComponent) => {

    const { dialogComplete$, appServ, Face, Content, SetContentCompleted, DisableAllActions, router } = component
    DisableAllActions(true);
    appServ.setBGM('music23')
    Face('char10');
    await Content(`Scripts.Ev100.1`)
    Face('char10a')
    await firstValueFrom(dialogComplete$);
    SetContentCompleted()
    await appServ.Anim(RootAnimations.FadeOut);
    router.navigate(['/game/dialogue'], { state: { event: 'Ending1' } });
    await appServ.Anim(RootAnimations.FadeIn);
}

export default ev100;