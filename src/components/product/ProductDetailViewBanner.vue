<template>
  <div class="product-banner">
    <a href="javascript:;" role="button">
      <figure v-if="this.eventBanner.bigSale">
        <img src="@/assets/images/img/img_banner_big_sale.jpg" @load="loadAction" alt="단 하루 초특가! 위대한 빅 세일">
      </figure>
      <figure v-if="this.eventBanner.hotDeal">
        <img src="@/assets/images/img/img_banner_hot_deal.jpg" @load="loadAction" alt="인기폭팔 특집 오! 핫딜">
      </figure>
      <dl class="big-sale-time" v-if="this.expire">
        <dt>남은시간</dt>
        <dd>
          <strong role="timer" aria-live="assertive" aria-atomic="true">{{countDown}}</strong>
        </dd>
      </dl>
    </a>
  </div>
</template>

<script>
export default {
  name: "ProductDetailViewBanner",
  data() {
    return {
      timer: Object, // 타임 세일 타이머
      countDown: '00:00:00' // 타임 세일 형식
    };
  },
  props: ['expire', 'eventBanner'],
  methods: {
    loadAction() {
      this.$emit('setImageEvent');
    },
    timerAction() {
      const $this = this;
      const expireObject = {
        year: $this.expire.substr(0, 4),
        month: $this.expire.substr(4, 2) - 1, // month 0부터 시작
        date: $this.expire.substr(6, 2),
        hours: $this.expire.substr(8, 2),
        minutes: $this.expire.substr(10, 2),
        seconds: $this.expire.substr(12, 2),
        milliseconds: $this.expire.substr(14, 2)
      };
      const expireTime = (new Date(expireObject.year, expireObject.month, expireObject.date, expireObject.hours, expireObject.minutes, expireObject.seconds, expireObject.milliseconds).getTime()/1000);

      $this.timer = setInterval(function() {
        const now = new Date();
        const currentTime = Math.floor(now.getTime()/1000);
        const remainTime = expireTime - currentTime;
        const hours = parseInt(Math.floor(remainTime/3600));
        const minutes = Math.floor((remainTime-(hours*3600))/60);
        const seconds = remainTime - (hours*3600) - (minutes*60);

        if (remainTime <= 0) {
          clearInterval($this.timer);
        } else {
          const countObject = {
            hours: hours >= 10 ? hours.toString() : '0' + hours,
            minutes: minutes >= 10 ? minutes.toString() : '0' + minutes,
            seconds: seconds >= 10 ? seconds.toString() : '0' + seconds,
          };
          $this.countDown = countObject.hours + ':' + countObject.minutes + ':' + countObject.seconds;
        }
      }, 1000);
    }
  },
  mounted() {
    if (this.expire) {
      this.timerAction();
    }
  }
};
</script>
