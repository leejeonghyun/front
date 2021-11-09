<template>
  <div></div>
</template>

<script>
  import loadScriptOnce from 'load-script-once';
  import Config from '@/common/Config.js';
  import CookieUtils from '@/common/CookieUtils';
  const MapTypeId = {
    "ROADMAP": 1,
    "NORMAL": 1,
    "SKYVIEW": 2,
    "HYBRID": 3,
    "OVERLAY": 4,
    "ROADVIEW": 5,
    "TRAFFIC": 6,
    "TERRAIN": 7,
    "BICYCLE": 8,
    "BICYCLE_HYBRID": 9,
    "USE_DISTRICT": 10
  };
  const EVENTS = [
    'center_changed',
    'zoom_start',
    'zoom_changed',
    'bounds_changed',
    'click',
    'dblclick',
    'rightclick',
    'mousemove',
    'dragstart',
    'drag',
    'dragend',
    'idle',
    'tilesloaded',
    'maptypeid_changed'
  ];
  export default {
    name: "KakaoMap",
    props: {
      appKey: {
        type: String,
        required: true
      },
      libraries: {
        type: Array,
        default: () => []
      },
      center: {
        type: Object,
        required: true
      },
      level: {
        type: Number,
        default: undefined
      },
      mapTypeId: {
        type: Number,
        default: undefined
      },
      draggable: {
        type: Boolean,
        default: undefined
      },
      scrollwheel: {
        type: Boolean,
        default: undefined
      },
      disableDoubleClick: {
        type: Boolean,
        default: undefined
      },
      disableDoubleClickZoom: {
        type: Boolean,
        default: undefined
      },
      projectionId: {
        type: String,
        default: undefined
      },
      tileAnimation: {
        type: Boolean,
        default: undefined
      },
      keyboardShortcuts: {
        type: [Boolean, Object],
        default: undefined
      },
      bus: {
        type: Object,
        default: undefined
      }
    },
    data: () => ({
      map: null,
      geocoder: null,
      address: {
        jibun: undefined,
        road: undefined,
        zonecode: undefined
      }
    }),
    created() {
      this.bus.$on('setDelivPosit', this.setDelivPosit);
      this.bus.$on('goPosit', this.goPosit);
      this.bus.$on('setMapLevel', this.setMapLevel);
      this.bus.$on('autoMapLevel', this.setDelivPosit);
    },
    mounted () {
      loadScriptOnce(Config.address.kakao.apiUrl+`?autoload=false&appkey=${this.appKey}&libraries=services`)
        .then(() => {
          kakao.maps.load(() => {
            this.render();
            this.bindEvents();
            this.setMarker(); // 마커 생성
            this.$emit('load', this.map, this.address);
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    watch: {
      level () {
        if (!this.map) {
          return;
        }
        console.log('this.level', this.level);
        this.map.setLevel(this.level);
      },
      center: {
        handler () {
          if (!this.map) {
            return;
          }
          this.map.setCenter(new kakao.maps.LatLng(this.center.lat, this.center.lng));
        },
        deep: true
      }
    },
    methods: {
      render () {
        const options = {
          center: new kakao.maps.LatLng(this.center.lat, this.center.lng),
          level: this.level,
          mapTypeId: this.mapTypeId,
          draggable: this.draggable,
          scrollwheel: this.scrollwheel,
          disableDoubleClick: this.disableDoubleClick,
          disableDoubleClickZoom: this.disableDoubleClickZoom,
          projectionId: this.projectionId,
          tileAnimation: this.tileAnimation,
          keyboardShortcuts: this.keyboardShortcuts
        };
        this.map = new kakao.maps.Map(this.$el, options);
        this.geocoder = new kakao.maps.services.Geocoder();
      },
      bindEvents () {
        const handlers = {
          bounds_changed: this.onChange,
          idle: this.onChange
        };
        for (const event of EVENTS) {
          this.bindEvent(event, handlers[event]);
        }
      },
      bindEvent (event, handler) {
        kakao.maps.event.addListener(this.map, event, (...args) => {
          this.$emit(event, args);
          if (typeof handler === 'function') {
            handler();
          }
        });
      },
      onChange () {
        const level = this.map.getLevel();
        const latlng = this.map.getCenter();
        this.$emit('update:level', level);
        this.$emit('update:center', {
          lat: latlng.getLat(),
          lng: latlng.getLng()
        });
      },
      setMarker () {
        // 현위치로 마커 고정
        const markerPosition = new kakao.maps.LatLng(this.center.lat, this.center.lng);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        // marker.setMap(this.map);
        const _this = this;
        this.getAddress(this.map.getCenter(),
        function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                if (result[0].address) {
                  _this.address.jibun = result[0].address ? result[0].address.address_name : "";
                  if (result[0].address.zip_code ) {
                    _this.address.zonecode = result[0].address.zip_code;
                  }
                }
                if (result[0].road_address) {
                  _this.address.road = result[0].road_address ? result[0].road_address.address_name : "";
                  if (result[0].road_address.zone_no ) {
                    _this.address.zonecode = result[0].road_address.zone_no;
                  }
                }
                // _this.$emit('load', _this.map, _this.address);
            }
        });
      },
      // 지도확대레벨 셋팅
      autoMapLevel(paramPositList) {
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체
        const bounds = new kakao.maps.LatLngBounds();
        for (const row of paramPositList) {
          const markerPosition = new kakao.maps.LatLng(row.latt, row.lont); // 마커가 표시될 위치
          bounds.extend(markerPosition);
        }
        this.map.setBounds(bounds);
      },
      // 지도확대레벨 셋팅
      setMapLevel(lvl) {
        this.map.setLevel(lvl);
      },
      // 지도 중심을 차량위치로 이동
      goPosit(paramPosit) {
        const markerPosition = new kakao.maps.LatLng(paramPosit.latt, paramPosit.lont); // 마커가 표시될 위치
        this.map.panTo(markerPosition);
      },
      // 좌표정보를 이용하여 지도 위치 셋팅, 마커 셋팅 처리
      setDelivPosit(paramPositList) {
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체
        const bounds = new kakao.maps.LatLngBounds();
        let startMakerPosition = null;
        for (const row of paramPositList) {
          const markerPosition = new kakao.maps.LatLng(row.latt, row.lont); // 마커가 표시될 위치(latitude Number : 위도, longitude Number : 경도)
          // 마커를 생성
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            // image: markerImage // 마커이미지 설정
          });
          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(this.map);
          const content = row.positNm;
          // 커스텀 오버레이가 표시될 위치입니다
          const position = new kakao.maps.LatLng(row.latt, row.lont); // latitude Number : 위도, longitude Number : 경도
          // 커스텀 오버레이를 생성합니다
          const customOverlay = new kakao.maps.CustomOverlay({
              map: this.map,
              position: position,
              content: content,
              yAnchor: 1
          });
          // LatLngBounds 객체에 좌표추가
          bounds.extend(markerPosition);
          if (row.positGb == "1") {
            startMakerPosition = markerPosition;
          }
        }
        // 지도 중심을 차량위치로 이동처리
        this.map.panTo(startMakerPosition);
        // this.map.setBounds(bounds);
      },
      getAddress(coords, callback) {
        this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      },
    },
    MapTypeId: MapTypeId
  };

</script>

<style scoped>
</style>
