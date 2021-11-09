<template>
  <div class="wrap-mypage wrap-cart public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="주문상세" />
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
            <dt>주문 번호</dt>
            <dd>{{this.ordInfo.ordId}}</dd>
            <dt>주문 일자</dt>
            <dd>{{this.ordInfo.ordDttm}}</dd>
          </dl>
        </section>
        <!-- END : 주문자 -->
        <!-- 4월 수정 START : 체크박스 없는 예약배송 전체 수정 -->
        <!-- START : 예약 배송 -->
        <div class="wrapper tabcont_marketfor">
          <section class="cart-category-product">
            <MfOrderProductDetail
              v-for="ordermall in this.ordInfo.mfOrdMallList"
              :key="ordermall.mallId"
              :ordInfo="ordermall"
              @popupEvent="popupAction"
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
        <!-- START : 최종 결제금액 -->
        <section class="mypage block">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">결제정보</span>
              </h3>
            </div>
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                  총 상품금액
                  <span class="price">
                    <strong>{{this.mfTdrMeansInfo.ordAmt | currency}}</strong>원
                  </span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 할인금액
                  <span class="price red">
                    <strong>{{this.mfTdrMeansInfo.dcAmt + this.mfTdrMeansInfo.dlfeeCpnDcAmt | currency}}</strong>원
                  </span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 배송비
                  <button
                    type="button"
                    class="btn-infomation"
                    aria-label="배송비 안내 팝업 활성화"
                    aria-haspopup="dialog"
                    @click="popupAction('popupDeliveryPersonal')"
                  />
                  <span class="price">
                    <strong>{{this.mfTdrMeansInfo.dlfee + this.mfTdrMeansInfo.addDlfee | currency}}</strong>원
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <p class="txt-price">
              총 주문금액
              <span class="price">
                <strong>{{this.mfTdrMeansInfo.lastOrdAmt | currency}}</strong>원
              </span>
            </p>
          </div>
          <div class="gspointbox">
            <p>
              <em class="ico-gspoint"></em> 배송완료 후 예상 적립포인트(GS&amp;POINT)
            </p>
            <span class="point">{{this.mfTdrMeansInfo.gsPnt}} P</span>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->

        <section class="mypage block" v-if="this.mfTdrMeansList.length > 0">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">결제수단</span>
              </h3>
              <button
                type="button"
                class="btn-border address"
                aria-label="전자영수증 팝업활성화"
                aria-haspopup="dialog"
                @click="popupAction('popupMobileBill')"
              >
                <span>전자영수증</span>
              </button>
            </div>
            <ul class="accordion-payment">
              <li v-for="(info, index) in this.mfTdrMeansList" :key="index">
                <div class="tit-accordion">
                  {{info.lastTdrMeansNm}}
                  <span
                    class="price"
                  >{{info.lastTdrAmt | currency}} {{info.amtSpNm}}</span>
                </div>
              </li>
            </ul>
          </div>
          <MfPopupMobileBill @popupEvent="popupAction" v-if="this.popup.popupMobileBill" />
          <!-- 팝업 - 전자 영수증 -->
        </section>
        <!-- END : 결제수단 -->
        <!-- START : 결제변경이력 -->
        <section class="mypage block" v-if="this.mfTdrMeansHistGroupList.length > 1">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">결제변경이력</span>
              </h3>
            </div>
            <div class="wrap-breakdown">
              <div
                class="change-list"
                v-for="(groupList, index) in this.mfTdrMeansHistGroupList"
                :key="index"
              >
                <div class="date-line">
                  <strong class="date">{{groupList.tdrDt}}</strong>
                </div>
                <div class="amount-line">
                  <p class="amount-section">
                    <span
                      class="state"
                    >{{getOrdClaimSpCdText(groupList.ordClaimSpCd)}}{{groupList.tdrTypeNm}}</span>
                    <a
                      href="javascript:void(0);"
                      class="link-details"
                      v-if="groupList.ordClaimSpCd != 'O'"
                      @click="goOrdDtl(groupList)"
                    >상세내역</a>
                  </p>
                  <span
                    class="card"
                    v-for="(list, index) in groupList.mfTdrMeansHistList"
                    :key="index"
                  >
                    {{list.lastTdrMeansNm}}
                    <strong>{{list.dealAmt | currency}} {{list.amtSpNm}}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- 6월수정 END : 구조 변경 -->
        </section>

        <!-- START : 배송지 정보 -->
        <section class="mypage block" v-if="this.mfOMfOrdDlvpInfo">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">배송지 정보</span>
              </h3>
            </div>
            <div class="wrap-breakdown">
              <ul class="wrap-info-list">
                <li>
                  <div class="flex">
                    <p class="list-title">{{this.mfOMfOrdDlvpInfo.dlvpNm}}</p>
                  </div>
                  <dl class="detail-breakdown">
                    <dt>받는 분</dt>
                    <dd>{{this.mfOMfOrdDlvpInfo.adrsNm}}</dd>
                    <dt>주소</dt>
                    <dd
                      v-if="this.mfOMfOrdDlvpInfo.adrsBaseAddr"
                    >{{this.mfOMfOrdDlvpInfo.adrsBaseAddr}} {{this.mfOMfOrdDlvpInfo.adrsDtlAddr}}</dd>
                    <dd
                      v-else
                    >{{this.mfOMfOrdDlvpInfo.adrsStnmBaseAddr}} {{this.mfOMfOrdDlvpInfo.adrsStnmDtlAddr}}</dd>
                    <dt v-if="this.mfOMfOrdDlvpInfo.adrsTelNo">연락처</dt>
                    <dd
                      v-if="this.mfOMfOrdDlvpInfo.adrsTelNo"
                    >{{this.mfOMfOrdDlvpInfo.adrsTelNo | phoneFomatter}}</dd>
                  </dl>
                </li>
                <li v-if="Object.keys(this.mfDeliveryInfo).length > 0">
                  <div class="flex">
                    <p class="list-title">
                      더반찬
                      <em v-if="this.mfDeliveryInfo.delivTypeCd == '04'">[새벽배송]</em>
                    </p>
                    <p
                      class="delivery"
                      v-if="this.mfDeliveryInfo.delivDt"
                    >희망배송일 {{this.mfDeliveryInfo.delivDt}}</p>
                  </div>
                  <ul class="list-info">
                    <li
                      v-if="this.mfDeliveryInfo.delivTypeCd == '04'"
                    >배송지에 따라 밤 10시 ~ 희망배송 당일 새벽 7시 사이에 도착합니다.</li>
                    <li>배송은 희망배송일 도착을 원칙으로 하나 주문폭주, 천재지변, 택배사의 사정 등으로 인한 경우 배송이 지연될 수 있습니다.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 배송지 정보 -->

        <!-- START : 배송요청사항 -->
        <section class="mypage block" v-if="this.mfOMfOrdDlvpInfo">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">배송요청사항</span>
              </h3>
            </div>
            <div class="wrap-breakdown">
              <ul class="wrap-info-list">
                <li>
                  <dl class="detail-breakdown">
                    <dt>수령위치</dt>
                    <dd
                      v-if="this.mfOMfOrdDlvpInfo.mfItemDlvrMethoCd == '01' || this.mfOMfOrdDlvpInfo.mfItemDlvrMethoCd == '02'"
                    >
                      {{this.mfOMfOrdDlvpInfo.mfItemDlvrMethoNm}}
                      <br />
                      <span
                        v-if="this.mfOMfOrdDlvpInfo.mfItemDlvrMethoAddCd == 1"
                      >공동현관번호 : {{this.mfOMfOrdDlvpInfo.itemDlvrMethoDtlCnts | itemDlvrMethoDtlCntsMask}}</span>
                      <span v-else>{{this.mfOMfOrdDlvpInfo.mfItemDlvrMethoAddNm}}</span>
                    </dd>
                    <dd
                      v-else-if="this.mfOMfOrdDlvpInfo.mfItemDlvrMethoCd == '03'"
                    >{{this.mfOMfOrdDlvpInfo.mfItemDlvrMethoNm}}</dd>
                    <dd
                      v-else-if="this.mfOMfOrdDlvpInfo.mfItemDlvrMethoCd == '99'"
                    >{{this.mfOMfOrdDlvpInfo.itemDlvrMethoDtlCnts}}</dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 배송요청사항 -->

        <!-- START : 하단 버튼 -->
        <!-- 4월 수정 : class 변경 -->
        <section class="section btns">
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="toList">주문/배송조회 목록</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러가기</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->

        <!-- 팝업 - 배송비 안내 -->
        <MfPopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" />
        <!-- 팝업 - 할인 내역 -->
        <!-- <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupDiscountInfo" /> -->
        <Loading v-show="loading" />
        <!-- START : 푸터 -->
        <Footer />
        <!-- END : 푸터 -->
      </section>
    </main>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 헤더
import MfOrderProductDetail from '@/views/cs/orddeliv/MfOrderProductDetail';
import MfPopupMobileBill from '@/views/cs/recptmgnt/MfPopupMobileBill';
import MfPopupDeliveryPersonal from '@/views/cs/claimmgnt/MfPopupDeliveryPersonal'; // 팝업 - 배송비 안내

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import SiteUtils from '@/common/SiteUtils';
import Loading from '@/components/common/Loading';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import ApiUtils from '@/common/ApiUtils';
import ItemTemplete from '@/common/ItemTemplete';
import ArrayUtils from '@/common/ArrayUtils';
import StringUtils from '@/common/StringUtils';

export default {
  name: 'OrdDelivDtlMf',
  data() {
    return {
      ordId: this.$route.params.ordId, // 주문ID
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        // 팝업
        open: false,
        popupMobileBill: false,
        popupDeliveryPersonal: false,
      },
      loading: false,
      ordInfo: {},
      mfOMfOrdDlvpInfo: {},
      mfTdrMeansHistList: [],
      mfTdrMeansHistGroupList: [],
      mfTdrMeansList: [],
      mfTdrMeansInfo: {
        ordAmt: 0,
        dcAmt: 0,
        lastDlfee: 0,
        lastOrdAmt: 0,
        gsPnt: 0,
      },
      mfDeliveryInfo: {},
    };
  },
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '주문상세 < %s',
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    MfOrderProductDetail,
    MfPopupMobileBill,
    MfPopupDeliveryPersonal,
    Loading,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    itemDlvrMethoDtlCntsMask: function(value, maskStr = '*') {
      if (value != null) {
        return maskStr.repeat(value.length);
      }
    },
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
  },
  methods: {
    getOrdClaimSpCdText(ordClaimSpCd) {
      let ordClaimSpCdText = '';
      if (ordClaimSpCd) {
        switch (ordClaimSpCd) {
          case 'C':
            ordClaimSpCdText = '취소';
            break;
          case 'R':
            ordClaimSpCdText = '반품';
            break;
          case 'E':
            ordClaimSpCdText = '교환';
            break;
        }
      }
      return ordClaimSpCdText;
    },
    // 사용안함
    setDateFormat(date) {
      if (date) {
        const tempDate = DateUtils.format(date, 'YYYY.MM.DD');
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = '(' + week[new Date(tempDate).getDay()] + ')';
        return tempDate + dayOfWeek;
      }
    },
    // 선택 담기
    setOrdItemOptPut() {
      const bsktPutInputDto = {
        delivTypeCd: '03',
        ordTypeCd: '10',
      };
      const bsktPutDtoList = [];
      const ordInfo = this.ordInfo.mfOrdMallList;
      ordInfo.map(ordValue => {
        ordValue.mfDlfeeList.map((productList, index) => {
          productList.mfOrdDtlList.map(item => {
            const bsktItem = {}; // 선택된 상품정보
            if (item.orgDelivTypeChk) {
              bsktItem.bsktQty = 1;
              bsktItem.dspCtgId = item.dspCtgId;
              bsktItem.itemId = item.itemId;
              bsktItem.skuId = item.skuId;
              bsktItem.ssevntId = item.ssevntId;
              bsktPutDtoList.push(bsktItem);
            }
          });
        });
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
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    goOrdDtl(data) {
      if (data) {
        switch (data.ordClaimSpCd) {
          case 'C':
            // 취소상세
            location.href = '/cs/mf/claimmgnt/ord_cncl_dtl/' + data.ordId;
            break;
          case 'R':
            // 반품상세
            location.href = '/cs/mf/claimmgnt/ord_rtn_dtl/' + data.ordId;
            break;
          case 'E':
            // 교환상세
            location.href = '/cs/mf/claimmgnt/ord_exch_dtl/' + data.ordId;
            break;
        }
      }
    },
    toList() {
      this.$router.push('/cs/orddeliv/ord_deliv_list');
    },
    goHome() {
      location.href = SiteUtils.marketformo('/');
    },
    retrieveInfoBase() {
      const params = {
        ordId: this.ordId,
      };
      this.loading = true;
      ApiUtils.get('/fo/cs/mf/order-delivery-detail', { ...params })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          // 주문배송상세정보조회
          this.ordInfo = res.data.data;
          if (!this.ordInfo) {
            this.$gsdialog.alert('잘못된 주문정보 입니다.').then(() => {
              location.href = '/cs/orddeliv/ord_deliv_list';
            });
            return;
          }
          // 2021.02.08 더반찬 주문 여부
          if (this.ordInfo) {
            this.ordInfo.mfOrdMallList
              .filter(
                x => x.mallId == this.$store.state.cs.mallInfo.DP_MALL_302
              )
              .map(value => {
                // 더반찬 데이터 존재
                value.mfOrdDtlList.map((list, index) => {
                  if (index == 0) {
                    this.mfDeliveryInfo.delivDt = list.delivDt;
                    this.mfDeliveryInfo.delivTypeCd = list.delivTypeCd;
                  }
                });
              });
          }
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
    async retrieveInfoOther() {
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.get('/fo/cs/mf/order-tender-information', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          // 결제정보
          this.mfTdrMeansInfo = res.data.data;
          // 마켓포주문몰
          this.mfTdrMeansList = res.data.data.mfTdrMeansList;
          // 마켓포결제수단이력리스트
          this.mfTdrMeansHistList = res.data.data.mfTdrMeansHistList;

          const temp = [];
          this.mfTdrMeansHistList.forEach(e => {
            temp.push({
              tdrDt: e.tdrDt,
              ordId: e.ordId,
              ordDtlSeqno: e.ordDtlSeqno,
              ordClaimSpCd: e.ordClaimSpCd,
              tdrTypeNm: e.tdrTypeNm,
            });
          });

          this.mfTdrMeansHistGroupList = Array.from(
            new Set(temp.map(JSON.stringify))
          ).map(JSON.parse);

          this.mfTdrMeansHistGroupList.forEach(e => {
            e.mfTdrMeansHistList = this.mfTdrMeansHistList.filter(function(n) {
              return (
                n.tdrDt == e.tdrDt &&
                n.ordId == e.ordId &&
                n.ordDtlSeqno == e.ordDtlSeqno &&
                n.ordClaimSpCd == e.ordClaimSpCd &&
                n.tdrTypeNm == e.tdrTypeNm
              );
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    async retrievelistDeliveryInfoList() {
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/mf/order-dlvp', {
        ...params,
      })
        .then(res => {
          this.loading = false;
          if (res.data === null || !res.data.success) {
            return;
          }
          this.mfOMfOrdDlvpInfo = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    init() {
      // 주문배송상세정보조회(기본)
      this.retrieveInfoBase();
      // 주문배송상세정보조회(기타)
      this.retrieveInfoOther();
      // 주문배송지정보조회
      this.retrievelistDeliveryInfoList();
    },
  },
  mounted() {
    this.init();
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

<style>
</style>
