<!--
views/od/SC-FO-OD-GS-MS-008
-->
<template>
  <div :class="[{'wrap-cart' : true}, siteClass]">
    <SubDefaultHeader headerText="선물하기" :tabbar="false"/>
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="gift-wrap">
        <!-- START : 주문자 -->
        <GiftSendInfo :mbrDlvp="mbrDlvp" :telCoNoList="telCoNoList" @giftOrdPsInfoEvent="giftOrdPsInfoEvent" readType="Y" v-model="giftSendInfo"/>
        <!-- END : 주문자 -->
        <!-- START : 받는분 -->
        <GiftReceiveInfo :telCoNoList="telCoNoList" :giftReceiveInfoList="giftReceiveInfoList" @giftRcptInfoEvent="giftRcptInfoEvent" readType="Y"/>
        <!-- END : 받는분 -->
        <!-- START : 선물 메시지 -->
        <GiftMessageWrite :selectType="selectType" @giftMsgInfoEvent="giftMsgInfoEvent" messageTitle="선물 메시지" />
        <div class="send-caution sub-inner-box">
          <p class="ico-alert2">문자(SMS)는 카드 이미지가 포함되지 않습니다.</p>
        </div>
        <!-- END : 선물 메시지 -->
        <!-- START : 상품정보 -->
        <section class="section-area">
          <div class="sub-title">
            <h2>상품정보</h2>
          </div>
          <div v-for="(delivType, index) in bsktInqRsltDto.delivTypeDtoList" v-bind:key="delivType.delivTypeCd" class="wrap-category-content" :id="delivTypeId(delivType.ordTypeCd, delivType.delivTypeCd)">
            <h3 class="sub-title2">
              <span class="inp-chk bg">
                <input type="checkbox" name="" :id="`${'category' + delivType.delivTypeCd}`" value="" v-model="delivType.chk" @click="setDelivTypeChk(index)">
                  <label :for="`${'category' + delivType.delivTypeCd}`">{{delivType.delivTypeNm}}배송({{getItemCnt(delivType.supplFirmDtoList)}})</label>
              </span>
            </h3>
            <GiftProductList @popupEvent="popupAction" :delivType="delivType" :index="index" @updateBskt="updateBskt" @deleteBskt="deleteBskt" @updateBsktKeepYn="updateBsktKeepYn" @setItemChk="setItemChk" @openCouponPopup="openCouponPopup" @openFreeGiftPopup="openFreeGiftPopup" :itemCmplRsltDtoList="delivType.itemCmplRsltDtoList" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd" />
          </div>
        </section>
        <!-- END : 상품정보 -->
        <!-- START : 상품가격 -->
        <section class="section-area">
          <GiftTotalPrice @popupEvent="popupAction" :bsktInqRsltDto="bsktInqRsltDto" :firstBuy="this.firstBuyInfo" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd"/> <!-- dummy 컴포넌트 / 기획&디자인확인용 -->
          <PopupDeliveryPrice @popupEvent="popupAction" v-if="this.popup.popupDeliveryPrice" /> <!-- 팝업 - 배송비 안내 -->
        </section>
        <!-- END : 상품가격 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area bg">
          <p class="ico-alert2">상기 금액은 주문 결제 단계에서 장바구니 쿠폰, 카드할인 등 할인 수단 적용 시 결제 금액이 달라질 수 있습니다.</p>
          <button type="button" class="btn-lg btn-bg lightgreen" v-on:click="goOrder()"><span>결제하기</span></button>
        </div>
        <!-- END :하단 버튼 -->
        <PopupDateSelect @popupEvent="popupAction" v-if="this.popup.popupDateSelect" :delivDt="delivDt" @selectDelivDt="selectDelivDt"/> <!-- 팝업 - 날짜변경 -->
        <PopupDiscountInfo @popupEvent="popupAction" v-if="this.popup.popupDiscountInfo" :bsktDiscountInfo="bsktDiscountInfo" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd"/> <!-- 팝업 - 할인 내역 -->
        <PopupEventProduct @popupEvent="popupAction" v-if="this.popup.popupEventProduct" :cmpl="cmpl" :pmbsJoinPrcnCd="bsktInqRsltDto.pmbsJoinPrcnCd" @putCmplItem="putCmplItem"/> <!-- 팝업 - 행사상품 담기 -->
        <PopupCouponChange @popupEvent="popupAction" v-if="this.popup.popupCouponList" :itemCpnList="itemCpnList" :dblDcCpnList="dblDcCpnList" :itemNm="itemNm" :bsktId="bsktId" @useCpn="useCpn" :applItemCpnList="bsktInqRsltDto.applItemCpnList" :applDblDcCpnList="bsktInqRsltDto.applDblDcCpnList" :itemDcSprc="itemDcSprc" :bsktQty="bsktQty" /> <!-- 팝업 - 쿠폰변경 -->
        <PopupGiftChangeSingle @popupEvent="popupAction" v-if="this.popup.popupGiftSingle" :bsktId="bsktId" :pres="pres" :promBeneZoneList="promBeneZoneList" @changeFrgf="changeFrgf"/> <!-- 팝업 - 사은품 단일선택 -->
        <PopupGiftChangeDouble @popupEvent="popupAction" v-if="this.popup.popupGiftDouble" :bsktId="bsktId" :pres="pres" :promBeneZoneList="promBeneZoneList" @changeFrgf="changeFrgf"/> <!-- 팝업 - 사은품 복수선택 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import GiftSendInfo from '@/components/cart/GiftSendInfo'; // 주문자
import GiftReceiveInfo from '@/components/cart/GiftReceiveInfo'; // 받는분
import GiftMessageWrite from '@/components/cart/GiftMessageWrite'; // 메세지 보내기
import PopupDiscountInfo from '@/views/od/PopupDiscountInfo'; // 팝업 - 할인 내역
import PopupCouponChange from '@/views/od/PopupCouponChange'; // 팝업 - 쿠폰변경
import PopupDeliveryPrice from '@/views/od/PopupDeliveryPrice'; // 팝업 - 배송비 안내
import PopupDateSelect from '@/views/od/PopupDateSelect'; // 팝업 - 날짜변경
import PopupEventProduct from '@/views/od/PopupEventProduct'; // 팝업 - 행사상품
import GiftProductList from '@/components/cart/GiftProductList';
import GiftTotalPrice from '@/components/cart/GiftTotalPrice';
import PopupGiftChangeSingle from '@/views/od/PopupGiftChangeSingle'; // 팝업 - 사은품 단일선택
import PopupGiftChangeDouble from '@/views/od/PopupGiftChangeDouble'; // 팝업 - 사은품 복수선택
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import ApiUtils from '@/common/ApiUtils';
import Basket from '@/common/od/Basket';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';
import GiftService from "@/services/GiftService";

export default {
  name: "GiftSend",
  data() {
    return {
        giftSendInfo: {
            name: '',
            mobileNo: '',
        },
        memberInfo: {},
      selectType: 'kakaotalk', // 메시지 보내기 타입
      popup: { // 팝업
        open: false,
        popupDiscountInfo: false,
        popupCouponList: false,
        popupDeliveryPrice: false,
        popupDateSelect: false,
        popupGiftSingle: false,
        popupGiftDouble: false,
        popupEventProduct: false,
      },
      giftGiveCart: [],
      bsktInqRsltDto: {},
      totItemCnt: 0,
      bsktDiscountInfo: {},
      mbrDlvp: {}, // 주문자정보
      mbrDlvpTemp: {},
      itemCpnList: {},
      dblDcCpnList: {},
      firstBuyInfo: 0,
      itemNm: '',
      bsktId: '',
      itemDcSprc: 0,
      bsktQty: 0,
      delivDt: '',
      timer: null,
      pres: {},
      promBeneZoneList: [],
      telCoNoList: [],
      maxBnftYn: 'Y',
      rcptDlvp: null, // 수취자정보
      giftMsgInfo: {
        giftMsgCnts: '',
        giftImgId: '',
        giftOrdSpCd: '',
      }, // 배송메세지 정보
      zipcd: '10537',
      cmpl: {},
      cmplDcAmt: 0,
      loginYn: LoginUtils.isLogin(),
      giftReceiveInfoList: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물하기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물하기',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    GiftSendInfo, // 주문자
    GiftReceiveInfo, // 받는분
    GiftMessageWrite, // 선물 메시지
    PopupDiscountInfo, // 팝업 - 할인 내역
    PopupCouponChange, // 팝업 - 쿠폰변경
    PopupDeliveryPrice, // 팝업 - 배송비 안내
    PopupDateSelect, // 팝업 - 날짜선택
    GiftTotalPrice,
    GiftProductList,
    PopupGiftChangeSingle,
    PopupGiftChangeDouble,
    PopupEventProduct,
  },
  methods: {
    openCmplItemPopup(cmpl, ordTypeCd, delivTypeCd) {
      this.popup['popupEventProduct'] = !this.popup['popupEventProduct'];
      this.popup.open = !this.popup.open;
      this.cmpl = cmpl;
      this.ordTypeCd = ordTypeCd;
      this.delivTypeCd = delivTypeCd;
    },
    popupAction(type, bskt) { // 팝업 활성/비활성
      if (type === "popupDiscountInfo") {
        this.bsktDiscountInfo = bskt;
      }
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    async getGiftReceiveInfo() { // 최근보낸사람
      const result = await ApiUtils.get('/fo/od/giftMgnt/gift-receive-info', null);
      if (result.data.data !== null && result.data.data.length > 0) {
        this.giftReceiveInfoList = result.data.data;
      }
    },
    async getBskt(inqType) {
      const bsktIds = [];
      let totItemCnt = 0;
      if (this.bsktInqRsltDto !== null && Object.entries(this.bsktInqRsltDto).length !== 0) {
        for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
          for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
            for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                bsktIds.push(this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId);
                totItemCnt++;
              }
            }
          }
        }
      }
      if (inqType === 'S') {
        this.maxBnftYn = 'Y';
      }
      const iBsktPut = {
        bsktIds: bsktIds,
        inqType: inqType,
        zipcd: this.zipcd, // TODO 해당 배송지코드 강서로 고정
        maxBnftYn: this.maxBnftYn,
      };
      this.bsktInqRsltDto = await GiftService.getGiftBasketItemInfo(iBsktPut);
      const totalItemCount = this.bsktInqRsltDto.delivTypeDtoList
          .map(each => each.supplFirmDtoList)
          .reduce((p, c) => p.concat(c), [])
          .map(each => each.bsktInqRsltDtoList)
          .reduce((p, c) => p.concat(c), [])
          .length;

      if (totalItemCount === 0) {
        await this.$gsdialog.alert(OrderMsg.giftSoldout);
        this.$router.push({name: 'theBasket'});
        return;
      }

      console.log("this.bsktInqRsltDto : ", this.bsktInqRsltDto);
      if (inqType === "S") {
        totItemCnt = this.bsktInqRsltDto.resvDelivCnt + this.bsktInqRsltDto.todayDelivCnt + this.bsktInqRsltDto.dawnDelivCnt + this.bsktInqRsltDto.dlvDelivCnt + this.bsktInqRsltDto.abrdDelivCnt;
      }
      this.bsktInqRsltDto.totItemCnt = totItemCnt;
    },
    // 배송유형 체크. 택배만 가능. 당일배송은 전국택배로 변환
    delivTypeId(ordTypeCd, delivTypeCd) {
      // console.log("ordTypeCd : ", ordTypeCd);
      // console.log("delivTypeCd : ", delivTypeCd);
      let delivTypeId = "";

      if (ordTypeCd === "10") {
        if ("02"=== delivTypeCd) {
          delivTypeId = "parcelDelivery"; // 전국택배
        } else if ("03"=== delivTypeCd) {
          delivTypeId = "parcelDelivery"; // 업체택배
        }
      }
      return delivTypeId;
    },
    setDelivTypeChk(idx) {
      let chkYn = true;
      if (this.bsktInqRsltDto.delivTypeDtoList[idx].chk) {
        chkYn = false;
      }

      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList.length; kdx++) {
          this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList[jdx].bsktInqRsltDtoList[kdx].chk = chkYn;
        }
      }
      this.getBskt("U");
    },
    getItemCnt(supplFirmDtoList) {
      let cnt = 0;
      for (let idx=0; idx<supplFirmDtoList.length; idx++) {
        for (let jdx=0; jdx<supplFirmDtoList[idx].bsktInqRsltDtoList.length; jdx++) {
          cnt++;
        }
      }
      return cnt;
    },
    async updateBskt(bskt) {
      const iBsktPut = {
        bsktId: bskt.bsktId,
        bsktQty: bskt.bsktQty,
        storId: bskt.storId,
        supplFirmCd: bskt.supplFirmCd
      };
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const $this = this;
      this.timer = setTimeout(async () => {
        const result = await ApiUtils.put('/fo/od/bsktmgnt/basket-item-quantity', iBsktPut);
        console.log(result);
        if (!result.data.success) {
          this.$gsdialog.alert(result.data.statusMessage);
        }
        $this.getBskt("U");
      }, 500);
    },
    async updateBsktKeepYn(bsktId, bsktKeepYn) {
      const iBsktPut = {
        bsktId: bsktId,
        bsktKeepYn: bsktKeepYn,
      };
      const result = await ApiUtils.put('/fo/od/bsktmgnt/basket-item-keep', iBsktPut);
      // console.log(result);
    },
    async openItemOptnPopup(bskt) {
      this.bsktId = bskt.bsktId;
      this.itemNm = bskt.itemNm;
      this.skuId = bskt.skuId;
      this.popup['popupOptionList'] = !this.popup['popupOptionList'];
      this.popup.open = !this.popup.open;
      const result = await ApiUtils.get('/fo/od/bsktmgnt/item-option', {itemId: bskt.itemId});
      this.itemOptnList = result.data.data;
    },
    // 사은품 선택 팝업
    openFreeGiftPopup(bsktId, pres, promBeneZoneList) {
      this.bsktId = bsktId;
      this.pres = pres;
      this.promBeneZoneList = promBeneZoneList;
      let type = 'popupGiftSingle';
      if (pres.presPrvdOptPosbQty > 1) {
        type = 'popupGiftDouble';
      }
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    setItemChk(chkYn, idx, bsktId) {
      const supplFirmDtoList = this.bsktInqRsltDto.delivTypeDtoList[idx].supplFirmDtoList;
      let trueCntDelivType = 0;
      const supplFirmDtoListLength = supplFirmDtoList.length;
      for (let i=0; i < supplFirmDtoListLength; i++) {
        let trueCnt = 0;
        const bsktInqRsltDtoLength = supplFirmDtoList[i].bsktInqRsltDtoList.length;
        for (let j=0; j < bsktInqRsltDtoLength; j++) {
          if (supplFirmDtoList[i].bsktInqRsltDtoList[j].bsktId === bsktId) {
            supplFirmDtoList[i].bsktInqRsltDtoList[j].chk = chkYn;
            // console.log(supplFirmDtoList[i].bsktInqRsltDtoList[j]);
            // console.log(bsktId);
          }
          if (supplFirmDtoList[i].bsktInqRsltDtoList[j].chk === true) {
            trueCnt ++;
          }
        }
        if (bsktInqRsltDtoLength === trueCnt) {
          trueCntDelivType ++;
        }
      }

      if (trueCntDelivType === supplFirmDtoListLength) {
        this.bsktInqRsltDto.delivTypeDtoList[idx].chk = true;
      }

      if (chkYn === false) {
        this.bsktInqRsltDto.delivTypeDtoList[idx].chk = chkYn;
      }
      this.getBskt("U");
    },
    // 쿠폰 변경 팝업 이벤트
    openCouponPopup(itemCpnList, dblDcCpnList, itemNm, bsktId, itemDcSprc, bsktQty) {
      this.itemCpnList = itemCpnList;
      this.dblDcCpnList = dblDcCpnList;
      this.itemNm = itemNm;
      this.bsktId = bsktId;
      this.itemDcSprc = itemDcSprc;
      this.bsktQty = bsktQty;
      this.popup['popupCouponList'] = !this.popup['popupCouponList'];
      this.popup.open = !this.popup.open;
    },
    // 쿠폰 사용
    useCpn(itemCpnInfo, dblDcCpnInfo, bsktId) {
      cpnUseLoop:
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === bsktId) {
              let cpnDcAmt = 0;
              const bskt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx];
              let prevCpnDcAmt = bskt.itemCpnDcAmt;
              for (let mdx=0; mdx<this.bsktInqRsltDto.applItemCpnList.length; mdx++) {
                if (this.bsktInqRsltDto.applItemCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                  this.bsktInqRsltDto.applItemCpnList.splice(mdx, 1);
                }
              }

              const $this = this;
              if (itemCpnInfo !== '') {
                const cpnInfo = itemCpnInfo.split(":");
                if (bskt.ordsItemCpnPromExpnsInqRsltList !== null) {
                  const applItemCpnList = this.bsktInqRsltDto.applItemCpnList;
                  bskt.ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                    if (cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]) {
                      for (let mdx=0; mdx<applItemCpnList.length; mdx++) {
                        if (cpn.cmmMbrNo === applItemCpnList[mdx].cmmMbrNo &&
                          cpn.promId === applItemCpnList[mdx].promId &&
                          cpn.cpnIsseSeqno === applItemCpnList[mdx].cpnIsseSeqno) {// 쿠폰이 쓰여진 다른 상품이 있으면 해제
                            $this.useCnclCpn('item', applItemCpnList[mdx].bsktId); // 실제 적용 쿠폰 삭제 및 금액 변경
                            break;
                        }
                      }

                      cpn.applYn = true;
                      cpnDcAmt = cpn.dcAmt;
                      const applItemCpn = {};
                      applItemCpn.bsktId = cpn.bsktId;
                      applItemCpn.promId = cpn.promId;
                      applItemCpn.cmmMbrNo = cpn.cmmMbrNo;
                      applItemCpn.cpnIsseSeqno = cpn.cpnIsseSeqno;
                      applItemCpn.dcAmt = cpn.dcAmt;
                      applItemCpn.itemNm = bskt.itemNm;
                      applItemCpnList.push(applItemCpn);
                    }
                  });
                }
              } else {
                if (bskt.ordsItemCpnPromExpnsInqRsltList !== null) {
                  bskt.ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                  });
                }
              }

              this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt = cpnDcAmt;
              if (bskt.chk) {
                this.bsktInqRsltDto.delivTypeDtoList[jdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.totItemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
              }

              cpnDcAmt = 0;
              prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt;
              for (let mdx=0; mdx<this.bsktInqRsltDto.applDblDcCpnList.length; mdx++) {
                if (this.bsktInqRsltDto.applDblDcCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                  this.bsktInqRsltDto.applDblDcCpnList.splice(mdx, 1);
                }
              }

              if (dblDcCpnInfo !== '') {
                const cpnInfo = dblDcCpnInfo.split(":");
                if (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                  const applDblDcCpnList = this.bsktInqRsltDto.applDblDcCpnList;
                  bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                    if (cpn.cmmMbrNo == cpnInfo[0] && cpn.promId == cpnInfo[1] && cpn.cpnIsseSeqno == cpnInfo[2]) { // 더블할인 쿠폰의 경우, 상품쿠폰 적용에 따라서 적용금액이 달라질 수 있기때문에 정률일 경우 재계산한다.
                      for (let mdx=0; mdx<applDblDcCpnList.length; mdx++) {
                        if (cpn.cmmMbrNo === applDblDcCpnList[mdx].cmmMbrNo &&
                          cpn.promId === applDblDcCpnList[mdx].promId &&
                          cpn.cpnIsseSeqno === applDblDcCpnList[mdx].cpnIsseSeqno) {// 쿠폰이 쓰여진 다른 상품이 있으면 해제
                            $this.useCnclCpn('dbl', applDblDcCpnList[mdx].bsktId); // 실제 적용 쿠폰 삭제 및 금액 변경
                            break;
                        }
                      }
                      cpn.applYn = true;
                      if (cpn.dcTypeCd === 'R') {
                        const itemDcSprc = (bskt.itemDcSprc * bskt.bsktQty) - bskt.itemCpnDcAmt;
                        const itemDcAmt = Math.floor(itemDcSprc / bskt.bsktQty / 10) * 10;
                        cpnDcAmt = Math.ceil(itemDcAmt * cpn.beneApplVal / 1000) * 10 * bskt.bsktQty;
                        if (cpn.maxDcAmt < cpnDcAmt) {
                          cpnDcAmt = cpn.maxDcAmt;
                        }
                      } else {
                        cpnDcAmt = cpn.dcAmt;
                      }
                      const applDblDcCpn = {};
                      applDblDcCpn.bsktId = cpn.bsktId;
                      applDblDcCpn.promId = cpn.promId;
                      applDblDcCpn.cmmMbrNo = cpn.cmmMbrNo;
                      applDblDcCpn.cpnIsseSeqno = cpn.cpnIsseSeqno;
                      applDblDcCpn.dcAmt = cpnDcAmt;
                      applDblDcCpn.itemNm = bskt.itemNm;
                      applDblDcCpnList.push(applDblDcCpn);
                    }
                  });
                } else {
                  if (bskt.ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                    bskt.ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                      cpn.applYn = false;
                    });
                  }
                }
              }

              this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt = cpnDcAmt;
              if (bskt.chk) {
                this.bsktInqRsltDto.delivTypeDtoList[jdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.totDblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
              }

              break cpnUseLoop;
            }
          }
        }
      }
    },
    // 쿠폰 사용 취소
    useCnclCpn(type, bsktId) {
      cpnUseLoop:
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === bsktId) {
              if (type === 'item') {
                const cpnDcAmt = 0;
                const prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt;
                for (let mdx=0; mdx<this.bsktInqRsltDto.applItemCpnList.length; mdx++) {
                  if (this.bsktInqRsltDto.applItemCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                    this.bsktInqRsltDto.applItemCpnList.splice(mdx, 1);
                  }
                }
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList !== null) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                  });
                }

                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].itemCpnDcAmt = cpnDcAmt;
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.totItemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].itemCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                }
              }

              if (type === 'dbl') {
                const cpnDcAmt = 0;
                const prevCpnDcAmt = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt;
                for (let mdx=0; mdx<this.bsktInqRsltDto.applDblDcCpnList.length; mdx++) {
                  if (this.bsktInqRsltDto.applDblDcCpnList[mdx].bsktId === bsktId) { // 상품에 쓰여진 쿠폰이 있으면 해제
                    this.bsktInqRsltDto.applDblDcCpnList.splice(mdx, 1);
                  }
                }

                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList !== null) {
                  const applDblDcCpnList = this.bsktInqRsltDto.applDblDcCpnList;
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList.forEach(function (cpn, idx) {
                    cpn.applYn = false;
                  });
                }

                this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].dblDcCpnDcAmt = cpnDcAmt;
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.totDblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                  this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].dblDcCpnDcAmt += (cpnDcAmt - prevCpnDcAmt);
                }
              }

              break cpnUseLoop;
            }
          }
        }
      }
    },
    // 사은품 변경
    changeFrgf(promBeneZoneList) {
      const frgfInfoList = [];
      for (let idx=0; idx<promBeneZoneList.promPresFrgfList.length; idx++) {
        if (promBeneZoneList.promPresFrgfList[idx].selYn === 'Y') {
          const frgfInfo = {};
          frgfInfo.bsktQty = promBeneZoneList.promPresFrgfList[idx].selQty;
          frgfInfo.promId = promBeneZoneList.promPresFrgfList[idx].promId;
          frgfInfo.promBeneSeqno = promBeneZoneList.promPresFrgfList[idx].promBeneSeqno;
          frgfInfo.promPresFrgfSeqno = promBeneZoneList.promPresFrgfList[idx].promPresFrgfSeqno;

          frgfInfoList.push(frgfInfo);
        }
      }
      Basket.putFrgf(this.bsktId, frgfInfoList);

      const bsktInqRsltDto = JSON.parse(JSON.stringify(this.bsktInqRsltDto));
      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId === this.bsktId) {
              for (let mdx=0; mdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList.length; mdx++) {
                if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promId === promBeneZoneList.promId) {
                  for (let ndx=0; ndx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList.length; ndx++) {
                    if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList[ndx].promBeneSeqno === promBeneZoneList.promBeneSeqno) {
                      bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].presList[mdx].promBeneZoneList[ndx] = promBeneZoneList;
                    }
                  }
                }
              }
            }
          }
        }
      }

      this.bsktInqRsltDto = bsktInqRsltDto;
    },
    // 주문자변경정보
    giftOrdPsInfoEvent(mbrDlvp) {
      this.mbrDlvp = mbrDlvp;
    },
    // 수취자정보 세팅
    giftRcptInfoEvent(rcptDlvp) {
      this.rcptDlvp = rcptDlvp;
      // console.log("this.rcptDlvp : ", this.rcptDlvp);
    },
    // 수취자정보 VALIDATION
    giftRcptInfoValidation() {
      let succ = true;
      const focusUi = document.getElementById('tabMobilePhone');
      if (this.rcptDlvp === null) {
        this.$gsdialog.alert(OrderMsg.editGift);
        succ = false;
      } else {
        if (this.rcptDlvp.rcptAdrsNm === null || this.rcptDlvp.rcptAdrsNm === '') {
          this.$gsdialog.alert(OrderMsg.editGiftNm);
          succ = false;
        }

        if (this.rcptDlvp.msgTmplSpCd === '3' && (this.rcptDlvp.rcptTelNo === null || this.rcptDlvp.rcptTelNo.length < 11)) {
          this.$gsdialog.alert(OrderMsg.editGiftTel);
          succ = false;
        }
      }
      if (succ == false) {
        focusUi.focus();
      }

      return succ;
    },
    giftMsgInfoValidation() {
      let succ = true;
      const focusUi = document.getElementById('giftMsgCnts');
      if (this.giftMsgInfo.giftMsgCnts === null || this.giftMsgInfo.giftMsgCnts === '') {
        this.$gsdialog.alert(OrderMsg.editGiftTxt);
        focusUi.focus();
        succ = false;
      }

      return succ;
    },
    // 선물메세지 세팅
    giftMsgInfoEvent(giftMsgInfo) {
      this.giftMsgInfo = giftMsgInfo;
      // console.log("this.giftMsgInfo : ", this.giftMsgInfo);
    },
    // 선물하기 주문서
    async goOrder() {
      console.log('this.bsktInqRsltDto.totItemCnt', this.bsktInqRsltDto.totItemCnt);
      if (this.bsktInqRsltDto.totItemCnt <= 0) {
        alert('상품을 하나 이상 선택해주세요.');
        return;
      }

      if (!this.giftRcptInfoValidation()) {
        return false;
      }

      if (!this.giftMsgInfoValidation()) {
        return false;
      }

      const goOrderPut = {};
      const bsktOptDlvpInfoList = [];
      const bsktOptDlvpInfo = {};
      const bsktOptDelivTypeGrpInfoList = [];
      let bsktOptDelivTypeGrpInfo = {};
      let bsktOptItemInfoList = [];
      let bsktOptItemInfo = {};
      let bsktOptItemCpnInfoList = [];
      let bsktOptDblDcCpnInfoList = [];
      let bsktOptItemCpnInfo = {};
      let bsktOptDblDcCpnInfo = {};
      // bsktOptDlvpInfo.mbrDlvpSeqno = 0;
      bsktOptDlvpInfo.mbrDlvpSeqno = this.mbrDlvp.mbrDlvpSeqno;

      for (let jdx=0; jdx<this.bsktInqRsltDto.delivTypeDtoList.length; jdx++) {
        bsktOptDelivTypeGrpInfo.ordTypeCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].ordTypeCd;
        bsktOptDelivTypeGrpInfo.delivTypeCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].delivTypeCd;
        for (let kdx=0; kdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList.length; kdx++) {
          for (let ldx=0; ldx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList.length; ldx++) {
            if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].chk) {
              bsktOptItemInfo.bsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].bsktId;
              bsktOptItemInfo.relatBsktId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].relatBsktId;
              bsktOptItemInfo.storId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].storId;
              bsktOptItemInfo.supplFirmCd = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].supplFirmCd;
              bsktOptItemInfo.delivPolcId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].delivPolcId;

              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList) {
                for (let mdx=0; mdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList.length; mdx++) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].applYn) {
                    bsktOptItemCpnInfo.promId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].promId;
                    bsktOptItemCpnInfo.cpnIsseSeqno = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsItemCpnPromExpnsInqRsltList[mdx].cpnIsseSeqno;
                  }
                  bsktOptItemCpnInfoList.push(bsktOptItemCpnInfo);
                  bsktOptItemCpnInfo = {};
                }
              }

              if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList) {
                for (let mdx=0; mdx<this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList.length; mdx++) {
                  if (this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].applYn) {
                    bsktOptDblDcCpnInfo.promId = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].promId;
                    bsktOptDblDcCpnInfo.cpnIsseSeqno = this.bsktInqRsltDto.delivTypeDtoList[jdx].supplFirmDtoList[kdx].bsktInqRsltDtoList[ldx].ordsDblDcCpnPromExpnsInqRsltDtoList[mdx].cpnIsseSeqno;
                  }
                  bsktOptDblDcCpnInfoList.push(bsktOptDblDcCpnInfo);
                  bsktOptDblDcCpnInfo = {};
                }
              }
              bsktOptItemInfo.bsktOptItemCpnInfoList = bsktOptItemCpnInfoList;
              bsktOptItemInfo.bsktOptDblDcCpnInfoList = bsktOptDblDcCpnInfoList;
              bsktOptItemInfoList.push(bsktOptItemInfo);
              bsktOptItemInfo = {};
              bsktOptItemCpnInfoList = [];
              bsktOptDblDcCpnInfoList = [];
            }
          }
        }

        bsktOptDelivTypeGrpInfo.bsktOptItemInfoList = bsktOptItemInfoList;

        if (bsktOptItemInfoList && bsktOptItemInfoList.length > 0) {
          bsktOptDelivTypeGrpInfoList.push(bsktOptDelivTypeGrpInfo);
        }

        bsktOptItemInfoList = [];
        bsktOptDelivTypeGrpInfo = {};
      }

      bsktOptDlvpInfo.bsktOptDelivTypeGrpInfoList = bsktOptDelivTypeGrpInfoList;
      bsktOptDlvpInfoList.push(bsktOptDlvpInfo);
      goOrderPut.bsktOptDlvpInfoList = bsktOptDlvpInfoList;
      // 선물주문관련 세팅
      this.giftMsgInfo.giftOrdSpCd = 'G';
      this.giftMsgInfo.giftTdrCmmMbrNm = this.giftSendInfo.name;
      this.giftMsgInfo.giftRcptCmmMbrNm = this.rcptDlvp.rcptAdrsNm;
      this.giftMsgInfo.giftTrpsTelNo = this.rcptDlvp.rcptTelNo;
      this.giftMsgInfo.giftTdrMbrTelNo = this.giftSendInfo.mobileNo;
      this.giftMsgInfo.msgTmplSpCd = this.rcptDlvp.msgTmplSpCd; // 메세지관련 구분 추가 20200803 유현석

      goOrderPut.giftMsgInfo = this.giftMsgInfo;
      console.log(goOrderPut);
      // return;
      const data = await GiftService.createGiftOrderSheet(goOrderPut);

      console.log('data', data);

      if (!data.ordId) {
        this.$gsdialog.alert(OrderMsg.giftOrderSheetCreateError);
        return;
      }

      this.$store.state.ordId = data.ordId;
      await this.$router.push({name: 'giftOrderSheet', params: {ordId: data.ordId}});
    },
    async deleteBskt(bsktId) {
      const bsktIds = [];

      bsktIds.push(bsktId);
      const iBsktPut = {
        bsktIds: bsktIds,
      };

      const result = await ApiUtils.delete('/fo/od/bsktmgnt/basket-item', iBsktPut);
      console.log(result);
      this.getBskt("U");
    },
    async selectDelivDt(selectDate) {
      const iBsktPut = {
        bsktId: this.bskt.bsktId,
        delivDt: selectDate
      };
      console.log(iBsktPut);
      const result = await ApiUtils.put('/fo/od/bsktmgnt/delivery-date', iBsktPut);

      if (result.data.success) {
        this.$gsdialog.alert('변경되었습니다.');
        this.bskt.delivDt = selectDate;
        this.popupAction('popupDateSelect');
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    async putCmplItem(bsktPutDtoList) {
      const result = await Basket.putMultiBskt(bsktPutDtoList, this.ordTypeCd, this.delivTypeCd, this.mbrDlvp.zipcd);
      // console.log(result);
      // this.getBskt('S');
      if (result.data.success) {
        this.$gsdialog.alert('상품이 장바구니에 담겼습니다.').then(dialog => {
          location.reload();
        });
      } else {
        this.$gsdialog.alert(result.data.statusMessage);
      }
    },
    async initGiftSendInfo() {
        this.giftSendInfo = {
            name: this.memberInfo.custNm,
            mobileNo: this.memberInfo.moblTelNo,
        };
    },
    async loadMemberInfo() {
        const resultMemInfo = await ApiUtils.get(
            '/fo/cu/mbrmgnt/member-information',
            null
        ); // 회원정보 가져오기
        // console.log('resultMemInfo', resultMemInfo);
        this.memberInfo = resultMemInfo.data.data;
    },
  },
  async mounted() {
    if (this.loginYn === true) {
      await this.loadMemberInfo();
      await this.initGiftSendInfo();

      this.$store.state.ordId = '';
      const result2 = await ApiUtils.get('/fo/od/bsktmgnt/base-delivery-area');
      this.mbrDlvp = result2.data.data;
      this.getBskt("S");
      // 최근 보낸사람
      this.getGiftReceiveInfo();
      // 휴대전화번호 공통코드 조회
      const params = {
        commGrpCd: 'CU0005',
      };
      const result = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params);
      this.telCoNoList = result.data.data;
    } else {
      this.$gsdialog.alert(OrderMsg.loginFail);
      this.$router.push({name: 'theBasket'});
    }
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
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
