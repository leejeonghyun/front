<template>
  <div class="wrap-mypage wrap-cart public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="교환상세" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <section class="mypage">
        <!-- 6월수정 START : 페이지 제목 추가 -->
        <h2 class="hidden">교환 상세 내역</h2>
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
              >{{this.ordExchInfo.orgOrdId}}</a>
            </div>
            <dl>
              <dt>접수번호</dt>
              <dd>{{this.ordExchInfo.ordId}}</dd>
              <dt class="order-date">접수일시</dt>
              <dd>{{this.ordExchInfo.ordDttm}}</dd>
            </dl>
          </dl>
        </section>
        <!-- END : 주문자 -->
        <!-- 4월 수정 START : 체크박스 없는 예약배송 전체 수정 -->
        <!-- START : 예약 배송 -->
        {{this.ordExchInfo.mfOrdMallList}}
        <div class="wrapper tabcont_marketfor">
          <section class="cart-category-product">
            <MfOrderChangeView
              :ordInfo="ordExchInfo"
              ordClaimSpCd="E"
              v-if="Object.keys(ordExchInfo).length > 0"
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
        <!-- START :상품 회수지 정보 -->
        <section class="mypage block" v-if="this.itemRetpInfo">
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
                    <dt>신청자</dt>
                    <dd>{{this.itemRetpInfo.adrsNm}}</dd>
                    <dt>주소</dt>
                    <dd>{{this.itemRetpInfo.adrsStnmBaseAddr}} {{this.itemRetpInfo.adrsStnmDtlAddr}}</dd>
                    <dt>연락처</dt>
                    <dd>{{this.itemRetpInfo.adrsTelNo | phoneFomatter}}</dd>
                    <dt>요청사항</dt>
                    <dd v-show="this.itemRetpInfo.mfItemDlvrMethoCd">
                      <p
                        v-if="this.itemRetpInfo.mfItemDlvrMethoCd =='01' || this.itemRetpInfo.mfItemDlvrMethoCd == '02'"
                      >{{getCommText(this.itemRetpInfo.mfItemDlvrMethoCd, 'OD0101')}}</p>
                      <section v-if="this.itemRetpInfo.mfItemDlvrMethoAddCd">
                        <p
                          class="info"
                          v-show="this.itemRetpInfo.mfItemDlvrMethoAddCd == 1"
                        >공동현관출입번호: {{this.itemRetpInfo.itemDlvrMethoDtlCnts | itemDlvrMethoDtlCntsMask}}</p>
                        <p
                          class="info"
                          v-show="this.itemRetpInfo.mfItemDlvrMethoAddCd == 2 || this.itemRetpInfo.mfItemDlvrMethoAddCd == 3"
                        >{{getCommText(this.itemRetpInfo.mfItemDlvrMethoAddCd, 'OD0102')}}</p>
                        <p
                          class="info"
                          v-show="this.itemRetpInfo.mfItemDlvrMethoAddCd == 4"
                        >{{this.itemRetpInfo.itemDlvrMethoDtlCnts}}</p>
                      </section>
                      <section v-else>{{this.itemRetpInfo.itemDlvrMethoDtlCnts}}</section>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 상품 회수지 정보 -->
        <!-- START : 교환 배송지 정보 -->
        <section class="mypage block" v-if="this.exchDlvpInfo">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">교환 배송지 정보</span>
              </h3>
            </div>
            <div class="wrap-breakdown">
              <ul class="wrap-info-list">
                <li>
                  <dl class="detail-breakdown">
                    <dt>받는 분</dt>
                    <dd>{{this.exchDlvpInfo.adrsNm}}</dd>
                    <dt>주소</dt>
                    <dd>{{this.exchDlvpInfo.adrsStnmBaseAddr}} {{this.exchDlvpInfo.adrsStnmDtlAddr}}</dd>
                    <dt>연락처</dt>
                    <dd>{{this.exchDlvpInfo.adrsTelNo | phoneFomatter}}</dd>
                    <dt>요청사항</dt>
                    <dd v-show="this.exchDlvpInfo.mfItemDlvrMethoCd">
                      <p
                        v-if="this.exchDlvpInfo.mfItemDlvrMethoCd =='01' || this.exchDlvpInfo.mfItemDlvrMethoCd == '02'"
                      >{{getCommText(this.exchDlvpInfo.mfItemDlvrMethoCd, 'OD0101')}}</p>
                      <section v-if="this.exchDlvpInfo.mfItemDlvrMethoAddCd">
                        <p
                          class="info"
                          v-show="this.exchDlvpInfo.mfItemDlvrMethoAddCd == 1"
                        >공동현관출입번호: {{this.exchDlvpInfo.itemDlvrMethoDtlCnts | itemDlvrMethoDtlCntsMask}}</p>
                        <p
                          class="info"
                          v-show="this.exchDlvpInfo.mfItemDlvrMethoAddCd == 2 || this.exchDlvpInfo.mfItemDlvrMethoAddCd == 3"
                        >{{getCommText(this.exchDlvpInfo.mfItemDlvrMethoAddCd, 'OD0102')}}</p>
                        <p
                          class="info"
                          v-show="this.exchDlvpInfo.mfItemDlvrMethoAddCd == 4"
                        >{{this.exchDlvpInfo.itemDlvrMethoDtlCnts}}</p>
                      </section>
                      <section v-else>{{this.exchDlvpInfo.itemDlvrMethoDtlCnts}}</section>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 교환 배송지 정보 -->
        <!-- START : 최종 결제금액 -->
        <section class="mypage block">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">결제정보</span>
              </h3>
            </div>
            <div class="total-payment-subgrp">
              <div class="sub-title send-total-price">
                <p class="txt-price">
                  추가결제금액
                  <span class="price">
                    <strong>{{this.tdrAmt | currency}}</strong>원
                  </span>
                </p>
              </div>
              <ul class="accordion-payment">
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
                      <strong>{{this.claimDlfee | currency}}</strong>원
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->

        <section class="mypage block" v-if="this.mfClaimDtlTdrList.length > 0 ">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">결제수단</span>
              </h3>
            </div>
            <ul class="accordion-payment">
              <li v-for="(claimTdrList, index) in this.mfClaimDtlTdrList" :key="index">
                <div class="tit-accordion">
                  {{claimTdrList.tdrMeansNm}}
                  <span
                    class="price"
                  >{{claimTdrList.tdrAmt | currency}}{{claimTdrList.amtSpNm}}</span>
                </div>
              </li>
            </ul>
          </div>
          <MfPopupMobileBill @popupEvent="popupAction" v-if="this.popup.popupMobileBill" />
          <!-- 팝업 - 전자 영수증 -->
        </section>
        <!-- END : 결제수단 -->

        <!-- START : 하단 버튼 -->
        <!-- 4월 수정 : class 변경 -->
        <section class="section btns">
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="goClaimList">취소/반품/교환 목록</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러가기</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->

        <!-- 팝업 - 할인 내역 -->
        <!-- <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupDiscountInfo" /> -->
        <!-- 팝업 - 배송비 안내 -->
        <MfPopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" />
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
import MfPopupMobileBill from '@/views/cs/recptmgnt/MfPopupMobileBill';

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'OrderListDetailMF',
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
      },
      ordId: this.$route.params.ordId, // 주문ID
      ordExchInfo: {},
      mfOrdDlvpInfo: {},
      mfClaimDtlCustReqPont: {},
      commGrpCdOD0101List: [],
      commGrpCdOD0102List: [],
      mfClaimDtlTdrList: [],
      mfClaimDtlDlfeeList: [],
      itemRetpInfo: {}, // 상품 회수지 정보
      exchDlvpInfo: {}, // 교환 배송지 정보
      claimDlfee: 0, // 배송비
      tdrAmt: 0, // 추가결제금액
      loading: false,
    };
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '교환상세 < %s',
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    MfOrderChangeView,
    Loading,
    MfPopupDeliveryPersonal,
    MfPopupMobileBill,
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
        '/cs/mf/orddeliv/ord_deliv_dtl/' + this.ordExchInfo.orgOrdId
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
    setOrdItemOptPut() {
      const bsktPutInputDto = {
        delivTypeCd: '03',
        ordTypeCd: '10',
      };
      const bsktPutDtoList = [];
      const ordInfo = this.ordExchInfo.mfClaimDtlList;
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
    getCommText(commCd, commGrpCd) {
      let data = '';
      if (commCd) {
        if (commGrpCd == 'OD0101') {
          this.commGrpCdOD0101List
            .filter(x => x.commCd == commCd)
            .map(value => {
              data = value.commCdNm;
            });
        } else if (commGrpCd == 'OD0102') {
          this.commGrpCdOD0102List
            .filter(x => x.commCd == commCd)
            .map(value => {
              data = value.commCdNm;
            });
        }
        return data;
      }
    },
    async retrieveOrdExchInfo() {
      this.loading = true;
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/mf/exchange-detail', {
        ...params,
      })
        .then(res => {
          this.loading = false;
          if (res.data === null || !res.data.success) {
            return;
          }
          this.ordExchInfo = res.data.data;
          this.mfOrdDlvpInfo = this.ordExchInfo.mfClaimDtlDlvpList; // 배송지 정보
          // 2020.12.11  수정
          if (this.mfOrdDlvpInfo) {
            this.mfOrdDlvpInfo.map(value => {
              if (value.ordRtnSpCd == '2') {
                // 상품 회수지 정보
                this.itemRetpInfo = value;
              } else if (value.ordRtnSpCd == '1') {
                // 교환 배송지 정보
                this.exchDlvpInfo = value;
              }
            });
          }
          // this.mfClaimDtlCustReqPont = this.ordExchInfo.mfClaimDtlCustReqPont; // 요청사항
          this.mfClaimDtlTdrList = this.ordExchInfo.mfClaimDtlTdrList; // 클레임상세결제리스트
          if (this.mfClaimDtlTdrList) {
            // const tdrAmt = 0;
            this.mfClaimDtlTdrList.map(tdrValue => {
              this.tdrAmt += tdrValue.tdrAmt;
            });
          }
          this.mfClaimDtlDlfeeList = this.ordExchInfo.mfClaimDtlDlfeeList; // 클레임상세배송비리스트
          if (this.mfClaimDtlDlfeeList) {
            const claimDlfee = 0;
            this.mfClaimDtlDlfeeList.map(dlfeeValue => {
              this.claimDlfee += dlfeeValue.addAmt - dlfeeValue.dcAmt;
            });
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    async init() {
      await this.retrieveOrdExchInfo();
      this.commGrpCdOD0101List = await this.$store.dispatch(
        'commCdSearch',
        'OD0101'
      );
      this.commGrpCdOD0102List = await this.$store.dispatch(
        'commCdSearch',
        'OD0102'
      );
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
</style>
