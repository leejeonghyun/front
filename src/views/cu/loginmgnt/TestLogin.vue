<!--
Design: SC-FO-CU-GF-MS-018
Uri: /cu/test_login --
-->
<template>
  <div class="wrap-login">
    <SubDefaultHeader headerText="로그인" prevType="true" />
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="login-wrap">
        <!-- START : 로그인 input -->
        <section class="section-area login">
          <h2 class="hidden">로그인 폼 입력</h2>
          <div class="inner">
            <fieldset class="warp-input-txt">
              <!-- 아이디/비밀번호 정상일 경우 로그인처리 입력값 오류 (5회 미만)일 경우 error 클래스 추가 -->
              <label>커머스회원번호</label>
              <input
                type="cmmMbrNo"
                id="cmmMbrNo"
                class="inp-txt w100"
                value
                v-model="form.cmmMbrNo"
                placeholder="커머스회원번호"
              />
              <label>고객번호</label>
              <input
                type="custNo"
                id="custNo"
                class="inp-txt w100"
                value
                v-model="form.custNo"
                placeholder="고객번호"
              />
              <label>회원유형</label>
              <input
                type="mbrTypeCd"
                id="mbrTypeCd"
                class="inp-txt w100"
                value
                v-model="form.mbrTypeCd"
                placeholder="회원유형"
              />
              <label>고객명</label>
              <input
                type="custNm"
                id="custNm"
                class="inp-txt w100"
                value
                v-model="form.custNm"
                placeholder="고객명"
              />
              <label>웹ID</label>
              <input
                type="webId"
                id="webId"
                class="inp-txt w100"
                value
                v-model="form.webId"
                placeholder="웹ID"
              />
              <label>회원등급코드</label>
              <input
                type="custGrdCd"
                id="custGrdCd"
                class="inp-txt w100"
                value
                v-model="form.custGrdCd"
                placeholder="회원등급코드"
              />
              <label>유료멤버십가입현황코드</label>
              <input
                type="pmbsJoinPrcnCd"
                id="pmbsJoinPrcnCd"
                class="inp-txt w100"
                value
                v-model="form.pmbsJoinPrcnCd"
                placeholder="유료멤버십가입현황코드"
              />
              <label>매장ID</label>
              <input
                type="storId"
                id="storId"
                class="inp-txt w100"
                value
                v-model="form.storId"
                placeholder="매장ID"
              />
              <label>공급업체코드</label>
              <input
                type="supplFirmCd"
                id="supplFirmCd"
                class="inp-txt w100"
                value
                v-model="form.supplFirmCd"
                placeholder="공급업체코드"
              />
              <label>접속몰</label>
              <input
                type="mallId"
                id="mallId"
                class="inp-txt w100"
                value
                v-model="form.mallId"
                placeholder="접속몰"
              />
              <label>사이트접속매체유형코드</label>
              <input
                type="steConnMdaTypeCd"
                id="steConnMdaTypeCd"
                class="inp-txt w100"
                value
                v-model="form.steConnMdaTypeCd"
                placeholder="사이트접속매체유형코드"
              />
            </fieldset>
            <br />
            <!-- START : 로그인 버튼 -->
            <div class="btn-area">
              <button
                type="button"
                class="btn-lg btn-bg lightgreen"
                aria-haspopup="dialog"
                aria-label="바로가기"
                @click="getLogin()"
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
        <section class="section-area login easy hidden">
          <div class="inner">
            <h2 class="sub-title">간편로그인</h2>
            <!-- START : 간편 로그인 링크 이동 -->
            <ul class="list-link-sns">
              <li class="link-certify">
                <!-- START : 본인인증 로그인 버튼 -->
                <form class="form-horizontal" id="subKmc" name="subKmc" method="post" action>
                  <a class="ico certify" title="본인인증 로그인으로 이동" @click="getAuthenticationLogin()">
                    <span class="hidden">본인인증 로그인</span>
                  </a>
                  <input
                    type="hidden"
                    id="tr_cert"
                    name="tr_cert"
                    v-model="form.trCert"
                    class="form-control"
                  />
                  <input
                    type="hidden"
                    id="tr_url"
                    name="tr_url"
                    v-model="form.trUrl"
                    class="form-control"
                  />
                  <input
                    type="hidden"
                    id="tr_add"
                    name="tr_add"
                    v-model="form.trAdd"
                    class="form-control"
                  />
                </form>
                <!-- END : 본인인증 로그인 버튼 -->
                <span class="tag gsfresh">본인인증으로 로그인하세요!</span>
              </li>
              <li>
                <a class="ico naver" title="네이버 로그인으로 이동" @click="getSnsLogin('01')">
                  <span class="hidden">네이버 로그인</span>
                </a>
              </li>
              <li>
                <a class="ico kakaotalk" title="카카오톡 로그인으로 이동" @click="getSnsLogin('02')">
                  <span class="hidden">카카오톡 로그인</span>
                </a>
              </li>
              <li>
                <a class="ico facebook" title="페이스북 로그인으로 이동" @click="getSnsLogin('03')">
                  <span class="hidden">페이스북 로그인</span>
                </a>
              </li>
              <li>
                <a class="ico payco" title="페이코 로그인으로 이동" @click="getSnsLogin('04')">
                  <span class="hidden">페이코 로그인</span>
                </a>
              </li>
            </ul>
            <!-- END : 간편 로그인 링크 이동 -->
            <!-- START : 회원가입 링크 -->
            <a class="btn-link" title="회원가입 링크 이동">
              <span>회원가입</span>
            </a>
            <!-- END : 회원가입 링크 -->
          </div>
        </section>
        <!-- END : 간편 로그인 -->
        <ul class="list-info hidden">
          <li>로그인 전 대표매장은 fresh1호센터로 전시됩니다.</li>
          <li>배송지 등록 후 상품의 재고나 가격이 변동될 수 있습니다.</li>
        </ul>
        <PopupDormantAccount @popupEvent="popupAction" v-if="this.popup.popupDormantAccount" />
        <!-- 휴면해제 팝업 -->
        <PopupAgreement @popupEvent="popupAction" v-if="this.popup.popupAgreement" :popup="popup" />
        <!-- 필수약관 팝업 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import PopupDormantAccount from '@/views/cu/loginmgnt/PopupDormantAccount.vue'; // 휴면해제 팝업
import PopupAgreement from '@/views/cu/loginmgnt/PopupAgreement.vue'; // 약관동의 팝업
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'Login',
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '로그인 < %s',
  },
  components: {
    SubDefaultHeader, // 헤더
    PopupDormantAccount, // 휴면해제 팝업
    PopupAgreement, // 약관동의
  },
  data() {
    return {
      form: {
        cmmMbrNo: '3664754',
        custNo: 'E000007602410',
        mbrTypeCd: '01',
        custNm: '테스트',
        webId: 'test1234',
        custGrdCd: '02',
        pmbsJoinPrcnCd: '0001',
        storId: '983',
        supplFirmCd: '31001',
        mallId: CookieUtils.getMallId(),
        steConnMdaTypeCd: CookieUtils.getMdaType(),
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
        popupDormantAccount: false, // 휴면해제 팝업
        popupAgreement: false, // 약관동의 팝업
      },
    };
  },
  created() {
    if (!StringUtils.isEmpty(StringUtils.trim(localStorage.getItem('reUrl')))) {
      const rec = localStorage.getItem('strRecCert');
      const cer = localStorage.getItem('strCertNum');
      localStorage.removeItem('reUrl');
      localStorage.removeItem('strRecCert');
      localStorage.removeItem('strCertNum');
      this.getSelfCertif(rec, cer);
    }
  },
  mounted() {
    window.getSnsNaverCallback = function getSnsNaverCallback(
      resultCode,
      resultMessage,
      snsId,
      snsType,
      snsName,
      snsEmail,
      snsAccessToken
    ) {
      alert('네이년');
    };
    window.getSnsKakaoCallback = function getSnsKakaoCallback(
      resultCode,
      resultMessage,
      snsId,
      snsType,
      snsName,
      snsEmail,
      snsAccessToken
    ) {
      alert('카카옹');
    };
    window.getSelfCertification = function getSelfCertification(
      strRecCert,
      strCertNum
    ) {
      this.getSelfCertif(strRecCert, strCertNum);
    };
    if (
      sessionStorage.getItem('authAgree') != '' &&
      sessionStorage.getItem('authAgree') != null
    ) {
      // 타사 회원이 본인 인증으로 가입 할 시 약관 동의 본인 인증 로그인 호출
      if (
        sessionStorage.getItem('ipinCiCode') != '' &&
        sessionStorage.getItem('ipinCiCode') != null
      ) {
        this.getAuthenticationLogin();
      }
    } else if (
      sessionStorage.getItem('authAgree') === '' ||
      sessionStorage.getItem('authAgree') === null
    ) {
      // 이미 가입된 회원이 본인 인증으로 가입 할 시 본인 인증 로그인 호출
      if (
        sessionStorage.getItem('ipinCiCode') != '' &&
        sessionStorage.getItem('ipinCiCode') != null
      ) {
        this.getAuthenticationLogin();
      }
    }
  },
  methods: {
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
    // 수정 END : 2020.03.24 추가
    getLogin: async function() {
      // alert("임시 로그인 방법 입니다. 정상적인 방법으로 로그인 진행하시기 바랍니다.");
      // return;
      const vm = this;
      const key = encodeURI(this.form.psw);
      const data = {
        cmmMbrNo: this.form.cmmMbrNo,
        custNo: this.form.custNo,
        mbrTypeCd: this.form.mbrTypeCd,
        custNm: this.form.custNm,
        webId: this.form.webId,
        custGrdCd: this.form.custGrdCd,
        pmbsJoinPrcnCd: this.form.pmbsJoinPrcnCd,
        storId: this.form.storId,
        supplFirmCd: this.form.supplFirmCd,
        mallId: this.form.mallId,
        steConnMdaTypeCd: this.form.steConnMdaTypeCd,
      };
      // vm.popupAction('popupAgreement');
      const headers = this.defaultHeader;
      const response = await ApiUtils.post(
        '/fo/cu/loginmgnt/testCreateLoginJwtCookies',
        data,
        headers
      );
      if (response.data.success === true) {
        const data = response.data.data;
        JwtUtils.saveRefreshToken(data.jwtRslt.refreshToken);
        JwtUtils.saveIdToken(data.jwtRslt.idToken);
        JwtUtils.saveEncVal(response.data.data.ENC_VAL);
        const user = response.data.data.userRslt;
        CookieUtils.setLoginCookies(user);
        alert('로그인 성공입니다.');
        vm.captcha.newPg = 'I';
        vm.result = '로그인 성공입니다.';
        vm.status = true;
        const returnUrl = vm.$route.query.returnUrl;
        if (returnUrl) {
          location.href = returnUrl;
        }
      } else {
        const data = response.data.data;
        if (data.resultCode === 'R7056') {
          // R7056 휴면회원
          this.popupAction('popupDormantAccount');
          return;
        }
        // 캡차 노출
        if (data.resultCode === 'R7050') {
          vm.captcha.newPg = 'I';
          vm.getCaptcha('img');
        }
        if (data.resultCode === 'R7051') {
          // R7056 아이디패스워드 오류
          alert(data.resultMessage);
          return;
        }
        if (data.resultCode === 'R7053') {
          // R7056 약관 동의를 받아야 합니다.
          alert(data.resultMessage);
          this.popupAction('popupAgreement');
          return;
        }
        return;
        // vm.$gsdialog.alert('로그인실패, 다시 확인해 주세요.');
      }
    },
    getAuthenticationLogin: function() {
      if (
        sessionStorage.getItem('ipinCiCode') != '' &&
        sessionStorage.getItem('ipinCiCode') != null
      ) {
        alert('넌 본인인증 했어.. 로그인 만들께');
      } else {
        // 본인 인증 호출 로직 추가
        // KMC 본인확인 호출
        alert('본인 확인을 위하여\n휴대폰 본인인증을 진행합니다');
        const certType = { certType: 'C' };
        ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType)
          .then(res => {
            if (res.data === null) {
              console.error(res.data.msg);
              alert('본인 확인을 불러올 수 없습니다.');
              return;
            } else {
              this.form = res.data.data;
            }
          })
          .then(res => {
            const kmcIsWindow = '';
            const UserAgent = window.navigator.userAgent;
            // 모바일웹 리턴 URL 추가
            localStorage.setItem('reUrl', '#/cu/login');
            // 모바일 접근 체크 //
            // 모바일일 경우 (변동사항 있을경우 추가 필요)
            if (
              UserAgent.match(
                /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
              ) != null ||
              UserAgent.match(/LG|SAMSUNG|Samsung/) != null
            ) {
              subKmc.target = '';
            } else {
              window.open(
                '',
                'kmcIsWindow',
                'width=500, height=600, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250'
              );
              subKmc.target = 'kmcIsWindow';
            }
            subKmc.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
            // subKmc.method = 'post';
            subKmc.submit();
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
    getCaptcha: async function(type) {
      // 캡차
      const vmCap = this;
      const data = {
        captchaType: type,
      };
      const response = await ApiUtils.get(
        '/fo/cu/loginmgnt/captcha-check',
        data
      );
      if (response.data.success === true) {
        const data = response.data.data;
        vmCap.captcha.key = data.key;
        if (type == 'img') {
          vmCap.captcha.tmpCaptcah =
            '<img v-if="captcha.viewChange" src="data:image/jpg;base64,' +
            data.image +
            '" alt="자동 입력 방지 문자 이미지">';
          vmCap.captcha.isCaptcha = true;
          vmCap.captcha.newPg = 'I';
          vmCap.form.captchaType = 'img';
        } else {
          vmCap.captcha.tmpCaptcah =
            '<div class="captcha-voice"><p class="voice-desc">음성으로 안내되고 있습니다.<br/>(시작음 3회 반복 후 재생)</p><audio src="data:audio/wav;base64,' +
            data.image +
            '" autoplay></audio></div>';
          vmCap.captcha.isCaptcha = true;
          vmCap.captcha.newPg = 'V';
          vmCap.form.captchaType = 'wav';
        }
      }
    },
    getSnsLogin: function(type) {
      // SNS
      const data = {
        snsType: type,
      };
      ApiUtils.get('/fo/cu/loginmgnt/sns-login', data).then(res => {
        if (res.data === null) {
          console.error(res.data.msg);
          this.$gsdialog.alert('SNS로그인을 불러올수 없습니다.');
          return;
        } else {
          const apiURL = res.data.data.apiURL;
          window.open(
            apiURL,
            'gssmapp',
            'scrollbars=yes,toolbar=yes,resizable=yes,width=500,height=600,left=0,top=0'
          );
        }
      });
    },
    getFindIdPw: function(type) {
      // ID/PW 찾기
      sessionStorage.setItem('typ', type);
      this.$router.push('#/cu/find_id_password');
    },
    // 클리어 버튼
    getBtnClear(type) {
      if (type == 'id') {
        this.form.webId = '';
      } else if (type == 'psw') {
        this.form.psw = '';
      }
    },
    getSelfCertif: function(strRecCert, strCertNum) {
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', date).then(
        res => {
          if (res.data === null) {
            console.error(res.data.msg);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
            return;
          } else {
            const altName = res.data.data.name;
            const strHp1 = res.data.data.phoneNo.substr(0, 3);
            const strHp2 = res.data.data.phoneNo.substr(3, 4);
            const strHp3 = res.data.data.phoneNo.substr(7, 4);
            const uesrChk = {
              mbrJoinPosbType: 'M',
              korName: res.data.data.name,
              bdate: res.data.data.birthDay,
              gender: res.data.data.gender == '0' ? 'M' : 'F',
              hp1: strHp1,
              hp2: strHp2,
              hp3: strHp3,
              ipinCiCode: res.data.data.ci,
              foreignYn: res.data.data.nation == '0' ? 'N' : 'Y',
              hp: res.data.data.phoneNo,
              phoneCorp: res.data.data.phoneCorp,
            };
            const headers = this.defaultHeader;
            ApiUtils.post(
              '/fo/cu/loginmgnt/self-certification',
              uesrChk,
              headers
            ).then(response => {
              if (response.data === null) {
                console.error(response.data.msg);
                alert('본인 확인을 불러올 수 없습니다.');
                return;
              } else {
                const data = response.data.data;
                if (data.resultCode === '00000') {
                  const data = response.data.data;
                  JwtUtils.saveRefreshToken(data.jwtRslt.refreshToken);
                  JwtUtils.saveIdToken(data.jwtRslt.idToken);
                  JwtUtils.saveEncVal(response.data.data.ENC_VAL);
                  alert('로그인 성공입니다.');
                  this.result = '로그인 성공입니다.';
                  this.status = true;
                } else if (data.resultCode === 'R7053') {
                  alert(data.resultMessage);
                  return;
                }
              }
            });
          }
        }
      );
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
};
</script>
<style lang="scss">
</style>
