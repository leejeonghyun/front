<template>
  <div class="list-content">
    <ul class="cart-product-list">
      <li>
        <dl>
          <dt>
            <p class="tit">
              <span class="inp-chk">
                <input type="checkbox" name="" id="chkList02_01" value="" checked="checked">
                <label for="chkList02_01">[말랭이여사] 가지말랭이</label>
              </span>
            </p>
          </dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_gift03.jpg" alt="[말랭이여사] 가지말랭이">
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
            <span class="number-sale-price">5,200</span>
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
        </div>
      </li>
      <li>
        <dl>
          <dt>
            <p class="tit">
              <span class="inp-chk">
                <input type="checkbox" name="" id="chkList02_02" value="" checked="checked">
                <label for="chkList02_02">CJ 더 건강한 그릴 비엔나 기획200G*2봉</label>
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
          <dd class="list-price" aria-label="정상가격">
            <del>35,000</del>원
          </dd>
          <dd class="shop">GS fresh</dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">32,680</span>
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
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "GiftProductList04",
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
    popupOptionActive() {
      this.$emit('popupEvent', 'popupOptionList');
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
