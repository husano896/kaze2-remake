
const varItmCod = 65;		// アイテムコード

const ITEM_SIZE = 35;


const varDragoType = new Array(
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

export class SaveData {
    /** 到訪次數 */
    public dragonName: string = '';
    public numVisits: number = -1;
    public love: number = 0;
    public turn: number = 0;
    public food: number = 0;
    public item: Array<number> = new Array(ITEM_SIZE);
    public Nowlv: number = 0;
    public Maxhp: number = 0;
    public hp: number = 0;
    public at: number = 0;
    public df: number = 0;
    public speed: number = 0;
    public element1: number = 0;
    public element2: number = 0;
    public ivent: number = 0x0;
    public DragonChip1: number = 0x0;
    public DragonChip2: number = 0x0;
    public magic: any = '';
    public magicS: any = '';
    public exp: number = 0;
    /** 異常狀態 */
    public bio: number = 0x0;
    public ID: any = '';

    /** 原本LV應該要但似乎沒有隨能力值變更而更新？ */
    get lv() {
        return (this.Maxhp + this.at + this.df + this.speed - 10);
    }

    get bioText() {
        var ans = '';
        if (this.hp < (this.Maxhp / 8)) {
            ans = "疲労";
        }
        else {
            ans = "健康";
        }
        if (this.bio) ans = "";
        if (this.bio & 1) ans = "<nobr>衰弱　</nobr>";
        if (this.bio & 2) ans += "<nobr>破傷　</nobr>";
        if (this.bio & 4) ans += "<nobr>育障　</nobr>";
        if (this.bio & 8) ans += "<nobr>風邪　</nobr>";
        if (this.bio & 16) ans += "<nobr>恐怖　</nobr>";
        if (this.bio & 32) ans += "<nobr>重症　</nobr>";
        if (this.bio & 64) ans += "<nobr>眠酔　</nobr>";
        if (this.bio & 128) ans += "<nobr>発作　</nobr>";
        if (this.numVisits == 100) {
            this.bio = 256;
            return "竜死病";
        }
        return '';
    }

    get elementText() {
        var lank2 = '';
        if (this.element1 < 50) lank2 = "L1炎竜";
        if (this.element1 > 50) lank2 = "L1水竜";
        if (this.element2 < 50) lank2 = "L1風竜";
        if (this.element2 > 50) lank2 = "L1地竜";
        if (this.element1 > 50 && this.element2 > 50) lank2 = "L1水地竜";
        if (this.element1 > 50 && this.element2 < 50) lank2 = "L1水風竜";
        if (this.element1 < 50 && this.element2 > 50) lank2 = "L1炎地竜";
        if (this.element1 < 50 && this.element2 < 50) lank2 = "L1炎風竜";

        if (this.element1 < 40) lank2 = "L2炎を司る者";
        if (this.element1 > 60) lank2 = "L2水を操る者";
        if (this.element2 < 40) lank2 = "L2風を見る者";
        if (this.element2 > 60) lank2 = "L2地を歩む者";
        if (this.element1 > 60 && this.element2 > 60) lank2 = "L2地脈を想う者";
        if (this.element1 > 60 && this.element2 < 40) lank2 = "L2空水を願う者";
        if (this.element1 < 40 && this.element2 > 60) lank2 = "L2土香に閃く者";
        if (this.element1 < 40 && this.element2 < 40) lank2 = "L2風炎を愛す者";

        if (this.element1 < 25) lank2 = "L3炎力を御する竜";
        if (this.element1 > 75) lank2 = "L3水力を湛える竜";
        if (this.element2 < 25) lank2 = "L3風力を纏いし竜";
        if (this.element2 > 75) lank2 = "L3地力を信ずる竜";
        if (this.element1 > 75 && this.element2 > 75) lank2 = "L3湖に住まう地竜";
        if (this.element1 > 75 && this.element2 < 25) lank2 = "L3空を彷徨う霧竜";
        if (this.element1 < 25 && this.element2 > 75) lank2 = "L3火に舞う地竜";
        if (this.element1 < 25 && this.element2 < 25) lank2 = "L3天に坐す異界竜";

        if (this.element1 <= 0) lank2 = "L4炎熱竜";
        if (this.element1 >= 100) lank2 = "L4大海竜";
        if (this.element2 <= 0) lank2 = "L4大嵐竜";
        if (this.element2 >= 100) lank2 = "L4地激竜";
        if (this.element1 >= 100 && this.element2 >= 100) lank2 = "L4地雹竜";
        if (this.element1 >= 100 && this.element2 <= 0) lank2 = "L4天水竜";
        if (this.element1 <= 0 && this.element2 >= 100) lank2 = "L4地熱裂竜";
        if (this.element1 <= 0 && this.element2 <= 0) lank2 = "L4炎嵐飛翔竜";

        if (this.element1 == 50 && this.element2 == 50) lank2 = "ノーマル";

        if (this.DragonChip2 & 1) lank2 = varDragoType[1];
        if (this.DragonChip2 & 2) lank2 = varDragoType[2];
        if (this.DragonChip2 & 4) lank2 = varDragoType[3];
        if (this.DragonChip2 & 8) lank2 = varDragoType[4];
        if (this.DragonChip2 & 16) lank2 = varDragoType[5];
        if (this.DragonChip2 & 32) lank2 = varDragoType[6];
        if (this.DragonChip2 & 64) lank2 = varDragoType[7];
        if (this.DragonChip2 & 128) lank2 = varDragoType[8];
        if (this.DragonChip2 & 256) lank2 = varDragoType[9];
        if (this.DragonChip2 & 512) lank2 = varDragoType[10];
        if (this.DragonChip2 & 1024) lank2 = varDragoType[11];
        if (this.DragonChip2 & 2048) lank2 = varDragoType[12];
        if (this.DragonChip2 & 4096) lank2 = varDragoType[13];
        if (this.DragonChip2 & 8192) lank2 = varDragoType[14];
        if (this.DragonChip2 & 16384) lank2 = varDragoType[15];
        if (this.DragonChip2 & 32768) lank2 = varDragoType[16];
        if (this.DragonChip2 & 65536) lank2 = varDragoType[17];
        if (this.DragonChip2 & 131072) lank2 = varDragoType[18];
        if (this.DragonChip2 & 262144) lank2 = varDragoType[19];
        if (this.DragonChip2 & 524288) lank2 = varDragoType[20];
        if (this.DragonChip2 & 1048576) lank2 = varDragoType[21];
        return lank2;
    }

    /*
    	// レベル計算
	ans1 = (Maxhp + at + df + speed) - 10 - lv;


	varNowLv = Math.floor(ans1 / 12) + 1;
	varOverLv = Math.floor(ans1 / 16.8) + 1;	// レベル上限
	varNextLv = (Math.floor(ans1 / 12) + 1) * 12 - ans1;
    */
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

        const varItemFlg = this.item[22];	// 下手な似顔絵の個数を保存

        // アイテム欄をリセット
        this.item = new Array(ITEM_SIZE).fill(0);

        // 下手な似顔絵の個数を復活
        if (varItemFlg) {
            this.item[22] = varItemFlg;
        }
        this.numVisits = -1;
        this.Maxhp = Math.round(this.Maxhp / 5);
        this.hp = this.Maxhp;
        this.df = Math.round(this.df / 5);
        this.at = Math.round(this.at / 5);
        this.speed = Math.round(this.speed / 5);
        this.love = 100;
        this.food = 200;
        this.turn = 100;
        this.element1 = 50;
        this.element2 = 50;
        this.bio = 0;
        this.ivent = 256;
        this.DragonChip1 = 0;
        this.DragonChip2 = 0;
        this.magicS = 0;
        this.magic = 0;
    }
}

/*
//舊的存檔方式，備存用 
function DataSave() {
    var time = expire.getTime();
    var garyuPass;
    var garyuHP;
    var garyuMag;
    var i, cd = "";

    // turn=990;

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


// 舊的資料讀取方式，備存用 
DataLoad() {
    // 用來裝split資料後的容器
    var strDat = new Array();
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
    thishp = parseInt(strDat[1]);

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
*/