<template>
    <div id="authMcash" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="mcashForm" name="mcashForm" method="post" @submit.prevent="submit()">
          <fieldset>
            <legend>휴대폰소액결제</legend>
            <!-- PC or Mob -->
            <div class="form-group">
              <label for="deviceType" class="col-lg-2">PC or Mob</label>
              <div class="col-lg-10">
                <select v-model="form.deviceType" class="form-control"  @change="changeOption">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="MID" class="col-lg-2">MID</label>
              <div class="col-lg-10">
                <input name="mid" class="form-control" v-model="form.mid" placeholder="가맹점MID" value="gsstore01m">
              </div>
            </div>
            <!-- 결제수단구분 "MC" 고정 -->
            <div class="form-group">
              <label for="CASH_GB" class="col-lg-2">* 결제수단구분 "MC" 고정</label>
              <div class="col-lg-10">
                <input name="CASH_GB" class="form-control" placeholder="결제수단구분" v-model="form.cashGb">
              </div>
            </div>
            <!-- 모빌리언스 부여 서비스ID -->
            <div class="form-group">
              <label for="MC_SVCID" class="col-lg-2">* 모빌리언스 부여 서비스ID</label>
              <div class="col-lg-10">
                <input name="MC_SVCID" v-model="form.mcSvcid" class="form-control" placeholder="서비스ID" >
              </div>
            </div>
            <!-- 결제요청금액 -->
            <div class="form-group">
              <label for="Prdtprice" class="col-lg-2">* 결제요청금액</label>
              <div class="col-lg-10">
                <input name="Prdtprice" v-model="form.prdtprice" class="form-control" placeholder="계좌이체는 EFT로 고정" >
              </div>
            </div>
            <!--연동 테스트/실결제 구분  테스트:00, 실:10 -->
            <div class="form-group">
              <label for="PAY_MODE" class="col-lg-2">* 연동구분</label>
              <div class="col-lg-10">
                <input name="PAY_MODE" v-model="form.payMode" class="form-control" placeholder="연동구분" >
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="form.decryptHashKey">
              </div>
            </div>
            <!--인증return url  -->
            <div class="form-group">
              <label for="Okurl" class="col-lg-2">인증return url</label>
              <div class="col-lg-10">
                <input name="Okurl" v-model="form.returnUrl" class="form-control" placeholder="인증return url">
              </div>
            </div>
            <!-- 상품명-->
            <div class="form-group">
              <label for="Prdtnm" class="col-lg-2">상품명</label>
              <div class="col-lg-10">
                <input name="Prdtnm" v-model="form.prdtnm" class="form-control" placeholder="상품명">
              </div>
            </div>
            <!-- 가맹점도메인-->
            <div class="form-group">
              <label for="Siteurl" class="col-lg-2">가맹점도메인</label>
              <div class="col-lg-10">
                <input name="Siteurl" v-model="form.siteurl" class="form-control" placeholder="가맹점도메인">
              </div>
            </div>
            <!--가맹점로고사용여부  -->
            <div class="form-group">
              <label for="LOGO_YN" class="col-lg-2">가맹점로고사용여부</label>
              <div class="col-lg-10">
                <input name="LOGO_YN" v-model="form.logoYn" class="form-control" placeholder="가맹점로고사용여부" >
              </div>
            </div>
            <!-- 결제창호출방식(P: 팝업-default, SELF: 페이지전환, I: 아이프레임)-->
            <div class="form-group">
              <label for="CALL_TYPE" class="col-lg-2">결제창호출방식</label>
              <div class="col-lg-10">
                <input name="CALL_TYPE" v-model="form.callType" class="form-control" placeholder="결제창호출방식" >
              </div>
            </div>
            <!-- 하이브리드사용여부(휴대폰 SMS인증 후 일반 소켓모듈 결제 연동시 사용) (N: 미사용-default, Y: 사용)-->
            <div class="form-group">
              <label for="MC_AUTHPAY" class="col-lg-2">하이브리드사용여부</label>
              <div class="col-lg-10">
                <input name="MC_AUTHPAY" v-model="form.mcAuthpay" class="form-control" placeholder="하이브리드사용여부" >
              </div>
            </div>
            <!-- 자동결제를 위한 최초 일반결제 시 "Y" 세팅. 결제 완료 후 휴대폰정보 대체용 USERKEY 발급 및 자동결제용 AutoBillKey 발급 (N: 미사용-default, Y: 사용)-->
            <div class="form-group">
              <label for="MC_AUTOPAY" class="col-lg-2">자동결제용키발급사용여부</label>
              <div class="col-lg-10">
                <input name="MC_AUTOPAY" v-model="form.mcAutopay" class="form-control" placeholder="자동결제용키발급사용여부" >
              </div>
            </div>
            <!-- 부분취소를 위한 일반결제 시 "Y" 세팅. 결제 완료 후 자동결제 USERKEY 발급 (N: 미사용-default, Y: 사용)-->
            <div class="form-group">
              <label for="MC_PARTPAY" class="col-lg-2">부분취소여부</label>
              <div class="col-lg-10">
                <input name="MC_PARTPAY" class="form-control" placeholder="부분취소여부" v-model="form.mcPartpay">
              </div>
            </div>
            <!-- 결제자이름-->
            <div class="form-group">
              <label for="buyerName" class="col-lg-2">결제자이름</label>
              <div class="col-lg-10">
                <input name="buyerName" v-model="form.buyerName" class="form-control" placeholder="결제자이름" >
              </div>
            </div>
            <!-- 사용자 전화번호-->
            <div class="form-group">
              <label for="MC_No" class="col-lg-2">사용자 전화번호</label>
              <div class="col-lg-10">
                <input name="MC_No" v-model="form.mcNo" class="form-control" placeholder="사용자 전화번호" >
              </div>
            </div>
            <!-- 사용자 전화번호 수정불가여부(N: 수정가능-default, Y: 수정불가)-->
            <div class="form-group">
              <label for="MC_FIXNO" class="col-lg-2">사용자 전화번호 수정불가 여부</label>
              <div class="col-lg-10">
                <input name="MC_FIXNO" v-model="form.mcFixno" class="form-control" placeholder="사용자 폰번호 수정불가 여부" >
              </div>
            </div>
            <!-- 결제자이메일-->
            <div class="form-group">
              <label for="Payeremail" class="col-lg-2">결제자이메일</label>
              <div class="col-lg-10">
                <input name="Payeremail" v-model="form.payeremail" class="form-control" placeholder="결제자이메일" >
              </div>
            </div>
            <!-- 통신사 기본 선택 값-->
            <div class="form-group">
              <label for="MC_DEFAULTCOMMID" class="col-lg-2">통신사 기본 선택 값</label>
              <div class="col-lg-10">
                <input name="MC_DEFAULTCOMMID" v-model="form.mcDefaultcommid" class="form-control" placeholder="통신사 기본 선택 값" >
              </div>
            </div>
            <!-- 통신사 고정 선택 값-->
            <div class="form-group">
              <label for="MC_FIXCOMMID" class="col-lg-2">통신사 고정 선택 값</label>
              <div class="col-lg-10">
                <input name="MC_FIXCOMMID" v-model="form.mcFixcommid" class="form-control" placeholder="통신사 고정 선택 값" >
              </div>
            </div>
            <!-- 주문번호 -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문번호</label>
              <div class="col-lg-10">
                <input id="ordId" name="ordId" v-model="form.ordId" class="form-control" placeholder="주문번호" >
              </div>
            </div>
            <!-- 결제자id-->
            <div class="form-group">
              <label for="Userid" class="col-lg-2">고객번호</label>
              <div class="col-lg-10">
                <input name="Userid" v-model="form.mbrNo" class="form-control" placeholder="고객번호" value="12861410">
              </div>
            </div>
            <!-- 아이템코드-->
            <div class="form-group">
              <label for="Item" class="col-lg-2">아이템코드</label>
              <div class="col-lg-10">
                <input name="Item" v-model="form.item" class="form-control" placeholder="아이템코드" >
              </div>
            </div>
            <!-- 상품코드-->
            <div class="form-group">
              <label for="Prdtcd" class="col-lg-2">상품코드</label>
              <div class="col-lg-10">
                <input name="Prdtcd" v-model="form.prdtcd" class="form-control" placeholder="상품코드" >
              </div>
            </div>
            <!-- 리셀러하위상점key-->
            <div class="form-group">
              <label for="MC_Cpcode" class="col-lg-2">리셀러하위상점key</label>
              <div class="col-lg-10">
                <input name="MC_Cpcode" v-model="form.mcCpcode" class="form-control" placeholder="리셀러하위상점key" >
              </div>
            </div>
            <!-- 알림 이메일-->
            <div class="form-group">
              <label for="notiemail" class="col-lg-2">알림 이메일</label>
              <div class="col-lg-10">
                <input name="notiemail" v-model="form.notiemail" class="form-control" placeholder="알림 이메일" >
              </div>
            </div>
            <!-- 완료 후 결제처리 페이지-->
            <div class="form-group">
              <label for="Notiurl" class="col-lg-2">완료 후 결제처리 페이지</label>
              <div class="col-lg-10">
                <input name="Notiurl" v-model="form.notiurl" class="form-control" placeholder="완료 후 결제처리 페이지" >
              </div>
            </div>
            <!-- 결제창 취소 버튼 클릭시 return url-->
            <div class="form-group">
              <label for="Closeurl" class="col-lg-2">결제창 취소 버튼 클릭시 return url</label>
              <div class="col-lg-10">
                <input name="Closeurl" v-model="form.closeurl" class="form-control" placeholder="결제창 취소 return url은 target을 따로 지정할 수 없음으로 인해 페이지가 이동되므로 값을 설정하지 않음" readonly >
              </div>
            </div>
            <!-- 결제실패시 return url-->
            <div class="form-group">
              <label for="Failurl" class="col-lg-2">결제실패시 return url</label>
              <div class="col-lg-10">
                <input name="Failurl" v-model="form.failurl" class="form-control" placeholder="결제실패시 return url" >
              </div>
            </div>
            <!-- 가맹점콜백변수-->
            <div class="form-group">
              <label for="MSTR" class="col-lg-2">가맹점콜백변수</label>
              <div class="col-lg-10">
                <input name="MSTR" v-model="form.mastr" class="form-control" placeholder="가맹점콜백변수" >
              </div>
            </div>
            <!-- 실판매자이름-->
            <div class="form-group">
              <label for="Sellernm" class="col-lg-2">실판매자이름</label>
              <div class="col-lg-10">
                <input name="Sellernm" v-model="form.sellernm" class="form-control" placeholder="실판매자이름" >
              </div>
            </div>
            <!-- 실판매자전화번호-->
            <div class="form-group">
              <label for="Sellertel" class="col-lg-2">실판매자전화번호</label>
              <div class="col-lg-10">
                <input name="Sellertel" v-model="form.sellertel" class="form-control" placeholder="실판매자전화번호" >
              </div>
            </div>
            <!-- iframe이용시 iframe 이름-->
            <div class="form-group">
              <label for="IFRAME_NAME" class="col-lg-2">iframe이용시 iframe 이름</label>
              <div class="col-lg-10">
                <input name="IFRAME_NAME" v-model="form.iframeName" class="form-control" placeholder="iframe이용시 iframe 이름" >
              </div>
            </div>
            <!-- 결제창 안내문 표시여부 (Y: 표시-default,  N: 미표시)-->
            <div class="form-group">
              <label for="INFOAREA_YN" class="col-lg-2">결제창 안내문 표시여부</label>
              <div class="col-lg-10">
                <input name="INFOAREA_YN" v-model="form.infoareaYn" class="form-control" placeholder="결제창 안내문 표시여부" >
              </div>
            </div>
            <!-- 결제창 하단 안내 표시여부 (Y: 표시-default,  N: 미표시)-->
            <div class="form-group">
              <label for="FOOTER_YN" class="col-lg-2">결제창 하단 안내 표시여부</label>
              <div class="col-lg-10">
                <input name="FOOTER_YN" v-model="form.footerYn" class="form-control" placeholder="결제창 하단 안내 표시여부" >
              </div>
            </div>
            <!-- 결제창 높이 (px단위: iframe 등 사용시 결제창 높이 조절, 팝업창 등 호출시 "" 로 세팅)-->
            <div class="form-group">
              <label for="HEIGHT" class="col-lg-2">결제창 높이</label>
              <div class="col-lg-10">
                <input name="HEIGHT" v-model="form.height" class="form-control" placeholder="결제창 높이" >
              </div>
            </div>
            <!-- iframe 사용시 상품명 숨김 여부 (가맹점 디자인 결제창으로 결제 입력 사항만 iframe에서 사용시)-->
            <div class="form-group">
              <label for="PRDT_HIDDEN" class="col-lg-2">상품명 숨김 여부</label>
              <div class="col-lg-10">
                <input name="PRDT_HIDDEN" v-model="form.prdtHidden" class="form-control" placeholder="상품명 숨김 여부" >
              </div>
            </div>
            <!-- 결제자 e-mail 입력창 숨김 여부 (N: 표시-default, Y: 미표시)-->
            <div class="form-group">
              <label for="EMAIL_HIDDEN" class="col-lg-2">결제자 e-mail 입력창 숨김 여부</label>
              <div class="col-lg-10">
                <input name="EMAIL_HIDDEN" v-model="form.emailHidden" class="form-control" placeholder="결제자 e-mail 입력창 숨김 여부" >
              </div>
            </div>
            <!-- 이용약관 숨김 여부 (Y: 표시-default,  N: 미표시)-->
            <div class="form-group">
              <label for="CONTRACT_HIDDEN" class="col-lg-2">이용약관 숨김 여부</label>
              <div class="col-lg-10">
                <input name="CONTRACT_HIDDEN" v-model="form.contractHidden" class="form-control" placeholder="이용약관 숨김 여부" >
              </div>
            </div>
            <!-- 암호화 사용여부 (Y: 암호화 사용, N: 암호화 미사용)-->
            <div class="form-group">
              <label for="Cryptyn" class="col-lg-2">암호화 사용여부</label>
              <div class="col-lg-10">
                <input name="Cryptyn" v-model="form.cryptyn" class="form-control" placeholder="암호화 사용여부" >
              </div>
            </div>
            <!-- 암호화 사용 시 암호화된 스트링-->
            <div class="form-group">
              <label for="Cryptstring" class="col-lg-2">암호화된 스트링</label>
              <div class="col-lg-10">
                <input name="Cryptstring" v-model="form.cryptstring" class="form-control" placeholder="암호화된 스트링" >
              </div>
            </div>
            <!-- 스마트로 채번 tid-->
            <div class="form-group">
              <label for="Tradeid" class="col-lg-2">스마트로 채번 tid</label>
              <div class="col-lg-10">
                <input name="Tradeid" v-model="form.tid" class="form-control" placeholder="스마트로 채번 tid" >
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Cancel</button>
                <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button>
                <button type="button" class="btn btn-primary" @click="doPay">승인</button>
                <button type="button" class="btn btn-primary" @click="doCancel">승인취소</button>
              </div>
            </div>
          </fieldset>
        </form>
        <div class="frame-div" style="display:none" id="frame_div">
          <iframe src="" name="MCASH_FRAME" id="MCASH_FRAME" style="border:0; width:100%; height:610px;" scrolling="yes" align="center"/>
        </div>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <fieldset>
            <legend>결과값</legend>
            <!-- 이통사코드 -->
            <div class="form-group">
              <label for="commId" class="col-lg-2">이통사코드</label>
              <div class="col-lg-10">
                <input type="text" id ="commId" name="commId" value="" class="form-control" placeholder="이통사코드" v-model="rsform.commId">
              </div>
            </div>
            <!-- 인증번호 -->
            <div class="form-group">
              <label for="opt" class="col-lg-2">인증번호</label>
              <div class="col-lg-10">
                <input type="text" id ="otp" name="otp" value="" class="form-control" placeholder="인증번호" v-model="rsform.otp">
              </div>
            </div>
            <!-- 승인번호 (거래인증 Key) -->
            <div class="form-group">
              <label for="mobileId" class="col-lg-2">승인번호 (거래인증 Key)</label>
              <div class="col-lg-10">
                <input type="text" id ="mobileId" name="mobileId" value="" class="form-control" placeholder="승인번호" v-model="rsform.mobileId">
              </div>
            </div>
            <!-- 결제요청 휴대폰 번호 -->
            <div class="form-group">
              <label for="phoneId" class="col-lg-2">결제요청 휴대폰 번호</label>
              <div class="col-lg-10">
                <input type="text" id ="phoneId" name="phoneId" value="" class="form-control" placeholder="결제요청 휴대폰 번호" v-model="rsform.phoneId">
              </div>
            </div>
            <!-- 상품구분 -->
            <div class="form-group">
              <label for="goodsCl" class="col-lg-2">상품구분</label>
              <div class="col-lg-10">
                <input type="text" id ="goodsCl" name="goodsCl" value="" class="form-control" placeholder="상품구분" v-model="rsform.goodsCl">
              </div>
            </div>
            <!-- 인증결과 tid -->
            <div class="form-group">
              <label for="tid" class="col-lg-2">인증결과 tid</label>
              <div class="col-lg-10">
                <input type="text" id ="tid" name="tid" value="" class="form-control" placeholder="인증결과 tid" v-model="rsform.tid">
              </div>
            </div>
          </fieldset>
        </form>
        <!-- FOOTER -->
        <PaSmFooter />
      </div>
      <!-- END : 본문 -->
    </div>
</template>

<script>
import PaSmTopMenu from '@/views/pa/components/PaSmTopMenu';
import PaSmFooter from '@/views/pa/components/PaSmFooter';
import CommAuth from '@/views/pa/common/CommAuth';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "McashAuth",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: false,
      activeIndex: 8, // GNB 활성화
      form: {
        deviceType: "PC",
        mid: "gsstore01m",
        ordId: "",
        decryptHashKey: "",
        mbrNo: "12861410",
        cashGb: "",
        mcSvcid: "",
        prdtprice: "1000",
        payMode: "",
        returnUrl: "",
        prdtnm: "",
        siteurl: "",
        logoYn: "",
        callType: "",
        mcAuthpay: "",
        mcAutopay: "",
        mcPartpay: "",
        mcNo: "",
        mcFixno: "",
        mcDefaultcommid: "",
        mcFixcommid: "",
        payeremail: "",
        userid: "",
        item: "",
        prdtcd: "",
        mcCpcode: "",
        notiemail: "",
        notiurl: "",
        closeurl: "",
        failurl: "",
        mastr: "",
        sellernm: "",
        sellertel: "",
        iframeName: "",
        infoareaYn: "",
        footerYn: "",
        height: "",
        prdtHidden: "",
        emailHidden: "",
        contractHidden: "",
        cryptyn: "",
        cryptstring: "",
        tid: "",
        buyerName: ""
      },
      rsform: {
        /* amt: "",
        goodsName: "",
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "010000000000", */
        commId: "",
        otp: "000000",
        mobileId: "",
        phoneId: "",
        goodsCl: "1",
        tid: ""
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '휴대폰소액결제'
  },
  components: {
    PaSmTopMenu,
    PaSmFooter
  },
  mounted: async function() {
    this.init();
    const that = this;
    window.callbackFnc = function(hashKey) {
      console.log(that.form);
      ApiUtils
        .post('/fo/pa/mcashAuthCallback', {hashKey: hashKey})
        .then(res => {
          if (that.form.deviceType === 'MOB') {
              document.getElementById('frame_div').style.display = 'none';
          }
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.');
            return;
          }
          console.log(res.data);
          that.rsform = res.data;
          that.rsform.otp = "000000";
          that.rsform.goodsCl = "1";
        }
      );
    };
    this.callMcashScript();
  },
  methods: {
    changeOption() {
      this.init();
    },
    async init() {
      const formData = this.form;
      const data = {
        cmmMbrNo: this.form.mbrNo,
        payCompany: 'SMARTRO',
        authType: 'CELLPHONE',
        mid: this.form.mid
      };
      const that = this;
      // await ApiUtils.post('/fo/pa/initAuth', data).then(res => {
      //  if (res.data !== null) {
      //    that.form.returnUrl = this.form.returnUrl+".hashKey_"+res.data.hashKey;
      //    that.form.failurl = this.form.failurl+".hashKey_"+res.data.hashKey;
      //  }
      // });
      await ApiUtils.post("/fo/pa/mcashInitAuth" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data).then(function(res) {
        if (res.data.result === 'FAIL') {
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        that.form = res.data;
        that.form.deviceType = formData.deviceType;
        that.form.prdtprice = formData.prdtprice;
        that.form.payeremail = formData.payeremail;
        that.form.buyerName = formData.buyerName;
        that.form.mcNo = formData.mcNo;
        that.form.mbrNo = formData.mbrNo;
        that.form.mid = formData.mid;
        that.form.ordId = res.data.ordId;
        that.form.decryptHashKey = res.data.decryptHashKey;
        that.form.returnUrl = res.data.returnUrl+".hashKey_"+res.data.hashKey;
        that.form.failurl = res.data.failurl+".hashKey_"+res.data.hashKey;
      });
    },
    async getAuthentication() {
      const formData = this.form;
      alert("mcashAuth Call..");
      if ( StringUtils.isEmpty(this.form.prdtprice) ) {
        alert("가격을 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(this.form.buyerName) ) {
        alert("결제자 이름을 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(this.form.mcNo) ) {
        alert("사용자 전화번호를 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(this.form.payeremail) ) {
        alert("결제자 이메일을 입력해주세요.");
        return;
      }
      const mcashPayment = window.MCASH_PAYMENT;
      mcashPayment(document.getElementById('mcashForm'));
      if (formData.deviceType === 'MOB') {
        document.getElementById('frame_div').style.display = 'block';
      }
    },
    async doCancel() {
      let deviceType = "";
      const rsltForm = document.getElementById('rsltForm');
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      const data = {
        deviceType: deviceType,
        tid: this.rsform.tid,
        cancelAmt: this.form.prdtprice,
        cancelMsg: '취소메세지',
        // cancelPwd: '123456',
        mid: this.form.mid,
        ordId: this.form.ordId
      };
      await ApiUtils
        .post("/fo/pa/reqCancelMcash" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          console.log(res.data.resultCode);
          if (res.data === null || (res.data.resultCode !== '2001' && res.data.resultCode !== '0000')) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 취소 중 에러가 발생하였습니다.['+res.data.resultMsg+']');
          } else {
            rsltForm.reset();
            alert('결제가 정상 취소되었습니다.['+res.data.resultMsg+']');
          }
        }
      );
    },
    async doPay() {
      const rsltForm = document.getElementById('rsltForm');
      let deviceType = "";
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      const data = {
        deviceType: deviceType,
        amt: this.form.prdtprice,
        goodsName: this.form.prdtnm,
        goodsCnt: "1",
        buyerName: this.form.buyerName,
        buyerTel: this.form.mcNo,
        buyerAuthNum: this.form.mcNo,
        buyerEmail: this.form.payeremail,
        mallUserID: this.form.mbrNo.value,
        carrier: this.rsform.commId,
        otp: this.rsform.otp,
        dstAddr: this.rsform.mobileId,
        phoneID: this.rsform.phoneId,
        goodsCl: this.rsform.goodsCl,
        mid: this.form.mid,
        ordId: this.form.ordId,
        tid: this.rsform.tid
      };
      await ApiUtils
        .post("/fo/pa/reqApprMcash" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          if (res.data === null || (res.data.resultCode !== 'A000' && res.data.resultCode !== '0000')) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 승인 중 에러가 발생하였습니다.');
          } else {
            // rsltForm.reset();
            // rsltForm.TID.value = res.data.tid;
            alert('결제가 완료되었습니다.');
          }
        }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
