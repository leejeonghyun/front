import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker';

const AppBase = {
  init: function(store) {
    CookieUtils.getMallId();
    CookieUtils.getCmmSteId();
    CookieUtils.getMdaType();
    CookieUtils.getOdBsktUuid();
    this.initTracker(store);
  },
  initTracker: function(store) {
    Tracker.init(store);
    // setTimeout(this.initStat, 500);
  },
  initStat: function() {
    // GA, Facebook
    // vue 메타등 SPA 동작 시 별도의 처리를 진행하는 함수
    Tracker.updatePage();
  },
};

export default AppBase;
