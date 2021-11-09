<template>
  <!-- : 실사용 소스 -->
  <div id="PopupDelivPlaceAdd" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupTrackingShipping}, siteClass]">
    <div class="header-popup">
      <strong>배송지 추가</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <DeliveryPlaceAdd @endEvent="endAction" />
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
  import DeliveryPlaceAdd from '@/components/mypage/DeliveryPlaceAdd';

  export default {
    name: "PopupDelivPlaceAdd",
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '배송지 추가 < %s',
      meta: [
        {
          property: 'aa:page',
          content: '배송지 추가',
        },
      ],
    },
    props: {
    },
    data() {
      return {
        apiUrl: null,
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    components: {
      DeliveryPlaceAdd,
    },
    methods: {
      popupAction() {
        this.$emit('popupEvent', 'popupDelivPlaceAdd');
        this.modalActiveEvent('popupDelivPlaceAdd');
      },
      endAction() {
        this.popupAction();
      },
    },
    mounted() {

    }
  };
</script>
