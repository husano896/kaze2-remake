
const varItmCod = 65;		// アイテムコード

const ITEM_SIZE = 35;

const DragonTypes = [
    {
        "name": "バルバチェイン",
        "hp": 0,
        "at": 0,
        "df": 100,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ヴァンパネラ",
        "hp": 30,
        "at": 15,
        "df": 15,
        "speed": 15,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "マンドレイク",
        "hp": 10,
        "at": 30,
        "df": 0,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "DragonHeadBuck",
        "hp": 10,
        "at": 0,
        "df": 30,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "管狐",
        "hp": 100,
        "at": 0,
        "df": 0,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "パイロヒドラ",
        "hp": 50,
        "at": 50,
        "df": 50,
        "speed": 50,
        "element1": 100,
        "element2": 0
    },
    {
        "name": "トピリア",
        "hp": 20,
        "at": 10,
        "df": 10,
        "speed": 10,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ジン",
        "hp": 50,
        "at": 0,
        "df": 0,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ママルバーン",
        "hp": 10,
        "at": 0,
        "df": 0,
        "speed": 30,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ボルガノドン",
        "hp": 50,
        "at": 50,
        "df": 50,
        "speed": 50,
        "element1": -100,
        "element2": 0
    },
    {
        "name": "ヘイズロック",
        "hp": 50,
        "at": 50,
        "df": 50,
        "speed": 50,
        "element1": 0,
        "element2": 100
    },
    {
        "name": "ケツァルコアトル",
        "hp": 200,
        "at": 60,
        "df": 60,
        "speed": 60,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ゾンドドレイク",
        "hp": 20,
        "at": 30,
        "df": 2,
        "speed": 2,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "バジリコック",
        "hp": 0,
        "at": 100,
        "df": 0,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ショコラフッフール",
        "hp": 5,
        "at": 5,
        "df": 5,
        "speed": 5,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ギガウインド",
        "hp": 50,
        "at": 50,
        "df": 50,
        "speed": 50,
        "element1": 0,
        "element2": -100
    },
    {
        "name": "フィオレッティ",
        "hp": 100,
        "at": 0,
        "df": 20,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "ラジェスト",
        "hp": 100,
        "at": 80,
        "df": 80,
        "speed": 80,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "幼竜",
        "hp": 5,
        "at": 0,
        "df": 0,
        "speed": 0,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "児竜",
        "hp": 10,
        "at": 3,
        "df": 2,
        "speed": 3,
        "element1": 0,
        "element2": 0
    },
    {
        "name": "べトリブニス",
        "hp": 200,
        "at": 150,
        "df": 150,
        "speed": 150,
        "element1": 0,
        "element2": 0
    }
]

const Drgon_my = new Array(
    "あたち",
    "アタシ",
    "アタシ",
    "私",
    "私",
    "私",
    //
    "ボク",
    "ボク",
    "ボク",
    "僕",
    "オレ",
    "俺"
);
const D_go0 = new Array(
    "だ", "だ", "だ", "だ", "だ", "",
    "な", "な", "", "な", "な", "");
const D_go1 = new Array(
    "ミュ", "よぅ", "よぅ", "よ", "わ", "",
    "の", "の", "デシ", "のだ", "んだ", "");
const D_go2 = new Array(
    "ミュ", "よぉ", "よぉ", "のかな", "のかしら", "",
    "の", "の", "デシ", "のだ", "んだ", "");
const D_go3 = new Array(
    "ミュ", "のぉ", "のぉ", "のかな", "のかしら", "",
    "の", "の", "デシ", "のだ", "のか", "");
const D_go4 = new Array(
    "ミュ", "のぉ", "のぉ", "のかな", "のかな", "",
    "の", "の", "デシ", "のだ", "んだ", "");
export class SaveData {
    /** 到訪次數 */
    public dragonName: string = '孤竜';
    public yourName: string = 'アイ．フライ';
    public numVisits: number = -1;
    public love: number = 0;
    public turn: number = 24;
    public food: number = 0;
    public item: Array<number> = new Array(ITEM_SIZE);
    public Nowlv: number = 0;
    public Maxhp: number = 0;
    public hp: number = 0;
    public at: number = 0;
    public df: number = 0;
    public speed: number = 0;
    public element1: number = 50;
    public element2: number = 50;
    public ivent: number = 0x0;
    public DragonChip1: number = 0x0;
    public DragonChip2: number = 0x0;
    public magic: any = '';
    public magicS: any = '';
    public exp: number = 0;
    public lastLogin: number = 0;
    /** 異常狀態 */
    public bio: number = 0x0;
    public ID: any = '';

    public cgName: string = '/assets/imgs/dragon/nomal01.gif';
    /** 日文使用：依照角色等級與屬性改變說話方式 */
    public talkingGO: any = {};
    /** 當前Turn的Lv, 猜測應該於下一個進行度時重新計算 */
    public lv: number = 1;

    constructor() {
        this.Reset();
    }

    /** 新存檔的初始化 */
    public Reset() {
        this.Maxhp = 10;
        this.hp = 10;
        this.df = 1;
        this.at = 1;
        this.love = 100;
        this.element1 = 50;
        this.element2 = 50;
        this.numVisits = 1;
        this.turn = 40;
        this.food = 50;
        this.lastLogin = new Date().getTime();
    }

    static CalculateLV(maxhp: number, at: number, df: number, speed: number): number {
        return (maxhp + at + df + speed - 10);
    }

    public NextProgress() {
        this.lv = SaveData.CalculateLV(this.Maxhp, this.at, this.df, this.speed);
    }

    get bioText() {
        var ans: string[] = [];
        if (this.hp < (this.Maxhp / 8)) {
            ans = ["疲労"];
        }
        else {
            ans = ["健康"];
        }
        // 窩不健康
        if (this.bio) ans = [];
        if (this.bio & 1) ans = ["衰弱"];
        if (this.bio & 2) ans.push("破傷");
        if (this.bio & 4) ans.push("育障");
        if (this.bio & 8) ans.push("風邪");
        if (this.bio & 16) ans.push("恐怖");
        if (this.bio & 32) ans.push("重症");
        if (this.bio & 64) ans.push("眠酔");
        if (this.bio & 128) ans.push("発作");
        // ...
        if (this.numVisits == 100) {
            // 本傳中並沒有bio = 256的判定
            // this.bio = 256;
            return "竜死病";
        }
        return ans.join(',');
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

        if (this.DragonChip2 & 1) lank2 = DragonTypes[1].name;
        if (this.DragonChip2 & 2) lank2 = DragonTypes[2].name;
        if (this.DragonChip2 & 4) lank2 = DragonTypes[3].name;
        if (this.DragonChip2 & 8) lank2 = DragonTypes[4].name;
        if (this.DragonChip2 & 16) lank2 = DragonTypes[5].name;
        if (this.DragonChip2 & 32) lank2 = DragonTypes[6].name;
        if (this.DragonChip2 & 64) lank2 = DragonTypes[7].name;
        if (this.DragonChip2 & 128) lank2 = DragonTypes[8].name;
        if (this.DragonChip2 & 256) lank2 = DragonTypes[9].name;
        if (this.DragonChip2 & 512) lank2 = DragonTypes[10].name;
        if (this.DragonChip2 & 1024) lank2 = DragonTypes[11].name;
        if (this.DragonChip2 & 2048) lank2 = DragonTypes[12].name;
        if (this.DragonChip2 & 4096) lank2 = DragonTypes[13].name;
        if (this.DragonChip2 & 8192) lank2 = DragonTypes[14].name;
        if (this.DragonChip2 & 16384) lank2 = DragonTypes[15].name;
        if (this.DragonChip2 & 32768) lank2 = DragonTypes[16].name;
        if (this.DragonChip2 & 65536) lank2 = DragonTypes[17].name;
        if (this.DragonChip2 & 131072) lank2 = DragonTypes[18].name;
        if (this.DragonChip2 & 262144) lank2 = DragonTypes[19].name;
        if (this.DragonChip2 & 524288) lank2 = DragonTypes[20].name;
        if (this.DragonChip2 & 1048576) lank2 = DragonTypes[21].name;
        return lank2;
    }

    //#region 舊作直接移植, 需多確認
    /**
     * 計算使用的CG
     */
    PS_RyuCG() {
        let fil = 'nomal01';

        const ans = Math.floor((this.element1 + 5) / 10);
        const ans2 = Math.floor((this.element2 + 5) / 10);
        const ans3 = Math.abs(5 - ans);
        const ans4 = Math.abs(5 - ans2);
        console.log('nowLv', this.nowLv, 'ans', ans, 'ans2', ans2, 'ans3', ans3, 'ans4', ans4)
        this.PS_Set(0);
        if ((this.nowLv >= 10) && (ans3 > ans4) && (ans <= 4)) {
            fil = "fir01";
            this.PS_Set(1);
        }
        if ((this.nowLv >= 20) && (ans3 > ans4) && (ans <= 3)) {
            fil = "fir02";
            this.PS_Set(2);
        }
        if ((this.nowLv >= 30) && (ans3 > ans4) && (ans <= 2)) {
            fil = "fir03";
            this.PS_Set(4);
        }
        if ((this.nowLv >= 40) && (ans3 > ans4) && (ans <= 1)) {
            fil = "fir04";
            this.PS_Set(5);
        }

        if ((this.nowLv >= 10) && (ans3 > ans4) && (ans >= 6)) {
            fil = "wat01";
            this.PS_Set(0);
        }
        if ((this.nowLv >= 20) && (ans3 > ans4) && (ans >= 7)) {
            fil = "wat02";
            this.PS_Set(1);
        }
        if ((this.nowLv >= 30) && (ans3 > ans4) && (ans >= 8)) {
            fil = "wat03";
            this.PS_Set(5);
        }
        if ((this.nowLv >= 40) && (ans3 > ans4) && (ans >= 9)) {
            fil = "wat04";
            this.PS_Set(5);
        }

        if ((this.nowLv >= 10) && (ans3 < ans4) && (ans2 <= 4)) {
            fil = "air01";
            this.PS_Set(2);
        }
        if ((this.nowLv >= 20) && (ans3 < ans4) && (ans2 <= 3)) {
            fil = "air02";
            this.PS_Set(0);
        }
        if ((this.nowLv >= 30) && (ans3 < ans4) && (ans2 <= 2)) {
            fil = "air03";
            this.PS_Set(3);
        }
        if ((this.nowLv >= 40) && (ans3 < ans4) && (ans2 <= 1)) {
            fil = "air04";
            this.PS_Set(4);
        }

        if ((this.nowLv >= 10) && (ans3 < ans4) && (ans2 >= 6)) {
            fil = "man01";
            this.PS_Set(1);
        }
        if ((this.nowLv >= 20) && (ans3 < ans4) && (ans2 >= 7)) {
            fil = "man02";
            this.PS_Set(2);
        }
        if ((this.nowLv >= 30) && (ans3 < ans4) && (ans2 >= 8)) {
            fil = "man03";
            this.PS_Set(4);
        }
        if ((this.nowLv >= 40) && (ans3 < ans4) && (ans2 >= 9)) {
            fil = "man04";
            this.PS_Set(4);
        }

        if ((this.nowLv >= 10) && (ans3 == ans4) && (ans == ans2) && (ans <= 4)) {
            fil = "firair01";
            this.PS_Set(1);
        }
        if ((this.nowLv >= 20) && (ans3 == ans4) && (ans == ans2) && (ans <= 3)) {
            fil = "firair02";
            this.PS_Set(2);
        }
        if ((this.nowLv >= 30) && (ans3 == ans4) && (ans == ans2) && (ans <= 2)) {
            fil = "firair03";
            this.PS_Set(4);
        }
        if ((this.nowLv >= 40) && (ans3 == ans4) && (ans == ans2) && (ans <= 1)) {
            fil = "firair04";
            this.PS_Set(4);
        }

        if ((this.nowLv >= 10) && (ans3 == ans4) && (ans == ans2) && (ans >= 6)) {
            fil = "watman01";
            this.PS_Set(2);
        }
        if ((this.nowLv >= 20) && (ans3 == ans4) && (ans == ans2) && (ans >= 7)) {
            fil = "watman02";
            this.PS_Set(3);
        }
        if ((this.nowLv >= 30) && (ans3 == ans4) && (ans == ans2) && (ans >= 8)) {
            fil = "watman03";
            this.PS_Set(4);
        }
        if ((this.nowLv >= 40) && (ans3 == ans4) && (ans == ans2) && (ans >= 9)) {
            fil = "watman04";
            this.PS_Set(5);
        }

        if ((this.nowLv >= 10) && (ans3 == ans4) && (ans != ans2) && (ans <= 4)) {
            fil = "firman01";
            this.PS_Set(1);
        }
        if ((this.nowLv >= 20) && (ans3 == ans4) && (ans != ans2) && (ans <= 3)) {
            fil = "firman02";
            this.PS_Set(3);
        }
        if ((this.nowLv >= 30) && (ans3 == ans4) && (ans != ans2) && (ans <= 2)) {
            fil = "firman03";
            this.PS_Set(4);
        }
        if ((this.nowLv >= 40) && (ans3 == ans4) && (ans != ans2) && (ans <= 1)) {
            fil = "firman04";
            this.PS_Set(5);
        }

        if ((this.nowLv >= 10) && (ans3 == ans4) && (ans != ans2) && (ans >= 6)) {
            fil = "watair01";
            this.PS_Set(0);
        }

        if ((this.nowLv >= 20) && (ans3 == ans4) && (ans != ans2) && (ans >= 7)) {
            fil = "watair02";
            this.PS_Set(1);
        }
        if ((this.nowLv >= 30) && (ans3 == ans4) && (ans != ans2) && (ans >= 8)) {
            fil = "watair03";
            this.PS_Set(5);
        }
        if ((this.nowLv >= 40) && (ans3 == ans4) && (ans != ans2) && (ans >= 9)) {
            fil = "watair04";
            this.PS_Set(5);
        }


        // 隠しドラゴンのグラフィック
        if (this.DragonChip2 & 1) {
            fil = "best00";
            this.PS_Set(5);
        }

        if (this.DragonChip2 & 2) {
            fil = "best01";
            this.PS_Set(5);
        }

        if (this.DragonChip2 & 4) {
            fil = "best02";
            this.PS_Set(5);
        }

        if (this.DragonChip2 & 8) {
            fil = "best03";
            this.PS_Set(5);
        }

        if (this.DragonChip2 & 16) {
            fil = "best04";
            this.PS_Set(0);
        }

        if (this.DragonChip2 & 32) {
            fil = "best05";
            this.PS_Set(4);
        }

        if (this.DragonChip2 & 64) {
            fil = "best06";
            this.PS_Set(4);
        }
        if (this.DragonChip2 & 128) {
            fil = "best07";
            this.PS_Set(3);
        }
        if (this.DragonChip2 & 256) {
            fil = "best08";
            this.PS_Set(3);
        }
        if (this.DragonChip2 & 512) {
            fil = "best09";
            this.PS_Set(5);
        }
        if (this.DragonChip2 & 1024) {
            fil = "best10";
            this.PS_Set(5);
        }
        if (this.DragonChip2 & 2048) {
            fil = "best11";
            this.PS_Set(5);
        }
        if (this.DragonChip2 & 4096) {
            fil = "best12";
            this.PS_Set(3);
        }
        if (this.DragonChip2 & 8192) {
            fil = "best13";
            this.PS_Set(5);
        }
        if (this.DragonChip2 & 16384) {
            fil = "best14";
            this.PS_Set(1);
        }
        if (this.DragonChip2 & 32768) {
            fil = "best15";
            this.PS_Set(5);
        }

        // 未登録分
        if (this.DragonChip2 & 65536) {
            fil = "best16";
            this.PS_Set(5);
        }
        if (this.DragonChip2 & 131072) {
            fil = "best17";
            this.PS_Set(4);
        }
        if (this.DragonChip2 & 262144) {
            fil = "best18";
            this.PS_Set(0);
        }
        if (this.DragonChip2 & 524288) {
            fil = "best19";
            this.PS_Set(0);
        }
        if (this.DragonChip2 & 1048576) {
            fil = "best20";
            this.PS_Set(4);
        }

        if (this.DragonChip2 == -1) {
            fil = "boss";
            this.PS_Set(0);
        }


        // 育成障害であればデフォルト
        if (this.bio & 4) {
            fil = "nomal01";
            this.PS_Set(0);
        }

        // 発作であれば苦しみパターン
        if (this.bio & 128) {
            fil = "nomal00";
            this.PS_Set(0);
        }

        this.cgName = `/assets/imgs/dragon/${fil}.gif`;
    }

    PS_Set(varSet: number) {

        const Drgon_you = new Array(
            this.yourName + "サン",
            this.yourName + "さん",
            this.yourName + "さん",
            this.yourName + "君",
            this.yourName,
            "アナタ",
            //
            this.yourName + "サン",
            this.yourName + "さん",
            this.yourName + "さん",
            this.yourName + "君",
            this.yourName,
            this.yourName);
        if (this.ivent & 8) {
            this.talkingGO = {
                my: Drgon_my[varSet],
                you: Drgon_you[varSet],
                go00: D_go0[varSet],
                go01: D_go1[varSet],
                go02: D_go2[varSet],
                go03: D_go3[varSet],
                go04: D_go4[varSet]
            }
            return;
        }
        this.talkingGO = {
            my: Drgon_my[varSet + 6],
            you: Drgon_you[varSet + 6],
            go00: D_go0[varSet + 6],
            go01: D_go1[varSet + 6],
            go02: D_go2[varSet + 6],
            go03: D_go3[varSet + 6],
            go04: D_go4[varSet + 6],
        }
    }

    get talkingParam() {
        return {
            dragonName: this.dragonName,
            yourName: this.yourName
        }
    }

    get ans1() {
        // TODO: 要確認lv的變數
        return (this.Maxhp + this.at + this.df + this.speed) - 10; //- this.lv;
    }

    get nowLv() {
        return Math.floor(this.ans1 / 12) + 1;
    }

    get overLv() {
        return Math.floor(this.ans1 / 16.8) + 1;	// レベル上限
    }

    get nextLv() {
        return (Math.floor(this.ans1 / 12) + 1) * 12 - this.ans1;
    }
    //#endregion
    /*
        // レベル計算
    ans1 = (Maxhp + at + df + speed) - 10 - lv;


    this.nowLv = Math.floor(ans1 / 12) + 1;
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
expire.setTime(expire.getTime() + (31 * 24 * 60 * 60 * 1000);
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