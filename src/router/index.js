import Vue from 'vue';
import Router from 'vue-router';

import SampleRoutes from './sample';
import CsRoutes from './cs';
import CuRoutes from './cu';
import EvRoutes from './ev';
import OdRoutes from './od';
import PaRoutes from './pa';
import SsRoutes from './ss';
import FtRoutes from './ft';
import MdRoutes from './md';
import CookieUtils from '@/common/CookieUtils';
import ContextUtils from "@/common/ContextUtils";
import LoginUtils from '@/common/LoginUtils';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import Config from '@/common/Config';
import SiteUtils from '@/common/SiteUtils.js';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    ...CsRoutes,
    ...CuRoutes,
    ...EvRoutes,
    ...OdRoutes,
    ...PaRoutes,
    ...SampleRoutes,
    ...SsRoutes,
    ...FtRoutes,
    ...MdRoutes,
    { path: '/pgmerr', name: '500 Program Error', component: () => import('@/views/500.vue') },
    { path: '/neterr', name: '503 Network Error', component: () => import('@/views/503.vue') },
    { path: '/inspect', name: 'Inspection', component: () => import('@/views/Inspection.vue') },
    { path: '/itemerr', name: 'Item Error', component: () => import('@/views/ItemError.vue') },
    { path: '*', name: '404 Page Not Found', component: () => import('@/views/404.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          // route 이동 후 스크롤 위치 최상단으로 설정
          resolve({ x: 0, y: 0 });
        }
      }, 100);
    });
  }
});

router.beforeEach(async (to, from, next) => {
  try {
    if (app.$gsdialog) {
      app.$gsdialog.Dialog.closeDialog();
    }
    const storId = CookieUtils.getCookie('STOR_ID');
    const isRefresh = location.search.indexOf('refresh=') > -1;
    const isAppLogin = location.href.indexOf('/cu/app_login') > -1;
    if (storId === '' && !isRefresh && !isAppLogin) {
      const delimiter = location.href.indexOf('?') > -1 ? '&' : '?';
      location.href = location.href + delimiter + 'refresh=' + Date.now();
      return;
    }

    await ApiUtils.getIdToken();
    if (!JwtUtils.getEncVal() || CookieUtils.isEmptyDefaultCookie()) {
      await LoginUtils.mallChange('router/index beforeEach');
    }
  } finally {
    next();
  }
});

router.afterEach((to, from) => {
  let targetRedirectUrl;
  let cid;
  let igaweng;
  let sn;
  let ck;
  let abxtid;
  let schemeUrl;
  let intentUrl;
  let appDwIUrl;
  let appDwAUrl;

  if (to.query.gateExtension) {
    const targetRedirectUrl = to.query.targetRedirectUrl;
    let cid = to.query.cid;

    if (targetRedirectUrl.indexOf('?') > -1 && (targetRedirectUrl.indexOf('&') > -1 || targetRedirectUrl.indexOf('=') > -1)) {
      cid = '&cid=' + cid;
    } else {
      cid = '?cid=' + cid;
    }

    const igaweng = '&igaw_eng=' + to.query.igaw_eng;
    const sn = '&sn=' + to.query.sn;
    const ck = '&ck=' + to.query.ck;
    const abxtid = '&abx_tid=' + to.query.abx_tid;

    const appDwIUrl = Config.app.gsfresh.store.ios;
    const appDwAUrl = Config.app.gsfresh.store.android;
    const moveUrl = encodeURIComponent(targetRedirectUrl + cid + abxtid) + igaweng + sn + ck;
    const schemeUrl = Config.app.gsfresh.scheme + '?moveurl=' + moveUrl;
    const intentUrl = appDwAUrl + '&url=' + encodeURIComponent(Config.app.gsfresh.scheme + '?moveurl=' + moveUrl);

    console.log("##index.js intentUrl -> " + intentUrl);
    if (ContextUtils.getAgent() == "ios") {
      location.href = schemeUrl;

      setTimeout(function () {
        location.replace(appDwIUrl);
      }, 5000);
    } else if (ContextUtils.getAgent() == "android") {
      location.href = intentUrl;
    } else {
      // Not mobile
      alert("모바일웹으로 이동합니다");
      if (CookieUtils.getMallId() === '11') {
          location.href = SiteUtils.dalisalda("");
      } else {
          location.href = SiteUtils.freshmo("");
      }
    }
  }
  console.log('to', to.path, '몰:', CookieUtils.getCookie('MALL_ID'), '매장:', CookieUtils.getCookie('STOR_ID'),
  '공급사업장:', CookieUtils.getCookie('SUPPL_FIRM_CD'), '매체:', CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
  '채널:', CookieUtils.getCookie('CHANL_ID'));
});

export default router;
