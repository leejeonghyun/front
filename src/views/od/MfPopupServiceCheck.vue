<!--
views/pa/SC-FO-PA-MF-MP-006
-->
<template>
  <div id="popupServiceCheck" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupServiceCheck}">
    <div class="header-popup">
      <strong>서비스 가입사실 확인</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="full-popup-inner">
         <p><img src="@/assets/images/img/service_paper.png" alt="지급보증서"></p>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupServiceCheck",
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '배송비/장바구니 쿠폰 < %s'
  },
  components: {
  },
  // 5월수정 : 셀렉트 추가
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupServiceCheck');
      this.modalActiveEvent('popupServiceCheck');
    },
  },
  mounted() {
    this.modalActiveEvent('popupServiceCheck');
  }
};
</script>
