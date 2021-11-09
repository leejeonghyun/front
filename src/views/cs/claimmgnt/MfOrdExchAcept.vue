<template>
  <div class="wrap-mypage wrap-cart public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="교환신청" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <section class="mypage return-wrap">
        <!-- START : 신청 목록 -->
        <div class="wrapper tabcont_marketfor cancel">
          <section class="cart-category-product">
            <MfOrderExchDetail
              v-for="ordExchList in this.ordExcData.mfOrdMallList"
              :key="ordExchList.mallId"
              :orderExchItemInfo="ordExchList"
              @refndEvent="retrieveExchAddDlfee"
            />
          </section>
        </div>
        <!-- END : 신청 목록 -->
        <!-- START : 상품회수지 -->
        <section class="mypage block" v-if="this.mfOMfOrdDlvpInfo">
          <div class="total-payment order-payment">
            <div class="sub-title border">
              <h3>
                <span class="bg-line-brush">상품 회수지 정보</span>
              </h3>
            </div>

            <div class="delivery-management modify">
              <div class="title_box__flex">
                <h4>
                  {{this.mfOMfOrdDlvpInfo.adrsNm}}
                  <span
                    v-if="this.mfOMfOrdDlvpInfo.dlvpNm"
                  >[{{this.mfOMfOrdDlvpInfo.dlvpNm}}]</span>
                </h4>
                <a
                  href="javascript:void(0);"
                  class="btn-border address"
                  @click="popupDeliveryListActive()"
                >
                  <span>변경</span>
                </a>
              </div>
              <div class="delivery-list">
                <ul class="addr-list">
                  <li>
                    <div class="addr-txt">
                      <span class="code">{{this.mfOMfOrdDlvpInfo.adrsZipcd}}</span>
                      {{this.mfOMfOrdDlvpInfo.adrsBaseAddr}} {{this.mfOMfOrdDlvpInfo.adrsDtlAddr}}
                      <span
                        class="cell-num"
                      >{{this.mfOMfOrdDlvpInfo.adrsTelNo | phoneFomatter }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="delivery-management modify" v-if="this.mfOMfOrdDlvpInfo">
              <div class="title_box__flex">
                <h4>상품 회수 위치</h4>
              </div>
              <ul class="radio_list">
                <li v-for="commList in commGrpCdOD0101List" :key="commList.commCd">
                  <p class="inp-radio small">
                    <input
                      type="radio"
                      name="radio"
                      :id="'r'+commList.commCd"
                      :value="commList.commCd"
                      v-model="radioSelected"
                      @change="checkDlvpReqForm(commList)"
                    />
                    <label :for="'r'+commList.commCd">{{commList.commCdNm}}</label>
                  </p>
                </li>
                <li v-if="radioSelected == '99'">
                  <div class="input_direct">
                    <div class="inner-textarea">
                      <textarea
                        id="itemDlvrMethoDtlCnts"
                        name="itemDlvrMethoDtlCnts"
                        cols
                        rows
                        v-model="itemDlvrMethoDtlCnts"
                        placeholder="100자이내로 작성해주세요"
                        title="상품 수령 위치 입력"
                        :onkeyup="itemDlvrMethoDtlCntsChk()"
                        @blur="checkDlvpReqFormChk()"
                      ></textarea>
                      <div class="txt-byte">
                        <span class="hidden">현재 작성한 글자 수</span>
                        <em id>{{etcTxtLen}}</em>
                        <span>/</span>
                        <span class="hidden">최대 작성 글자 수</span>
                        <span>100</span>
                      </div>
                    </div>
                    <ul class="list-info">
                      <li>출입이 불가능할 경우 반송될 수 있으니 반드시 상품 수령 위치를 확인해 주십시오.</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div
              class="delivery-management modify"
              v-if="radioSelected == '01' || radioSelected == '02'"
            >
              <div class="title_box__flex">
                <h4>공동현관 출입방법</h4>
              </div>
              <ul class="list-info inner">
                <li>공통현관출입번호는 원활한 배송을 위해 계속 사용하도록 안전하게 저장/관리합니다.</li>
              </ul>
              <ul class="radio_list">
                <li v-for="list in commGrpCdOD0102List" :key="list.commCd">
                  <p class="inp-radio small">
                    <input
                      type="radio"
                      :id="'flex'+list.commCd"
                      :value="list.commCd"
                      v-model="flexSelectd"
                      @change="setInit"
                    />
                    <label :for="'flex'+list.commCd">{{list.commCdNm}}</label>
                  </p>
                  <div class="input_direct" v-if="list.commCd == 1 && flexSelectd == 1">
                    <input
                      type="text"
                      class="inp-txt"
                      placeholder="예) #1234 호출버튼"
                      v-model="itemDlvrMethoDtlCnts"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <!-- END : 상품회수지  -->
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
                  배송비
                  <button
                    type="button"
                    class="btn-infomation"
                    aria-label="배송비 안내 팝업 활성화"
                    aria-haspopup="dialog"
                    @click="popupAction('popupDeliveryPersonal')"
                  />
                  <span class="price">
                    <strong>{{addTdrInfo.dlfeeAmt | currency}}</strong>원
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <p class="txt-price">
              추가결제금액
              <span class="price">
                <strong>{{addTdrInfo.addTdrTotAmt | currency}}</strong>원
              </span>
            </p>
          </div>
          <div class="gray_guide__box">
            <ul class="list-info">
              <li>회수 후 상품의 상태에 따라 교환/반품 불가 및 추가금액이 부과될 수 있습니다.</li>
            </ul>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 결제수단 -->
        <MfClaimAddPayment
          v-if="this.addTdrInfo != null && this.addTdrInfo.addTdrTotAmt > 0"
          ref="mdClaimAddTdr"
          :ordId="this.ordId"
          :addTdrInfo="addTdrInfo"
          :addPaymentYn="true"
          @saveOrdClaimAcept="saveOrdClaimAcept"
        />
        <!-- END : 결제수단 -->
        <!-- START : 하단 버튼 -->
        <section class="section btns">
          <div class="cart-all">
            <button
              type="button"
              class="btn-lg btn-bg lightgreen"
              @click="processOrdExchAcept"
            >교환 신청</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->
        <!-- START : 푸터 -->
        <Footer />
        <!-- END : 푸터 -->
        <!-- 팝업 - 배송비 안내 -->
        <MfPopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" />
        <PopupDeliveryList
          @popupEvent="popupAction"
          :ordDelivInfo="this.mfOMfOrdDlvpInfo"
          :marketfor="this.marketfor"
          @chgDelivDlvp="chgDelivDlvp"
          v-if="this.popup.popupDeliveryList"
        />
      </section>
    </main>
    <Loading v-show="loading" />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import MfClaimAddPayment from '@/views/cs/claimmgnt/MfClaimAddPayment'; // 클레임 추가 결제 모듈
import Footer from '@/components/common/Footer'; // 헤더
import MfOrderExchDetail from '@/views/cs/claimmgnt/MfOrderExchDetail';
import PopupDeliveryList from '@/views/cs/orddeliv/PopupDlvpList'; // 팝업 - 배송지 목록
import MfPopupDeliveryPersonal from '@/views/cs/claimmgnt/MfPopupDeliveryPersonal'; // 팝업 - 배송비 안내
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Loading from '@/components/common/Loading';

import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';

export default {
  name: 'MfRequestChange',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      isListTab: 0,
      showBill: true,
      defaultBillType: 'personal',
      tab: {
        tabCard: true,
        tabPoin: false,
        tabAccount: false,
      },
      popup: {
        // 팝업
        open: false,
        popupDeliveryPersonal: false,
        popupCardList: false, // 신용카드 선택
        popupDeliveryList: false,
      },
      loading: false,
      commGrpCdOD0101List: [],
      commGrpCdOD0102List: [],
      mfOMfOrdDlvpInfo: {},
      flexSelectd: null,
      delivMsgCnts: null,
      itemDlvrMethoDtlCnts: null,
      radioSelected: null,
      etcTxtLen: 0,
      ordExchAceptList: [],
      ordId: this.$route.params.ordId, // 주문ID
      ordExcData: [],
      addTdrInfo: {
        dlfeeAmt: 0, // 배송비
        addTdrTotAmt: 0, // 추가결제금액
      }, // 추가결제정보
      exchDlfeeList: [],
      marketfor: 'Y',
      mfDlvpInfo: {},
    };
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '교환신청 < %s',
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader,
    MfOrderExchDetail,
    Footer,
    Loading,
    PopupDeliveryList,
    MfPopupDeliveryPersonal,
    MfClaimAddPayment,
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
  },
  methods: {
    // 결제정보 tab
    tabAction(type) {
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupCardList() {
      this.popupAction('popupCardList');
    },
    listTabActive(el) {
      const list = document.querySelectorAll('.payment-list li');
      this.isListTab = el;
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
      }
      list[this.isListTab].classList.add('active');
      this.$refs.tabContents.focus();
    },
    // 현금영수증 타입 변경
    selectBillType(event) {
      const $this = event.target;
      this.defaultBillType = $this.value;
    },
    popupDeliveryListActive() {
      this.popupAction('popupDeliveryList');
    },
    setInit() {
      this.itemDlvrMethoDtlCnts = null;
    },
    chgDelivDlvp(paramObj) {
      // 통합커머스 배송지 정보 -> 마켓포 배송지 정보 매핑 Set
      this.mfOMfOrdDlvpInfo.adrsBaseAddr = paramObj.lotnoBaseAddr;
      this.mfOMfOrdDlvpInfo.adrsDtlAddr = paramObj.lotnoDtlAddr;
      this.mfOMfOrdDlvpInfo.adrsNm = paramObj.adrsNm;
      this.mfOMfOrdDlvpInfo.adrsStnmBaseAddr = paramObj.stnmBaseAddr;
      this.mfOMfOrdDlvpInfo.adrsStnmDtlAddr = paramObj.stnmDtlAddr;
      this.mfOMfOrdDlvpInfo.adrsTelNo = paramObj.moblTelNo;
      this.mfOMfOrdDlvpInfo.adrsTelRlfNo = null; // 안심번호는 없음
      this.mfOMfOrdDlvpInfo.adrsZipcd = paramObj.zipcd;
      this.mfOMfOrdDlvpInfo.delivTypeCd = '03';
      this.mfOMfOrdDlvpInfo.dlvpNm = paramObj.dlvpNm;
      this.mfOMfOrdDlvpInfo.encAdrsBaseAddr = paramObj.encLotnoBaseAddr;
      this.mfOMfOrdDlvpInfo.encAdrsDtlAddr = paramObj.encLotnoDtlAddr;
      this.mfOMfOrdDlvpInfo.encAdrsNm = paramObj.encAdrsNm;
      this.mfOMfOrdDlvpInfo.encAdrsStnmBaseAddr = paramObj.encStnmBaseAddr;
      this.mfOMfOrdDlvpInfo.encAdrsStnmDtlAddr = paramObj.encStnmDtlAddr;
      this.mfOMfOrdDlvpInfo.encAdrsTelNo = paramObj.encMoblTelNo;
      this.mfOMfOrdDlvpInfo.ordRtnSpCd = '2';
    },
    checkDlvpReqForm(info) {
      if (info.commCd == '01' || info.commCd == '02') {
        this.flexSelectd = '1';
        this.itemDlvrMethoDtlCnts = null;
      } else {
        this.itemDlvrMethoDtlCnts = null;
        this.flexSelectd = info.otherRefCd;
      }
    },
    checkDlvpReqFormChk() {
      if (this.itemDlvrMethoDtlCnts) {
        const len = this.itemDlvrMethoDtlCnts.length;
        if (len > 100) {
          const strTitle = this.itemDlvrMethoDtlCnts.substring(0, 100);
          this.itemDlvrMethoDtlCnts = strTitle;
          return;
        }
      }
    },
    itemDlvrMethoDtlCntsChk() {
      if (this.itemDlvrMethoDtlCnts) {
        const cntsLen = this.itemDlvrMethoDtlCnts.length;
        if (cntsLen <= 100) {
          this.etcTxtLen = cntsLen;
        } else {
          this.alertMessage();
          return;
        }
      }
    },
    alertMessage() {
      this.$gsdialog.alert('최대 100글자 까지 가능합니다.').then(dialog => {});
    },
    validatOrdExchAcept() {
      let chkCnt = 0;
      let chkOrdClaimResnCdCnt = 0;
      let chkOrdClaimResnCntsCnt = 0;
      // let chkOrdClaimAttFileCnt = 0;
      let returnValue = true;
      const foucsOrdClaimResnCd = [];
      const foucsOrdClaimReqCnts = [];
      const foucsOrdClaimItemNm = [];
      this.ordExcData.mfOrdMallList.map(ordDtlValue => {
        ordDtlValue.mfOrdDtlList.map((ordValue, index) => {
          if (ordValue.chkYn) {
            console.log(ordValue);
            chkCnt++;
            if (StringUtils.isEmpty(ordValue.ordClaimResnCd)) {
              foucsOrdClaimResnCd.push(
                'returnSelect_' + ordDtlValue.mallId + '_' + index
              );
              chkOrdClaimResnCdCnt++;
              return;
            }
            if (StringUtils.isEmpty(ordValue.ordClaimReqCnts)) {
              if (ordValue.selectOtherRefCd == 2) {
                foucsOrdClaimReqCnts.push(
                  'ordClaimReqCnts' + ordDtlValue.mallId + '_' + index
                );
                chkOrdClaimResnCntsCnt++;
                return;
              }
            }
            if (ordValue.skuId == '') {
              if (ordValue.selectOtherRefCd == 1) {
                foucsOrdClaimItemNm.push({
                  foucsId:
                    'exchStockSelect_' + ordDtlValue.mallId + '_' + index,
                  itemNm: ordValue.itemNm,
                });
                return;
              }
            }
            /* if (ordValue.selectOtherRefCd == 2) {
              if (ordValue.claimAttFileList.length == 0) {
                chkOrdClaimAttFileCnt++;
                return;
              }
            } */
          }
        });
      });

      if (chkCnt == 0) {
        this.$gsdialog.alert('교환하실 상품을 선택해주세요.', { html: true });
        return (returnValue = false);
      }
      if (foucsOrdClaimItemNm.length > 0) {
        this.$gsdialog.alert(
          foucsOrdClaimItemNm[0].itemNm + ' 옵션을 선택해주세요.'
        );
        this.$el.querySelector('#' + foucsOrdClaimItemNm[0].foucsId).focus();
        return (returnValue = false);
      }

      if (foucsOrdClaimResnCd.length > 0) {
        this.$gsdialog.alert('교환 사유를 선택해 주세요.', { html: true });
        this.$el.querySelector('#' + foucsOrdClaimResnCd[0]).focus();
        // foucsOrdClaimResnCd.splice(0);
        return (returnValue = false);
      }
      if (foucsOrdClaimReqCnts.length > 0) {
        this.$gsdialog.alert('교환 사유를 작성해 주세요.', { html: true });
        this.$el.querySelector('#' + foucsOrdClaimReqCnts[0]).focus();
        // foucsOrdClaimReqCnts.splice(0);
        return (returnValue = false);
      }
      // 이미지 체크
      /* if (chkOrdClaimAttFileCnt > 0) {
        this.$gsdialog.alert('이미지를 등록해 주세요.', { html: true });
        return (returnValue = false);
      } */
      // 상품 회수지 정보 체크
      if (this.radioSelected == 1 || this.radioSelected == 2) {
        if (this.flexSelectd == 1) {
          if (StringUtils.isEmpty(this.itemDlvrMethoDtlCnts)) {
            this.$gsdialog.alert('공동현관출입번호를 입력해주세요.', {
              html: true,
            });
            return (returnValue = false);
          }
        }
      } else if (this.radioSelected == 99) {
        if (StringUtils.isEmpty(this.itemDlvrMethoDtlCnts)) {
          this.$gsdialog.alert('상품 회수 위치를 입력해주세요.', {
            html: true,
          });
          return (returnValue = false);
        }
      }
      return returnValue;
    },
    async processOrdExchAcept() {
      // 교환신청 접수
      if (!this.validatOrdExchAcept()) {
        return;
      }
      const confirmFlag = await this.$gsdialog.confirm(
        '교환 신청 접수를 하시겠습니까?',
        { html: true }
      );
      if (confirmFlag) {
        if (this.addTdrInfo.addTdrTotAmt > 0) {
          // 추가 결제 필요
          this.$refs.mdClaimAddTdr.sendPayAuth(); // 추가결제 인증 함수 호출
        } else {
          this.saveOrdClaimAcept(null, null, null);
        }
      }
    },
    // 사용안함 (getParameter() -> 처리함.)
    getCheckedItemInfo() {
      // 사용안함 (getParameter() -> 처리함.)
      // 선택 상품 정보 취합 함수
      const exchAceptItemList = []; // 주문교환상품
      let exhItem = {}; // 교환상품정보
      this.ordExcData.mfOrdMallList.map(ordDtlValue => {
        ordDtlValue.mfOrdDtlList.map(ordValue => {
          if (ordValue.chkYn) {
            if (
              ordValue.ordClaimResnCd != null &&
              ordValue.ordClaimResnCd != ''
            ) {
              exhItem = {};
              exhItem.ordClaimResnCd = ordValue.ordClaimResnCd;
              exhItem.ordId = ordValue.ordId;
              exhItem.ordDtlSeqno = ordValue.ordDtlSeqno;
              exhItem.exchQty = ordValue.exchQty;
              exchAceptItemList.push(exhItem);
            }
          }
        });
      });
      return exchAceptItemList;
    },
    retrieveExchAddDlfee() {
      const params = {
        ordId: this.ordId,
        mfOrdClaimDtlList: this.getParameter().mfOrdClaimDtlList,
      };
      this.addTdrInfo = {
        dlfeeId: null,
        dlfeeAmt: 0, // 배송비
        addTdrTotAmt: 0, // 추가결제금액
      }; // 추가결제정보 초기화
      if (params.mfOrdClaimDtlList.length > 0) {
        this.loading = true;
        ApiUtils.post('/fo/cs/mf/exchange-delivery-fee', { ...params })
          .then(res => {
            if (res.data === null || !res.data.success) {
              this.$gsdialog.alert(res.data.statusMessage);
              return;
            }
            const resData = res.data.data;
            if (resData) {
              this.exchDlfeeList = resData;
              resData.map(value => {
                if (value.dlfeeFreeYn == 'N') {
                  this.addTdrInfo.dlfeeFreeYn = value.dlfeeFreeYn;
                  this.addTdrInfo.dlfeeId = value.dlfeeId;
                  this.addTdrInfo.dlfeeAmt += value.exchDlfeeAmt;
                  this.addTdrInfo.addTdrTotAmt += value.exchDlfeeAmt;
                }
              });
            }
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => (this.loading = false));
      }
    },
    getParameter() {
      // 교환 신청 접수 Parameter 정보 Setting 함수
      const mfOrdClaimDtlDtoList = []; // 교환접수상품List
      const mfExchAceptExpnsList = []; // 교환접수비용List
      const mfExchAceptDlvp = {}; // 교환접수배송지Object
      let exchItem = {}; // 교환상품정보
      this.ordExcData.mfOrdMallList.map(ordDtlValue => {
        ordDtlValue.mfOrdDtlList.map(ordValue => {
          if (ordValue.chkYn) {
            // 2020.12.17 조건 추가
            if (
              ordValue.ordClaimResnCd != null &&
              ordValue.ordClaimResnCd != ''
            ) {
              exchItem = {};
              exchItem.ordId = ordValue.ordId;
              exchItem.ordDtlSeqno = ordValue.ordDtlSeqno;
              exchItem.ordClaimResnCd = ordValue.ordClaimResnCd;
              exchItem.ordClaimReqCnts = ordValue.ordClaimReqCnts;
              exchItem.exchQty = ordValue.exchQty;
              exchItem.claimAttFileList = ordValue.claimAttFileList;
              exchItem.attFileId = ordValue.attFileId;
              exchItem.exchSkuId = ordValue.skuId;
              mfOrdClaimDtlDtoList.push(exchItem);
            }
          }
        });
      });
      // 교환신청 상품 회수지 정보
      let mfRetpDeliv = {};
      if (this.mfOMfOrdDlvpInfo) {
        mfRetpDeliv = this.mfOMfOrdDlvpInfo;
        mfRetpDeliv.mfItemDlvrMethoCd = this.radioSelected; // 마켓포상품전달방법코드
        mfRetpDeliv.mfItemDlvrMethoAddCd = this.flexSelectd; // 마켓포상품추가전달방법코드
        mfRetpDeliv.itemDlvrMethoDtlCnts = this.itemDlvrMethoDtlCnts; // 상품전달방법상세내용
      }
      return {
        ordId: this.ordId,
        mfOrdClaimDtlList: mfOrdClaimDtlDtoList,
        mfExchAceptExpnsList: this.exchDlfeeList,
        mfDlvpInfo: this.mfDlvpInfo, // 기존 배송지 정보
        mfRetpInfo: mfRetpDeliv,
      };
    },
    async saveOrdClaimAcept(iOrderRequest, cashRcpctInfo) {
      // 교환 접수 처리
      this.loading = true;
      const params = this.getParameter();
      params.payAuthInfo = iOrderRequest;
      ApiUtils.post('/fo/cs/mf/exchange-accept-process', { ...params })
        .then(res => {
          if (res.data === null || !res.data.success) {
            if (res.data.statusCode == '4000') {
              this.$gsdialog.alert(res.data.statusMessage).then(() => {
                this.$router.go();
                return;
              });
            } else {
              this.$gsdialog.alert(res.data.statusMessage);
              return;
            }
            return;
          }
          const ordId = res.data.data.ordId;
          this.$router.push(
            '/cs/mf/claimmgnt/ord_exch_proc_sate_info/' + ordId
          );
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
    // 공통코드 조회
    async commCdSearch(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      const result = await ApiUtils.get(
        '/fo/cm/commcdmgnt/common-codes',
        params
      );
      return result.data.data;
    },
    async retrievelistDeliveryInfoList() {
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.get('/fo/cs/mf/order-dlvp', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          this.mfOMfOrdDlvpInfo = res.data.data;
          // 기본배송 정보 Set
          this.mfDlvpInfo = { ...this.mfOMfOrdDlvpInfo };
          if (this.mfOMfOrdDlvpInfo != null) {
            this.mfOMfOrdDlvpInfo.delivTypeCd = '03';
            // 상품 수령 위치
            this.radioSelected = this.mfOMfOrdDlvpInfo.mfItemDlvrMethoCd;
            if (this.radioSelected == 99) {
              this.itemDlvrMethoDtlCnts = this.mfOMfOrdDlvpInfo.itemDlvrMethoDtlCnts;
            }
            this.flexSelectd = this.mfOMfOrdDlvpInfo.mfItemDlvrMethoAddCd;
            if (this.flexSelectd == 1 || this.flexSelectd == 2) {
              this.itemDlvrMethoDtlCnts = this.mfOMfOrdDlvpInfo.itemDlvrMethoDtlCnts;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    async retrieveOrdItemInfo() {
      this.loading = true;
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/mf/exchange-list', {
        ...params,
      })
        .then(res => {
          if (res.data === null || res.data.data === null) {
            this.$gsdialog
              .alert(
                '해당 주문에 교환 신청할 수 있는 상품이 존재하지 않습니다.'
              )
              .then(() => {
                location.href = '/cs/orddeliv/ord_deliv_list';
              });
            return;
          }
          this.ordExcData = res.data.data;
        })
        .catch(err => {
          this.loading = false;
        })
        .finally(() => (this.loading = false));
    },
    async init() {
      this.commGrpCdOD0101List = await this.commCdSearch('OD0101');
      this.commGrpCdOD0102List = await this.commCdSearch('OD0102');
      await this.retrieveOrdItemInfo();
      await this.retrievelistDeliveryInfoList();
    },
  },
  mounted() {
    this.init();
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
