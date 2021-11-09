<template>
  <div class="product">
    <div class="item">
      <gs-link to="/SC-FO-SS-MM-002" class="item-link">
        <figure class="identify">
          <img src="@/assets/images/_temp/_img_product01_01.jpg" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" />
          <!-- 썸네일 없을 경우 -->
          <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
          <!-- 성인본인인증이 필요한 경우 -->
          <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
        </figure>
      </gs-link>
      <div class="wrap-info">
        <dl class="info">
          <dt>
            <p class="title-desc">더 건강하고 맛있는</p>
            <strong class="title" aria-label="상품명">
              <em>서울 목장의 신선함이 살아있는 저지방 우유 1L 서울 목장의 신선함이 살아있는 신선함이 살아있는</em>
            </strong>
          </dt>
          <!-- START : 할인할 경우 추가 -->
          <dd class="discount" aria-label="할인율">
            <strong class="num">28</strong>%
          </dd>
          <dd class="list-price" aria-label="할인 적용 전 가격">
            <del class="price">22,720</del>원
          </dd>
          <!-- END : 할인할 경우 추가 -->
          <dd class="sale-price" aria-label="할인 적용 후 가격">
            <strong class="price">8,888,888</strong>원
          </dd>
          <!-- END : 배송 상세 정보 있을 경우 추가 -->
        </dl>
        <button class="btn icon btn-cart" aria-haspopup="dialog" @click="popupOptionAction">
          <span class="hidden">장바구니 담기</span>
        </button>
        <!-- START : 품절일 때 활성화 -->
        <button class="btn icon btn-alarm">입고알림</button>
        <!-- END : 품절일 때 활성화 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDealItem',
  methods: {
    popupOptionAction() {
      // 장바구니 옵션 팝업 활성화
      this.$emit('popupEvent', 'popupOption');
    },
  },
};
</script>

<style>
</style>
