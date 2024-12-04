var FadeFlg = 0;	//フェードが終了かどうか

// アラートレイヤーを表示
function alertLAYER(idName, msg) {
  var i = "<CENTER><TABLE cellSpacing=0 cellPadding=0 width=100% border=0><TR><TD><TABLE cellSpacing=0 cellPadding=0 width=100%  border=0><TR><TD width=100%><TABLE cellSpacing=0 cellPadding=0 border=0><TR><TD width=16>  <IMG width=16   height=16 src='image/line1.gif' border=0></TD><TD width=100%><IMG width=100% height=16 src='image/line2.gif' border=0></TD><TD width=16><IMG width=16   height=16 src='image/line3.gif' border=0></TD></TR><TR><TD height=100%><IMG width=16 height=100% src='image/line8.gif' border=0></TD><TD><TABLE cellSpacing=0 cellPadding=0 width=100% border=0><TR><TD width=100%><TABLE cellSpacing=0 cellPadding=0 width=100% border=0>";
  var j = "</TABLE></TD></TR></TABLE></TD><TD height=100%><IMG width=16 height=100% src='image/line4.gif' border=0></TD></TR><TR><TD width=16>  <IMG width=16   height=16 src='image/line7.gif' border=0></TD><TD width=100%><IMG width=100% height=16 src='image/line6.gif' border=0></TD><TD width=16>  <IMG width=16   height=16 src='image/line5.gif' border=0></TD></TR></TABLE></TD> <TD></TD> </TR></TABLE></TD></TR></TABLE></CENTER>";

  showLAYER(idName);
  if (document.getElementById) { //NN6,Mozilla,IE5用
    document.getElementById(idName).style.backgroundColor = "#443333";
    document.getElementById(idName).innerHTML = i + msg + j;
  } else if (document.all) {       //IE4用
    document.all(idName).style.backgroundColor = "#443333";
    document.all(idName).innerHTML = i + msg + j;
  } else if (document.layers) {    //NN4用
    document.layers[idName].style.backgroundColor = "#443333";
    document.layers[idName].innerHTML = i + msg + j;
  }
}


// レイヤーを表示する
function showLAYER(idName) {

  if (document.getElementById) //NN6,Mozilla,IE5用
    document.getElementById(idName).style.visibility = 'visible'

  else if (document.all)       //IE4用
    document.all(idName).style.visibility = 'visible'

  else if (document.layers)    //NN4用
    document.layers[idName].visibility = 'show'
}


// レイヤーを非表示にする
function hideLAYER(idName) {

  if (document.getElementById) //NN6,Mozilla,IE5用
    document.getElementById(idName).style.visibility = 'hidden'
  else if (document.all)       //IE4用
    document.all(idName).style.visibility = 'hidden'

  else if (document.layers)    //NN4用
    document.layers[idName].visibility = 'hide'
}


// レイヤーを移動させる
function moveLAYER(idName, x, y) {
  if (document.getElementById) {        //Moz,NN6,IE5用
    document.getElementById(idName).style.left = x
    document.getElementById(idName).style.top = y
  }
  else if (document.all) {
    document.all(idName).style.pixelLeft = x //IE4用
    document.all(idName).style.pixelTop = y
  }
  else if (document.layers)
    document.layers[idName].moveTo(x, y)    //NN4用
}



//--不透明度フェイド関数
function fadeOpacity(layName, swt, stopOpacity) {

  if (!window.fadeOpacity[layName]) //カウンター初期化
    fadeOpacity[layName] = 0

  //フェイドスイッチ引数省略時初期値(不透明から透明へ)
  if (!arguments[1]) swt = -1

  //引数swtが -1 なら不透明から透明へ
  //           1 なら透明から不透明へフェイドする
  if (swt == -1) var f = "9876543210"
  else if (swt == 1) var f = "0123456789"
  else var f = "9876543210"

  //停止不透明度引数省略時初期値
  if (!arguments[2] && swt == -1) stopOpacity = 0
  else if (!arguments[2] && swt == 1) stopOpacity = 10

  //フェイド処理    
  if (fadeOpacity[layName] < f.length - 1) {

    //カウンター番目の文字列を取り出す
    var opa = f.charAt(fadeOpacity[layName]) / 10

    //終了時不透明度なら終了
    if (opa == stopOpacity) {
      setOpacity(layName, stopOpacity)  //終了
      fadeOpacity[layName] = 0     //リセット
      return
    }
    // 不透明度変更を実行する
    setOpacity(layName, opa)
    // カウンターを加算
    fadeOpacity[layName]++
    //--50/1000秒後にfadeOpacityを再実行
    setTimeout('fadeOpacity("' + layName + '","' + swt + '","' + stopOpacity + '")', 80)
  } else {
    //終了
    setOpacity(layName, stopOpacity)
    //--リセット
    fadeOpacity[layName] = 0
  }
}



//--不透明度set 
function setOpacity(layName, arg) {
  var ua = navigator.userAgent //arg は 0 ～ 1、0は透明、1は不透明。
  if (document.layers) {      //n4とMac版e4.5,e5は0の時hidden
    if (arg > 0) document.layers[layName].visibility = 'visible'
    else if (arg == 0) document.layers[layName].visibility = 'hidden'
  } else if (ua.indexOf('Mac_PowerPC') != -1 && document.all) {
    if (arg > 0) document.all(layName).style.visibility = 'visible'
    else if (arg == 0) document.all(layName).style.visibility = 'hidden'
  } else if (document.all) {  //Win版e5,e6
    document.getElementById(layName).style.filter = "alpha(opacity=0)"
    document.getElementById(layName).filters.alpha.opacity
      = (arg * 100)
  } else if (ua.indexOf('Gecko') != -1)  //n6,m1
    document.getElementById(layName).style.MozOpacity = arg
}


// レイヤーの中身を書き換える
function outputLAYER(layName, html) {

  if (document.getElementById) {        //N6,Moz,IE5,IE6用
    document.getElementById(layName).innerHTML = html

  } else if (document.all) {                       //IE4用
    document.all(layName).innerHTML = html

  } else if (document.layers) {                   //NN4用
    with (document.layers[layName].document) {
      open()
      write(html)
      close()
    }
  }

}

