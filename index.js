console.log('开始绘制地图……')
var map = new BMapGL.Map("container");          // 创建地图实例 
//var point = new BMapGL.Point(116.20596467080586, 40.0144555532275);  // 创建点坐标 
var point = new BMapGL.Point(102.74160169891385,26.556603494854336);

map.centerAndZoom(point, 11.5);                 // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom();
map.setHeading(0);
map.setTilt(10);

var bdary = new BMapGL.Boundary();
bdary.get('会东县', function (rs) {
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
        console.log('xyArr>> ', i, xyArr)
        console.log('ptArr>> ', i, ptArr)
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

        // var prism = new BMapGL.Prism(ptArr, 5000, {
        //     topFillColor: '#5679ea',
        //     topFillOpacity: 0.5,
        //     sideFillColor: '#5679ea',
        //     sideFillOpacity: 0.9

        // });
        // map.addOverlay(prism);
    }
});

// 路线规划
var p1 = new BMapGL.Point(116.301934, 39.977552);
var p2 = new BMapGL.Point(102.96246176383126,26.52180780525433);

var driving = new BMapGL.DrivingRoute(map, { renderOptions: { map: map, autoViewport: false } });
driving.search(point, p2);

var walking = new BMapGL.WalkingRoute(map, { renderOptions: { map: map, autoViewport: false } });
walking.search(point, p2);

var riding = new BMapGL.RidingRoute(map, { renderOptions: { map: map, autoViewport: false } });
riding.search(point, p2);

// 绘制圆
var circle1 = new BMapGL.Circle(point, 5000, {
    strokeColor: 'red',
    strokeWeight: 1,
    strokeOpacity: 0.5,
    fillColor: 'red',
    fillOpacity: 0.3
});

var circle2 = new BMapGL.Circle(point, 10000, {
    strokeColor: 'yellow',
    strokeWeight: 1,
    strokeOpacity: 0.5,
    fillColor: 'yellow',
    fillOpacity: 0.3
});

var circle3 = new BMapGL.Circle(point, 15000, {
    strokeColor: 'blue',
    strokeWeight: 1,
    strokeOpacity: 0.5,
    fillColor: 'blue',
    fillOpacity: 0.3
});
map.addOverlay(circle1);
map.addOverlay(circle2);
map.addOverlay(circle3);

// 标记可点击
var marker = new BMapGL.Marker(point);
map.addOverlay(marker);
// 创建信息窗口
var opts = {
    width: 200,
    height: 0,
    title: '四川凉山州会东县',
    offset: new BMapGL.Size(10, -20)
};
var infoWindow = new BMapGL.InfoWindow(
    '发震时刻：2023-03-23 18:26:34<br/>纬度：22.61°<br/>经度：100.71°<br/>深度：10千米<br/>震级：4.2<br/>参考位置：四川凉山州会东县',
    opts);
// 点标记添加点击事件
marker.addEventListener('click', function () {
    map.openInfoWindow(infoWindow, point); // 开启信息窗口
    map.setHeading(0);
    map.setTilt(50);
    // map.clearOverlays();
});

// map 点击事件
map.addEventListener('click', function (e) {
    alert('点击位置经纬度：' + e.latlng.lng + ',' + e.latlng.lat);
});