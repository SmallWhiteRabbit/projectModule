(function() {
  //判断ie6 7 8 9
  var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
  reIE.test(navigator.userAgent);
  // var fIEVersion = parseFloat(RegExp["$1"]);
  if (!reIE.test(navigator.userAgent)) {
    return false;
  }

  var lang =
    navigator.appName === "Netscape"
      ? navigator.language
      : navigator.userLanguage;
  lang = lang.substr(0, 2); //lang === 'zh'

  window.onload = function() {
    var pop = document.createElement("div");
    pop.style["z-index"] = "5001";
    pop.style["position"] = "fixed";
    pop.style["width"] = "100%";
    pop.style["height"] = "100%";
    pop.style["top"] = "0";
    pop.style["left"] = "0";
    pop.style["background-image"] = 'url("./static/images/browser/bg.png")';

    var pg = document.createElement("div");
    pg.style["width"] = "400px";
    pg.style["height"] = "450px";
    pg.style["position"] = "absolute";
    var clientWidth =
      document.body.clientWidth || document.documentElement.clientWidth;
    var clientHeight =
      document.body.clientHeight || document.documentElement.clientHeight;
    pg.style["left"] = (clientWidth - 400) / 2 + "px";
    pg.style["top"] = (clientHeight - 450) / 2 + "px";
    pop.appendChild(pg);

    var txPg = document.createElement("div");
    txPg.style["height"] = "350px";
    txPg.style["background-color"] = "#ffffff";
    txPg.style["text-align"] = "center";
    txPg.style["padding"] = "20px";
    pg.appendChild(txPg);

    var logo = document.createElement("img");
    logo.src = "./static/images/logo.png";
    logo.style["margin"] = "55px 0 15px 0";
    txPg.appendChild(logo);

    var tx1 = document.createElement("p");
    tx1.innerText =
      lang === "zh" ? "暂不支持当前浏览器" : "Not support the current browser";
    tx1.style["font-size"] = "20px";
    tx1.style["font-weight"] = "bold";
    tx1.style["margin-bottom"] = "5px";
    txPg.appendChild(tx1);

    var tx2 = document.createElement("p");
    tx2.innerText =
      lang === "zh"
        ? "推荐使用最新版本的chrome、firefox、safari浏览器"
        : "It is recommended to use the latest version of chrome, firefox, safari browser";
    tx2.style["font-size"] = "12px";
    txPg.appendChild(tx2);

    var imgPg = document.createElement("div");
    imgPg.style["height"] = "100px";
    imgPg.style["line-height"] = "100px";
    imgPg.style["text-align"] = "center";
    imgPg.style["background-color"] = "#313131";
    pg.appendChild(imgPg);

    var chrome = document.createElement("img");
    chrome.src = "./static/images/browser/chrome.png";
    chrome.style["width"] = "40px";
    chrome.style["margin"] = "30px 10px 0 10px";
    imgPg.appendChild(chrome);

    var firefox = document.createElement("img");
    firefox.src = "./static/images/browser/firefox.png";
    firefox.style["width"] = "40px";
    firefox.style["margin"] = "30px 10px 0 10px";
    imgPg.appendChild(firefox);

    var safari = document.createElement("img");
    safari.src = "./static/images/browser/safari.png";
    safari.style["width"] = "40px";
    safari.style["margin"] = "30px 10px 0 10px";
    imgPg.appendChild(safari);

    var brower360 = document.createElement("img");
    brower360.src = "./static/images/browser/360.png";
    brower360.style["width"] = "40px";
    brower360.style["margin"] = "30px 10px 0 10px";
    imgPg.appendChild(brower360);

    var sougou = document.createElement("img");
    sougou.src = "./static/images/browser/sougou.png";
    sougou.style["width"] = "40px";
    sougou.style["margin"] = "30px 10px 0 10px";
    imgPg.appendChild(sougou);

    var uc = document.createElement("img");
    uc.src = "./static/images/browser/uc.png";
    uc.style["width"] = "40px";
    uc.style["margin"] = "30px 10px 0 10px";
    imgPg.appendChild(uc);

    document.body.appendChild(pop);
  };
})();
