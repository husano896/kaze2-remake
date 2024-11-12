import { DragongameComponent } from "@/app/pages/game/dragongame/dragongame.component";

export const PostEventAfterDragonGameEvent = (component: DragongameComponent) => {
/*
            // 発作の発生
            if (((numVisits == 52) || (numVisits == 10)) && (WaitTimeM >= 60)) {
                bio |= 128;
            }

            // 発作の自然治癒
            if (((numVisits == 55) || (numVisits == 13)) && (WaitTimeM >= 60) && (bio & 128)) {
                bio ^= 128;
            }


		// ニエルのアドバイス（ニエルが異常状態のときは発現せず）
		if ((numVisits != 81) && (numVisits != 82) && (numVisits != 83) && (numVisits != 42)) {
			if (((varMsg[0] == "   ") || (varMsg[0] == "")) && (bio & 1)) {
				varFaice = "char01a.gif";
				self.document.BigIcon.src = 'image/char01.gif';
				varMsg[0] = "衰弱症にかかってるじゃないっすか。";
				varMsg[1] = "休養を取って、体力を十分に回復させれば 大丈夫っすよ。";
				varMsg[2] = "";
				varMsg[3] = "";
				varMsg[4] = "";
				varMsg[5] = "";
			}
			if (((varMsg[0] == "   ") || (varMsg[0] == "")) && (bio & 2)) {
				varFaice = "char02a.gif";
				self.document.BigIcon.src = 'image/char02.gif';
				varMsg[0] = "傷口からばい菌が入ったみたいっすね。";
				varMsg[1] = "どうやら破傷風にかかってるっす。";
				varMsg[2] = "たしか、街で売ってる薬が効いたはずっすが…。";
				varMsg[3] = "";
				varMsg[4] = "";
				varMsg[5] = "";
			}
			if (((varMsg[0] == "   ") || (varMsg[0] == "")) && (bio & 4)) {
				varFaice = "char02a.gif";
				self.document.BigIcon.src = 'image/char02.gif';
				varMsg[0] = "何かが原因で育成障害を発症してるっすね。";
				varMsg[1] = "市販の薬と魔法アイテムの一種をかけ合わせて調合すれば、";
				varMsg[2] = "治療できるはずなんっすが…。";
				varMsg[3] = "";
				varMsg[4] = "";
				varMsg[5] = "";
			}
			if (((varMsg[0] == "   ") || (varMsg[0] == "")) && (bio & 8)) {
				varFaice = "char01a.gif";
				self.document.BigIcon.src = 'image/char01.gif';
				varMsg[0] = "竜風邪をひいてるっすか？";
				varMsg[1] = "そういう時は、ぐっすり寝て治すにかぎるっすよ。";
				varMsg[2] = "";
				varMsg[3] = "";
				varMsg[4] = "";
				varMsg[5] = "";
			}
			if (((varMsg[0] == "   ") || (varMsg[0] == "")) && (bio & 16)) {
				varFaice = "char02a.gif";
				self.document.BigIcon.src = 'image/char02.gif';
				varMsg[0] = "恐怖症にかかってるっすね。";
				varMsg[1] = "試合で怖い目にでもあったんっすかねぇ…。";
				varMsg[2] = "ある「証」か、宝石と市販薬とを調合すればいいと聞いているっすが…。";
				varMsg[3] = "";
				varMsg[4] = "";
				varMsg[5] = "";
			}
			if (((varMsg[0] == "   ") || (varMsg[0] == "")) && (bio & 32)) {
				varFaice = "char02a.gif";
				self.document.BigIcon.src = 'image/char02.gif';
				varMsg[0] = "重症にかかってるじゃないっすか！？";
				varMsg[1] = "まったく何をやってるっすか！";
				varMsg[2] = "急いで、市販薬と、洞窟にしか生えていない薬草を調合するっす。";
				varMsg[3] = "材料は持ってるっす？";
				varMsg[4] = "";
				varMsg[5] = "";
			}
		}
	}

	// ゲーム途中でのイベント発生メッセージ --------------------------------------
	if (bio & 128) {								// 病気回復イベント
		if (ItemCheck(15) == 0) {
			DathFlg = 1;
			varFaice = "char07a.gif";
			self.document.BigIcon.src = 'image/char07.gif';
			varMsg[0] = "んっ？" + DragonName + " の口にくわえているのは、もしかして？";
			varMsg[1] = "………。やはり間違いないっす。これは…発作に効く薬の原料っす！";
			varMsg[2] = "ちょっと貸してっす。 ごそごそ……ゴリゴリ……トポトポ……";
			varMsg[3] = "うん、これでできたっす！ " + DragonName + "、これを飲んでみるっす！";
			varMsg[4] = "[ニエルが薬を飲ませると 孤竜の顔色はよくなり、荒い息も次第に静まっていった]";
			varMsg[5] = "ふぅ…　これでひとまずは安心っす。　　　　　　　　　　　　　　";
		} else if (WaitTimeM < 60) {					// 病気時会話パターン
			self.document.BigIcon.src = 'image/char00.gif';
			varMsg[0] = "ハァハァ…ゼェゼェ…";
			varMsg[1] = "………。";
			varMsg[2] = ""; varMsg[3] = ""; varMsg[4] = ""; varMsg[5] = "";
		}
	}


	// 2度目のハッキングイベント
	if ((ivent & 4096) && (ivent & 8192) && !(ivent & 1024)) {
		moto = new String(parent.MUSIC.location);
		if ((moto.search(/music19/i) == -1) && (ivent & 1)) { parent.MUSIC.location.href = 'music19.html'; }
		DathFlg = 1;
		varWARNINGFlg = 1;
		varMsg[0] = "‥‥？？！！";
		self.document.BigIcon.src = 'image/char00.gif';
		PS_WARNINGMsgCmd2(0);
		showLAYER('Ray6');
	}
*/
}