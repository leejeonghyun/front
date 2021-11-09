<template>
  <div id="popupOption" class="wrap-full-popup active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
  <!-- : 실사용 소스 -->
  <!-- <div id="popupOption" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupOption}"> -->
    <div class="header-popup">
      <strong>옵션 선택</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="option-content">
          <div class="selected-option-title">
            <strong aria-label="선택한 상품명">더건강한 그릴 비엔나 기획 200G*2봉</strong>
          </div>
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
          <div class="option-footer-info-txt">
            <p>
              <strong>N</strong>개 더 담으면 10% 추가 할인
            </p>
          </div>
          <div class="option-footer-btn">
            <button class="btn-bg darkgray btn-md">장바구니</button>
            <button class="btn-bg lightgreen btn-md">바로구매</button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
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
  name: "PopupSelectOptionTheMore",
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '다다익선 팝업 < 상품목록 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    // SelectedOptionList,개발용 실사용 컴포넌트
    SelectedOptionList01, // 검수용 컴포넌트
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupOption');
      this.modalActiveEvent('popupOption');
    },
  },
  mounted() {
    // 실사용 소스
    // this.modalActiveEvent('popupOption');
  }
};
</script>
