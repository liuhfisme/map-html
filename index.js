var map = new BMapGL.Map("container");          // 创建地图实例 
//var point = new BMapGL.Point(116.20596467080586, 40.0144555532275);  // 创建点坐标 
var point = new BMapGL.Point(116.404, 39.915);

map.centerAndZoom(point, 11);                 // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom();

var bdary = new BMapGL.Boundary();
bdary.get('北京市', function (rs) {
    // 绘制行政区
    for (var i = 0; i < rs.boundaries.length; i++) {
        var path = [];
        var xyArr = rs.boundaries[i].split(';');
        var ptArr = [];
        for (var j = 0; j < xyArr.length; j++) {
            var tmp = xyArr[j].split(',');
            var pt = new BMapGL.Point(tmp[0], tmp[1]);
            ptArr.push(pt);
        }
        var mapmask = new BMapGL.MapMask(ptArr, {
            isBuildingMask: true,
            isPoiMask: true,
            isMapMask: true,
            showRegion: 'inside',
            topFillColor: '#5679ea',
            topFillOpacity: 0.5,
            sideFillColor: '#5679ea',
            sideFillOpacity: 0.9
        });
        map.addOverlay(mapmask);
        var border = new BMapGL.Polyline(ptArr, {
            strokeColor: '#4ca7a2',
            strokeWeight: 3,
            strokeOpacity: 1
        });
        map.addOverlay(border);
    }
});
var marker = new BMapGL.Marker(new BMapGL.Point(116.26165756693067,40.038813377487905));
map.addOverlay(marker);
var marker2 = new BMapGL.Marker(new BMapGL.Point(116.10819372972905,40.00842014047728));
map.addOverlay(marker2);

// 路线规划
var p1 = new BMapGL.Point(116.301934,39.977552);
var p2 = new BMapGL.Point(116.508328,39.919141);

var driving = new BMapGL.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false}});
driving.search(p1, p2);

// 绘制圆
var circle1 = new BMapGL.Circle(new BMapGL.Point(116.26165756693067,40.038813377487905), 5000, {
    strokeColor: 'red',
    strokeWeight: 2,
    strokeOpacity: 0.5
});

var circle2 = new BMapGL.Circle(new BMapGL.Point(116.26165756693067,40.038813377487905), 7000, {
    strokeColor: 'yellow',
    strokeWeight: 2,
    strokeOpacity: 0.5
});

var circle3 = new BMapGL.Circle(new BMapGL.Point(116.26165756693067,40.038813377487905), 9000, {
    strokeColor: 'blue',
    strokeWeight: 2,
    strokeOpacity: 0.5
});
map.addOverlay(circle1);
map.addOverlay(circle2);
map.addOverlay(circle3);