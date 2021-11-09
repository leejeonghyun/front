<template>
    <div id="authCardIsp" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form id="ispForm" @submit.prevent class="form-horizontal" method="post">
          <fieldset>
            <legend>신용카드[ISP]</legend>
            <!-- smartro or kcp -->
            <div class="form-group">
              <label for="payCompany" class="col-lg-2">스마트로 or KCP</label>
              <div class="col-lg-10">
                <select v-model="form.payCompany" class="form-control" @change="payCompanyChangeOption">
                  <option v-for="option in payCompany" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- PC or Mob -->
            <div class="form-group">
              <label for="deviceType" class="col-lg-2">PC or Mob</label>
              <div class="col-lg-10">
                <select v-model="form.deviceType" class="form-control" name="deviceType" @change="changeOption">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="card_code" class="col-lg-2">Card</label>
              <div class="col-lg-10">
                <select name="card_code" v-model="form.cardCode" class="form-control" @change="changeOption">
                  <option value="">카드선택</option>
                  <option v-for="option in cardCodeList" v-bind:key="option.code" :value="option.code" v-show="option.typeCd === 'ISP'">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="MID" class="col-lg-2">결제사 MID(스마트로/kcp)</label>
              <div class="col-lg-10">
                <input name="mid" class="form-control" v-model="form.mid" placeholder="결제사MID" value="gsstore01m">
              </div>
            </div>
            <!--구매자(buyer_name)  -->
            <div class="form-group">
              <label for="buyer_name" class="col-lg-2">구매자</label>
              <div class="col-lg-10">
                <input name="buyer_name" class="form-control" placeholder="구매자" value="홍길동">
              </div>
            </div>
            <!--구매자연락처(buyer_tel)  -->
            <div class="form-group">
              <label for="buyer_tel" class="col-lg-2">구매자연락처</label>
              <div class="col-lg-10">
                <input name="buyer_tel" class="form-control" placeholder="구매자연락처" value="01000000000">
              </div>
            </div>
            <!-- 주문번호 -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문번호</label>
              <div class="col-lg-10">
                <input id="ordId" name="ordId" v-model="form.ordId" class="form-control" placeholder="주문번호" >
              </div>
            </div>
            <!--고객번호(mem_no)  -->
            <div class="form-group">
              <label for="mem_no" class="col-lg-2">고객번호</label>
              <div class="col-lg-10">
                <input name="memNo" class="form-control" placeholder="고객번호" value="12861410">
              </div>
            </div>
            <!--상품명(KVP_GOODNAME)  -->
            <div class="form-group">
              <label for="KVP_GOODNAME" class="col-lg-2">상품명</label>
              <div class="col-lg-10">
                <input name="KVP_GOODNAME" v-model="form.KVP_GOODNAME" class="form-control" placeholder="상품명">
              </div>
            </div>
            <!--상품수량(goods_cnt)  -->
            <div class="form-group">
              <label for="goods_cnt" class="col-lg-2">상품수량</label>
              <div class="col-lg-10">
                <input name="goods_cnt" class="form-control" placeholder="상품수량" value="1">
              </div>
            </div>
            <!-- 가격(KVP_PRICE) -->
            <div class="form-group">
              <label for="KVP_PRICE" class="col-lg-2">가격</label>
              <div class="col-lg-10">
                <input name="KVP_PRICE" v-model="form.KVP_PRICE" class="form-control" placeholder="가격">
              </div>
            </div>
            <!-- 과세대상금액(taxableAmt) -->
            <div class="form-group">
              <label for="taxableAmt" class="col-lg-2">과세대상금액</label>
              <div class="col-lg-10">
                <input name="taxableAmt" class="form-control" placeholder="과세대상금액" readonly>
              </div>
            </div>
            <!-- 부가세(tax) -->
            <div class="form-group">
              <label for="tax" class="col-lg-2">부가세</label>
              <div class="col-lg-10">
                <input name="tax" class="form-control" placeholder="부가세" readonly>
              </div>
            </div>
            <!-- 면세대상금액(taxFreeAmt) -->
            <div class="form-group">
              <label for="taxFreeAmt" class="col-lg-2">* 면세대상금액</label>
              <div class="col-lg-10">
                <input name="taxFreeAmt" class="form-control" placeholder="면세대상금액">
              </div>
            </div>
            <!-- 카드코드(KVP_CARDCOMPANY)-->
            <div class="form-group">
              <label for="KVP_CARDCOMPANY" class="col-lg-2">카드코드</label>
              <div class="col-lg-10">
                <input name="KVP_CARDCOMPANY" v-model="form.KVP_CARDCOMPANY" class="form-control" placeholder="카드코드">
              </div>
            </div>
            <!-- 지불 화폐 단위 /한화 - WON, 미화 - USD(KVP_CURRENCY) -->
            <div class="form-group">
              <label for="KVP_CURRENCY" class="col-lg-2">지불 화폐 단위 /한화 - WON, 미화 - USD</label>
              <div class="col-lg-10">
                <input name="KVP_CURRENCY" v-model="form.KVP_CURRENCY" class="form-control" placeholder="지불 화폐 단위 /한화 - WON, 미화 - USD">
              </div>
            </div>
            <!-- BC 발행사 코드(VP_BC_ISSUERCODE) -->
            <div class="form-group">
              <label for="VP_BC_ISSUERCODE" class="col-lg-2">BC 발행사 코드</label>
              <div class="col-lg-10">
                <input name="VP_BC_ISSUERCODE" v-model="form.VP_BC_ISSUERCODE" class="form-control" placeholder="BC 발행사 코드">
              </div>
            </div>
            <!-- KVP_QUOTA_INF(일반할부개월수 정보) -->
            <div class="form-group">
              <label for="KVP_QUOTA_INF" class="col-lg-2">일반할부개월수 정보</label>
              <div class="col-lg-10">
                <input name="KVP_QUOTA_INF" v-model="form.KVP_QUOTA_INF" class="form-control" placeholder="일반할부개월수 정보">
              </div>
            </div>
            <!-- KVP_NOINT_INF(무이자 할부 정보) -->
            <div class="form-group">
              <label for="KVP_NOINT_INF" class="col-lg-2">무이자 할부 정보</label>
              <div class="col-lg-10">
                <input name="KVP_NOINT_INF" v-model="form.KVP_NOINT_INF" class="form-control" placeholder="무이자 할부 정보">
              </div>
            </div>
            <!-- KVP_NOINT_FLAG(무이자 or 공백 세팅) -->
            <div class="form-group">
              <label for="KVP_NOINT_FLAG" class="col-lg-2">무이자 or 공백세팅</label>
              <div class="col-lg-10">
                <input name="KVP_NOINT_FLAG" v-model="form.KVP_NOINT_FLAG" class="form-control" placeholder="무이자 or 공백 세팅">
              </div>
            </div>
            <!-- 복합결제 유무(KVP_FIXPAYFLAG) -->
            <div class="form-group">
              <label for="KVP_FIXPAYFLAG" class="col-lg-2">복합결제 유무</label>
              <div class="col-lg-10">
                <input name="KVP_FIXPAYFLAG" v-model="form.KVP_FIXPAYFLAG" class="form-control" placeholder="복합결제 유무">
              </div>
            </div>
            <!-- 국민카드 포인트 가맹점(KVP_MERCHANT_KB) -->
            <div class="form-group">
              <label for="KVP_MERCHANT_KB" class="col-lg-2">국민카드 포인트 가맹점</label>
              <div class="col-lg-10">
                <input name="KVP_MERCHANT_KB" v-model="form.KVP_MERCHANT_KB" class="form-control" placeholder="국민카드 포인트 가맹점">
              </div>
            </div>
            <!-- 국민카드 세이브 포인트(KVP_KB_SAVEPOINTREE) -->
            <div class="form-group">
              <label for="KVP_KB_SAVEPOINTREE" class="col-lg-2">국민카드 세이브 포인트</label>
              <div class="col-lg-10">
                <input name="KVP_KB_SAVEPOINTREE" v-model="form.KVP_KB_SAVEPOINTREE" class="form-control" placeholder="국민카드 세이브 포인트">
              </div>
            </div>
            <!-- 비씨카드 세이브 포인트(VP_BC_SAVEPOINT) -->
            <div class="form-group">
              <label for="VP_BC_SAVEPOINT" class="col-lg-2">비씨카드 세이브 포인트</label>
              <div class="col-lg-10">
                <input name="VP_BC_SAVEPOINT" v-model="form.VP_BC_SAVEPOINT" class="form-control" placeholder="비씨카드 세이브 포인트">
              </div>
            </div>
            <!-- pgid -->
            <div class="form-group">
              <label for="KVP_PGID" class="col-lg-2">PGID</label>
              <div class="col-lg-10">
                <input name="KVP_PGID" v-model="form.KVP_PGID" class="form-control" placeholder="PGID">
              </div>
            </div>
            <!-- KVP_IMGURL -->
            <div class="form-group">
              <label for="KVP_IMGURL" class="col-lg-2">KVP_IMGURL</label>
              <div class="col-lg-10">
                <input name="KVP_IMGURL" v-model="form.KVP_IMGURL" class="form-control" placeholder="KVP_IMGURL">
              </div>
            </div>
            <!-- KVP_NOINT -->
            <div class="form-group">
              <label for="KVP_NOINT" class="col-lg-2">KVP_NOINT</label>
              <div class="col-lg-10">
                <input name="KVP_NOINT" v-model="form.KVP_NOINT" class="form-control" placeholder="KVP_NOINT">
              </div>
            </div>
            <!-- KVP_QUOTA -->
            <div class="form-group">
              <label for="KVP_QUOTA" class="col-lg-2">KVP_QUOTA</label>
              <div class="col-lg-10">
                <input name="KVP_QUOTA" v-model="form.KVP_QUOTA" class="form-control" placeholder="KVP_QUOTA">
              </div>
            </div>
            <!-- KVP_CONAME -->
            <div class="form-group">
              <label for="KVP_CONAME" class="col-lg-2">KVP_CONAME</label>
              <div class="col-lg-10">
                <input name="KVP_CONAME" v-model="form.KVP_CONAME" class="form-control" placeholder="KVP_CONAME">
              </div>
            </div>
            <div class="form-group">
              <label for="KVP_CARDCODE" class="col-lg-2">KVP_CARDCODE</label>
              <div class="col-lg-10">
                <input name="KVP_CARDCODE" v-model="form.KVP_CARDCODE" class="form-control" placeholder="KVP_CARDCODE">
              </div>
            </div>
            <div class="form-group">
              <label for="KVP_SESSIONKEY" class="col-lg-2">KVP_SESSIONKEY</label>
              <div class="col-lg-10">
                <input name="KVP_SESSIONKEY" v-model="form.KVP_SESSIONKEY" class="form-control" placeholder="KVP_SESSIONKEY">
              </div>
            </div>
            <div class="form-group">
              <label for="KVP_ENCDATA" class="col-lg-2">KVP_ENCDATA</label>
              <div class="col-lg-10">
                <input name="KVP_ENCDATA" v-model="form.KVP_ENCDATA" class="form-control" placeholder="KVP_ENCDATA">
              </div>
            </div>
            <div class="form-group">
              <label for="VP_CANCEL_CODE" class="col-lg-2">VP_CANCEL_CODE</label>
              <div class="col-lg-10">
                <input name="VP_CANCEL_CODE" v-model="form.VP_CANCEL_CODE" class="form-control" placeholder="VP_CANCEL_CODE">
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="form.decryptHashKey">
              </div>
            </div>
            <div class="form-group">
              <label for="hashKey" class="col-lg-2">hashKey</label>
              <div class="col-lg-10">
                <input name="hashKey" v-model="form.hashKey" class="form-control" placeholder="hashKey">
              </div>
            </div>
            <div class="form-group">
              <label for="KVP_ENCDATA" class="col-lg-2">카드사코드</label>
              <div class="col-lg-10">
                <table>
                  <tr v-for="option in cardCodeList" v-bind:key="option.code" :value="option.code">
                    <td>{{option.name}}</td>
                    <td>{{option.code}}</td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- 'INIpluginData'는 플러그인에서 데이타를 받기 위한 필드 -->
            <input type="hidden" name="INIpluginData" v-model="form.INIpluginData">
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Cancel</button>
                <button type="button" class="btn btn-primary" @click="getAuthentication">인증진행하기</button>
                <button type="button" class="btn btn-primary" @click="doPay">승인</button>
                <button type="button" class="btn btn-primary" @click="doCancel">승인취소</button>
                <button type="button" class="btn btn-primary" @click="getNoInterestInfo">무이자할부조회</button>
                <button type="button" class="btn btn-primary" @click="downloadISP">ISP APP download</button>
              </div>
            </div>
          </fieldset>
        </form>
        <iframe name="ISP_FRAME" id="ISP_FRAME" border="0" width="0" height="0"></iframe>
        <form id="tidForm" method="post">
          <div class="form-group">
            <label for="TID" class="col-lg-2">TID</label>
            <div class="col-lg-10">
              <input name="TID" class="form-control" placeholder="TID">
            </div>
          </div>
          <!-- 전체취소 or 부분취소 -->
          <div class="form-group"><!--부분취소시 원거래 tid에 부분취소 선택 후 나머지 금액 취소해야 함 -->
            <label for="cancelType" class="col-lg-2">전체취소 or 부분취소</label>
            <div class="col-lg-10">
              <select class="form-control" name="cancelType">
                <option v-for="option in cancelType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
              </select>
            </div>
          </div>
          <!--<div class="form-group">
            <label for="cancelMsg" class="col-lg-2">취소메세지</label>
            <div class="col-lg-10">
              <input name="cancelMsg" class="form-control" placeholder="취소메세지" valuee="취소테스트">
            </div>
          </div>
          <div class="form-group">
            <label for="cancelPwd" class="col-lg-2">취소pwd</label>
            <div class="col-lg-10">
              <input name="cancelPwd" class="form-control" placeholder="취소pwd" valuee="123456">
            </div>
          </div>-->
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
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "AuthCardIsp",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: true,
      activeIndex: 0, // GNB 활성화
      form: {
        payCompany: "SMARTRO",
        deviceType: "PC",
        cardCode: "",
        mid: "gsstore01m",
        ordId: "",
        decryptHashKey: "",
        KVP_GOODNAME: "",
        KVP_PRICE: "5000",
        KVP_CARDCOMPANY: "",
        KVP_CURRENCY: "",
        VP_BC_ISSUERCODE: "",
        KVP_QUOTA_INF: "00",
        KVP_NOINT_INF: "",
        KVP_NOINT_FLAG: "",
        KVP_FIXPAYFLAG: "",
        KVP_MERCHANT_KB: "",
        KVP_KB_SAVEPOINTREE: "",
        VP_BC_SAVEPOINT: "",
        KVP_PGID: "",
        KVP_IMGURL: "",
        KVP_NOINT: "",
        KVP_QUOTA: "",
        KVP_CONAME: "",
        KVP_CARDCODE: "",
        KVP_SESSIONKEY: "",
        KVP_ENCDATA: "",
        KVP_RESERVED1: "",
        KVP_RESERVED2: "",
        KVP_RESERVED3: "",
        KVP_CARD_PREFIX: "",
        KVP_USING_POINT: "",
        VP_RET_SAVEPOINT: "",
        VP_CANCEL_CODE: "",
        INIpluginData: "",
        hashKey: "",
        authType: "ISP"
      },
      rform: {
        key: "",
        encData: "",
        xid: "", // 인증 후 정보 비교를 위함.
        pgId: "",
        resultCode: "",
        isOnlyAppcard: "",
        accpresURL: "",
        resultURL: "",
        issueCode: "",
        source: "",
        targetFrame: ""
      }
    };
  },
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '신용카드 > [ISP]'
  },
  mixins: [
    CommAuth
  ],
  components: {
    PaSmTopMenu,
    PaSmFooter
  },
  mounted: async function() {
    this.init();
  },
  methods: {
    changeOption() {
      this.init();
    },
    payCompanyChangeOption(obj) {
      let paycompany;
      if (obj === "SMARTRO" || obj === "KCP") {
        paycompany = obj;
      } else {
        paycompany = this.form.payCompany;
      }
      if (paycompany === "SMARTRO") {
        this.form.mid = "gsstore01m";
      } else {
        this.form.mid = "AO03V";
      }
    },
    async init() {
      const formData = this.form;
      /**
       *카드사가 선택되지 않았을 경우.
       */
      if ( StringUtils.isEmpty(formData.cardCode) ) {
        formData.cardCode = "41";
      }
      const cardCode = formData.cardCode;
      const deviceType = formData.deviceType;
      this.callIspActiveX();
      if (formData.deviceType === 'PC' && cardCode === "35") {
          alert('PC 환경에서 제주은행카드는 xmpi 결제로 진행되어야 합니다.');
          return;
      }
      if ( StringUtils.isEmpty(ispForm.buyer_name.value) ) {
        alert("고객명을 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(ispForm.buyer_tel.value) ) {
        alert("고객의 연락처를 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(ispForm.memNo.value) ) {
        alert("고객번호를 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(ispForm.goods_cnt.value) ) {
        alert("상품수량을 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(formData.KVP_PRICE) ) {
        alert("가격을 입력해주세요.");
        return;
      }
      const data = {
        authType: formData.authType,
        cardCode: cardCode,
        cmmMbrNo: ispForm.memNo.value
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuth' + ((formData.deviceType === "PC") ? "Pc" : data), data).then(function(res) {
        if (res.data.result === 'FAIL') {
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        that.form.cardCode = cardCode;
        that.form.KVP_PGID = res.data.mid;
        that.form.ordId = res.data.ordId;
        that.form.decryptHashKey = res.data.decryptHashKey;
        that.form.KVP_CURRENCY = res.data.currency;
        that.form.KVP_GOODNAME = res.data.goodName;
        that.form.KVP_CARDCOMPANY = res.data.cardCd;
        that.form.hashKey = res.data.hashKey;
        that.form.payCompany = res.data.payCompany;
        console.log('res.data.payCompany : '+res.data.payCompany);
        if (that.form.KVP_QUOTA_INF != "") {
          if (that.form.KVP_QUOTA_INF.substr(0, 1) == "0") {
            that.form.KVP_QUOTA_INF = that.form.KVP_QUOTA_INF.substr(1, 1);
          }
        }
        if (that.form.KVP_NOINT_INF != "") { // as-is setKvpNointInf(무이자할부 함수에서 setting)
          that.form.KVP_NOINT_INF = cardCode+"-"+that.form.KVP_QUOTA_INF;
        }
        if (res.data.payCompany === "KCP") {
          that.form.mid = "AO03V";
        }
      });
    },
    async doCancel() {
      let deviceType = "";
      const tidForm = document.getElementById("tidForm");
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let cancelType = "0";
      if (tidForm.cancelType.value === "PART") {
        cancelType = "1";
      }
      const data = {
        deviceType: deviceType,
        tid: tidForm.TID.value,
        cancelAmt: this.form.KVP_PRICE,
        cancelMsg: '취소메세지',
        partialCancelCode: cancelType,
        mid: this.form.mid,
        ordId: this.form.ordId,
        payCorp: this.form.payCompany
      };
      await ApiUtils
        .post("/fo/pa/reqCancelCard" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
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
            alert('ISP 결제 취소 중 에러가 발생하였습니다.['+res.data.resultMsg+']');
          } else {
            alert('결제가 정상 취소되었습니다.['+res.data.resultMsg+']');
            if (cancelType !== "1") {
              rsltForm.TID.value = "";
            } else {
              if (this.form.payCompany === "KCP") {
                rsltForm.remainCancelPossibleAmt.value = rsltForm.remainCancelPossibleAmt.value - rsltForm.modMny.value;
              }
            }
          }
        }
      );
    },
    async doPay() {
      let deviceType = "";
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      let smartroCardCode = "";
      if (this.form.cardCode === "41" || this.form.cardCode === "20" || this.form.cardCode === "71") {
        smartroCardCode = "01";
      } else if (this.form.cardCode === "04") {
        smartroCardCode = "02";
        this.doPayKmotion(deviceType, smartroCardCode);
        return false;
      } else if (this.form.cardCode === "07") {
        smartroCardCode = "13";
      } else if (this.form.cardCode === "37") {
        smartroCardCode = "22";
      } else if (this.form.cardCode === "34") {
        smartroCardCode = "21";
      }
      const amt = ispForm.KVP_PRICE.value;
      if ( StringUtils.isEmpty(ispForm.taxFreeAmt.value) ) {
          alert("면세대상금액을 입력해주세요.");
          return;
      } else {
        ispForm.taxableAmt.value = Math.round((amt - ispForm.taxFreeAmt.value) / 1.1);
        ispForm.tax.value = amt - ispForm.taxableAmt.value;
      }
      const data = {
        deviceType: deviceType,
        amt: ispForm.KVP_PRICE.value,
        goodsName: ispForm.KVP_GOODNAME.value,
        goodsCnt: ispForm.goods_cnt.value,
        buyerName: ispForm.buyer_name.value,
        buyerTel: ispForm.buyer_tel.value,
        mallUserID: ispForm.memNo.value,
        formBankCd: smartroCardCode,
        authType: "02",
        cardInterest: "0",
        cardQuota: "00",
        cardNo: '',
        kvpCardCode: ispForm.KVP_CARDCODE.value,
        kvpSessionKey: ispForm.KVP_SESSIONKEY.value,
        kvpEncData: ispForm.KVP_ENCDATA.value,
        mid: this.form.mid,
        ordId: this.form.ordId,
        payCorp: this.form.payCompany,
        taxableAmt: ispForm.taxableAmt.value,
        tax: ispForm.tax.value,
        taxFreeAmt: ispForm.taxFreeAmt.value
      };
      await ApiUtils
        .post("/fo/pa/reqApprCard" + ((ispForm.deviceType.value === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          if (res.data === null || (res.data.resultCode !== '3001' && res.data.resultCode !== '7001' && res.data.resultCode !== '0000')) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('ISP 결제 승인 중 에러가 발생하였습니다.');
          } else {
            tidForm.TID.value = res.data.tid;
            alert('결제가 완료되었습니다.');
          }
        }
      );
    },
    async getNoInterestInfo() {
      if (this.form.payCompany === "KCP") {
        this.form.payCompany = "SMARTRO";
        this.payCompanyChangeOption(this.form.payCompany);
      }
      const data = {
        mid: this.form.mid,
        payAmt: "60000" // 신용카드 지불금액
      };
      await ApiUtils
        .post("/fo/pa/requestNoInterestInfo", data)
        .then(res => {
          let isFail = false;
          if (res.data === null) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            alert('무이자 할부정보를 불러올 수 없습니다.');
          }
        }
      );
    },
    async downloadISP() {
      const userAgent = navigator.userAgent.toLocaleLowerCase();
      const isChrome = (userAgent.search("crios/") > -1);
      const isApp = (userAgent.search("gssmapp") > -1 || userAgent.search("dalisalda") > -1);
      const isAndroid = (userAgent.search("android") > -1);
      const isiOS = (userAgent.search("iphone") > -1 || userAgent.search("ipod") > -1 || userAgent.search("ipad") > -1);
      if (isApp) {
        // 앱 접속 유저, webview controller의 override로 재정의된 window.open 함수 이용
        if (isiOS) {
          window.open("http://itunes.apple.com/kr/app/id369125087?mt=8", "appStore", "");
        } else if (isAndroid) {
          window.open("http://mobile.vpay.co.kr/jsp/MISP/andown.jsp", "googleStore", "");
        } else {
          alert("해당 기기는 모바일 ISP 결제를 지원하지 않습니다.");
        }
      } else {
        // 브라우저 접속 유저
        if (isiOS) {
          if (chrome) {
            // iOS Chrome
            window.open("http://itunes.apple.com/kr/app/id369125087?mt=8", "appStore", "");
          } else {
            // iOS Safari
            window.location.href = 'http://itunes.apple.com/kr/app/id369125087?mt=8';
          }
        } else if (isAndroid) {
          window.open("http://mobile.vpay.co.kr/jsp/MISP/andown.jsp", "googleStore", "");
        } else {
          alert("해당 브라우저는 모바일 ISP 결제를 지원하지 않습니다.");
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
