// 앱 / 웹 구분
const ContextUtils = {
  isNative: function () {
    let isNative = false;
    if (/gssmapp/i.test(window.navigator.userAgent)) {
      isNative = true;
    } else if (/dalisalda/i.test(window.navigator.userAgent)) {
      isNative = true;
    } else if (/marketfor/i.test(window.navigator.userAgent)) {
      isNative = true;
    }
    return isNative;
  },
  getAgent: function () {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.search("android") > -1) {
      return "android";
    } else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1 || (userAgent.search("ipad") > -1))) {
      return "ios";
    } else {
      return "";
    }
  },
  isAndroid: function () {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.search("android") > -1) {
      return true;
    } else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1 || (userAgent.search("ipad") > -1))) {
      return false;
    }
  },
};

export default ContextUtils;
