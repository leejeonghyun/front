<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <!-- 4월 수정 START : 헤더 타입 변경 -->
    <MainHeader headerText="달리드림 멤버십" v-if="cmmSiteId === '3'"/>
    <SubDefaultHeader headerText="달리드림 멤버십" v-else />
    <!-- 4월 수정 END : 헤더 타입 변경 -->
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="membership-complete withdrawal">
          <p class="txt" v-if="this.byeType == '1'">
            지금 해지하시면
            <em>{{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}</em>
            <br />혜택을 이용하실 수 있으며, 이후에는 자동 해지됩니다.
            <span>(무료체험기간은 1회만 제공)</span>
          </p>
          <p class="txt" v-if="this.byeType == '2'">{{this.rcvMemInfo.custNm}}님 프리미엄 혜택을 포기하실건가요?</p>
          <!-- //무료체험 종료전 해지 회원 -->
          <div class="benefit-details">
            <strong>
              현재
              <em>{{this.rcvMemInfo.custNm}}</em> 님의 달리드림 멤버십 혜택
            </strong>
            <ul class="benefit-list">
              <li class="ico-membership">
                누구나!
                <br />첫 가입 시
                <br />60일 무료 제공
              </li>
              <li class="ico-discount">
                상품 구매 시!
                <br />최대 50%
                <br />상시 할인
              </li>
              <li class="ico-overseas">
                달리드림 멤버십 전용
                <br />해외직구 서비스
                <br />&amp;해외 무료 배송
              </li>
            </ul>
          </div>
          <p class="txt confirm">그래도 해지하시겠습니까?</p>
          <div class="btn-area">
            <button
              type="button"
              class="btn-dali daligreen"
              @click="goUrl('/cu/my_page')"
            >아니오, 유지할게요</button>
            <button
              type="button"
              class="btn-dali daligray"
              aria-label="멤버십 해지 팝업 활성화"
              aria-haspopup="dialog"
              @click="popupAction('popupDaliSelectClose')"
            >네, 해지할게요</button>
          </div>
        </div>
        <PopupDaliSelectClose
          @popupEvent="popupAction"
          v-if="this.popup.popupDaliSelectClose"
          :popup="popup"
        />
        <!-- 팝업 - 해지 사유 -->
      </div>
    </main>
    <Footer />
    <Loading v-show="loading > 0" />
  </div>
</template>
<script>
import MainHeader from '@/components/common/SubDefaultHeader';
import SubDefaultHeader from '@/components/common/header/Header5';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import DateUtils from '@/common/DateUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupDaliSelectClose from '@/views/cu/pmbsmgnt/PopupDaliSelectClose'; // 팝업 - 해지 사유
import CookieUtils from '@/common/CookieUtils';
import Loading from '@/components/common/Loading';
export default {
  name: 'DaliWithdrawal',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '멤버십 해지 < 달리살다 멤버십 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '달리드림 해지',
      },
    ],
  },
  data() {
    return {
      popup: {
        open: false,
        popupDaliSelectClose: false,
        infoArr: [],
      },
      bgGray: true,
      rcvJoinInfo: [],
      rcvMemInfo: [],
      rcvCanInfo: [],
      byeType: '',
      siteClass: CookieUtils.getSiteClass(),
      cmmSiteId: CookieUtils.getCmmSteId(),
      loading: 0,
    };
  },
  components: {
    MainHeader,
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    PopupDaliSelectClose, // 팝업 - 해지 사유
    Loading, // 로딩
  },
  methods: {
    dateFormat(dateStr) {
      if (!StringUtils.isEmpty(dateStr)) {
        return DateUtils.format(dateStr, 'YYYY년 MM월 DD일까지');
      }
    },
    goUrl(url) {
      this.$router.push(url);
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup.infoArr = {
        custNm: this.rcvMemInfo.custNm,
        emailAddr1: this.rcvMemInfo.emailAddr1,
        emailAddr2: this.rcvMemInfo.emailAddr2,
        byeType: this.byeType,
        maxDate: this.dateFormat(this.rcvJoinInfo.maxValidDurEndDt),
      };
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false); // view - body
    },
    async retrievePmbsJoin() {
      const receiveJoinInqInputDto = { searchType: 'CURRENT' };
      this.loading++;
      const receiveJoinData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        receiveJoinInqInputDto
      );
      this.loading--;
      this.rcvJoinInfo = receiveJoinData.data.data[0];
      if (this.rcvJoinInfo.pmbsGiftCount > 0) {
        this.byeType = '1';
      } else if (this.rcvJoinInfo.pmbsJoinTypeCd === '01') {
        // this.byeType = "1";
        const InputDto = { pmbsTdrNo: this.rcvJoinInfo.pmbsTdrNo, pmbsJoinDt: this.rcvJoinInfo.pmbsJoinDt };
        this.loading++;
        const rcvCanInfoData = await ApiUtils.get(
          '/fo/cu/pmbsmgnt/paidmembership-tender-cancel-possible-yesorno',
          InputDto
        );
        this.loading--;
        this.rcvCanInfo = rcvCanInfoData.data.data;
        if (rcvCanInfoData.data.statusCode !== '0000' || this.rcvCanInfo.refundPossibleYn === 'N') {
          this.byeType = '1';
        } else {
          this.byeType = '2';
        }
      } else {
        this.byeType = '1';
      }
    },
    async retriveMemInfo() {
      const rcvMemInfoData = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      );
      this.rcvMemInfo = rcvMemInfoData.data.data;
    },
  },
  updated() {},
  mounted() {
    // 배경 컬러 넣기
    const daliCont = document.querySelector('.wrap-dalidream');
    if (this.bgGray) {
      daliCont.classList.add('bg-gray');
    }
    this.retriveMemInfo();
    this.retrievePmbsJoin();
  },
};
</script>
