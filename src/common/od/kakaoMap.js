const kakaoMapUtils = {
    /*
    * 카카오맵 그리기
    * param : strInfo : 주소정보
    *         drawMapId : 지도가 보여질 레이어(div) id
    */
    drawMap: function (strInfo, drawMapId) {
        // console.log("kakaoMap.js", strInfo);
        setTimeout(()=> { // 카카오맵 API 로딩시간으로 인한 delay 500ms 부여함.
            if ( window.kakao && window.kakao.maps ) {
                const mapAddr = strInfo.pkuppStnmAddr + " " + strInfo.pkuppStnmDtlAddr;
                const mapStrNm = strInfo.pkuppNm;
                const geocoder = new kakao.maps.services.Geocoder();
                geocoder.addressSearch(mapAddr, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        const container = document.getElementById(drawMapId);
                        const options = {
                            center: new kakao.maps.LatLng(result[0].y, result[0].x),
                            level: 2,
                        };
                        const map = new kakao.maps.Map(container, options);
                        // 마커정보
                        const marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });
                        // 마커위에 표시될 명칭정보
                        const infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">'+mapStrNm+'</div>'
                        });
                        infowindow.open(map, marker);
                        // 마커를 맵 중앙으로 이동
                        map.setCenter(coords);
                    }
                });
            }
        }, 100);
    },
    drawMapMulti: function (strInfoList, drawMapId) {
        setTimeout(()=> { // 카카오맵 API 로딩시간으로 인한 delay 500ms 부여함.
            if ( window.kakao && window.kakao.maps ) {
                const container = document.getElementById(drawMapId);
                const options = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 2,
                };
                const map = new kakao.maps.Map(container, options);
                const positions = [];
                const geocoder = new kakao.maps.services.Geocoder();
                for (let i = 0; i < strInfoList.length; i++) {
                    const strInfo = strInfoList[i];
                    const mapAddr = strInfo.pkuppStnmAddr + " " + strInfo.pkuppStnmDtlAddr;
                    const mapStrNm = strInfo.pkuppNm;
                    const position = {};
                    geocoder.addressSearch(mapAddr, function(result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            position.title = '<div style="width:150px;text-align:center;padding:6px 0;">'+mapStrNm+'</div>';
                            position.latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
                            const marker = new kakao.maps.Marker({
                                map: map, // 마커를 표시할 지도
                                position: position.latlng, // 마커를 표시할 위치
                            });
                            // 마커에 표시할 인포윈도우를 생성
                            const infowindow = new kakao.maps.InfoWindow({
                                content: position.title // 인포윈도우에 표시할 내용
                            });
                            infowindow.open(map, marker);
                            map.setCenter(position.latlng);
                        }
                    });
                }
            }
        }, 100);
    },
    gpsIpSearch(curPosition) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // successCallback
                function(position) {
                    curPosition.posit = position.coords;
                    // alert( "위도: " + position.coords.latitude ); // 위도
                    // alert( "경도: " + position.coords.longitude ); // 경도
                },
                // errorCallback
                function(error) {
                    switch (error.code) {
                        case error.TIMEOUT:
                            curPosition.errMsg = "시간 초과";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            curPosition.errMsg = "위치를 사용할 수 없음 (이 오류는 위치 정보 공급자가 응답)";
                            break;
                        case error.PERMISSION_DENIED:
                            curPosition.errMsg = "권한 거부";
                            break;
                        case error.UNKNOWN_ERROR:
                            curPosition.errMsg = "알 수 없는 오류";
                            break;
                        default:
                            curPosition.errMsg = errro.code;
                    }
                });
        } else {
            curPosition.errMsg = "이 브라우저는 geolcation API를 지원하지 않습니다";
        }
    },
    getDistance: function (adrsInfo, strInfoList, gpsPosition, callback) {
        setTimeout(()=> { // 카카오맵 API 로딩시간으로 인한 delay 500ms 부여함.
            if ( window.kakao && window.kakao.maps ) {
                const pathList = [];
                const geocoder = new kakao.maps.services.Geocoder();
                // 현재 위치 좌표
                const curPosition = {
                    mapAddr: adrsInfo,
                    latlng: ''
                };
                geocoder.addressSearch(curPosition.mapAddr, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        if (typeof gpsPosition.posit.latitude != 'undefined' && typeof gpsPosition.posit.longitude != 'undefined') {
                            curPosition.latlng = new kakao.maps.LatLng(String(gpsPosition.posit.latitude), String(gpsPosition.posit.longitude));
                        } else {
                            curPosition.latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
                        }
                        pathList.push(curPosition.latlng);
                        if (pathList.length > 0) {
                            // 조회된 매장리스트를 좌표로 변환하여 거리calc
                            let idx = 0;
                            for (let i = 0; i < strInfoList.length; i++) {
                                const strInfo = strInfoList[i];
                                const position = {
                                    // mapAddr: strInfo.pkuppStnmAddr + " " + strInfo.pkuppStnmDtlAddr,
                                    mapAddr: strInfo.pkuppStnmAddr,
                                    latlng: ''
                                };
                                geocoder.addressSearch(position.mapAddr, function(result, status) {
                                    if (status === kakao.maps.services.Status.OK) {
                                        position.latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
                                        pathList.push(position.latlng);
                                        const clickLine = new kakao.maps.Polyline({
                                            path: pathList
                                        });
                                        strInfo.distance = Math.floor(clickLine.getLength());
                                        pathList.pop();
                                    } else {
                                        strInfo.distance = 0;
                                    }
                                    if (idx === strInfoList.length - 1) {
                                    strInfoList.sort((a, b) => parseInt(a.distance>0?a.distance:0) - parseInt(b.distance>0?b.distance:0));
                                    callback();
                                    }
                                    idx++;
                                });
                            }
                        }
                    }
                });
            }
        }, 100);
    }
};

export default kakaoMapUtils;
