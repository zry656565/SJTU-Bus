<?php
// Include and instantiate the class.
require_once 'include/Mobile_Detect.php';
$detect = new Mobile_Detect;
$version = "web";

if( $detect->isMobile() && !$detect->isTablet() ){
    $version = "wap";
}
?>

<!DOCTYPE html>
<html>  
    <head>  
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  
        <title>上海交通大学校园巴士时刻表 by JerryZou</title>
        <link href="css/main.<?=$version?>.css?v=1.0.1" rel="stylesheet"/>
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=kSmEaa2spbYKGxtao1FdpVGq"></script>
        <?php if ($version === "web") { ?>
        <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
        <?php } else { ?>
        <script type="text/javascript" src="js/zepto.min.js"></script>
        <?php } ?>
        <script type="text/javascript" src="js/utility.js?v=1.0.1"></script>
        <script type="text/javascript" src="js/main.<?=$version?>.js?v=1.0.1"></script>
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
        <!-- baidu end -->
    </head>
 
    <body>
        <div id="container"></div>

        <?php if ($version === "web") { ?>
        <!-- fork me on github -->
        <a id="forkme" href="https://github.com/zry656565/SJTU-Bus"><img style="position: absolute; top: 0; right: 0; border: 0;" src="images/fork.png" alt="Fork me on GitHub"></a>
        <?php } ?>

        <!-- feedback -->
        <a href="http://jerryzou.com/posts/sjtuBusFeedback/"><div id='feedback'>意见反馈</div></a>
    </body>  
</html>