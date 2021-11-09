<template>
  <section class="section-area">
    <div class="sub-title border mb0">
      <h2>할인정보</h2>
    </div>
    <div class="sub-inner-box">
      <ul class="discount-list">
        <li>
          <p>
            <span class="discount-tit">
              <strong>배송비/장바구니 쿠폰</strong>
              <span class="point coupon">사용할 수 있는 쿠폰이 있습니다.</span>
            </span>
            <span class="discount-point">
              <span class="txt-use">
                <input type="number" value="0" class="inp-txt" readonly title="배송비, 장바구니 쿠폰 사용할 금액">
                <span class="txt-p">원</span>
              </span>
              <button type="button" class="btn-border btn-bg" aria-label="배송비/장바구니 쿠폰 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive">사용</button> <!-- 수정 START : 2020.02.10 텍스트 변경 (버튼명 변경 조회 -> 사용) -->
            </span>
          </p>
        </li>
        <li>
          <p>
            <span class="discount-tit">
              <strong>GS&amp;POINT</strong>
              <span class="point">보유 {{toComma(gsNPointRestPt)}}P</span>
            </span>
            <span class="discount-point">
              <span class="txt-use">
                <input type="number" id="gsNPointDcAmt" name="gsNPointDcAmt" value="0" v-model="gsNPointDcAmt" class="inp-txt" v-on:blur="checkGsNPoint()" title="GS&amp;POINT 사용할 포인트">
                <span class="txt-p">P</span>
              </span>
              <button type="button" class="btn-border btn-bg" v-if="gsNPointDcAmt == 0 || gsNPointDcAmt == ''">사용</button>
              <button type="button" class="btn-border btn-bg" v-if="gsNPointDcAmt > 0" @click="cnclGsNPoint()">취소</button>
            </span>
          </p>
        </li>
        <li>
          <p>
            <span class="discount-tit">
              <strong>THE POP리워즈</strong>
              <span class="point">보유 {{toComma(totExntSchedReward)}}점</span>
            </span>
            <span class="discount-point">
              <span class="txt-use">
                <input type="number" name="popRwdDcAmt" id="popRwdDcAmt" v-model="popRwdDcAmt" value="0" class="inp-txt" v-on:blur="checkThePopRewards()" title="THE POP리워즈 사용할 포인트">
                <span class="txt-p">점</span>
              </span>
              <button type="button" class="btn-border btn-bg" v-if="popRwdDcAmt == 0 || popRwdDcAmt == ''">사용</button>
              <button type="button" class="btn-border btn-bg" v-if="popRwdDcAmt > 0" @click="cnclThePopRewards()">취소</button>
            </span>
          </p>
        </li>
        <li>
          <p>
            <span class="discount-tit">
              <strong>통신사 할인(KT/LG U+)</strong>
            </span>
            <span class="discount-point">
              <span class="txt-use">
                <input type="number" value="0" v-model="resPntForm.discountAmt" class="inp-txt" readonly title="통신사 할인(KT/LG U+) 사용할 금액">
                <span class="txt-p">원</span>
              </span>
              <button type="button" class="btn-border btn-bg btn-small" aria-label="통신사 할인 더보기" aria-haspopup="dialog" @click="toggleShow" v-if="showTelcoBtn === 'USE'">사용</button> <!-- 수정 START : 2020.02.10 텍스트 변경 (버튼명 변경 조회 -> 사용) -->
              <button type="button" class="btn-border btn-bg btn-small" aria-label="통신사 할인 더보기" aria-haspopup="dialog" @click="toggleShow" v-if="showTelcoBtn === 'CNL'">취소</button>
            </span>
          </p>
          <!-- START : 통신사 할인내용 -->
          <div class="mobile-type" v-if="showMobile === 'show'">
            <p class="select-mobile-type">
              <span class="inp-radio small w125">
                <input type="radio" name="deviceType" id="mobile1" value="KT" v-model="reqPntForm.telcoType" checked @click="selectMobileType"> <!-- value="kt" 값에따라 하단 v-if="selectType === 'kt'" 내용 변경 -->
                <label for="mobile1"><span class="ico-sns icon-kakaotalk"></span>KT 할인</label>
              </span>
              <span class="inp-radio small w125">
                <input type="radio" name="deviceType" id="mobile2" value="LGU" v-model="reqPntForm.telcoType" @click="selectMobileType"> <!-- value="lgu" 값에따라 하단 v-if="selectType === 'lgu'" 내용 변경 -->
                <label for="mobile2"><span class="ico-sns icon-sms"></span>LG U+할인</label>
              </span>
            </p>
            <div class="mobile-info-content">
              <!-- START :  -->
              <p class="card-number">
                <label for="cardNo1">카드번호</label>
                <input type="number"  min="0" max="9999" maxlength="4" name="cardNo1" id="cardNo1" class="inp-txt" v-model="reqPntForm.cardNo1" value="" @keyup="checkNumberLength(reqPntForm.cardNo1, '1', 4)" title="통신사 카드 앞자리">
                <input type="password" maxlength="4" id="cardNo2" class="inp-txt" name="cardNo2" v-model="reqPntForm.cardNo2" value="" @keyup="numberOnly(reqPntForm.cardNo2, '2')" title="통신사 카드 두번째 자리">
                <input type="password" maxlength="4" id="cardNo3" class="inp-txt" name="cardNo3" v-model="reqPntForm.cardNo3" value="" @keyup="numberOnly(reqPntForm.cardNo3, '3')"  title="통신사 카드 세번째 자리">
                <input type="number" min="0" max="9999" id="cardNo4" class="inp-txt" name="cardNo4" v-model="reqPntForm.cardNo4" value="" @keyup="checkNumberLength(reqPntForm.cardNo4, '4', 4)" title="통신사 카드 마지막 자리">
              </p>
              <!-- END  -->
              <p class="my-birth">
                <label for="birth">생년월일</label>
                <input type="number" min="19000101" max="21001231" id="birth" class="inp-txt" v-model="reqPntForm.birthDay" value="" title="생년월일" placeholder="YYYYMMDD" @keyup="checkNumberLength(reqPntForm.birthDay, 'B', 8)">
                <button type="button" class="btn-border btn-bg btn-small" @click="reqRetrievePnt()">확인</button>
              </p>
              <p class="point"><label for="my-point">보유 포인트  <strong>{{toComma(resPntForm.remainLimit)}}P</strong></label> <em v-if="resPntForm.remainLimit != '' && resPntForm.remainLimit < 3000">3,000P 미만으로 사용 불가합니다</em></p>
              <!-- <p class="my-point">
                <input type="number" id="my-point" class="inp-txt" value="0" v-model="usePoint" title="사용할 포인트" placeholder="사용 포인트 입력" @keyup="computeDcSum()">
                <span class="inp-chk small">
                  <input type="checkbox" name="usePoint" id="agreePoint" value="">
                  <label for="agreePoint">모두 사용</label>
                </span>
              </p> -->
              <ul class="txt-info-list">
                <li class="ico-alert2">당일/새벽배송상품 5만원 이상 구매 시 3,000P 사용 가능</li>
                <li class="ico-alert2">행사상품 합계 : <strong class="point">{{toComma(totAmt)}}원</strong></li>
                <li class="ico-alert2">
                  결제 횟수 한도 :
                  <span v-if="selectType === 'KT'">일 1회, 일반 할인 월1회</span> <!-- kt -->
                  <span v-if="selectType === 'LGU'">일 1회, 월 횟수 제한 없음</span> <!-- LGU+ -->
                </li>
                <li class="ico-alert2">할인 제외상품 : 주류/상품권/종량제 봉투/업체 택배상품 외 기타</li>
                <li class="ico-alert2">기타문의 :
                  <span v-if="selectType === 'KT'">KT 고객센터 무선 114(무료), 유선 100(유료)</span> <!-- kt -->
                  <span v-if="selectType === 'LGU'">LGU+ 고객센터 무선 114(무료), 유선 1544-0010(유료)</span> <!-- LGU+ -->
                  <span class="txt-indent">GS fresh 고객센터 1661-2562(유료)</span>
                </li>
                <li class="ico-alert2">통신사 할인 적용된 건은 부분 취소가 안되며, 전체 취소 후 재결제를 해야 합니다.</li>
              </ul>
            </div>
          </div>
          <!-- END : 통신사 할인내용 -->
        </li>
        <li class="select">
          <!-- 수정 START : 2020.02.13 즉시할인 카드 삭제 -->
          <p class="card-point">
            <strong>카드즉시할인</strong>
            <!-- START : 선택한 카드가 있을 경우 -->
            <span class="point-num" v-if="choiceDcCardFlag"><strong>-{{toComma(crcoEvntInfo.evetDcAmt)}}</strong> 원</span>
            <!-- END : 선택한 카드가 있을 경우 -->
          </p>
          <p class="wrap-select w100 credit-card">
            <button type="button" class="btn-arrow" aria-label="카트즉시할인 팝업 활성화" aria-haspopup="dialog" @click="popupCardList" v-if="choiceDcCardFlag"><span class="icon-card" v-if="crcoEvntInfo.crcoCd != '99'"><img v-bind:src="getImgNm(crcoEvntInfo.crcoCd)" v-bind:alt="crcoEvntInfo.crcoCd"></span>{{crcoEvntInfo.crcoNm}}</button> <!-- 선택한 카드가 있을 경우 -->
            <button type="button" class="btn-arrow" aria-label="카트즉시할인 팝업 활성화" aria-haspopup="dialog" @click="popupCardList" v-else>카드를 선택해 주세요.</button> <!-- 선택한 카드가 없을 경우 -->
          </p>
        </li>
      </ul>
    </div>
    <PopupDeliveryCoupon @popupEvent="popupAction" v-if="this.popup.popupDeliveryCoupon" /> <!-- 팝업 - 배송지, 장바구니 쿠폰 -->
    <PopupCardOption @popupEvent="popupAction" :crcoEvntInfo="crcoEvntInfo" @choiceCardInfoEvent="choiceCardInfoEvent" v-if="this.popup.popupCardOption" /> <!-- 팝업 - 카드즉시할인 -->
  </section>
</template>

<script>
import PopupDeliveryCoupon from '@/views/od/PopupDelvCartCpnList'; // 팝업 - 배송비장바구니 쿠폰
// import PopupDeliveryCoupon from '@/views/od/PopupDelvCartCpnNoneList'; // 팝업 - 배송비장바구니 쿠폰없음
import PopupCardOption from '@/views/od/PopupCardDcList'; // 팝업 - 카드즉시할인
import NumberUtils from '@/common/NumberUtils';
import ApiUtils from '@/common/ApiUtils';
import CommAuth from '@/views/pa/common/CommAuth';
import StringUtils from '@/common/StringUtils';
import OrderSheet from '@/common/od/OrderSheet';
export default {
  props: {
    totAmt: Number,
  },
  name: "DiscountInfo",
  data() {
    return {
      showMobile: 'hide', // 통신사할인 더보기
      selectType: 'KT', // 통신사 할인 타입
      popup: { // 팝업
        open: false,
        popupDeliveryCoupon: false, // 장바구니 배송비 쿠폰
        popupCardOption: false, // 카드 즉시할인
      },
      choiceDcCardFlag: false,
      crcoEvntInfo: {
        crcoCd: '',
        crcoNm: '',
        evetDcAmt: 0,
        cardPrfxNo: ''
      }, // 카드즉시할인
      gsNPointDcAmt: 0, // GS&POINT 할인
      gsNPointRestPt: 0, // 사용가능한 GS&POINT(총잔여포인트)
      gsNPointFlag: false,
      usePoint: 0, // 통신사 할인
      popRwdDcAmt: 0, // POP 리워즈 할인
      totExntSchedReward: 0, // 사용가능한 The POP 리워즈
      popRwdFlag: false,
      totalDcAmt: 0, // 총 할인금액
      showTelcoBtn: 'USE',
      reqPntForm: {
        deviceType: "MOB",
        custNo: "19951201", // TO-DO 회원번호 수정
        telcoType: "KT",
        gid: "",
        mid: "",
        ktGid: "",
        ktMid: "",
        goodsName: "",
        ktNormalDcCode: "",
        ktDoubleDcCode: "",
        lgupGid: "",
        lgupMid: "",
        birthDay: "",
        cardNo1: "",
        cardNo2: "",
        cardNo3: "",
        cardNo4: "",
        reqUrl: "",
        pcReqUrl: "",
        mobReqUrl: "",
        amt: 0,
        discountAmt: 0,
        payMethod: "TELMBRINFO"
      },
      resPntForm: {
        deviceType: "MOB",
        telcoType: "KT",
        resultCode: "",
        resultMsg: "",
        ordId: "",
        tid: "",
        authDate: "",
        authCode: "",
        transMessageNo: "",
        messageCode: "",
        transDate: "",
        cardNo: "",
        discountAmt: 0,
        remainLimit: "",
        remainLimitOverflow: "",
        userGrade: "",
        remainCountOfDay: "",
        remainCountOfMonth: "",
        remainCountOfAnnual: "",
        remainCountVipOfDay: "",
        remainCountVipOfMonth: "",
        remainCountVipOfAnnual: "",
        payMethod: "TELMBRPAY"
      }
    };
  },
  mixins: [
    CommAuth
  ],
  components: {
    PopupDeliveryCoupon, // 팝업 - 배송비 장바구니 쿠폰
    PopupCardOption, // 팝업 - 카드즉시할인
  },
  methods: {
    // 팝업
    popupAction(type) { // 팝업 활성/비활성
      this.popup[type] = !this.popup[type];
      this.popup.open = !this.popup.open;
    },
    popupCouponActive() {
      this.popupAction('popupDeliveryCoupon');
    },
    popupCardList() {
      this.popupAction('popupCardOption');
    },
    // 통신사할인 더보기
    toggleShow() {
      if (this.showMobile === 'hide') {
        this.showMobile = 'show';
        this.showTelcoBtn = 'CNL';
        this.telcoDcInit(); // 통신사 할인 기본 세팅정보 조회
      } else {
        this.showMobile = 'hide';
        this.showTelcoBtn = 'USE';
        this.resPntForm.discountAmt = 0;
        this.computeDcSum(); // 통신사할인 취소시 0원으로 다시 전송한다.
      }
    },
    // 통신사 할인 타입 변경
    selectMobileType(event) {
      const $this = event.target;
      this.selectType = $this.value;
      this.telcoType.telcoType = $this.value;
      const formData = this.reqPntForm;
      if ($this.value == "KT") { // 통신사 변경시 카드번호 초기화
        this.reqPntForm.cardNo1 = "";
        this.reqPntForm.cardNo2 = "";
        this.reqPntForm.cardNo3 = "";
        this.reqPntForm.cardNo4 = "";
        formData.gid = formData.ktGid;
        formData.mid = formData.ktMid;
        formData.goodsName = formData.ktNormalDcCode; // KT 더블할인 프로모션은 계약기간 만료로 인해 일반할인으로 고정
      } else {
        this.reqPntForm.cardNo1 = "20";
        this.reqPntForm.cardNo2 = "";
        this.reqPntForm.cardNo3 = "";
        this.reqPntForm.cardNo4 = "";
        formData.gid = formData.lgupGid;
        formData.mid = formData.lgupMid;
        formData.goodsName = "";
      }
      // console.log(this.reqPntForm);
    },
    // 카드사행사(카드사할인혜택) 이벤트
    choiceCardInfoEvent: function(crcoEvntInfo) {
      this.crcoEvntInfo = crcoEvntInfo;
      if (this.crcoEvntInfo != "") {
        this.choiceDcCardFlag = true;
      } else {
        this.choiceDcCardFlag = false;
      }
      this.computeDcSum();
    },
    // 할인정보 통합 계산
    computeDcSum() {
      // console.log("this.resPntForm.discountAmt : ", this.resPntForm.discountAmt);
      this.totalDcAmt = parseInt(this.gsNPointDcAmt) + parseInt(this.popRwdDcAmt) + parseInt(this.resPntForm.discountAmt) + parseInt(this.crcoEvntInfo.evetDcAmt);
      this.$emit('orderSheetDcAmtEvent', this.gsNPointDcAmt, this.popRwdDcAmt, this.resPntForm, this.crcoEvntInfo, this.totalDcAmt);
    },
    // GS&POINT 조회
    async gsNPoint() {
      const params = { // TO-DO 수정필요
        custNo: 'E000045135680',
        divCode: 'E',
        storeCode: 'E0000',
      };
      const gsNPointResult = await ApiUtils.get('/fo/cu/mbrmgnt/gs-point', params);
      this.gsNPointRestPt = gsNPointResult.data.data.totRestPt;
    },
    // 보유 GS&POINT 체크
    checkGsNPoint() {
      if (this.gsNPointDcAmt > this.gsNPointRestPt) {
        alert("보유한 포인트보다 사용하는 포인트가 더 많습니다.");
        this.gsNPointDcAmt = 0;
        return false;
      } else {
        this.computeDcSum();
      }
    },
    // GS&POINT 사용취소
    cnclGsNPoint() {
      this.gsNPointDcAmt = 0;
    },
    // THE POP리워즈 조회
    async thePopRewards() {
      const params = { // TO-DO 수정필요
        custNo: 'TZ00009444102',
      };
      const thePopRewardsResult = await ApiUtils.get('/fo/cu/mbrmgnt/rewards', params);
      // console.log("thePopRewardsResult : ", thePopRewardsResult);
      this.totExntSchedReward = thePopRewardsResult.data.data.totExntSchedReward;
    },
    // 보유 POP 리워즈 체크
    checkThePopRewards() {
      if (this.popRwdDcAmt > this.totExntSchedReward) {
        alert("보유한 THE POP 리워즈보다 사용하는 THE POP 리워즈가 더 많습니다.");
        this.popRwdDcAmt = 0;
        return false;
      } else {
        this.computeDcSum();
      }
    },
    // THE POP 리워즈 사용취소
    cnclThePopRewards() {
      this.popRwdDcAmt = 0;
    },
    // 통신사 카드할인 기본 파라메터 조회
    async telcoDcInit() {
      const formData = this.reqPntForm;
      await ApiUtils
        .post('/fo/pa/telcoDcInitAuth', {})
        .then(res => {
          formData.ktGid = res.data.telcoDcKtGid;
          formData.ktMid = res.data.telcoDcKtMid;
          formData.ktNormalDcCode = res.data.telcoDcKtNormalDcCode;
          formData.ktDoubleDcCode = res.data.telcoDcKtDoubleDcCode;
          formData.lgupGid = res.data.telcoDcLgupGid;
          formData.lgupMid = res.data.telcoDcLgupMid;
          formData.pcReqUrl = res.data.telcoDcPcPayUrl;
          formData.mobReqUrl = res.data.telcoDcMobPayUrl;
          if (formData.deviceType === "PC") {
            formData.reqUrl = res.data.telcoDcPcPayUrl;
          } else {
            formData.reqUrl = res.data.telcoDcMobPayUrl;
          }

          if (formData.telcoType === "KT") {
            formData.gid = res.data.telcoDcKtGid;
            formData.mid = res.data.telcoDcKtMid;
            formData.goodsName = res.data.telcoDcKtNormalDcCode; // KT 더블할인 프로모션은 계약기간 만료로 인해 일반할인으로 고정
          } else {
            formData.gid = res.data.telcoDcLgupGid;
            formData.mid = res.data.telcoDcLgupMid;
            formData.goodsName = "";
          }
      });
    },
    // 통신카드 할인 보유포인트 조회(KT, LGU+)
    async reqRetrievePnt() {
      const formData = this.reqPntForm;
      const custNo = formData.custNo;
      const telcoType = formData.telcoType;
      const gid = formData.gid;
      const mid = formData.mid;
      const goodsName = formData.goodsName;
      const birthDay = formData.birthDay;
      const cardNo1 = formData.cardNo1;
      const cardNo2 = formData.cardNo2;
      const cardNo3 = formData.cardNo3;
      const cardNo4 = formData.cardNo4;
      const amt = formData.amt;
      const reqUrl = formData.reqUrl;
      if (StringUtils.isEmpty(custNo)) {
        // alert("회원번호을 입력해주세요.");
        return;
      }
      if (StringUtils.isEmpty(telcoType)) {
        alert("통신사를 선택해주세요.");
        return;
      }
      if (StringUtils.isEmpty(gid)) {
        // alert("gid를 입력해주세요.");
        return;
      }
      if (StringUtils.isEmpty(mid)) {
        // alert("mid를 입력해주세요.");
        return;
      }
      // if (formData.telcoType === "KT" && StringUtils.isEmpty(goodsName)) {
      //   alert("KT 할인 프로모션 코드를 입력해주세요.");
      //   return;
      // }
      if (StringUtils.isEmpty(cardNo1) || StringUtils.isEmpty(cardNo2) || StringUtils.isEmpty(cardNo3) || StringUtils.isEmpty(cardNo4)) {
        alert("카드번호를 입력해주세요.");
        return;
      }
      if (StringUtils.isEmpty(birthDay)) {
        alert("생년월일을 입력해주세요.");
        return;
      }
      // if (StringUtils.isEmpty(reqUrl)) {
      //   alert("reqUrl을 입력해주세요.");
      //   return;
      // }
      // if (StringUtils.isEmpty(amt)) {
      //   alert("총구매금액을 입력해주세요.");
      //   return;
      // }
      // if (StringUtils.isEmpty(discountAmt)) {
      //   alert("할인대상금액을 입력해주세요.");
      //   return;
      // }
      let deviceType = "";
      if (formData.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      let url = "";
      if (formData.telcoType === "KT") {
        url = "/fo/pa/retrieveKtDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      } else {
        url = "/fo/pa/retrieveLguplusDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      }

      const data = {
        deviceType: deviceType,
        userId: formData.userId,
        telcoType: telcoType,
        birthDay: formData.birthDay.substring(2),
        cardNo: formData.cardNo1 + formData.cardNo2 + formData.cardNo3 + formData.cardNo4,
        amt: formData.amt,
        discountAmt: formData.discountAmt,
        payMethod: formData.payMethod,
        goodsName: formData.goodsName
      };
      await ApiUtils
        .post(url, data)
        .then(res => {
          if (res.data !== null) {
            this.resPntForm = res.data;
          }
          // console.log(res.data);
          // 조회한 포인트에 따라 사용금액 처리
          if (this.totAmt > 50000) {
            if (this.resPntForm.remainLimit < 3000) {
              this.resPntForm.discountAmt = this.resPntForm.remainLimit;
            } else {
              this.resPntForm.discountAmt = 3000;
            }
          } else {
            this.resPntForm.discountAmt = 0;
          }
          this.resPntForm.telcoType = this.reqPntForm.telcoType;
          this.computeDcSum();
        });
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    getImgNm: function (cd) {
      // 이미지가 바로 로딩이 안되기 때문에 require를 사용하여 이미지를 랜더링하여야 함.
      return require('@/assets/images/icon/icon_card_logo'+cd+'.png');
    },
    // 숫자만 입력 가능
    numberOnly(str, gbn) {
      const temp = OrderSheet.numberOnly(str);
      if (gbn === '2') {
        this.reqPntForm.cardNo2 = temp;
      } else if (gbn === '3') {
        this.reqPntForm.cardNo3 = temp;
      }
    },
    // 자리수체크
    checkNumberLength(str, gbn, len) {
      if (str.length > len) {
        const temp = str.substring(0, len);
        if ( gbn === '1') {
          this.reqPntForm.cardNo1 = temp;
        } else if (gbn === '4') {
          this.reqPntForm.cardNo4 = temp;
        } else if (gbn === 'B') {
          this.reqPntForm.birthDay = temp;
        }
      }
    },
  },
  destroyed() {
  },
  mounted() {
    this.gsNPoint(); // GS&POINT 조회
    this.thePopRewards(); // THE POP 리워즈 조회
  },
};
</script>
