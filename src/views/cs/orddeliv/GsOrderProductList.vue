<!--
Design: views\ss\SC-FO-SS-GF-MS-803.vue
Pg id: PG-FO-CS-O001
Uri: /cs/orddeliv/ord_deliv_list
-->
<template>
  <section>
    <!-- <SubDefaultHeader headerText="주문/배송조회" :chatbot="false" :prevType="true" :tabbar="true" /> -->
    <!--===============================================
      검색조건
    ===============================================-->
    <MyTrackingDetails
      :period="period"
      :months="months"
      :selectedMonths="selectedMonths"
      :active="active"
      @activeMonthEvent="activeMonth"
      @calendarChangeEvent="calendarChange"
      @calendarOpenEvent="calendarOpen"
      @comboChangeEvent="comboChange"
      @setPeriodEvent="setPeriod"
      :selectedDelivStatCd="paramDelivStatCd"
    />
    <!--===============================================
      조회결과없음
    ===============================================-->
    <NoList
      NoListText="해당 기간 동안 주문 내역이 없습니다."
      :ListType="'orderList'"
      v-if="ordDtList == null || ordDtList.length == 0"
    />
    <!--===============================================
      조회결과 START
    ===============================================-->
    <div class="order-shipping-list" v-if="ordDtList != null && ordDtList.length > 0">
      <!--===============================================
        날짜반복 START
      ===============================================-->
      <template v-for="(dtRow, dtIndex) in ordDtList">
        <div
          class="order-date"
          v-on:click="showOrdInfo($event);"
          :key="dtRow.ordDt+'_'+dtIndex"
        >{{ dtRow.ordDtNm }}</div>
        <!--===============================================
          주문반복 START
        ===============================================-->
        <div
          class="order-shipping-item"
          v-for="(ordRow, ordIndex) in dtRow.ordList"
          :key="ordRow.ordId+'_'+ordIndex"
        >
          <div href="#" class="order-number">
            <a href="javascript:void(0);" @click="goOrdInfoPage(ordRow)">
              <p>
                <strong>주문번호</strong>
                <span class="link-order">{{ ordRow.ordId }}</span>
              </p>
              <template v-if="ordRow.uniDelivOrdVal == 'A'">
                <p>
                  <strong>합배송번호</strong>
                  {{ ordRow.uniDelivOrdId }}
                </p>
              </template>
              <template v-if="ordRow.uniDelivOrdVal == 'B'">
                <p>
                  <strong>합배송번호</strong>
                  {{ ordRow.uniDelivOrdId }}
                </p>
              </template>
              <p>
                <strong>총 결제금액</strong>
                {{ ordRow.tdrAmt }}원
              </p>
            </a>
            <template v-if="ordRow.totlCnclPosbYn == 'Y'">
              <template v-if="ordRow.uniDelivOrdVal == 'A'">
                <button
                  type="button"
                  class="btn-border btn-cancel-all"
                  @click="totCncl(ordRow)"
                >전체취소</button>
              </template>
              <template v-else-if="ordRow.uniDelivOrdVal == 'B'">
                <button
                  type="button"
                  class="btn-border btn-cancel-all"
                  @click="totCncl(ordRow)"
                >전체취소</button>
              </template>
              <template v-else>
                <button
                  type="button"
                  class="btn-border btn-cancel-all"
                  @click="totCncl(ordRow)"
                >전체취소</button>
              </template>
            </template>
          </div>
          <!--===============================================
            배송유형반복 START (OrderShippingState)
          ===============================================-->
          <div class="order-item">
            <div
              class="shipping-step"
              :class="{allCancle: ordRow.ordStatCd == '90'}"
              v-for="(delivRow) in ordRow.ordDelivList"
              :key="delivRow.orgDelivId"
            >
              <!--■ ■ ■ 배송유형정보    ====================================-->
              <div class="box-details">
                <!--■ ■ ■ 배송STEP상태정보====================================-->
                <!--배송STEP상태정보 01 : 당일배송(당일배송) 또는 예약-->
                <ul class="step-state" v-if="ordRow.ordStatCd != '90'">
                  <li
                    :class="{current: (ordRow.ordStatCd == '10' && delivRow.delivStatCd == '02') || (delivRow.ordStatCd == '01' && delivRow.delivStatCd == '01')}"
                  >
                    <span>결제완료</span>
                  </li>
                  <li :class="{current: delivRow.delivStatCd == '03'}">
                    <span>배송 준비중</span>
                  </li>
                  <li
                    :class="{current: delivRow.delivStatCd == '04' || delivRow.delivStatCd == '06'}"
                  >
                    <span>배송중</span>
                    <template
                      v-if="delivRow.tmsUseYn == 'Y' && (delivRow.delivTypeCd == '01' || delivRow.delivTypeCd == '04')"
                    >
                      <!-- <a href="javascript:void(0);" class="real-time" aria-label="실시간 배송 위치 팝업 활성화" aria-haspopup="dialog" @click="popupRealTimeActive(delivRow)">실시간 배송 위치</a> -->
                    </template>
                  </li>
                  <li :class="{current: delivRow.delivStatCd == '05'}">
                    <span>배송완료</span>
                    <a
                      href="javascript:void(0);"
                      class="real-time"
                      aria-label="배송만족도조사 팝업 활성화"
                      aria-haspopup="dialog"
                      @click="popupSatisfactionActive(delivRow)"
                      v-if="delivRow.delivStlvRegPosbYn == 'Y'"
                    >배송만족도조사</a>
                  </li>
                </ul>
                <!--□ □ □ 배송STEP상태정보====================================-->
                <div class="wrap-tit-order">
                  <p class="tit-order">
                    <a
                      href="javascript:void(0);"
                      @click="goOrdInfoPage(ordRow)"
                      class="link-detail"
                    >
                      <span class="badge">{{ ordRow.giftYn == 'Y' ? '선물' : delivRow.delivTypeNm }}</span>
                      {{ delivRow.itemNm }}
                    </a>
                  </p>
                  <!--■ ■ ■ 결제정보, 처리버튼모음====================================-->
                  <!--전체취소되었으면 안됨, 선물하기 부분취소 안됨, 핸드폰소액결재포함된 경우 안됨-->
                  <template
                    v-if="ordRow.hpSamtTdrIncldYn === 'N' && (delivRow.delivStatCd === '01' || delivRow.delivStatCd === '02') && delivRow.ordTypeCd != '20' && ordRow.giftYn == 'N' && isEmpty(ordRow.uniDelivOrdVal)"
                  >
                    <!-- 예약상품은 발주후 취소 불가 ordTypeCd : 20(선물하기주문) 50(예약상품), orderStatCd : Y(발주완료) N(발주전) -->
                    <template
                      v-if="(delivRow.ordTypeCd === '50' && delivRow.orderStatCd === 'N') || delivRow.ordTypeCd !== '50'"
                    >
                      <button
                        type="button"
                        class="btn-border btn-tiny"
                        @click="goPatlCncl(delivRow, dtRow.ordDtNm)"
                      >부분취소</button>
                    </template>
                  </template>
                  <!--□ □ □ 결제정보, 처리버튼모음====================================-->
                </div>
                <template v-if="delivRow.ordQty > 0">
                  <div class="delivery-detail-info">
                    <span class="branch">{{ delivRow.siteNm }}</span>
                    <span class="destination">[{{ delivRow.dlvpNm }}]</span>
                  </div>
                  <!--■ ■ ■ 배송예정시간====================================-->
                  <div class="schedule">
                    <a
                      href="javascript:void(0);"
                      aria-label="배송조회 팝업 활성화"
                      aria-haspopup="dialog"
                      @click="popupTrackingActive(delivRow)"
                      v-if="isNotEmpty(delivRow.dvdescDlvcoCd)"
                    >배송조회 : {{ delivRow.delivStatDesc }}</a>
                    <span
                      v-else-if="isNotEmpty(delivRow.delivStatDesc)"
                    >{{ delivRow.delivStatDesc }}</span>
                    <span
                      v-else-if="delivRow.ordStatCd == '01' && delivRow.delivStatCd == '01'"
                    >배송지 미입력</span>
                    <span v-else>
                      <br />
                    </span>
                  </div>
                  <!--□ □ □ 배송예정시간====================================-->
                </template>
              </div>
              <!--■ ■ ■ 처리버튼모임====================================-->
              <div class="btns-step" v-if="delivRow.ordQty > 0">
                <button
                  type="button"
                  @click="popupDelivTimeChg(delivRow)"
                  v-if="setProcBtn('01', ordRow, delivRow)"
                >배송시간 변경</button>
                <button
                  type="button"
                  aria-label="배송지 변경 팝업 활성화"
                  aria-haspopup="dialog"
                  @click="popupDeliveryListActive(delivRow)"
                  v-if="setProcBtn('02', ordRow, delivRow)"
                >배송지변경</button>
                <button
                  type="button"
                  @click="reqClaimRtn(delivRow, ordRow, dtRow.ordDtNm)"
                  v-if="setProcBtn('03', ordRow, delivRow)"
                >반품신청</button>
                <button
                  type="button"
                  @click="reqClaimExch(delivRow)"
                  v-if="setProcBtn('04', ordRow, delivRow)"
                >교환신청</button>
                <button
                  type="button"
                  @click="regItmcWrt(delivRow)"
                  v-if="setProcBtn('05', ordRow, delivRow)"
                >상품평작성</button>
                <button
                  type="button"
                  @click="popupPickDelivTimeChg(delivRow)"
                  v-if="setProcBtn('06', ordRow, delivRow)"
                >배송시간 변경</button>
                <button
                  type="button"
                  aria-label="배송지 변경 팝업 활성화"
                  aria-haspopup="dialog"
                  @click="popupPickDeliveryListActive(delivRow)"
                  v-if="setProcBtn('07', ordRow, delivRow)"
                >배송지변경</button>
              </div>
              <!--==============================================
                클레임반복 START
              ===============================================-->
              <template v-for="(claimRow) in delivRow.claimList">
                <div class="partical-cancellation" :key="claimRow.claimSeqno">
                  <p class="detail-status">
                    <a
                      href="javascript:void(0);"
                      @click="goClaimDtl(claimRow)"
                    >{{ claimRow.claimItemNm }}</a>
                  </p>
                  <p class="breakdown" @click="goClaimDtl(claimRow)">
                    <span class="date">{{ claimRow.ordClaimDtSpNm }}</span>
                    <span class="status">{{ claimRow.ordClaimStatNm }}</span>
                  </p>
                </div>
              </template>
              <!--==============================================
                클레임반복 END
              ===============================================-->
            </div>
          </div>
          <!--==============================================
            배송유형반복 END
          ===============================================-->
        </div>
        <!--==============================================
          주문반복 END
        ===============================================-->
        <!--</div>-->
      </template>
      <!--==============================================
        날짜반복 END
      ===============================================-->
    </div>
    <!--==============================================
      더보기버튼 영역
    ===============================================-->
    <InfiniteLoading @infinite="loadMore" ref="infiniteLoading" v-if="loadMoreFlag">
      <div class="btn-more-area" slot="no-more">마지막 주문입니다.</div>
    </InfiniteLoading>

    <Loading v-show="loading" />
    <!-- <Footer /> -->
    <!-- 팝업 - 실시간 위치 추적 -->
    <!-- <PopupRealTime @popupEvent="popupAction" :mbrDelivParamInfo="mbrDelivParamInfo" v-if="this.popup.popupRealTime" /> -->
    <!-- 팝업 - 만족도 조사 -->
    <PopupSatisfaction
      @popupEvent="popupAction"
      @popupSatisfactionCallback="popupSatisfactionCallback"
      :mbrDelivParamInfo="mbrDelivParamInfo"
      v-if="this.popup.popupSatisfaction"
    />
    <!-- 팝업 - 배송조회 -->
    <PopupTrackingShipping
      @popupEvent="popupAction"
      :mbrDelivParamInfo="mbrDelivParamInfo"
      v-if="this.popup.popupTrackingShipping"
    />
    <!-- 팝업 - 배송지 목록 -->
    <PopupDeliveryList
      @popupEvent="popupAction"
      @chgDelivDlvp="chgDelivDlvp"
      :ordDelivInfo="mbrDelivParamInfo"
      v-if="this.popup.popupDeliveryList"
    />
    <!-- 팝업 - 배송시간변경 -->
    <PopupDelivTimeChg
      @popupEvent="popupAction"
      @chgDelivItme="chgDelivItme"
      :mbrDelivParamInfo="mbrDelivParamInfo"
      v-if="this.popup.popupDelivTimeChg"
    />
    <!-- 팝업 - 픽업매장 위치 -->
    <PopupPickupMap @popupEvent="popupAction" v-if="this.popup.popupPickupMap" />
    <!-- 팝업 - 주문취소 -->
    <OrdCnclAcept
      @popupEvent="popupAction"
      :mbrDelivParamInfo="mbrDelivParamInfo"
      v-if="this.popup.popupOrdCnclAcept"
    />
    <!-- 팝업 - 회수 매장 -->
    <PopupRecallShop @popupEvent="popupAction" v-if="this.popup.popupRecallShop" />
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
    <!-- 팝업 - 상품평팝업 -->
    <PopupReviewRegister
      :ordId="paramOrdId"
      @popupEvent="popupAction"
      v-if="popup.popupReviewWrite"
    />
    <!-- 팝업 - 픽업팝업 -->
    <PopupPickupShop
      @popupEvent="popupAction"
      :ordId="ordId"
      :ordsDlvpSeqno="ordsDlvpSeqno"
      :ordsDlvpInfo="ordsDlvpInfo"
      :ordsItemList="ordsItemList"
      :strInfo="strInfo"
      v-if="this.popup.popupPickupShop"
      @strInfoChoiceEvent="strInfoChoiceEvent"
    />
    <!-- TO-DO 팝업 - 픽업 매장 -->
    <PopupBoxShop
      @popupEvent="popupAction"
      :ordId="ordId"
      :ordsDlvpSeqno="ordsDlvpSeqno"
      v-if="this.popup.popupBoxShop"
      @strInfoChoiceEvent="strInfoChoiceEvent"
    />
    <!-- TO-DO 팝업 - 픽업 매장 -->
  </section>
</template>
<script>
import Vue from 'vue';
// import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
/* import SubDefaultHeader from '@/components/common/header/Header5'; // 헤더 */
/* import Footer from '@/components/common/Footer'; // 푸터 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupPeriodCalendar from '@/views/ss/PopupPeriodCalendar'; // 팝업 - 기간조회
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';
import NoList from '@/components/common/NoList'; // 리스트 없음
import MyTrackingDetails from '@/views/cs/orddeliv/MyTrackingDetails'; // 상세조회(상세검색조건영역)
/* import PopupRealTime from '@/views/cs/orddeliv/RealTimeDelivPosition'; // 팝업 - 실시간 위치 추적 @/views/ss/SC-FO-SS-GF-MP-853 */
import PopupSatisfaction from '@/views/cs/orddeliv/DelivStlvReg'; // 팝업 - 만족도조사 @/views/ss/SC-FO-SS-GF-MP-854
import PopupTrackingShipping from '@/views/cs/orddeliv/DelivDlvInq'; // 팝업 - 배송조회 @/views/ss/SC-FO-SS-GF-MP-855
import PopupDeliveryList from '@/views/cs/orddeliv/PopupDlvpList'; // 팝업 - 배송지 목록 @/views/pa/SC-FO-PA-GS-MP-001
import PopupDelivTimeChg from '@/views/cs/orddeliv/DelivTimeChg'; // 팝업 - 배송시간변경 @/views/ss/SC-FO-SS-GF-MS-804
import PopupPickupMap from '@/views/od/PopupPkupStrPositInfo'; // 팝업 - 픽업매장 위치보기 /views/pa/SC-FO-PA-GS-MP-005
import OrdCnclAcept from '@/views/cs/claimmgnt/OrdCnclAcept'; // 팝업 - 주문취소 '@/views/ss/SC-FO-SS-GF-MS-806'
import PopupReviewRegister from '@/views/cu/mypgmgnt/ReviewRegister'; // 팝업 - 상품평 작성
import PopupPickupShop from '@/views/od/PopupPkupStrSrch'; // 팝업 - 픽업 매장 검색
import PopupBoxShop from '@/views/od/PopupBoxStrSrch'; // 팝업 - 픽업 매장 검색
import CookieUtils from '@/common/CookieUtils';
import InfiniteLoading from 'vue-infinite-loading';
import Loading from '@/components/common/Loading';
import Tracker from '@/common/Tracker';

export default {
  name: 'OrderShippingCondition',
  data() {
    return {
      bus: new Vue(),
      // 주문배송목록
      ordDtList: null,
      // 배송유형기준 정보 파라미터(팝업전송)
      mbrDelivParamInfo: {},
      paramOrdId: '',
      // 팝업
      popup: {
        open: false,
        /* popupRealTime: false, // 팝업 - 실시간 위치 추적 */
        popupSatisfaction: false, // 팝업 - 만족도조사
        popupTrackingShipping: false, // 팝업 - 배송조회
        popupDeliveryList: false, // 팝업 - 배송지 목록
        popupDelivTimeChg: false, // 팝업 - 배송시간변경
        popupPickupMap: false, // 팝업 - 픽업매장 위치보기
        popupRecallShop: false, // 회수 매장
        popupMenuShow: false, // 픽업 선택 버튼 클릭 컨텍스트메뉴
        popupOrdCnclAcept: false, // 주문취소
        popupPeriodCalendar: false, // 팝업 - 기간조회
        popupReviewWrite: false, // 팝업 - 상품평작성 팝업
        popupPickupShop: false, // 픽업 매장
        popupBoxShop: false, // BOX25 매장
      },
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
      paramDelivTypeCd: this.$route.query.selectDelivTypeCd,
      paramDelivStatCd: this.$route.query.selectDelivStatCd,
      // 더보기(페이징정보)
      moreData: true,
      loading: false,
      loadMoreFlag: false,
      loadCount: 0,
      pageNo: 0,
      pageSize: 0,
      LIMIT_PAGE_SIZE: 5,
      $state: {},
      siteClass: '',
      custCentTel: {}, // 고객센터 전화번호 정보
      grandOpenDate: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '주문/배송현황 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '주문배송현황',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  components: {
    /* SubDefaultHeader, // 헤더 */
    /* Footer, // 헤더 */
    MyTrackingDetails, // 상세조회(상세검색조건영역)
    NoList, // 리스트 없음
    /* PopupRealTime, // 팝업 - 실시간 위치 추적 */
    PopupSatisfaction, // 팝업 - 만족도 조사
    PopupTrackingShipping, // 팝업 - 배송조회
    PopupDeliveryList, // 팝업 - 배송지 목록
    PopupDelivTimeChg, // 팝업 - 배송시간
    PopupPickupMap, // 팝업 - 픽업매장 위치
    OrdCnclAcept, // 주문취소
    PopupPeriodCalendar,
    PopupReviewRegister,
    PopupPickupShop, // 팝업 - 픽업매장
    PopupBoxShop, // 팝업 - 픽업매장
    InfiniteLoading,
    Loading,
  },
  methods: {
    // 버튼제어(화면에서 처리버튼 show/hide)
    chkProcBtn(ordRow, delivRow) {
      if (this.setProcBtn('01', ordRow, delivRow)) return true;
      if (this.setProcBtn('02', ordRow, delivRow)) return true;
      if (this.setProcBtn('03', ordRow, delivRow)) return true;
      if (this.setProcBtn('04', ordRow, delivRow)) return true;
      if (this.setProcBtn('05', ordRow, delivRow)) return true;
      if (this.setProcBtn('06', ordRow, delivRow)) return true;
      if (this.setProcBtn('07', ordRow, delivRow)) return true;
      return false;
    },

    // 버튼제어(화면에서 처리버튼 show/hide)
    setProcBtn(paramBtn, ordRow, delivRow) {
      if (delivRow != null && ordRow != null && this.isEmpty(delivRow.btnCnt)) {
        delivRow.btnCnt = 0;
      }
      /*
      OD0004 ( 주문상태코드 ) ::: 01 : 주문대기, 02 : 결제대기, 10 : 주문완료, 90 : 주문취소
      OD0017 ( 배송유형코드 ) ::: 01 : 당일배송, 02 : 자사택배, 03 : 업체택배, 04 : 새벽배송, 05 : 해외배송, 06 : 무배송
      OD0018 ( 배송상태코드 ) ::: 01 : 주문중, 02 : 주문완료, 03 : 상품준비중, 04 : 배송중, 05 : 배송완료, 06 : 배송미완료
                                  07 : 배송취소, 08 : 클레임접수, 09 : 회수중, 10 : 회수완료, 11 : 회수미완료, 12 : 회수취소
      OD0015 ( 상품수취유형코드 ) ::: D : 주문자지정, S : 수퍼픽업, T : 점포픽업, B : BOX25픽업, O : 온라인
      */
      // 배송시간변경
      if (paramBtn == '01') {
        // D: 주문자 지정, O: 온라인 이 아니면 불가
        if (
          !(delivRow.itemRcptTypeCd === 'D' || delivRow.itemRcptTypeCd === 'O')
        ) {
          return false;
        }
        // 선물하기 배송지 변경 불가
        if (delivRow.ordTypeCd == '20') {
          return false;
        }
        // 예약주문 배송지 변경 불가
        if (delivRow.ordTypeCd == '50') {
          return false;
        }
        // 당일배송, 새벽배송만 배송시간 변경 가능
        if (delivRow.delivTypeCd != '01' && delivRow.delivTypeCd != '04') {
          return false;
        }
        // 진행중인 클레임이 존재하면 불가
        if (ordRow.ordClaimProgYn != 'N') {
          return false;
        }
        // 주문상태가 주문완료 인 경우에만 가능
        if (ordRow.ordStatCd != '10') {
          return false;
        }
        // 배송상태가 주문완료 인 경우에만 가능
        if (delivRow.delivStatCd != '02') {
          return false;
        }
        // 예약주문은 불가
        if (delivRow.ordTypeCd === '50') {
          return false;
        }
        delivRow.btnCnt = 1;
        return true;
      }
      // 배송지변경 - 해외직구는 노출하지만 처리불가 메시지처리
      if (paramBtn == '02') {
        // D: 주문자 지정, O: 온라인 이 아니면 불가
        if (
          !(delivRow.itemRcptTypeCd === 'D' || delivRow.itemRcptTypeCd === 'O')
        ) {
          return false;
        }
        // 선물하기 배송지 변경 불가
        if (delivRow.ordTypeCd == '20') {
          return false;
        }
        // 예약주문 배송지 변경 불가
        if (delivRow.ordTypeCd == '50') {
          return false;
        }
        // if (ordRow.ordStatCd === '10' && delivRow.delivStatCd == '02' && ordRow.ordClaimProgYn === 'N' && (delivRow.delivTyWHGHLpeCd === '01' || delivRow.delivTypeCd === '04' || delivRow.delivTypeCd === '05')) {
        if (
          ordRow.ordStatCd === '10' &&
          delivRow.delivStatCd == '02' &&
          ordRow.ordClaimProgYn === 'N'
        ) {
          delivRow.btnCnt = 1;
          return true;
        } else {
          return false;
        }
      }
      // 반품신청
      if (paramBtn == '03') {
        /* if (delivRow.delivStatCd == '05' && ordRow.ordClaimProgYn === 'N' && ordRow.hpSamtTdrIncldYn === 'N') { */
        if (delivRow.claimTermPosbYn != 'Y') {
          return false;
        }
        if (delivRow.delivStatCd == '05' && ordRow.ordClaimProgYn === 'N') {
          delivRow.btnCnt = 1;
          return true;
        } else {
          return false;
        }
      }
      // 교환신청
      if (paramBtn == '04') {
        if (delivRow.claimTermPosbYn != 'Y') {
          return false;
        }
        if (delivRow.delivTypeCd == '05') {
          // 해외배송 교환 불가
          return false;
        }
        if (delivRow.delivStatCd == '05' && ordRow.ordClaimProgYn === 'N') {
          delivRow.btnCnt = 1;
          return true;
        } else {
          return false;
        }
      }
      // 상품평작성
      if (paramBtn == '05') {
        if (delivRow.itmcWrtPosbYn === 'Y' && ordRow.ordClaimProgYn === 'N') {
          delivRow.btnCnt = 1;
          return true;
        } else {
          return false;
        }
      }
      // 픽업시간변경(수취유형이 S : 수퍼픽업, T : 점포픽업, B : BOX25픽업)
      if (paramBtn == '06') {
        if (
          ordRow.ordStatCd === '10' &&
          delivRow.delivStatCd == '02' &&
          ordRow.ordClaimProgYn === 'N' &&
          (delivRow.itemRcptTypeCd === 'S' ||
            delivRow.itemRcptTypeCd === 'T' ||
            delivRow.itemRcptTypeCd === 'B')
        ) {
          delivRow.btnCnt = 1;
          return true;
        } else {
          return false;
        }
      }
      // 픽업지점변경(수취유형이 S : 수퍼픽업, T : 점포픽업, B : BOX25픽업)
      if (paramBtn == '07') {
        if (
          ordRow.ordStatCd === '10' &&
          delivRow.delivStatCd == '02' &&
          ordRow.ordClaimProgYn === 'N' &&
          (delivRow.itemRcptTypeCd === 'S' ||
            delivRow.itemRcptTypeCd === 'T' ||
            delivRow.itemRcptTypeCd === 'B')
        ) {
          delivRow.btnCnt = 1;
          return true;
        } else {
          return false;
        }
      }
    },
    checkOpenDate(ordDt) {
      ordDt = ordDt.replace(/[.]|-/gi, '');
      const openDate = this.grandOpenDate.replace(/[.]|-/gi, '');
      if (ordDt < openDate) {
        this.$gsdialog.alert(
          '해당 주문의 취소/반품 신청은<br/>1:1문의 나 고객센터(' +
            this.custCentTel.commCdNm +
            ')로<br/>접수해 주시기 바랍니다.',
          { html: true, header: '' }
        );
        return false;
      }
      return true;
    },
    // 반품신청 화면이동
    reqClaimRtn(paramDelivRow, paramOrdRow, ordDt) {
      if (!this.checkOpenDate(ordDt)) {
        return false;
      }
      // BOX25 는 변경 불가 픽업시간변경(수취유형이 S : 수퍼픽업, T : 점포픽업, B : BOX25픽업)
      if (
        paramDelivRow.itemRcptTypeCd === 'S' ||
        paramDelivRow.itemRcptTypeCd === 'T' ||
        paramDelivRow.itemRcptTypeCd === 'B'
      ) {
        const confirmMsg =
          '픽업 상품 반품/교환은<br/>1:1문의 또는 고객센터(' +
          this.custCentTel.commCdNm +
          ')로<br/>접수해 주시기 바랍니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      /* 08-28 임박상품이 포함되 있더라도 다른 상품은 반품 가능해야 함. 신청 화면에서 처리
      if (paramDelivRow.apchItemIncldYn == 'Y') {
        const confirmMsg = "임박 상품이 포함되어있어<br/>반품 신청이 불가합니다.";
        this.$gsdialog.alert(confirmMsg, {html: true});
        return;
      } */
      if (paramOrdRow.hpSamtTdrIncldYn != 'N') {
        const confirmMsg =
          '해당 주문 반품신청은<br/>1:1문의 나 고객센터(' +
          this.custCentTel.commCdNm +
          ')로<br/>접수해 주시기 바랍니다.<br/>(부분취소 불가 결제수단)';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      this.$router.push(
        '/cs/claimmgnt/ord_rtn_acept/' +
          paramDelivRow.ordId +
          '/' +
          paramDelivRow.orgDelivId
      );
    },
    // 교환신청 화면이동
    async reqClaimExch(paramDelivRow) {
      // BOX25 는 변경 불가 픽업시간변경(수취유형이 S : 수퍼픽업, T : 점포픽업, B : BOX25픽업)
      if (
        paramDelivRow.itemRcptTypeCd === 'S' ||
        paramDelivRow.itemRcptTypeCd === 'T' ||
        paramDelivRow.itemRcptTypeCd === 'B'
      ) {
        const confirmMsg =
          '픽업 상품 반품/교환은<br/>1:1문의 또는 고객센터(' +
          this.custCentTel.commCdNm +
          ')로<br/>접수해 주시기 바랍니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      if (paramDelivRow.delivTypeCd == '05') {
        const confirmMsg =
          '해외직구 상품 교환은<br/>고객센터(' +
          this.custCentTel.commCdNm +
          ')로<br/>접수해 주시기 바랍니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      /* 08-28 임박상품이 포함되 있더라도 다른 상품은 교환 가능해야 함. 신청 화면에서 처리
      if (paramDelivRow.apchItemIncldYn == 'Y') {
        const confirmMsg = "임박 상품이 포함되어있어<br/>교환 신청이 불가합니다.";
        this.$gsdialog.alert(confirmMsg, {html: true});
        return;
      } */
      // (OD0017 ( 배송유형코드 ) ::: 01 : 당일배송, 02 : 자사택배, 03 : 업체택배, 04 : 새벽배송, 05 : 해외배송, 06 : 무배송)
      if (
        paramDelivRow.delivTypeCd === '02' ||
        paramDelivRow.delivTypeCd === '03'
      ) {
        const confirmMsg =
          '상품을 이미 발송하신 경우에는<br/>고객센터(' +
          this.custCentTel.commCdNm +
          ')로<br/>접수해 주시기 바랍니다.';
        const confirmFlag = await this.$gsdialog.confirm(confirmMsg, {
          html: true,
          header: '교환신청 하시겠습니까?',
        });
        if (!confirmFlag) {
          return;
        }
      }
      this.$router.push(
        '/cs/claimmgnt/ord_exch_acept/' +
          paramDelivRow.ordId +
          '/' +
          paramDelivRow.orgDelivId
      );
    },
    // 부분취소 화면이동
    goPatlCncl(paramDelivRow, ordDt) {
      if (!this.checkOpenDate(ordDt)) {
        return false;
      }
      this.$router.push(
        '/cs/claimmgnt/ord_cncl_acept/' +
          paramDelivRow.ordId +
          '/' +
          paramDelivRow.orgDelivId
      );
    },
    // 부분반품 화면이동
    goPatlRtn(paramClaimRow) {
      this.$router.push(
        '/cs/claimmgnt/ord_rtn_acept/' +
          paramDelivRow.ordId +
          '/' +
          paramDelivRow.orgDelivId
      );
    },
    // 클레임상세 화면이동
    goClaimDtl(paramClaimRow) {
      // OD0007 ( 주문클레임구분코드 ) ::: O : 주문, C : 취소, R : 반품, E : 교환
      if (paramClaimRow.ordClaimSpCd == 'C') {
        this.$router.push(
          '/cs/claimmgnt/ord_cncl_dtl/' +
            paramClaimRow.ordId +
            '/' +
            paramClaimRow.claimSeqno
        );
      }
      if (paramClaimRow.ordClaimSpCd == 'R') {
        this.$router.push(
          '/cs/claimmgnt/ord_rtn_dtl/' +
            paramClaimRow.ordId +
            '/' +
            paramClaimRow.claimSeqno
        );
      }
      if (paramClaimRow.ordClaimSpCd == 'E') {
        this.$router.push(
          '/cs/claimmgnt/ord_exch_dtl/' +
            paramClaimRow.ordId +
            '/' +
            paramClaimRow.claimSeqno
        );
      }
    },
    // 실시간배송위치 팝업
    popupRealTimeActive(paramDelivRow) {
      this.mbrDelivParamInfo = paramDelivRow;
      this.popupAction('popupRealTime');
    },
    // 배송만족도조사 팝업
    popupSatisfactionActive(paramDelivRow) {
      this.mbrDelivParamInfo = paramDelivRow;
      this.popupAction('popupSatisfaction');
    },
    popupSatisfactionCallback(paramObj) {
      this.retrievelist();
    },
    // 배송조회(운송장조회) 팝업
    popupTrackingActive(paramDelivRow) {
      /* paramDelivRow.supplFirmTypeCd 커머스 공급 업체 유형 코드 (SS0039) 1 : 점포, 2 : 센터, 3 : 협력사 */
      /* alert("TDS(paramDelivRow.supplFirmTypeCd==3) 인지 아닌지에 따라 호출위치가 달라짐 : " + paramDelivRow.supplFirmTypeCd); */
      this.mbrDelivParamInfo = paramDelivRow;
      this.popupAction('popupTrackingShipping');
    },
    // 배송지 목록 팝업
    popupDeliveryListActive(paramDelivRow) {
      if (paramDelivRow.delivTypeCd == '05') {
        const confirmMsg =
          '해외직구 배송지변경은<br/>고객센터(' +
          this.custCentTel.commCdNm +
          ')로<br/>접수해 주시기 바랍니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      if (paramDelivRow.supplCloseYn == 'Y') {
        this.$gsdialog.alert(
          '해당 주문의 매장이 폐점되어 고객센터(' +
            this.custCentTel.commCdNm +
            ')로 문의 하시기 바랍니다.',
          { html: true }
        );
        return;
      }
      this.mbrDelivParamInfo = paramDelivRow;
      this.popupAction('popupDeliveryList');
    },
    // 배송지 수정 후 재조회 처리
    chgDelivDlvp(paramObj) {
      this.retrievelist();
    },
    // 배송시간 변경 팝업
    popupDelivTimeChg(paramDelivRow) {
      if (paramDelivRow.existsPrcKind == 'Y') {
        const confirmMsg =
          '임박 상품이 포함되어있어<br/>배송시간 변경이 불가합니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      if (paramDelivRow.existsSpckItem == 'Y') {
        const confirmMsg =
          '심플리쿡 상품이 포함되어있어<br/>배송시간 변경이 불가합니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      if (paramDelivRow.delivSeqsChgNum > 0) {
        this.$gsdialog
          .alert('배송시간 변경은<br/>1회만 가능합니다.', { html: true })
          .then(dialog => {});
        return;
      }
      if (paramDelivRow.supplCloseYn == 'Y') {
        this.$gsdialog.alert(
          '해당 주문의 매장이 폐점되어 고객센터(' +
            this.custCentTel.commCdNm +
            ')로 문의 하시기 바랍니다.',
          { html: true }
        );
        return;
      }
      this.mbrDelivParamInfo = paramDelivRow;
      this.popupAction('popupDelivTimeChg');
    },
    // 배송요청시간 수정 후 재조회 처리
    chgDelivItme(paramObj) {
      if (!this.isEmpty(paramObj)) {
        this.retrievelist();
      }
    },
    // 픽업 배송지 목록 팝업
    popupPickDeliveryListActive(paramDelivRow) {
      const confirmMsg =
        '픽업 변경 문의는<br/>고객센터(' +
        this.custCentTel.commCdNm +
        ')로<br/>접수해 주시기 바랍니다.';
      this.$gsdialog.alert(confirmMsg, { html: true });
    },
    // 픽업 배송시간 변경 팝업
    popupPickDelivTimeChg(paramDelivRow) {
      // BOX25 는 변경 불가 픽업시간변경(수취유형이 S : 수퍼픽업, T : 점포픽업, B : BOX25픽업)
      if (paramDelivRow.itemRcptTypeCd === 'B') {
        const confirmMsg =
          'BOX25 픽업 변경 문의는<br/>고객센터(' +
          this.custCentTel.commCdNm +
          ')로<br/>접수해 주시기 바랍니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      if (paramDelivRow.apchItemIncldYn == 'Y') {
        const confirmMsg =
          '임박 상품이 포함되어있어<br/>배송시간 변경이 불가합니다.';
        this.$gsdialog.alert(confirmMsg, { html: true });
        return;
      }
      if (paramDelivRow.delivSeqsChgNum > 0) {
        this.$gsdialog
          .alert('배송시간 변경은<br/>1회만 가능합니다.', { html: true })
          .then(dialog => {});
        return;
      }
      if (paramDelivRow.supplCloseYn == 'Y') {
        this.$gsdialog.alert(
          '해당 주문의 매장이 폐점되어 고객센터(' +
            this.custCentTel.commCdNm +
            ')로 문의 하시기 바랍니다.',
          { html: true }
        );
        return;
      }
      // S : 수퍼픽업
      if (paramDelivRow.itemRcptTypeCd === 'S') {
        this.mbrDelivParamInfo = paramDelivRow;
        this.popupAction('popupDelivTimeChg');
        return;
      }
      // T : 점포픽업
      if (paramDelivRow.itemRcptTypeCd === 'T') {
        this.mbrDelivParamInfo = paramDelivRow;
        this.popupAction('popupDelivTimeChg');
        return;
      }
      // this.mbrDelivParamInfo = paramDelivRow;
      // this.popupAction('popupDelivTimeChg');
    },
    // 픽업매장 팝업
    popupPickupMap(paramDelivRow) {
      this.mbrDelivParamInfo = paramDelivRow;
      this.popupAction('popupPickupMap');
    },
    // 주문취소 팝업
    popupOrdCnclAcept(paramDelivRow) {
      this.mbrDelivParamInfo = paramDelivRow;
      this.popupAction('popupOrdCnclAcept');
    },
    // 상품평목록화면으로 이동
    regItmcWrt(paramDelivRow) {
      this.$router.push('/cu/my_page_review_list');
    },
    // 픽업 변경 클릭
    popupShowmenuAction() {
      this.popup.popupMenuShow = !this.popup.popupMenuShow;
    },
    // 픽업 버튼 레이어 숨김
    focusOutAction() {
      this.popup.popupMenuShow = false;
    },
    // 픽업 매장 팝업
    popupShopAction() {
      this.popupAction('popupPickupShop');
    },
    // 픽업 박스 팝업
    popupBoxShopAction() {
      this.popupAction('popupBoxShop');
    },
    setCookieSearchOption() {
      const ordSearchOption = {
        delivTypeCd: this.paramDelivTypeCd,
        delivStatCd: this.paramDelivStatCd,
        period: this.period,
        active: this.active,
      };
      CookieUtils.setCookie('ordSearchOption', JSON.stringify(ordSearchOption));
    },
    // 주문상세화면 이동
    goOrdInfoPage(paramOrdInfo) {
      this.setCookieSearchOption();
      this.$router.push('/cs/orddeliv/ord_deliv_dtl/' + paramOrdInfo.ordId);
    },
    // 합배송 주문상세화면 이동
    goUniOrdInfoPage(paramOrdInfo) {
      this.setCookieSearchOption();
      let paramOrdId = '';
      if (paramOrdInfo.uniDelivOrdVal == 'A') {
        paramOrdId = paramOrdInfo.uniDelivOrdId;
      }
      if (paramOrdInfo.uniDelivOrdVal == 'B') {
        paramOrdId = paramOrdInfo.uniDelivOrdId;
      }
      this.$router.push('/cs/orddeliv/ord_deliv_dtl/' + paramOrdId);
    },
    // 전체취소 처리
    async totCncl(paramOrdInfo) {
      let apiUrl = '/fo/cs/frontOrdAllCnclAcept';
      let headerMsg = '주문을 취소하시겠습니까?';
      const params = {
        cmmMbrNo: paramOrdInfo.cmmMbrNo,
        userId: paramOrdInfo.cmmMbrNo,
      };
      let confirmMsg = '';
      confirmMsg += `
        <div class="layer-content">
          <ul class="list-type-dot letter-narrow">
            <li>모든 상품이 결제완료 단계일 경우에만 전체 주문 취소가 가능합니다.</li>
            <li>주문 시 사용하신 장바구니 쿠폰은 재사용 가능합니다. (단 쿠폰 기간에 한함)</li>
            <li>취소 후 재구매 시 상품 가격은 변동될 수 있습니다.</li>
          </ul>
        </div>`;
      // 합배송인 경우 A:다른주문을 포함한 주문, B:다른주문배송에 포함된 주문
      if (
        paramOrdInfo.uniDelivOrdVal == 'A' ||
        paramOrdInfo.uniDelivOrdVal == 'B'
      ) {
        apiUrl = '/fo/cs/frontBundleDelivOrdCnclAcept';
        headerMsg = `주문을 취소하시겠습니까?`;
        params.bundlDelivOrdId = paramOrdInfo.bundlDelivOrdId;
        confirmMsg = `
        <div class="layer-content">
          <ul class="list-type-dot letter-narrow">
            <li>기존주문과 합배송주문 모두 취소처리 됩니다.</li>
            <li>모든 상품이 결제완료 단계일 경우에만 전체 주문 취소가 가능합니다.</li>
            <li>주문 시 사용하신 장바구니 쿠폰은 재사용 가능합니다. (단 쿠폰 기간에 한함)</li>
            <li>취소 후 재구매 시 상품 가격은 변동될 수 있습니다.</li>
          </ul>
        </div>`;
      } else {
        params.ordId = paramOrdInfo.ordId;
      }

      const confirmFlag = await this.$gsdialog.confirm(confirmMsg, {
        html: true,
        header: headerMsg,
      });
      if (confirmFlag) {
        this.loading = true;
        ApiUtils.post(apiUrl, params).then(res => {
          this.loading = false;
          if (!res.data.success) {
            this.$gsdialog
              .alert(
                '전체취소 요청에 실패하였습니다.<br>고객센터(' +
                  this.custCentTel.commCdNm +
                  ')로 문의하시기 바랍니다.',
                { html: true, header: '' }
              )
              .then(dialog => {});
            return;
          } else {
            if (res.data.statusCode == '0000') {
              this.$gsdialog
                .alert('주문 취소 처리가 완료되었습니다.', {
                  html: false,
                  header: '',
                })
                .then(dialog => {
                  Tracker.canceledOrder(params.ordId);
                  this.retrievelist();
                });
            } else {
              this.$gsdialog
                .alert(
                  '전체취소 요청에 실패하였습니다.<br>고객센터(' +
                    this.custCentTel.commCdNm +
                    ')로 문의하시기 바랍니다.',
                  { html: true, header: '' }
                )
                .then(dialog => {});
            }
          }
        });
      }
    },
    // 데이터확인용
    showOrdInfo(e) {
      if (!e.ctrlKey || !e.shiftKey) {
        return;
      }
      // this.retrievelistTest();
      const id = document.getElementById('ordHideInfo');
      const nm = document.getElementsByName('ordHideInfo');
      nm.forEach(el => {
        const display = el.style.display;
        el.style.display = display == 'none' ? 'block' : 'none';
      });
    },
    // 주문배송목록
    retrievelistTest() {
      const params = {};
      ApiUtils.get('/fo/cs/claimmgnt/order-delivery-state-count', params).then(
        res => {
          alert(
            '결제완료 건수 : ' +
              res.data.data.ordTrdFinCnt +
              '\n' +
              '상품준비중 : ' +
              res.data.data.cnt02 +
              '\n' +
              '배송중 : ' +
              res.data.data.cnt03 +
              '\n' +
              '배송완료 : ' +
              res.data.data.cnt04
          );
        }
      );
    },
    // 주문배송목록
    retrievelist() {
      this.loadMoreFlag = false;
      this.ordDtList = [];
      this.pageNo = 1;

      if (this.isEmpty(this.period.start.date)) {
        this.$gsdialog.alert('조회기간을 선택하세요.').then(dialog => {});
        return;
      }
      if (this.isEmpty(this.period.end.date)) {
        this.$gsdialog.alert('조회기간을 선택하세요.').then(dialog => {});
        return;
      }
      if (this.period.start.date > this.period.end.date) {
        this.$gsdialog
          .alert('종료일이 시작일보다 작을 수 없습니다.', { html: true })
          .then(dialog => {});
        return;
      }
      const params = {
        inqBeginDt: this.period.start.date,
        inqEndDt: this.period.end.date,
        delivTypeCd: this.paramDelivTypeCd,
        delivStatCd: this.paramDelivStatCd,
        limit: this.LIMIT_PAGE_SIZE,
        offset: (this.pageNo - 1) * this.LIMIT_PAGE_SIZE,
      };
      this.loading = true;
      ApiUtils.get('/fo/cs/orddelivmgnt/order-delivery-list', params)
        .then(res => {
          this.loading = false;
          if (res.data === null) {
            this.loadMoreFlag = false;
            return;
          }
          if (res.data.data === null || res.data.data.length === 0) {
            this.loadMoreFlag = false;
            return;
          }
          if (this.LIMIT_PAGE_SIZE > res.data.data.length) {
            this.loadMoreFlag = false;
          }
          if (this.ordDtList == null) {
            this.ordDtList = [];
          }
          if (res.data.data != null && res.data.data.length > 0) {
            if (this.isEmpty(this.pgSize)) {
              this.pgSize = 0;
            }
            this.pageNo = this.pageNo + 1;

            res.data.data.forEach(appendRow => {
              this.ordDtList.push(appendRow);
            });
            this.loadCount = this.ordDtList.length;
          }
          if (
            parseInt(this.ordDtList.length) ===
            parseInt(res.data.data[0].totCnt)
          ) {
            this.loadMoreFlag = false;
          } else {
            this.loadMoreFlag = true;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    async loadMore($state) {
      this.$state = $state;

      if (this.isEmpty(this.period.start.date)) {
        this.$gsdialog.alert('조회기간을 선택하세요.').then(dialog => {});
        return;
      }
      if (this.isEmpty(this.period.end.date)) {
        this.$gsdialog.alert('조회기간을 선택하세요.').then(dialog => {});
        return;
      }
      if (this.period.start.date > this.period.end.date) {
        this.$gsdialog
          .alert('종료일이 시작일보다 작을 수 없습니다.', { html: true })
          .then(dialog => {});
        return;
      }
      const params = {
        inqBeginDt: this.period.start.date,
        inqEndDt: this.period.end.date,
        delivTypeCd: this.paramDelivTypeCd,
        delivStatCd: this.paramDelivStatCd,
        limit: this.LIMIT_PAGE_SIZE,
        offset: (this.pageNo - 1) * this.LIMIT_PAGE_SIZE,
      };
      this.loading = true;
      ApiUtils.get('/fo/cs/orddelivmgnt/order-delivery-list', params)
        .then(res => {
          this.loading = false;
          if (res.data === null) {
            this.loadMoreFlag = false;
            $state.complete();
            return;
          }
          if (res.data.data === null || res.data.data.length === 0) {
            this.loadMoreFlag = false;
            $state.complete();
            return;
          }
          if (this.LIMIT_PAGE_SIZE > res.data.data.length) {
            this.loadMoreFlag = false;
            $state.complete();
          }
          if (this.ordDtList == null) {
            this.ordDtList = [];
          }
          if (res.data.data != null && res.data.data.length > 0) {
            if (this.isEmpty(this.pgSize)) {
              this.pgSize = 0;
            }
            this.pageNo = this.pageNo + 1;

            res.data.data.forEach(appendRow => {
              this.ordDtList.push(appendRow);
            });
            this.loadCount = this.ordDtList.length;
            $state.loaded();
          }
          if (
            parseInt(this.ordDtList.length) ===
            parseInt(res.data.data[0].totCnt)
          ) {
            this.loadMoreFlag = false;
            $state.complete();
          } else {
            this.loadMoreFlag = true;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
    },
    // 1, 3, 6, 12 개월버튼 클릭(기간 조회 버튼 활성화 변경)
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
    // 달력 팝업 활성화 type: 'start' / 'end'
    calendarOpen(type) {
      this.period.selected.type = type;
      this.period.selected.changingDate = this.period[type];
      this.popupAction('popupPeriodCalendar');
    },
    // 검색조건 콤보(배송유형, 배송상태) 변경 시
    comboChange(paramDelivTypeCd, paramDelivStatCd) {
      this.paramDelivTypeCd = paramDelivTypeCd;
      this.paramDelivStatCd = paramDelivStatCd;
      this.retrievelist();
    },
    setPeriod(period, active) {
      this.active = active;
      this.period = period;
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
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    // 공통코드 조회
    searchCommCd(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params).then(res => {
        if (commGrpCd == 'CS0009') {
          this.ordClaimResnList = res.data.data;
          // 교환 시 불필요한 주문클레임사유코드 제거
          for (let idx = this.ordClaimResnList.length - 1; idx > 0; idx--) {
            if (
              this.ordClaimResnList[idx].commCd == '10' ||
              this.ordClaimResnList[idx].commCd == '14'
            ) {
              this.ordClaimResnList.splice(idx, 1);
            }
          }
        } else if (commGrpCd == 'CS0027') {
          this.custCentTel = res.data.data.filter(cdDtl => {
            return cdDtl.commCd == '04';
          })[0];
        } else if (commGrpCd == 'OD0056') {
          this.grandOpenDate = res.data.data[0].commCdNm;
        }
      });
    },
  },
  created() {
    this.siteClass = CookieUtils.getSiteClass();
    // 마이페이지에서 검색조건 파라미터가 온 경우
    const selectDelivStatCd = this.$route.query.selectDelivStatCd;
    if (this.isNotEmpty(selectDelivStatCd)) {
      this.paramDelivStatCd = selectDelivStatCd;
    }
    this.setTrackingDt();
    this.custCentTel.commCdNm = '1661-2562'; // 기본 전화번호 셋팅
    this.searchCommCd('CS0027'); // 가맹점(GS 리테일) 속성 공통코드 조회
    this.searchCommCd('OD0056'); // 사이트 오픈 일자

    // 기존에는 MyTrackingDetails.vue 에서 호출하여 사용하였으나, 통합되어 이부분에서 호출하도록 수정
    this.retrievelist();
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
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
