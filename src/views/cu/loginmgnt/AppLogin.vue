<!--
Design: views/cu/SC-FO-CU-GF-MS-018
Pg id:
Uri: /cu/login
-->
<template>
  <div class="integrate-member__wrap wrap-login login-main app-login" v-bind:class="[siteClass]">
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="login-wrap">
        <!-- START : 로그인 input -->
        <section class="section-area login">
          <h2 class="hidden">로그인 폼 입력</h2>
          <div class="inner">
          </div>
        </section>
        <!-- END : 로그인 input -->
        <!-- START : 간편 로그인 -->
        <section class="section-area login easy">
          <div class="inner">
          </div>
        </section>
        <!-- END : 간편 로그인 -->
      </div>
      <Loading></Loading>
    </main>
  </div>
</template>
<script>
/* START : 실사용 컴포넌트 */
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import CuUtils from '@/common/cu/CuUtils';
import Tracker from '@/common/Tracker';
import ConsoleUtils from '@/common/ConsoleUtils';
import Loading from '@/views/cu/loginmgnt/Loading.vue'; // 롸이이딩~

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
    // SubDefaultHeader, // 헤더
    Loading
  },
  data() {
    return {
      form: {
      },
      defaultHeader: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      storeItemsData: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mounted() {
    // 앱정보 조회
    this.getAppLogin();
  },
  methods: {
    // 웹 아이디 로그인
    getAppLogin: async function() {
      const vm = this;
      const sCmmSteId = vm.$route.query.cmmSteId; // 커머스사이트ID
      const sMallId = vm.$route.query.mallId; // 몰ID
      const sSteConnMdaTypeCd = vm.$route.query.steConnMdaTypeCd; // 미디어타입
      const sChanlId = vm.$route.query.chanlId; // 채널
      const sDvcId = vm.$route.query.dvcId; // 디바이스ID
      const sAutoLoginYn = vm.$route.query.autoLoginYn; // 자동로그인여부
      const sAutoLoginCertVal = vm.$route.query.autoLoginCertVal; // 자동로그인키값
      // const sReturnUrl = vm.$route.query.returnUrl; // 리턴URL
      const data = {
        dvcId: sDvcId,
        autoLoginCertVal: sAutoLoginCertVal,
        mallId: sMallId,
        cmmSteId: sCmmSteId,
        mdaType: sSteConnMdaTypeCd,
        chanlId: sChanlId,
      };
      const _data = data;
      const headers = this.defaultHeader;
      try {
        const response = await ApiUtils.post('/fo/cu/loginmgnt/app-auto-login', data, { 'Content-Type': 'application/json' });
        // 로그인 성공.
        if (response.data.success === true) {
          const data = response.data.data;
          JwtUtils.setAutoLogin(false);
          const refreshToken = data.jwtRslt.refreshToken;
          JwtUtils.saveRefreshToken(refreshToken);
          JwtUtils.saveIdToken(data.jwtRslt.idToken);
          JwtUtils.saveEncVal(response.data.data.ENC_VAL);
          const user = response.data.data.userRslt;
          CookieUtils.setLoginCookies(user);
          Tracker.loginSuccess(data.userRslt.custNo);

          if (!StringUtils.isEmpty(data.spctdFlag)) {
            if (data.spctdFlag === 'S') {
              vm.$gsdialog.alert('휴면이 해제되었습니다.', { html: true });
            }
          }

          // APP 로그인 경우
          const dvcId = sDvcId;
          if (!StringUtils.isEmpty(dvcId)) {
            CookieUtils.setCookie('MbrJoinTodayYn', user.mbrJoinTodayYn);
            CookieUtils.setCookie('PushAgreeOpenYn', user.pushAgreeOpenYn);
            let autoLoginCertValChk = '';
            const devData = {
              cmmSteId: CookieUtils.getCmmSteId(),
              dvcId: dvcId,
              autoLoginYn: 'Y'
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
                  autoLoginYn: 'Y',
                  refreshToken: refreshToken
                };
                window.appCallLoginComplete(certData);
              }
            }
            const autoData = {
                dvcId: dvcId,
                autoLoginCertVal: autoLoginCertValChk,
                cmmSteId: CookieUtils.getCmmSteId(),
                autoLoginYn: 'Y',
            };
            const resAuto = await ApiUtils.post('/fo/cu/loginmgnt/app-auto-login-registration', autoData);
            if (resAuto.data === null) {
              this.$gsdialog.alert('오류', { html: true });
              return;
            }
          }

          // 최근 본 상품 등록
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
          const returnUrl = vm.$route.query.returnUrl;
          let loc = returnUrl;
          if (StringUtils.isEmpty(loc)) {
            loc = CuUtils.getLink();
          }
          setTimeout(() => {
            location.href = loc;
          }, 500);
        } else {
          console.log("로그인 실패");
          const returnUrl = vm.$route.query.returnUrl;
          let loc = returnUrl;
          if (StringUtils.isEmpty(loc)) {
            loc = CuUtils.getLink();
          }
          setTimeout(() => {
            location.href = loc;
          }, 500);
        }
      } catch (e) {
        const returnUrl = vm.$route.query.returnUrl;
        let loc = returnUrl;
        if (StringUtils.isEmpty(loc)) {
          loc = CuUtils.getLink();
        }
        setTimeout(() => {
          location.href = loc;
        }, 500);
      }
    },
  },
};
</script>
<style lang="scss">
</style>
