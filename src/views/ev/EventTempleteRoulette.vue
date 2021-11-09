<!--
views/ev/SC-FO-EV-GF-MS-001.vue
-->
<template>
  <section class="event-cont event-roulette">
    <div class="roulette">
      <div class="inner">
        <figure class="roulette-pin">
          <img src="@/assets/images/img/img_event_roulette_pin.png" alt="" />
        </figure>
        <figure class="roulette-panel">
          <div class="hidden"></div>
          <img src="@/assets/images/img/img_event_roulette.png" alt="" />
        </figure>
        <button type="button" class="roulette-start-btn" ref="startBtn" @click="onEntry" v-show="isShow.startBtn">
          <img src="@/assets/images/img/img_event_roulette_start.png" alt="룰렛 시작" />
        </button>
        <button type="button" class="roulette-stop-btn" ref="endBtn" @click="rouletteStop" v-show="isShow.endBtn">
          <img src="@/assets/images/img/img_event_roulette_stop.png" alt="룰렛 멈춤" />
        </button>
      </div>
    </div>
    <div class="event-guide-giveaway">
      <p class="tit"><span>경품안내</span></p>
      <ol>
        <li v-for="(item, index) in eventInfo.eventGvwyList" :key="`gvwy`+index">
          <span class="hidden">{{toComma(item.eventGvwyRnk)}}등</span>
          <span class="ranking"><em>{{numberPad(index+1, 2)}}</em></span>
          <dl class="giveaway"><dt>{{getGvwyNm(item)}}</dt></dl>
          <span class="cnt" v-if="item.gvwyPrvdQty == 0">
            <span class="numerator">100%</span>
            <span class="denominator black"> 당첨</span>
          </span>
          <span class="cnt" v-if="item.gvwyPrvdQty != 0">
            <span class="numerator">{{entryWinCntList[item.gvwySeqno]?toComma(entryWinCntList[item.gvwySeqno]):0}}명</span>
            <span class="denominator">/{{toComma(item.gvwyPrvdQty)}}명</span>
          </span>
        </li>
      </ol>
    </div>
  </section>
</template>
<!-- END : 배너 -->

<script>
import gsap from 'gsap';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventTempleteRoulette',
  components: {
  },
  props: {
    fnRedirect: Function,
    eventInfo: Object,
    fnEntry: Function,
    setDesabledEntry: Function,
    popupEvent: Function,
    fnWinPopOpen: Function,
  },
  data() {
    return {
      rouletteValue: null,
      clickEndBtn: false,
      isShow: {
        startBtn: true,
        endBtn: false,
      },
      entryWinCntList: {},
      eventWinGvwyList: [],
      isEntry: false,
    };
  },
  async created() {
  },
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    // START : 룰렛 응모
    onEntry() {
      if (this.isLogin()) {
        this.isEntry = false;
        this.$emit('fnEntry'); // 이벤트응모 호출
      } else {
        this.$gsdialog.alert('로그인이 필요합니다.')
        .then(e => {
          this.$emit('fnRedirect', "login");
        });
      }
    },
    // END : 룰렛 응모
    // START : 응모 성공 (필수)
    async fnEntrySuccess(res) {
      this.isEntry = true;
      if (res.data && res.data.success && res.data.data) {
        if (res.data.data.length == 0) {
          this.rouletteError('이벤트 응모에 실패했습니다.');
        } else {
          if (this.eventInfo.eventWinModeCd == "01" && res.data.data[0].errorMsg) { // 즉시당첨
            this.rouletteError(res.data.data[0].errorMsg);
          } else {
            this.eventWinGvwyList = res.data.data[0].entryWinList;
          }
        }
      } else {
        this.rouletteError(res.statusMessage);
      }
      this.$emit('setDesabledEntry', false);
    },
    // END : 응모 성공 (필수)
    rouletteStart() {
      // Event.vue 에서 호출하고 있음
      gsap.set('.roulette-panel', {rotation: 0});
      this.clickEndBtn = true;
      const options = {
        rotation: 360,
        repeat: -1,
        ease: 'linear',
      };
      gsap.to('.roulette-panel', options);
      this.isShow.startBtn = false;
      this.isShow.endBtn = true;
    },
    rouletteSpin() {},
    rouletteStop() {
      const vm = this;
      if (!vm.clickEndBtn) {
        return;
      }
      if (vm.isEntry) {
        vm.clickEndBtn = false;
        let eventGvwyRnk = 0;
        const spin = 4; // STOP 버튼을 눌렀을 때, 몇바퀴 돌다가 멈출 것인지의 값.
        const itemNum = 8; // 아이템 개수. this.eventInfo.eventGvwyList.length
        const deg = (360 / itemNum) * -1; // 아이템당 차지하는 각도.
        let gsapDefault = {
          rotation: 360 * spin + deg * eventGvwyRnk,
          duration: 3.3, // STOP 버튼을 눌렀을 때, 해당 초만큼 돌다가 멈춤.
          ease: 'easeOut',
        };
        let gsapComplete = {};
        if (vm.eventWinGvwyList.length == 0) {
          gsapComplete = {
            onComplete: function() {
              vm.fnKillGsap(null);
              vm.fnKillGsap("꽝! 당첨된 경품이 없습니다.");
            },
          };
        } else {
          const eventWinGvwy = vm.eventWinGvwyList[0];
          if (eventWinGvwy.eventWinStatCd == "01") {
            vm.setEntryWinCnt(eventWinGvwy.gvwySeqno);
            if (eventWinGvwy.rownum) {
              eventGvwyRnk = eventWinGvwy.rownum-1; // 당첨번호
            }
            gsapDefault = {
              rotation: 360 * spin + deg * eventGvwyRnk,
              duration: 3.3, // STOP 버튼을 눌렀을 때, 해당 초만큼 돌다가 멈춤.
              ease: 'easeOut',
            };
            gsapComplete = {
              onComplete: function() {
                vm.fnKillGsap(null);
                vm.$emit('fnWinPopOpen');
              },
            };
            gsap.to('.roulette-panel', Object.assign(gsapDefault, gsapComplete));
          } else {
            vm.fnKillGsap(null);
            vm.fnKillGsap("꽝! 당첨된 경품이 없습니다.");
          }
        }
      } else {
        setTimeout(() => {
          vm.rouletteStop();
        }, 1000);
      }
    },
    rouletteError(errorMsg) {
      gsap.killTweensOf('.roulette-panel');
      gsap.set('.roulette-panel', {rotation: 0});
      this.isShow.startBtn = true;
      this.isShow.endBtn = false;
      this.$gsdialog.alert(errorMsg);
      this.clickEndBtn = true;
    },
    fnKillGsap(msg) {
      gsap.killTweensOf('.roulette-panel');
      this.isShow.startBtn = true;
      this.isShow.endBtn = false;
      this.clickEndBtn = true;
      if (msg) {
        this.$gsdialog.alert(msg);
      }
    },
    async fnEntryWinCntList() {
      await ApiUtils.get('/fo/ev/eventmgnt/event-winner-cnt/' + this.$route.params.eventId)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          const winCnt = {};
          for (let i=0; i<this.eventInfo.eventGvwyList.length; i++) {
            winCnt[this.eventInfo.eventGvwyList[i].gvwySeqno] = 0;
          }
          for (let i=0; i<res.data.data.length; i++) {
            winCnt[res.data.data[i].gvwySeqno] = res.data.data[i].gvwyWinUserCnt;
          }
          this.entryWinCntList = Object.assign({}, this.entryWinCntList, winCnt);
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    // 숫자 앞에 0 표시
    numberPad: function(n, width) {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },
    // 응모 후 응모자 수 + 1
    async setEntryWinCnt(gvwySeqno) {
      if (this.entryWinCntList[gvwySeqno]) {
        this.entryWinCntList[gvwySeqno] = this.entryWinCntList[gvwySeqno] + 1;
      } else {
        this.entryWinCntList[gvwySeqno] = 1;
      }
    },
    getGvwyNm(gvwy) {
      if (gvwy.gvwyTypeCd == "1") {
        return gvwy.promNm; // + " " + this.toComma(gvwy.beneApplVal) + ((gvwy.dcTypeCd == "R") ? "%" : "원");
      } else if (gvwy.gvwyTypeCd == "2") {
        return gvwy.commCdNm + " " + this.toComma(gvwy.gvwyApplVal) + "P";
      } else if (gvwy.gvwyTypeCd == "3") {
        return gvwy.commCdNm + " " + this.toComma(gvwy.gvwyApplVal) + "원";
      } else {
        return gvwy.gvwyApplVal;
      }
    }
  },
  watch: {
  },
  computed: {
  },
  async mounted() {
    this.fnEntryWinCntList();
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
