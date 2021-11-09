<!--
views/od/SC-FO-PA-GS-MP-005
-->
<template>
  <!-- START : 위치보기 레이어 -->
  <div id="popupPickupMap" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupPickupMap" aria-modal="true" :class="[{active : this.modalActive.popupPickupMap}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box pickup-map">
        <div class="title">
          <h3>{{strInfoMap.pkuppNm}}</h3>
        </div>
        <div class="layer-content">
          <div class="map-area" id="dmap"></div>
          <div class="receive-delivery-info">
            <div class="my-address">
              <p class="store-name">{{strInfoMap.pkuppNm}}</p>
              <p class="store-addr">
                <span class="code">[{{strInfoMap.pkuppZipcd}}]</span>
                <em>{{strInfoMap.pkuppStnmAddr}} {{strInfoMap.pkuppStnmDtlAddr}}</em>
              </p>
              <p>
                <span class="ico-tel">
                  <a v-bind:href="'tel:' + strInfoMap.pkuppTelNo" title="전화걸기">{{strInfoMap.pkuppTelNo}}</a>
                </span>
              </p>
              <!-- edit: 전화번호 연결 추가 -->
            </div>
          </div>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 위치보기 레이어 -->
</template>

<script>
import postscribe from 'postscribe';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import kakaoMap from '@/common/od/kakaoMap';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    strInfoMap: Object,
  },
  name: 'PopupPickupMap',
  data() {
    return {
      posit: null,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupPickupMap');
      this.modalActiveEvent('popupPickupMap');
    },
    drawMap() {
      kakaoMap.drawMap(this.strInfoMap, 'dmap');
      // const posit = kakaoMap.gpsIpSearch();
      // console.log("searchinfo", posit);
      // console.log("위도: " + posit.coords.latitude);
      // console.log("경도: " + position.coords.longitude);
    },
  },
  mounted() {
    postscribe('#dmap', '<script src="//dapi.kakao.com/v2/maps/sdk.js?autoload=true&appkey=eba6b90fece7e24e6b01d50c1dc3cd82&libraries=services"><\/script>');
    // postscribe('#dmap', '<script src="//dapi.kakao.com/v2/maps/sdk.js?autoload=true&appkey='+kakaoMap.kakaoMapAccessKey+'&libraries=services"><\/script>');
    this.modalActiveEvent('popupPickupMap');
    this.drawMap();
  },
};
</script>
