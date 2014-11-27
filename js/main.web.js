(function($) {
    $(function () {
        //handle notice
        if ($.cookie('SJTUBus-Notice')) {
            $('.shadow').hide();
            $('.notice').hide();
        } else {
            $.cookie('SJTUBus-Notice', 'true', { expires: 365 });
        }

        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(121.443235,31.031303), 17); //将中心位置设置到上海交大
        
        //debug: 鼠标点击取经纬度
        /*map.addEventListener("click",function(e){
            console.log(e.point.lng + "," + e.point.lat);
        });*/
        
        $.getJSON( "data.json?v=1.0.1", function( data ) {
            var timeList = data.startTime,
                dongchuanTime = data.dongchuanTime,
                stopList = data.stopList,
                stopTime = data.stopTime;

            for (var i = 0; i < stopList.length; i++) {
                (function (i) {
                    var point = new BMap.Point(stopList[i][1], stopList[i][2]);
                    var marker = new BMap.Marker(point);
                    var label = new BMap.Label(stopList[i][0],{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label);
                    map.addOverlay(marker);
                    var stopName = stopList[i][0];
                    var sContent = SBus.initContent(stopName, i===0);
                    if (i===0) {
                        ['direct1', 'festival_direct1'].forEach(function(direct){
                            sContent += SBus.pushDirectToContent(direct, dongchuanTime, stopName);
                        });
                    } else {
                        SBus.nextStop(timeList, stopTime[stopName]);
                        ['direct1', 'direct2', 'festival_direct1',
                            'festival_direct2'].forEach(function(direct){
                            sContent += SBus.pushDirectToContent(direct, timeList, stopName);
                        });
                    }
                    sContent += "<p class='footer'>本时刻表的最后更新时间为：2014年11月27日</p>"  + "</div>";
                    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象 
                    marker.addEventListener("click", function(){          
                        map.openInfoWindow(infoWindow, point); //开启信息窗口
                    });
                })(i);
            }

            //绘制路线
            var lineList = data.lineList,
                pointArr = [];
            for (var i = 0; i < lineList.length; i++) {
                pointArr.push(new BMap.Point(lineList[i][0], lineList[i][1]));
            }
            var polyline = new BMap.Polyline(pointArr, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.5});
            map.addOverlay(polyline);
        }).fail(function(){});
    });
})(jQuery);

