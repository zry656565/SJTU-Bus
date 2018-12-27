(function ($) {
  $(function () {
    // prevent opening a new window in Safari
    $('.link').click(function (event) {
      window.location.href = $(this).attr('href')
      event.preventDefault()
    })

    var map = new BMap.Map('container')
    map.centerAndZoom(new BMap.Point(121.443235, 31.031303), 16) // 将中心位置设置到上海交大

    $.getJSON('data.json?v=20160414', function (data) {
      var timeList = data.startTime
      var dongchuanTime = data.dongchuanTime
      var stopList = data.stopList
      var stopTime = data.stopTime
      var markerList = []
      var i

      for (i = 0; i < stopList.length; i++) {
        (function (i) {
          var point = new BMap.Point(stopList[i][1], stopList[i][2])
          var marker = new BMap.Marker(point)
          var label = new BMap.Label(stopList[i][0], { offset: new BMap.Size(20, -10) })
          marker.setLabel(label)
          map.addOverlay(marker)
          markerList.push(marker)
          var stopName = stopList[i][0]
          var sContent = SBus.initContentMobile(stopName, i === 0)
          if (i === 0) {
            ['direct1', 'festival_direct1'].forEach(function (direct) {
              sContent += SBus.pushDirectToContent(direct, dongchuanTime, stopName)
            })
          } else {
            SBus.nextStop(timeList, stopTime[stopName]);
            ['direct1', 'direct2', 'festival_direct1',
              'festival_direct2'].forEach(function (direct) {
              sContent += SBus.pushDirectToContent(direct, timeList, stopName)
            })
          }
          sContent += '</div></div>' + '<p class=\'footer\'>本时刻表的最后更新时间为：2016年4月14日</p>'
          var infoWindow = new BMap.InfoWindow(sContent) // 创建信息窗口对象
          marker.addEventListener('click', function () {
            map.openInfoWindow(infoWindow, point) // 开启信息窗口
          })
        })(i)
      }
      // 绘制路线
      var lineList = data.lineList

      var pointArr = []
      for (i = 0; i < lineList.length; i++) {
        pointArr.push(new BMap.Point(lineList[i][0], lineList[i][1]))
      }
      var polyline = new BMap.Polyline(pointArr, { strokeColor: 'blue', strokeWeight: 5, strokeOpacity: 0.5 })
      map.addOverlay(polyline)

      $('#geo-btn').click(function () {
        var spinner

        // 初始化一个spinner
        if (spinner) {
          $('#spinner').show()
        } else {
          spinner = new Spinner({
            lines: 7,
            length: 0,
            width: 9,
            radius: 10,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: '#000',
            speed: 1.4,
            trail: 38,
            shadow: true,
            hwaccel: false,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%'
          }).spin($('#spinner')[0])
        }
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (loc) {
          if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            $('#spinner').hide()
            var closestMarker = {
              marker: null,
              distance: Number.MAX_VALUE
            }

            markerList.forEach(function (marker) {
              var distance = Math.sqrt(Math.pow((marker.point.lng - loc.point.lng), 2) +
                                            Math.pow((marker.point.lat - loc.point.lat), 2))
              if (closestMarker.distance > distance) {
                closestMarker = {
                  marker: marker,
                  distance: distance
                }
              }
            })
            if (closestMarker.distance < 0.03) {
              $(closestMarker.marker).click()
            } else {
              alert('你离学校有点远哦，走近些再定位吧~')
            }
            // console.info('Location:' + loc.point.lng + ',' + loc.point.lat)
          } else {
            $('#spinner').hide()
            alert('抱歉，获取您的位置失败。')
          }
        }, { enableHighAccuracy: true })
      })
    })

    var realtimeBus = function () {
      var allOverlays = map.getOverlays()
      for (var j = 0; j < allOverlays.length; j++) {
        if (allOverlays[j].tag === 'bus_realtime') {
          map.removeOverlay(allOverlays[j])
        }
      }

      // api repo: https://github.com/hebingchang/sjtubus-realtime-api
      $.getJSON('https://sjtubus.boar.moe/', function (data) {
        for (var i = 0; i < data.length; i++) {
          (function (i) {
            var myIcon = new BMap.Icon('map_icon_bus.png', new BMap.Size(48, 48))// 这里先不用第三个参数IconOptions
            var point = new BMap.Point(data[i].longitude, data[i].dimension)
            var mk = new BMap.Marker(point, { icon: myIcon })// 创建标注图标
            mk.setRotation(data[i].direction)
            mk.tag = 'bus_realtime'

            var sContent = '<h4 class="businfo-title">校园巴士 #' + data[i].busno + '</h4>'
            sContent += '<p class=\'businfo\'>车牌号: <span style=\'font-weight: 400\'>' + data[i].platenumber + '</span></p>'
            sContent += '<p class=\'businfo\'>车速: <span style=\'font-weight: 400\'>' + data[i].speed + ' km/h</span></p>'

            var infoWindow = new BMap.InfoWindow(sContent) // 创建信息窗口对象
            mk.addEventListener('click', function () {
              map.openInfoWindow(infoWindow, point) // 开启信息窗口
            })

            map.addOverlay(mk)// 将标注添加到地图中
          })(i)
        }
      })
    }

    setInterval(function () {
      realtimeBus()
    }, 5000)
  })
})(Zepto)
