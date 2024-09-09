import { AppService } from '@/app/app.service';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-begin',
  standalone: true,
  imports: [],
  templateUrl: './begin.component.html',
  styleUrl: './begin.component.scss'
})
export class BeginComponent implements AfterViewInit {
  constructor(private appServ: AppService) {

  }
  ngAfterViewInit(): void {

    this.appServ.setAmbient('snd16.wav')

    // 訪問回数のカウント(60分で復帰
    if (WaitTime > 60) {
      if (ivent & 4) ivent ^= 4;
      numVisits++;
      turn += 24;
    }

    // ターンの回復
    //		ans = WaitTime;
    //		if(WaitTime > 60) ans = 60;		// 1時間以上ならそれ以上ターンが増えない
    //		if(WaitTime < 0) ans = 0;
    //		turn += Math.round(ans / 2.5);	// 2.5分に1増える(1時間で24ターン回復)

    // 生命値の回復
    ans = WaitTime;
    if (WaitTime < 10) ans = 0;		// 10分以内であれば回復無し
    hp += Math.round(ans / 40);		// 40分に1HP回復(1日で36ポイント程度)


    // 恐怖症であれば友好度が下がってゆく
    if ((bio & 16) && (WaitTime >= 30)) love -= 65;

    // デバッグ処理
    //	WaitTime == 1;
    //	turn=999;
    //	turn+=24;
    //	numVisits++;
    //	numVisits=17;love=1100;bio=0;// ivent=1+4096+8192;alert();

    //	LoadTime  =  Math.floor(serverNow/1000/60); //早めにデータをセット
    //	if(WaitTime >= 60){							// 前回訪問から10分がたっていれば1時間経過したことにする
    //		LoadTime-=60;
    //	}


    ///#region 決定顯示曆法
    let expire = new Date();
    let lank2 = '';

    let ans1 = expire.getMonth() + 1;
    let ans = expire.getDate();
    let ans2 = ans1 * 100 + ans;
    let ans3 = 0;
    if ((ans2 >= 116) && (ans2 <= 229)) {
      lank2 = "<IMG src='image/font04.gif'>";
      if (ans1 == 1) ans3 = ans - 15; if (ans1 == 2) ans3 = 15 + ans;
    }
    if ((ans2 >= 301) && (ans2 <= 415)) {
      lank2 = "<IMG src='image/font05.gif'>";
      if (ans1 == 3) ans3 = ans; if (ans1 == 4) ans3 = 31 + ans;
    }
    if ((ans2 >= 416) && (ans2 <= 531)) {
      lank2 = "<IMG src='image/font06.gif'>";
      if (ans1 == 4) ans3 = ans - 15; if (ans1 == 5) ans3 = 15 + ans;
    }
    if ((ans2 >= 601) && (ans2 <= 715)) {
      lank2 = "<IMG src='image/font07.gif'>";
      if (ans1 == 6) ans3 = ans; if (ans1 == 7) ans3 = 30 + ans;
    }
    if ((ans2 >= 716) && (ans2 <= 831)) {
      lank2 = "<IMG src='image/font08.gif'>";
      if (ans1 == 7) ans3 = ans - 15; if (ans1 == 8) ans3 = 15 + ans;
    }
    if ((ans2 >= 901) && (ans2 <= 1015)) {
      lank2 = "<IMG src='image/font09.gif'>";
      if (ans1 == 9) ans3 = ans; if (ans1 == 10) ans3 = 30 + ans;
    }
    if ((ans2 >= 1016) && (ans2 <= 1130)) {
      lank2 = "<IMG src='image/font09.gif'>";
      if (ans1 == 10) ans3 = ans - 15; if (ans1 == 11) ans3 = 15 + ans;
    }
    if ((ans2 >= 1201) || (ans2 <= 115)) {
      lank2 = "<IMG src='image/font10.gif'>";
      if (ans1 == 12) ans3 = ans; if (ans1 == 1) ans3 = 31 + ans;
    }

    ///#endregion

    ans2 = expire.getFullYear();
    if (ans2 > 2000) ans2 -= 2000; ans2 += 965;

    with (document) {
      write("<DIV ID = 'Ray1' STYLE='position:absolute;top:250px;left:0px; visibility: hidden;'> ");
      write("<TABLE width=100% border=0><TR><TD><CENTER><IMG src='image/font01.gif'>");
      write(this.PS_FontImage(ans2) +
        "<IMG src='image/font11.gif'><BR>" +
        lank2 + "<IMG src='image/font02.gif'>" +
        PS_FontImage(ans3) +
        "<IMG src='image/font03.gif'></CENTER></TD></TR></TABLE>");
      write("</DIV>");

      write("<DIV ID = 'Ray7' STYLE='position:absolute;top:100;left:20px; visibility:visible;'></DIV>");
    }
    this.appServ.setSE('')

    // 病気進行が10の倍数の時、診断をする
    if (((numVisits % 10) == 0) && (numVisits != 10) && (numVisits != 100) && ((WaitTime >= 60))) {
      DataSave();
      location.href = "LoveChk.html";
    } else if (WaitTime <= 60) {
      // １時間以内に訪問した場合は処理を表示しない
      DataSave();
      location.href = "dragongame.html";
    } else {
      PS_OP_Ivent();
    }
  }

  // 数値を文字イメージに変換
  PS_FontImage(kazu) {
    var i, a, b, ret = "";
    a = new String(kazu);
    for (i = 0; i < a.length; i++) {
      b = new String(a.charAt(i));
      ret += "<IMG src='image/" + b + ".gif'>";

    }
    return (ret);
  }
}
