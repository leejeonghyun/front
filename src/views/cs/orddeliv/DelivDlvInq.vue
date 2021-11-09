<template>
  <!-- : 실사용 소스 -->
  <div id="popupTrackingShipping" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupTrackingShipping}, siteClass]">
    <div class="header-popup">
      <strong>배송조회</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup" style="height: 100%;">
        <iframe :src="apiUrl" width="100%" height="100%" frameborder="0"></iframe>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import CookieUtils from '@/common/CookieUtils';
  import Config from '@/common/Config.js';
  export default {
    name: "PopupTrackingShipping",
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '배송조회 < %s',
      meta: [
        {
          property: 'aa:page',
          content: '배송조회',
        },
      ],
    },
    props: {
      mbrDelivParamInfo: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        apiUrl: null,
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    components: {},
    methods: {
      popupAction() {
        this.$emit('popupEvent', 'popupTrackingShipping');
      },
    },
    mounted() {
      // https://b2c.goodsflow.com/zkm/V1/whereis/%7BsiteCode%7D/%7BuniqueCd%7D
      // /택배사코드 /송장번호
      let baseDomain = Config.server.VUE_APP_GOODSFLOW_API_SERVER;
      const mall = this.mbrDelivParamInfo.delivTypeCd == '03' ? 'GSTDS' : (this.mbrDelivParamInfo.mallId == '11' ? 'DALISALDA' : 'GSRETAIL');
      baseDomain += mall + '/' + this.mbrDelivParamInfo.dvdescDlvcoCd + "/" + this.mbrDelivParamInfo.dvdescDlvInvNo;
      this.apiUrl = baseDomain;
    }
  };
</script>
