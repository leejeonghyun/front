<template>
  <li class="product">
    <div class="item"> <!-- 예약배송일 경우 reserve 클래스 추가 -->
      <div class="item-link">
        <figure>
          <img src="@/assets/images/_temp/_img_product01_01.jpg" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" />
          <!-- 썸네일 없을 경우 -->
          <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
          <!-- 성인본인인증이 필요한 경우 -->
          <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="서울 목장의 신선함이 살아있는 저지방 우유 1L" /> -->
        </figure>
      </div>
      <div class="wrap-info">
        <dl class="info">
          <dt>
            <strong class="list-num">상품01</strong>
            <p class="title-desc">더 건강하고 맛있는</p>
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
          <!-- START : 할인할 경우 추가 -->
          <dd class="list-price" aria-label="할인 적용 전 가격">
            <del class="price">22,720</del>원
          </dd>
          <!-- END : 할인할 경우 추가 -->
          <dd class="product-desc">
            100ml당 248원
          </dd>
        </dl>
         <div class="wrap-btn">
           <div class="inner">
             <button class="btn-border" aria-haspopup="dialog" aria-label="팝업활성화" @click="popupDetailAction">상세보기</button>
           </div>
           <div class="inner">
             <button class="btn-bg lightgreen" aria-haspopup="dialog" aria-label="팝업활성화" @click="popupOptionAction">상품선택</button>
           </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ProductPackageItem',
  methods: {
    popupSalesActive() { // 할인 내역 팝업 활성화
      this.$emit('popupEvent', 'popupSales');
    },
    popupDetailAction() { // 묶음 상품 상세 팝업 활성화
      this.$emit('popupEvent', 'popupDetail');
    },
    popupOptionAction() { // 바로구매 옵션 팝업 기본
      this.$emit('popupEvent', 'optionDefault');
    }
  }
};
</script>

<style scoped>
</style>
