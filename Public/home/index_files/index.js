var loginName = $.cookie('loginName'), role = $.cookie('userRole'), realName = $.cookie('realName');
realName = (realName) ? realName : loginName;
var II = '';
var index = {
 /* mediaimg: function (e, i) {
    base.get(Path + '/index/getOrderList.do', e, false).done(function (res) {
      var id = '#task' + i;
      var med = '#meds' + i;
      var orderList = res.data.orderList;
      if (!base.isNull(orderList)) {
        $(med).html(orderList.length);
        var media = '';
        for (var ii = 0; ii < orderList.length; ii++) {
          media = media + '<span class="f-title">' +
              '<span class="f-img pull-left">' +
              '<img src="http://open.weixin.qq.com/qr/code/?username=' + orderList[ii].bizMediaDetailList.mediaaccount + '">' +
              '</span>' +
              res.data.orderList[ii].bizMediaDetailList.medianame +
              '</span>';
        }
      }
      $(id).html(media);
    });
  },*/
  orderList: function () {
    base.get(Path + '/index/castV2.do').done(function (msg) {
      //console.log(msg);
      base.layerTpl('#task-tpl', '#task', msg.data);

    });
  },
  init: function () {
    var _this = this;
    //_this.banner();
    base.init();
    _this.orderList();
    //_this.news();
    //_this.info();
  },
  getLogin: function (e) {
    if (e == 1) {
      var d1 = "#ladv form", d2 = "#uname1", d3 = "#upass1", d4 = "#pwd1";
    } else {
      var d1 = "#lmed form", d2 = "#uname2", d3 = "#upass2", d4 = "#pwd2";
    }
    if ($("#rember1").is(':checked')) {
      login.loginAjax(d1, d2, d3, d4);
    } else {
      login.loginNoCookies(d1, d2, d3, d4);
    }
  },
  video: function () {
    $("#video").modal('show');
  $("#video video").get(0).play(); //播放

  }
};

/**页面交互效果的实现**********************************/

$(function () {
  index.init();
  $('#video').on('hidden.bs.modal', function (e) {
    $("#video video").get(0).pause(); //暂停
  })
});
function jump(ids) {
  window.open('page/task/taskDetail.html?taskNo=' + ids);
}

//贴片显示的封装
function tpimg(contant, adurl) {
  var t_ARR = [], t_C = '', t_IMG = '', t_X = '', t_Y = '', t_S = '', t_H = '';
//  console.log(contant);
  t_ARR = contant.split(",");
  t_IMG = t_ARR[1];
  if (t_IMG.replace("bgimg=", "")) {
    t_IMG = t_IMG.replace("bgimg=", "");
    if (t_ARR.length > 2) {
      t_X = t_ARR[2];
      t_X = parseInt(t_X.replace("x=", ""));
      t_Y = t_ARR[3];
      t_Y = parseInt(t_Y.replace("y=", ""));
      //拼接json字符串，原图片地址，二维码链接，二维码坐标
      if (t_ARR.length > 4) {
        t_H = t_ARR[4];
        t_H = t_H.replace("h=", "");
      } else {
        t_H = 90;

      }
      // t_H = parseInt((228 / 640) * t_H);
      //t_X=parseInt((228/640)*t_X);
      //t_Y=parseInt((129/284)*t_Y);
      t_S = Path + '/mater/imageMerge.do?topW=' + t_H + '&topH=' + t_H + '&bottomW=640&bottomH=284&x=' + t_X + '&y=' + t_Y + '&topImage=&bottomImage=' + t_IMG + '&url=' + adurl;
      // console.log(t_S);

    } else {
      t_S = Path + t_IMG;
    }
  } else {
    t_S = "../imgs/tp.jpg";
  }
  return t_S;
}