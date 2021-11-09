<!--
views/od/SC-FO-OD-GS-MP-006
-->
<template>
    <!-- START : 단일옵션 레이어 -->
    <div id="popupOptionDate" class="wrap-layer option-date-layer" role="dialog" aria-labelledby="popupOptionDate" aria-modal="true" :class="[{active : this.modalActive.popupOptionDate}, siteClass]">
      <div class="layer-bg" @click="popupCloseAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>백순대 볶음 (2~3인분)</h3></div>
        <!-- 수정 START : 2020.02.05 마크업 변경 (옵션 타이틀 삭제 및 스크롤 영역 변경) -->
        <div class="layer-content scroll-area">
          <div class="select-date-area">
            <h4 class="tit">도착예정일</h4>
            <span class="inp-wrap">
              <input type="text" id="datepicker" title="배송날짜 선택" class="inp-txt" placeholder="원하시는 배송날짜를 선택해 주세요" :value="selectDate">
              <button type="button" class="btn-cal" aria-label="도착 예정일 선택 팝업활성화" aria-haspopup="dialog" @click="popupDateActive"><span class="hidden">날짜 선택</span></button>
            </span>
          </div>
          <PopupDateSelect @popupEvent="popupAction" @changeDeliveryEvent="changeDeliveryAction" v-if="this.popup.popupDateSelect" /> <!-- 팝업 - 날짜변경 -->
          <div class="inner-box">
            <ul class="option-list">
              <li>
                <span class="inp-radio small">
                  <input type="radio" name="option" id="option-item1" value="" checked>
                  <label for="option-item1">2~3인분</label>
                </span>
              </li>
              <li>
                <span class="inp-radio small">
                  <input type="radio" name="option" id="option-item2" value="">
                  <label for="option-item2">4~5인분</label>
                </span>
              </li>
              <li>
                <span class="inp-radio small">
                  <input type="radio" name="option" id="option-item3" value="">
                  <label for="option-item3">6~7인분</label>
                </span>
              </li>
              <li>
                <span class="inp-radio small">
                  <input type="radio" name="option" id="option-item3" value="">
                  <label for="option-item3">6~7인분</label>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 수정 END : 2020.02.05 마크업 변경 (옵션 타이틀 삭제 및 스크롤 영역 변경) -->
        <div class="wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen"  @click="popupCloseAction">변경</button>
        </div>
        <button class="btn-layer-close" @click="popupCloseAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 단일옵션 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupDateSelect from '@/views/od/PopupDateSelect'; // 팝업 - 날짜변경
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupOptionDate",
  data() {
    return {
      selectDate: '2020-02-10 (월)', // 캘린더의 디폴트 날짜
      selectDay: '', // 캘린더의 디폴트 요일
      popup: {
        popupDateSelect: false
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
    PopupDateSelect,
  },
  methods: {
    changeDeliveryAction(date, day) { // 캘린더의 새롭게 선택된 값 저장
      this.selectDate = date;
      this.selectDay = day;
    },
    // formatter(date) {
    //   return this.selectDate = DateUtils.format(date, 'YYYY-MM-DD (dd)');
    // },
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupOptionDate');
      this.modalActiveEvent('popupOptionDate');
    },
    popupDateActive() {
      this.popupAction('popupDateSelect');
    },
  },
  computed: {
    // setDate: {
    //   get: function() {
    //     if (typeof this.selectDate === 'object') {
    //       return DateUtils.format(this.selectDate, 'YYYY-MM-DD');
    //     } else {
    //       return this.selectDate;
    //     }
    //   },
    //   set: function(selectDate) {
    //     this.selectDate = new Date(selectDate);
    //   }
    // }
  },
  mounted() {
    this.modalActiveEvent('popupOptionDate');
  },
};
</script>
