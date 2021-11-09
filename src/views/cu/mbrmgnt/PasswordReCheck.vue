<!--
views/ss/SC-FO-SS-GF-MS-904.
-->
<template>
  <div class="wrap-mypage member-info" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="비밀번호 확인" :searchBtnBottom="true" :toBskt="true" :tabbar="false" :prevHomeType="true" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-input-info">
        <div class="inner">
          <div class="wrap-box" v-if="!simpleYn">
            <div class="txt-desc">
              개인정보 보호와 본인 확인을 위해<br />
              비밀번호를 한 번 더 입력해주세요
            </div>
            <div class="wrap-input">
              <div class="inp-id">
                <span class="label">아이디</span>
                <span class="txt-id">{{ userIdSubStr }}</span>
              </div>
              <div class="inp-box">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label class="hidden" for="">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  class="inp-txt"
                  placeholder="비밀번호"
                />
                <span class="txt-error">비밀번호를 입력해주세요.</span>
                <!-- 미입력시 MSG -->
                <span class="txt-error"
                  >비밀번호가 일치하지 않습니다. 다시 입력해주세요.</span
                >
                <!-- 불일치시 MSG -->
              </div>
            </div>
            <div class="btn-area">
              <button
                class="btn-lg btn-bg lightgreen"
                aria-label="비밀번호 확인"
                @click="onConfirm()"
              >
                확인
              </button>
            </div>
          </div>
          <div class="wrap-box" v-if="snsNaverSnsYN == 'Y' || snsKakaoSnsYN == 'Y' || snsFacebookSnsYN == 'Y' || snsPaycoSnsYN == 'Y' || snsAppleSnsYN == 'Y'">
            <div class="wrap-sns">
              <p class="txt-desc">
                SNS 계정과 연결하신 경우,<br />
                SNS 계정으로 한번 더 로그인해주세요
              </p>
              <!-- START : sns 로그인 간편확인 -->
              <ul class="list-link-sns">
                <li v-if="snsNaverSnsYN == 'Y'">
                  <a
                    href="javascript:void(0);"
                    class="ico naver"
                    title="네이버 로그인으로 이동"
                    @click="snsChk('01')"
                    ><span class="hidden">네이버 로그인</span></a
                  >
                </li>
                <li v-if="snsKakaoSnsYN == 'Y'">
                  <a
                    href="javascript:void(0);"
                    class="ico kakaotalk"
                    title="카카오톡 로그인으로 이동"
                    @click="snsChk('02')"
                    ><span class="hidden">카카오톡 로그인</span></a
                  >
                </li>
                <li v-if="snsFacebookSnsYN == 'Y'">
                  <a
                    href="javascript:void(0);"
                    class="ico facebook"
                    title="페이스북 로그인으로 이동"
                    @click="snsChk('03')"
                    ><span class="hidden">페이스북 로그인</span></a
                  >
                </li>
                <li v-if="snsPaycoSnsYN == 'Y'">
                  <a
                    href="javascript:void(0);"
                    class="ico payco"
                    title="페이코 로그인으로 이동"
                    @click="snsChk('04')"
                    ><span class="hidden">페이코 로그인</span></a
                  >
                </li>
                <li v-if="snsAppleSnsYN == 'Y' && mobil =='ios'">
                  <a
                    href="javascript:void(0);"
                    class="ico apple"
                    title="애플 로그인으로 이동"
                    @click="snsChk('05')"
                    ><span class="hidden">애플 로그인</span></a
                  >
                </li>
              </ul>
              <!-- END : sns 로그인 간편확인 -->
            </div>
          </div>
        </div>
      </div>
    </main>
      <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import CuUtils from '@/common/cu/CuUtils';
import Footer from '@/components/common/Footer';
import LoginUtils from "@/common/LoginUtils"; // 푸터
export default {
  name: 'PasswordReconfirm',
  data() {
    return {
      popupAddrChange: false,
      userId: '',
      userIdSubStr: '',
      mbrTypeCd: '', // 회원구분유형
      snsNaverSnsId: '',
      snsKakaoSnsId: '',
      snsFacebookSnsId: '',
      snsPaycoSnsId: '',
      snsAppleSnsId: '',
      snsNaverSnsYN: '',
      snsKakaoSnsYN: '',
      snsFacebookSnsYN: '',
      snsPaycoSnsYN: '',
      snsAppleSnsYN: '',
      mobil: '',
      simpleYn: false,
      siteClass: '',
      name: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate:
      '비밀번호 재확인 < 회원정보 수정 < 회원정보 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '비밀번호 확인',
      },
    ],
  },
  mixins: [],
  components: {
    SubDefaultHeader,
    Footer,
  },
  methods: {
    snsChk: async function(div) {
      if (div == '01') {
        if (this.snsNaverSnsYN == 'N') {
          this.$gsdialog.alert('네이버 계정과 연결 후 사용하세요.', { html: true });
          return;
        }
        this.snsSuccessId = this.snsNaverSnsId;
      } else if (div == '02') {
        if (this.snsKakaoSnsYN == 'N') {
          this.$gsdialog.alert('카카오 계정과 연결 후 사용하세요.', { html: true });
          return;
        }
        this.snsSuccessId = this.snsKakaoSnsId;
      } else if (div == '03') {
        if (this.snsFacebookSnsYN == 'N') {
          this.$gsdialog.alert('페이스북 계정과 연결 후 사용하세요.', { html: true });
          return;
        }
        this.snsSuccessId = this.snsFacebookSnsId;
      } else if (div == '04') {
        if (this.snsPaycoSnsYN == 'N') {
          this.$gsdialog.alert('페이코 계정과 연결 후 사용하세요.', { html: true });
          return;
        }
        this.snsSuccessId = this.snsPaycoSnsId;
      } else if (div == '05') {
        if (this.snsAppleSnsYN == 'N') {
          this.$gsdialog.alert('애플 계정과 연결 후 사용하세요.', { html: true });
          return;
        }
        this.snsSuccessId = this.snsAppleSnsId;
      }
      if (div != '05') {
        this.getSnsLogin(div); // sns로그인
      } else {
        this.getAppLogin(); // 애플
      }
    },
    getSnsLogin: function(type) {
      // SNS
      const mobType = 'MOB';
      const data = {
        snsType: type,
        mobType: mobType,
        snsLoginYn: 'N',
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
      };
      localStorage.setItem('mobType', mobType);
      ApiUtils.get('/fo/cu/loginmgnt/sns-login', data, {
        'Content-Type': 'application/json',
      }).then(res => {
        if (res.data === null) {
          console.error(res.data.msg);
          this.$gsdialog.alert('SNS로그인을 불러올수 없습니다.', { html: true });
          return;
        } else {
          const apiURL = res.data.data.apiURL;
          const vidDomain = LoginUtils.getViaDomain();
          const viaURL = vidDomain + '/cu/via?to=' + encodeURIComponent(apiURL);
          const dvcId = localStorage.getItem("deviceId");
          // 모바일 접근 체크 //
          // 모바일일 경우 (변동사항 있을경우 추가 필요)
          if (!StringUtils.isEmpty(dvcId)) {
            const popupX = CuUtils.popupX('500');
            const popupY = CuUtils.popupY('600');
            window.open(
              viaURL,
              'gssmapp',
              'scrollbars=yes,toolbar=yes,resizable=yes,width=500,height=600,left=' +
                popupX +
                ',top=' +
                popupY
            );
          } else {
            if (mobType === 'MOB') {
              localStorage.setItem('snsReUrl', '/cu/password_re_check');
              window.location.href = viaURL;
            } else {
              const popupX = CuUtils.popupX('500');
              const popupY = CuUtils.popupY('600');
              window.open(
                viaURL,
                'gssmapp',
                'scrollbars=yes,toolbar=yes,resizable=yes,width=500,height=600,left=' +
                  popupX +
                  ',top=' +
                  popupY
              );
            }
          }
        }
      });
    },
    onConfirm: function() {
      const success = this.isValidation();
      if (success) {
        this.passwordReCheck('idPsw', this.userId, document.getElementById('password').value);
      }
    },
    isValidation: function() {
      let success = true;
      const pwd = document.getElementById('password').value;
      if (StringUtils.isEmpty(StringUtils.trim(pwd))) {
        this.$gsdialog.alert('비밀번호를 입력해 주세요.', { html: true });
        success = false;
      }
      return success;
    },
    getSnsMng: async function() {
      // sns연결관리
      const result = await ApiUtils.get('/fo/cu/loginmgnt/sns-connection-yn', null);
      console.log('====result::' + JSON.stringify(result.data.data) + '::::');

      this.snsNaverSnsYN = result.data.data["01"]||'N';
      this.snsKakaoSnsYN = result.data.data["02"]||'N';
      this.snsFacebookSnsYN = result.data.data["03"]||'N';
      this.snsPaycoSnsYN = result.data.data["04"]||'N';
      this.snsAppleSnsYN = result.data.data["05"]||'N';
    },
    convertId: function(usrId) {
      let convertId = "";
      let notId = "";
      for (let i = 0; i < usrId.length; i++) {
        if (i < 3) {
          convertId = convertId + this.userId.substring(i, i+1);
        } else {
          notId = notId + "*";
        }
      }
      return convertId + notId;
    },
    // 애플 로그인
    getAppLogin() {
      const date = {
        type: 'L'
      };
      window.appCallappleIdLogin(date);
    },
    // 모바일 구분
    getAppInfo() {
      const UserAgent = window.navigator.userAgent;
      const mobileKeyWords = ['gssmapp_ios', 'dalisalda_ios', 'marketfor_ios'];
      let device = '';
      let osVer = '';
      for (const word in mobileKeyWords) {
        if (UserAgent.match(mobileKeyWords[word]) != null) {
          device = mobileKeyWords[word];
          break;
        }
      }
      if (device == 'gssmapp_ios' || device == 'dalisalda_ios' || device == 'marketfor_ios') { // gssmapp_ios_3.0.0_13.5.1
        const newVer = UserAgent.lastIndexOf('_');
        const strVer = UserAgent.substring(newVer + 1);
        const sEnd = strVer.indexOf('.');
        osVer = strVer.substring(0, sEnd);
        if (osVer >= '13') {
          this.mobil = 'ios';
        } else {
          this.mobil = 'android';
        }
      } else {
        this.mobil = 'android';
      }
    },
    passwordReCheck: function(type, id, pw) {
      const PswChkInputDto = {
        type: type,
        webId: id,
        psw: pw,
      };
      ApiUtils.post('/fo/cu/loginmgnt/password-re-check', PswChkInputDto).then( res => {
        if (res.data.success) {
          const pswRechkToken = res.data.data.pswRechkToken;
          this.$router.replace({name: this.name, params: {pswRechkToken: pswRechkToken}}); // 2021.03모의해킹대응
        } else {
          this.$gsdialog.alert('아이디와 비밀번호가 일치하지 않습니다.', { html: true });
        }
      });
    }
  },
  mounted: async function() {
    this.siteClass = CookieUtils.getSiteClass();
    // 앱정보 조회
    try {
      window.appCallAppInfo();
    } catch (e) {
      console.log(e);
    }
    const resultMemInfo = await ApiUtils.get(
      '/fo/cu/mbrmgnt/member-information',
      null
    );
    this.mbrTypeCd = resultMemInfo.data.data.mbrTypeCd;

    if (this.mbrTypeCd=='01') {
      this.name = 'regularmembermodify';
    } else {
      this.name = 'associatemembermodify';
    }

    this.userId = resultMemInfo.data.data.webId;
    if (!StringUtils.isEmpty(this.userId)) {
      this.userIdSubStr = this.userId;// this.userId.substring(0, 3);
    } else {
      if (this.mbrTypeCd == "02") {
        this.simpleYn = true;
      }
    }
    this.getSnsMng();
    const vm = this;
    // 모바일 구분
    vm.getAppInfo();
    // 네이버 콜백
    window.getSnsNaverCallback = function (resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
      vm.passwordReCheck('sns', snsType, snsId);
      if (callBack) {
        callBack();
      }
    };
    // 카카오
    window.getSnsKakaoCallback = function (resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
      vm.passwordReCheck('sns', snsType, snsId);
      if (callBack) {
        callBack();
      }
    };
    // 페이스북
    window.getSnsFbCallback = function (resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
      vm.passwordReCheck('sns', snsType, snsId);
      if (callBack) {
        callBack();
      }
    };
    // 페이코
    window.getSnsPaycoCallback = function (resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
      vm.passwordReCheck('sns', snsType, snsId);
      if (callBack) {
      }
    };
    // 애플
    window.getSnsAppleCallback = function () {
      vm.passwordReCheck('sns', '05', localStorage.getItem("idCredential"));
      if (callBack) {
      }
    };

    // 모바일 SNS 로그인
    const snsTypeCod = localStorage.getItem('snsTypeCod');
    const snsId = localStorage.getItem('snsId');
    const snsDate = localStorage.getItem('snsDate');
    if (!StringUtils.isEmpty(snsTypeCod)) {
      localStorage.removeItem('snsTypeCod');
      localStorage.removeItem('snsReUrl');
      localStorage.removeItem('snsId');
      localStorage.removeItem('snsDate');
      this.passwordReCheck('sns', snsTypeCod, snsId);
    }
  },
};
</script>
