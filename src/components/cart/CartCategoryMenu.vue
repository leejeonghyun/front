<template>
  <div class="wrap-sticky" @categoryInitEvent="categoryInit">
    <ul class="cart-category">
      <!-- START : 예약배송 0일 경우 히든 -->
      <li v-if="bsktInqRsltDto.resvDelivCnt > 0"><a href="#reservationDelivery" role="button" @click="selectCategory" aria-label="예약배송 바로가기">예약 <span class="num" aria-label="예약배송 상품 수">{{bsktInqRsltDto.resvDelivCnt}}</span></a></li>
      <!-- END : 예약배송 0일 경우 히든 -->
      <li v-if="bsktInqRsltDto.todayDelivCnt > 0"><a href="#todayDelivery" role="button" @click="selectCategory" aria-label="당일배송 바로가기" >당일 <span class="num" aria-label="당일배송 상품 수">{{bsktInqRsltDto.todayDelivCnt}}</span></a></li>
      <li v-else><a href="javascript:;" class="disabled" aria-label="상품 없음">당일 <span class="num">0</span></a></li>
      <!-- START : 상품 없을 경우 비활성화 처리 -->
      <!-- <li><a href="javascript:;" class="disabled" aria-label="상품 없음">당일 <span class="num">0</span></a></li> -->
      <!-- END : 상품 없을 경우 비활성화 처리 -->
      <li v-if="bsktInqRsltDto.dawnDelivCnt > 0"><a href="#dawnDelivery" role="button" @click="selectCategory" aria-label="새벽배송 바로가기">새벽 <span class="num" aria-label="새벽배송 상품 수">{{bsktInqRsltDto.dawnDelivCnt}}</span></a></li>
      <li v-else><a href="javascript:;" class="disabled" aria-label="상품 없음">새벽 <span class="num">0</span></a></li>
      <li v-if="bsktInqRsltDto.dlvDelivCnt > 0"><a href="#parcelDelivery" role="button" @click="selectCategory" aria-label="택배배송 바로가기">택배 <span class="num" aria-label="택배배송 상품 수">{{bsktInqRsltDto.dlvDelivCnt}}</span></a></li>
      <li v-else><a href="javascript:;" class="disabled" aria-label="상품 없음">택배 <span class="num">0</span></a></li>
      <li v-if="bsktInqRsltDto.abrdDelivCnt > 0" class="last"><a href="#overseasDelivery" role="button" @click="selectCategory" aria-label="해외직구 바로가기">해외직구 <span class="num" aria-label="해외직구 상품 수">{{bsktInqRsltDto.abrdDelivCnt}}</span></a></li>
      <li v-else><a href="javascript:;" class="disabled last" aria-label="상품 없음">해외직구 <span class="num">0</span></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CartCategoryMenu",
  props: {
    bsktInqRsltDto: Object
  },
  data() {
    return {
      categoryOffsetTop: 0,
    };
  },
  directives: {},
  mixins: [],
  components: {
  },
  methods: {
    categoryInit() {
      this.categoryOffsetTop = document.querySelector('.cart-category').offsetTop;
    },
    stickyCategory() {
      // const $wrapper = document.querySelector('.wrap-cart');
      const scroll = window.pageYOffset;
      const $categoryMenu = document.querySelector('.cart-category');
      if ($categoryMenu != null) {
        if (scroll > 0) {
          // $wrapper.classList.add('sticky');
          $categoryMenu.classList.add('show');
        } else {
          // $wrapper.classList.remove('sticky');
          $categoryMenu.classList.remove('show');
        }
      }
    },
    // 클릭시 해당 컨텐츠로 이동
    selectCategory() {
      const scroll = window.pageYOffset;
      const $target = event.currentTarget;
      const targetId = $target.getAttribute('href');
      const $targetCont = document.querySelector(targetId);
      const navHight = document.querySelector('.cart-category').clientHeight;
      const isBanner = $targetCont.querySelector('.banner-sticky');
      let targetTop;
      if (navHight != null) {
        if (!!isBanner) {
          targetTop = $targetCont.offsetTop - navHight - 49;
        } else {
          targetTop = $targetCont.offsetTop - navHight;
        }
        window.scrollTo(0, targetTop);
        $targetCont.focus();
        event.preventDefault();
      }
    },
    // 현재 카테고리 표시
    activeCurrenMenu() {
      const scroll = window.pageYOffset;
      const mainNavLinks = document.querySelectorAll(".cart-category li a");
      const mainSections = document.querySelectorAll(".wrap-category-content");
      const cartSections = document.querySelector('.cart-category');
      let currLink;
      if (cartSections != null) {
        const navHight = cartSections.clientHeight;
        for (let i = 0; i < mainSections.length; i++) {
          currLink = mainNavLinks[i];
          currLink.classList.remove("active");
          if (mainSections[i].offsetTop - navHight - 50 <= scroll && (mainSections[i].offsetTop + mainSections[i].clientHeight) - navHight - 50 > scroll) {
            if (Number(currLink.querySelector('.num').textContent) != 0) currLink.classList.add("active");
          }
        }
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this);
    /*
    window.removeEventListener('scroll', this.stickyCategory());
    window.removeEventListener('scroll', this.activeCurrenMenu()); // 이벤트 방식 변경 유현석 20200529
    */
  },
  mounted() {
    const $this = this;
    const $category = document.querySelector('.wrap-sticky');
    if ( $category ) {
      window.addEventListener('scroll', function() {
        $this.stickyCategory(window.pageYOffset);
        $this.activeCurrenMenu(window.pageYOffset);
      });
    }
  },
};
</script>
