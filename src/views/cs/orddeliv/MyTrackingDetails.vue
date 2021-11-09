<template>
  <div class="wrap-tracking-details" v-bind:class="[siteClass]">
    <div class="period-details-top">
      <div class="txt-period">
        <strong>기간</strong>
        {{ this.period.start.date }}~{{ this.period.end.date }}
        <span
          v-if="this.$props.selectedMonths"
        >({{this.$props.selectedMonths}})</span>
      </div>
      <span class="btn-period-list">
        <button
          type="button"
          aria-label="상세조회 보기"
          :class="{active : this.isActive}"
          @click="toggleShow"
        >
          <span aria-live="assertive" aria-atomic="true">{{ this.isActive ? '조회닫기': '조회설정' }}</span>
        </button>
      </span>
    </div>
    <div class="period-details" v-if="showDetailPeriod === 'show'">
      <fieldset>
        <legend>주문/배송현황 기간조회</legend>
        <div class="term">
          <button
            type="button"
            v-for="(month, index) in months"
            :key="month"
            class="btn-border"
            :class="{showing: active == index}"
            @click="activeMonth(index)"
            aria-live="assertive"
            aria-atomic="true"
          >{{ month }}</button>
        </div>
        <div class="term-calendar">
          <button
            class="btn-calendar"
            aria-haspopup="dialog"
            title="조회기간 시작날짜 선택 팝업활성화"
            @click="calendarOpen('start')"
          >
            <span aria-label="조회기간 시작날짜">{{ this.period.start.date }}</span>
          </button>
          <code class="ico-period">~</code>
          <button
            class="btn-calendar"
            aria-haspopup="dialog"
            title="조회기간 끝나는 날짜 선택 팝업활성화"
            @click="calendarOpen('end')"
          >
            <span aria-label="조회기간 끝나는 날짜">{{ this.period.end.date }}</span>
          </button>
        </div>
        <p class="hidden">{{ this.selectedMonths }} 선택된 조회 내용 입니다.</p>
        <div class="shipping-type" v-if="this.currentTab == 1">
          <div class="box" v-if="commCdList.length > 0">
            <h3>처리상태</h3>
            <span id class="wrap-select w100">
              <select id required title="주문/현황 배송상태 선택" v-model="mfOrdStatCd">
                <option value selected>전체</option>
                <option
                  :value="opt.commCd"
                  v-for="opt in commCdList"
                  :key="opt.commCd"
                >{{opt.commCdNm}}</option>
              </select>
            </span>
          </div>
          <div class="box" v-else>
            <h3>처리상태</h3>
            <span id class="wrap-select w100">
              <select id required title="주문/현황 배송상태 선택" v-model="mfOrdStatCd">
                <option value selected>전체</option>
                <option value="12">결제완료</option>
                <option value="13">상품준비중</option>
                <option value="14">배송중</option>
                <option value="15">배송완료</option>
              </select>
            </span>
          </div>
        </div>
        <div class="shipping-type" v-else>
          <div class="box">
            <h3>배송유형</h3>
            <span id class="wrap-select w100">
              <select id required title="주문/현황 배송유형 선택" v-model="delivTypeCd">
                <option value selected>전체</option>
                <option value="01">당일</option>
                <option value="AA">예약</option>
                <option value="02">택배</option>
                <option value="05">해외직구</option>
                <option value="04">새벽</option>
              </select>
            </span>
          </div>
          <div class="box">
            <h3>배송상태</h3>
            <span id class="wrap-select w100">
              <select id required title="주문/현황 배송상태 선택" v-model="delivStatCd">
                <option value selected>전체</option>
                <option value="02">주문완료</option>
                <option value="03">상품준비중</option>
                <option value="04">배송중</option>
                <option value="05">배송완료</option>
              </select>
            </span>
          </div>
        </div>
        <button type="button" class="btn-bg darkgray btn-search" @click="searchHide">조회</button>
        <p class="txt-dot">최대 1년(12개월) 동안 주문조회가 가능합니다.</p>
      </fieldset>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'MyTrackingDetails',
  props: [
    'period',
    'months',
    'selectedMonths',
    'active',
    'selectedDelivStatCd',
    'currentTab',
    'claimType',
  ],
  data() {
    return {
      showDetailPeriod: 'hide',
      isActive: false,
      delivTypeCd: '',
      delivStatCd: '',
      mfOrdStatCd: '',
      siteClass: CookieUtils.getSiteClass(),
      commCdList: [],
    };
  },
  mixins: [LayerPopupMixin],
  components: {},
  methods: {
    // 조회설정, 조회닫기 토글(월별 조회 셀렉트 보기)
    toggleShow() {
      if (this.showDetailPeriod === 'hide') {
        this.showDetailPeriod = 'show';
      } else {
        this.showDetailPeriod = 'hide';
      }
      this.isActive = !this.isActive;
    },
    // 조회 버특 클릭
    searchHide() {
      this.showDetailPeriod = 'hide';
      this.isActive = false;
      if (this.currentTab == 1) {
        this.$emit('comboMfChangeEvent', this.mfOrdStatCd);
      } else {
        this.$emit('comboChangeEvent', this.delivTypeCd, this.delivStatCd);
      }
    },
    // 1, 3, 6, 12 개월 버튼 클릭
    activeMonth(idx) {
      this.$emit('activeMonthEvent', idx);
    },
    // 달력선택 이벤트
    calendarChange(type, newDate) {
      this.$emit('calendarChangeEvent', type, newDate);
    },
    // from, to 날짜박스 클릭
    calendarOpen(type) {
      this.$emit('calendarOpenEvent', type);
    },
    // 마이페이지에서 검색조건이 들어온 경우 검색항목 값 셋팅 및 재 조회 처리
    selectDelivStat(param) {
      if (StringUtils.isEmpty(param)) {
        this.delivStatCd = '';
      } else {
        this.delivStatCd = param;
      }
      // 검색조건 변경으로 재 조회 요청
      this.$emit('comboChangeEvent', this.delivTypeCd, this.delivStatCd);
    },
  },
  async mounted() {
    console.log('period', this.period);
    const option = CookieUtils.getCookie('ordSearchOption');
    if (option) {
      const o = JSON.parse(option);
      console.log('o', o);
      if (o) {
        // const ordSearchOption = {delivTypeCd: this.delivTypeCd, delivStatCd: this.delivStatCd, period: this.period, months: this.months};
        this.delivTypeCd = o.delivTypeCd;
        this.delivStatCd = o.delivStatCd;

        this.$emit('setPeriodEvent', o.period, o.active);
      }
      CookieUtils.deleteCookie('ordSearchOption');
    } else {
      this.delivStatCd = this.selectedDelivStatCd || '';
    }
    // this.searchHide();
    // this.bus.$on('selectDelivStat', this.selectDelivStat);
    // 주분배송조회, 취소/반품/교환 구분값
    if (this.$props.claimType == 'claimStatement') {
      const data = await this.$store.dispatch('commCdSearch', 'OD0007');
      if (data) {
        data.map((value, index) => {
          if (value.commCd == 'O') {
            data.splice(index, 1);
          }
        });
        this.commCdList = data;
      }
    }
  },
};
</script>
