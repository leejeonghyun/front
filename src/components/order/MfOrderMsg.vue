<!--
@author wisehouse@gsretail.com
-->
<script>
import NumberUtils from '@/common/NumberUtils';
export default {
  selectBsktListFail: "장바구니 상품 목록 조회 중 오류가 발생하였습니다.<br/>잠시 후 다시 시도 해주세요.",
  noLogin: "해당 서비스는 로그인 후 이용 가능합니다.",
  buyItemNoLogin: "상품 구입을 위해 로그인해주세요.",
  selectDelItem: "삭제 할 상품을 선택해 주세요.",
  putBsktItem: "상품이 장바구니에 담겼습니다.",
  noOrderItem: "주문할 상품을 선택해 주세요.",
  ordValidChk: "잘못된 접근입니다.",
  ordFail: "주문이 실패하였습니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  payFail: "결제가 실패하였습니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  payDtlFail: "아래와 같은 사유로 결제가 실패하였습니다.<br/>",
  cardDisValidPayType: "카드 변경 시 즉시할인 혜택이 적용되지 않습니다.<br/>카드를 변경하시겠어요?",
  cardCrcoBuyCrcoSame: "카드즉시할인 적용 시 포인트/리워즈 사용은 불가능합니다.",
  cardDisValidFullAmt: "할인금액이 결제총액보다 큽니다 할인정보를 확인해주세요.",
  bsktCpnPayMore: "장바구니쿠폰 할인금액이 결제금액을 초과 하였습니다.",
  pointPayMore: "결제금액을 초과하였습니다.",
  popPointMore: "보유한 THE POP 리워즈보다 사용하는 THE POP 리워즈가 더 많습니다.",
  popPointEmpty: "사용하실 The POP 리워즈가 없습니다.",
  gsPointEmpty: "사용가능한 GS&POINT가 없습니다.",
  gsPointMore: "보유한 포인트보다 사용하는 포인트가 더 많습니다.",
  recptGetMethoP: "공동현관출입번호를 입력해주세요.",
  hopeDelivDtEmpty: "더반찬 희망배송일을 선택해주세요.",
  noDawnDeliv: "더반찬 새벽배송이 불가능한 지역입니다.<br/>일반택배로 배송합니다",
  payFailDisTelco: "통신사할인 기간이 만료되어<br/>주문이 실패하였습니다.",
  payFailDisCard: "카드즉시할인 기간이 만료되어<br/>주문이 실패하였습니다.",
  payFailDisProm: "프로모션할인 기간이 만료되어<br/>주문이 실패하였습니다.",
  payFailDisCpn: '이미 사용된 쿠폰이 재사용되어<br/>주문이 실패하였습니다.',
  payFailStk: "상품 재고수량 부족으로<br/>주문이 불가합니다.",
  payFailGsShopStk: "GS SHOP 상품 재고수량 부족으로<br/>주문이 불가합니다.",
  ordFailDawnHopeDeliv: "더반찬 상품(새벽배송)의 희망배송일이 마감되었습니다.",
  ordFailHopeDeliv: "더반찬 상품(택배배송)의 희망배송일이 마감되었습니다.",
  ordFailGsShopApi: "GS SHOP 상품의 재고를 확인할 수 없습니다.",
  ordFailThebanchanApi: "더반찬 상품의 재고를 확인할 수 없습니다.",
  popDcChk: "결제하신 결제수단은 팝제휴가 아닙니다.",
  editTel: "통신사를 선택해주세요.",
  editGid: "gid를 입력해주세요.",
  editMid: "mid를 입력해주세요.",
  editBirth: "생년월일을 입력해주세요.",
  editCardNo: "카드번호를 입력해주세요.",
  morePoint: "3000P 부터 사용이 가능합니다.",
  pntFail: "주문결제 금액이 5만원 이상 시 사용 가능합니다.",
  productDelCntChk: "삭제할 상품을 선택해 주세요.",
  productDelConfirm: "선택한 상품을 삭제하시겠습니까?",
  hopeDelivDateFail: "희망배송일 조회에 실패하였습니다.<br/>고객센터(1661-2562)로 문의하시기 바랍니다.",
  dlvpMaxAddCnt: "배송지는 20개까지 등록 가능합니다.",
  selectMbrDlvp: '배송지를 선택해주세요.',
  selectmbrDlvpFail: "배송지 정보 조회 시 오류가 발생하였습니다.<br/>잠시 후 다시 시도 해주세요.",
  mbrDlvpFail: "배송지 연락처가 올바르지 않습니다.<br/>마이페이지 > 배송지관리 에서 연락처를 수정해주시기 바랍니다.",
  // 메세지 처리 함수
  pntFailStandAmt: function(standAmt) {
    return `주문결제 금액이 ${NumberUtils.toComma(Number(standAmt))}원 이상 시 사용 가능합니다.`;
  },
  posbBsktQty: function(type, qty) {
    return type + " 구매 수량은 " + qty + "개 입니다.";
  },
  posbBsktStkQty: function(qty, itemNm) {
    return "해당 상품의 재고 수량을 초과하였습니다.<br/>확인 후, 수량을 조정해주십시오.<br/><br/>상품명 : " + itemNm + "<br/>재고 수량 : " + qty + "개";
  },
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
    return "현금영수증 발행 " + typeNm + "확인 해주세요.";
  },
};
</script>
