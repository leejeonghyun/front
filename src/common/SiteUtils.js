import CookieUtils from './CookieUtils';

const SiteUtils = {
  to(mallId, uri) {
    // domain은 mallId와 mediaType에서
    // gsfresh: 1, dalisalda: 11
    const cmmSteId = CookieUtils.getCmmSteId();
    let src = '';
    if (cmmSteId == '3') {
      src = 'mf';
    } else if (mallId == '11') {
      src = 'ds';
    } else {
      src = 'fr';
    }
    const domain = CookieUtils.getDomain(src, mallId);
    return domain + uri;
  },
  freshmo(uri) {
    const domain = process.env.VUE_APP_GSFRESH_MO || 'https://m.gsfresh.com';

    if (CookieUtils.isDaybreak()) {
      if (uri.includes('?')) {
        uri = uri + '&showDaybreak=Y';
      } else {
        uri = uri + '?showDaybreak=Y';
      }
    }
    return domain + uri;
  },
  dalimo(uri) {
    const domain = process.env.VUE_APP_DALISALDA_MO || 'https://m.dalisalda.com';
    return domain + uri;
  },
  marketformo(uri) {
    const domain = process.env.VUE_APP_MARKETFOR_MO || 'https://m.marketfor.com';
    return domain + uri;
  },
  marketforcommo(uri) {
    const domain = process.env.VUE_APP_COMMON_FR_MO || 'https://my-m.marketfor.com';
    return domain + uri;
  },
  commo(uri) {
    const siteId = CookieUtils.getCmmSteId();
    let domain = process.env.VUE_APP_COMMON_FR_MO || 'https://my-m.gsfresh.com';
    if (siteId === '2') {
      domain = process.env.VUE_APP_COMMON_DS_MO || 'https://my-m.dalisalda.com';
    }
    if (siteId === '3') {
      domain = process.env.VUE_APP_COMMON_MF_MO || 'https://my-m.marketfor.com';
    }
    if (siteId === '1' && CookieUtils.isDaybreak()) {
      if (uri.includes('?')) {
        uri = uri + encodeURIComponent('&showDaybreak=Y');
      } else {
        uri = uri + '?showDaybreak=Y';
      }
    }
    return domain + uri;
  },
  freshpc(uri) {
    const domain = process.env.VUE_APP_GSFRESH_PC || 'https://m.gsfresh.com';
    return domain + uri;
  },
  compc(uri) {
    const domain = process.env.VUE_APP_COMMON_FR_PC || 'https://my.gsfresh.com';
    return domain + uri;
  },
  isCommonSite() {
    const host = location.host;
    if (host === process.env.VUE_APP_DALISALDA_MO || host === process.env.VUE_APP_GSFRESH_MO || host === process.env.VUE_APP_GSFRESH_PC) {
      return false;
    } else {
      return true;
    }
  },
  checkUrl(currentHost, obj, mall) {
    const siteInfo = {};
    let url = obj;
    if (typeof obj === 'object') {
      url = obj.path;
      const queryString = (obj.query) ? Object.keys(obj.query).map(key => key + '=' + obj.query[key]).join('&') : '';
      if (queryString) {
        url += '?' + queryString;
      }

      if (CookieUtils.isDaybreak()) {
        if (url.includes('?')) {
          url = url + '&showDaybreak=Y';
        } else {
          url = url + '?showDaybreak=Y';
        }
      }
    }
    if (!url) {
      url = 'undefined';
    }
    let isExternal = url.match(/^(http(s)?|marketfor|gssmapp|dalisalda|ftp):\/\//) !== null;
    siteInfo.isExternal = isExternal;
    siteInfo.toUrl = url;
    if (!isExternal) {
      // check ev, cu, od
      const array = url.split('/');
      if (array.length >= 2) {
        const item = array[1].split('?')[0];
        let destination = '';
        let isLocal = false;
        try {
          isLocal = process.env.VUE_APP_MODE === 'local';
        } catch (e) {}

        const curHost = currentHost.toLowerCase().replace('www.', '');
        const protocol = (curHost.includes('localhost') || isLocal) ? 'http://' : 'https://';
        const host = protocol + curHost;
        const isCommon = RegExp('(^https:\/\/my|:7300|:7400)').test(host);
        const codeMap = {
          [process.env.VUE_APP_GSFRESH_MO]: { code: 'ds', fn: 'dalimo', current: 'fresh' },
          [process.env.VUE_APP_DALISALDA_MO]: { code: 'fr', fn: 'freshmo', current: 'dali' },
          [process.env.VUE_APP_MARKETFOR_MO]: { code: 'mf', fn: 'marketformo', current: 'marketfor' },
          [process.env.VUE_APP_COMMON_MF_MO]: { code: 'mf', fn: 'marketformo', current: 'marketfor' },
          [process.env.VUE_APP_COMMON_DS_MO]: { code: 'fr', fn: 'freshmo', current: 'dali' },
          [process.env.VUE_APP_COMMON_DS_MO]: { code: 'fr', fn: 'freshmo', current: 'dali' },
          [process.env.VUE_APP_COMMON_FR_MO]: { code: 'ds', fn: 'dalimo', current: 'fresh' },
          [process.env.VUE_APP_COMMON_FR_PC]: { code: 'fr', fn: 'freshpc', current: 'fresh' },
          [process.env.VUE_APP_GSFRESH_PC]: { code: 'fr', fn: 'compc', current: 'fresh' },
        };
        const selected = codeMap[host];
        if (selected) {
          const postfix = selected.fn.substr(-2);
          if (['ev', 'cu', 'od'].includes(item) && !isCommon) {
            isExternal = true;
            destination = 'com' + postfix;
          }
          const isHome = url === '/' || url.startsWith('/?');
          const isSearch = url.startsWith('/ss/search_result');
          if ((['cp', 'dp', 'md', 'product', 'product_detail'].includes(item) || isHome || isSearch) && isCommon) {
            isExternal = true;
            destination = selected.current + postfix;
          }
          if (mall === selected.code) {
            isExternal = true;
            destination = selected.fn;
          }
          siteInfo.isExternal = isExternal;
          if (isExternal) {
            siteInfo.toUrl = SiteUtils[destination](url);
          }
        }
      }
    }
    return siteInfo;
  },
  go(currentHost, nextPath, mall) {
    const siteInfo = this.checkUrl(currentHost, nextPath, mall);
    if (siteInfo.isExternal) {
      location.href = siteInfo.toUrl;
    } else {
      let refresh = '';
      if (location.pathname === nextPath) {
        refresh = '?t=' + Date.now();
      }
      window.app.$router.push(nextPath + refresh);
    }
  },
  isWhiteList(url) {
    let isWhiteList = false;
    const regexp = `^([a-z|A-Z])+?:\/\/([^\/]+[.])?(${process.env.VUE_APP_WHITE_DOMAIN_REGEX})?(\/.*)?$`;
    isWhiteList = RegExp(regexp).test(url);
    return isWhiteList;
  },
};

export default SiteUtils;
