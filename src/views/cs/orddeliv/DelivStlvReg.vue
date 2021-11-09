<!--
Design: views\ss\SC-FO-SS-GF-MS-712.vue
Pg id:
Uri: /cs/orddeliv/deliv_stlv_reg
-->

<!--
e-커머스 Front(API) 마이페이지 주문배송조회 주문배송목록 PG-FO-CS-I003 IF-FO-CS-I103 배송만족도 설문결과 저장
IF-FO-CS-I103
배송만족도 설문결과 저장(saveDelivStlvSrvyRslt)
배송만족도 설문결과를 등록
/fo/cs/orddelivmgnt/delivery-satisfaction-level-survey-result
-->

<template>
  <!-- : 실사용 소스 -->
  <div
    id="popupSatisfaction"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{ active: this.modalActive.popupSatisfaction }, siteClass]"
  >
    <div class="header-popup">
      <strong>배송만족도조사</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-satisfation-survey">
          <p class="survey-text">오늘 배송은 만족하셨나요?</p>
          <div class="question-list">
            <dl>
              <dt class="question">배송 매니저 친절도를 평가해주세요.</dt>
              <dd class="satisfation-area wrap-flex">
                <button
                  type="button"
                  v-for="(item, index) in satisfy"
                  :key="item"
                  :class="{ active: active == index }"
                  @click="satisfationAction(index)"
                >
                  {{ item }}
                </button>
              </dd>
              <dd>
                <span class="inp-chk small">
                  <input
                    type="checkbox"
                    name=""
                    id="checkbox01"
                    value="6"
                    @click="satisfationAction(6)"
                    v-model="qstAnsRsltInfo.qstSelVal0102"
                  />
                  <label for="checkbox01">만나지 못했습니다.</label>
                </span>
              </dd>
              <dt class="question">배송요청사항이 지켜지지 않았나요?</dt>
              <dd class="wrap-flex">
                <span class="inp-radio small">
                  <input
                    type="radio"
                    name="radio"
                    id="question01"
                    value="1"
                    v-model="qstAnsRsltInfo.qstSelVal02"
                  />
                  <label for="question01">지켜졌습니다.</label>
                </span>
                <span class="inp-radio small">
                  <input
                    type="radio"
                    name="radio"
                    id="question02"
                    value="2"
                    v-model="qstAnsRsltInfo.qstSelVal02"
                  />
                  <label for="question02">지켜지지 않았습니다.</label>
                </span>
              </dd>
              <dt class="question">의견을 직접 입력해주세요</dt>
              <dd>
                <textarea
                  name=""
                  ref="txtDelivStlvCnts"
                  id="txtDelivStlvCnts"
                  placeholder="더 좋은 배송서비스를 위해 배송매니저님께 전달하겠습니다."
                  cols="30"
                  rows="10"
                  class="opinion"
                  v-model="qstAnsRsltInfo.qstSelVal03"
                >
                </textarea>
              </dd>
            </dl>
          </div>
          <!-- 수정 END : 2020.03.05 수정 -->
        </div>
        <div class="popup-btns-fixed-bottom">
          <button
            class="btn-lg btn-bg"
            :class="regChk"
            @click="save"
          >
            평가완료
          </button>
        </div>
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupAction"
      @keydown.9="tabFocusRemove('popupAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import UseNotWords from '@/common/cu/UseNotWords';

export default {
  name: 'PopupSatisfaction',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송만족도조사 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '배송만족도조사',
      },
    ],
  },
  props: {
    mbrDelivParamInfo: {
      type: Object,
    },
  },
  data() {
    return {
      satisfy: ['1점', '2점', '3점', '4점', '5점'],
      active: -1,
      surveyComplete: false, // 설문 조사 완료 시 true
      qstAnsRsltInfo: {
        ordId: null, // 주문ID
        delivId: null, // 배송ID
        qstSelVal01: null,
        qstSelVal0101: null,
        qstSelVal0102: null,
        qstSelVal02: null,
        qstSelVal03: null,
      },
      p: this.$route.params.p,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {},
  methods: {
    // 팝업 활성 / 비활성
    popupAction() {
      if (this.p) {
        this.$router.replace('/');
      } else {
        this.$emit('popupEvent', 'popupSatisfaction');
        this.modalActiveEvent('popupSatisfaction');
      }
    },
    // 1번 문항 선택 이벤트
    satisfationAction(idx) {
      //  만나지 못한 경우
      if (idx == 6) {
        this.active = -1;
        this.qstAnsRsltInfo.qstSelVal0101 = null;
      }
      //  점수를 선택한 경우
      if (idx != 6) {
        this.qstAnsRsltInfo.qstSelVal0102 = false;
        if (this.active !== idx) {
          this.active = idx;
          this.qstAnsRsltInfo.qstSelVal0101 = idx + 1;
        }
      }
    },
    // 1번 문항 답변여부
    isRegQst01() {
      let rtnVal = true;
      if (StringUtils.isEmpty(this.qstAnsRsltInfo.qstSelVal0101)) {
        if (
          StringUtils.isEmpty(this.qstAnsRsltInfo.qstSelVal0102) ||
          !this.qstAnsRsltInfo.qstSelVal0102
        ) {
          rtnVal = false;
        }
      }
      return rtnVal;
    },
    // 답변저장
    async save() {
      // 문의유형 선택 여부 체크
      if (!this.isRegQst01()) {
        this.$gsdialog.alert('1번 문항을 작성해주세요.').then(dialog => {});
        return false;
      }
      if (StringUtils.isEmpty(this.qstAnsRsltInfo.qstSelVal02)) {
        this.$gsdialog.alert('2번 문항을 작성해주세요.').then(dialog => {});
        return false;
      }
      // 문의내용입력 여부 체크
      if (
        StringUtils.isEmpty(
          StringUtils.trim(this.qstAnsRsltInfo.qstSelVal03)
        ) == true
      ) {
        this.$gsdialog.alert('3번 문항을 작성해주세요.').then(dialog => {
          this.$refs.txtDelivStlvCnts.focus();
        });
        return false;
      }
      // 문의내용입력 byte 체크(최대 4000byte)
      if (StringUtils.getByteLength(this.qstAnsRsltInfo.qstSelVal03) > 4000) {
        this.$gsdialog.alert('의견은 4000byte까지만 가능합니다.').then(dialog => {
          this.$refs.txtDelivStlvCnts.focus();
        });
        return false;
      }
      // 금칙어 사용 여부 체크
      // const words = UseNotWords.getWords();
      // for (let n=0; n < words.length; n++) {
      //   if (this.qstAnsRsltInfo.qstSelVal03.indexOf(words[n]) != -1) {
      //     this.$gsdialog.alert("작성하신 글에 금칙어가 포함되어 있습니다.");
      //     return false;
      //   }
      // }

      const confirmFlag = await this.$gsdialog.confirm(
        '평가를 저장하시겠습니까?'
      ).then().catch(() => {
        console.log('cliecked on Cancel');
      });
      if (confirmFlag) {
        this.qstAnsRsltInfo.encDelivId = this.p; // 직접 링크로 들어온 파라메터
        if (!StringUtils.isEmpty(this.mbrDelivParamInfo)) { // 부모창에서 배송만족도로 들어온 경우.
          this.qstAnsRsltInfo.ordId = this.mbrDelivParamInfo.ordId; // 주문ID
          this.qstAnsRsltInfo.orgDelivId = this.mbrDelivParamInfo.orgDelivId; // 배송ID
        }
        this.qstAnsRsltInfo.qstSelVal01 = this.qstAnsRsltInfo.qstSelVal0101;
        if (this.qstAnsRsltInfo.qstSelVal0102) {
          this.qstAnsRsltInfo.qstSelVal01 = '6'; /* 만나지 못한 경우 6번으로 저장 */
        }
        const params = {
          ...this.qstAnsRsltInfo,
        };
        try {
          const res = await ApiUtils.post('/fo/cs/orddelivmgnt/delivery-satisfaction-level-survey-result', params);
          if (res.data.success === true) {
            this.$gsdialog.alert('저장 되었습니다.').then(dialog => {
              this.$emit('popupSatisfactionCallback', '');
              this.popupAction();
            });
          } else if (res.data.success == false) {
            this.$gsdialog.alert(res.data.statusMessage).then(dialog => {
              this.$emit('popupSatisfactionCallback', '');
              this.popupAction();
            });
          }
        } catch (e) {
          this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
            console.log(e);
          });
        }
      }
    },
  },
  mounted() {
    this.modalActiveEvent('popupSatisfaction');
  },
  computed: {
    regChk() {
      let regYn = true;
      if (!this.isRegQst01()) regYn = false;
      if (StringUtils.isEmpty(this.qstAnsRsltInfo.qstSelVal02)) regYn = false;
      if (StringUtils.isEmpty(this.qstAnsRsltInfo.qstSelVal03)) regYn = false;
      return regYn ? 'lightgreen' : 'darkgray';
    },
  },
};
</script>
