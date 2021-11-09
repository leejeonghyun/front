<template>
  <div class="item-inner">
    <!-- START : 해시태그 -->
    <span class="wrap-relatived-keywords" v-if="tag">
      <a href="#" class="relatived-keywords"><span>제철채소</span></a>
        <a href="#" class="relatived-keywords"><span>유기농야채</span></a>
        <a href="#" class="relatived-keywords"><span>쌈채소</span></a>
        <a href="#" class="relatived-keywords"><span>신선채소</span></a>
    </span>
    <!-- END : 해시태그 -->
    <div class="product">
      <div class="item">
        <a href="#" class="item-link">
          <figure>
            <img src="../../assets/images/_temp/_img_product09_01.jpg" alt="자연가치 꽃상추 120g" />
          </figure>
          <div class="wrap-info">
            <dl class="info">
              <dt class="item-title">
                <span class="wrap-delivery-tag">
                  <!-- START : 배송 관련 태그 있을 경우 추가 -->
                  <!-- <span class="delivery-info" aria-label="배송방법">택배배송</span> -->
                  <!-- <span class="delivery-info" aria-label="배송방법">예약배송</span> -->
                  <!-- END : 배송 관련 태그 있을 경우 추가 -->
                </span>
                <p class="title-desc">엄격하게 선별된 건강한 맛</p>
                <strong class="title" aria-label="상품명">
                  <em>자연가치 꽃상추 120g</em>
                </strong>
              </dt>
              <!-- START : 할인할 경우 추가 -->
              <dd class="discount" aria-label="할인율">
                <strong class="num">10</strong>%
              </dd>
              <!-- END : 할인할 경우 추가 -->
              <dd class="wrap-price">
                <!-- START : 할인할 경우 추가 -->
                <span class="list-price" aria-label="할인 적용 전 가격">
                  <del class="price">2,820</del>원
                </span>
                <!-- END : 할인할 경우 추가 -->
                <span class="sale-price" aria-label="할인 적용 후 가격">
                  <strong class="price">1,680</strong>원
                  <!-- START : 할인할 경우 추가 -->
                  <!-- <button class="btn icon-question" @click="popupSalesActive">
                    <span class="hidden">할인가 내역 상세보기</span>
                  </button> -->
                  <!-- END : 할인할 경우 추가 -->
                </span>
              </dd>
            </dl>
          </div>
        </a>
        <span class="wrap-product-tag">
          <span class="ico-tag" aria-label="혜택">다다익선</span>
          <span class="ico-tag" aria-label="혜택">무료배송</span>
          <span class="ico-tag" aria-label="혜택제한">1인n개한정</span>
        </span>
        <button class="btn-cart" aria-label="장바구니담기"></button>
      </div>
      <!-- START : 별점 + 리뷰 -->
      <div class="product-comment" v-if="review">
        <dl>
          <dt class="hidden">고객아이디</dt>
          <dd class="user-id">moon******</dd>
          <dt class="hidden">별점</dt>
          <dd>
            <div class="item-score">
              <span class="wrap-star">
                <span class="star-score" style="width:95%"></span>
              </span>
              <span class="wrap-score">
                <strong class="get-point" aria-label="평가점수">95</strong>/
                <span class="full-point" aria-label="별점최대점수">100</span>
              </span>
            </div>
          </dd>
          <dt class="hidden">상품평</dt>
          <dd class="comment">
            너무너무 맛있어요! 다음엔 부모님께도 사드려야겠어요. 온 가족이 정말  맛있게 먹었어요.
            너무너무 맛있어요! 다음엔 부모님께도 사드려야겠어요. 온 가족이 정말  맛있게 먹었어요.
          </dd>
        </dl>
      </div>
      <!-- END : 별점 + 리뷰 -->
    </div>
  </div>
</template>
<script>
export default {
  name: "MainSectionCategory03",
  data() {
    return {
      review: true, // 별점 + 리뷰 있을 경우
      tag: true // 해시태그 있을 경우
    };
  }
};
</script>

<style>

</style>
