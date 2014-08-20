var oSeoulCityPoint = new nhn.api.map.LatLng(37.3461603, 126.7024882);
var defaultLevel = 11;
var oMap;
oMap = new nhn.api.map.Map(document.getElementById('map'), {
    point: oSeoulCityPoint,
    zoom: defaultLevel,
    enableWheelZoom: true,
    enableDragPan: true,
    enableDblClickZoom: false,
    mapMode: 0,
    activateTrafficMap: false,
    activateBicycleMap: false,
    minMaxLevel: [ 1, 14 ],
    size: new nhn.api.map.Size(350, 350)           });
var oSlider = new nhn.api.map.ZoomControl();
oMap.addControl(oSlider);
oSlider.setPosition({
    top: 10,
    left: 10
});

var oMapTypeBtn = new nhn.api.map.MapTypeBtn();
oMap.addControl(oMapTypeBtn);
oMapTypeBtn.setPosition({
    bottom: 10,
    right: 80
});

var oThemeMapBtn = new nhn.api.map.ThemeMapBtn();
oThemeMapBtn.setPosition({
    bottom: 10,
    right: 10
});
oMap.addControl(oThemeMapBtn);

var oSize = new nhn.api.map.Size(28, 37);
var oOffset = new nhn.api.map.Size(14, 37);
var oIcon = new nhn.api.map.Icon('http://static.naver.com/maps2/icons/pin_spot2.png', oSize, oOffset);
//마커용 설정

var oMarker = new nhn.api.map.Marker(oIcon, { title: 'Located ylease' });
oMarker.setPoint(oSeoulCityPoint);
oMap.addOverlay(oMarker);
//마커 생성 및 지도에 적용

var oLabel1 = new nhn.api.map.MarkerLabel();
oMap.addOverlay(oLabel1);
oLabel1.setVisible(true, oMarker);
// 마커 라벨 보이기
