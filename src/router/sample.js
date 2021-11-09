import TokenMyPage from '@/views/sample/login/MyPage.vue';
import JwtUtils from '@/common/JwtUtils';

export default [
  // axios sample
  { path: '/sample/token/signup', component: () => import('@/views/sample/login/TokenSignup.vue') },
  { path: '/sample/token/resign', component: () => import('@/views/sample/login/TokenResign.vue') },
  { path: '/sample/token/login', component: () => import('@/views/sample/login/TokenLogin.vue') },
  { path: '/sample/token/logout', component: () => import('@/views/sample/login/TokenLogout.vue') },
  {
    path: '/sample/token/my_page', component: TokenMyPage,
    beforeEnter: (to, from, next) => {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      if (isExpired) {
        next('/sample/token/login');
        return;
      }
      console.log('from:', from);
      next();
    }
  },

  { path: '/sample/user_list', component: () => import('@/views/sample/user/UserList.vue') },
  { path: '/sample/user_form', component: () => import('@/views/sample/user/UserForm.vue') },
  { path: '/sample/user/:id', component: () => import('@/views/sample/user/UserDetail.vue') },
  { path: '/sample/user_update/:id', component: () => import('@/views/sample/user/UserUpdate.vue') },

  { path: '/sample', component: () => import('@/views/sample/IndexSample.vue') },
  { path: '/sample/snippets/watch_sample', component: () => import('@/views/sample/snippets/WatchSample.vue') },
  { path: '/sample/snippets/cookie_test', component: () => import('@/views/sample/snippets/CookieTest.vue') },
  { path: '/sample/snippets/cookie_set_test', component: () => import('@/views/sample/snippets/CookieSetTest.vue') },
  { path: '/sample/snippets/cookie_get_test', component: () => import('@/views/sample/snippets/CookieGetTest.vue') },
  { path: '/sample/snippets/form_test', component: () => import('@/views/sample/snippets/FormTest.vue') },
  { path: '/sample/snippets/event_bus_test', component: () => import('@/views/sample/snippets/EventBusTest.vue') },
  { path: '/sample/snippets/validate_test', component: () => import('@/views/sample/snippets/ValidateTest.vue') },
  { path: '/sample/snippets/on_test', component: () => import('@/views/sample/snippets/OnTest.vue') },
  { path: '/sample/snippets/emit_test', component: () => import('@/views/sample/snippets/EmitTest.vue') },
  { path: '/sample/snippets/param_test', component: () => import('@/views/sample/snippets/ParamTest.vue') },
  { path: '/sample/snippets/scroll_test', component: () => import('@/views/sample/snippets/ScrollTest.vue') },
  { path: '/sample/snippets/img_test', component: () => import('@/views/sample/snippets/ImgTest.vue') },
  { path: '/sample/snippets/site_test', component: () => import('@/views/sample/snippets/SiteUtilsTest.vue') },
  { path: '/sample/snippets/share_test', component: () => import('@/views/sample/snippets/ShareTest.vue') },
  { path: '/sample/snippets/cross_login_test', component: () => import('@/views/sample/snippets/CrossLoginTest.vue') },
  { path: '/sample/snippets/alert_test', component: () => import('@/views/sample/snippets/AlertTest.vue') },
  { path: '/sample/snippets/link_test', component: () => import('@/views/sample/snippets/LinkTest.vue') },

  { path: '/sample/snippets/tms_test', component: () => import('@/views/sample/snippets/TmsTest.vue') },
  { path: '/sample/snippets/delivery_slot_test', component: () => import('@/views/sample/snippets/deliverySlotTest.vue') },
  { path: '/sample/find_address', component: () => import('@/views/sample/address/SampleAddreesSearch.vue') },
  { path: '/sample/cart_test', component: () => import('@/views/TheCartTest.vue') },
];
