import axios from 'axios';
import postscribe from 'postscribe';
import JwtUtils from './JwtUtils';
import Config from './Config';
import CookieUtils from './CookieUtils';
import StringUtils from './StringUtils';

// axios.defaults.withCredentials = true;
let lasttime = 0;
axios.interceptors.response.use(function (response) {
  return response;
}, (error) => {
  if (typeof error.response === 'undefined') {
    const now = Date.now();
    if (now - lasttime > 10000) {
      lasttime = now;
      if (process.env.VUE_APP_MODE !== 'local') {
        console.log('네트워크 오류입니다. 인터넷 연결이 원활하지 않습니다.');
      }
    }
  } else if (error.response.status === 401) {
    const now = Date.now();
    if (now - lasttime > 10000) {
      lasttime = now;
      if (process.env.VUE_APP_MODE !== 'local') {
        console.log('권한이 없습니다. 401.');
      }
    }
  } else if (error.response.status === 403) {
    console.log('권한이 없습니다. 403');
  } else if (error.response.status === 500) {
    console.log('서버 오류입니다. 500');
  }
  return Promise.reject(error);
});

const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const commonPart = {
  get: async function (uri, params, headers) {
    try {
      const _headers = headers || await this.getHeaders();
      params = this.getParams(params);
      return await axios.get(this.getUrl(uri), { params, ..._headers });
    } catch (e) {
      throw e;
    }
  },
  post: async function (uri, params, headers) {
    try {
      const _headers = headers || await this.getHeaders();
      const encVal = JwtUtils.getEncVal();
      if (encVal != 'undefined' && encVal) {
        uri = this.getUrl(uri) + '?ENC_VAL=' + encVal;
      } else {
        uri = this.getUrl(uri);
      }
      return await axios.post(uri, params, _headers);
    } catch (e) {
      throw e;
    }
  },
  put: async function (uri, params) {
    try {
      const encVal = JwtUtils.getEncVal();
      if (encVal != 'undefined' && encVal) {
        uri = this.getUrl(uri) + '?ENC_VAL=' + encVal;
      } else {
        uri = this.getUrl(uri);
      }
      return await axios.put(uri, params, await this.getHeaders());
    } catch (e) {
      throw e;
    }
  },
  delete: async function (uri, params) {
    try {
      const _headers = await this.getHeaders();
      const encVal = JwtUtils.getEncVal();
      if (encVal != 'undefined' && encVal) {
        uri = this.getUrl(uri) + '?ENC_VAL=' + encVal;
      } else {
        uri = this.getUrl(uri);
      }
      return await axios.delete(uri, { data: params, ..._headers });
    } catch (e) {
      throw e;
    }
  },
  getHeaders: async function () {
    let _headers = Object.assign({}, headers);
    const idToken = await this.getIdToken();
    if (!JwtUtils.isExpired(idToken)) {
      _headers = {
        headers: {
          'Authorization': 'Bearer ' + idToken,
          'Content-Type': 'application/json',
        }
      };
    }
    return _headers;
  },
  getIdToken: async function () {
    let idToken = JwtUtils.getIdToken();
    if (JwtUtils.isExpired(idToken)) {
      JwtUtils.destroyIdToken(idToken);
      idToken = '';
      const refreshToken = JwtUtils.getRefreshToken();
      if (refreshToken) {
        // refreshToken으로 idToken 갱신
        const params = {
          refreshToken: refreshToken,
        };
        const response = await ApiUtils.post(
          '/fo/cu/loginmgnt/updatetoken',
          params,
          headers
        );
        if (response.data.success === true) {
          const data = response.data.data;
          const newIdToken = data.idToken;
          JwtUtils.saveIdToken(newIdToken);
          idToken = newIdToken;

          await this.autoLogin();
        }
      }
    } else {
      await this.updateRefreshToken();
    }
    return idToken;
  },
  autoLogin: async function () {
    const idToken = JwtUtils.getIdToken();
    const params2 = {
      mallId: CookieUtils.getMallId(),
      cmmSteId: CookieUtils.getCmmSteId(),
      mdaType: CookieUtils.getMdaType(),
      domail: CookieUtils.getDomain(),
      chanlId: CookieUtils.getChanlId()
    };

    const response2 = await ApiUtils.post(
      '/fo/cu/loginmgnt/auto-login',
      params2,
      {
        headers: {
          'Authorization': 'Bearer ' + idToken,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response2.data.success === true) {
      // relogin log
      JwtUtils.saveEncVal(response2.data.data.ENC_VAL);
      const user = response2.data.data.userRslt;
      CookieUtils.setLoginCookies(user);
      const data = response2.data.data;
      if (!StringUtils.isEmpty(data.spctdFlag)) {
        if (data.spctdFlag === 'S') {
          this.$gsdialog.alert('휴면이 해제되었습니다.', { html: true });
        }
      }

      // 회원혜택지급처리
      try {
        const mbrBenedata = {
          custNo: user.custNo,
          cmmMbrNo: user.cmmMbrNo,
        };
        const response = await ApiUtils.post(
          '/fo/cu/mbrmgnt/member-benefit-provide',
          mbrBenedata
        );
        // console.log('/fo/cu/mbrmgnt/member-benefit-provide:: ' + response.data.success);
      } catch (e) {
        console.log(e);
      }
    }
  },
  updateRefreshToken: async function () {
    const diffTime = Date.now() - JwtUtils.getRefreshTokenTime();
    if (diffTime < 25 * 24 * 60 * 60 * 1000) {
      return;
    } else {
      // update refreshToken
      const idToken = JwtUtils.getIdToken();
      const params2 = {
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
        mdaType: CookieUtils.getMdaType(),
        domail: CookieUtils.getDomain(),
        chanlId: CookieUtils.getChanlId()
      };

      const response2 = await ApiUtils.post(
        '/fo/cu/loginmgnt/update-refresh-token',
        params2,
        {
          headers: {
            'Authorization': 'Bearer ' + idToken,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response2.data.success === true) {
        // relogin log
        const jwtRslt = response2.data.data.jwtRslt;
        const refreshToken = jwtRslt.refreshToken;
        JwtUtils.saveIdToken(jwtRslt.idToken);
        JwtUtils.saveRefreshToken(refreshToken);

        JwtUtils.saveEncVal(response2.data.data.ENC_VAL);
        const user = response2.data.data.userRslt;
        CookieUtils.setLoginCookies(user);

        const dvcId = localStorage.getItem('deviceId');
        let autoLoginCertValChk = '';
        const devData = {
          cmmSteId: CookieUtils.getCmmSteId(),
          dvcId: dvcId,
          autoLoginYn: 'Y',
        };
        const resDev = await ApiUtils.put('/fo/cm/appmgnt/device', devData);
        if (resDev.data === null) {
          console.log('오류');
          return;
        } else {
          if (resDev.data.success === true) {
            autoLoginCertValChk = resDev.data.data.autoLoginCertVal;
            this.storeToApp(dvcId, autoLoginCertValChk, 'Y', refreshToken);
          }
        }
      }
    }
  },
  storeToApp(dvcId, autoLoginCertVal, autoLoginYn, refreshToken) {
    const certData = {
      dvcId: dvcId,
      autoLoginCertVal: autoLoginCertVal,
      autoLoginYn: autoLoginYn,
      refreshToken: refreshToken,
    };
    window.appCallLoginComplete(certData);
  },
  getParams: function (params) {
    const encVal = JwtUtils.getEncVal();
    if (encVal != 'undefined' && encVal) {
      return { ...params, ENC_VAL: JwtUtils.getEncVal() };
    } else {
      return params;
    }
  }
};

const ApiUtils = {
  getUrl: function (uri) {
    let baseDomain = Config.server.API_SERVER;
    if (process.env.VUE_APP_MODE === 'local') {
      const portMap = {
        'focm': '8040',
        'focu': '8050',
        'fomd': '8060',
        'bocs': '8070',
        'focs': '8070',
        'food': '8070',
        'htmlfopa': '8070',
        'fopa': '8070',
        'fopr': '8080',
        'foev': '8080',
        'ev': '8090',
        'dpfr': '8100',
        'dpds': '8110',
        'dpmf': '8120',
      };
      const uriArray = uri.split('/');
      // 검색 로컬이 존재하지않아 dev로
      if ('search' === uriArray[1]) {
        // baseDomain = 'https://apidev.gsecretail.com';
        baseDomain = 'https://apipjt1.gsecretail.com';
      } else {
        const key = (['html'].includes(uriArray[1]))
          ? uriArray[1] + uriArray[2] + uriArray[3]
          : ((['ev', 'pa'].includes(uriArray[1])) ? uriArray[1] : uriArray[1] + uriArray[2]);
        const port = portMap[key] || '8050';
        baseDomain += ':' + port;
      }
    } else {
      const uriArray = uri.split('/');
      // 파일업로드의 경우 기본 API 서버 호출 시 파일 용량 증가하는 현상 발생함. TL_SERVER 로 호출해야 함
      if (['html'].includes(uriArray[1]) || '/fo/cm/filemgnt/file' === uri) {
        baseDomain = Config.server.TL_SERVER;
      }
    }
    return baseDomain + uri;
  },
  ...commonPart,
  outer: {
    /**
     * 외부 URL 호출
     *
     * @param {string} url
     * @return {string} url
     */
    getUrl: function (url) {
      return url;
    },
    ...commonPart
  },
  /**
  * 외부 자바스크립트 로더, GA등
  *
  * @param {string} src script url
  * @param {function} cb callback function
  */
  loadScript: function (src, cb) {
    const head = document.getElementsByTagName('head')[0];
    postscribe(head, `<script src="${src}"><\/script>`, cb);
  }
};

export default ApiUtils;
