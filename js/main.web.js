(function($) {
    $(function () {
        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(121.443235,31.031303), 17); //将中心位置设置到上海交大
        
        //debug: 鼠标点击取经纬度
        /*map.addEventListener("click",function(e){
            console.log(e.point.lng + "," + e.point.lat);
        });*/
        
        $.getJSON( "data.json", function( data ) {
            var stopList = data.stopList;
            var stopTime = data.stopTime;
            var lineList = data.lineList;
            var date = new Date();
            var day = date.getDay();
            var hour = date.getHours();
            var minute = date.getMinutes();
            for (var i = 0; i < stopList.length; i++) {
                (function (i) {
                    var point = new BMap.Point(stopList[i][1], stopList[i][2]);
                    var marker = new BMap.Marker(point);
                    var label = new BMap.Label(stopList[i][0],{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label);
                    map.addOverlay(marker);
                    var stopName = stopList[i][0];
                    var sContent = SBus.initContent(stopTime, stopName);
                    if(stopTime[stopName].direct1) {
                        sContent += SBus.pushDirectToContent('direct1', stopTime, stopName);
                    } 
                    if(stopTime[stopName].direct2) {
                        sContent += SBus.pushDirectToContent('direct2', stopTime, stopName);
                    }
                    if(stopTime[stopName].festival_direct1) {
                        sContent += SBus.pushDirectToContent('festival_direct1', stopTime, stopName);
                    }
                    if(stopTime[stopName].festival_direct2) {
                        sContent += SBus.pushDirectToContent('festival_direct2', stopTime, stopName);
                    }
                    sContent += "<p class='footer'>本时刻表的最后更新时间为：2014年9月24日</p>"  + "</div>";
                    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象 
                    marker.addEventListener("click", function(){          
                        map.openInfoWindow(infoWindow,point); //开启信息窗口
                    });
                })(i);
            }
            //绘制路线
            var pointArr = [];
            for (var i = 0; i < lineList.length; i++) {
                pointArr.push(new BMap.Point(lineList[i][0], lineList[i][1]));
            }
            var polyline = new BMap.Polyline(pointArr, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.5});
            map.addOverlay(polyline);
        }).fail(function(){
            /*for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }*/
        });
    });
})(jQuery);

