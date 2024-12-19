import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";

const ev063 = async (component: DragongameComponent) => {

    const { setDialogueSE, ClearContent, DisableAllActions, appServ, Face, Content, SetContentCompleted } = component

    appServ.setBGM('music02')
    if (appServ.waitTimeMinutes >= 60) {
		appServ.setBGM('music19')

		DisableAllActions(true);
		ClearContent();
		Face('char00')
        /** ……！？！？ */
		Content(`Scripts.Ev063.1`)
		await appServ.Wait(1000)

		const hackedMessages = appServ.t('Scripts.Notice.Hacked1.Content.1') as string;
		const hackedMessagesLines = hackedMessages.split('\n');

		for (let i = 1; i < hackedMessagesLines.length; i++) {
			appServ.setNotice2('', hackedMessagesLines.slice(0, i).join('\n'))
			if (i === hackedMessagesLines.length - 4) {
				component.hacked = true;
				component.skipWait = true;
				console.log(component)
				appServ.setRadialEffect('#FF0000', false, 500)
				Face('char99')
			}
			else if (i === hackedMessagesLines.length - 1) {
				appServ.setRadialEffect('#FF0000', true, 1000)
			}
			await appServ.Wait(2500)
		}
		appServ.setNotice('SYSTEM CALL', appServ.t('Scripts.Notice.Hacked.Ray3.1'))
		ClearContent();
		setDialogueSE('snd05')
        /**
            フッ…こんなセキュリティー、私にかかればないに等しいな。
            {{yourName}}という名か、面白い。お前は最近、病気について探っているな？
            これは我々の世界の問題だ！ 異界の者が首を突っ込むような事ではない。
            いいか、これは脅しではない。警告だ。 これ以上この件に首を突っ込むと……
            フッ…。まあ、お前がこの世界の者でなくて運が良かったと思うがいい。
            クックックックッ……………
         */
		await Content('Scripts.Ev063.2')

		component.hacked = false;
		appServ.setNotice2()
		appServ.setNotice('SYSTEM CALL', 'Scripts.Notice.Hacked.Restore.Content')

		appServ.setRadialEffect()
		DisableAllActions(false)
		Face('char00')

		appServ.setBGM('music02');
		setDialogueSE('snd04');

		component.skipWait = false;
        
    } else {
        appServ.setBGM('music05')
        Face('char07')
        /**
            "先ほどハッキングがあったっす？ 被害がなかっただけよかったっすね…。
            病気の秘密を探るな…と脅されたっすか？
            うぅーん、この病気…ひょっとすると 裏に何かあるかもしれないっすねぇ。
            今後は こっちの見回りを厳重にして、安全を強化するっすよ。
            {{yourName}}さん、あんな脅しに負けちゃいけないっす！　ガンバっすよ♪
            ボクも 協力するっすから、一緒に戦っていこうっす！
         */
        await Content(`Scripts.Ev063.3`)
        Face('char07a')
    }
    SetContentCompleted()
}

export default ev063;