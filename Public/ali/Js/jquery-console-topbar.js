!function(t){function a(t){var a=window.location.hostname,e=window.location.protocol||"https:",n={dev:["dataplus-test.aliyun.test"],daily:["dataplus-qa.aliyun.test"],pre:["data-pre.aliyun.com","shuju-pre.aliyun.com","shujia-pre.aliyun.com","dataplus-pre.aliyun.com"],prod:["data.aliyun.com","shuju.aliyun.com","shujia.aliyun.com","dataplus.aliyun.com"]},s=/dev|daily/g.test(t)?":8080":"",o=i.inArray(a,n[t]);return e+"//"+n[t][o>-1?o:0]+s}function e(){return[{href:"javascript:;",text:"工单服务",className:"ds-console-topbar-service",children:[{href:"https://workorder.console.aliyun.com/#/ticket/list/?workorderId=&begin=&end=",text:"我的工单",target:"_blank"},{href:"https://workorder.console.aliyun.com/#/ticket/add?productId=1260",text:"提交工单",target:"_blank"}]},{href:"javascript:;",text:"帮助",className:"ds-console-topbar-help",children:[{href:"https://help.aliyun.com/product/9091750_shujia.html",text:"文档中心",target:"_blank"},{href:"http://bbs.aliyun.com/thread/262.html?spm=5176.7189909.0.0.1ZRUrK",text:"官方论坛",target:"_blank"},{href:"http://amos.alicdn.com/msg.aw?v=2&uid=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%B9%B3%E5%8F%B0%E5%92%A8%E8%AF%A2&site=cntaobao&s=11&charset=UTF-8",text:"联系客服",target:"_blank"}]}]}function n(){var t=h.defaultUrl,a='<div class="ds-console-topbar-logo">  <a href="'+t+'" title="数加 - 阿里云">数加</a></div><a href="'+t+'/console" class="ds-console-topbar-title">管理控制台</a>',e=i('<div class="ds-fl ds-console-topbar-nav" />');return e.append(a),e}function s(){var a=h.defaultUrl,e=l("login_aliyunid");if(!e)return null;e=e.replace(/[\"\']/g,"");var n="http://i.aliyun.com/",s=a+"/logout?redirect="+encodeURIComponent(t.location.href),o='<div class="ds-dropdown ds-console-topbar-account"><a href="'+n+'" class="ds-dropdown-toggle">'+e+'</a><ul class="ds-dropdown-content"><li><a href="'+s+'">退出</a></li></ul></div>';return o}function o(){var t=i('<div class="ds-fr ds-console-topbar-info" />'),a=[];i.each(h.defaultData,function(){var t=this.className?" "+this.className:"";if(this.children&&this.children.length>0){for(var e,n,t,s='<div class="ds-dropdown'+t+'"><a href="'+this.href+'" class="ds-dropdown-toggle">'+this.text+'</a>   <ul class="ds-dropdown-content">',o=0;o<this.children.length;o++)e=this.children[o],n=e.target?' target="'+e.target+'"':"",t=e.className?' class="'+e.className+'"':"",s+='<li><a href="'+e.href+'"'+n+t+">"+e.text+"</a></li>";s+="</ul></div>",a.push(s)}else a.push('<a href="'+this.href+'"'+(this.target?' target="'+this.target+'"':"")+' class="lnk-item '+t+'">'+this.text+"</a>")});var e=s();return e&&a.push(e),t.append(a.join('<span class="lnk-spacing"></span>')),t}function r(){var t=f.find(".ds-container"),a=n(),e=o();t.append(a),t.append(e)}function l(t){for(var a,e=document.cookie.split("; "),n=0;n<e.length;n++){var s=e[n].split("=");if(s[0]==t){a=decodeURIComponent(s[1]);break}}return a}function d(){var t=h.spm,a=h.parentId||document.body,e='<div class="ds ds-console-topbar" data-spm="'+t+'"><div class="ds-container"></div></div>';f=i(e),i(a).addClass("ds-console-topbar-body").prepend(f),r()}if(!t.jQuery)throw"jQuery is NEED for aliyun dataplus topbar. Recommand 1.10.2";var i=t.jQuery,c=window.DS_CONSOLE_TOPBAR_CONFIG,u=c&&c.env?c.env:"prod",p=a(u),h={env:u,parentId:null,defaultData:e(),spm:"0",defaultUrl:p};c&&i.extend(h,c);var f=null;i(document).ready(d)}(window);