<template>
  <div class="wrap-mypage wrap-cart public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="반품신청" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <section class="mypage">
        <!-- START : 신청 목록 -->
        <div class="wrapper tabcont_marketfor cancel">
          <section class="cart-category-product">
            <MfOrderReturnDetail
              v-for="ordRtnList in this.ordRtnAceptList.mfOrdMallList"
              :key="ordRtnList.mallId"
              :ordRtnInfo="ordRtnList"
              @refndEvent="retrieveOrdClaimAmtCalc"
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
        <!-- END : 상품회수지 -->
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
                  취소 상품 금액
                  <span class="price">
                    <strong>{{addTdrInfo.ordCnclAmt | currency}}</strong>원
                  </span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  쿠폰/할인 혜택
                  <span class="price red" v-if="this.addTdrInfo.claimPromAmt > 0">
                    <strong>- {{this.addTdrInfo.claimPromAmt | currency}}</strong>원
                  </span>
                  <span class="price red" v-else>
                    <strong>{{this.addTdrInfo.claimPromAmt | currency}}</strong>원
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
                    <strong>{{this.addTdrInfo.claimDlfeeSprc | currency}}원</strong>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="gray_guide__box">
            <ul class="list-info">
              <li>회수 후 상품의 상태에 따라 교환/반품 불가 및 추가금액이 부과될 수 있습니다.</li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <p class="txt-price">
              환불예정금액
              <span class="price">
                <strong>{{this.addTdrInfo.refndReqAmt | currency}}</strong>원
              </span>
            </p>
          </div>
          <div class="gray_guide__box" v-if="this.mfRefndTrdMeansInfoList.length > 0">
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
            <dl v-for="(list, index) in this.mfRefndTrdMeansInfoList" :key="index">
              <dt>{{list.tdrMeansNm}}</dt>
              <dd>{{list.refndReqAmt | currency}}{{list.amtSpNm}}</dd>
            </dl>
            <!-- <dl v-for="data in this.mfClaimPntInfoList" :key="data.ordExpnsTypeDtlCd">
              <dt>{{getCommText(data.ordExpnsTypeDtlCd, 'OD0014')}}</dt>
              <dd>{{(data.claimPntAmt) | currency}} {{(data.ordExpnsTypeDtlCd == '32')? '점' : 'P'}}</dd>
            </dl>-->
          </div>
        </section>
        <!-- END : 최종 결제금액 -->

        <!-- START : 하단 버튼 -->
        <section class="section btns">
          <div class="cart-all">
            <button type="button" class="btn-lg btn-bg lightgreen" @click="processOrdRtnAcept">반품 신청</button>
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
import Footer from '@/components/common/Footer'; // 헤더
import MfOrderReturnDetail from '@/views/cs/claimmgnt/MfOrderReturnDetail';
import PopupDeliveryList from '@/views/cs/orddeliv/PopupDlvpList'; // 팝업 - 배송지 목록
import MfPopupDeliveryPersonal from '@/views/cs/claimmgnt/MfPopupDeliveryPersonal'; // 팝업 - 배송비 안내
import MfPopupReturnInfo from '@/views/cs/claimmgnt/MfPopupReturnInfo'; // 팝업 - 배송비 안내

import Loading from '@/components/common/Loading';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';

export default {
  name: 'MfRequestReturn',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        // 팝업
        open: false,
        popupDeliveryPersonal: false,
        popupReturnInfo: false,
        popupDeliveryList: false,
      },
      commGrpCdCS0009List: [],
      commGrpCdOD0101List: [],
      commGrpCdOD0102List: [],
      commGrpCdAN0001List: [],
      commGrpCdOD0014List: [],
      loading: false,
      mfOMfOrdDlvpInfo: {},
      flexSelectd: null,
      delivMsgCnts: null,
      radioSelected: null,
      itemDlvrMethoDtlCnts: null,
      etcTxtLen: 0,
      ordRtnAceptList: [],
      ordId: this.$route.params.ordId,
      addTdrInfo: {
        ordCnclAmt: 0, // 취소상품금액
        claimDlfeeSprc: 0, // 배송비
        refndReqAmt: 0, // 환불예정금액
        claimPromAmt: 0, // 쿠폰/할인혜택
      },
      marketfor: 'Y',
      mfRefndTrdMeansInfoList: [],
      mfClaimPntInfoList: [],
    };
  },
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '반품신청 < %s',
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    MfOrderReturnDetail,
    Loading,
    PopupDeliveryList,
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
  },
  methods: {
    getCommText(commCd, type) {
      let data = '';
      if (commCd) {
        if (type == 'AN0001') {
          this.commGrpCdAN0001List.map(value => {
            if (commCd == value.commCd) {
              data = value.commCdNm;
            }
          });
        } else if (type == 'OD0014') {
          this.commGrpCdOD0014List.map(value => {
            if (commCd == value.commCd) {
              data = value.commCdNm + ' 적립 회수';
            }
          });
        }
        return data;
      }
    },
    getCheckedItemInfo() {
      // 선택 상품 정보 취합 함수
      const claimOrdRtnProdList = []; // 반품상품
      const claimDelivList = []; // 클레임배송목록
      let rtnItem = {}; // 반품상품정보
      this.ordRtnAceptList.mfOrdMallList.map(ordDtlValue => {
        ordDtlValue.mfOrdDtlList.map(ordValue => {
          if (ordValue.chkYn) {
            if (
              ordValue.ordClaimResnCd != null &&
              ordValue.ordClaimResnCd != ''
            ) {
              rtnItem = {};
              rtnItem.ordDtlSeqno = ordValue.ordDtlSeqno;
              rtnItem.ordClaimResnCd = ordValue.ordClaimResnCd;
              rtnItem.ordClaimReqCnts = ordValue.ordClaimReqCnts;
              rtnItem.rtnQty = ordValue.rtnQty;
              rtnItem.claimAttFileList = ordValue.claimAttFileList;
              rtnItem.attFileId = ordValue.attFileId;
              claimOrdRtnProdList.push(rtnItem);
            }
          }
        });
      });
      let claimDeliv = {};
      claimDeliv = this.mfOMfOrdDlvpInfo;
      if (this.mfOMfOrdDlvpInfo) {
        // claimDeliv.delivMsgCnts = this.delivMsgCnts; // 배송메세지내용
        claimDeliv.mfItemDlvrMethoCd = this.radioSelected; // 마켓포상품전달방법코드
        claimDeliv.mfItemDlvrMethoAddCd = this.flexSelectd; // 마켓포상품추가전달방법코드
        claimDeliv.itemDlvrMethoDtlCnts = this.itemDlvrMethoDtlCnts; // 상품전달방법상세내용
      }
      const params = {
        ordId: this.ordId,
        mfOrdClaimDtlDtoList: claimOrdRtnProdList,
        mfDlvpInfo: this.mfOMfOrdDlvpInfo,
      };
      return params;
    },
    // 주문반품 환불정보 조회
    retrieveOrdClaimAmtCalc() {
      const params = this.getCheckedItemInfo();
      this.addTdrInfo = {
        ordCnclAmt: 0,
        claimDlfeeSprc: 0,
        refndReqAmt: 0,
        claimPromAmt: 0,
      };
      if (params.mfOrdClaimDtlDtoList.length > 0) {
        this.loading = true;
        ApiUtils.post('/fo/cs/mf/return-amount-calculation', params)
          .then(res => {
            if (res.data === null || !res.data.success) {
              this.$gsdialog.alert(res.data.statusMessage);
              return;
            }
            const resData = res.data.data;
            if (resData) {
              // 반품 환불 정보(취소금액)
              if (resData.mfClaimDtlInfoList) {
                let ordCnclAmt = 0;
                let ordCnclItemSprcAmt = 0;
                resData.mfClaimDtlInfoList.map(value => {
                  ordCnclAmt += value.ordCnclItemSprc;
                  ordCnclItemSprcAmt +=
                    value.ordCnclItemSprc - value.ordCnclAmt;
                });
                this.addTdrInfo.ordCnclAmt = ordCnclAmt;
                this.addTdrInfo.claimPromAmt = ordCnclItemSprcAmt;
              }
              // 배송비
              // 2021.02.26 배송비 정리 (백엔드에서 계산해서 처리하기로 함)
              this.addTdrInfo.claimDlfeeSprc = resData.addDlfee;

              // 환불결제수단정보
              // 2021.03.04 환불결제수단정보 수정
              this.addTdrInfo.refndReqAmt = resData.refndSchedAmt;
              if (resData.mfRefndTdrMeansInfoList.length > 0) {
                this.mfRefndTrdMeansInfoList = resData.mfRefndTdrMeansInfoList;
                // 환불결제수단정보 정렬 추가
                const sortingField = 'indSeq';
                this.mfRefndTrdMeansInfoList.sort(function(a, b) {
                  return a[sortingField] - b[sortingField];
                });
              } else {
                this.mfRefndTrdMeansInfoList = [];
              }
              // 프로모션정보
              this.addTdrInfo.claimPromAmt =
                this.addTdrInfo.claimPromAmt + resData.beneGapAmt;
              // 포인트정보
              if (resData.mfClaimPntInfoList.length > 0) {
                const counts = resData.mfClaimPntInfoList.reduce(
                  (prev, curr) => {
                    const count = prev.get(curr.ordExpnsTypeDtlCd) || 0;
                    // 2021.02.22 포인트 회수 정보 GS point 적립 회수 경우 조건 추가
                    if (curr.ordExpnsTypeDtlCd == 31) {
                      prev.set(
                        curr.ordExpnsTypeDtlCd,
                        curr.orgPntAmt - curr.pntAmt + count
                      );
                    }
                    return prev;
                  },
                  new Map()
                );
                const reducedObjArr = [...counts].map(
                  ([ordExpnsTypeDtlCd, claimPntAmt]) => {
                    return { ordExpnsTypeDtlCd, claimPntAmt };
                  }
                );
                this.mfClaimPntInfoList = reducedObjArr;
              }
              // 포인트 회수 환불수단 push
              const tempObjData = {};
              tempObjData.tdrMeansNm = 'GS&POINT 적립 회수';
              tempObjData.amtSpNm = 'P';
              if (this.mfClaimPntInfoList.length > 0) {
                this.mfClaimPntInfoList.map(value => {
                  tempObjData.refndReqAmt = value.claimPntAmt;
                });
                this.mfRefndTrdMeansInfoList.push(tempObjData);
              }
            }
          })
          .catch(err => {
            console.error(err);
          })
          .finally(() => (this.loading = false));
      } else {
        // 값이 없을때 초기화 처리
        this.addTdrInfo.ordCnclAmt = 0;
        this.mfRefndTrdMeansInfoList = [];
      }
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupDeliveryListActive() {
      this.popupAction('popupDeliveryList');
    },
    setInit() {
      // this.delivMsgCnts = null;
      this.itemDlvrMethoDtlCnts = null;
    },
    chgDelivDlvp(paramObj) {
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
    },
    checkDlvpReqForm(info) {
      if (info.commCd == '01' || info.commCd == '02') {
        this.flexSelectd = '1';
        // this.delivMsgCnts = null;
        this.itemDlvrMethoDtlCnts = null;
      } else {
        // this.delivMsgCnts = null;
        this.itemDlvrMethoDtlCnts = null;
        this.flexSelectd = info.otherRefCd;
      }
      // this.getCheckedItemInfo();
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
      // this.getCheckedItemInfo();
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
    validatOrdRtnAcept() {
      let chkCnt = 0;
      let chkOrdClaimResnCdCnt = 0;
      let chkOrdClaimResnCntsCnt = 0;
      // let chkOrdClaimAttFileCnt = 0;
      let returnValue = true;
      const foucsOrdClaimResnCd = [];
      const foucsOrdClaimReqCnts = [];
      this.ordRtnAceptList.mfOrdMallList.map(ordDtlValue => {
        ordDtlValue.mfOrdDtlList.map((ordValue, index) => {
          if (ordValue.chkYn) {
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
        this.$gsdialog.alert('반품하실 상품을 선택해주세요.', { html: true });
        return (returnValue = false);
      }
      if (chkOrdClaimResnCdCnt > 0) {
        this.$gsdialog.alert('반품 사유를 선택해 주세요.', { html: true });
        if (foucsOrdClaimResnCd.length > 0) {
          this.$el.querySelector('#' + foucsOrdClaimResnCd[0]).focus();
          // foucsOrdClaimResnCd.splice(0);
        }
        return (returnValue = false);
      }
      if (chkOrdClaimResnCntsCnt > 0) {
        this.$gsdialog.alert('반품 사유를 작성해 주세요.', { html: true });
        if (foucsOrdClaimReqCnts.length > 0) {
          this.$el.querySelector('#' + foucsOrdClaimReqCnts[0]).focus();
          // foucsOrdClaimReqCnts.splice(0);
        }
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
      // 환불예정금액이 마이너스인경우 얼랏 노출
      if (this.addTdrInfo.refndReqAmt < 0) {
        this.$gsdialog.alert(
          '환불예정금액이 0원보다 작으므로 반품을 신청할 수 없습니다.',
          { html: true }
        );
        return (returnValue = false);
      }
      return returnValue;
    },
    moveElement(el) {
      const $el = document.querySelector('#' + el);
      if ($el != null) {
        $el.scrollIntoView(true);
        window.scrollBy(0, -150); // 상단 탭까지 이동
      }
    },
    async processOrdRtnAcept() {
      if (!this.validatOrdRtnAcept()) {
        return;
      }
      // 반품 신청 접수
      const strMsg = '반품신청 하시겠습니까?';
      const confirmFlag = await this.$gsdialog.confirm(strMsg, { html: true });
      if (confirmFlag) {
        // 추가 결제 없음
        this.saveOrdClaimAcept(); // 추가결제 없이 반품접수 신청 저장 처리
      }
    },
    async saveOrdClaimAcept() {
      this.loading = true;
      const params = this.getCheckedItemInfo();
      ApiUtils.post('/fo/cs/mf/return-accept-process', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            if (res.data.statusCode == '3000') {
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
          const ordInfo = res.data.data;
          this.$router.push(
            '/cs/mf/claimmgnt/ord_rtn_proc_sate_info/' + ordInfo.ordId
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
    async retrieveOrdItemInfo() {
      this.loading = true;
      const params = {
        ordId: this.ordId,
      };
      ApiUtils.get('/fo/cs/mf/return-list', {
        ...params,
      })
        .then(res => {
          if (res.data === null || res.data.data === null) {
            this.$gsdialog
              .alert(
                '해당 주문에 반품 신청할 수 있는 상품이 존재하지 않습니다.'
              )
              .then(() => {
                location.href = '/cs/orddeliv/ord_deliv_list';
              });
            return;
          }
          this.ordRtnAceptList = res.data.data;
        })
        .catch(err => {
          this.loading = false;
        })
        .finally(() => (this.loading = false));
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
    async init() {
      this.commGrpCdOD0101List = await this.commCdSearch('OD0101');
      this.commGrpCdOD0102List = await this.commCdSearch('OD0102');
      this.commGrpCdAN0001List = await this.commCdSearch('AN0001');
      /* this.commGrpCdOD0014List = await this.commCdSearch('OD0014'); */
      await this.retrieveOrdItemInfo();
      await this.retrievelistDeliveryInfoList();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  updated() {},
};
</script>
<style lang="scss">
</style>
