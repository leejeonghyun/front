import LoginUtils from '@/common/LoginUtils';

export default [
  // Uri는 snake_case, Api는 kebab-case로 구분합니다.
  // 클레임(취소/반품/교환) 관리(신청/목록/상세/)
  { path: '/cs/claimmgnt/claim_statement_list', component: () => import('@/views/cs/claimmgnt/ClaimStatementList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } }, // 취소/반품/교환(클레임) 목록
  { path: '/cs/claimmgnt/ord_cncl_acept/:ordId/:delivId', component: () => import('@/views/cs/claimmgnt/OrdCnclAcept.vue'), beforeEnter: LoginUtils.check }, // 주문취소신청
  { path: '/cs/claimmgnt/ord_cncl_proc_sate_info/:ordId/:claimSeqno', component: () => import('@/views/cs/claimmgnt/OrdCnclProcSateInfo.vue'), beforeEnter: LoginUtils.check }, // 주문취소처리내역정보
  { path: '/cs/claimmgnt/ord_cncl_dtl/:ordId/:claimSeqno', component: () => import('@/views/cs/claimmgnt/OrdCnclDtl.vue'), beforeEnter: LoginUtils.check }, // 주문취소상세내역
  { path: '/cs/claimmgnt/ord_rtn_acept/:ordId/:delivId', component: () => import('@/views/cs/claimmgnt/OrdRtnAcept.vue'), beforeEnter: LoginUtils.check }, // 주문반품신청
  { path: '/cs/claimmgnt/ord_rtn_dtl/:ordId/:claimSeqno', component: () => import('@/views/cs/claimmgnt/OrdRtnDtl.vue'), beforeEnter: LoginUtils.check }, // 주문반품상세내역
  { path: '/cs/claimmgnt/ord_rtn_proc_sate_info/:ordId/:claimSeqno', component: () => import('@/views/cs/claimmgnt/OrdRtnProcSateInfo.vue'), beforeEnter: LoginUtils.check }, // 주문반품처리내역정보
  { path: '/cs/claimmgnt/ord_exch_acept/:ordId/:delivId', component: () => import('@/views/cs/claimmgnt/OrdExchAcept.vue'), beforeEnter: LoginUtils.check }, // 주문교환신청
  { path: '/cs/claimmgnt/ord_exch_dtl/:ordId/:claimSeqno', component: () => import('@/views/cs/claimmgnt/OrdExchDtl.vue'), beforeEnter: LoginUtils.check }, // 주문교환상세내역
  { path: '/cs/claimmgnt/ord_exch_proc_sate_info/:ordId/:claimSeqno', component: () => import('@/views/cs/claimmgnt/OrdExchProcSateInfo.vue'), beforeEnter: LoginUtils.check }, // 주문교환처리내역정보
  { path: '/cs/claimmgnt/add_payment/:ordId/:claimSeqno', component: () => import('@/views/cs/claimmgnt/AddPayment.vue'), beforeEnter: LoginUtils.check }, // 추가 결제
  { path: '/cs/claimmgnt/payment_timeout', component: () => import('@/views/cs/claimmgnt/PaymentTimeout'), beforeEnter: LoginUtils.check }, // 결제시간 초과
  { path: '/cs/claimmgnt/payment_complete', component: () => import('@/views/cs/claimmgnt/PaymentComplete'), beforeEnter: LoginUtils.check }, // 추가결제 완료
  // { path: '/cs/claimmgnt/mobile_bill', component: MobileBill, beforeEnter: LoginUtils.check }, // 전자 영수증
  { path: '/cs/claimmgnt/mobile_bill/:ordId/:claimSeqno', component: () => import('@/views/cs/recptmgnt/PopupMobileBill') }, // 전자 영수증
  { path: '/cs/claimmgnt/card_bill/:ordDt/:ordId/:paramData', component: () => import('@/views/cs/recptmgnt/PopupCardStatement'), beforeEnter: LoginUtils.check }, // 신용카드 영수증
  { path: '/cs/claimmgnt/cash_bill/:ordDt/:ordId/:storId/:paramData', component: () => import('@/views/cs/recptmgnt/PopupCashReceipt'), beforeEnter: LoginUtils.check }, // 현금 영수증
  { path: '/cs/claimmgnt/refnd_accnt_reg/:ordId', component: () => import('@/views/cs/claimmgnt/RefndAccountReg'), beforeEnter: LoginUtils.check }, // 환불계좌 등록

  // 마켓포
  { path: '/cs/mf/claimmgnt/ord_cncl_acept/:ordId/', component: () => import('@/views/cs/claimmgnt/MfOrdCnclAcept.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 주문취소신청
  { path: '/cs/mf/claimmgnt/ord_cncl_proc_sate_info/:ordId/', component: () => import('@/views/cs/claimmgnt/MfOrdCnclProcSateInfo.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 주문취소처리내역정보
  { path: '/cs/mf/claimmgnt/ord_cncl_dtl/:ordId/', component: () => import('@/views/cs/claimmgnt/MfOrdCnclDtl.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 주문취소상세내역
  { path: '/cs/mf/claimmgnt/ord_rtn_acept/:ordId/:ordDtlSeqno', component: () => import('@/views/cs/claimmgnt/MfOrdRtnAcept.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 주문반품신청
  { path: '/cs/mf/claimmgnt/ord_rtn_proc_sate_info/:ordId/', component: () => import('@/views/cs/claimmgnt/MfOrdRtnProcSateInfo.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 주문반품처리내역정보
  { path: '/cs/mf/claimmgnt/ord_rtn_dtl/:ordId/', component: () => import('@/views/cs/claimmgnt/MfOrdRtnDtl.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 주문반품상세내역
  { path: '/cs/mf/claimmgnt/ord_exch_acept/:ordId/:ordDtlSeqno', component: () => import('@/views/cs/claimmgnt/MfOrdExchAcept.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 주문교환신청
  { path: '/cs/mf/claimmgnt/ord_exch_proc_sate_info/:ordId/', component: () => import('@/views/cs/claimmgnt/MfOrdExchProcSateInfo.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 주문교환처리내역정보
  { path: '/cs/mf/claimmgnt/ord_exch_dtl/:ordId/', component: () => import('@/views/cs/claimmgnt/MfOrdExchDtl.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 주문교환상세내역
  { path: '/cs/mf/claimmgnt/refnd_accnt_reg/:ordId', component: () => import('@/views/cs/claimmgnt/MfRefndAccountReg'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 환불계좌 등록
  { path: '/cs/mf/claimmgnt/add_payment/:ordId/', component: () => import('@/views/cs/claimmgnt/MfAddPayment.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 추가 결제
  { path: '/cs/mf/claimmgnt/payment_timeout', component: () => import('@/views/cs/claimmgnt/MfPaymentTimeout'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 결제시간 초과
  { path: '/cs/mf/claimmgnt/payment_complete', component: () => import('@/views/cs/claimmgnt/MfPaymentComplete'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 추가결제 완료
  { path: '/cs/mf/claimmgnt/card_bill/:ordId/:supplFirmCd', component: () => import('@/views/cs/recptmgnt/MfPopupCardStatement'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 신용카드 영수증
  { path: '/cs/mf/claimmgnt/cash_bill/:ordId/:supplFirmCd', component: () => import('@/views/cs/recptmgnt/MfPopupCashReceipt'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포 현금 영수증


  // 상품Q&A 목록
  { path: '/cs/mbrinqr/item_qna_list', component: () => import('@/views/cs/mbrinqr/ItemQnaList.vue'), beforeEnter: LoginUtils.check }, // 상품Q&A 목록
  { path: '/cs/mbrinqr/m4_item_qna_list', component: () => import('@/views/cs/mbrinqr/M4ItemQnaList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } },

  // 1:1문의
  { path: '/cs/mbrinqr/mbr_inqr_list', component: () => import('@/views/cs/mbrinqr/MbrInqrList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 고객문의목록
  { path: '/cs/mbrinqr/mbr_inqr_reg', component: () => import('@/views/cs/mbrinqr/MbrInqrReg.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 고객문의등록

  // 공지&FAQ
  { path: '/cs/claimmgnt/claimMain', component: () => import('@/views/cs/claimmgnt/ClaimMain.vue'), name: 'claimMain', meta: { 'skinToneFlag': 'TTL' } }, // 공지사항
  { path: '/cs/mbrinqr/notice', component: () => import('@/views/cs/mbrinqr/Notice.vue'), meta: { 'skinToneFlag': 'TTL' } }, // 공지사항
  { path: '/cs/mbrinqr/faq', component: () => import('@/views/cs/mbrinqr/Faq.vue'), meta: { 'skinToneFlag': 'TTL' } }, // FAQ
  { path: '/cs/mbrinqr/faq/tabId/:tabId', component: () => import('@/views/cs/mbrinqr/Faq.vue'), meta: { 'skinToneFlag': 'TTL' } }, // FAQ
  { path: '/cs/mbrinqr/faq/searchCondition/:searchCondition', component: () => import('@/views/cs/mbrinqr/Faq.vue'), meta: { 'skinToneFlag': 'TTL' } }, // FAQ

  // 마이페이지  나의 활동 배송만족도
  { path: '/cs/deliv_stlv_list', component: () => import('@/views/cs/DelivStlvList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } }, // 마이페이지  나의 활동 배송만족도

  // 주문배송목록
  { path: '/cs/orddeliv/ord_deliv_list', component: () => import('@/views/cs/orddeliv/OrdDelivList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } }, // 주문배송목록
  { path: '/cs/orddeliv/deliv_time_chg', component: () => import('@/views/cs/orddeliv/DelivTimeChg.vue'), beforeEnter: LoginUtils.check }, // 배송시간변경
  { path: '/cs/orddeliv/real_time_deliv_posit_chk', component: () => import('@/views/cs/orddeliv/RealTimeDelivPositChk.vue'), beforeEnter: LoginUtils.check }, // 실시간 배송위치확인
  { path: '/cs/orddeliv/deliv_dlv_inq', component: () => import('@/views/cs/orddeliv/DelivDlvInq.vue'), beforeEnter: LoginUtils.check }, // 배송조회(택배)
  { path: '/cs/orddeliv/deliv_stlv_reg', component: () => import('@/views/cs/orddeliv/DelivStlvReg.vue'), beforeEnter: LoginUtils.check }, // 배송만족도
  { path: '/cs/orddeliv/ord_deliv_dtl/:ordId', component: () => import('@/views/cs/orddeliv/OrdDelivDtl.vue') }, // 주문배송상세
  { path: '/cs/mf/orddeliv/ord_deliv_dtl/:ordId', component: () => import('@/views/cs/orddeliv/MfOrdDelivDtl.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'MF' } }, // 마켓포주문배송상세

  { path: '/cs/orddeliv/delivStlvReg/:p', component: () => import('@/views/cs/orddeliv/DelivStlvReg') }, // 배송만족도 조사

  { path: '/cs/orddeliv/delivPosit/:encParam', component: () => import('@/views/cs/orddeliv/RealTimeDelivPosition') }, // 실시간 배송위치

  // 팝업
  { path: '/cs/claimmgnt/popup_delivery_personal', component: () => import('@/views/cs/claimmgnt/PopupDeliveryPersonal') }, // 고객부담배송비 안내팝업(팝업)
  { path: '/cs/claimmgnt/popup_return_info', component: () => import('@/views/cs/claimmgnt/PopupReturnInfo') }, // 결제수단별 환불처리안내(팝업)
];
