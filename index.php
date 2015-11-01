<?php
//Here is temporary solution for no web version for 2.0
require_once 'include/Mobile_Detect.php';
$detect = new Mobile_Detect;

if (!$detect->isMobile() || $detect->isTablet()) {
	require('web.php');
	die();
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>交大校车</title>
	<meta name="apple-mobile-web-app-capable" content="yes" >
	<meta name="format-detection" content="telephone=no" >
	<link rel="shortcut icon" type="image/x-icon" href="images/bus_icon.png">
	<link rel="apple-touch-icon" href="images/bus_icon.png">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="author" content="JerryZou">
	<meta name="keywords" content="上海交大,校园巴士,校车,教工班车,时刻表,上海交通大学,JerryZou,邹润阳">
	<meta name="description" content="上海交通大学校园巴士时刻表 by Jerry Zou，你可以在这里查看详细的校园巴士到站时间。">
	<link href="css/info.css" rel="stylesheet"/>
</head>
<body>

<div id="content">
	<h1>交大校车<span class="version">v2.1</span></h1>
	<div id="by">by Jerry Zou</div>
	<a class="internal-link big-button" href="/campus.php">校园巴士时刻表</a>
	<a class="internal-link big-button" href="/remote.php">教工班车时刻表</a>
	<a class="big-button" href="http://jerryzou.com/posts/sjtuBusFeedback/">意见反馈</a>
</div>
<div id="tips">温馨提示：如果您使用iOS设备的Safari浏览器访问本页面，可以添加本页到桌面以获得原生APP的体验。</div>

<script>
	//prevent opening a new window in Safari
	var links = document.getElementsByClassName("internal-link");
	[].forEach.call(links, function(link) {
		link.addEventListener('click', function(event) {
			location.href = this.getAttribute('href');
			event.preventDefault();
		});
	});

	//baidu site center
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