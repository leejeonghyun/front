<template>
    <div id="authCardKmpi" v-bind:class="[siteClass]">
      <PaSmTopMenu :activeIndex="activeIndex" :type="sticky ? 'sub': ''" />
      <!-- START : 본문 -->
      <div class="container">
        <form class="form-horizontal" id="kmpiForm" name="kmpiForm" method="post">
          <fieldset>
            <legend>신용카드[KMPI]</legend>
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
                <select v-model="form.deviceType" class="form-control" @change="changeOption">
                  <option v-for="option in deviceType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="card_code" class="col-lg-2">Card</label>
              <div class="col-lg-10">
                <select v-model="form.cardCode" class="form-control" @change="changeOption">
                  <option value="">카드선택</option>
                  <option v-for="option in cardCodeList" v-bind:key="option.code" :value="option.code" v-show="option.typeCd === 'KMPI'">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- (결제사 MID) -->
            <div class="form-group">
              <label for="payment MID" class="col-lg-2">결제사 MID(스마트로/kcp)</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="결제사 mid" name="paymentMid" v-model="form.paymentMid">
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
            <!-- 가격(pay_ansim_price) -->
            <div class="form-group">
              <label for="pay_ansim_price" class="col-lg-2">가격</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="가격" name="pay_ansim_price" value="1000">
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
            <!-- 상품명(orderGoods) -->
            <div class="form-group">
              <label for="orderGoods" class="col-lg-2">상품명</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="상품명" name="orderGoods" value="gsFresh상품">
              </div>
            </div>
            <!-- (pay_apvl_seller_id) -->
            <div class="form-group">
              <label for="pay_apvl_seller_id" class="col-lg-2">pay_apvl_seller_id</label>
              <div class="col-lg-10">
                <input v-model="form.payApvlSellerId" class="form-control" placeholder="pay_apvl_seller_id" name="pay_apvl_seller_id" >
              </div>
            </div>
            <!-- (pay_apvl_chain_no) -->
            <div class="form-group">
              <label for="pay_apvl_chain_no" class="col-lg-2">pay_apvl_chain_no</label>
              <div class="col-lg-10">
                <input v-model="form.payApvlChainNo" class="form-control" placeholder="pay_apvl_chain_no" name="pay_apvl_chain_no">
              </div>
            </div>
            <!-- 할부개월수(pay_apvl_halbu) -->
            <div class="form-group">
              <label for="pay_apvl_halbu" class="col-lg-2">할부개월수</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="할부개월수" name="pay_apvl_halbu" id="pay_apvl_halbu" value="00">
              </div>
            </div>
            <!-- (pay_POPSIZE) -->
            <div class="form-group">
              <label for="pay_POPSIZE" class="col-lg-2">pay_POPSIZE</label>
              <div class="col-lg-10">
                <input v-model="form.payPopsize" class="form-control" placeholder="pay_POPSIZE" name="pay_POPSIZE">
              </div>
            </div>
            <!-- (MID) -->
            <div class="form-group">
              <label for="MID" class="col-lg-2">MID</label>
              <div class="col-lg-10">
                <input v-model="form.mid" class="form-control" placeholder="MID" name="MID">
              </div>
            </div>
            <!-- (ANSIM-MID) mobile -->
            <div class="form-group">
              <label for="MID" class="col-lg-2">ANSIM-MID(mobile)</label>
              <div class="col-lg-10">
                <input v-model="form.ansimMid" class="form-control" placeholder="ansim-mid" name="mId">
              </div>
            </div>
            <!-- (BUSINESSTYPE) -->
            <div class="form-group">
              <label for="BUSINESSTYPE" class="col-lg-2">BUSINESSTYPE</label>
              <div class="col-lg-10">
                <input v-model="form.businesstype" class="form-control" placeholder="BUSINESSTYPE" name="BUSINESSTYPE">
              </div>
            </div>
            <!-- (BUSINESSNO) mobile -->
            <div class="form-group">
              <label for="BUSINESSNO" class="col-lg-2">BUSINESSNO(mobile)</label>
              <div class="col-lg-10">
                <input v-model="form.businessno" class="form-control" placeholder="BUSINESSNO" name="BUSINESSNO">
              </div>
            </div>
            <!-- (MOBILE) -->
            <div class="form-group">
              <label for="MOBILE" class="col-lg-2">MOBILE</label>
              <div class="col-lg-10">
                <input v-model="form.mobile" class="form-control" placeholder="MOBILE" name="MOBILE">
              </div>
            </div>
            <!-- (APVL_SELLER_ID_LT) -->
            <div class="form-group">
              <label for="APVL_SELLER_ID_LT" class="col-lg-2">APVL_SELLER_ID_LT</label>
              <div class="col-lg-10">
                <input v-model="form.apvlSellerIdLt" class="form-control" placeholder="APVL_SELLER_ID_LT" name="APVL_SELLER_ID_LT">
              </div>
            </div>
            <!-- (SUB_APVL_SELLER_ID_LT) -->
            <div class="form-group">
              <label for="SUB_APVL_SELLER_ID_LT" class="col-lg-2">SUB_APVL_SELLER_ID_LT</label>
              <div class="col-lg-10">
                <input v-model="form.subApvlSellerIdLt" class="form-control" placeholder="SUB_APVL_SELLER_ID_LT" name="SUB_APVL_SELLER_ID_LT">
              </div>
            </div>
            <!-- (APVL_SS_USEYN) -->
            <div class="form-group">
              <label for="APVL_SS_USEYN" class="col-lg-2">APVL_SS_USEYN</label>
              <div class="col-lg-10">
                <input v-model="form.apvlSsUseyn" class="form-control" placeholder="APVL_SS_USEYN" name="APVL_SS_USEYN">
              </div>
            </div>
            <!-- (PAY) -->
            <div class="form-group">
              <label for="PAY" class="col-lg-2">PAY</label>
              <div class="col-lg-10">
                <input v-model="form.pay" class="form-control" placeholder="PAY" name="PAY">
              </div>
            </div>
            <!-- 주문자(ORDER_USERID) -->
            <div class="form-group">
              <label for="ORDER_USERID" class="col-lg-2">주문자</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="주문자" name="ORDER_USERID">
              </div>
            </div>
            <!-- 쇼핑몰사업자번호 -->
            <div class="form-group">
              <label for="ORDER_BUSINESS" class="col-lg-2">쇼핑몰사업자번호</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="쇼핑몰사업자번호" name="order_business">
              </div>
            </div>
            <!-- (pan) -->
            <div class="form-group">
              <label for="pan" class="col-lg-2">pan</label>
              <div class="col-lg-10">
                <input v-model="form.pan" class="form-control" placeholder="pan" name="pan">
              </div>
            </div>
            <!-- (pay_pan) -->
            <div class="form-group">
              <label for="pay_pan" class="col-lg-2">pay_pan</label>
              <div class="col-lg-10">
                <input v-model="form.payPan" class="form-control" placeholder="pay_pan" name="pay_pan">
              </div>
            </div>
            <!-- (expiry) -->
            <div class="form-group">
              <label for="expiry" class="col-lg-2">expiry</label>
              <div class="col-lg-10">
                <input v-model="form.expiry" class="form-control" placeholder="expiry" name="expiry">
              </div>
            </div>
            <!-- (purchase_amount) -->
            <div class="form-group">
              <label for="purchase_amount" class="col-lg-2">purchase_amount</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="purchase_amount" name="purchase_amount" readonly>
              </div>
            </div>
            <!-- (amount) -->
            <div class="form-group">
              <label for="amount" class="col-lg-2">amount</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="amount" name="amount" readonly>
              </div>
            </div>
            <!-- (description) -->
            <div class="form-group">
              <label for="description" class="col-lg-2">description</label>
              <div class="col-lg-10">
                <input v-model="form.description" class="form-control" placeholder="description" name="description">
              </div>
            </div>
            <!-- (currency) -->
            <div class="form-group">
              <label for="currency" class="col-lg-2">currency</label>
              <div class="col-lg-10">
                <input v-model="form.currency" class="form-control" placeholder="currency" name="currency">
              </div>
            </div>
            <!-- (device_category) -->
            <div class="form-group">
              <label for="device_category" class="col-lg-2">device_category</label>
              <div class="col-lg-10">
                <input v-model="form.deviceCategory" class="form-control" placeholder="device_category" name="device_category">
              </div>
            </div>
            <!-- (hostid) mobile -->
            <div class="form-group">
              <label for="hostid" class="col-lg-2">hostid(mobile)</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="hostid" name="hostid" v-model="form.hostid">
              </div>
            </div>
            <!-- (hostpwd) mobile -->
            <div class="form-group">
              <label for="hostpwd" class="col-lg-2">hostpwd(mobile)</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="hostpwd" name="hostpwd" v-model="form.hostpwd">
              </div>
            </div>
            <!-- (name) -->
            <div class="form-group">
              <label for="name" class="col-lg-2">name</label>
              <div class="col-lg-10">
                <input v-model="form.name" class="form-control" placeholder="name" name="name">
              </div>
            </div>
            <!-- (url) -->
            <div class="form-group">
              <label for="url" class="col-lg-2">url</label>
              <div class="col-lg-10">
                <input v-model="form.url" class="form-control" placeholder="url" name="url">
              </div>
            </div>
            <!-- (country) -->
            <div class="form-group">
              <label for="country" class="col-lg-2">country</label>
              <div class="col-lg-10">
                <input v-model="form.country" class="form-control" placeholder="country" name="country">
              </div>
            </div>
            <!-- (useActiveX) -->
            <div class="form-group">
              <label for="useActiveX" class="col-lg-2">useActiveX</label>
              <div class="col-lg-10">
                <input v-model="form.useactivex" class="form-control" placeholder="useActiveX" name="useActiveX">
              </div>
            </div>
            <!-- decryptHashKey(템플릿테스트용) -->
            <div class="form-group">
              <label for="decryptHashKey" class="col-lg-2">decryptHashKey</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="decryptHashKey" name="decryptHashKey" v-model="form.decryptHashKey">
              </div>
            </div>
            <!-- (returnUrl) -->
            <div class="form-group">
              <label for="returnUrl" class="col-lg-2">returnUrl</label>
              <div class="col-lg-10">
                <input v-model="form.returnUrl" class="form-control" placeholder="returnUrl" name="returnUrl">
              </div>
            </div>
            <!-- (failReturn) -->
            <div class="form-group">
              <label for="failReturn" class="col-lg-2">failReturn</label>
              <div class="col-lg-10">
                <input v-model="form.failreturn" class="form-control" placeholder="failReturn" name="failReturn">
              </div>
            </div>
            <!-- (apvl_chain_no) -->
            <div class="form-group">
              <label for="apvl_chain_no" class="col-lg-2">apvl_chain_no(keb)</label>
              <div class="col-lg-10">
                <input v-model="form.apvlChainNo" class="form-control" placeholder="apvl_chain_no" name="apvl_chain_no">
              </div>
            </div>
            <!-- (apvl_seller_id) -->
            <div class="form-group">
              <label for="apvl_seller_id" class="col-lg-2">apvl_seller_id(keb)</label>
              <div class="col-lg-10">
                <input v-model="form.apvlSellerId" class="form-control" placeholder="apvl_seller_id" name="apvl_seller_id">
              </div>
            </div>
            <!-- (apvl_halbu) -->
            <div class="form-group">
              <label for="apvl_halbu" class="col-lg-2">apvl_halbu(keb)</label>
              <div class="col-lg-10">
                <input class="form-control" placeholder="apvl_halbu" name="apvl_halbu" value="0" v-model="form.apvlHalbu">
              </div>
            </div>
            <!-- (POPSIZE) -->
            <div class="form-group">
              <label for="POPSIZE" class="col-lg-2">POPSIZE(keb)</label>
              <div class="col-lg-10">
                <input v-model="form.popsize" class="form-control" placeholder="POPSIZE" name="POPSIZE">
              </div>
            </div>
            <!-- (usimYn) -->
            <div class="form-group">
              <label for="usimYn" class="col-lg-2">usimYn(keb)(mobile)</label>
              <div class="col-lg-10">
                <input v-model="form.usimYn" class="form-control" placeholder="usimYn" name="usimYn">
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
          <iframe src="" name="MPI_FRAME" id="MPI_FRAME" width="100%" height="600px;" align="center"/>
        </div>
        <form class="form-horizontal" name="rsltForm" id="rsltForm">
          <fieldset>
            <legend>결과값</legend>
            <!-- cavv -->
            <div class="form-group">
              <label for="cavv" class="col-lg-2">cavv</label>
              <div class="col-lg-10">
                <input type="text" id ="cavv" name="cavv" value="" class="form-control" placeholder="cavv" v-model="rsform.cavv">
              </div>
            </div>
            <!-- xid -->
            <div class="form-group">
              <label for="xid" class="col-lg-2">xid</label>
              <div class="col-lg-10">
                <input type="text" id ="xid" name="xid" value="" class="form-control" placeholder="xid" v-model="rsform.xid">
              </div>
            </div>
            <!-- encXid -->
            <div class="form-group">
              <label for="encXid" class="col-lg-2">encXid</label>
              <div class="col-lg-10">
                <input type="text" id ="encXid" name="encXid" value="" class="form-control" placeholder="xid" v-model="rsform.encXid">
              </div>
            </div>
            <!-- eci -->
            <div class="form-group">
              <label for="eci" class="col-lg-2">eci</label>
              <div class="col-lg-10">
                <input type="text" id ="eci" name="eci" value="" class="form-control" placeholder="eci" v-model="rsform.eci">
              </div>
            </div>
            <!-- eci -->
            <div class="form-group">
              <label for="cardno" class="col-lg-2">cardno</label>
              <div class="col-lg-10">
                <input type="text" id ="cardno" name="cardno" value="" class="form-control" placeholder="cardno" v-model="rsform.realPan">
              </div>
            </div>
            <!-- joincode -->
            <div class="form-group">
              <label for="joincode" class="col-lg-2">joincode</label>
              <div class="col-lg-10">
                <input type="text" id ="joincode" name="joincode" value="" class="form-control" placeholder="joincode" v-model="rsform.joinCode">
              </div>
            </div>
            <!-- tid -->
            <div class="form-group">
              <label for="TID" class="col-lg-2">TID</label>
              <div class="col-lg-10">
                <input name="TID" class="form-control" placeholder="TID">
              </div>
            </div>
            <!-- 전체취소 or 부분취소 -->
            <div class="form-group"><!--부분취소가 진행된 거래는 잔여금액을 모두 취소하고 싶은 경우에도 부분취소로 선택하고 취소해야함. -->
              <label for="cancelType" class="col-lg-2">전체취소 or 부분취소</label>
              <div class="col-lg-10">
                <select class="form-control" name="cancelType">
                  <option v-for="option in cancelType" v-bind:key="option.code" :value="option.code">{{option.name}}</option>
                </select>
              </div>
            </div>
            <!-- 부분취소 요청금액(modMny) only kcp -->
            <div class="form-group">
              <label for="modMny" class="col-lg-2">부분취소 요청금액</label>
              <div class="col-lg-10">
                <input name="modMny" class="form-control" placeholder="부분취소 요청금액">
              </div>
            </div>
            <!-- 공급가 부분취소 요청금액(taxableCancelAmt) only kcp -->
            <div class="form-group">
              <label for="taxableCancelAmt" class="col-lg-2">공급가 부분취소 요청금액(kcp)</label>
              <div class="col-lg-10">
                <input name="taxableCancelAmt" class="form-control" placeholder="공급가 부분취소 요청금액">
              </div>
            </div>
            <!-- 부가세 부분취소 요청금액(tax) -->
            <div class="form-group">
              <label for="tax" class="col-lg-2">부가세 부분취소 요청금액</label>
              <div class="col-lg-10">
                <input name="tax" class="form-control" placeholder="부가세 부분취소 요청금액">
              </div>
            </div>
            <!-- 비과세 부분취소 요청금액(taxFreeCancelAmt) only kcp -->
            <div class="form-group">
              <label for="taxFreeCancelAmt" class="col-lg-2">비과세 부분취소 요청금액(kcp)</label>
              <div class="col-lg-10">
                <input name="taxFreeCancelAmt" class="form-control" placeholder="비과세 부분취소 요청금액" value="0">
              </div>
            </div>
            <!-- 부분취소 남은금액 only kcp -->
            <div class="form-group">
              <label for="remainCancelPossibleAmt" class="col-lg-2">부분취소 잔여금액(kcp)</label>
              <div class="col-lg-10">
                <input name="remainCancelPossibleAmt" class="form-control" placeholder="부분취소 잔여금액" value="0">
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
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "AuthCardKmpi",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      sticky: false,
      activeIndex: 4, // GNB 활성화
      form: {
          payCompany: "SMARTRO",
          deviceType: "PC",
          cardCode: "25",
          payApvlSellerId: '00927812446',
          payApvlChainNo: '00927812446',
          payPopsize: 'Y',
          mid: 'CT00001',
          ordId: "",
          decryptHashKey: "",
          ansimMid: '',
          businesstype: 'M',
          businessno: '',
          mobile: 'N',
          apvlSellerIdLt: '',
          subApvlSellerIdLt: '',
          apvlSsUseyn: 'N',
          pay: 'ACS',
          pan: '4599000000000000',
          payPan: '4599000000000000',
          expiry: '',
          amount: '',
          description: 'none',
          currency: '410',
          deviceCategory: '0',
          name: 'GSfresh',
          url: 'http://www.gsfresh.com',
          country: '410',
          useactivex: 'N',
          returnUrl: '',
          failreturn: 'Y',
          hostid: '',
          hostpwd: '',
          apvlChainNo: '',
          apvlSellerId: '',
          apvlHalbu: '',
          popsize: 'Y',
          usimYn: '',
          actionUrl: '',
          hashKey: '',
          paymentMid: 'gsstore01m',
          authType: 'KMPI'
      },
      rsform: {
        authType: "03",
        cardNo: "",
        /* amt: "",
        goodsName: "",
        goodsCnt: "1",
        buyerName: "",
        buyerTel: "010000000000", */
        cavv: "",
        xid: "",
        eci: "",
        joinCode: "",
        encXid: "",
        cardCompany: "",
        ssUseyn: "",
        savekind: "",
        ssUseynKe: "",
        rsltAuthType: "", // result auth type
        realPan: "",
        errCode: ""
      }
    };
  },
  mixins: [
    CommAuth
  ],
  metaInfo: {
    title: '통합인증/결제 Test Suite - Responsive',
    titleTemplate: '신용카드 > [KMPI]'
  },
  components: {
    PaSmTopMenu,
    PaSmFooter
  },
  mounted: async function() {
    this.init();
    const that = this;
    const authType = this.rsform.authType;
    window.callbackFnc = function(hashKey) {
      console.log(that.form);
      ApiUtils
        .post('/fo/pa/kmpiAuthCallback', {hashKey: hashKey})
        .then(res => {
          document.getElementById('frame_div').style.display = 'none';
          if (res.data === null || res.data.resultCode !== '0000') {
            console.error(res.data.resultMsg);
            alert('인증결과를 불러올 수 없습니다. 로그를 확인해주세요.');
            return;
          }
          that.rsform = res.data;
          that.rsform.authType = authType;
        }
      );
    };
  },
  methods: {
    changeOption() {
      this.init();
    },
    payCompanyChangeOption() {
      const paycompany = this.form.payCompany;
      if (paycompany === "SMARTRO") {
        this.form.paymentMid = "gsstore01m";
      } else {
        this.form.paymentMid = "AO03V"; // "T0000";
      }
    },
    async init() {
      const formData = this.form;
      const cardCode = formData.cardCode;
      const mid = formData.paymentMid;
      const authType = formData.authType;
      /**
       *카드사가 선택되지 않았을 경우.
       */
      if ( StringUtils.isEmpty(cardCode) ) {
        formData.cardCode = "25";
      }
      const data = {
        authType: authType,
        cardCode: cardCode,
        cmmMbrNo: kmpiForm.memNo.value
      };
      const that = this;
      await ApiUtils.post('/fo/pa/cardInitAuth' + ((formData.deviceType === "PC") ? "Pc" : "Mob"), data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          console.error(res.data);
          alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        console.log(res.data);
        that.form = res.data;
        if (formData.deviceType !== 'PC') {
          that.form.actionUrl = res.data.actionUrlMob;
          that.form.returnUrl = res.data.returnUrlMob;
          kmpiForm.order_business.value = that.form.subApvlSellerIdLt;
          that.form.ansimMid = res.data.ansimMid;
          that.form.businessno = res.data.bizNo;
        }
        that.form.cardCode = cardCode;
        that.form.deviceType = formData.deviceType;
        that.form.authType = authType;
        that.form.name = "gsfresh";
        that.form.returnUrl = that.form.returnUrl+".hashKey_"+res.data.hashKey;
        that.form.paymentMid = mid;
        that.form.ordId = res.data.ordId;
        that.form.decryptHashKey = res.data.decryptHashKey;
        if (cardCode === '05') { // keb
          that.form.apvlChainNo = that.form.payApvlChainNo;
          that.form.apvlSellerId = that.form.payApvlSellerId;
          that.form.apvlHalbu = kmpiForm.pay_apvl_halbu.value;
          that.form.popsize = that.form.payPopsize;
        }
        if (res.data.payCompany === "KCP") {
          that.form.paymentMid = "AO03V"; // "T0000";
        }
      });
    },
    async doCancel() {
      let deviceType = "";
      // const rsltForm = document.getElementById('rsltForm');
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let cancelType = "0";
      if (rsltForm.cancelType.value === "PART") {
        cancelType = "1";
      }
      let data;
      if (cancelType === "1") {
        let tax = 0;
        if ( StringUtils.isEmpty(rsltForm.modMny.value) ) {
          alert("부분취소 금액을 입력하세요");
          return;
        }
        if (this.form.payCompany === "KCP") {
          if ( StringUtils.isEmpty(rsltForm.taxFreeCancelAmt.value) ) {
            alert("부분취소 금액(비과세금액)을 입력하세요");
            return;
          }
          rsltForm.taxableCancelAmt.value = Math.round((rsltForm.modMny.value - rsltForm.taxFreeCancelAmt.value) / 1.1);
          tax = rsltForm.modMny.value - parseInt(rsltForm.taxableCancelAmt.value);
          rsltForm.tax.value = tax;
          // const modMny = parseInt(rsltForm.taxableCancelAmt.value) + tax + parseInt(rsltForm.taxFreeCancelAmt.value);
        }
        data = {
          deviceType: deviceType,
          tid: rsltForm.TID.value,
          cancelAmt: rsltForm.modMny.value,
          cancelMsg: '취소메세지',
          partialCancelCode: cancelType,
          mid: this.form.paymentMid,
          ordId: this.form.ordId,
          payCorp: this.form.payCompany,
          taxableCancelAmt: rsltForm.taxableCancelAmt.value,
          tax: tax,
          taxFreeCancelAmt: rsltForm.taxFreeCancelAmt.value,
          remainCancelPossibleAmt: rsltForm.remainCancelPossibleAmt.value
        };
      } else {
        data = {
          deviceType: deviceType,
          tid: rsltForm.TID.value,
          cancelAmt: kmpiForm.purchase_amount.value,
          cancelMsg: '취소메세지',
          partialCancelCode: cancelType,
          mid: this.form.paymentMid,
          ordId: this.form.ordId,
          payCorp: this.form.payCompany,
        };
      }
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
            alert('결제 취소 중 에러가 발생하였습니다.['+res.data.resultMsg+']');
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
      // const kmpiForm = document.getElementById('kmpiForm');
      let deviceType = "";
      if (this.form.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }
      let smartroCardCode = "";
      if (this.form.cardCode === "25") {
        smartroCardCode = "16";
      } else if (this.form.cardCode === "05") {
        smartroCardCode = "03";
      } else if (this.form.cardCode === "53") {
        smartroCardCode = "11";
      }
      const amt = kmpiForm.pay_ansim_price.value;
      if ( StringUtils.isEmpty(kmpiForm.taxFreeAmt.value) ) {
          alert("면세대상금액을 입력해주세요.");
          return;
      } else {
        kmpiForm.taxableAmt.value = Math.round((amt - kmpiForm.taxFreeAmt.value) / 1.1);
        kmpiForm.tax.value = amt - kmpiForm.taxableAmt.value;
      }
      const data = {
        deviceType: deviceType,
        amt: kmpiForm.pay_ansim_price.value,
        goodsName: kmpiForm.orderGoods.value,
        goodsCnt: "1",
        buyerName: "홍길동",
        buyerTel: "010000000000",
        mallUserID: kmpiForm.memNo.value,
        authType: this.rsform.authType,
        cardInterest: "0",
        cardQuota: "00",
        cardNo: this.rsform.realPan,
        xid: this.rsform.xid,
        eci: this.rsform.eci,
        cavv: this.rsform.cavv,
        joinCode: '',
        formBankCd: smartroCardCode,
        mid: this.form.paymentMid,
        ordId: this.form.ordId,
        payCorp: this.form.payCompany,
        taxableAmt: kmpiForm.taxableAmt.value,
        tax: kmpiForm.tax.value,
        taxFreeAmt: kmpiForm.taxFreeAmt.value
      };
      console.log("data : ", data);
      await ApiUtils
        .post("/fo/pa/reqApprCard" + ((this.form.deviceType === "PC") ? "Pc" : "Mob"), data)
        .then(res => {
          let isFail = false;
          if (res.data === null || (res.data.resultCode !== '3001' && res.data.resultCode !== '7001' && res.data.resultCode !== "0000")) {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data);
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('결제 승인 중 에러가 발생하였습니다.');
          } else {
            rsltForm.reset();
            rsltForm.TID.value = res.data.tid;
            if (this.form.payCompany === "KCP") {
              rsltForm.remainCancelPossibleAmt.value = kmpiForm.pay_ansim_price.value;
            }
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
