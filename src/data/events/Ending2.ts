import { RootAnimations } from "@/app/app.service";
import { DialogueComponent } from "@/app/pages/game/dialogue/dialogue.component";

export const Ending2 = async (component: DialogueComponent) => {
    const { setBG, Face, setBGOpticity, setDragonCGOpticity, Content, setDialogOpticity, router, appServ, ClearContent, SetContentCompleted } = component;
    const { Anim, Wait } = appServ

    // 1
    setBG('last2');
    appServ.setSE('snd12')
    appServ.setNotice('Scripts.Notice.SystemEvent.Title', 'Scripts.Notice.SystemEvent.01')
    await Wait(1800)

    // 7
    appServ.setNotice('Scripts.Notice.SystemWait.Title', 'Scripts.Notice.SystemWait.01')
    await Wait(1800)

    // 13
    appServ.setNotice('Scripts.Notice.SystemWait.Title', 'Scripts.Notice.SystemWait.02')
    await Wait(2100)

    // 20
    appServ.setNotice('Scripts.Notice.SystemWait.Title', 'Scripts.Notice.SystemWait.03')
    await Wait(1500)

    // 25
    appServ.setSE('snd07')
    appServ.setNotice('Scripts.Notice.SystemWait.Title', 'Scripts.Notice.SystemWait.04')
    await Wait(3000)

    // 35
    appServ.setNotice('Scripts.Notice.SystemRestart.Title', 'Scripts.Notice.SystemRestart.01')
    await Wait(6000)

    // 55
    appServ.setNotice('Scripts.Notice.SystemRestart.Title', 'Scripts.Notice.SystemRestart.02')
    await Wait(2100)

    // 62
    appServ.setSE('snd07')
    appServ.setNotice('Scripts.Notice.SystemRestart.Title', 'Scripts.Notice.SystemRestart.03')
    await Wait(1800)

    // 68
    setDialogOpticity(1)
    await Wait(2100)

    // 75
    Face('char31')
    appServ.setNotice();
    await Content('Scripts.Ending2.01')
    await Wait(1500)

    // 80
    setBGOpticity(1)
    await Wait(1500)

    // 85
    Face('char02')
    // await Wait(1500)

    // 90
    await Content('Scripts.Ending2.02')
    await Wait(600)
    // 92

    appServ.setBGM('music22')
    setDragonCGOpticity(1)
    await Wait(600)

    // 94
    Face('char09')
    await Content('Scripts.Ending2.03')

    // 96
    Face('char07')
    await Content('Scripts.Ending2.04')

    // 98
    Face('char31')
    await Content('Scripts.Ending2.05')

    // 100
    Face('char01')
    await Content('Scripts.Ending2.06')

    // 102
    Face('char31')
    await Content('Scripts.Ending2.07')

    // 104
    Face('char01')
    await Content('Scripts.Ending2.08')

    // 106
    Face('char02')
    await Content('Scripts.Ending2.09')

    // 108
    // TODO: emotion
    Face('')
    await Content('Scripts.Ending2.10')

    // 110
    Face('char06')
    await Content('Scripts.Ending2.11')

    // 112
    Face('')
    await Content('Scripts.Ending2.12')

    // 114
    Face('char06')
    await Content('Scripts.Ending2.13')

    // 116
    Face('char30')
    await Content('Scripts.Ending2.14')

    // 118
    Face('char07')
    await Content('Scripts.Ending2.15')

    // 120
    Face('char30')
    await Content('Scripts.Ending2.16')

    // 121
    Face('char02')
    await Content('Scripts.Ending2.17')

    // 122
    Face('char30')
    await Content('Scripts.Ending2.18')

    // 123
    Face('char07')
    await Content('Scripts.Ending2.19')

    // 124
    Face('char30')
    await Content('Scripts.Ending2.20')

    // 125
    Face('char04')
    await Content('Scripts.Ending2.21')

    // 126
    Face('char30')
    await Content('Scripts.Ending2.22')

    // 127
    appServ.setBGM('music29')
    await Content('Scripts.Ending2.23')

    // 128
    Face('char04')
    await Content('Scripts.Ending2.24')

    // 130
    Face('char30')
    await Content('Scripts.Ending2.25')

    // 132
    Face('char10')
    await Content('Scripts.Ending2.26')

    // 134
    Face('char30')
    await Content('Scripts.Ending2.27')

    // 136
    Face('char06')
    await Content('Scripts.Ending2.28')

    // 138
    Face('char30')
    await Content('Scripts.Ending2.29')

    // 140
    Face('char06')
    await Content('Scripts.Ending2.30')

    // 142
    Face('char30')
    await Content('Scripts.Ending2.31')


    // 144
    Face('char06')
    await Content('Scripts.Ending2.32')

    // 146
    Face('char30')
    await Content('Scripts.Ending2.33')

    // 148
    Face('char06')
    await Content('Scripts.Ending2.34')

    // 150
    Face('char30')
    await Content('Scripts.Ending2.35')

    // 152
    Face('char06')
    await Content('Scripts.Ending2.36')

    // 154
    Face('')
    setDialogOpticity(0)
    setBGOpticity(0)
    setDragonCGOpticity(0)
    ClearContent()
    await Wait(3000)

    // 170
    appServ.setAmbient('snd18')
    setBG('last')
    await Wait(1800)
    setBGOpticity(1)
    setDragonCGOpticity(1)
    setDialogOpticity(1)

    // 172
    Face('char02')
    await Content('Scripts.Ending2.37')

    // 174
    Face('')
    await Content('Scripts.Ending2.38')

    // 176
    Face('char04')
    await Content('Scripts.Ending2.39')

    // 178
    Face('')
    await Content('Scripts.Ending2.40')

    // 180
    Face('char04')
    await Content('Scripts.Ending2.41')

    // 182
    Face('')
    await Content('Scripts.Ending2.42')

    // 184
    Face('char06')
    await Content('Scripts.Ending2.43')

    // 186
    Face('')
    await Content('Scripts.Ending2.44')

    // 188
    Face('char06')
    await Content('Scripts.Ending2.45')

    // 189
    Face('')
    await Content('Scripts.Ending2.46')

    // 190
    Face('char06')
    await Content('Scripts.Ending2.47')

    // 191
    Face('')
    setDragonCGOpticity(0)
    SetContentCompleted()
    await Anim(RootAnimations.FadeOut);

    router.navigate(['/game/ending'], { state: { ending: 'Ending2b', replaceUrl: true } });

    await Anim(RootAnimations.FadeIn);
}