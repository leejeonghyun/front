import Config from "../Config";

const GeoUtils = {
  pos: null,
  lat: Config.address.home.gps.x,
  lng: Config.address.home.gps.y,
  getGeolocation: function() {
    const _this = this;
    return new Promise(function (resolve, reject) {
        if ('geolocation' in navigator) {
            localStorage.geolocationLat = _this.lat;
            localStorage.geolocationLng = _this.lng;
            const geoOptions = {
                //  enableHighAccuracy : true
            };
            // console.log("ContextUtils.getAgent() > " + ContextUtils.getAgent());
            localStorage.geolocationLat = _this.lat;
            localStorage.geolocationLng = _this.lng;
            _this.getPosition().then(position => {
                const geo = {
                    lat: '',
                    lng: ''
                };
                if (_this.lat != position.coords.latitude && _this.lng != position.coords.longitude) {
                    localStorage.geolocationLat = position.coords.latitude;
                    localStorage.geolocationLng = position.coords.longitude;
                    geo.lat = position.coords.latitude;
                    geo.lng = position.coords.longitude;
                } else {
                    localStorage.geolocationLat = _this.lat;
                    localStorage.geolocationLng = _this.lng;
                    geo.lat = _this.lat;
                    geo.lng = _this.lng;
                }
                localStorage.geolocationLat = _this.lat;
                localStorage.geolocationLng = _this.lng;
                localStorage.gsGeolocationYn = 'N';
                resolve(geo);
            }).catch(error => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        window.app.$gsdialog.alert("사용자가 위치정보 사용을 허용하지 않았습니다.\n위치 서비스를 허용하시고 재시도 해주세요.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        window.app.$gsdialog.alert("위치 정보 사용이 불가능합니다.\n위치 서비스를 허용하시고 재시도 해주세요.");
                        break;
                    case error.TIMEOUT:
                        window.app.$gsdialog.alert("위치 정보를 가져오려 시도했지만 시간이 초과되었습니다.\n위치 서비스를 허용하시고 재시도 해주세요.");
                        break;
                    case error.UNKNOWN_ERROR:
                        window.app.$gsdialog.alert("알 수 없는 오류가 발생하였습니다.\n위치 서비스를 허용하시고 재시도 해주세요.");
                        break;
                }
                reject(error);
            });
        } else {
            window.app.alert('사용자의 브라우저는 위치 정보를 제공하지 않습니다.\n위치 서비스를 허용하시고 재시도 해주세요.');
            return reject(error);
        }
    });
  },
  getPosition: function (options) {
      return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
  },
};

export default GeoUtils;
