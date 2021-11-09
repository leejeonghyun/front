<!-- START : 안내, 공지사항 -->
<template>
  <section>
    <section class="event-cont event-info" v-if="isShow && noticeInfo" :style="{backgroundColor:noticeInfo.bgColorVal}">
      <button id="rowInput" class="btn-accordion btn-event-info" aria-controls="rowInputContent" aria-expanded="true" @click="accordionEvent" >이벤트 안내
        <i class="btn-accordion-icon"></i>
      </button>
      <div id="rowInputContent" class="event-info-cont" aria-labelledby="rowInput" :style="{backgroundColor:noticeInfo.bgColorVal}">
          <dl class="event-info">
            <dt class="hidden">이벤트 참여 안내</dt>
            <dd>
              <ul class="list-info nomargin">
                <p v-html="this.noticeInfo.ctnsDtlCnts" /> <!-- [202017P] MarketFor 안내사항 li 대신 P태그로 수정 -->
              </ul>
            </dd>
          </dl>
      </div>
    </section>
  </section>
</template>
<!-- END : 안내, 공지사항 -->

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventComnNotice',
  components: {
  },
  mixins: [AccordionMixin],
  props: {
    eventInfo: Object,
    isShow: Boolean,
  },
  data() {
    return {
      noticeStr: []
    };
  },
  async created() {
  },
  methods: {
  },
  computed: {
    noticeInfo() {
      if (this.eventInfo && this.eventInfo.eventCtnsList) {
        return this.eventInfo.eventCtnsList.find(info => {
          return info.eventCtnsDtlTypeCd == "0000" && (info.dspScrSpCd == "00" || info.dspScrSpCd == "02") && info.eventCtnsTypeCd == "04";
        });
      }
      return null;
    }
  },
  async mounted() {
    if (this.noticeInfo !=null && this.noticeInfo.ctnsDtlCnts != null) {
      this.noticeStr = this.noticeInfo.ctnsDtlCnts.split('\n');
    }
  },
  watch: {
    // 응모내역조회 결과 (사용자가 체크인한 날짜 조회)
    noticeInfo: function () {
      if (this.noticeInfo !=null && this.noticeInfo.ctnsDtlCnts != null) {
        this.noticeStr = this.noticeInfo.ctnsDtlCnts.split('\n');
      }
    }
  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
