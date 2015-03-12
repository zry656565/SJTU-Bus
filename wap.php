<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="telephone=no" name="format-detection">
	<title>交大校车</title>
	<link rel="shortcut icon" type="image/x-icon" href="images/bus_icon.png">
	<link rel="apple-touch-icon" href="images/bus_icon.png">
	<meta name="keywords" content="上海交大,校园巴士,校车,教工班车,时刻表,上海交通大学,JerryZou,邹润阳">
	<meta name="description" content="上海交通大学校园巴士时刻表 by Jerry Zou，你可以在这里查看详细的校园巴士到站时间。">
	<link href="css/main.wap.css" rel="stylesheet"/>
</head>

<body>

<div id="container"></div>
<div id="spinner"></div>

<div id="geo-btn" class="btn">查看最近车站</div>
<a href="http://jerryzou.com/posts/sjtuBusFeedback/">
	<div id="feedback" class="btn">意见反馈</div>
</a>

<!-- script -->
<script src="//api.map.baidu.com/api?v=2.0&ak=kSmEaa2spbYKGxtao1FdpVGq&services=true"></script>
<script src="js/utility.js"></script>
<script src="js/zepto.min.js"></script>
<script src="js/spin.js"></script>
<script src="js/main.wap.js"></script>
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