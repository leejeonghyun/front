<!-- 16.랭킹전이벤트 -->
<template>
  <div class="wrap templete-event" v-bind:class="[siteClass]">
      <!-- START : 이벤트 내용 -->
      <section class="event-cont event-ranking" :style="eventContStyle">
        <div class="wrap-event-ranker">
          <p class="tit">구매왕 랭킹</p>
          <div class="rank-my">
            <div class="my-ranking">
              <img src="@/assets/images/img/img_event_rank_my_ranking.png" alt="" />
              <p :class="[{ 'rank': true}, rankChk(userRank.rank)]" v-if="userRank.rank"><span>{{userRank.rank}}</span>등</p>
              <p class="id" v-if="userRank.webId">{{userRank.webId}}</p>
              <p class="won" v-if="userRank.won">{{userRank.won}}</p>
              <p class="text" v-if="userRank.text" v-html="userRank.text"></p>
              <p class="next" v-if="userRank.next" v-html="userRank.next"></p>
            </div>
          </div>
          <div class="rank-list">
            <p v-if="eventAchivAggProcDttm != null">(제공기준시간 : {{getDate(eventAchivAggProcDttm, 'YYYY.MM.DD.HH:mm')}})</p>
            <table>
              <caption class="hidden">구매왕 랭킹 순위 1위 부터 5위까지의 표</caption>
              <colgroup>
                <col style="width:92px;" />
                <col style="" />
                <col style="" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">순위</th>
                  <th scope="col">아이디</th>
                  <th scope="col">구매금액</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(rank, index) in rankList" v-bind="rank" :key="index">
                  <td><em>{{rank.eventAchivRank}}</em>등</td>
                  <td>{{rank.webId}}</td>
                  <td><span>{{comma(rank.eventAchivVal)}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <!-- END : 이벤트 내용 -->
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import AccordionMixin from '@/mixins/AccordionMixin';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventTempleteRank',
  props: {
    eventInfo: Object,
  },
  mixins: [AccordionMixin],
  data() {
    return {
      userRank: {
        rank: null,
        webId: null,
        won: null,
        text: "로그인 후 확인 가능합니다.",
        next: "내 순위를 확인해보세요!",
      },
      rankList: [],
      eventAchivAggProcDttm: null,
      siteClass: CookieUtils.getSiteClass(),
      // 이벤트 내용 - 배경색
      eventContStyle: {
        backgroundColor: '#fff',
      },
    };
  },
  components: {},
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    comma: function(val) {
      return NumberUtils.toComma(val);
    },
    getDate(date, format) {
      return DateUtils.format(date, format);
    },
    rankChk: function(rank) {
      if (rank == "1") {
        return "icon-1st";
      } else if (rank == "2") {
        return "icon-2st";
      } else if (rank == "3") {
        return "icon-3st";
      } else {
        return "";
      }
    }
  },
  computed: {
  },
  async mounted() {
    // 순위 1~5까지 데이터 조회
    await ApiUtils.get('/fo/ev/eventmgnt/purchase-achivement-ranking-event/' + this.$route.params.eventId, {})
    .then(res => {
      if (res.data && res.data.success && res.data.data) {
        this.rankList = res.data.data.purchAchivRnkmtchList;
        this.eventAchivAggProcDttm = res.data.data.eventAchivAggProcDttm;
      }
    })
    .catch(e => {
      // this.$gsdialog.alert(e.response.data.statusMessage);
    });

    // 내 순위 데이터 조회
    if (this.isLogin()) {
      await ApiUtils.get('/fo/ev/eventmgnt/purchase-achivement-present/' + this.$route.params.eventId, {})
      .then(res => {
        if (res.data && res.data.success) {
          if (res.data.data) {
            this.userRank = {
              rank: res.data.data.eventAchivRank,
              webId: res.data.data.webId,
              won: this.comma(res.data.data.eventAchivVal),
              text: null,
              next: (res.data.data.rankedVal > 0) ? "순위권까지 <span>" + this.comma(res.data.data.rankedVal) + "</span> 얼마남지 않았어요!" : null,
            };
          } else {
            this.userRank = {
              rank: "?",
              webId: null,
              won: null,
              text: "구매 확정된 금액이 없습니다.",
              next: "이벤트에 참여해보세요!",
            };
          }
        }
      });
    }
  },
};
</script>

<style></style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
