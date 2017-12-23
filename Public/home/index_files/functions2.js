/**
 * Created by Administrator on 2015/8/30.
 */

/**
 * @description 图片第三方服务器地址
 * @type {string}
 */
var dataImagePath = 'http://data.yunduimedia.com';
/**
 * @description 工程根目录路径获取
 * @type {string}
 */
var Path = function () {
  var a = document.scripts, b = a[a.length - 1].src;
  return b.substring(0, b.lastIndexOf("/") + 1) + '..';
}();
/**
 * @param url
 * @returns {string}
 * @private
 * @description 处理fis3编译前的方法
 */
var __uri = function (url) {
  return Path + url.replace(/(\.\.\/)+/, '')
};

/**
 * @description 云堆统计代码
 * @private
 */
var yd_h = escape("<script async=true src='" + __uri("/javascript/h.js") + "' type='text/javascript'></script>");
document.write(unescape(yd_h));
/**
 *
 * @description 百度统计代码
 * @private
 */
//var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
//document.write(unescape("%3Cscript async=true src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F4f14123bb47af05685686a3703fbe2c0' type='text/javascript'%3E%3C/script%3E"));

/**
 *
 * @description 360流量统计代码
 * @private
 */
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?450d54ef093cdd56fd5d90d08b8921b1";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
var _mvq = _mvq || [];
_mvq.push(['$setAccount', 'm-193004-0']);
_mvq.push(['$logConversion']);
(function () {
  var mvl = document.createElement('script');
  mvl.type = 'text/javascript';
  mvl.async = true;
  mvl.src = ('https:' == document.location.protocol ? 'https://static-ssl.mediav.com/mvl.js' : 'http://static.mediav.com/mvl.js');
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(mvl, s);
})();
/**
 * @description QQ数据分析
 */
document.write(unescape("%3Cscript  charset='utf-8' async=true src='http://wpa.b.qq.com/cgi/wpa.php?key=XzkzODA3MDQwNF8zNDUzNzZfNDAwMDA2MDU2OF8' type='text/javascript'%3E%3C/script%3E"));
//
//var linkToQQ ='tencent://message/?Menu=yes&amp;amp;uin=938070404&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988B0F0D1672CF072ADDC8C1C7DE68714600BA6D7090698B293A8C9B6A7866D391C04676CF366EA3CF71FD25A6652B5C3748B34B53480522D1EA54F22F48708EBB16A31A327A44E7135A5FCC357DFC4911B1216FF196E0E5189ACC68DA4B5B710ED700E7DA4B86B6BD56E3EEFA25887A28A&amp;amp;SigU=30E5D5233A443AB2598D4F4C638AF26DA3463F2153D7B453F4CB72217549574DB373FBFA36869564864FFDFAA8BBC5A3A978BBD6FFC873AA7E73B8886EF517E1C732571831153D7A';


$.extend({
  /**
   *
   * @description 返回当前路径
   * @example
   * var path = $.includePath();
   * @returns {string}
   */
  includePath: function () {
    var a = document.scripts, b = a[a.length - 1].src;
    return b.substring(0, b.lastIndexOf("/") + 1)
  },
  /**
   *
   * @description 动态创建css或者js引用文件标签
   * @param file {String} 当前文件路径
   * @param ver  {String} 加载版本号可选
   */
  include: function (file, ver) {
    var v = ver || 1.0;
    var files = typeof file == "string" ? [file] : file;
    for (var i = 0; i < files.length; i++) {
      var name = $.trim(files[i]);
      var att = name.split('.');
      var ext = att[att.length - 1].toLowerCase();
      var isCSS = ext == "css";
      var tag = isCSS ? "link" : "script";
      var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
      var link = (isCSS ? "href" : "src") + "='" + $.includePath() + name + "?ver=" + v + "'";
      if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
    }
  }
});
/**
 *
 * @description 时间戳格式化
 * @param format {String} 转换后时间格式；
 * @example new Date('1456900936581').format('yyyy-MM-dd HH:mm:ss')
 * @returns {String}
 */
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()

  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
        - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};
/**
 * @description 修改jquery ajax默认属性
 * @private
 */
$.ajaxSetup({
  type: 'post',
  dataType: 'json'
});

(function ($) {
  'use strict';
  /**
   *
   * @description 添加点击回到顶部
   * @param {object} opt = {autohide,offset,speed,position,right,bottom}
   */
  $.fn.toTop = function (opt) {

    //variables
    var elem = this;
    var win = $(window);
    var doc = $('html, body');

    //Extended Options
    var options = $.extend({
      autohide: true,
      offset: 420,
      speed: 500,
      position: true,
      right: 0,
      bottom: 0
    }, opt);

    elem.css({
      'cursor': 'pointer'
    });

    if (options.autohide) {
      elem.css('display', 'none');
    }

    if (options.position) {
      elem.css({
        'position': 'fixed',
        'right': "10px",
        'top': "435px"
      });
    }

    elem.click(function () {
      doc.animate({scrollTop: 0}, options.speed);
    });

    win.scroll(function () {
      var scrolling = win.scrollTop();

      if (options.autohide) {
        if (scrolling > options.offset) {
          elem.fadeIn(options.speed);
        }
        else elem.fadeOut(options.speed);
      }

    });

  };

}(jQuery));

/**
 *
 *@description 检测input无placeholder时添加placeholder class
 *
 */
function placeholder() {
  if (!Modernizr.input.placeholder) {
    $('body').on('focus', 'input[placeholder]', function () {
      var input = $(this);
      if (input.attr('type') !== 'password' && input.attr('placeholder') != 0) {
        if (input.val() == input.attr('placeholder')) {
          input.val('');
          input.removeClass('placeholder');
        }
      }

    }).on('blur', 'input[placeholder]', function () {
      var input = $(this);
      if (input.attr('type') !== 'password' && input.attr('placeholder') != 0) {
        if (input.val() === '' || input.val() === input.attr('placeholder')) {
          input.addClass('placeholder');
          input.val(input.attr('placeholder'));
        }
      }
    });
    var $input = $('body').find('input[placeholder]');
    if (!$input.val()) {
      $input.addClass('placeholder');
      $input.val($input.attr('placeholder'));
    }
  }
}


//客服
var qq = {
  kefu: '',
  daili: 'tencent://message/?Menu=yes&amp;amp;uin=938070404&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988C725B7BF5674F854B56CEF9BA1F9CC2EF51B06AE01C422417A9A6CA0ADD5FAF7EEC6A3DD1F507077A17BD88784E248AD912231C67337C2383AA28CCF519A521F7F98C1DB5F61D9F4A96B76C545446CF1544B660B948E9E84314423862980764D0E7662A3EDD24C87B324C574938E60D4&amp;amp;SigU=30E5D5233A443AB25E786C0D11331FF0F42D3FEB1D4C8E558FAC32B3E94941E3FE9C6B02C830C4E235128BD34FA3EB6656CB3F71C8F67D81D099D046D9F02250B52A3A7A0769D94F',
  meiti: 'tencent://message/?Menu=yes&amp;amp;uin=938070404&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988C725B7BF5674F854B56CEF9BA1F9CC2EF51B06AE01C422417A9A6CA0ADD5FAF7EEC6A3DD1F507077A17BD88784E248AD912231C67337C2383AA28CCF519A521F7F98C1DB5F61D9F4A96B76C545446CF1544B660B948E9E84314423862980764D0E7662A3EDD24C87B324C574938E60D4&amp;amp;SigU=30E5D5233A443AB25E786C0D11331FF0F42D3FEB1D4C8E558FAC32B3E94941E3FE9C6B02C830C4E235128BD34FA3EB6656CB3F71C8F67D81D099D046D9F02250B52A3A7A0769D94F',
};
var ints = '';
//公共方法
var base = {
  /**
   *
   * @description 获取屏幕高度
   * @returns {number}
   */
  getBodyHeight: function () {
    var h = ($(document).height() > $(window).height()) ? $(document).height() : $(window).height();
    return h;
  },
  placeholder: function () {
    //placeholder检测
    if (!Modernizr.input.placeholder) {
      $('body').on('focus', 'input[placeholder]', function () {
        var input = $(this);
        if (input.attr('type') !== 'password' && input.attr('placeholder') != 0) {
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }

      }).on('blur', 'input[placeholder]', function () {
        var input = $(this);
        if (input.attr('type') !== 'password' && input.attr('placeholder') != 0) {
          if (input.val() === '' || input.val() === input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
        }
      });
      var $input = $('body').find('input[placeholder]');
      if (!$input.val()) {
        $input.addClass('placeholder');
        $input.val($input.attr('placeholder'));
      }
    }
  },
  /**
   *
   * @description 设置cookie
   * @param {String} cname 设置cookie的名称
   * @param {*} cvalue 设置cookie的值
   * @param {number} exdays 设置cookie的过期天数
   */
  setCookie: function (cname, cvalue, exdays) {
    var data = {path: '/'};
    if (exdays) {
      data.expires = exdays;
    }
    $.cookie(cname, cvalue, data);
  },
  /**
   *
   * @description 清除某个cookie
   * @param {String} name 填写需要清除的cookie名称
   */
  clearCookie: function (name) {
    this.setCookie(name, null, -1);
  },
  /**
   *
   * @description 获取某个名称的cookie值
   * @param cname 填写需要获取的cookie值得名称
   * @returns {String}
   */
  getCookie: function (cname) {
    return $.cookie(cname);
  },
  /**
   *
   * @description 当数字小于10时在前面自动补零
   * @param {number} i 必须大于0
   * @returns {String}
   */
  zero: function (i) {
    var t = parseFloat(i);
    if (t < 10)return '0' + t;
    else return t;
  },
  /**
   *
   * @description 获取距离今天的某一天日期
   * @param {number} AddDayCount
   * @returns {string}
   */
  getDateStr: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = this.zero(dd.getMonth() + 1);//获取当前月份的日期
    var d = this.zero(dd.getDate());
    return y + "-" + m + "-" + d;
  },
  /**
   *
   * @description 判断是否是手机端 是返回true
   * @returns {boolean}
   */
  mobilecheck: function () {
    var a = !1;
    return function (b) {
      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
    }(navigator.userAgent || navigator.vendor || window.opera), a
  },
  /**
   *
   * @description 判断字符串是否为空 为空返回true
   * @returns {boolean}
   */
  isNull: function (str) {
    if ($.trim(str).length == 0)return true;
    else return false;
  },
  //判断是否为url地址
  isUrl: function (str) {
    var rex = /^(http|https){1}:\/\/[^\s]+$/;
    if (rex.test($.trim(str)))return true;
    else return false;
  },
  /**
   *
   * @description 验证email格式 是email 返回 true
   * @returns {boolean}
   */
  isEmail: function (str) {
    var reg = /^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (reg.test(str))return true;
  },
  /**
   *
   * @description 判断是否是手机号码 如果是返回true
   * @returns {boolean}
   */
  isPhone: function (str) {
    var a = /^1\d{10}$/, s = $.trim(str);
    if (a.test(s))return true;
  },
  //判断字符串是否为微信号
  isWx: function (str) {
    var rex = /^[a-zA-Z\d_]{5,}$/;
    if (rex.test($.trim(str)))return true;
    return false;
  },
  /**
   *
   * @description 验证汉字格式 验证通过返回 true
   * @returns {boolean}
   */
  isCN: function (str) {
    var s = $.trim(str), reg = /^[\u4e00-\u9fa5]+$/;
    if (reg.test(s))return true;
    else return false;
  },
  /**
   *
   * @description 验证密码格式 验证通过返回 true
   * @returns {boolean}
   */
  isPwd: function (str) {
    var reg = /^[A-Za-z0-9_-]+$/;
    if (reg.test(str))return true;
  },
  /**
   *
   * @description 信息小提示
   */
  tips: function (obj, text, c) {
    this.pdjqObj(obj).attr('class', 'tips ' + c).html(text).fadeIn(300);
  },
  /**
   *
   * @description 信息小提示
   */
  regtips: function (obj, text, c) {
    this.pdjqObj(obj).fadeIn(300).find('span').html(text);
  },
  /**
   *
   * @description 返回jquery对象
   * @returns {jQuery}
   */
  pdjqObj: function (obj) {
    try {
      var t = obj.jquery;
      if (t)return obj;
      else return $(obj);
    }
    catch (e) {
      this.log('pdjqObj方法需要传入参数！', 'error')
    }


  },
  /**
   * @description 处理浏览器控制台console兼容性
   * @param {String} msg 控制台打出消息
   * @param {String} log = [log|error|table|warn|..]
   *
   */
  log: function (msg, log) {
    var l = log || 'log';
    if (window['console']) {
      if (console[l]) {
        console[l](msg)
      } else {
        console.log(msg)
      }

    }
  },
  createuploader: function (btnId, img_box, hiddenId, uptype, fn) {
    var _this = this, deferred = $.Deferred();
    //文件上传
    var uploader = WebUploader.create({
      // 选完文件后，是否自动上传。
      auto: true,
      // swf文件路径
      swf: Path + '/plugin/webuploader-0.1.5/Uploader.swf',
      // 文件接收服务端。
      server: Path + '/upload.do',
      formData: {uptype: uptype},
      //参数传递，参数名不要使用id和name因为他们被上传控件暂用
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      //pick: '#'+btnId,
      duplicate: false,
      //重复上传
      pick: {id: btnId, multiple: false},
      fileSizeLimit: 3 * 1024 * 1024,    // 3 M
      // 只允许选择图片文件。
      accept: {
        title: 'Images',
        extensions: 'jpg,jpeg,bmp,png,gif',
        mimeTypes: 'image/*'
      }
    });
    var hidden = hiddenId || $('#uploadimg'), $hiddenId = _this.pdjqObj(hidden);
    var $img = [];

    // 验证文件格式以及文件大小。
    uploader.on('error', function (type) {
      if (type == "Q_TYPE_DENIED") {
        alert("请上传jpg,jpeg,bmp,png,gif格式文件");
      } else if (type == "Q_EXCEED_SIZE_LIMIT") {
        alert("文件大小不能超过3M");
      }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
      _this.isLogin();
      $hiddenId.val('');
      var li = '<div id="' + file.id + '" class="file-item yundui_thumb">' +
              '<img lg-img class="js_appmsg_thumb appmsg_thumb">' +
              '</div>'
          , thumbnailWidth = 318,
          thumbnailHeight = 160, $imgbox = _this.pdjqObj(img_box), id = $imgbox.find('div[id]').attr('id');
      if (id)uploader.removeFile(id);
      $imgbox.html(li);
      var $li = $imgbox.find('.yundui_thumb');
      $img = $li.find('img');
      // 创建缩略图
      // 如果为非图片文件，可以不用调用此方法。
      // thumbnailWidth x thumbnailHeight 为 100 x 100
      uploader.makeThumb(file, function (error, src) {
        if (error) {
          $img.replaceWith('<span>不能预览</span>');
          return;
        }
        if ($('.appmsg_thumb').length > 0)$imgbox.next('.appmsg_thumb').hide();
        $imgbox.find('img').attr('src', src).show();
      }, thumbnailWidth, thumbnailHeight);
    })
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
      var $li = $('#' + file.id),
          $percent = $li.find('.progress span');

      // 避免重复创建
      if (!$percent.length) {
        $percent = $('<p class="progress"><span></span></p>')
            .appendTo($li)
            .find('span');
      }

      $percent.css('width', percentage * 100 + '%');
    });
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
      // $('#' + file.id).addClass('upload-state-done');
      $img.attr('src', Path + response.imgurl).show();
      $hiddenId.val(response.imgurl);
      if (fn)fn(response.imgurl);
    });
    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
      var $li = $('#' + file.id),
          $error = $li.find('div.error');
      // 避免重复创建
      if (!$error.length) {
        $error = $('<div class="error"></div>').appendTo($li);
      }
      $error.text('上传失败');
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
      $('#' + file.id).find('.progress').remove();
    });
    return deferred.promise();
  },
  /**
   *
   * @description laytpl模板引擎封装
   * @param {String|jQuery} tpl 模版文件
   * @param {String|jQuery} htmlDom 解析后代码放置位置
   * @param {Object} data 解析数据
   * @param {boolean} status=[1|0] 可选参数 存在使用添加方式 不存在使用覆盖方式
   */
  layerTpl: function (tpl, htmlDom, data, status) {
    var _this = this;
    var gettpl = this.pdjqObj(tpl).html();
    try {
      laytpl(gettpl).render(data, function (html) {
        if (status)_this.pdjqObj(htmlDom).append(html);
        else _this.pdjqObj(htmlDom).html(html);
      })
    } catch (e) {
      _this.log('layerTpl方法依赖laytpl组件！');
    }

  },
  //图片预加载
  /**
   *
   * @description 图片预加载 检测页面中img标签中有_src是执行图片请求
   * @param {String|Jquery} obj=[img]
   */
  lazyImg: function (obj) {
    var __this = this;
    this.pdjqObj(obj).closest('[_src]').each(function () {
      var _this = $(this), url = _this.attr('_src'), img = new Image();
      if (url) {
        /*_this.addClass('loading');*/
        img.src = url;
        /*img.onload=function(){
         _this.attr('src',url);
         _this.removeAttr('_src');
         _this.removeClass('loading');
         };*/
        //ie8 bug fix
        setTimeout(function () {
              img.src = url;
            },
            300);
      } else {
        __this.log(_this + '对象_url为空')
      }

    })
  },
  /**
   *
   * @description 退出登录
   */
  outLogin: function () {
    var _this = this;
    $.ajax({
      type: "post",
      url: Path + "/user/loginOut.do",
      dataType: "json",
      success: function (json) {
        _this.clearCookie("loginName");
        _this.clearCookie("userRole");
        if (json.success) {
          window.location = Path + "/index.html";
        }
      }
    });
  },
  /**
   *
   * @description 远程服务器获取用户是否登录；如果未登录执行退出登录方法
   */
  isLogin: function () {
    var _this = this;
    $.ajax({
      url: Path + '/user/checkLogin.do',//获取服务器用户登录状态;
      type: 'post',
      dataType: 'json',
      async: false,
      success: function (msg) {
        if (msg.login) {
          return true;
        } else {
          _this.outLogin();
        }
      }
    })
  },
  //字数限制截取
  limit: function (str, l) {
    //str为字符串对象
    // l为所需长度 如果不传 默认截取15个字符
    if (!l && str.length > 15) {
      var strs = str.substring(0, 15) + "..."
      return strs;
    } else if (str.length > l) {
      var strs = str.substring(0, l) + "..."
      return strs;
    } else {
      return str;
    }
  },
  /**
   *
   * @description 外页头部生成
   * @param {Boolean} e =[0|1] 是否添加用户登录状态
   * @param {Boolean} search  = [0|1] 是否生成search条
   */
  //头部生成
  header: function (e, search) {
    var temp = '',
        loginName = $.cookie('loginName'),
        role = $.cookie('userRole'),
        realName = $.cookie('realName'),
        url = '',
        url1 = '',
        href = '',
        _this = this;
    var nameT = realName || loginName;
    if (!e && loginName) {
      if (role == 1) {
        url = Path + "/console/task/index.html";
        url1 = Path + "/imgs/adv1.jpg";
        href = '发布任务';
      } else if (role == 2) {
        url = Path + "/console/media/index.html";
        url1 = Path + "/imgs/med1.jpg";
        href = '任务广场';
      }
      temp = '<div class="dropdown text-right " id="user">' +
          '<img id="dLabel" src="' + url1 + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" width="40" class="img-circle" style="margin-right: 25px;cursor: pointer;" onclick="base.dropdown(0)" onmouseover="base.dropdown(3)" >' +
          '<ul class="dropdown-menu" aria-labelledby="dLabel">' +
          '<li><a href="' + url + '">' + href + '</a></li>' +
          '<li><a href="javascript:void(0)" onclick="base.outLogin()">退出账号</a></li>' +
          '</ul>' +
          '</div>'
    } else {
      temp = '<div class="text-right"> ' +
          '<button class="btn btn-default" type="button" style="margin-right: 8px;" data-toggle="modal" data-target="#myLogin">登录</button>' +
          '<a href="' + Path + '/page/user/choseType.html" class="btn btn-primary" style="color: #FFFFFF;">新用户注册</a>' +
          '</div>';
    }
    /*src="'+__uri("/images/friendlogo/wdhlogo.png"*/
    var head = '<div class="container content-max" id="navs">' +
        '<div class="logo">' +
        '<a href="' + Path + '/index.html" style="margin-left: 0;">' +
        '<img src="' + __uri("/imgs/logo-new.png") + '" style="margin-bottom: 3px;"><br>' +
        '<span style="color:#1b3cc0;">自媒体流量交易平台</span>' +
        '</a>' +
        '</div>' +
        '<div class="" id="nav">' +
        '<ul class="list list-inline ">' +
        '<li><a href="' + Path + '/index.html" style="min-width: 70px;">首页</a></li>' +
        '<li class="dropdown">' +
        '<a class="dropdown-toggle" href="javascript:void (0)"  onclick="base.dropdown(1)" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">投放业务' +
        '<span class="caret"></span>' +
        '</a>' +
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1" >' +
        '<li><a href="' + Path + '/page/weixin/index.html" >微信软文</a></li>' +
        '<li><a href="' + Path + '/page/tips/index.html">云贴宝</a></li>' +
        '<li><a href="' + Path + '/page/ydBuy/ydBuy.html">云堆购</a></li>' +
        '<li><a href="' + Path + '/page/video/index.html">直播红人</a></li>' +
        '<li><a href="' + Path + '/page/task/mediaMacth.html">选号投放</a></li>' +
        '<li><a href="' + Path + '/page/addFans/addFans.html">公众号加粉</a></li>' +
        '<li><a href="' + Path + '/page/foster/index.html">青培计划</a></li>' +
        '</ul>' +
        '</li>' +
        '<li class="dropdown">' +
        '<a class="dropdown-toggle" href="javascript:void (0)"  onclick="base.dropdown(2)" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
        '数据服务' +
        '<span class="caret"></span>' +
        '</a>' +
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu2" >' +
        '<li><a href="' + Path + '/page/list/media_list.html">媒体导航</a></li>' +
        '<li><a href="' + Path + '/page/list/industry.html">云堆榜单</a></li>' +
        '</ul>' +
        '</li>' +
        //'<li><a href="' + Path + '/page/cases/index_case.html" >最新任务</a></li>' +
        //'<li><a href="' + Path + '/page/cases/index_case.html" >投放案例</a></li>' +
        '<li style="padding-right: 0;margin-right: 0">' +
        '<a href="' + Path + '/page/enter/adventer.html" class="advOn">广告主入驻</a>|' +
        '<a href="' + Path + '/page/enter/medenter.html" class="medOn">媒体主入驻</a>' +
        '</li> ' +
        '</ul>' +
        '</div>' +
        temp +
        '</div>';
    var Login = '<div class="modal fade" id="myLogin" tabindex="-1" role="dialog" aria-labelledby="myLoginLabel">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title text-center" id="myLoginLabel">欢迎回到云堆</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<ul class="nav nav-tabs" role="tablist">' +
        '<li role="presentation" class="active" onclick=" base.binding(1)"><a href="#userlogin" aria-controls="userlogin" role="tab" data-toggle="tab" >账号登录</a></li>' +
        '<li role="presentation" id="wxnav"><a href="#wxlogin" aria-controls="wxlogin" role="tab" data-toggle="tab">微信登录</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +
        '<div role="tabpanel" class="tab-pane active" id="userlogin">' +
        '<form id="Login">' +
        '<ul class="list list-unstyled">' +
        '<li class="form-inline">' +
        '<span class="title">' +
        '<b class="icon icon-phone"></b>' +
        '用户名' +
        '</span>' +
        '<input class="form-control" type="text" name="username" id="USN">' +
        '</li>' +
        '<li class="form-inline">' +
        '<input class="form-control" type="hidden" name="pwd" id="PWD2">' +
        '<span class="title">' +
        '<b class="icon icon-pwd"></b>' +
        '密码' +
        '</span>' +
        '<input class="form-control" type="password" name="password" id="PWD1">' +
        '</li>' +
        '<li class="text-right" style="margin-bottom: 32px;margin-top: 16px;">' +
        '<a href="' + Path + '/page/user/findpass.html" style="color: #666666;">忘记密码？</a>' +
        '</li>' +
        '<li>' +
        '<button type="button" class="btn btn-primary btn-block" onclick="base.Logins()" id="loginbtn">登录</button>' +
        '</li>' +
        '<li class="text-center" style="margin-bottom: 32px;margin-top: 16px;">' +
        '还没有账号?<a href="' + Path + '/page/user/choseType.html" style="color: #0099FF">请注册</a>' +
        '</li>' +
        '</ul>' +
        '</form>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane text-center" id="wxlogin">' +
        '<img src="" id="Login-code" style="width:210px;height: 210px;margin: 25px 0 16px;" >' +
        '<p class="text-center">在微信扫描二维码登录云堆</p>' +
        '<p class="text-center">还没有账号?<a href="' + Path + '/page/user/choseType.html" style="color: #0099FF">请注册</a></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    var affix = '<div style="clear: both"> ' +
        '</div>' +
        '<div id="affix">' +
        '<div><a id="qq_wap" href="javascript:void(0);"class="qq" target="_blank"></a></div>' +
        '<div><a  class="tel"><span class="tel-Num"></span></a></div>' +
        '<div><a href="#" class="top"></a></div>' +
        '</div>' +
        '<script>' +
        'BizQQWPA.addCustom({aty: "0", a: "0", nameAccount: 4000060568, selector: "qq_wap"});' +
        '</script>';
    // var qqcode ='<script charset="utf-8" type="text/javascript" src="http://wpa.b.qq.com/cgi/wpa.php"></script>'
    //var header ='<div id="header">'+head+'</div><div id="hhh" style="height: 178px"></div>'+affix;
    // $('head').prepend(qqcode);
    var header = '<div id="header">' + head + Login + '</div>' + affix;
    $('body').prepend(header);
    $('#myLogin').keydown(function (e) {
      if (e.keyCode == 13) {
        _this.Logins();
      }
    });
    //下拉菜单隐藏事件
    $('#dropdownMenu1').on('hidden.bs.dropdown', function () {
      $("#dropdownMenu1").removeClass('on');
    });
    $('#dropdownMenu2').on('hidden.bs.dropdown', function () {
      $("#dropdownMenu2").removeClass('on');// do something…
    });
    //切换登录模式事件绑定
    $("#wxnav").click(function () {
      if ($(this).hasClass('active')) {
        base.binding(1);
      } else {
        base.binding();
      }
    });
    $('#myLogin').on('hidden.bs.modal', function () {
      base.binding(1);
    })
  },
  binding: function (e, flag) {
    if (!e) {
      //待修改type
      base.post(Path + '/weixinAuth/getParamQrcode.do?type=5').done(function (msg) {
        //console.log(msg);
        $("#Login-code").attr('src', msg.data.url);
        ints = setInterval(function () {
          base.post(Path + '/weixinAuth/getQrcodeStatus.do?ticket=' + msg.data.ticket).done(function (res) {

            if (res.data.status == 1) {
              var wxDate = $.parseJSON(res.data.userInfo);
              base.post(Path + '/user/weixinLogin.do?weixinOpenId=' + wxDate.openid).done(function (data) {
                ints = window.clearInterval(ints);
                if (data.code == 1) {
                  var d=data.data;
                  //只绑定一个账号时
                  base.setCookie("loginName", d.loginName, 10);
                  base.setCookie("userRole", d.role, 10);
                  base.setCookie("userId", d.id, 10);
                  base.setCookie("userType", d.userType, 10);
                  //if(refer==''||refer== Path+'/page/user/register.html'){
                  var t = parseInt(d.role);
                  if (t == 1) {
                    if (flag) {
                      base.post(Path + '/cpdTask/addShoppingCar.do?mediaIds=' + shopingList.join(',')).done(function () {
                        window.location.href = 'taskset.html?mediaIds=' + shopingList.join(',');
                      });
                    } else {

                      window.location = Path + "/console/task/releasetask.html";
                    }
                  } else if (t == 2) {
                    if (flag) {
                      alert('媒体主账号无法发布任务，请使用广告主账号登录');
                    } else {
                      window.location = Path + "/console/media/tasklist1.html";
                    }
                  } else if (t == 5) {
                    window.location = Path + '/page/login/chose-type.html'
                  }
                  setTimeout(function () {
                    _this.init();
                    layer.closeAll();

                  }, 2000);
                } else if (data.code == 2) {
                  //绑定多个账号时
                  layer.closeAll();
                  $("#myLogin").modal('hide');
                  var d = data.data;
                  var userList = '';
                  for (var j = 0; j < d.length; j++) {
                    if(flag){
                      var wxLogin="base.wxLogin(" + d[j].id + ",'" + wxDate.openid +"',"+flag+ ")";
                    }else{
                      var wxLogin="base.wxLogin(" + d[j].id + ",'" + wxDate.openid +"')";
                    }

                    var img = Path+'/imgs/norole.png';
                    var btn = '<a class="btn btn-default" href="javascript:void(0)">未选择</a>';
                    if (d[j].role == 1) {
                      img = Path + '/imgs/adv1.jpg';
                      btn = '<a class="btn btn-adv" href="javascript:void(0)">广告主</a>';
                    } else if (d[j].role == 2) {
                      img = Path + '/imgs/med1.jpg';
                      btn = '<a class="btn btn-med"  href="javascript:void(0)">媒体主</a>';
                    }

                    userList += '<tr onclick="'+wxLogin+ '" style="cursor: pointer;">' +
                        '<td style="vertical-align: middle;border: none;text-align: center"><img src="' + img + '" class="img-circle" width="50"></td>' +
                        '<td style="vertical-align: middle;border: none;text-align: center">' + d[j].realName + '</td>' +
                        '<td style="vertical-align: middle;border: none;text-align: center">' + d[j].loginName + '</td>' +
                        '<td style="vertical-align: middle;border: none;text-align: center">' +btn+'</td>' +
                        '</tr>';

                  }
                  var user='<p class="text-left">温馨提示：您微信绑定了多个账号，请选择登录账号。</p>' +
                      '<table class="table table-hover" style="width: 546px;border: 1px solid #eeeeee;margin: 10px auto;">' +
                      '<tr style="height: 50px;border: 1px solid #eeeeee;background: #eeeeee">' +
                      '<th style="border: none;font-weight: 500;font-size: 14px;vertical-align: middle;" class="text-center">头像</th>' +
                      '<th style="border: none;font-weight: 500;font-size: 14px;vertical-align: middle;" class="text-center">登录名</th>' +
                      '<th style="border: none;font-weight: 500;font-size: 14px;vertical-align: middle;" class="text-center">登录账号</th>' +
                      '<th style="border: none;font-weight: 500;font-size: 14px;vertical-align: middle;" class="text-center">角色</th>' +
                      '</tr>'+userList+'</table>';
                  //初始化弹层
                  layer.msg('&nbsp;');
                  layer.open({
                    content: user,
                    title: ['选择登录账号', 'text-align:left;'],
                    area: '600px',
                    btn: 0
                  });
                }

              });
            }
          });
        }, 500);
      });
    } else {
      ints = window.clearInterval(ints);
    }
  },
  wxLogin: function (id,openId,flag) {
    base.post(Path + '/user/weixinLogin.do?weixinOpenId=' + openId + "&id=" + id).done(function (data) {
      if (data.success) {
        base.setCookie("loginName", data.data.loginName, 10);
        base.setCookie("userRole", data.data.role, 10);
        base.setCookie("userId", data.data.id, 10);
        base.setCookie("userType", data.data.userType, 10);
        //if(refer==''||refer== Path+'/page/user/register.html'){
        var t = parseInt(data.data.role);
        if (t == 1) {
          if (flag) {
            base.post(Path + '/cpdTask/addShoppingCar.do?mediaIds=' + shopingList.join(',')).done(function () {
              window.location.href = 'taskset.html?mediaIds=' + shopingList.join(',');
            });
          } else {

            window.location = Path + "/console/task/releasetask.html";
          }
        } else if (t == 2) {
          if (flag) {
            alert('媒体主账号无法发布任务，请使用广告主账号登录');
          } else {
            window.location = Path + "/console/media/tasklist1.html";
          }
        } else if (t == 5) {
          window.location = Path + '/page/login/chose-type.html'
        }
        setTimeout(function () {
          _this.init();
          layer.closeAll();

        }, 2000);
      } else {
        layer.closeAll();
        alert(data.info)
      }
    });
  },
  dropdown: function (e) {
    if (e == 1) {
      if ($("#dropdownMenu1").hasClass('on')) {
        $("#dropdownMenu1").removeClass('on');
      } else {
        $("#dropdownMenu1").addClass('on');
        $("#dropdownMenu2").removeClass('on');
      }

    } else if (e == 2) {
      if ($("#dropdownMenu2").hasClass('on')) {
        $("#dropdownMenu2").removeClass('on');
      } else {
        $("#dropdownMenu2").addClass('on');
        $("#dropdownMenu1").removeClass('on');
      }
    } else if (e == 3) {
      $('#dLabel').dropdown('toggle');
      $("#dropdownMenu1").removeClass('on');
      $("#dropdownMenu2").removeClass('on');
    } else {
      $("#dropdownMenu1").removeClass('on');
      $("#dropdownMenu2").removeClass('on');
    }
  },
  Logins: function (e) {
    var _this = this;
    //layer.msg('');
    if (_this.isNull($("#USN").val()) || (!_this.isPhone($("#USN").val()) && !_this.isEmail($("#USN").val()))) {
      layer.msg('用户名不能为空且必须为电话号或邮箱');
      return false;
    }
    if (_this.isNull($('#PWD1').val())) {
      layer.msg('密码不能为空且必须为电话号或邮箱');
      return false;
    }
    $('#PWD2').val($.md5($('#PWD1').val()));
    var userData = $("#Login").serializeArray();
    _this.post(Path + "/user/login.do", userData).done(function (data) {

      if (data.success) {
        base.setCookie("loginName", data.data.loginName, 10);
        base.setCookie("userRole", data.data.role, 10);
        base.setCookie("userId", data.data.id, 10);
        base.setCookie("userType", data.data.userType, 10);
        //if(refer==''||refer== Path+'/page/user/register.html'){
        var t = parseInt(data.data.role);
        if (e) {
          if (t == 1) {
            base.post(Path + '/cpdTask/addShoppingCar.do?mediaIds=' + shopingList.join(',')).done(function () {
              // console.log(e);
              window.location.href = 'taskset.html?type='+type+'&mediaIds=' + shopingList.join(',');
            });
          } else if (t == 2) {
            alert('媒体主账号无法发布任务，请使用广告主账号登录');
          } else if (t == 5) {
            window.location = Path + '/page/login/chose-type.html';
          }
        } else {
          if (t == 1) {
            window.location = Path + "/console/task/releasetask.html";
          } else if (t == 2) {
            window.location = Path + "/console/media/tasklist1.html";
          } else if (t == 5) {
            window.location = Path + '/page/login/chose-type.html'
          }
        }
      } else {
        layer.msg(data.info);
      }


    });
  },
  //底部生成
  /**
   *
   * @description 底部生成
   * @param {Boolean} e=[0|1]判断是否生成在线咨询等0代表生成1代表不生成
   */
  footer: function (e) {
    var footer = '<div id="footer" class="bigcontent">' +
        '<ul id="bottomnav" class="container content list list-unstyled " >' +
        '<li >' +
        '<h3>关于云堆</h3>' +
        '<p><a href="' + Path + '/page/cases/aboutus.html?bpmContentCode=wzyd">玩转云堆</a></p>' +
        '<p><a href="' + Path + '/page/cases/aboutus.html">公司简介</a></p>' +
        '<p><a href="' + Path + '/page/information/informations.html">资讯动态</a></p>' +
        '</li>' +
        '<li>' +
        '<h3>我是广告主</h3>' +
        '<p><a href="' + Path + '/page/enter/adventer.html"">广告主入驻</a></p>' +
        '<p><a href="' + Path + '/page/sprog/helpcenter.html?bpmContentCode=ggzwd">广告主操作流程</a></p>' +
        '<p><a href="' + Path + '/page/sprog/helpcenter.html?bpmContentCode=ggzxy">广告主协议</a></p>' +
        '</li>' +
        '<li >' +
        '<h3>我是媒体主</h3>' +
        '<p><a href="' + Path + '/page/enter/medenter.html">媒体主入驻</a></p>' +
        '<p><a href="' + Path + '/page/sprog/helpcenter.html?bpmContentCode=mtzwd">媒体主操作流程</a></p>' +
        '<p><a href="' + Path + '/page/sprog/helpcenter.html?bpmContentCode=mtzxy">媒体主协议</a></p>' +
        '</li>' +
        '<li style="margin-right: 130px">' +
        '<h3>投放业务</h3>' +
        '<p><a href="' + Path + '/page/weixin/index.html">微信软文推广</a></p>' +
        '<p><a href="' + Path + '/page/tips/index.html">微信贴片广告</a></p>' +
        '<p><a href="' + Path + '/page/ydBuy/ydBuy.html">云堆购</a></p>' +
        '<p><a href="' + Path + '/page/video/index.html">直播红人</a></p>' +
        '<p><a href="' + Path + '/page/addFans/addFans.html">公众号加粉</a></p>' +
        ' <p><a href="' + Path + '/page/foster/index.html">青培计划</a></p>'  +
        '</li>' +
        '<li style="margin-right:0;">' +
        '<h3>帮助中心</h3>' +
        '<p><a href="' + Path + '/page/sprog/helpcenter.html?bpmContentCode=mcjx">常见问题答疑</a></p>' +
        '<p><a href="' + Path + '/page/sprog/helpcenter.html?bpmContentCode=fwxy">服务协议</a></p>' +
        '</li>' +
        '</ul>' +
        '<div id="aboutus" class="container content">' +
        '<div class="code">' +
        '<p class="f14">云堆微信公众号</p>' +
        '<img src="' + __uri("/imgs/yd_code.jpg") + '" width="114"/>' +
        '</div>' +
        '<div class="adress">' +
        '<p class="f14">公司地址：</p>' +
        '<ul class="list list-unstyled">' +
        '<li><span>总部：</span>成都市高新区府城大道西段399号天府新谷9号楼2单元1106室</li>' +
        '<li><span>北京：</span>北京市朝阳区望京路10号望京SOHO塔1B座1809</li>' +
        '<li><span>上海：</span>上海市普陀区曹杨路619号6E</li>' +
        '<li><span>广州：</span>广州市海珠区广州大道南与叠景路交汇处合生广场D座2515房</li>' +
        '<li><span>郑州：</span>河南省郑州市金水区国基路花园路御府三号6号楼1单元2楼东</li>' +
        '</ul>' +
        '<p id="copyright" >Copyright ©2017  云堆：自媒体流量交易平台   版权所有   蜀ICP备15003350号</p>' +
        '</div>' +
        '<div class="tel">' +
        '<p class="f14">客服热线:</p>' +
        '<span>400-0060-568</span>' +
        '<p class="small">QQ 客服： 4000060568&nbsp; &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;工作日 :   09:30-18:00</p>' +
        '<p>' +
        '<a logo_size="124x47" logo_type="business" href="http://www.anquan.org " ><script src="http://static.anquan.org/static/outer/js/aq_auth.js"></script></a>' +
        '<a  key ="5971cf082548be79ea3a0bc9"  logo_size="83x30"  logo_type="common"  href="http://www.anquan.org" ><script src="//static.anquan.org/static/outer/js/aq_auth.js"></script></a>' +
        '<a  key ="5971cf082548be79ea3a0bc9"  logo_size="83x30"  logo_type="official"  href="http://www.anquan.org " ><script src="//static.anquan.org/static/outer/js/aq_auth.js"></script></a>' +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('html body').append(footer);
    $('.top').toTop();
    $("#affix .tel").mouseover(function () {
      $(this).find("span").css("display", "block")
    });
    $("#affix .tel").mouseout(function () {
      $(this).find("span").css("display", "none")
    });
    /*$("#affix .qq").click(function(){
     $(this).attr("href",qq.kefu);
     });*/

    //this.searchFixed();
  },
  /**
   *
   * @description 首页搜索
   */
  search: function () {
    //alert('系统升级中，请稍后重试！');return false;
    var obj = $('#search').find('input'),

        v = obj.val();
    v = encodeURIComponent(v);
    console.log(v);
    if (this.isNull(v)) {
      try {
        layer.alert('请输入微信公众号')
      }
      catch (e) {
        alert('请输入微信公众号');
      }
      obj.focus();
      return false;
    }
    if (window.location.href.indexOf('industry-result.html') == -1) {
      window.open(Path + '/page/list/industry-result.html?wxname=' + v);
    } else {
      window.location.href = window.location.href.split('?')[0] + '?wxname=' + v;
    }
  },
  /**
   *
   * @description 判断是否为ie6
   * @returns {boolean}
   */
  isIE6: function () {
    return !!window.ActiveXObject && !window.XMLHttpRequest;
  },
  /**
   *
   * @description 搜索条跟随窗口
   */
  searchFixed: function () {
    var $obj = $('#search'), _this = this;
    if ($obj.length > 0 && !_this.isIE6()) {
      var t = $(window).scrollTop();
      //if(t>135){
      //$obj.css({
      //position:'fixed',
      //top:0
      //})
      // }
      $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top > 74) {
          $obj.css({
            position: 'fixed',
            top: 0
          })
        } else {
          $obj.css({
            position: 'absolute',
            top: '74px'
          })
        }
      })

    }
  },
  /**
   *
   * @description 添加搜索键盘事件
   */
  addKeyDown: function () {
    var _this = this;
    $('#search').find('input').keydown(function (e) {
      var code = e.keyCode;
      if (code == 13)_this.search();
    });
    $('#search2').click(function () {
      _this.search()
    })
  },
  /**
   *
   * @description 封装jquery ajax请求
   * @param {String} url
   * @param {String|Object} data
   * @param {String} type = [get|post]
   * @param {Boolean} async 是否异步
   */
  ajax: function (url, data, type, async) {
    var a = async || true, d = data || {};
    var deferred = $.Deferred();
    $.ajax({
      url: url,
      type: type,
      timeout: 120000,
      cache: false,
      data: d,
      async: a,
      success: function (msg) {
        deferred.resolve(msg)
      },
      error: function (error) {
        deferred.reject(error);
      }
    });
    return deferred.promise()
  },

  myajax: function (url, data, type, async) {
    var a = async, d = data || {};
    var deferred = $.Deferred();
    $.ajax({
      url: url,
      type: type,
      timeout: 120000,
      cache: false,
      data: d,
      async: a,
      success: function (msg) {
        deferred.resolve(msg)
      },
      error: function (error) {
        deferred.reject(error);
      }
    });
    return deferred.promise()
  },
  /**
   *
   * @description 封装jquery get请求
   * @param {String} url 请求地址
   * @param {String|Object} data
   * @param {Boolean} async 是否异步
   */
  get: function (url, data, async) {
    var deferred = $.Deferred();
    this.ajax(url, data, 'get', async).done(function (e) {
      deferred.resolve(e)
    }).fail(function (e) {
      deferred.reject(e);
    });
    return deferred.promise()
  },

  myget: function (url, data, async) {
    var deferred = $.Deferred();
    this.myajax(url, data, 'get', async).done(function (e) {
      deferred.resolve(e)
    }).fail(function (e) {
      deferred.reject(e);
    });
    return deferred.promise()
  },

  /**
   *
   * @description 封装jquery post请求
   * @param {String} url 请求地址
   * @param {String|Object} data
   * @param {Boolean} async 是否异步
   * @returns {done: done,fail:fail}
   */
  post: function (url, data, async) {
    var deferred = $.Deferred();
    this.ajax(url, data, 'post', async).done(function (e) {
      deferred.resolve(e);
    }).fail(function (e) {
      deferred.reject(e);
    });
    return deferred.promise()
  },

  /**
   *
   * @description 字符串截取
   * @param {String} str 传入内容
   * @param {Number} num需要截取多少字节
   * @returns {String}
   */
  lyc: function (str, num) {
    if (str.length >= num) {
      return str.substring(0, num - 1) + '...';
    } else return str;
  },
  /**
   *
   * @description laypage插件封装
   * @param {Object} o = {dom:dom,pages,:1,curr:1} dom分页标签生成位置pages一共多少页curr当前第几页
   * @returns {{done: done}}
   */
  layPage: function (o) {
    var _this = this;
    var opt = $.extend({
      dom: 'page',
      pages: 1,
      curr: 1
    }, o), fn = function () {
    };
    $('#' + opt.dom).html('');
    if (opt.pages > 1) {
      try {
        laypage({
          cont: opt.dom, //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
          pages: opt.pages, //通过后台拿到的总页数
          curr: opt.curr, //初始化当前页
          skin: 'yundui laypageskin_default',
          groups: 3,
          prev: '<', //若不显示，设置false即可
          next: '>', //若不显示，设置false即可
          jump: function (e, first) { //触发分页后的回调
            if (!first) {
              fn(e.curr)
            }
          }
        });
      }
      catch (e) {
        _this.log('layPage依赖laypage组件！', 'error');
      }
    }
    return {
      done: function (f) {
        fn = f || fn
      }
    }
  },
  /**
   *
   * @获取queryString字符串转换为JSON对象
   * @param {String} search 可选参数 无是自动获取浏览器后面的queryString
   * @returns {Object||false}
   */
  searchToJson: function (search) {
    var u = search || window.location.search.slice(1);
    var temp = {};
    if (u) {
      $.each(u.split('&'), function () {
        var at = this.indexOf('=');
        var k = this.substring(0, at);
        var v = decodeURIComponent(decodeURI(this.substring(at + 1)));
        temp[k] = v;
      });
      return temp;
    } else {
      return false;
    }
  },
  /**
   *
   * @description 将JSON对象转换为queryString
   * @param {Object} Json
   * @returns {string}
   */
  jsonToSearch: function (Json) {
    var temp = '';
    for (var i in Json) {
      temp += (i + '=' + decodeURI(Json[i]) + '&')
    }
    return temp.slice(0, -1)
  },
  /**
   *
   * @description 创建图表并只显示第一个图表数据
   * @param o
   * @param type
   * @returns {*}
   */
  onlyFristChart: function (o, type) {
    return this.chartOpt(o, type, 1);
  },
  /**
   *
   * @description 创建图表
   * @param o
   * @param type
   * @param only
   * @returns {{title: {text: string, subtext: string}, tooltip: {trigger: string}, legend: {show: boolean, data: Array, selected: string}, toolbox: {show: boolean, feature: {mark: {show: boolean}, dataView: {show: boolean, readOnly: boolean}, restore: {show: boolean}, saveAsImage: {show: boolean}}}, grid: {x: string, y: string, x2: string, y2: string}, calculable: boolean, xAxis: *[], yAxis: *[], series: Array}}
   */
  chartOpt: function (o, type, only) {
    var len = o.series.length, n = [], t = '', status = true;
    for (var i = 0; i < len; i++) {
      n.push(o.series[i]['name']);
      if (only && i == 0) {
        status = true;
      } else {
        status = false;
      }
      t += ',"' + o.series[i]['name'] + '":' + status;
      if (!o.series[i].type)o.series[i].type = type ? type : 'line';
    }
    t = this.eval("{" + t.slice(1) + "}");
    var opt = $.extend(true, {
      xAxis: [],
      series: []
    }, o);
    var a = {
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: true,
        data: n,
        selected: t
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      grid: {
        x: '100px',
        y: '30px',
        x2: '5%',
        y2: '50px'
      },
      calculable: false,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: opt.xAxis
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: opt.series
    };
    return a;
  },
  /**
   * @description 页面初始化
   * @param {Object} o={nologin:Boolean,nosearch:Boolean,nosevice:Boolean}
   */
  init: function (o) {

    var opt = {
      nologin: false,
      nosearch: false,
      nosevice: false
    };
    //if (this.mobilecheck()){
    //    window.location.href=Path+'/m/';
    //}
    $.extend(opt, o);
    this.header(opt.nologin, opt.nosearch);
    this.footer(opt.nosevice);
    if ($('#search2').length > 0)this.addKeyDown();
    //layer.closeAll();

  },
  /**
   *
   * @description 将JSON字符串转换为JSON对象
   * @param str
   * @returns {*}
   */
  eval: function (str) {
    if (typeof str === "string") {
      if (JSON && JSON.parse) {
        return JSON.parse(str);
      }
      return (new Function("return " + str))();
    } else {
      return str;
    }
  },
  /**
   *
   * @description 添加媒体是提示信息公共方法
   * @param {String} url
   */
  addMedia: function (url) {
    layer.msg('不要走开哦，智能系统正在为您添加媒体中！', {icon: 16, time: 360000});
    var data = {action: 'getaccountbyurl', docurl: url};
    base.get(Path + '/dmp/rankInfo.do', data).done(function (msg) {
      var d = base.eval(msg);
      if (d.openid) {
        window.location.href = 'result_details.html?openid=' + d.openid;
      } else {
        layer.closeAll();
        layer.msg(d.json_status.result_message, {icon: 5});
      }
    }).fail(function () {
      layer.closeAll();
    })
  },
  /**
   *
   * @description 添加媒体信息是的输入弹出框公共方法
   */
  prompt: function () {
    var _this = this;
    var v = '输入媒体关键字查询，如云堆新媒...';
    layer.prompt({
      title: '请输入公众号的其中一篇文章的URL地址',
      formType: 2, //prompt风格，支持0-2,
      //area:['600px']
      //value:v,
      placeholder: v
    }, function (value, index, elem) {
      if (value == v) {
        _this.log(elem);
        $(elem).val('').focus();
        return false;
      }
      if (/[a-zA-z]+:\/\/[^\s]+/.test(value)) {
        _this.addMedia(value);
      } else {
        alert('请输入正确的url');
        $(elem).focus();
      }

    });
  },
  addMeidaName: function () {
    var _this = this;
    var v = '例：云堆新媒';

    layer.prompt({
      title: '请输入公众号名称',
      formType: 0,
      placeholder: v
    }, function (value, index, elem) {
      if (value == v) {
        _this.log(elem);
        $(elem).val('').focus();
        return false;
      }
      var layerMedia = $('body').data();
      if (layerMedia == 1)return false;
      $('body').data('layerMedia', 1);

      _this.post(Path + '/index/submitNotIncludeMedia.do', {mediaId: value}).done(function (msg) {
        _this.log(msg);
        $('body').data('layerMedia', 0);
        if (msg.success) {
          layer.closeAll();
          layer.alert('系统已经成功记录您的提交信息，云堆将在12小时内收录您的媒体！')
        }

      }).fail(function (err) {
        _this.log(err);
        $('body').data('layerMedia', 0);
      })
    })
  },
  isNum: function (num) {
    var rex = /^[0-9]+$/;
    if (rex.test($.trim(num)))return true;
    return false;
  },
  isMoney: function (n) {
    var rex = /^[0-9]+$/;
    var num = n.trim();
    var _this = this;
    var numArr = num.toString().split('.');
    var len = numArr.length;
    var temp = 0;
    if (len > 2)return false;
    if (len == 2) {
      var l = numArr[1].length;
      var l1 = numArr[0].length;
      if (l > 2) {
        return false;
      }
      if (numArr[0].trim().length != l1)return false;
    }
    $.each(numArr, function (i) {
      if (numArr[i] < 0 || !_this.isNum(numArr[i])) {
        temp = 1
      }
    });
    if (temp)return false;
    return true;
  },


};
/*
 $("#bannertopdiv").slideDown();
 var Up = function() {
 $("#bannertopdiv").slideUp(1500);
 setTimeout(function(){$("#bannertopdiv").attr("class","bannerTopDivMin");$("#bannerTop").attr("class","bannerTopMin");$("#bannertopdiv").slideToggle(1000)}, 1500);

 }
 setTimeout(Up, 2500);*/

/**
 *
 * @description 发送验证码
 * @param {Object} opt ={count:number,data:functions,url:String,beforAjax:functions,success:functions}count间隔时间；Click时data返回数据
 *
 */
$.fn.sendCode = function (opt) {
  var o = $.extend({
    count: 30,
    data: function () {
      return {};
    },
    url: '',
    beforeAjax: function () {
    },
    success: function () {
    }
  }, opt);
  var $this = $(this)
      , InterValObj //timer变量，控制时间
      , _count = o.count //间隔函数，1秒执行
      , curCount //当前剩余秒数
      , val;
  var isInput = $this.is('input');
  if ($this.length < 1) {
    alert('对象不存在！');
    return false;
  }

  if (isInput)val = 'val';
  else  val = 'html';
  function sendMessage(data) {
    var status = $this.data('status');
    if (status == 1)return false;
    $this.data('status', 1);
    curCount = _count;
    $this.attr("disabled", "true");
    $this[val](+curCount + "秒再获取");
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次

//向后台发送处理数据
    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: o.url, //目标地址
      data: data,
      success: function (msg) {
        o.success(msg)
      },
      error: function () {
        alert('网络错误请重试！');
        $this.data('status', 0);
        curCount = 0;
        SetRemainTime()
      }
    });
  }

  $this.click(function () {
    o.beforeAjax();
    var data = o.data();
    sendMessage(data);
  });
//timer处理函数
  function SetRemainTime() {
    if (curCount == 0) {
      $this.data('status', 0);
      clearInterval(InterValObj);//停止计时器
      $this.removeAttr("disabled");//启用按钮
      $this[val]("重新发送验证码");
    }
    else {
      curCount--;
      $this[val](+curCount + "秒再获取");
    }
  }

  return $this;
};


/**
 * Created by dong on 2017/4/18.
 */
