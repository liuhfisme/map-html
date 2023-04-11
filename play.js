// 百度地图API功能

var map = new BMapGL.Map("container");  // 创建Map实例
map.centerAndZoom("哈尔滨", 15);      // 初始化地图,用城市名设置地图中心点
map.setMapStyleV2({ //可以自己定义地图底图 http://developer.baidu.com/map/custom/
    styleJson: [
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": {
                "color": "#72b8fe"
            }
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#ffffff"
            }
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#bababa"
            }
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#767676"
            }
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff"
            }
        },
        {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
                "color": "#b8cb93"
            }
        }
    ]
});
map.addControl(new BMapGL.NavigationControl());
map.addControl(new BMapGL.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }));
map.enableScrollWheelZoom(true);
var pts = [
    new BMapGL.Point(126.618398, 45.721217),
    new BMapGL.Point(126.62081, 45.713008),
    new BMapGL.Point(126.654694, 45.732086),
    new BMapGL.Point(126.675481, 45.738471)
];
var polyline;
var options = {
    onSearchComplete: function (results) {
        if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
            // 获取第一条方案
            var plan = results.getPlan(0);
            // 获取方案的驾车线路
            var route = plan.getRoute(0);
            //返回路线的地理坐标点数组。（自 1.2 新增）
            var points = route.getPath();
            polyline = new BMapGL.Polyline(points);
            //alert(points.length);
            map.addOverlay(polyline);          //增加折线
        }
    }
    //,
    //renderOptions:{map: map, autoViewport: true}
};
var driving = new BMapGL.DrivingRoute(map, options);


i = 0;
function playLine(i) {
    if (i == 0) {//第一个点 直接添加
        var marker = new BMapGL.Marker(pts[i]);  // 创建标注
        map.addOverlay(marker);
        marker.setLabel(new BMapGL.Label("我是第" + (i + 1) + "个点", { offset: new BMapGL.Size(20, -10) }));
        map.panTo(pts[i]);
        i++;
        setTimeout(function () {
            playLine(i);
        }, 2000)
    } else {//获取PolyLine并添加 添加点
        if (i <= pts.length) {
            driving.search(pts[i - 1], pts[i]);
            map.addOverlay(polyline);
            var marker = new BMapGL.Marker(pts[i]);  // 创建标注
            map.addOverlay(marker);
            marker.setLabel(new BMapGL.Label("我是第" + (i + 1) + "个点", { offset: new BMapGL.Size(20, -10) }));
            map.panTo(pts[i]);
            i++;
            setTimeout(function () {
                playLine(i);
            }, 2000)
        }
    }
}
playLine(i);