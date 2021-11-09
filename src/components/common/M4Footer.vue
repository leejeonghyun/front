<template>
  <!-- 8월 수정 START : 디자인 디벨롭 수정 사항 -->
  <div class="wrap-footer" id="footer" tabindex="0" :class="flowroute">
    <ul class="wrap-list-service">
      <li>
        <a href="javascript:void(0);" class="btn-info cs" @click="goCliamCenter()"><span>고객센터</span></a>
      </li>
      <li>
        <a href="javascript:void(0);" class="btn-info inquire" @click="chkLogin"><span>1:1문의</span></a>
      </li>
    </ul>
    <div v-if="mallId === '1'" class="mall-1"></div>
    <div v-if="mallId === '11'" class="mall-11"></div>
    <!-- <ul class="wrap-sns-icon" v-if="cmmSteId === '3'"> -->
      <!-- <li><a href="https://www.instagram.com/gsfresh_official/" target="_blank" class="icon-instagram">인스타그램</a></li>
      <li><a href="https://www.youtube.com/channel/UCQYQGja0_ufBJuLi44si7JA" target="_blank" class="icon-youtube">유튜브</a></li>
      <li><a href="https://m.post.naver.com/my.nhn?memberNo=51322097" target="_blank" class="icon-naver" >네이버포스트</a></li>
      <li><a href="http://pf.kakao.com/_lRLKxd" target="_blank" class="icon-kakaotalk">카카오톡 채널</a></li> -->
    <!-- </ul> -->
    <ul class="wrap-sns-icon wrap-sns-gsf wrap-sns-dali" v-if="cmmSteId !== '3'">
      <li>
        <a v-if="mallId === '1'" class="icon-instagram" href="https://www.instagram.com/gsfreshmall_official/" target="_blank">인스타그램</a>
        <a v-if="mallId === '11'" class="icon-instagram" href="https://www.instagram.com/dalisalda_official/" target="_blank">인스타그램</a>
      </li>
      <li v-if="mallId === '11'">
        <a class="icon-naver" href="https://m.post.naver.com/my.nhn?memberNo=51322097" target="_blank">네이버포스트</a>
      </li>
      <li>
        <a v-if="mallId === '1'" class="icon-youtube" href="https://www.youtube.com/channel/UCQYQGja0_ufBJuLi44si7JA" target="_blank">유튜브</a>
        <a v-if="mallId === '11'" class="icon-youtube" href="https://www.youtube.com/channel/UCDMqLZ7Osyxa32zCTu2jSzw" target="_blank">유튜브</a>
      </li>
      <li>
        <a v-if="mallId === '1'" class="icon-kakaotalk" href="http://pf.kakao.com/_lRLKxd" target="_blank">카카오톡 채널</a>
        <a v-if="mallId === '11'" class="icon-kakaotalk" href="http://pf.kakao.com/_ftNqK" target="_blank">카카오톡 채널</a>
      </li>
    </ul>
    <footer>
      <ul class="wrap-list-footer">
        <li>
          <gs-link to="/ft/m4_terms">
            이용약관
          </gs-link>
        </li>
        <li>
          <a href="http://www.gsretail.com/gsretail/ko/footer/privacy" title="새창" target="_blank">개인정보처리방침</a>
        </li>
        <li>
          <a href="https://my-m.gsfresh.com/pop_ShinhanService.html" title="새창" target="_blank">전자상거래 구매안전서비스 안내</a>
        </li>
        <li>
          <gs-link title="청소년보호정책" to="/ft/m4_youth_term">
            청소년보호정책
          </gs-link>
        </li>
        <li>
          <button v-if="isLogin == false" @click="toLogin" class="btn-info login">
            <span>로그인</span>
          </button>
          <button v-else @click="toLogout" class="btn-info login">
            <span>로그아웃</span>
          </button>
        </li>
        <li>
          <button class="company-info" :class="{active : companyInfo}" @click="companyInfo = !companyInfo">사업자정보</button>
        </li>
      </ul>
      <address v-if="companyInfo">
        <ul>
          <li>
            ㈜GS리테일 대표이사 : <span>허연수</span>
          </li>
          <li class="num">
            사업자등록번호 : <span>116-81-18745</span>
          </li>
          <li>
            통신판매등록번호 : <span>제2014-서울강남-01544호</span>
          </li>
          <li>
            <span class="hidden">주소</span><span>서울특별시 강남구 논현로 508 GS강남타워(역삼679번지 GS타워)</span>
          </li>
        </ul>
        <a href="tel:16612562" class="btn-tel" title="고객센터 전화연결"><span>1661-2562</span></a>
      </address>
      <p class="copyright">&copy; GS Retail Co.,LTD. All rights reserved.</p>
      <p class="response">㈜GS리테일은 통신판매중개자로 직접 통신판매하는 4개 몰 이외<br>입점판매사가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다.</p>
      <button class="store-info" :class="{active : storeInfo}" @click="storeInfo = !storeInfo">㈜GS리테일 운영몰 확인</button>
      <div id="footerAcco01" class="cont-accordion"  v-if="storeInfo">
        <a href="javascript:void(0);" class="icon1">gsfreshmall</a>
        <a href="javascript:void(0);" class="icon2">lalavla</a>
        <a href="javascript:void(0);" class="icon3">dalisalda</a>
        <a href="javascript:void(0);" class="icon4">simplycoook</a>
      </div>
      <div>
        <iframe style="display:none;" id="m4Iframe1" name="m4Iframe1" src="" />
        <iframe style="display:none;" id="m4Iframe2" name="m4Iframe2" src="" />
      </div>
      <!-- 멀티로그인 Iframe -->
    </footer>
  </div>
  <!-- 8월 수정 END : 디자인 디벨롭 수정 사항 -->
</template>
<script>
import LoginUtils from '@/common/LoginUtils';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';
import ConsoleUtils from '@/common/ConsoleUtils';
import Tracker from '@/common/Tracker';

export default {
  name: "MfFooter",
  props: {
    flowroute: {
      type: String,
      default: 'marketfor'
    },
  },
  data() {
    return {
      isLogin: LoginUtils.isLogin(),
      notLoginPage: location.pathname !== '/cu/login',
      popYn: 'N',
      nowMda: CookieUtils.getMdaType(),
      mallId: CookieUtils.getMallId(),
      cmmSteId: CookieUtils.getCmmSteId(),
      companyInfo: false,
      storeInfo: false,
    };
  },
  methods: {
    toLogin() {
      const returnUrl = location.href;
      const urlList = [];
      urlList[urlList.length] = "/cu/find_id_password";
      const urlCnt = urlList.filter(excptUrl => {
        return returnUrl.indexOf(excptUrl) > -1;
      }).length;
      if (urlCnt > 0) {
        SiteUtils.go(location.host, '/cu/login?returnUrl=' + encodeURIComponent(location.host));
      } else {
        SiteUtils.go(location.host, '/cu/login?returnUrl=' + encodeURIComponent(returnUrl));
      }
    },
    async toLogout() {
      await LoginUtils.logout();
      this.$store.state.dp.isLogin = false;
      // 20200825 - 앱쪽 로그아웃 호출
      window.appCallLogoutComplete();
      this.multiLogout();
      this.$gsdialog.alert('로그아웃 되었습니다.')
      .then(() => {
        SiteUtils.go(location.host, '/');
      });
    },
    goCliamCenter() {
      const centerUrl = SiteUtils.commo('/cs/claimmgnt/claimMain');
      location.href = centerUrl;
    },
    toPrivacy() {
      const toPrivacy ='http://www.gsretail.com/gsretail/ko/footer/privacy';
      // 01 PC / 02 모바일 / 03 GSfresh 앱
      if (this.nowMda == '03') {
        window.appCallOpenBrowser(toPrivacy);
      } else {
        window.open(toPrivacy);
      }
    },
    pop(value) {
      this.$gsdialog.alert(value);
    },
    toPC() {
      const uri = window.location.pathname + window.location.search;
      const toPC = SiteUtils.freshpc(uri);
      // 01 PC / 02 모바일 / 03 GSfresh 앱
      if (this.nowMda == '03') {
        window.appCallOpenBrowser(toPC);
      } else {
        window.open(toPC);
      }
    },
    chkLogin() {
      const oneToOneUrl = SiteUtils.commo('/cs/mbrinqr/mbr_inqr_list');
      if (this.isLogin) {
        location.href = oneToOneUrl;
      } else {
        SiteUtils.go(location.host, '/cu/login?returnUrl=' + oneToOneUrl);
      }
    },
    popupShinhanServiceActive() {
      window.open("https://my-m.gsfresh.com/pop_ShinhanService.html", "PopShinhanService", "");
    },
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
    multiLogout: function() {
      this.gsIframe1 = document.getElementById('m4Iframe1').contentWindow;
      this.gsIframe1.postMessage({ callValue: 'logout'}, '*');
      this.gsIframe2 = document.getElementById('m4Iframe2').contentWindow;
      this.gsIframe2.postMessage({ callValue: 'logout'}, '*');
    },
  },
  mounted() {
    this.m4IframeLoad();
    // if (location.pathname !== '/cu/login') {
    //   window.addEventListener('message', this.logoutCallback, false);
    // }
    // CookieUtils.addClassAppDiv();
  },
};
</script>
