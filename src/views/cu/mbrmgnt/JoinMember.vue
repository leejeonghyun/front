<!--
Design: views/cu/SC-FO-CU-GF-MP-010
Pg id:
Uri: /cu/join_member
-->
<template>
  <div class="wrap-signup signup-main integrate-member__wrap" v-bind:class="[siteClass]">
    <!-- <TutorialsSignUp @popupEvent="popupAction" v-if="popup.popupTutorial" /> -->
    <SubDefaultHeader headerText="회원가입" :searchBtnBottom="true" :headerShow="true" :tabbar="false" :prevHomeType="true" />
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="inner">
          <div class="welcome-friend-desc" v-if="friendYn=='Y'">
            <p>
            <strong class="name">{{ form.joinRcmdName }}님</strong>의 초대를 받으셨습니다
            </p>
            <!-- <button class="btn-signup-friend">친구추천 혜택 자세히 보기</button> -->
            <div v-html="form.dspCnts"></div>
          </div>
        <div class="wrap-box">
          <div class="area-text" v-if="siteClass == 'marketfor'">
            <h2 class="hidden">통합회원 가입</h2>
            <!-- 2021.01.25 웰컴메세지 수정 -->
            <p class="welcome-desc">
              <strong>신규 회원가입 고객님만</strong>을 위한 혜택을 드립니다
            </p>
          </div>
          <!-- 2021.01.25 신규회원 혜택 추가 -->
          <ul class="area-benefit">
            <li>인기 상품<br>100원부터</li>
            <li>가입축하<br>릴레이 쿠폰</li>
            <li>한달내내<br>무료배송</li>
            <li>GS&amp;POINT<br>적립사용</li>
          </ul>
          <div class="btn-area">
            <form class="form-horizontal" id="subKmc" name="subKmc" method="post" action>
              <a
                href="javascript:;"
                class="btn-signup btn-bg lightgreen btn-login"
                title="가입하기"
                @click="getAuthentication()"
                data-sc-action="signup.click"
                data-dimension-name="signup.intg"
                data-dimension-value="가입하기"
              >가입하기</a>
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
            </form>
          </div>
        </div>
        <div class="wrap-box">
          <div class="area-text">
            <h2 class="hidden">간편가입</h2>
            <p class="sns-desc">
              <i class="line"></i>
              <span>간편 회원가입</span><!-- 2021.01.25 회원가입 문구 수정 -->
              <i class="line"></i>
            </p>
          </div>
          <ul class="list-link-sns txt-type">
            <li>
              <a
                href="javascript:;"
                class="ico email"
                title="이메일 가입으로 이동"
                @click="getEmailAuthentication"
                data-sc-action="signup.click"
                data-dimension-name="signup.simple"
                data-dimension-value="이메일"
              >
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                class="ico naver"
                title="네이버 가입으로 이동"
                @click="getSnsUrlLogin('01')"
                data-sc-action="signup.click"
                data-dimension-name="signup.simple"
                data-dimension-value="네이버"
              >
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                class="ico kakaotalk"
                title="카카오톡 가입으로 이동"
                @click="getSnsUrlLogin('02')"
                data-sc-action="signup.click"
                data-dimension-name="signup.simple"
                data-dimension-value="카카오"
              >
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                class="ico facebook"
                title="페이스북 가입으로 이동"
                @click="getSnsUrlLogin('03')"
                data-sc-action="signup.click"
                data-dimension-name="signup.simple"
                data-dimension-value="페이스북"
              >
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                class="ico payco"
                title="페이코 가입으로 이동"
                @click="getSnsUrlLogin('04')"
                data-sc-action="signup.click"
                data-dimension-name="signup.simple"
                data-dimension-value="페이코"
              >
              </a>
            </li>
            <li v-if="form.mobil === 'ios'">
              <a
                href="javascript:;"
                class="ico apple"
                title="애플 로그인으로 이동"
                data-sc-action="signup.click"
                data-dimension-name="signup.simple"
                data-dimension-value="애플"
                @click="getAppLogin()"
              >
              </a>
            </li>
          </ul>
        </div>
        <!-- 휴면해제 팝업 -->
        <PopupOfflineMember @popupEvent="popupAction" v-if="this.popup.popupOfflineMember" />
      </div>
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <!-- <Footer /> -->
    <!-- 4월 수정 END : 푸터 추가 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
// import TutorialsSignUp from '@/components/common/TutorialSignUp'; // 6월수정 : 튜토리얼 추가
import PopupOfflineMember from '@/views/cu/mbrmgnt/PopupOfflineMember.vue'; // 휴면해제 팝업
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import CuUtils from '@/common/cu/CuUtils';
import Tracker from '@/common/Tracker';
// import Footer from '@/components/common/Footer'; // 푸터
import JwtUtils from '@/common/JwtUtils';
import LoginUtils from '@/common/LoginUtils';
import ConsoleUtils from '@/common/ConsoleUtils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: 'SignUpInfo',
  metaInfo: {
    title: '신규 회원가입',
    titleTemplate: '',
    meta: [
      // SEO setting
      { name: 'description', content: '인기 상품 100원부터, 가입축하 릴레이 쿠폰, 한달 내내 무료배송, GS&POINT 적립사용', vmid: 'description' },
      // SNS 용
      {
        property: 'og:title',
        content: '신규 회원가입',
        template: chunk => `${chunk}`,
        vmid: 'og:title'
      },
    ],
  },
  components: {
    SubDefaultHeader, // 헤더
    // Footer,
    PopupOfflineMember,
    // TutorialsSignUp, // 6월 수정 튜토리얼 추가
  },
  data() {
    return {
      form: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        rec_cert: '',
        certNum: '',
        recCert: '',
        apiURL: '',
        date: '',
        ci: '',
        phoneNo: '',
        phoneCorp: '',
        birthDay: '',
        gender: '',
        nation: '',
        name: '',
        result: '',
        certMet: '',
        ip: '',
        Mname: '',
        MbirthDay: '',
        MGender: '',
        Mnation: '',
        plusInfo: '',
        di: '',
        strRecCert: '',
        joinRcmdName: '',
        joinRcmdCmmMbrNo: '',
        joinRcmdEventId: '',
        dspCnts: '',
        joinRcmd: '',
        snsTypeCod: '',
        mobil: '',
      },
      self: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        certNum: '',
        apiUrl: '',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      popup: {
        open: false, // 6월 수정 튜토리얼 추가 (팝업 화면 시작 시 오픈)
        popupOfflineMember: false,
        // popupTutorial: true, // 6월 수정 튜토리얼 추가
      },
      siteClass: '',
      friendYn: '',
      odBsktUuid: CookieUtils.getOdBsktUuid(),
    };
  },
  mounted: function () {
    this.siteClass = CookieUtils.getSiteClass();
    // disableBodyScroll(this); // 6월 수정 튜토리얼 추가 (튜토리얼 팝업 화면 시작 시 오픈 시 뒷 화면 scroll lock)
    const vm = this;
    // 앱정보 조회
    try {
      window.appCallAppInfo();
    } catch (e) {
      console.log(e);
    }
    // 모바일 구분
    vm.getAppInfo();
    // 추천인
    vm.inviteId();
    // vm.form.joinRcmdName = vm.$store.state.cu.joinRcmdName;
    // vm.form.joinRcmdCmmMbrNo = vm.$store.state.cu.joinRcmdCmmMbrNo;
    // vm.form.joinRcmdEventId = vm.$store.state.cu.joinRcmdEventId;
    // vm.form.joinRcmd = vm.$store.state.cu.joinRcmd;
    // if (!StringUtils.isEmpty(vm.form.joinRcmdName)) {
    //   sessionStorage.setItem('rcmd', vm.form.joinRcmd);
    // }
    // 네이버 회원가입
    window.getSnsNaverCallback = function (
      resultCode,
      resultMessage,
      snsId,
      snsType,
      snsName,
      snsEmail,
      snsAccessToken,
      callBack
    ) {
      const snsDate = {
        resultCode: resultCode,
        resultMessage: resultMessage,
        snsId: snsId,
        snsType: snsType,
        snsName: snsName,
        snsEmail: snsEmail,
        snsAccessToken: snsAccessToken,
      };
      sessionStorage.setItem('snsDate', JSON.stringify(snsDate));
      localStorage.setItem('snsDate', JSON.stringify(snsDate));
      vm.getSnsLogin('01', snsDate, callBack);
    };
    // 카카오 회원가입
    window.getSnsKakaoCallback = function (
      resultCode,
      resultMessage,
      snsId,
      snsType,
      snsName,
      snsEmail,
      snsAccessToken,
      callBack
    ) {
      const snsDate = {
        resultCode: resultCode,
        resultMessage: resultMessage,
        snsId: snsId,
        snsType: snsType,
        snsName: snsName,
        snsEmail: snsEmail,
        snsAccessToken: snsAccessToken,
      };
      sessionStorage.setItem('snsDate', JSON.stringify(snsDate));
      localStorage.setItem('snsDate', JSON.stringify(snsDate));
      vm.getSnsLogin('02', snsDate, callBack);
      // vm.$router.push('/cu/join_member_snsdetail');
    };
    // 페이스북 회원가입
    window.getSnsFbCallback = function (
      resultCode,
      resultMessage,
      snsId,
      snsType,
      snsName,
      snsEmail,
      snsAccessToken,
      callBack
    ) {
      const snsDate = {
        resultCode: resultCode,
        resultMessage: resultMessage,
        snsId: snsId,
        snsType: snsType,
        snsName: snsName,
        snsEmail: snsEmail,
        snsAccessToken: snsAccessToken,
      };
      sessionStorage.setItem('snsDate', JSON.stringify(snsDate));
      localStorage.setItem('snsDate', JSON.stringify(snsDate));
      vm.getSnsLogin('03', snsDate, callBack);
      // vm.$router.push('/cu/join_member_snsdetail');
    };
    // 페이코 회원가입
    window.getSnsPaycoCallback = function (
      resultCode,
      resultMessage,
      snsId,
      snsType,
      snsName,
      snsEmail,
      snsAccessToken,
      callBack
    ) {
      const snsDate = {
        resultCode: resultCode,
        resultMessage: resultMessage,
        snsId: snsId,
        snsType: snsType,
        snsName: snsName,
        snsEmail: snsEmail,
        snsAccessToken: snsAccessToken,
      };
      sessionStorage.setItem('snsDate', JSON.stringify(snsDate));
      localStorage.setItem('snsDate', JSON.stringify(snsDate));
      vm.getSnsLogin('04', snsDate, callBack);
      // vm.$router.push('/cu/join_member_snsdetail');
    };
    // 애플 회원가입.
    window.getSnsAppleCallback = function () {
      console.log('idCredential :: ' + localStorage.getItem('idCredential'));
      console.log('email :: ' + localStorage.getItem('email'));
      const snsDate = {
        resultCode: '00000',
        resultMessage: '정상',
        snsId: localStorage.getItem('idCredential'),
        snsType: '05',
        snsName: localStorage.getItem('name'),
        snsEmail: localStorage.getItem('email'),
        snsAccessToken: '',
        snsMallId: localStorage.getItem('mallId'),
        snsCmmSteId: localStorage.getItem('cmmSteId'),
        snsMdaType: localStorage.getItem('mdaType'),
        snsChanlId: localStorage.getItem('chanlId'),
      };
      sessionStorage.setItem('snsDate', JSON.stringify(snsDate));
      localStorage.setItem('snsDate', JSON.stringify(snsDate));
      vm.getSnsLogin('05', snsDate);
      // vm.$router.push('/cu/join_member_snsdetail');
    };
    // PC KMC인증
    window.getSelfCertification = function (strRecCert, strCertNum, callBack) {
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
    // 모바일 SNS 로그인
    const snsTypeCod = localStorage.getItem('snsTypeCod');
    const snsDate = localStorage.getItem('snsDate');
    vm.form.snsTypeCod = snsTypeCod;
    if (!StringUtils.isEmpty(snsTypeCod)) {
      localStorage.removeItem('snsTypeCod');
      localStorage.removeItem('snsReUrl');
      localStorage.removeItem('snsId');
      sessionStorage.setItem('snsDate', JSON.stringify(snsDate));
      vm.getSnsLogin(snsTypeCod, snsDate);
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
    async inviteId() {
      console.log("this.$route.params.id " + this.$route.params.id);
      const friendId = this.$route.params.id;
      if (!StringUtils.isEmpty(friendId)) {
        const data = {
          id: friendId,
        };
        const result = await ApiUtils.get('/fo/cu/mbrmgnt/join_rcmd', data, {
          'Content-Type': 'application/json',
        });
        if (result.data === null) {
          console.error(result.data.msg);
          this.$gsdialog.alert('실패', { html: true });
          return;
        } else {
          if (result.data.data.resultCode === '00000') {
            this.form.joinRcmd = friendId;
            this.form.joinRcmdName = result.data.data.joinRcmdName;
            this.form.joinRcmdCmmMbrNo = result.data.data.joinRcmdCmmMbrNo;
            this.form.joinRcmdEventId = result.data.data.joinRcmdEventId;
            if (!StringUtils.isEmpty(result.data.data.joinRcmdName)) {
              this.friendYn = 'Y';
              sessionStorage.setItem('rcmd', this.form.joinRcmd);
            }
            // gsfresh '1', 달리살다 '11'
            let dspConrId = '';

          // [202017P] 2021.02.18 최미옥 친구초대 안내 M4 전신 카테고리, 코너 정보 수정 - 종료

            const cmmSteId = CookieUtils.getCmmSteId();
            let dspCtgId = '';
            let mallId = '';
            let apiUrl = '';

            if (cmmSteId === '3') { // M4 사이트 ID : 3
              dspConrId = process.env.VUE_APP_M4_INVITE_FRIENDS_DSP_CONR_ID; // 친구초대 안내 전시코너ID
              dspCtgId = process.env.VUE_APP_M4_INVITE_FRIENDS_DSP_CTG_ID; // 친구초대 안내 전시카테고리ID
              mallId = process.env.VUE_APP_M4_INVITE_FRIENDS_MALL_ID; // 친구초대 안내 M4 메인 몰ID
              apiUrl = process.env.VUE_APP_M4_EVENT_DSP_CONR_API_URL; // 친구초대 안내 M4 전시공통배너정보조회 URL
            } else {
              dspCtgId = 'N1003004';
              mallId = CookieUtils.getMallId();
              apiUrl = '/dp/fr/displaymgnt/display-comm-banner-info';
            if (CookieUtils.getMallId() === '11') {
              dspConrId = '1124';
            } else {
              dspConrId = '123';
            }
            }

            const dspData = {
              dspConrId: dspConrId,
              dspCtgId: dspCtgId,
              dspScrSpCd: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
              mallId: mallId,
              storId: CookieUtils.getCookie('STOR_ID'),
              supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
            };
            // [202017P] 2021.02.18 최미옥 친구초대 안내 M4 전신 카테고리, 코너 정보 수정 - 종료
            const dspCntsRst = await ApiUtils.get(
              apiUrl,
              dspData,
              {
                'Content-Type': 'application/json',
              }
            );
            console.log('배너정보 조회 ' + JSON.stringify(dspCntsRst.data.data));
             console.log("## " + dspCntsRst.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo[0].dspCnts);
            if (dspCntsRst.data.success === true) {
              this.form.dspCnts =
                dspCntsRst.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo[0].dspCnts;
            } else {
              this.$gsdialog.alert('친구초대가 실패했습니다.', { html: true });
            }
          } else {
            this.$gsdialog.alert('친구초대가 실패했습니다.', { html: true });
          }
        }
      }
    },
    getAuthentication: function () {
      // this.$router.push('/cu/pop_offline_member');
      // KMC 본인확인 호출
      this.$gsdialog
        .alert('본인 확인을 위하여</br>휴대폰 본인인증을 진행합니다', {
          html: true,
        })
        .then((dialog) => {
          const UserAgent = window.navigator.userAgent;
          const mall = CookieUtils.getMallId();
          const cmmSteId = CookieUtils.getCmmSteId();
          const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId }; // 모바일 화면은 M , PC 화면은 P
          ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType, {
            'Content-Type': 'application/json',
          })
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
                  'width=500, height=600, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=' +
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
                  localStorage.setItem('reUrl', '/cu/join_member');
                  subKmc.target = '';
                } else {
                  const popupX = CuUtils.popupX('500');
                  const popupY = CuUtils.popupY('600');
                  window.open(
                    '',
                    'kmcIsWindow',
                    'width=500, height=600, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=' +
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
    },
    getSnsUrlLogin: function (type) {
      // SNS
      const mobType = 'MOB';
      const data = {
        snsType: type,
        mobType: mobType,
        snsLoginYn: 'N',
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
      };
      ApiUtils.get('/fo/cu/loginmgnt/sns-login', data, {
        'Content-Type': 'application/json',
      }).then((res) => {
        if (res.data === null) {
          console.error(res.data.msg);
          this.$gsdialog.alert('SNS로그인을 불러올수 없습니다.', {
            html: true,
          });
          return;
        } else {
          const apiURL = res.data.data.apiURL;
          const vidDomain = LoginUtils.getViaDomain();
          const viaURL = vidDomain + '/cu/via?to=' + encodeURIComponent(apiURL);
          const dvcId = localStorage.getItem('deviceId');
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
              localStorage.setItem('snsReUrl', '/cu/join_member');
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
    // SNS 로그인
    getSnsLogin: async function (type, snsDate, callBack) {
      const vm = this;
      const mobType = 'MOB';
      vm.snsLoing = JSON.parse(localStorage.getItem('snsDate'));
      localStorage.removeItem('snsDate');
      let sMallId = '';
      let sCmmSteId = '';
      let sMdaType = '';
      let sChanlId = '';
      if (StringUtils.isEmpty(vm.snsLoing.snsMallId)) {
        sMallId = CookieUtils.getMallId();
      } else {
        sMallId = vm.snsLoing.snsMallId;
      }
      if (StringUtils.isEmpty(vm.snsLoing.snsCmmSteId)) {
        sCmmSteId = CookieUtils.getCmmSteId();
      } else {
        sCmmSteId = vm.snsLoing.snsCmmSteId;
      }
      if (StringUtils.isEmpty(vm.snsLoing.snsMdaType)) {
        sMdaType = CookieUtils.getMdaType();
      } else {
        sMdaType = vm.snsLoing.snsMdaType;
      }
      if (StringUtils.isEmpty(vm.snsLoing.snsChanlId)) {
        sChanlId = CookieUtils.getChanlId();
      } else {
        sChanlId = vm.snsLoing.snsChanlId;
      }
      const data = {
        snsLoginYn: 'Y',
        mobType: mobType,
        snsId: vm.snsLoing.snsId,
        snsType: vm.snsLoing.snsType,
        snsName: vm.snsLoing.snsName,
        snsEmail: vm.snsLoing.snsEmail,
        snsAccessToken: vm.snsLoing.snsAccessToken,
        mallId: sMallId,
        cmmSteId: sCmmSteId,
        mdaType: sMdaType,
        domail: CookieUtils.getDomain(),
        chanlId: sChanlId,
      };
      const res = await ApiUtils.get('/fo/cu/loginmgnt/sns-login', data, {
        'Content-Type': 'application/json',
      });
      if (res.data === null) {
        console.error(res.data.msg);
        this.$gsdialog.alert('SNS로그인을 불러올수 없습니다.', { html: true });
        return;
      } else {
        if (res.data.success === true) {
          const data = res.data.data;
          console.log('오토로그인 :: ' + vm.form.autoLogin);
          JwtUtils.setAutoLogin(vm.form.autoLogin);
          const refreshToken = data.jwtRslt.refreshToken;
          JwtUtils.saveRefreshToken(refreshToken);
          JwtUtils.saveIdToken(data.jwtRslt.idToken);
          JwtUtils.saveEncVal(res.data.data.ENC_VAL);

          Tracker.loginSuccess(data.userRslt.custNo);
          const user = res.data.data.userRslt;
          CookieUtils.setLoginCookies(user);
          if (!StringUtils.isEmpty(data.spctdFlag)) {
            if (data.spctdFlag === 'S') {
              this.$gsdialog.alert('휴면이 해제되었습니다.', { html: true });
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
                ApiUtils.post(
                  '/fo/md/itemaddinfomgnt/mbr-inquire-item',
                  params
                ).then((res) => {
                  console.log(
                    'mbr-inquire-item response.data :: ' + response.data.success
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
          const cmmMbrNo = user.cmmMbrNo;
          const dvcId = localStorage.getItem('deviceId');
          if (!StringUtils.isEmpty(dvcId)) {
            let autoLoginGbn = '';
            if (this.form.autoLogin) {
              autoLoginGbn = 'Y';
            } else {
              autoLoginGbn = 'N';
            }
            let autoLoginCertValChk = '';
            const devData = {
              cmmSteId: CookieUtils.getCmmSteId(),
              dvcId: dvcId,
              autoLoginYn: autoLoginGbn,
            };
            const resDev = await ApiUtils.put('/fo/cm/appmgnt/device', devData);
            if (resDev.data === null) {
              this.$gsdialog.alert('오류', { html: true });
              return;
            } else {
              if (resDev.data.success === true) {
                const data = resDev.data.data;
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
            const resAuto = await ApiUtils.post(
              '/fo/cu/loginmgnt/app-auto-login-registration',
              autoData
            );
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
          const returnUrl = vm.$route.query.returnUrl;
          if (!StringUtils.isEmpty(returnUrl)) {
            location.href = returnUrl;
          } else {
            const string = CuUtils.getLink();
            location.href = string;
          }
        } else {
          const resultCode = res.data.data.resultCode;
          const resultMessage = res.data.data.resultMessage;
          if (resultCode === '50011') {
            // 고객정보없음
            // this.$gsdialog.confirm('고객님은 아직 회원이 아닙니다.<br/>회원가입하시겠습니까?', { html: true }).then(dialog => {
            const snsDate = {
              resultCode: resultCode,
              resultMessage: resultMessage,
              snsId: res.data.data.snsId,
              snsType: res.data.data.snsType,
              snsName: res.data.data.snsName,
              snsEmail: res.data.data.snsEmail,
              snsAccessToken: res.data.data.snsAccessToken,
              mallId: sMallId,
              cmmSteId: sCmmSteId,
              mdaType: sMdaType,
              domail: CookieUtils.getDomain(),
              chanlId: sChanlId,
            };
            localStorage.setItem('snsDate', JSON.stringify(snsDate));
            this.$router.push('/cu/join_member_snsdetail');
            // });
          } else if (resultCode === 'R7053') {
            // 타사 통합회원이며 GS리테일에서 약관 동의를 받아야 합니다.
            this.$store.state.cu.custNo = res.data.data.custNoEncKey;
            this.popupAction('popupAgreement');
          } else if (data.resultCode === 'CRM') {
            // CRM 장애
            this.$router.push('/cu/crm_login');
          } else {
            if (resultCode === 'R7060') {
              this.$gsdialog.alert('IP제한', { html: true });
            } else if (resultCode === 'R7999') {
              this.$gsdialog.alert('시스템오류', { html: true });
            } else {
              if (res.data.data.resultCode === '50002') {
                this.$gsdialog.alert('취소 되었습니다.'), { html: true };
              } else {
                this.$gsdialog.alert('시스템오류'), { html: true };
              }
            }
          }
        }
        if (callBack) {
          callBack();
        }
      }
    },
    getEmailAuthentication: function () {
      this.$router.push('/cu/join_member_emaildetail');
    },
    getSelfCertif: function (strRecCert, strCertNum, callBack) {
      const data = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      const vm = this;
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', data, {
        'Content-Type': 'application/json',
      }).then((res) => {
        if (res.data === null) {
          console.error(res.data.msg);
          this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', {
            html: true,
          });
          return;
        } else {
          if (res.data.data.resultCode === '00000') {
            const uesrChk = {
              mbrJoinPosbType: 'M',
              korName: res.data.data.name,
              bdate: res.data.data.birthDay,
              gender: res.data.data.gender,
              ipinCiCode: res.data.data.ci,
              foreignYn: res.data.data.nation,
              hp: res.data.data.phoneNo,
              phoneCorp: res.data.data.phoneCorp,
            };
            ApiUtils.post('/fo/cu/mbrmgnt/member-join', uesrChk, {
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
                    this.$gsdialog
                      .alert(res.data.data.resultMessage, { html: true })
                      .then((dialog) => {
                        vm.$router.push('/cu/join_member_detail');
                      });
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
                    this.$gsdialog.alert(res.data.data.resultMessage, {
                      html: true,
                    });
                    // vm.$router.push('/cu/pop_offline_member');
                  } else if (res.data.data.resultCode === 'R7004') {
                    // 탈퇴 후 3개월 이내 회원
                    this.$gsdialog.alert(res.data.data.resultMessage, {
                      html: true,
                    });
                  } else if (res.data.data.resultCode === '99999') {
                    // 회원정보중복
                    this.$gsdialog.alert(res.data.data.resultMessage, {
                      html: true,
                    });
                    // localStorage.setItem("uesrChk", JSON.stringify(res.data.data));
                  } else {
                    if (res.data.data.authAgree === 'Y') {
                      // 고객님은 GS&POINT 회원이십니다.GS&POINT 아이디로 로그인해주세요.
                      // 약관 미동의 회원
                      localStorage.setItem(
                        'uesrChk',
                        JSON.stringify(res.data.data)
                      );
                      this.$gsdialog
                        .alert(res.data.data.resultMessage, { html: true })
                        .then((dialog) => {
                          vm.$store.state.cu.custNo =
                            res.data.data.custNoEncKey;
                          vm.$router.push('/cu/login');
                        });
                    } else if (res.data.data.nullWebId === 'Y') {
                      // 오프라인 회원 외 아이디 없는 회원
                      this.$gsdialog
                        .alert(res.data.data.resultMessage, { html: true })
                        .then((dialog) => {
                          vm.$store.state.cu.custNo =
                            res.data.data.custNoEncKey;
                          vm.$store.state.cu.gsrContract1 =
                            res.data.data.agree1;
                          vm.popupAction('popupOfflineMember');
                          // vm.$router.push('/cu/pop_offline_member');
                        });
                    }
                    Tracker.signupMessage(res.data.data.resultMessage);
                  }
                }
              });
          } else {
            this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
          }

          if (callBack) {
            callBack();
          }
        }
      });
    },
    // 애플 회원가입
    getAppLogin() {
      const date = {
        type: 'J',
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
