<!--
views/ss/SC-FO-SS-GF-MS-911.vue
views/ss/SC-FO-SS-GF-MS-912.vue
-->
<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림 멤버십" :onlyTitleType="true" :tabbar="false" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="membership-complete">
          <p class="txt">
            감사합니다.
            <br />지금부터 달리드림 멤버십을
            <br />이용하실 수 있습니다.
          </p>
          <ul class="dream-details">
            <li>
              <span>이용기간</span>
              {{ dateFormat(rcvJoinInfo.pmbsJoinDt) }} ~ {{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}
            </li>
            <li>
              <span>다음 자동결제 예정일</span>
              {{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}
            </li>
            <li>
              <span>결제금액</span> 3,900원/월
            </li>
          </ul>
          <div class="btn-area">
            <button type="button" class="btn-dali daligreen" @click="goUrl">달리드림 쇼핑하러 가기</button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import ContextUtils from '@/common/ContextUtils';
import Tracker from '@/common/Tracker';
export default {
  name: 'DaliNewMembershipComplete',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '가입하기 < 달리살다 멤버십 < 마이페이지 < %s',
  },
  data() {
    return {
      rcvJoinInfo: [],
      nextExp: '',
      siteClass: CookieUtils.getSiteClass(),
      loginYn: LoginUtils.isLogin(),
    };
  },
  components: {
    SubDefaultHeader,
    Footer, // 푸터
  },
  methods: {
    dateFormat(dateStr) {
      if (!StringUtils.isEmpty(dateStr)) {
        return DateUtils.format(dateStr, 'YYYY.MM.DD');
      }
    },
    goUrl() {
      location.href = SiteUtils.dalimo('');
    },
    async retrievePmbsJoin() {
      const receiveJoinInqInputDto = { searchType: 'CURRENT' };
      const receiveJoinData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        receiveJoinInqInputDto
      );
      this.rcvJoinInfo = receiveJoinData.data.data[0];
      this.nextExp = DateUtils.add(
        DateUtils.parse(this.rcvJoinInfo.maxValidDurEndDt),
        1,
        'day'
      );
    },
  },
  mounted() {
    const jsonObject = {
      cardIssuerName: this.$route.query.cardIssuerName,
      custGrdNm: this.$route.query.custGrdNm,
      mbsTypeCd: this.$route.query.mbsTypeCd,
    };
    console.log("달리드림 멤버십 PbmsJoinComplete", jsonObject);
    Tracker.joinMemberShip(jsonObject);

    const param = {
      pmbsJoinPrcnCd: '0001',
    };
    LoginUtils.updateEncVal(param)
      .then((res) => {
        if (this.loginYn === true) {
          this.retrievePmbsJoin();
        }
      });
  },
};
</script>
