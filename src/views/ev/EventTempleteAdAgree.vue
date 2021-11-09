<!--
views/ev/SC-FO-EV-GF-MS-009.vue
-->
<template>
  <section>
    <section class="event-cont event-adagree" :style="{backgroundColor: '#d7d7d7'}" v-show="aType">
      <h2 class="title">광고성 정보 수신동의</h2>
      <p class="desc">수신에 동의하시면 <em>할인상품, 할인 쿠폰 증정 및<br /> 재입고 알림등의 정보</em>를 받으실 수 있습니다.</p>
      <div class="inner">
        <div class="chk-total">
          <span class="inp-chk">
            <label for="chkList00">전체동의</label>
            <input type="checkbox" name="" id="chkList00" @click="allChk" v-model="chkYn">
          </span>
        </div>
        <div class="chk-list">
          <ul>
            <li>
              <span class="inp-chk">
                <label for="chkList01">SMS</label>
                <input type="checkbox" name="" id="chkList01" value="SMS" v-model="chBind.smsRcvYn">
              </span>
            </li>
            <li>
              <span class="inp-chk">
                <label for="chkList02">E-MAIL</label>
                <input type="checkbox" name="" id="chkList02" value="" v-model="chBind.emailRcvYn">
              </span>
            </li>
            <li v-if="this.mbrTypeCd!='02'">
              <span class="inp-chk">
                <label for="chkList03">우편 및 우편물</label>
                <input type="checkbox" name="" id="chkList03" value="" v-model="chBind.dmRcvYn">
              </span>
            </li>
            <li v-if="this.mbrTypeCd!='02'">
              <span class="inp-chk">
                <label for="chkList04">전화번호</label>
                <input type="checkbox" name="" id="chkList04" value="" v-model="chBind.telRcvYn">
              </span>
            </li>
            <li v-show="bType">
              <span class="inp-chk">
                <label for="chkList05">PUSH 알림 수신 동의</label>
                <input type="checkbox" name="" id="chkList05" value="" v-model="chBind.multiPush">
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="event-cont event-app-push" :style="{backgroundColor: '#d7d7d7'}" v-show="!aType && bType">
      <h2 class="tit">PUSH 알림 <span>수신 동의</span></h2>
      <label class="btn-toggle" for="chk01"><input type="checkbox" id="chk01" aria-label="PUSH 알림 수신 동의" v-model="chBind.singlePush" /></label>
    </section>
    <section class="wrap-btn-type" :style="{backgroundColor: '#d7d7d7'}">
      <button type="button" class="btn" :class="eventInfo.btnRound + ` ` + eventInfo.btnType" @click="onEntry()">정보 수신 동의</button>
    </section>
  </section>
</template>
<script>
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import JwtUtils from '@/common/JwtUtils';
import ObjectUtils from '@/common/ObjectUtils';

export default {
  name: 'EventTempleteAdAgree',
  mixins: [],
  components: {
  },
  props: {
    fnRedirect: Function,
    eventInfo: Object,
    fnEntry: Function,
    setDesabledEntry: Function,
  },
  computed: {
    aType() {
      return this.eventInfo.themeInfo.find(function (e) {
        return e.eventDtlTypeCd == '0501';
      });
    },
    bType() {
      return this.eventInfo.themeInfo.find(function (e) {
        return e.eventDtlTypeCd == '0502';
      });
    },
  },
  data() {
    return {
      chBind: {
        smsRcvYn: false,
        emailRcvYn: false,
        dmRcvYn: false,
        telRcvYn: false,
        multiPush: false,
        singlePush: false,
      },
      chkYn: false,
      userInfo: {},
      userUpdate: {},
      receive: [],
      block: [],
      mbrTypeCd: CookieUtils.getCookie("MBR_TYPE_CD"),
      siteCd: [],
      appPushCd: [],
      mdaTypeCheckCnt: 0,
    };
  },
  metaInfo() {
    return {
      meta: [
        { property: 'aa:page', content: '이벤트^광고 수신 동의 이벤트' }
      ],
    };
  },
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    allChk() {
      if (!this.chkYn) {
        this.chBind.smsRcvYn =true;
        this.chBind.emailRcvYn =true;
        if (this.mbrTypeCd!='02') {
          this.chBind.dmRcvYn =true;
          this.chBind.telRcvYn =true;
        }
        if (this.bType) {
          this.chBind.multiPush =true;
        }
      } else {
        this.chBind.smsRcvYn =false;
        this.chBind.emailRcvYn =false;
        this.chBind.dmRcvYn =false;
        this.chBind.telRcvYn =false;
        if (this.bType) {
          this.chBind.multiPush =false;
        }
      }
    },
    fnValidAgree() {
      if (this.aType) {
        if (this.bType) {
          return (this.chBind.smsRcvYn || this.chBind.emailRcvYn || this.chBind.dmRcvYn || this.chBind.telRcvYn);
        } else {
          return (this.chBind.smsRcvYn || this.chBind.emailRcvYn || this.chBind.dmRcvYn || this.chBind.telRcvYn);
        }
      } else {
        return this.chBind.singlePush;
      }
    },
    // START : 광고동의
    async onEntry(e) {
      if (this.isLogin()) {
        let appPushYn = null;
        if (this.bType) {
          if (this.aType && this.chBind.multiPush) {
            appPushYn = "Y";
          } else if (this.aType && !this.chBind.multiPush) {
            appPushYn = "N";
          } else if (!this.aType && this.chBind.singlePush) {
            appPushYn = "Y";
          } else if (!this.aType && !this.chBind.singlePush) {
            appPushYn = "N";
          }
        }
        // START : validation 작성
        if (!this.fnValidAgree()) { // false면
        // 1201 수정
          if (appPushYn == "Y") {
            this.$gsdialog.alert("다른 수신 매체를 1개 이상 동의해야만 PUSH 수신 알림 동의가 가능합니다.");
            return;
          }
          this.$gsdialog.alert("수신 동의를 선택해 주세요.");
          return;
        }
        const deviceId = localStorage.getItem("deviceId");
        if (CookieUtils.getCookie("STE_CONN_MDA_TYPE_CD") != "01" && CookieUtils.getCookie("STE_CONN_MDA_TYPE_CD") != "02" && !deviceId && this.mdaTypeCheckCnt <= 3) {
          this.mdaTypeCheckCnt++;
          setTimeout(() => {
            this.onEntry();
          }, 800);
        } else {
          if ((CookieUtils.getCookie("STE_CONN_MDA_TYPE_CD") == "01" || CookieUtils.getCookie("STE_CONN_MDA_TYPE_CD") == "02") && appPushYn == "Y") {
            this.$gsdialog.alert('APP PUSH는 앱에서만 참여가능합니다.');
            return;
          }
          const param = {
            smsRcvYn: (!this.aType) ? null : (this.chBind.smsRcvYn ? "Y" : "N"),
            emailRcvYn: (!this.aType) ? null : (this.chBind.emailRcvYn ? "Y" : "N"),
            dmRcvYn: (!this.aType) ? null : (this.chBind.dmRcvYn ? "Y" : "N"),
            telRcvYn: (!this.aType) ? null : (this.chBind.telRcvYn ? "Y" : "N"),
            appPushYn: appPushYn,
            dvcId: deviceId
          };
          if (this.aType) {
            this.receive = [];
            this.block = [];
            param.smsRcvYn == "Y" ? this.receive.push("SMS") : this.block.push("SMS");
            param.emailRcvYn == "Y" ? this.receive.push("E-MAIL") : this.block.push("E-MAIL");
            if (this.mbrTypeCd!='02') {
              param.dmRcvYn == "Y" ? this.receive.push("우편") : this.block.push("우편");
              param.telRcvYn == "Y" ? this.receive.push("전화") : this.block.push("전화");
            }
          }
          if (appPushYn != null) {
            param.appPushYn == "Y" ? this.receive.push("앱 푸쉬") : this.block.push("앱 푸쉬");
          }
          // END : validation 작성
          this.$emit('fnEntry', param); // 이벤트응모 호출
        }
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.$emit('fnRedirect', "login");
        });
      }
    },
    // END : 광고동의
    // START : 응모 성공 (필수)
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0) {
        if (res.data.data[0].errorCode) {
          this.$emit('setDesabledEntry', false);
        } else {
          const today = DateUtils.format(new Date(), 'YYYY년 MM월 DD일');
          let recepMsg = '';
          this.receive != '' ? recepMsg=' 수신동의' : null;
          let blockMsg = '';
          this.block != '' ? blockMsg=' 수신거부' : null;
          this.$gsdialog.alert(today + " 수신정보가 변경되었습니다.<br/>"+this.receive.join('/')+recepMsg+"<br/>"+this.block.join('/')+blockMsg, {html: true});
        }
      }
    },
    // END : 응모 성공 (필수)
  },
  watch: {
    'chBind.smsRcvYn': function (val, oldVal) {
      this.chkYn = this.aType && val && this.chBind.emailRcvYn && this.chBind.dmRcvYn && this.chBind.telRcvYn && (!this.bType || (this.bType && this.chBind.multiPush));
    },
    'chBind.emailRcvYn': function (val, oldVal) {
      this.chkYn = this.aType && this.chBind.smsRcvYn && val && this.chBind.dmRcvYn && this.chBind.telRcvYn && (!this.bType || (this.bType && this.chBind.multiPush));
    },
    'chBind.dmRcvYn': function (val, oldVal) {
      this.chkYn = this.aType && this.chBind.smsRcvYn && this.chBind.emailRcvYn && val && this.chBind.telRcvYn && (!this.bType || (this.bType && this.chBind.multiPush));
    },
    'chBind.telRcvYn': function (val, oldVal) {
      this.chkYn = this.aType && this.chBind.smsRcvYn && this.chBind.emailRcvYn && this.chBind.dmRcvYn && val && (!this.bType || (this.bType && this.chBind.multiPush));
    },
    'chBind.multiPush': function (val, oldVal) {
      this.chkYn = this.aType && this.chBind.smsRcvYn && this.chBind.emailRcvYn && this.chBind.dmRcvYn && this.chBind.telRcvYn && val;
    },
  },
  async mounted() {

  },
  created() {
    try {
      window.appCallAppInfo();
    } catch (e) {
    }
  },
};
</script>

<style>
</style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
