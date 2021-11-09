<template>
  <div class="slide">
    <div class="slide-item">
      <gs-link to="/SC-FO-SS-MM-002" class="item-link">
        <figure class="wrap-img">
          <img src="@/assets/images/_temp/_img_product01_02.jpg" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" />
          <!-- 썸네일 없을 경우 -->
          <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
          <!-- 성인본인인증이 필요한 경우 -->
          <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
        </figure>
      </gs-link>
      <div class="wrap-product-info">
        <dl class="info">
          <dt>
            <strong class="title" aria-label="상품명">
              <em>서울 목장의 신선함이 살아있는 저지방 우유 1L 서울 목장의 신선함이 살아있는 신선함이 살아있는</em>
            </strong>
          </dt>
          <!-- START : 할인할 경우 추가 -->
          <dd class="discount" aria-label="할인율">
            <strong class="num">28</strong>%
          </dd>
          <!-- END : 할인할 경우 추가 -->
          <dd class="sale-price" aria-label="할인 적용 후 가격">
            <strong class="price">8,888,888</strong>원
          </dd>
        </dl>
        <!-- START : 기획전 -->
        <!-- <button class="btn icon btn-cart" aria-haspopup="dialog" @click="popupOptionAction">
          <span class="hidden">장바구니 담기</span>
        </button> -->
        <!-- START : 품절일 때 활성화 -->
        <!-- <button class="btn icon btn-alarm">
          입고알림
        </button> -->
        <!-- END : 품절일 때 활성화 -->
        <!-- END : 기획전 -->
        <!-- START : 상품 관련 태그 있을 경우 추가 -->
        <span class="wrap-product-tag">
          <!-- <span class="ico-benefit plus" aria-label="혜택">1+1</span> -->
          <!-- <span class="ico-benefit new" aria-label="새로운상품">new</span> -->
        </span>
        <!-- END : 상품 관련 태그 있을 경우 추가 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSlideSimpleItem',
  props: ['index'],
  methods: {
    popupOptionAction() {
      this.$emit('popupEvent', 'popupOption', this.index);
    }
  }
};
</script>

<style>

</style>
