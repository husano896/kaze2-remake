import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { delay, firstValueFrom, of, timer } from "rxjs";

export async function Ending1(component: DialogueComponent) {
    component.appServ.setBGM('victim')
    component.setBG('welcome')
    component.setDragonCG('nomal00');
    component.setDragonCGOpticity(1);
    
    console.log('set')
    await firstValueFrom(timer(3000))
    console.log('set2')
    component.setBGOpticity(1);
    await firstValueFrom(timer(3000))
    console.log('set3')
    component.setDialogOpticity(1);
    component.Content(
        `
主人 ………… 主人 …………
之前我們聊過了……死亡是什麼樣的感覺……死後會去往何處…… 
那裡呢……一定是所有想要離開這個世界的生物， 包括龍、人、鳥類、動物、草木……所有的生物都會前往的地方…… 
而且，會一直……變得幸福的地方……。
`)
    component.Content(
        `
`)
    component.Content(
        `
但是，一定......不只有那樣而已.....。
再一次回來......然後，也許再一次變成好朋友......
相信會那樣的......也想要你這樣相信......。
`)
    component.Content(
        `
`)
    component.Content(
        `
所以，世界就是......死去......和重生......週而復始......。
`)
    await firstValueFrom(component.dialogComplete$);

    component.setBGOpticity(0);
    component.setDragonCGOpticity(0);
    component.setDialogOpticity(0);
    await firstValueFrom(timer(3000))
    component.router.navigate(['/game/ending'], {state: {ending: 'Ending1b'}});
}