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
            var date = new Date();
            var day = date.getDay();
            var hour = date.getHours();
            var minute = date.getMinutes();
            if(day == 0 || day == 6) {
            	for (var i = 0; i < stopList.length; i++) {
	                (function (i) {
	                    var point = new BMap.Point(stopList[i][1], stopList[i][2]);
	                    var marker = new BMap.Marker(point);
	                    var label = new BMap.Label(stopList[i][0],{offset:new BMap.Size(20,-10)});
	                    marker.setLabel(label);
	                    map.addOverlay(marker);
	                    var sContent = "<div>"
	                        + "<h4 class='title'>" + stopList[i][0] + "</h4>"
	                        + "<p class='attention'>1.灰色标注班次为不可乘坐班次，绿色标注班次为可乘坐班次</p>"
	                        + "<p class='attention'>2.蓝色标注班次终点站为东川路地铁站 3.周六日及国定节假日停运</p>"
	                        + (stopTime[stopList[i][0]].metro_station ? "<p class='attention'>4.红色标注班次终点站［可能］为菁菁堂（根据本站作者的猜测＝。＝）</p>" : '');
	                    if(stopTime[stopList[i][0]].direct1) {
	                    	sContent += "<h5 class='direct'>逆时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	for(var j = 0; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
	                				sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                		}
	                		sContent += "</span>" + "</p>";
	                    } 
	                    if(stopTime[stopList[i][0]].direct2) {
	                    	sContent += "<h5 class='direct'>顺时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	for(var j = 0; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
                				sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                		}
	                		sContent += "</span>" + "</p>";
	                    }
	                    if(stopTime[stopList[i][0]].festival_direct1) {
	                    	sContent += "<h5 class='direct'>寒暑假－逆时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	for(var j = 0; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
                				sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                		}
	                		sContent += "</span>" + "</p>";
	                    }
	                    if(stopTime[stopList[i][0]].festival_direct2) {
	                    	sContent += "<h5 class='direct'>寒暑假－顺时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	for(var j = 0; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
                				sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                		}
	                		sContent += "</span>" + "</p>";
	                    }
	                    sContent += "<p class='footer'>本时刻表的最后更新时间为：2014年9月24日</p>"  + "</div>";
	                    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象 
	                    marker.addEventListener("click", function(){          
	                        map.openInfoWindow(infoWindow,point); //开启信息窗口
	                    });
	                })(i);
	            }
            } else {
	            for (var i = 0; i < stopList.length; i++) {
	                (function (i) {
	                    var point = new BMap.Point(stopList[i][1], stopList[i][2]);
	                    var marker = new BMap.Marker(point);
	                    var label = new BMap.Label(stopList[i][0],{offset:new BMap.Size(20,-10)});
	                    marker.setLabel(label);
	                    map.addOverlay(marker);
	                    var sContent = "<div>"
	                        + "<h4 class='title'>" + stopList[i][0] + "</h4>"
	                        + "<p class='attention'>1.灰色标注班次为不可乘坐班次，绿色标注班次为可乘坐班次</p>"
	                        + "<p class='attention'>2.蓝色标注班次终点站为东川路地铁站 3.周六日及国定节假日停运</p>"
	                        + (stopTime[stopList[i][0]].metro_station ? "<p class='attention'>4.红色标注班次终点站［可能］为菁菁堂（根据本站作者的猜测＝。＝）</p>" : '');
	                    if(stopTime[stopList[i][0]].direct1) {
	                    	sContent += "<h5 class='direct'>逆时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	var j = 0;
	                    	for(; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
	                			if(stopTime[stopList[i][0]].direct1[j] < hour || 
	                					(stopTime[stopList[i][0]].direct1[j] == hour && stopTime[stopList[i][0]].direct1[j + 1] <= minute)) {
	                				sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                			} else {
	                				break;
	                			}
	                		}
	                		sContent += "</span>";
	                    	if(stopTime[stopList[i][0]].direct1_red) {
	                    		for(; j<stopTime[stopList[i][0]].direct1.length - stopTime[stopList[i][0]].direct1_red * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                    		}
	                    		sContent += "<span class='red'>";
	                    		for(; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else if(stopTime[stopList[i][0]].direct1_blue) {
	                    		for(; j<stopTime[stopList[i][0]].direct1.length - stopTime[stopList[i][0]].direct1_blue * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                    		}
	                    		sContent += "<span class='blue'>";
	                    		for(; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else {
	                    		for(; j<stopTime[stopList[i][0]].direct1.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct1[j], stopTime[stopList[i][0]].direct1[j + 1]);
	                    		}
	                    		sContent += "</p>";
	                    	}
	                    } 
	                    if(stopTime[stopList[i][0]].direct2) {
	                    	sContent += "<h5 class='direct'>顺时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	var j = 0;
	                    	for(; j<stopTime[stopList[i][0]].direct2.length; j += 2) {
	                			if(stopTime[stopList[i][0]].direct2[j] < hour || 
	                					(stopTime[stopList[i][0]].direct2[j] == hour && stopTime[stopList[i][0]].direct2[j + 1] <= minute)) {
	                				sContent += printTime(stopTime[stopList[i][0]].direct2[j], stopTime[stopList[i][0]].direct2[j + 1]);
	                			} else {
	                				break;
	                			}
	                		}
	                		sContent += "</span>";
	                    	if(stopTime[stopList[i][0]].direct2_red) {
	                    		for(; j<stopTime[stopList[i][0]].direct2.length - stopTime[stopList[i][0]].direct2_red * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct2[j], stopTime[stopList[i][0]].direct2[j + 1]);
	                    		}
	                    		sContent += "<span class='red'>";
	                    		for(; j<stopTime[stopList[i][0]].direct2.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct2[j], stopTime[stopList[i][0]].direct2[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else if(stopTime[stopList[i][0]].direct2_blue) {
	                    		for(; j<stopTime[stopList[i][0]].direct2.length - stopTime[stopList[i][0]].direct2_blue * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct2[j], stopTime[stopList[i][0]].direct2[j + 1]);
	                    		}
	                    		sContent += "<span class='blue'>";
	                    		for(; j<stopTime[stopList[i][0]].direct2.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct2[j], stopTime[stopList[i][0]].direct2[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else {
	                    		for(; j<stopTime[stopList[i][0]].direct2.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].direct2[j], stopTime[stopList[i][0]].direct2[j + 1]);
	                    		}
	                    		sContent += "</p>";
	                    	}
	                    }
	                    if(stopTime[stopList[i][0]].festival_direct1) {
	                    	sContent += "<h5 class='direct'>寒暑假－逆时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	var j = 0;
	                    	for(; j<stopTime[stopList[i][0]].festival_direct1.length; j += 2) {
	                			if(stopTime[stopList[i][0]].festival_direct1[j] < hour || 
	                					(stopTime[stopList[i][0]].festival_direct1[j] == hour && stopTime[stopList[i][0]].festival_direct1[j + 1] <= minute)) {
	                				sContent += printTime(stopTime[stopList[i][0]].festival_direct1[j], stopTime[stopList[i][0]].festival_direct1[j + 1]);
	                			} else {
	                				break;
	                			}
	                		}
	                		sContent += "</span>";
	                    	if(stopTime[stopList[i][0]].festival_direct1_red) {
	                    		for(; j<stopTime[stopList[i][0]].festival_direct1.length - stopTime[stopList[i][0]].festival_direct1_red * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct1[j], stopTime[stopList[i][0]].festival_direct1[j + 1]);
	                    		}
	                    		sContent += "<span class='red'>";
	                    		for(; j<stopTime[stopList[i][0]].festival_direct1.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct1[j], stopTime[stopList[i][0]].festival_direct1[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else if(stopTime[stopList[i][0]].festival_direct1_blue) {
	                    		for(; j<stopTime[stopList[i][0]].festival_direct1.length - stopTime[stopList[i][0]].festival_direct1_blue * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct1[j], stopTime[stopList[i][0]].festival_direct1[j + 1]);
	                    		}
	                    		sContent += "<span class='blue'>";
	                    		for(; j<stopTime[stopList[i][0]].festival_direct1.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct1[j], stopTime[stopList[i][0]].festival_direct1[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else {
	                    		for(; j<stopTime[stopList[i][0]].festival_direct1.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct1[j], stopTime[stopList[i][0]].festival_direct1[j + 1]);
	                    		}
	                    		sContent += "</p>";
	                    	}
	                    }
	                    if(stopTime[stopList[i][0]].festival_direct2) {
	                    	sContent += "<h5 class='direct'>寒暑假－顺时针</h5>" + "<p class='timetable'>"  + "<span class='silver'>";
	                    	var j = 0;
	                    	for(; j<stopTime[stopList[i][0]].festival_direct2.length; j += 2) {
	                			if(stopTime[stopList[i][0]].festival_direct2[j] < hour || 
	                					(stopTime[stopList[i][0]].festival_direct2[j] == hour && stopTime[stopList[i][0]].festival_direct2[j + 1] <= minute)) {
	                				sContent += printTime(stopTime[stopList[i][0]].festival_direct2[j], stopTime[stopList[i][0]].festival_direct2[j + 1]);
	                			} else {
	                				break;
	                			}
	                		}
	                		sContent += "</span>";
	                    	if(stopTime[stopList[i][0]].festival_direct2_red) {
	                    		for(; j<stopTime[stopList[i][0]].festival_direct2.length - stopTime[stopList[i][0]].festival_direct2_red * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct2[j], stopTime[stopList[i][0]].festival_direct2[j + 1]);
	                    		}
	                    		sContent += "<span class='red'>";
	                    		for(; j<stopTime[stopList[i][0]].festival_direct2.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct2[j], stopTime[stopList[i][0]].festival_direct2[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else if(stopTime[stopList[i][0]].festival_direct2_blue) {
	                    		for(; j<stopTime[stopList[i][0]].festival_direct2.length - stopTime[stopList[i][0]].festival_direct2_blue * 2; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct2[j], stopTime[stopList[i][0]].festival_direct2[j + 1]);
	                    		}
	                    		sContent += "<span class='blue'>";
	                    		for(; j<stopTime[stopList[i][0]].festival_direct2.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct2[j], stopTime[stopList[i][0]].festival_direct2[j + 1]);
	                    		}
	                    		sContent += "</span></p>";
	                    	} else {
	                    		for(; j<stopTime[stopList[i][0]].festival_direct2.length; j += 2) {
	                    			sContent += printTime(stopTime[stopList[i][0]].festival_direct2[j], stopTime[stopList[i][0]].festival_direct2[j + 1]);
	                    		}
	                    		sContent += "</p>";
	                    	}
	                    }
	                    sContent += "<p class='footer'>本时刻表的最后更新时间为：2014年9月24日</p>"  + "</div>";
	                    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象 
	                    marker.addEventListener("click", function(){          
	                        map.openInfoWindow(infoWindow,point); //开启信息窗口
	                    });
	                })(i);
	            }
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