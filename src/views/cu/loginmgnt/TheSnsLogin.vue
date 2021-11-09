<!--
Design: views/cu/SC-FO-CU-GF-MS-018
Pg id:
Uri: /cu/login
-->
<template>
  <div class="wrap-login" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
    <SubDefaultHeader headerText="SNS 계정 연동" :prevHomeType="true" :tabbar="false" />
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="login-wrap">
        <!-- START : 로그인 input -->
        <section class="section-area login">
          <h2 class="hidden">로그인 폼 입력</h2>
          <div class="inner">
            <fieldset class="warp-input-txt">
              <!-- 아이디/비밀번호 정상일 경우 로그인처리 입력값 오류 (5회 미만)일 경우 error 클래스 추가 -->
              <legend>로그인 폼</legend>
              <div class="inp-box" id="idErr">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label class="hidden">아이디 또는 이메일</label>
                <input
                  type="text"
                  autocapitalize="off"
                  id="nick"
                  class="inp-txt w100"
                  style="font-size: 16px;"
                  ref="nick"
                  value
                  v-model="form.webId"
                  placeholder="아이디 또는 이메일"
                  @keyup="getPress($event)"
                  @blur="getChkValue($event)"
                />
                <span class="txt-error">{{form.idMsg}}</span>
              </div>
              <div class="inp-box" id="pwErr">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="password" class="hidden">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  class="inp-txt w100"
                  style="font-size: 16px;"
                  ref="password"
                  value
                  v-model="form.psw"
                  placeholder="비밀번호"
                  @blur="getChkValue($event)"
                />
                <span class="txt-error">{{form.passwordMsg}}</span>
              </div>
              <!-- 아이디/비밀번호 정상일 경우 로그인처리 입력값 오류 (5회 미만) -->
            </fieldset>
            <!-- 수정 START : 2020.03.24 캡차 마크업 추가 및 변경. -->
            <div class="wrap-captcha" v-if="captcha.isCaptcha == true">
              <p
                class="desc"
              >{{captcha.viewChange ? '자동입력 방지문자를 보이는 대로 입력해주세요.' : '스피커로 들리는 내용을 숫자로 입력해주세요.'}}</p>
              <div class="captcha-box">
                <div class="captcha" aria-label="자동 입력 방지 문자 영역" v-html="captcha.tmpCaptcah"></div>
                <div class="btn-area">
                  <button type="button" class="btn-captcha ico refresh" @click="getCaptchaChange()">
                    <span class="hidden">새로고침</span>
                  </button>
                </div>
              </div>
              <div class="inp-box" id="captchErr">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="captcha" class="hidden">자동입력 방지문자</label>
                <input
                  type="text"
                  id="captcha"
                  class="inp-txt w100"
                  style="font-size: 16px;"
                  ref="captcha"
                  value
                  v-model="form.captchaKey"
                  placeholder="자동입력 방지문자를 입력해주세요"
                  @blur="getChkValue($event)"
                />
                <span class="txt-error">{{form.captchaMsg}}</span>
                <!-- Error MSG -->
              </div>
            </div>
            <!-- 수정 END : 2020.03.24 캡차 마크업 추가 및 변경 -->
            <!-- START : 자동로그인/ 아이디, 비밀번호 찾기 -->
            <div class="wrap-input-chk">
            <!--  <p class="inp-chk small">
                <input type="checkbox" name id="chkList03" value v-model="form.autoLogin" />
                <label for="chkList03">자동로그인</label>
              </p>
               -->
              <ul class="list-link-find">
                <li>
                  <a href="javascript:void(0);" @click="getFindIdPw('01')" title="아이디 찾기 페이지로 이동">아이디 찾기</a>
                </li>
                <li>
                  <a href="javascript:void(0);" @click="getFindIdPw('02')" title="비밀번호 찾기 페이지로 이동">비밀번호 찾기</a>
                </li>
              </ul>
            </div>
            <!-- END : 자동로그인/ 아이디, 비밀번호 찾기 -->
            <!-- START : 로그인 버튼 -->
            <div class="btn-area">
              <button
                type="button"
                class="btn-lg btn-bg lightgreen"
                aria-haspopup="dialog"
                aria-label="바로가기"
                @click="getLogin()"
                data-sc-action="login.type"
                data-dimension-name="login.type"
                data-dimension-value="로그인^아이디, 비밀번호"
              >
                <span>로그인</span>
              </button>
              <!-- 비밀번호변경 안내 팝업 -->
            </div>
            <!-- END : 로그인 버튼 -->
          </div>
        </section>
        <!-- END : 로그인 input -->
        <!-- START : 간편 로그인 -->
        <section class="section-area login easy">
          <div class="inner">
            <!-- START : 간편 로그인 링크 이동 -->
            <!-- END : 간편 로그인 링크 이동 -->
            <!-- START : 회원가입 링크 -->
            <a href="javascript:;" class="btn-link" title="회원가입 링크 이동" @click="getJoinMbr()">
              <span>회원가입</span>
            </a>
            <!-- END : 회원가입 링크 -->
          </div>
        </section>
        <!-- END : 간편 로그인 -->
        <!-- 휴면해제 팝업 -->
          <ul class="list-info">
          <li>SNS 계정 연동을 위해 GS 프레시몰 로그인이 필요합니다.</li>
          <li>로그인 후 [마이페이지 > SNS 연결 설정] 페이지에서 SNS 계정과 연동하실 수 있습니다.</li>
        </ul>
        <PopupDormantAccount @popupEvent="popupAction" v-if="this.popup.popupDormantAccount" />
        <!-- 필수약관 팝업 -->
        <PopupAgreement @popupEvent="popupAction" v-if="this.popup.popupAgreement" />
        <div>
          <iframe style="display:none;" id="m4Iframe1" name="m4Iframe1" src="" />
          <iframe style="display:none;" id="m4Iframe2" name="m4Iframe2" src="" />
        </div>
        <!-- 멀티로그인 Iframe -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import PopupDormantAccount from '@/views/cu/loginmgnt/PopupDormantAccount.vue'; // 휴면해제 팝업
import PopupAgreement from '@/views/cu/loginmgnt/PopupAgreement.vue'; // 필수약관 팝업
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import CuUtils from '@/common/cu/CuUtils';
import Tracker from '@/common/Tracker';
import SiteUtils from '@/common/SiteUtils';
import ConsoleUtils from '@/common/ConsoleUtils';

export default {
  name: 'Login',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '로그인 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '로그인',
      },
    ],
  },
  components: {
    SubDefaultHeader,
    PopupDormantAccount, // 휴면해제 팝업
    PopupAgreement, // 필수약관 팝업
  },
  data() {
    return {
      form: {
        webId: '',
        psw: '',
        result: '',
        status: false,
        idToken: '',
        refreshToken: '',
        captcha: '',
        captchaKey: '',
        captchaType: '',
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        autoLogin: true,
        snsTypeCod: '',
        idMsg: '',
        captchaMsg: '',
        passwordMsg: '',
        appVersion: '',
        appBundleid: '',
        deviceId: '',
        mobil: '',
      },
      defaultHeader: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      captcha: {
        isCaptcha: false,
        viewChange: true,
        tmpCaptcah: '',
        key: '',
        newPg: 'I',
      },
      popup: {
        // 팝업
        open: false,
        popupAgreement: false, // 필수약관 팝업
        popupDormantAccount: false, // 휴면해제 팝업
      },
      snsLoing: {
        // 팝업
        snsId: '',
        snsType: '',
        snsName: '',
        snsEmail: '',
        snsAccessToken: '',
      },
      self: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        certNum: '',
        apiUrl: '',
      },
      storeItemsData: [],
      crossSigned: false,
      /* 8월 수정 START : 디자인 디벨롭 수정 사항 */
      tooltipOpen: true,
      /* 8월 수정 END : 디자인 디벨롭 수정 사항 */
      siteClass: '',
      doubleClickFlag: true,
      joinNoticeTextFlag: false, // 회원가입 공지사항 노출플래그
      joinNoticeInfoList: null,
      joinNoticeCnts: '',
      odBsktUuid: CookieUtils.getOdBsktUuid(),
    };
  },
  mounted() {
    const vm = this;
    vm.siteClass = CookieUtils.getSiteClass();

    vm.m4IframeLoad();

    // 앱정보 조회
    try {
      window.appCallAppInfo();
    } catch (e) {
      console.log(e);
    }
    // 모바일 구분
    vm.getAppInfo();

    localStorage.removeItem('snsReUrl');
    // 회원가입 공지사항 조회
   // this.retrievelistJoinNotice();
  },
  methods: {
    m4IframeLoad: function() {
      // 다중 도메인 로그인 적용 도메인 전부 추가
      const arrayDomainList = [
        process.env.VUE_APP_COMMON_FR_MO,
        process.env.VUE_APP_COMMON_DS_MO,
        process.env.VUE_APP_COMMON_MF_MO
      ];

      const sCmmSteId = CookieUtils.getCmmSteId();
      this.ifCount = 1;

      // 현재 접속된 도메인을 제외한 나머지 도메인을 iframe에 로딩
      for ( this.i = 0; this.i < arrayDomainList.length; this.i++) {
        if ( this.ifCount > 2) {
          break;
        }
        if ( sCmmSteId == '1') {
          if ( arrayDomainList[this.i] == process.env.VUE_APP_COMMON_FR_MO) {
            continue;
          }
        } else if ( sCmmSteId == '2') {
          if ( arrayDomainList[this.i] == process.env.VUE_APP_COMMON_DS_MO) {
            continue;
          }
        } else if ( sCmmSteId == '3') {
          if ( arrayDomainList[this.i] == process.env.VUE_APP_COMMON_MF_MO) {
            continue;
          }
        }

        document.getElementById('m4Iframe' + this.ifCount).src = arrayDomainList[this.i] + '/cu/multilogin';
        this.ifCount++;
      }
    },
    ifLoad: function(rtkn) {
      this.gsIframe1 = document.getElementById('m4Iframe1').contentWindow;
      this.gsIframe1.postMessage({ callValue: 'parent', rtkn: rtkn}, '*');
      this.gsIframe2 = document.getElementById('m4Iframe2').contentWindow;
      this.gsIframe2.postMessage({ callValue: 'parent', rtkn: rtkn}, '*');
    },
    doubleClickCheck: function() {
      if (this.doubleClickFlag) {
        this.doubleClickFlag = false;
        return true;
      } else {
        return false;
      }
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false); // view - body
      if (this.popup.popupAgreement) {
        this.popup.open = true;
      }
    },
    // 수정 START : 2020.03.24 추가
    captchaChange(el) {
      // 캡차 이미지, 음성 변경
      this.captcha[el] = !this.captcha[el];
      if (this.captcha.viewChange) {
        this.getCaptcha('img');
      } else {
        this.getCaptcha('wav');
      }
    },
    /* 8월 수정 START : 디자인 디벨롭 수정 사항 */
    closeTooltip() {
      this.tooltipOpen = false;
    },
    /* 8월 수정 END : 디자인 디벨롭 수정 사항 */
    // 수정 END : 2020.03.24 추가
    getChkValue(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;

      if (id == 'nick') {
        // 아이디
        if (StringUtils.isEmpty(value)) {
          document.getElementById('idErr').className = 'inp-box error';
          vm.form.idMsg = '아이디를 입력해주세요.';
          return false;
        } else {
          document.getElementById('idErr').className = 'inp-box';
          vm.form.idMsg = '';
        }
      } else if (id == 'password') {
        // 비밀번호
        if (StringUtils.isEmpty(value)) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.form.passwordMsg = '비밀번호를 입력해주세요.';
          return false;
        } else {
          document.getElementById('pwErr').className = 'inp-box';
          vm.form.passwordMsg = '';
        }
      } else if (id == 'captcha') {
        if (StringUtils.isEmpty(value)) {
          document.getElementById('captchErr').className = 'inp-box error';
          vm.form.captchaMsg = '보안문자를 입력해주세요.';
          return false;
        } else {
          document.getElementById('captchErr').className = 'inp-box';
          vm.form.captchaMsg = '';
        }
      }
      e.target.style = 'font-size: 12px;';
      return true;
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
    // 웹 아이디 로그인
    getLogin: async function () {
      localStorage.removeItem('snsTypeCod');
      localStorage.removeItem('snsReUrl');
      localStorage.removeItem('snsId');

      if (!this.doubleClickCheck()) {
        console.log('double click!');
        return;
      }
      this.form.webId = StringUtils.trim(this.form.webId);

      if (StringUtils.isEmpty(this.form.webId)) {
        document.getElementById('idErr').className = 'inp-box error';
        this.$refs.nick.focus();
        this.doubleClickFlag = true;
        return;
      } else {
        document.getElementById('idErr').className = 'inp-box';
      }

      if (StringUtils.isEmpty(StringUtils.trim(this.form.psw))) {
        document.getElementById('pwErr').className = 'inp-box error';
        this.$refs.password.focus();
        this.doubleClickFlag = true;
        return;
      } else {
        document.getElementById('pwErr').className = 'inp-box';
      }

      if (this.captcha.isCaptcha) {
        if (StringUtils.isEmpty(this.form.captchaKey)) {
          document.getElementById('captchErr').className = 'inp-box error';
          this.$refs.captcha.focus();
          this.doubleClickFlag = true;
          return;
        } else {
          document.getElementById('captchErr').className = 'inp-box';
        }
      }

      const vm = this;
      const key = encodeURI(this.form.psw);
      const data = {
        userId: this.form.webId,
        userPwd: key,
        retUrl: '',
        snsType: '',
        captcha: '',
        captchakey: this.captcha.key,
        captchaValue: this.form.captchaKey,
        captchaType: this.form.captchaType,
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
        mdaType: CookieUtils.getMdaType(),
        domail: CookieUtils.getDomain(),
        chanlId: CookieUtils.getChanlId(),
      };

      // 현재 새벽배송 전시인지 체크.
      const daybreakStorId = CookieUtils.getCookie('STOR_ID');
      const daybreakSupplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');

      if (data.mallId !== '11' && CookieUtils.isDaybreak()) {
        data.showDaybreak = 'Y';
        data.daybreakStorId = daybreakStorId;
        data.daybreakSupplFirmCd = daybreakSupplFirmCd;
      }

      const _data = data;
      const headers = this.defaultHeader;
      const response = await ApiUtils.post('/fo/cu/loginmgnt/web-id-login', data, { 'Content-Type': 'application/json' });

      // 로그인 성공.
      if (response.data.success === true) {
        const dvcId = localStorage.getItem('deviceId');
        const data = response.data.data;

        if (!StringUtils.isEmpty(dvcId)) {
          JwtUtils.setAutoLogin(false);
        } else {
          JwtUtils.setAutoLogin(vm.form.autoLogin);
        }

        const refreshToken = data.jwtRslt.refreshToken;
        JwtUtils.saveRefreshToken(refreshToken);
        JwtUtils.saveIdToken(data.jwtRslt.idToken);
        JwtUtils.saveEncVal(response.data.data.ENC_VAL);

        Tracker.loginSuccess(data.userRslt.custNo);

        // 현재 새벽배송 전시인지 체크
        if (CookieUtils.isDaybreak()) {
          CookieUtils.clearAllCookies();
          CookieUtils.setCookie('showDaybreak', 'Y');
        } else {
          CookieUtils.clearAllCookies();
        }

        const user = response.data.data.userRslt;
        CookieUtils.setLoginCookies(user);

        if (!StringUtils.isEmpty(data.spctdFlag)) {
          if (data.spctdFlag === 'S') {
            vm.$gsdialog.alert('휴면이 해제되었습니다.', { html: true });
          }
        }

        // APP 로그인 경우
        if (!StringUtils.isEmpty(dvcId)) {
          let autoLoginYn = '';
          if (this.form.autoLogin) {
            autoLoginYn = 'Y';
          } else {
            autoLoginYn = 'N';
          }
          let autoLoginCertValChk = '';
          const devData = {
            cmmSteId: CookieUtils.getCmmSteId(),
            dvcId: dvcId,
            autoLoginYn: autoLoginYn,
          };
          const resDev = await ApiUtils.put('/fo/cm/appmgnt/device', devData);
          if (resDev.data === null) {
            this.$gsdialog.alert('오류', { html: true });
            this.doubleClickFlag = true;
            return;
          } else {
            if (resDev.data.success === true) {
              autoLoginCertValChk = resDev.data.data.autoLoginCertVal;
              this.storeToApp(dvcId, autoLoginCertValChk, autoLoginYn, refreshToken);
            }
          }

          const autoData = {
            dvcId: dvcId,
            autoLoginCertVal: autoLoginCertValChk,
            cmmSteId: CookieUtils.getCmmSteId(),
            autoLoginYn: autoLoginYn,
          };
          const resAuto = await ApiUtils.post(
            '/fo/cu/loginmgnt/app-auto-login-registration',
            autoData
          );
          if (resAuto.data === null) {
            this.$gsdialog.alert('오류', { html: true });
            this.doubleClickFlag = true;
            return;
          }
        }

        // 최근본상품 등록
        const storeItems = JSON.parse(localStorage.getItem('mbrInqItemList'));

        if (!StringUtils.isEmpty(storeItems)) {
          vm.storeItemsData = storeItems;
          for (let i = 0; i < storeItemsData.length; i++) {
            const params = {
              itemId: vm.storeItemsData[i].itemId,
              mallId: CookieUtils.getMallId(),
            };
            try {
              const response = await ApiUtils.post(
                '/fo/md/itemaddinfomgnt/mbr-inquire-item',
                params
              );
              console.log(
                'mbr-inquire-item response.data :: ' + response.data.success
              );
              storeItems.splice(rowSeq, i + 1);
              localStorage.setItem(
                'mbrInqItemList',
                JSON.stringify(storeItems)
              );
            } catch (e) {
              console.log(e);
            }
          }
        }

        // 비로그인 장바구니
        try {
          const response = await ApiUtils.post(
            '/fo/od/bsktmgnt/bskt-merge',
            this.odBsktUuid
          );
        } catch (e) {
          console.log(e);
        }

        // 회원혜택지급처리
        try {
          const mbrBenedata = {
            custNo: data.userRslt.custNo,
            cmmMbrNo: data.userRslt.cmmMbrNo,
          };
          const response = await ApiUtils.post(
            '/fo/cu/mbrmgnt/member-benefit-provide',
            mbrBenedata
          );
        } catch (e) {
          console.log(e);
        }

        vm.captcha.newPg = 'I';
        vm.result = '로그인 성공입니다.';
        vm.status = true;

        try {
          this.$gtag.event('login', { 'method': 'N' });
        } catch (e) {
          console.log(e);
        }
        // SNS 연동 API 호출.
        const snsData = JSON.parse(localStorage.getItem('snsDate'));
        localStorage.removeItem('snsDate');
        const SnsInputDto = {
            snsId: snsData.snsId,
            snsType: snsData.snsType,
            snsSiteGubun: "01",
            snsConYn: "Y",
            userId: response.data.data.userRslt.custNo
          };
          // console.log("=SnsInputDto==" + JSON.stringify(SnsInputDto));
          await ApiUtils
                .post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto)
                .then(res => {
                  if (res.data.success) {
                    vm.$gsdialog.alert("회원님의 아이디와 SNS 계정이 연결되었습니다.");
                    this.ifLoad(refreshToken);
                  } else {
                    if (res.data.data.resultCode ==='R7020') {
                      vm.$gsdialog.alert('이미 가입 또는 연결되어 있는 SNS 계정입니다.</br>로그인 후 [마이페이지 > SNS 연결 설정]에서 다시 설정해주세요.', { html: true });
                    } else {
                      vm.$gsdialog.alert(res.data.data.resultMessage);
                    }
                  }
                  vm.redirectUrl();
                });
      } else {
        this.doubleClickFlag = true;
        const data = response.data.data;
        if (data.resultCode === '50011') {
          // 고객정보없음
          this.$gsdialog.confirm('고객님은 아직 회원이 아닙니다.</br>회원가입하시겠습니까?', { html: true }).then((dialog) => {
            this.$router.push('/cu/join_member');
          });
        } else if (data.resultCode === 'R7051') {
          // 아이디 비밀번호 불일치
          this.$gsdialog.alert('아이디와 비밀번호가 일치하지 않습니다.</br>편리한 로그인을 위해 휴대폰 본인인증을 이용해 보세요.', { html: true });
          return;
        } else if (data.resultCode === 'R7050') {
          // 캡차 노출
          vm.captcha.newPg = 'I';
          vm.getCaptcha('img');
          vm.form.captchaKey = '';
        } else if (data.resultCode === 'R7054') {
          // Kixx 유출정보 고객 입니다.
          this.$gsdialog
            .alert('개인정보보호를 위해</br>비밀번호 재설정이 필요합니다.</br></br>비밀번호 변경을 진행해 주세요.', { html: true })
            .then((dialog) => {
              sessionStorage.setItem('reqGbn', '2');
              vm.$router.push('/cu/find_id_password/2');
            });
        } else if (data.resultCode === 'R7055') {
          // 그룹사에서 기관인증이 아닌 고객입니다.
        } else if (data.resultCode === 'R7053') {
          // 타사 통합회원이며 GS리테일에서 약관 동의를 받아야 합니다.
          vm.$store.state.cu.custNo = data.custNoEncKey;
          vm.popupAction('popupAgreement');
        } else if (data.resultCode === 'CRM') {
          // CRM 장애
          vm.$router.push('/cu/crm_login');
        } else {
          this.$gsdialog.alert(data.resultMessage, { html: true });
        }
      }
    },
    // 본인인증 로그인
    getAuthenticationLogin: async function (cb) {
      if (
        sessionStorage.getItem('ipinCiCode') != '' &&
        sessionStorage.getItem('ipinCiCode') != null
      ) {
        const vm = this;
        if (!vm.doubleClickCheck()) {
          console.log('double click!');
          return;
        }

        const userChk = {
          mbrJoinPosbType: 'M',
          korName: res.data.data.name,
          ipinCiCode: res.data.data.ci,
          mallId: CookieUtils.getMallId(),
          cmmSteId: CookieUtils.getCmmSteId(),
          mdaType: CookieUtils.getMdaType(),
          domail: CookieUtils.getDomain(),
          chanlId: CookieUtils.getChanlId(),
        };

        // 현재 새벽배송 전시인지 체크
        const daybreakStorId = CookieUtils.getCookie('STOR_ID');
        const daybreakSupplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');

        if (userChk.mallId !== '11' && CookieUtils.isDaybreak()) {
          userChk.showDaybreak = 'Y';
          userChk.daybreakStorId = daybreakStorId;
          userChk.daybreakSupplFirmCd = daybreakSupplFirmCd;
        }

        const headers = this.defaultHeader;
        const response = await ApiUtils.post(
          '/fo/cu/loginmgnt/self-certification',
          userChk,
          { 'Content-Type': 'application/json' }
        );
        if (response.data === null) {
          console.error(response.data.msg);
          this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', {
            html: true,
          });
          vm.doubleClickFlag = true;
          return;
        } else {
          if (response.data.success === true) {
            const dvcId = localStorage.getItem('deviceId');
            const data = response.data.data;

            if (!StringUtils.isEmpty(dvcId)) {
              JwtUtils.setAutoLogin(false);
            } else {
              JwtUtils.setAutoLogin(this.form.autoLogin);
            }

            const refreshToken = data.jwtRslt.refreshToken;
            JwtUtils.saveRefreshToken(refreshToken);
            JwtUtils.saveIdToken(data.jwtRslt.idToken);
            JwtUtils.saveEncVal(response.data.data.ENC_VAL);

            Tracker.loginSuccess(data.userRslt.custNo);

            // 현재 새벽배송 전시인지 체크
            if (CookieUtils.isDaybreak()) {
              CookieUtils.clearAllCookies();
              CookieUtils.setCookie('showDaybreak', 'Y');
            } else {
              CookieUtils.clearAllCookies();
            }

            const user = response.data.data.userRslt;
            CookieUtils.setLoginCookies(user);

            if (!StringUtils.isEmpty(data.spctdFlag)) {
              if (data.spctdFlag === 'S') {
                vm.$gsdialog.alert('휴면이 해제되었습니다.', { html: true });
              }
            }

            // APP 로그인 경우
            if (!StringUtils.isEmpty(dvcId)) {
              let autoLoginYn = '';
              if (this.form.autoLogin) {
                autoLoginYn = 'Y';
              } else {
                autoLoginYn = 'N';
              }
              let autoLoginCertValChk = '';
              const devData = {
                cmmSteId: CookieUtils.getCmmSteId(),
                dvcId: dvcId,
                autoLoginYn: autoLoginYn,
              };
              const resDev = await ApiUtils.put(
                '/fo/cm/appmgnt/device',
                devData
              );
              if (resDev.data === null) {
                this.$gsdialog.alert('오류', { html: true });
                vm.doubleClickFlag = true;
                return;
              } else {
                if (resDev.data.success === true) {
                  autoLoginCertValChk = resDev.data.data.autoLoginCertVal;
                  this.storeToApp(dvcId, autoLoginCertValChk, autoLoginYn, refreshToken);
                }
              }

              const autoData = {
                dvcId: dvcId,
                autoLoginCertVal: autoLoginCertValChk,
                cmmSteId: CookieUtils.getCmmSteId(),
                autoLoginYn: autoLoginYn,
              };
              const resAuto = await ApiUtils.post(
                '/fo/cu/loginmgnt/app-auto-login-registration',
                autoData
              );
              if (resAuto.data === null) {
                this.$gsdialog.alert('오류', { html: true });
                vm.doubleClickFlag = true;
                return;
              }
            }

            // 최근본상품 등록
            const storeItems = JSON.parse(
              localStorage.getItem('mbrInqItemList')
            );
            if (!StringUtils.isEmpty(storeItems)) {
              vm.storeItemsData = storeItems;
              for (let i = 0; i < storeItemsData.length; i++) {
                const params = {
                  itemId: vm.storeItemsData[i].itemId,
                  mallId: CookieUtils.getMallId(),
                };
                try {
                  ApiUtils.post(
                    '/fo/md/itemaddinfomgnt/mbr-inquire-item',
                    params
                  ).then((response) => {
                    console.log(
                      'mbr-inquire-item response.data :: ' +
                        response.data.success
                    );
                    storeItems.splice(rowSeq, i + 1);
                    localStorage.setItem(
                      'mbrInqItemList',
                      JSON.stringify(storeItems)
                    );
                  });
                } catch (e) {
                  console.log(e);
                }
              }
            }

            // 비로그인 장바구니
            try {
              ApiUtils.post(
                '/fo/od/bsktmgnt/bskt-merge',
                this.odBsktUuid
              ).then((response) => {
                console.log(
                  '/fo/od/bsktmgnt/bskt-merge :: ' + response.data.success
                );
              });
            } catch (e) {
              console.log(e);
            }
            // 회원혜택지급처리
            try {
              const mbrBenedata = {
                custNo: data.userRslt.custNo,
                cmmMbrNo: data.userRslt.cmmMbrNo,
              };
              ApiUtils.post(
                '/fo/cu/mbrmgnt/member-benefit-provide',
                mbrBenedata
              ).then((response) => {
                console.log(
                  '/fo/cu/mbrmgnt/member-benefit-provide:: ' +
                    response.data.success
                );
              });
            } catch (e) {
              console.log(e);
            }

            this.ifLoad(refreshToken);
            await vm.redirectUrl();
          } else {
            vm.doubleClickFlag = true;
            const data = response.data.data;

            if (data.resultCode === '50011') {
              // 고객정보없음
              this.$gsdialog
                .confirm(
                  '고객님은 아직 회원이 아닙니다.</br>회원가입하시겠습니까?',
                  { html: true }
                )
                .then((dialog) => {
                  this.$router.push('/cu/join_member');
                });
            } else if (data.resultCode === 'R7051') {
              // 아이디 비밀번호 불일치
              vm.$gsdialog.alert(
                '아이디와 비밀번호가 일치하지 않습니다.</br>편리한 로그인을 위해 휴대폰 본인인증을 이용해 보세요.',
                { html: true }
              );
              return;
            } else if (data.resultCode === 'R7050') {
              // 캡차 노출
              vm.captcha.newPg = 'I';
              vm.getCaptcha('img');
            } else if (data.resultCode === 'R7054') {
              // Kixx 유출정보 고객 입니다.
              vm.$gsdialog
                .alert('개인정보보호를 위해</br>비밀번호 재설정이 필요합니다.</br></br>비밀번호 변경을 진행해 주세요.', {
                  html: true,
                })
                .then((dialog) => {
                  sessionStorage.setItem('reqGbn', '2');
                  // this.$router.push('/cu/find_id_password/2');
                  vm.$router.push('/cu/find_id_password/2');
                });
            } else if (data.resultCode === 'R7055') {
              // 그룹사에서 기관인증이 아닌 고객입니다.
            } else if (data.resultCode === 'R7053') {
              // 타사 통합회원이며 GS리테일에서 약관 동의를 받아야 합니다.
              vm.$store.state.cu.custNo = data.custNoEncKey;
              vm.popupAction('popupAgreement');
            } else if (data.resultCode === 'CRM') {
              // CRM 장애
              vm.$router.push('/cu/crm_login');
            } else {
              vm.$gsdialog.alert(data.resultMessage, { html: true });
            }
            return;
          }

          if (cb) {
            cb();
          }
        }
      } else {
        // 본인 인증 호출 로직 추가
        // KMC 본인확인 호출
        this.$gsdialog.alert('본인 확인을 위하여</br>휴대폰 본인인증을 진행합니다', { html: true, })
          .then((dialog) => {
            const mall = CookieUtils.getMallId();
            const cmmSteId = CookieUtils.getCmmSteId();
            const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId }; // 모바일 화면은 M , PC 화면은 P
            ApiUtils.get(
              '/fo/cu/loginmgnt/self-certification-check',
              certType,
              {
                'Content-Type': 'application/json',
              }
            )
              .then((res) => {
                if (res.data === null) {
                  console.error(res.data.msg);
                  this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', {
                    html: true,
                  });
                  return;
                } else {
                  this.self = res.data.data;
                }
              })
              .then((res) => {
                const kmcIsWindow = '';
                const UserAgent = window.navigator.userAgent;
                const dvcId = localStorage.getItem('deviceId');

                // 모바일 접근 체크
                // 모바일일 경우 (변동사항 있을경우 추가 필요)
                if (!StringUtils.isEmpty(dvcId)) {
                  const popupX = CuUtils.popupX('500');
                  const popupY = CuUtils.popupY('600');
                  window.open(
                    '',
                    'kmcIsWindow',
                    'width=500, height=600, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no, left=' +
                      popupX +
                      ', top=' +
                      popupY
                  );
                  subKmc.target = 'kmcIsWindow';
                } else {
                  if (
                    UserAgent.match(
                      /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
                    ) != null ||
                    UserAgent.match(/LG|SAMSUNG|Samsung/) != null
                  ) {
                    // 모바일웹 리턴 URL 추가
                    localStorage.setItem('reUrl', '/cu/login');
                    subKmc.target = '';
                  } else {
                    const popupX = CuUtils.popupX('500');
                    const popupY = CuUtils.popupY('600');
                    window.open(
                      '',
                      'kmcIsWindow',
                      'width=500, height=600, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no, left=' +
                        popupX +
                        ', top=' +
                        popupY
                    );
                    subKmc.target = 'kmcIsWindow';
                  }
                }
                subKmc.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
                subKmc.submit();
              });
          });
      }
    },
    getCaptchaChange() {
      // 캡차 이미지, 음성 변경
      if (this.captcha.newPg === 'I') {
        this.getCaptcha('img');
      } else {
        this.getCaptcha('wav');
      }
    },
    getCaptcha: async function (type) {
      // 캡차
      const vmCap = this;
      const response = await ApiUtils.get('/fo/cm/captcha-image');
      if (response.data.success === true) {
        const data = response.data.data;
        vmCap.captcha.key = data.answerStr;
        if (type == 'img') {
          vmCap.captcha.tmpCaptcah =
            '<img v-if="captcha.viewChange" src="' + data.imageStr + '" alt="자동 입력 방지 문자 이미지">';
          vmCap.captcha.isCaptcha = true;
          vmCap.captcha.newPg = 'I';
          vmCap.form.captchaType = 'img';
        }
      }
    },
    // 모바일 구분
    getAppInfo() {
      const UserAgent = window.navigator.userAgent;
      const mobileKeyWords = ['gssmapp_ios', 'dalisalda_ios'];
      let device = '';
      let osVer = '';
      for (const word in mobileKeyWords) {
        if (UserAgent.match(mobileKeyWords[word]) != null) {
          device = mobileKeyWords[word];
          break;
        }
      }
      if (device == 'gssmapp_ios' || device == 'dalisalda_ios' || device == 'marketfor_ios') {
        // gssmapp_ios_3.0.0_13.5.1
        const newVer = UserAgent.lastIndexOf('_');
        const strVer = UserAgent.substring(newVer + 1);
        const sEnd = strVer.indexOf('.');
        osVer = strVer.substring(0, sEnd);
        if (osVer >= 13) {
          this.form.mobil = 'ios';
        } else {
          this.form.mobil = 'android';
        }
      } else {
        this.form.mobil = 'android';
      }
    },
    getFindIdPw: async function (type) {
      // ID/PW 찾기
      sessionStorage.setItem('typ', type);
      await this.$router.push('/cu/find_id_password');
    },
    // 클리어 버튼
    getBtnClear(type) {
      if (type == 'id') {
        this.form.webId = '';
      } else if (type == 'psw') {
        this.form.psw = '';
      }
    },
    // 본인인증 로그인
    getSelfCertif: async function (strRecCert, strCertNum, callBack) {
      const vm = this;
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      const res = await ApiUtils.get(
        '/fo/cu/loginmgnt/self-certification-check',
        date,
        { 'Content-Type': 'application/json' }
      );
      if (res.data === null) {
        console.error(res.data.msg);
        this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
        return;
      } else {
        const altName = res.data.data.nameShow;
        const userChk = {
          mbrJoinPosbType: 'M',
          korName: res.data.data.name,
          ipinCiCode: res.data.data.ci,
          mallId: CookieUtils.getMallId(),
          cmmSteId: CookieUtils.getCmmSteId(),
          mdaType: CookieUtils.getMdaType(),
          domail: CookieUtils.getDomain(),
          chanlId: CookieUtils.getChanlId(),
        };

        const joinChk = {
          mbrJoinPosbType: 'M',
          korName: res.data.data.name,
          bdate: res.data.data.birthDay,
          gender: res.data.data.gender,
          ipinCiCode: res.data.data.ci,
          foreignYn: res.data.data.nation,
          hp: res.data.data.phoneNo,
          phoneCorp: res.data.data.phoneCorp,
        };

        // 현재 새벽배송 전시인지 체크
        const daybreakStorId = CookieUtils.getCookie('STOR_ID');
        const daybreakSupplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');

        if (userChk.mallId !== '11' && CookieUtils.isDaybreak()) {
          userChk.showDaybreak = 'Y';
          userChk.daybreakStorId = daybreakStorId;
          userChk.daybreakSupplFirmCd = daybreakSupplFirmCd;
        }

        const headers = this.defaultHeader;
        const response = await ApiUtils.post(
          '/fo/cu/loginmgnt/self-certification',
          userChk,
          { 'Content-Type': 'application/json' }
        );
        if (response.data === null) {
          console.error(response.data.msg);
          this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', {
            html: true,
          });
          return;
        } else {
          if (response.data.success === true) {
            const dvcId = localStorage.getItem('deviceId');
            const data = response.data.data;

            JwtUtils.setAutoLogin(vm.form.autoLogin);
            const refreshToken = data.jwtRslt.refreshToken;
            JwtUtils.saveRefreshToken(refreshToken);
            JwtUtils.saveIdToken(data.jwtRslt.idToken);
            JwtUtils.saveEncVal(response.data.data.ENC_VAL);
            // alert('로그인 성공');
            Tracker.loginSuccess(data.userRslt.custNo);

            // 현재 새벽배송 전시인지 체크
            if (CookieUtils.isDaybreak()) {
              CookieUtils.clearAllCookies();
              CookieUtils.setCookie('showDaybreak', 'Y');
            } else {
              CookieUtils.clearAllCookies();
            }

            const user = response.data.data.userRslt;
            CookieUtils.setLoginCookies(user);
            if (!StringUtils.isEmpty(data.spctdFlag)) {
              if (data.spctdFlag === 'S') {
                this.$gsdialog.alert('휴면이 해제되었습니다.', { html: true });
              }
            }

            // APP 로그인 경우
            if (!StringUtils.isEmpty(dvcId)) {
              let autoLoginYn = '';
              if (this.form.autoLogin) {
                autoLoginYn = 'Y';
              } else {
                autoLoginYn = 'N';
              }
              let autoLoginCertValChk = '';
              const devData = {
                cmmSteId: CookieUtils.getCmmSteId(),
                dvcId: dvcId,
                autoLoginYn: autoLoginYn,
              };
              const resDev = await ApiUtils.put(
                '/fo/cm/appmgnt/device',
                devData
              );
              if (resDev.data === null) {
                this.$gsdialog.alert('오류', { html: true });
                return;
              } else {
                if (resDev.data.success === true) {
                  autoLoginCertValChk = resDev.data.data.autoLoginCertVal;
                  this.storeToApp(dvcId, autoLoginCertValChk, autoLoginYn, refreshToken);
                }
              }
              const autoData = {
                dvcId: dvcId,
                autoLoginCertVal: autoLoginCertValChk,
                cmmSteId: CookieUtils.getCmmSteId(),
                autoLoginYn: autoLoginYn,
              };
              const resAuto = await ApiUtils.post(
                '/fo/cu/loginmgnt/app-auto-login-registration',
                autoData
              );
              if (resAuto.data === null) {
                this.$gsdialog.alert('오류', { html: true });
                return;
              }
            }

            // 최근본상품 등록
            const storeItems = JSON.parse(
              localStorage.getItem('mbrInqItemList')
            );
            if (!StringUtils.isEmpty(storeItems)) {
              vm.storeItemsData = storeItems;
              for (let i = 0; i < storeItemsData.length; i++) {
                const params = {
                  itemId: vm.storeItemsData[i].itemId,
                  mallId: CookieUtils.getMallId(),
                };
                try {
                  ApiUtils.post(
                    '/fo/md/itemaddinfomgnt/mbr-inquire-item',
                    params
                  ).then((response) => {
                    console.log(
                      'mbr-inquire-item response.data :: ' +
                        response.data.success
                    );
                    storeItems.splice(rowSeq, i + 1);
                    localStorage.setItem(
                      'mbrInqItemList',
                      JSON.stringify(storeItems)
                    );
                  });
                } catch (e) {
                  console.log(e);
                }
              }
            }

            // 비로그인 장바구니
            try {
              ApiUtils.post(
                '/fo/od/bsktmgnt/bskt-merge',
                this.odBsktUuid
              ).then((response) => {
                console.log(
                  '/fo/od/bsktmgnt/bskt-merge :: ' + response.data.success
                );
              });
            } catch (e) {
              console.log(e);
            }
            // 회원혜택지급처리
            try {
              const mbrBenedata = {
                custNo: data.userRslt.custNo,
                cmmMbrNo: data.userRslt.cmmMbrNo,
              };
              ApiUtils.post(
                '/fo/cu/mbrmgnt/member-benefit-provide',
                mbrBenedata
              ).then((response) => {
                console.log(
                  '/fo/cu/mbrmgnt/member-benefit-provide:: ' +
                    response.data.success
                );
              });
            } catch (e) {
              console.log(e);
            }
            this.ifLoad(refreshToken);
            await vm.redirectUrl();
          } else {
            const data = response.data.data;
            if (data.resultCode === '50011') {
              // 고객정보없음
              this.$gsdialog
                .confirm(
                  '고객님은 아직 회원이 아닙니다.</br>회원가입하시겠습니까?',
                  { html: true }
                )
                .then((dialog) => {
                  ApiUtils.post('/fo/cu/mbrmgnt/member-join', joinChk, {
                    'Content-Type': 'application/json',
                  }) // 회원가입
                    .then((res) => {
                      if (res.data === null) {
                        console.error(res.data.msg);
                        vm.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', {
                          html: true,
                        });
                        return;
                      } else {
                        if ((res.data.data.resultCode === '00000' || res.data.data.resultCode === 'R7000')
                          && res.data.data.nullWebId === 'N') {
                          // R7000 정상(회원가입 가능)
                          localStorage.setItem(
                            'uesrChk',
                            JSON.stringify(res.data.data)
                          );
                          vm.$router.push('/cu/join_member_detail');
                        } else if (res.data.data.resultCode === 'R7005') {
                          // 이미 가입한 회원
                          localStorage.setItem(
                            'uesrChk',
                            JSON.stringify(res.data.data)
                          );
                          this.$gsdialog
                            .alert(res.data.data.resultMessage, { html: true })
                            .then((dialog) => {
                              vm.$router.push('/cu/login');
                            });
                        } else if (res.data.data.resultCode === 'R7006') {
                          // 자체SMS(4Key)인증 받은 타사 통합회원
                          localStorage.setItem(
                            'uesrChk',
                            JSON.stringify(res.data.data)
                          );
                          this.$gsdialog
                            .alert(res.data.data.resultMessage, { html: true })
                            .then((dialog) => {
                              vm.$store.state.cu.custNo =
                                res.data.data.custNoEncKey;
                              vm.$store.state.cu.gsrContract1 =
                                res.data.data.agree1;
                              vm.$router.push('/cu/pop_offline_member');
                            });
                        } else if (res.data.data.resultCode === 'R7004') {
                          // 탈퇴 후 3개월 이내 회원
                          this.$gsdialog.alert(res.data.data.resultMessage, {
                            html: true,
                          });
                          return;
                        } else if (res.data.data.resultCode === '99999') {
                          // 회원정보중복
                          this.$gsdialog.alert(res.data.data.resultMessage, {
                            html: true,
                          });
                          return;
                        } else if (res.data.data.resultCode === 'R7053') {
                          // 타사 통합회원이며 GS리테일에서 약관 동의를 받아야 합니다.
                          this.$gsdialog
                            .alert(res.data.data.resultMessage, { html: true })
                            .then((dialog) => {
                              vm.$store.state.cu.custNo =
                                res.data.data.custNoEncKey;
                              vm.$store.state.cu.gsrContract1 =
                                res.data.data.agree1;
                              vm.popupAction('popupAgreement');
                            });
                        } else {
                          if (res.data.data.authAgree === 'Y') {
                            // 고객님은 GS&POINT 회원이십니다.GS&POINT 아이디로 로그인해주세요.
                            // 약관 미동의 회원
                            localStorage.setItem(
                              'uesrChk',
                              JSON.stringify(res.data.data)
                            );
                            this.$gsdialog
                              .alert(res.data.data.resultMessage, {
                                html: true,
                              })
                              .then((dialog) => {
                                vm.$store.state.cu.custNo =
                                  res.data.data.custNoEncKey;
                                vm.$router.push('/cu/login');
                              });
                          } else if (res.data.data.nullWebId === 'Y') {
                            // 오프라인 회원 외 아이디 없는 회원
                            this.$gsdialog
                              .alert(res.data.data.resultMessage, {
                                html: true,
                              })
                              .then((dialog) => {
                                vm.$store.state.cu.custNo =
                                  res.data.data.custNoEncKey;
                                vm.$store.state.cu.gsrContract1 =
                                  res.data.data.agree1;
                                vm.$router.push('/cu/pop_offline_member');
                              });
                          }
                        }
                        Tracker.signupMessage(res.data.data.resultMessage); // GS&POINT 와 GS fresh CI 신규
                      }
                    });
                })
                .catch((e) => {
                  console.log('canceled');
                });
            } else if (data.resultCode === 'R7054') {
              // Kixx 유출정보 고객입니다.
              this.$gsdialog
                .alert('개인정보보호를 위해</br>비밀번호 재설정이 필요합니다.</br></br>비밀번호 변경을 진행해 주세요.', {
                  html: true,
                })
                .then((dialog) => {
                  sessionStorage.setItem('reqGbn', '2');
                  this.$router.push('/cu/find_id_password/2');
                });
            } else if (data.resultCode === 'R7055') {
              // 그룹사에서 기관인증이 아닌 고객입니다.
            } else if (data.resultCode === 'R7053') {
              // 타사 통합회원이며 GS리테일에서 약관 동의를 받아야 합니다.
              vm.$store.state.cu.custNo = data.custNoEncKey;
              vm.popupAction('popupAgreement');
            } else if (data.resultCode === 'CRM') {
              // CRM 장애
              const ipin = unescape(encodeURIComponent(userChk.ipinCiCode));
              const km = unescape(encodeURIComponent(userChk.korName));
              sessionStorage.setItem('ipinCiCode', window.btoa(ipin));
              sessionStorage.setItem('korName', window.btoa(km));
              vm.$router.push('/cu/crm_login');
            } else {
              this.$gsdialog.alert(data.resultMessage, { html: true });
            }
            return;
          }

          if (callBack) {
            callBack();
          }
        }
      }
    },
    getJoinMbr() {
      const returnUrl = this.$route.query.returnUrl;
      if (this.joinNoticeTextFlag === false) {
        if (!StringUtils.isEmpty(returnUrl)) {
          this.$router.push('/cu/join_member?returnUrl=' + returnUrl);
        } else {
          this.$router.push('/cu/join_member');
        }
      } else {
        this.$gsdialog.alert(this.joinNoticeCnts, { html: true });
      }
      return;
    },
    getPress(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
      // const reg = /[a-zA-Z0-9<>(){}[\]\-_=+|\/\\'\;.:\"`~!?@#$%^&*]/gi;
      if (id == 'nick') {
        e.target.value = value.replace(reg, '');
        vm.form.webId = value.replace(reg, '');
      }
    },
    redirectUrl() {
      return new Promise((resolve)=> {
        if (!this.status) {
          resolve();
        }

        const returnUrl = this.$route.query.returnUrl;
        let loc = returnUrl;

        if (StringUtils.isEmpty(loc)) {
          loc = CuUtils.getLink();
        } else {
          if (!SiteUtils.isWhiteList(loc)) {
            loc = CuUtils.getLink();
          }
        }
        setTimeout(() => {
          console.log("redirectUrl", loc);
          location.href = loc;
          resolve();
        }, 500);
      });
    },
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
  created() {

  },
};
</script>
