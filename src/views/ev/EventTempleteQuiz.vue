<!-- 13.퀴즈이벤트 -->
<template>
  <div class="wrap templete-event" v-bind:class="[siteClass]">
    <section class="event-cont event-quiz" v-for="(event, idx) in eventInfo.themeInfo" :key="event.eventDtlSeqno">
      <div class="inner">
        <div class="question">
          <p class="q"><span>Q.</span> {{event.eventThmNm}}</p>
          <img :src="quizImg(event.eventDtlSeqno).ctnsPathNm" v-if="quizImg(event.eventDtlSeqno)"/>
          <ol class="exam" v-if="event.eventDtlTypeCd=='1102'">
            <li v-for="eventDtl in event.eventDtlZoneList" :key="eventDtl.eventDtlZoneSeqno" v-bind="eventDtl">
              <span class="inp-radio">
                <label :for="'radio_'+event.eventDtlSeqno+'_'+eventDtl.eventDtlZoneSeqno">{{eventDtl.eventDtlZoneVal}}. {{eventDtl.eventDtlZoneApplVal}}</label>
                <input type="radio" :name="'radio_'+event.eventDtlSeqno+'_'+eventDtl.eventDtlZoneSeqno" :id="'radio_'+event.eventDtlSeqno+'_'+eventDtl.eventDtlZoneSeqno" :value="eventDtl.eventDtlZoneVal" v-model="selectVal[idx]">
              </span>
            </li>
          </ol>
        </div>
        <div class="answer">
          <span class="input-text" v-if="event.eventDtlTypeCd=='1101'">
            <label :for="'answer'+event.eventDtlSeqno" class="hidden">정답 입력</label>
            <input type="text" :id="'answer'+event.eventDtlSeqno" placeholder="정답을 입력해주세요." v-model="selectVal[idx]"/>
          </span>
          <div class="hint"  v-if="event.eventDtlDesc!=null">
            <button type="button" @click="toggleHint(idx)">힌트</button>
            <div class="hint-pop" v-show="hint[idx]">
              <div class="hint-pop-inner">
                <img src="@/assets/images/img/img_event_quiz_hint.png" alt="힌트" />
                <p>{{event.eventDtlDesc}}</p>
              </div>
              <button type="button" class="btn-close" @click="toggleHint(idx)">닫기</button>
            </div>
          </div>
          <div class="wrap-btn-type" v-show="eventInfo.themeInfo.length==(idx+1)">
            <button type="button" class="btn" :class="eventInfo.btnRound + ` ` + eventInfo.btnType" @click="onEntry()">정답 제출</button>
          </div>
        </div>
      </div>
    </section>
  <!-- END : 이벤트 내용 -->
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventTempleteQuiz',
  mixins: [AccordionMixin],
  props: {
    fnRedirect: Function,
    eventInfo: Object,
    fnEntry: Function,
    setDesabledEntry: Function,
    fnWinPopOpen: Function,
  },
  data() {
    return {
      hint: [],
      selectVal: [],
      realVal: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo() {
    return {
      meta: [
        { property: 'aa:page', content: '이벤트^퀴즈 이벤트' }
      ],
    };
  },
  components: {
  },
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    toggleHint(seq) {
      this.$set(this.hint, seq, !this.hint[seq]);
    },
    async onEntry(e) {
      if (this.isLogin()) {
        // START : validation 작성
        const result = this.selectVal.filter(word => word.length < 1);
        if (result.length != 0) {
          this.$gsdialog.alert("정답을 입력해주세요.");
          return;
        }
        if (JSON.stringify(this.selectVal) !== JSON.stringify(this.realVal)) {
          this.$gsdialog.alert("오답입니다. 다시 도전해주세요.");
          return;
        }
        // END : validation 작성
        // START : 이벤트 응모 호출
        const param = {
          entrySate: JSON.stringify(this.selectVal).replace(/"/g, "").replace(/[[\]]/g, "")
        };
        this.$emit('fnEntry', param);
        // END : 이벤트 응모 호출
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.$emit('fnRedirect', "login");
        });
      }
    },
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0 && !res.data.data[0].errorCode) {
        if (this.eventInfo.eventWinModeCd == "01") { // 즉시당첨
          this.$emit('fnWinPopOpen');
        } else {
          this.$gsdialog.alert("정답입니다.");
        }
      }
    },
    quizImg(eventDtlSeqno) {
      return this.quizInfo.find(info => {
        return info.eventDtlSeqno == eventDtlSeqno;
      });
    }
  },
  computed: {
    quizInfo: function() {
      if (this.eventInfo && this.eventInfo.eventCtnsList && this.eventInfo.eventCtnsList.length > 0) {
        return this.eventInfo.eventCtnsList.filter(info => {
          return info.eventCtnsDtlTypeCd == "1101" && (info.dspScrSpCd == "00" || info.dspScrSpCd == "02") && info.eventCtnsTypeCd == "07";
        });
      }
      return null;
    },
  },
  mounted() {
    for (let i=0; i<this.eventInfo.themeInfo.length; i++) {
      this.hint[i]=false;
      this.selectVal[i]="";
      this.realVal[i]=this.eventInfo.themeInfo[i].eventDtlApplVal;
    }
  },
};
</script>

<style></style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
