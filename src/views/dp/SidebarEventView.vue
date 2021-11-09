<template>
  <!-- START : 브랜드 전용관 -->
  <section class="wrap-event" v-if="isLoaded.event && eventData.length > 0">
    <h2>진행중인 이벤트</h2>
    <a href="javascript:void(0);" class="btn-all-view" @click="goEvent">전체보기</a>
    <ul class="wrap-list-event">
      <li class="list" v-for="(eventList,i) in eventData" v-bind="eventList" v-bind:key="i" v-show="pageCtn.eventCnt > i">
        <gs-link :to="'/ev/event/'+eventList.eventId" class="link">
          <figure :alt="eventList.eventNm" :title="eventList.eventNm">
            <img v-bind:src="eventList.ctnsPathNm" v-if="eventList.ctnsPathNm" />
          </figure>
          <dl class="txt">
            <dt class="title">{{eventList.eventNm}}</dt>
            <dd class="period">{{getDate(eventList.eventBeginDttm,'YYYY.MM.DD')}} ~ {{getDate(eventList.eventEndDttm,'YYYY.MM.DD')}}</dd>
          </dl>
        </gs-link>
      </li>
      <NoList NoListText="진행중인 이벤트가 없습니다." :ListType="'mypage-notice'" v-if="isLoaded.event && eventData.length <= 0 "/>
    </ul>
  </section>
  <!-- END : 브랜드 전용관 -->
</template>
<script>
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import NoList from '@/components/common/NoList';
export default {
  name: 'SidebarEventView',
  components: {
    NoList,
  },
  data() {
    return {
      isLoaded: {
        event: false,
        winner: false,
      },
      eventData: [],
      pageCtn: {
        eventCnt: 3,
        winCnt: 3
      },
    };
  },
  async created() {
  },
  methods: {
    async eventList() {
      await ApiUtils.get('/ev/eventinq/progress-event-list', {cmmSteId: CookieUtils.getCmmSteId()})// [202017P] 2020.11.30 Market For 커머스사이트ID 추가
      .then(res => {
        this.isLoaded.event = true;
        if (res.data && res.data.success && res.data.data) {
          this.eventData = res.data.data.progEventList;
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    getDomain(eventId) {
      const homeCode = 'cm';
      return CookieUtils.getDomain(homeCode)+'/ev/event/'+eventId;
    },
    getDate (date, format) {
        return DateUtils.format(date, format);
    },
    goEvent() {
      this.$router.push('/ev/event_list');
    },

  },
  mounted() {
    this.eventList();
  },
};
</script>
<style scoped>
</style>
