<template>
  <!-- 별도 페이지 없음.-->
  <div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';

export default {
  name: "GateChannel",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle()
  },
  created() {
    // console.log("GateChannel.created");
  },
  mounted() {
    // console.log("GateChannel.mounted");
    this.init();
  },
  methods: {
    async init() {
      // 파라미터 정보
      const queryString = Object.keys(this.$route.query).map(key => key + '=' + this.$route.query[key]).join('&');
      // 리턴 URL
      // const targetRedirectUrl = this.$route.query.targetRedirectUrl;
      const redirectUrl = queryString.substring(queryString.indexOf('targetRedirectUrl')).replace('targetRedirectUrl=', '');
      // 채널
      const inflowChannel = this.$route.query.inflowChannel;

      // 쿠키 채널 값 갱신 파라미터
      const param = {
        chanlId: inflowChannel
      };
      if ('81' == param.chanlId) {
        await this.$gsdialog.alert('임직원 업무용 구매 채널입니다. <br> 본 채널을 통한 구매 시 GS&Point / THE POP 리워즈가 발생되지 않습니다.', {html: true});
      }
      // ENC_VAL 갱신 처리
      LoginUtils.updateEncVal(param).then(() => {
        if (CookieUtils.getCmmSteId() == '3') {
          CookieUtils.setCookie('CHANL_ID', CookieUtils.getChanlId());
        } else {
          CookieUtils.setCookie('CHANL_ID', user.chanlId);
        }
        location.href = redirectUrl;
      });
    }
  }
};
</script>

<style scoped>

</style>
