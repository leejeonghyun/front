<template>
    <div id="authCardIsp" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="kmotionForm" name="kmotionForm" method="post" @submit.prevent="submit()">
          <fieldset>
            <legend>신용카드[kmotion]</legend>
            <!-- smartro or kcp -->
          <div class="form-group">
            <label for="payCompany" class="col-lg-2">스마트로 or KCP</label>
            <div class="col-lg-10">
              <!--<input name="payCompany" class="form-control" v-model="form.payCompany" placeholder="스마트로 or KCP" value="SMARTRO">-->
              <select v-model="form.payCompany" class="form-control" @change="payCompanyChangeOption">
                <option v-for="option in payCompany" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
              </select>
            </div>
          </div>
            <!-- PC or Mob -->
            <div class="form-group">
              <label for="deviceType" class="col-lg-2">PC or Mob</label>
              <div class="col-lg-10">
                <select v-model="form.deviceType" class="form-control" @change="changeOption">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="cardCode" class="col-lg-2">카드코드(국민카드)</label>
              <div class="col-lg-10">
                <input name="cardCode" class="form-control" v-model="form.cardCode" placeholder="카드코드(국민카드)" value="04" readonly>
              </div>
            </div>
            <div class="form-group">
              <label for="MID" class="col-lg-2">결제사MID</label>
              <div class="col-lg-10">
                <input name="mid" class="form-control" v-model="form.mid" placeholder="결제사MID" value="gsstore01m">
              </div>
            </div>
            <!-- 주문번호 -->
            <div class="form-group">
              <label for="ordId" class="col-lg-2">주문번호</label>
              <div class="col-lg-10">
                <input id="ordId" name="ordId" v-model="form.ordId" class="form-control" placeholder="주문번호" >
              </div>
            </div>
            <!--고객번호(memNo)  -->
            <div class="form-group">
              <label for="memNo" class="col-lg-2">고객번호</label>
              <div class="col-lg-10">
                <input name="memNo" class="form-control" placeholder="고객번호" value="12861410">
              </div>
            </div>
            <!--가맹점명(aff_name)  -->
            <div class="form-group">
              <label for="aff_name" class="col-lg-2">가맹점명</label>
              <div class="col-lg-10">
                <input name="aff_name" class="form-control" placeholder="가맹점명" value="GS fresh">
              </div>
            </div>
            <!-- 가격(amount) -->
            <div class="form-group">
              <label for="amount" class="col-lg-2">* 가격</label>
              <div class="col-lg-10">
                <input name="amount" class="form-control" placeholder="상품가격" v-model="form.amount">
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
            <!-- 상품명(product_name) -->
            <div class="form-group">
              <label for="product_name" class="col-lg-2">* 상품명</label>
              <div class="col-lg-10">
                <input name="product_name" class="form-control" placeholder="상품명" v-model="form.goodName">
              </div>
            </div>
            <!-- 세이브결제 옵션(save_pay_option) -->
            <div class="form-group">
              <label for="save_pay_option" class="col-lg-2">세이브결제 옵션</label>
              <div class="col-lg-10">
                <input name="save_pay_option" id="save_pay_option" v-model="form.savePayOption" class="form-control" placeholder="세이브결제 옵션" >
              </div>
            </div>
            <!-- 간편결제 옵션(easy_pay_option) -->
            <div class="form-group">
              <label for="easy_pay_option" class="col-lg-2">간편결제 옵션</label>
              <div class="col-lg-10">
                <input name="easy_pay_option" v-model="form.easyPayOption" class="form-control" placeholder="간편결제 옵션" >
              </div>
            </div>
            <!--무이자 할부 정보(noint_inf)  -->
            <div class="form-group">
              <label for="noint_inf" class="col-lg-2">무이자 할부 정보</label>
              <div class="col-lg-10">
                <input name="noint_inf" v-model="form.nointInf" class="form-control" placeholder="무이자 할부 정보" >
              </div>
            </div>
            <!--일반 할부 개월 정보(order_userid)  -->
            <div class="form-group">
              <label for="quota_inf" class="col-lg-2">일반 할부 개월 정보</label>
              <div class="col-lg-10">
                <input name="quota_inf" v-model="form.quotaInf" class="form-control" placeholder="일반 할부 개월 정보" >
              </div>
            </div>
            <!-- 무이자 또는 공백 표시 (mobile)-->
            <div class="form-group">
              <label for="noint_flag1" class="col-lg-2">무이자 또는 공백 표시 </label>
              <div class="col-lg-10">
                <input name="noint_flag1" v-model="form.nointFlag1" class="form-control" placeholder="무이자 또는 공백 표시 " >
              </div>
            </div>
            <!-- 유무이자 할부 Display 정보(regno)-->
            <div class="form-group">
              <label for="noint_flag2" class="col-lg-2">유무이자 할부 Display 정보</label>
              <div class="col-lg-10">
                <input name="noint_flag2" v-model="form.nointFlag2" class="form-control" placeholder="유무이자 할부 Display 정보" >
              </div>
            </div>
            <!-- KB 세이브 포인트리 연동(mid)-->
            <div class="form-group">
              <label for="kb_savepointree" class="col-lg-2">KB 세이브 포인트리 연동</label>
              <div class="col-lg-10">
                <input name="kb_savepointree" id="kb_savepointree" v-model="form.kbSavepointree" class="form-control" placeholder="KB 세이브 포인트리 연동" >
              </div>
            </div>
            <!-- 복합결제 연동(fixpayflag)-->
            <div class="form-group">
              <label for="fixpayflag" class="col-lg-2">복합결제 연동</label>
              <div class="col-lg-10">
                <input name="fixpayFlag" v-model="form.fixpayFlag" class="form-control" placeholder="복합결제 연동" >
              </div>
            </div>
            <!-- 서버 모드(server_mode)-->
            <div class="form-group">
              <label for="server_mode" class="col-lg-2">서버 모드</label>
              <div class="col-lg-10">
                <input name="server_mode" v-model="form.serverMode" class="form-control" placeholder="서버 모드" >
              </div>
            </div>
            <!-- KB앱카드 바로결제 여부(apvl_chain_no_lt)-->
            <div class="form-group">
              <label for="is_only_appcard" class="col-lg-2">KB앱카드 바로결제 여부</label>
              <div class="col-lg-10">
                <input name="is_only_appcard" v-model="form.isOnlyAppcard" class="form-control" placeholder="KB앱카드 바로결제 여부" >
              </div>
            </div>
            <!-- 환금성 상품 여부(apvl_seller_id_lt)-->
            <div class="form-group">
              <label for="is_liquidity" class="col-lg-2">환금성 상품 여부</label>
              <div class="col-lg-10">
                <input name="is_liquidity" v-model="form.isLiquidity" class="form-control" placeholder="환금성 상품 여부" >
              </div>
            </div>
            <!-- ISP 코드(issue_code)-->
            <div class="form-group">
              <label for="issue_code" class="col-lg-2">ISP 코드</label>
              <div class="col-lg-10">
                <input name="issue_code" v-model="form.issueCode" class="form-control" placeholder="ISP 코드" >
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="form.decryptHashKey">
              </div>
            </div>
            <!-- (return url)-->
            <div class="form-group">
              <label for="accpreq_url" class="col-lg-2">인증요청 callback url</label>
              <div class="col-lg-10">
                <input name="accpreq_url" v-model="form.accpreqUrl" class="form-control" placeholder="인증요청callback url" >
              </div>
            </div>
            <!-- (return url)-->
            <div class="form-group">
              <label for="result_url" class="col-lg-2">인증return url</label>
              <div class="col-lg-10">
                <input name="result_url" v-model="form.returnUrl" class="form-control" placeholder="인증결과return url" >
              </div>
            </div>
            <!-- (return url)-->
            <div class="form-group">
              <label for="accpres_url" class="col-lg-2">인증응답 callback url</label>
              <div class="col-lg-10">
                <input name="accpres_url" v-model="form.accpresUrl" class="form-control" placeholder="인증응답return url" >
              </div>
            </div>
            <!-- (actionUrl)-->
            <div class="form-group">
              <label for="actionUrl" class="col-lg-2">action url</label>
              <div class="col-lg-10">
                <input name="actionUrl" v-model="form.actionUrl" class="form-control" placeholder="action url" >
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
          <iframe src="/pa/comm_auth_kmotion_frame" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="500px;" align="center" scrolling="yes" style="transform: translate(0px, 0px) scale(1) translateZ(0px);" />
        </div>
        <form id="hidform" method="post">
        <input type="hidden" id="key" name="key" v-model="rform.key"/>
        <input type="hidden" id="data" name="data" v-model="rform.encData"/>
        <input type="hidden" id="pgID" name="pgID" v-model="rform.pgId"/>
        <input type="hidden" id="isOnlyAppcard" name="isOnlyAppcard" v-model="rform.isOnlyAppcard"/>
        <input type="hidden" id="accpresURL" name="accpresURL" v-model="rform.accpresURL"/>
        <input type="hidden" id="resultURL" name="resultURL" v-model="rform.resultURL"/>
        <input type="hidden" id="issueCode" name="issueCode" v-model="rform.issueCode"/>
        </form>
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
  name: "AuthCardKmotion",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: true,
      activeIndex: 1, // GNB 활성화
      form: {
        payCompany: "SMARTRO",
        deviceType: "PC",
        cardCode: "04",
        mid: "gsstore01m",
        ordId: "",
        decryptHashKey: "",
        name: "GS fresh",
        savePayOption: "",
        easyPayOption: "",
        nointInf: "NONE",
        quotaInf: "00",
        nointFlag1: "TRUE",
        nointFlag2: "FALSE",
        kbSavepointree: "",
        fixpayFlag: "",
        accpreqUrl: "",
        accpresUrl: "",
        returnUrl: "",
        actionUrl: "",
        serverMode: "",
        isOnlyAppcard: "",
        isLiquidity: "",
        goodName: "",
        issueCode: "",
        amount: "1004",
        hashKey: "",
        authType: "KMOTION"
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
      },
      rsltform: {
        cardNo: "",
        cavv: "",
        cardExpire: "",
        keyInCl: "",
        cardType: "",
        tkeyKmotion: "",
        kvpCardCode: "",
        kvpSessionKey: "",
        kvpEncData: "",
        cardQuota: "",
        cardInterest: ""
      }
    };
  },
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '신용카드 > [KMOTION]'
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
    const that = this;
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, function(e) {
      // thymeleaf 도메인으로부터 들어온 경우에만 적용
      if (e !== null &&
          e.data !== null &&
          e.data.resultCode !== null &&
          (location.href.indexOf(e.origin) < 0 && e.origin != ("https://gum.criteo.com"))) {
        console.log(e.origin);
        console.log("CardKmotionAuthTemplate : " + e.data.resultCode + ", e.origin : " + e.origin);
        console.log(e.data);
        if (e.data.resultCode === "0000") {
            that.rform = e.data;
            console.log(that.rform);
            let target = that.rform.targetFrame;
            // 모바일 kmotionAuthReqCallback
            if (target === "FRAME") {
              target = document.getElementById("MPI_FRAME").contentWindow.iframe.name;
              hidform.action = that.rform.actionUrl;
              hidform.target = target;
              hidform.submit();
            } else { // 모바일(kmotionAuthAuthCallback.html), Pc(kmotionAuthResCallback.html/kmotionAuthAuthCallback.html)
              ApiUtils
                .post('/fo/pa/kmotionAuthCallback', {hashKey: e.data.hashKey})
                .then(res => {
                  console.log(res.data);
                  if (res.data === null || res.data.resultCode !== '0000') {
                    console.error(res.data);
                    alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.');
                    // window.close();
                  } else {
                    if (that.form.deviceType === "MOB") {
                      document.getElementById('frame_div').style.display = 'none';
                    }
                    alert("인증이 완료되었습니다.");
                  }
                  that.rsltform = res.data;
                  console.log(that.rsltform);
                  that.rsltform.cardNo = that.rsltform.tkeyKmotion.substr(0, 16);
                  that.rsltform.cavv = that.rsltform.tkeyKmotion.substr(16);
                }
              );
            }
        } else if (e.data.resultCode === "9901") {
          alert('인증을 취소하였습니다.');
          return;
        } else if (e.data.resultCode === "9997") {
          alert('isp 결제.');
          location.href = "/pa/card_isp_auth_template";
          return;
        } else {
          // alert('인증 중 에러가 발생했습니다.');
          return;
        }
      }
    }, false);
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
      const cardCode = formData.cardCode;
      const deviceType = formData.deviceType;
      const authType = formData.authType;
      document.getElementById('frame_div').style.display = 'none';
      const data = {
          authType: authType,
          cardCode: cardCode,
          cmmMbrNo: kmotionForm.memNo.value
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuth', data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          console.error(res.data);
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        console.log(res.data);
        that.form = res.data;
        // kmotion은 결제사를 smartro만 사용
        that.form.payCompany = "SMARTRO";
        that.form.mid = "gsstore01m";
        that.form.ordId = res.data.ordId;
        that.form.decryptHashKey = res.data.decryptHashKey;
        that.form.cardCode = cardCode;
        that.form.deviceType = formData.deviceType;
        that.form.authType = authType;
        that.form.name = "GS fresh";
        that.form.amount = "1004";
        that.form.quotaInf = "00";
        if (deviceType === "PC") {
          this.callKmotionPcScript();
          that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
          that.form.accpresUrl = that.form.accpresUrl+".hashKey_"+res.data.hashKey;
          that.form.accpreqUrl = that.form.accpreqUrl+".hashKey_"+res.data.hashKey;
        } else {
          that.form.returnUrl = res.data.returnUrlMob+".hashKey_"+res.data.hashKey;
          that.form.accpresUrl = res.data.accpresUrlMob+".hashKey_"+res.data.hashKey;
          that.form.accpreqUrl = res.data.accpreqUrlMob+".hashKey_"+res.data.hashKey;
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
        cancelAmt: kmotionForm.amount.value,
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
      const smartroCardCode = "02";
      const amt = kmotionForm.amount.value;
      if ( StringUtils.isEmpty(kmotionForm.taxFreeAmt.value) ) {
          alert("면세대상금액을 입력해주세요.");
          return;
      } else {
        kmotionForm.taxableAmt.value = Math.round((amt - kmotionForm.taxFreeAmt.value) / 1.1);
        kmotionForm.tax.value = amt - kmotionForm.taxableAmt.value;
      }
      debugger;
      const data = {
        deviceType: deviceType,
        amt: kmotionForm.amount.value,
        goodsName: kmotionForm.product_name.value,
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "01000000000",
        mallUserID: kmotionForm.memNo.value,
        formBankCd: smartroCardCode,
        authType: "02",
        cardInterest: "0",
        cardQuota: "00",
        cardNo: this.rsltform.cardNo,
        cavv: this.rsltform.cavv,
        cardExpire: this.rsltform.cardExpire,
        keyInCl: this.rsltform.keyInCl,
        cardType: this.rsltform.cardType,
        tkeyKmotion: this.rsltform.tkeyKmotion,
        // kvpCardCode: this.rsltform.kvpCardCode,
        // kvpSessionKey: this.rsltform.kvpSessionKey,
        // kvpEncData: this.rsltform.kvpEncData,
        // useKmotionYn: "Y",
        mid: this.form.mid,
        ordId: this.form.ordId,
        payCorp: this.form.payCompany,
        taxableAmt: kmotionForm.taxableAmt.value,
        tax: kmotionForm.tax.value,
        taxFreeAmt: kmotionForm.taxFreeAmt.value
      };
      // kmotion kcp 승인 불가
      if ( this.form.payCompany === "KCP") {
        data.useKmotionYn = "Y";
        data.kvpCardCode = this.rsltform.kvpCardCode;
        data.kvpSessionKey = this.rsltform.kvpSessionKey;
        data.kvpEncData = this.rsltform.kvpEncData;
      }
      console.log(data);
      await ApiUtils
        .post("/fo/pa/reqApprCard" + ((deviceType === "WEB") ? "Pc" : "Mob"), data)
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
            alert('kmotion 결제 승인 중 에러가 발생하였습니다.');
          } else {
            tidForm.TID.value = res.data.tid;
            alert('결제가 완료되었습니다.');
          }
        }
      );
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="@/views/sample/css/payment/auth_payment.css" scoped></style>
