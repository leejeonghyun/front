<template>
  <section>
    <MyTrackingDetails
      :period="period"
      :months="months"
      :selectedMonths="selectedMonths"
      :active="active"
      :currentTab="currentTab"
      :claimType="'claimStatement'"
      @activeMonthEvent="activeMonth"
      @calendarOpenEvent="calendarOpen"
      @comboMfChangeEvent="comboMfChange"
    />
    <div
      class="wrapper tabcont_marketfor"
      id="tab-contents1"
      tabindex="0"
      aria-labelledby="tab1"
      v-show="currentTab == 1"
    >
      <NoList
        NoListText="해당 기간 동안 주문 내역이 없습니다."
        :ListType="'orderList'"
        v-if="claimList == null || claimList.length == 0"
      >
        <template slot="nolist-button">
          <button class="btn-md btn-border" @click="toBskt">장바구니 가기</button>
        </template>
      </NoList>
      <div v-else>
        <div class="cart-category-product">
          <div
            class="list_content__block myorder"
            v-for="claimdata in this.claimList"
            :key="claimdata.ordDt"
          >
            <!-- 주문정보 요약 -->
            <div class="myorder-infobox">
              <div class="myorder-info__unit">
                <span class="orderdate">{{ claimdata.ordDt }}</span>
              </div>
            </div>
            <!-- //주문정보 요약 -->
            <!-- 주문목록 -->
            <div
              class="order-product__block"
              v-for="list in claimdata.mfClaimList"
              :key="list.ordId"
            >
              <div class="myorder-infobox">
                <div class="myorder-info__unit">
                  <div class="left_box">
                    <p class="orderno">
                      <a
                        href="javascript:void(0);"
                        @click="goOrdInfoPage(list)"
                      >접수번호 : {{ list.ordId }}</a>
                    </p>
                  </div>
                  <div class="right_box">
                    <span class="ordername">접수시간 : {{ list.claimTime }}</span>
                  </div>
                </div>
              </div>
              <ul class="cart-product-list">
                <li v-for="orderdata in list.mfOrdDtlList" :key="orderdata.ordDtlSeqno">
                  <div class="inner">
                    <dl>
                      <dt class="full">
                        <p class="tit">
                          <img
                            :src="getMallLogo(orderdata.mallId)"
                            class="mall_image"
                            alt="logo"
                            @click="goUrl(orderdata.mallId)"
                          />
                          <a @click="goGoods(orderdata)">{{ orderdata.itemNm }}</a>
                        </p>
                      </dt>
                      <dd class="thumb">
                        <a href="javascript:void(0);" @click="goGoods(orderdata)">
                          <figure>
                            <img :src="getImg(orderdata.itemImg)" :alt="orderdata.itemNm" />
                          </figure>
                        </a>
                      </dd>
                      <dd class="option flex">
                        <div>
                          <p
                            class="option-txt"
                            v-if="orderdata.skuNm && orderdata.skuMgntYn != 'N'"
                            @click="goGoods(orderdata)"
                          >
                            옵션: {{ orderdata.skuNm }}
                            <span
                              v-if="orderdata.skuAddAmt > 0"
                            >(+{{orderdata.skuAddAmt | currency}}원)</span>
                          </p>
                          <p class="option-cnt">
                            <span
                              class="redcnt"
                              v-if="list.ordClaimSpCd == 'C'"
                            >취소: {{ orderdata.ordCnclQty }}개</span>
                            <span
                              class="redcnt"
                              v-if="list.ordClaimSpCd == 'E'"
                            >교환: {{ orderdata.exchOrdQty}}개</span>
                            <span
                              class="redcnt"
                              v-if="list.ordClaimSpCd == 'R'"
                            >반품: {{ orderdata.rtnQty }}개</span>
                          </p>
                        </div>
                        <div class="point status">{{getCommonCd(orderdata.mfOrdStatCd)}}</div>
                      </dd>
                    </dl>
                    <div class="btn-bottom">
                      <div class="btn-area orderstatus">
                        <button
                          type="button"
                          class="btn-border full"
                          v-if="orderdata.mfOrdStatCd == 21"
                          @click="cnclRqtWtdw(orderdata)"
                        >취소신청철회</button>
                        <button
                          type="button"
                          class="btn-border full"
                          v-if="orderdata.mfOrdStatCd == 31"
                          @click="rtnRqtWtdw(orderdata)"
                        >반품신청철회</button>
                        <button
                          type="button"
                          class="btn-border full"
                          v-if="orderdata.mfOrdStatCd == 41"
                          @click="exchRqtWtdw(orderdata)"
                        >교환신청철회</button>
                        <button
                          type="button"
                          class="btn-border full big"
                          v-if="list.ordClaimSpCd != 'C'"
                          @click="popupTrackingActive(orderdata)"
                        >배송조회</button>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- mfOrdDtlList -->
              </ul>
            </div>
            <!-- 주문목록 -->
          </div>
        </div>
      </div>
    </div>
    <!-- 팝업 - 캘린더(기간조회) -->
    <transition
      name="popupPeriodCalendar"
      v-on:beforeEnter="slideupBeforeEnter"
      v-on:enter="slideupEnter"
      v-on:after-enter="slideupEnterAfterEnter"
      v-on:leave="slideupEnterLeave"
    >
      <PopupPeriodCalendar
        @popupEvent="popupAction"
        v-if="popup.popupPeriodCalendar"
        :type="period.selected.type"
        :initDate="period.selected.changingDate"
        @calendarChange="calendarChange"
      />
    </transition>
    <InfiniteLoading @infinite="loadMore" ref="infiniteLoading" v-if="loadMoreFlag">
      <div class="btn-more-area" slot="no-more">마지막 주문입니다.</div>
    </InfiniteLoading>
    <!-- 팝업 - 배송조회 -->
    <MfPopupTrackingShipping
      @popupEvent="popupAction"
      v-if="this.popup.popupTrackingShipping"
      :mbrDelivParamInfo="this.mbrDelivParamInfo"
    />
    <Loading v-show="loading" />
  </section>
</template>

<script>
import MyTrackingDetails from '@/views/cs/orddeliv/MyTrackingDetails'; // 상세조회(상세검색조건영역)
import NoList from '@/components/common/NoList'; // 리스트 없음
import Loading from '@/components/common/Loading';
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import MfPopupTrackingShipping from '@/views/cs/orddeliv/MfDelivDlvInq'; // 팝업 - 배송조회 @/views/ss/SC-FO-SS-GF-MP-855

import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
import InfiniteLoading from 'vue-infinite-loading';
import MfClaimControlMixin from '@/mixins/MfClaimControlMixin';

export default {
  name: 'MfClaimStatementList',
  mixins: [MfClaimControlMixin],
  props: {
    currentTab: Number,
  },
  data() {
    return {
      months: ['1개월', '3개월', '6개월', '12개월'],
      monthCds: [1, 3, 6, 12],
      selectedMonths: '3개월', // default = 3개월
      active: 1, // default = 3개월
      period: {
        selected: {
          type: 'start',
          changingDate: {},
        },
        start: {
          date: DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
            1,
            'day'
          ), // default = -3개월
          day: DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
              1,
              'day'
            ),
            'dd'
          ),
        },
        end: {
          date: DateUtils.getToday(),
          day: DateUtils.format(DateUtils.getToday(), 'dd'),
        },
      },
      popup: {
        open: false,
        popupPeriodCalendar: false, // 팝업 - 기간조회
        popupTrackingShipping: false,
      },
      LIMIT_PAGE_SIZE: 5,
      OFFSET: 0,
      commCdList: [],
      claimList: [],
      loading: false,
      loadMoreFlag: false,
      mfOrdStatCd: null,
    };
  },
  components: {
    MyTrackingDetails,
    PopupPeriodCalendar,
    NoList,
    Loading,
    InfiniteLoading,
    MfPopupTrackingShipping,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
    activeMonth(idx) {
      this.selectedMonths = this.months[idx];
      if (this.active !== idx) {
        this.active = idx;
        this.period.end.date = DateUtils.getToday();
        this.period.end.day = DateUtils.format(DateUtils.getToday(), 'dd');
        if (this.monthCds[this.active] == 1) {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 1, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 1, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        } else if (this.monthCds[this.active] == 3) {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 3, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        } else if (this.monthCds[this.active] == 6) {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 6, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 6, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        } else if (this.monthCds[this.active] == 12) {
          this.period.start.date = DateUtils.add(
            DateUtils.subtract(DateUtils.getToday(), 12, 'month'),
            1,
            'day'
          );
          this.period.start.day = DateUtils.format(
            DateUtils.add(
              DateUtils.subtract(DateUtils.getToday(), 12, 'month'),
              1,
              'day'
            ),
            'dd'
          );
        }
      }
    },
    // 검색 조회
    comboMfChange(mfOrdStatCd) {
      this.mfOrdStatCd = mfOrdStatCd;
      // 검색 하면 초기화 처리
      this.loadMoreFlag = false;
      this.claimList = [];
      this.OFFSET = 0;
      this.retrievelistClaimStat();
    },
    setTrackingDt() {
      const vtoDt = DateUtils.getToday();
      const vfromDt = DateUtils.add(
        DateUtils.add(vtoDt, -1 * this.monthCds[this.active], 'month'),
        1,
        'day'
      );
      this.period.start.date = vfromDt;
      this.period.start.day = DateUtils.format(vfromDt, 'dd');
      this.period.end.date = vtoDt;
      this.period.end.day = DateUtils.format(vtoDt, 'dd');
    },
    // 달력 팝업 활성화 type: 'start' / 'end'
    calendarOpen(type) {
      this.period.selected.type = type;
      this.period.selected.changingDate = this.period[type];
      this.popupAction('popupPeriodCalendar');
    },
    slideupBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    slideupEnter(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    slideupEnterAfterEnter(el) {
      el.style.opacity = 1;
      el.style.bottom = 0;
      el.focus();
    },
    slideupEnterLeave(el) {
      el.style.opacity = 0;
      el.style.bottom = '-100%';
    },
    calendarChange(type, newDate) {
      // 달력 팝업으로 변경된 날짜 저장
      let startDate = '';
      let endDate = '';
      // 시작일 유효성 체크
      if (type === 'start') {
        if (
          !DateUtils.isAfter(
            DateUtils.add(this.period.end.date, 1, 'day'),
            newDate.date
          )
        ) {
          this.$gsdialog.alert(
            '조회시작일자가 조회종료일자 보다 이후 일자 입니다. 확인 후 재입력 바랍니다.'
          );
          return;
        }
        startDate = newDate.date;
        endDate = this.period.end.date;
        // 종료일 유효성 체크
      } else {
        if (
          !DateUtils.isBefore(
            DateUtils.subtract(this.period.start.date, 1, 'day'),
            newDate.date
          )
        ) {
          this.$gsdialog.alert(
            '조회시작일자가 조회종료일자 보다 이후 일자 입니다. 확인 후 재입력 바랍니다.'
          );
          return;
        }
        startDate = this.period.start.date;
        endDate = newDate.date;
      }
      // 조회 기간 12개월 유효성 체크
      startDate = DateUtils.format(startDate, 'YYYYMMDD');
      const durDate = DateUtils.format(
        DateUtils.add(DateUtils.subtract(endDate, 12, 'month'), 1, 'day'),
        'YYYYMMDD'
      );
      if (startDate < durDate) {
        this.$gsdialog.alert('최대 1년(12개월) 동안 주문조회가 가능합니다.');
        return;
      }
      this.period[type].date = newDate.date;
      this.activeMonth(99);
    },
    getCommonCd(mfOrdStatCd) {
      let data = '';
      this.commCdList
        .filter(x => x.commCd == mfOrdStatCd)
        .map(value => {
          data = value.commCdDesc;
        });
      return data;
    },
    toBskt() {
      const bsktUrl = SiteUtils.commo('/od/mf/bskt');
      location.href = bsktUrl;
    },
    loadMore($state) {
      this.retrievelistClaimStat($state);
    },
    goOrdInfoPage(data) {
      if (data) {
        switch (data.ordClaimSpCd) {
          case 'C':
            this.$router.push('/cs/mf/claimmgnt/ord_cncl_dtl/' + data.ordId);
            break;
          case 'R':
            this.$router.push('/cs/mf/claimmgnt/ord_rtn_dtl/' + data.ordId);
            break;
          case 'E':
            this.$router.push('/cs/mf/claimmgnt/ord_exch_dtl/' + data.ordId);
            break;
        }
      }
    },
    async init() {
      // 공통 코드 [OD0100] 조회
      this.commCdList = await this.$store.dispatch('commCdSearch', 'OD0100');
    },
    async retrievelistClaimStat(state) {
      this.loading = true;
      // 취소/교환/반품 목록 조회
      const params = {
        beginDtInq: this.period.start.date,
        endDtInq: this.period.end.date,
        ordClaimSpCd: this.mfOrdStatCd,
        limit: this.LIMIT_PAGE_SIZE,
        offset: this.OFFSET * this.LIMIT_PAGE_SIZE,
      };
      await ApiUtils.get('/fo/cs/mf/claim-list', {
        ...params,
      })
        .then(res => {
          this.loading = false;
          if (state === undefined) {
            window.scrollTo(0, 0);
          }
          if (res.data === null || !res.data.success) {
            this.loadMoreFlag = false;
            if (state != undefined) {
              state.complete();
            }
            return;
          }
          this.OFFSET++;
          const resClaimList = res.data.data;
          this.claimList = this.claimList.concat(resClaimList);
          if (resClaimList.length == 0) {
            this.loadMoreFlag = false;
            state.complete();
          } else {
            this.loadMoreFlag = true;
            if (state != undefined) {
              state.loaded();
            }
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
  },
  created() {
    this.setTrackingDt();
  },
  mounted() {
    // 화면 초기화 함수 호출
    this.init();
    // 취소/교환/반품 목록 조회
    this.retrievelistClaimStat();
  },
  updated() {},
};
</script>

<style>
</style>
