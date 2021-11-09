<!--
views/od/SC-FO-OD-GS-MS-011
-->
<template>
  <div :class="[{'wrap' : true}, siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="선물받기" :tabbar="false" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="gift-wrap">
        <!-- START : 선물 메시지 -->
        <section class="section-area">
          <h2 class="hidden">선물 메시지</h2>
          <GiftMessageCard :giftMsgInfo="giftMsgInfo" />
        </section>
        <!-- END : 선물 메시지 -->
        <!-- START : 상품정보 -->
        <section class="section-area">
          <div class="sub-title">
            <h2>상품정보</h2>
          </div>
          <!-- <h3 class="sub-title2">택배배송(2)</h3> -->
          <!--  START : 제품목록 -->
          <div class="list-content">
            <ul class="cart-product-list selected-list">
              <GiftRcvProductList v-if="giftOrdItemList !== null" :giftOrdItemList="giftOrdItemList" />
            </ul>
          </div>
          <!--  END : 제품목록 -->
        </section>
        <!-- END : 상품정보 -->
        <div class="section-area border">
          <p class="txt-time-desc">
            <strong class="point">
              {{giftValidDayInfo.giftYear}}
              .{{giftValidDayInfo.giftMonth}}
              .{{giftValidDayInfo.giftDate}}
              ({{giftValidDayInfo.giftDay}})까지</strong> 배송정보를 입력하지 않으면 주문이 자동취소되어 선물을 받을 수 없습니다.</p>
        </div>
        <!-- START : 배송지 -->
        <GiftReceiveAddrWrite ref="addr" :giftMsgInfo="giftMsgInfo" @chkSafeNumber="chkSafeNumber"/>
        <!-- END : 배송지 -->
        <!-- START : 배송 시간 -->
        <!-- START : 택배배송 -->
        <GiftRcvDeliveryParcel v-if="dlvDelivInfor !== null" :dlvDelivInfor="dlvDelivInfor" @chkDelivSeqNo="chkDelivSeqNo"/> <!-- 수정 : 2020.02.10 셀렉트 삭제 -->
        <!-- END : 택배배송 -->
        <!-- END : 배송 시간 -->
        <!-- START : 상품 수령 위치 -->
        <DeliveryRequest v-if="ordsDelivGrpInfo !== null" :ordsDelivGrpInfo="ordsDelivGrpInfo" :ordsDlvpInfo="ordsDlvpInfo" @delivReqEvent="delivReqEvent"/> <!-- 수정 : 2020.02.12 상품수령 위치 옵션 변경 -->
        <!-- END : 상품 수령 위치 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area mt0">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="giftRcvDlvEvent()"><span>선물받기</span></button>
        </div>
        <!-- END :하단 버튼 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import GiftReceiveAddrWrite from '@/components/cart/GiftReceiveAddrWrite'; // 배송지
import GiftMessageCard from '@/components/cart/GiftMessageCard'; // 선물 메세지
import GiftRcvDeliveryParcel from '@/components/order/GiftRcvDeliveryParcel'; // 택배배송
import DeliveryRequest from '@/components/order/DeliveryRequest'; // 배송 요청사항 <!-- 수정 START : 2020.02.19 컴포넌트 변경 (주문결제와 동일하게 변경) -->
import GiftRcvProductList from '@/components/order/GiftRcvProductList'; // 상품 목록
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import LoginUtils from '@/common/LoginUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import CookieUtils from '@/common/CookieUtils';
import StringUtils from "@/common/StringUtils";

/* END : 실 사용 컴포넌트 */
export default {
  props: {
    ordId: String,
  },
  name: "GiftReceive",
  data() {
    return {
      giftTodayDttm: new Date(), // 선물받기 오늘일자
      giftValidDttm: null, // 선물받기 마감일자
      giftValidDayInfo: {
        giftYear: null,
        giftMonth: null,
        giftDate: null,
        giftDay: null,
        giftHours: null,
        giftMinutes: null,
      },
      dlvDelivInfor: null, // 택배배송안내
      ordsDlvpInfo: {}, // 배송지정보
      giftMsgInfo: null, // 선물메세지
      rcptDlvp: {}, // 수취자정보
      addressInfo: null, // 수취인 수취장소 정보
      delivRequest: null, // 배송요청사항 정보
      giftOrdItemList: {},
      ordsDelivGrpInfo: null, // 배송지, 배송정보
      delivId: [],
      dlvDelivChk: {
        useYn: 'N', // 사용여부
        chkValue: '', // chk 값
        chkValueSize: 1,
      }, // 택배배송시간체크여부
      loginYn: LoginUtils.isLogin(),
      validationChk: false,
      siteClass: CookieUtils.getSiteClass(),
      ordsDlvpSeqno: 0, // 주문서배송지일련번호
      rlfNoRqtYn: 'N', // 안심번호 신청여부
    };
  },
  watch: {
    giftMsgInfo: function() {
      // 선물받기 마감일자 SET 및 마감여부
      this.giftValidTime();
      // 선물받기 주문자 체크
      this.giftValidOrdMst();
    },
    dlvDelivInfor: function() {
      if (this.dlvDelivInfor != null && this.dlvDelivInfor.owncoDlvDelivYn == 'Y') { // 전택일경우만 체크
        this.dlvDelivChk.useYn = 'Y';
      }
    }
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물 받기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물 받기',
      },
    ],
  },
  mixins: [],
  components: {
    SubDefaultHeader, // 헤더
    GiftReceiveAddrWrite, // 배송지
    GiftMessageCard, // 선물 메시지
    GiftRcvDeliveryParcel, // 택배배송
    GiftRcvProductList, // 실사용 컴포넌트
    DeliveryRequest, // 배송요청사항
  },
  methods: {
    async giftOrdItemInfo () {
      const params = {
        ordId: this.ordId,
      };
      const resultGiftOrdItemInfo = await ApiUtils.get('/fo/od/giftMgnt/gift_ord_item_info', params);
      this.giftOrdItemList = resultGiftOrdItemInfo.data.data;
      if (this.giftOrdItemList.ordStatCd === '90' || (this.giftOrdItemList.ordClaimStatCd > '40' && this.giftOrdItemList.ordClaimStatCd < '50')) {
        await this.$gsdialog.alert('취소된 주문입니다.');
        this.$router.push('/cu/my_page');
        return;
      }
      this.giftOrderInfo();
    },
    // 주문선물 조회(수취자정보, 결제자정보, 선물메세지)
    async giftOrderInfo() {
      const params = {
        ordId: this.ordId,
      };
      const resultGiftInfo = await ApiUtils.get('/fo/od/giftMgnt/gift_order_ps_info', params);
      this.giftMsgInfo = resultGiftInfo.data.data;
      this.ordsDlvpSeqno = this.giftMsgInfo.ordsDlvpSeqno;
      // this.rlfNoRqtYn = this.giftMsgInfo.rlfNoRqtYn;
      this.retrieveDlvDelivInfor();
      this.chkSafeNumber();
    },
    async chkSafeNumber() {
      this.rlfNoRqtYn = "Y";
      const rq = {
        ordId: this.ordId,
        rlfNoRqtYn: this.rlfNoRqtYn,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      const rs = await ApiUtils.post('/fo/od/ordsmgnt/safeNum-request-proc', rq);
    },
    async retrieveDlvDelivInfor() { // 배송목록조회
      const iDlvDelivInforInq = {
        ordId: this.ordId,
        delivId: '',
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/gift-delivery-list', iDlvDelivInforInq);
      this.dlvDelivInfoList = response.data.data.giftOrdDelivList;
      if (this.dlvDelivInfoList.length > 0) {
        this.ordsDlvpInfo = this.dlvDelivInfoList[0];
        for (let i=0; i < this.dlvDelivInfoList.length; i++) {
          this.delivId.push(this.dlvDelivInfoList[i].delivId);
        }
        this.delivId = Array.from(new Set(this.delivId)); // 중복제거
      }
      // 택배배송
      if ('Y' === this.ordsDlvpInfo.owncoDlvDelivYn || 'Y' === this.ordsDlvpInfo.firmDlvDelivYn) {
        this.dlvDelivInfor = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpSeqno,
          firmDlvDelivYn: this.ordsDlvpInfo.firmDlvDelivYn,
          owncoDlvDelivYn: this.ordsDlvpInfo.owncoDlvDelivYn,
          giftYn: 'Y', // 선물받기경우 추가
        };
      }
      this.ordsDelivGrpInfo = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
    },
    // 배송요청사항 변경 이벤트
    delivReqEvent: function(delivRequest) {
      this.delivRequest = delivRequest;
    },
    chkDelivSeqNo(gbn, seqNo, count) { // 배송차수 선택여부
      if (gbn === 'dlvDelivChk') { // 택배
        this.dlvDelivChk.chkValue = seqNo;
        this.dlvDelivChk.chkValueSize = count;
      }
    },
    // 배송요청사항 저장 및 선물받기 완료
    async giftRcvDlvEvent() {
      this.rcptDlvp = this.$refs.addr.getAddress();
      if (StringUtils.isEmpty(this.rcptDlvp.adrsNm)) {
        this.validationChk = false;
        this.moveElement('giftDeliv');
        return this.$gsdialog.alert(OrderMsg.editGiftNm); // 받으시는 고객명을 입력해주세요.
      }
      if (StringUtils.isEmpty(this.rcptDlvp.telNo) || this.rcptDlvp.telNo.length < 11) {
        this.validationChk = false;
        this.moveElement('giftDeliv');
        return this.$gsdialog.alert(OrderMsg.editGiftTel); // 받으시는 고객 연락처를 입력해주세요.
      }
      if (StringUtils.isEmpty(this.rcptDlvp.detail)) {
        this.validationChk = false;
        this.moveElement('giftDeliv');
        return this.$gsdialog.alert(OrderMsg.giftDelivChk);
      }
      if (this.dlvDelivChk.useYn === 'Y') { // 택배배송시간체크여부
        if (this.dlvDelivChk.chkValue.length !== this.dlvDelivChk.chkValueSize) {
          this.validationChk = false;
          this.moveElement('popupTimeSelect_dlvDelivChk');
          return this.$gsdialog.alert(OrderMsg.dlvDelivChk); // 택배배송 시간을 체크해 주십시오.
        } else {
          this.validationChk = true;
        }
      }
      // 배송요청사항체크
      if (!StringUtils.isEmpty(this.delivRequest) && this.delivRequest.selectedOptionValue === '1' && StringUtils.isEmpty(this.delivRequest.delivMsgCnts)) { // 공동현관비밀번호체크
        this.validationChk = false;
        document.getElementById("agreeDeliveryType").focus();
        return this.$gsdialog.alert(OrderMsg.recptGetMethoP);
      } else {
        this.validationChk = true;
      }
      if (!StringUtils.isEmpty(this.delivRequest) && StringUtils.isEmpty(this.delivRequest.selectedSoldoutValue)) { // 결품발생 시 처리 방법체크
        this.validationChk = false;
        this.moveElement('soldoutTypeR');
        return this.$gsdialog.alert(OrderMsg.agreeSoldoutChk);
      } else {
        this.validationChk = true;
      }

      // 취소되었는지 다시 체크
      const resultGiftOrdItemInfo = await ApiUtils.get('/fo/od/giftMgnt/gift_ord_item_info', {ordId: this.ordId});
      this.giftOrdItemList = resultGiftOrdItemInfo.data.data;
      if (this.giftOrdItemList.ordStatCd === '90' || (this.giftOrdItemList.ordClaimStatCd > '40' && this.giftOrdItemList.ordClaimStatCd < '50')) {
        await this.$gsdialog.alert(OrderMsg.giftOrdCancel); // 취소된 주문입니다.
        this.$router.push('/cu/my_page');
        return;
      }

      // 배송지 업데이트
      for (let i=0; i < this.delivId.length; i++) {
        const params = {};
        params.ordId = this.ordId;
        params.delivId = this.delivId[i];
        params.adrsNm = this.rcptDlvp.adrsNm;
        params.adrsZipcd = this.rcptDlvp.zipCode;
        params.adrsBaseAddr = this.rcptDlvp.jibun;
        params.adrsDtlAddr = this.rcptDlvp.detail;
        params.adrsStnmBaseAddr = this.rcptDlvp.road;
        params.adrsStnmDtlAddr = this.rcptDlvp.detail;
        params.adrsTelNo = this.rcptDlvp.telNo;

        const response = await ApiUtils.put("/fo/od/ordsmgnt/gift-delivery-area-sequence", JSON.stringify(params));
        if (response.data.statusCode === "0000") {
        } else {
          return this.$gsdialog.alert(OrderMsg.giftFail, {html: true});
        }
      }

      const params = {};
      params.ordId = this.ordId;
      params.giftRcptCmmMbrNm = this.rcptDlvp.adrsNm;
      params.giftTrpsTelNo = this.rcptDlvp.telNo;
      params.itemDlvrMethoCd = this.delivRequest.selectedLocation;
      params.itemDlvrMethoAddCd = this.delivRequest.selectedOptionValue;
      params.itemDlvrMethoDtlCnts = this.delivRequest.itemDlvrMethoDtlCnts;
      params.delivMsgCnts = this.delivRequest.delivMsgCnts;
      params.ofsItemProcSpCd = this.delivRequest.selectedSoldoutValue;
      params.recptIssuSpCd = this.delivRequest.RecptGetMetho === true ? 'M' : 'S';
      const response = await ApiUtils.put("/fo/od/ordsmgnt/gift-rcv-process", JSON.stringify(params));
      if (response.data.statusCode === "0000") {
        this.$router.push({name: 'GiftRcvComplete', params: {ordId: this.ordId}});
      } else {
        return this.$gsdialog.alert(OrderMsg.giftFail, {html: true});
      }
    },
    giftValidTime() {
      const dttmText = this.giftMsgInfo.giftValidDttm;
      if (dttmText != null) {
        const YY = dttmText.substring(0, 4);
        const MM = dttmText.substring(5, 7);
        const DD = dttmText.substring(8, 10);
        const HH = dttmText.substring(11, 13);
        const MI = dttmText.substring(14, 16);
        const SS = dttmText.substring(17, 19);
        this.giftValidDttm = new Date(YY, MM-1, DD, HH, MI, SS);
        this.giftValidDayInfo.giftYear = this.giftValidDttm.getFullYear();
        this.giftValidDayInfo.giftMonth = this.giftValidDttm.getMonth()+1;
        this.giftValidDayInfo.giftDate = this.giftValidDttm.getDate();
        this.giftValidDayInfo.giftDay = this.getDayFix(this.giftValidDttm.getDay());
        this.giftValidDayInfo.giftHours = this.giftValidDttm.getHours();
        this.giftValidDayInfo.giftMinutes = this.giftValidDttm.getMinutes();
        // 마감된 선물에대해서 장바구니로 화면 돌림
        if (this.giftValidDttm.getTime() <= this.giftTodayDttm.getTime()) {
          this.$gsdialog.alert(OrderMsg.giftOrdValidDttmChk).then(dialog => {
            this.goBskt();
          });
        }
      }
    },
    giftValidOrdMst() {
      if (this.giftMsgInfo.giftAcptYn === 'Y') { // 이미받은주문
        this.$gsdialog.alert(OrderMsg.giftOrdValidUseChk).then(dialog => {
          this.goBskt();
        });
      }
      // 비회원도 허용요청 20200803 유현석
      // if (this.giftMsgInfo.giftTrpsTelNoYn === null || this.giftMsgInfo.giftTrpsTelNoYn === 'N') { // 선물받는분 전화번호 불일치
      //   this.$gsdialog.alert(OrderMsg.giftOrdValidNumChk).then(dialog => {
      //     this.goBskt();
      //   });
      // }
    },
    getDayFix(num) {
      let day = '';
      if (num === 0) {
        day = '일요일';
      } else if (num === 1) {
        day = '월요일';
      } else if (num === 2) {
        day = '화요일';
      } else if (num === 3) {
        day = '수요일';
      } else if (num === 4) {
        day = '목요일';
      } else if (num === 5) {
        day = '금요일';
      } else if (num === 6) {
        day = '토요일';
      }
      return day;
    },
    goBskt() {
      this.$router.push({name: 'theBasket'});
    },
    goLogin() {
      this.$router.push('/cu/login?returnUrl=/od/gift_rcv_dlv/' + this.ordId);
    },
    moveElement(el) {
      const $el = document.querySelector( '#' + el );
      if ($el != null) {
        $el.scrollIntoView(true);
        window.scrollBy(0, -150); // 상단 탭까지 이동
      }
    },
  },
  mounted() {
    this.giftOrdItemInfo();
  },
};
</script>
<style lang="scss">
</style>
