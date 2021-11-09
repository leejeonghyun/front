<template>
  <div class="wrap-ticker" v-if="typingStatus" :class="{typing: typingStatus, active: showTabbar}">
    <div class="model" aria-label="GSfresh모델"></div>
    <div class="wrap-speech">
      <div class="speech-bubble" @click="tickerClick">
        <vue-typed-js
          :strings="[adText]"
          :typeSpeed="30"
          :startDelay="1000"
          :showCursor="false"
          @onComplete="typingComplete"
          v-if="typingStatus"
        >
          <span class="typing"></span>
        </vue-typed-js>
      </div>
      <button
        class="btn-close"
        v-if="complete"
        aria-label="말풍선닫기"
        @click="typingDestroyAction('AlarmTickerCpn')"
      ></button>
    </div>
  </div>
</template>
<script>
import { VueTypedJs } from 'vue-typed-js';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'AlarmTicker',
  components: {
    VueTypedJs,
  },
  props: ['typingStatus', 'showTabbar', 'adText', 'linkurl'],
  data() {
    return {
      complete: false,
    };
  },
  methods: {
    typingDestroyAction(type) {
      this.$emit('typingDestroyEvent', type);
    },
    tickerClick() {
      if (this.linkurl) {
        SiteUtils.go(location.host, this.linkurl);
      }
    },
    typingComplete() {
      this.complete = true;
    },
  },
};
</script>
<style>
</style>
