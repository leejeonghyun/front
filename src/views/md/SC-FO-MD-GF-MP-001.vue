<template>
  <div id="popupOption" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupOption}, siteClass]">
    <div class="header-popup">
      <strong>옵션 선택</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="option-content">
          <div class="option-add-list">
            <strong class="hidden">옵션에서 선택한 리스트</strong>
            <SelectedOptionList01 />
          </div>
        </div>
        <div class="option-footer">
          <div class="option-total-price">
            <span class="total-title" aria-label="옵션가를 포함한"><strong>총 상품금액</strong></span>
            <span class="total-price"><strong>199,460</strong>원</span>
          </div>
          <div class="option-footer-btn">
            <button class="btn-bg darkgray btn-md">장바구니</button>
            <button class="btn-bg lightgreen btn-md">바로구매</button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
// import SelectedOptionList from '@/components/option/SelectedOptionList';개발용 실사용 컴포넌트
import SelectedOptionList01 from '@/components/_temp/SelectedOptionList01';/* 검수용 컴포넌트 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupItemListDefault",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '기본형 단일상품 팝업 < 상품목록 < %s'
  },
  components: {
    // SelectedOptionList,개발용 실사용 컴포넌트
    SelectedOptionList01, // 검수용 컴포넌트.
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupOption');
      this.modalActiveEvent('popupOption');
    },
  },
  mounted() {
    this.modalActiveEvent('popupOption');
  }
};
</script>
