<template>
  <div class="product" :class="{active: showList}">
    <div class="item"> <!-- 예약배송일 경우 reserve 클래스 추가 -->
      <gs-link to="/SC-FO-SS-MM-002" class="item-link">
        <figure>
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
            <span class="wrap-delivery-tag">
              <!-- START : 배송 관련 태그 있을 경우 추가 -->
              <!-- <span class="delivery-info" aria-label="배송방법">전국택배</span> -->
              <span class="delivery-info" aria-label="배송방법">업체택배</span>
              <!-- <span class="delivery-info" aria-label="배송방법">예약배송</span> -->
              <!-- END : 배송 관련 태그 있을 경우 추가 -->
            </span>
            <p class="title-desc">더 건강하고 맛있는</p>
            <strong class="title" aria-label="상품명">
              <em>서울 목장의 신선함이</em>
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
            <button class="btn icon-question" aria-haspopup="dialog" aria-label="팝업활성화" @click="popupSalesActive">
              <span class="hidden">할인가 내역 상세보기</span>
            </button>
            <!-- END : 할인할 경우 추가 -->
          </dd>
          <dd class="product-desc">
            100ml당 248원
          </dd>
          <!-- START : 배송 상세 정보 있을 경우 추가 -->
          <dd class="delivery-desc">
            11/18(월) 부터 순차배송
          </dd>
          <!-- END : 배송 상세 정보 있을 경우 추가 -->
        </dl>
        <button class="btn icon btn-cart" aria-haspopup="dialog" aria-label="팝업활성화" @click="popupOptionAction">
          <span class="hidden">장바구니 담기</span>
        </button>
        <!-- START : 품절일 때 활성화 -->
        <!-- <button class="btn icon btn-alarm">
          입고알림
        </button> -->
        <!-- END : 품절일 때 활성화 -->
      </div>
    </div>
    <!-- START : 상품 관련 태그 있을 경우 추가 -->
    <span class="wrap-product-tag">
      <!-- <span class="ico-benefit plus" aria-label="혜택">1+1</span> -->
      <!-- <span class="ico-benefit new" aria-label="새로운상품">new</span> -->
      <span class="ico-tag" aria-label="혜택">무료배송</span>
      <span class="ico-tag" aria-label="혜택">1인N개한정</span>
      <!-- <span class="ico-tag" aria-label="혜택">카드할인</span>
      <span class="ico-tag" aria-label="혜택">더블쿠폰</span>
      <span class="ico-tag" aria-label="혜택">다다익선</span>
      <span class="ico-tag" aria-label="혜택">사은품증정</span>
      <span class="ico-tag" aria-label="혜택">포인트증정</span>
      <span class="ico-tag" aria-label="혜택">통신사할인</span> -->
    </span>
    <!-- END : 상품 관련 태그 있을 경우 추가 -->
    <!-- <dl class="sub-info">
      <dt class="hidden">결제부가정보</dt>
      <dd class="price-benefit">
        <p class="benefit-discount">추가혜택가
          <strong class="price">4,200</strong>원~
        </p>
        <p class="benefit-pay">
          <span class="pay-type">카드할인(</span>팝/국민/신한/BC<span class="pay-type">)</span>
          <strong class="price">10%</strong>추가 할인
        </p>
      </dd>
      <dt class="hidden">구매정보</dt>
      <dd class="product-review">
        <span class="purchase-score">
          <strong>4.5</strong>
          <span>(586)</span>
        </span>
        <span class="purchase-amount">
          <strong>7,620</strong>개 구매중
        </span>
      </dd>
      <dt class="hidden">상품평</dt>
      <dd class="product-comment">
        <dl class="wrap-list-comment">
          <dt class="hidden">고객아이디</dt>
          <dd class="user-id">moon******</dd>
          <dd class="comment">
            제철 맞아 남편이랑 주꾸미 볶음 먹고싶어 주문했는데, 통통하고 사이즈도 적당해요. 괜찮네요.
          </dd>
        </dl>
      </dd>
    </dl> -->
    <!-- START : 품절일 때 활성화 -->
    <!-- <div class="wrap-alternate" :class="{active: showList}">
      <button class="btn-alternate" @click="showAlternativeList">
        <span>유사상품 {{showList ? '닫기' : '보기'}}</span>
      </button>
      <div id="modal" class="wrap-list-alternate" v-if="showList" aria-live="assertive" aria-atomic="true">
        <ProductSlide @popupEvent="popupSalesActive" />
      </div>
    </div> -->
    <!-- END : 품절일 때 활성화 -->
  </div>
</template>

<script>
// import ProductSlide from '@/components/_temp/ProductSlide';
export default {
  components: {
    // ProductSlide
  },
  props: ['showList', 'index'],
  methods: {
    showAlternativeList() {
      this.$emit('slideEvent', this.index);
    },
    popupSalesActive() {
      this.$emit('popupEvent', 'popupSales');
    },
    popupOptionAction() {
      this.$emit('popupEvent', 'popupOption');
    }
  }
};
</script>

<style scoped>
</style>
