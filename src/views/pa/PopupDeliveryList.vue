<template>
  <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
  <!-- : 실사용 소스 -->
  <div
    id="popupDeliveryList"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{active : this.modalActive.popupDeliveryList || this.deliveryListActive}, siteClass]"
  >
    <div class="header-popup">
      <strong>배송지 목록</strong>
    </div>
    <div class="full-popup-body scroll-area has-fixed-bottom">
      <div class="inner-full-popup">
        <div class="delivery-management">
          <div class="title">
            <h3 class="hidden">배송지 목록</h3>
            <a href="#" class="btn-border btn-small right">배송지 추가</a>
          </div>
          <!-- START : 배송지 리스트 -->
          <div class="delivery-list">
            <ul class="addr-list">
              <li>
                <p class="inp-radio small">
                  <input type="radio" name="addrList" id="addr01" checked="checked" />
                  <label for="addr01">
                    <span class="name">
                      <strong>홍길동</strong>[우리집]
                      <span class="default">기본배송지</span>
                    </span>
                  </label>
                </p>
                <p class="addr-txt">
                  <span class="code">02651</span> 서울시 강남구 강남대로 154길 해송빌딩 4층
                  <span class="lot-number">지번 : 서울 강남구 신사동 515-5 해송빌딩 4층</span>
                  <span class="cell-num">010-1234-5678</span>
                </p>
                <!-- 새벽배송 START : 2020. 03. 23 새벽배송 콘텐츠 추가 -->
                <span class="branch">당일배송 (Fresh 1호센터)</span>
                <span class="branch">새벽배송 (Fresh 새벽센터)</span>
                <!-- 새벽배송 END : 2020. 03. 23 새벽배송 콘텐츠 추가 -->
              </li>
              <li>
                <p class="inp-radio small">
                  <input type="radio" name="addrList" id="addr02" />
                  <label for="addr02">
                    <span class="name">
                      <strong>홍길동</strong>[우리집]
                    </span>
                  </label>
                </p>
                <p class="addr-txt">
                  <span class="code">02651</span> 서울시 강남구 강남대로 154길 해송빌딩 4층
                  <span class="lot-number">지번 : 서울 강남구 신사동 515-5 해송빌딩 4층</span>
                  <span class="cell-num">010-1234-5678</span>
                </p>
                <!-- 새벽배송 START : 2020. 03. 23 새벽배송 콘텐츠 추가 -->
                <span class="branch">당일배송 (초읍점)</span>
                <!-- 새벽배송 END : 2020. 03. 23 새벽배송 콘텐츠 추가 -->
              </li>
              <!-- 4월수정 START : 비활성화 케이스 추가 -->
              <li class="disabled">
                <p class="inp-radio small">
                  <input type="radio" name="addrList" id="addr03" disabled />
                  <label for="addr03">
                    <span class="name">
                      <strong>홍길동</strong>[우리집]
                    </span>
                  </label>
                </p>
                <p class="addr-txt">
                  <span class="code">02651</span> 서울시 강남구 강남대로 154길 해송빌딩 4층
                  <span class="lot-number">지번 : 서울 강남구 신사동 515-5 해송빌딩 4층</span>
                  <span class="cell-num">010-1234-5678</span>
                </p>
                <!-- 새벽배송 START : 2020. 03. 23 새벽배송 콘텐츠 추가 -->
                <span class="branch">당일배송 (전국택배몰)</span>
                <!-- 새벽배송 END : 2020. 03. 23 새벽배송 콘텐츠 추가 -->
              </li>
              <!-- 4월수정 END : 비활성화 케이스 추가 -->
            </ul>
          </div>
          <!-- END : 배송지 리스트 -->
        </div>
        <div class="popup-btns-fixed-bottom">
          <button class="btn-lg btn-bg lightgreen">변경</button>
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
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'PopupDeliveryList',
  props: ['deliveryListActive'], // 4월수정 : 메인에서 배송지 목록 팝업 호출 액션 추가로 props 적용
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지 목록 < %s',
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {},
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDeliveryList');
      this.modalActiveEvent('popupDeliveryList');
    },
  },
  mounted() {
    this.modalActiveEvent('popupDeliveryList');
  },
};
</script>
