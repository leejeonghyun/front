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
          <dd class="option"><p class="option-info">01/03(수)도착예정</p></dd>
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
      <!-- START : 달리살다 -->
      <li>
        <dl>
          <dt>주문한 상품명이 노출되는 영역.</dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
              </figure>
            </a>
          </dd>
          <dd class="shop">달리살다</dd>
          <dd class="count"><p class="option-info">수량 : 1개</p></dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">21,500</span>
            <span class="unit-won">원</span>
            <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive"><span class="hidden">할인 안내</span></button>
          </dd>
        </dl>
        <div class="btn-bottom">
          <p class="btn-area">
            <button type="button" class="btn-border btn-coupon" aria-label="쿠폰변경 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive">쿠폰변경</button>
          </p>
        </div>
        <div class="go-shopping txt"><p>증정 사은품 : 키친타올 2입</p></div>
      </li>
      <!-- END : 달리살다 -->
      <!-- START : 심플리쿡 -->
      <li>
        <dl>
          <dt>주문한 상품명이 노출되는 영역.</dt>
          <dd class="thumb">
            <a href="#">
              <figure>
                <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
              </figure>
            </a>
          </dd>
          <dd class="shop">심플리쿡</dd>
          <dd class="count"><p class="option-info">수량 : 1개</p></dd>
          <dd class="list-price" aria-label="정상가격">
            <del>15,000</del>원
          </dd>
          <dd class="sale-price" aria-label="판매가격">
            <span class="number-sale-price">9,000</span>
            <span class="unit-won">원</span>
            <button type="button" class="btn-infomation" aria-label="할인 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupDiscountActive"><span class="hidden">할인 안내</span></button>
          </dd>
        </dl>
        <div class="simplycook-option">
          <dl>
            <dt>당면사리 1개</dt>
            <dd class="sale-price" aria-label="판매가격">
              <span class="number-sale-price">500</span>
              <span class="unit-won">원</span>
            </dd>
          </dl>
          <dl>
            <dt>시금치 수제비300g 1개</dt>
            <dd class="sale-price" aria-label="판매가격">
              <span class="number-sale-price">1,000</span>
              <span class="unit-won">원</span>
            </dd>
          </dl>
        </div>
      </li>
      <!-- END : 심플리쿡 -->
      <!-- START : GS fresh 2+1 -->
      <li>
        <ul>
          <li>
            <dl>
              <dt><span aria-label="혜택" class="ico-benefit plus">2+1</span> 주문한 상품명이 노출되는 영역.</dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
                  </figure>
                </a>
              </dd>
              <dd class="shop">GS fresh </dd>
              <dd class="count"><p class="option-info">수량 : 1개</p></dd>
              <dd class="list-price" aria-label="정상가격">
              <del>7,560</del>원
            </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">21,500</span>
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
          <li>
            <dl>
              <dt><span aria-label="혜택" class="ico-benefit plus">2+1</span> 주문한 상품명이 노출되는 영역.</dt>
              <dd class="thumb">
                <a href="#">
                  <figure>
                    <img src="@/assets/images/_temp/_img_cart01_01.jpg" alt="엔네이처 빅그릴비엔나 260G+260G기획">
                  </figure>
                </a>
              </dd>
              <dd class="shop">GS fresh </dd>
              <dd class="count"><p class="option-info">수량 : 1개</p></dd>
              <dd class="list-price" aria-label="정상가격">
                <del>7,560</del>원
              </dd>
              <dd class="sale-price" aria-label="판매가격">
                <span class="number-sale-price">0</span>
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
        </ul>
      </li>
      <!-- END : GS fresh 2+1 -->
    </ul>
    <div class="total-price-info">
      <p class="price-info"><strong>총 주문예정금액 96,480원</strong> (배송비3,000원 포함)</p>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "MyProductList1",
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
