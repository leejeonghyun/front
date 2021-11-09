<!--
views/ev/SC-FO-EV-GF-MS-011.vue
-->
<!-- 10.SNS 공유이벤트 -->
<template>
  <section class="event-cont event-sns">
    <div class="wrap-event-sns">
      <div class="wrap-reply">
        <label for="iBditmCnts"><p class="title">댓글 작성</p></label>
        <div class="area-textarea">
          <textarea id="iBditmCnts" placeholder="내용을 입력해주세요." aria-label="내용 입력" v-model="evtBditm.bditmCnts" ref="iBditmCnts" @keyup="iTextCounting()"></textarea>
          <span class="text-cnt"><span class="cnt">{{textCount}}</span><span class="length">/500</span></span>
        </div>
        <button type="button" class="btn-submit" @click="addMessage()" v-if="true">등록하기</button>
        <button type="button" class="btn-submit" @click="completeMessage()" v-if="false">등록하기</button>
      </div>
    </div>
    <div class="wrap-event-sns">
      <div class="wrap-reply-list">
        <p class="total">총 {{totCount}}건 등록</p>
        <ul class="wrap-list-review">
          <!-- START : 댓글이 없을 경우 -->
          <li >
            <NoList NoListText="등록된 댓글이 없습니다." :ListType="'review'" v-if="totCount === 0"/>
          </li>
          <!-- END : 댓글이 없을 경우 -->
          <li v-for="(item, index) in nowDataList" :key="index" v-bind="item" class="photo" :class="{open: item.reviewFlag}">
            <div class="review-inner" v-if="!item.updateShowFlag">
              <div class="wrap-text">
                <p class="text">{{item.bditmCnts}}</p>
              </div>
              <div class="wrap-info">
                <p class="id-date">{{item.webId}} / {{getDate(item.lastModDttm,'YYYY.MM.DD')}}</p>
                  <!-- START : 댓글까지 있을 경우 추가 -->
                <div class="wrap-detail-btn">
                  <button v-if="btnChk[index]" type="button" class="btn-detail-more" :class="{'active' : item.reviewFlag}" aria-label="댓글상세내용" aria-live="polite" aria-atomic="true" @click="reviewChange(index)">
                    {{item.reviewFlag ? '접기' : '더 보기'}}
                  </button>
                </div>
                <!-- END : 댓글까지 있을 경우 추가 -->
              </div>
            </div>
            <!-- START : 수정 영역 활성화 -->
            <div class="wrap-editable" v-if="item.updateShowFlag">
              <div class="area-textarea">
                <label class="hidden" for="uBditmCnts">댓글 수정</label>
                <textarea id="uBditmCnts" placeholder="내용을 입력해주세요." aria-label="수정 내용 입력" v-model="item.bditmCnts" ref="uBditmCnts" @keyup="uTextCounting(index)"></textarea>
                <span class="text-cnt"><span class="cnt">{{item.textCount}}</span><span class="length">/500</span></span>
              </div>
            </div>
            <!-- END : 수정 영역 활성화 -->
            <div class="wrap-btn">
              <button type="button" class="btn-edit" @click="editerAction(index)" v-if="item.my == 'Y' && item.updateShowFlag">저장</button>
              <button type="button" class="btn-edit" @click="editerAction(index)" v-if="item.my == 'Y' && !item.updateShowFlag">수정</button>
              <button type="button" class="btn-delete" @click="deleteAction(index)" v-if="item.my == 'Y'">삭제</button>
            </div>
          </li>
        </ul>
        <div class="btn-more-detail-view">
          <button type="button" class="btn-border" aria-label="상품 상세페이지" @click="appendData()" :disabled="this.dataFull === true" :class="{disabled : dataFull}" v-if="!this.dataFull">
            <span>더보기</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NoList from '@/components/common/NoList'; // 등록한 댓글이 없을 때
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import DateUtils from '@/common/DateUtils';
import UseNotWords from '@/common/cu/UseNotWords';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventTempleteAppPush',
  components: {
    NoList,
  },
  props: {
    fnRedirect: Function,
    fnEntry: Function,
    setDesabledEntry: Function,
  },
  data() {
    return {
      evtBditmList: [],
      evtBditm: {
        eventId: '',
        bditmId: '',
        bditmCnts: '',
        cmmMbrNo: '',
        dspYn: '',
        offset: 0,
        limit: 5,
      },
      textCount: 0,
      eventInfo: {},
      totCount: 0,
      nowCount: 5,
      addCount: 10,
      nowDataList: [],
      dataFull: false,
      btnChk: [],
    };
  },
  metaInfo() {
    return {
      meta: [
        { property: 'aa:page', content: '이벤트^앱푸시 이벤트' }
      ],
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
    // START : 응모 성공 (필수)
    async fnEntrySuccess(res) {
      if (res.data && res.data.success && res.data.data && res.data.data.length > 0 && !res.data.data[0].errorCode) {
        this.$gsdialog.alert("댓글이 정상적으로 등록되었습니다.");
        this.dataFull = false;
        this.evtBditm.bditmCnts = '';
        this.textCount = 0;
        this.commentList('add');
      }
      this.$emit('setDesabledEntry', false);
    },
    // END : 응모 성공 (필수)
    async editerAction(el) { // 수정 영역 활성화
      if (this.isLogin()) {
        this.nowDataList[el].textCount = this.nowDataList[el].bditmCnts.length;
        if (this.nowDataList[el].updateShowFlag) {
          await ApiUtils.put('/fo/ev/bbseventmgnt/comment/' + this.$route.params.eventId, this.nowDataList[el])
          .then(res => {
            if (res.data && res.data.success) {
              if (this.totCount <= this.nowCount) {
                this.dataFull = true;
              }
              this.evtBditm.bditmCnts = '';
              this.textCount = 0;
              this.$gsdialog.alert("댓글이 정상적으로 수정되었습니다.");
            }
          })
          .catch(e => {
            // this.$gsdialog.alert(e.response.data.statusMessage);
          });
        }
        this.nowDataList[el].updateShowFlag = !this.nowDataList[el].updateShowFlag;
      }
    },
     deleteAction(el) {
      if (this.isLogin()) {
        this.nowDataList[el].dspYn = 'N';
        this.$gsdialog.confirm("삭제하시겠습니까?", { cancelText: '취소' }).then(async dialog => {
          await ApiUtils.put('/fo/ev/bbseventmgnt/comment/' + this.$route.params.eventId, this.nowDataList[el])
          .then(res => {
            if (res.data && res.data.success) {
              this.dataFull = false;
              this.commentList('del');
              this.$gsdialog.alert("삭제되었습니다.");
              this.textCount = 0;
              this.nowDataList[el].bditmCnts = '';
            }
          })
          .catch(e => {
            // this.$gsdialog.alert(e.response.data.statusMessage);
          });
        }).catch(function() {});
      }
    },
    async addMessage() {
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
    },
    iTextCounting: function(e) {
      this.textCount = this.evtBditm.bditmCnts.length;
      if (this.textCount > 500) {
        this.evtBditm.bditmCnts = this.evtBditm.bditmCnts.substring(0, 500);
        this.textCount = this.evtBditm.bditmCnts.length;
        this.$gsdialog.alert('글자수는 500자 이내로 제한됩니다.');
      }
    },
    uTextCounting: function(e) {
      this.nowDataList[e].textCount = this.nowDataList[e].bditmCnts.length;
      if (this.nowDataList[e].textCount > 500) {
        this.nowDataList[e].bditmCnts = this.nowDataList[e].bditmCnts.substring(0, 500);
        this.nowDataList[e].textCount = this.nowDataList[e].bditmCnts.length;
        this.$gsdialog.alert('글자수는 500자 이내로 제한됩니다.');
      }
    },
    commentList: async function(val) {
      if (val == null || val == '' || val == 'add' || val == 'del') {
        this.nowDataList = [];
        this.evtBditm.offset = 0;
        this.evtBditm.limit = 5;
        this.nowCount = 5;
      }
      await ApiUtils.get('/fo/ev/bbseventmgnt/bbs-event/' + this.$route.params.eventId, this.evtBditm)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.evtBditmList = res.data.data.rBbsEventInq;
          this.totCount = res.data.data.totalRowCnt;
          if (this.totCount <= this.nowCount) {
            this.nowCount = this.totCount;
            this.dataFull = true;
          }
          for (let i=0; i<this.evtBditmList.length; i++) {
            this.nowDataList.push(this.evtBditmList[i]);
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
    completeMessage: function() {
      this.$gsdialog.alert("이미 응모 완료 되셨습니다.");
    },
    // TODO :: 더보기 버튼 누를때 마다 데이터를 10개씩 가져와서 더해주는 형태로 진행해야 할듯함!!!!!!!!
    appendData: function() {
      if (this.nowCount < this.totCount) {
        this.evtBditm.offset = this.nowCount;
        this.nowCount += this.addCount;
        if (this.totCount <= this.nowCount) {
            this.addCount = this.totCount - (this.nowCount - this.addCount);
            this.nowCount = this.totCount;
            this.dataFull = true;
        }
        this.evtBditm.limit = this.addCount;
        this.commentList('append');
      } else {
        this.dataFull = true;
      }
    },
    reviewChange: function(idx) {
      this.nowDataList[idx].reviewFlag = !this.nowDataList[idx].reviewFlag;
    },
    getDate (date, format) {
        return DateUtils.format(date, format);
    },
  },
  computed: {
  },
  async mounted() {
    const eventId = this.$route.params.eventId;
    this.evtBditm.eventId = eventId;
    this.commentList();
  },
  watch: {
    nowDataList: function () {
      for (let i=0; i<this.nowDataList.length; i++) {
        if (this.nowDataList[i].bditmCnts.length <= 120) {
          this.nowDataList[i].reviewFlag=true;
          this.btnChk[i]=false;
        } else {
          this.btnChk[i]=true;
        }
      }
    }
  }
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
