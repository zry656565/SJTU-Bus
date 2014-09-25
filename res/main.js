(function($) {
    function printTime(h,m) {
        var result = "";
        if(h < 10) {
            result += "0";
        }
        result += h.toString();
        result += ":";
        if(m<10) {
            result += "0";
        }
        result += m.toString();
        result += " ";
        return result;
    }

    function initContent(stopTime, stopName) {
        return "<div>" +
           "<h4 class='title'>" + stopName + "</h4>" +
           "<p class='attention'>1.灰色标注班次为过时班次，绿色标注班次为可乘坐班次</p>" +
           "<p class='attention'>2.蓝色标注班次终点站为东川路地铁站 3.周六日及国定节假日停运</p>" +
           (stopTime[stopName].metro_station ? "<p class='attention'>4.红色标注班次终点站［可能］为菁菁堂（根据本站作者的猜测＝。＝）</p>" : '');
    }

    function pushDirectToContent(directId, stopTime, stopName) {
        var date = new Date();
        var day = date.getDay();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var directName,
            sContent = '';
        switch (directId) {
            case 'direct1':
                directName = '逆时针';
                break;
            case 'direct2':
                directName = '顺时针';
                break;
            case 'festival_direct1':
                directName = '寒暑假－逆时针';
                break;
            case 'festival_direct2':
                directName = '寒暑假－顺时针';
                break;
            default:
                directName = '';
                break;
        }
        if (!directName) {
            return sContent;
        }
        sContent += "<h5 class='direct'>" + directName + "</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
        var j = 0;
        var timeArr = stopTime[stopName][directId];
        var blueNum = stopTime[stopName][directId + '_blue'];
        var redNum = stopTime[stopName][directId + '_red'];
        // if it's Sunday or Saturday
        if (day == 0 || day == 6) {
            for(; j<timeArr.length; j += 2) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</span>" + "</p>";
            return sContent;
        }

        for(; j<timeArr.length; j += 2) {
            if(timeArr[j] < hour || (timeArr[j] == hour && timeArr[j + 1] <= minute)) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            } else {
                break;
            }
        }
        sContent += "</span>";
        if(redNum) {
            for(; j<timeArr.length - redNum * 2; j += 2) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "<span class='red'>";
            for(; j<timeArr.length; j += 2) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</span></p>";
        } else if(blueNum) {
            for(; j<timeArr.length - blueNum * 2; j += 2) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "<span class='blue'>";
            for(; j<timeArr.length; j += 2) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</span></p>";
        } else {
            for(; j<timeArr.length; j += 2) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</p>";
        }
        return sContent;
    }

    $(function () {
        //if user use a mobile device, hide the 'fork me' image!
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
                    var sContent = initContent(stopTime, stopName);
                    if(stopTime[stopName].direct1) {
                        sContent += pushDirectToContent('direct1', stopTime, stopName);
                    } 
                    if(stopTime[stopName].direct2) {
                        sContent += pushDirectToContent('direct2', stopTime, stopName);
                    }
                    if(stopTime[stopName].festival_direct1) {
                        sContent += pushDirectToContent('festival_direct1', stopTime, stopName);
                    }
                    if(stopTime[stopName].festival_direct2) {
                        sContent += pushDirectToContent('festival_direct2', stopTime, stopName);
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
            for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }
        });
    });
})(jQuery);