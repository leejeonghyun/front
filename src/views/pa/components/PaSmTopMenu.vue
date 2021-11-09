<template>
  <div class="wrap-gnb" :class="{[type]: this.type}" :style="{top: '56px'}" ref="gnb">
    <header>
      <div class="wrap-headerbar">
        <h1 class="header-title">인증/결제테스트</h1>
      </div>
    </header>
    <ul class="wrap-gnb-slide" ref="gnbSlide" style="top: '56px'; background-color: #888;" >
      <li class="swiper-slide">
        <gs-link :to="`/pa/card_isp_auth_template?t=${ Date.now() }`" :class="{active: activeIndex === 0}">
          신용카드[ISP]
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/card_kmotion_auth_template?t=${ Date.now() }`" data-index="1" :class="{active: activeIndex === 1}">
          신용카드[KMOTION]
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/card_xmpi_auth_template?t=${ Date.now() }`" data-index="2" :class="{active: activeIndex === 2}">
          신용카드[XMPI]
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/card_smpi_auth_template?t=${ Date.now() }`" data-index="3" :class="{active: activeIndex === 3}">
          신용카드[SMPI]
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/card_kmpi_auth_template?t=${ Date.now() }`" data-index="4" :class="{active: activeIndex === 4}">
          신용카드[KMPI]
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/card_billing_auth_template?t=${ Date.now() }`" data-index="5" :class="{active: activeIndex === 5}">
          신용카드Billing
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/bank_auth_template?t=${ Date.now() }`" data-index="6" :class="{active: activeIndex === 6}">
          계좌이체
        </gs-link>
      </li>
      <!--<li class="swiper-slide">
        <gs-link to="/SC-FO-PA-GS-SM-001" data-index="6" :class="{active: activeIndex === 6}">
          해피머니
        </gs-link>
      </li>-->
      <li class="swiper-slide">
        <gs-link :to="`/pa/giftcard_auth_template?t=${ Date.now() }`" data-index="7" :class="{active: activeIndex === 7}">
          상품권
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/mcash_auth_template?t=${ Date.now() }`" data-index="8" :class="{active: activeIndex === 8}">
          휴대폰소액결제
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/mobilepop_auth_template?t=${ Date.now() }`" data-index="9" :class="{active: activeIndex === 9}">
          모바일팝
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/telcodc_auth_template?t=${ Date.now() }`" data-index="10" :class="{active: activeIndex === 10}">
          통신사할인
        </gs-link>
      </li>
      <li class="swiper-slide">
        <gs-link :to="`/pa/easy_total_pay_auth_template?t=${ Date.now() }`" data-index="11" :class="{active: activeIndex === 11}">
          통합간편결제
        </gs-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "PaSmTopMenu",
  props: ['gnbOffsetTop', 'activeIndex', 'type'],
  data() {
    this.device = window.innerWidth / 2;
    return {
      active: this.activeIndex ? this.activeIndex : 0,
      gnbPos: []
    };
  },
  methods: {
    gnbInit() {
      const gnb = this.$refs.gnb.querySelectorAll('li');
      const index = this.active;

      for (let i = 0; i < gnb.length; i++) {
        this.gnbPos[i] = gnb[i].offsetLeft;
      }
      const center = this.gnbPos[index] + Math.floor(gnb[index].clientWidth / 2);
      this.gnbMoveAction(center);
    },
    gnbMoveAction(center) {
      if (center >= this.device) {
        this.$refs.gnbSlide.scrollLeft = center - this.device;
      } else {
        this.$refs.gnbSlide.scrollLeft = 0;
      }
    }
  },
  mounted() {
    this.gnbInit();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap-headerbar h1 { width: 200px; font-size: 20px; font-weight: 400; }
.wrap-gnb .wrap-gnb-slide { overflow-x: auto; border-bottom: 1px solid #e0e0e0; }
</style>
