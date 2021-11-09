/*
/smMobApFront.ear/eRetailFront.war/sys/js/mobile/common.app.js
webview와 native app간의 통신을 위해 연결고리가 될 수 있는 자바스크립트 오브젝트(appIF)를 선언하여 사용한다.
webview와 native app의 데이터 공유는 기본적으로 JSON 문자열 혹은 JSON OBJECT 형태를 사용하는 것을 기본 원칙으로 하며,
예외 상황이 발생하면 WEB의 GET 파라메터 방식의 "&"로 연결되는 파라메터 형식으로 문자열로 전달한다.

1. iOS
 1) webview => native app의 호출
   - url scheme 형식으로 정의된 URL로 webview의 URL의 이동시키고 이동될 URL 주소를 가로채어 페이지 이동처리를 하지 않고 native app의 기능을 수행하는 방식을 사용한다.

   - IOS에서는 URL 이동을 가로채는 방식으로 native app을 호출할 수 밖에 없는 상황이라 webview에서 한페이지에서 연속적으로 호출하여야 하는 경우에는 URL이 누락되기 때문에
     HTML에서는 IFRAME를 추가하여 URL을 호출한 후 제거하는 방식을 사용한다.

   - SM 모바일 앱 프로젝트에서는 커스텀 프로토콜 명칭은 gssmapp으로 사용하도록 한다.

   - URL scheme 기본 형식
      가. 커스텀 프로토콜 + "://" + 명령어 + "?" + JSON 문자열(전송할 데이터)
          예) gssmapp://login?{"data1":"데이터","data2":["데이터2_1","데이터2_2","데이터2_3"]}

      나. 예외상황시 커스텀 프로토콜 + "://" + 명령어 + "?" + "파라메터1=값&파라메터2=값"
          예) gssmapp://login?data1=데이터&data2_1=데이터2_1&data2_2=데이터2_2&data2_3=데이터2_3

    - 명령 수행 후 완료를 알리는 자바스크립트 함수를 호출하여 준다.
    - 관리의 용이성을 위해 콜백함수를 하나로 정의하며 호출시 사용된 명령어값을 콜백 반환 데이터에 포함하여 명령어값으로 분기하여 처리한다.

 2) native app => webview의 호출
    - native app에서 webview의 통신은 webview 내에 정의되어 있는 자바스크립트 함수를 직접 호출하여 실행하는 방식으로 통신한다.
    예) login();


 3) 웹페이지에서는 appIF.appcall("명령어", "JSON문자열");로 정의된 기능을 호출하며, native app에서는 처리 후 appIF.icallback(JSON Object) 함수를 실행한다.
    appIF.icallback 실행시 JSON Object의 cmd 항목에는 appIF.icall 호출시 첫번째 인자값인 명령어 값이 그대로 설정되어 반환된다.
    콜백함수의 cmd 속성으로 분기하여 처리한다.

2. 안드로이드
  * native app에서 자바스크립트 인터페이스의 정의 명칭으로 webview에서 접근 가능한 객체가 생성되며 객체의 메소드를 호출하고 콜백 결과를 리턴 받는 방식을 사용한다.
   앱에서 정의되는 인터페이스의 명칭은 IOS의 프로토콜(gssmapp)과 동일하게 정의하여 사용한다.

  1) webview => native app의 호출
    - 일반적인 자바스크립트 함수처럼  native app의 메소드를 수행할 수 있다.
      형식은 window. + "native app에서 자바스크립트 인터페이스의 정의 명칭" + 메소드명(JSON 문자열);

      예) 인자값이 있는 경우 :  window.gssmapp.login(JSON.stringify(obj));
          인자값이 없는 경우 :  window.gssmapp.login();
          반환값이 있는 경우 :  var result = window.gssmapp.login();

    - 아이폰 연동과 동일한 방식으로 통일하기 위해 appIF.appcall("login", JSON.stringify(obj)); 식으로 자바스크립트 함수를 호출한다.

  2) native app => webview의 호출
     - native app에서 webview의 통신은 webview 내에 정의되어 있는 자바스크립트 함수를 직접 실행하는 방식으로 통신한다.
     예) login();

  3) 웹페이지에서는 appIF.appcall(명령어, "JSON문자열");로 호출하고 appIF.acall 함수내에서 명령어로 분기하여 안드로이드 앱의  메소드를 호출하여 주는
     코드를 추가하고 안드로이드에서  appIF.acallback(); 콜백함수를 호출하여 준다.

*/

/*
 * 팝업열기
 */
var _INAPP_YN = ''; // 인앱인지 체크
// 인앱 에이전트 체크
if (
  navigator.userAgent.match('gssmapp') != null ||
  navigator.userAgent.match('dalisalda') != null ||
  navigator.userAgent.match('marketfor') != null
) {
  _INAPP_YN = 'Y';
} else {
  _INAPP_YN = 'N';
}

/*
-------------------------------------------------------------------------------------------------------------------------------------------
webview와 native app의 인터페이스 자바스크립트 정의
-------------------------------------------------------------------------------------------------------------------------------------------
1) 웹 페이지에서 native app 호출시 함수 호출
   호출     :  appIF.appcall("login", JSON.stringify(obj));
   최종응답 :  appIF.callback(os, result); 에서 cmd로 분기하여 처리

3) 앱에서 웹을 호출할 경우
    appIF.webcall(cmd, params);  cmd에 따라서 웹의 자바스크립트 분기 처리
*/
var appIF = {
  debug: true,

  isApp: function() {
    if (
      navigator.userAgent.match('gssmapp') != null ||
      navigator.userAgent.match('dalisalda') != null ||
      navigator.userAgent.match('marketfor') != null
    ) {
      return true;
    } else {
      return false;
    }
  },

  getAppName: function() {
    if (navigator.userAgent.match('gssmapp') != null) {
      return 'gssmapp';
    } else if (navigator.userAgent.match('dalisalda') != null) {
      return 'dalisalda';
    } else if (navigator.userAgent.match('marketfor') != null) {
      return 'marketfor';
    } else {
      return 'gssmapp';
    }
  },

  //현재 접속한 앱의 정보 useragent값을 이용하여 변경
  getAppInfo: function() {
    //분기처리 로직 앱 구현 후 추가

    //var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
    var mobileKeyWords = new Array('iPhone', 'Android', 'iPad');
    var device = '';
    for (var word in mobileKeyWords) {
      if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
        device = mobileKeyWords[word];
        break;
      }
    }

    /*
        if(device == "iPhone") {
            return "ios";
        } else {
        //else if(device == "Android"){
            return "android";
        }
         */
    /* 20191014 iPad 분기점 못찾는 현상 임시처리 by 노종범  */
    if (device == 'Android') {
      return 'android';
    } else if (device == 'iPhone' || device == 'iPad') {
      return 'ios';
    } else {
      return 'android';
    }
  },

  //native app 명령 호출 함수(IOS)
  icall: function(cmd, params) {
    try {
      //            if (params != null && params != "" && typeof params != "undefined") {
      //                params = "?" + params;
      //            }
      //
      //            var src = "gssmapp://" + cmd + params;
      //            var html = "<IFRAME id='appFrame' style='' src='" + src + "' frameborder='no' scrolling='0' width='0' height='0'></IFRAME>";
      //            $('body').append(html);
      //            $('#appFrame').remove();

      //            //디버깅을 위한 정보 설정
      //            if (this.debug) {
      //                $("#debug").append("icall 호출 [" + src + "]<br/>");
      //            }

      if (params != null && params != '' && typeof params != 'undefined') {
        eval(
          'window.webkit.messageHandlers.' +
            cmd +
            ".postMessage('" +
            params +
            "');"
        );
      } else {
        eval('window.webkit.messageHandlers.' + cmd + ".postMessage('');");
      }
    } catch (e) {
      if (this.debug) {
       // $('#debug').append('appIF.icall 예외 발생 [' + e.message + ']<br/>');
      }
    }
  }, //icall

  //앱 호출 함수
  appcall: function(cmd, params) {
    if (params != null && params != '' && typeof params != 'undefined') {
      params = JSON.stringify(params);
    } else {
      params = '';
    }
    //앱 구분
    if (this.getAppInfo() == 'ios') {
      this.icall(cmd, params);
    } else {
      this.acall(cmd, params);
    }
  }, // appcall

  //native app 명령 호출 함수(ANDROID) : 안드로이드 메소드
  acall: function(cmd, params) {
    const appName = this.getAppName();
    try {
      if (params != null && params != '' && typeof params != 'undefined') {
        eval('window.' + appName + '.' + cmd + "('" + params + "');");
      } else {
        eval('window.' + appName + '.' + cmd + '();');
      }
      /*
      if (params != null && params != '' && typeof params != 'undefined') {
        eval('window.' + this.getAppName() + '.' + cmd + "('" + params + "');");
      } else {
        eval('window.' + this.getAppName() + '.' + cmd + '();');
      }
      */
    } catch (e) {
      if (this.debug) {
        // $('#debug').append('appIF.acall 예외 발생 [' + e.message + ']<br/>');
      }
    }
  }, //acall

  //앱 최종 콜백함수 : 앱의 응답 후 웹에서 처리해야할 경우 추가
  appcallback: function(result) {
    try {
      var cmd = result.cmd;

      switch (cmd) {
        case 'refreshToken': {
          var refreshToken = result.token;
          localStorage.setItem('rtkn', refreshToken);
          localStorage.setItem('rtkn_ts', Date.now());
          break;
        }
        //로그인 명령 수행 후 콜백
        case 'login': {
          break;
        }
        case 'androidVersion': {
          document.getElementById('androidVersion').value =
            result.androidVersion;
          break;
        }

        //메뉴알림수 업데이트
        case 'contcnt': {
          //alert("cmd : " + result.cmd + ", menuid : " + result.menuid);
          break;
        }

        case 'appinfo': {
          localStorage.setItem("appVersion", result.version);
          localStorage.setItem("appBundleid", result.bundleid);
          localStorage.setItem("deviceId", result.dvcId);
          break;
        }
        // 애플 아이디로 로그인 CallBack 테스트
        case 'appleIdLoginComplete': {
          localStorage.setItem("name", result.name || '');
          localStorage.setItem("dvcId", result.dvcId);
          localStorage.setItem("idCredential", result.idCredential);
          localStorage.setItem("email", result.email);
          localStorage.setItem("type", result.type);
          localStorage.setItem("mallId", result.mallId);
          localStorage.setItem("cmmSteId", result.cmmSteId);
          localStorage.setItem("mdaType", result.mdaType);
          localStorage.setItem("chanlId", result.chanlId);
          window.getSnsAppleCallback();
          break;
        }

        case 'getgps': {
          webCallSetGps(result.latitude, result.longitude);
          break;
        }

        case 'telecom': {
          document.getElementById('telecomNm').value = result.telecomNm;
          document.getElementById('deviceNo').value = result.deviceNo;
          break;
        }

        case 'contacts': {
          telInfo(result);
          break;
        }

        default: {
          // 아무것도 안함.
          break;
        }
      }
    } catch (e) {
      if (this.debug) {
        // $('#debug').append('appIF.callback 예외 발생 [' + e.message + ']<br/>');
      }
    }
  }, // appcallbacksysou

  //앱에서 웹의 함수를 호출해야 하는 상황
  webcall: function(cmd, params) {
    try {
      //2016-01-20 김상윤 switch 구문 내의 default 부재 - 아무것도 없어서 주석처리함.
      /**
            switch (cmd) {

            }
            **/
    } catch (e) {
      if (this.debug) {
        // $('#debug').append('appIF.webcall 예외 발생 [' + e.message + ']<br/>');
      }
    }
  }, // webcall
};

/*-------------------------------------------------------------------------------------------------------------------------------------------*/
var windowSet =
  'scrollbars=yes,toolbar=yes,resizable=yes,width=500,height=600,left=0,top=0';

function appCallOpenPopup(url) {
  if (_INAPP_YN == 'Y') {
    var obj = {
      url: url,
    };
    appIF.appcall('openpopup', obj);
  } else {
    window.open(url, appIF.getAppName(), windowSet);
  }
}

/*
 * 웹뷰이동
 * gubun : 1(메인웹뷰이동), 2(현팝업웹뷰이동)
 */
function appCallWebLocation(gubun, url) {
  if (_INAPP_YN == 'Y') {
    var obj = {
      url: url,
    };

    if (gubun == 1) {
      appIF.appcall('mainwebview', obj);
    }
  } else {
    if (gubun == 1) {
      window.location.href = url;
    } else if (gubun == 2) {
      window.open(url, appIF.getAppName(), windowSet);
    }
  }
}

function appCallPopupClose() {
  if (_INAPP_YN == 'Y') {
  } else {
    window.close();
  }
}

/*
 * 뒤로가기
 * 팝업창에서 더이상 히스토리가 없으면 팝업창을 닫지만
 * 메인웹뷰에서 더이상 히스토리가 없으면 아무 동작을 하지 않는다.
 */
function appCallGoHistoryBack() {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('goHistoryBack');
  }
}

/*
 * 내장브라우저 열기
 */
function appCallOpenBrowser(url) {
  if (_INAPP_YN == 'Y') {
    var obj = {
      url: url,
    };
    appIF.appcall('openbrowser', obj);
  } else {
    var open = window.open(url, appIF.getAppName(), windowSet);
    /* 팝업 차단 설정되어 있는 경우 alert 메세지 노출 처리 (19.10.24) */
    if (open == null || typeof open == 'undefined') {
      alert(
        '팝업이 차단되었습니다. 설정에서 팝업차단을 해제한 후 다시 시도해 주세요.'
      );
    }
  }
}

/*
 * 어플리케이션 정보
 */
function appCallAppInfo() {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('appinfo');
  }
}

/*
 * 값 전달 함수
 * */
function appCallTransmission(fnname, value) {
  if (_INAPP_YN == 'Y') {
    var obj = {
      fnname: fnname,
      value: value,
    };

    appIF.appcall('transmission', obj);
  }
}

/*
 * 광고푸쉬 동의 여부
 */
function appCallSetAdPushAgreeYn(adPushAgreeYn) {
  if (_INAPP_YN == 'Y') {
    var obj = {
      adPushAgreeYn: adPushAgreeYn,
    };
    appIF.appcall('setAdPushAgreeYn', obj);
  }
}

/*
 * SMS공유
 */
function appCallOpenSms(url, msg) {
  if (_INAPP_YN == 'Y') {
    var obj = {
      url: url,
      msg: msg,
    };
    appIF.appcall('smsshare', obj);
  } else {
    window.open(url, appIF.getAppName(), windowSet);
  }
}

/*
 * 안드로이드 전용
 * 자동로그인 상태값 전송
 */
function appCallSetAutoLoginYn(flag) {
  if (_INAPP_YN == 'Y' && _OS_DIV == 'A') {
    var obj = {
      flag: flag,
    };
    appIF.appcall('setAutoLoginYn', obj);
  }
}

/*
 * 닫히지 않는 팝업을 호출하기 위한 용도
 * 2014-06-26 PDH
 */
function appCallOpenNoClosePopup(url) {
  if (_INAPP_YN == 'Y' && _OS_DIV == 'A') {
    var obj = {
      url: url,
      close: 'N',
    };
    appIF.appcall('openpopup', obj);
  } else if (_INAPP_YN == 'Y' && _OS_DIV == 'I') {
    var obj = {
      url: url,
    };
    appIF.appcall('openpopup', obj);
  } else {
    window.open(url, appIF.getAppName(), windowSet);
  }
}

function appCallBanking(obj) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('callBanking', obj);
  }
}

/**
 * 2016-02-18 김상윤 버전 검사 두번째 입력 받는 버전이 크면 -1
 * versionCompare('1.1', '1.2') => -1
 * versionCompare('1.1', '1.1') =>  0
 * versionCompare('1.2', '1.1') =>  1
 * versionCompare('2.23.3', '2.22.3') => 1
 **/
function versionCompare(left, right) {
  if (typeof left + typeof right != 'stringstring') return false;

  var a = left.split('.'),
    b = right.split('.'),
    i = 0,
    len = Math.max(a.length, b.length);

  for (; i < len; i++) {
    if (
      (a[i] && !b[i] && parseInt(a[i]) > 0) ||
      parseInt(a[i]) > parseInt(b[i])
    ) {
      return 1;
    } else if (
      (b[i] && !a[i] && parseInt(b[i]) > 0) ||
      parseInt(a[i]) < parseInt(b[i])
    ) {
      return -1;
    }
  }
  return 0;
}

function androidVersionControll(limitVersion, forceExit, mentation) {
  if (_INAPP_YN == 'Y') {
    if (mentation == '') {
      mentation =
        '앱을 최신버전으로 업데이트 하신 후 이용 가능합니다. 업데이트 하시겠습니까?';
    }

    var osVerInt = 0;
    var arrOs = '';
    var downLoadUrl = '';

    arrOs = navigator.appVersion.split(appIF.getAppName() + '_android_');
    osVerInt = parseInt(arrOs[1].replace('.', '').replace('.', ''));
    downLoadUrl = 'market://details?id=com.gsretail.android.smapp';

    //2016-02-18 김상윤 버전 검사 로직 수정
    //if ( osVerInt < limitVersion ){
    if (versionCompare(arrOs[1], limitVersion) == -1) {
      if (forceExit) {
        alert(mentation);
        location.href = downLoadUrl;
        return false;
      } else {
        if (confirm(mentation)) {
          location.href = downLoadUrl;
          return false;
        }
        return false;
      }
    }
    return true;
  }
}

function iphoneVersionControll(limitVersion, forceExit, mentation) {
  if (mentation == '') {
    mentation =
      '앱을 최신버전으로 업데이트 하신 후 이용 가능합니다. 업데이트 하시겠습니까?';
  }

  var osVerInt = 0;
  var arrOs = '';
  var downLoadUrl = '';

  arrOs = navigator.appVersion.split(appIF.getAppName() + '_ios_');
  osVerInt = parseInt(arrOs[1].replace('.', '').replace('.', ''));
  downLoadUrl = 'https://itunes.apple.com/kr/app/id813494275?mt=8';

  //2016-02-18 김상윤 버전 검사 로직 수정
  //if ( osVerInt < limitVersion ){
  if (versionCompare(arrOs[1], limitVersion) == -1) {
    if (forceExit) {
      alert(mentation);
      location.href = downLoadUrl;
      return false;
    } else {
      if (confirm(mentation)) {
        location.href = downLoadUrl;
        return false;
      }
      return false;
    }
  }

  return true;
}

function clearIndicator() {
  setTimeout(function() {
    // indicator(false);
  }, 1000 * 20);
}

function installApp(target, aStoreUrl, iStoreUrl) {
  var b = new Date().getTime(),
    device = appIF.getAppInfo();
  setTimeout(function() {
    if (new Date().getTime() - b < 1500) {
      if (target == null || typeof target == 'undefined') {
        if (device == 'android') {
          location.href = aStoreUrl;
        } else if (device == 'ios') {
          location.replace(iStoreUrl);
        }
      } else {
        if (device == 'android') {
          target.attr('src', aStoreUrl);
        } else if (device == 'ios') {
          location.replace(iStoreUrl);
        }
      }
    }
    clearIndicator();
  }, 1000);
}

function callApp(target, object) {
  if (object != null) {
    var device = appIF.getAppInfo();
    var aStoreUrl = object.aStoreUrl, // 안드로이드 스토어 URL
      iStoreUrl = object.iStoreUrl, // IOS 스토어URL
      aItentUrl = object.aItentUrl, // 안드로이드 ITENT
      iItentUrl = object.iItentUrl, // IOS ITENT
      aScheme = object.aScheme, // 안드로이드 스키마
      iScheme = object.iScheme; // IOS 스키마
    var uagentLow = navigator.userAgent.toLocaleLowerCase();
    var chrome = uagentLow.search('crios/') > -1;
    if (!chrome)
      // 앱 설치여부 확인
      installApp(target, aStoreUrl, iStoreUrl);
    if (device == 'android') {
      //var uagentLow = navigator.userAgent.toLocaleLowerCase();
      var chrome25 =
        uagentLow.search('chrome') > -1 &&
        navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split('/')[1] > 25;
      var kitkatWebview =
        uagentLow.indexOf('naver') != -1 || uagentLow.indexOf('daum') != -1;
      if (chrome25 && !kitkatWebview) {
        document.location.href = aItentUrl;
      } else {
        if (target == null || typeof target == 'undefined') {
          location.href = aScheme;
        } else {
          target.attr('src', aScheme);
        }
      }
    } else if (device == 'ios') {
      location.href = iScheme;
    }
  }
}

function onFocusKeyword() {
  $('input[name="searchQuery"]').focus();
}

/*
 * Push 설정 확인 IOS전용
 */
function appCallCheckEnablePush() {
  if (_INAPP_YN == 'Y') {
    if (_INAPP_YN == 'Y' && _OS_DIV == 'I') {
      appIF.appcall('checkEnablePush');
    }
  }
}

/*
 * [201830P] 앱트래커 연동 20180620 by SeoYuJin
 */
function appCallTrackingBasket(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingBasket', jsonObject);
  }
}

function appCallTrackingOrderList(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingOrderList', jsonObject);
  }
}

function appCallTrackingOrderComplete(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingOrderComplete', jsonObject);
  }
}

/** [201915P] 매장ID 데이터 수집을 위해 파라미터 추가 / leetsh 2019.03.13 */
function appCallTrackingJoinComplete(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingJoinComplete', jsonObject);
  }
}

/** [201915P] GSfresh 대외광고 추가연동 Start / leetsh 2019.03.15 */
/** Tracker : 상품상세  */
function appCallTrackingViewProduct(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingViewProduct', jsonObject);
  }
}

/** Tracker : 로그인 */
function appCallTrackingLogin(cust) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingLogin', cust);
  }
}

/** Tracker : 로그인 */
function appCallTrackingLogout() {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingLogout');
  }
}

/** Tracker : 위시리스트(찜) */
function appCallTrackingAddToWishList(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingAddToWishList', jsonObject);
  }
}

/** Tracker : 홈화면 열기 */
function appCallTrackingViewHome() {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingViewHome');
  }
}

/** Tracker : 주문취소 */
function appCallTrackingRefundProdList(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingRefundProdList', jsonObject);
  }
}

/** Tracker : 카테고리 */
function appCallTrackingViewCategory(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingViewCategory', jsonObject);
  }
}

/** Tracker : 검색결과 */
function appCallTrackingSearchResult(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingSearchResult', jsonObject);
  }
}
/** [201915P] GSfresh 대외광고 추가연동 End / leetsh 2019.03.15 */

/** 2019.09.11 jy.yi / 앱 캐시 삭제 */
function appCallClearWebCache() {
  appIF.appcall('clearWebCache');
}

/**
 * 2020.07.11. @Jay / ID/PWD로그인완료
 * {
 * 	"autoLoginYn" : "Y",
 * 	"dvcId" : "M00001",
 *  "autoLoginCertVal" : "kdjQskdoxso3i2/adsAEkdkcpsl23is=",
 *  "refreshToken" : "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ...",
 * }
 */
function appCallLoginComplete(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('loginComplete', jsonObject);
  }
}

/** 2019.09.11 @Jay / 로그아웃 완료 */
function appCallLogoutComplete() {
  appIF.appcall('logoutComplete');
}

/**
 * 2020.07.22. @Cky / 애플 아이디로 로그인
 * {
 * 	"type" : "L" // 로그인 L, 회원가입 J
 * }
 */
function appCallappleIdLogin(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('appleIdLogin', jsonObject);
  }
}

/** Tracker : 달리드림 멤버십 */
function appCallTrackingDalipassComplete(custNo) {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('trackingDalipassComplete', custNo);
  }
}

// 테스트 js
function appCallappleIdTest(jsonObject) {
  if (_INAPP_YN == 'Y') {
    appIF.appcallback(jsonObject);
  }
}

/** 2020.08.06 @Jay / 연락처호출 */
function appCallContacts() {
  appIF.appcall('contacts');
}

/** SPA메인화면 확인 */
function appCallViewHome() {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('viewHome');
  }
}

function appCallRefreshToken() {
  if (_INAPP_YN == 'Y') {
    appIF.appcall('refreshToken');
  }
}

function goPage(url) {
  var domain = 'https://m.gsfresh.com';
  const mallId = getCookie('MALL_ID');
  if (mallId == '11') {
    domain = 'https://m.dalisalda.com';
  }
  const cmmSteId = getCookie('cmmSteId');
  if (cmmSteId == '3') {
    domain = 'https://m.marketfor.com';
  }
  location.href = domain + url;
}

function getCookie(cookieName){
  var cookieValue=null;
  if(document.cookie){
      var array=document.cookie.split((escape(cookieName) + '='));
      if(array.length >= 2){
          var arraySub=array[1].split(';');
          cookieValue=unescape(arraySub[0]);
      }
  }
  return cookieValue;
}