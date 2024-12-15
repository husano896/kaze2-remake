import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";
import { firstValueFrom, timer } from "rxjs";

// varBaseFaice為說完話後的頭圖
export const Opening = async (component: DialogueComponent) => {
    console.log(this)
    const { setBG, setDragonCG, setBGOpticity, setDialogOpticity, SetSkipCallback, setDragonCGOpticity, Face, Content, ClearContent, router, appServ, dialogStart$ } = component;
    const { toggleRay1, setNotice, Wait } = appServ

    const skip = () => {
        router.navigate(['/game/dragongame'])
    }
    setBG('welcome')
    setDragonCG('nomal01');
    setBGOpticity(1);
    appServ.setBGM('music01')
    appServ.setAmbient('snd16')
    await toggleRay1();

    // 20
    Face('char04');
    setDialogOpticity(1)
    await Content(`Scripts.Opening1.1`)
    Face('char04a');
    await firstValueFrom(dialogStart$);

    // 24
    setDragonCGOpticity(1);
    ClearContent();
    await Wait(1500);

    // 30
    await Content(`Scripts.Opening1.2`)
    await firstValueFrom(dialogStart$);

    // 32
    Face('char09');

    setDragonCGOpticity(0);
    await Content(`Scripts.Opening1.3`)
    Face('char09a');
    await firstValueFrom(dialogStart$);

    // 33
    await Content(`Scripts.Opening1.4`);
    await firstValueFrom(dialogStart$);

    //34
    Face('char04');
    await Content(`Scripts.Opening1.5`);
    Face('char04a');
    await firstValueFrom(dialogStart$);

    // 36
    Face('char01');
    await Content(`Scripts.Opening1.6`);
    Face('char01a');
    await firstValueFrom(dialogStart$);

    // 38
    setBGOpticity(0);
    await Wait(1500);
    setBG('home');
    setBGOpticity(1);
    await Wait(1500);
    appServ.setBGM('music21');

    // 44
    Face('char01a');
    await Content(`Scripts.Opening1.7`);
    Face('char01');
    await firstValueFrom(dialogStart$);

    // 47
    setDragonCGOpticity(1);
    await Content(`Scripts.Opening1.8`);
    await firstValueFrom(dialogStart$);

    // 49

    Face('char04');
    await Content(`Scripts.Opening1.9`);
    Face('char04a');
    await firstValueFrom(dialogStart$);

    // 52
    Face('char01');
    appServ.setSE('snd07');
    setNotice('Scripts.Notice.SystemUpdate.Title', 'Scripts.Notice.SystemUpdate.01');
    await Wait(3900);
    // 65
    setNotice('Scripts.Notice.SystemUpdate.Title', 'Scripts.Notice.SystemUpdate.02');
    await Wait(3000)
    // 75
    skip();
    setNotice();
}