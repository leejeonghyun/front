import LoginUtils from '@/common/LoginUtils';

export default [
  // 마이페이지 - main
  { path: '/cu/my_page', component: () => import('@/views/cu/mypgmgnt/MyPageMain.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  // 배송지관리 - 배송지 목록, 추가, 수정
  { path: '/cu/delivery_place_list', component: () => import('@/views/cu/mypgmgnt/DeliveryPlaceList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/delivery_place_add', component: () => import('@/views/cu/mypgmgnt/DeliveryPlaceAdd.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/delivery_place_update/:id', component: () => import('@/views/cu/mypgmgnt/DeliveryPlaceUpdate.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/delivery_information_update/:id', component: () => import('@/views/cu/mypgmgnt/DeliveryInformationUpdate.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 회원가입
  { path: '/cu/join_member', component: () => import('@/views/cu/mbrmgnt/JoinMember.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/join_member/:id', component: () => import('@/views/cu/mbrmgnt/JoinMember.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/join_member_detail', component: () => import('@/views/cu/mbrmgnt/JoinMemberDtl.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/join_member_emaildetail', component: () => import('@/views/cu/mbrmgnt/JoinMemberEmailDtl.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/join_member_snsdetail', component: () => import('@/views/cu/mbrmgnt/JoinMemberSnsDtl.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/kmc_confirm', component: () => import('@/views/cu/mbrmgnt/KMCConfirm.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pop_signup_gsfinish', component: () => import('@/views/cu/mbrmgnt/PopupSignUpGSfinish.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/join_rcmd/:id', component: () => import('@/views/cu/mbrmgnt/JoinMember.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/join_rcmd', component: () => import('@/views/cu/mbrmgnt/JoinRcmd.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pop_offline_member', component: () => import('@/views/cu/mbrmgnt/PopupOfflineMember.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 회원정보수정
  { path: '/cu/password_re_check', component: () => import('@/views/cu/mbrmgnt/PasswordReCheck.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/associate_member_modify', name: 'associatemembermodify', component: () => import('@/views/cu/mbrmgnt/AssociateMemberModify.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/regular_member_modify', name: 'regularmembermodify', component: () => import('@/views/cu/mbrmgnt/RegularMemberModify.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 회원약관
  { path: '/cu/pop_gsfres_memberterms', component: () => import('@/views/cu/mbrmgnt/PopupGSfreshMemberTerms.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pop_gsfres_memberterms/:title/:code', component: () => import('@/views/cu/mbrmgnt/PopupGSfreshMemberTerms.vue'), props: true, meta: { 'skinToneFlag': 'TTL' } },
  // 로그인
  { path: '/cu/login', component: () => import('@/views/cu/loginmgnt/TheLogin.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/snslogin', component: () => import('@/views/cu/loginmgnt/TheSnsLogin.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/app_login', component: () => import('@/views/cu/loginmgnt/AppLogin.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/snsnavercallback', component: () => import('@/views/cu/loginmgnt/SnsNaverCallback.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/snskakaocallback', component: () => import('@/views/cu/loginmgnt/SnsKakaoCallback.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/snsfbcallback', component: () => import('@/views/cu/loginmgnt/SnsFbCallback.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/snspaycocallback', component: () => import('@/views/cu/loginmgnt/SnsPaycoCallback.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/find_id_password', component: () => import('@/views/cu/loginmgnt/FindIdPassword.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/find_id_password/:id', component: () => import('@/views/cu/loginmgnt/FindIdPassword.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/find_id_reslt', component: () => import('@/views/cu/loginmgnt/FindIdReslt.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pop_dormant_account', component: () => import('@/views/cu/loginmgnt/PopupDormantAccount.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pop_agreement', component: () => import('@/views/cu/loginmgnt/PopupAgreement.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/crm_login', component: () => import('@/views/cu/loginmgnt/CrmLoginError.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/multilogin', component: () => import('@/views/cu/loginmgnt/MultiLogin.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/via', component: () => import('@/views/cu/loginmgnt/Via.vue') },
  // 성인본인인증
  { path: '/cu/product_adult_certify', component: () => import('@/views/cu/loginmgnt/ProductAdultCertify.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  // 회원 탈퇴
  { path: '/cu/member_withdrawal', component: () => import('@/views/cu/mypgmgnt/MemberWithdrawal.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 회원등급 정회원/ 준회원
  { path: '/cu/regular_member_grade', component: () => import('@/views/cu/mypgmgnt/RegularMemberGrade.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/associate_member_grade', component: () => import('@/views/cu/mypgmgnt/AssociateMemberGrade.vue'), meta: { 'skinToneFlag': 'TTL' }},
  // GS포인트, GS리워드, 쿠폰목록
  { path: '/cu/regular_member_point_list', component: () => import('@/views/cu/mypgmgnt/RegularMemberPointDetail.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/regular_member_rewards_list', component: () => import('@/views/cu/mypgmgnt/RegularMemberRewardsDetail.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/my_page_coupon_list', component: () => import('@/views/cu/mypgmgnt/MyPageCouponList.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/associate_member_point', component: () => import('@/views/cu/mypgmgnt/AssociateMemberPoint.vue'), meta: { 'skinToneFlag': 'TTL' }},
  { path: '/cu/associate_member_rewards', component: () => import('@/views/cu/mypgmgnt/AssociateMemberRewards.vue'), meta: { 'skinToneFlag': 'TTL' }},
  // 마이페이지:쿠폰목록
  { path: '/cu/pop_item_list_default', name: 'PopupItemListDefault', component: () => import('@/views/cu/mypgmgnt/PopupItemListDefault.vue') },
  { path: '/cu/pop_unapplicable_coupon', name: 'PopupUnapplicableCoupon', component: () => import('@/views/cu/mypgmgnt/PopupUnapplicableCoupon.vue') },
  { path: '/cu/pop_applicable_coupon', name: 'PopupApplicableCoupon', component: () => import('@/views/cu/mypgmgnt/PopupApplicableCoupon.vue') },
  { path: '/cu/pop_use_place', name: 'PopupUsePlace', component: () => import('@/views/cu/mypgmgnt/PopupUsePlace.vue') },
  // 유료멤버십
  { path: '/cu/pbms_join/:id/:mbrJoinMethod', component: () => import('@/views/cu/pmbsmgnt/PbmsJoin.vue'), beforeEnter: LoginUtils.check, props: true, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_join/:id', component: () => import('@/views/cu/pmbsmgnt/PbmsJoin.vue'), beforeEnter: LoginUtils.check, props: true, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_join', component: () => import('@/views/cu/pmbsmgnt/PbmsJoin.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_info', component: () => import('@/views/cu/pmbsmgnt/PbmsInfo.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_gift', component: () => import('@/views/cu/pmbsmgnt/PbmsGift.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_coupon', component: () => import('@/views/cu/pmbsmgnt/PbmsCoupon.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_use_history', component: () => import('@/views/cu/pmbsmgnt/PbmsUseHistory.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_join_complete', component: () => import('@/views/cu/pmbsmgnt/PbmsJoinComplete.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_payment_gift', component: () => import('@/views/cu/pmbsmgnt/PbmsPaymentGift.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_send_gift_complete', component: () => import('@/views/cu/pmbsmgnt/PbmsSendGiftComplete.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_view_gift', component: () => import('@/views/cu/pmbsmgnt/PbmsViewGift.vue'), meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_coupon_registration', component: () => import('@/views/cu/pmbsmgnt/PbmsCouponRegistration.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/pbms_leave', component: () => import('@/views/cu/pmbsmgnt/PbmsLeave.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  { path: '/cu/app_install', component: () => import('@/views/cu/pmbsmgnt/AppInstall.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 마이페이지:자주구매한상품
  { path: '/cu/my_page_personalize_purchase', component: () => import('@/views/cu/mypgmgnt/MyPagePersonalizePurchase.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 마이페이지:최근본상품
  { path: '/cu/my_page_recent_item', component: () => import('@/views/cu/mypgmgnt/MFMyPageRecentItem.vue') },
  { path: '/cu/my_page_m4_recent_item', component: () => import('@/views/cu/mypgmgnt/MFMyPageRecentItem.vue'), meta: { 'skinToneFlag': 'MF' } },
  // 마이페이지:선물하기
  { path: '/cu/gift_bowing', component: () => import('@/views/cu/mypgmgnt/GiftBowing.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 마이페이지 상품평
  { path: '/cu/my_page_review_list', component: () => import('@/views/cu/mypgmgnt/MyPageReviewList.vue') },
  { path: '/cu/my_page_m4_review_list', component: () => import('@/views/cu/mypgmgnt/M4MyPageReviewList.vue'), meta: { 'skinToneFlag': 'MF' } },
  // 마이페이지 SNS연동/로그인 설정
  { path: '/cu/login_settings', component: () => import('@/views/cu/mypgmgnt/LoginSettings.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  // 마이페이지 알림함
  { path: '/cu/my_page_notice', component: () => import('@/views/cu/mypgmgnt/MyPageNotice.vue') },
  { path: '/cu/my_page_notice/:stock', component: () => import('@/views/cu/mypgmgnt/MyPageNotice.vue'), beforeEnter: LoginUtils.check},
  { path: '/cu/m4_my_page_notice', component: () => import('@/views/cu/mypgmgnt/M4MyPageNotice.vue'), meta: { 'skinToneFlag': 'MF' } },
  // 보낸선물 상세
  { path: '/cu/sent_gift_detail/:ordId', component: () => import('@/views/cu/mypgmgnt/SentGiftDetail.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
  // 받은선물 상세
  { path: '/cu/received_gift_detail/:ordId', component: () => import('@/views/cu/mypgmgnt/ReceivedGiftDetail.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' } },
];
