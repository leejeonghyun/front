import StringUtils from './StringUtils';
import Config from './Config';

const CookieUtils = {
  setCookie: function (cookieName, value, exdays, rawFlag) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    const firstDomain = this.getFirstDomain();
    const cValue = (rawFlag === true) ? value : window.btoa(escape(value));
    let cookieValue =
      cValue + '; domain=' + firstDomain + '; path=/' + (exdays === null ? '' : '; expires=' + exdate.toUTCString());

    try {
      if (firstDomain !== 'localhost' && process.env.VUE_APP_MODE !== 'local') {
        cookieValue += ';samesite=none; secure';
      }
    } catch (e) {
      cookieValue += ';samesite=none; secure';
    }
    document.cookie = cookieName + "=" + cookieValue;
  },

  getFirstDomain() {
    const host = location.host;
    if (host.indexOf('localhost') > -1) {
      return 'localhost';
    }

    let isLocal = false;
    try {
      isLocal = process.env.VUE_APP_MODE === 'local';
    } catch (e) {}

    if (isLocal) {
      const list = host.split(':');
      if (list.length > 0) {
        return list[0];
      } else {
        return host;
      }
    } else {
      const list = host.split('.');
      if (list.length > 2) {
        list.splice(0, 1);
      }
      let firstDomain = '.' + list.join('.');
      firstDomain = firstDomain.split(':').splice(0, 1).join('');
      return firstDomain;
    }
  },

  getCookie: function (cookieName, rawFlag) {
    const cookies = document.cookie.split(';');
    const list = cookies.map(cookie => cookie.split('='));
    const result = list.filter(item => StringUtils.trim(item[0]) === cookieName);
    let value = '';
    try {
      value = (rawFlag === true) ? result[0][1] : window.atob(result[0][1]);
    } catch (e) { }
    return result.length > 0 ? unescape(value) : '';
  },

  deleteCookie: function (cookieName) {
    this.setCookie(cookieName, '', -1);
  },

  /**
   * mall id.
   * @return {string} mall id gsfresh: 1, dalisalda: 11
   */
  getMallId: function () {
    const map = {
      'gsfresh': '1',
      'dalisalda': '11',
      'marketfor': '1',
      '7000': '1',
      '7100': '1',
      '7300': '1', // marketfor (개발 중 임시사용)
      '7400': '1',
      '7200': '11'
    };
    const mallId = this.getId(map);
    this.setCookie('mall', mallId);
    return mallId;
  },
  getId(map) {
    let id = '';
    let isLocal = false;
    try {
      isLocal = (process.env.VUE_APP_MODE === 'local' || location.host.indexOf('localhost') > -1);
    } catch (e) {}

    if (isLocal) {
      const params = new URLSearchParams(location.search);
      const returnUrlNonLogin = params.get('returnUrlNonLogin');
      if (!!returnUrlNonLogin) {
        Object.keys(map).forEach((e) => {
          if (returnUrlNonLogin.includes(e)) {
            id = map[e];
          }
        });
      } else {
        Object.keys(map).forEach((e) => {
          if (location.host.includes(e)) {
            id = map[e];
          }
        });
      }
    } else {
      Object.keys(map).forEach((e) => {
        if (location.host.includes(e)) {
          id = map[e];
        }
      });
    }
    return id || '1';
  },

  /**
   * commerce site id
   * @return {string} comSteId gsfresh: 1, dalisalda: 2, marketfor: 3
   */
  getCmmSteId: function () {
    const map = {
      'gsfresh': '1',
      'dalisalda': '2',
      'marketfor': '3',
      '7000': '1',
      '7100': '1',
      // '7300': '1', // gsfresh
      '7300': '3', // marketfor (개발 중 임시사용)
      '7400': '1',
      '7200': '2'
    };
    const cmmSteId = this.getId(map);
    // this.setCookie('cmmSteId', cmmSteId || '1');
    this.setCookie('cmmSteId', cmmSteId || '3'); // (개발 중 임시사용)
    return cmmSteId;
  },

  /**
   * 미디어 타입
   * @return {string} mdaType pc: 01, mobile: 02, gsFresh App: 03, dalisalda App: 04
   */
  getMdaType: function () {
    const map = {
      '/gs': '01',
      '/www': '01',
      '/my.': '01',
      '/m.': '02',
      '/my-m.': '02',
      '/pjt1-m.': '02',
      '/pjt1-my-m.': '02',
      '7000': '02',
      '7200': '02',
      '7300': '02',
      '7100': '01',
      '7400': '01'
    };
    let mdaType = '';
    const org = location.origin;
    if (org) {
      Object.keys(map).forEach((e) => {
        if (org.includes(e)) {
          mdaType = map[e];
        }
      });
    }
    if (/gssmapp/i.test(window.navigator.userAgent)) {
      mdaType = '03';
      if (this.getCmmSteId() === '2') {
        mdaType = '04';
      }
    } else if (/dalisalda/i.test(window.navigator.userAgent)) {
      mdaType = '04';
      if (this.getCmmSteId() === '1') {
        mdaType = '03';
      }
    } else if (/marketfor/i.test(window.navigator.userAgent)) {
      mdaType = '05';
      if (this.getCmmSteId() === '3') {
        mdaType = '05';
      }
    }
    this.setCookie('media', mdaType || '02');
    return mdaType || '02';
  },
  /**
   * 채널ID 조회
   * @return {string} chanlId
   *                  1: Fresh PC URL 직접, 2: Fresh MC URL 직접 등 TB_DP_CHANL 테이블 참조
   */
  getChanlId() {
    // 미디어타입
    const mdaType = this.getMdaType();
    // 사이트ID
    const cmmSteId = this.getCmmSteId();
    // 채널ID
    let chanlId = this.getChanlIdForParam() || '';

    // 직접 유입일 경우 채널ID 세팅
    if (chanlId === '') {
      if (mdaType === '01') {
        if (cmmSteId === '1') {
          chanlId = '1';
        } else {
          chanlId = '50';
        }
      } else if (mdaType === '02') {
        if (cmmSteId === '1') {
          chanlId = '2';
        } else if (cmmSteId === '2') {
          chanlId = '4';
        } else if (cmmSteId === '3') {
          chanlId = '1010';
        } else {
          chanlId = '50';
        }
      } else if (mdaType === '03') {
        chanlId = '3';
      } else if (mdaType === '04') {
        chanlId = '5';
      } else if (mdaType === '05') {
        chanlId = '1009';
      } else {
        chanlId = '50';
      }

      // 채널 ID 쿠키 생성
      this.setCookie('CHANL_ID', chanlId);
    }
    return chanlId;
  },
  /**
   * 채널 파라미터(inflowChannel) 값 조회
   * @return {string} inflowChannel
   */
  getChanlIdForParam() {
    const uri = location.search.split('?');
    let inflowChannel = '';

    if (uri.length == 2) {
      const values = uri[1].split('&');
      const rtnParams = {};
      let tmpParam = '';
      values.forEach(function (v) {
        tmpParam = v.split('=');
        if (tmpParam.length == 2) {
          rtnParams[tmpParam[0]] = tmpParam[1];
          if (tmpParam[0] == 'inflowChannel') {
            inflowChannel = tmpParam[1];
          }
        }
      });
    }
    return inflowChannel;
  },
  /**
   * 새벽배송/당일배송/달리살다 컬러(CSS)분기 처리 함수
   */
  addClassAppDiv: function () {
    const that = this;
    const mallId = this.getCookie('MALL_ID');
    const storId = this.getCookie('STOR_ID');
    const cmmSteId = this.getCookie('cmmSteId');
    const divs = document.querySelectorAll('#app > div');
    const skinToneFlag = this.getSkinToneFlag();
    divs.forEach(function (currentValue, index, array) {
      if (!currentValue.classList.contains('skip-nav')) {
        if (skinToneFlag === 'MF') {
          currentValue.classList.remove(['gsfresh', 'dalisalda', 'daybreak']);
          currentValue.classList.add(['marketfor']);
        } else if (skinToneFlag === 'TTL') {
          if (cmmSteId == '3') {
            currentValue.classList.remove(['gsfresh', 'dalisalda', 'daybreak']);
            currentValue.classList.add(['marketfor']);
          } else if (mallId == '11') {
            currentValue.classList.remove(['gsfresh', 'daybreak', 'marketfor']);
            currentValue.classList.add(['dalisalda']);
          } else if (storId == '2287') {
            currentValue.classList.remove(['gsfresh', 'dalisalda', 'marketfor']);
            currentValue.classList.add(['daybreak']);
          } else {
            currentValue.classList.remove(['dalisalda', 'daybreak', 'marketfor']);
            currentValue.classList.add(['gsfresh']);
          }
        } else {
          if (mallId == '11') {
            currentValue.classList.remove(['gsfresh', 'daybreak', 'marketfor']);
            currentValue.classList.add(['dalisalda']);
          } else if (storId == '2287') {
            currentValue.classList.remove(['gsfresh', 'dalisalda', 'marketfor']);
            currentValue.classList.add(['daybreak']);
          } else {
            currentValue.classList.remove(['dalisalda', 'daybreak', 'marketfor']);
            currentValue.classList.add(['gsfresh']);
          }
        }
      }
    });
  },

  /**
  * 연관 서버 도메인
  *
  * @param {string} src, fr: gsfresh, ds: dalisalda, mf:marketfor , cm: common
  * @param {string} mallId optional
  * @return {string} domain
  */
  getDomain: function (src, mallId) {
    const domainMap = {
      'fr_1_01': Config.server.GSFRESH_PC,
      'fr_1_02': Config.server.GSFRESH_MO,
      'fr_1_03': Config.server.GSFRESH_MO,
      'fr_1_04': Config.server.GSFRESH_MO,
      'fr_1_05': Config.server.GSFRESH_MO,
      'ds_11_02': Config.server.DALISALDA_MO,
      'ds_11_03': Config.server.DALISALDA_MO,
      'ds_11_04': Config.server.DALISALDA_MO,
      'ds_11_05': Config.server.DALISALDA_MO,
      'cm_1_01': Config.server.COMMON_FR_PC,
      'cm_1_02': Config.server.COMMON_FR_MO,
      'cm_1_03': Config.server.COMMON_FR_MO,
      'cm_1_04': Config.server.COMMON_FR_MO,
      'cm_1_05': Config.server.COMMON_FR_MO,
      'cm_11_02': Config.server.COMMON_DS_MO,
      'cm_11_03': Config.server.COMMON_DS_MO,
      'cm_11_04': Config.server.COMMON_DS_MO,
      'cm_11_05': Config.server.COMMON_DS_MO,
      'cm_3_02': Config.server.COMMON_MF_MO,
      'cm_3_03': Config.server.COMMON_MF_MO,
      'cm_3_04': Config.server.COMMON_MF_MO,
      'cm_3_05': Config.server.COMMON_MF_MO,
      'mf_1_02': Config.server.MARKETFOR_MO,
      'mf_1_03': Config.server.MARKETFOR_MO,
      'mf_1_04': Config.server.MARKETFOR_MO,
      'mf_1_05': Config.server.MARKETFOR_MO,
    };
    if (src === 'mf') {
      mallId = '1';
    }
    const _mallId = mallId || this.getMallId();
    const key = src + '_' + _mallId + '_' + this.getMdaType();
    const domain = domainMap[key];

    return domain || Config.server.GSFRESH_MO;
  },

  getMallParams: function () {
    const params = {
      storId: this.getCookie('STOR_ID'),
      supplFirmCd: this.getCookie('SUPPL_FIRM_CD'),
      mallId: this.getCookie('MALL_ID'),
      steConnMdaTypeCd: this.getCookie('STE_CONN_MDA_TYPE_CD'),
    };
    return params;
  },
  clearAllCookies() {
    this.deleteCookie('CUST_NM');
    this.deleteCookie('WEB_ID');
    this.deleteCookie('CUST_GRD_CD');
    this.deleteCookie('PMBS_JOIN_PRCN_CD');
    this.deleteCookie('STOR_ID');
    this.deleteCookie('SUPPL_FIRM_CD');
    this.deleteCookie('MALL_ID');
    this.deleteCookie('STE_CONN_MDA_TYPE_CD');
    this.deleteCookie('MBR_TYPE_CD');
    this.deleteCookie('CHANL_ID');
    this.deleteCookie('SIMPLE_STOR_ID');
    this.deleteCookie('SIMPLE_SUPPL_FIRM_CD');
    this.deleteCookie('SIMPLE_MALL_ID');
    this.deleteCookie('DAYBREAK_STOR_ID');
    this.deleteCookie('DAYBREAK_SUPPL_FIRM_CD');
    this.deleteCookie('ADULT_AUTH_DATE');
    this.deleteCookie('OD_BSKT_UUID');
    this.deleteCookie('ORG_STOR_ID');
    this.deleteCookie('ORG_SUPPL_FIRM_CD');
    this.deleteCookie('mall');
    this.deleteCookie('cmmSteId');
    this.deleteCookie('media');
    this.deleteCookie('showDaybreak');
    localStorage.removeItem('skinToneFlag');
  },
  setLoginCookies(user) {
    if (user) {
      if (!StringUtils.isEmpty(user.custNm) && user.custNm != 'null') {
        this.setCookie('CUST_NM', user.custNm);
      }
      if (!StringUtils.isEmpty(user.webId) && user.webId != 'null') {
        this.setCookie('WEB_ID', user.webId);
      }
      if (!StringUtils.isEmpty(user.custGrdCd) && user.custGrdCd != 'null') {
        this.setCookie('CUST_GRD_CD', user.custGrdCd);
      }
      if (!StringUtils.isEmpty(user.pmbsJoinPrcnCd) && user.pmbsJoinPrcnCd != 'null') {
        this.setCookie('PMBS_JOIN_PRCN_CD', user.pmbsJoinPrcnCd);
      }
      if (!StringUtils.isEmpty(user.storId) && user.storId != 'null') {
        this.setCookie('STOR_ID', user.storId);
      }
      if (!StringUtils.isEmpty(user.supplFirmCd) && user.supplFirmCd != 'null') {
        this.setCookie('SUPPL_FIRM_CD', user.supplFirmCd);
      }
      if (!StringUtils.isEmpty(user.mallId) && user.mallId != 'null') {
        this.setCookie('MALL_ID', user.mallId);
      }
      if (!StringUtils.isEmpty(user.mdaType) && user.mdaType != 'null') {
        this.setCookie('STE_CONN_MDA_TYPE_CD', user.mdaType);
      }
      if (!StringUtils.isEmpty(user.mbrTypeCd) && user.mbrTypeCd != 'null') {
        this.setCookie('MBR_TYPE_CD', user.mbrTypeCd);
      }
      if (!StringUtils.isEmpty(user.chanlId) && user.chanlId != 'null') {
        this.setCookie('CHANL_ID', user.chanlId);
      }
      if (!StringUtils.isEmpty(user.simpleStorId) && user.simpleStorId != 'null') {
        this.setCookie('SIMPLE_STOR_ID', user.simpleStorId);
      }
      if (!StringUtils.isEmpty(user.simpleSupplFirmCd) && user.simpleSupplFirmCd != 'null') {
        this.setCookie('SIMPLE_SUPPL_FIRM_CD', user.simpleSupplFirmCd);
      }
      if (!StringUtils.isEmpty(user.simpleMallId) && user.simpleMallId != 'null') {
        this.setCookie('SIMPLE_MALL_ID', user.simpleMallId);
      }
      if (!StringUtils.isEmpty(user.daybreakStorId) && user.daybreakStorId != 'null') {
        this.setCookie('DAYBREAK_STOR_ID', user.daybreakStorId);
      }
      if (!StringUtils.isEmpty(user.daybreakSupplFirmCd) && user.daybreakSupplFirmCd != 'null') {
        this.setCookie('DAYBREAK_SUPPL_FIRM_CD', user.daybreakSupplFirmCd);
      }
      if (!StringUtils.isEmpty(user.orgStorId) && user.orgStorId != 'null') {
        this.setCookie('ORG_STOR_ID', user.orgStorId);
      }
      if (!StringUtils.isEmpty(user.orgSupplFirmCd) && user.orgSupplFirmCd != 'null') {
        this.setCookie('ORG_SUPPL_FIRM_CD', user.orgSupplFirmCd);
      }
      if (!StringUtils.isEmpty(user.adultAuthDate) && user.adultAuthDate != 'null') {
        this.setCookie('ADULT_AUTH_DATE', user.adultAuthDate);
      }
      if (!StringUtils.isEmpty(user.daliStorId) && user.daliStorId != 'null') {
          this.setCookie('DALI_STOR_ID', user.daliStorId);
      }
      if (!StringUtils.isEmpty(user.daliSupplFirmCd) && user.daliSupplFirmCd != 'null') {
          this.setCookie('DALI_SUPPL_FIRM_CD', user.daliSupplFirmCd);
      }
      if (CookieUtils.getCmmSteId() == '3') {
        this.setCookie('CHANL_ID', CookieUtils.getChanlId());
      }
    }
  },

  getMetaInfoTitle() {
    let metaInfoTitle = '';
    const mallId = this.getCookie('MALL_ID');
    const cmmSteId = this.getCmmSteId();
    if (cmmSteId == '3') {
      metaInfoTitle = 'Market For';
    } else if (mallId == '11') {
      metaInfoTitle = '달리살다';
    } else {
      metaInfoTitle = 'GS 프레시몰';
    }
      return metaInfoTitle;
  },

  uuidgen() {
    /**
     * uuid
     * @return {string} random number
     */
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },

  getOdBsktUuid() {
    const cookieName = 'OD_BSKT_UUID';
    let odBsktUuid = this.getCookie(cookieName);

    if (!odBsktUuid) {
      odBsktUuid = this.uuidgen();
      this.setCookie(cookieName, odBsktUuid);
    }

    return odBsktUuid;
  },

  /**
   * 색상 분기 class명 가져오기
   *
   * @return {string} className: gsfresh, dalisalda, daybreak
   */
  getSiteClass: function () {
    const mallId = this.getCookie('MALL_ID');
    const siteId = this.getCmmSteId();
    const skinToneFlag = this.getSkinToneFlag();
    console.log("쿠키값 몰 ::", mallId);
    console.log("Site ID ::", siteId);
    let className = 'gsfresh';

    // 최초는 gsfresh class
    if (skinToneFlag === 'MF') {
      className = 'marketfor';
    } else if (skinToneFlag === 'TTL') {
      if (siteId === '3') { // Market For siteId : 3
        className = 'marketfor';
      } else if (mallId === '11') { // 달리살다 판단 mallId : 11
        className = 'dalisalda';
      } else if (this.isDaybreak()) { // 새벽배송여부 판단
        className = 'daybreak';
      }
    } else {
      if (mallId === '11') { // 달리살다 판단 mallId : 11
        className = 'dalisalda';
      } else if (this.isDaybreak()) { // 새벽배송여부 판단
        className = 'daybreak';
      }
    }

    return className;
  },

  getSkinToneFlag: function () {
    const skinToneFlag = localStorage.getItem('skinToneFlag') || 'GSF';
    localStorage.setItem('skinToneFlag', skinToneFlag);
    return skinToneFlag;
  },

  /**
   * 새벽배송 파라미터 체크 후 쿠키 세팅.
   */
  setDaybreakCookie: async function () {
    const uri = location.search.split('?');
    let showDaybreak = 'N';

    if (uri.length === 2) {
      const values = uri[1].split('&');
      const rtnParams = {};
      let tmpParam = '';

      values.forEach(function (v) {
        tmpParam = v.split('=');

        if (tmpParam.length === 2) {
          rtnParams[tmpParam[0]] = tmpParam[1];

          if (tmpParam[0] === 'showDaybreak') {
            showDaybreak = tmpParam[1];
          }
        }
      });
    }
    this.setCookie('showDaybreak', showDaybreak);
  },
  /**
   * 새벽배송 전시여부
   *
   * @return {boolean} true: 새벽배송, false: 당일배송
   */
  isDaybreak: function () {
    return this.getCookie('showDaybreak') === 'Y';
  },
  isDayBreak: function () {
    return this.getCookie('showDaybreak') === 'Y';
  },
  /**
   * 비로그인 기본 5종 쿠키 체크
   * @return {boolean} true(비정상), false(정상)
   */
  isEmptyDefaultCookie: function () {
    // 몰 체크
    if (StringUtils.isEmpty(this.getCookie('MALL_ID'))) {
      return true;
    }
    // 매장 체크
    if (StringUtils.isEmpty(this.getCookie('STOR_ID'))) {
      return true;
    }
    // 공급사업장 체크
    if (StringUtils.isEmpty(this.getCookie('SUPPL_FIRM_CD'))) {
      return true;
    }
    // 매체 체크
    if (StringUtils.isEmpty(this.getCookie('STE_CONN_MDA_TYPE_CD'))) {
      return true;
    }
    // 채널 체크
    if (StringUtils.isEmpty(this.getCookie('CHANL_ID'))) {
      return true;
    }

    return false;
  }
};

export default CookieUtils;
