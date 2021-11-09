<template>
  <section>
    <MyTrackingDetails
      :period="period"
      :months="months"
      :selectedMonths="selectedMonths"
      :active="active"
      :currentTab="currentTab"
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
        v-if="orderMfList == null || orderMfList.length == 0"
      >
        <template slot="nolist-button">
          <button class="btn-md btn-border" @click="toBskt">장바구니 가기</button>
        </template>
      </NoList>
      <div v-else>
        <div class="cart-category-product">
          <div
            class="list_content__block myorder"
            v-for="list in orderMfList"
            :key="list.ordDtlSeqno"
          >
            <!-- 주문정보 요약 -->
            <div class="myorder-infobox">
              <div class="myorder-info__unit">
                <span class="orderdate" @click="goOrdInfoPage(list)">{{ list.ordDttm }}</span>
                <div class="right_box">
                  <button
                    type="button"
                    class="btn-border address"
                    @click="goDelivInfoMod(list.ordId)"
                  >
                    <span>배송정보 수정</span>
                  </button>
                </div>
              </div>
              <div class="myorder-info__unit">
                <div class="left_box">
                  <p class="orderno">
                    <a
                      href="javascript:void(0);"
                      @click="goOrdInfoPage(list)"
                    >주문번호 : {{ list.ordId }}</a>
                  </p>
                </div>
                <div class="right_box">
                  <!-- 20201211 배송지 삭제 결제금액 위치 이동 -->
                  <span
                    class="orderprice"
                    @click="goOrdInfoPage(list)"
                  >결제금액 : {{ list.ordTdrAmt | currency }}원</span>
                </div>
              </div>
            </div>
            <!-- //주문정보 요약 -->
            <!-- 주문목록 -->
            <div
              class="order-product__block"
              v-for="ordermall in list.mfOrdMallList"
              :key="ordermall.mallId"
            >
              <div class="title_flex__area mallinfo">
                <div class="mall_title">
                  <img
                    :src="getMallLogo(ordermall.mallId)"
                    :alt="ordermall.mallNm"
                    class="mall_image"
                    @click="goUrl(ordermall.mallId)"
                  />
                  <strong v-show="getEarlydelivery(ordermall)">[ 새벽배송 ]</strong>
                </div>
              </div>
              <ul class="cart-product-list">
                <li v-for="orderdata in ordermall.mfOrdDtlList" :key="orderdata.ordDtlSeqno">
                  <div class="inner">
                    <dl>
                      <dt @click="goGoods(orderdata)">
                        <p class="tit tit-link">
                          <a href="javascript:void(0);" class="tit-product">{{ orderdata.itemNm }}</a>
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
                            옵션: {{ orderdata.skuNm}}
                            <span
                              v-if="orderdata.skuAddAmt > 0"
                            >(+{{orderdata.skuAddAmt | currency}}원)</span>
                          </p>
                          <p
                            class="option-cnt"
                            v-if="(orderdata.ordQty) > 0"
                          >수량: {{ orderdata.ordQty}}개</p>
                        </div>
                        <a
                          href="javascript:void(0);"
                          class="point status"
                          @click="goMfClaimDtl(orderdata)"
                        >{{getCommonCd(orderdata.mfClaimStatCd != null ? orderdata.mfClaimStatCd : orderdata.mfOrdStatCd)}}</a>
                      </dd>
                    </dl>
                    <br />
                    <div class="btn-bottom">
                      <div class="btn-area orderstatus">
                        <span v-if="orderdata.mfClaimStatCd != null">
                          <button
                            type="button"
                            class="btn-border full"
                            v-if="orderdata.mfClaimStatCd == 21"
                            @click="cnclRqtWtdw(orderdata, 'ORD')"
                          >취소신청철회</button>
                          <button
                            type="button"
                            class="btn-border full"
                            v-if="orderdata.mfClaimStatCd == 31"
                            @click="rtnRqtWtdw(orderdata, 'ORD')"
                          >반품신청철회</button>
                          <button
                            type="button"
                            class="btn-border full"
                            v-if="orderdata.mfClaimStatCd == 41"
                            @click="exchRqtWtdw(orderdata, 'ORD')"
                          >교환신청철회</button>
                        </span>
                        <span v-else>
                          <button
                            type="button"
                            class="btn-border full"
                            v-if="orderdata.mfCnclPosbOrdStatCd >= orderdata.mfOrdStatCd"
                            @click="goClaimDtl(orderdata)"
                          >취소신청</button>
                        </span>
                        <div v-if="!orderdata.mfClaimStatCd">
                          <button
                            type="button"
                            class="btn-border"
                            v-if="orderdata.mfOrdStatCd == 15 && orderdata.rtnExchAceptPosbDtYn == 'Y'"
                            @click="reqClaimRtn(orderdata)"
                          >반품신청</button>
                          <button
                            type="button"
                            class="btn-border"
                            v-if="orderdata.mfOrdStatCd == 15 && orderdata.rtnExchAceptPosbDtYn == 'Y'"
                            @click="reqClaimExch(orderdata)"
                          >교환신청</button>
                          <button
                            type="button"
                            class="btn-border reviews"
                            v-if="orderdata.mfOrdStatCd == 15 && orderdata.rtnExchAceptPosbDtYn == 'Y'"
                            @click="regItmcWrt(orderdata)"
                          >상품평</button>
                        </div>
                        <button
                          type="button"
                          class="btn-border full big"
                          v-if="(orderdata.mfOrdStatCd == 14 || orderdata.mfOrdStatCd == 15) && orderdata.delivTypeCd != '04'"
                          @click="popupTrackingActive(orderdata, 'ORD')"
                        >배송조회</button>
                      </div>
                    </div>
                    <div class="earlydelivery_txt" v-if="orderdata.delivTypeCd == '04'">
                      <p v-if="orderdata.mfOrdStatCd == 14">{{orderdata.delivDtNm}} 새벽에 배송될 예정입니다.</p>
                      <p v-if="orderdata.mfOrdStatCd == 15">{{orderdata.delivDtNm}} 새벽에 배송되었습니다.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
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
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import Loading from '@/components/common/Loading';
import MfPopupTrackingShipping from '@/views/cs/orddeliv/MfDelivDlvInq'; // 팝업 - 배송조회 @/views/ss/SC-FO-SS-GF-MP-855

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
import InfiniteLoading from 'vue-infinite-loading';
import MfClaimControlMixin from '@/mixins/MfClaimControlMixin';

export default {
  name: 'MfOrderProductList',
  mixins: [MfClaimControlMixin],
  props: ['currentTab'],
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
      loadMoreFlag: false,
      LIMIT_PAGE_SIZE: 5,
      OFFSET: 0,
      orderMfList: [],
      commCdList: [],
      mfOrdStatCd: null,
      loading: false,
    };
  },
  computed: {},
  components: {
    NoList,
    MyTrackingDetails,
    PopupPeriodCalendar,
    InfiniteLoading,
    Loading,
    MfPopupTrackingShipping,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    getEarlydelivery(data) {
      let delivType = false;
      data.mfOrdDtlList.map(ordDtlValue => {
        if (ordDtlValue.delivTypeCd == '04') {
          delivType = true;
        }
      });
      return delivType;
    },
    goMfClaimDtl(data) {
      if (data && data.claimOrdClaimSpCd != null) {
        switch (data.claimOrdClaimSpCd) {
          case 'C':
            this.$router.push(
              '/cs/mf/claimmgnt/ord_cncl_dtl/' + data.claimOrdId
            );
            break;
          case 'R':
            this.$router.push(
              '/cs/mf/claimmgnt/ord_rtn_dtl/' + data.claimOrdId
            );
            break;
          case 'E':
            this.$router.push(
              '/cs/mf/claimmgnt/ord_exch_dtl/' + data.claimOrdId
            );
            break;
        }
      }
    },
    toBskt() {
      const bsktUrl = SiteUtils.commo('/od/mf/bskt');
      location.href = bsktUrl;
    },
    // 검색기간버튼 클릭 시 검색기간날짜변경 처리
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
    // 달력 팝업으로 변경된 날짜 저장
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
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
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
    async goDelivInfoMod(ordId) {
      const params = {
        ordId: ordId,
      };
      ApiUtils.get('/fo/cs/mf/dlvp-modification-possible-yn', { ...params })
        .then(res => {
          if (res.data === null || !res.data.success) {
            this.$gsdialog.alert(res.data.statusMessage, { html: true });
            return;
          }
          this.$router.push('/cu/delivery_information_update/' + ordId);
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 주문상세화면 이동
    goOrdInfoPage(paramOrdInfo) {
      this.$router.push('/cs/mf/orddeliv/ord_deliv_dtl/' + paramOrdInfo.ordId);
    },
    // 검색 조회
    comboMfChange(mfOrdStatCd) {
      this.mfOrdStatCd = mfOrdStatCd;
      // 검색 하면 초기화 처리
      this.loadMoreFlag = false;
      this.orderMfList = [];
      this.OFFSET = 0;
      this.retrievelistOrdProductListMf();
    },
    loadMore($state) {
      this.retrievelistOrdProductListMf($state);
    },
    goClaimDtl(paramOrdInfo) {
      if (
        (paramOrdInfo.tdrMeansCd == '10' || paramOrdInfo.tdrMeansCd == '13') &&
        paramOrdInfo.totlItemOrdFinYn == 'N'
      ) {
        const claimMsg =
          (paramOrdInfo.tdrMeansCd == '10'
            ? '[휴대폰 소액결제]'
            : '[모바일팝]으') +
          '로 구매하신 경우 모두 결제완료 상태일때 전체취소만 가능합니다.';
        this.$gsdialog.alert(claimMsg, { html: true });
        return;
      }
      if (paramOrdInfo.cnclPosbYn == 'N') {
        this.$gsdialog.alert(
          paramOrdInfo.mallNm +
            '상품은 모두 결제완료 상태일때만 취소가 가능합니다.'
        );
        return;
      }
      this.$router.push(
        '/cs/mf/claimmgnt/ord_cncl_acept/' + paramOrdInfo.ordId
      );
    },
    reqClaimRtn(paramOrdInfo) {
      if (
        (paramOrdInfo.tdrMeansCd == '10' || paramOrdInfo.tdrMeansCd == '13') &&
        paramOrdInfo.mfOrdStatCd == 15
      ) {
        const claimMsg =
          (paramOrdInfo.tdrMeansCd == '10'
            ? '[휴대폰 소액결제]'
            : '[모바일팝]으') +
          '로 구매하신 경우 반품신청이 불가합니다.<br/>[1661-2562]로 연락 주시면 도와드리겠습니다.';
        this.$gsdialog.alert(claimMsg, { html: true });
        return;
      }
      if (paramOrdInfo.itemExchRtnPosbYn == 'N') {
        const confirmMsg = paramOrdInfo.mfCustInforMsgCnts;
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      this.$router.push(
        '/cs/mf/claimmgnt/ord_rtn_acept/' +
          paramOrdInfo.ordId +
          '/' +
          paramOrdInfo.ordDtlSeqno
      );
    },
    reqClaimExch(paramOrdInfo) {
      if (paramOrdInfo.itemExchRtnPosbYn == 'N') {
        const confirmMsg = paramOrdInfo.mfCustInforMsgCnts;
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      this.$router.push(
        '/cs/mf/claimmgnt/ord_exch_acept/' +
          paramOrdInfo.ordId +
          '/' +
          paramOrdInfo.ordDtlSeqno
      );
    },
    regItmcWrt(paramOrdInfo) {
      this.$router.push('/cu/my_page_m4_review_list');
    },
    async retrievelistOrdProductListMf(state) {
      this.loading = true;
      const params = {
        beginDtInq: this.period.start.date,
        endDtInq: this.period.end.date,
        mfOrdStatCd: this.mfOrdStatCd,
        limit: this.LIMIT_PAGE_SIZE,
        offset: this.OFFSET * this.LIMIT_PAGE_SIZE,
      };
      await ApiUtils.get('/fo/cs/mf/order-delivery-list', {
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
          const resOrderList = res.data.data;
          this.orderMfList = this.orderMfList.concat(resOrderList);
          if (resOrderList.length == 0) {
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
    async init() {
      this.commCdList = await this.$store.dispatch('commCdSearch', 'OD0100');
    },
  },
  created() {
    this.setTrackingDt();
  },
  mounted() {
    this.init();
    this.retrievelistOrdProductListMf();
  },
  updated() {
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>

<style lang="scss">
</style>
