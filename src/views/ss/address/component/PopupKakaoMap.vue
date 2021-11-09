<!--
Design: views\ss\SC-FO-SS-GF-MP-870.vue
Pg id: PG-FO-SS-O017
Uri: /sample/address_sample
-->
<template>
  <!-- 재배포. 팝업이 붙는 페이지 최상단에 몰 구분 class 가 있어야 함 -->
  <div id="popupKakaoMap" class="wrap-full-popup active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <div class="header-popup">
      <h2>주소검색</h2>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="wrap-map">
        <KakaoMap ref="kakaoApi"
                  :appKey="appKey"
                  :markerDraggable="markerDraggable"
                  :center.sync="center"
                  :level.sync="level"
                  :mapTypeId="mapTypeId"
                  :libraries="libraries"
                  @load="onLoad"
                  style="width:100%;height:100%;"
              />
      </div>
      <div class="wrap-map-address">
         <dl v-show="hasZonecode">
          <dt>도로명</dt>
          <dd>{{ address.road }}</dd>
          <dt>지번</dt>
          <dd>{{ address.jibun }}</dd>
        </dl>
        <!-- START: 결과없음 케이스 -->
        <div class="map-address-nolist" v-show="!hasZonecode">
          <p>현재 위치는 도로명 주소 검색이 되지 않습니다.<br/>위치를 다시 설정하거나, 검색해서 주소를 찾아주세요.</p>
          <button class="btn-map-search" @click="callback">
            <span class="hidden">검색 팝업 열기</span>
          </button>
        </div>
        <div class="wrap-map-iframe" :hidden="mapIframe" :class="{active : mapIframe}">
          <div class="map-iframe scroll-area">
            Kakao API<br/>
          </div>
          <button class="layer-bg" @click="mapIframe = false">
            <span>주소 검색 레이어 팝업 닫기</span>
          </button>
        </div>
        <!-- END : 결과없음 케이스 -->
      </div>
      <!-- START : 하단 버튼 -->
      <div class="bottom-fixed-btn-area" >
        <button type="button" class="btn-bg btn-lg lightgreen"  :disabled=!hasZonecode @click="callback"><span>이 위치로 주소설정</span></button>
      </div>
      <!-- END : 하단 버튼 -->
    </div>
    <button class="btn-layer-close" @click="popupCloseAction('popupKakaoMap')" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import KakaoMap from "./KakaoMap";
  import Config from "@/common/Config.js";
  import CookieUtils from '@/common/CookieUtils';
  export default {
    name: "PopupKakaoMap",
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '현 위치로 주소 검색< 주소검색 팝업 < 마이페이지 < %s'
    },
    props: {
      type: null,
      paramY: {required: true},
      paramX: {required: true},
      markerDraggable: {type: Boolean, default: false, required: false},
    },
    watch: {
      paramX: function (value) {
        this.center.lat = value;
        this.$refs.kakaoApi.setMarker();
      },
      paramY: function (value) {
        this.center.lng = value;
        this.$refs.kakaoApi.setMarker();
      },
    },
    data() {
      return {
        mapIframe: false,
        appKey: Config.address.kakao.appKey,
        center: {lat: 0, lng: 0},
        level: 3,
        mapTypeId: KakaoMap.MapTypeId.NORMAL,
        libraries: [],
        mapObject: null,
        address: {
          jibun: undefined,
          road: undefined,
          zonecode: undefined
        },
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    methods: {
      onLoad (map, address) {
        this.mapObject = map;
        this.address = address;
      },
      onMapEvent (event, params) { // 이벤트 필요시 확장
        if (`${event}` == "click") {
        }
      },
      callback() {
        this.$emit('callbackAddressMap', this.address);
      },
      popupCloseAction() {
        this.$emit('popupEvent', 'popupKakaoMap');
      },
    },
    components: {KakaoMap},
    created() {
      this.center = {lat: this.paramX, lng: this.paramY}; // 재배포
    },
    mounted() {

    },
    computed: {
      hasZonecode() {
        if (this.address.zonecode && this.address.jibun && this.address.road ) {
          return true;
        } else {
          return false;
        }
      }
    },
  };
</script>
