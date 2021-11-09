<template>
  <div class="payment-caution">
    <div class="btn-del-area">
      <ul class="btn-area">
        <li><button type="button" :class="{active : isSelectAll}" @click="setAllChk">{{isSelectAll ? '전체선택' : '전체선택해제'}}</button></li>
        <li><button type="button" @click="deleteSoldoutBskt">품절 전체삭제</button></li>
        <li><button type="button" @click="selectedDeleteBskt">선택삭제</button></li>
      </ul>
    </div>
    <div class="txt-info">
      <div v-if="isVisible === 0">
        <p class="ico-alert2">상기 금액은 주문 결제 단계에서 장바구니 쿠폰, 카드할인 등 할인 수단 적용 시 결제 금액이 달라질 수 있습니다.</p>
        <p class="show-more"><button class="btn-more" type="button" @click="toggleLayer(1)">더보기</button></p>
      </div>
      <div v-if="isVisible === 1">
        <p class="ico-alert2">상기 금액은 주문 결제 단계에서 장바구니 쿠폰, 카드할인 등 할인 수단 적용 시 결제 금액이 달라질 수 있습니다.</p>
        <p class="ico-alert2">2019년 4월 1일 자원재활용법 시행에 따라 배송비 및 포장비에는 1회용 배달 봉투 환경부담금 100원이 포함됩니다.</p><!-- 5월 수정 : 당일배송 문구 삭제 -->
        <p class="ico-alert2">장바구니에 담긴 상품은 최대 30일까지 보관되며 종료되거나 매진될 경우 자동으로 삭제됩니다. </p>
        <p class="ico-alert2">당일 배송의 경우 픽업 시에도 무료배송기준 금액을 총족하지 못한  경우 배송비(쇼핑대행료)가 별도로 부과됩니다.</p>
        <p class="ico-alert2">선물하기는 택배 배송으로만 이용할 수 있습니다. (일부상품 제외)</p><!-- 9월 수정 문구 변경 -->
        <p class="show-more"><button class="btn-more active" type="button" @click="toggleLayer(0)">접기</button></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartFooterBtn",
  data() {
    return {
      isVisible: 0,
      isSelectAll: false,
    };
  },
  directives: {},
  mixins: [],
  components: {
  },
  methods: {
    toggleLayer(el) {
      this.isVisible = el;
      document.querySelector('.btn-more').focus();
    },
    setAllChk() {
      this.isSelectAll = !this.isSelectAll;
      this.$emit('setAllChk', this.isSelectAll);
    },
    selectedDeleteBskt() {
      this.$emit('selectedDeleteBskt');
    },
    deleteSoldoutBskt() {
      const $this = this;
      this.$gsdialog.confirm("품절 상품을 모두 삭제하시겠습니까?").then(function () {
        $this.$emit('deleteSoldoutBskt');
      });
    }
  },
  mounted() {
  },
};
</script>
