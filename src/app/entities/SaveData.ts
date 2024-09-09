export class SaveData {
    /** 到訪次數 */
    public numVisits: number = -1;
    public love: number = 0;
    public turn: number;
    public food: number;
	document.DATAForm.item.value = cd;
	document.DATAForm.Nowlv.value = varNowLv;
    public Maxhp: number;
    public hp: number;
    public at: number;
    public df: number;
    public speed: number;
    public element1: number;
    public element2: number;
    public ivent: number;
	document.DATAForm.DragonChip1.value = DragonChip1;
	document.DATAForm.DragonChip2.value = DragonChip2;
	document.DATAForm.magic.value = magic;
	document.DATAForm.magicS.value = magicS;
	document.DATAForm.bio.value = bio;
	document.DATAForm.ID.value = varID;

    /** 原本LV應該要但似乎沒有隨能力值變更而更新？ */
    get lv() {
        return (this.Maxhp + this.at + this.df + this.speed - 10);
    }
    /** TODO: 將遊戲存檔自Base64讀取 */
    private static FromBase64() {

    }
    /** TODO: 將遊戲存檔寫出成Base64 */
    private ToBase64(): string {
        return '';
    }

    /** 轉換方法：顯示成文字時會自動呼叫 */
    toString() {
        return ''
    }

    /**
     * 將進度設定為下一周目
     * @param clearFlag 是否以Good Ending通關
    */
    NewGamePlus(clearFlag: boolean) {

        varItemFlg = ItemKazu(22);	// 下手な似顔絵の個数を保存

        // アイテム欄をリセット
        for (i = 0; i < varItem.length; i++) {
            varItem[i] = varItmCod;
        }


        // 下手な似顔絵の個数を復活
        if (varItemFlg) {
            for (i = 0; i < varItemFlg; i++) {
                ItemUse(22);
            }
        }
        numVisits = -1;
        Maxhp = Math.round(Maxhp / 5);
        hp = Maxhp;
        df = Math.round(df / 5);
        at = Math.round(at / 5);
        speed = Math.round(speed / 5);
        love = 100;
        food = 200;
        turn = 100;
        element1 = 50;
        element2 = 50;
        bio = 0;
        ivent = 256;
        DragonChip1 = 0;
        DragonChip2 = 0;
        magicS = 0;
        magic = 0;
        lv = 
        if (lv <= 0) lv = 1;
    }

/** 舊的存檔方式，備存用 */
function DataSave(){
	var time=expire.getTime();
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
	for(i=0; i<varItem.length; i++){
		cd += new String(String.fromCharCode( varItem[i] ));
	}
	garyuHP = Maxhp + "/" + hp;
	garyuPass = DragonName + "/" + pass + "/" +varID;
	garyuMag = new String(magic) + "," + new String(magicS);
	garyuIvent = new String(ivent) + "," + new String(DragonChip1) + "," + new String(DragonChip2);

	// 31日後にクッキーを消去
	expire.setTime(expire.getTime() + (31*24*60*60*1000));
	setCookie("@garyuname"	, yourName	,expire);//ユーザー名
	setCookie("@garyudragon", garyuPass	,expire);//ドラゴン名/パスワード/ID
	setCookie("@garyu_visits", numVisits,expire);//訪問回数
	setCookie("@garyustart"	, varExp	, expire);//戦闘勝利Exp
	setCookie("@garyulogin"	, LoadTime	, expire);//前回やめた時間
	setCookie("@garyulove"	, love		, expire);//Love
	setCookie("@garyuturn"	, turn		, expire);//turn
	setCookie("@garyufood"	, food		, expire);//food
	setCookie("@garyuitem"	, cd		, expire);//ITEM
	setCookie("@garyuLV"	, lv		, expire);//Lv
	setCookie("@garyuHP"	, garyuHP	, expire);//HP
	setCookie("@garyuAT"	, at		, expire);//AT
	setCookie("@garyuDF"	, df		, expire);//DF
	setCookie("@garyuSP"	, speed		, expire);//SPEED
	setCookie("@garyuEM1"	, element1	, expire);//ELEMENT1
	setCookie("@garyuEM2"	, element2	, expire);//ELEMENT2
	setCookie("@garyuIV"	, garyuIvent, expire);//IVENT
	setCookie("@garyuMAG"	, garyuMag	, expire);//MAGIC
	setCookie("@garyuBIO"	, bio		, expire);//BIO
	expire.setTime(time);
}


/** 舊的資料讀取方式，備存用 */
 DataLoad() {
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

}