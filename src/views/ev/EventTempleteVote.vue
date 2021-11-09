<!-- 14.투표이벤트 -->
<template>
  <div class="wrap templete-event" v-bind:class="[siteClass]">
    <!-- START : 이벤트 내용 -->
    <section class="event-cont event-vote">
      <div class="inner">
        <p class="tit">
        <span>
        {{eventInfo.themeInfo[0].eventThmNm}}
        </span>
        </p>
        <div class="wrap-select-vote">
          <div class="select-vote">
            <!-- 선택 된 항목 : .active 클래스 추가
              ex) <label class="choice active" for="vote0" v-on:click="onChoiceVote">
            -->
            <label class="choice" ref="choiceBtn" :for="'vote'+index" v-on:click="onChoiceVote" v-for="(eventZone,index) in itemInfo" :key="index" v-bind="eventZone">
              <input type="radio" name="choice" :id="'vote'+index" aria-label="상품 선택" v-model="chkVal" :value="chkParam[index]" v-show="entyData.length==0"/>
              <span class="pic">
                <img :src="getImg(eventZone.itemImg)" :title="eventZone.itemNm"/>
              </span>
              <template>
                <span class="selected" v-if="entyData.length==0">
                  <img src="@/assets/images/img/img_event_vote_seleted.png" alt="선택" />
                </span>
                <div class="vs" v-for="entyList in entyData" :key="entyList.entrySate" v-bind="entyList" v-show="entyList.eventAchivSpVal == eventZone.entrySate" >
                  <p class="per">{{(entyList.eventAchivVal/totalCnt*100).toFixed(0)}}<span>%</span></p>
                  <p class="cnt">{{entyList.eventAchivVal}}명 투표</p>
                </div>
              </template>
              <gs-link :to="fnSite(eventZone.itemId, eventZone.mallId)" class="wrap-text">
                <span class="text-01">{{eventZone.desc}}</span>
                <span class="text-02">{{eventZone.itemNm}}</span>
              </gs-link>
              <span class="design-obj" :style="{borderTopColor:eventInfo.beneBgColor}"></span><!-- 4월 수정 : 우측 상단 접히는 부분 컬러 데이터로 변경 -->
            </label>
          </div>
        </div>
        <div class="wrap-btn-type">
          <button type="button" class="btn linear" :class="eventInfo.btnRound" :style="{backgroundColor:'black'}" @click="onEntry()" :disabled="btnCont.able">{{btnCont.value}}</button>
        </div>
      </div>
    </section>
    <!-- END : 이벤트 내용 -->
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
import ItemTemplete from '@/common/ItemTemplete';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: 'EventTempleteVote',
  mixins: [AccordionMixin],
  components: {
  },
  props: {
    fnRedirect: Function,
    eventInfo: Object,
    fnEntry: Function,
    setDesabledEntry: Function,
  },
  data() {
    return {
      // START : 스타일
      entyData: [],
      totalCnt: 0,
      // END : 스타일
      today: DateUtils.getToday(),
      eventDay: DateUtils.format(this.eventInfo.eventEndDttm, 'YYYY-MM-DD'),
      btnCont: {
        value: '투표하기',
        able: false
      },
      chkVal: -1,
      chkParam: ['01', '02'],
      param: '',
      itemList: [],
      itemInfo: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    onChoiceVote(e) {
      if (this.btnCont.able) {
        return;
      }
      const el = e.currentTarget;
      const choice = el.parentElement.querySelectorAll('.choice');
      choice.forEach((v, i) => {
        v.classList.remove('active');
      });
      el.classList.add('active');
    },
    async onEntry(e) {
      if (this.isLogin()) {
        // START : validation 작성
        if (this.chkVal == -1) {
          if (this.voteInfo.eventDtlTypeCd=='1201') {
            this.$gsdialog.alert("투표할 상품을 선택해주세요.");
          } else {
            this.$gsdialog.alert("투표할 항목을 선택해주세요.");
          }
          return;
        }
        // END : validation 작성

        const param = {
          eventId: this.$route.params.eventId,
          entrySate: this.chkVal
        };
        this.$emit('fnEntry', param); // 이벤트 응모 호출
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.$emit('fnRedirect', "login");
        });
      }
    },
    async fnResultSearch() {
      const param = {
        eventAchivSpCd: '01' // 팀투표
      };
      await ApiUtils.get('/fo/ev/eventmgnt/vote-event-result/' + this.$route.params.eventId, param)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          if (res.data.data.length > 0) {
            this.btnCont.able = true;
            this.btnCont.value = '투표완료';

            this.entyData = res.data.data;
            const sum = 0;
            this.totalCnt = this.entyData.reduce((sum, item) => sum + Number(item.eventAchivVal), 0);
            if (this.entyData[0].eventAchivVal > this.entyData[1].eventAchivVal) {
              this.$refs.choiceBtn[0].classList.add('active');
              this.$refs.choiceBtn[1].classList.remove('active');
            } else {
              this.$refs.choiceBtn[0].classList.remove('active');
              this.$refs.choiceBtn[1].classList.add('active');
            }
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0) {
        if (res.data.data[0].errorCode) { // 실패한 경우
          this.$emit('setDesabledEntry', false);
        } else { // 성공한 경우
          this.$gsdialog.alert("투표가 완료되었습니다. 결과 발표 후 일괄 지급되오니 이벤트 페이지를 확인해주세요.");
          this.fnResultSearch();
        }
      }
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    fnSite(val, mallId) {
      if (val == '' ) return '#';
      const param = 'itemId='+val;
      const url = "/md/product_detail?"+ param;
      return SiteUtils.to(mallId, url);
    },
  },
  computed: {
    voteInfo: function() {
      return this.eventInfo.themeInfo[0];
    },
  },
  async mounted() {
    this.fnResultSearch();
    if (this.voteInfo.eventDtlTypeCd=='1201') {
      for (let i = 0; i<this.voteInfo.eventDtlZoneList.length; i++) {
        this.param += "&itemId="+this.voteInfo.eventDtlZoneList[i].eventDtlZoneApplVal;
      }
      const pMallId = CookieUtils.getCookie('MALL_ID');
      const pStorId = CookieUtils.getCookie('STOR_ID');
      const pSupplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
      await ApiUtils.get('/fo/md/itemaddinfomgnt/multi-item-list?mallId='+pMallId+'&storId='+pStorId+'&supplFirmCd='+pSupplFirmCd + this.param)
        .then(res => {
          if (res.data && res.data.success && res.data.data) {
            this.itemList = res.data.data;
            for (let i = 0; i<this.voteInfo.eventDtlZoneList.length; i++) {
              for (let j = 0; j<this.itemList.length; j++) {
                if (this.voteInfo.eventDtlZoneList[i].eventDtlZoneApplVal == this.itemList[j].itemId) {
                  this.itemInfo.push({"itemId": this.itemList[j].itemId,
                            "itemNm": this.itemList[j].itemNm,
                            "itemImg": this.itemList[j].itemImg,
                            "desc": this.voteInfo.eventDtlZoneList[i].eventDtlZoneDesc,
                            "seq": this.voteInfo.eventDtlZoneList[i].eventDtlZoneSeqno,
                            "entrySate": this.voteInfo.eventDtlZoneList[i].eventDtlZoneVal,
                            "mallId": this.itemList[j].mallId,
                            });
                }
              }
            }
          }
        })
        .catch(e => {
          this.$gsdialog.alert("오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
        });
    } else {
      for (let i = 0; i<this.voteInfo.eventDtlZoneList.length; i++) {
        this.itemInfo.push({"itemId": "",
                            "itemNm": this.voteInfo.eventDtlZoneList[i].eventDtlZoneApplVal,
                            "itemImg": "",
                            "desc": this.voteInfo.eventDtlZoneList[i].eventDtlZoneDesc,
                            "seq": this.voteInfo.eventDtlZoneList[i].eventDtlZoneSeqno,
                            "entrySate": this.voteInfo.eventDtlZoneList[i].eventDtlZoneVal,
                            });
        }
    }
  },
};
</script>

<style></style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
