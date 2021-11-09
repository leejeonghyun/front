<template>
  <article>
    <div class="item-inner">
      <div class="product">
        <div class="item">
          <a href="#" class="item-link">
            <figure>
              <img src="../../assets/images/_temp/_img_product07_01.jpg" alt="심플리쿡)톡톡크림빠네파스타" />
              <!-- 썸네일 없을 경우 -->
              <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="심플리쿡)톡톡크림빠네파스타" /> -->
              <!-- 성인본인인증이 필요한 경우 -->
              <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="심플리쿡)톡톡크림빠네파스타" /> -->
            </figure>
          </a>
          <div class="wrap-info">
            <dl class="info">
              <dt class="item-title">
                <!-- START : MD 소구 포인트 있을 경우 -->
                <!-- <p class="title-desc">빵 속에 부드러운 파스타로 가득!</p> -->
                <!-- END : MD 소구 포인트 있을 경우 -->
                <strong class="title" aria-label="상품명">
                  <em>심플리쿡)톡톡크림빠네파스타</em>
                </strong>
              </dt>
              <!-- START : 할인할 경우 추가 -->
              <dd class="discount" aria-label="할인율">
                <strong class="num">20</strong>%
              </dd>
              <!-- END : 할인할 경우 추가 -->
              <dd class="wrap-price">
                <!-- START : 할인할 경우 추가 -->
                <span class="list-price" aria-label="할인 적용 전 가격">
                  <del class="price">8,860</del>원
                </span>
                <!-- END : 할인할 경우 추가 -->
                <span class="sale-price" aria-label="할인 적용 후 가격">
                  <strong class="price">7,090</strong>원
                </span>
              </dd>
            </dl>
          </div>
          <button class="btn-cart" aria-label="장바구니담기"></button>
        </div>
        <!-- START : 상품 관련 태그 있을 경우 추가 -->
        <span class="wrap-product-tag">
          <span class="ico-benefit plus" aria-label="혜택">1+1</span>
          <span class="ico-benefit new" aria-label="새로운상품">new</span>
        </span>
        <!-- END : 상품 관련 태그 있을 경우 추가 -->
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "MainSectionSimply",
};
</script>

<style>

</style>
