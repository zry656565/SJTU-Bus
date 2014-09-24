window.onload = function () {
    var map = new BMap.Map("container");
    map.centerAndZoom(new BMap.Point(121.443235,31.031303), 17); //将中心位置设置到上海交大
    
    //debug: 鼠标点击取经纬度
    map.addEventListener("click",function(e){
        console.log(e.point.lng + "," + e.point.lat);
    });
    
    var stopList = [
        ['东川路地铁站', 121.426814, 31.023853, 'time'],
        ['菁菁堂', 121.436534, 31.02475, 'time'],
        ['校医院', 121.439911, 31.025764, 'time'],
        ['东上院', 121.445463, 31.028007, 'time'],
        ['东中院', 121.444457, 31.030127, 'time'],
        ['新图书馆', 121.443954, 31.03155, 'time'],
        ['行政B楼', 121.447601, 31.032742, 'time'],
        ['电信学院', 121.448751, 31.03155, 'time'],
        ['凯旋门', 121.452308, 31.029431, 'time'],
        ['机动学院', 121.454608, 31.032633, 'time'],
        ['庙门', 121.453566, 31.035001, 'time'],
        ['船建学院', 121.451589, 31.036842, 'time'],
        ['文选医学楼', 121.448607, 31.037383, 'time'],
        ['学生服务中心', 121.43957,  31.034351, 'time'],
        ['西区学生公寓', 121.435797, 31.033144, 'time'],
        ['第四餐饮大楼', 121.433264, 31.031349, 'time'],
        ['华联生活中心', 121.436839, 31.03087, 'time'],
        ['包玉刚图书馆', 121.437037, 31.028997, 'time'],
        ['材料学院', 121.434486, 31.027922, 'time']
    ];
    var stopTime = {
        '东川路地铁站': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '菁菁堂': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '校医院': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '东上院': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '东中院': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '新图书馆': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '行政B楼': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '电信学院': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '凯旋门': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '机动学院': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '庙门': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '船建学院': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '文选医学楼': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '学生服务中心': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '西区学生公寓': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '第四餐饮大楼': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '华联生活中心': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '包玉刚图书馆': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        },
        '材料学院': {
            direct1: '',
            direct2: '',
            festival_direct1: '',
            festival_direct2: ''
        }
    };
    var lineList = [
        [121.436534, 31.02475],
        [121.439911, 31.025764],
        [121.445535, 31.027412],
        [121.445301, 31.027984],
        [121.444331, 31.030104],
        [121.443774, 31.031605],
        [121.448373, 31.033121],
        [121.448319, 31.032285],
        [121.448733, 31.03162],
        [121.449308, 31.031001],
        [121.450996, 31.030661],
        [121.451535, 31.029284],
        [121.454302, 31.030135],
        [121.454626, 31.030305],
        [121.455093, 31.030877],
        [121.454913, 31.031759],
        [121.453601, 31.034761],
        [121.452973, 31.035519],
        [121.452218, 31.036308],
        [121.451481, 31.03671],
        [121.449972, 31.037329],
        [121.448553, 31.037252],
        [121.432905, 31.032162],
        [121.43339,  31.031001],
        [121.436372, 31.03196],
        [121.437486, 31.029114],
        [121.434432, 31.028061],
        [121.436354, 31.024859],
        [121.43657,  31.02475],
        [121.437037, 31.024905],
        [121.437504, 31.023729],
        [121.428215, 31.020681],
        [121.426832, 31.023992]
    ];
    for (var i = 0; i < stopList.length; i++) {
        (function (i) {
            var point = new BMap.Point(stopList[i][1], stopList[i][2]);
            var marker = new BMap.Marker(point);
            var label = new BMap.Label(stopList[i][0],{offset:new BMap.Size(20,-10)});
            marker.setLabel(label);
            map.addOverlay(marker);
            var sContent = "<div>"
                + "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + stopList[i][0] + "</h4>"
                + "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'></p>"
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
};