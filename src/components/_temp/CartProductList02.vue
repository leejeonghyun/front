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
                    <input type="checkbox" name="" id="chkList02_01" value="" checked="checked">
                    <label for="chkList02_01">CJ 더 건강한 그릴 비엔나 기획200G*2봉</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="CJ 더 건강한 그릴 비엔나 기획200G*2봉">
                  </figure>
                </a>
              </dd>
              <dd class="option">
                <p class="option-info"><button type="button" aria-label="옵션 팝업활성화" aria-haspopup="dialog" @click="popupOptionActive">옵션 : 선택한 옵션명 노출</button></p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">달리살다</dd>
              <dd class="sale-price dalisalda" aria-label="판매가격">
                <span class="ico-badge">달리드림</span>
                <span class="number-sale-price">19,440</span>
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
        <!-- START : 달리살다 -->
        <li>
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList02_02" value="" checked="checked">
                    <label for="chkList02_02">[나투미] 유기농 귀리음료 오리지날</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_04.jpg" alt="[나투미] 유기농 귀리음료 오리지날">
                  </figure>
                </a>
              </dd>
              <dd class="option">
                <p class="option-info"><button type="button" aria-label="옵션 팝업활성화" aria-haspopup="dialog" @click="popupOptionActive">옵션 : 선택한 옵션명 노출</button></p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">달리살다</dd>
              <dd class="sale-price dalisalda" aria-label="판매가격">
                <span class="ico-badge">달리드림</span>
                <span class="number-sale-price">9,800</span>
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
                <button type="button" class="btn-border btn-keep" :class="{active: isKeepBtnArray[1]}" @click="activeKeepToggle(1)">{{ isKeepBtnArray[1] ? '보관해제' : '계속보관하기' }}</button>
              </p>
            </div>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : 달리살다 -->
        <!-- START : 심플리쿡 -->
        <li>
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList02_03" value="" checked="checked">
                    <label for="chkList02_03">심플리쿡) 백순대 볶음(2~3인분)</label>
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
                <p class="option-info">익일 도착예정</p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">심플리쿡</dd>
              <dd class="list-price" aria-label="정상가격">
                <del>12,840</del>원
              </dd>
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
                <button type="button" class="btn-border btn-keep" :class="{active: isKeepBtnArray[2]}" @click="activeKeepToggle(2)">{{ isKeepBtnArray[2] ? '보관해제' : '계속보관' }}</button>
              </p>
            </div>
          </div>
          <div class="simplycook-option">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList02_04" value="" class="" checked="checked">
                    <label for="chkList02_04">당면 사리</label>
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
              <dd><button type="button" class="btn-del"><span class="hidden">삭제</span></button></dd>
            </dl>
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList02_05" value="" class="" checked="checked">
                    <label for="chkList02_05">시금치수제비</label>
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
              <dd><button type="button" class="btn-del"><span class="hidden">삭제</span></button></dd>
            </dl>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : 심플리쿡 -->
      </ul>
      <div class="total-price-info">
        <p class="price-info">총 상품금액 27,480원 + 배송비 0원 = 29,980원</p>
      </div>
    </div>
    <!-- START : 품절일 경우 -->
    <div class="wrap-border">
      <ul class="cart-product-list">
        <!-- START : GS fresh -->
        <li class="disabled">
          <div class="inner">
            <p class="txt-soldout">품절</p>
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="soldout01_01" value="" disabled="disabled">
                    <label for="soldout01_01">엔네이처 빅그릴비엔나 260G+260G기획</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <figure>
                  <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
                </figure>
              </dd>
              <dd class="shop">GS fresh</dd>
              <dd class="btn-disabled-area">
                <button type="button" class="btn-border-small" aria-label="입고알림 팝업활성화" aria-haspopup="dialog" @click="popupConfirmActive">입고 알림</button>
                <!-- <button type="button" class="btn-border-small active">입고 해제</button>  --> <!-- 입고알림 상태 변경 -->
                <button type="button" class="btn-border-small" aria-label="유사상품 팝업활성화" aria-haspopup="dialog" @click="popupSimilarityActive">유사상품 보기</button>
              </dd>
            </dl>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : GS fresh -->
      </ul>
    </div>
    <!-- END : 품절일 경우 -->
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "CartProductList02",
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
    // change value
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
    popupOptionActive() {
      this.$emit('popupEvent', 'popupOptionList');
    },
    popupDiscountActive() {
      this.$emit('popupEvent', 'popupDiscountInfo');
    },
    popupCouponActive() {
      this.$emit('popupEvent', 'popupCouponList');
    },
    popupConfirmActive() {
      this.$emit('popupEvent', 'popupAlert');
    },
    popupSimilarityActive() {
      this.$emit('popupEvent', 'popupSimilarity');
    },
  },
  mounted() {
  },
};
</script>
