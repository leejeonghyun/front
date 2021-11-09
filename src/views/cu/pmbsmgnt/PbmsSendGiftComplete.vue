<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림 멤버십" :onlyTitleType="true" :tabbar="false" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="membership-complete">
          <p class="txt present" @click="goMsg">
            달리드림 멤버십 회원권 선물하기
            <br />결제가 완료되었습니다
          </p>
          <p class="txt-sub" v-if="this.sendTyp == 'tabMobilePhone'">
            {{ this.selecNm }}님에게 선물이 전송되었습니다.
            <br />이용해주셔서 감사합니다.
          </p>
          <p class="txt-sub" v-if="this.sendTyp != 'tabMobilePhone'">
            {{ this.selecNm }}님에게 선물이 전송되었습니다.
            <br />이용해주셔서 감사합니다.
          </p>
          <div class="membership-complete" v-if="this.sendTyp == 'tabMobilePhone0'">
            <button @click="shareKa">
              <img
                src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              />
            </button>
          </div>
          <ul class="dream-details">
            <li>
              <span>결제금액</span>
              {{ comma(this.totSum) }}원
            </li>
          </ul>
          <div class="btn-area">
            <button
              type="button"
              class="btn-dali daligray"
              @click="goUrl('/cu/pbms_gift')"
            >달리드림 멤버십 회원권 선물함</button>
            <button type="button" class="btn-dali daligreen" @click="goHome">메인으로</button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
// import loadScriptOnce from 'load-script-once';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import Config from '@/common/Config.js';
import ShareUtils from '@/common/ShareUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'DaliGiveGiftComplete',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '멤버십 선물함 < 달리살다 멤버십 < 마이페이지 < %s',
  },
  data() {
    return {
      selecNm: '',
      selecTyp: '',
      totSum: '',
      sendTyp: '',
      sendUrl: '',
      // appKey: '7660aa91b6223b0b987ea0fe8005ca2c',
      // apiUrl2: '//developers.kakao.com/sdk/js/kakao.min.js',
      ordId: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    SubDefaultHeader,
    Footer, // 푸터
  },
  methods: {
    goUrl(pathG) {
      this.$router.push({ path: pathG });
    },
    commo(uri) {
      return SiteUtils.commo(uri);
    },
    cpnInfo: async function () {
      const PmbsGiftCpnIsseRegInputDto = { pmbsTdrNo: this.ordId };
      const giftCpnData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-gift-coupon-issue',
        PmbsGiftCpnIsseRegInputDto
      );
      this.giftCpnList = giftCpnData.data.data;
      if (this.giftCpnList == null) {
        this.$gsdialog.alert('오류가 발생했습니다');
      } else {
        this.sendUrl = this.giftCpnList.sendUrl;
        this.selecNm = this.giftCpnList.rcvpsNm;
        this.selecTyp = this.giftCpnList.pmbsGiftQty;
        this.totSum = this.selecTyp * 3900;
        if (this.sendTyp != 'tabMobilePhone') {
          this.$gsdialog
            .alert(
              '결제가 완료되었습니다.<br/>카카오톡에서 받으실 친구를 선택해주세요.',
              { html: true }
            )
            .then((dialog) => {
              this.shareKa();
            });
        }
      }
    },
    goMsg() {
      this.$router.push({
        path: '/cu/pbms_view_gift',
        query: { no: this.sendUrl },
      });
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    shareKa() {
      const img =
        'http://k.kakaocdn.net/dn/D1Foo/btqFONBwcGk/haWHoUtRpNk82a9LxrtNK0/kakaolink40_original.jpg';
      const snsUrl = this.commo('/cu/pbms_view_gift') + '?no=' + this.sendUrl;
      const title = '';
      const text1 = '달리살다';
      const text2 = this.giftCpnList.custNm + '님이 보내신 선물이 도착했어요';
      ShareUtils.shareKakaoTalk(snsUrl, text1, img, title, text2);
    },
    goHome() {
      const siteId = CookieUtils.getCmmSteId();
      if (siteId == '3') {
        location.href = SiteUtils.marketformo("/");
      } else if (siteId == '2') {
        location.href = SiteUtils.dalimo("/");
      } else {
        location.href = SiteUtils.freshmo("/");
      }
    },
  },
  mounted() {
    ShareUtils.init();
    this.sendTyp = sessionStorage.getItem('sendTyp');
    if (sessionStorage.getItem('pmbsTdrNo') != '') {
      this.ordId = sessionStorage.getItem('pmbsTdrNo');
      this.cpnInfo();
    }
  },
};
</script>
