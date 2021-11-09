<!--
views/ev/SC-FO-EV-GF-MS-031.vue
-->
<template>
  <div class="wrap">
    <!-- START : Header -->
    <SubDefaultHeader headerText="당첨자 발표" />
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-notice">
        <div class="notice-top">
          <div class="wrap-title">
            <div class="title">
              <span><strong aria-label="이벤트명">[{{winnerData.eventNm}}]</strong>당첨자 발표</span>
            </div>
            <div class="period" aria-label="이벤트 행사기간" v-if="winnerData.winInforDttm != null">{{getDate(winnerData.winInforDttm,'YYYY.MM.DD')}}</div>
          </div>
        </div>
        <div class="notice-content">
          <img :src="winnerData.imgLinkUrl" alt="앱리뷰이벤트 안내 이미지" />
          <!-- START: 이미지 alt값 -->
          <div class="hidden">
            <span>gsfresh 오픈 기념!</span>
            <strong>앱리뷰남기고 5천원 받자</strong>
            <dl>
              <dt>행사명</dt>
              <dd>앱리뷰이벤트</dd>
              <dt>행사기간</dt>
              <dd>2020.07.01-2020.07.31</dd>
              <dt>당첨자발표</dt>
              <dd>2020.08.13</dd>
            </dl>
          </div>
          <!-- START: 이미지 alt값 -->
        </div>
      </div>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
export default {
  name: 'Inquiry',
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '당첨자발표 < 쿠폰/이벤트 < %s'
  },
  components: {
    SubDefaultHeader,
    Footer,
  },
  data() {
    return {
      winnerData: {
        type: Object
      },
      iWinnrPblshDtlInq: {
        eventId: '',
        winInforTypeCd: '02'
      }
    };
  },
  methods: {
    getDate (date, format) {
        return DateUtils.format(date, format);
    },
  },
  mounted: async function() {
    try {
      const eventId = this.$route.params.id;
      this.iWinnrPblshDtlInq.eventId = eventId;
      const response = await ApiUtils.get('/fo/ev/eventinq/winner-publish-image-detail', this.iWinnrPblshDtlInq);
      this.winnerData = response.data.data;
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
};
</script>

<style>
</style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
