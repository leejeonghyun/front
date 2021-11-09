<template>
  <section class="section-area">
    <div class="sub-title border mb0">
      <h2><strong class="bg-line-brush">할인정보</strong></h2>
    </div>
    <div class="sub-inner-box">
      <ul v-if="crmNoticeTextFlag" class="payment-notice discount">
        <li>
          <span class="price red" v-for="crmNoticeInfo in payNoticeList" v-bind:key="crmNoticeInfo.notiSeqno" v-html="crmNoticeInfo.notiCnts"></span>
        </li>
      </ul>
      <ul class="discount-list">
        <li>
          <p>
            <span class="discount-tit">
              <strong>배송비/장바구니 쿠폰</strong>
              <span class="point coupon" v-if="couponChk()">사용할 수 있는 쿠폰이 있습니다.</span>
              <span class="point coupon" v-else>사용할 수 있는 쿠폰이 없습니다.</span>
            </span>
            <span class="discount-point" v-if="couponChk()">
              <span class="txt-use">
                <input type="number" :value="dlfeeCpnDcAmt+bsktCpnDcAmt" class="inp-txt" readonly title="배송비, 장바구니 쿠폰 사용할 금액">
                <span class="txt-p">원</span>
              </span>
              <button class="btn-border btn-bg" aria-label="배송비/장바구니 쿠폰 팝업 활성화" aria-haspopup="dialog" @click="popupCouponActive">사용</button> <!-- 수정 START : 2020.02.10 텍스트 변경 (버튼명 변경 조회 -> 사용) -->
            </span>
          </p>
        </li>
        <li v-if="fstOrdInfo && fstOrdInfo.ordSumCnt == 0">
          <p class="new-signup-event">
            <span class="discount-tit">
              <strong>신규가입 무료배송안내</strong>
              <span class="signup-event-txt">신규가입 <strong class="point">{{fstOrdInfo.fstVisitDttm}}</strong>까지 새벽배송 / 당일배송만 <strong class="point">{{toComma(fstOrdInfo.dlfeeStandFreeAmt)}}원 이상 무료 배송</strong></span>
            </span>
          </p>
        </li>
        <li>
          <p v-if="mbrGrd">
            <span class="discount-tit">
              <strong>GS&amp;POINT</strong>
              <span class="point">보유 {{toComma(gsNPointRestPt)}}P</span>
            </span>
            <span class="discount-point">
              <span class="txt-use">
                <input v-if="crmNoticeTextFlag" type="number" min="0" id="gsNPointDcAmt" name="gsNPointDcAmt" v-model.number="gsNPointDcAmt" class="inp-txt" disabled="disabled" title="GS&amp;POINT 사용할 포인트">
                <input v-else type="number" min="0" id="gsNPointDcAmt" name="gsNPointDcAmt" v-model.number="gsNPointDcAmt" class="inp-txt" v-on:blur="checkGsNPoint()" title="GS&amp;POINT 사용할 포인트">
                <span class="txt-p">P</span>
              </span>
              <button class="btn-border btn-bg" v-if="gsNPointDcAmt == 0 || gsNPointDcAmt == ''">사용</button>
              <button class="btn-border btn-bg" v-if="gsNPointDcAmt > 0" @click="cnclGsNPoint()">취소</button>
              <br>
              <span class="inp-chk bg">
                <input v-if="crmNoticeTextFlag" type="checkbox" name="allUsegsNPnt" id="allUsegsNPnt" v-model="allUsegsNPnt" disabled="disabled" >
                <input v-else type="checkbox" name="allUsegsNPnt" id="allUsegsNPnt" v-model="allUsegsNPnt" v-on:click="gsNPntUseAll($event)">
                <label for="allUsegsNPnt">모두사용</label>
              </span>
            </span>
          </p>
          <p v-if="!mbrGrd">
            <span class="discount-tit">
              <strong>GS&amp;POINT</strong>
            </span>
            <span class="discount-point">
              <button class="btn icon-question" aria-label="통합회원가입 팝업 활성화" aria-haspopup="dialog" @click="popupTotMbrInfoActive('gsnpnt')"></button><button @click="goAssociate()" class="btn-bg darkgray" >통합회원 가입하기</button>
            </span>
          </p>
        </li>
        <li>
          <p v-if="mbrGrd">
            <span class="discount-tit">
              <strong>THE POP리워즈</strong>
              <span class="point">보유 {{toComma(restReward)}}점</span>
            </span>
            <span class="discount-point">
              <span class="txt-use">
                <input v-if="crmNoticeTextFlag" type="number" min="0" name="popRwdDcAmt" id="popRwdDcAmt" v-model.number="popRwdDcAmt" value="0" class="inp-txt" disabled="disabled" title="THE POP리워즈 사용할 포인트">
                <input v-else type="number" min="0" name="popRwdDcAmt" id="popRwdDcAmt" v-model.number="popRwdDcAmt" value="0" class="inp-txt" v-on:blur="checkThePopRewards()" title="THE POP리워즈 사용할 포인트">
                <span class="txt-p">점</span>
              </span>
              <button class="btn-border btn-bg" v-if="popRwdDcAmt == 0 || popRwdDcAmt == ''">사용</button>
              <button class="btn-border btn-bg" v-if="popRwdDcAmt > 0" @click="cnclThePopRewards()">취소</button>
              <br>
              <span class="inp-chk bg">
                <input v-if="crmNoticeTextFlag" type="checkbox" name="allUsePopRwd" id="allUsePopRwd" v-model="allUsePopRwd" disabled="disabled" v-on:click="popRwdsUseAll($event)">
                <input v-else type="checkbox" name="allUsePopRwd" id="allUsePopRwd" v-model="allUsePopRwd" v-on:click="popRwdsUseAll($event)">
                <label for="allUsePopRwd">모두사용</label>
              </span>
            </span>
          </p>
          <p v-if="!mbrGrd">
            <span class="discount-tit">
              <strong>THE POP리워즈</strong>
            </span>
            <span class="discount-point">
              <button class="btn icon-question" aria-label="통합회원가입 팝업 활성화" aria-haspopup="dialog" @click="popupTotMbrInfoActive('poprwds')"></button><button @click="goAssociate()" class="btn-bg darkgray" >통합회원 가입하기</button>
            </span>
          </p>
        </li>
        <li v-if="usePntDisCountYn">
          <p>
            <span class="discount-tit">
              <strong>통신사 할인(KT/LG U+)</strong>
            </span>
            <span class="discount-point">
              <span class="txt-use">
                <input type="number" value="0" v-model="resPntForm.discountAmt" class="inp-txt" readonly title="통신사 할인(KT/LG U+) 사용할 금액">
                <span class="txt-p">원</span>
              </span>
              <button class="btn-border btn-bg btn-small" aria-label="통신사 할인 더보기" aria-haspopup="dialog" @click="toggleShow" v-if="showTelcoBtn === 'USE'">사용</button> <!-- 수정 START : 2020.02.10 텍스트 변경 (버튼명 변경 조회 -> 사용) -->
              <button class="btn-border btn-bg btn-small" aria-label="통신사 할인 더보기" aria-haspopup="dialog" @click="toggleShow" v-if="showTelcoBtn === 'CNL'">취소</button>
            </span>
          </p>
          <!-- START : 통신사 할인내용 -->
          <div class="mobile-type" v-if="showMobile === 'show'">
            <p class="select-mobile-type">
              <span class="inp-radio small w125" v-if="usePntDisCountKtUse">
                <input type="radio" name="deviceType" id="mobile1" value="KT" v-model="reqPntForm.telcoType" @click="selectMobileType('KT')"> <!-- value="kt" 값에따라 하단 v-if="selectType === 'kt'" 내용 변경 -->
                <label for="mobile1"><span class="ico-sns icon-kakaotalk"></span>KT 할인</label>
              </span>
              <span class="inp-radio small w125" v-if="usePntDisCountLgUse">
                <input type="radio" name="deviceType" id="mobile2" value="LGU" v-model="reqPntForm.telcoType" @click="selectMobileType('LGU')"> <!-- value="lgu" 값에따라 하단 v-if="selectType === 'lgu'" 내용 변경 -->
                <label for="mobile2"><span class="ico-sns icon-sms"></span>LG U+할인</label>
              </span>
            </p>
            <div class="mobile-info-content">
              <!-- START :  -->
              <p class="card-number">
                <label for="cardNo1">카드번호</label>
                <input type="number"  min="0" max="9999" maxlength="4" id="cardNo1" name="cardNo1" class="inp-txt" v-model="reqPntForm.cardNo1" value="" @keyup="checkNumberLength(reqPntForm.cardNo1, '1', 4, $event)" title="통신사 카드 앞자리">
                <input type="password" maxlength="4" id="cardNo2" name="cardNo2" class="inp-txt" v-model="reqPntForm.cardNo2" value="" @keyup="numberOnly(reqPntForm.cardNo2, '2', 4, $event)" title="통신사 카드 두번째 자리">
                <input type="password" maxlength="4" id="cardNo3" name="cardNo3" class="inp-txt" v-model="reqPntForm.cardNo3" value="" @keyup="numberOnly(reqPntForm.cardNo3, '3', 4, $event)"  title="통신사 카드 세번째 자리">
                <input type="number" min="0" max="9999" maxlength="4" id="cardNo4" name="cardNo4" class="inp-txt" v-model="reqPntForm.cardNo4" value="" @keyup="checkNumberLength(reqPntForm.cardNo4, '4', 4, $event)" title="통신사 카드 마지막 자리">
              </p>
              <!-- END  -->
              <p class="my-birth">
                <label for="birth">생년월일</label>
                <input type="number" min="19000101" max="21001231" id="birth" class="inp-txt" v-model="reqPntForm.birthDay" value="" title="생년월일" placeholder="YYYYMMDD" @keyup="checkNumberLength(reqPntForm.birthDay, 'B', 8, $event)">
                <button class="btn-border btn-bg btn-small" @click="reqRetrievePnt()">확인</button>
              </p>
              <p class="point" v-if="selectType === 'LGU' && parseInt(resPntForm.remainLimit) > 99999999"><label for="my-point">보유 포인트  <strong>무제한P</strong></label></p>
              <p class="point" v-else><label for="my-point">보유 포인트  <strong>{{toComma(resPntForm.remainLimit)}}P</strong></label> <em v-if="resPntForm.remainLimit != '' && resPntForm.remainLimit < 3000">3,000P 미만으로 사용 불가합니다</em></p>
              <!-- <p class="my-point">
                <input type="number" id="my-point" class="inp-txt" value="0" v-model="usePoint" title="사용할 포인트" placeholder="사용 포인트 입력" @keyup="computeDcSum()">
                <span class="inp-chk small">
                  <input type="checkbox" name="usePoint" id="agreePoint" value="">
                  <label for="agreePoint">모두 사용</label>
                </span>
              </p> -->
              <ul class="txt-info-list">
                <li class="ico-alert2">상품금액 합계 {{toComma(standAmt)}}원 이상 구매 시 {{toComma(pntDcAmt)}} 사용 가능</li>
                <li class="ico-alert2">상품금액 합계 : <strong class="point">{{toComma(pntUseAmt)}}원</strong></li>
                <li class="ico-alert2">
                  결제 횟수 한도 :
                  <span v-if="selectType === 'KT'">일 1회, 일반 할인 월 1회</span> <!-- kt -->
                  <span v-if="selectType === 'LGU'">일 1회, 월 횟수 제한 없음</span> <!-- LGU+ -->
                </li>
                <li class="ico-alert2">할인 제외상품 : 주류/종량제 봉투/업체 택배상품 외 기타</li>
                <li class="ico-alert2">기타문의 :
                  <span v-if="selectType === 'KT'">KT 고객센터 무선 114(무료), 유선 100(유료)</span> <!-- kt -->
                  <span v-if="selectType === 'LGU'">LGU+ 고객센터 무선 114(무료), 유선 1544-0010(유료)</span> <!-- LGU+ -->
                  <span class="txt-indent">GS 프레시몰 고객센터 1661-2562(유료)</span>
                </li>
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
            <span class="point-num" v-if="choiceDcCardFlag"><strong>-{{toComma(totCardDcAmt)}}</strong> 원</span>
            <!-- END : 선택한 카드가 있을 경우 -->
          </p>
          <p class="wrap-select w100 credit-card">
            <button class="btn-arrow" aria-label="카트즉시할인 팝업 활성화" aria-haspopup="dialog" @click="popupCardList" v-if="cardDiscountProm != null && choiceDcCardFlag">
              <span class="icon-card" v-if="cardDiscountProm.crcoCd != '99'">
                <img v-bind:src="getImgNm(cardDiscountProm.cardCode)" v-bind:alt="cardDiscountProm.crcoCd" />
              </span>
              {{cardDiscountProm.tdrMeansCd === '02' ? cardDiscountProm.cardNm : cardDiscountProm.tdrMeansNm }}
            </button> <!-- 선택한 카드가 있을 경우 -->
            <button class="btn-arrow" aria-label="카트즉시할인 팝업 활성화" aria-haspopup="dialog" @click="popupCardList" v-else>할인을 선택해 주세요.</button> <!-- 선택한 카드가 없을 경우 -->
          </p>
        </li>
      </ul>
    </div>
    <PopupDeliveryCoupon :usePosbBsktCpnList="usePosbBsktCpnList" :ordsItemList="ordsItemList" :defaultFreeGiftList="defaultFreeGiftList" :totAmt="totAmt" @popupEvent="popupAction" @bsktCpnChangeEvent="bsktCpnChangeEvent" @setOrdPolSeq="setOrdPolSeq" v-if="usePosbBsktCpnList !== null && this.popup.popupDeliveryCoupon" /> <!-- 팝업 - 배송지, 장바구니 쿠폰 -->
    <PopupCardDcList @popupEvent="popupAction"
    :choiceDcCardFlag="choiceDcCardFlag"
    :rtnCardDiscountProm="cardDiscountProm"
    :payInfo="payInfo" :ordId="ordsInfo.ordId"
    :ordsItemInfoList="ordsItemInfoList"
    :gsNPointDcAmt="gsNPointDcAmt"
    :popRwdDcAmt="popRwdDcAmt"
    @setCardDisEvent="setCardDisEvent"
    v-if="this.popup.popupCardDcList" /> <!-- 팝업 - 카드즉시할인 -->
    <PopupTotMbrInfo @popupEvent="popupAction" :gbn="gbn" v-if="this.popup.popupTotMbrInfo" /> <!-- 팝업 - 통합회원 안내 -->
  </section>
</template>

<script>
import PopupDeliveryCoupon from '@/views/od/PopupDelvCartCpnList'; // 팝업 - 배송비장바구니 쿠폰
// import PopupDeliveryCoupon from '@/views/od/PopupDelvCartCpnNoneList'; // 팝업 - 배송비장바구니 쿠폰없음
import PopupCardDcList from '@/views/od/PopupCardDcList'; // 팝업 - 카드즉시할인
import PopupTotMbrInfo from '@/views/od/PopupTotMbrInfo'; // 팝업 - 통합회원안내
import NumberUtils from '@/common/NumberUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import CommAuthOd from '@/views/pa/common/CommAuthOd';
import OrderSheet from '@/common/od/OrderSheet';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import OdUtils from '@/common/od/OdUtils'; // 주문공통
export default {
  props: {
    ordsInfo: Object,
    // pntUseAmt: Number, // 당일새벽배송상품만
    mbrGrd: Boolean,
    totAmt: Number,
    payInfo: Object, // 결제정보
    ordsItemList: Object,
    ordsItemListMulti: Array, // 다중배송주문상품정보
    defaultFreeGiftList: Array,
  },
  name: "DiscountInfo",
  data() {
    return {
      crmNoticeTextFlag: false, // CRM공지사항플래그
      showMobile: 'hide', // 통신사할인 더보기
      selectType: 'KT', // 통신사 할인 타입
      popup: { // 팝업
        open: false,
        popupDeliveryCoupon: false, // 장바구니 배송비 쿠폰
        popupCardDcList: false, // 카드 즉시할인
        popupTotMbrInfo: false, // 통합회원가입안내
      },
      choiceDcCardFlag: false,
      crcoEvntInfo: null, // output 카드할인정보
      cardDiscountProm: null, // 카드즉시할인정보
      cardDisPromlist: [], // 카드즉시할인 상품정보
      usePosbBsktCpnList: {}, // 사용가능한 쿠폰목록
      dlfeeCpnDcAmt: 0,
      bsktCpnDcAmt: 0,
      gsNPointDcAmt: 0, // GS&POINT 할인
      gsNPointRestPt: 0, // 사용가능한 GS&POINT(총잔여포인트)
      gsNPointFlag: false,
      usePoint: 0, // 통신사 할인
      popRwdDcAmt: 0, // POP 리워즈 할인
      restReward: 0, // 사용가능한 The POP 리워즈
      popRwdFlag: false,
      allUsegsNPnt: false,
      allUsePopRwd: false,
      totalDcAmt: 0, // 총 할인금액
      usePntDisCountYn: false, // 통신사할인 프로모션 여부
      usePntDisCountList: [], // 통신사할인 프로모션
      usePntDisCountLgUse: false, // 통신사할인  lg사용여부
      usePntDisCountKtUse: false, // 통신사할인 kt사용여부
      lgPromId: '',
      lgPromDtlTypeCd: '',
      ktPromId: '',
      ktPromDtlTypeCd: '',
      showTelcoBtn: 'USE',
      gbn: '',
      totTaxfreeAmt: 0,
      totTaxableAmt: 0,
      totVatAmt: 0,
      reqPntForm: {
        deviceType: "MOB",
        custNo: "",
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
        payMethod: "TELMBRINFO",
        promId: "",
        promDtlTypeCd: "",
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
        payMethod: "TELMBRPAY",
        gid: "",
        mid: "",
        payCompanyCd: "",
        promId: "",
        promTypeCd: "",
        promDtlTypeCd: "",
      },
      totCardDcAmt: 0, // 카드할인금액
      curTotAmt: 0,
      ordsItemInfoList: [],
      pntUseAmt: 0,
      standAmt: 0,
      pntDcAmt: 0,
      lguPnt: {
        standAmt: 0,
        pntDcAmt: 0,
        pntUseAmt: 0,
        // dcApplDurUnitCd: '',
        // dcPosbNum: 0,
        // dcCntNum: 0,
        telcoCardNo: '',
        certNo: '',
      },
      ktPnt: {
        standAmt: 0,
        pntDcAmt: 0,
        pntUseAmt: 0,
        // dcApplDurUnitCd: '',
        // dcPosbNum: 0,
        // dcCntNum: 0,
        telcoCardNo: '',
        certNo: '',
      },
      fstOrdInfo: null,
    };
  },
  mixins: [
    CommAuthOd, OdUtils
  ],
  components: {
    PopupDeliveryCoupon, // 팝업 - 배송비 장바구니 쿠폰
    PopupCardDcList, // 팝업 - 카드즉시할인
    PopupTotMbrInfo, // 팝업 - 통합회원가입안내
  },
  watch: {
    gsNPointDcAmt: function() {
      if (this.cardDiscountProm !== null && this.gsNPointDcAmt > 0) {
        // if ((this.cardDiscountProm.crcoCd === this.cardDiscountProm.cardBuyCoCd) || // 카드 와 매입사가 동일하면 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.tdrMeansCd === '13' && this.cardDiscountProm.crcoCd !== '99') || // 팝제휴 카드의경우 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.crcoCd === '10' || this.cardDiscountProm.crcoCd === '02') // 우리카드 국민카드의경우 포인트 사용 불가 <카드할인정책>
        // ) {
          this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
          this.gsNPointDcAmt = 0;
          this.allUsegsNPnt = false;
        // }
      }
      if (this.gsNPointDcAmt < 0) {
        this.gsNPointDcAmt = 0;
        this.allUsegsNPnt = false;
      }
      this.computeDcSum();
    },
    popRwdDcAmt: function() {
      if (this.cardDiscountProm !== null && this.popRwdDcAmt > 0) {
        // if ((this.cardDiscountProm.crcoCd === this.cardDiscountProm.cardBuyCoCd) || // 카드 와 매입사가 동일하면 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.tdrMeansCd === '13' && this.cardDiscountProm.crcoCd !== '99') || // 팝제휴 카드의경우 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.crcoCd === '10' || this.cardDiscountProm.crcoCd === '02') // 우리카드 국민카드의경우 포인트 사용 불가 <카드할인정책>
        // ) {
          this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
          this.popRwdDcAmt = 0;
          this.allUsePopRwd = false;
        // }
      }
      if (this.popRwdDcAmt < 0) {
        this.popRwdDcAmt = 0;
        this.allUsePopRwd = false;
      }
      this.computeDcSum();
    },
    cardDisPromlist: function() {
      // if (this.cardDiscountProm !== null) {
      //   this.$gsdialog.alert(this.cardDiscountProm.tdrMeansCd + ":" + this.cardDiscountProm.crcoCd + ":" + this.cardDiscountProm.cardBuyCoCd);
      // }
      if (this.cardDiscountProm !== null && this.gsNPointDcAmt > 0) {
        // if ((this.cardDiscountProm.crcoCd === this.cardDiscountProm.cardBuyCoCd) || // 카드 와 매입사가 동일하면 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.tdrMeansCd === '13' && this.cardDiscountProm.crcoCd !== '99') || // 팝제휴 카드의경우 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.crcoCd === '10' || this.cardDiscountProm.crcoCd === '02') // 우리카드 국민카드의경우 포인트 사용 불가 <카드할인정책>
        // ) {
          this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
          this.gsNPointDcAmt = 0;
          this.allUsegsNPnt = false;
        // }
      }
      if (this.gsNPointDcAmt < 0) {
        this.gsNPointDcAmt = 0;
        this.allUsegsNPnt = false;
      }
      if (this.cardDiscountProm !== null && this.popRwdDcAmt > 0) {
        // if ((this.cardDiscountProm.crcoCd === this.cardDiscountProm.cardBuyCoCd) || // 카드 와 매입사가 동일하면 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.tdrMeansCd === '13' && this.cardDiscountProm.crcoCd !== '99') || // 팝제휴 카드의경우 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.crcoCd === '10' || this.cardDiscountProm.crcoCd === '02') // 우리카드 국민카드의경우 포인트 사용 불가 <카드할인정책>
        // ) {
          this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
          this.popRwdDcAmt = 0;
          this.allUsePopRwd = false;
        // }
      }
      if (this.popRwdDcAmt < 0) {
        this.popRwdDcAmt = 0;
        this.allUsePopRwd = false;
      }
      this.computeDcSum();
    },
    totAmt: function() {
      this.curTotAmt = this.totAmt;
      this.paymentPrdTaxCalc();
    },
    ordsItemListMulti: function() { // 다중배송 추가
      this.cpnDcAmt();
      this.usePntDisCount();
      this.setCardDisEvent(this.cardDiscountProm); // 카드할인 있을시 재계산
    },
    ordsItemList: function() {
      this.cpnDcAmt();
      this.usePntDisCount();
      this.setCardDisEvent(this.cardDiscountProm); // 카드할인 있을시 재계산
      this.retrievelistUsePosbBsktCpn(); // 사용가능한 쿠폰목록 조회
    },
    ordsInfo: function() {
      this.setDisCount();
      // this.retrievelistUsePosbBsktCpn(); // 사용가능한 쿠폰목록 조회
    },
    mbrGrd: function() {
      this.setDisCount();
    },
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
    popupTotMbrInfoActive(gbn) {
      this.gbn = gbn;
      this.popupAction('popupTotMbrInfo');
    },
    popupCardList() {
      this.popupAction('popupCardDcList');
    },
    // 사용할 쿠폰유무
    couponChk() {
      let result = false;
      if (this.usePosbBsktCpnList !== null) {
        if (this.usePosbBsktCpnList.ordsBsktCpnInfoList != null && this.usePosbBsktCpnList.ordsBsktCpnInfoList !== undefined && this.usePosbBsktCpnList.ordsBsktCpnInfoList.length > 0) {
          result = true;
        }
        if (this.usePosbBsktCpnList.ordsDlfeeCpnTypeGrpInfoList != null && this.usePosbBsktCpnList.ordsDlfeeCpnTypeGrpInfoList !== undefined && this.usePosbBsktCpnList.ordsDlfeeCpnTypeGrpInfoList.length > 0) {
          result = true;
        }
      }
      return result;
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
    selectMobileType(value) {
        console.log('selectMobileType', value);
      this.selectType = value;
      this.telcoType = value;
      const formData = this.reqPntForm;
      this.reqPntForm.birthDay = "";
      if (value === "KT") { // 통신사 변경시 카드번호 초기화
        this.reqPntForm.cardNo1 = "";
        this.reqPntForm.cardNo2 = "";
        this.reqPntForm.cardNo3 = "";
        this.reqPntForm.cardNo4 = "";
        if (this.ktPnt.telcoCardNo) {
          this.reqPntForm.cardNo1 = this.ktPnt.telcoCardNo.substring(0, 4);
          this.reqPntForm.cardNo2 = this.ktPnt.telcoCardNo.substring(4, 8);
          this.reqPntForm.cardNo3 = this.ktPnt.telcoCardNo.substring(8, 12);
          this.reqPntForm.cardNo4 = this.ktPnt.telcoCardNo.substring(12, 16);
        }
        if (this.ktPnt.certNo) {
          this.reqPntForm.birthDay = this.ktPnt.certNo;
        }
        formData.gid = formData.ktGid;
        formData.mid = formData.ktMid;
        formData.goodsName = formData.ktNormalDcCode; // KT 더블할인 프로모션은 계약기간 만료로 인해 일반할인으로 고정
        this.reqPntForm.promId = this.ktPromId;
        this.reqPntForm.promTypeCd = this.ktPromTypeCd;
        this.reqPntForm.promDtlTypeCd = this.ktPromDtlTypeCd;
        this.standAmt = this.ktPnt.standAmt;
        this.pntDcAmt = this.ktPnt.pntDcAmt;
        this.pntUseAmt = this.ktPnt.pntUseAmt;
      } else {
        this.reqPntForm.cardNo1 = "20";
        this.reqPntForm.cardNo2 = "";
        this.reqPntForm.cardNo3 = "";
        this.reqPntForm.cardNo4 = "";
        if (this.lguPnt.telcoCardNo) {
          this.reqPntForm.cardNo1 = this.lguPnt.telcoCardNo.substring(0, 4);
          this.reqPntForm.cardNo2 = this.lguPnt.telcoCardNo.substring(4, 8);
          this.reqPntForm.cardNo3 = this.lguPnt.telcoCardNo.substring(8, 12);
          this.reqPntForm.cardNo4 = this.lguPnt.telcoCardNo.substring(12, 16);
        }
        if (this.lguPnt.certNo) {
          this.reqPntForm.birthDay = this.lguPnt.certNo;
        }
        formData.gid = formData.lgupGid;
        formData.mid = formData.lgupMid;
        formData.goodsName = "";
        this.reqPntForm.promId = this.lgPromId;
        this.reqPntForm.promTypeCd = this.lgPormTypeCd;
        this.reqPntForm.promDtlTypeCd = this.lgPromDtlTypeCd;
        this.standAmt = this.lguPnt.standAmt;
        this.pntDcAmt = this.lguPnt.pntDcAmt;
        this.pntUseAmt = this.lguPnt.pntUseAmt;
      }
        this.resPntForm.discountAmt = 0;
        this.resPntForm.remainLimit = 0;
    },
    // 카드사행사(카드사할인혜택) 이벤트
    setCardDisEvent: function(cardDiscountProm) {
      if (this.gsNPointDcAmt > 0 || this.popRwdDcAmt > 0) {
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        this.cnclGsNPoint();
        this.cnclThePopRewards();
      }
      this.$nextTick(() => {
        this.setCardDisEventMain(cardDiscountProm);
      });
    },
    setCardDisEventMain: function (cardDiscountProm) {
        // 반영전 할인금액
        try {
            const beForeTotCardDcAmt = this.totCardDcAmt;
            this.totCardDcAmt = 0;
            this.crcoEvntInfo = cardDiscountProm;
            this.cardDiscountProm = cardDiscountProm;

            if (this.cardDiscountProm == null) {
                this.choiceDcCardFlag = false;
                return;
            }
            this.totCardDcAmt = this.cardDiscountProm.cardDcAmt;
            // 총결제금액보다 할인금액이 큰경우
            if ((this.totAmt + beForeTotCardDcAmt) < this.totCardDcAmt) {
                this.totCardDcAmt = 0;
                this.crcoEvntInfo = null;
                this.cardDiscountProm = null;
                this.$gsdialog.alert(OrderMsg.cardDisValidFullAmt);
                return;
            }

            // this.crcoEvntInfo.totCardDcAmt = this.totCardDcAmt;
            // this.crcoEvntInfo.cardDisPromlist = this.cardDisPromlist;
            this.choiceDcCardFlag = true;
        } finally {
            this.computeDcSum();
        }
    },
    getItemToCardDisAmt: function(dcItem, item) { // 해당상품 한개당으로 계산
      const itemDcSprc = item.itemDcSprc;
      const dblDcCpnDcAmt = item.dblDcCpnDcAmt;
      const bsktCpnDcAmt = item.bsktCpnDcAmt;
      const itemCpnDcAmt = item.itemCpnDcAmt;
      const dlfeeCpnDcAmt = item.dlfeeCpnDcAmt;
      const cpnDcAmt = (dblDcCpnDcAmt + bsktCpnDcAmt + itemCpnDcAmt + dlfeeCpnDcAmt);
      let itemOrdQty = item.itemOrdQty;
      // N + 1일 경우 프로모션수량을 제외하고 카드할인적용
      if (!StringUtils.isEmpty(item.cmplPromId) && item.cmplPromDtlTypeCd === '201') {
        if (parseInt(itemOrdQty) > parseInt(item.cmplBeneApplVal)) {
          itemOrdQty = parseInt(itemOrdQty) - (parseInt(itemOrdQty) / (parseInt(item.cmplBeneApplVal) + 1));
        }
      }
      const ordsItemSeqno = item.ordsItemSeqno;
      const ordsDelivSeqno = item.ordsDelivSeqno;
      const dcTypeCd = dcItem.dcTypeCd; // 정률정액
      const dcApplVal = dcItem.dcApplVal; // 금액&퍼센트

      let cardDcAmt = 0;
      dcItem.itemDcSprc = itemDcSprc;
      dcItem.itemOrdQty = itemOrdQty;
      dcItem.ordsItemSeqno = ordsItemSeqno;
      dcItem.ordsDelivSeqno = ordsDelivSeqno;
      if (dcTypeCd === 'R') {
        cardDcAmt = Math.ceil((dcApplVal / 100) * ((itemDcSprc * itemOrdQty) - cpnDcAmt));
        cardDcAmt = Math.ceil(cardDcAmt/10) * 10; // 원 절상
      } else if (dcTypeCd === 'A') {
        cardDcAmt = (dcApplVal * itemOrdQty);
        cardDcAmt = Math.ceil(cardDcAmt/10) * 10; // 원 절상
      } else {
        cardDcAmt = 0;
      }
      dcItem.cardDcAmt = cardDcAmt;
      return dcItem;
    },
    // 할인정보 통합 계산
    computeDcSum() {
      this.totalDcAmt = parseInt(this.dlfeeCpnDcAmt) + parseInt(this.bsktCpnDcAmt) + parseInt(this.gsNPointDcAmt) + parseInt(this.popRwdDcAmt) + parseInt(this.resPntForm.discountAmt) + parseInt(this.totCardDcAmt);
      this.$emit('orderSheetDcAmtEvent', this.gsNPointDcAmt, this.popRwdDcAmt, this.resPntForm.discountAmt === 0 ? null : this.resPntForm, this.totCardDcAmt === 0 ? null : this.crcoEvntInfo, this.totalDcAmt);
    },
    // 사용가능한장바구니쿠폰목록조회
    async retrievelistUsePosbBsktCpn() {
      const iUsePosbBsktCpnListInq = {
        ordId: this.ordsItemList.ordId,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/basket-coupon-list', iUsePosbBsktCpnListInq);
      // console.log(response);
      // 배송비쿠폰, 장바구니쿠폰
      // console.log('쿠폰유무', response.data.data);
      this.usePosbBsktCpnList = response.data.data;
    },
    // THE POP리워즈 조회
    async thePopRewards() {
      const thePopRewardsResult = await ApiUtils.get('/fo/cu/mbrmgnt/rewards');
      this.restReward = thePopRewardsResult.data.data.restReward!=null?thePopRewardsResult.data.data.restReward:0;
    },
    // GS&POINT 조회
    async gsNPoint() {
      const gsNPointResult = await ApiUtils.get('/fo/cu/mbrmgnt/gs-point');
      this.gsNPointRestPt = gsNPointResult.data.data.totRestPt!=null?gsNPointResult.data.data.totRestPt:0;
    },
    // 보유 GS&POINT 체크
    checkGsNPoint() {
      // 10 포인트 단위로 사용
      this.gsNPointDcAmt = Math.floor(this.gsNPointDcAmt/10) * 10;
      if (this.gsNPointDcAmt === '') {
        this.gsNPointDcAmt = 0;
      }
      const $target = document.querySelector('#allUsePopRwd');
      if (this.gsNPointDcAmt > this.gsNPointRestPt) {
        this.gsNPointDcAmt = 0;
        event.target.checked = false;
        this.allUsegsNPnt = false;
        this.$gsdialog.alert(OrderMsg.gsPointMore);
      }
      const curDcAmt = parseInt(this.dlfeeCpnDcAmt) + parseInt(this.bsktCpnDcAmt) + parseInt(this.gsNPointDcAmt) + parseInt(this.popRwdDcAmt) + parseInt(this.resPntForm.discountAmt) + parseInt(this.totCardDcAmt);
      if (curDcAmt > this.curTotAmt + this.totalDcAmt) {
        this.gsNPointDcAmt = this.curTotAmt + this.totalDcAmt;
        event.target.checked = false;
        this.allUsegsNPnt = false;
        this.$gsdialog.alert(OrderMsg.pointPayMore); // 결제금액을 초과하였습니다.
      }
      this.computeDcSum();
    },
    // GS&POINT 사용취소
    cnclGsNPoint() {
      this.gsNPointDcAmt = 0;
      this.allUsegsNPnt = false;
      const $target = document.querySelector('#allUsegsNPnt');
      if ($target) {
        $target.checked = false;
      }
      this.computeDcSum();
    },
    // 보유 POP 리워즈 체크
    checkThePopRewards() {
      // 10점 단위로 사용
      this.popRwdDcAmt = Math.floor(this.popRwdDcAmt/10) * 10;
      if (this.popRwdDcAmt === '') {
        this.popRwdDcAmt = 0;
      }
      const $target = document.querySelector('#allUsePopRwd');
      if (this.popRwdDcAmt > this.restReward) {
        this.popRwdDcAmt = 0;
        event.target.checked = false;
        this.allUsePopRwd = false;
        this.$gsdialog.alert(OrderMsg.popPointMore);
      }
      const curDcAmt = parseInt(this.dlfeeCpnDcAmt) + parseInt(this.bsktCpnDcAmt) + parseInt(this.gsNPointDcAmt) + parseInt(this.popRwdDcAmt) + parseInt(this.resPntForm.discountAmt) + parseInt(this.totCardDcAmt);
      if (curDcAmt > this.curTotAmt + this.totalDcAmt) {
        this.popRwdDcAmt = this.curTotAmt + this.totalDcAmt;
        event.target.checked = false;
        this.allUsePopRwd = false;
        this.$gsdialog.alert(OrderMsg.pointPayMore); // 결제금액을 초과하였습니다.
      }
      this.computeDcSum();
    },
    // THE POP 리워즈 사용취소
    cnclThePopRewards() {
      this.popRwdDcAmt = 0;
      this.allUsePopRwd = false;
      const $target = document.querySelector('#allUsePopRwd');
      if ($target) {
        $target.checked = false;
      }
      this.computeDcSum();
    },
    // GS&POINT 모두사용
    gsNPntUseAll(event) {
      this.gsNPointDcAmt = 0;
      this.computeDcSum();
      this.allUsegsNPnt = !this.allUsegsNPnt;
      if (this.curTotAmt < 0) {
        event.target.checked = false;
        this.allUsegsNPnt = false;
        return false;
      } else if (this.cardDiscountProm !== null) {
        // if ((this.cardDiscountProm.crcoCd === this.cardDiscountProm.cardBuyCoCd) || // 카드 와 매입사가 동일하면 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.tdrMeansCd === '13' && this.cardDiscountProm.crcoCd !== '99') || // 팝제휴 카드의경우 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.crcoCd === '10' || this.cardDiscountProm.crcoCd === '02')) {
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        this.gsNPointDcAmt = 0;
        event.target.checked = false;
        this.allUsegsNPnt = false;
        return false;
        // }
      }
      if (this.allUsegsNPnt === true) { // GS&Point 모두사용이 체크되어있으면
        if (this.gsNPointRestPt === 0) { // GS&Point가 0일경우
          event.target.checked = false; // 체크해제 20200527 유현석
          this.allUsegsNPnt = false;
          this.$gsdialog.alert(OrderMsg.gsPointEmpty);
          return false;
        } else if (this.gsNPointRestPt < this.curTotAmt ) { // GS&Point가 총결제금액(결제금액 - 할인금액)보다 작을경우
          this.gsNPointDcAmt = Math.floor(this.gsNPointRestPt/10) * 10;
        } else if (this.gsNPointRestPt > this.curTotAmt) { // GS&Point가 총결제금액(결제금액 - 할인금액)보다 클경우
          this.gsNPointDcAmt = Math.floor(this.curTotAmt/10) * 10;
        }
      }
      event.target.checked = this.allUsegsNPnt;
      this.computeDcSum();
    },
    // POP 리워즈 모두사용
    popRwdsUseAll(event) {
      this.popRwdDcAmt = 0;
      this.computeDcSum();
      this.allUsePopRwd = !this.allUsePopRwd;
      if (this.curTotAmt < 0) {
        event.target.checked = false;
        this.allUsePopRwd = false;
        return false;
      } else if (this.cardDiscountProm !== null) {
        // if ((this.cardDiscountProm.crcoCd === this.cardDiscountProm.cardBuyCoCd) || // 카드 와 매입사가 동일하면 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.tdrMeansCd === '13' && this.cardDiscountProm.crcoCd !== '99') || // 팝제휴 카드의경우 포인트 사용 불가 <카드할인정책>
        // (this.cardDiscountProm.crcoCd === '10' || this.cardDiscountProm.crcoCd === '02')) {
        this.$gsdialog.alert(OrderMsg.cardCrcoBuyCrcoSame);
        this.popRwdDcAmt = 0;
        event.target.checked = false;
        this.allUsePopRwd = false;
        return false;
        // }
      }
      if (this.allUsePopRwd === true) { // POP 리워즈 모두사용이 체크되어있으면
        if (this.restReward === 0) {
          event.target.checked = false; // 체크해제 20200527 유현석
          this.allUsePopRwd = false;
          this.$gsdialog.alert(OrderMsg.popPointEmpty);
          return false;
        } else if (this.restReward < this.curTotAmt ) { // POP 리워즈가 총결제금액(결제금액 - 할인금액)보다 작을경우
          this.popRwdDcAmt = Math.floor(this.restReward/10) * 10;
        } else if (this.restReward > this.curTotAmt) { // POP 리워즈가 총결제금액(결제금액 - 할인금액)보다 클경우
          this.popRwdDcAmt = Math.floor(this.curTotAmt/10) * 10;
        }
      }
      event.target.checked = this.allUsePopRwd;
      this.computeDcSum();
    },
    // CRM 공지사항 조회
    async retrievelistCrmNotice() {
      const crmNoticeInq = {
        moblTp: '2', // 모바일만 조회
        annceType: '02', // CRM 공지사항
      };
      console.log("crmNoticeInq : ", crmNoticeInq);
      const response = await ApiUtils.get('/fo/od/ordsmgnt/pay-notice', crmNoticeInq);
      this.payNoticeList = response.data.data.payNoticeInfoList;
      if (this.payNoticeList !== null && this.payNoticeList.length > 0) {
        this.crmNoticeTextFlag = true;
      }
    },
    // 통신사 카드할인 기본 파라메터 조회
    async telcoDcInit() {
        if (this.usePntDisCountList.length === 2) {
            this.selectMobileType('KT');
        } else if (this.usePntDisCountList[0].promDtlTypeCd === '501') {
            this.selectMobileType('LGU');
        } else {
            this.selectMobileType('KT');
        }

      const formData = this.reqPntForm;
      await ApiUtils
        .post('/fo/pa/telcoDcInitAuth', {})
        .then(res => {
          // console.log('telcoDcInitAuth', res.data);
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
      // if (StringUtils.isEmpty(custNo)) {
      //   alert(OrderMsg.editMbrNo);
      //   return;
      // }
      if (StringUtils.isEmpty(telcoType)) {
        this.$gsdialog.alert(OrderMsg.editTel);
        return;
      }
      if (StringUtils.isEmpty(gid)) {
        this.$gsdialog.alert(OrderMsg.editGid);
        return;
      }
      if (StringUtils.isEmpty(mid)) {
        this.$gsdialog.alert(OrderMsg.editMid);
        return;
      }
      // if (formData.telcoType === "KT" && StringUtils.isEmpty(goodsName)) {
      //   alert("KT 할인 프로모션 코드를 입력해주세요.");
      //   return;
      // }
      if (StringUtils.isEmpty(cardNo1) || StringUtils.isEmpty(cardNo2) || StringUtils.isEmpty(cardNo3) || StringUtils.isEmpty(cardNo4)) {
        this.$gsdialog.alert(OrderMsg.editCardNo);
        return;
      }
      if (StringUtils.isEmpty(birthDay)) {
        this.$gsdialog.alert(OrderMsg.editBirth);
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
      /*
      if (formData.telcoType === "KT") {
        if (this.ktPnt.dcCntNum >= this.ktPnt.dcPosbNum) {
          this.$gsdialog.alert(OrderMsg.telcoCntChk(this.ktPnt));
          return;
        }
      } else if (formData.telcoType === "LGU") {
        if (this.lguPnt.dcCntNum >= this.lguPnt.dcPosbNum) {
          this.$gsdialog.alert(OrderMsg.telcoCntChk(this.lguPnt));
          return;
        }
      }
      */
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
        cardNo: formData.cardNo1 + formData.cardNo2 + formData.cardNo3 + formData.cardNo4,
        amt: formData.amt,
        discountAmt: formData.discountAmt,
        payMethod: formData.payMethod,
        goodsName: formData.goodsName,
        taxFreeAmt: this.totTaxfreeAmt,
        taxableAmt: this.totTaxableAmt,
        tax: this.totVatAmt,
        birthDay: formData.birthDay,
      };
      await ApiUtils
        .post(url, data)
        .then(res => {
          if (res.data !== null) {
            if (res.data.resultCode !== '0000') {
              this.$gsdialog.alert(res.data.resultMsg);
              return false;
            }
            this.resPntForm = res.data;
          }
          // console.log(res.data);
          // 조회한 포인트에 따라 사용금액 처리
          if (this.pntUseAmt > this.standAmt) {
            if (this.resPntForm.remainLimit < this.pntDcAmt) {
              this.resPntForm.discountAmt = 0;
              this.$gsdialog.alert(OrderMsg.morePoint);
              return false;
            } else if (this.totAmt < this.pntDcAmt) {
              this.resPntForm.discountAmt = 0;
              this.$gsdialog.alert(OrderMsg.pointPayMore);
              return false;
            } else {
              this.resPntForm.discountAmt = this.pntDcAmt;
            }
          } else {
            this.$gsdialog.alert(OrderMsg.pntFail);
            this.resPntForm.discountAmt = 0;
          }
          this.resPntForm.telcoType = this.reqPntForm.telcoType;
          this.resPntForm.mid = this.reqPntForm.mid;
          this.resPntForm.gid = this.reqPntForm.gid;
          this.resPntForm.deviceType = this.reqPntForm.deviceType;
          this.resPntForm.birthDay = this.reqPntForm.birthDay;
          this.resPntForm.payMethod = "TELMBRPAY";
          this.resPntForm.promId = this.reqPntForm.promId;
          this.resPntForm.promTypeCd = this.reqPntForm.promTypeCd;
          this.resPntForm.promDtlTypeCd = this.reqPntForm.promDtlTypeCd;
          if (this.reqPntForm.telcoType === 'KT') {
            this.resPntForm.payCompanyCd = '08';
          } else {
            this.resPntForm.payCompanyCd = '07';
          }
          this.computeDcSum();
        });
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    getImgNm: function (cd) {
      // 이미지가 바로 로딩이 안되기 때문에 require를 사용하여 이미지를 랜더링하여야 함.
      if (cd !== null && cd !== '') {
        return require('@/assets/images/icon/icon_card_logo'+cd+'.png');
      } else {
        return '';
      }
    },
    // 숫자만 입력 가능
    numberOnly(str, gbn, len, e) {
      const temp = OrderSheet.numberOnly(str);
      if (gbn === '2') {
        this.reqPntForm.cardNo2 = temp;
      } else if (gbn === '3') {
        this.reqPntForm.cardNo3 = temp;
      }
      if (str.length === len) {
        this.autoTab(e);
      }
    },
    // 자리수체크
    checkNumberLength(str, gbn, len, e) {
      if (str.length > len) {
        const temp = str.substring(0, len);
        if ( gbn === '1') {
          this.reqPntForm.cardNo1 = temp;
        } else if (gbn === '4') {
          this.reqPntForm.cardNo4 = temp;
        } else if (gbn === 'B') {
          this.reqPntForm.birthDay = temp;
        }
      } if (str.length === len) {
        if ( gbn != 'B') {
          this.autoTab(e);
        }
      }
    },
    autoTab(e) {
      let id = e.target.id;
      let idx = id.charAt(id.length-1);
      id = id.substring(0, id.length-1);
      idx = parseInt(idx)+1;
      const el = document.querySelector('#'+id+idx);
      if (el) {
        el.focus();
      }
    },
    isNotEmpty(x) {
      return !StringUtils.isEmpty(x);
    },
    // 상품과면세계산
    async paymentPrdTaxCalc() {
      const param = {
        ordId: this.ordsInfo.ordId,
        tbType: 'ORDS', // ORDS OR ORD
          ordsPromCard: this.crcoEvntInfo, // 카드할인 선 반영 추가 20200812 유현석
      };
      const response = await ApiUtils.post('/fo/od/ordsmgnt/ord-item-texFtex-rate', param);
      this.ordsItemTaxList = response.data.data;
      const disTotAmt = this.curTotAmt - this.totalDcAmt;
      if (this.ordsItemTaxList.length > 0 && (this.productNm === undefined || this.productNm === null)) {
        this.totTaxfreeAmt = 0;
        this.totTaxableAmt = 0;
        this.totVatAmt = 0;
        for (let i=0; i < this.ordsItemTaxList.length; i++) {
          const ordsItemTax = this.ordsItemTaxList[i];
          if (ordsItemTax.itemTexTypeCd == '1' || ordsItemTax.itemTexTypeCd == '2') { // 면세 OR 영세
            this.totTaxfreeAmt += Math.floor((ordsItemTax.payRate / 100) * disTotAmt);
          }
        }
        this.totTaxableAmt = disTotAmt - this.totTaxfreeAmt; // 과세금액
        this.totVatAmt = Math.floor(this.totTaxableAmt * 0.1); // 부가세
        this.totTaxableAmt = this.totTaxableAmt - this.totVatAmt; // 과세금액
      } else { // 정보 없을경우 전부 과세금액
        this.totVatAmt = Math.floor(disTotAmt * 0.1); // 부가세
        this.totTaxableAmt = disTotAmt - this.totVatAmt; // 과세금액
      }
    },
    async usePntDisCount() {
      let deviceType = '01';
      if (this.isMobile()) {
        deviceType = '02';
        if (this.isGsApp()) {
          deviceType = '03';
        } else if (this.isDaliApp()) {
          deviceType = '04';
        }
      } else {
        deviceType = '01';
      }
      this.ordsItemInfoList = [];
      if (this.ordsItemListMulti !== undefined && this.ordsItemListMulti.length > 0) {
        for (let z = 0; z < this.ordsItemListMulti.length; z++) {
          for (let i = 0; i < this.ordsItemListMulti[z].ordsDelivGrpInfoList.length; i++) {
            const ordsDelivGrpInfoList = this.ordsItemListMulti[z].ordsDelivGrpInfoList[i];
            if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList) {
              for (let j = 0; j < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList.length; j++) {
                if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList) {
                  for (let k = 0; k < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList.length; k++) {
                    this.ordsItemInfoList.push(ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k]);
                  }
                }
              }
            }
          }
        }
      } else {
        if (this.ordsItemList !== undefined && this.ordsItemList.ordsDelivGrpInfoList) {
          for (let i = 0; i < this.ordsItemList.ordsDelivGrpInfoList.length; i++) {
            const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList[i];
            if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList) {
              for (let j = 0; j < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList.length; j++) {
                if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList) {
                  for (let k = 0; k < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList.length; k++) {
                    this.ordsItemInfoList.push(ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k]);
                  }
                }
              }
            }
          }
        }
      }
      const param = {
        ordId: this.ordsInfo.ordId,
        deviceType: deviceType,
      };
      const response = await ApiUtils.post('/fo/od/ordsmgnt/pnt-discount-info', param);
      this.usePntDisCountList = response.data.data.ordsItemCpnInfoList;
      if (this.usePntDisCountList.length > 0) {
        this.usePntDisCountYn = true;
      }
      let promDtlTypeCd = '';
      for (let i=0; i < this.usePntDisCountList.length; i++) {
        if (!this.usePntDisCountList[i].promDtlTypeCd) {
          continue;
        }

        const list = this.usePntDisCountList[i].ordsItemSeqnoList.split(',');
        if (this.usePntDisCountList[i].promDtlTypeCd === '501') {
          this.usePntDisCountLgUse = true;
          this.lgPromId = this.usePntDisCountList[i].promId;
          this.lgPormTypeCd = this.usePntDisCountList[i].promTypeCd;
          this.lgPromDtlTypeCd = this.usePntDisCountList[i].promDtlTypeCd;
          this.reqPntForm.telcoType = 'LGU';
          this.selectType = 'LGU';
          console.log('501 lguplus');
          let lgPntUseAmt = 0;
          for (let j = 0; j < list.length; j++) {
            const item = this.ordsItemInfoList.find(item=>item.ordsItemSeqno == list[j]);
            if (item && item !== undefined) {
              if (item.ordsItemCompoInfoList && item.ordsItemCompoInfoList.length > 0) {
                for (let k = 0; k < item.ordsItemCompoInfoList.length; k++) {
                  lgPntUseAmt += parseInt(item.ordsItemCompoInfoList[k].lastBeneSellAmt);
                }
              }
              lgPntUseAmt += parseInt(item.lastBeneSellAmt);
            }
          }
          this.lguPnt.pntUseAmt = lgPntUseAmt;
          this.lguPnt.standAmt = this.usePntDisCountList[i].evntApplStandAmt;
          this.lguPnt.pntDcAmt = this.usePntDisCountList[i].beneApplVal;
          // this.lguPnt.dcApplDurUnitCd = this.usePntDisCountList[i].dcApplDurUnitCd;
          // this.lguPnt.dcPosbNum = this.usePntDisCountList[i].dcPosbNum;
          // this.lguPnt.dcCntNum = this.usePntDisCountList[i].dcCntNum;
          this.lguPnt.telcoCardNo = this.usePntDisCountList[i].telcoCardNo;
          this.lguPnt.certNo = this.usePntDisCountList[i].certNo;
          // this.selectMobileType('LGU');
        } else if (this.usePntDisCountList[i].promDtlTypeCd === '502') {
          this.usePntDisCountKtUse = true;
          this.ktPromId = this.usePntDisCountList[i].promId;
          this.ktPromTypeCd = this.usePntDisCountList[i].promTypeCd;
          this.ktPromDtlTypeCd = this.usePntDisCountList[i].promDtlTypeCd;
          this.reqPntForm.telcoType = 'KT';
          this.selectType = 'KT';
          console.log('502 kt');
          let ktPntUseAmt = 0;
          for (let j = 0; j < list.length; j++) {
            const item = this.ordsItemInfoList.find(item=>item.ordsItemSeqno == list[j]);
            if (item && item !== undefined) {
              if (item.ordsItemCompoInfoList && item.ordsItemCompoInfoList.length > 0) {
                for (let k = 0; k < item.ordsItemCompoInfoList.length; k++) {
                  ktPntUseAmt += parseInt(item.ordsItemCompoInfoList[k].lastBeneSellAmt);
                }
              }
              ktPntUseAmt += parseInt(item.lastBeneSellAmt);
            }
          }
          this.ktPnt.pntUseAmt = ktPntUseAmt;
          this.ktPnt.standAmt = this.usePntDisCountList[i].evntApplStandAmt;
          this.ktPnt.pntDcAmt = this.usePntDisCountList[i].beneApplVal;
          // this.ktPnt.dcApplDurUnitCd = this.usePntDisCountList[i].dcApplDurUnitCd;
          // this.ktPnt.dcPosbNum = this.usePntDisCountList[i].dcPosbNum;
          // this.ktPnt.dcCntNum = this.usePntDisCountList[i].dcCntNum;
          this.ktPnt.telcoCardNo = this.usePntDisCountList[i].telcoCardNo;
          this.ktPnt.certNo = this.usePntDisCountList[i].certNo;
          // this.selectMobileType('KT');
        }
        if (this.usePntDisCountList.length == 2) {
          this.reqPntForm.telcoType = 'KT';
          this.selectType = 'KT';
          // this.selectMobileType('KT');
        }
        promDtlTypeCd = this.usePntDisCountList[i].promDtlTypeCd;
      }
    },
    cpnDcAmt() {
      this.dlfeeCpnDcAmt = 0;
      this.bsktCpnDcAmt = 0;
      console.log(this.ordsItemListMulti);
      if (this.ordsItemListMulti !== undefined && this.ordsItemListMulti.length > 0) {
        for (let z = 0; z < this.ordsItemListMulti.length; z++) {
          for (let i = 0; i < this.ordsItemListMulti[z].ordsDelivGrpInfoList.length; i++) {
            const ordsDelivGrpInfoList = this.ordsItemListMulti[z].ordsDelivGrpInfoList[i];
            if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList) {
              for (let j = 0; j < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList.length; j++) {
                this.dlfeeCpnDcAmt += ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].dlfeeCpnDcAmt ? ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].dlfeeCpnDcAmt : 0;
                if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList) {
                  for (let k = 0; k < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList.length; k++) {
                    this.bsktCpnDcAmt += ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].bsktCpnDcAmt ? ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].bsktCpnDcAmt : 0;
                  }
                }
              }
            }
          }
        }
      } else {
        if (this.ordsItemList.ordsDelivGrpInfoList) {
          for (let i = 0; i < this.ordsItemList.ordsDelivGrpInfoList.length; i++) {
            const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList[i];
            if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList) {
              for (let j = 0; j < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList.length; j++) {
                this.dlfeeCpnDcAmt += ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].dlfeeCpnDcAmt ? ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].dlfeeCpnDcAmt : 0;
                if (ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList) {
                  for (let k = 0; k < ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList.length; k++) {
                    this.bsktCpnDcAmt += ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].bsktCpnDcAmt ? ordsDelivGrpInfoList.ordsDelivSupplGrpInfoList[j].ordsItemInfoList[k].bsktCpnDcAmt : 0;
                  }
                }
              }
            }
          }
        }
      }
      // 쿠폰변경시 포인트 초기화
      this.gsNPointDcAmt = 0;
      this.cnclGsNPoint();
      this.popRwdDcAmt = 0;
      this.cnclThePopRewards();
      this.computeDcSum();
    },
    bsktCpnChangeEvent() {
      this.$emit('bsktCpnChangeEvent');
    },
    // 통합회원 가입
    goAssociate() {
      this.$router.push('/cu/associate_member_point');
    },
    setDisCount() {
      if (this.ordsInfo !== null && this.mbrGrd == true) { // 정회원일 경우 조회
        this.gsNPoint(); // GS&POINT 조회
        this.thePopRewards(); // THE POP 리워즈 조회
        // this.retrievelistUsePosbBsktCpn(); // 사용가능한 쿠폰목록 조회
      }
    },
    setTotAmt(amt) {
      this.curTotAmt = amt;
    },
    setOrdPolSeq(ordPolcSeqList) { // 장바구니쿠폰의 배송차수정책
      this.$emit('setOrdPolSeq', ordPolcSeqList);
    },
    async retrieveFstOrdInfo() {
      const iTbCsMbrOrdAggDto = {
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ords-fst-ord-info', iTbCsMbrOrdAggDto);
      this.fstOrdInfo = response.data.data;
    },
  },
  destroyed() {
  },
  mounted() {
    this.retrievelistCrmNotice(); // CRM공지사항 조회
    if (this.ordsInfo != null) {
      if (this.mbrGrd == true) { // 정회원일 경우 조회
        this.setDisCount();
      }
    }
    this.usePntDisCount();
    this.retrieveFstOrdInfo(); // 신규가입자주문정보조회
    this.curTotAmt = this.totAmt;
    // this.paymentPrdTaxCalc();
  },
};
</script>
