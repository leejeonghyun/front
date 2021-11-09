<!--
@author wisehouse@gsretail.com
-->
<script>
export default {
  loginFail: "로그인정보가 없습니다.",
  ordFail: "주문이 실패하였습니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  payFail: "결제가 실패하였습니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  authFail: "결제진행이 실패하였습니다.<br/>다시 시도해주세요.",
  authDtlFail: "아래와 같은 사유로 결제진행이 실패하였습니다.<br/>",
  payDtlFail: "아래와 같은 사유로 결제가 실패하였습니다.<br/>",
  payFailSlot: "주문 배송슬롯이 마감되어<br/>주문이 실패하였습니다.",
  payFailDisTelco: "통신사할인 기간이 만료되어<br/>주문이 실패하였습니다.",
  payFailDisCard: "카드즉시할인 기간이 만료되어<br/>주문이 실패하였습니다.",
  payFailDisProm: "프로모션할인 기간이 만료되어<br/>주문이 실패하였습니다.",
  payFailDisCpn: '이미 사용된 쿠폰이 재사용되어<br/>주문이 실패하였습니다.',
  payFailStk: "상품 재고수량 부족으로<br/>주문이 불가합니다.",
  payFailSimCook: "심플리쿡 상품의 주문 시간이 마감되었습니다.",
  giftFail: "선물받기에 실패하였습니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  allFail: "서버오류입니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  ordValidChk: "잘못된 접근입니다.",
  pointPayMore: "결제금액을 초과하였습니다.",
  pntFail: "당일/새벽배송상품 5만원 이상 구매 시 사용 가능합니다.",
  gsPointMore: "보유한 포인트보다 사용하는 포인트가 더 많습니다.",
  gsPointEmpty: "사용가능한 GS&POINT가 없습니다.",
  useGsPointEmpty: "사용하실 GS&POINT를 입력해주세요.",
  useGsPointNumChk: "사용하실 GS&POINT는 숫자만 입력 가능합니다.",
  useGsPointValid: "사용하실 GS&POINT가 결제금액보다 작습니다.",
  useGsPointMore: "사용하실 GS&POINT가 결제금액보다 더 많습니다.",
  popPointMore: "보유한 THE POP 리워즈보다 사용하는 THE POP 리워즈가 더 많습니다.",
  popPointEmpty: "사용하실 The POP 리워즈가 없습니다.",
  editMbrNo: "회원번호을 입력해주세요.",
  editTel: "통신사를 선택해주세요.",
  editGid: "gid가 존재하지 않습니다. 고객센터(1661-2562)로 문의하시기 바랍니다.",
  editMid: "mid가 존재하지 않습니다. 고객센터(1661-2562)로 문의하시기 바랍니다.",
  editCardNo: "카드번호를 입력해주세요.",
  editBirth: "생년월일을 입력해주세요.",
  morePoint: "3000P 부터 사용이 가능합니다.",
  abrdDelivInforEmpty: "개인통관고유부호를 입력해주세요.",
  abrdDelivInforSuccess: "개인통관고유부호 인증이 완료되었습니다.",
  abrdDelivInforChk: "입력하신 개인통관고유부호를 다시 확인해주세요.",
  abrdDelivInforFail: "개인통관고유부호가 유효하지 않습니다.",
  abrdDelivInforError: "개인통관고유부호 조회에 실패하였습니다.",
  abrdAgreeChk: "개인통관고유부호 수집에 동의해주세요.",
  selectCard: "카드를 선택하여 주십시오",
  posbQty: function(qty) {
    return qty + '개만 선택이 가능합니다.';
  },
  editCustNm: "고객명을 입력해주세요.",
  editCustTel: "고객의 연락처를 입력해주세요.",
  noMemGift: "비회원은 이용이 불가능합니다.",
  editGiftInfoFail: "주문자 정보 변경에 실패하였습니다.",
  editGift: "받으시는 고객 정보를 입력해주세요.",
  editGiftNm: "받으시는 고객명을 입력해주세요.",
  editGiftTel: "받으시는 고객 연락처를 입력해주세요.",
  editGiftTxt: "메세지를 입력해주세요.",
  editCustNum: "고객번호를 입력해주세요.",
  editProQty: "상품수량을 입력해주세요.",
  editProPrice: "가격을 입력해주세요.",
  emptyAuth: "인증정보를 불러올 수 없습니다.",
  errorAuth: "인증 중 에러가 발생했습니다.",
  editCardCom: "카드사선택을 확인하세요.",
  errorCardInfo: "카드정보에 오류가 있습니다. 관리자에게 문의하세요.",
  delivSeqChk: "배송 시간을 체크해 주십시오.",
  todayDelivChk: "당일배송 시간을 체크해 주십시오.",
  dawnDelivChk: "새벽배송 시간을 체크해 주십시오.",
  dlvDelivChk: "택배배송 시간을 체크해 주십시오.",
  pickupDelivChk: "방문 예정시간을 선택해주세요.",
  recptGetMethoP: "공동현관출입번호를 입력해주세요.",
  agreeSoldoutChk: "결품 발생 시 처리방법을 선택해주세요.",
  freeGiftChk: "사은품을 선택해주세요.",
  freeGiftCnt: "사은품 선택수량을 초과하였습니다.",
  payTypeChk: "결재방식을 선택해 주십시오.",
  liqAgreeChk: "주류주문에 따른 개인정보 제공에 동의해주세요.",
  agreeChk: "주문상품 및 결제대행 이용약관에 동의해주세요.",
  pkupChk: "픽업서비스 약관 동의를 확인해주십시오.",
  popDcChk: "결제하신 결제수단은 팝제휴가 아닙니다.",
  paySimCook: "신선한 심플리쿡 상품의 재료를 준비중입니다!<br/>매일 22시~24시 사이에는<br/>내일 수령 가능한 주문이 마감됩니다.<br/>다른 날짜를 선택하여 주문해 주시기 바랍니다.",
  posbBsktQty: function(type, qty) {
    return type + " 구매 수량은 " + qty + "개 입니다.";
  },
  posbBsktStkQty: function(qty, itemNm) {
    return "해당 상품의 재고 수량을 초과하였습니다.<br/>확인 후, 수량을 조정해주십시오.<br/><br/>상품명 : " + itemNm + "<br/>재고 수량 : " + qty + "개";
  },
  productDelConfirm: "선택한 상품을 삭제하시겠습니까?",
  productDelCntChk: "삭제할 상품을 선택해 주세요.",
  valueEmpty: function(type) {
    return type + "이(가) 존재하지 않습니다.";
  },
  cashRecptChk: function(type) {
    let typeNm = "";
    if (type === '1') {
      typeNm = "휴대폰번호를 ";
    } else {
      typeNm = "사업자번호를 ";
    }
    return "현금영수증 발급신청 " + typeNm + "확인 해주세요.";
  },
  completeOrd: "결제가 완료되었습니다.<br/>카카오톡에서 받으실 친구를 선택해주세요.",
  giftOrdLoginChk: "선물받기는 로그인이 필요합니다. 로그인해주세요.",
  giftOrdValidDttmChk: "선물받을 날짜가 마감되었습니다.",
  giftOrdValidUseChk: "이미 선물받기가 완료된 주문입니다.",
  giftOrdValidNumChk: "선물받는분의 정보가 일치하지 않습니다.",
  giftOrdCancel: "취소된 주문입니다.",
  giftDelivChk: "배송지정보를 입력해주세요.",
  giftRcvFail: "선물을 받지 못하였습니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  giftSoldout: "선물하기 가능한 재고가 없습니다.",
  giftOrderSheetCreateError: "선물하기 가능한 재고가 없습니다.",
  // giftOrderSheetCreateError: "선물하기 주문서 생성에 실패했습니다. 관리자에게 문의하세요.",
  delivertInfoChk: "배송 요청사항을 확인해주세요.",
  cardDisNotMatchPay: "선택 된 결제방식이 다릅니다 확인 해주세요.",
  cardDisNotMatchType: "해당 결제방식으로는 카드할인이 불가 합니다.",
  cardDisValidItem: function(itemNm, evntRestrTypeCd, evntRestrStandVal) {
    let result = '';
    result += "상품 " + itemNm + " 이(가)";
    result += evntRestrTypeCd === '02' ? "수량제한을 초과합니다." : "금액제한을 초과합니다. <br/>";
    result += evntRestrStandVal + (evntRestrTypeCd === '02' ? "개" : "원") + " 까지만 가능합니다.";
    return result;
  },
  cardDisValidPayType: "카드즉시할인시 결제수단 변경이 불가능합니다.",
  cardDisValidFullAmt: "할인금액이 결제총액보다 큽니다 할인정보를 확인해주세요.",
  cardDisValidZeroAmt: "카드즉시할인시 0원결제가 불가능합니다.",
  cardDisValidPoint: "GS&POINT, THEPOP리워즈 사용 시 카드즉시할인 적용이 불가능합니다.",
  // cardCrcoBuyCrcoSame: "카드할인과 포인트&리워즈는 동시 사용 불가능합니다.",
  cardCrcoBuyCrcoSame: "카드즉시할인 적용 시 포인트/리워즈 사용은 불가능합니다.",
  deliveryTodayItemChk: "심플리쿡 상품과 임박/하루판매/배송제한 카테고리 상품을 동시에<br/>주문할 수 없습니다. 장바구니로 이동됩니다.",
  deliveryTodayapchChk: "당일주문 가능한 배송시간이 존재하지 않습니다.<br/>당일만 주문 가능한 마감세일/하루판매/활어회/도시락/베이커리 등<br />상품 제외후 주문부탁드립니다.",
  recptTelChk: "개인소득공제용 휴대폰 번호를 확인해주세요.",
  recptBusiChk: "사업자지출증빙용 사업자 번호를 확인해주세요.",
  cpnFail: function(ordsCpnPayValidDto) {
    let result = '';
    result += "<p style='text-align:left;'>\"" + ordsCpnPayValidDto.promNm + "\" 쿠폰은 ";
    if (ordsCpnPayValidDto.tdrMeansCd === "02") {
      result += "<strong>" + ordsCpnPayValidDto.crcoNm + "</strong> 로만 결제 가능합니다.</p>";
    } else {
      result += "<strong>" + ordsCpnPayValidDto.tdrMeansNm + "</strong> 로만 결제 가능합니다.</p>";
    }
    return result;
  },
  pickupItemValid: "픽업 가능한 상품이 존재하지 않습니다.",
  boxMapFail: "예약 가능한 BOX가 없습니다.",
    boxMapNotSupportedArea: "죄송합니다. 고객님의 주소는 서비스 배송가능 지역이 아닙니다.",
  promOrdPolcSeqInit: "장바구니쿠폰에 지정된 배송시간이 존재하여 기존에 선택된 배송시간을 초기화합니다.",
  promOrdPolcSeqChk: "장바구니쿠폰에 지정된 배송시간을 확인해주세요.",
  safeNumChk: "해외 직배송 상품이 포함된 경우<br/>수입신고 진행을 위해 안심번호<br/>서비스 제공이 불가합니다.",
  pickupDeliveryToday: "픽업은 당일배송 상품만 가능합니다.",
  telcoCntChk: function(telInfo) {
    let result = '';
    if (telInfo.dcApplDurUnitCd === "01") {
      result += "월 ";
    } else if (telInfo.dcApplDurUnitCd === "02") {
      result += "주 ";
    } else if (telInfo.dcApplDurUnitCd === "03") {
      result += "일 ";
    }
    result = result + telInfo.dcCntNum + "회 결제 횟수 한도로 통신사 할인이 불가합니다.";
    return result;
  },
  unavailableSoldoutChk: "선택한 결제수단은 부분취소가 불가합니다.<br/>결품 발생 시 처리 방법을 다시 선택해주세요.",
  memberSoldoutChk: "간편회원은 포인트환불이 불가합니다.<br/>결품 발생 시 처리 방법을 다시 선택해주세요.",
  fpurchItemSoldout: "부분취소가 불가능한 첫구매 상품이 포함되어 있어 <br/>부분취소 선택이 불가합니다.<br/>다른 방법을 선택해주세요.",
  firstBuyGift: function(custNm, itemNm) {
    return custNm + " 고객님의 첫 구매에 감사드려요! <br/>" + itemNm + "의 구매가 완료되었습니다.";
  },
  delivTypeChangeItemExists: '<p>장바구니 내역 중 일부 상품이 품절되어<br />일반택배로 배송됩니다.</p>' +
      '<p>당일배송 상품과 일반택배 상품은 별도로<br />배송되며, 배송비가 추가 부과됩니다.</p>' +
      '<br />' +
      '<p>선택하신 상품을 주문하시겠습니까?</p>',
};
</script>
