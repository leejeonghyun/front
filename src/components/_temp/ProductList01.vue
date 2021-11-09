<template>
  <swiper :options="swiperOption">
    <swiper-slide>
      <div class="slide">
        <div class="slide-item"> <!-- 예약배송일 경우 reserve 클래스 추가 -->
          <a href="#" class="item-link">
            <figure>
              <img src="@/assets/images/_temp/_img_product01_01.jpg" alt="오렌지팝 62ml 8입" />
              <!-- 썸네일 없을 경우 -->
              <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="오렌지팝 62ml 8입" /> -->
              <!-- 성인본인인증이 필요한 경우 -->
              <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="오렌지팝 62ml 8입" /> -->
            </figure>
          </a>
          <div class="wrap-product-info">
            <dl class="info">
              <dt>
                <span class="wrap-delivery-tag">
                  <!-- START : 배송 관련 태그 있을 경우 추가 -->
                  <!-- <span class="delivery-info" aria-label="배송방법">택배배송</span>
                  <span class="delivery-info" aria-label="배송방법">예약배송</span> -->
                  <!-- END : 배송 관련 태그 있을 경우 추가 -->
                </span>
                <p class="title-desc">Dole 상큼한</p>
                <strong class="title" aria-label="상품명">
                  <em>오렌지팝 62ml 8입</em>
                </strong>
              </dt>
              <!-- START : 할인할 경우 추가 -->
              <dd class="discount" aria-label="할인율">
                <strong class="num">40</strong>%
              </dd>
              <dd class="list-price" aria-label="할인 적용 전 가격">
                <del class="price">2,035,350</del>원
              </dd>
              <!-- END : 할인할 경우 추가 -->
              <dd class="sale-price" aria-label="할인 적용 후 가격">
                <strong class="price">1,870,980</strong>원
                <!-- START : 할인할 경우 추가 -->
                <!-- <button class="btn icon-question" @click="popupSalesActive">
                  <span class="hidden">할인가 내역 상세보기</span>
                </button> -->
                <!-- END : 할인할 경우 추가 -->
              </dd>
            </dl>
            <button class="btn icon btn-cart">
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
        <span class="wrap-slide-tag">
          <span class="ico-benefit plus" aria-label="혜택">1+1</span>
          <span class="ico-benefit new" aria-label="새로운상품">new</span>
          <!-- <span class="ico-tag" aria-label="혜택">무료배송</span>
          <span class="ico-tag" aria-label="혜택">1인N개한정</span>
          <span class="ico-tag" aria-label="혜택">카드할인</span>
          <span class="ico-tag" aria-label="혜택">더블쿠폰</span> -->
        </span>
        <!-- END : 상품 관련 태그 있을 경우 추가 -->
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide">
    <div class="slide-item"> <!-- 예약배송일 경우 reserve 클래스 추가 -->
      <a href="#" class="item-link">
        <figure>
          <img src="@/assets/images/_temp/_img_product01_02.jpg" alt="남양 34 우유 250ml" />
          <!-- 썸네일 없을 경우 -->
          <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="남양 34 우유 250ml" /> -->
          <!-- 성인본인인증이 필요한 경우 -->
          <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="남양 34 우유 250ml" /> -->
        </figure>
      </a>
      <div class="wrap-product-info">
        <dl class="info">
          <dt>
            <span class="wrap-delivery-tag">
              <!-- START : 배송 관련 태그 있을 경우 추가 -->
              <!-- <span class="delivery-info" aria-label="배송방법">택배배송</span>
              <span class="delivery-info" aria-label="배송방법">예약배송</span> -->
              <!-- END : 배송 관련 태그 있을 경우 추가 -->
            </span>
            <p class="title-desc">추억의 맛</p>
            <strong class="title" aria-label="상품명">
              <em>남양 34 우유 250ml</em>
            </strong>
          </dt>
          <!-- START : 할인할 경우 추가 -->
          <dd class="discount" aria-label="할인율">
            <strong class="num">13</strong>%
          </dd>
          <dd class="list-price" aria-label="할인 적용 전 가격">
            <del class="price">2,200</del>원
          </dd>
          <!-- END : 할인할 경우 추가 -->
          <dd class="sale-price" aria-label="할인 적용 후 가격">
            <strong class="price">1,780</strong>원
            <!-- START : 할인할 경우 추가 -->
            <!-- <button class="btn icon-question" @click="popupSalesActive">
              <span class="hidden">할인가 내역 상세보기</span>
            </button> -->
            <!-- END : 할인할 경우 추가 -->
          </dd>
        </dl>
        <button class="btn icon btn-cart">
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
    <span class="wrap-slide-tag">
      <span class="ico-benefit plus" aria-label="혜택">1+1</span>
      <!-- <span class="ico-benefit new" aria-label="새로운상품">new</span>
      <span class="ico-tag" aria-label="혜택">무료배송</span>
      <span class="ico-tag" aria-label="혜택">1인N개한정</span>
      <span class="ico-tag" aria-label="혜택">카드할인</span>
      <span class="ico-tag" aria-label="혜택">더블쿠폰</span> -->
    </span>
  </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide">
        <div class="slide-item"> <!-- 예약배송일 경우 reserve 클래스 추가 -->
          <a href="#" class="item-link">
            <figure>
              <img src="@/assets/images/_temp/_img_product01_03.jpg" alt="안심 1등급 500g" />
              <!-- 썸네일 없을 경우 -->
              <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="안심 1등급 500g" /> -->
              <!-- 성인본인인증이 필요한 경우 -->
              <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="안심 1등급 500g" /> -->
            </figure>
          </a>
          <div class="wrap-product-info">
            <dl class="info">
              <dt>
                <span class="wrap-delivery-tag">
                  <!-- START : 배송 관련 태그 있을 경우 추가 -->
                  <!-- <span class="delivery-info" aria-label="배송방법">택배배송</span>
                  <span class="delivery-info" aria-label="배송방법">예약배송</span> -->
                  <!-- END : 배송 관련 태그 있을 경우 추가 -->
                </span>
                <p class="title-desc">맑고 깨끗한 소백산</p>
                <strong class="title" aria-label="상품명">
                  <em>안심 1등급 500g</em>
                </strong>
              </dt>
              <!-- START : 할인할 경우 추가 -->
              <dd class="discount" aria-label="할인율">
                <strong class="num">20</strong>%
              </dd>
              <dd class="list-price" aria-label="할인 적용 전 가격">
                <del class="price">2,980</del>원
              </dd>
              <!-- END : 할인할 경우 추가 -->
              <dd class="sale-price" aria-label="할인 적용 후 가격">
                <strong class="price">2,980</strong>원
                <!-- START : 할인할 경우 추가 -->
                <!-- <button class="btn icon-question" @click="popupSalesActive">
                  <span class="hidden">할인가 내역 상세보기</span>
                </button> -->
                <!-- END : 할인할 경우 추가 -->
              </dd>
            </dl>
            <button class="btn icon btn-cart">
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
        <span class="wrap-slide-tag">
          <!-- <span class="ico-benefit plus" aria-label="혜택">1+1</span> -->
          <span class="ico-benefit new" aria-label="새로운상품">new</span>
          <!-- <span class="ico-tag" aria-label="혜택">무료배송</span>
          <span class="ico-tag" aria-label="혜택">1인N개한정</span>
          <span class="ico-tag" aria-label="혜택">카드할인</span>
          <span class="ico-tag" aria-label="혜택">더블쿠폰</span> -->
        </span>
        <!-- END : 상품 관련 태그 있을 경우 추가 -->
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="slide">
        <div class="slide-item"> <!-- 예약배송일 경우 reserve 클래스 추가 -->
          <a href="#" class="item-link">
            <figure>
              <img src="@/assets/images/_temp/_img_product01_01.jpg" alt="오렌지팝 62ml 8입" />
              <!-- 썸네일 없을 경우 -->
              <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="오렌지팝 62ml 8입" /> -->
              <!-- 성인본인인증이 필요한 경우 -->
              <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="오렌지팝 62ml 8입" /> -->
            </figure>
          </a>
          <div class="wrap-product-info">
            <dl class="info">
              <dt>
                <span class="wrap-delivery-tag">
                  <!-- START : 배송 관련 태그 있을 경우 추가 -->
                  <!-- <span class="delivery-info" aria-label="배송방법">택배배송</span>
                  <span class="delivery-info" aria-label="배송방법">예약배송</span> -->
                  <!-- END : 배송 관련 태그 있을 경우 추가 -->
                </span>
                <p class="title-desc">Dole 상큼한</p>
                <strong class="title" aria-label="상품명">
                  <em>오렌지팝 62ml 8입</em>
                </strong>
              </dt>
              <!-- START : 할인할 경우 추가 -->
              <dd class="discount" aria-label="할인율">
                <strong class="num">40</strong>%
              </dd>
              <dd class="list-price" aria-label="할인 적용 전 가격">
                <del class="price">2,035,350</del>원
              </dd>
              <!-- END : 할인할 경우 추가 -->
              <dd class="sale-price" aria-label="할인 적용 후 가격">
                <strong class="price">1,870,980</strong>원
                <!-- START : 할인할 경우 추가 -->
                <!-- <button class="btn icon-question" @click="popupSalesActive">
                  <span class="hidden">할인가 내역 상세보기</span>
                </button> -->
                <!-- END : 할인할 경우 추가 -->
              </dd>
            </dl>
            <button class="btn icon btn-cart">
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
        <span class="wrap-slide-tag">
          <!-- <span class="ico-benefit plus" aria-label="혜택">1+1</span>
          <span class="ico-benefit new" aria-label="새로운상품">new</span>
          <span class="ico-tag" aria-label="혜택">무료배송</span>
          <span class="ico-tag" aria-label="혜택">1인N개한정</span>
          <span class="ico-tag" aria-label="혜택">카드할인</span>
          <span class="ico-tag" aria-label="혜택">더블쿠폰</span> -->
        </span>
        <!-- END : 상품 관련 태그 있을 경우 추가 -->
      </div>
    </swiper-slide>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'ProductList',
  props: ['slideMargin', 'slideShow'],
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        // observer: true,
        // observeParents: true,
        slidesPerView: this.slideShow ? this.slideShow : 2.2,
        spaceBetween: this.slideMargin ? this.slideMargin : 10,
        freeMode: true,
        containerModifierClass: 'wrap-product-slide ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      }
    };
  }
};
</script>

<style>

</style>
