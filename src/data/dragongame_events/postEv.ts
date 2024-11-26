import { DragongameComponent } from '@/app/pages/game/dragongame/dragongame.component';
import { BioFlag } from '../BioFlag';

export const PostEventAfterDragonGameEvent = async (component: DragongameComponent) => {
	const { appServ, Face, SetContentCompleted, IsContentComplete, Content, DisableAllActions } = component


	// ニエルのアドバイス（ニエルが異常状態のときは発現せず）
	if ((appServ.saveData.numVisits != 81) && (appServ.saveData.numVisits != 82) && (appServ.saveData.numVisits != 83) && (appServ.saveData.numVisits != 42)) {
		if (IsContentComplete()) {
			if (appServ.saveData.bio & BioFlag.衰弱) {
				Face("char01");
				/*
				衰弱症にかかってるじゃないっすか。
				休養を取って、体力を十分に回復させれば 大丈夫っすよ。
				*/
				await Content('Scripts.Bio.1');
				SetContentCompleted()
				Face('char01a');
			}
			if (appServ.saveData.bio & BioFlag.破傷) {
				Face('char02');
				/*
				傷口からばい菌が入ったみたいっすね。
				どうやら破傷風にかかってるっす。
				たしか、街で売ってる薬が効いたはずっすが…。
				*/
				await Content('Scripts.Bio.2');
				SetContentCompleted()
				Face("char02a");
			}
			if (appServ.saveData.bio & BioFlag.育障) {
				Face('char02');
				/*
				何かが原因で育成障害を発症してるっすね。
				市販の薬と魔法アイテムの一種をかけ合わせて調合すれば、
				治療できるはずなんっすが…。
				*/
				await Content('Scripts.Bio.4');
				SetContentCompleted()
				Face("char02a");
			}
			if (appServ.saveData.bio & BioFlag.風邪) {
				Face('char01');
				/*
				竜風邪をひいてるっすか？
				そういう時は、ぐっすり寝て治すにかぎるっすよ。
				*/
				await Content('Scripts.Bio.8');
				SetContentCompleted()
				Face("char01a");
			}
			if (appServ.saveData.bio & BioFlag.恐怖) {
				Face('char02');
				/*
				恐怖症にかかってるっすね。
				試合で怖い目にでもあったんっすかねぇ…。
				ある「証」か、宝石と市販薬とを調合すればいいと聞いているっすが…。
				*/
				await Content('Scripts.Bio.16');
				SetContentCompleted()
				Face("char02a");
			}
			if (appServ.saveData.bio & BioFlag.重症) {
				Face('char02');
				/*
				重症にかかってるじゃないっすか！？
				まったく何をやってるっすか！
				急いで、市販薬と、洞窟にしか生えていない薬草を調合するっす。
				材料は持ってるっす？
				*/
				await Content('Scripts.Bio.32');
				SetContentCompleted()
				Face("char02a");
			}
		}
	}

	// ゲーム途中でのイベント発生メッセージ --------------------------------------
	if (appServ.saveData.bio & BioFlag.発作) {								// 病気回復イベント
		if (appServ.saveData.item[15]) {
			DisableAllActions(true);
			Face('char07');
			await Content('Scripts.Disease.Restore.1');
			Face("char07a");
			component.router.navigate(['/game/dialogue'], { state: { event: 'Eventend' } });

			// 這邊要跳到病氣恢復dialogue
		} else if (appServ.waitTimeMinutes < 60) {					// 病気時会話パターン
			Face('char00');
			await Content('Scripts.Bio.128');
			SetContentCompleted()
		}
		SetContentCompleted();
	}


	// 2度目のハッキングイベント
	if ((appServ.saveData.ivent & 4096) && (appServ.saveData.ivent & 8192) && !(appServ.saveData.ivent & 1024)) {
		appServ.setBGM('music19')

		DisableAllActions(true);
		// 當warningFlg觸發時，播放效果音snd05
		// varWARNINGFlg = 1;
		/*
		‥‥？？！！
		Face('char00');
		PS_WARNINGMsgCmd2(0);
		showLAYER('Ray6');
		*/
	}

}