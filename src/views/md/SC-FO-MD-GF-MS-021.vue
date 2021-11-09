<template>
  <div id="popupQnA" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupQnA}, siteClass]" tabindex="0">
    <div class="header-popup">
      <strong>상품 Q&#38;A 작성</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-form qna">
          <dl>
            <dt>문의유형<span class="required">*</span></dt>
            <dd>
              <div class="wrap-select">
                <select title="문의유형 선택">
                  <option>상품 파손/훼손</option>
                </select>
              </div>
            </dd>
            <dd class="qna-item-select">
              <button class="btn-orderproduct" aria-haspopup="dialog" @click="popupItemSelectAction">나의 주문 선택</button>
            </dd>
            <dd>
              <div class="box-selectproduct">
                <p class="data">2019.12.10 <span>주문번호 : 20527888</span></p>
                <p class="productname"><span>[풀무원] 소고기버섯전골(2~3인분)[풀무원] 소고기버섯전골(2~3인분)</span></p>
                <button type="button" class="btn-del"><span class="hidden">삭제</span></button>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>문의내용<span class="required">*</span></dt>
            <dd>
              <div class="wrap-textarea">
                <textarea title="문의내용 입력" placeholder="최소 10자 이상 작성해주세요."></textarea>
                <span class="input-text-num">0<span>/4000</span></span>
              </div>
              <p class="align-right">
                <span class="inp-chk small">
                  <input type="checkbox" name="formList01" id="formList01" value="">
                  <label for="formList01">비밀글 등록</label>
                </span>
              </p>
            </dd>
          </dl>
        </div>
        <div class="wrap-form qna answerrequest">
          <!-- START : 답변 알림요청  -->
          <div class="wrap-answerrequest">
            <div class="inner-answerrequest">
              <div class="inp-chk small">
                <input type="checkbox" name="" id="chkList01_02" value="" checked="checked">
                <label for="chkList01_02">답변 알림요청</label>
              </div>
              <p class="txt-number">000 - 1234 - 5678</p>
              <a href="#" class="link-more" title="정보수정으로 이동">정보수정</a>
            </div>
          </div>
          <!-- END : 답변 알림요청 -->
        </div>
        <div class="wrap-btn-bottom none-fixed">
          <button class="btn-md btn-bg darkgray">취소</button>
          <button class="btn-md btn-bg lightgreen">등록</button>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupQnAWrite",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '상품 Q&A 작성 < 상품상세 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupQnA');
      this.modalActiveEvent('popupQnA');
    },
    popupItemSelectAction() {
      this.$emit('popupEvent', 'popupQnaItemSelect');
    },
  },
  mounted() {
    this.modalActiveEvent('popupQnA');
  }
};
</script>
