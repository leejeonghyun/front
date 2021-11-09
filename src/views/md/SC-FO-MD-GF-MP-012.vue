<template>
  <div id="optionDefault" class="wrap-option-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
  <!-- <div id="deliveryDate" class="wrap-filter-layer" role="dialog" aria-modal="true" :class="{active : OptionModal.deliveryDate}"> -->
    <div class="option-popup-body">
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
      </div>
    </div>
  </div>
</template>

<script>
// import SelectedOptionList from '@/components/option/SelectedOptionList';개발용 실사용 컴포넌트.
import SelectedOptionList01 from '@/components/_temp/SelectedOptionList01';/* 검수용 컴포넌트 */
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupOptionDefault",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '기본형 단일상품 팝업 < 상품상세 < %s'
  },
  mixins: [LayPopupMixin],
  components: {
    // SelectedOptionList,개발용 실사용 컴포넌트
    SelectedOptionList01, // 검수용 컴포넌트
  },
  methods: {
  },
  mounted() {
    this.modalActiveEvent('optionDefault');
  }
};
</script>
