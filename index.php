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
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta content="yes" name="apple-mobile-web-app-capable">
        <meta content="telephone=no" name="format-detection">
        <title>上海交通大学校园巴士时刻表 by JerryZou</title>
        <link rel="apple-touch-icon" href="images/bus_icon.png">
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
        <script src="//api.map.baidu.com/api?v=1.3&ak=kSmEaa2spbYKGxtao1FdpVGq&services=true"></script>
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