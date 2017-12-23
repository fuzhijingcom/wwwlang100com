
if(window.history.state){
    $('.ads-list').html(window.history.state.list);
}

<!-- 详情隐藏显示 -->

function hideDetail(){
    // $('html').removeClass('no-scroll');
    // $('body').removeClass('no-scroll');
    $('#detail-top-menu').removeClass('show');
}
$('body').click(function(e){
    if($('#detail-top-menu').hasClass('show')){
        hideDetail();
    }else{
        if(e.target.id == "mui-action-menu"){

            $('#detail-top-menu').addClass('show');
        }
    }
});


function ReplaceAll(str, sptr, sptr1){
    while (str.indexOf(sptr) >= 0){
        str = str.replace(sptr, sptr1);
    }
    return str;
}

//图文详情
var isLoad = false;
var goodsId = $('.pic-detail-btn').data('goodsid');
$('.pic-detail-btn span.pic-detail-btn-span').click(function(){
    if($('.pic-detail-show').css('display') == 'none'){
        $('.pic-detail-show').css('display','block');
    }else{
        $('.pic-detail-show').css('display','none');
    }

    if(!isLoad){
      $('span.loadding-lab').fadeIn(300);
        setTimeout(function(){
            $.ajax({
                type: "get",
                async: false,
                url: 'http://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?&data={"item_num_id":"'+goodsId+'"}&type=jsonp',
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback:"showTuwen",
                success: function(jsonp){

                    $('span.loadding-lab').fadeOut(300);
                    if(jsonp.data.images.length>0){
                        for(var i = 0 ; i < jsonp.data.images.length ; i++){
                            $('.pic-detail-show').append('<p><img src="'+jsonp.data.images[i]+'"/></p>');
                        }
                    }

                    isLoad = true;
                },
                error: function(){
                }
            });
        },300);
    }

});

$(function () {

//微信点击站外链接弹出提示
    $('.weixin-tip').click(function(){
        $('.weixin-tip').css('display','none');
        $('.tkl').css('display','block');
        $('.buy-wrapper').css('display','block');
    });
    $(".img .ui-link").click(function (event) {
        var _url = $(this).attr('href') ? $(this).attr('href') : $(this).data('href');
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {

            $('.weixin-tip').css('display','block');
            $('.tkl').css('display','none');
            $('.buy-wrapper').css('display','none');

            if($(this).data("href")){
                var _url = $(this).data("href");
            }else{
                var _url = $(this).attr("href");
            }
            event.preventDefault();
            if (/iphone|ipad|ipod/.test(ua)) {
                $('.wechat-brow').addClass('iosChat');
            } else if (/android|adr|linux/.test(ua)) {
                $('.wechat-brow').addClass('androidChat');
            }

        } else {
            // window.location.href = _url;
            // return false;
        }

    });
});