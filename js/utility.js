var SBus = {};

(function() {

    SBus.printTime = function(h,m) {
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

    SBus.initContent = function(stopTime, stopName) {
        return "<div class='tip-content'>" +
           "<h4 class='title'>" + stopName + "</h4>" +
           "<p class='attention'>1.灰色标注班次为当天停运班次，绿色标注班次为当天可乘坐班次</p>" +
           "<p class='attention'>2.蓝色标注班次终点站为东川路地铁站 3.周六日及国定节假日停运</p>" +
           (stopTime[stopName].metro_station ? "<p class='attention'>4.红色标注班次终点站［可能］为菁菁堂（根据本站作者的猜测＝。＝）</p>" : '');
    }

    SBus.initContentMobile = function(stopTime, stopName) {
        return "<h4 class='title'>" + stopName + "</h4>" +
           "<p class='attention'>1.蓝色班次终点站为东川路地铁站</p>" +
           "<p class='attention'>2.周六日及国定节假日停运</p>" +
           "<p class='attention'>3.请<span class='red'>滚动查看</span>以下时间</p>" + 
           "<div class='tip-scroll'>" + "<div class='tip-content'>";
    }

    SBus.pushDirectToContent = function(directId, stopTime, stopName) {
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
        /*if (day == 0 || day == 6) {
            for(; j<timeArr.length; j += 2) {
                sContent += printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</span>" + "</p>";
            return sContent;
        }*/

        for(; j<timeArr.length; j += 2) {
            if(timeArr[j] < hour || (timeArr[j] == hour && timeArr[j + 1] <= minute)) {
                sContent += SBus.printTime(timeArr[j], timeArr[j + 1]);
            } else {
                break;
            }
        }
        sContent += "</span>";
        if(redNum) {
            for(; j<timeArr.length - redNum * 2; j += 2) {
                sContent += SBus.printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "<span class='red'>";
            for(; j<timeArr.length; j += 2) {
                sContent += SBus.printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</span></p>";
        } else if(blueNum) {
            for(; j<timeArr.length - blueNum * 2; j += 2) {
                sContent += SBus.printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "<span class='blue'>";
            for(; j<timeArr.length; j += 2) {
                sContent += SBus.printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</span></p>";
        } else {
            for(; j<timeArr.length; j += 2) {
                sContent += SBus.printTime(timeArr[j], timeArr[j + 1]);
            }
            sContent += "</p>";
        }
        return sContent;
    }
}());