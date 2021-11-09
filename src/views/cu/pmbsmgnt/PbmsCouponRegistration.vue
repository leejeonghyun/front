<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림 멤버십 등록" :onlyTitleType="true" :tabbar="false" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="membership-complete">
          <p class="txt dali-point">등록완료</p>
          <p class="txt">{{this.pbmsGiftQty * 30 }}일 회원권이 등록되었습니다.</p>
          <!-- 4월수정 END : 마크업 수정 -->
          <p class="txt-sub">이용기간을 꼭! 확인해주세요.</p>
          <ul class="dream-details">
            <li>
              <span>이용기간</span>
              {{ dateFormat(rcvJoinInfo.pmbsJoinDt) }} ~ {{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}
            </li>
            <!-- <li><span>쿠폰적용기간</span>{{ dateFormat(rcvJoinInfo.minValidDurBeginDt) }} ~ {{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}</li> -->
            <li>
              <span>다음 자동결제 예정일</span>
              {{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}
            </li>
            <li>
              <span>결제금액</span> 3,900원/월
            </li>
          </ul>
          <div class="btn-area">
            <button type="button" class="btn-dali daligray" @click="giftList">달리드림 멤버십 회원권 선물함</button>
            <button type="button" class="btn-dali daligreen" @click="myList">나의 내역</button>
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
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'DaliCouponComplete',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '멤버십 쿠폰등록하기 < 달리살다 멤버십 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '달리드림 멤버십 회원권 등록하기',
      },
    ],
  },
  data() {
    return {
      rcvJoinInfo: [],
      pmbsTdrNo: '',
      pbmsGiftQty: '',
      siteClass: CookieUtils.getSiteClass(),
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
    giftList: function() {
      this.$router.push('/cu/pbms_gift');
    },
    myList: function() {
      this.$router.push('/cu/pbms_use_history');
    },
    async retrievePmbsJoin() {
      const receiveJoinInqInputDto = {
        searchType: 'MAX',
        pmbsTdrNo: this.pmbsTdrNo,
      };
      const receiveJoinData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        receiveJoinInqInputDto
      );
      this.rcvJoinInfo = receiveJoinData.data.data[0];
    },
  },
  async mounted() {
    this.pmbsTdrNo = sessionStorage.getItem('pmbsTdrNo');
    sessionStorage.setItem('pmbsTdrNo', '');
    this.pbmsGiftQty = sessionStorage.getItem('myGiftQty');
    sessionStorage.setItem('myGiftQty', '');
    this.retrievePmbsJoin();
  },
};
</script>
