<template>
    <div id="authGiftCard" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="giftCardForm" name="giftCardForm" method="post" @submit.prevent="submit()">
          <fieldset>
            <legend>상품권</legend>
            <!-- PC or Mob -->
            <div class="form-group">
              <label for="deviceType" class="col-lg-2">PC or Mob</label>
              <div class="col-lg-10">
                <select v-model="form.deviceType" class="form-control" @change="changeOption">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- 해피머니 or 북앤라이프 -->
            <div class="form-group">
              <label for="giftCardType" class="col-lg-2">해피머니 or 북앤라이프</label>
              <div class="col-lg-10">
                <select v-model="form.giftCardType" class="form-control" @change="changeOption">
                  <option v-for="option in giftCardType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="MID" class="col-lg-2">MID</label>
              <div class="col-lg-10">
                <input name="mid" class="form-control" v-model="form.mid" placeholder="가맹점MID" value="gsstore01m">
              </div>
            </div>
            <!--고객번호(memNo)  -->
            <div class="form-group">
              <label for="memNo" class="col-lg-2">고객번호</label>
              <div class="col-lg-10">
                <input name="memNo" class="form-control" placeholder="고객번호" value="12861410">
              </div>
            </div>
            <!-- 금액 -->
            <div class="form-group">
              <label for="totAmt" class="col-lg-2">* 금액</label>
              <div class="col-lg-10">
                <input name="totAmt" v-model="form.totAmt" class="form-control" placeholder="금액" >
              </div>
            </div>
            <!--CP사 ID(cpId) -->
            <div class="form-group">
              <label for="cpId" class="col-lg-2">* CP사 ID</label>
              <div class="col-lg-10">
                <input name="cpId" v-model="form.cpId" class="form-control" placeholder="CP사 ID" >
              </div>
            </div>
            <!--CP사 회원ID(cpUserId) -->
            <div class="form-group">
              <label for="cpUserId" class="col-lg-2">CP사 회원ID</label>
              <div class="col-lg-10">
                <input name="cpUserId" v-model="form.cpUserId" class="form-control" placeholder="CP사 회원ID" >
              </div>
            </div>
            <!--CP사 회원IP(cpUserIp) -->
            <div class="form-group">
              <label for="cpUserIp" class="col-lg-2">CP사 회원IP</label>
              <div class="col-lg-10">
                <input name="cpUserIp" v-model="form.cpUserIp" class="form-control" placeholder="CP사 회원IP" >
              </div>
            </div>
            <!--도서문화상품권 encodingType -->
            <div class="form-group">
              <label for="encodingType" class="col-lg-2">encodingType</label>
              <div class="col-lg-10">
                <input name="encodingType" v-model="form.encodingType" class="form-control" placeholder="encodingType" readonly>
              </div>
            </div>
            <!--해피머니상품권 할인 유형 ['NONE' : 할인 미적용, 'POP' : POP할인] -->
            <div class="form-group">
              <label for="dcType" class="col-lg-2">dcType</label>
              <div class="col-lg-10">
                <input name="dcType" v-model="form.dcType" class="form-control" placeholder="dcType" readonly>
              </div>
            </div>
            <!--return url  -->
            <div class="form-group">
              <label for="rtnUrl" class="col-lg-2">return url</label>
              <div class="col-lg-10">
                <input name="rtnUrl" v-model="form.returnUrl" class="form-control" placeholder="return url">
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
          <iframe src="" name="GIFT_FRAME" id="GIFT_FRAME" width="100%" height="610px;" align="center" scrolling="yes" style="transform: translate(0px, 0px) scale(1) translateZ(0px);"/>
        </div>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <fieldset>
            <legend>결과값</legend>
            <!-- resCode -->
            <div class="form-group">
              <label for="resCode" class="col-lg-2">응답코드</label>
              <div class="col-lg-10">
                <input type="text" id ="resCode" name="resCode" value="" class="form-control" placeholder="응답코드" v-model="rsform.resultCode">
              </div>
            </div>
            <!-- 응답메시지 -->
            <div class="form-group">
              <label for="resMessage" class="col-lg-2">응답메시지</label>
              <div class="col-lg-10">
                <input type="text" id ="resMessage" name="resMessage" value="" class="form-control" placeholder="응답메시지" v-model="rsform.resultMsg">
              </div>
            </div>
            <!-- 승인일자 -->
            <div class="form-group">
              <label for="authDate" class="col-lg-2">승인일자</label>
              <div class="col-lg-10">
                <input type="text" id ="authDate" name="authDate" value="" class="form-control" placeholder="승인일자" v-model="rsform.authDate">
              </div>
            </div>
            <!-- 북앤라이프아이디 -->
            <div class="form-group">
              <label for="blUserId" class="col-lg-2">북앤라이프아이디</label>
              <div class="col-lg-10">
                <input type="text" id ="blUserId" name="blUserId" value="" class="form-control" placeholder="북앤라이프아이디" v-model="rsform.blUserId">
              </div>
            </div>
            <!-- 북앤라이프 비밀번호 -->
            <div class="form-group">
              <label for="blUserPwd" class="col-lg-2">북앤라이프 비밀번호</label>
              <div class="col-lg-10">
                <input type="text" id ="blUserPwd" name="blUserPwd" value="" class="form-control" placeholder="북앤라이프 비밀번호" v-model="rsform.blUserPwd">
              </div>
            </div>
            <!-- 해피머니 id -->
            <div class="form-group">
              <label for="hmId" class="col-lg-2">해피머니아이디</label>
              <div class="col-lg-10">
                <input type="text" id ="hmId" name="hmId" value="" class="form-control" placeholder="해피머니아이디" v-model="rsform.hmId">
              </div>
            </div>
            <!-- 해피머니인증키 -->
            <div class="form-group">
              <label for="authKey" class="col-lg-2">해피머니인증키</label>
              <div class="col-lg-10">
                <input type="text" id ="authKey" name="authKey" value="" class="form-control" placeholder="해피머니인증키" v-model="rsform.authKey">
              </div>
            </div>
            <!-- 캐시잔액 -->
            <div class="form-group">
              <label for="remCash" class="col-lg-2">캐시잔액</label>
              <div class="col-lg-10">
                <input type="text" id ="remCash" name="remCash" value="" class="form-control" placeholder="캐시잔액" v-model="rsform.remCash">
              </div>
            </div>
            <!-- 사용할 캐시 -->
            <div class="form-group">
              <label for="useCash" class="col-lg-2">사용할 캐시</label>
              <div class="col-lg-10">
                <input type="text" id ="useCash" name="useCash" value="" class="form-control" placeholder="사용할 캐시" v-model="rsform.useCash">
              </div>
            </div>
            <!-- 승인 tid-->
            <div class="form-group">
              <label for="tid" class="col-lg-2">승인 tid</label>
              <div class="col-lg-10">
                <input name="tid" v-model="rsform.tid" class="form-control" placeholder="승인 tid" >
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
  name: "GiftCardAuth",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: false,
      activeIndex: 7, // GNB 활성화
      form: {
        deviceType: "PC",
        giftCardType: "BNLGIFT",
        mbrNo: "",
        totAmt: "1000",
        cpId: "",
        cpUserId: "test",
        cpUserIp: "",
        returnUrl: "",
        actionUrl: "",
        encodingType: "",
        dcType: "",
        mid: "gsstore01m"
      },
      rsform: {
        /* amt: "",
        goodsName: "",
        goodsCnt: "1",
        buyerName: "",
        buyerTel: "010000000000", */
        resultCode: "",
        resultMsg: "",
        authDate: "",
        blUserId: "",
        blUserPwd: "",
        hmId: "",
        authKey: "",
        remCash: "",
        useCash: "",
        tid: ""
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '상품권'
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
      const data = {
        hashKey: hashKey,
        payType: that.form.giftCardType
      };
      ApiUtils
        .post('/fo/pa/giftCardAuthCallback', data)
        .then(res => {
          if (that.form.deviceType === 'MOB') {
              document.getElementById('frame_div').style.display = 'none';
          }
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.['+res.data.resultMsg+']');
            return;
          }
          console.log(res.data);
          that.rsform = res.data;
        }
      );
    };
  },
  methods: {
    changeOption() {
      this.init();
    },
    async init() {
      const formData = this.form;
      const giftCardType = formData.giftCardType;
      const that = this;
      await ApiUtils.post("/fo/pa/giftCardInitAuth" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), giftCardType).then(function(res) {
        if (res.data.result === 'FAIL') {
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        that.form = res.data;
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
        }
        that.form.totAmt = "1000";
        that.form.cpUserId = "test";
        that.form.deviceType = formData.deviceType;
        that.form.giftCardType = giftCardType;
        that.form.mid = formData.mid;
      });
    },
    async getAuthentication() {
      alert("giftCardAuth Call..");
      if ( StringUtils.isEmpty(this.form.totAmt) ) {
        alert("가격을 입력해주세요.");
        return;
      }
      if ( StringUtils.isEmpty(this.form.cpUserId) ) {
        alert("고객 아이디를 입력해주세요.");
        return;
      }
      const data = {
        cmmMbrNo: giftCardForm.memNo.value,
        payCompany: 'SMARTRO',
        authType: this.form.giftCardType
      };
      const that = this;
      await ApiUtils.post('/fo/pa/initAuth', data).then(res => {
        if (res.data !== null) {
          that.form.returnUrl = this.form.returnUrl+".hashKey_"+res.data.hashKey;
        }
      });
      giftCardForm.action = this.form.actionUrl;
      if (this.form.deviceType === 'PC') {
        giftCardForm.method = "post";
        window.open("", "popup", "height=430,width=370,status=no,dependent=no,scrollbars=no,resizable=no");
        giftCardForm.target = "popup";
      } else {
        document.getElementById('frame_div').style.display = 'block';
        giftCardForm.target = "GIFT_FRAME";
      }
      giftCardForm.submit();
    },
    async doCancel() {
      let deviceType = "";
      const rsltForm = document.getElementById('rsltForm');
      const giftCardType = this.form.giftCardType;
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      const data = {
        deviceType: deviceType,
        tid: this.rsform.tid,
        cancelAmt: this.form.totAmt,
        cancelMsg: '취소메세지',
        // cancelPwd: '123456',
        mid: this.form.mid
      };
      let url;
      let succCode;
      if (giftCardType === "BNLGIFT") {
        url = "/fo/pa/reqCancelBooknlife" + ((this.form.deviceType === "PC") ? "Pc" : "Mob");
      } else if (giftCardType === "HMGIFT") {
        url = "/fo/pa/reqCancelHappymoney" + ((this.form.deviceType === "PC") ? "Pc" : "Mob");
      }
      await ApiUtils
        .post(url, data)
        .then(res => {
          let isFail = false;
          console.log(res.data.resultCode);
          if (res.data === null || res.data.resultCode !== '2001') {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 취소 중 에러가 발생하였습니다.['+res.data.resultMsg+']');
          } else {
            alert('결제가 정상 취소되었습니다.['+res.data.resultMsg+']');
            rsltForm.reset();
          }
        }
      );
    },
    async doPay() {
      const rsltForm = document.getElementById('rsltForm');
      const giftCardType = this.form.giftCardType;
      let deviceType;
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      const data = {
        deviceType: deviceType,
        amt: this.form.totAmt,
        goodsName: 'GSFresh상품',
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "01000000000",
        buyerAuthNum: "01000000000",
        buyerEmail: '',
        mallUserID: giftCardForm.memNo.value,
        mid: this.form.mid,
        payType: this.form.giftCardType,
      };
      let url;
      let succCode;
      if (giftCardType === "BNLGIFT") {
        data.userId = this.rsform.blUserId;
        data.userPwd = this.rsform.blUserPwd;
        data.customCode = this.form.cpId;
        url = "/fo/pa/reqApprBooknlife" + ((this.form.deviceType === "PC") ? "Pc" : "Mob");
        succCode = "BL00";
      } else if (giftCardType === "HMGIFT") {
        data.happyId = this.rsform.hmId;
        data.payKey = this.rsform.authKey;
        data.userOption = this.form.dcType;
        data.cpId = this.form.cpId;
        url = "/fo/pa/reqApprHappymoney" + ((this.form.deviceType === "PC") ? "Pc" : "Mob");
        succCode = "H000";
      }
      console.log(data);
      await ApiUtils
        .post(url, data)
        .then(res => {
          let isFail = false;
          if (res.data === null || res.data.resultCode !== succCode) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 승인 중 에러가 발생하였습니다.');
          } else {
            this.rsform = res.data;
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
