(function () {
    var ws = window.screen;
    var _mba = window._mba || {};
    _mba.jversion = "1.4";
    _mba.topDiv = "mbad_a_" + (new Date() - 0);
    _mba.makeInSide2_running = false;
    _mba.makeInSide2_inerval = undefined;
    _mba.makeInSide2_count = 0;

    var adsizes = ["300X250", "200X200", "250X250", "970X90", "160X600", "300X600", "336X280", "728X90", "300X100",
        "610X100", "950X90", "960X90", "300X50", "640X90", "558X260", "310X300", "120X600", "1198X297", "300X150", "921X165", "970X100", "140X90",
        "600X50", "640X60", "580X90", "650X90", "700X90", "790X90", "640X180", "300X200", "320X250", "120X270", "620X100", "940X90", "966X96"];

    var adsizes2 = ["250x250", "300x250", "320x50", "336x280", "728x90", "200x200", "970x90", "300x600", "160x600", "320x100", "640x100"];

    var common_size = [
        {"ws": 300, "we": 1200, "hs": 50, "he": 300},
        {"ws": 100, "we": 600, "hs": 100, "he": 600}
    ];

    var ads = {};
    for (var k in _mba.ads) {
        ads[k] = [];
        for (var i in _mba.ads[k]) ads[k].push(_mba.ads[k][i]);
    }

    if (_mba.loaded) {
        return;
    }
    _mba.loaded = 1;

    var getWidth = function () {
        var d = document, de = d.documentElement, db = d.body;
        return window.innerWidth || (de && de.clientWidth) || (db && db.clientWidth) || 0;
    }
    var getHeight = function () {
        var d = document, de = d.documentElement, db = d.body;
        return window.innerHeight || (de && de.clientHeight) || (db && db.clientHeight) || 0;
    }

    var makeIframe = function (id, u, w, h) {
        return '<iframe id="' + id + '" src="' + u + '" width="' + w + '" height="' + h + '" align="center,center" vspace="0" hspace="0" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" style="border: 0; vertical-align: bottom; margin: 0;" allowtransparency="true"></iframe>'
    }
    var makeRenderIframe = function (id, u, w, h) {
        return makeIframe(id, u, w, h);
    }
    var makeHideIframe = function (id, u) {
        return makeIframe(id, u, 1, 1);
    }
    var makeHideImg = function (url) {
        var img = new Image(1, 1);
        img.onload = function () {
            img.onload = null;
        };
        img.src = url;
    };
    //var domainList = ["a.yellqu.com", "a.qnroad.com"];
    var formatAdUrl2 = function (w, h, b, t, s) {
        if (!w) {
            reportError("w_is_undifined:" + JSON.stringify(ads));
            return "";
        } else {
            //var index = Math.floor(Math.random()*domainList.length);
            var domain = _mba.ad_domains[b];
            return _mba.scheme + '://' + domain + '/ad?w=' + w + '&h=' + h + '&b=' + b + "&t=" + t + "&s=" + s + "&rf=" + refresh + "&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + _mba.media_id + "&rid=" + _mba.rid;
        }
    }
    var formatAdUrl = function (w, h, b, t, s) {
        if (!w) {
            reportError("w_is_undifined:" + JSON.stringify(ads));
            return "";
        } else {
            var domain = _mba.ad_domains[b];
            return _mba.scheme + '://' + domain + '/ad?w=' + w + '&h=' + h + '&b=' + b + "&t=" + t + "&s=" + s + "&rf=" + refresh + "&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + _mba.media_id + "&rid=" + _mba.rid;
        }
    }

    var makeBr = function (a, scope) {
        var _p = a.id;
        var _w = a.width;
        var _h = a.height;
        var _t = a.type;

        var _u = formatAdUrl(_w, _h, _p, _t, scope);
        if (!_u) return;

        var brid = 'mb_br_' + _p + '_' + (new Date() - 0);
        var brcloseid = brid + '_closebtn';
        var brdiv = '<div id="' + brid + '" style="position: fixed; display: block; z-index: 2147483647; height: ' + _h + 'px; overflow: visible; right: 0px; top: auto; bottom: 0px;">';
        var close = '<div><img alt="Close" onclick="_mba.hideDiv(\'' + brid + '\')" src="' + _mba.scheme + '://static.aimeiren.top/img/x.gif" style="height: 13px; font-size: 14px; float: right; width: 43px; cursor: pointer; position: absolute; top: -16px; right: 0"></div>';
        brdiv += close;

        var addiv = '<div id="" style="overflow: hidden; display: inline-block; position: relative; width: ' + _w + 'px; height: ' + _h + 'px; *display: inline; *zoom: 1; font: 12px/1.5 tahoma, "Hiragino Sans GB", "microsoft yahei", sans-serif;">';

        var iframeid = "mb_br_i_" + _p + '_' + (new Date() - 0);
        addiv += makeRenderIframe(iframeid, _u, _w, _h);
        brdiv += addiv + '</div></div>';

        var divObj = document.createElement("div");
        divObj.id = 'mb_wrapper_br_' + _p + '_' + (new Date() - 0);
        divObj.innerHTML = brdiv;
        document.body.appendChild(divObj);
    }

    var makeBc = function (a, scope) {
        var _p = a.id;
        // var _w = a.width;
        // var _h = a.height;
        var _w = 728;
        var _h = 90;
        var _t = a.type;

        var _u = formatAdUrl(_w, _h, _p, _t, scope);
        if (!_u) return;

        var brid = 'mb_br_' + _p + '_' + (new Date() - 0);
        var brdiv = '<div id="' + brid + '" style="position: fixed; display: block; z-index: 2147483647; height: ' + _h + 'px; width:100%; overflow: visible; margin:auto; top: auto; bottom: 0px;">';
        brdiv += '<div style="margin: 0 auto; width:' + _w + 'px;">';
        var close = '<img alt="Close" onclick="_mba.hideDiv(\'' + brid + '\')" src="' + _mba.scheme + '://static.aimeiren.top/img/x.gif" style="height: 13px; font-size: 14px; float: right; width: 43px; cursor: pointer; top: -16px; right: 0">';
        brdiv += close;

        var addiv = '<div id="" style="overflow: hidden; display: inline-block; position: relative; width: ' + _w + 'px; height: ' + _h + 'px; *display: inline; *zoom: 1; font: 12px/1.5 tahoma, "Hiragino Sans GB", "microsoft yahei", sans-serif;">';
        var iframeid = "mb_br_i_" + _p + '_' + (new Date() - 0);
        addiv += makeRenderIframe(iframeid, _u, _w, _h);
        brdiv += addiv + '</div></div></div>';

        var divObj = document.createElement("div");
        divObj.id = 'mb_wrapper_bc_' + _p + '_' + (new Date() - 0);
        divObj.innerHTML = brdiv;
        document.body.appendChild(divObj);
    }

    var makeBc2 = function (a, scope) {
        var b = document.createElement('script');
        b.type = 'text/javascript';
        b.charset = "utf8";
        b.async = true;
        var domain = _mba.ad_domains[a.type];
        //a.src = _mba.scheme + "://a.yellqu.com/ad?w=728&h=90&b=1&t=0&s=outside&rf=1&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + window._mba.media_id + "&rid=" + _mba.rid;
        b.src = _mba.scheme + "://" + domain + "/ad?b=1&t=0&s=outside&rf=1&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + window._mba.media_id + "&rid=" + _mba.rid;
        var s = document.getElementsByTagName('head')[0];
        s.appendChild(b);
    }

    var makeBcInxxx = function (a, scope) {
        var b = document.createElement('script');
        b.type = 'text/javascript';
        b.charset = "utf8";
        b.async = true;
        var domain = _mba.ad_domains[a.type];
        //a.src = _mba.scheme + "://a.yellqu.com/ad?w=960&h=120&b=46&t=0&s=outside&rf=1&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + window._mba.media_id + "&rid=" + _mba.rid;
        b.src = _mba.scheme + "://" + domain + "/ad?b=46&t=0&s=outside&rf=1&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + window._mba.media_id + "&rid=" + _mba.rid;
        var s = document.getElementsByTagName('head')[0];
        s.appendChild(b);
    }

    // var makeBcInxxx = function (a, scope) {
    //     var _w = 960;
    //     var _h = 120;
    //
    //     // var _w_l = 256;
    //     // var _h_l = 660;
    //
    //     var brid = 'mb_br_' + a.type + '_' + (new Date() - 0);
    //     var brdiv = '<div id="' + brid + '" style="position: fixed; display: block; z-index: 2147483647; height: ' + _h + 'px; width:100%; overflow: visible; margin:auto; top: auto; bottom: 0px;">';
    //     brdiv += '<div style="margin: 0 auto; width:' + _w + 'px;">';
    //     var close = '<img alt="Close" onclick="_mba.hideDiv(\'' + brid + '\')" src="' + _mba.scheme + '://static.aimeiren.top/img/x.gif" style="height: 13px; font-size: 14px; float: right; width: 43px; cursor: pointer; top: -16px; right: 0">';
    //     brdiv += close;
    //     var src = _mba.scheme + "://a.yellqu.com/ad?w=960&h=120&b=46&t=0&s=outside&rf=1&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + window._mba.media_id + "&rid=" + _mba.rid;
    //     var addiv = '<div id="" style="overflow: hidden; display: inline-block; position: relative; width: ' + _w + 'px; height: ' + _h + 'px; *display: inline; *zoom: 1; font: 12px/1.5 tahoma, "Hiragino Sans GB", "microsoft yahei", sans-serif;">';
    //     var iframeid = "mb_br_i_" + a.type + '_' + (new Date() - 0);
    //     addiv += makeRenderIframe(iframeid, src, _w, _h);
    //     brdiv += addiv + '</div></div></div>';
    //
    //     var divObj = document.createElement("div");
    //     divObj.id = 'mb_wrapper_bc_' + a.type + '_' + (new Date() - 0);
    //     divObj.innerHTML = brdiv;
    //     document.body.appendChild(divObj);
    //
    //     // makeWrapper2(a,_w_l,_h_l,'left');
    //     // makeWrapper2(a,_w_l,_h_l,'right');
    // }

    var makeWrapper2 = function (a,_w,_h,place){
        var wlid = 'mb_wlr_' + a.type + '_' + (new Date() - 0);
        var wldiv = '<div id="' + wlid + '" style="box-sizing: content-box; width: ' + _w + 'px; height: ' + (_h + 100) + 'px; overflow: hidden; z-index: 2147483647; position: fixed; top: 20px; ' + place + ': 15px;">';
        var addiv = '<div style="box-sizing: content-box;width: ' + _w + 'px;height:' + _h + 'px;padding:0px;border:#acacac 1px solid;overflow:hidden;">';
        var iframeid = "mb_wlr_i_" + a.type + '_' + (new Date() - 0);
        var src_l = _mba.scheme + "://a.yellqu.com/ad?w=256&h=660&b=46&t=0&s=outside&rf=1&v=" + _mba.jversion + "&sd=" + window.source_domain + "&d=" + window._mba.media_id + "&rid=" + _mba.rid;
        addiv += makeRenderIframe(iframeid, src_l, _w, _h);
        wldiv += addiv + '</div>';
        var wlcloseid = wlid + '_closebtn';
        var close = '<div id="' + wlcloseid + '" onclick="_mba.hideDiv(\'' + wlid + '\')" style="box-sizing: content-box; position: absolute; width: ' + _w + 'px; height: px; ' + place + ': 0px; cursor: pointer; color: rgb(255, 255, 255); font-size: 12px; text-align: center; line-height: 20px; background-color: rgb(153, 153, 153);">关闭</div>';
        wldiv += close + '</div>';
        var divObj_left = document.createElement("div");
        divObj_left.id = 'mb_wrapper_wlr_' + a.type + '_' + (new Date() - 0);
        divObj_left.innerHTML = wldiv;
        document.body.appendChild(divObj_left);
    }

    var makeWl = function (a) {
        makeWrapper(a, 'left');
    }
    var makeWR = function (a) {
        makeWrapper(a, 'right');
    }

    var makeWrapper = function (a, place) {
        var _p = a.id;
        var _w = a.width;
        var _h = a.height;
        var _t = a.type;

        var _u = formatAdUrl(_w, _h, _p, _t, "outside");
        if (!_u) return;

        var wlid = 'mb_wlr_' + _p + '_' + (new Date() - 0);
        var wldiv = '<div id="' + wlid + '" style="box-sizing: content-box; width: ' + _w + 'px; height: ' + (_h + 100) + 'px; overflow: hidden; z-index: 2147483647; position: fixed; top: 20px; ' + place + ': 15px;">';
        var addiv = '<div style="box-sizing: content-box;width: ' + _w + 'px;height:' + _h + 'px;padding:0px;border:#acacac 1px solid;overflow:hidden;">';

        var iframeid = "mb_wlr_i_" + _p + '_' + (new Date() - 0);
        addiv += makeRenderIframe(iframeid, _u, _w, _h);
        wldiv += addiv + '</div>';

        var wlcloseid = wlid + '_closebtn';
        var close = '<div id="' + wlcloseid + '" onclick="_mba.hideDiv(\'' + wlid + '\')" style="box-sizing: content-box; position: absolute; width: ' + _w + 'px; height: px; ' + place + ': 0px; cursor: pointer; color: rgb(255, 255, 255); font-size: 12px; text-align: center; line-height: 20px; background-color: rgb(153, 153, 153);">关闭</div>';
        wldiv += close + '</div>';

        var divObj = document.createElement("div");
        divObj.id = 'mb_wrapper_wlr_' + _p + '_' + (new Date() - 0);
        divObj.innerHTML = wldiv;
        document.body.appendChild(divObj);
    }

    _mba.hideDiv = function (a) {
        document.getElementById(a).style.display = "none";
        var ts = new Date().getTime();
        if (supportsHtml5Storage()) {
            window.localStorage.__amrc = new Date().getTime();
        } else {
            var exp = new Date(ts + 1 * 3600 * 1000);
            document.cookie = "__amrc=" + ts + ";expires=" + exp.toGMTString();
        }
    }

    function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }

    function supportsHtml5Storage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    var makeInSide = function (a, s) {
        var _p = a.id;
        var _w = getWidth();
        var _h = getHeight();
        var _t = a.type;
        var _u = formatAdUrl(_w, _h, _p, _t, s);
        if (!_u) return;
        document.location = _u;
    }

    var makeInSide2 = function (a, s) {
        var _b = a.id;
        var _t = a.type;
        if (window.makeInSide2_running) {
            return;
        }
        _mba.makeInSide2_running = true;
        try {
            if (a.width / window.screen.width < 0.5 || a.height / window.screen.height < 0.5) {
                for (var j in common_size) {
                    var k = common_size[j];
                    if (a.width >= k["ws"] && a.width <= k["we"] &&
                        a.height >= k["hs"] && a.height <= k["he"]) {
                        window.location.replace(formatAdUrl2(a.width, a.height, _b, _t, s));
                        window.clearInterval(_mba.makeInSide2_inerval);
                        _mba.makeInSide2_running = false;
                        return;
                    }
                }
            }
        } catch (ex) {
            console.log(ex);
        }

        if (window.top) {
            var iframes = document.getElementsByTagName("iframe");
            for (var i = 0; i < iframes.length; i++) {
                if (iframes[i].zl5v !== undefined) {
                    continue;
                }
                var _w = iframes[i].width;
                var _h = iframes[i].height;
                if (_w == "" && iframes[i].style.width != "") {
                    _w = iframes[i].style.width.replace("px", "");
                }
                if (_h == "" && iframes[i].style.height != "") {
                    _h = iframes[i].style.height.replace("px", "");
                }

                for (var j in common_size) {
                    var k = common_size[j];
                    if (_w >= k["ws"] && _w <= k["we"] &&
                        _h >= k["hs"] && _h <= k["he"]) {
                        iframes[i].src = formatAdUrl2(_w, _h, _b, _t, s);
                        // var nurl = formatAhl(_w, _h);
                        // iframes[i].window.location.replace(nurl);
                        // iframes[i].src = nurl;
                        iframes[i].zl5v = "1";
                        break;
                    }
                }
            }
        }

        _mba.makeInSide2_count += 1;
        if (_mba.makeInSide2_count >= 30) {
            window.clearInterval(_mba.makeInSide2_inerval);
        }
        _mba.makeInSide2_running = false;
    }

    var makeInvisible = function (a) {
        var _p = a.id;
        var _w = a.width;
        var _h = a.height;
        var _t = a.type;

        var _u = formatAdUrl(_w, _h, _p, _t, "invisible");
        if (!_u) return;

        var ivdiv = document.createElement("div");
        ivdiv.id = 'mb_ivs_' + _p + '_' + (new Date() - 0);
        ivdiv.style.left = "0px";
        ivdiv.style.top = "0px";
        ivdiv.style.width = _w + "px";
        ivdiv.style.height = _h + "px";
        ivdiv.style.borderWidth = "0px";
        ivdiv.style.position = "relative";
        ivdiv.style.filter = "Alpha(Opacity=0)";
        ivdiv.style.opacity = "0";
        ivdiv.style.zIndex = "-10000";

        var iframeid = "mb_iv_i_" + _p + '_' + (new Date() - 0);
        ivdiv.innerHTML = makeRenderIframe(iframeid, _u, _w, _h);
        document.body.appendChild(ivdiv);
    }

    function Enc(s) {
        try {
            s = encodeURIComponent(s);
        } catch (e) {
            return s;
        }
        return s;
    }

    function reportError(e) {
        // new makeHideImg(_mba.scheme + "://err.aimeiren.top/err.gif?e=" + e + "&url=" + Enc(document.location.href));
    }

    function reportInfo(e) {
        // new makeHideImg(_mba.scheme + "://log.aimeiren.top/log.gif?sd=" + window.source_domain + "&msg=" + e + "&url=" + Enc(document.location.href));
    }

    var makeAd = function (type, a, scope) {
        a.type = type;
        typeMapping[type - 1](a, scope);
    }
    var typeMapping = [makeBr, makeWl, makeWR, "", "", "", makeInSide, makeInvisible];

    var makeAd2 = function (type, a, scope) {
        //a.type = type;
        typeMapping2[a.type](a, scope);
    }
    var googleBis = [ 3, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    var typeMapping2 = {
         1 : makeBc2,
         3 : makeInSide2,
         48 : makeInSide2,
         49 : makeInSide2,
         50 : makeInSide2,
         51 : makeInSide2,
         52 : makeInSide2,
         53 : makeInSide2,
         54 : makeInSide2,
         55 : makeInSide2,
         56 : makeInSide2,
         57 : makeInSide2,
         8 : makeWl,
         9 : makeWR,
         10 : makeInvisible,
         46 : makeBcInxxx
    }
    function _suitInnerSize(_innersize) {
        for (var i in adsizes) {
            if (adsizes[i] === _innersize) {
                return true;
            }
        }
        return false;
    }

    var refresh = 1;

    function _doWork() {
        try {
            var iw = getWidth();
            var ih = getHeight();
            var _innersize = iw + "X" + ih;
            var maxarea = 100000;
            var show = false;

            if (_mba.dversion == undefined || _mba.dversion == "1.0") {
                if (iw / window.screen.width > 0.7) {
                    delete ads[7];
                    for (var type in ads) {
                        for (var i in ads[type]) {
                            makeAd(type, ads[type][i], "outside");
                            show = true;
                        }
                    }
                }

                if (_suitInnerSize(_innersize)) {
                    for (var type in ads) {
                        if (type == 7) {
                            for (var i in ads[type]) {
                                var ad = ads[type][i];
                                if (_innersize == (ad.width + "X" + ad.height)) {
                                    makeAd(7, ad, "inside");
                                    show = true;
                                }
                            }
                        }
                    }
                }
            } else if (_mba.dversion == "2.0") {
                var pop_bis = ["1", "8", "9", "46"]
                for (var i in _mba.bis) {
                    var _bis = _mba.bis[i];
                    var domain = _mba.ad_domains[i];
                    for (var _pop_i in pop_bis) {
                        if (pop_bis[_pop_i] == _bis && iw / window.screen.width > 0.7) {
                            if (supportsHtml5Storage()) {
                                var last_ts = window.localStorage.__amrc;
                                if (last_ts) {
                                    if (new Date().getTime() - last_ts < 3600 * 1000)
                                        continue;
                                }
                            } else {
                                if (getCookie("__amrc"))
                                    continue;
                            }
                            var _size = ads[_bis].join("").split("X");
                            var ad = {id: _bis, width: _size[0], height: _size[1], type: _bis};
                            makeAd2(_bis, ad, "outside");
                            show = true;
                        }
                    }
                    if (contains(googleBis, _bis)) {
                        // if (_suitInnerSize(_innersize) || iw * ih < maxarea) {
                        var ad = {id: _bis, width: iw, height: ih, type: _bis};
                        makeAd2(_bis, ad, "inside");
                        _mba.makeInSide2_inerval = window.setInterval(function () {
                            makeAd2(_bis, ad, "inside");
                        }, 1000);
                        show = true;
                        // }
                    }
                    if (_bis == "10") {
                        if (iw / window.screen.width > 0.7) {
                            var ad = {id: _bis, width: 1200, height: 900, type: _bis};
                            makeAd2(_bis, ad, "invisible");
                            show = true;
                        }
                    }
                }
            }

            if (!show) {
                reportInfo("innerwidth_not_enough,innerWidth:" + iw + ",innerHight:" + ih + ",screen.width:" + ws.width + ",screen.hight:" + ws.height
                    + ",documentElement=" + document.documentElement + ",body=" + document.body
                    + ",documentElement.clientWidth=" + document.documentElement.clientWidth + ",document.body.clientWidth=" + document.body.clientWidth);
                if (iframe_src != undefined) {
                    document.location.href = iframe_src;
                }
            }
        } catch (ex) {
            reportError(ex);
        }
    }

    var contains = function (list, item) {
        if (!list) return false;
        for (var i = 0; i < list.length; i++) {
            if (list[i] == item) return true;
        }
        return false;
    }
    setTimeout(_doWork, 500);
})();
