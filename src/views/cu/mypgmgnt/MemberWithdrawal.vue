<!--
 views/ss/SC-FO-SS-GF-MS-907
-->
<template>
  <div class="wrap-mypage member-info" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <!-- 4월 수정 START : 헤더 타입 변경 -->
    <SubDefaultHeader headerText="회원 탈퇴" />
    <!-- 4월 수정 END : 헤더 타입 변경 -->
    <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
    <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
      <!-- 수정 START : 2020.02.13 마크업 변경 -->
      <div class="wrap-withdraw">
        <div class="inner">
          <!-- 수정 START : 2020.02.17 텍스트 수정 -->
          <div class="area-title">
            <!-- <h2 class="txt-subtitle">그동안 서비스를 이용해주셔서 감사합니다.</h2>
            <div class="txt-desc">
              탈퇴신청에 앞서 아래 안내 사항을<br/>반드시 확인하시고 신중하게 결정해주세요
            </div> -->
            <!-- 4월수정 START : 문구 삭제 및 수정 -->
            <div class="txt-subtitle">
              탈퇴신청에 앞서 아래 안내 사항을<br/>반드시 확인하시고 신중하게 결정해주세요
            </div>
            <!-- 4월수정 END : 문구 삭제 및 수정 -->
          </div>
          <!-- 수정 END : 2020.02.17 텍스트 수정 -->
          <div class="area-info">
            <h2 class="title">회원 탈퇴 안내 사항</h2>
              <!-- 수정 START : 2020.02.17 텍스트 수정 -->
              <!-- 4월수정 START : 텍스트 수정 -->
              <ul class="list-info">
                <li>GS&amp;POINT에서 가입하셨을 경우, GS&amp;POINT 사이트에서만 탈퇴가
                가능하며, 탈퇴하실 경우 GS리테일, GS칼텍스 웹사이트에서도 함께
                자동 탈퇴됩니다. </li>
                <li>진행 중인 구매 건이 있을 경우, 해당 거래가 종료된 후 탈퇴가 가능합니다. </li>
                <li>탈퇴 시 고객님께서 보유하셨던 GS&amp;POINT, THE POP 리워즈 및 쿠폰과
                고객님의 달리드림 멤버십 잔여 이용기간은 모두 삭제됩니다. </li>
                <li>탈퇴 후 이용 중인 달리드림 멤버십는 자동으로 해지되며 다음 결제예정일
                부터는 결제가 되지 않습니다.</li>
              </ul>
              <!-- 4월수정 END : 텍스트 수정 -->
              <!-- 수정 END : 2020.02.17 텍스트 수정 -->
          </div>
          <!-- START : 하단 버튼 -->
          <div class="btn-area">
            <button type="button" class="btn-lg btn-bg lightgreen"  @click="mbrDropoutCheck();"><span>탈퇴하기</span></button>
          </div>
          <!-- END : 하단 버튼 -->
        </div>
      </div>
      <!-- 수정 END : 2020.02.13 마크업 변경 -->
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: "MemberWithdrawal",
  data() {
    return {
      userInfo: {},
      emailRcvYn: "",
      telRcvYn: "",
      dmRcvYn: "",
      smsRcvYn: "",
      siteClass: CookieUtils.getSiteClass(),
      chanlId: CookieUtils.getCookie('CHANL_ID'),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원 탈퇴 < 회원정보 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '회원 탈퇴',
      },
    ],
  },
  mixins: [],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
  },
  methods: {
    mbrDropout: async function() {
      const MbrDrptProcInputDto = {
        pmbsJoinPrcnCd: '', // 변경요청 자사코드
        chanlId: this.chanlId,
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
      };
      const resultMbrDrp= await ApiUtils.put('/fo/cu/mbrmgnt/member-dropout', MbrDrptProcInputDto); // 회원탈퇴하기
      if (resultMbrDrp.data.success) {
        await LoginUtils.logout();
        this.$gsdialog.alert('회원탈퇴가 완료되었습니다.').then(dialog =>{
          SiteUtils.go(location.host, '/');
        });
      } else {
        // this.$gsdialog.alert('회원탈퇴시 에러가 발생했습니다.');
        this.$gsdialog.alert(resultMbrDrp.data.data.resultMessage).then(dialog =>{
          this.getMbrInfo();
        });
      }
    },
    getMbrInfo: async function() {
      const MbrInfoInqInputDto = {certType: "C"};
      const result= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', MbrInfoInqInputDto); // 회원정보가져오기
      this.userInfo = result.data.data;
      this.emailRcvYn = this.userInfo.emailRcvYn;
      this.telRcvYn = this.userInfo.telRcvYn;
      this.dmRcvYn = this.userInfo.dmRcvYn;
      this.smsRcvYn = this.userInfo.smsRcvYn;
      this.userInfo.email = result.data.data.emailAddr1;
      this.userInfo.emailSite = result.data.data.emailAddr2;
      this.userInfo.hp1 = result.data.data.moblTelNo1;
      this.userInfo.hp2 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(0, 4) : result.data.data.moblTelNo2.substr(0, 3);
      this.userInfo.hp3 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(4, 4) : result.data.data.moblTelNo2.substr(3, 4);
      this.userInfo.bthym = result.data.data.bthym;
    },
    mbrDropoutCheck() {
    // const pmbsJoinPrcnCd = CookieUtils.getCookie("pmbsJoinPrcnCd");
      if (!StringUtils.isEmpty(this.userInfo.pmbsJoinPrcnCd)) {
        if (this.userInfo.pmbsJoinPrcnCd == "0001") { // 0000:미가입 0001:달리드림 멤버십가입
          this.$gsdialog.confirm('회원님은 현재 달리드림 멤버십 이용 중입니다<br/>탈퇴하시면 잔여 이용기간이 모두 삭제됩니다.<br/>그래도 탈퇴 하시겠습니까?', { html: true }).then(dialog => {
            this.mbrDropout();
          });
        } else {
          this.mbrDropout();
        }
      } else {
        this.$gsdialog.alert('정보가 존재하지 않습니다.');
      }
    },
  },
  destroyed() {
  },
  mounted() {
    this.getMbrInfo();
  },
};
</script>
