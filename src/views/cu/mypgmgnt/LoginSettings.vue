<!--
views/ss/SC-FO-SS-GF-MS-929
-->
<template>
  <div class="wrap-mypage member-info wrap-setting" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="SNS 연결 설정" />
    <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
    <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
      <div class="section-area">
        <ul class="wrap-list-setting member">
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico naver" aria-label="네이버 아이콘"></i>
                  <span>네이버 연결</span>
                  <span class="date" v-if="snsNaverMsg != ''">{{snsNaverMsg.replace('되었습니다.', '')}}</span>
                </div>
              </div>
              <div class="inner-setting">
                <!-- 수정 START : 2020.02.13 마크업 변경 -->
                <div class="wrap-check">
                  <input type="checkbox" id="naver" class="inp-setting" @click="snsChk('01');"/>
                  <label for="naver"><span class="hidden">동의함</span></label>
                </div>
                <!-- 수정 END : 2020.02.13 마크업 변경 -->
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico kakaotalk" aria-label="카카오톡 아이콘"></i>
                  <span>카카오 연결</span>
                  <span class="date" v-if="snsKakaoMsg != ''">{{snsKakaoMsg.replace('되었습니다.', '')}}</span>
                </div>
              </div>
              <div class="inner-setting">
                <!-- 수정 START : 2020.02.13 마크업 변경 -->
                <div class="wrap-check">
                  <input type="checkbox" id="kakaotalk" class="inp-setting" @click="snsChk('02');"/>
                  <label for="kakaotalk"><span class="hidden">동의함</span></label>
                </div>
                <!-- 수정 END : 2020.02.13 마크업 변경 -->
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico facebook" aria-label="페이스북 아이콘"></i>
                  <span>페이스북 연결</span>
                  <span class="date" v-if="snsFacebookMsg != ''">{{snsFacebookMsg.replace('되었습니다.', '')}}</span>
                </div>
              </div>
              <div class="inner-setting">
                <!-- 수정 START : 2020.02.13 마크업 변경 -->
                <div class="wrap-check">
                  <input type="checkbox" id="facebook" class="inp-setting" @click="snsChk('03');"/>
                  <label for="facebook"><span class="hidden">동의함</span></label>
                </div>
                <!-- 수정 END : 2020.02.13 마크업 변경 -->
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico payco" aria-label="페이코 아이콘"></i>
                  <span class="sns">페이코 연결</span>
                  <span class="date" v-if="snsPaycoMsg != ''">{{snsPaycoMsg.replace('되었습니다.', '')}}</span>
                </div>
              </div>
              <div class="inner-setting">
                <!-- 수정 START : 2020.02.13 마크업 변경 -->
                <div class="wrap-check">
                  <input type="checkbox" id="payco" class="inp-setting" @click="snsChk('04');"/>
                  <label for="payco"><span class="hidden">동의함</span></label>
                </div>
                <!-- 수정 END : 2020.02.13 마크업 변경 -->
              </div>
            </div>
          </li>
          <!-- 7월 수정 START : 애플 로그인 추가 (IOS 접속 시에만 노출) -->
          <li v-if="mobil == 'ios'">
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico apple" aria-label="애플 아이콘"></i>
                  <span class="sns">애플 연결</span>
                  <span class="date" v-if="snsAppleMsg != ''">{{snsAppleMsg.replace('되었습니다.', '')}}</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="apple" class="inp-setting" @click="snsChk('05');"/>
                  <label for="apple"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
          <!-- 7월 수정 END : 애플 로그인 추가 (IOS 접속 시에만 노출) -->
        </ul>
      </div>
      <!-- 삭제 : 2020.02.26 앱설정으로 해당 내용 이동 -->
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import CuUtils from '@/common/cu/CuUtils';
import StringUtils from '@/common/StringUtils';
import LoginUtils from "@/common/LoginUtils";
export default {
  name: "LoginSettings",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: 'SNS 연동 관리/로그인 설정 < 회원 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: 'SNS 연결 설정',
      },
    ],
  },
  components: {
    SubDefaultHeader,
    Footer, // 푸터
  },
  data() {
    return {
      snsConMngs: [],
      snsNaverMsg: "",
      snsKakaoMsg: "",
      snsFacebookMsg: "",
      snsPaycoMsg: "",
      snsAppleMsg: "",
      snsNaverSnsId: "",
      snsKakaoSnsId: "",
      snsFacebookSnsId: "",
      snsPaycoSnsId: "",
      snsAppleSnsId: "",
      snsName: "",
      snsSuccessId: "",
      userId: "",
      mobil: "",
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
     snsChk: async function(div) {
       let success = false;
      if (div == '01') {
        if (document.getElementById("naver").checked) {
          success = document.getElementById("naver").checked;
        }
          this.snsSuccessId = this.snsNaverSnsId;
          this.snsName = "네이버";
      } else if (div == '02') {
         if (document.getElementById("kakaotalk").checked) {
          success = document.getElementById("kakaotalk").checked;
        }
           this.snsSuccessId = this.snsKakaoSnsId;
          this.snsName = "카카오";
      } else if (div == '03') {
        if (document.getElementById("facebook").checked) {
          success = document.getElementById("facebook").checked;
        }
           this.snsSuccessId = this.snsFacebookSnsId;
          this.snsName = "페이스북";
      } else if (div == '04') {
        if (document.getElementById("payco").checked) {
            success = document.getElementById("payco").checked;
        }
          this.snsSuccessId = this.snsPaycoSnsId;
          this.snsName = "페이코";
      } else if (div == '05') {
        if (document.getElementById("apple").checked) {
            success = document.getElementById("apple").checked;
        }
          this.snsSuccessId = this.snsAppleSnsId;
          this.snsName = "애플";
      }
      const MbrInfoInqInputDto = {certType: "C"};
      const resultMbrInfo= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', MbrInfoInqInputDto); // 회원정보가져오기
      // console.log("===="+JSON.stringify(resultMbrInfo.data.data)+"::::");
      const SnsInputDto = {
        snsId: this.snsSuccessId,
        snsType: div,
        snsSiteGubun: "01",
        snsConYn: success ? "Y" : "N",
        userId: resultMbrInfo.data.data.custNo
      };
      if (success) {
        if (div !='05') {
          this.getSnsLogin(div);
        } else {
          this.getAppLogin();
        }
       // const result = await ApiUtils.post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto);
        // if (result.data.success) {
        //  this.$gsdialog.alert("<"+this.snsName+">연결에 성공하였습니다");
        // } else {
        //  this.$gsdialog.alert(result.data.data.resultMessage);
         // }
      } else {
        const result = await ApiUtils.put('/fo/cu/loginmgnt/sns-login-release', SnsInputDto);
        if (result.data.success) {
          this.$gsdialog.alert("<"+this.snsName+">연결이 해제되었습니다");
        } else {
          this.$gsdialog.alert(result.data.data.resultMessage);
        }
      }
      this.getSnsMng();
    },
    getSnsMng: async function() { // sns연결관리
        const result = await ApiUtils.get('/fo/cu/loginmgnt/sns-connection-list', null);
        this.snsConMngs = result.data.data.snsConListDto;
      if (this.snsConMngs != null) { // list가 null일경우
        for (let i = 0; i < this.snsConMngs.length; i++) {
          if (this.snsConMngs[i].snsType == '01') { // 네이버
            if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("naver").checked = true;
                this.snsNaverMsg = this.snsConMngs[i].snsConMsg;
                this.snsNaverSnsId = this.snsConMngs[i].snsId;
            } else {
                document.getElementById("naver").checked = false;
                this.snsNaverMsg = "";
                this.snsNaverSnsId = this.snsConMngs[i].snsId;
             }
          } else if (this.snsConMngs[i].snsType == '02') { // 카카오톡
             if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("kakaotalk").checked = true;
                this.snsKakaoMsg = this.snsConMngs[i].snsConMsg;
                this.snsKakaoSnsId = this.snsConMngs[i].snsId;
             } else {
                document.getElementById("kakaotalk").checked = false;
                this.snsKakaoMsg = "";
                this.snsKakaoSnsId = this.snsConMngs[i].snsId;
             }
          } else if (this.snsConMngs[i].snsType == '03') { // 페이스북
             if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("facebook").checked = true;
                this.snsFacebookMsg = this.snsConMngs[i].snsConMsg;
                this.snsFacebookSnsId = this.snsConMngs[i].snsId;
             } else {
                document.getElementById("facebook").checked = false;
                this.snsFacebookMsg = "";
                this.snsFacebookSnsId = this.snsConMngs[i].snsId;
             }
          } else if (this.snsConMngs[i].snsType == '04') { // 페이코
             if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("payco").checked = true;
                this.snsPaycoMsg = this.snsConMngs[i].snsConMsg;
                this.snsPaycoSnsId = this.snsConMngs[i].snsId;
             } else {
                document.getElementById("payco").checked = false;
                this.snsPaycoMsg = "";
                this.snsPaycoSnsId = this.snsConMngs[i].snsId;
             }
              console.log("===="+JSON.stringify(result.data.data.snsConListDto)+"::::");
          } else if (this.snsConMngs[i].snsType == '05') { // 페이코
            if (this.mobil ==='ios') {
              if (this.snsConMngs[i].snsConYn == 'Y') {
                  document.getElementById("apple").checked = true;
                  this.snsAppleMsg = this.snsConMngs[i].snsConMsg;
                  this.snsAppleSnsId = this.snsConMngs[i].snsId;
              } else {
                  document.getElementById("apple").checked = false;
                  this.snsAppleMsg = "";
                  this.snsAppleSnsId = this.snsConMngs[i].snsId;
              }
                console.log("===="+JSON.stringify(result.data.data.snsConListDto)+"::::");
            }
          }
        }
      } else {
         document.getElementById("naver").checked = false;
         document.getElementById("kakaotalk").checked = false;
         document.getElementById("payco").checked = false;
         document.getElementById("facebook").checked = false;
         document.getElementById("apple").checked = false;
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
              localStorage.setItem('snsReUrl', '/cu/login_settings');
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
        if (osVer >= 13) {
          this.mobil = 'ios';
        } else {
          this.mobil = 'android';
        }
      } else {
        this.mobil = 'android';
      }
      if (StringUtils.isEmpty(localStorage.getItem('deviceId'))) {
        this.getSetting();
      }
    },
    // 애플 로그인
    getAppLogin() {
      const date = {
        type: 'L'
      };
      window.appCallappleIdLogin(date);
    },
    getSetting() {
    // 모바일 SNS 로그인
    const vm = this;
    const snsTypeCod = localStorage.getItem('snsTypeCod');
    const snsId = localStorage.getItem('snsId');
    const snsDate = localStorage.getItem('snsDate');
    if (!StringUtils.isEmpty(snsTypeCod)) {
      localStorage.removeItem('snsTypeCod');
      localStorage.removeItem('snsReUrl');
      localStorage.removeItem('snsId');
      ApiUtils.get('/fo/cu/mbrmgnt/member-information', null)
              .then(res => {
                const SnsInputDto = {
                  snsId: snsId,
                  snsType: snsTypeCod,
                  snsSiteGubun: "01",
                  snsConYn: "Y",
                  userId: res.data.data.custNo
                };
              ApiUtils
                .post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto)
                .then(res => {
                  if (res.data.success) {
                    let msg = "";
                    if (snsTypeCod === '01') {
                      msg = "<네이버>연결에 성공하였습니다";
                    } else if (snsTypeCod === '02') {
                      msg = "<카카오>연결에 성공하였습니다";
                    } else if (snsTypeCod === '03') {
                      msg = "<페이스북>연결에 성공하였습니다";
                    } else if (snsTypeCod === '04') {
                      msg = "<페이코>연결에 성공하였습니다";
                    } else if (snsTypeCod === '05') {
                      msg = "<애플>연결에 성공하였습니다";
                    }
                    vm.$gsdialog.alert(msg);
                    vm.getSnsMng();
                  } else {
                    if (res.data.data.resultCode =='R7020') {
                      vm.$gsdialog.alert('이미 가입 또는 연결되어 있는 SNS 계정입니다.<br/>로그아웃 후 SNS 로그인하여 [마이페이지 > SNS 연결 설정]에서 다시 설정해주세요.', { html: true });
                    } else {
                      vm.$gsdialog.alert(res.data.data.resultMessage);
                    }
                  }
                });
              });
          }
    },
  },
  mounted() {
    const vm = this;
    try {
      window.appCallAppInfo();
    } catch (e) {
      console.log(e);
    }
    // 모바일구분
    vm.getAppInfo();
    // 네이버 콜백
  // window.getSnsCallback = function getSnsCallback(resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken) {
     window.getSnsNaverCallback = function getSnsNaverCallback(resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
     ApiUtils
        .get('/fo/cu/mbrmgnt/member-information', null)
        .then(res => {
          const SnsInputDto = {
            snsId: snsId,
            snsType: snsType,
            snsSiteGubun: "01",
            snsConYn: "Y",
            userId: res.data.data.custNo
          };
        ApiUtils
          .post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto)
          .then(res => {
            if (res.data.success) {
              vm.$gsdialog.alert("<네이버>연결에 성공하였습니다");
              vm.getSnsMng();
            } else {
              if (res.data.data.resultCode =='R7020') {
                vm.$gsdialog.alert('이미 가입 또는 연결되어 있는 SNS 계정입니다.<br/>로그아웃 후 SNS 로그인하여 [마이페이지 > SNS 연결 설정]에서 다시 설정해주세요.', { html: true });
              } else {
                vm.$gsdialog.alert(res.data.data.resultMessage);
              }
            }
          });
        });
        if (callBack) {
          callBack();
        }
    };
      // 카카오
      window.getSnsKakaoCallback = function getSnsKakaoCallback(resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
      ApiUtils
        .get('/fo/cu/mbrmgnt/member-information', null)
        .then(res => {
          const SnsInputDto = {
            snsId: snsId,
            snsType: snsType,
            snsSiteGubun: "01",
            snsConYn: "Y",
            userId: res.data.data.custNo
          };
        ApiUtils
          .post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto)
          .then(res => {
            if (res.data.success) {
              vm.$gsdialog.alert("<카카오>연결에 성공하였습니다");
              vm.getSnsMng();
            } else {
              if (res.data.data.resultCode =='R7020') {
                vm.$gsdialog.alert('이미 가입 또는 연결되어 있는 SNS 계정입니다.<br/>로그아웃 후 SNS 로그인하여 [마이페이지 > SNS 연결 설정]에서 다시 설정해주세요.', { html: true });
              } else {
                vm.$gsdialog.alert(res.data.data.resultMessage);
              }
            }
          });
        });
        if (callBack) {
          callBack();
        }
      };
        // 페이스북
      window.getSnsFbCallback = function getSnsFbCallback(resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
           ApiUtils
        .get('/fo/cu/mbrmgnt/member-information', null)
        .then(res => {
          const SnsInputDto = {
            snsId: snsId,
            snsType: snsType,
            snsSiteGubun: "01",
            snsConYn: "Y",
            userId: res.data.data.custNo
          };
        ApiUtils
          .post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto)
          .then(res => {
            if (res.data.success) {
              vm.$gsdialog.alert("<페이스북>연결에 성공하였습니다");
              vm.getSnsMng();
            } else {
              if (res.data.data.resultCode =='R7020') {
                vm.$gsdialog.alert('이미 가입 또는 연결되어 있는 SNS 계정입니다.<br/>로그아웃 후 SNS 로그인하여 [마이페이지 > SNS 연결 설정]에서 다시 설정해주세요.', { html: true });
              } else {
                vm.$gsdialog.alert(res.data.data.resultMessage);
              }
            }
          });
        });
        if (callBack) {
          callBack();
        }
      };
        // 페이코
      window.getSnsPaycoCallback = function getSnsPaycoCallback(resultCode, resultMessage, snsId, snsType, snsName, snsEmail, snsAccessToken, callBack) {
         ApiUtils
        .get('/fo/cu/mbrmgnt/member-information', null)
        .then(res => {
          const SnsInputDto = {
            snsId: snsId,
            snsType: snsType,
            snsSiteGubun: "01",
            snsConYn: "Y",
            userId: res.data.data.custNo
          };
          ApiUtils
          .post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto)
          .then(res => {
            if (res.data.success) {
              vm.$gsdialog.alert("<페이코>연결에 성공하였습니다");
              vm.getSnsMng();
            } else {
              if (res.data.data.resultCode =='R7020') {
                vm.$gsdialog.alert('이미 가입 또는 연결되어 있는 SNS 계정입니다.<br/>로그아웃 후 SNS 로그인하여 [마이페이지 > SNS 연결 설정]에서 다시 설정해주세요.', { html: true });
              } else {
                vm.$gsdialog.alert(res.data.data.resultMessage);
              }
            }
          });
        });
        if (callBack) {
          callBack();
        }
      };
      // 애플
      window.getSnsAppleCallback = function() {
        console.log("idCredential :: "+localStorage.getItem("idCredential"));
        console.log("email :: "+localStorage.getItem("email"));
         ApiUtils
        .get('/fo/cu/mbrmgnt/member-information', null)
        .then(res => {
          const SnsInputDto = {
            snsId: localStorage.getItem("idCredential"),
            snsType: "05",
            snsSiteGubun: "01",
            snsConYn: "Y",
            userId: res.data.data.custNo
          };
        ApiUtils
          .post('/fo/cu/loginmgnt/sns-login-insert', SnsInputDto)
          .then(res => {
            if (res.data.success) {
              vm.$gsdialog.alert("<애플>연결에 성공하였습니다");
              vm.getSnsMng();
            } else {
              if (res.data.data.resultCode =='R7020') {
                vm.$gsdialog.alert('이미 가입 또는 연결되어 있는 SNS 계정입니다.<br/>로그아웃 후 SNS 로그인하여 [마이페이지 > SNS 연결 설정]에서 다시 설정해주세요.', { html: true });
              } else {
                vm.$gsdialog.alert(res.data.data.resultMessage);
              }
            }
          });
        });
      };
    vm.getSnsMng();
  },
  updated() {
  }
};
</script>

<style>

</style>
