<!--
Design: views/cu/SC-FO-CU-GF-MS-024
Pg id: .
Uri: /cu/crm_login_error
-->
<template>
  <div class="wrap-login crm-login" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="로그인" :prevHomeType="true" :tabbar="false" />
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <form class="form-horizontal" id="subKmc" name="subKmc" method="post" action>
      <div class="wrap-user-form crm-login">
        <div class="inner">
          <p class="txt-title">
            지금은 시스템 점검 중으로<br/>로그인이 원활하지 않을 수 있습니다.
          </p>
          <p class="txt-sub-desc">
            휴대폰  본인인증을 하시면<br/>계속해서 장보기를 하실 수 있습니다.
          </p>
          <p class="txt-sub-desc" style="color:#f00">
            간편회원의 경우<br/>점검기간동안 쇼핑이 불가합니다.
          </p>
        </div>
        <div class="sub-btn-area">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="getAuthenticationLogin()">{{form.btnNm}}</button>
          <input
            type="hidden"
            id="tr_cert"
            name="tr_cert"
            v-model="self.trCert"
            class="form-control"
          />
          <input
            type="hidden"
            id="tr_url"
            name="tr_url"
            v-model="self.trUrl"
            class="form-control"
          />
          <input
            type="hidden"
            id="tr_add"
            name="tr_add"
            v-model="self.trAdd"
            class="form-control"
          />
        </div>
        <ul class="list-info">
          <li>통합회원에 한해 휴대폰 본인인증 후 주문결제가 가능하며, 간편회원은 시스템 점검 이후 주문결제가 가능합니다.</li>
          <li>입력된 정보는 본인 확인을 위해 본인인증기관에 제공되며, 본인 확인 외에 사용되거나 저장되지 않습니다.</li>
        </ul>
      </div>
      </form>
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
    <Loading v-show="loading > 0" />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import CuUtils from '@/common/cu/CuUtils';
import Tracker from '@/common/Tracker';
import ConsoleUtils from '@/common/ConsoleUtils';
import Loading from '@/components/common/Loading';

export default {
  name: "CRMLogin",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '로그인 < %s'
  },
  components: {
    SubDefaultHeader,
    Footer,
    Loading,
  },
  data() {
    return {
      form: {
        result: '',
        status: false,
        idToken: '',
        refreshToken: '',
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        btnNm: '휴대폰 본인인증',
      },
      defaultHeader: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      self: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        certNum: '',
        apiUrl: '',
      },
      storeItemsData: [],
      iframeAccountsLoginSrc: '', // CrossDomain Login
      targetOrigin: '', // CrossDomain Login
      siteClass: CookieUtils.getSiteClass(),
      odBsktUuid: CookieUtils.getOdBsktUuid(),
      loading: 0,
    };
  },
  mounted() {
    const vm = this;
    // 앱정보 조회
    try {
      window.appCallAppInfo();
    } catch (e) {
      console.log(e);
    }
    // 모바일 구분
    vm.getAppInfo();
    if (LoginUtils.isLogin()) {
      const returnUrl = vm.$route.query.returnUrl;
      if (!StringUtils.isEmpty(returnUrl)) {
        location.href = returnUrl;
      } else {
        const string = CuUtils.getLink();
        location.href = string;
      }
    }
    if (
      sessionStorage.getItem('ipinCiCode') != '' &&
      sessionStorage.getItem('ipinCiCode') != null
    ) {
      vm.form.btnNm = '확인';
    } else {
      vm.form.btnNm = '휴대폰 본인인증';
    }
    // PC KMC인증
    window.getSelfCertification = function(strRecCert, strCertNum, callBack) {
      vm.getSelfCertif(strRecCert, strCertNum, callBack);
    };
    // 모바일 KMC인증
    const strRecCert = localStorage.getItem('strRecCert');
    const strCertNum = localStorage.getItem('strCertNum');
    vm.form.strRecCert = strRecCert;
    if (!StringUtils.isEmpty(strRecCert)) {
      localStorage.removeItem('strRecCert');
      localStorage.removeItem('strCertNum');
      localStorage.removeItem('reUrl');
      vm.getSelfCertif(strRecCert, strCertNum);
    }
    localStorage.removeItem('uesrChk');
    // CrossDomain Login Callback
    vm.getAccountsLoginCallback(vm);
  },
  methods: {
    getAuthenticationLogin: function() {
      if (
        sessionStorage.getItem('ipinCiCode') != '' &&
        sessionStorage.getItem('ipinCiCode') != null
      ) {
        const ipin = decodeURIComponent(escape(window.atob(sessionStorage.getItem('ipinCiCode'))));
        const km = decodeURIComponent(escape(window.atob(sessionStorage.getItem('korName'))));
        const vm = this;
        const uesrChk = {
          mbrJoinPosbType: 'M',
          korName: km,
          ipinCiCode: ipin,
          mallId: CookieUtils.getMallId(),
          cmmSteId: CookieUtils.getCmmSteId(),
          mdaType: CookieUtils.getMdaType(),
          domail: CookieUtils.getDomain(),
          chanlId: CookieUtils.getChanlId(),
          chkCrm: 'Y',
        };
        sessionStorage.removeItem('korName');
        sessionStorage.removeItem('ipinCiCode');
        const headers = this.defaultHeader;
        ApiUtils.post('/fo/cu/loginmgnt/self-certification', uesrChk, {
          'Content-Type': 'application/json',
        }).then(response => {
          if (response.data === null) {
            console.error(response.data.msg);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
            return;
          } else {
            if (response.data.success === true) {
              const data = response.data.data;
              JwtUtils.setAutoLogin(this.form.autoLogin);
              JwtUtils.saveRefreshToken(data.jwtRslt.refreshToken);
              JwtUtils.saveIdToken(data.jwtRslt.idToken);
              JwtUtils.saveEncVal(response.data.data.ENC_VAL);
              // alert('로그인 성공입니다.');
              Tracker.loginSuccess(data.userRslt.custNo);
              const user = response.data.data.userRslt;
              CookieUtils.setLoginCookies(user);
              if (!StringUtils.isEmpty(data.spctdFlag)) {
                if (data.spctdFlag === 'S') {
                  vm.$gsdialog.alert('휴면이 해제되었습니다.', { html: true });
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
                    ).then(response => {
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
                ).then(response => {
                  console.log(
                    '/fo/od/bsktmgnt/bskt-merge :: ' + response.data.success
                  );
                });
              } catch (e) {
                console.log(e);
              }
              // APP 로그인 경우
              const dvcId = '';
              // const dvcId = 'M10284216644';
              if (!StringUtils.isEmpty(dvcId)) {
                const autoLoginYn = '';
                if (this.form.autoLogin) {
                  this.form.autoLogin ='Y';
                } else {
                  this.form.autoLogin ='N';
                }
                const autoData = {
                    dvcId: dvcId,
                    connIpAddr: '192.168.35.95',
                    autoLoginCertVal: 'd345e763114a228d656d6868841ebdd77671211cd6fb585bc84e432d1acc5411',
                    cmmSteId: '1',
                    autoLoginYn: this.form.autoLogin,
                };
                ApiUtils.post('/fo/cu/loginmgnt/app-auto-login-registration', autoData);
              }
              const returnUrl = vm.$route.query.returnUrl;
              if (!StringUtils.isEmpty(returnUrl)) {
                location.href = returnUrl;
              } else {
                const string = CuUtils.getLink();
                location.href = string;
              }
            } else {
              const data = response.data.data;
              if (data.resultCode === '50011') {
                // 고객정보없음
                this.$gsdialog.confirm('고객님은 아직 회원이 아닙니다.<br/>회원가입하시겠습니까?', { html: true }).then(dialog => {
                  this.$router.push('/cu/join_member');
                });
              } else if (data.resultCode === 'R7051') {
                // 아이디 비밀번호 불일치
                vm.$gsdialog.alert(
                  '아이디와 비밀번호가 일치하지 않습니다.<br/>다시 확인해주세요.', { html: true }
                );
              } else if (data.resultCode === 'R7050') {
                // 캡차 노출
                vm.captcha.newPg = 'I';
                vm.getCaptcha('img');
              } else if (data.resultCode === 'R7054') {
                // Kixx 유출정보 고객 입니다.
                vm.$gsdialog.alert('개인정보보호를 위해</br>비밀번호 재설정이 필요합니다.</br></br>비밀번호 변경을 진행해 주세요.', { html: true }).then(dialog =>{
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
              } else {
                vm.$gsdialog.alert(data.resultMessage, { html: true });
              }
              return;
            }
          }
        });
      } else {
        // 본인 인증 호출 로직 추가
        // KMC 본인확인 호출
        this.$gsdialog.alert('본인 확인을 위하여<br/>휴대폰 본인인증을 진행합니다', { html: true }).then(dialog =>{
          const mall = CookieUtils.getMallId();
          const cmmSteId = CookieUtils.getCmmSteId();
          const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId }; // 모바일 화면은 M , PC 화면은 P
          ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType, {
            'Content-Type': 'application/json',
          })
            .then(res => {
              if (res.data === null) {
                console.error(res.data.msg);
                this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
                return;
              } else {
                this.self = res.data.data;
              }
            })
            .then(res => {
              const kmcIsWindow = '';
              const UserAgent = window.navigator.userAgent;
              const dvcId = localStorage.getItem("deviceId");
              // 모바일 접근 체크 //
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
    // 본인인증 로그인
    getSelfCertif: async function(strRecCert, strCertNum, callBack) {
      if (callBack) {
        callBack();
      }
      const vm = this;
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      this.loading++;
      const res = await ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', date, {'Content-Type': 'application/json'});
      this.loading--;
      if (res.data === null) {
        console.error(res.data.msg);
        this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
        return;
      } else {
        const altName = res.data.data.nameShow;
        const uesrChk = {
          mbrJoinPosbType: 'M',
          korName: res.data.data.name,
          ipinCiCode: res.data.data.ci,
          mallId: CookieUtils.getMallId(),
          cmmSteId: CookieUtils.getCmmSteId(),
          mdaType: CookieUtils.getMdaType(),
          domail: CookieUtils.getDomain(),
          chanlId: CookieUtils.getChanlId(),
          chkCrm: 'Y',
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
        const headers = this.defaultHeader;
        this.loading++;
        const response = await ApiUtils.post('/fo/cu/loginmgnt/self-certification', uesrChk, {'Content-Type': 'application/json'});
        this.loading--;
          if (response.data === null) {
            console.error(response.data.msg);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
            return;
          } else {
            if (response.data.success === true) {
              const data = response.data.data;
              JwtUtils.setAutoLogin(vm.form.autoLogin);
              const refreshToken = data.jwtRslt.refreshToken;
              JwtUtils.saveRefreshToken(refreshToken);
              JwtUtils.saveIdToken(data.jwtRslt.idToken);
              JwtUtils.saveEncVal(response.data.data.ENC_VAL);
              Tracker.loginSuccess(data.userRslt.custNo);
              const user = response.data.data.userRslt;
              CookieUtils.setLoginCookies(user);
              if (!StringUtils.isEmpty(data.spctdFlag)) {
                if (data.spctdFlag === 'S') {
                  alert('휴면이 해제되었습니다.');
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
                    ).then(response => {
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
              // APP 로그인 경우
              const dvcId = localStorage.getItem("deviceId");
              const cmmMbrNo = user.cmmMbrNo;
              if (!StringUtils.isEmpty(dvcId)) {
                let autoLoginGbn = '';
                if (this.form.autoLogin) {
                  autoLoginGbn ='Y';
                } else {
                  autoLoginGbn ='N';
                }
                let autoLoginCertValChk = '';
                const devData = {
                  cmmSteId: CookieUtils.getCmmSteId(),
                  dvcId: dvcId,
                  autoLoginYn: autoLoginGbn,
                  cmmMbrNo: cmmMbrNo
                };
                const resDev = await ApiUtils.put('/fo/cm/appmgnt/device', devData);
                if (resDev.data === null) {
                  this.$gsdialog.alert('오류', { html: true });
                  return;
                } else {
                  if (resDev.data.success === true) {
                    const data = resDev.data.data;
                    console.log("data :: "+JSON.stringify(data));
                    console.log("autoLoginCertVal :: "+data.autoLoginCertVal);
                    autoLoginCertValChk = data.autoLoginCertVal;
                    const certData = {
                      dvcId: dvcId,
                      autoLoginCertVal: data.autoLoginCertVal,
                      autoLoginYn: autoLoginGbn,
                      refreshToken: refreshToken,
                    };
                    window.appCallLoginComplete(certData);
                  }
                }
                const autoData = {
                    dvcId: dvcId,
                    autoLoginCertVal: autoLoginCertValChk,
                    cmmSteId: CookieUtils.getCmmSteId(),
                    autoLoginYn: autoLoginGbn,
                };
                const resAuto = await ApiUtils.post('/fo/cu/loginmgnt/app-auto-login-registration', autoData);
                if (resAuto.data === null) {
                  this.$gsdialog.alert('오류', { html: true });
                  return;
                }
              }
              // 비로그인 장바구니
              try {
                ApiUtils.post(
                  '/fo/od/bsktmgnt/bskt-merge',
                  this.odBsktUuid
                ).then(response => {
                  console.log(
                    '/fo/od/bsktmgnt/bskt-merge :: ' + response.data.success
                  );
                });
              } catch (e) {
                console.log(e);
              }
              const returnUrl = vm.$route.query.returnUrl;
              if (!StringUtils.isEmpty(returnUrl)) {
                location.href = returnUrl;
              } else {
                const string = CuUtils.getLink();
                location.href = string;
              }
            } else {
              const data = response.data.data;
              if (data.resultCode === '50011') {
                // 고객정보없음
                this.$gsdialog.confirm('고객님은 아직 회원이 아닙니다.<br/>회원가입하시겠습니까?', { html: true })
                .then(dialog => {
                  ApiUtils.post('/fo/cu/mbrmgnt/member-join', joinChk, {
                    'Content-Type': 'application/json',
                  }) // 회원가입
                    .then(res => {
                      if (res.data === null) {
                        console.error(res.data.msg);
                        vm.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
                        return;
                      } else {
                        if (
                          (res.data.data.resultCode === '00000' ||
                            res.data.data.resultCode === 'R7000') &&
                            res.data.data.nullWebId === 'N'
                        ) {
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
                          this.$gsdialog.alert(res.data.data.resultMessage, { html: true }).then(dialog =>{
                            vm.$router.push('/cu/login');
                          });
                        } else if (res.data.data.resultCode === 'R7006') {
                          // 자체SMS(4Key)인증 받은 타사 통합회원
                          localStorage.setItem(
                            'uesrChk',
                            JSON.stringify(res.data.data)
                          );
                          this.$gsdialog.alert(res.data.data.resultMessage, { html: true }).then(dialog =>{
                            vm.$store.state.cu.custNo = res.data.data.custNoEncKey;
                            vm.$store.state.cu.gsrContract1 = res.data.data.agree1;
                            vm.$router.push('/cu/pop_offline_member');
                          });
                        } else if (res.data.data.resultCode === 'R7004') {
                          // 탈퇴 후 3개월 이내 회원
                          this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
                        } else if (res.data.data.resultCode === '99999') {
                          // 회원정보중복
                          this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
                        } else if (res.data.data.resultCode === 'R7053') {
                          // 타사 통합회원이며 GS리테일에서 약관 동의를 받아야 합니다.
                          this.$gsdialog.alert(res.data.data.resultMessage, { html: true }).then(dialog => {
                            vm.$store.state.cu.custNo = res.data.data.custNoEncKey;
                            vm.$store.state.cu.gsrContract1 = res.data.data.agree1;
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
                            this.$gsdialog.alert(res.data.data.resultMessage, { html: true }).then(dialog => {
                              vm.$store.state.cu.custNo = res.data.data.custNoEncKey;
                              vm.$router.push('/cu/login');
                            });
                          } else if (res.data.data.nullWebId === 'Y') {
                            // 오프라인 회원 외 아이디 없는 회원
                            this.$gsdialog.alert(res.data.data.resultMessage, { html: true }).then(dialog => {
                              vm.$store.state.cu.custNo = res.data.data.custNoEncKey;
                              vm.$store.state.cu.gsrContract1 = res.data.data.agree1;
                              vm.$router.push('/cu/pop_offline_member');
                            });
                          }
                        }
                        Tracker.signupMessage(res.data.data.resultMessage);
                      }
                    });
                })
                .catch(e => {
                  console.log('canceled');
                });
              } else if (data.resultCode === 'R7054') {
                // Kixx 유출정보 고객 입니다.
                this.$gsdialog.alert('개인정보보호를 위해</br>비밀번호 재설정이 필요합니다.</br></br>비밀번호 변경을 진행해 주세요.', { html: true }).then(dialog =>{
                  sessionStorage.setItem('reqGbn', '2');
                  this.$router.push('/cu/find_id_password/2');
                });
              } else if (data.resultCode === 'R7055') {
                // 그룹사에서 기관인증이 아닌 고객입니다.
              } else if (data.resultCode === 'R7053') {
                // 타사 통합회원이며 GS리테일에서 약관 동의를 받아야 합니다.
                vm.$store.state.cu.custNo = data.custNoEncKey;
                vm.popupAction('popupAgreement');
              } else {
                this.$gsdialog.alert(data.resultMessage, { html: true });
              }
              return;
            }
          }
      }
    },
    // CrossDomain Login
    getCrossOrigin() {
      const firstDomain = location.host.substring(location.host.indexOf('.'));
      const dsDomain = process.env.VUE_APP_COMMON_DS_MO;
      const dsFirstDomain = dsDomain.substring(dsDomain.indexOf('.'));
      let crossOrigin = '';
      if (firstDomain === dsFirstDomain) {
        crossOrigin = process.env.VUE_APP_COMMON_FR_MO;
      } else {
        crossOrigin = process.env.VUE_APP_COMMON_DS_MO;
      }
      return crossOrigin;
    },

    getAccountsLoginCallback(vm) {
      ConsoleUtils.log('getAccountsLoginCallback');
      window.addEventListener(
        'message',
        function(event) {
          if (event.data == 'YLOGIN') {
            const returnUrl = vm.$route.query.returnUrl;
            if (!StringUtils.isEmpty(returnUrl)) {
              location.href = returnUrl;
            } else {
              const string = CuUtils.getLink();
              location.href = string;
            }
          }
        },
        false
      );
    },
    // CrossDomain Login
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
      const mobileKeyWords = ['gssmapp_ios', 'dalisalda_ios'];
      let device = '';
      let osVer = '';
      for (const word in mobileKeyWords) {
        if (UserAgent.match(mobileKeyWords[word]) != null) {
          device = mobileKeyWords[word];
          break;
        }
      }
      if (device == 'gssmapp_ios' || device == 'dalisalda_ios') { // gssmapp_ios_3.0.0_13.5.1
        const newVer = UserAgent.lastIndexOf('_');
        const strVer = UserAgent.substring(newVer + 1);
        const sEnd = strVer.indexOf('.');
        osVer = strVer.substring(0, sEnd);
        if (osVer == '13') {
          this.form.mobil = 'ios';
        } else {
          this.form.mobil = 'android';
        }
      } else {
        this.form.mobil = 'android';
      }
    },
  },
  updated() {
  },
};
</script>
