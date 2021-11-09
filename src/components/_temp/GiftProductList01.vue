<template>
  <div class="list-content">
    <ul class="cart-product-list">
      <li>
        <dl>
          <dt>
            <p class="tit">
              <span class="inp-chk">
                <input type="checkbox" name="" id="chkList01_01" value="" checked="checked">
                <label for="chkList01_01">일리윤 히알루론 모이스춰 수분크림</label>
              </span>
            </p>
          </dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_gift01.jpg" alt="일리윤 히알루론 모이스춰 수분크림">
              </figure>
            </a>
          </dd>
          <dd class="option-number">
            <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
            <input type="number" name="" value="1" class="txt-number" title="선택 수량">
            <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
          </dd>
          <dd class="shop">GS fresh</dd>
          <dd class="list-price" aria-label="정상가격">
            <del>33,000</del>원
          </dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">30,000</span>
            <span class="unit-won">원</span>
            <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive"><span class="hidden">할인 안내</span></button>
          </dd>
        </dl>
        <div class="btn-bottom">
          <ul class="product-info">
            <li>무료배송</li>
            <li>1인 N개 한정</li>
            <li>카드할인</li>
            <li>더블쿠폰</li>
          </ul>
          <p class="btn-area">
            <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive">쿠폰변경</button>
          </p>
        </div>
      </li>
      <li>
        <dl>
          <dt>
            <p class="tit">
              <span class="inp-chk">
                <input type="checkbox" name="" id="chkList01_02" value="" checked="checked">
                <label for="chkList01_02">고메 크리스피 핫도그 6입</label>
              </span>
            </p>
          </dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_gift02.jpg" alt="고메 크리스피 핫도그 6입">
              </figure>
            </a>
          </dd>
          <dd class="option-number">
            <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
            <input type="number" name="" value="1" class="txt-number" title="선택 수량">
            <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
          </dd>
          <dd class="shop">GS fresh</dd>
          <dd class="list-price" aria-label="정상가격">
            <del>6,900</del>원
          </dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">5,900</span>
            <span class="unit-won">원</span>
            <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog" @click="popupDiscountActive"><span class="hidden">할인 안내</span></button>
          </dd>
        </dl>
        <div class="btn-bottom">
          <ul class="product-info">
            <li>무료배송</li>
            <li>1인 N개 한정</li>
            <li>카드할인</li>
            <li>더블쿠폰</li>
          </ul>
          <p class="btn-area">
            <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive">쿠폰변경</button>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "GiftProductList01",
  data() {
    return {
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupDiscountActive() {
      this.$emit('popupEvent', 'popupDiscountInfo');
    },
    popupCouponActive() {
      this.$emit('popupEvent', 'popupCouponList');
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
  },
};
</script>
