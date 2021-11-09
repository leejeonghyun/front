import JwtUtils from '@/common/JwtUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import ContextUtils from '@/common/ContextUtils';

const LoginUtils = {
  check: async (to, from, next) => {
    const idToken = await ApiUtils.getIdToken();
    const isExpired = JwtUtils.isExpired(idToken);
    if (isExpired) {
      const url = location.href;
      next('/cu/login?returnUrl=' + encodeURIComponent(url));
      return;
    }
    console.log('from:', from);
    next();
  },
  isLogin() {
    const idToken = JwtUtils.getIdToken();
    if (idToken) {
      return true;
    } else {
      return false;
    }
  },
  async appLogout() {
    appCallAppInfo();
    const params = {
      dvcId: localStorage.getItem("deviceId"),
      autoLoginYn: 'N',
      cmmStieId: CookieUtils.getCmmSteId()
    };
    await ApiUtils.put('/fo/cm/appmgnt/device', params)
      .then(function(response) {
        appCallTrackingLogout();
        appCallLogoutComplete();
      })
      .catch(function(err) {
      });
  },
  logout() {
    return new Promise((resolve)=> {
      if (ContextUtils.isNative()) {
        this.appLogout();
      }
      // logout time cookie
      CookieUtils.setCookie('lot', Date.now(), null, true);
      // app logout 이 실패하더라도 token 삭제
      JwtUtils.destroyIdToken();
      JwtUtils.destroyRefreshToken();
      JwtUtils.destroyEncVal();
      CookieUtils.deleteCookie('CUST_NM');
      CookieUtils.deleteCookie('WEB_ID');
      CookieUtils.deleteCookie('CUST_GRD_CD');
      CookieUtils.deleteCookie('PMBS_JOIN_PRCN_CD');
      CookieUtils.deleteCookie('STOR_ID');
      CookieUtils.deleteCookie('SUPPL_FIRM_CD');
      CookieUtils.deleteCookie('MALL_ID');
      CookieUtils.deleteCookie('STE_CONN_MDA_TYPE_CD');
      CookieUtils.deleteCookie('MBR_TYPE_CD');
      CookieUtils.deleteCookie('CHANL_ID');
      CookieUtils.deleteCookie('SIMPLE_STOR_ID');
      CookieUtils.deleteCookie('SIMPLE_SUPPL_FIRM_CD');
      CookieUtils.deleteCookie('SIMPLE_MALL_ID');
      CookieUtils.deleteCookie('DAYBREAK_STOR_ID');
      CookieUtils.deleteCookie('DAYBREAK_SUPPL_FIRM_CD');
      CookieUtils.deleteCookie('DALI_STOR_ID');
      CookieUtils.deleteCookie('DALI_SUPPL_FIRM_CD');
      CookieUtils.deleteCookie('ADULT_AUTH_DATE');
      CookieUtils.deleteCookie('OD_BSKT_UUID');
      CookieUtils.deleteCookie('mall');
      CookieUtils.deleteCookie('cmmSteId');
      CookieUtils.deleteCookie('media');
      CookieUtils.deleteCookie('showDaybreak');
      CookieUtils.deleteCookie('cartFirstItemId');
      resolve();
    });
  },
  async nonLogin() {
    if (!JwtUtils.getEncVal() || CookieUtils.isEmptyDefaultCookie()) {
      console.log('nonLogin', true);
      await this.mallChange();
    } else {
      const media = CookieUtils.getCookie('media');
      const cookieMedia = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');

      if (media != cookieMedia) {
        // 파라미터 설정
        const params = {
          mdaType: media
        };
        // ENC_VAL 갱신 처리
        this.updateEncVal(params);
      }
    }
  },
  nonLoginPromise: async function () {
    if (!JwtUtils.getEncVal() || CookieUtils.isEmptyDefaultCookie()) {
      await this.mallChange();
    } else {
      const media = CookieUtils.getCookie('media');
      const cookieMedia = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');

      if (media != cookieMedia) {
        // 파라미터 설정
        const params = {
          mdaType: media
        };
        // ENC_VAL 갱신 처리
        this.updateEncVal(params);
      }

      return new Promise(
        function (resolve, reject) {
          resolve();
        }
      );
    }
  },
  mallChange: async function () {
    const params = {
      mallId: CookieUtils.getMallId(),
      cmmSteId: CookieUtils.getCmmSteId(),
      mdaType: CookieUtils.getMdaType(),
      chanlId: CookieUtils.getChanlId()
    };

    // 현재 새벽배송 전시인지 체크
    const daybreakStorId = CookieUtils.getCookie('STOR_ID');
    const daybreakSupplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');

    if (params.mallId !== '11' && CookieUtils.isDaybreak()) {
      params.showDaybreak = 'Y';
      params.daybreakStorId = daybreakStorId;
      params.daybreakSupplFirmCd = daybreakSupplFirmCd;
    }

    const response = await ApiUtils.post('/fo/cu/loginmgnt/non-login', params);

    if (response.data.success === true) {
      const data = response.data.data;
      JwtUtils.saveEncVal(data.ENC_VAL);

      const user = data.userRslt;
      CookieUtils.setCookie('STOR_ID', user.storId);
      CookieUtils.setCookie('SUPPL_FIRM_CD', user.supplFirmCd);
      CookieUtils.setCookie('MALL_ID', user.mallId);
      CookieUtils.setCookie('STE_CONN_MDA_TYPE_CD', user.mdaType);
      if (CookieUtils.getCmmSteId() == '3') {
        CookieUtils.setCookie('CHANL_ID', CookieUtils.getChanlId());
      } else {
        CookieUtils.setCookie('CHANL_ID', user.chanlId);
      }
      CookieUtils.setCookie('SIMPLE_STOR_ID', user.simpleStorId);
      CookieUtils.setCookie('SIMPLE_SUPPL_FIRM_CD', user.simpleSupplFirmCd);
      CookieUtils.setCookie('SIMPLE_MALL_ID', user.simpleMallId);
      CookieUtils.setCookie('DALI_STOR_ID', user.daliStorId);
      CookieUtils.setCookie('DALI_SUPPL_FIRM_CD', user.daliSupplFirmCd);
    }
  },
  updateEncVal: function (data) {
    data.mallId = CookieUtils.getMallId() || '1';
    data.chanlId = CookieUtils.getChanlId() || '3';
    data.steConnMdaTypeCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD') || '03';

    return ApiUtils.post('/fo/cu/loginmgnt/update-enc-val', data, { 'Content-Type': 'application/json' }).then(function (response) {
      if (response.data.success === true) {
        const data = response.data.data;
        JwtUtils.saveEncVal(data.ENC_VAL);

        const user = data.userRslt;
        CookieUtils.setCookie('STOR_ID', user.storId);
        CookieUtils.setCookie('SUPPL_FIRM_CD', user.supplFirmCd);
        CookieUtils.setCookie('MALL_ID', user.mallId);
        CookieUtils.setCookie('STE_CONN_MDA_TYPE_CD', user.mdaType);
        CookieUtils.setCookie('PMBS_JOIN_PRCN_CD', user.pmbsJoinPrcnCd);
        // CookieUtils.setCookie('CHANL_ID', user.chanlId);
        // console.log('매장 ID storId', CookieUtils.getCookie('STOR_ID'));
        // console.log('공급업체코드 supplFirmCd', CookieUtils.getCookie('SUPPL_FIRM_CD'));
        // console.log('접속몰 mallId', CookieUtils.getCookie('MALL_ID'));
        // console.log('사이트접속매체유형코드 steConnMdaTypeCd', CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'));
        // console.log('채널ID CHANL_ID', CookieUtils.getCookie('CHANL_ID'));
      }
    });
  },
  getViaDomain() {
    const commonDsMo = process.env.VUE_APP_COMMON_DS_MO;
    const mode = process.env.VUE_APP_MODE;
    switch (mode) {
      case 'production':
        return commonDsMo || 'https://my-m.dalisalda.com';
      case 'qa':
        return commonDsMo || 'https://my-m.dalisaldaqa.com';
      case 'dev':
        return commonDsMo || 'https://my-m.marketfordev.com';
      default:
        return commonDsMo || 'https://my-m.marketfordev.com';
    }
  }
};

export default LoginUtils;
