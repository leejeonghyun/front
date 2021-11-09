<template>
  <div class="list-content">
    <div class="wrap-border">
      <ul class="cart-product-list">
        <!-- START : 심플리쿡 -->
        <li>
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList03_01" value="" checked="checked">
                    <label for="chkList03_01">심플리쿡) 백순대 볶음(2~3인분)</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_03.jpg" alt="심플리쿡) 백순대 볶음(2~3인분)">
                  </figure>
                </a>
              </dd>
              <dd class="option">
                <p class="option-info">영업일 기준 2~5일</p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">심플리쿡</dd>
              <dd class="list-price" aria-label="정상가격"><del>12,840</del>원 </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">8,000</span>
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
          <div class="simplycook-option">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList03_02" value="" class="" checked="checked">
                    <label for="chkList03_02">당면 사리</label>
                  </span>
                </p>
              </dt>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">500</span>
                <span class="unit-won">원</span>
              </dd>
              <dd><button type="button" class="btn-del"><span class="hidden">옵션 삭제</span></button></dd>
            </dl>
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList03_03" value="" class="" checked="checked">
                    <label for="chkList03_03">시금치수제비</label>
                  </span>
                </p>
              </dt>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">1,000</span>
                <span class="unit-won">원</span>
              </dd>
              <dd><button type="button" class="btn-del"><span class="hidden">옵션 삭제</span></button></dd>
            </dl>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : 심플리쿡 -->
      </ul>
      <div class="total-price-info">
        <p class="price-info">총 상품금액 18,500원 + 배송비 3,000원 = 21,500원</p>
        <button type="button" class="btn-go-today" aria-label="추천상품 팝업 활성화" aria-haspopup="dialog" @click="popupRecommendActive"><span>심플리쿡 <strong>8,500원 더 담고</strong> 무료배송 받기</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "CartProductList03",
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
    popupDateActive() {
      this.$emit('popupEvent', 'popupDateSelect');
    },
    popupRecommendActive() {
      this.$emit('popupEvent', 'popupParcelDelivery');
    }
  },
  mounted() {
  },
};
</script>
