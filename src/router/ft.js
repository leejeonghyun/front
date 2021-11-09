export default [
  // 회원약관
  { path: '/ft/terms', component: () => import('@/views/ft/Term.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // 청소년보호약관
  { path: '/ft/youth_term', component: () => import('@/views/ft/YouthTerm.vue'), meta: { 'skinToneFlag': 'TTL' } },
  // M4 회원약관
  { path: '/ft/m4_terms', component: () => import('@/views/ft/M4Term.vue'), meta: { 'skinToneFlag': 'MF' } },
  // M4 청소년보호약관
  { path: '/ft/m4_youth_term', component: () => import('@/views/ft/M4YouthTerm.vue'), meta: { 'skinToneFlag': 'MF' } },
];
