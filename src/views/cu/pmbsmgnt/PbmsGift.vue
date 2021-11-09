<!--
views/ss/SC-FO-SS-GF-MS-914.vue
-->
<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림 멤버십" />
    <!-- START : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="wrap-tab">
          <!-- START : 선물함 탭 영역 -->
          <ul ref="tabList" class="tablist type02">
            <li>
              <button
                type="button"
                id="tabGiveGift"
                aria-controls="tabGiveGift-contents"
                @click="tabAction('tabGiveGift')"
                :class="{active: this.tab.tabGiveGift}"
              >선물하기</button>
            </li>
            <li>
              <button
                type="button"
                id="tabReceivedGift"
                aria-controls="tabReceivedGift-contents"
                @click="tabAction('tabReceivedGift')"
                :class="{active: this.tab.tabReceivedGift}"
              >받은 선물</button>
            </li>
            <li>
              <button
                type="button"
                id="tabSentGift"
                aria-controls="tabSentGift-contents"
                @click="tabAction('tabSentGift')"
                :class="{active: this.tab.tabSentGift}"
              >보낸 선물</button>
            </li>
          </ul>
          <!-- END : 선물함 탭 영역 -->
          <!-- START : 탭 콘텐츠 영역 -->
          <div ref="tabContents" tabindex="0">
            <!-- START : 선물하기 탭 -->
            <div
              id="tabGiveGift-contents"
              class="tabcontents"
              aria-labelledby="tabGiveGift-contents"
              v-if="this.tab.tabGiveGift"
            >
              <div class="give-gift">
                <p class="desc">사랑하는 분들에게 달리드림 멤버십을 선물하세요</p>
                <div class="benefit-details">
                  <ul class="benefit-list">
                    <li class="ico-membership">
                      누구나!
                      <br />첫 가입 시
                      <br />60일 무료 제공
                    </li>
                    <li class="ico-discount">
                      상품 구매 시!
                      <br />최대 50%
                      <br />상시 할인
                    </li>
                    <li class="ico-overseas">
                      달리드림 멤버십 전용
                      <br />해외직구
                      <br />&amp; 무료 배송
                    </li>
                  </ul>
                </div>
                <button class="btn-border link-go-details" @click="goDali">달리드림 멤버십 혜택 자세히보기</button>
              </div>
              <!-- 쿠폰영역 -->
              <div class="select-coupon section dream-pass-gift">
                <p class="tit-coupon">선물하실 회원권을 선택해주세요</p>
                <div class="radio-wrap">
                  <span class="inp-radio small">
                    <input
                      type="radio"
                      name="daliDreamPass"
                      id="radio01"
                      value="1"
                      @click="changeCpnType"
                      checked
                    />
                    <label for="radio01">
                      <p class="dream-pass-coupon">
                        달리드림 멤버십
                        <strong>30일 회원권</strong>
                      </p>
                      <em>3,900원</em>
                    </label>
                  </span>

                  <span class="inp-radio small">
                    <input
                      type="radio"
                      name="daliDreamPass"
                      id="radio02"
                      value="3"
                      @click="changeCpnType"
                    />
                    <label for="radio02">
                      <p class="dream-pass-coupon">
                        달리드림 멤버십
                        <strong>90일 회원권</strong>
                      </p>
                      <em>11,700원</em>
                    </label>
                  </span>

                  <span class="inp-radio small">
                    <input
                      type="radio"
                      name="daliDreamPass"
                      id="radio03"
                      value="6"
                      @click="changeCpnType"
                    />
                    <label for="radio03">
                      <p class="dream-pass-coupon">
                        달리드림 멤버십
                        <strong>180일 회원권</strong>
                      </p>
                      <em>23,400원</em>
                    </label>
                  </span>

                  <span class="inp-radio small">
                    <input
                      type="radio"
                      name="daliDreamPass"
                      id="radio04"
                      value="12"
                      @click="changeCpnType"
                    />
                    <label for="radio04">
                      <p class="dream-pass-coupon">
                        달리드림 멤버십
                        <strong>360일 회원권</strong>
                      </p>
                      <em>46,800원</em>
                    </label>
                  </span>
                </div>
                <!-- 6월 수정 END : 회원권 내용 수정, 디자인 변경으로 <div class="inner"></div>로 감싸주세요 -->
              </div>
              <!-- //쿠폰영역 -->
              <!-- 친구영역 -->
              <div class="select-freinds section">
                <p class="tit-coupon">선물하실 친구를 선택해주세요</p>
                <div class="wrap-tab-gift">
                  <!-- START : 선물하실 친구 선택하기 탭 영역 -->
                  <ul ref="tabList" class="tablist">
                    <li>
                      <button
                        type="button"
                        id="tabMobilePhone"
                        class="btn-phone"
                        aria-controls="tabMobilePhone-contents"
                        @click="innerTabAction('tabMobilePhone')"
                        :class="{ active: this.innerTab.tabMobilePhone }"
                      >
                        <span>휴대폰 번호</span>
                      </button>
                    </li>
                   <!-- <li>
                      <button
                        type="button"
                        id="tabKakaotalk"
                        class="btn-kakao"
                        aria-controls="tabKakaotalk-contents"
                        @click="innerTabAction('tabKakaotalk')"
                        :class="{ active: this.innerTab.tabKakaotalk }"
                      >
                        <span>카카오톡</span>
                      </button>
                    </li>
                    -->
                  </ul>
                  <!-- END : 선물하실 친구 선택하기 탭 영역 -->
                  <!-- START : 문자로 전송 -->
                  <div
                    id="tabMobilePhone"
                    class="tabcontents"
                    aria-labelledby="tabMobilePhone-contents"
                    v-if="this.innerTab.tabMobilePhone"
                  >
                    <div class="wrap-tab-inner">
                      <h2 class="title hidden">문자로 전송</h2>
                      <fieldset>
                        <legend>휴대폰 번호로 아이디 찾기</legend>
                        <!-- 수정 START : 2020.02.24 App일 경우 -->
                        <div class="input-box" v-if="!appYn">
                          <input
                            type="text"
                            id="name"
                            class="inp-txt"
                            value
                            v-model="selecNm"
                            title="받는 분의 이름을 입력 해주세요."
                            placeholder="받는 분의 이름을 입력 해주세요."
                          />
                        </div>
                        <div class="input-box" v-if="appYn">
                          <input
                            type="text"
                            id="name"
                            class="inp-txt name"
                            value
                            v-model="selecNm"
                            title="받는 분의 이름을 입력 해주세요."
                            placeholder="받는 분의 이름을 입력 해주세요."
                          />
                          <button
                            type="button"
                            class="btn-border btn-contact"
                            @click="getMyTelInfo()"
                          >내 연락처 가져오기</button>
                        </div>
                        <div class="input-box">
                          <input
                            type="text"
                            id="tel"
                            maxlength="11"
                            class="inp-txt"
                            title="‘-’ 없이 숫자만 입력"
                            placeholder="‘-’ 없이 숫자만 입력"
                            v-model="selecTel"
                          />
                        </div>
                      </fieldset>
                      <p class="txt-dot">카카오 알림톡 또는 문자로 전송됩니다</p>
                    </div>
                    <!-- END : 문자로 전송 -->
                  </div>
                  <!-- START : 카카오톡으로 전송 -->
                  <div
                    id="tabKakaotalk"
                    class="tabcontents"
                    aria-labelledby="tabKakaotalk-contents"
                    v-if="this.innerTab.tabKakaotalk"
                  >
                    <div class="wrap-tab-inner">
                      <h2 class="title hidden">카카오톡으로 전송</h2>
                      <p class="txt-kakao">결제 후에 카카오톡에서 받는 분을 선택하세요</p>
                      <div class="input-box">
                        <input
                          type="text"
                          id="name"
                          class="inp-txt"
                          value
                          v-model="selecNm"
                          title="받는 분의 이름을 입력 해주세요."
                          placeholder="받는 분의 이름을 입력 해주세요."
                        />
                      </div>
                      <ul class="list-type-dot">
                        <li>
                          카카오톡으로 선물이 전송됩니다.
                          <br />결제를 먼저 완료하신 후에 받는 사람을 선택하실 수 있습니다.
                        </li>
                        <li class="important">다수의 수신자가 선택되지 않도록 유의해주세요</li>
                      </ul>
                    </div>
                  </div>
                  <!-- END : 카카오톡으로 전송 -->
                </div>
              </div>
              <!-- 친구영역 -->
              <!-- 메세지영역 -->
              <div class="wrap-write-messages section">
                <p class="tit-coupon">메세지 카드를 작성해주세요</p>
                <div class="write-messages">
                  <div class="message-area" v-if="isVisible === 0">
                    <p id="sMsg">{{ this.giftMsgCnts }}</p>
                    <button
                      type="button"
                      class="btn-msg-modify"
                      @click="showTextarea(1)"
                      aria-label="메시지 수정 활성화"
                      aria-haspopup="dialog"
                    >메시지 수정</button>
                  </div>
                  <div class="message-input-area" v-if="isVisible === 1">
                    <textarea
                      name="giftMsgCnts"
                      id="giftMsgCnts"
                      cols="30"
                      rows="10"
                      class="textarea"
                      v-model="giftMsgCnts"
                    >
                      달리드림 멤버십 회원권이 도착했어요.
                    </textarea>
                    <span class="txt-byte">
                      <span class="hidden">현재 작성한 글자 수</span>
                      <em class="current">{{inpTxtLen}}</em>
                      <span>/</span>
                      <span class="hidden">최대 작성 글자 수</span>
                      <span>100</span>
                    </span>
                    <button
                      type="button"
                      class="btn-msg"
                      @click="
                        showChg(1);
                        showTextarea(0);
                      "
                    >취소</button>
                    <button
                      type="button"
                      class="btn-msg"
                      @click="
                        showChg(0);
                        showTextarea(0);
                      "
                    >저장</button>
                  </div>
                </div>
              </div>
              <!-- //메세지영역 -->
              <!-- START : 유의사항 -->
              <div class="code-note">
                <h3 class="tit-coupon">유의사항</h3>
                <ul>
                  <li>
                    달리드림 멤버십 선물하기는 받는 분에게 회원권번호가 전송되며, 선물 받으신 분은 [마이페이지>달리드림 멤버십>회원권 등록하기]에서 번호 등록 후 사용이 가능합니다.
                  </li>
                  <li>
                    달리드림 멤버십 회원권은 달리드림 회원만 사용가능하며 달리드림 회원이 아닐 경우 달리드림 (멤버십 서비스)가입 후 사용이 가능합니다.
                    <br />(가입시 정기결제 카드 등록 필수)
                  </li>
                  <li>선물 발송 후 선물 받으시는 분이 7일 이내 쿠폰 미등록시 자동 결제 취소됩니다.</li>
                  <li>선물 받으신 분이 회원권 사용 중 달리드림 멤버십 해지, 또는 달리드림 회원 탈퇴하는 경우 회원권은 취소되지 않습니다.</li>
                  <li>선물 결제 완료 후 환불 규정은 달리드림 멤버십 해지 규정에 따릅니다.</li>
                </ul>
              </div>
              <!-- END : 유의사항 -->
              <!-- START : 결제 영역 -->
              <div class="payment-area">
                <div class="the-final">
                  최종 결제금액
                  <span class>
                    {{ this.selecTyp * 30 }}일 회원권
                    <strong>{{ comma(this.selecTyp * 3900) }}</strong>
                  </span>
                </div>
                <button type="button" class="btn-dali daligreen" @click="payGift()">결제 및 선물하기</button>
              </div>
              <!-- END : 결제 영역 -->
            </div>
            <!-- END : 선물하기 탭 -->
            <!-- START : 받은 선물 탭 -->
            <div
              id="tabReceivedGift-contents"
              class="tabcontents"
              aria-labelledby="tabReceivedGift-contents"
              v-if="this.tab.tabReceivedGift"
            >
              <!-- START : 받은 선물 있음 -->
              <div class="receive-gift" v-if="this.receiveCpnList.length != 0">
                <div class="using-coupon">
                  <span>
                    보유 회원권
                    <em>{{ this.receiveCpnList.length }}</em>
                  </span>
                  <gs-link to="/cu/pbms_coupon" class="btn-coupon-registration">
                    <span>회원권번호 등록</span>
                  </gs-link>
                </div>
                <div
                  v-bind:class="[
                    { 'gift-box': rcvCpn.canUseYn != '03' },
                    { 'gift-box used': rcvCpn.canUseYn == '03' },
                  ]"
                  v-for="rcvCpn in receiveCpnList"
                  v-bind:key="rcvCpn.giftTrcPinNo"
                  v-bind:rcvCpn="rcvCpn"
                >
                  <div class="coupon-details">
                    <span class="img-dali-membership">
                      <span class="membership-name">달리드림 멤버십</span>
                      <strong class="membership-type">{{ rcvCpn.pmbsGiftQty * 30 }}일 회원권</strong>
                    </span>
                    <div class="cont">
                      <span class="date">
                        {{
                        dateFormat(rcvCpn.giftCpnRegDttm)
                        }}
                      </span>
                      <strong>From. {{ rcvCpn.custNm }}</strong>
                      <span class="date">
                        {{ dateFormat(rcvCpn.validDurBeginDt) }} ~
                        {{ dateFormat(rcvCpn.validDurEndDt) }}
                      </span>
                    </div>
                  </div>
                  <div class="right-area">
                    <!-- <span v-if="rcvCpn.pmbsGiftStatCd=='01'" class="complete">등록 완료</span> -->
                    <span class="complete" v-if="rcvCpn.canUseYn == '03'">기간 만료</span>
                    <!-- <span v-else class="complete">사용 완료</span> -->
                  </div>
                </div>
                <p class="txt-max">최근 1년 이내의 내역만 조회 가능합니다</p>
              </div>
              <!-- END : 받은 선물 있음 -->
              <!-- START : 받은 선물 없음 -->
              <div class="gift-nothing" v-if="this.receiveCpnList.length == 0">
                <gs-link to="/cu/pbms_coupon" class="btn-coupon-registration">
                  <span>회원권번호 등록</span>
                </gs-link>
                <p class="no-list">받은 선물이 없습니다</p>
              </div>
              <!-- END : 받은 선물 없음 -->
            </div>
            <!-- END : 받은 선물 탭 -->
            <!-- START : 보낸 선물 탭 -->
            <div
              id="tabSentGift-contents"
              class="tabcontents"
              aria-labelledby="tabSentGift-contents"
              v-if="this.tab.tabSentGift"
            >
              <!-- START : 보낸 선물 있음 -->
              <div class="sent-gift" v-if="this.sendCpnList.length != 0">
                <div
                  class="gift-box"
                  v-for="sendCpn in sendCpnList"
                  v-bind:key="sendCpn.giftTrcPinNo"
                  v-bind:sendCpn="sendCpn"
                >
                  <div class="coupon-details">
                    <!-- <figure>
                      <img src="@/assets/images/_temp/_img_dali_coupon.png" alt="달리살다 쿠폰 1개월 권">
                    </figure>-->
                    <span class="img-dali-membership">
                      <span class="membership-name">달리드림 멤버십</span>
                      <strong class="membership-type">{{ sendCpn.pmbsGiftQty * 30 }}일 회원권</strong>
                    </span>
                    <a
                      href="#"
                      class="link-sent-message"
                      @click="
                        popupAction(
                          'popupDaliSentMessages',
                          sendCpn.giftMsgCnts
                        )
                      "
                      aria-label="보낸 메시지 팝업활성화"
                      aria-haspopup="dialog"
                    >보낸 메시지</a>
                    <!-- 카카오톡 -->
                    <div class="cont" v-if="sendCpn.dsptChanlTypeCd == '01'">
                      <span class="date">보낸 날짜 {{ dateFormat(sendCpn.giftDsptDttm) }}</span>
                      <strong>
                        To.
                        <span class="kakaotalk">{{ kname(sendCpn.rcvpsNm) }}</span>
                      </strong>
                      <!-- <span class="using">사용중</span> -->
                      <span
                        class="not-use"
                        v-if="sendCpn.canUseYn == '04' && sendCpn.pmbsGiftStatCd == '00'"
                      >미사용</span>
                      <span class="used" v-if="sendCpn.canUseYn == '01'">사용완료</span>
                      <span
                        class="used"
                        v-if="(sendCpn.pmbsGiftStatCd == '02' || sendCpn.pmbsGiftStatCd == '03')"
                      >취소완료</span>
                    </div>
                    <!-- 문자 -->
                    <div class="cont" v-if="sendCpn.dsptChanlTypeCd != '01'">
                      <span class="date">보낸 날짜 {{ dateFormat(sendCpn.giftDsptDttm) }}</span>
                      <strong>
                        To. {{ kname(sendCpn.rcvpsNm) }}
                        <span class="cell-num">
                          (
                          {{
                          phoneMask(sendCpn.rcvTelNo)
                          }}
                          )
                        </span>
                      </strong>
                      <!-- <span class="using">사용중</span> -->
                      <span class="not-use" v-if="sendCpn.pmbsGiftStatCd == '00'">미사용</span>
                      <span class="used" v-if="sendCpn.pmbsGiftStatCd == '01'">사용완료</span>
                      <span
                        class="used"
                        v-if="(sendCpn.pmbsGiftStatCd == '02' || sendCpn.pmbsGiftStatCd == '03')"
                      >취소완료</span>
                    </div>
                  </div>
                  <div class="btns-right-area">
                    <button
                      type="button"
                      class="btn-border"
                      aria-haspopup="dialog"
                      @click="popupCardStatementAction(sendCpn.pmbsTdrNo)"
                    >카드 명세서</button>
                    <button
                      type="button"
                      class="btn-border"
                      @click="
                        giftCanclePop(
                          sendCpn.giftTrcPinNo,
                          sendCpn.pmbsTdrNo,
                          sendCpn.pmbsGiftDt
                        )
                      "
                      aria-label="결제 취소 팝업활성화"
                      aria-haspopup="dialog"
                      v-if="sendCpn.canUseYn == '04' && sendCpn.pmbsGiftStatCd == '00'"
                    >결제 취소</button>
                    <button
                      type="button"
                      class="btn-border bg-gray"
                      aria-haspopup="dialog"
                      @click="msgAgain(sendCpn.dsptChanlTypeCd, sendCpn.pmbsTdrNo, sendCpn.giftUrl, sendCpn.custNm)"
                      v-if="sendCpn.pmbsGiftStatCd == '00'"
                    >재전송</button>
                  </div>
                </div>
                <!-- //문자 선물 -->
                <p class="txt-max">최근 1년 이내의 내역만 조회 가능합니다</p>
              </div>
              <!-- END : 보낸 선물 있음 -->
              <!-- START : 보낸 선물 없음 -->
              <div class="gift-nothing" v-if="this.sendCpnList.length == 0">
                <p class="no-list">보낸 선물이 없습니다</p>
                <div class="btn-area">
                  <button
                    type="button"
                    class="btn-dali daligreen"
                    @click="tabAction('tabGiveGift')"
                  >달리드림 멤버십 회원권 선물하기</button>
                </div>
              </div>
              <!-- END : 보낸 선물 없음 -->
            </div>
            <!-- END : 보낸 선물 탭 -->
          </div>
          <!-- START : 탭 콘텐츠 영역 -->
        </div>
        <PopupDaliSentMessages
          @popupEvent="popupAction"
          v-if="this.popup.popupDaliSentMessages"
          :popup="popup"
        />
        <!-- 팝업 : 보낸 메시지 -->
        <PopupDaliGiftCancel @popupEvent="popupAction" v-if="this.popup.popupDaliGiftCancel" />
        <!-- 팝업 : 결제취소 알림 -->
        <PopupCardStatement
          :tdrStatRslt="tdrStatRslt"
          @popupEvent="popupAction('popupCardStatement')"
          v-if="this.popup.popupCardStatement"
        />
        <!-- 팝업 - 신용카드 매출전표 -->
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import PopupCardStatement from '@/views/cs/recptmgnt/PopupCardStatement'; //  팝업 - 신용카드 매출전표
import PopupDaliSentMessages from '@/views/cu/pmbsmgnt/PopupDaliSentMessages'; // 팝업 : 보낸 메시지
import PopupDaliGiftCancel from '@/views/cu/pmbsmgnt/PopupDaliGiftCancel'; // 팝업 : 결제취소 알림
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import ShareUtils from '@/common/ShareUtils';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'DaliGiftBox',
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    PopupDaliSentMessages, // 보낸 메시지
    PopupDaliGiftCancel, // 결제취소 알림
    PopupCardStatement, // 팝업 - 신용카드 매출전표
  },
  data() {
    return {
      form: {
        trCert: 'Y',
      },
      tab: {
        tabGiveGift: true,
        tabReceivedGift: false,
        tabSentGift: false,
      },
      innerTab: {
        tabMobilePhone: true,
        tabKakaotalk: false,
      },
      popup: {
        // 팝업
        promId: '',
        open: false,
        popupDaliSentMessages: false,
        popupDaliGiftCancel: false,
        popupCardStatement: false,
      },
      hasData: {
        receive: true,
        sent: true,
      },
      bgGray: true,
      isVisible: 0,
      inpTxtLen: 0,
      receiveCpnList: [],
      sendCpnList: [],
      CU0005S: [],
      sendTyp: 'tabMobilePhone',
      selecTyp: '1',
      selecNm: '',
      selecTel: '',
      giftMsgCnts: '',
      selecMsg: '',
      selecMsgPre: '',
      selecTelPre: '',
      totSum: 3900,
      giftTrcPinNo: '',
      pmbsTdrNo: '',
      pmbsGiftDt: '',
      sendUrl: '',
      msgTyp: 0,
      tdrStatRslt: {},
      tdrMeansRsltList: {},
      rcvMemInfo: [],
      cmmMbrNo: '',
      appYn: appIF.isApp(),
      myTelInfo: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '멤버십 선물함 < 달리살다 멤버십 < 마이페이지 <%s',
    meta: [
      {
        property: 'aa:page',
        content: '달리드림 멤버십 회원권 선물함',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction(type, msg) {
      // 팝업 활성/비활성
      this.popup.promId = msg;
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false); // view - body
    },
    // 신용카드 매출 전표
    popupCardStatementAction(ordId) {
      this.retrieveMobilRecptInfo(ordId);
    },
    goUrl(url) {
      this.$router.push(url);
    },
    commo(uri) {
      return SiteUtils.commo(uri);
    },
    goDali() {
      location.href = SiteUtils.dalimo('/cp/gnb_dream_pass_benefit');
    },
    getByteLength(str) {
      if (StringUtils.getByteLength(str) < 100) {
        this.inpTxtLen = StringUtils.getByteLength(str);
      } else {
        this.giftMsgCnts = str.substr(0, 30);
        this.inpTxtLen = StringUtils.getByteLength(this.giftMsgCnts);
      }
    },
    numberOnly: function (str) {
      this.selecTel = str.replace(/[^0-9]/g, '');
      // return str;
    },
    changeCpnType(event) {
      // 선물 타입 변경
      const $this = event.target;
      this.selecTyp = $this.value;
    },
    tabAction(type) {
      // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
      if (type == 'tabReceivedGift') {
        // retrieveGiftCpn();
      }
    },
    shareKa(giftUrl, custNm) {
      const img =
        'http://k.kakaocdn.net/dn/D1Foo/btqFONBwcGk/haWHoUtRpNk82a9LxrtNK0/kakaolink40_original.jpg';
      const snsUrl = this.commo('/cu/pbms_view_gift') + '?no=' + this.giftUrl;
      const title = '달리살다';
      const text1 = custNm + '님이 보내신 선물이 도착했어요';
      const text2 = '';
      ShareUtils.shareKakaoTalk(snsUrl, text1, img, title, text2);
    },
    async sendSms(pmbsTdrNo) {
      const InputDto = {
        pmbsTdrNo: pmbsTdrNo,
        reSend: 'Y',
      };
      const result = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/paidmembership-coupon-dispatch-sms',
        InputDto
      );
    },
    innerTabAction(type) {
      // innertab
      for (let i = 0; i < Object.keys(this.innerTab).length; i++) {
        this.innerTab[Object.keys(this.innerTab)[i]] = false;
      }
      this.innerTab[type] = true;
      this.$refs.tabContents.focus();
      this.sendTyp = type;
    },
    dateFormat(dateStr) {
      if (!StringUtils.isEmpty(dateStr)) {
        return DateUtils.format(dateStr, 'YYYY.MM.DD');
      }
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    phoneMask(phone) {
      const hplen = phone.length - 4;
      return phone.substring(0, 3) + '-****-' + phone.substring(hplen);
    },
    kname(knm) {
      let rtn = '';
      if (knm.length > 4) {
        rtn = knm.substring(0, 4) + '..';
      } else {
        rtn = knm;
      }
      return rtn;
    },
    showTextarea(el) {
      this.msgTyp = el;
      this.isVisible = el;
    },
    showChg(typ) {
      // this.sMsg.text = this.selecMsg;
      if (typ == 0) {
        this.selecMsgPre = this.giftMsgCnts;
      } else {
        this.giftMsgCnts = this.selecMsgPre;
      }
    },
    msgAgain(typ, pmbsTdrNo, giftUrl, custNm) {
      let msg = '';
      if (typ == '01') {
        msg =
          '선물을 재전송하시겠습니까? <br/>카카오톡에서 받으실 친구를 선택해주세요.<br/>※ 카카오톡 메시지는 회수가 불가하니<br/>수신자를 잘못 선택 하지 않도록 유의해주세요.';
      } else {
        msg = '선물을 재전송 하시겠습니까?';
      }
      this.$gsdialog.confirm(msg, { html: true }).then((dialog) => {
        if (typ == '01') {
          this.shareKa(giftUrl, custNm);
        } else {
          this.sendSms(pmbsTdrNo);
        }
      });
    },
    giftCanclePop(giftTrcPinNo, pmbsTdrNo, pmbsGiftDt) {
      this.giftTrcPinNo = giftTrcPinNo;
      this.pmbsTdrNo = pmbsTdrNo;
      this.pmbsGiftDt = pmbsGiftDt;
      this.pmbsGiftStatCd = '02';
      this.popupAction('popupDaliGiftCancel');
      // this.retrieveOrdItemInfo(pmbsTdrNo);
    },
    async getMemInfo() {
      const resultMemInfo = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      ); // 회원정보 가져오기
      this.rcvMemInfo = resultMemInfo.data.data;
      this.cmmMbrNo = this.rcvMemInfo.cmmMbrNo;
    },
    async cuGiftCancel() {
      const PmbsTdrCnclDto = {
        giftTrcPinNo: this.giftTrcPinNo,
        pmbsTdrNo: this.pmbsTdrNo,
        pmbsGiftDt: this.pmbsGiftDt,
        pmbsGiftStatCd: this.pmbsGiftStatCd,
      };
      const result = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/paidmembership-tender-cancel',
        PmbsTdrCnclDto
      );
      if (result.data.success) {
        this.$gsdialog.alert('취소처리 되었습니다.').then((dialog) => {
          this.giftList();
        });
      } else {
        this.$gsdialog.alert('오류가 발생했습니다.');
      }
    },
    async giftCancle() {
      this.totCncl(this.pmbsTdrNo);
    },
    async retrieveMobilRecptInfo(ordId) {
      // 모바일영수정(전자영수증) 상세 정보 조회
      const params = {
        cmmMbrNo: this.cmmMbrNo,
        ordId: ordId, // 주문ID
      };
      const res = await ApiUtils.get(
        '/fo/cs/recptmgnt/mobile-receipt-info',
        params
      );
      if (res.data === null || !res.data.success) {
        return;
      }
      this.tdrMeansRsltList = res.data.data.tdrMeansRsltList[0]; // 결제수단 목록
      this.tdrStatRsltList = res.data.data.tdrStatRsltList[0]; // 결제내역 목록
      this.tdrStatRslt = this.tdrMeansRsltList;
      this.tdrStatRslt.ordId = ordId;
      this.tdrStatRslt.supplFirmCd = this.tdrStatRsltList.supplFirmCd;
      this.popupAction('popupCardStatement');
    },
    async giftList() {
      const PmbsGiftCpnInqInputDto = { giftSendYn: 'N' };
      const receiveCpnData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-gift-coupon',
        PmbsGiftCpnInqInputDto
      );
      this.receiveCpnList = receiveCpnData.data.data;
      //
      const sendCpnDataDto = { giftSendYn: 'Y' };
      const sendCpnData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-gift-coupon',
        sendCpnDataDto
      );
      this.sendCpnList = sendCpnData.data.data;
    },
    // 전체취소 처리
    async totCncl(ordId) {
      const apiUrl = '/fo/cs/frontOrdAllCnclAcept';
      const params = {
        cmmMbrNo: this.cmmMbrNo,
        userId: this.cmmMbrNo,
        ordId: ordId,
      };

      ApiUtils.post(apiUrl, params).then((res) => {
        if (!res.data.success) {
          this.$gsdialog
            .alert('선물 취소가 실패하였습니다.')
            .then((dialog) => {});
          return;
        } else {
          if (res.data.statusCode == '0000') {
            // this.
            this.cuGiftCancel();
          } else {
            this.$gsdialog
              .alert(
                '선물 취소가 실패하였습니다.<br>( ' +
                  res.data.statusMessage +
                  ' )',
                { html: true }
              )
              .then((dialog) => {});
          }
        }
      });
      // }
    },
    async createGift() {
      // this.orderPaymentProc();
      sessionStorage.setItem('pmbsTdrNo', '');
      const success = this.isValidation();
      if (success) {
        if (this.sendTyp == 'tabMobilePhone') {
          this.dsptChanlTypeCd = '00';
        } else {
          this.dsptChanlTypeCd = '01';
        }

        const InputDto = {
          rcvpsNm: this.selecNm,
          rcvTelNo: this.selecTel,
          giftMsgCnts: this.giftMsgCnts,
          pmbsGiftQty: this.selecTyp,
          dsptChanlTypeCd: this.dsptChanlTypeCd,
        };
        const result = await ApiUtils.post(
          '/fo/cu/pmbsmgnt/paidmembership-gift-coupon-dispatch',
          InputDto
        );
        if (result.data.success) {
          sessionStorage.setItem('pmbsTdrNo', result.data.data.pmbsTdrNo);
          this.$router.push('/cu/pbms_payment_gift');
        } else {
          this.$gsdialog.alert('오류가 발생했습니다.2');
        }
      }
    },
    payGift() {
      const success = this.isValidation();
      if (success) {
        sessionStorage.setItem('pmbsOrdId', '');
        sessionStorage.setItem('selecTyp', this.selecTyp);
        sessionStorage.setItem('selecNm', this.selecNm);
        sessionStorage.setItem('selecTel', this.selecTel);
        sessionStorage.setItem('selecMsg', this.giftMsgCnts);
        sessionStorage.setItem('sendTyp', this.sendTyp);
        sessionStorage.setItem('sendNm', this.rcvMemInfo.custNm);
        sessionStorage.setItem('sendTel', this.rcvMemInfo.moblTelNo);
        sessionStorage.setItem('sendNo', this.rcvMemInfo.cmmMbrNo);
        this.createGift();
      }
    },
    getMyTelInfo() {
      const that = this;
      window.telInfo = function (response) {
        that.myTelInfo = response;
        if (that.myTelInfo !== null) {
          that.selecNm = response.name;
          // that.selecTel = response.tel;
          const tel = response.tel.replace(/(\s*)/g, '');
          if (tel.substring(0, 1) === '+') {
            // 국가코드 여부
            const naReTel = tel.substring(3);
            if (naReTel.substring(0, 1) !== 0) {
              const naVal = '0' + naReTel;
              that.selecTel = naVal;
            } else {
              that.selecTel = naReTel;
            }
          } else {
            that.selecTel = tel;
          }
        }
      };
      appCallContacts();
    },
    isValidation: function () {
      let success = true;
      if (StringUtils.isEmpty(this.selecTyp)) {
        this.$gsdialog.alert('선물하실 쿠폰을 선택해주세요');
        success = false;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.selecNm))) {
        this.$gsdialog.alert('받는 분의 이름을 입력해주세요');
        success = false;
      } else if (
        this.sendTyp == 'tabMobilePhone' &&
        StringUtils.isEmpty(StringUtils.trim(this.selecTel))
      ) {
        this.$gsdialog.alert('받는 분의 핸드폰 번호를 입력해주세요');
        success = false;
      } else if (StringUtils.isEmpty(StringUtils.trim(this.giftMsgCnts))) {
        this.$gsdialog.alert('메세지 카드를 작성해주세요');
        success = false;
      } else if (this.msgTyp == 1) {
        this.$gsdialog.alert('작성중인 메시지를 저장해주세요');
        success = false;
      }
      return success;
    },
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
  watch: {
    giftMsgCnts(newVal) {
      const len = StringUtils.getByteLength(newVal);
      if (len < 100) {
        this.inpTxtLen = len;
      } else {
        let strLength = 0;
        let strTitle = '';
        let strPiece = '';

        for (let i = 0; i < newVal.length; i++) {
          let code = newVal.charCodeAt(i);
          const ch = newVal.substr(i, 1).toUpperCase();
          // 체크 하는 문자를 저장
          strPiece = newVal.substr(i, 1);
          code = parseInt(code);

          if (
            (ch < '0' || ch > '9') &&
            (ch < 'A' || ch > 'Z') &&
            (code > 255 || code < 0)
          ) {
            strLength = strLength + 3; // UTF-8 3byte 로 계산
          } else {
            strLength = strLength + 1;
          }

          if (strLength > 100) {
            // 제한 길이 확인
            break;
          } else {
            strTitle = strTitle + strPiece; // 제한길이 보다 작으면 자른 문자를 붙여준다.
          }
        }
        this.giftMsgCnts = strTitle;
      }
    },
    selecTel(newVal) {
      const reg = /[^0-9]/gi;
      this.selecTel = newVal.replace(reg, '');
    },
  },
  async mounted() {
    // 배경 컬러 넣기
    const that = this;
    if (
      this.$route.query.membership == '1' ||
      this.$route.query.membership == '2' ||
      this.$route.query.membership == '3' ||
      this.$route.query.membership == '4'
    ) {
      eval('radio0' + this.$route.query.membership).checked = true;
      if (this.$route.query.membership == '2') {
        this.selecTyp = 3;
      } else if (this.$route.query.membership == '3') {
        this.selecTyp = 6;
      } else if (this.$route.query.membership == '4') {
        this.selecTyp = 12;
      } else {
        this.selecTyp = 1;
      }
    }
    this.giftMsgCnts = '달리드림 멤버십 회원권이 도착했어요.';
    this.selecMsgPre = this.giftMsgCnts;
    const daliCont = document.querySelector('.wrap-dalidream');
    if (this.bgGray) {
      daliCont.classList.add('bg-gray');
    }
    ShareUtils.init();
    this.giftList();
    this.getMemInfo();
  },
};
</script>
<style lang="scss"></style>
