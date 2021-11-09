<template>
  <div class="wrap-sub-detail wrap-setting" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="설정"/>
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="section-area">
        <ul class="wrap-list-setting">
          <li class="login">
            <!-- START : 로그인 후 -->
            <div class="inner" v-if="this.$store.state.dp.isLogin">
              <div class="inner-title">
                <!-- 수정 START : 2020.02.05 로그인 후 정보 아이디에서 이름으로 변경 -->
                <div class="title">{{custNm}}</div>
                <!-- 수정 END : 2020.02.05 로그인 후 정보 아이디에서 이름으로 변경 -->
              </div>
              <div class="inner-setting">
                <button class="btn-border" @click="toLogout">로그아웃</button>
              </div>
            </div>
            <!-- END : 로그인 후 -->
            <!-- START : 로그인 전 -->
            <a
              href="javascript:void(0);"
              @click="toLogin"
              class="btn-arr"
              title="로그인페이지이동"
              v-else
            >로그인 해 주세요</a>
            <!-- END : 로그인 전 -->
          </li>
          <!-- 4월 수정 START : 내용 변경 및 추가 -->
          <li v-if="this.$store.state.dp.isLogin && isapp">
            <div class="inner">
              <div class="inner-title" v-if="siteClass=='marketfor'">
                <div class="title">구매정보 알림 받기</div>
                <p class="desc">
                  구매하신 상품의 배송정보, 재입고 알림,
                  <br />문의내용의 답변 등을 실시간으로 받아 볼 수 있습니다.
                </p>
              </div>
              <div class="inner-title" v-else>
                <div class="title">혜택광고 PUSH 알림 수신 동의</div>
                <p class="desc">
                  수신에 동의하면 할인상품,
                  <br />할인쿠폰 증정 등의 정보를 받으실 수 있습니다
                </p>
              </div>
              <div class="inner-setting">
                <span class="wrap-check">
                  <input
                    type="checkbox"
                    id="pushAgree"
                    value="pushAgree"
                    class="inp-setting"
                    @click="fnPushAgree"
                    v-model="checkedPushAgree"
                  />
                  <label for="pushAgree">
                    <span class="hidden">동의함</span>
                  </label>
                </span>
              </div>
            </div>
          </li>
          <li v-if="this.$store.state.dp.isLogin && isapp">
            <div class="inner">
              <div class="inner-title" v-if="siteClass=='marketfor'">
                <div class="title">쇼핑 이벤트/혜택 알림 받기</div>
                <p class="desc">
                  쿠폰과 특가상품 등의 쇼핑 혜택 및
                  <br />이벤트와 기획전에 대한 정보를 받아볼 수 있습니다.
                </p>
              </div>
              <div class="inner-title" v-else>
                <div class="title">쇼핑정보 PUSH 알림 수신 동의</div>
                <p class="desc">
                  수신에 동의하시면 주문 및 배송정보, 재입고 알림,
                  <br />문의답변 등의 정보를 받으실 수 있습니다
                </p>
              </div>
              <div class="inner-setting">
                <span class="wrap-check">
                  <input
                    type="checkbox"
                    id="pushShopping"
                    value="pushShopping"
                    class="inp-setting"
                    @click="fnPushShopping"
                    v-model="checkedNames"
                  />
                  <label for="pushShopping">
                    <span class="hidden">동의함</span>
                  </label>
                </span>
              </div>
            </div>
          </li>
          <!-- 4월 수정 END : 내용 변경 및 추가 -->
          <li class="update" v-if="isapp">
            <div class="inner">
              <div class="inner-title">
                <div class="title">
                  현재버전
                  <span class="version">Ver {{version}}</span>
                </div>
                <p class="desc">원활한 앱 사용을 위해 최신 버전을 유지해주세요</p>
              </div>
              <div class="inner-setting">
                <!-- START : 앱이 최신버전 아닌 경우 -->
                <strong v-if="appUpdYn == undefined"></strong>
                <a
                  v-else-if="appUpdYn"
                  href="javascript:void(0);"
                  class="btn-border"
                  title="앱스토어 연결"
                  target="_blank"
                  @click="toOpenBrowser"
                >최신 업데이트</a>
                <!-- END : 앱이 최신버전 아닌 경우 -->
                <!-- START : 앱이 최신버전인 경우 -->
                <strong v-else>최신 버전입니다</strong>
                <!-- END : 앱이 최신버전인 경우 -->
              </div>
            </div>
          </li>
          <li v-if="isapp">
            <button
              class="btn-arr"
              title="상세 내용 보기"
              aria-haspopup="dialog"
              aria-label="팝업활성화"
              @click="fnSwitchLincense"
            >오픈 라이선스</button>
          </li>
          <!-- 추가 START : 2020.03.06 위치정보이용동의 -->
          <!-- <li>
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">위치 정보 이용 동의</h2>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">-->
                  <!-- 수정 START : 2020.03.30 ID, Label 값 수정 -->
                  <!-- <input type="checkbox" id="location" class="inp-setting" />
                  <label for="location">
                    <span class="hidden">동의함</span>
                  </label>-->
                  <!-- 수정 END : 2020.03.30 ID, Label 값 수정 -->
                <!-- </div>
              </div>
            </div>
          </li> -->
          <!-- 추가 END : 2020.03.06 위치정보이용동의 -->
          <!-- 4월 수정 START : 마크업 위치 변경 및 신규 추가 (로그인 후 노출)  -->
          <!-- <li v-if="this.$store.state.dp.isLogin"> -->
          <li v-if="(!iosyn) && isapp">
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">캐시 삭제</h2>
                <!-- 4월 수정 : 텍스트 변경 -->
              </div>
              <div class="inner-setting">
                <button class="btn-border btn-small" title="캐시 삭제" @click="goclearWebCache">삭제</button>
              </div>
            </div>
          </li>
          <!-- <li v-if="this.$store.state.dp.isLogin  && isapp">
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">생체인증 로그인 설정</h2>-->
                <!-- 4월 수정 : 텍스트 변경 -->
              <!-- </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="smartLogin" class="inp-setting" />
                  <label for="smartLogin">
                    <span class="hidden">동의함</span>
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li v-if="this.$store.state.dp.isLogin">
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">자동로그인 설정</h2>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="autoLogin" class="inp-setting" checked />
                  <label for="autoLogin">
                    <span class="hidden">동의함</span>
                  </label>
                </div>
              </div>
            </div>
          </li> -->
          <!-- 4월 수정 END : 마크업 위치 변경 (로그인 후 노출)  -->
        </ul>
      </div>
      <!-- 4월 수정 - 마크업 위치 변경 / 추가 START : 2020.02.26 로그인 후 일 경우만 노출 -->
      <!--<div class="section-area" v-if="cmmSteId === '3'">
        <ul class="wrap-list-setting">
          <li>
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">생채인증 로그인 설정</h2>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="smartLogin" class="inp-setting" />
                  <label for="smartLogin"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>-->
          <!-- <li>
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">자동로그인 설정</h2>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="autoLogin" class="inp-setting" checked/>
                  <label for="autoLogin"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>-->
      <!-- <div class="section-area" v-if="this.$store.state.dp.isLogin">
        <h2 class="txt-title type2">SNS 연동 관리</h2>
        <ul class="wrap-list-setting member">
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico naver" aria-label="네이버 아이콘"></i>
                  <span>네이버 연결</span>
                  <span class="date">2019.11.08 12:30에 연결</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="naver" class="inp-setting" checked />
                  <label for="naver">
                    <span class="hidden">동의함</span>
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico kakaotalk" aria-label="카카오톡 아이콘"></i>
                  <span>카카오 연결</span>
                  <span class="date">2019.11.08 12:30에 연결</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="kakaotalk" class="inp-setting" checked />
                  <label for="kakaotalk">
                    <span class="hidden">동의함</span>
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico facebook" aria-label="페이스북 아이콘"></i>
                  <span>페이스북 연결</span>
                  <span class="date" v-if="false">2019.11.08 12:30에 연결</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="facebook" class="inp-setting" />
                  <label for="facebook">
                    <span class="hidden">동의함</span>
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <i class="ico payco" aria-label="페이코 아이콘"></i>
                  <span class="sns">페이코 연결</span>
                  <span class="date" v-if="false">2019.11.08 12:30에 연결</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="payco" class="inp-setting" />
                  <label for="payco">
                    <span class="hidden">동의함</span>
                  </label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div> -->
      <!-- 추가 END : 2020.02.26 로그인 후 일 경우만 노출 -->
    </main>
    <!-- START : 팝업 -->
    <!-- <OpenLicence @popupEvent="popupAction" v-if="popup.popupLicence" />-->
    <OpenLicenceAndroid @popupEvent="popupAction" v-if="popup.popupLicenceAndroid" /> <!-- 7월 수정 추가 -->
    <OpenLicenceIOS @popupEvent="popupAction" v-if="popup.popupLicenceIOS" /><!-- 7월 수정 추가 -->
    <!-- END : 팝업 -->
    <!-- 4월 수정 START : 푸터 추가 -->
    <!-- START : 푸터 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import OpenLicence from '@/views/ss/OpenLicence'; // 팝업 - 오픈 라이선스
import SiteUtils from '@/common/SiteUtils';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import LoginUtils from '@/common/LoginUtils';
import OpenLicenceIOS from '@/views/ss/SC-FO-SS-GF-MP-104_ios'; // 팝업 - 오픈 라이선스 IOS (7월 수정 추가)
import OpenLicenceAndroid from '@/views/ss/SC-FO-SS-GF-MP-104_android'; // 팝업 - 오픈 라이선스 Android (7월 수정 추가)
import ContextUtils from '@/common/ContextUtils';
import DateUtils from '@/common/DateUtils';

export default {
  name: 'SettingForApp',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '설정 < %s',
    meta: [ // 앱 트래커 메타정보 // 입고알림트캐러, 개발 진행 후 작업필요
      {
        property: 'aa:page',
        content: '설정'
      }
    ],
  },
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    // OpenLicence,
    OpenLicenceIOS,
    OpenLicenceAndroid
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        // popupLicence: false,
        popupLicenceIOS: false, // 7월 수정 추가
        popupLicenceAndroid: false // 7월 수정 추가
      },
      checkedNames: false, // [],
      cmmMbrNo: '',
      isLogin: LoginUtils.isLogin(),
      custNm: CookieUtils.getCookie('CUST_NM'),
      checkedPushAgree: false,
      mallId: CookieUtils.getCookie('MALL_ID'), // 11은 fresh 1은 gs
      version: '',
      iosyn: ContextUtils.getAgent() === 'ios' ? true : false,
      appUpdYn: undefined,
      dvcOsSpCd: ContextUtils.getAgent() === 'ios' ? 'I' : 'A',
      year: DateUtils.getToday().substr(0, 4),
      month: DateUtils.getToday().substr(5, 2),
      day: DateUtils.getToday().substr(8, 2),
      isapp: ContextUtils.isNative(),
      cmmSteId: CookieUtils.getCmmSteId(),
    };
  },
  created() {
    // 이걸 호출 해야 localstorage에 값을 리턴 받음.
    window.appCallAppInfo();
  },
  methods: {
    fnSwitchLincense() {
      if (this.iosyn) {
        this.popupAction('popupLicenceIOS');
      } else {
        this.popupAction('popupLicenceAndroid');
      }
    },
    async fnPushAgree() {
      if (!this.$store.state.dp.isLogin) {
        this.$gsdialog.alert('로그인이 필요합니다.').then(() => {
          this.checkedNames.pop();
        });
        return;
      } else {
        let agrmAgrYn = 'Y';
        let retVal = false;
        const msg = '다양한 특가상품과 할인정보를 놓치지 마세요!<br/>PUSH 알림을 유지 하시겠습니까?';
        if (this.checkedPushAgree) {
          event.preventDefault();
          await this.$gsdialog.confirm(msg, {html: true})
            .then(dialog => {
              retVal = true;
            }).catch(e => {});
        }

        if (retVal) {
          return;
        }
        if (this.checkedPushAgree) {
          this.checkedPushAgree = false;
          agrmAgrYn = 'N';
        } else {
          this.checkedPushAgree = true;
          agrmAgrYn = 'Y';
        }
        let cmmSteAgrmCd = null;
        if (CookieUtils.getCmmSteId() === '1') {
          cmmSteAgrmCd = 'F0';
        } else if (CookieUtils.getCmmSteId() === '2') {
          cmmSteAgrmCd = 'D0';
        } else {
          cmmSteAgrmCd = 'M0';
        }
        console.log('cmmSteAgrmCd', cmmSteAgrmCd);
        const param = {
          cmmMbrNo: this.cmmMbrNo,
          cmmSteAgrmCd: cmmSteAgrmCd,
          agrmAgrYn: agrmAgrYn,
          lastModUserId: this.cmmMbrNo,
        };
        console.log('param', param);
        await this.$store.dispatch('setPushAgree', param);
        let agrmAgrYnString = '동의';
        if (agrmAgrYn == 'N') {
          agrmAgrYnString = '거부';
        }
        if (this.$store.state.ss.resultYn == 'Y') {
          if (this.cmmSteId == '3') {
            this.$gsdialog.alert('{' + this.year + '년 ' + this.month + '월 ' + this.day + '일' + '} \n ' + '구매정보 알림' + agrmAgrYnString + '가 정상 처리되었습니다.');
          } else {
            this.$gsdialog.alert('{' + this.year + '년 ' + this.month + '월 ' + this.day + '일' + '} \n ' + '광고성/혜택 정보(Push)알림' + agrmAgrYnString + '가 정상 처리되었습니다.');
          }
        } else {
          this.checkedPushAgree = !this.checkedPushAgree;
          this.$gsdialog.alert('알림을 설정 할 수 없습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    },
    async fnPushShopping() {
      let agrmAgrYn = 'Y';
      let retVal = false;
      const msg = '알림을 해제하면 주문,배송 등의 주요 정보를 받아보실 수 없습니다.<br/>PUSH 알림을 유지 하시겠습니까?';
      if (this.checkedNames) {
        event.preventDefault();
        await this.$gsdialog.confirm(msg, {html: true})
          .then(dialog => {
            retVal = true;
          }).catch(e => {});
      }

      if (retVal) {
        return;
      }
      if (this.checkedNames) {
        this.checkedNames = false;
        agrmAgrYn = 'N';
      } else {
        this.checkedNames = true;
        agrmAgrYn = 'Y';
      }
      const param = {
        cmmSteId: CookieUtils.getCmmSteId(),
        dvcId: localStorage.getItem('deviceId'),
        appAgrmCd: '01',
        agrmAgrYn: agrmAgrYn,
        lastModUserId: this.cmmMbrNo,
      };
      await this.$store.dispatch('setPushShopping', param);
      let agrmAgrYnString = '동의';
      if (agrmAgrYn == 'N') {
        agrmAgrYnString = '거부';
      }
      if (this.$store.state.ss.resultYn == 'Y') {
        if (this.cmmSteId == '3') {
          this.$gsdialog.alert('{' + this.year + '년 ' + this.month + '월 ' + this.day + '일' + '}' + '쇼핑 이벤트/혜택 알림' + agrmAgrYnString + '가 정상 처리되었습니다.');
        } else {
          this.$gsdialog.alert('{' + this.year + '년 ' + this.month + '월 ' + this.day + '일' + '}' + '정보성/쇼핑정보(Push)알림' + agrmAgrYnString + '가 정상 처리되었습니다.');
        }
      } else {
        this.checkedNames = !this.checkedNames;
        this.$gsdialog.alert('알림을 설정 할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
    },
    appInit() {
      // 혜택광고 init
      this.checkedPushAgree = this.$store.state.ss.pushAgreeInfo;
      this.checkedNames = this.$store.state.ss.pushShopping;
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
    },
    toLogin() {
      const returnUrl = encodeURIComponent(location.href);
      const loginUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
      location.href = loginUrl;
    },
    async toLogout() {
      await LoginUtils.logout();
      this.$store.state.dp.isLogin = false;
      // 20200825 - 앱쪽 로그아웃 호출
      window.appCallLogoutComplete();
      this.$gsdialog.alert('로그아웃 되었습니다.')
      .then(() => {
        SiteUtils.go(location.host, '/');
      });
    },
    toOpenBrowser() {
      let marketUrl = '';
      if (CookieUtils.getCmmSteId() == '3') {
         if (this.iosyn) {
          marketUrl = 'https://itunes.apple.com/kr/app/id1546812398';
        } else {
          marketUrl = 'market://details?id=com.gsretail.android.marketfor&url=marketfor://default';
        }
      } else if (this.mallId == '1') {
        if (this.iosyn) {
          marketUrl = 'https://itunes.apple.com/kr/app/id813494275?mt=8';
          // https://apps.apple.com/us/app/id813494275
        } else {
          marketUrl = 'market://details?id=com.gsretail.android.smapp&url=gssmapp://default';
          // https://play.google.com/store/apps/details?id=com.gsretail.android.smapp
        }
      } else if (this.mallId == '11') {
        if (this.iosyn) {
          marketUrl = 'https://itunes.apple.com/kr/app/id1518974339';
          // https://apps.apple.com/us/app/id1518974339
        } else {
          marketUrl = 'market://details?id=com.gsretail.android.dalisalda&url=dalisalda://default';
          // https://play.google.com/store/apps/details?id=com.gsretail.android.dalisalda
        }
      }
      window.appCallOpenBrowser(marketUrl);
    },
    goclearWebCache() {
      const vm = this;
      this.$gsdialog.confirm(`캐시에 저장된 콘텐츠와 데이터를 삭제하시겠습니까?`).then(async function () {
        try {
          await window.appCallClearWebCache();
          vm.$gsdialog.alert('삭제되었습니다.');
        } catch (e) {
          vm.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
            console.log(e);
          });
        }
      });
    },
    async searchAppUpdYn() {
      const devData = {
        cmmSteId: CookieUtils.getCmmSteId(),
        dvcId: localStorage.getItem('deviceId'),
        appVer: this.version,
        isRetrieve: 'Y',
        dvcOsSpCd: this.dvcOsSpCd,
      };
      const resDev = await ApiUtils.get('/fo/cm/appmgnt/device', devData);
      if (resDev.data.success === true) {
        const data = resDev.data.data;
        if (data.appUpdYn == 'Y') {
          this.appUpdYn = true;
        } else {
          this.appUpdYn = false;
        }
      } else {
        this.appUpdYn = false;
      }
    },
  },
  async mounted() {
    try {
      this.version = localStorage.getItem('appVersion');
      await this.searchAppUpdYn();
      if (this.$store.state.dp.isLogin) {
        window.appCallAppInfo();
        // TODO / wisehouse / MF로 바꿔도 되나?
        const cmmMbrNo = await ApiUtils.get('/dp/mf/dspctgmgnt/get-cmm-mbr-no');
        this.cmmMbrNo = cmmMbrNo.data;
        const param = { cmmMbrNo: cmmMbrNo.data,
                        cmmSteId: CookieUtils.getCmmSteId(),
                        dvcId: localStorage.getItem('deviceId'),
                      };
        await this.$store.dispatch('getMemberInfo', param);
        await this.$store.dispatch('getPushAgree', param);
        await this.$store.dispatch('getPushShopping', param);
        this.appInit();
      }
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.popupLicence) {
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
