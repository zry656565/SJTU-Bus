<?php
$debug = true;

// Include and instantiate the class.
require_once 'include/Mobile_Detect.php';
$detect = new Mobile_Detect;
$version = ($detect->isMobile() && !$detect->isTablet()) ? "wap" : "web";

$webScript = '';
$wapScript = '';
$string = file_get_contents("map.json"); // map.json is produced by FIS
$arr = json_decode($string, true);
foreach ($arr['pkg'] as $id => $obj) {
    if (substr($obj['uri'], 0, 7) === '/js/web') $webScript = $obj['uri'];
    if (substr($obj['uri'], 0, 7) === '/js/wap') $wapScript = $obj['uri'];
}
?>

<!DOCTYPE html>
<html>  
    <head>  
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="telephone=no" name="format-detection">
        <title>上海交大校园巴士时刻表</title>
        <link rel="shortcut icon apple-touch-icon" type="image/x-icon" href="images/bus_icon.png">
        <meta name="keywords" content="上海交大,校园巴士,校车,教工班车,时刻表,上海交通大学,JerryZou,邹润阳">
        <meta name="description" content="上海交通大学校园巴士时刻表 by Jerry Zou，你可以在这里查看详细的校园巴士到站时间。">
        <?php if ($version == 'wap')  {?> <link href="css/main.wap.css" rel="stylesheet"/> <?php } ?>
        <?php if ($version == 'web')  {?> <link href="css/main.web.css" rel="stylesheet"/> <?php } ?>
    </head>
 
    <body>

        <div id="container"></div>

        <?php if ($version === "web") { ?>
        <!-- fork me on github -->
        <a id="forkme" href="https://github.com/zry656565/SJTU-Bus"><img src="images/fork.png" alt="Fork me on GitHub"></a>
        <?php } ?>

        <div id="geo-btn" class="btn">查看最近车站</div>
        <a href="http://jerryzou.com/posts/sjtuBusFeedback/">
            <div id="feedback" class="btn">意见反馈</div>
        </a>

        <!-- script -->
        <script src="//api.map.baidu.com/api?v=2.0&ak=kSmEaa2spbYKGxtao1FdpVGq&services=true"></script>
        <script src="js/utility.js"></script>
        <?php if ($debug) {
            if ($version === "wap") { ?>
                <script src="js/zepto.min.js"></script>
                <script src="js/main.wap.js"></script> <?php }
            if ($version === "web") { ?>
                <script src="js/jquery-1.11.1.min.js"></script>
                <script src="js/main.web.js"></script> <?php }
        } else {
            if ($version === "wap") { ?> <script src="<?= $wapScript ?>"></script> <?php }
            if ($version === "web") { ?> <script src="<?= $webScript ?>"></script> <?php }
        } ?>
        <!-- baidu site center -->
        <script>
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?f4dc438d8e60d1de1b6d1a9f197ddfdc";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        </script>
    </body>
</html>