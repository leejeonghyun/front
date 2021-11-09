import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import ImgUtils from '@/common/ImgUtils';
import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker';

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const CommonOrder = {
  data: function() {
    return {
      revisionNo: 1,
      timestamp: new Date().getTime(),
    };
  },
  watch: {
    totPayAmt: async function() {
      await this.amtChg();
    },
    todayDelivInfor: function() {
      if (this.todayDelivInfor != null) {
        this.todayDelivChk.useYn = 'Y';
      } else {
        this.todayDelivChk.useYn = 'N';
        this.todayDelivChk.chkValue = '';
      }
    },
    dawnDelivInfor: function() {
      if (this.dawnDelivInfor != null) {
        this.dawnDelivChk.useYn = 'Y';
      } else {
        this.dawnDelivChk.useYn = 'N';
        this.dawnDelivChk.chkValue = '';
      }
    },
    dlvDelivInfor: function() {
      if (this.dlvDelivInfor != null && this.dlvDelivInfor.owncoDlvDelivYn == 'Y') { // 전택일경우만 체크
        this.dlvDelivChk.useYn = 'Y';
      } else {
        this.dlvDelivChk.useYn = 'N';
        this.dlvDelivChk.chkValue = '';
        this.dlvDelivChk.chkValueSize = 1;
      }
    },
    pickUpInfor: function() {
      if (this.pickUpInfor != null ) {
        this.pickupDelivChk.useYn = 'Y';
      } else {
        this.pickupDelivChk.useYn = 'N';
        this.pickupDelivChk.chkValue = '';
      }
    },
  },
  updated() {
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
    };
  },
  destroyed() {
    window.removeEventListener('scroll', this.stickyPrice);
  },
  methods: {
    async orderProcess(rqForm, rsForm) {
      const payType = rqForm.payType;
      const iOrderRequestInputDto = {};
      // 할인정보
      if (this.gsNPointDcAmt > 0) { // GS&POINT
        iOrderRequestInputDto.orderDcGsPntDto = {
          gsNPointDcAmt: this.gsNPointDcAmt,
        };
      }
      if (this.popRwdDcAmt > 0) { // 리워즈팝
        iOrderRequestInputDto.orderDcRwdsDto = {
          popRwdDcAmt: this.popRwdDcAmt,
        };
      }
      if (this.resPntForm != null) { // 통신사 할인정보 LG&KT
        this.resPntForm.amt = this.totPrdAmt; // 할인전 주문총액
        iOrderRequestInputDto.orderDcPntDto = this.resPntForm;
        // console.log(iOrderRequestInputDto.orderDcPntDto);
      }
      if (this.crcoEvntInfo != null) { // 카드즉시할인
        iOrderRequestInputDto.ordsPromCardDto = this.crcoEvntInfo;
      }

      // 사은품
      if (this.freeGift != null && this.freeGift.length > 0) { // 기본 사은품
        iOrderRequestInputDto.freeGiftList = this.freeGift;
        console.log("iOrderRequestInputDto.freeGiftList", iOrderRequestInputDto.freeGiftList);
      }

      iOrderRequestInputDto.ordId = rqForm.orderNo; // 주문번호
      iOrderRequestInputDto.ordTypeCd = this.ordTypeCd; // 주문방식코드
      iOrderRequestInputDto.ordDt = this.todayDt(); // 주문일자
      iOrderRequestInputDto.goodsName = rqForm.goods_name; // 상품명
      iOrderRequestInputDto.goodsCnt = rqForm.goods_cnt; // 상품수
      iOrderRequestInputDto.amt = rqForm.goods_price; // 금액
      iOrderRequestInputDto.taxFreeAmt = rqForm.totalTaxfreeAmt; // 면세대상금액
      iOrderRequestInputDto.taxableAmt = rqForm.totalTaxableAmt; // 과세대상금액
      iOrderRequestInputDto.taxfreeRate = rqForm.totTaxfreeRate; // 면세율 0원결제시사용
      iOrderRequestInputDto.taxableRate = rqForm.totTaxableRate; // 과세율 0원결제시사용
      iOrderRequestInputDto.tax = rqForm.totalVatAmt; // 부가세
      iOrderRequestInputDto.totItemAmt = rqForm.totItemAmt; // 총상품금액
      iOrderRequestInputDto.totItemTaxAmt = rqForm.totItemTaxAmt; // 총상품과세금액
      iOrderRequestInputDto.totItemFTaxAmt = rqForm.totItemFTaxAmt; // 총상품면세금액
      iOrderRequestInputDto.totItemVatAmt = rqForm.totItemVatAmt; // 총상품부가세금액
      iOrderRequestInputDto.buyerName = rqForm.buyer_name; // 구매자명
      iOrderRequestInputDto.buyerTel = rqForm.buyer_tel; // 구매자연락처
      iOrderRequestInputDto.mallUserID = rqForm.memNo; // 구매자회원번호
      iOrderRequestInputDto.deviceType = rqForm.deviceType; // 디바이스
      iOrderRequestInputDto.fstOrdYn = this.ordsInfo.fstOrdYn; // 첫주문여부, 트래커용
      iOrderRequestInputDto.totalDcAmt = this.totalDcAmt; // 총할인금액, 트래커용
      iOrderRequestInputDto.totDelivFee = this.totDelivFee; // 총배송비, 트래커용
      iOrderRequestInputDto.ordAgree = (rqForm.agreeChk !== undefined && rqForm.agreeChk === true) ? 'Y' : 'N'; // 주문상품약관,결제개인정보동의
      iOrderRequestInputDto.ordLiqAgree = (rqForm.liqAgreeChk !== undefined && rqForm.liqAgreeChk === true) ? 'Y' : 'N'; // 주류구매약관
      if (this.totPayAmt > 0) {
        if (payType == "02") { // 신용카드
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.authType = rqForm.mobilCertReqTypeCd; // 신용카드결제타입
          iOrderRequestInputDto.cardAuthType = rsForm.authType; // 카드인증유형코드
          iOrderRequestInputDto.formBankCd = rqForm.pytcApprCardCd; // 승인카드사코드
          iOrderRequestInputDto.cardCode = rqForm.cardCode;
          iOrderRequestInputDto.orderCardname = rqForm.orderCardname; // 카드사명
          iOrderRequestInputDto.cardInterest = rqForm.noint_inf; // 무이자할부정보
          iOrderRequestInputDto.cardQuota = rqForm.quota_inf; // 할부개월수
        } else if (payType == "01") { // 계좌이체
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.tid = rsForm.userKey; // tid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.buyerEmail = rqForm.email; // 구매자이메일
          iOrderRequestInputDto.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
          iOrderRequestInputDto.cachRcptSupplFirmCd = '9999'; // TODO 공급사업장코드
        } else if (payType == "10" ) { // 휴대폰소액결제
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.mobileId = rsForm.mobileId;
          iOrderRequestInputDto.svcId = rsForm.svcId;
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.affName = rqForm.aff_name; // 상점명
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.buyerEmail = rqForm.email; // 구매자이메일
          iOrderRequestInputDto.buyerEmail = 'gsfreash@gsfreash.com'; // 구매자이메일
        } else if (payType == "13" ) { // 모바일팝
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.buyerEmail = 'gsfreash@gsfreash.com'; // 구매자이메일
          iOrderRequestInputDto.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
          iOrderRequestInputDto.cachRcptSupplFirmCd = '9999'; // TODO 공급사업장코드
        } else if (payType == "04" || payType == "05" || payType == "06") { // 페이코 카카오페이 네이버페이
          iOrderRequestInputDto.easyPayType = rqForm.easyPayInfoType; // 간편결제방식 간편결제 승인불가시 필요함
          iOrderRequestInputDto.payCompany = rqForm.payCompanyCd; // 결제사코드
          iOrderRequestInputDto.payCompanyNm = rqForm.payCompany; // 결제사명
          iOrderRequestInputDto.authType = rqForm.authType; // 결제타입
          iOrderRequestInputDto.payType = payType; // 결제수단
          iOrderRequestInputDto.mid = rsForm.mid; // mid
          iOrderRequestInputDto.urlHashKey = rsForm.hashKey; // hashKey
          iOrderRequestInputDto.buyerEmail = 'gsfreash@gsfreash.com'; // 구매자이메일
          if (this.cashRcpctInfo.cashRecptIssuYn === "Y") {
            iOrderRequestInputDto.orderCashRcpctDto = this.cashRcpctInfo; // 현금영수증
          }
        }
      }
      // BOX25 API REQ
      if (this.iBOX25PkupSvcReqProc && this.iBOX25PkupSvcReqProc.ordsPkupSvcInfo !== undefined && this.iBOX25PkupSvcReqProc.ordsPkupSvcInfo !== null && this.isNotEmpty(this.iBOX25PkupSvcReqProc.ordId)) {
        iOrderRequestInputDto.iBOX25PkupSvcReqProc = this.iBOX25PkupSvcReqProc;
        iOrderRequestInputDto.ordsDlvpInfo = this.ordsDlvpInfo;
      }
      // 동의정보
      if (this.orderAgreeInfo !== undefined && this.orderAgreeInfo != null) {
        iOrderRequestInputDto.orderAgreeInfo = this.orderAgreeInfo;
      }
      // 픽업정보
      if (this.tab['pickup'] && this.strInfo !== undefined && this.strInfo != null) {
        iOrderRequestInputDto.pkuppId = this.strInfo.pkuppId;
      }
      // 주문 등록 직전 호출건수 데이터 수집
      Tracker.orderCompleteBefore(this.trackItemList, iOrderRequestInputDto, this.ordId, this.$gtag);
      // 주문 등록
      console.log("this.iOrderRequestInputDto : ", iOrderRequestInputDto);
      this.loading = true; // 로딩 on
      const response = await ApiUtils.put('/fo/od/ordmgnt/order-pay-proc', iOrderRequestInputDto);
      if (response.data.statusCode === "0000") {
        this.loading = false; // 로딩 on
        Tracker.orderComplete(this.trackItemList, iOrderRequestInputDto, this.ordId, this.$gtag);
        if (this.ordTypeCd === '10' || this.ordTypeCd === '50') {
          this.$router.push({name: 'orderComplete', params: {ordId: this.ordId}});
        } else {
          this.$router.push({name: 'giftOrderComplete', params: {ordId: this.ordId}});
        }
      } else {
        console.log('%c ' + response.data.statusCode, 'background-color:red; color:#ffffff; font-size:48px;');
        console.log('%c ' + response.data.statusMessage, 'background-color:red; color:#ffffff; font-size:48px;');
        this.loading = false; // 로딩 on
        // TO-DO : 고객노출 알림메시지 정의 및 코드화 필요
        // 9902 : 주문 배송슬롯 마감 에러
        // 9904 : 통신사할인 기간만료
        // 9907 : 카드즉시할인 기간만료
        // 9912 : 프로모션할인 기간만료
        // 9913 : 상품 재고수량 부족
        if (response.data.statusCode === '9902') {
          return this.$gsdialog.alert(OrderMsg.payFailSlot, {html: true});
        } else if (response.data.statusCode === '9904') {
          return this.$gsdialog.alert(OrderMsg.payFailDisTelco, {html: true});
        } else if (response.data.statusCode === '9907') {
          return this.$gsdialog.alert(OrderMsg.payFailDisCard, {html: true});
        } else if (response.data.statusCode === '9912') {
          return this.$gsdialog.alert(OrderMsg.payFailDisProm, {html: true});
        } else if (response.data.statusCode === '9928') {
          return this.$gsdialog.alert(OrderMsg.payFailDisCpn, {html: true});
        } else if (response.data.statusCode === '9913') {
          if (response.data.statusMessage !== null && response.data.statusMessage !== '') {
            return this.$gsdialog.alert(response.data.statusMessage.split("||").join("<br>") + "<br>" + OrderMsg.payFailStk, {html: true});
          } else {
            return this.$gsdialog.alert(OrderMsg.payFailStk, {html: true});
          }
        } else if (response.data.statusCode === '9919') { // 심플리쿡 마감 오류
          return this.$gsdialog.alert(OrderMsg.paySimCook, {html: true});
        } else if (response.data.statusCode === '9952') {
          return this.$gsdialog.alert(OrderMsg.popDcChk, {html: true});
        } else if (response.data.statusCode === '9940' || response.data.statusCode === '9942' || response.data.statusCode === '9945' || response.data.statusCode === '9948') {
          if (response.data.statusCode === '9945' || response.data.statusCode === '9948') {
            this.$gsdialog.alert(response.data.statusMessage || OrderMsg.payFail, {html: true});
          } else {
            if (response.data.statusMessage !== null && response.data.statusMessage !== '') {
              this.$gsdialog.alert(OrderMsg.payDtlFail + response.data.statusMessage, {html: true});
            } else {
              this.$gsdialog.alert(OrderMsg.payFail, {html: true});
            }
          }
        } else {
          return this.$gsdialog.alert(OrderMsg.ordFail, {html: true});
        }
      }
    },
    totPayAmtEvent(totPayAmt, totPrdAmt, totDelivFee) { // 결제금액 이벤트
      // console.log("totPayAmt : ", totPayAmt);
      this.totDelivFee = totDelivFee;
      this.totPrdAmt = totPrdAmt;
      this.totPayAmt = totPayAmt;
    },
    async amtChg() {
      const param = {};
      param.ordId = this.ordId;
      param.amt = this.totPayAmt;
      param.gsPntAmt = this.gsNPointDcAmt;
      param.rwdsAmt = this.popRwdDcAmt;
      param.pntAmt = this.resPntForm !== null ? this.resPntForm.discountAmt : 0;
      param.cardAmt = this.crcoEvntInfo && this.crcoEvntInfo.cardDcAmt || 0;
      param.cmmMbrNo = this.ordsInfo.cmmMbrNo; // 해당주문 유효성때문에 필수
      param.revisionNo = this.revisionNo++;
      param.timestamp = this.timestamp;
      const response = await ApiUtils.post('/fo/od/ordsmgnt/ords-all-amt-chg', param);
    },
    orderSheetDcAmtEvent: function(gsNPointDcAmt, popRwdDcAmt, resPntForm, crcoEvntInfo, totalDcAmt) { // 총 할인금액
      this.totalDcAmt = totalDcAmt;
      this.crcoEvntInfo = crcoEvntInfo;
      this.resPntForm = resPntForm;
      this.gsNPointDcAmt = gsNPointDcAmt;
      this.popRwdDcAmt = popRwdDcAmt;
      this.totPayAmt = this.totPrdAmt + this.totDelivFee - this.totalDcAmt; // 하위 사은품지급에서 최종금액을 watch
      this.$refs.discount.setTotAmt(this.totPayAmt);
      this.$refs.paySheet.setDisAmt(gsNPointDcAmt, popRwdDcAmt, resPntForm, crcoEvntInfo, totalDcAmt);
      // console.log("this.totalDcAmt : ", this.totalDcAmt);
      // console.log("this.totPayAmt : ", this.totPayAmt);
      // console.log("this.crcoEvntInfo : ", this.crcoEvntInfo);
      // console.log("this.resPntForm : ", this.resPntForm);
      // console.log("this.gsNPointDcAmt : ", this.gsNPointDcAmt);
      // console.log("this.popRwdDcAmt : ", this.popRwdDcAmt);
      // console.log("this.totDelivFee : ", this.totDelivFee);
      // this.totPayAmt = this.totPayAmt - this.totalDcAmt;
    },
    CashReceiptIssueEvent: function(cashRcpctInfo) { // 현금영수증발행 이벤트
      this.cashRcpctInfo = cashRcpctInfo;
    },
    checkMbrDlvpInfoEvent: function(mbrDelivInfo) { // 수취자배송지정보 이벤트
      this.ordsDlvpInfo = mbrDelivInfo;
      this.$refs.deliveryToday.retrieveTodayDelivInfor();
      this.$refs.paySheet.changeDlvp(this.ordsDlvpInfo);
    },
    setPayInfo(payInfo) {
      this.payInfo = payInfo;
    },
    stickyPrice() { // 총합계 스티키
      const offSet = window.pageYOffset;
      const $stickyPrice = document.querySelector('.position-fixed-total-price');
      if ( !!$stickyPrice ) {
        const btnBottomPos = document.querySelector(".bottom-btn-area").offsetTop;
        if ( offSet + window.innerHeight >= btnBottomPos ) {
          $stickyPrice.classList.add('hide');
        } else {
          $stickyPrice.classList.remove('hide');
        }
      }
    },
    chkDelivSeqNo(gbn, seqNo, count) { // 배송차수 선택여부
      if (gbn == 'todayDelivChk') { // 당일
        this.todayDelivChk.chkValue = seqNo;
        this.todayDelivChk.chkValueSize = count;
      } else if (gbn == 'dawnDelivChk') { // 새벽
        this.dawnDelivChk.chkValue = seqNo;
      } else if (gbn == 'dlvDelivChk') { // 택배
        this.dlvDelivChk.chkValue = seqNo;
        this.dlvDelivChk.chkValueSize = count;
      } else if (gbn == 'pickupDelivChk') {
        this.pickupDelivChk.chkValue = seqNo;
        this.pickupDelivChk.chkValueSize = count;
      }
    },
    defaultFreeGift(freeGift) {
      this.defaultFreeGiftList = freeGift;
    },
    setFreeGift(promPresFrgf, crud) {
      // console.log(promPresFrgf);
      if (crud === 'D' && promPresFrgf === null) { // 사은품 전체삭제
        this.freeGift = [];
      } else if (crud === 'D' && promPresFrgf !== null) { // 단일 사은품 삭제
        for (let i=0; i < this.freeGift.length; i++) {
          if (this.freeGift[i].promId === promPresFrgf.promId &&
          this.freeGift[i].promBeneSeqno === promPresFrgf.promBeneSeqno &&
          this.freeGift[i].promPresFrgfSeqno === promPresFrgf.promPresFrgfSeqno) {
            this.freeGift.splice(i, 1);
            break;
          }
        }
      } else if (crud === 'U') { // 사은품 업데이트
        for (let i=0; i < this.freeGift.length; i++) {
          if (this.freeGift[i].promId === promPresFrgf.promId &&
          this.freeGift[i].promBeneSeqno === promPresFrgf.promBeneSeqno &&
          this.freeGift[i].itemId === promPresFrgf.itemId) { // 추가 같은프로모션을 상품별로 걸수있음
            this.freeGift.splice(i, 1);
          }
        }
        this.freeGift.push(promPresFrgf); // 단일선택 전체 삭제후 한개만 다시 생성
      } else if (crud === 'I') { // 사은품 생성
        this.freeGift.push(promPresFrgf);
      }
      // console.log(this.freeGift);
    },
    orderPaymentProc() {
      this.$refs.paySheet.orderPaymentProc();
    },
    async getMemInfo() {
      const resultMemInfo = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      ); // 회원정보 가져오기
      // console.log('resultMemInfo', resultMemInfo);
      this.mbrGrd = resultMemInfo.data.data.mbrTypeCd === '01' ? true : false;
    },
    strInfoChoiceEvent: function(strInfo) { // 픽업매장정보 이벤트
      try {
        this.loading = true;

        if (strInfo) {
          this.strInfo = strInfo;
          this.pickupFlag = false;
          this.pickupCenterFlag = true;
          this.popup.popupMenuShow = false;
          this.pickUpInfor = {
            ordId: strInfo.ordId,
            ordsDlvpSeqno: strInfo.ordsDlvpSeqno,
          };
          if ((this.pkupInvalidProduct && this.pkupInvalidProduct.length > 0)) {
            this.retrievelistOrdsItem();
          }
        } else {
          this.strInfo = strInfo;
          this.pickupFlag = true;
          this.pickupCenterFlag = false;
          this.popup.popupMenuShow = false;
          this.pickUpInfor = null;
        }
      } finally {
        this.loading = false;
      }
    },
    popupAction(...args) { // 팝업 활성/비활성
      const typ = args[0];
      if (typ === 'popupOrderDiscountInfo') {
        this.ordsItemDcSate = args[1];
      }
      if (typ === 'popupOrderCouponList') {
        this.ordsItemInfo = args[1];
      }
      if (typ === 'popupSimplycook') {
        this.todayDelivInfoList = args[1];
      }
      this.popup[`${typ}`] = !this.popup[`${typ}`];
      this.popup.open = !this.popup.open;
    },
    popupDlvpAction(type) {
      this.popupAction('popupDeliveryList');
    },
    toComma(num) { // 3자리마다 ',' 처리
      return NumberUtils.toComma(num);
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
    todayDt() {
      return DateUtils.format(DateUtils.getToday(), 'YYYYMMDD');
    },
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        alert(e);
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
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
  }
};

export default CommonOrder;
