<template>
  <div class="item-inner">
    <div class="product" v-for="(items, index) in mainSectionTime" :key="index">
      <div class="item" v-if="index == 0">
        <gs-link to="/product" class="item-link">
          <figure>
            <img src="../../assets/images/_temp/_img_product02_01.jpg" alt="유기농 레몬밤 분말" />
            <!-- 썸네일 없을 경우 -->
            <!-- <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" alt="유기농 레몬밤 분말" /> -->
            <!-- 성인본인인증이 필요한 경우 -->
            <!-- <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" alt="유기농 레몬밤 분말" /> -->
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
                <p class="title-desc">73배 높은 함량</p>
                <strong class="title" aria-label="상품명">
                  <em>{{items.itemNm}}</em>
                </strong>
              </dt>
              <!-- START : 할인할 경우 추가 -->
              <dd class="discount" aria-label="할인율">
                <strong class="num">28</strong>%
              </dd>
              <!-- END : 할인할 경우 추가 -->
              <dd class="wrap-price">
                <!-- START : 할인할 경우 추가 -->
                <span class="list-price" aria-label="할인 적용 전 가격">
                  <del class="price">{{items.bfrSellAmt | toCurrency}}</del>원
                </span>
                <!-- END : 할인할 경우 추가 -->
                <span class="sale-price" aria-label="할인 적용 후 가격">
                  <strong class="price">{{items.sellAmt | toCurrency}}</strong>원
                  <!-- START : 할인할 경우 추가 -->
                  <!-- <button class="btn icon-question" @click="popupSalesActive">
                    <span class="hidden">할인가 내역 상세보기</span>
                  </button>-->
                  <!-- END : 할인할 경우 추가 -->
                </span>
              </dd>
            </dl>
            <div class="wrap-remain" role="timer" aria-live="assertive" aria-atomic="true">
              <!-- START : 남은 수량, 남은 시간 선택 표기 -->
              <!-- <span class="amount">
                남은 수량
                <strong>2,480</strong>
              </span>-->
              <!-- END : 남은 수량, 남은 시간 선택 표기 -->
              <!-- START : 남은 수량, 남은 시간 선택 표기 -->
              <strong class="time">{{countDown}}</strong>
              <!-- END : 남은 수량, 남은 시간 선택 표기 -->
            </div>
          </div>
        </gs-link>
        <span class="wrap-product-tag">
          <span class="ico-tag" aria-label="혜택">다다익선</span>
          <span class="ico-tag" aria-label="혜택">무료배송</span>
          <span class="ico-tag" aria-label="혜택제한">1인n개한정</span>
        </span>
        <button class="btn-cart" aria-label="장바구니담기"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainSectionTime',
  data() {
    return {
      timer: Object, // 타임 세일 타이머
      countDown: '00:00:00', // 타임 세일 형식
    };
  },
  props: {
    expire: String,
    mainSectionTime: {
      type: Array,
      default: () => ({}),
    },
  },
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    },
  },
  methods: {
    timerAction() {
      const $this = this;
      const expireObject = {
        year: $this.expire.substr(0, 4),
        month: $this.expire.substr(4, 2) - 1, // month 0부터 시작
        date: $this.expire.substr(6, 2),
        hours: $this.expire.substr(8, 2),
        minutes: $this.expire.substr(10, 2),
        seconds: $this.expire.substr(12, 2),
        milliseconds: $this.expire.substr(14, 2),
      };
      const expireTime =
        new Date(
          expireObject.year,
          expireObject.month,
          expireObject.date,
          expireObject.hours,
          expireObject.minutes,
          expireObject.seconds,
          expireObject.milliseconds
        ).getTime() / 1000;

      $this.timer = setInterval(function() {
        const now = new Date();
        const currentTime = Math.floor(now.getTime() / 1000);
        const remainTime = expireTime - currentTime;
        const hours = parseInt(Math.floor(remainTime / 3600));
        const minutes = Math.floor((remainTime - hours * 3600) / 60);
        const seconds = remainTime - hours * 3600 - minutes * 60;

        if (remainTime <= 0) {
          clearInterval($this.timer);
        } else {
          const countObject = {
            hours: hours >= 10 ? hours.toString() : '0' + hours,
            minutes: minutes >= 10 ? minutes.toString() : '0' + minutes,
            seconds: seconds >= 10 ? seconds.toString() : '0' + seconds,
          };
          $this.countDown =
            countObject.hours +
            ':' +
            countObject.minutes +
            ':' +
            countObject.seconds;
        }
      }, 1000);
    },
  },
  mounted() {
    this.timerAction();
  },
};
</script>
<style>
</style>
