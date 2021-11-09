<template>
  <div>
    <div class="wrap-cart-footer">
      <!-- 4월 수정 START : 추가 -->
      <p class="total-check">
        <span class="inp-chk small bg">
          <input type="checkbox" name="maxBnftYn" id="maxBnftYn" v-model="propMaxBnftYn" @change="setMaxBnftAction">
          <label for="maxBnftYn">맞춤 혜택가 적용</label>
        </span>
        <button type="button" aria-label="맞춤 혜택가 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDiscountActive">
          <span class="hidden">맞춤 혜택가</span>
        </button>
      </p>
      <!-- 4월 수정 END : 추가 -->
      <!-- 8월 수정 START : 디자인 디벨롭 수정 사항 -->
      <ul class="btn-area">
        <li class="order">
          <a href="javascript:" class="btn-order" aria-haspopup="dialog" @click="vaildBsktAction">
            <strong class="total-price">{{(bsktInqRsltDto.totItemSprc + bsktInqRsltDto.totDlfee) - bsktInqRsltDto.totItemCpnDcAmt | currency}}원 주문하기</strong>
            <p class="price-info-txt">
              <span>총 {{bsktInqRsltDto.totItemCnt | currency}}개</span> <span>배송비 {{bsktInqRsltDto.totDlfee | currency}}원 포함</span>
            </p>
          </a>
        </li>
      </ul>
      <!-- 8월 수정 END : 디자인 디벨롭 수정 사항 -->
    </div>
    <!-- START : 맞춤혜택가 레이어 SC-FO-OD-GS-MP-042 -->
    <div id="popupCouponBenefit" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupCouponBenefit" aria-modal="true" :class="{active : this.popup.popupCouponBenefit}">
      <div class="layer-bg" @click="popupCloseAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>맞춤혜택가</h3>
          </div>
          <div class="layer-content">
            <ul class="list-dot">
              <li>할인율이 높은 쿠폰이 우선 적용됩니다. </li>
              <li>할인율이 동일한 경우, 쿠폰 유효기간 임박 순으로 적용됩니다.</li>
              <li>쿠폰 자동 적용은 고객님이 받을 수 있는 혜택을 맞춤혜택가로 추천해드리는 것이며, 맞춤 혜택가는 최대할인율로 적용되지 않을 수 있습니다.</li>
              <li>쿠폰이 여러 개인 경우, 직접 선택하여 쿠폰을 변경 할 수 있습니다.</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupCloseAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 맞춤혜택가 레이어 SC-FO-OD-GS-MP-042 -->
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';

import NumberUtils from '@/common/NumberUtils';
export default {
  name: "CartFooterOrder",
  props: {
    maxBnftYn: Boolean,
    bsktInqRsltDto: Object
  },
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupCouponBenefit: false,
      },
      propMaxBnftYn: this.maxBnftYn
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  components: {
  },
  methods: {
    popupDiscountAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    // 맞춤혜택가
    popupDiscountActive() {
      this.popupDiscountAction('popupCouponBenefit');
      this.modalActiveEvent('popupCouponBenefit');
    },
    popupCloseAction() {
      this.popupDiscountAction('popupCouponBenefit');
      this.modalActiveEvent('popupCouponBenefit');
    },
    // 주문서 이동 처리 함수 호출
    vaildBsktAction(type) {
      this.$emit('vaildBskt');
    },
    setMaxBnftAction() {
      // 장바구니 목록 정보 재좋
      this.$emit('setMaxBnft', this.propMaxBnftYn);
    },
    changeMaxBnftYn(maxBnftYn) {
      this.propMaxBnftYn = maxBnftYn;
      this.setMaxBnftAction();
    }
  },
  mounted() {
  },
};
</script>
