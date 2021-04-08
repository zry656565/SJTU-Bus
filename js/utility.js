window.SBus = {};

(function (SBus) {
  function shouldHighlight (h, m) {
    var now = new Date()
    var shownTime = new Date()
    shownTime.setHours(h)
    shownTime.setMinutes(m)
    var deadline = new Date()
    deadline.setHours(20)
    deadline.setMinutes(30)

    return now >= deadline ||
      now < shownTime
  }

  function printTime (h, m, color) {
    var result = ''
    if (h < 10) {
      result += '0'
    }
    result += h.toString()
    result += ':'
    if (m < 10) {
      result += '0'
    }
    result += m.toString()

    var isHighlight = shouldHighlight(h, m)
    var className = ''
    switch (color) {
      case 'red':
        className = isHighlight ? 'red' : 'disabled-red'
        break
      case 'blue':
        className = isHighlight ? 'blue' : 'disabled-blue'
        break
      case 'normal':
      default:
        className = isHighlight ? '' : 'silver'
        break
    }
    return '<span class="' + className + '">' + result + '</span>'
  }

  function calcTime (timeArr, diff) {
    for (var i = 0; i < timeArr.length; i += 2) {
      var hour = timeArr[i]

      var minute = timeArr[i + 1]
      minute += diff
      if (minute >= 60) {
        minute -= 60
        hour++
      } else if (minute < 0) {
        minute += 60
        hour--
      }
      timeArr[i] = hour
      timeArr[i + 1] = minute
    }
  }

  SBus.initContent = function (stopName, special) {
    return '<div class="tip-content">' +
      '<h4 class="title">' + stopName + '</h4>' +
      '<p class="attention">1. 蓝色班次：终点站东川路地铁站</p>' +
      '<p class="attention">2. 周六日及法定节假日停运</p>' +
      (special ? '<p class="attention">3. 红色标注班次终点站［可能］为菁菁堂（根据本站作者的猜测＝。＝）</p>' : '')
  }

  SBus.initContentMobile = function (stopName) {
    return '<h4 class="title">' + stopName + '</h4>' +
      '<p class="attention">1.蓝色班次：终点站东川路地铁站</p>' +
      '<p class="attention">2.周六日及法定节假日停运</p>' +
      '<p class="attention">3.请<span class="red">滚动查看</span>以下时间</p>' +
      '<div class="tip-scroll">' + '<div class="tip-content">'
  }

  SBus.nextStop = function (timeList, diff) {
    calcTime(timeList['direct1'], diff.direct1_diff)
    calcTime(timeList['festival_direct1'], diff.direct1_diff)
    calcTime(timeList['direct2'], diff.direct2_diff)
    calcTime(timeList['festival_direct2'], diff.direct2_diff)
  }

  SBus.pushDirectToContent = function (directId, stopTime) {
    var directName
    switch (directId) {
      case 'direct1':
        directName = '逆时针'
        break
      case 'direct2':
        directName = '顺时针'
        break
      case 'festival_direct1':
        directName = '寒暑假－逆时针'
        break
      case 'festival_direct2':
        directName = '寒暑假－顺时针'
        break
      default:
        directName = ''
        break
    }
    if (!directName) {
      return ''
    }
    var timeArr = stopTime[directId]
    var blueNum = stopTime[directId + '_blue'] || 0
    var redNum = stopTime[directId + '_red'] || 0
    // if it's Sunday or Saturday
    /* if (day == 0 || day == 6) {
        for(; j<timeArr.length; j += 2) {
            sContent += printTime(timeArr[j], timeArr[j + 1]);
        }
        sContent += "</span>" + "</p>";
        return sContent;
    } */

    // If current time < 20:30, show all times with regular color.
    var timeStr = []
    for (var j = 0; j < timeArr.length; j += 2) {
      var color
      if (j < redNum * 2) color = 'red'
      else if (j >= timeArr.length - blueNum * 2) color = 'blue'
      else color = 'normal'
      timeStr.push(
        printTime(timeArr[j], timeArr[j + 1], color)
      )
    }

    return (
      '<h5 class="direct">' + directName + '</h5>' +
      '<p class="timetable">' +
      timeStr.join('') +
      '</p>'
    )
  }

  SBus.gcj02ToBd09 = function (location) {
    const xPi = 3.14159265358979324 * 3000.0 / 180.0
    var x = location.longitude
    var y = location.latitude
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPi)
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPi)
    return { latitude: z * Math.sin(theta) + 0.006, longitude: z * Math.cos(theta) + 0.0065 }
  }
}(window.SBus))
