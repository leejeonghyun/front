<template>
  <div></div>
</template>
<script>
  import loadScriptOnce from 'load-script-once';
  import Config from '@/common/Config.js';
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
          center: new kakao.maps.LatLng(37.50074112023049, 127.0363812901393), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
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
        marker.setMap(this.map);
        const _this = this;
        this.getAddress(this.map.getCenter(),
        function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // for (let i = 0; i < result.length; i++) {
                //     console.log("좌표 응답 주소 데이터", result[i]);
                // }
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
                _this.$emit('load', _this.map, _this.address);
            }
        });
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
