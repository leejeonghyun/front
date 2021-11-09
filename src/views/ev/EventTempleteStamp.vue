<!--
views/ev/SC-FO-EV-GF-MS-002.vue
-->
<!-- 02. 스템프 이벤트 -->
<template>
  <section>
    <!-- START : 스템프 이벤트 -->
    <section class="event-cont event-stamp type1">
      <div class="wrapper" :class="`progress`+Object.keys(stampList).length">
        <div class="stamp-state">미션 <span class="total"><strong>{{Object.keys(stampList).length}}</strong>개</span> 중 <span class="count"><strong>{{beneEntryCnt}}</strong>개</span> 성공!</div>
        <div class="inner">
          <div class="stamp" :class="stamp" v-for="(stamp, key) in stampList" :id="`stamp_`+key" :key="`stamp_`+key">
            <img :src="stamp.off.imgLinkUrl" :alt="stamp.off.ctnsDesc" :title="stamp.off.ctnsDesc" />
            <img :src="stamp.on.imgLinkUrl" :alt="stamp.on.ctnsDesc" :title="stamp.on.ctnsDesc" />
          </div>
        </div>
      </div>
      <section class="wrap-btn-type">
        <!--원본 11/30--> <button type="button" class="btn round type1" @click="fnEntryBeneAccept" :disabled="beneBtnDisabled">혜택받기</button>
        <!-- <button type="button" class="btn round" @click="fnEntryBeneAccept" :disabled="beneBtnDisabled">혜택받기</button> -->
      </section>
    </section>
    <!-- END : 스탬프 이벤트 -->
    <!-- START : 스와이프 배너 -->
    <section class="event-cont event-swiper-banner stamp-info-list" v-if="this.eventInfo.eventTypeCd == '03'">
      <h2 class="title"><em>스탬프별</em> 안내</h2>
      <div class="inner">
        <div class="swiper-button-prev" aria-label="이전슬라이드" slot="button-prev" ref="mySwiperPrev" role="button"></div>
        <div class="swiper-button-next" aria-label="다음슬라이드" slot="button-next" ref="mySwiperNext" role="button"></div>
        <swiper :options="swiperOption" ref="mySwiper">
          <swiperSlide v-for="(item, idx) in (Math.ceil(Object.keys(stampList).length/swiperStampMaxNum))" :key="item+`_`+idx">
            <ul class="list">
              <template v-for="(stamp, key) in stampList">
                <li v-if="stamp.page == item" :key="`stampGvwy_`+key">
                  <gs-link :to="fnSite(stamp.eventDtlZoneVal, stamp.eventDtlZoneApplVal, stamp.mallId, stamp.dspCtgId)">
                    <img :src="stamp.on.imgLinkUrl" class="img-stamp" :alt="stamp.on.ctnsDesc" :title="stamp.on.ctnsDesc"/>
                    <p class="cont"><em>{{stamp.eventDtlZoneDesc}}</em> 제품 보러가기</p>
                  </gs-link>
                </li>
              </template>
            </ul>
          </swiperSlide>
          <div class="swiper-pagination" ref="mySwiperPagination" slot="pagination"></div>
        </swiper>
        <p class="desc">획득한 스탬프는 자동 응모됩니다.</p>
      </div>
    </section>
    <!-- END : 스와이프 배너 -->
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'; // 스와이프
import SlideControlMixin from '@/mixins/SlideControlMixin';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: 'EventTempleteStamp',
  mixins: [SlideControlMixin],
  components: {
    swiper,
    swiperSlide
  },
  props: {
    popupEvent: Function,
    setPopupCongInfo: Function,
    setWinGvwyAdrsSeqnoList: Function,
    fnRedirect: Function,
    eventInfo: Object,
  },
  data() {
    return {
      swiperOption: {}, // 스와이프 옵션
      swiperStampMaxNum: 3, // 스탬프별 안내 개수
      entryCondCnt: 0,
      beneEntryCnt: 0,
      stampList: [],
      stampCompleteYn: "N",
      beneDownAvailable: "Y",
      beneAcceptBtnYn: "N",
      winAdrsYn: 'Y',
    };
  },
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    fnEntryBeneAccept(event) { // 혜택받기
      event.preventDefault();
      if (this.beneAcceptBtnYn == "N") {
        this.beneAcceptBtnYn = "Y";
        if (this.isLogin()) {
           // console.log("this.stampCompleteYn::"+this.stampCompleteYn+"//this.beneDownAvailable:"+this.beneDownAvailable); // Y N
          if (this.stampCompleteYn == "Y" && this.beneDownAvailable == "Y") {
            ApiUtils.post('/fo/ev/eventmgnt/event-bene-accept/' + this.$route.params.eventId, {cmmSteId: CookieUtils.getCmmSteId()})// [202017P] 2021.03.11 Market For 커머스사이트ID 추가
            .then(res => {
              if (res.data && res.data.success) {
                this.beneAcceptBtnYn = "N"; // 버튼 클릭 체크
                this.beneDownAvailable = "N"; // 혜택받기 불가
                const eventWinGvwyList1 = [];
                const eventWinGvwyList2 = [];
                const eventWinGvwyList3 = [];
                const eventWinGvwyList4 = [];
                const eventWinGvwyList5 = [];
                let eventWinGvwyErrMsg = "";
                const winGvwyAdrsSeqnoList = [];
                let winGvwyCnt = 0;
                let usedCpnCnt = 0;
                for (let i=0; i<res.data.data.length; i++) {
                  const winGvwy = res.data.data[i];
                  if (winGvwy.eventWinStatCd == "01") {
                    winGvwyCnt++;
                    if (winGvwy.gvwyTypeCd == "1") {
                      if (winGvwy.errorCode == "USED_COUPON") {
                        usedCpnCnt++;
                        eventWinGvwyErrMsg = winGvwy.errorMsg;
                      } else {
                        eventWinGvwyList1.push(winGvwy);
                      }
                    } else if (winGvwy.gvwyTypeCd == "2") {
                      eventWinGvwyList2.push(winGvwy);
                    } else if (winGvwy.gvwyTypeCd == "3") {
                      eventWinGvwyList3.push(winGvwy);
                    } else if (winGvwy.gvwyTypeCd == "4") {
                      eventWinGvwyList4.push(winGvwy);
                      if (winGvwy.eventWinStatCd != '02') {
                        winGvwyAdrsSeqnoList.push(winGvwy.eventWinSeqno);
                      }
                    } else if (winGvwy.gvwyTypeCd == "5") {
                      eventWinGvwyList5.push(winGvwy);
                    }
                  }
                }
                if (winGvwyCnt == 0 && usedCpnCnt == 0) {
                  this.$gsdialog.alert("당첨된 경품이 없습니다.");
                } else if (winGvwyCnt == usedCpnCnt) {
                  this.$emit('setWinGvwyAdrsSeqnoList', winGvwyAdrsSeqnoList);
                  this.$emit('setPopupCongInfo', {
                    title: "축 미션 완료!",
                    msg: null,
                    winAdrsYn: "N",
                    eventWinGvwyList1: [],
                    eventWinGvwyList2: [],
                    eventWinGvwyList3: [],
                    eventWinGvwyList4: [],
                    eventWinGvwyList5: [],
                    eventWinGvwyErrMsg: eventWinGvwyErrMsg,
                  });
                  this.$emit('popupEvent', 'popupCongratulation');
                } else {
                  this.$emit('setWinGvwyAdrsSeqnoList', winGvwyAdrsSeqnoList);
                  this.$emit('setPopupCongInfo', {
                    title: "축 미션 완료!",
                    msg: null,
                    winAdrsYn: "N",
                    eventWinGvwyList1: eventWinGvwyList1,
                    eventWinGvwyList2: eventWinGvwyList2,
                    eventWinGvwyList3: eventWinGvwyList3,
                    eventWinGvwyList4: eventWinGvwyList4,
                    eventWinGvwyList5: eventWinGvwyList5,
                    eventWinGvwyErrMsg: "",
                  });
                  this.$emit('popupEvent', 'popupCongratulation');
                }
              }
            })
            .catch(e => {
              // this.$gsdialog.alert(e.response.data.statusMessage);
              this.beneAcceptBtnYn = "N";
            });
          } else if (this.beneDownAvailable == "N" && this.stampCompleteYn == "Y") {
            // [202017P] Market For 이미 혜택받은 경우, 버튼 disable 처리 된 부분 수정. => disable 처리 풀고, alert
            const popupCongInfo = {
              title: "알림",
              msg: "이미 미션완료 혜택을 받은<br />이벤트 입니다.",
              winAdrsYn: "Y",
              eventWinGvwyList1: [],
              eventWinGvwyList2: [],
              eventWinGvwyList3: [],
              eventWinGvwyList4: [],
              eventWinGvwyList5: [],
            };
            this.$emit('setPopupCongInfo', popupCongInfo);
            this.$emit('popupEvent', 'popupCongratulation');
            this.beneAcceptBtnYn = "N";
          }
        }
      }
    },
    fnSite(div, val, mallId, dspCtgId) {
      const cmmSteId = CookieUtils.getCmmSteId();
      if (div == '01') {
        // const url = '';
        if (cmmSteId == '3') {// [202017P] MarketFor URL 분기처리
          console.log("마켓포01");
          if (val == '301') {
            console.log("gsshop main");
            const url = '/gsshop';
            return SiteUtils.to(val, url);
          } else {
            console.log("gsshop 제외+mallId:"+val);
            const url = '/mall_main?mallId='+val;
            return SiteUtils.to(val, url);
          }
        } else {
          const url = '/dp/main_view';
          return SiteUtils.to(val, url);
        }
      } else if (div== '02') {
        // const param = '';
        if (cmmSteId == '3') {// [202017P] MarketFor URL 분기처리
          console.log("마켓포02");
          const param = 'itemId='+val+'&mallId='+mallId;
          const url = "/md/product_detail?"+ param;
          return SiteUtils.to(mallId, url);
          } else {
          const param = 'itemId='+val;
          const url = "/md/product_detail?"+ param;
          return SiteUtils.to(mallId, url);
          }
      } else if (div== '03') {
        const param = 'dspCtgId='+val;
        let url = "/product?"+ param;
        if (dspCtgId == "20") {
          url = "/dp/main_simple_cook";
          dspCtgId = 1;
        }
        return SiteUtils.to(dspCtgId, url);
      }
    },
  },
  computed: {
    beneBtnDisabled() {
      // 수정 1201 이미 혜택을 받은 케이스도 클릭 되도록
      return !((this.beneDownAvailable == "Y"||this.beneDownAvailable == "N") && this.stampCompleteYn == "Y");
    },
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    stampImgInfo() {
      if (this.eventInfo.eventTypeCd == '02' || this.eventInfo.eventTypeCd == '03') {
        return this.eventInfo.eventCtnsList.filter(info => {
          return info.eventCtnsTypeCd == "11" && (info.eventCtnsDtlTypeCd == "0201" || info.eventCtnsDtlTypeCd == "0202");
        });
      }
      return null;
    },
  },
  async mounted() {
    if (this.eventInfo.eventTypeCd == '02') { // 일반응모
      this.stampList = [];
    } else if (this.eventInfo.eventTypeCd == '03') {
      this.stampList = {};
    }
    for (let i=0; i<this.eventInfo.themeInfo[0].eventDtlApplVal; i++) {
      let spStamp = {};
      let stampKey = "";
      let stamp = "";
      if (this.eventInfo.eventTypeCd == '02') { // 일반응모
        stampKey = i;
        stamp = this.stampImgInfo[(i+2)%2];
      } else if (this.eventInfo.eventTypeCd == '03') {
        spStamp = this.eventInfo.themeInfo[0].eventDtlZoneList[i];
        stampKey = spStamp.stmpGrpId; // aa,bb,cc,dd,ee,ff
        stamp = this.stampImgInfo[i];
      }

      this.stampList[stampKey] = {
        on: {},
        off: {},
        active: "",
        eventDtlZoneDesc: this.eventInfo.eventTypeCd == '03' ? spStamp.eventDtlZoneDesc : stamp.ctnsDesc,
        eventDtlZoneVal: this.eventInfo.eventTypeCd == '03' ? spStamp.eventDtlZoneVal : '',
        eventDtlZoneApplVal: this.eventInfo.eventTypeCd == '03' ? spStamp.eventDtlZoneApplVal : '',
        mallId: this.eventInfo.themeInfo[0].eventDtlZoneList[i] != null ? this.eventInfo.themeInfo[0].eventDtlZoneList[i].mallId : '',
        dspCtgId: this.eventInfo.themeInfo[0].eventDtlZoneList[i] != null ? this.eventInfo.themeInfo[0].eventDtlZoneList[i].dspCtgId : '',
        page: Math.ceil((i+1)/this.swiperStampMaxNum),
      };
    }
    for (let i=0; i<this.eventInfo.themeInfo[0].eventDtlApplVal*2; i++) {
      let img = "";
      if (this.eventInfo.eventTypeCd == '02') { // 일반응모
        img = this.stampImgInfo[(i+2)%2];
      } else if (this.eventInfo.eventTypeCd == '03') {
        img = this.stampImgInfo[i];
      }
      const temp = {
        imgLinkUrl: img.ctnsPathNm,
        ctnsDesc: img.ctnsDesc,
        eventCtnsSeqno: img.eventCtnsSeqno,
      };
      let stampKey = "0";
      if (this.eventInfo.eventTypeCd == '02') { // 일반응모
        stampKey = Math.round((i+1)/2)-1;
      } else if (this.eventInfo.eventTypeCd == '03') {
        stampKey = img.stmpGrpId;
      }
      if (img.stmpGrpId && img.eventCtnsDtlTypeCd == "0201") {
        this.stampList[stampKey].on = Object.assign({}, temp);
      } else if (img.stmpGrpId && img.eventCtnsDtlTypeCd == "0202") {
        this.stampList[stampKey].off = Object.assign({}, temp);
      }
    }

    const entryCondCntInfo = this.eventInfo.eventDtlList.find(info => {
      return info.eventDtlSpCd == "01" && !info.eventDtlTypeCd;
    });
    if (entryCondCntInfo) {
      this.entryCondCnt = entryCondCntInfo.eventDtlApplVal;
    }

    if (this.isLogin()) {
      await ApiUtils.get('/fo/ev/eventmgnt/event-entry/' + this.$route.params.eventId)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          // 응모내역조회 결과
          this.winAdrsYn = "Y";
          this.beneEntryCnt = 0;
          this.beneDownAvailable = "Y";
          let tempEntrySeqno = "";
          const tempStampList = [];
          const winGvwyAdrsSeqnoList = [];
          for (let i=0; i<res.data.data.length; i++) {
            const entry = res.data.data[i];
            if (this.eventInfo.eventTypeCd == '02') { // 일반스탬프응모
              if (tempEntrySeqno != entry.eventEntrySeqno) {
                tempEntrySeqno = entry.eventEntrySeqno;
                if (this.beneEntryCnt < this.entryCondCnt && this.beneEntryCnt < this.stampList.length) {
                  this.stampList[this.beneEntryCnt].active = "active";
                  this.beneEntryCnt++;
                }
              }
            } else if (this.eventInfo.eventTypeCd == '03') {
              const stamp = entry.entrySate.split(':')[0];
              if (tempStampList.indexOf(stamp) < 0) {
                tempStampList.push(stamp);
                this.stampList[stamp].active = "active";
                this.beneEntryCnt++;
              }
            }
            // 미발급 혜택이 있는 경우
            if (entry.eventWinSeqno) {
              // console.log("eventWinSeqno:::::::::"+entry.eventWinSeqno);
              this.beneDownAvailable = "N";
            }
            const winGvwy = this.eventInfo.eventGvwyList.find(info => {
              return info.gvwySeqno == entry.gvwySeqno;
            });
            if (winGvwy) {
              if (winGvwy.gvwyTypeCd == "4") {
                if (entry.winAdrsYn == "N") {
                  this.winAdrsYn = "N";
                  winGvwyAdrsSeqnoList.push(entry.eventWinSeqno);
                }
              }
            }
          }
          this.$emit('setWinGvwyAdrsSeqnoList', winGvwyAdrsSeqnoList);

          // 스탬프를 완성한 경우
          if (this.beneEntryCnt == this.entryCondCnt) {
            this.stampCompleteYn = "Y";
          }
          if (this.beneDownAvailable == "Y" && this.stampCompleteYn == "Y") {
            const popupCongInfo = {
              title: "축 미션 완료!",
              msg: "미션을 완료하였습니다.<br /><br />하단 혜택받기 버튼을 통하여<br />미션완료 혜택을 확인해주세요!",
              winAdrsYn: "Y",
              eventWinGvwyList1: [],
              eventWinGvwyList2: [],
              eventWinGvwyList3: [],
              eventWinGvwyList4: [],
              eventWinGvwyList5: [],
            };
            this.$emit('setPopupCongInfo', popupCongInfo);
            this.$emit('popupEvent', 'popupCongratulation');
          } else {
            if (this.winAdrsYn == "N") {
              const popupCongInfo = {
                title: "경품지 미입력",
                msg: "배송지를 입력해 주셔야 발송이 가능합니다.",
                winAdrsYn: "N",
                eventWinGvwyList1: [],
                eventWinGvwyList2: [],
                eventWinGvwyList3: [],
                eventWinGvwyList4: [],
                eventWinGvwyList5: [],
              };
              this.$emit('setPopupCongInfo', popupCongInfo);
              this.$emit('popupEvent', 'popupCongratulation');
            }
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    }

    if (this.eventInfo.eventTypeCd == '03') {
      this.slideNextPrevButton('mySwiper', true);
    }
  },
};
</script>

<style></style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
