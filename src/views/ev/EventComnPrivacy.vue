<!-- START : 개인정보동의 -->
<template>
  <section>
    <section class="event-cont event-privacy" v-if="isShow && privacyInfo && privacyInfo.length > 0">
      <div class="event-privacy-agree">
        <!-- START : 수정 전체동의 추가 2020.02.25 -->
        <div class="agree-all" v-show="privacyInfo.length > 1">
          <span class="inp-chk">
            <input type="checkbox" id="agree-all" v-model="agree.all" @click="onClickCheckboxAll" />
            <label for="agree-all"><span>전체 동의</span></label>
          </span>
        </div>
        <!-- END : 수정 전체동의 추가 2020.02.25 -->
        <!-- 약관 내용 부분은 논의중(다른 테이블에서 값을 가져와야 할 수 있음. API 호출 필요.), 일단은 Show, Hide 만 제어할 것.-->
        <div class="event-info" v-show="useAssent">
          <div class="agree-list">
            <span class="inp-chk">
              <input type="checkbox" id="agree-chk01" v-model="agree.chk01" @click="onClickCheckbox" />
              <label for="agree-chk01" @click="onClickCheckbox"><span>{{useAssentInfo.notiTitle}}</span><em>(필수)</em></label>
            </span>
            <button type="button" id="rowInput01" class="btn-accordion" aria-controls="rowInputContent01" aria-expanded="false" @click="accordionEvent">
              <span class="hidden">{{useAssentInfo.notiTitle}} 내용 전체보기</span>
            </button>
          </div>
          <div id="rowInputContent01" class="event-info-cont" aria-labelledby="rowInput01" hidden="true" v-html="useAssentInfo.notiCnts"></div>
        </div>
        <div class="event-info" v-show="consignmentAssent">
          <div class="agree-list">
            <span class="inp-chk">
              <input type="checkbox" id="agree-chk02" v-model="agree.chk02" @click="onClickCheckbox" />
              <label for="agree-chk02" @click="onClickCheckbox"><span>{{consignmentAssentInfo.notiTitle}}</span><em>(필수)</em></label>
            </span>
            <button type="button" id="rowInput02" class="btn-accordion" aria-controls="rowInputContent02" aria-expanded="false" @click="accordionEvent">
              <span class="hidden">{{consignmentAssentInfo.notiTitle}} 내용 전체보기</span>
            </button>
          </div>
          <div id="rowInputContent02" class="event-info-cont" aria-labelledby="rowInput02" hidden="true" v-html="consignmentAssentInfo.notiCnts"></div>
        </div>
      </div>
    </section>
  </section>
</template>
<!-- END : 개인정보동의 -->
<script>
import ApiUtils from '@/common/ApiUtils';
import AccordionMixin from '@/mixins/AccordionMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventComnPrivacy',
  components: {
  },
  mixins: [AccordionMixin],
  props: {
    eventInfo: Object,
    setPrivacy: Function,
    privacyInfo: Array,
    isShow: Boolean,
  },
  data() {
    return {
      useAssentInfo: {
        notiTitle: "개인정보 수집 이용 동의",
        notiCnts: ""
      },
      consignmentAssentInfo: {
        notiTitle: "개인정보 취급 위탁 동의 안내",
        notiCnts: ""
      },
      agree: {
        all: false,
        chk01: false,
        chk02: false,
      }
    };
  },
  async created() {
  },
  methods: {
    onClickCheckboxAll(e) {
      if (e.target.checked) {
        this.agree.chk01 = true;
        this.agree.chk02 = true;
      } else {
        this.agree.chk01 = false;
        this.agree.chk02 = false;
      }
      e.stopPropagation();
    },
    onClickCheckbox(e) {
      e.stopPropagation();
    },
    fnValidPrivacy() {
      let allCheck = true;
      if (this.useAssent && !this.agree.chk01) {
        allCheck = false;
      }
      if (this.consignmentAssent && !this.agree.chk02) {
        allCheck = false;
      }
      return allCheck;
    },
    async getNoticeList() {
      await ApiUtils.get('/fo/ev/common/notice-list')
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          const useAssentInfo = res.data.data.find((info) => {
            return info.annceTypeCd == '01';
          });
          if (useAssentInfo) {
            this.useAssentInfo = useAssentInfo;
          }
          const consignmentAssentInfo = res.data.data.find((info) => {
            return info.annceTypeCd == '02';
          });
          if (consignmentAssentInfo) {
            this.consignmentAssentInfo = consignmentAssentInfo;
          }
        }
      })
      .catch(e => {
        // this.$gsdialog.alert(e.response.data.statusMessage);
      });
    },
  },
  watch: {
    'agree.chk01': function (val, oldVal) {
      this.agree.all = (val && val == this.agree.chk02);
      this.$emit('setPrivacy', 'useAssent', this.agree.chk01 ? "Y" : "N");
    },
    'agree.chk02': function (val, oldVal) {
      this.agree.all = (val && val == this.agree.chk01);
      this.$emit('setPrivacy', 'consignmentAssent', this.agree.chk02 ? "Y" : "N");
    },
    'useAssent': function () {
      this.getNoticeList();
    },
    'consignmentAssent': function () {
      this.getNoticeList();
    }
  },
  computed: {
    useAssent() {
      // 개인정보 수집 이용 동의
      return this.privacyInfo.find((info) => {
        return info.eventDtlZoneVal == "01";
      });
    },
    consignmentAssent() {
    // 개인정보 취급 위탁 동의 안내
      return this.privacyInfo.find((info) => {
        return info.eventDtlZoneVal == "02";
      });
    }
  },
  async mounted() {
    if (this.isShow) {
      this.getNoticeList();
    }
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
