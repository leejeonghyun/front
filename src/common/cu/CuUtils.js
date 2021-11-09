import CookieUtils from '@/common/CookieUtils';

const CuUtils = {
  /**
   * 팝업 중앙 정련 window.open() 용
   *
   * @param {string} str 문자열
   * @return {string} popupX 문자열
   */
  popupX: function (str) {
    const string = (window.screen.width / 2) - (str / 2);
    return string;
  },
  /**
   * 팝업 중앙 정련 window.open() 용
   *
   * @param {string} str 문자열
   * @return {string} popupY 문자열
   */
  popupY: function (str) {
    const string = (window.screen.height / 2) - (str / 2);
    return string;
  },
  /**
   * 다른 사이트 이동
   *
   * @return {string} 문자열
   */
  getLink: function () {
    let mall = "";
    if (CookieUtils.getCmmSteId() === '3') {
      mall = 'mf';
    } else if (CookieUtils.getMallId() === '1') {
      mall = 'fr';
    } else if (CookieUtils.getMallId() === '11') {
      mall = 'ds';
    } else {
      mall = 'fr';
    }
    const string = CookieUtils.getDomain(mall, CookieUtils.getMallId());
    return string;
    // location.href = domain+str;
  },
    /**
   * 마이페이지  이동
   *
   * @return {string} 문자열
   */
  getMyPageLink: function () {
    const string = CookieUtils.getDomain('cm', CookieUtils.getMallId()) + "/cu/my_page";
    return string;
    // location.href = domain+str;
  }
};

export default CuUtils;
