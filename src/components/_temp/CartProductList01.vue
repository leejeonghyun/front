<template>
  <div class="list-content">
    <div class="wrap-border">
      <ul class="cart-product-list">
        <!-- START : GS fresh -->
        <li>
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk">
                  <input type="checkbox" name="" id="chkList01_01" value="" checked="checked">
                  <label for="chkList01_01">엔네이처 빅그릴비엔나 260G+260G기획</label>
                </span>
              </p>
            </dt>
            <dd class="thumb">
              <a href="#">
                <figure>
                  <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
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
            <dd class="shop">GS 프레시몰</dd>
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
              <button type="button" class="btn-border btn-keep" :class="{active: isKeepBtnArray[0]}" @click="activeKeepToggle(0)">{{ isKeepBtnArray[0] ? '보관해제' : '계속보관하기' }}</button>
            </p>
          </div>
          <div class="go-shopping">
            <p>증정 사은품 : 코카콜라 190ML</p><button type="button" class="btn-go" aria-label="사은품 변경 팝업 활성화" aria-haspopup="dialog" @click="popupSingleOptionActive">사은품변경</button>
          </div>
          <div class="go-shopping">
            <p>증정 사은품: 코카콜라 190ML 증정 X 1 ,치즈 비엔나 100G 증정 X1</p><button type="button" class="btn-go" aria-label="사은품 변경 팝업 활성화" aria-haspopup="dialog" @click="popupDoubleOptionActive">사은품변경</button>
          </div>
          <!-- 옵션변경 없는 경우 -->
          <div class="go-shopping txt">
            <p>증정 사은품 : 코카콜라 190ML</p>
          </div>
          <!-- // 옵션변경 없는 경우 -->
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : GS fresh -->
        <!-- START : GS fresh 2+1 -->
        <li>
          <ul class="plus-product">
            <li>
              <dl>
                <dt>
                  <p class="tit">
                    <span class="inp-chk">
                      <input type="checkbox" name="" id="chkList01_02" value="" checked="checked">
                      <label for="chkList01_02">빙그레 따옴 자몽쥬스 220ML</label>
                    </span>
                  </p>
                </dt>
                <dd class="thumb">
                  <span aria-label="혜택" class="ico-benefit plus">2+1</span>
                  <a href="#">
                    <figure>
                      <img src="@/assets/images/_temp/_img_cart01_02.jpg" alt="빙그레 따옴 자몽쥬스 220ML">
                    </figure>
                  </a>
                </dd>
                <dd class="option-number">
                  <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                  <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                  <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
                </dd>
                <dd class="shop">GS 프레시몰</dd>
                <dd class="list-price" aria-label="정상가격">
                  <del>4,000</del>원
                </dd>
                <dd class="sale-price" aria-label="판매가격">
                  <span class="number-sale-price">3,400</span>
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
              <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
            </li>
            <li>
              <div class="inner">
                <dl>
                  <dt>
                    <p class="tit">
                      <span class="inp-chk">
                        <input type="checkbox" name="" id="chkList01_03" value="" checked="checked">
                        <label for="chkList01_03">빙그레 따옴 자몽쥬스 220ML</label>
                      </span>
                    </p>
                  </dt>
                  <dd class="thumb">
                    <span aria-label="혜택" class="ico-benefit plus">2+1</span>
                    <a href="#">
                      <figure>
                        <img src="@/assets/images/_temp/_img_cart01_02.jpg" alt="빙그레 따옴 자몽쥬스 220ML">
                      </figure>
                    </a>
                  </dd>
                  <dd class="option-number">
                    <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                    <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                    <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
                  </dd>
                  <dd class="shop">GS 프레시몰</dd>
                  <dd class="list-price" aria-label="정상가격">
                    <del>4,000</del>원
                  </dd>
                  <dd class="sale-price" aria-label="판매가격">
                    <span class="number-sale-price">0</span>
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
                <div class="go-shopping">
                  <p>[2+1] 구매2 + 증정1 = 3개 배송 <button type="button" class="btn-go" aria-label="행사상품 담기 팝업 활성화" aria-haspopup="dialog" @click="popupEventActive">상품담기</button></p>
                </div>
              </div>
              <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
            </li>
          </ul>
        </li>
        <!-- END : GS fresh 2+1 -->
        <!-- START : 심플리쿡 -->
        <li>
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk">
                  <input type="checkbox" name="" id="chkList01_04" value="" checked="checked">
                  <label for="chkList01_04">심플리쿡) 백순대 볶음(2~3인분)</label>
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
              <button type="button" class="btn-border btn-keep" :class="{active: isKeepBtnArray[3]}" @click="activeKeepToggle(3)">{{ isKeepBtnArray[3] ? '보관해제' : '계속보관' }}</button>
            </p>
          </div>
          <div class="simplycook-option">
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList02_01" value="" class="">
                    <label for="chkList02_01">당면 사리</label>
                  </span>
                </p>
              </dt>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="sale-price">
                <span class="number-sale-price" aria-label="판매가격">500</span>
                <span class="unit-won">원</span>
              </dd>
              <dd><button type="button" class="btn-del"><span class="hidden">옵션 삭제</span></button></dd>
            </dl>
            <dl>
              <dt>
                <p class="tit">
                  <span class="inp-chk">
                    <input type="checkbox" name="" id="chkList02_02" value="" class="">
                    <label for="chkList02_02">시금치수제비</label>
                  </span>
                </p>
              </dt>
              <dd class="option-number">
                <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
                <input type="number" name="" value="1" class="txt-number" title="선택 수량">
                <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
              </dd>
              <dd class="sale-price">
                <span class="number-sale-price" aria-label="판매가격">1,000</span>
                <span class="unit-won">원</span>
              </dd>
              <dd><button type="button" class="btn-del"><span class="hidden">옵션 삭제</span></button></dd>
            </dl>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : 심플리쿡 -->
        <!-- START : 달리살다 -->
        <li>
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk">
                  <input type="checkbox" name="" id="chkList01_05" value="" checked="checked">
                  <label for="chkList01_05">[나투미] 유기농 귀리음료 오리지날</label>
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
            <dd class="sale-price dalisalda">
              <span class="ico-badge">달리드림</span>
              <span class="number-sale-price" aria-label="판매가격">5,200</span>
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
              <button type="button" class="btn-border btn-keep" :class="{active: isKeepBtnArray[4]}" @click="activeKeepToggle(4)">{{ isKeepBtnArray[4] ? '보관해제' : '계속보관' }}</button>
            </p>
          </div>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <!-- END : 달리살다 -->
      </ul>
      <div class="total-price-info">
        <p class="price-info">총 상품금액 27,480원 + 배송비 2,500원 = 29,980원</p>
        <button type="button" class="btn-go-today" aria-label="추천상품 팝업 활성화" aria-haspopup="dialog" @click="popupRecommendActive"><span>당일배송 <strong>1,540원 더 담고</strong> 무료배송 받기</span></button>
      </div>
    </div>
    <!-- START : 품절일 경우 -->
    <div class="wrap-border">
      <ul class="cart-product-list">
        <li class="disabled">
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
            <dd class="shop">GS 프레시몰</dd>
            <dd class="btn-disabled-area">
              <button type="button" class="btn-border-small" aria-label="입고알림 팝업활성화" aria-haspopup="dialog" @click="popupConfirmActive">입고 알림</button>
              <!-- <button type="button" class="btn-border-small active" @click="popupConfirmActive">입고 해제</button>  --> <!-- 입고알림 상태 변경 -->
              <button type="button" class="btn-border-small" aria-label="유사상품 팝업활성화" aria-haspopup="dialog" @click="popupSimilarityActive">유사상품 보기</button>
            </dd>
          </dl>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <li class="disabled">
          <p class="txt-soldout">품절</p>
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk">
                  <input type="checkbox" name="" id="soldout01_02" value="" disabled="disabled">
                  <label for="soldout01_02">엔네이처 빅그릴비엔나 260G+260G기획</label>
                </span>
              </p>
            </dt>
            <dd class="thumb">
              <figure>
                <img src="@/assets/images/_temp/_img_cart01_03.jpg" alt="심플리쿡) 백순대 볶음(2~3인분)">
              </figure>
            </dd>
            <dd class="shop">심플리쿡</dd>
            <dd class=txt-thanks>성원에 감사드립니다.</dd>
          </dl>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
        <li class="disabled">
          <p class="txt-soldout">품절</p>
          <dl>
            <dt>
              <p class="tit">
                <span class="inp-chk">
                  <input type="checkbox" name="" id="soldout01_02" value="" disabled="disabled">
                  <label for="soldout01_02">심플리쿡) 백순대 볶음(2~3인분)</label>
                </span>
              </p>
            </dt>
            <dd class="thumb">
              <figure>
                <img src="@/assets/images/_temp/_img_cart01_03.jpg" alt="심플리쿡) 백순대 볶음(2~3인분)">
              </figure>
            </dd>
            <dd class="shop">GS 프레시몰</dd>
            <dd class=txt-thanks>해당 매장에 판매하지 않는 상품입니다.</dd>
          </dl>
          <p><button type="button" class="btn-del"><span class="hidden">삭제</span></button></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "CartProductList01",
  data() {
    return {
      isKeepBtnArray: [true, false, false, false],
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
    popupEventActive() {
      this.$emit('popupEvent', 'popupEventProduct');
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
    popupSingleOptionActive() {
      this.$emit('popupEvent', 'popupGiftSingle');
    },
    popupDoubleOptionActive() {
      this.$emit('popupEvent', 'popupGiftDouble');
    },
    popupConfirmActive() {
      this.$emit('popupEvent', 'popupAlert');
    },
    popupSimilarityActive() {
      this.$emit('popupEvent', 'popupSimilarity');
    },
    popupRecommendActive() {
      this.$emit('popupEvent', 'popupTodayDelivery');
    }
  },
  mounted() {
  },
};
</script>
