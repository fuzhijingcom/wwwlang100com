var pluginColors=["#ff8080","#ffff80","#80ff80","#00ff80","#80ffff","#0080ff","#ff80c0","#ff80ff","#ff0000","#ffff00","#80ff00","#00ff40","#00ffff","#0080c0","#8080c0","#ff00ff","#804040","#ff8040","#00ff00","#008080","#004080","#8080ff","#800040","#ff0080","#800000","#ff8000","#008000","#008040","#0000ff","#0000a0","#800080","#8000ff","#400000","#804000","#004000","#004040","#000080","#000040","#400040","#400080","#000000","#808000","#808040","#808080","#408080","#c0c0c0","#400040","#ffffff"];var currentSelectProvinceName="";var d=new Date();var hour=d.getHours();var ua=navigator.userAgent.toLowerCase();var theProvs=[];theProvs[10]="A ����";theProvs[11]="A ����";theProvs[12]="B ����";theProvs[43]="C ����";theProvs[13]="F ����";theProvs[14]="G ����";theProvs[15]="G �㶫";theProvs[16]="G ����";theProvs[17]="G ����";theProvs[18]="H ����";theProvs[19]="H �ӱ�";theProvs[20]="H ����";theProvs[21]="H ������";theProvs[22]="H ����";theProvs[23]="H ����";theProvs[24]="J ����";theProvs[25]="J ����";theProvs[26]="J ����";theProvs[27]="L ����";theProvs[28]="N ���ɹ�";theProvs[29]="N ����";theProvs[30]="Q �ຣ";theProvs[31]="S ɽ��";theProvs[32]="S ɽ��";theProvs[33]="S ����";theProvs[34]="S �Ϻ�";theProvs[35]="S �Ĵ�";theProvs[37]="T ���";theProvs[36]="T ̨��";theProvs[38]="X ����";theProvs[39]="X ���";theProvs[40]="X �½�";theProvs[41]="Y ����";theProvs[42]="Z �㽭";var timeout="";var submitByEnterBtn=false;var searchInputTxt="���ġ�ƴ�����绰����  ��������/����";function initSearchInput(){if(typeof(pageType)!="undefined"&&pageType=="i18n"){searchInputTxt="���ġ�Ӣ�� �������ʳ���"}else{if(typeof(pageType)!="undefined"&&pageType=="timezone"){searchInputTxt="���ġ�Ӣ��  ��������ʱ��"}}$("#searchForm").submit(function(b){if($("#searchResult a.ui-state-error").length==0&&$("#searchResult a.ui-state-selected").length>0&&$("#inputSearchCity").val()!=searchInputTxt){window.location.href=$("#searchResult a.ui-state-selected").attr("href");return false}submitByEnterBtn=true;startSearch();b.preventDefault();return false});$("#inputSearchCity").keydown(function(a){clearTimeout(timeout);keycode=a.which;if(keycode!=40&&keycode!=38){submitByEnterBtn=false;timeout=setTimeout(startSearch,250)}}).click(function(b){if($(".ui-state-selected").length>0){$(".ui-state-selected").removeClass("ui-state-selected")}var a=$("#inputSearchCity").val();if(a!=searchInputTxt&&a!=""){$("#searchForm").submit();return false}if(typeof(pageType)!=="undefined"&&pageType=="timezone"){return false}isCurrentShowing=false;mytoggleLayer(isCurrentShowing,$("#citySelect"),$("#citySelect"));cancelEvent(b);return false}).focus(function(){if($(this).val()==searchInputTxt){$(this).val("").css("color","#333")}}).blur(function(){if($(this).val().replace(/^\s*$/,"")==""){$(this).val(searchInputTxt).css("color","#999")}}).val(searchInputTxt);startAutocomplete()}function startSearch(){if($("#inputSearchCity").val().replace(/\?/,"")==""){$("#inputSearchCity").trigger("click");return}if(submitByEnterBtn&&!$("#inputSearchCity").autocomplete("widget").is(":visible")){$("#inputSearchCity").autocomplete("search",$("#inputSearchCity").val());$("#searchResult").addClass("suggest-list-open");$("#searchResult ul").show();return false}}function startAutocomplete(){$("#inputSearchCity").autocomplete({source:function(c,e){$.ajax({url:"/t/searchCity.php",data:{q:$("#inputSearchCity").val(),pType:pageType},dataType:"json",success:function(a){if(typeof(pageType)!="undefined"&&pageType=="timezone"){var b="�Բ���δ�ҵ�����ѯ������ʱ�䡣"}else{var b="�Բ���δ�ҵ�����ѯ�ĵص�������"}if(a.res.length>0){e($.map(a.res,function(f){return{href:f.href,text:f.text}}))}else{var g=[{error:true,text:b}];e(g)}}})},appendTo:"#searchResult",position:{my:"left-1 top",at:"left bottom"},delay:300,autoFocus:true,select:function(e,c){if(c.item!=undefined&&!c.item.error){window.location.href=c.item.href}else{return false}},create:function(e,c){$(".ui-helper-hidden-accessible").remove()},focus:function(e,c){if($(".ui-state-focus").length>0){$(".ui-state-focus").addClass("ui-state-selected");$(".ui-state-focus").parent().siblings().children(".ui-state-selected").removeClass("ui-state-selected")}},open:function(e,c){$("#searchResult").addClass("suggest-list-open");$("#citySelect").hide()}});$("#inputSearchCity").data("autocomplete")._renderItem=function(j,h){var b=$("#inputSearchCity").val();h.label=b;h.value=b;if(h.error){return $("<li>").append($("<a>").attr("class","ui-state-error").html(h.text)).appendTo(j)}else{if(/[a-zA-Z]+/.test(b)&&/span/.test(h.text)){var g=h.text.split("<span>");if(g.length==2){h.text=g[0].replace(b,"<b>"+b+"</b>")+"<span>"+g[1]}}else{h.text=h.text.replace(b,"<b>"+b+"</b>")}return $("<li>").append($("<a>").attr("href",h.href).html(h.text)).appendTo(j)}};$("#inputSearchCity").data("autocomplete")._renderMenu=function(e,f){var g=this;$.each(f,function(b,a){g._renderItemData(e,a)});if(f.length<10){$(e).css("height",26*f.length)}else{$(e).css("height",260)}}}function genColorPanel(){var c=['<ul class="clearfix">'];for(i in pluginColors){var e=pluginColors[i];c.push("<li><div class='getcolor' data-color='"+e+"' style='background-color:"+e+"'></div></li>")}c.push("</ul>");return c.join("")}function fillCitySearchForm(){var h=[12,34,37,43,10,13,14,15,16,17,18,21,19,20,22,23,24,25,26,27,28,29,30,31,32,33,35,38,40,41,42,39,11,36];var f=[];for(i in h){if(typeof(h[i])=="function"){continue}var g=h[i];matches=theProvs[g].match(/\s(.*)/);var j=matches[1];if(i==3){f.push('<li><a href="#'+g+'">'+j+"</a>");f.push('<li><a href="#"></a>')}else{f.push('<li><a href="#'+g+'">'+j+"</a>")}}$("#searchProvinceList").html(f.join(""))}function loadTopBanner(){try{window.external.RCCoralGetItemCacheType();var e=1}catch(c){var e=0}$.get("/public/banner.php",{ifCleverExplorer:e},function(a){$("#mainContainer").prepend(a)})}function aqiGuide(b){aqiGuides={"1":"��μӻ������������¿�������","2":"��ȥ���߷������飬�������ô���Ȼ�ɡ�","3":"�������ʵ�����Ҫ�������Ŷ��","4":"�������ʵ����Ѿ�����Ҫ��������","5":"Ϊ�˽������룬��λ���Ѿ�����������ɣ�","6":"�뾡�����������������̵ƶ��������أ�","7":"�뾡�����������������̵ƶ��������أ�"};if(typeof(aqiGuides[b])!="undefined"){return aqiGuides[b]}else{return"����"}}function aqiPercent(b){if(b<=200){aqiPercent=b/4}else{if(b<=300){aqiPercent=50+(b-200)/4.78}else{if(b<=500){aqiPercent=70.915+(b-300)/6.876}else{if(b<=550){aqiPercent=103}else{aqiPercent=104}}}}return aqiPercent}function reflow(){var b=document.body;b.style.zoom=b.style.zoom=="1"?"100%":"1"}function redirectIfMobile(c){if(/vmod=pc/.test(window.location)){document.cookie="vmod=pc;path=/"}if(!/vmod=pc/.test(document.cookie)){var e=navigator.userAgent.toLowerCase();if(/(iphone|ipod|android|nokia|sony|ericsson|mot|htc|samsung|sgh|lg|philips|lenovo|ucweb|opera mobi|windows mobile|blackberry)/i.test(e)||e==""){location.href=c}if(/ipad/.test(e)){allCount("ipad_waptianqi");location.href=c}}}function hidePoplayer(){$(".pop-layer").hide();$(".arrow").removeClass("uarr");$(".pm-info").removeClass("cur");$(".suggest-list").removeClass("suggest-list-open");$(".select-city").removeClass("select-city-hover")}function gotoMyHref(b){window.location.href=b.attr("href")}function blanktoHref(b){window.open(b.attr("href"))}function mytoggleLayer(f,g,e){hidePoplayer();if(f){g.hide();e.removeClass("uarr").removeClass("select-city-hover")}else{g.show();e.addClass("uarr").addClass("select-city-hover")}}function indexPageWeaCallback(j){var h=nightTxt1=j.day1.weather;$("#dayIcon").addClass("w"+j.day1.img+"_l");$("#nightIcon").addClass("w"+j.day1.imgNight+"_l wnt");if(j.day1.weather.indexOf("ת")>-1){var k=j.day1.weather.split("ת");h=k[0];nightTxt1=k[1]}$("#dayTxt").html(h);$("#nightTxt").html(nightTxt1);$("#lowT").html(j.day1.tempLow+"��");$("#highT").html(j.day1.tempHigh+"��");$("#wind").html(j.day1.wind);$("#tomorrowLowT").html(j.day2.tempLow+"��");$("#tomorrowIcon").addClass("w"+j.day2.img);$("#tomorrowTxt").html(j.day2.weather);$("#tomorrowHighT").html(j.day2.tempHigh+"��");if(j.showDetail=="yes"){$("#todayHref").attr("href","/today-"+j.id+".htm");$("#tomorrowHref").attr("href","/tomorrow-"+j.id+".htm")}else{$("#todayHref").attr("href","/"+j.pinyin+"/"+j.id+".htm");$("#tomorrowHref").attr("href","/"+j.pinyin+"/"+j.id+".htm")}if(j.dayType==15){var g="15"}else{var g="7"}$("#localHref").attr("href","/"+j.pinyin+"/"+j.id+".htm").html("�鿴"+g+"������Ԥ��&raquo;");if($("html").hasClass("ie6")){$(".days2 .today").hoverfix();$(".days2 .tomorrow").hoverfix()}$("#weaInfoAqi").attr("href","/air-"+j.id+".htm");$("#weaHistory").attr("href","/wea_history/"+j.id+".htm");$("#placeHolder").hide();var l=typeof(j.cityNameWithSuffix)=="undefined"?j.city:j.cityNameWithSuffix;$("#weatherInfo").show().find("h2").html(l+"����Ԥ��")}function countDays(){var v=["һ","��","��","��","��","��","��","��","��"];var r=new Date();var x=r.getMonth();if(x<4){var w=r.getFullYear();var B=w.toString();var y=B.substr(2,2)-1;var t=parseInt((y*0.2422+21.94)-parseInt(y/4));var D=new Date(w,0,1,0,0,0);var s=parseInt((r.getTime()-D.getTime())/86400000);var E=31-t;var C=E+s+1;var F=parseInt(C/9);var z=C%9;if(F>9){return""}else{return"("+v[F]+"�ŵ�"+v[z]+"��)"}}else{if(x>=12){var w=r.getFullYear();var B=w.toString();var y=B.substr(2,2);var t=parseInt((y*0.2422+21.94)-parseInt(y/4));var u=r.getDate();if(u>t){var A=u-t+1;var F=parseInt(A/9)+1;var z=A%9;return"("+v[F]+"�ŵ�"+v[z]+"��)"}return""}}}function bindInitEvent(){$(document).click(function(b){hidePoplayer()});$(".pop-layer").click(function(b){cancelEvent(b);return false});$("#province a").click(function(){if(match=$(this).attr("href").match(/#(\d+)/)){provId=match[1];cities=getCitiesByProvId(provId);displaySearchDiv(cities,"city",provId,$(this).html());currentSelectProvinceName=$(this).html();bindCitySelect();bindCountySelect()}});ipJudgeError()}function bindCountySelect(){$("#county").find("a").unbind().click(function(){if(/����ȫ��/.test($(this).html())){$("#province").show();$("#city").hide();$("#county").hide()}else{if(/����/.test($(this).html())){$("#province").hide();$("#city").show();$("#county").hide()}else{gotoMyHref($(this))}}})}function bindCitySelect(){$("#city").find("a").unbind().click(function(){if(match=$(this).attr("href").match(/#(\d+),(\d+)/)){provId=match[1];cityIndex=match[2];counties=getCountiesByProvCity(provId,cityIndex);displaySearchDiv(counties,"county",provId,$(this).html());bindCountySelect()}else{if(/����ȫ��/.test($(this).html())){$("#province").show();$("#city").hide();$("#county").hide()}}})}function addFav(k){if(!k){var k="2345����Ԥ��"}else{k=k+"--2345����Ԥ��"}var h=location.href+"?shoucang";var e=navigator.userAgent.toLowerCase();var j="�����Գ���ͨ����ݼ� Ctrl+D ���뵽�ղؼ�";if(e.indexOf("360se")>-1||e.indexOf("lbbrowser")>-1||e.indexOf("firefox")>-1||e.indexOf("chrome")>-1){alert(j)}else{if(e.indexOf("msie 8")>-1){window.external.AddToFavoritesBar(h,k)}else{if(document.all){try{window.external.addFavorite(h,k)}catch(l){alert(j)}}else{if(window.sidebar){window.sidebar.addPanel(k,h,"")}else{alert(j)}}}}}function allCount(h){var j=arguments[1]?arguments[1]:"";var f="//union2.50bang.org/web/ajax21?uId2=SPTNPQRLSX&r="+encodeURIComponent(location.href)+"&fBL="+screen.width+"*"+screen.height+"&lO="+encodeURIComponent(h)+"?nytjsplit="+encodeURIComponent(location.href)+j;var g=document.createElement("script");g.setAttribute("type","text/javascript");g.setAttribute("src",f);document.getElementsByTagName("head")[0].appendChild(g);return true}function deleteCookie(f){var g=new Date();g.setTime(g.getTime()-1);var e=0;document.cookie=f+"="+e+"; path=/;expires="+g.toGMTString()}function getCookie(l){var h;var j=document.cookie;var k=j.indexOf(l+"=");if(k>-1){start=j.indexOf("=",k)+1;var g=j.indexOf(";",start);if(g==-1){g=j.length}h=j.substring(start,g)}return h}function setCookie(n,l,h,k){var j="";if(typeof(h)!="undefined"){var m=new Date();m.setTime(m.getTime()+Number(h)*3600*1000);j="expires = "+m.toGMTString()}if(typeof(k)!="undefined"){domainVal=";domain="+k}else{domainVal=""}document.cookie=n+"="+l+"; path=/;"+j+domainVal}function cancelEvent(b){if(b&&b.stopPropagation){b.stopPropagation()}else{window.event.cancelBubble=true}}function displaySearchDiv(l,j,g,k){$("#province").hide();$("#city").hide();$("#county").hide();var h=[];if(j=="city"&&l.length==1){currentSelectProvinceName="ȫ��";l=getCountiesByProvCity(g,0);displaySearchDiv(l,"county",g,k)}else{if(j=="city"&&l.length>1){h.push("<h3 class='btitle'>"+k+"��Ҫ����<a href='#' class='back'><< ����ȫ��</a></h3>");h.push("<div class='meta'>");for(i in l){if(typeof(l[i])=="function"){continue}match=l[i].match(/\s(.+?)-/);h.push("<li><a href='#"+g+","+i+"'>"+match[1]+"</a></li>")}h.push("</div>");$("#city").html(h.join(""));$("#city").show()}else{if(j=="county"){h.push("<h3 class='btitle'>"+k+"����<a href='#' class='back'><< ����"+currentSelectProvinceName+"</a></h3>");h.push("<div class='meta'>");for(i in l){if(typeof(l[i])=="function"){continue}match=l[i].match(/^(a?\d+)-.\s(.+?)-/);h.push("<li><a href='/t/q.php?id="+match[1]+"'>"+match[2]+"</a></li>")}h.push("</div>");$("#county").html(h.join(""));$("#county").show()}}}}function getCitiesByProvId(e){citiesStr=prov[e];if(citiesStr.indexOf("|")<0){var c=[citiesStr]}else{var c=citiesStr.split("|")}return c}function getCountiesByProvCity(e,f){var g=provqx[e][f];return g.split("|")}function seedProvCityCountySelect(h,f,g){var j=[];for(i in theProvs){if(theProvs.hasOwnProperty(i)){j.push("<option value='"+i+"'>"+theProvs[i]+"</option>")}}$("#"+h).html(j.join(""));if($("#"+h+" option:eq(33)").text().indexOf("����")>-1){$("#"+h+" option:eq(33)").insertBefore($("#"+h+" option:eq(3)"))}$("#"+h).change(function(){var c=$(this).val();if(c==""){return}var a=getCitiesByProvId(c);var b=[];for(i in a){if(typeof(a[i])=="function"){continue}cityName=a[i].match(/\d+-([^-]+)/)[1];b.push("<option value='"+c+","+i+"'>"+cityName+"</option>")}$("#"+f).html(b.join(""));$("#"+f).trigger("change")});$("#"+f).change(function(){var b=$(this).val();if(b==""){return}var c=b.split(",");var a=getCountiesByProvCity(c[0],c[1]);var e=[];for(i in a){if(typeof(a[i])=="function"){continue}countyInfo=a[i].match(/(a?\d+)-([^-]+)/);countyId=countyInfo[1];countyName=countyInfo[2];e.push("<option value='"+countyId+"'>"+countyName+"</option>")}$("#"+g).html(e.join("")).trigger("change")});setTimeout(function(){$("#"+h)[0].value="12";$("#"+h).trigger("change")},20)}function onSetCityByOwn(q,n,o){var k=$("#"+q).val();var l=$("#"+n).val().split(",")[1];var m=getCitiesByProvId(k)[l];var p="";var r=m.match(/(\d*?)-/);if(r.length>1){p=r[1];if(p<100){m=getCountiesByProvCity(k,0)[0];r=m.match(/(\d*?)-/);p=r[1]}}$("#"+o).val(p)}function ipJudgeError(){if(getCookie("defaultCityID")==""||getCookie("defaultCityID")=="undefined"||getCookie("defaultCityID")==null){$("#defaultCity").attr("src","/t/detect2009v2_defaultCiyt.php")}else{var b=getCookie("defaultCityName");$("#ipCheckError").html("�������ĵ���λ��");$("#ipCheckError").attr("href","/tianqifk/index.htm")}}function defaultCityCallBack(c,e){setCookie("defaultCityID",c,24*365);setCookie("defaultCityName",escape(e),24*365);$("#ipCheckError").html("IP�жϴ�����:�Ҳ���"+e);$("#ipCheckError").attr("href","/tianqifk/index.htm")}function parseQueryStrToJson(h){var j=h.replace(/\?/,"").split("&");var g={};for(i in j){if(typeof(j[i])!="string"){continue}var f=j[i].split("=");g[f[0]]=f[1]}return g}function judgeDayNightStr(c,e){if(hour>=18){document.write(e)}else{document.write(c)}}function todayFutureTempWidget(){var b=new dhtmlXChart({view:"line",container:"todayFutureTemp",value:"#wenduB#",label:"#curB##wenduB#",tooltip:{template:"#curB##wenduB#"},item:{borderColor:"#ff8f21",color:"#ff8f21"},line:{color:"#ff8f21",width:3},padding:{left:0,bottom:20,right:0}});b.addSeries({value:"#wenduH#",label:"#curH##wenduH#",tooltip:{template:"#curH##wenduH#"},item:{borderColor:"#66d53f",color:"#66d53f"},line:{color:"#66d53f",width:3}});b.parse(data,"json")}function todayInterFuture(){var b=new dhtmlXChart({view:"line",container:"todayFutureTemp2",value:"#wenduB#",label:"<div class='data-up'>#curB##wenduB#��</div>",tooltip:{template:"#curB##wenduB#"},item:{borderColor:"#ff8f21",color:"#ff8f21"},line:{color:"#ff8f21",width:2},padding:{left:0,bottom:20,right:0}});b.addSeries({value:"#wenduH#",label:"<div class='data-dn'>#curH##wenduH#��</div>",tooltip:{template:"#curH##wenduH#"},item:{borderColor:"#268dea",color:"#268dea"},line:{color:"#268dea",width:2}});b.parse(data,"json")}function chartHisTempData(){var b=new dhtmlXChart({view:"line",container:"hisTemp",value:"#wenduB#",label:function(a){if(a.curB!=""){return"<div class='data-up data-up-cur'>"+a.curB+a.wenduB+"��</div>"}else{return"<div class='data-up'>"+a.curB+a.wenduB+"��</div>"}},item:{borderColor:"#ff8f21",color:"#ff8f21"},line:{color:"#ff8f21",width:2},origin:"auto",padding:{top:15,left:35},xAxis:{template:function(a){if(a.curB!=""){return"<b>"+a.month+"</b>"}else{return a.month}},color:"#f7f7f7",lineColor:"#f7f7f7"},yAxis:{start:dataHisSection[1],step:dataHisSection[2],end:dataHisSection[0],template:function(a){return a+"��"},color:"#f7f7f7",lineColor:"#f7f7f7"}});b.addSeries({value:"#wenduH#",label:function(a){if(a.curB!=""){return"<div class='data-dn data-dn-cur'>"+a.curH+a.wenduH+"��</div>"}else{return"<div class='data-dn'>"+a.curH+a.wenduH+"��</div>"}},item:{borderColor:"#268dea",color:"#268dea"},line:{color:"#268dea",width:2}});$("#hisTemp").css({width:"980px",height:"218px"});b.parse(dataHisTemp,"json")}function todayHourWidget(){var g=new Date();var f=g.getHours();html="";for(i=0;i<wea_h_hour.length;i++){var e="";if(i<=5||i>=19){e="wnt_l"}html+="<li"+(i==f?' class="current"':"")+'><div class="hd">'+wea_h_hour[i]["hour"]+'��</div><div class="bd"><p class="f_ico"><span class="wea_l w'+wea_h_hour[i]["icon"]+"_l "+e+'"></span></p><p class="f_wz">'+wea_h_hour[i]["tq"]+'</p></div><div class="ft">'+wea_h_hour[i]["temp"]+"��</div></li>"}$("#wea_hour ul").html(html);hour24Slide()}function todayHourWidgetInter(h){var j=new Date();var g=j.getHours()+h-8;html="";for(i=0;i<wea_h_hour.length;i++){var f="";if(wea_h_hour[i]["hour"]<=5||wea_h_hour[i]["hour"]>=19){f="wnt_l"}html+="<li"+((wea_h_hour[i]["hour"]==g&&i<21)?' class="current"':"")+'><div class="hd">'+wea_h_hour[i]["hour"]+'��</div><div class="bd"><p class="f_ico"><span class="wea_l w'+wea_h_hour[i]["icon"]+"_l "+f+'"></span></p><p class="f_wz">'+wea_h_hour[i]["tq"]+'</p></div><div class="ft">'+wea_h_hour[i]["temp"]+"��</div></li>"}$("#wea_hour ul").html(html);hour24SlideInter()}function todayHourWidgetDistrict(){if(typeof(wea_h_hour)=="undefined"){return}var h=new Date();var g=wea_h_hour[0]["hour"]>h.getHours()?wea_h_hour[0]["hour"]:h.getHours();html="";for(i=0;i<wea_h_hour.length;i++){var j="";var f=wea_h_hour[i]["hour"];if(f<=5||f>=19){j="wnt_l"}html+="<li"+(g==f?' class="current"':"")+'><div class="hd">'+wea_h_hour[i]["hour"]+'��</div><div class="bd"><p class="f_ico"><span class="wea_l w'+wea_h_hour[i]["icon"]+"_l "+j+'"></span></p><p class="f_wz">'+wea_h_hour[i]["tq"]+'</p></div><div class="ft">'+wea_h_hour[i]["temp"]+"��</div></li>"}$("#wea_hour ul").html(html);hour24Slide()}function airTrend(e){$("#chartFutureHour").hide();$("#chartHour").hide();$("#chartDay").hide();if(e=="futurehour"){$("#futurehour").addClass("mt_curr");$("#hour").removeClass("mt_curr");$("#day").removeClass("mt_curr");$("#chartFutureHour").show();$(".module-qushitu .btitle h2").html("δ��"+cityZhName+"��������ָ��24Сʱ����Ԥ��");var f="chartFutureHour"}else{if(e=="hour"){$("#futurehour").removeClass("mt_curr");$("#hour").addClass("mt_curr");$("#day").removeClass("mt_curr");$("#chartHour").show();$(".module-qushitu .btitle h2").html(cityZhName+"����������ʷ����ͼ");var f="chartHour"}else{if(e=="day"){$("#futurehour").removeClass("mt_curr");$("#hour").removeClass("mt_curr");$("#day").addClass("mt_curr");$("#chartDay").show();$(".module-qushitu .btitle h2").html(cityZhName+"����������ʷ����ͼ");var f="chartDay"}else{if(e=="tomorrowhour"){var f="chartTomorrowHour"}}}}if(e=="futurehour"&&$("#chartFutureHour").html()!=""){return}if(e=="hour"&&$("#chartHour").html()!=""){return}if(e=="day"&&$("#chartDay").html()!=""){return}if(e=="tomorrowhour"&&$("#chartTomorrowHour").html()!=""){return}var g=new dhtmlXChart({view:"bar",container:f,value:"#point#",label:"#aqi#",width:15,radius:0,border:false,item:{borderColor:"#268dea",color:"#ffffff",radius:3},color:function(a){if(a.aqi<=50){return"#a9d86b"}else{if(a.aqi<=100){return"#fde37f"}else{if(a.aqi<=150){return"#ffba6c"}else{if(a.aqi<=200){return"#fa874d"}else{if(a.aqi<=300){return"#ba6593"}else{return"#855666"}}}}}},xAxis:{template:"#label#",color:"#f7f7f7",lineColor:"#f7f7f7"},yAxis:{color:"#f7f7f7",lineColor:"#f7f7f7",start:0,step:1666,end:9996,template:function(a){var b=[0,50,100,150,200,300,500];return b[a/1666]}},padding:{left:35,bottom:75},origin:0,preset:"simple"});if(e=="futurehour"){$("#chartFutureHour").css("height","300px").show();g.parse(future_hours24,"json")}else{if(e=="hour"){$("#chartHour").css("height","300px").show();g.parse(hours24,"json")}else{if(e=="day"){$("#chartDay").css("height","300px").show();g.parse(days30,"json")}else{if(e=="tomorrowhour"){$("#chartTomorrowHour").css("height","300px").show();g.parse(tomorrow_hours24,"json")}}}}}function publishTime(){var g=new Date();var f=g.getHours();var e=g.getFullYear()+"-"+(g.getMonth()-1+2)+"-"+g.getDate();if(f>=0&&f<8){g.setDate(g.getDate()-1);e=g.getFullYear()+"-"+(g.getMonth()-1+2)+"-"+g.getDate()+" 18:00"}else{if(f>=8&&f<12){e+=" 08:00"}else{if(f>=12&&f<18){e+=" 12:00"}else{e+=" 18:00"}}}document.write(e)}function checkSubmitSpam(g){var f=true;var e=getCookie("lastSubmitTime");if(e!=null&&parseInt(((new Date()).valueOf()-e)/1000)<15){f=false}if(!f){alert("���ύ��Ƶ�ʹ��죬���Ժ�����");return false}$("#"+g+" input[type=text]").each(function(b,c){var a=$(c).val().length;if(a<5||a>50){f=false;return}});if(!f){alert("����������5��С��50���ַ�");return false}setCookie("lastSubmitTime",(new Date()).valueOf());return true}function loadJs(f){var h=arguments[1]||function(){};var j=arguments[2]||"gbk";var g=document.createElement("script");g.setAttribute("type","text/javascript");g.setAttribute("charset",j);g.setAttribute("defer",true);g.setAttribute("src",f);if(document.all){g.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyState==4||this.readyState=="complete"){setTimeout(h,10)}}}else{g.onload=function(){h()}}document.getElementsByTagName("head")[0].appendChild(g)}function loadJsInterhour(g){var j=arguments[1]||function(){};var k="gbk";var l=arguments[2];var h=document.createElement("script");h.setAttribute("type","text/javascript");h.setAttribute("charset",k);h.setAttribute("defer",true);h.setAttribute("src",g);if(document.all){h.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyState==4||this.readyState=="complete"){setTimeout(j,10)}}}else{h.onload=function(){j(l)}}document.getElementsByTagName("head")[0].appendChild(h)}function seedMycities(){mycitiesCookie=unescape(getCookie("qd_dz_ct")).replace("undefined","");mycities=mycitiesCookie.split("|");if(mycities[0]==""){mycities=["54511","58362","59287","57494","57516"]}if(mycities.length>0){for(i in mycities){if(typeof(mycities[i])!="string"){continue}mycityId=mycities[i];if(mycityId!=""&&mycityId.replace("/s*/","")!=""){loadJs("/t/his/"+mycityId+"his.js?"+(new Date()).valueOf())}}}}function removeMyCity(j){mycities=unescape(getCookie("qd_dz_ct"));var l="|"+j;var g=j+"|";var h=j;var k=mycities.replace(l,"").replace(g,"").replace(h,"");setCookie("qd_dz_ct",k,24*300,".2345.com");$("#"+j).remove();$("#mycityTr_"+j).remove();$("#deleteAdd").html("")}function addMyCity(){var l=$("#selectCounty").val();var p=$("#selectCounty").find("option:selected").text().split(" ")[1];var m=unescape(getCookie("qd_dz_ct")||"");var n=m.split("|");var o="|"+l;var j=l+"|";var k=l;$("#qd_ct").show();$("#btnConfirm").show();$("#deleteAdd").show();if(m.indexOf(o)<0&&m.indexOf(j)<0&&m.indexOf(k)<0){if(m.split("|").length>4){$("#deleteAdd").css("visibility","visible");$("#deleteAdd").html("���ӳ����Ѵ����ޣ���ɾ�����ֳ��к���������");return false}if(n[0]==""){m+=l;$("#deleteAdd").html("��������� 5 �����У��������� 4 ��")}else{m+="|"+l;if(m.split("|").length>4){$("#deleteAdd").html("���ӳ����Ѵ�����")}else{$("#deleteAdd").html("��������� 5 �����У��������� "+(5-m.split("|").length)+" ��")}}setCookie("qd_dz_ct",m,24*300,".2345.com");loadJs("/t/his/"+l+"his.js?"+(new Date()).valueOf())}else{$("#deleteAdd").html("�ó��������ӹ�ע�������ظ�����");if(m.split("|").length>4){$("#deleteAdd").css("visibility","visible");$("#deleteAdd").html("���ӳ����Ѵ����ޣ���ɾ�����ֳ��к���������")}}}function joinWeaStrHis(r,n,p,m,k,o,l){if(l==undefined){l="����"}var q='<table width="100%" cellspacing="0" cellpadding="0" border="0" onclick = "blanktoHref($(\'#mycityTr_'+m+" a'));allCount('tianqi_guanzhu')\"><tbody><tr id=\"mycityTr_"+m+'"><td width="29%"><a title="'+r+'" href="/t/city/'+m+'.htm" onclick = "return false;">'+r+'</a></td><td width="28%" class="pad-r"><span title="'+n+'">'+n+'</span></td><td width="23%">'+p+'</td><td width="20%"><span class="aqi-lv'+o+'">'+l+"</span></td></tr></tbody></table>";mycitiesCookie=unescape(getCookie("qd_dz_ct")).replace("undefined","");mycities=mycitiesCookie.split("|");if(mycities!=""){$("#myCitiesList")[0].innerHTML+=q;$("#qd_ct")[0].innerHTML+='<span  class="follow-set-mycity" id="'+m+'">'+r+'<a class="btn_dz_del" title="ɾ��'+r+'" href="javascript:void(0);" onclick="removeMyCity('+m+');"  target="_self"></a></span>'}if($("#myMiddleCitiesList").length>0){$("#myMiddleCitiesList")[0].innerHTML+=q}}function setLiveInfo(){if(typeof(weatherinfovar)=="undefined"){return}if($("#liveInfoAqi").length==0){return}var h=weatherinfovar.weatherinfo;if(typeof(h.aqiLevel)!="undefined"){var g=new Array();var j=aqiPercent(h.idx);g[3]="(���������)";g[4]="(��Ҫ������)";g[5]="(��Ҫ������)";g[6]="(��ش�����)";g[7]="(��ش�����)";$("#liveInfoAqi").addClass("aqi-lv"+h.aqiLevel);$("#liveInfoAqi h3 span").html(h.lv_hint);$("#liveInfoAqi div.progess b").html(h.idx==null?"����":h.idx).css("left",j+"%");$("#liveInfoAqi p span").html(aqiGuide(h.aqiLevel));if(typeof g[h.aqiLevel]!="undefined"){var f='<div class="advice">'+g[h.aqiLevel]+"</div>";$("#liveInfoAqi h3").after(f)}$("#aqi_container").html(h.lv_hint)}}function setRealTemp(){if(typeof(weatherinfovar)=="undefined"){return}var b=weatherinfovar.weatherinfo;if(typeof(b.temp)!="undefined"){$("#jingdianTemp strong").html("��ǰ���£�");$("#jingdianTemp span").html(b.temp+"��");$("#districtTemp").html("��ǰ���£�<i>"+b.temp+"��</i>")}setLiveInfo()}function setDetailInfo(){if(typeof(weatherinfovar)=="undefined"){return}var c=weatherinfovar.weatherinfo;if(typeof(c.aqiLevel)!="undefined"){if($("#aqiHref")){var e=aqiPercent(c.idx);$("#aqiHref").attr("class","aqi-icon aqi-icon-lv"+c.aqiLevel);$("#aqiText").html(c.lv_hint)}}}function weaInterAlert(e){if(e){var c=new String(e.title);$("#alertCont h2").hide();$("#alertCont").append('<div class="status warn-yellow"><i class="warn"></i><em>'+c+"</em></div>")}}function weaAlertCallBack(c){if(c){var e=new String(c.title);title=e.replace(/.*?����/,"");title=title.replace(/��·/,"");color=alarmColor(title);if($("#alertLink").length>0){$("#emoticonId").attr("class","emoticon warn-"+color);$("#emoticonId span").html(title+"<br/>С����Ȼ�ֺ���");$("#emoticonId a").attr("href","/t/shikuang/alert/"+c.url)}else{$("#emoticonId").addClass("warn-"+color);$("#emoticonId i").attr("class","warn");$("#emoticonId span").html(title+"<br/>С����Ȼ�ֺ���");$("#emoticonId span").append('<a id = "alertLink" onclick="allCount(\'friendHint\');" href= "/t/shikuang/alert/'+c.url+'" target="_blank"></a>')}}}function alarmColor(b){if(b.indexOf("��ɫ")>=0){color="blue"}else{if(b.indexOf("��ɫ")>=0){color="yellow"}else{if(b.indexOf("��ɫ")>=0){color="orange"}else{if(b.indexOf("��ɫ")>=0){color="red"}else{color="blue"}}}}return color}function showAddFavPop(){$("#add2fav-layer b").click(function(){setCookie("closedAddFav","y",24*365);$("#add2fav-layer").hide()});if(!getCookie("closedAddFav")){$("#add2fav-layer").show()}setTimeout(function(){setCookie("closedAddFav","y",24*365);$("#add2fav-layer").hide()},10000)}function hourChartInDetail(){var e=(new Date).getHours();var c=new dhtmlXChart({view:"line",container:"hourChart",value:"#temp#",label:function(b){var g="w"+b.icon;var a="";if(b.hour<6||b.hour>18){g=g+" wnt"}if(b.hour==e&&typeof(tomorrowDetail)=="undefined"){a=" data-cur"}return"<div class='data"+a+"'><span class='"+g+"'></span><span class='temp'>"+b.temp+"��</span></div>"},tooltip:{template:"#tq#"},item:{borderColor:function(a){if(a.hour==e&&typeof(tomorrowDetail)=="undefined"){return"#268dea"}else{return"#fff"}},color:function(a){if(typeof(tomorrowDetail)!="undefined"){return"#268dea"}if(a.hour<e){return"#ccc"}else{if(a.hour==e){return"#fff"}else{return"#268dea"}}},radius:4},line:{color:function(a){if(typeof(tomorrowDetail)!="undefined"){return"#b2daff"}if(a.hour<e){return"#e9e9e9"}else{return"#b2daff"}},width:2},xAxis:{template:"#hour#��",color:"#d9d9d9",lineColor:"#e9e9e9"},yAxis:{start:wea_h_section[1],step:wea_h_section[2],end:wea_h_section[0],template:function(a){return a+"��"},color:"#d9d9d9",lineColor:"#e9e9e9"},preset:"simple"});c.parse(wea_h_hour,"json")}function hour24Slide(){var m=$("#wea_hour ul"),h=$("#wea_hour .tab-body .current").index(),l=$("#hourPrev"),n=$("#hourNext"),j=[0,-366,-732,-1098],k=0;if(h<=5){k=0;l.addClass("disable")}if(h>=6&&h<=11){k=1}if(h>=12&&h<=17){k=2}if(h>=18&&h<=23){k=3;n.addClass("disable")}m.css("margin-left",j[k]+"px");l.bind("click",function(){if($(this).hasClass("disable")){return}else{if(n.hasClass("disable")){n.removeClass("disable")}k--;m.animate({marginLeft:j[k]+"px"},200,"linear");if(k<=0){$(this).addClass("disable")}allCount("hour_previous")}});n.bind("click",function(){if($(this).hasClass("disable")){return}else{if(l.hasClass("disable")){l.removeClass("disable")}k++;m.animate({marginLeft:j[k]+"px"},200,"linear");if(k>=3){$(this).addClass("disable")}allCount("hour_next")}})}function hour24SlideInter(){var m=$("#wea_hour ul"),h=$("#wea_hour .tab-body .current").index(),l=$("#hourPrev"),n=$("#hourNext"),j=[0,-366,-732,-1098,-1464,-1830],k=0;if(h<=5){k=0;l.addClass("disable")}if(h>=6&&h<=11){k=1}if(h>=12&&h<=17){k=2}if(h>=18&&h<=23){k=3;n.addClass("disable")}m.css("margin-left",j[k]+"px");l.bind("click",function(){if($(this).hasClass("disable")){return}else{if(n.hasClass("disable")){n.removeClass("disable")}k--;m.animate({marginLeft:j[k]+"px"},200,"linear");if(k<=0){$(this).addClass("disable")}allCount("hour_previous")}});n.bind("click",function(){if($(this).hasClass("disable")){return}else{if(l.hasClass("disable")){l.removeClass("disable")}k++;m.animate({marginLeft:j[k]+"px"},200,"linear");if(k>=5){$(this).addClass("disable")}allCount("hour_next")}})}(function(b){b.fn.hoverfix=function(){b(this).hover(function(a){b(this).addClass("hover")},function(){b(this).removeClass("hover")});return this};b.fn.activefix=function(){var a=b(this);a.bind("mousedown",function(){b(this).addClass("active")}).bind("mouseup",function(){b(this).removeClass("active")}).bind("mouseout",function(){b(this).removeClass("active")});return this}})(jQuery);if(!/plugin\/widget\/index/.test(location.href)){jQuery(window).bind("resize",function(){var b;b=jQuery("body");if(jQuery(this).width()<=1000){b.css("width","1000")}else{b.css("width",jQuery(window).width()+"px")}}).trigger("resize")}function scrollFixed(){var g=$(".sidebar-money");if(g.length==0){return}var f=g.offset().top;var e=$("html").hasClass("ie6");$(window).scroll(function(){if($(this).scrollTop()>=f){g.addClass("sidebar-money-fixed");if(e){g.css({top:$(this).scrollTop()-145})}}else{g.removeClass("sidebar-money-fixed");if(e){g.css({top:0})}}})}function setAqi15days(){if(typeof(aqiForeast)=="undefined"){return}var e=0;for(time in aqiForeast){if(aqiForeast[time].qualityStr=="��"){aqiForeast[time].qualityStr="������"}else{if(aqiForeast[time].qualityStr=="��"){aqiForeast[time].qualityStr="������"}}var g='<div class="aqi_container"><span class="small-aqi-icon small-aqi-icon-lv'+aqiForeast[time].level+'"></span>'+aqiForeast[time].qualityStr+"</div>";if($("#day7info li:eq("+e+")").length>0){$(".week_day7 li:eq("+e+")").append(g)}else{var f=e-7;$("#day8info li:eq("+f+")").append(g)}e++}}function addToFavorite(){var h=document.title,e=location.href,g=$("#lastBread").text()||"2345����Ԥ��";try{window.external.addFavorite(e,h)}catch(j){try{window.sidebar.addPanel(h,e,"")}catch(j){alert("ͬʱ����Ctrl+D��������"+g+"�������ղؼ�")}}}function getBrowserOs(){var a="";if(navigator.userAgent.indexOf("MSIE")>0){return"MSIE"}if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){return"Firefox"}if(isSafari=navigator.userAgent.indexOf("Safari")>0){return"Safari"}if(isCamino=navigator.userAgent.indexOf("Camino")>0){return"Camino"}if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){return"Gecko"}};