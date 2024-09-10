import { EndingComponent } from "@/app/pages/game/ending/ending.component";
import { firstValueFrom, timer } from "rxjs";

export async function Ending1b(component: EndingComponent) {
    component.setBG('badend');
    component.Content(
`一直以來…… 主人 …… 

你說過會一直想見我，

並且會再見到我對吧……。 

會見到的……

對…… 

我…… 就快了……。

比風還要輕……


要去……


你那裡……。
`)
    await firstValueFrom(component.dialogComplete$);
    await firstValueFrom(timer(3000));
    component.setDialogOpticity(0);
    component.setBGOpticity(1);
    component.startEndRoll();
    await firstValueFrom(component.dialogComplete$);
    await firstValueFrom(timer(3000));
    component.appServ.fadeOut();
    await firstValueFrom(timer(3000));

    // TODO: 周目結束處理
    component.router.navigate(['/']);
    component.appServ.fadeIn();
}