(function ($) {
  $(function () {
    var map = new BMap.Map('container')
    map.centerAndZoom(new BMap.Point(121.443235, 31.031303), 17) // 将中心位置设置到上海交大

    // debug: 鼠标点击取经纬度
    /* map.addEventListener("click",function(e){
            console.log(e.point.lng + "," + e.point.lat);
        }); */

    $.getJSON('data.json?v=20140414', function (data) {
      var timeList = data.startTime
      var dongchuanTime = data.dongchuanTime
      var stopList = data.stopList
      var stopTime = data.stopTime

      for (var i = 0; i < stopList.length; i++) {
        (function (i) {
          var point = new BMap.Point(stopList[i][1], stopList[i][2])
          var marker = new BMap.Marker(point)
          var label = new BMap.Label(stopList[i][0], { offset: new BMap.Size(20, -10) })
          marker.setLabel(label)
          map.addOverlay(marker)
          var stopName = stopList[i][0]
          var sContent = SBus.initContent(stopName, i === 0)
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
          sContent += '<p class=\'footer\'>本时刻表的最后更新时间为：2016年4月14日</p>' + '</div>'
          var infoWindow = new BMap.InfoWindow(sContent) // 创建信息窗口对象
          marker.addEventListener('click', function () {
            map.openInfoWindow(infoWindow, point) // 开启信息窗口
          })
        })(i)
      }

      // 绘制路线
      var lineList = data.lineList

      var pointArr = []
      for (var j = 0; j < lineList.length; j++) {
        pointArr.push(new BMap.Point(lineList[j][0], lineList[j][1]))
      }
      var polyline = new BMap.Polyline(pointArr, { strokeColor: 'blue', strokeWeight: 5, strokeOpacity: 0.5 })
      map.addOverlay(polyline)
    }).error(function () {})

    var realtimeBus = function () {
      var allOverlays = map.getOverlays()
      for (var j = 0; j < allOverlays.length; j++) {
        if (allOverlays[j].tag === 'bus_realtime') {
          map.removeOverlay(allOverlays[j])
        }
      }

      // bus.sjtu.edu.cn is maintained by SJTU NIC
      $.getJSON('https://bus.sjtu.edu.cn/api/v1/shuttle/918484/0/monitor', (res) => {
        res.data.map((item) => {
          var myIcon = new BMap.Icon('/resources/sjtubus/map_icon_bus.png', new BMap.Size(48, 48))
          var location = SBus.gcj02ToBd09(item.location)
          var point = new BMap.Point(location.longitude, location.latitude)
          var mk = new BMap.Marker(point, { icon: myIcon }) // 创建标注图标
          mk.setRotation(item.angle)
          mk.tag = 'bus_realtime'

          var sContent = '<h4 class="businfo-title">校园巴士 #' + item.vehicle_code + '</h4>'
          sContent += '<p class=\'businfo\'>车速: <span style=\'font-weight: 400\'>' + item.speed + ' km/h</span></p>'

          var infoWindow = new BMap.InfoWindow(sContent) // 创建信息窗口对象
          mk.addEventListener('click', function () {
            map.openInfoWindow(infoWindow, point) // 开启信息窗口
          })

          map.addOverlay(mk) // 将标注添加到地图中
        })
      })
    }

    setInterval(function () {
      realtimeBus()
    }, 5000)
  })
})(jQuery)
