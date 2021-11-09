import LoginUtils from '@/common/LoginUtils';
import EventUtils from '@/common/ev/EventUtils';

export default [
  // uri는 snake_case, api는 kebab-case로 구분합니다.
  // 이벤트
  { path: '/ev/event/:eventId', component: () => import('@/views/ev/Event.vue'), beforeEnter: EventUtils.eventIdCheck, meta: { 'skinToneFlag': 'TTL' }},

  // 쿠폰 리스트
  { path: '/ev/coupon_list', component: () => import('@/views/ev/CouponList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' }},

  // 이벤트 리스트
  { path: '/ev/event_list', component: () => import('@/views/ev/EventList.vue'), meta: { 'skinToneFlag': 'TTL' }},

  // 당첨자발표
  { path: '/ev/event_winner/:eventId', component: () => import('@/views/ev/EventWinner.vue'), beforeEnter: EventUtils.eventIdCheck, meta: { 'skinToneFlag': 'TTL' }},

  // 이벤트 참여 리스트
  { path: '/ev/event_join_list', component: () => import('@/views/ev/EventJoinList.vue'), beforeEnter: LoginUtils.check, meta: { 'skinToneFlag': 'TTL' }},

  // 이벤트 쿠키확인용
  // { path: '/ev/evAjax', component: () => import('@/views/ev/EvAjax.vue') },
  // { path: '/ev/evCookie', component: () => import('@/views/ev/EvCookie.vue') },
];
