<template>
  <div class="wrap-tracking-details">
    <div class="period-details-top">
      <div class="txt-period">
        <strong>기간</strong>2019.09.10~2019.11.09 (3개월)
      </div>
      <span class="btn-period-list">
        <button type="button" aria-label="상세조회 보기" :class="{active : this.isActive}" @click="toggleShow"><span aria-live="assertive" aria-atomic="true">{{this.isActive ? '접기': '상세조회'}}</span></button>
      </span>
    </div>
    <div class="period-details" v-if="showDetailPeriod === 'show'">
      <fieldset>
        <legend>주문/배송현황 상세조회</legend>
        <div class="term">
          <button type="button" v-for="(month, index) in months" :key="month"
          class="btn-border" :class="{showing: active == index}"  @click="activeMonth(index)" aria-live="assertive" aria-atomic="true">{{ month }}</button>
        </div>
        <p class="hidden">{{ this.selectedMonths }} 선택된 조회 내용 입니다.</p>
        <div id="" class="wrap-select w100 month" :class="{showing : this.onSelect}">
          <select id="" required title="주문/현황 조회 기간 선택">
            <option value="" disabled selected>2019년 10월</option>
            <option value="1">2019년 11월</option>
          </select>
        </div>
        <p class="txt-dot">최대 1년(12개월) 동안 주문조회가 가능합니다.</p>
        <div class="shipping-type">
          <div class="box">
            <h3>배송유형</h3>
            <span id="" class="wrap-select w100">
              <select id="" required title="주문/현황 배송유형 선택">
                <option value="0" disabled selected>전체</option>
                <option value="1">예약</option>
                <option value="2">당일</option>
                <option value="3">새벽</option>
                <option value="4">택배</option>
                <option value="5">해외직구</option>
              </select>
            </span>
          </div>
          <div class="box">
            <h3>배송상태</h3>
            <span id="" class="wrap-select w100">
              <select id="" required title="주문/현황 배송상태 선택">
                <option value="0" disabled selected>전체</option>
                <option value="1">결제완료</option>
                <option value="2">상품준비중</option>
                <option value="3">배송중</option>
                <option value="4">배송완료</option>
              </select>
            </span>
            </div>
        </div>
        <button type="button" class="btn-bg darkgray btn-search" @click="searchHide">조회</button>
      </fieldset>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "MyTrackingDetails",
  data() {
    return {
      showDetailPeriod: 'hide',
      isActive: false,
      months: ['1개월', '3개월', '6개월', '월별 조회'],
      selectedMonths: '3개월', // default = 3개월
      onSelect: '',
      active: 1,
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    // 월별 조회 셀렉트 보기
    toggleShow() {
      if (this.showDetailPeriod === 'hide') {
        this.showDetailPeriod = 'show';
      } else {
        this.showDetailPeriod = 'hide';
        this.activeMonth(1);
      }
      this.isActive = !this.isActive;
    },
    searchHide() {
      this.showDetailPeriod = 'hide';
      this.isActive = !this.isActive;
    },
    activeMonth(idx) {
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
        if (idx == this.months.length -1) {
          this.onSelect = 'showing';
        } else {
          this.onSelect = '';
        }
      }
    }
  },
  mounted() {
  }
};
</script>
