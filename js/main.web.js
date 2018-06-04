(function($) {
    $(function () {
        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(121.443235,31.031303), 17); //将中心位置设置到上海交大
        
        //debug: 鼠标点击取经纬度
        /*map.addEventListener("click",function(e){
            console.log(e.point.lng + "," + e.point.lat);
        });*/
        
        $.getJSON( "data.json?v=20140414", function( data ) {
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
                    sContent += "<p class='footer'>本时刻表的最后更新时间为：2016年4月14日</p>"  + "</div>";
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

        }).error(function(){});

        var realtimeBus = function () {
            var allOverlays = map.getOverlays();
            for(var j = 0; j<allOverlays.length; j++) {
                if (allOverlays[j].tag === "bus_realtime") {
                    map.removeOverlay(allOverlays[j]);
                }
            }

            // api repo: https://github.com/hebingchang/sjtubus-realtime-api
            $.getJSON( "https://sjtubus.boar.moe/", function( data ) {
                for (var i = 0; i < data.length; i++) {
                    (function (i) {
                        var myIcon = new BMap.Icon('map_icon_bus.png', new BMap.Size(48, 48));//这里先不用第三个参数IconOptions
                        var point = new BMap.Point(data[i].longitude, data[i].dimension);
                        var mk = new BMap.Marker(point, {icon:myIcon});//创建标注图标
                        mk.setRotation(data[i].direction);
                        mk.tag = "bus_realtime";

                        var sContent = "<h4 class=\"businfo-title\">校园巴士 #" + data[i].busno + "</h4>";
                        sContent += "<p class='businfo'>车牌号: <span style='font-weight: 400'>" + data[i].platenumber + "</span></p>";
                        sContent += "<p class='businfo'>车速: <span style='font-weight: 400'>" + data[i].speed + " km/h</span></p>";

                        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                        mk.addEventListener("click", function(){
                            map.openInfoWindow(infoWindow, point); //开启信息窗口
                        });

                        map.addOverlay(mk);//将标注添加到地图中
                    })(i);
                }

            }).fail(function(){})
        };

        setInterval(function() {
            realtimeBus();
        }, 5000);

    });
})(jQuery);

