<template>
  <div class="wrap-mypage wrap-cart public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="취소상세" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <section class="mypage">
        <!-- 6월수정 START : 페이지 제목 추가 -->
        <h2 class="hidden">주문 배송 상세 내역</h2>
        <!-- 6월수정 END : 페이지 제목 추가 -->
        <!-- START : 주문자 -->
        <section class="wrap-breakdown">
          <!-- 6월수정 START : 접근성 관련 제목 추가 -->
          <div class="wrap-heading hidden">
            <h3>주문정보</h3>
          </div>
          <!-- 6월수정 END : 접근성 관련 제목 추가 -->
          <!-- 4월 수정 : class 추가 -->
          <dl class="detail-breakdown order-top">
            <div class="order-number">
              <span class="order-number-title">주문번호</span>
              <a
                href="javascript:void(0);"
                @click="goOrdInfoPage"
                class="order-number-link"
              >{{this.ordCnclInfo.orgOrdId}}</a>
            </div>
            <dl>
              <dt>접수번호</dt>
              <dd>{{this.ordCnclInfo.ordId}}</dd>
              <dt class="order-date">접수일시</dt>
              <dd>{{this.ordCnclInfo.ordDttm}}</dd>
            </dl>
          </dl>
        </section>
        <!-- END : 주문자 -->
        <!-- 4월 수정 START : 체크박스 없는 예약배송 전체 수정 -->
        <!-- START : 예약 배송 -->
        <div class="wrapper tabcont_marketfor">
          <section class="cart-category-product">
            <MfOrderChangeView
              :ordInfo="ordCnclInfo"
              ordClaimSpCd="C"
              v-if="Object.keys(ordCnclInfo).length > 0"
            />
          </section>
        </div>
        <!-- END : 예약 배송 -->
        <!-- 4월 수정 END : 체크박스 없는 예약배송 전체 수정 -->
        <div class="cart-all">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="setOrdItemOptPut">
            <span>선택 상품 장바구니 담기</span>
          </button>
        </div>
        <!-- 20201125 START : 최종 결제금액 수정 / 결제 수단 삭제 -->
        <section class="mypage block">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">결제정보</span>
              </h3>
            </div>
            <div class="total-payment-subgrp" v-if="this.refndAmtInfo.refndAmtYn">
              <div class="sub-title send-total-price">
                <p class="txt-price">
                  환불완료금액
                  <span class="price">
                    <strong>{{this.refndAmtInfo.refndAmt | currency}}</strong>원
                  </span>
                </p>
              </div>
              <ul class="accordion-payment">
                <li>
                  <div class="tit-accordion">
                    취소 상품 금액
                    <span class="price">
                      <strong>{{this.refndAmtInfo.itemAmt | currency}}</strong>원
                    </span>
                  </div>
                </li>
                <li>
                  <div class="tit-accordion">
                    쿠폰/할인 혜택
                    <span class="price red" v-if="this.refndAmtInfo.beneAmt > 0">
                      <strong>- {{this.refndAmtInfo.beneAmt | currency}}</strong>원
                    </span>
                    <span class="price red" v-else>
                      <strong>{{this.refndAmtInfo.beneAmt | currency}}</strong>원
                    </span>
                  </div>
                </li>
                <li>
                  <div class="tit-accordion">
                    배송비
                    <button
                      type="button"
                      class="btn-infomation"
                      aria-label="배송비 안내 팝업 활성화"
                      aria-haspopup="dialog"
                      @click="popupAction('popupDeliveryPersonal')"
                    />
                    <span class="price">
                      <strong>{{this.refndAmtInfo.dlfeeAmt | currency}}</strong>원
                    </span>
                  </div>
                </li>
              </ul>
              <div
                class="gray_guide__box"
                v-if="this.refndAmtInfo.mfRefndTdrMeansInfoList && this.refndAmtInfo.mfRefndTdrMeansInfoList.length > 0"
              >
                <h5>
                  환불수단
                  <button
                    type="button"
                    class="btn-infomation"
                    aria-label="환불수단 안내 팝업 활성화"
                    aria-haspopup="dialog"
                    @click="popupAction('popupReturnInfo')"
                  />
                </h5>
                <dl v-for="(list, index) in this.refndAmtInfo.mfRefndTdrMeansInfoList" :key="index">
                  <dt>{{list.refndTdrMeansNm}}</dt>
                  <dd>{{(list.refndAmt == null)? 0 : list.refndAmt | currency}}{{list.amtSpNm}}</dd>
                </dl>
                <!-- <p class="info point">통신사 할인3,000원은 통신사 포인트(3,000P)로 환불 됩니다.</p> -->
              </div>
            </div>
            <div class="total-payment-subgrp" v-else>
              <div class="sub-title send-total-price">
                <p class="txt-price">
                  환불예정금액
                  <span class="price">
                    <strong>{{this.refndAmtInfo.refndSchedAmt | currency}}</strong>원
                  </span>
                </p>
              </div>
              <ul class="accordion-payment">
                <li>
                  <div class="tit-accordion">
                    취소 상품 금액
                    <span class="price">
                      <strong>{{this.refndAmtInfo.itemSchedAmt | currency}}</strong>원
                    </span>
                  </div>
                </li>
                <li>
                  <div class="tit-accordion">
                    쿠폰/할인 혜택
                    <span class="price red" v-if="this.refndAmtInfo.beneSchedAmt > 0">
                      <strong>- {{this.refndAmtInfo.beneSchedAmt | currency}}</strong>원
                    </span>
                    <span class="price red" v-else>
                      <strong>{{this.refndAmtInfo.beneSchedAmt | currency}}</strong>원
                    </span>
                  </div>
                </li>
                <li>
                  <div class="tit-accordion">
                    배송비
                    <button
                      type="button"
                      class="btn-infomation"
                      aria-label="배송비 안내 팝업 활성화"
                      aria-haspopup="dialog"
                      @click="popupAction('popupDeliveryPersonal')"
                    />
                    <span class="price">
                      <strong>{{this.refndAmtInfo.dlfeeSchedAmt | currency}}</strong>원
                    </span>
                  </div>
                </li>
              </ul>
              <div
                class="gray_guide__box"
                v-if="this.refndAmtInfo.mfRefndTdrMeansInfoSchedList && this.refndAmtInfo.mfRefndTdrMeansInfoSchedList.length > 0"
              >
                <h5>
                  환불수단
                  <button
                    type="button"
                    class="btn-infomation"
                    aria-label="환불수단 안내 팝업 활성화"
                    aria-haspopup="dialog"
                    @click="popupAction('popupReturnInfo')"
                  />
                </h5>
                <dl
                  v-for="(list, index) in this.refndAmtInfo.mfRefndTdrMeansInfoSchedList"
                  :key="index"
                >
                  <dt>{{list.tdrMeansNm}}</dt>
                  <dd>{{(list.refndReqAmt == null)? 0 : list.refndReqAmt | currency}}{{list.amtSpNm}}</dd>
                </dl>
                <!-- <p class="info point">통신사 할인3,000원은 통신사 포인트(3,000P)로 환불 됩니다.</p> -->
              </div>
            </div>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <!-- 4월 수정 : class 변경 -->
        <section class="section btns">
          <div class="bottom-btn-area">
            <button
              type="button"
              class="btn-md btn-bg darkgray"
              @click="goPageClaimList"
            >취소/반품/교환 목록</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러가기</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->

        <!-- 팝업 - 배송비 안내 -->
        <MfPopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" />
        <!-- START : 환불처리 안내 -->
        <MfPopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" />
        <!-- 팝업 - 환불 처리안내 -->

        <!-- START : 푸터 -->
        <Footer />
        <!-- END : 푸터 -->
        <Loading v-show="loading" />
      </section>
    </main>
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 헤더
import MfOrderChangeView from '@/components/order/MfOrderChangeView';
import Loading from '@/components/common/Loading';
import MfPopupDeliveryPersonal from '@/views/cs/claimmgnt/MfPopupDeliveryPersonal'; // 팝업 - 배송비 안내
import MfPopupReturnInfo from '@/views/cs/claimmgnt/MfPopupReturnInfo'; // 팝업 - 환불 처리안내

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'MfCancelDetailList',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        // 팝업
        open: false,
        popupMobileBill: false,
        popupDeliveryPersonal: false,
        popupReturnInfo: false,
      },
      ordId: this.$route.params.ordId, // 주문ID
      ordCnclInfo: {},
      mfRefndTrdMeansInfoList: [],
      mfClaimPntInfoList: [],
      refndAmtInfo: {
        // 환불예정금액
        refndSchedAmt: 0,
        // 상품예정금액
        itemSchedAmt: 0,
        // 혜택예정금액
        beneSchedAmt: 0,
        // 배송비예정금액
        dlfeeSchedAmt: 0,
        // 환불결제수단 예정정보
        mfRefndTdrMeansInfoSchedList: [],
        // 환불금액
        refndAmt: 0,
        // 상품금액
        itemAmt: 0,
        // 혜택금액
        beneAmt: 0,
        // 배송비금액
        dlfeeAmt: 0,
        // 환불결제수단정보
        mfRefndTdrMeansInfoList: [],
        // 구분값
        refndAmtYn: false,
      },
      loading: false,
    };
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '취소상세 < %s',
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    MfOrderChangeView,
    Loading,
    MfPopupDeliveryPersonal,
    MfPopupReturnInfo,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    goOrdInfoPage() {
      this.$router.push(
        '/cs/mf/orddeliv/ord_deliv_dtl/' + this.ordCnclInfo.orgOrdId
      );
    },
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    goHome() {
      location.href = SiteUtils.marketformo('/');
    },
    goPageClaimList() {
      this.$router.push('/cs/claimmgnt/claim_statement_list');
    },
    setOrdItemOptPut() {
      const ordInfo = this.ordCnclInfo;
      if (ordInfo) {
        const bsktPutInputDto = {
          delivTypeCd: '03',
          ordTypeCd: '10',
        };
        const bsktPutDtoList = [];
        ordInfo.mfClaimDtlList.map(list => {
          const bsktItem = {}; // 선택된 상품정보
          if (list.chkYn) {
            // 2021.03.15 수량 하드코딩 1개
            bsktItem.bsktQty = 1;
            bsktItem.dspCtgId = list.dspCtgId;
            bsktItem.ssevntId = list.ssevntId;
            bsktItem.itemId = list.itemId;
            bsktItem.skuId = list.skuId;
            bsktPutDtoList.push(bsktItem);
          }
        });
        bsktPutInputDto.bsktPutDtoList = bsktPutDtoList;
        if (!bsktPutInputDto.bsktPutDtoList.length > 0) {
          this.$gsdialog.alert('선택된 상품이 없습니다.');
          return;
        }
        ApiUtils.post('/fo/od/mf/bsktmgnt/basket-item', {
          ...bsktPutInputDto,
        }).then(res => {
          if (!res.data.success) {
            this.$gsdialog.alert(
              '재고가 부족하여 장바구니에 담을 수 없습니다.'
            );
            return;
          } else {
            const odBsktUuid = CookieUtils.getOdBsktUuid();
            const bparams = {
              odBsktUuid: odBsktUuid,
            };
            this.$store.dispatch('getBsktQtyInfo', bparams);
            this.$gsdialog.alert('선택된 상품을 장바구니에 담았습니다.');
            return;
          }
        });
      }
    },
    async retrieveOrdCnclInfo() {
      this.loading = true;
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/mf/order-cancellation-detail', {
        ...params,
      })
        .then(res => {
          this.loading = false;
          if (res.data === null || !res.data.success) {
            return;
          }
          const resData = res.data.data;
          if (resData) {
            // 상품목록 list Set
            this.ordCnclInfo = resData;
            const tempObjData = {};
            tempObjData.amtSpNm = 'P';
            // 상품 목록중 주문상태 코드가 취소신청 인경우는 예약  else 확정
            if (
              resData.mfClaimDtlList.length > 0 &&
              resData.mfClaimDtlList.find(
                x =>
                  x.mfOrdStatCd ==
                    this.$store.state.cs.MF_ORD_STAT_CD_CNCL_ACEPT ||
                  x.mfOrdStatCd == this.$store.state.cs.MF_ORD_STAT_CD_CNCL_TDR
              )
            ) {
              // 환불예정금액
              this.refndAmtInfo.refndSchedAmt =
                resData.mfRefndAmtInfo.refndSchedAmt;
              // 상품예정금액
              this.refndAmtInfo.itemSchedAmt =
                resData.mfRefndAmtInfo.itemSchedAmt;
              // 혜택예정금액
              this.refndAmtInfo.beneSchedAmt =
                resData.mfRefndAmtInfo.beneSchedAmt;
              // 배송비예정금액
              this.refndAmtInfo.dlfeeSchedAmt =
                resData.mfRefndAmtInfo.dlfeeSchedAmt;
              // 환불결제수단 예정정보
              this.refndAmtInfo.mfRefndTdrMeansInfoSchedList =
                resData.mfRefndAmtInfo.mfRefndTdrMeansInfoSchedList;
              // 환불결제수단정보 정렬 추가
              const sortingField = 'indSeq';
              this.refndAmtInfo.mfRefndTdrMeansInfoSchedList.sort(function(
                a,
                b
              ) {
                return a[sortingField] - b[sortingField];
              });
              // 환불예약 & 확정 구분 값
              this.refndAmtInfo.refndAmtYn = false;
              // 포인트 회수 정보 info
              if (resData.mfRefndAmtInfo.pntSchedAmt > 0) {
                tempObjData.tdrMeansNm = 'GS&POINT 적립 회수';
                tempObjData.refndReqAmt = resData.mfRefndAmtInfo.pntSchedAmt;
                this.refndAmtInfo.mfRefndTdrMeansInfoSchedList.push(
                  tempObjData
                );
              }
            } else {
              // 환불금액
              this.refndAmtInfo.refndAmt = resData.mfRefndAmtInfo.refndAmt;
              // 상품금액
              this.refndAmtInfo.itemAmt = resData.mfRefndAmtInfo.itemAmt;
              // 혜택금액
              this.refndAmtInfo.beneAmt = resData.mfRefndAmtInfo.beneAmt;
              // 배송비금액
              this.refndAmtInfo.dlfeeAmt = resData.mfRefndAmtInfo.dlfeeAmt;
              // 환불결제수단정보
              this.refndAmtInfo.mfRefndTdrMeansInfoList =
                resData.mfRefndAmtInfo.mfRefndTdrMeansInfoList;
              // 환불예약 & 확정 구분 값
              this.refndAmtInfo.refndAmtYn = true;
              // 포인트 회수 정보 info
              if (resData.mfRefndAmtInfo.pntAmt > 0) {
                tempObjData.refndTdrMeansNm = 'GS&POINT 적립 회수';
                tempObjData.refndAmt = resData.mfRefndAmtInfo.pntAmt;
                this.refndAmtInfo.mfRefndTdrMeansInfoList.push(tempObjData);
              }
            }
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    async init() {
      await this.retrieveOrdCnclInfo();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
</style>
