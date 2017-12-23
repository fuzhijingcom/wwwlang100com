/*!
 * KeLe大淘客CMS
 * 获取方法，QQ群：599675377
 * 版本 v1.x.x
 */
var taoKeyNum = "";
$(function() {

    $.get("html/detailWrapper.html", function(result) {
        $(result).appendTo($(".detail-wrapper"));
    });
    $.get("html/detailBody.html", function(result) {
        $(result).appendTo(document.body);
    });


})