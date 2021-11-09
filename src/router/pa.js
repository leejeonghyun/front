export default [
  /* 인증 / 결제 TEST */
  { path: '/pa/card_isp_auth_template', component: () => import('@/views/pa/template/CardIspAuthTemplate.vue') },
  { path: '/pa/card_kmotion_auth_template', component: () => import('@/views/pa/template/CardKmotionAuthTemplate.vue') },
  { path: '/pa/card_xmpi_auth_template', component: () => import('@/views/pa/template/CardXmpiAuthTemplate.vue') },
  { path: '/pa/card_smpi_auth_template', component: () => import('@/views/pa/template/CardSmpiAuthTemplate.vue') },
  { path: '/pa/card_kmpi_auth_template', component: () => import('@/views/pa/template/CardKmpiAuthTemplate.vue') },
  { path: '/pa/mobilepop_auth_template', component: () => import('@/views/pa/template/MobilePopAuthTemplate.vue') },
  { path: '/pa/telcodc_auth_template', component: () => import('@/views/pa/template/TelcoDcAuthTemplate.vue') },
  { path: '/pa/easy_total_pay_auth_template', component: () => import('@/views/pa/template/EasyTotalPayAuthTemplate.vue') },
  { path: '/pa/bank_auth_template', component: () => import('@/views/pa/template/BankAuthTemplate.vue') },
  { path: '/pa/mcash_auth_template', component: () => import('@/views/pa/template/McashAuthTemplate.vue') },
  { path: '/pa/giftcard_auth_template', component: () => import('@/views/pa/template/GiftCardAuthTemplate.vue') },
  { path: '/pa/card_billing_auth_template', component: () => import('@/views/pa/template/CardBillingAuthTemplate.vue') },
  /* 운영에 배포할땐 callback url만 활성화 */
  { path: '/pa/comm_auth_kmotion_frame', component: () => import('@/views/pa/template/CommAuthKmotionFrame.vue') },
  { path: '/pa/comm_auth_kmotion_callback', component: () => import('@/views/pa/template/CommAuthKmotionCallback.vue') },
  { path: '/pa/comm_auth_pop_callback', component: () => import('@/views/pa/template/CommAuthPopCallback.vue') },
  { path: '/pa/comm_auth_frame_callback', component: () => import('@/views/pa/template/CommAuthFrameCallback.vue') },
  { path: '/pa/mobilepop_auth_callback', component: () => import('@/views/pa/template/MobilePopAuthCallback.vue') },
  { path: '/pa/easy_total_pay_auth_callback', component: () => import('@/views/pa/template/EasyTotalPayAuthCallback.vue') }
];
