<!--
views/ss/SC-FO-SS-GF-MS-925.vue
-->
<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림 멤버십 등록" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap dreampass">
        <div class="promotional-code">
          <!-- 4월수정 START : 디자인 수정 -->
          <span class="img-dali-membership">
            <strong class="membership-type">달리드림 멤버십</strong>
          </span>
          <p class="txt">선물 받으신 회원권 번호를 입력해주세요.</p>
          <input
            type="text"
            id="cpn"
            v-model="cpnNo"
            value
            placeholder="13자리 회원권 번호만 입력"
            class="input-code"
            maxlength="13"
          />
          <button type="button" class="btn-dali daligreen" @click="cpnReg">등록하기</button>
        </div>
        <div class="promotional-code-info section">
          <h3 class="tit-coupon">달리드림 멤버십 회원권 사용 방법</h3>
          <ol class="code-order">
            <li>
              <strong>01</strong>
              선물 받은
              <br />회원권 번호
              <br />등록
            </li>
            <li>
              <strong>01</strong>
              달리살다
              <br />멤버십 가입
              <span>(이미 회원이라면 생략)</span>
            </li>
            <li>
              <strong>03</strong>
              이용기간 동안
              <br />프리미엄
              <br />쇼핑하기
            </li>
          </ol>
        </div>
        <div class="code-note">
          <h3 class="tit-coupon">유의사항</h3>
          <ul>
            <li>
              회원권은 등록한 즉시 사용이 시작되며, 등록 후 취소가 불가능합니다.
              단, 무료 이용 중인 경우, 무료 이용 기간 종료 이후 회원권 사용이
              시작됩니다.
            </li>
            <li>달리드림 멤버십 회원권은 달리드림 회원 가입 후 사용이 가능합니다.</li>
            <li>
              달리드림 멤버십 이용 중 회원권을 등록하시면, 기존 달리드림 멤버십
              이용기간 종료 후에 회원권을 사용하실 수 있습니다.
            </li>
            <li>
              현재 사용중인 회원권이 있는 경우, 추가 등록하신 회원권은 사용중인
              회원권 종료일 이후부터 적용됩니다.
            </li>
            <li>
              회원권 이용기간에 따라 달리드림 멤버십 이용기간과 다음 자동결제
              예정일은 달라질 수 있습니다.
            </li>
            <li>
              나의 내역은 [마이페이지 &gt; 달리드림 멤버십 &gt; 나의 내역]에서
              확인하실 수 있습니다.
            </li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import JwtUtils from '@/common/JwtUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: 'DaliPromotionalCode',
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
      cpnNo: '',
      giftCpnList: [],
      rcvJoinInfo: [],
      myMsg: '',
      pmbsTdrNo: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    SubDefaultHeader,
    Footer, // 푸터
  },
  methods: {
    retrievePmbsJoin: async function () {
      const receiveJoinInqInputDto = { searchType: 'CURRENT' };
      const receiveJoinData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        receiveJoinInqInputDto
      );
      if (receiveJoinData.data.data.length > 0) {
        this.rcvJoinInfo = receiveJoinData.data.data[0];
      }
    },
    cpnSend: async function () {
      const PmbsGiftCpnIsseRegInputDto = { giftTrcPinNo: this.cpnNo };
      const result = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/paidmembership-gift-coupon-issue',
        PmbsGiftCpnIsseRegInputDto
      );
      if (result.data.success) {
        this.$router.push('/cu/pbms_coupon_registration');
      } else {
        this.$gsdialog.alert('오류가 발생했습니다.');
      }
    },
    cpnReg: async function () {
      const success = this.isValidation();
      if (success) {
        const PmbsGiftCpnIsseRegInputDto = { giftTrcPinNo: this.cpnNo };
        const giftCpnData = await ApiUtils.get(
          '/fo/cu/pmbsmgnt/paidmembership-gift-coupon-issue',
          PmbsGiftCpnIsseRegInputDto
        );
        this.giftCpnList = giftCpnData.data.data;
        if (this.giftCpnList == null) {
          this.$gsdialog.alert('올바른 번호가 아닙니다. 다시 확인해주세요.');
        } else {
          if (this.giftCpnList.useYn == 'N') {
            // if (1 == 1) {
            if (this.rcvJoinInfo.perdTdrStngYn == 'N') {
              this.$gsdialog.alert(
                '달리드림 멤버십 해지 회원입니다.<br/>[마이페이지 > 달리드림 멤버십 > 나의 내역]에서 <br/>재가입 후 쿠폰번호를 등록해주세요.',
                { html: true }
              );
              return;
            }
            sessionStorage.setItem('pmbsTdrNo', this.giftCpnList.pmbsTdrNo);
            sessionStorage.setItem('myGiftQty', this.giftCpnList.pmbsGiftQty);
            if (this.rcvJoinInfo.pmbsCurrentCount > 0) {
              this.myMsg =
                '회원권을 등록하시겠습니까?<br/>등록 후엔 취소가 불가능합니다.';
            } else {
              this.myMsg =
                '회원권을 등록하시겠습니까?<br/>등록 후엔 취소가 불가능하며,<br/>달리드림 가입 후 사용이 가능합니다.';
            }
            this.$gsdialog
              .confirm(this.myMsg, { html: true })
              .then((dialog) => {
                if (this.rcvJoinInfo.length == 0) {
                  sessionStorage.setItem('newPinNo', this.cpnNo);
                  this.$router.push('/cu/pbms_join');
                } else {
                  this.cpnSend();
                }
              });
          } else {
            this.$gsdialog.alert('이미 등록된 번호입니다. 다시 확인해주세요.');
          }
        }
      }
    },
    isValidation: function () {
      let success = true;
      if (StringUtils.isEmpty(StringUtils.trim(this.cpnNo))) {
        this.$gsdialog.alert('회원권 번호를 입력해 주세요.');
        success = false;
      }
      return success;
    },
  },
  mounted() {
    sessionStorage.setItem('newPinNo', '');
    this.retrievePmbsJoin();
  },
  watch: {
    cpnNo(newVal) {
      const reg = /[^0-9a-z]/gi;
      this.cpnNo = newVal.replace(reg, '');
    },
  },
};
</script>
