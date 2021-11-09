<!--
views/ev/SC-FO-EV-GF-MS-032.vue
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
            <div class="period" aria-label="이벤트 행사기간" v-if="winnerData.winInforDttm != null">{{winnerData.winInforDttm}}</div>
          </div>
        </div>
        <div class="notice-content">
          <div class="wrap-inner-content">
            <div class="wrap-input-search">
              <strong class="input-title">당첨 조회</strong>
              <div class="input-border">
                <label for="searchName" class="hidden">당첨자 이름 검색하기</label>
                <input type="text" id="searchName" v-model="iWinnrPblshDtlInq.winnrNm" placeholder="이름을 입력하세요"/>
              </div>
              <button class="btn-bg darkgray" @click="winnerList('click')">조회</button>
            </div>
            <ol class="wrap-list-winner">
           <!-- <li v-for="winner in winnerData.winSateList" v-if="winner.gvwySeqno = " v-bind="winner.eventWinSeqno" :key="winner.eventWinSeqno">

              </li> -->
              <li v-for="gvwy in winnerData.gvwyList" v-bind="gvwy" :key="gvwy.gvwySeqno">
                <p class="title"><strong class="num">{{gvwy.eventGvwyRnk}}등</strong>{{gvwy.gvwyApplVal}}<span class="count">({{gvwy.gvwyPrvdQty}}명)</span></p>
                <table class="wrap-table">
                  <caption>{{gvwy.eventGvwyRnk}}등 당첨자 정보</caption>
                  <colgroup>
                    <col style="50%" />
                    <col style="50%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">전화번호</th>
                      <th scope="col">이름</th>
                    </tr>
                  </thead>
                  <tbody v-for="winner in winnerData.winSateList" v-bind="winner" :key="winner.eventWinSeqno">
                    <tr v-if="winner.gvwySeqno == gvwy.gvwySeqno" >
                      <td>{{winner.moblTelNo}}</td>
                      <td>{{winner.winnrNm}}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ol>
          </div>
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
      winnerData: [],
      winSearch: [],
      iWinnrPblshDtlInq: {
        eventId: '',
        winInforTypeCd: '03',
        winnrNm: ''
      }
    };
  },
  mounted: async function() {
    this.winnerList();
  },
  methods: {
    async winnerList(val) {
      try {
        const eventId = this.$route.params.id;
        this.iWinnrPblshDtlInq.eventId = eventId;
        const response = await ApiUtils.get('/fo/ev/eventinq/winner-publish-html-detail', this.iWinnrPblshDtlInq);
        this.winnerData = response.data.data;
        let returnText = '';
        if (this.iWinnrPblshDtlInq.winnrNm != null && this.iWinnrPblshDtlInq.winnrNm != '') {
          this.winSearch = response.data.data;
        } else {
          this.winnerData = response.data.data;
        }
        if (this.iWinnrPblshDtlInq.winnrNm != null && this.iWinnrPblshDtlInq.winnrNm != '') {
          if (this.winSearch.winSateList == null) {
            this.$gsdialog.alert("이벤트 참여 이력이 없습니다.");
            this.iWinnrPblshDtlInq.winnrNm = '';
            // this.winnerList();
          } else if (this.winSearch.winSateList.length >= 1) {
            for (let i = 0; i < this.winSearch.winSateList.length; i++ ) {
              const returnData = this.winSearch.winSateList[i];
              if (returnData.gvwySeqno != null) {
                returnText += returnData.eventGvwyRnk.trim()+"등 " +returnData.gvwyApplVal+"에 당첨되셨습니다. \n";
              } else {
                returnText = "안타깝게도 이벤트에 당첨되지 않으셨습니다.";
              }
            }
            this.$gsdialog.alert(returnText);
            this.iWinnrPblshDtlInq.winnrNm = '';
            this.winnerList();
          }
        }
      } catch (e) {
        this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
          console.log(e);
        });
      }
    },
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
