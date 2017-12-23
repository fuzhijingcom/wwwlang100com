<?php
    if(C('LAYOUT_ON')) {
        echo '{__NOLAYOUT__}';
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title><?php if(isset($message)) {?>操作成功<?php }else{ ?>操作失败<?php }?></title>
    <link rel="stylesheet" href="__PUBLIC__/css/weui.min.css"/>
    <script type="text/javascript" src="__PUBLIC__/js/jquery-1.10.2.min.js"></script>
</head>
<body>
    <div id="container" class="container"><div class="zh_CN"><div class="weui-msg">
    <div class="weui-msg__icon-area">
     <?php if(isset($message)) {?>
        <i class="weui-icon-success weui-icon_msg"></i>
    <?php }else{ ?>
        <i class="weui-icon-warn weui-icon_msg"></i>
    <?php }?>
    </div>
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">
		<?php if(isset($message)) {?><?php echo(strip_tags($message)); ?>
        <?php }else{?>
        <?php echo(strip_tags($error)); ?>
        <?php }?> 
		</h2>
        <p class="weui-msg__desc">
		等待时间：<b id="wait">1</b>
        </p>
    </div>
    <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
            <a  href="<?php echo($jumpUrl); ?>" class="weui-btn weui-btn_primary" id="href">返回</a>
        </p>
        
    </div>
</div></div></div>

<script src="__STATIC__/js/style.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    (function(){
        var wait = document.getElementById('wait'),href = document.getElementById('href').href;
        var interval = setInterval(function(){
            var time = --wait.innerHTML;
            if(time <= 0) {
                location.href = href;
                clearInterval(interval);
            };
        }, 1000);
    })();

</script>
</body>
</html>
</body>
</html>
