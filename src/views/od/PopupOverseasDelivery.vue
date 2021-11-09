<!--
views/od/SC-FO-OD-GS-MP-015
-->
<template>
    <!-- START : 추천상품 레이어 -->
    <div id="popupOverseasDelivery" class="wrap-layer similarity-list-layer" role="dialog" aria-labelledby="popupOverseasDelivery" aria-modal="true" :class="[{active : this.modalActive.popupOverseasDelivery}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>해외직구 추천상품</h3></div>
        <div class="layer-content">
          <div class="scroll-area">
            <ul class="similarity-list">
              <li>
                <a href="#">
                  <figure><img src="@/assets/images/_temp/_img_cart01_10.jpg" alt=""></figure>
                  <dl>
                    <dt><span aria-label="상품명">필리핀 후레쉬 망고 1.5kg </span></dt>
                    <dd aria-label="정상가격" class="list-price"><del class="price">4,700</del>원 </dd>
                    <dd aria-label="판매가격" class="sale-price"><strong class="price">4,250</strong>원 </dd>
                  </dl>
                </a>
                <button class="btn icon btn-cart"><span class="hidden">장바구니 담기</span></button>
              </li>
              <li>
                <a href="#">
                  <figure><img src="@/assets/images/_temp/_img_cart01_10.jpg" alt=""></figure>
                  <dl>
                    <dt><span aria-label="상품명">매일 소화가 잘되는 우유 멸균 190ML</span></dt>
                    <dd aria-label="정상가격" class="list-price"><del class="price">3,100</del>원 </dd>
                    <dd aria-label="판매가격" class="sale-price"><strong class="price">2,480</strong>원 </dd>
                  </dl>
                </a>
                <button class="btn icon btn-cart"><span class="hidden">장바구니 담기</span></button>
              </li>
              <li>
                <a href="#">
                  <figure><img src="@/assets/images/_temp/_img_cart01_10.jpg" alt=""></figure>
                  <dl>
                    <dt><span aria-label="상품명">숲속의 버터 아보카도 180G</span></dt>
                    <dd aria-label="정상가격" class="list-price"><del class="price">3,980</del>원 </dd>
                    <dd aria-label="판매가격" class="sale-price"><strong class="price">3,580</strong>원 </dd>
                  </dl>
                </a>
                <button class="btn icon btn-cart"><span class="hidden">장바구니 담기</span></button>
              </li>
              <li>
                <a href="#">
                  <figure><img src="@/assets/images/_temp/_img_cart01_10.jpg" alt=""></figure>
                  <dl>
                    <dt><span aria-label="상품명">캘리포니아 씨없는 청포도 700G(팩)</span></dt>
                    <dd aria-label="정상가격" class="list-price"><del class="price">16,780</del>원 </dd>
                    <dd aria-label="판매가격" class="sale-price"><strong class="price">15,980</strong>원 </dd>
                  </dl>
                </a>
                <button class="btn icon btn-cart"><span class="hidden">장바구니 담기</span></button>
              </li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 추천상품 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupRecommendLayer4",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupOverseasDelivery');
      this.modalActiveEvent('popupOverseasDelivery');
    },
  },
  mounted() {
    this.modalActiveEvent('popupOverseasDelivery');
  },
};
</script>
