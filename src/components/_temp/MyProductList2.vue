<template>
  <div>
    <ul class="order-product-list">
      <!-- START : GS fresh -->
      <li>
        <dl>
          <dt>주문한 상품명이 노출되는 영역. 상품명 전체노출 최대 2줄까지 노출 가능</dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
              </figure>
            </a>
          </dd>
          <dd class="shop">GS fresh</dd>
          <dd class="option"><p class="option-info">옵션 : 중과 + 소과 혼합</p></dd>
          <dd class="count"><p class="option-info">수량 : 1개</p></dd>
          <dd class="list-price" aria-label="정상가격">
            <del>7,560</del>원
          </dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">6,480</span>
            <span class="unit-won">원</span>
            <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive"><span class="hidden">할인 안내</span></button>
          </dd>
        </dl>
        <div class="btn-bottom">
          <p class="btn-area">
            <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive">쿠폰변경</button>
          </p>
        </div>
      </li>
      <!-- END : GS fresh -->
      <!-- START : GS fresh -->
      <li>
        <dl>
          <dt>주문한 상품명이 노출되는 영역. 상품명 전체노출 최대 2줄까지 노출 가능</dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
              </figure>
            </a>
          </dd>
          <dd class="shop">GS fresh</dd>
          <dd class="option"><p class="option-info">옵션 : 중과 + 소과 혼합</p></dd>
          <dd class="count"><p class="option-info">수량 : 1개</p></dd>
          <dd class="list-price" aria-label="정상가격">
            <del>7,560</del>원
          </dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">6,480</span>
            <span class="unit-won">원</span>
            <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive"><span class="hidden">할인 안내</span></button>
          </dd>
        </dl>
      </li>
      <!-- END : GS fresh -->
    </ul>
    <div class="total-price-info">
      <p class="price-info">총 상품금액  19,800원 + 배송비 3,000원 = 22,800원</p>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "MyProductList2",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin, AccordionMixin],
  components: {
  },
  methods: {
    popupDiscountActive() {
      this.$emit('popupEvent', 'popupDiscountInfo');
    },
    popupCouponActive() {
      this.$emit('popupEvent', 'popupCouponList');
    },
    popupAction(type) { // 팝업 활성/비활성
      this.$emit('popupEvent', 'popupAddrList');
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
