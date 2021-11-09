<template>
  <div class="slide">
    <div class="slide-item reserve"> <!-- 예약배송일 경우 reserve 클래스 추가 -->
      <gs-link to="/SC-FO-SS-MM-002" class="item-link">
        <figure class="identify">
          <img src="@/assets/images/_temp/_img_product01_01.jpg" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" />
          <!-- 썸네일 없을 경우 -->
          <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
          <!-- 성인본인인증이 필요한 경우 -->
          <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
        </figure>
      </gs-link>
      <div class="wrap-product-info">
        <dl class="info">
          <dt>
            <span class="wrap-delivery-tag">
              <!-- START : 배송 관련 태그 있을 경우 추가 -->
              <span class="delivery-info" aria-label="배송방법">전국택배</span>
              <span class="delivery-info" aria-label="배송방법">업체택배</span>
              <span class="delivery-info" aria-label="배송방법">예약배송</span>
              <!-- END : 배송 관련 태그 있을 경우 추가 -->
            </span>
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
            <!-- START : 할인할 경우 추가 -->
            <button class="btn icon-question" aria-haspopup="dialog" @click="popupSalesActive">
              <span class="hidden">할인가 내역 상세보기</span>
            </button>
            <!-- END : 할인할 경우 추가 -->
          </dd>
        </dl>
        <button class="btn icon btn-cart" @click="popupOptionAction">
          <span class="hidden">장바구니 담기</span>
        </button>
        <!-- START : 품절일 때 활성화 -->
        <button class="btn icon btn-alarm">
          입고알림
        </button>
        <!-- END : 품절일 때 활성화 -->
      </div>
    </div>
    <!-- START : 상품 관련 태그 있을 경우 추가 -->
    <span class="wrap-slide-tag">
      <span class="ico-benefit plus" aria-label="혜택">1+1</span>
      <span class="ico-benefit new" aria-label="새로운상품">new</span>
      <span class="ico-tag" aria-label="혜택">무료배송</span>
      <span class="ico-tag" aria-label="혜택">1인N개한정</span>
      <span class="ico-tag" aria-label="혜택">카드할인</span>
      <span class="ico-tag" aria-label="혜택">더블쿠폰</span>
    </span>
    <!-- END : 상품 관련 태그 있을 경우 추가 -->
  </div>
</template>

<script>
export default {
  name: 'ProductSlideItem',
  methods: {
    popupSalesActive() {
      this.$emit('popupEvent', 'popupSales', this.index);
    },
    popupOptionAction() {
      this.$emit('popupEvent', 'popupSales', this.index);
    }
  }
};
</script>

<style scoped>
</style>
