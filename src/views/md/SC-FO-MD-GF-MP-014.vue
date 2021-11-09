<template>
  <div id="optionDefault" class="wrap-option-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
  <!-- <div id="deliveryDate" class="wrap-filter-layer" role="dialog" aria-modal="true" :class="{active : OptionModal.deliveryDate}"> -->
    <div class="option-popup-body">
      <div class="option-content">
        <div class="selected-option-title">
          <strong aria-label="선택한 상품명">나이키 맨투맨 후드티</strong>
        </div>
        <button class="btn-select" @click="toggleOptionList(0)">
          <span>옵션1 선택</span>
        </button>
        <OptionList01 v-if="selectedOptionActive === 0" @optionUpdate="eventOptionUpdate" />
        <!-- :옵션 2는 옵션 1 선택 후 선택 가능 옵션 2의 default 값은 disabled="disabled" -->
        <button class="btn-select" @click="toggleOptionList(1)">
          <span>옵션2 선택</span>
        </button>
        <OptionList01 v-if="selectedOptionActive === 1" @optionUpdate="eventOptionUpdate" />
        <div class="option-add-list">
          <strong class="hidden">추가 옵션에서 선택한 리스트</strong>
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
// import OptionList from '@/components/_temp/OptionList'; 개발용 실사용 컴포넌트
import OptionList01 from '@/components/_temp/OptionList01';/* 검수용 컴포넌트 */
// import SelectedOptionList from '@/components/option/SelectedOptionList';개발용 실사용 컴포넌트
import SelectedOptionList01 from '@/components/_temp/SelectedOptionList01';/* 검수용 컴포넌트 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupSelectOption",
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선택형 옵션상품 팝업 < 상품목록 < %s'
  },
  data() {
    return {
      selectedOptionActive: -1,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    // OptionList,개발용 실사용 컴포넌트
    OptionList01, // 검수용 컴포넌트
    // SelectedOptionList,개발용 실사용 컴포넌트
    SelectedOptionList01, // 검수용 컴포넌트
  },
  methods: {
    // 추가 옵션 리스트 toggle
    toggleOptionList(id) {
      this.selectedOptionActive === id ? this.selectedOptionActive = -1 : this.selectedOptionActive = id;
    },
    // chage input value
    decreaseCount(event) {
      const $target = event.currentTarget;
      if ( $target.nextSibling.value > 0 ) {
        $target.nextSibling.value --;
      }
    },
    increaseCount(event) {
      const $target = event.currentTarget;
      if ( $target.previousSibling.value < 999 ) {
        $target.previousSibling.value ++;
      }
    },
    eventOptionUpdate(selectedValue) {
      event.target.parentNode.parentNode.previousSibling.childNodes[0].textContent = selectedValue;
      this.selectedOptionActive = -1;
    },
  },
  mounted() {
    // 실사용 소스
    this.modalActiveEvent('optionDefault');
  }
};
</script>
