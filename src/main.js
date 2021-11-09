import Vue from 'vue';
import VueMeta from 'vue-meta';
import WebFont from 'webfontloader';
import VueGsDialog from './plugin/gsdialog/index';
import Vuelidate from 'vuelidate';
import VueLazyload from 'vue-lazyload';

import App from '@/App.vue';
import router from "./router";
import store from "./store";
import GsLink from "@/components/common/GsLink.vue";
import VueGtag from "vue-gtag";
import Config from '@/common/Config';
import CookieUtils from '@/common/CookieUtils';

import 'swiper/dist/css/swiper.css';
import './scss/notoSansKR.css';
import './scss/reset.css';
import './scss/_reset.css';
import './scss/style.scss';
import './scss/_Roboto.css';
import './scss/_m4_style.scss';
import './plugin/gsdialog/styles/default.css';
import globalConstant from './common/GlobalConstant.js';

Vue.config.productionTip = false;

Vue.component('gs-link', GsLink);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});
Vue.use(VueGsDialog);
Vue.use(Vuelidate);
Vue.use(VueLazyload, { attempt: 1, });
Vue.prototype.globalConstant = globalConstant;

let googleTagId = '';
if (CookieUtils.getCmmSteId() == '1') {
  googleTagId = Config.tracking.gsfreshTrackId.googleTagId;
} else {
  googleTagId = Config.tracking.dalisaldaTrackId.googleTagId;
}

// gtag
Vue.use(VueGtag, {
  config: { id: "AW-827320465" },
  includes: [
    { id: googleTagId },
  ],
}, router);

console.log(process.env, 'api server');

WebFont.load({
  custom: {
    families: ["NotoSansKR:n3,n4,n5,n7"]
  },
  active: function () {
    window.app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
