<!--
views/ev/SC-FO-EV-GF-MS-014.vue
-->
<!-- 11.댓글이벤트 -->
<template>
  <section class="event-cont event-reply">
    <div class="inner">
      <span class="input-textarea">
        <label class="hidden" for="iBditmCnts">내용을 입력해주세요.</label>
        <textarea id="iBditmCnts" placeholder="내용을 입력해주세요." aria-label="내용 입력" v-model="evtBditm.bditmCnts" ref="iBditmCnts" @mouseenter="isLogin()" @keyup="iTextCounting()"></textarea>
      </span>
    </div>
    <div class="wrap-btn-type">
      <button type="button" class="btn round type4" @click="apply()" v-if="nowDataList.length < 1">응모하기</button>
      <button type="button" class="btn round type4" disabled="disabled" v-else>응모완료</button>
    </div>
    <div class="inform">
      <p class="title">[이벤트 <em v-if="nowDataList.length>0">참여완료</em><em v-else>참여현황</em>]</p><em></em>
      <p class="cont" v-for="item in nowDataList" v-bind="item" :key="item.bditmId">{{item.bditmCnts}}</p>
    </div>
  </section>
  <!-- END : 이벤트 내용 -->
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import UseNotWords from '@/common/cu/UseNotWords';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventTempleteReply',
  mixins: [AccordionMixin],
  components: {
  },
  props: {
    fnRedirect: Function,
    fnEntry: Function,
    setDesabledEntry: Function,
    eventInfo: Object,
  },
  data() {
    return {
      userId: '',
      nowDataList: [],
      evtBditm: {
        eventId: '',
        bditmId: '',
        bditmCnts: '',
        dspYn: '',
        limit: null,
        offset: null,
      },
      evtBditmList: [],
    };
  },
  methods: {
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    // START : 응모 성공 (필수)
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0) {
        if (res.data.data[0].errorCode) { // 실패한 경우
          this.$emit('setDesabledEntry', false);
        } else { // 성공한 경우
          this.$gsdialog.alert("참여완료 되었습니다.");
          this.evtBditm.bditmCnts='';
          this.commentList();
        }
      }
    },
    // END : 응모 성공 (필수)
    async apply() {
      this.evtBditm.dspYn = 'Y';
      try {
        if (this.isLogin()) {
          const param = {
            bditmCnts: this.evtBditm.bditmCnts
          };
          const words = UseNotWords.getWords();
          for (let n = 0; n < words.length; n++) {
            if (this.evtBditm.bditmCnts.indexOf(words[n]) != -1) {
                this.$gsdialog.alert("작성하신 글에 금칙어가 포함되어 있습니다.");
                return;
            }
          }
          this.$emit('fnEntry', param); // 이벤트 응모 호출
        } else {
          this.$gsdialog.alert('로그인이 필요합니다.')
          .then(e => {
            this.$emit('fnRedirect', "login");
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    commentList: async function() {
      await ApiUtils.get('/fo/ev/bbseventmgnt/my-bbs-event/' + this.$route.params.eventId, this.evtBditm)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.evtBditmList = res.data.data.rBbsEventInq;
          for (let i=0; i<this.evtBditmList.length; i++) {
            this.nowDataList.push(this.evtBditmList[i]);
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    iTextCounting: function(e) {
      this.textCount = this.evtBditm.bditmCnts.length;
      if (this.textCount > 500) {
        this.evtBditm.bditmCnts = this.evtBditm.bditmCnts.substring(0, 500);
        this.textCount = this.evtBditm.bditmCnts.length;
        this.$gsdialog.alert('글자수는 500자 이내로 제한됩니다.');
      }
    },
  },
  computed: {
  },
  async mounted() {
    const eventId = this.$route.params.eventId;
    this.evtBditm.eventId = eventId;
    if (this.isLogin()) {
      this.commentList();
    }
  },
};
</script>

<style>
</style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
