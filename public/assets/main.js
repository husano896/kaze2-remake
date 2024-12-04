var expire = new Date();
var numVisits = 0;
var varID = "";
var DragonName = "";
var yourName = "";
var varExp = 0;
var LoadTime = 0;
var WaitTime = 0;
var item = 0;
var food = 10;
var love = 110;
var turn = 10;
var lv = 0;
var hp = 10;
var Maxhp = 10;
var at = 2;
var df = 3;
var speed = 3;
var element1 = 50;
var element2 = 50;
var ivent = 0;
var DragonChip1 = 0;
var DragonChip2 = 0;
var magic = 0;
var magicS = 0;
var bio = 0;
var pass;
var ans = 0;	//計算用
var ans2 = 0;
var ans3 = 0;
var ans4 = 0;
var ItemMax = 9;	//同一アイテム同時所持上限
var fil;
var lank;
var lank2;
var lank3;
var varNowLv;
var varOverLv;

var DragonWidth = 360;
var DragonHeight = 336;
var varItmCod = 65;		// アイテムコード
var you, my, go01, go02, go03;
var varFaice = "";		// ニエル表情パターン

var z = varItmCod;
varItem = new Array(z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z, z); // 所持アイテム(最大所持数+1を記入すること)
varMasicSpl = new Array("炎防壁術", "風防壁術", "地防壁術", "水防壁術", "リフレックス", "リプレス", "スペウォール", "ドレーン", "リカーブ", "再生の霧", "ロスト", "竜の風息", "岩の砕息", "竜の氷息", "炎の吐息", "インフェルノ", "メガラース", "エンド･オブ･アイズ", "ナイトメア･ハズ･ビガン");
varMasicSpl2 = new Array(
	"炎属性による攻撃から防備",
	"風属性による攻撃から防備",
	"地属性による攻撃から防備",
	"水属性による攻撃から防備",
	"相手の技を反射する",
	"相手と自分のＨＰを入替え",
	"技攻撃を無効化する",
	"相手のＨＰを吸収する",
	"小回復する",
	"大回復する",
	"相手の素早さを減らす",
	"属性による風ブレス",
	"属性による地ブレス",
	"属性による水ブレス",
	"属性による炎ブレス",
	"筋力による無属性負怨弾",
	"筋力による無属性真空波",
	"筋力による無属性閃光撃",
	"自己犠牲による一撃攻撃技");
LoveDat = new Array("冷酷", "疎遠", "知人", "許人", "近縁", "友達", "暖友", "親友", "親密", "溺愛", "真親", "一心同体");
varItemName = new Array(
	"不所持",
	"タリスマン",
	"太陽の珠",
	"銀峰の雫",
	"風の翼",
	"大地の琥珀",
	"ナーガ草",
	"復活の玉",
	"友情の証",
	"精霊根",
	"召喚の杖",
	"精霊の眼鏡",
	"ＤＮＡ種",
	"ユニコーン角",
	"光りキノコ",
	"精竜水",
	"誇りの賞状",
	"万物の素",
	"生ケーキ",
	"虚無の塊",
	"魔法のクジ",
	"幻の秘石",
	"下手な似顔絵",
	"抗生薬",
	"催酔薬",
	"忌地への道標",
	"Err26:危険コード",
	"Err27:危険コード",
	"Err28:危険コード",
	"Err29:危険コード",
	"Err30:危険コード",
	"Err31:危険コード",
	"ニステアの滴",
	"水晶ランタン",
	"ささやかな財宝");

varItemDoc = new Array(
	"なし",
	"<font color=#ffcc88>消費：</font>恐怖に打ち勝つ属性汎用石",
	"<font color=#88ccff>永久：</font>孤竜が生みだした炎の結晶",
	"<font color=#88ccff>永久：</font>孤竜が生みだした水の結晶",
	"<font color=#88ccff>永久：</font>孤竜が生みだした風の結晶",
	"<font color=#88ccff>永久：</font>孤竜が生みだした地の結晶",
	"<font color=#ffcc88>消費：</font>重症薬の原料。回復力がある",
	"<font color=#ffcc88>消費：</font>竜の身代わりになる玉",
	"<font color=#ffcc88>消費：</font>友との絆を深めるお守り",
	"<font color=#ffcc88>消費：</font>体力を回復させる薬草",
	"<font color=#88ffcc>特殊：</font>一瞬で地上へ帰還する魔具",
	"<font color=#88ccff>永久：</font>孤竜の内部構成を透かす魔具",
	"<font color=#ffcc88>消費：</font>秘めた能力を呼び覚ます種",
	"<font color=#ffcc88>消費：</font>様々な病に効く妙薬の原料",
	"<font color=#ffcc88>消費：</font>力の溢れる不思議な茸",
	"<font color=#88ffcc>特殊：</font>発作の特効薬",
	"<font color=#ffcc88>消費：</font>属性上昇数を２倍・調合用",
	"<font color=#ffcc88>消費：</font>あらゆる属性の素・調合用",
	"<font color=#ffcc88>消費：</font>竜が大好きな甘いお菓子",
	"<font color=#ffcc88>消費：</font>全ての属性を無に帰す塊",
	"<font color=#ffcc88>消費：</font>数千～数シェル配当のクジ",
	"<font color=#ffcc88>消費：</font>友好度のＬＶを１つあげる",
	"<font color=#88ccff>永久：</font>孤竜が描いてくれた似顔絵",
	"<font color=#ffcc88>消費：</font>調合次第で様々な病気に有効",
	"<font color=#ffcc88>消費：</font>催眠/鎮痛/抗体維持に効用",
	"<font color=#88ccff>永久：</font>病の治療のカギが記される",
	"所持危険 報告して下さい",
	"所持危険 報告して下さい",
	"所持危険 報告して下さい",
	"所持危険 報告して下さい",
	"所持危険 報告して下さい",
	"所持危険 報告して下さい",
	"<font color=#88ffcc>特殊：</font>泣き虫星・ニステアの涙",
	"<font color=#88ffcc>特殊：</font>水晶に水が詰まった発光水晶",
	"<font color=#88ccff>永久：</font>砂金の塊。少量の価値がある");

varDragoType = new Array(
	"不所持",
	"バルバチェイン",
	"ヴァンパネラ",
	"マンドレイク",
	"DragonHeadBuck",
	"管狐",
	"パイロヒドラ",
	"トピリア",
	"ジン",
	"ママルバーン",
	"ボルガノドン",
	"ヘイズロック",
	"ケツァルコアトル",
	"ゾンドドレイク",
	"バジリコック",
	"ショコラフッフール",
	"ギガウインド",
	"フィオレッティ",
	"ラジェスト",
	"幼竜",
	"児竜",
	"べトリブニス");

varDragoDoc = new Array(
	"元の姿に戻る[属性で変身可能]",
	"DNAの副産物",
	"古城に住まう吸血竜",
	"植物に憑依し彷徨う霊",
	"暗き森に住まう魔獣",
	"大地に豊饒を運ぶ精霊獣",
	"水の力を司る神獣",
	"森を守護する精霊獣",
	"DNAの副産物",
	"ドラゴンバレーに住む無邪気な竜",
	"炎の力を司る神獣",
	"地の力を司る神獣",
	"古代竜の怨念霊",
	"遺跡を守る守護霊",
	"DNAの副産物",
	"カザリナ山に住まう心優しき竜",
	"風の力を司る神獣",
	"中級クラスの契約加護印",
	"伝説に語り継がれる戦竜",
	"初心者向けの契約加護印",
	"入門クラスの契約加護印",
	"父親の姿を再現する加護印");

var varBrackChak;
var keyflg = 0;



with (document) {
	write("<STYLE TYPE='text/css'><!--");
	write("BODY, TH, TD { font-size: 12pt; }");
	write("	A:link   { text-decoration:none; }");
	write("	A:visited{ text-decoration:none; }");
	write("	A:hover  { color:#00ff00; text-decoration:underline; }");
	write("--></STYLE>");
}


if (navigator.appName == "Microsoft Internet Explorer") {
	document.write("<BASEFONT SIZE=3>");
}
if (navigator.appName == "Netscape") {
	document.write("<BASEFONT SIZE=1>");
}


// 数値を文字イメージに変換
function PS_FontImage(kazu) {
	var i, a, b, ret = "";
	a = new String(kazu);
	for (i = 0; i < a.length; i++) {
		b = new String(a.charAt(i));
		ret += "<IMG src='image/" + b + ".gif'>";

	}
	return (ret);
}


// アイテムソート
function ItemSort() {
	var i = 0, j = 0, sam = 0;	// ループ用

	// アイテム消費時のリストソート
	sam = varItem.length - 1; i = 0;
	do {
		if ((varItem[i + 1] - varItmCod) <= 0) {
			for (j = i; j < varItem.length - 3; j += 2) {
				varItem[j] = varItem[j + 2];
				varItem[j + 1] = varItem[j + 3];
			}
			varItem[varItem.length - 2] = varItmCod;
			varItem[varItem.length - 1] = varItmCod;
			sam -= 2; i = -2;
		}
		i += 2;
	} while (i < sam)
}


// アイテムをゲット
function ItemUse(addItem) {
	var i;
	var flg = 1;

	for (i = 0; i < varItem.length; i += 2) {	// 同じアイテムを所有していれば個数を増加
		if ((varItem[i] - varItmCod) == addItem) {
			if ((varItem[i + 1] - varItmCod) < ItemMax) varItem[i + 1]++;
			flg = 0;
		}
	}

	if (flg) {
		for (i = 0; i < varItem.length; i += 2) {// 未登録アイテムがあれば新規に追加
			if ((varItem[i] - varItmCod) <= 0) {
				varItem[i] = (addItem + varItmCod);
				varItem[i + 1] = varItmCod + 1;
				break;
			}
		}
	}
}



// アイテムを消費
function ItemErase(addItem) {
	var i;
	var flg = 1;

	for (i = 0; i < varItem.length; i += 2) {	// 同じアイテムを所有していれば個数を減少
		if ((varItem[i] - varItmCod) == addItem) {
			if ((varItem[i + 1] - varItmCod) >= 1) varItem[i + 1]--;
			flg = 0;
		}
	}
	ItemSort();
}



// アイテムをチェック(返値:  1:所有なし	0:所有あり)
function ItemCheck(addItem) {
	var i;
	var flg = 1;

	for (i = 0; i < varItem.length; i += 2) {	// 同じアイテムを所有していればフラグオフ
		if ((varItem[i] - varItmCod) == addItem) {
			flg = 0;
			break;
		}
	}
	return (flg);
}


// アイテム個数チェック(返値:  0:所有なし)
function ItemKazu(addItem) {
	var i;
	var flg = 0;

	for (i = 0; i < varItem.length; i += 2) {	// 同じアイテムを所有していればフラグオフ
		if ((varItem[i] - varItmCod) == addItem) {
			flg = varItem[i + 1] - varItmCod;
			break;
		}
	}
	return (flg);
}


// cookieをセットする
function setCookie(name, value, expire) {
	document.cookie = name + "=" + escape(value) + "; expires=" + expire.toGMTString();
}


// cookieを切り分ける
function getCookie(name) {
	// cookie名は必ず@マークで始まる
	var cName = name + "=";
	var cNameLen = cName.length
	var myCookie = document.cookie;
	var startPos = myCookie.indexOf(cName);
	var endPos;
	if (document.cookie.length == 0) return null;
	if (startPos != -1) {
		startPos = startPos + cNameLen;
		endPos = myCookie.indexOf(";", startPos);
		//「;」がなければ最後の要素
		if (endPos == -1) endPos = document.cookie.length;
		return unescape(myCookie.substring(startPos, endPos));
	}
	return null;
}


// ＤＡＴＡセーブ
function DataSave() {
	var time = expire.getTime();
	var garyuPass;
	var garyuHP;
	var garyuMag;
	var i, cd = "";

	// turn=990;
	/*
	alert();
		 varItem[0]=1+varItmCod;	 varItem[1]=9+varItmCod;
		 varItem[2]=2+varItmCod;	 varItem[3]=9+varItmCod;
		 varItem[4]=3+varItmCod;	 varItem[5]=9+varItmCod;
		 varItem[6]=4+varItmCod;	 varItem[7]=9+varItmCod;
		 varItem[8]=5+varItmCod;	 varItem[9]=9+varItmCod;
		 varItem[10]=6+varItmCod;	 varItem[11]=9+varItmCod;
		 varItem[12]=7+varItmCod;	 varItem[13]=9+varItmCod;
		 varItem[14]=8+varItmCod;	 varItem[15]=9+varItmCod;
		 varItem[16]=9+varItmCod;	 varItem[17]=9+varItmCod;
		 varItem[18]=10+varItmCod;	 varItem[19]=9+varItmCod;
		 varItem[20]=11+varItmCod;	 varItem[21]=9+varItmCod;
		 varItem[22]=12+varItmCod;	 varItem[23]=9+varItmCod;
		 varItem[24]=13+varItmCod;	 varItem[25]=9+varItmCod;
		 varItem[26]=14+varItmCod;	 varItem[27]=9+varItmCod;
		 varItem[28]=15+varItmCod;	 varItem[29]=9+varItmCod;
		 varItem[30]=16+varItmCod;	 varItem[31]=9+varItmCod;
		 varItem[32]=17+varItmCod;	 varItem[33]=9+varItmCod;
		 varItem[34]=18+varItmCod;	 varItem[35]=9+varItmCod;
		 varItem[36]=19+varItmCod;	 varItem[37]=9+varItmCod;
		 varItem[38]=20+varItmCod;	 varItem[39]=9+varItmCod;
		 varItem[40]=21+varItmCod;	 varItem[41]=9+varItmCod;
		 varItem[42]=22+varItmCod;	 varItem[43]=9+varItmCod;
		 varItem[44]=23+varItmCod;	 varItem[45]=9+varItmCod;
		 varItem[46]=24+varItmCod;	 varItem[47]=9+varItmCod;
		 varItem[48]=25+varItmCod;	 varItem[49]=9+varItmCod;
		 varItem[50]=32+varItmCod;	 varItem[51]=9+varItmCod;
		 varItem[52]=33+varItmCod;	 varItem[53]=9+varItmCod;
		 varItem[54]=34+varItmCod;	 varItem[55]=9+varItmCod;
	*/

	// アイテムコード圧縮(数値を文字へ)
	for (i = 0; i < varItem.length; i++) {
		cd += new String(String.fromCharCode(varItem[i]));
	}
	garyuHP = Maxhp + "/" + hp;
	garyuPass = DragonName + "/" + pass + "/" + varID;
	garyuMag = new String(magic) + "," + new String(magicS);
	garyuIvent = new String(ivent) + "," + new String(DragonChip1) + "," + new String(DragonChip2);

	// 31日後にクッキーを消去
	expire.setTime(expire.getTime() + (31 * 24 * 60 * 60 * 1000));
	setCookie("@garyuname", yourName, expire);//ユーザー名
	setCookie("@garyudragon", garyuPass, expire);//ドラゴン名/パスワード/ID
	setCookie("@garyu_visits", numVisits, expire);//訪問回数
	setCookie("@garyustart", varExp, expire);//戦闘勝利Exp
	setCookie("@garyulogin", LoadTime, expire);//前回やめた時間
	setCookie("@garyulove", love, expire);//Love
	setCookie("@garyuturn", turn, expire);//turn
	setCookie("@garyufood", food, expire);//food
	setCookie("@garyuitem", cd, expire);//ITEM
	setCookie("@garyuLV", lv, expire);//Lv
	setCookie("@garyuHP", garyuHP, expire);//HP
	setCookie("@garyuAT", at, expire);//AT
	setCookie("@garyuDF", df, expire);//DF
	setCookie("@garyuSP", speed, expire);//SPEED
	setCookie("@garyuEM1", element1, expire);//ELEMENT1
	setCookie("@garyuEM2", element2, expire);//ELEMENT2
	setCookie("@garyuIV", garyuIvent, expire);//IVENT
	setCookie("@garyuMAG", garyuMag, expire);//MAGIC
	setCookie("@garyuBIO", bio, expire);//BIO
	expire.setTime(time);
}


// ＤＡＴＡロード
function DataLoad() {
	strDat = new Array();
	var garyuPass;
	var garyuHP;
	var garyuMag;
	var cd;
	var i;

	yourName = getCookie("@garyuname");				//ユーザー名
	garyuPass = getCookie("@garyudragon");			//ドラゴン名/パスワード/ID
	numVisits = parseInt(getCookie("@garyu_visits"));	//訪問回数
	varExp = parseInt(getCookie("@garyustart"));	//戦闘勝利Exp
	LoadTime = parseInt(getCookie("@garyulogin"));	//前回やめた時間
	love = parseInt(getCookie("@garyulove"));	//Love
	turn = parseInt(getCookie("@garyuturn"));	//turn
	food = parseInt(getCookie("@garyufood"));	//food
	cd = getCookie("@garyuitem");				//ITEM
	lv = parseInt(getCookie("@garyuLV"));		//Lv
	garyuHP = getCookie("@garyuHP");				//HP
	at = parseInt(getCookie("@garyuAT"));		//AT
	df = parseInt(getCookie("@garyuDF"));		//DF
	speed = parseInt(getCookie("@garyuSP"));		//SPEED
	element1 = parseInt(getCookie("@garyuEM1"));		//ELEMENT1
	element2 = parseInt(getCookie("@garyuEM2"));		//ELEMENT1
	garyuIvent = getCookie("@garyuIV");				//IVENT
	garyuMag = getCookie("@garyuMAG");				//MAGIC
	bio = parseInt(getCookie("@garyuBIO"));		//BIO

	// アイテムコード展開(文字コードを数値に)
	if (!cd) cd = "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
	for (i = 0; i < varItem.length; i++) {
		varItem[i] = cd.charCodeAt(i);
	}

	if (!garyuPass) garyuPass = "/";
	strDat = garyuPass.split("/");
	DragonName = strDat[0];
	pass = strDat[1];
	varID = strDat[2];

	if (!garyuHP) garyuHP = "/";
	strDat = garyuHP.split("/");
	Maxhp = parseInt(strDat[0]);
	hp = parseInt(strDat[1]);

	if (!garyuMag) garyuMag = ",";
	strDat = garyuMag.split(",");
	magic = parseInt(strDat[0]);
	magicS = parseInt(strDat[1]);

	if (!garyuIvent) garyuIvent = ",";
	strDat = garyuIvent.split(",");
	ivent = parseInt(strDat[0]);
	DragonChip1 = parseInt(strDat[1]);
	DragonChip2 = parseInt(strDat[2]);
}


// データチェックシステム(データに抜けがあればエラー)
function PS_DataChack(varJumpURL) {
	varBrackChak = 0;
	if (!pass) varBrackChak = 2;
	if (!varID) varBrackChak = 2;
	if (!yourName) varBrackChak = 2;
	if (!DragonName) varBrackChak = 2;
	if (pass == null) varBrackChak = 2;
	if (!(Math.abs(numVisits) >= 0)) varBrackChak = 1;
	if (!(Math.abs(varExp) >= 0)) varBrackChak = 1;
	if (!(Math.abs(LoadTime) >= 0)) LoadTime = 0;
	if (!(Math.abs(love) >= 0)) varBrackChak = 1;
	if (!(Math.abs(turn) >= 0)) turn = 24;
	if (!(Math.abs(food) >= 0)) food = 10;
	if (!(Math.abs(lv) >= 0)) varBrackChak = 1;
	if (!(Math.abs(Maxhp) >= 0)) varBrackChak = 1;
	if (!(Math.abs(hp) >= 0)) varBrackChak = 1;
	if (!(Math.abs(at) >= 0)) varBrackChak = 1;
	if (!(Math.abs(df) >= 0)) varBrackChak = 1;
	if (!(Math.abs(speed) >= 0)) varBrackChak = 1;
	if (!(Math.abs(element1) >= 0)) varBrackChak = 1;
	if (!(Math.abs(element2) >= 0)) varBrackChak = 1;
	if (!(Math.abs(ivent) >= 0)) varBrackChak = 1;
	if (!(Math.abs(DragonChip1) >= 0)) varBrackChak = 1;
	if (!(Math.abs(DragonChip2) >= 0)) varBrackChak = 1;
	if (!(Math.abs(magic) >= 0)) varBrackChak = 1;
	if (!(Math.abs(bio) >= 0)) varBrackChak = 1;
	if (WaitTime < 0) WaitTime = 0;
	if (numVisits < 0) numVisits = 1;
	if (numVisits > 100) numVisits = 100;

	if (hp <= 0) {
		// ごく稀に破傷風をもらう
		if (Math.round(Math.random() * 10) == 1) {
			bio |= 2;
		} if (Math.round(Math.random() * 10) == 1) {
			bio |= 4;
		} else {
			bio |= 1;
		}
	}

	if (Maxhp <= 0) Maxhp = 1;
	if (hp < 1) hp = 1;
	if (at < 1) at = 1;
	if (df < 1) df = 1;
	if (speed < 1) speed = 1;
	if (Maxhp > 9999) Maxhp = 9999;
	if (hp > Maxhp) hp = Maxhp;
	if (at > 9999) at = 9999;
	if (df > 9999) df = 9999;
	if (speed > 9999) speed = 9999;
	if (love < 1) love = 1;
	if (love > 1100) love = 1100;
	if (turn < 0) turn = 0;
	if (turn > 99999) turn = 99999;
	if (food < 0) food = 0;
	if (food > 99999) food = 99999;
	if (element1 > 9999) element1 = 9999;
	if (element2 > 9999) element2 = 9999;
	if (element1 < -9999) element1 = -9999;
	if (element2 < -9999) element2 = -9999;
	if (varExp > 999999) varExp = 999999;	// 旧データではStartTimeが入っているので修正

	if (varBrackChak == 2) {
		alert("[ERROR!!]\n仔竜データが通信中に損傷しました。\n至急ブラウザを閉じて、新しく開きなおし\n再ログインし直して下さい。保存するとデータが破壊されてしまいます。\nなお、ＢＢＳや同時にゲームをしますと壊れる危険性が増えます。絶対にお止め下さい。");
		location.href = varJumpURL;
	}

	if (varBrackChak == 1) {
		alert("[ERROR!!]\n仔竜データが通信中に損傷しました。\n至急ブラウザを閉じて、新しく開きなおし\n再ログインし直して下さい。保存するとデータが破壊されてしまいます。\nなお、ＢＢＳや同時にゲームをしますと壊れる危険性が増えます。絶対にお止め下さい。");
		location.href = varJumpURL;
	}
}


// データチェックシステム(データに抜けがあればエラー)
function PS_DataChack2() {
	var varRet = 0;
	if (!pass) varRet = 1;
	if (!varID) varRet = 1;
	if (!yourName) varRet = 1;
	if (!DragonName) varRet = 1;
	if (pass == null) varRet = 1;
	return (varRet);
}