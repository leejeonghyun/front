<!--
Design: views\ss\SC-FO-SS-GF-MS-822
Pg Id: PG-FO-CS-I063
Uri: /cs/claimmgnt/refnd_accnt_reg/:ordId
-->
<template>
  <div class="wrap-add-payment" v-bind:class="[siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="환불계좌등록" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="refund-account-info">
        <p class="info-refund-account01">환불 받을 계좌를 입력해 주십시오.<br/>예금주는 주문자 이름과 동일해야 합니다.</p>
        <fieldset class="warp-input-txt"><legend>환불계좌 정보입력</legend>
          <div class="inp-box">
            <label for="refndAchlNm" class="hidden">예금주 명을 입력해주세요</label>
            <input type="text" id="refndAchlNm" name="refndAchlNm" value="" placeholder="예금주" v-model="refndAchlNm" maxlength="10" class="inp-txt w100" required>
          </div>
          <span class="wrap-select w100">
            <select id="refndBankCd" name="refndBankCd" v-model="refndBankCd" title="은행 선택" required>
              <option value="" disabled selected>은행을 선택해 주세요</option>
              <option :value="opt.bank_cd" v-for="opt in refndBankList" :key="opt.bank_cd" >{{opt.bank_nm}}</option>
            </select>
          </span>
          <div class="inp-box">
            <label for="refndAcntNo" class="hidden">계좌번호를 입력해주세요</label>
            <input type="number" id="refndAcntNo" name="refndAcntNo" value="" placeholder="계좌번호 입력" v-model="refndAcntNo" @keyup="chkTypingVal($event)" class="inp-txt w100" required>
          </div>
        </fieldset>
        <!-- 4월수정 START : 문구 수정 -->
        <em class="info-refund-account02">접수 완료 후, 환불처리까지 최대 3~7일 소요될 수 있습니다.</em>
        <!-- 4월수정 END : 문구 수정 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area mt0">
          <!-- 4월수정 START : 인증하기 버튼 삭제 -->
          <!-- <button type="button" class="btn-lg btn-bg lightgreen" disabled><span>인증하기</span></button> -->
          <!-- 4월수정 END : 인증하기 버튼 삭제 -->
          <button type="button" class="btn-lg btn-bg lightgreen" @click="refndAccntReg"><span>계좌 등록하기</span></button>
        </div>
        <!-- END :하단 버튼 -->
      </div>
    </main>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import ClaimMsg from '@/components/mypage/cs/ClaimMsg.vue';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
  name: "RefundAccountRegistration",
  data() {
    return {
      ordId: this.$route.params.ordId, // 주문ID
      refndBankList: {}, // 환불계좌 은행목록
      refndAccntInfoRsltDto: {}, // 환불계좌정보 조회결과
      refndAchlNm: '', // 환불계좌 예금주
      refndBankCd: '', // 환불계좌 은행코드
      refndAcntNo: '', // 환불계좌 번호
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '환불계좌등록< %s'
  },
  components: {
    SubDefaultHeader,
  },
  methods: {
    async retrieveRefndInfo() { // 주문자 및 기존 환불 계좌 정보 조회
      const params = {
        ordId: this.ordId // 주문 ID
      };

      const res = await ApiUtils.get('/fo/cs/refund/refnd-accnt-init', params);
      if (res.data === null || !res.data.success) {
        this.$gsdialog.alert('올바르지 않은 접근입니다.');
        return;
      }

      // Validation Chk (환불결제수단이 '계좌환불'이 아닌 경우 튕겨야함)
      if (res.data.data.refndTdrMeansCd === '24' && res.data.data.refndTdrMeansDtlCd == '00') {
        this.$gsdialog.alert(ClaimMsg.invalidRefndTdrMeansCd);
        return;
      }
      this.refndBankList = (res.data.data.refndBankList == null ? this.initBankList() : res.data.data.refndBankList); // 환불계좌 은행목록
      this.refndAccntInfoRsltDto = res.data.data.refndAccntInfoList; // 환불계좌정보 조회결과
      this.ordId = this.refndAccntInfoRsltDto[0].ordId;
      this.refndBankCd = this.refndAccntInfoRsltDto[0].refndBankCd; // 화면용
      this.refndAchlNm = this.refndAccntInfoRsltDto[0].refndAchlNm;
      this.refndAcntNo = this.refndAccntInfoRsltDto[0].refndAcntNo;

      console.log(this.refndBankCd +', '+ this.refndAchlNm +', '+ this.refndAcntNo);
    },
    initBankList() {
      return (
        this.refndBankList = [
          {bank_cd: '02', bank_nm: '산업은행'},
          {bank_cd: '03', bank_nm: '기업은행'},
          {bank_cd: '04', bank_nm: '국민은행'},
          {bank_cd: '06', bank_nm: '수협'},
          {bank_cd: '07', bank_nm: '농협중앙회'},
          {bank_cd: '10', bank_nm: '우리은행'},
          {bank_cd: '12', bank_nm: 'SC제일은행'},
          {bank_cd: '14', bank_nm: '신한은행'},
          {bank_cd: '15', bank_nm: '한국씨티은행'},
          {bank_cd: '16', bank_nm: '대구은행'},
          {bank_cd: '17', bank_nm: '부산은행'},
          {bank_cd: '18', bank_nm: '광주은행'},
          {bank_cd: '19', bank_nm: '제주은행'},
          {bank_cd: '20', bank_nm: '전북은행'},
          {bank_cd: '22', bank_nm: '경남은행'},
          {bank_cd: '24', bank_nm: '새마을금고'},
          {bank_cd: '27', bank_nm: '우체국'},
          {bank_cd: '28', bank_nm: '하나은행'},
          {bank_cd: '32', bank_nm: '케이뱅크'},
          {bank_cd: '33', bank_nm: '카카오뱅크'},
          {bank_cd: '34', bank_nm: '수출입은행'},
          {bank_cd: '36', bank_nm: '신협'}
        ]
      );
    },
    chkTypingVal(e) {
      if (e.target.id == "refndAcntNo") {
        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // num key 체크가 잘못 됐을 경우 대비
      }
    },
    refndAccntReg: async function() {
      const success = this.isValidation();

      if (success) {
        const updateParam = {
          ordId: this.ordId,
          ordpsNm: this.refndAccntInfoRsltDto[0].ordpsNm,
          claimSeqno: this.refndAccntInfoRsltDto[0].claimSeqno,
          refndSeqno: this.refndAccntInfoRsltDto[0].refndSeqno,
          refndBankCd: this.refndBankCd,
          refndAchlNm: this.refndAchlNm,
          refndAcntNo: this.refndAcntNo
        };
        console.log('update data');
        console.log(updateParam);
        const result = await ApiUtils.put('/fo/cs/refund/refnd-accnt-update', updateParam);
        if (result.data.success) {
          this.$gsdialog.alert(ClaimMsg.rsltRegAccnt);
          // TODO 성공 후 화면처리 확인필요
          // this.$router.push( goHome() );
          location.replace( this.goHome() );
        } else {
          this.$gsdialog.alert(result.data.statusMessage);
        }
      }
    },
    isValidation: function() {
      let success = true;
      if (StringUtils.isEmpty(StringUtils.trim(this.refndAchlNm))) {
        this.$gsdialog.alert(ClaimMsg.editAchlNm);
        success = false;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.refndBankCd))) {
        this.$gsdialog.alert(ClaimMsg.selectBank);
        success = false;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.refndAcntNo))) {
        this.$gsdialog.alert(ClaimMsg.editAccnt);
        success = false;
      } else if (StringUtils.trim(this.refndAchlNm) !== this.refndAccntInfoRsltDto[0].ordpsNm) {
        console.log(this.refndAccntInfoRsltDto);
        console.log('1:'+ StringUtils.trim(this.refndAchlNm) +', 2:'+ this.refndAccntInfoRsltDto[0].ordpsNm +']');
        this.$gsdialog.alert(ClaimMsg.equalOrdpsNmRefndAchlNM);
        success = false;
      } else if (!this.refndAcntNo.match(/[0-9]/gi)) {
        this.$gsdialog.alert(ClaimMsg.editAccntByNum);
        this.refndAcntNo = '';
        document.getElementById("refndAcntNo").focus();
        success = false;
      }
      return success;
    },
    goHome() {
      if (Number(CookieUtils.getMallId()) == 1) { // gsfresh
        if (CookieUtils.getMdaType() == '01') { // PC
          return SiteUtils.freshmo('');
        } else {
          return SiteUtils.freshpc('');
        }
      } else if (Number(CookieUtils.getMallId()) == 11) { // dalisalda
        if (CookieUtils.getMdaType() == '02') { // Mobile
          return SiteUtils.dalimo('');
        }
      }
      return SiteUtils.to(CookieUtils.getMallId(), '');
    },
  },
  mounted() {
    this.retrieveRefndInfo();
  },
  destroyed() {
  },
  updated() {
  },
};
</script>
<style lang="scss">
</style>
