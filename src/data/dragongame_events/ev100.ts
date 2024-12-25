import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";
import { firstValueFrom } from "rxjs";
import { RootAnimations } from "@/app/app.service";

/**「去り逝く者」*/
const ev100 = async (component: DragongameComponent) => {

    const {  appServ, Face, Content, SetContentCompleted, DisableAllActions, router } = component
    DisableAllActions(true);
    appServ.setBGM('music23')

    Face('char10');
    /**
……………。
……発作が、始まったっす。
{{yourName}} さん……どうか、最後まで見届けてくださいっす。
ボクも、一緒に見届けるっすから。
勇敢な {{dragonName}} の姿を、最期まで。
     */
    await Content(`Scripts.Ev100.1`)
    Face('char10a')

    SetContentCompleted()

    await appServ.Anim(RootAnimations.FadeOut);
    router.navigate(['/game/dialogue'], { state: { event: 'Ending1' } });
    await appServ.Anim(RootAnimations.FadeIn);
}

export default ev100;