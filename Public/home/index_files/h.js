/**
 * Created by liubingwen on 2015/12/22.
 */

;(function (win){
    function browser() {
        var nh = navigator.userAgent.toLowerCase(),
            ua = {};
        // 浏览器名称
        ua.name = !-[1,] ? "ie" :
            ( nh.indexOf("opr")>0 ) ? "opera" :// opera特殊 且应放在chrome前判断
                ( nh.indexOf("firefox")>0 ) ? "firefox" :
                    ( nh.indexOf("chrome")>0 ) ? "chrome" :
                        ( nh.indexOf("safari")>0 ) ? "safari" :
                            "unknow";
        // 当前浏览器版本
        if (document.all || !window.XMLHttpRequest) {// ie version
            ua.version = ( !!document.documentMode && document.documentMode==7 )?"v7.0" :
                ( !!document.documentMode && document.documentMode==8 )?"v8.0" :
                    ( !document.documentMode==9 )?"v9.0" :
                        ">9.0";
        }else{// not ie
            ua.version = (ua.name=="chrome") ? nh.match(/chrome\/([\d.]+)/)[1] :
                (ua.name=="firefox") ? nh.match(/firefox\/([\d.]+)/)[1] :
                    (ua.name=="safari") ? nh.match(/version\/([\d.]+)/)[1] :
                        (ua.name=="opera") ? nh.match(/opr\/([\d.]+)/)[1] :
                            "0";
        }
        return ua.name+"_"+ua.version;
    }

    function detectOS(){
        var sUserAgent=navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");

        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        var isiPhone = sUserAgent.indexOf('iPhone') > -1;
        if (isMac) return "Mac";
        if (isiPhone) return "iPhone";
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        if (bIsIpad) return "iPad";

        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";

        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
        if (isLinux) {
            if(bIsAndroid) return "Android";
            else return "Linux";
        }

        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        if (bIsCE) return "WinCE";

        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsWM) return "WinMobile";

        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";

            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";

            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";

            var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";

            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";

            var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
            if (isWin8) return "Win8";

            var isWin10 = sUserAgent.indexOf("Windows NT 10.0")> -1 || sUserAgent.indexOf("Windows 10") > -1;
            if (isWin10) return "Win10";
        }

        return "Unknow";
    }
    function getWH(){
        return window.screen.width+'x'+window.screen.height;
    }
    var getD ={
        navigator:[
            {name:browser,key:'browser'},
            {name:'language',key:'language'},
            {name:detectOS,key:'os'},
            {name:'cookieEnabled',key:'cookie_enabled'}
        ],
        screen:[
            {name:getWH,key:'screen_resolution'}
        ],
        location:[
            {name:'href',key:'url',status:1}
        ]
    };
    var username=document.cookie.split(";")[0].split("=")[1];
    //JS操作cookies方法!
    //写cookies
    function setCookie(name,value,time)
    {
        var Days = time||30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ encodeURIComponent(value) + ";expires=" + exp.toGMTString()+";path=/";
    }
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return arr[2];
        else
            return null;
    }
    var setInfoToCookie = function(qz){
        //win.setInfoToCookie = function(qz){
        var q = qz||'yd';
        for(var i in getD){
            var key = getD[i],len = key.length;
            for (var j =0;j<len;j++){
                var Name = key[j]['name'];
                if(!getCookie('_'+q+'_'+key[j]['key'])||key[j].status){
                    var data='';
                    if(typeof Name === 'string'){
                        data = eval(i+'.'+Name);
                    }else {
                        data = Name();
                    }
                    setCookie('_'+q+'_'+key[j]['key'],data);
                }
            }
        }
    };
    setInfoToCookie()
})(window);