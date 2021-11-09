<template>
  <!-- START : 받는분 -->
  <section class="section-area receive-info">
    <div class="sub-title">
      <h2>받는분 <span class="required" aria-label="필수 항목">*</span></h2>
    </div>
    <div class="sub-inner-box">
      <dl class="recent-gift-info" v-if="readType === 'Y'">
        <template v-if="giftReceiveInfoList.length > 0">
          <dt>최근 보낸 사람</dt>
          <dd><button v-for="(giftReceiveInfo, index) in giftReceiveInfoList" v-bind:key="index" class="btn-name" @click="setTelInfo(giftReceiveInfo)">#{{giftReceiveInfo.giftRcptCmmMbrNm}}</button></dd>
        </template>
      </dl>
      <div class="select-freinds order">
        <div class="wrap-tab-gift">
          <!-- START : 선물하실 친구 선택하기 탭 영역 -->
          <ul ref="tabList" class="tablist" v-if="readType === 'Y'">
            <li>
              <button type="button" id="tabKakaotalk" class="btn-kakao" aria-label="카카오톡으로선물하기" aria-controls="tabKakaotalk-contents" @click="tabAction('tabKakaotalk')" :class="{active: this.tab.tabKakaotalk}">
                <span>카카오톡</span>
              </button>
            </li>
            <li>
              <button type="button" id="tabMobilePhone" class="btn-phone" aria-label="휴대폰번호로선물하기" aria-controls="tabMobilePhone-contents" @click="tabAction('tabMobilePhone')" :class="{active: this.tab.tabMobilePhone}">
                <span>휴대폰 번호</span>
              </button>
            </li>
          </ul>
          <!-- END : 선물하실 친구 선택하기 탭 영역 -->
          <!-- START : 문자로 전송 -->
          <div id="tabMobilePhone" class="tabcontents" aria-labelledby="tabMobilePhone-contents" v-if="this.tab.tabMobilePhone">
            <div class="wrap-tab-inner">
              <h2 class="title hidden">문자로 전송</h2>
              <fieldset>
                <legend>휴대폰 번호로 아이디 찾기</legend>
                <div class="input-box" v-if="readType === 'Y' && !appYn">
                  <input type="text" class="inp-txt w100" id="rcptAdrsNm" name="rcptAdrsNm" v-model="rcptAdrsNm" value="" title="받는 분의 이름을 입력 해주세요." placeholder="받는 분의 이름을 입력 해주세요." @blur="giftRcptInfoEvent()">
                </div>
                <div class="input-box" v-if="readType === 'Y' && appYn">
                  <input type="text" class="inp-txt name" id="rcptAdrsNm" name="rcptAdrsNm" v-model="rcptAdrsNm" value="" title="받는 분의 이름을 입력 해주세요." placeholder="받는 분의 이름을 입력 해주세요." @blur="giftRcptInfoEvent()">
                  <button type="button" class="btn-border btn-contact" @click="getMyTelInfo()">내 연락처 가져오기</button>
                </div>
                <div class="input-box" v-if="readType === 'N'">
                  <input type="text" id="rcptAdrsNm" name="rcptAdrsNm" class="inp-txt w100" value="홍길동" title="받는분 이름" v-model="rcptAdrsNm" disabled readonly />
                </div>
                <p class="insert-tel" v-if="readType === 'Y'">
                  <span class="wrap-select">
                    <select id="rcptTelCoNo" name="rcptTelCoNo" v-model="rcptTelCoNo" class="w-small" title="휴대폰 번호 앞자리">
                      <option v-for="telCoNoInfo in telCoNoList" v-bind:key="telCoNoInfo.commCd" v-bind:value="telCoNoInfo.commCd">{{telCoNoInfo.commCdNm}}</option>
                    </select>
                  </span>
                  <input type="number" min="00000000" max="99999999" id="rcptTelCoNo2" name="rcptTelCoNo2" v-model="rcptTelCoNo2" class="inp-txt" value="" @keyup="checkNumberLength(rcptTelCoNo2)"  @blur="giftRcptInfoEvent()" placeholder="‘ - ’ 없이 숫자만 입력" title="휴대폰 번호 뒷자리">
                </p>
                <div class="input-box" v-if="readType === 'N' && (giftMsgInfo != null && giftMsgInfo.msgTmplSpCd === '3')">
                  <input type="tel" id="rcptTelCoNo2" name="rcptTelCoNo2" class="inp-txt" v-model="numberText" readonly disabled />
                </div>
              </fieldset>
              <ul class="txt-send-info" v-if="readType === 'Y'">
                <li class="ico-alert2">전화번호를 정확하게 입력해주세요.</li>
                <li class="ico-alert2 point">선물 받는 분께 주소 입력이 가능한 URL이 문자로 발송됩니다.</li>
              </ul>
              <p class="txt-kakao" v-if="readType === 'N' && (giftMsgInfo != null && giftMsgInfo.msgTmplSpCd === '1')">결제 완료 후에 친구를 선택해주세요</p>
              <ul class="txt-send-info" v-if="readType === 'N' && (giftMsgInfo != null && giftMsgInfo.msgTmplSpCd === '1')">
                <li class="ico-alert2">카카오톡으로 선물이 전송됩니다. <br> 결제를 먼저 완료하신 후에 받는 사람을 선택하실 수 있습니다.</li>
                <li class="ico-alert2 red">다수의 수신자가 선택되지 않도록 유의해주세요.</li>
              </ul>
            </div>
            <!-- END : 문자로 전송 -->
          </div>
          <!-- START : 카카오톡으로 전송 -->
          <div id="tabKakaotalk" class="tabcontents" aria-labelledby="tabKakaotalk-contents" v-if="this.tab.tabKakaotalk">
            <div class="wrap-tab-inner">
              <h2 class="title hidden">카카오톡으로 전송</h2>
              <div class="input-box" v-if="readType === 'Y'">
                <input type="text" class="inp-txt w100" id="rcptAdrsNm" name="rcptAdrsNm" v-model="rcptAdrsNm" value="" title="받는 분의 이름을 입력 해주세요." placeholder="받는 분의 이름을 입력 해주세요." @blur="giftRcptInfoEvent()">
                <!--<button type="button" class="btn-border btn-contact">내 연락처 가져오기</button>-->
              </div>
              <div class="input-box" v-if="readType === 'N'">
                <input type="text" id="rcptAdrsNm" name="rcptAdrsNm" class="inp-txt w100" value="홍길동" title="받는분 이름" v-model="rcptAdrsNm" disabled readonly />
              </div>
              <p class="txt-kakao">결제 완료 후에 친구를 선택해주세요</p>
              <ul class="txt-send-info">
                <li class="ico-alert2">카카오톡으로 선물이 전송됩니다. <br> 결제를 먼저 완료하신 후에 받는 사람을 선택하실 수 있습니다.</li>
                <li class="ico-alert2 red">다수의 수신자가 선택되지 않도록 유의해주세요.</li>
              </ul>
            </div>
          </div>
          <!-- END : 카카오톡으로 전송 -->
        </div>
      </div>
    </div>
  </section>
  <!-- END : 받는분 -->
</template>

<script>
import OdUtils from '@/common/od/OdUtils'; // 주문공통
import ApiUtils from '@/common/ApiUtils';
export default {
  props: {
    giftReceiveInfoList: Array, // 최근보낸사람
    telCoNoList: Array,
    giftMsgInfo: Object,
    readType: String,
  },
  name: "GiftReceiveInfo",
  data() {
    return {
      rcptTelCoNo: '010',
      rcptTelCoNo2: '',
      rcptAdrsNm: '',
      rcptDlvp: {
        rcptAdrsNm: '',
        rcptTelNo: '',
        msgTmplSpCd: '3',
      },
      tab: {
       tabMobilePhone: true,
       tabKakaotalk: false,
      },
      numberText: '',
      appYn: this.isGsApp(),
      myTelInfo: {},
    };
  },
  mixins: [OdUtils],
  components: {
  },
  watch: {
    giftMsgInfo() {
      if (this.giftMsgInfo.giftTrpsTelNo != '' && this.giftMsgInfo.giftTrpsTelNo != undefined) {
        this.rcptTelCoNo = (this.giftMsgInfo.giftTrpsTelNo).substring(0, 3);
        this.rcptTelCoNo2 = (this.giftMsgInfo.giftTrpsTelNo).substring(3);
        if (this.readType === 'N') {
          this.setPhoneNumber();
        }
      }
      this.rcptAdrsNm = this.giftMsgInfo.giftRcptCmmMbrNm;
    }
  },
  methods: {
    tabAction(type) { // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.giftRcptInfoEvent();
    },
    // 자리수체크
    checkNumberLength(str) {
      if (str.length > 8) {
        const temp = str.substring(0, 8);
        this.rcptTelCoNo2 = temp;
      }
    },
    // 수취자정보 이벤트
    giftRcptInfoEvent() {
      this.rcptDlvp.rcptAdrsNm = this.rcptAdrsNm;
      if (this.tab.tabMobilePhone === true) {
        this.rcptDlvp.rcptTelNo = this.rcptTelCoNo+''+this.rcptTelCoNo2;
      }
      if (this.tab.tabMobilePhone === true) {
        this.rcptDlvp.msgTmplSpCd = '3'; // 문자전송
      } else if (this.tab.tabKakaotalk === true) {
        this.rcptDlvp.msgTmplSpCd = '1'; // 카카오 공유
      }
      this.$emit('giftRcptInfoEvent', this.rcptDlvp);
    },
    setPhoneNumber() {
      let numberText = "";
      numberText += this.rcptTelCoNo + "-";
      numberText += this.rcptTelCoNo2.substring(0, 4) + "-";
      numberText += this.rcptTelCoNo2.substring(4, this.rcptTelCoNo2.length);
      this.numberText = numberText;
    },
    setTelInfo(giftReceiveInfo) {
      this.rcptAdrsNm = giftReceiveInfo.giftRcptCmmMbrNm;
      if (this.tab.tabMobilePhone === true) {
        this.rcptTelCoNo = (giftReceiveInfo.giftTrpsTelNo).substring(0, 3);
        this.rcptTelCoNo2 = (giftReceiveInfo.giftTrpsTelNo).substring(3);
      }
      this.giftRcptInfoEvent();
    },
    getMyTelInfo() {
      const that = this;
      window.telInfo = function(response) {
        that.myTelInfo = response;
        if (that.myTelInfo !== null) {
          that.rcptAdrsNm = response.name;
          const tel = response.tel.replace(/(\s*)/g, "");
          if (tel.length >= 11 && that.telCoNoList != undefined && that.telCoNoList != null) {
            if (tel.substring(0, 1) === '+') { // 국가코드 여부
              const naReTel = tel.substring(3);
              const telComp = that.telCoNoList;
              for (let i=0; i < telComp.length; i++) {
                if (naReTel.substring(0, 1) === 0 && telComp[i].commCd === naReTel.substring(0, 3)) {
                  that.rcptTelCoNo = telComp[i].commCd;
                  that.rcptTelCoNo2 = naReTel.substring(3);
                  break;
                } else if (naReTel.substring(0, 1) !== 0) {
                  const naVal = '0' + naReTel.substring(0, 2);
                  if (telComp[i].commCd === naVal) {
                    that.rcptTelCoNo = naVal;
                    that.rcptTelCoNo2 = naReTel.substring(2);
                    break;
                  }
                } else {
                  that.rcptTelCoNo2 = tel.substring(3);
                }
              }
            } else {
              for (let i=0; i < that.telCoNoList.length; i++) {
                if (that.telCoNoList[i].commCd === tel.substring(0, 3)) {
                  that.rcptTelCoNo = that.telCoNoList[i].commCd;
                  break;
                }
              }
              that.rcptTelCoNo2 = tel.substring(3);
            }
          } else {
            that.rcptTelCoNo2 = tel;
          }

          that.giftRcptInfoEvent();
        }
      };
      appCallContacts();
    },
  },
  destroyed() {
  },
  mounted() {
  },
  created() {
    ApiUtils.loadScript('https://code.jquery.com/jquery-3.4.1.min.js');
    ApiUtils.loadScript('/js/legacy/common.app.js');
  },
};
</script>
