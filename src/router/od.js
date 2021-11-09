export default [
  // Uri는 snake_case, Api는 kebab-case로 구분합니다.
  // 장바구니, 주문서, 선물하기
  // , beforeEnter: LoginUtils.check // 로그인 기반 화면에서 사용

  /* ******************************************************************************************************************************************
   * GS Fresh / Dalisalda / MarketFor 등의 도메인에서 Css의 Tone을 유지 하기 위해 아래 Router의 'mete' 속성 사용
   * - 메타의 Flag Code가 의미하는 명  : 'skinToneFlag': 'MF'(Market For) / 'GSF'(GS Fresh,달리살다,새벽배송 등 Market For 제외) / 'TTL'(통합화면)
   * ******************************************************************************************************************************************/
  { path: '/od/bskt', component: () => import('@/views/od/MfTheBasketMain.vue'), name: 'theBasket', meta: { 'skinToneFlag': 'TTL' }},
  { path: '/od/ordersheet/:ordId', component: () => import('@/views/od/OrderSheet.vue'), name: 'ordersheet', props: true },
  { path: '/od/order_complate/:ordId', component: () => import('@/views/od/OrderComplete.vue'), name: 'orderComplete', props: true },
  { path: '/od/mult_deliv_order_sheet/:ordId', component: () => import('@/views/od/MultDelivOrderSheet.vue'), name: 'multDelivOrderSheet', props: true },
  { path: '/od/pickup_order_sheet', component: () => import('@/views/od/PkupOrderSheet.vue') },
  { path: '/od/pkup_str_opt_order_sheet', component: () => import('@/views/od/PkupStrOptOrderSheet.vue') },
  { path: '/od/gift_order_sheet/:ordId', component: () => import('@/views/od/GiftOrderSheet.vue'), name: 'giftOrderSheet', props: true },
  { path: '/od/gift_order_complete/:ordId', component: () => import('@/views/od/GiftOrderComplete.vue'), name: 'giftOrderComplete', props: true },
  { path: '/od/gift_give_cart', component: () => import('@/views/od/GiftGiveCart.vue'), name: 'GiftGiveCart'},
  { path: '/od/gift_rcv_complete/:ordId', component: () => import('@/views/od/GiftRcvComplete.vue'), name: 'GiftRcvComplete', props: true },
  { path: '/od/gift_rcv_dlv/:ordId', component: () => import('@/views/od/GiftRcvDlv.vue'), name: 'giftRcvDlv', props: true },
  { path: '/od/resv_deliv_slot_ospt/:ordId/:delivId', component: () => import('@/views/od/PopupTimeSelect.vue'), name: 'PopupTimeSelect', props: true },
  { path: '/od/multi-deliv-bskt', component: () => import('@/views/od/TheMultiDeliveryBasket.vue'), name: 'multiDelivBskt' },
  { path: '/od/paySheet/:ordId/:totAmt/:productNm', component: () => import('@/views/od/PaySheet.vue'), name: 'paySheet', props: true },
  { path: '/od/boxMapResponse', component: () => import('@/views/od/BoxMapResponse.vue'), name: 'boxMapResponse', props: true},
  // Market For 장바구니, 주문서
  { path: '/od/mf/bskt', component: () => import('@/views/od/MfTheBasketMain.vue'), name: 'mfTheBasketMain', meta: { 'skinToneFlag': 'TTL' }},
  { path: '/od/mf/ordersheet/:ordId', component: () => import('@/views/od/MfOrderSheet.vue'), name: 'mfOrderSheet', props: true, meta: { 'skinToneFlag': 'MF' } },
  { path: '/od/mf/order_complate/:ordId', component: () => import('@/views/od/MfOrderComplete.vue'), name: 'mfOrderComplete', props: true, meta: { 'skinToneFlag': 'MF' } },
  { path: '/od/mf/order_failed/', component: () => import('@/views/od/MfOrderFailed.vue'), name: 'mfOrderFailed', props: true, meta: { 'skinToneFlag': 'MF' } },
];
