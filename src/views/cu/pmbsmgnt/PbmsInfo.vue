<!--
views/ss/SC-FO-SS-GF-MS-909.vue
-->
<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <MainHeader headerText="달리드림 멤버십" v-if="cmmSiteId === '3'"/>
    <SubDefaultHeader headerText="달리드림 멤버십" v-else />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="dali-member-top">
          <div class="member-top-box">
            <p>
              회원님은 현재 달리살다의
              <br />
              <em>프리미엄 혜택</em>을 누리고 계십니다.
              <span
                class="use-period"
              >이용기간: {{ dateFormat(rcvJoinInfo.pmbsJoinDt) }} ~ {{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}</span>
            </p>
          </div>
          <div class="btn-area">
            <button type="button" class="btn-dali daligreen" @click="pageMove();">나의 내역보기</button>
          </div>
        </div>
        <div class="links-group">
          <ul>
            <li>
              <gs-link to="/cu/pbms_gift">달리드림 멤버십 회원권 선물함</gs-link>
            </li>
            <li>
              <a @click="chkPerdCoupon">달리드림 멤버십 회원권 등록하기</a>
            </li>
            <li>
              <a @click="chkPerdTdr">달리드림 해지</a>
            </li>
            <li>
              <gs-link to="/cs/claimmgnt/claimMain">자주 묻는 질문</gs-link>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import MainHeader from '@/components/common/SubDefaultHeader';
import SubDefaultHeader from '@/components/common/header/Header5';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'DaliMembershipAfter',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '달리드림 멤버십 < 마이페이지 < %s',
  },
  data() {
    return {
      rcvJoinInfo: [],
      perdTdr: '',
      loginYn: LoginUtils.isLogin(),
      siteClass: CookieUtils.getSiteClass(),
      cmmSiteId: CookieUtils.getCmmSteId(),
    };
  },
  components: {
    MainHeader,
    SubDefaultHeader,
    Footer, // 푸터
  },
  methods: {
    pageMove: function() {
      location.href = '/cu/pbms_use_history';
    },
    dateFormat(dateStr) {
      if (!StringUtils.isEmpty(dateStr)) {
        return DateUtils.format(dateStr, 'YYYY.MM.DD');
      }
    },
    async chkPerdTdr() {
      if (this.perdTdr == 'Y') {
        this.$router.push('/cu/pbms_leave');
      } else if (this.perdTdr == 'N') {
        this.$gsdialog.alert(
          '이미 해지하셨습니다.<br/>재가입하시려면 [나의 내역 보기 > 재가입하기]를 <br/>이용해주세요.',
          { html: true }
        );
      }
    },
    chkPerdCoupon() {
      // if (this.perdTdr == 'Y') {
        this.$router.push('/cu/pbms_coupon');
      // } else if (this.perdTdr == 'N') {
      //   this.$gsdialog.alert(
      //     '달리드림 멤버십 해지 회원입니다.<br/>[마이페이지 > 달리드림 멤버십 > 나의 내역]에서 <br/>재가입 후 쿠폰번호를 등록해주세요.',
      //     { html: true }
      //   );
      // }
    },
    chkQa() {
      this.$gsdialog.alert('FAQ>달리드림 멤버십 카테고리로 <br/>이동 예정입니다', { html: true });
    },
    async retrievePmbsJoin() {
      const receiveJoinInqInputDto = { searchType: 'CURRENT' };
      const receiveJoinData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        receiveJoinInqInputDto
      );
      if (receiveJoinData.data.success) {
        if (receiveJoinData.data.data != '') {
          this.rcvJoinInfo = receiveJoinData.data.data[0];
          this.perdTdr = this.rcvJoinInfo.perdTdrStngYn;
        } else {
          await this.$router.replace('/cu/pbms_join');
        }
      } else {
        this.$gsdialog.alert('로그인 후 이용해주세요.').then(dialog => {
          this.$router.push('/cu/login');
        });
      }
    },
  },
  mounted() {
    if (this.loginYn === true) {
      this.retrievePmbsJoin();
    } else {
      this.$router.push('/cu/login');
    }
  },
};
</script>
