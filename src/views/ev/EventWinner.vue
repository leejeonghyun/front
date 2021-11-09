<!--
views/ev/SC-FO-EV-GF-MS-031.vue,views/ev/SC-FO-EV-GF-MS-032.vue
-->
<template>
  <div class="wrap" :class="siteClass">
    <!-- START : Header -->
    <SubDefaultHeader headerText="당첨자 발표"/>
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-notice">
        <div class="notice-top">
          <div class="wrap-title">
            <div class="title">
              <span><strong aria-label="이벤트명">[{{eventInfo.eventNm}}]</strong>당첨자 발표</span>
            </div>
            <div class="period" aria-label="당첨자 발표 기간" v-if="eventInfo.winInforDttm != null">{{getDate(eventInfo.winInforDttm,'YYYY.MM.DD')}}</div>
          </div>
        </div><!-- 당첨유형(eventWinModeCd) 이 사후당첨(02)일 경우에, winInforTypeCd = 01 02 03 사용 -->
        <div class="notice-content" v-if="this.eventInfo.winInforTypeCd == '02' && this.eventInfo.eventWinModeCd == '02'"> <!-- 01 지정안함 , 02 이미지형 , 03 텍스트형 -->
          <img :src="winnerImg.ctnsPathNm" alt="당첨자 발표 이미지" v-if="this.eventInfo.winInforTypeCd == '02' && winnerImg" />
        </div>
        <div class="notice-content" v-if="this.eventInfo.winInforTypeCd == '03' && this.eventInfo.eventWinModeCd == '02'"> <!-- 01 지정안함 , 02 이미지형 , 03 텍스트형 -->
          <div class="sub-inner-box" v-if="winnerCtns" v-html="winnerCtns.ctnsDtlCnts"></div> <!-- 텍스트형 = html -->
        </div>
        <div class="notice-content" v-if="this.eventInfo.winInforTypeCd == '02' && this.eventInfo.eventWinModeCd == '01'"> <!-- 당첨유형이 즉시당첨(01)일 경우에만 사용 -->
          <div class="wrap-inner-content">
            <div class="wrap-input-search">
              <strong class="input-title">당첨 조회</strong>
              <div class="input-border">
                <label for="searchName" class="hidden">당첨자 이름 검색하기</label>
                <input type="text" id="searchName" v-model="searchWinnrNm" placeholder="이름을 입력하세요"/>
              </div>
              <button class="btn-bg darkgray" @click="searchWinnr()">조회</button>
            </div>
            <ol class="wrap-list-winner">
              <li v-for="gvwy in eventInfo.eventGvwyList" v-bind="gvwy" :key="gvwy.gvwySeqno">
                <p class="title"><strong class="num" v-if="eventInfo.gvwyRnkAsgnYn == 'Y'">{{gvwy.eventGvwyRnk}}등</strong>{{getGvwyNm(gvwy)}}<span class="count">({{getGvwyCnt(gvwy.gvwySeqno)}}명)</span></p>
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
                  <tbody v-for="winner in winnerList" v-bind="winner" :key="winner.eventWinSeqno">
                    <tr v-if="winner.gvwySeqno == gvwy.gvwySeqno">
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
    <Footer/>
    <!-- END : footer -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'EventWinner',
  metaInfo() {
    return {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '당첨자 발표 상세 < 당첨자 발표 < 이벤트 < %s',
      meta: [
        {
          property: 'aa:page',
          content: '당첨자 발표',
        },
      ],
    };
  },
  components: {
    SubDefaultHeader,
    Footer,
  },
  data() {
    return {
      eventInfo: {},
      winnerList: {},
      searchWinnrNm: null,
      winnerImg: null,
      winnerCtns: null,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    getGvwyCnt(gvwySeqno) {
      if (this.winCntList) {
        const winCntInfo = this.winCntList.find(info => {
          return info.gvwySeqno == gvwySeqno;
        });
        if (winCntInfo) {
          return this.toComma(winCntInfo.gvwyWinUserCnt);
        }
      }
      return 0;
    },
    getGvwyNm(gvwyInfo) {
      if (gvwyInfo.gvwyTypeCd == '1') {
        return gvwyInfo.promNm; // + " " + this.toComma(gvwyInfo.beneApplVal) + ((gvwyInfo.dcTypeCd == "R") ? "%" : "원");
      } else if (gvwyInfo.gvwyTypeCd == '2') {
        return gvwyInfo.commCdNm + " " + this.toComma(gvwyInfo.gvwyApplVal) + "P ";
      } else if (gvwyInfo.gvwyTypeCd == '3') {
        return gvwyInfo.commCdNm + " " + this.toComma(gvwyInfo.gvwyApplVal) + "원";
      } else if (gvwyInfo.gvwyTypeCd == '4') { // 경품
        return gvwyInfo.gvwyApplVal;
      } else if (gvwyInfo.gvwyTypeCd == '5') { // 기프티콘
        return gvwyInfo.gvwyApplVal;
      }
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    getDate (date, format) {
      return DateUtils.format(date, format);
    },
    fnPhoneFormat(phone) {
      if (phone) {
        const number = phone.replace(/[^0-9*]/g, "");
        if (number.length <= 4) {
          return number.substr(0, 4);
        } else if (number.length < 7) {
          return number.substr(0, 4) + "-" + number.substr(4);
        } else {
          return number.substr(0, 4) + "-" + number.substr(4);
        }
      }
      return phone;
    },
    async searchWinnr() {
      try {
        if (!this.searchWinnrNm) {
          this.$gsdialog.alert("이름을 입력하세요.");
          return;
        }
        const params = {
          searchWinnrNm: this.searchWinnrNm,
        };
        await ApiUtils.get('/fo/ev/eventmgnt/event-gvwy-winner-list/' + this.$route.params.eventId, params)
        .then(res => {
          let alertMsg = "";
          if (res.data && res.data.success && res.data.data) {
            if (this.eventInfo && this.eventInfo.eventGvwyList) {
              if (res.data.data.winnrList && res.data.data.winnrList.length > 0) {
                for (let k=0; k<res.data.data.winnrList.length; k++) {
                  const winnr = res.data.data.winnrList[k];
                  const winGvwy = this.eventInfo.eventGvwyList.find(info => {
                    return info.gvwySeqno == winnr.gvwySeqno;
                  });
                  if (winGvwy) {
                    alertMsg += winGvwy.eventGvwyRnk + "등 " + this.getGvwyNm(winGvwy) + "에 당첨되셨습니다.\n";
                  }
                }
              }
            } else {
              alertMsg = "경품내역이 없습니다.";
            }
          }
          if (!alertMsg) {
            if (res.data.data.entryCntInfo && res.data.data.entryCntInfo.totalCnt == 0) {
              alertMsg = "이벤트 참여 이력이 없습니다.";
            } else {
              alertMsg = "안타깝게도 이벤트에 당첨되지 않으셨습니다.";
            }
          }
          this.$gsdialog.alert(alertMsg);
          this.searchWinnrNm = '';
        })
        .catch(e => {
          // this.$gsdialog.alert(e.response.data.statusMessage);
        });
      } catch (e) {
        // this.$gsdialog.alert('오류가 발생했습니다.');
      }
    },
  },
  mounted: async function() {
    await ApiUtils.get('/ev/eventinq/winner-publish-detail/' + this.$route.params.eventId, {})
    .then(res => {
      if (res.data && !res.data.success) {
        this.$gsdialog.alert(res.data.errorMsg);
      } else {
        if (res.data.data) {
          this.eventInfo = res.data.data;
          // if (this.eventInfo.winInforTypeCd == "01") { -- 원본
          if (this.eventInfo.eventWinModeCd == "02") { // 당첨유형 eventWinModeCd = 02 사후당첨 , 당첨안내유형코드 winInforTypeCd = 02 이미지형
            if (this.eventInfo.eventCtnsList && this.eventInfo.eventCtnsList.length > 0) {
              this.winnerImg = this.eventInfo.eventCtnsList.find(info => {
                return info.eventCtnsTypeCd == "08";
              });
            }
          } else if (this.eventInfo.winInforTypeCd == "02" && this.eventInfo.eventWinModeCd == "01") { // 즉시당첨이고, 이미지 형으로 할 경우에만 리스트형으로 탄다.
            ApiUtils.get('/fo/ev/eventmgnt/event-gvwy-winner-list/' + this.$route.params.eventId, {})
            .then(res => {
              if (res.data && res.data.success && res.data.data && res.data.data.winnrList) {
                this.winnerList = res.data.data.winnrList;
              }
              if (res.data && res.data.success && res.data.data && res.data.data.winCntList) {
                this.winCntList = res.data.data.winCntList;
              }
            })
            .catch(e => {
              // this.$gsdialog.alert(e.response.data.statusMessage);
            });
          }
          this.winnerCtns = this.eventInfo.eventCtnsList.find(info => {
            return info.eventCtnsTypeCd == "09";
          });
        }
      }
    })
    .catch(e => {
      // this.$gsdialog.alert(e.response.data.statusMessage);
    });
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
