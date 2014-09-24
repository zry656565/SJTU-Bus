(function($) {
    $(function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('#forkme').hide();
        }
    
        var map = new BMap.Map("container");
        map.centerAndZoom(new BMap.Point(121.443235,31.031303), 17); //将中心位置设置到上海交大
        
        //debug: 鼠标点击取经纬度
        map.addEventListener("click",function(e){
            console.log(e.point.lng + "," + e.point.lat);
        });
        
        $.getJSON( "data.json", function( data ) {
            var stopList = data.stopList;
            var stopTime = data.stopTime;
            var lineList = data.lineList;
    
            for (var i = 0; i < stopList.length; i++) {
                (function (i) {
                    var point = new BMap.Point(stopList[i][1], stopList[i][2]);
                    var marker = new BMap.Marker(point);
                    var label = new BMap.Label(stopList[i][0],{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label);
                    map.addOverlay(marker);
                    var sContent = "<div>"
                        + "<h4 class='title'>" + stopList[i][0] + "</h4>"
                        + "<p class='attention'>1.蓝色标注班次终点站为东川路地铁站 2.周六日及国定节假日停运</p>"
                        + (stopTime[stopList[i][0]].metro_station ? "<p class='attention'>3.红色标注班次终点站［可能］为菁菁堂（根据本站作者的猜测＝。＝）</p>" : '')
                        + (stopTime[stopList[i][0]].direct1 ? "<h5 class='direct'>逆时针</h5>"
                        + "<p class='timetable'>" + stopTime[stopList[i][0]].direct1 + "</p>" : '')
                        + (stopTime[stopList[i][0]].direct2 ? "<h5 class='direct'>顺时针</h5>"
                        + "<p class='timetable'>" + stopTime[stopList[i][0]].direct2 + "</p>" : '')
                        + (stopTime[stopList[i][0]].festival_direct1 ? "<h5 class='direct'>寒暑假－逆时针</h5>"
                        + "<p class='timetable'>" + stopTime[stopList[i][0]].festival_direct1 + "</p>" : '')
                        + (stopTime[stopList[i][0]].festival_direct2 ? "<h5 class='direct'>寒暑假－顺时针</h5>"
                        + "<p class='timetable'>" + stopTime[stopList[i][0]].festival_direct2 + "</p>" : '')
                        + "<p class='footer'>本时刻表的最后更新时间为：2014年9月24日</p>"
                        + "</div>";
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
            for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }
        });
    });
})(jQuery);