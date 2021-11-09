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
                    <input type="checkbox" name="" id="chkList12_01" value="" checked="checked">
                    <label for="chkList12_01">{{ product.name }}</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_08.jpg" :alt="product.name">
                  </figure>
                </a>
              </dd>
              <dd class="option">
                <p class="option-info"><button type="button" aria-label="도착 예정일 선택 팝업 활성화" aria-haspopup="dialog" @click="popupDateActive">{{ product.deliveryDate }}</button></p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">GS fresh</dd>
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
            <p class="reservation-count">사전예약 <strong>D-3</strong> 현재 <strong>321명</strong> 예약 완료</p>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : GS fresh -->
        <!-- START : GS fresh -->
        <li>
          <div class="inner">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList12_02" value="" checked="checked">
                    <label for="chkList12_02">55%할인 하기스 매직팬티 8팩 기획전</label>
                  </span>
                </p>
              </dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_08.jpg" alt="55%할인 하기스 매직팬티 8팩 기획전">
                  </figure>
                </a>
              </dd>
              <dd class="option">
                <p class="option-info"><button type="button" aria-label="도착 예정일 선택 팝업 활성화" aria-haspopup="dialog" @click="popupDateActive">11/09(토) 도착예정</button></p>
              </dd>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="shop">GS fresh</dd>
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
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : GS fresh -->
        <!-- START : 심플리쿡 -->
        <li>
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk">
                  <input type="checkbox" name="" id="chkList06_01" value="" checked="checked">
                  <label for="chkList06_01">심플리쿡) 백순대 볶음(2~3인분)</label>
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
              <p class="option-info"><button type="button" aria-label="도착 예정일 선택 팝업 활성화" aria-haspopup="dialog" @click="popupSimplycookOptionActive">11/09(토) 도착예정</button></p>
              <p class="option-info">옵션 : 2~3인분</p>
            </dd>
            <dd class="option-number">
              <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
              <input type="number" name="" value="1" class="txt-number" title="선택 수량">
              <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
            </dd>
            <dd class="shop">심플리쿡</dd>
            <dd class="list-price">
              <del aria-label="정상가격">12,840</del>원
            </dd>
            <dd class="sale-price">
              <span class="number-sale-price" aria-label="판매가격">8,000</span>
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
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : 심플리쿡 -->
        <li>
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk">
                  <input type="checkbox" name="" id="soldout01_01" value="">
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
            <dd class=txt-thanks>
              선택한 배송일이 마감되었습니다.
              <button type="button" aria-label="입고알림 팝업활성화" aria-haspopup="dialog" class="btn-border-small re-cart">다시담기</button>
            </dd>
          </dl>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
      </ul>
      <div class="total-price-info">
        <p class="price-info">총 상품금액 90,680원 + 배송비 0원 = 90,680원</p>
      </div>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "CartProductList06",
  data() {
    return {
      product: {
        name: '55%할인 하기스 매직팬티 8팩 기획전',
        imagePath: '@/assets/images/_temp/_img_cart01_08.jpg',
        deliveryDate: '11/09(토) 도착예정'
      }
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
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
    popupDiscountActive() {
      this.$emit('popupEvent', 'popupDiscountInfo');
    },
    popupCouponActive() {
      this.$emit('popupEvent', 'popupCouponList');
    },
    popupDateActive() {
      this.$emit('popupEvent', 'popupDateSelect');
    },
    popupSimplycookOptionActive() {
      this.$emit('popupEvent', 'popupOptionDate');
    }
  },
  mounted() {
  },
};
</script>
