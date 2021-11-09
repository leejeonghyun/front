<template>
  <div class="list-content">
    <div class="wrap-border">
      <ul class="cart-product-list">
        <!-- START : 달리살다 -->
        <li>
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList05_01" value="" checked>
                    <label for="chkList05_01">KING Premiun 프롤린 모유 유산균</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_07.jpg" alt="KING Premiun 프롤린 모유 유산균">
                  </figure>
                </a>
              </dd>
              <dd class="option">
                <p class="option-info">1인 6개 한정</p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="10" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">달리살다</dd>
              <dd class="sale-price dalisalda" aria-label="정상가격">
                <span class="ico-badge">달리드림</span>
                <span class="number-sale-price">31,800</span>
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
                <button type="button" class="btn-border btn-keep" :class="{active: isKeepBtnArray[0]}" @click="activeKeepToggle(0)">{{ isKeepBtnArray[0] ? '보관해제' : '계속보관' }}</button>
              </p>
            </div>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : 달리살다 -->
      </ul>
      <div class="total-price-info">
        <p class="price-info">총 상품금액 36,500원 + 배송비 10,000원 = 46,500원</p>
        <button type="button" class="btn-go-today" aria-label="추천상품 팝업 활성화" aria-haspopup="dialog" @click="popupRecommendActive"><span>해외직구 상품<strong>1,540원 더 담고</strong> 무료배송 받기</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "CartProductList05",
  data() {
    return {
      isKeepBtnArray: [true],
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    activeKeepToggle(index) {
      if (this.isKeepBtnArray[index] === true) {
        this.$set(this.isKeepBtnArray, index, false);
      } else {
        this.$set(this.isKeepBtnArray, index, true);
      }
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
    popupDiscountActive() {
      this.$emit('popupEvent', 'popupDiscountInfo');
    },
    popupCouponActive() {
      this.$emit('popupEvent', 'popupCouponList');
    },
    popupRecommendActive() {
      this.$emit('popupEvent', 'popupOverseasDelivery');
    }
  },
  mounted() {
  },
};
</script>
