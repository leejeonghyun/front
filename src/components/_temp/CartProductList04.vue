<template>
  <div class="list-content">
    <div class="wrap-border">
      <ul class="cart-product-list">
        <!-- START : GS fresh -->
        <li>
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList04_01" value="" checked="checked">
                    <label for="chkList04_01">대나무-금화소(전국)</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_05.jpg" alt="대나무-금화소(전국)">
                  </figure>
                </a>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">GS fresh</dd>
              <dd class="sale-price" aria-label="정상가격">
                <span class="number-sale-price">60,000</span>
                <span class="unit-won">원</span>
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
        <li>
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList04_02" value="" checked="checked">
                    <label for="chkList04_02">프리저브드 꽃다발(전국)</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_06.jpg" alt="프리저브드 꽃다발(전국)">
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
                <del>58,000</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">54,000</span>
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
                <button type="button" class="btn-border btn-keep" :class="{active: isKeepBtnArray[1]}" @click="activeKeepToggle(1)">{{ isKeepBtnArray[1] ? '보관해제' : '계속보관' }}</button>
              </p>
            </div>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : GS fresh -->
      </ul>
      <div class="total-price-info">
        <p class="price-info">총 상품금액 114,000원 + 배송비 0원 = 114,000원</p>
        <button type="button" class="btn-go-today" aria-label="추천상품 팝업 활성화" aria-haspopup="dialog" @click="popupRecommendActive"><span>한국 온라인 꽃배달 네트워크 상품 더보기</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "CartProductList04",
  data() {
    return {
      isKeepBtnArray: [],
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
      this.$emit('popupEvent', 'popupParcelDelivery2');
    }
  },
  mounted() {
  },
};
</script>
