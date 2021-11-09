<template>
  <div class="wrap-mypage wrap-cart public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="반품상세" />
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
              >{{this.ordRtnInfo.orgOrdId}}</a>
            </div>
            <dl>
              <dt>접수번호</dt>
              <dd>{{this.ordRtnInfo.ordId}}</dd>
              <dt class="order-date">접수일시</dt>
              <dd>{{this.ordRtnInfo.ordDttm}}</dd>
            </dl>
          </dl>
        </section>
        <!-- END : 주문자 -->
        <!-- 4월 수정 START : 체크박스 없는 예약배송 전체 수정 -->
        <!-- START : 예약 배송 -->
        <div class="wrapper tabcont_marketfor">
          <section class="cart-category-product">
            <MfOrderChangeView
              :ordInfo="ordRtnInfo"
              ordClaimSpCd="R"
              v-if="Object.keys(ordRtnInfo).length > 0"
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
        <!-- START : 상품 회수지 정보 -->
        <section class="mypage block" v-if="this.mfOMfOrdDlvpInfo">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">상품 회수지 정보</span>
              </h3>
            </div>
            <div class="wrap-breakdown">
              <ul class="wrap-info-list">
                <li>
                  <dl class="detail-breakdown">
                    <dt>받는 분</dt>
                    <dd>{{this.mfOMfOrdDlvpInfo.adrsNm}}</dd>
                    <dt>주소</dt>
                    <dd>
                      <span>{{this.mfOMfOrdDlvpInfo.adrsZipcd}}</span>
                      <span
                        v-if="this.mfOMfOrdDlvpInfo.adrsBaseAddr"
                      >{{this.mfOMfOrdDlvpInfo.adrsBaseAddr}} {{this.mfOMfOrdDlvpInfo.adrsDtlAddr}}</span>
                      <span
                        v-else
                      >{{this.mfOMfOrdDlvpInfo.adrsStnmBaseAddr}} {{this.mfOMfOrdDlvpInfo.adrsStnmDtlAddr}}</span>
                    </dd>
                    <dt>연락처</dt>
                    <dd>{{this.mfOMfOrdDlvpInfo.adrsTelNo | phoneFomatter}}</dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 상품 회수지 정보 -->
        <!-- START : 요청사항 -->
        <section class="mypage block" v-if="this.mfClaimDtlCustReqPont">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">요청사항</span>
              </h3>
            </div>
            <div class="wrap-breakdown">
              <ul class="wrap-info-list">
                <li>
                  <dl class="detail-breakdown">
                    <dt>방문예정</dt>
                    <dd>1~3일내로 고객님께 직접 방문합니다.</dd>
                    <dt>요청사항</dt>
                    <dd v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd">
                      <p
                        v-if="this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd =='01' || this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd == '02'"
                      >{{getCommText(this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd, 'OD0101')}}</p>
                      <section v-if="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd">
                        <p
                          class="info"
                          v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 1"
                        >공동현관출입번호: {{this.mfClaimDtlCustReqPont.itemDlvrMethoDtlCnts | itemDlvrMethoDtlCntsMask}}</p>
                        <p
                          class="info"
                          v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 2 || this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 3"
                        >{{getCommText(this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd, 'OD0102')}}</p>
                        <p
                          class="info"
                          v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 4"
                        >{{this.mfClaimDtlCustReqPont.itemDlvrMethoDtlCnts}}</p>
                      </section>
                      <section v-else>{{this.mfClaimDtlCustReqPont.itemDlvrMethoDtlCnts}}</section>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 요청사항 -->
        <!--  20201125 START : 최종 결제금액 수정  -->
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
            <button type="button" class="btn-md btn-bg darkgray" @click="goClaimList">취소/반품/교환 목록</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러가기</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->

        <!-- 팝업 - 배송비 안내 -->
        <MfPopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" />
        <!-- 팝업 - 환불수단 안내 -->
        <MfPopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" />
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
import MfPopupReturnInfo from '@/views/cs/claimmgnt/MfPopupReturnInfo'; // 팝업 - 배송비 안내

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'MfRtnDetailList',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        // 팝업
        open: false,
        popupDiscountInfo: false,
        popupMobileBill: false,
        popupDeliveryPrice: false,
        popupDeliveryPersonal: false,
        popupReturnInfo: false,
      },
      ordId: this.$route.params.ordId, // 주문ID
      ordRtnInfo: {},
      mfOMfOrdDlvpInfo: {},
      mfClaimDtlCustReqPont: {},
      commGrpCdOD0101List: [],
      commGrpCdOD0102List: [],
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
      /*       refndAmtInfo: {
        refndSchedAmt: 0,
        ordCnclAmt: 0,
        claimDlfeeSprc: 0,
        claimPromAmt: 0,
      }, */
      mfRefndTrdMeansInfoList: [],
      mfClaimPntInfoList: [],
      loading: false,
    };
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '반품상세 < %s',
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
    phoneFomatter: function(telNo) {
      let formatNum = '';
      if (telNo) {
        if (telNo.length == 11) {
          formatNum = telNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (telNo.length == 8) {
          formatNum = telNo.replace(/(\d{4})(\d{4})/, '$1-$2');
        } else {
          if (telNo.indexOf('02') == 0) {
            formatNum = telNo.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
          } else {
            formatNum = telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
          }
        }
      }
      return formatNum;
    },
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    itemDlvrMethoDtlCntsMask: function(value, maskStr = '*') {
      if (value != null) {
        return maskStr.repeat(value.length);
      }
    },
  },
  methods: {
    goOrdInfoPage() {
      this.$router.push(
        '/cs/mf/orddeliv/ord_deliv_dtl/' + this.ordRtnInfo.orgOrdId
      );
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    goClaimList() {
      this.$router.push('/cs/claimmgnt/claim_statement_list');
    },
    goHome() {
      location.href = SiteUtils.marketformo('/');
    },
    getCommText(mfItemDlvrMethoCd, commGrpCd) {
      let data = '';
      if (mfItemDlvrMethoCd) {
        if (commGrpCd == 'OD0101') {
          this.commGrpCdOD0101List
            .filter(x => x.commCd == mfItemDlvrMethoCd)
            .map(value => {
              data = value.commCdNm;
            });
        } else if (commGrpCd == 'OD0102') {
          this.commGrpCdOD0102List
            .filter(x => x.commCd == mfItemDlvrMethoCd)
            .map(value => {
              data = value.commCdNm;
            });
        }
        return data;
      }
    },
    setOrdItemOptPut() {
      const bsktPutInputDto = {
        delivTypeCd: '03',
        ordTypeCd: '10',
      };
      const bsktPutDtoList = [];
      const ordInfo = this.ordRtnInfo.mfClaimDtlList;
      ordInfo.map(ordValue => {
        const bsktItem = {}; // 선택된 상품정보
        if (ordValue.chkYn) {
          // 2021.03.15 수량 하드코딩 1개
          bsktItem.bsktQty = 1;
          bsktItem.dspCtgId = ordValue.dspCtgId;
          bsktItem.itemId = ordValue.itemId;
          bsktItem.skuId = ordValue.skuId;
          bsktItem.ssevntId = ordValue.ssevntId;
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
          this.$gsdialog.alert('재고가 부족하여 장바구니에 담을 수 없습니다.');
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
    },
    async retrieveOrdRntInfo() {
      this.loading = true;
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.get('/fo/cs/mf/return-detail', {
        ...params,
      })
        .then(res => {
          this.loading = false;
          if (res.data === null || !res.data.success) {
            return;
          }
          const resData = res.data.data;
          if (resData) {
            this.ordRtnInfo = resData;
            this.mfOMfOrdDlvpInfo = resData.mfClaimDtlDlvpList[0]; // 배송지 정보
            this.mfClaimDtlCustReqPont = resData.mfClaimDtlCustReqPont; // 요청사항

            const tempObjData = {};
            tempObjData.amtSpNm = 'P';
            if (
              resData.mfClaimDtlList.length > 0 &&
              resData.mfClaimDtlList.find(
                x =>
                  x.mfOrdStatCd ==
                    this.$store.state.cs.MF_ORD_STAT_CD_RTN_ACEPT ||
                  x.mfOrdStatCd ==
                    this.$store.state.cs.MF_ORD_STAT_CD_RTN_RET ||
                  x.mfOrdStatCd ==
                    this.$store.state.cs.MF_ORD_STAT_CD_RTN_RETFIN ||
                  x.mfOrdStatCd == this.$store.state.cs.MF_ORD_STAT_CD_RTN_TDR
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
            /* const refndAmtInfo = resData.mfRefndAmtInfo;
            if (refndAmtInfo) {
              // 환불예정금액
              this.refndAmtInfo.refndSchedAmt = refndAmtInfo.refndSchedAmt;
              // 상품예정금액
              this.refndAmtInfo.itemSchedAmt = refndAmtInfo.itemSchedAmt;
              // 혜택예정금액
              this.refndAmtInfo.beneSchedAmt = refndAmtInfo.beneSchedAmt;
              // 배송비예정금액
              this.refndAmtInfo.dlfeeSchedAmt = refndAmtInfo.dlfeeSchedAmt;
              // 환불결제수단 예정정보
              this.refndAmtInfo.mfRefndTdrMeansInfoSchedList =
                refndAmtInfo.mfRefndTdrMeansInfoSchedList;
              // 환불금액
              this.refndAmtInfo.refndAmt = refndAmtInfo.refndAmt;
              // 상품금액
              this.refndAmtInfo.itemAmt = refndAmtInfo.itemAmt;
              // 혜택금액
              this.refndAmtInfo.beneAmt = refndAmtInfo.beneAmt;
              // 배송비금액
              this.refndAmtInfo.dlfeeAmt = refndAmtInfo.dlfeeAmt;
              // 환불결제수단정보
              this.refndAmtInfo.mfRefndTdrMeansInfoList =
                refndAmtInfo.mfRefndTdrMeansInfoList;
            } */
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    async getCommGropCdList() {
      // 공통 코드 Set
      this.commGrpCdOD0101List = await this.$store.dispatch(
        'commCdSearch',
        'OD0101'
      );
      this.commGrpCdOD0102List = await this.$store.dispatch(
        'commCdSearch',
        'OD0102'
      );
    },
    async init() {
      await this.retrieveOrdRntInfo();
      await this.getCommGropCdList();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
</style>
