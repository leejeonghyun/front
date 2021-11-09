<!--
Design: views/ss/SC-FO-SS-GF-MM-900.vue
Pg id: PG-FO-CU-O042
Uri: /cu/my_page_sub_main
-->
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
            <ul class="selected-option-list">
              <li>
                <dl>
                  <dt aria-label="추가로 선택한 옵션">
                    <p class="tit">CJ 더건강한 그릴 비엔나 기획 200G*2봉</p>
                  </dt>
                  <dd class="option-number">
                    <button type="button" class="btn-minus" @click="decreaseCount">
                      <span class="hidden">선택수량 빼기</span>
                      </button>
                    <input type="number" value="1" class="txt-number" title="선택 수량">
                    <button type="button" class="btn-plus" @click="increaseCount">
                      <span class="hidden">선택수량 더하기</span>
                    </button>
                  </dd>
                  <dd class="list-price" aria-label="정상가격"><!-- :할인가 없으면 전체 hidden -->
                    <del>34,800</del>원
                  </dd>
                  <dd class="sale-price" aria-label="판매가격">
                    <span class="number-sale-price">
                      <strong>7,560</strong>원
                    </span>
                  </dd>
                  <button type="button" class="btn-del"><span class="hidden">삭제</span></button>
                </dl>
              </li>
            </ul>
          </div>
        </div>
        <!-- 수정 START : 2020.02.26 달리살다 달리;드림패스 무료신청 배너 추가 -->
        <!-- <div class="option-banner">
          <a href="#" class="btn free-90days">달리;드림패스[90일 무료 신청] <span>즉시 5,000원 할인</span></a>
        </div> -->
        <!-- 수정 END : 2020.02.26 달리살다 달리;드림패스 무료신청 배너 추가-->
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
    <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
// import SelectedOptionList from '@/components/option/SelectedOptionList'; /* 개발용 실사용 컴포넌트 */
// import SelectedOptionList01 from '@/components/_temp/SelectedOptionList01';/* 검수용 컴포넌트 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupItemListDefault",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    // SelectedOptionList, // 개발용 실사용 컴포넌트
    // SelectedOptionList01, // 검수용 컴포넌트
  },
  props: {
    relatedItem: Object
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupOption');
      this.modalActiveEvent('popupOption');
    },
    // chage value
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
  },
  mounted() {
    this.modalActiveEvent('popupOption');
  }
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
