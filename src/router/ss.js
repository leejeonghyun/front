/* GATE */
export default [
  { path: '/gate', component: () => import('@/views/ss/Gate.vue') },
  { path: '/gateex', component: () => import('@/views/ss/GateExtension.vue') }, // 매체정보 수집용
  // 유입 채널 설정 게이트 페이지
  { path: '/channel_gate', component: () => import('@/views/ss/GateChannel.vue') },
  // 마이페이지 환경설정
  { path: '/ss/setting', name: "Setting", component: () => import('@/views/ss/SettingForApp.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 수령점포 찾기
  { path: '/ss/searchGS25Str', component: () => import('@/wine25/views/searchGS25Str.vue') },
];
