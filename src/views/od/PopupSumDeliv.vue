<template>
  <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
  <div id="PopupSumDeliv" class="wrap-full-popup active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <!-- : 실사용 소스 -->
    <!-- <div id="PopupSumDeliv" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.PopupTotalDelivery}"> -->
    <div class="header-popup">
      <strong>합배송 신청</strong><!-- 4월 수정 : 타이틀 변경 -->
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="gift-total-delivery">
          <!-- 4월 수정 START : 해당 영역 삭제 -->
          <!-- <section class="section-area">
            <p class="txt-total-delivery">현재 결제 완료된  주문이 있습니다.<br>상품 준비 이전에 기존 주문 상품과 합배송 하시면 <br>배송비 추가 없이 함께 받을 수 있습니다.</p>
          </section> -->
          <!-- 4월 수정 END : 해당 영역 삭제 -->
          <section class="section-area">
            <div class="sub-title mt-30"><!-- 4월 수정 : mt-30 class 추가 -->
              <h2>기존 주문 정보</h2>
            </div>
            <div class="sub-inner-box">
              <ul class="option-total-delivery" :class="{'more' : listMore}"><!-- 4월 수정 : listMore 값에 따른 class 추가 -->
                <li>
                  <p>
                    <span class="inp-radio small">
                      <input type="radio" name="info" id="info" :value="sumDelivFirst.ordId+':'+sumDelivFirst.delivId" v-model="chkOrdDelivId">
                      <label for="info">
                        <!-- <strong class="tit">배송일시</strong>4월 수정 : 배송일시 삭제 -->
                        <span class="txt">{{formatDate(sumDelivFirst.delivReqDt)}} {{formatHour(sumDelivFirst.delivBeginTm)}}~{{formatHour(sumDelivFirst.delivEndTm)}}</span>
                      </label>
                    </span>
                  </p>
                  <p class="pickup-location">
                    <!-- <strong class="tit">픽업장소</strong>4월 수정 : 픽업장소 삭제 -->
                    <span class="txt">({{sumDelivFirst.siteNm}}) {{sumDelivFirst.adrsBaseAddr}} {{sumDelivFirst.adrsDtlAddr}}</span>
                  </p>
                  <!-- 4월 수정 START : 더보기 버튼 추가 -->
                  <div class="wrap-btn-more" v-if="!listMore">
                    <button class="btn-more-cart" @click="listMore = true">
                      <span>더보기</span>
                    </button>
                  </div>
                  <!-- 4월 수정 END : 더보기 버튼 추가 -->
                </li>
                <!-- 4월 수정 START : 더보기 버튼 눌렀을때 추가 되는 리스트 추가 -->
                <template v-if="listMore">
                  <li v-for="(sumDeliv, index) in sumDelivRest" v-bind:key="index">
                    <p>
                      <span class="inp-radio small">
                        <input type="radio" name="info" :id="`${'info' + index}`" :value="sumDeliv.ordId+':'+sumDeliv.delivId" v-model="chkOrdDelivId">
                        <label :for="`${'info' + index}`">
                          <span class="txt">{{formatDate(sumDeliv.delivReqDt)}} {{formatHour(sumDeliv.delivBeginTm)}}~{{formatHour(sumDeliv.delivEndTm)}}</span>
                        </label>
                      </span>
                    </p>
                    <p class="pickup-location">
                      <span class="txt">({{sumDeliv.siteNm}}) {{sumDeliv.adrsBaseAddr}} {{sumDeliv.adrsDtlAddr}}</span>
                    </p>
                  </li>
                </template>
                <!-- 4월 수정 START : 더보기 버튼 눌렀을때 추가 되는 리스트 추가 -->
              </ul>
            </div>
          </section>
          <!-- START : 유의사항 -->
          <section class="sub-inner-box">
            <dl class="order-caution">
              <dt class="ico-alert">합배송 유의사항</dt>
              <dd class="ico-alert2">합배송 시 기존 주문의 주소/배송 시간으로 합쳐져 수정이 불가능합니다.</dd>
              <!-- <dd class="ico-alert2">기존 결제한 배송비는 재 계산되어 차액이 발생할 경우, 포인트로 적립하여 드립니다.</dd> -->
            </dl>
          </section>
          <!-- END : 유의사항 -->
        </div>
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <!-- 4월 수정 START : 버튼 클래스 변경 -->
          <p><button type="button" class="btn-lg btn-bg lightgreen" @click="order('Y')">기존 주문과 함께 합배송하기</button></p>
          <p><button type="button" class="btn-lg btn-border white" @click="order('N')">신규 주문하기</button></p>
          <!-- 4월 수정 END : 버튼 클래스 변경 -->
        </div>
        <!-- START : 하단 버튼 -->
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupSumDeliv",
  props: {
    sumDelivList: Array
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '합배송 신청 < %s'
  },
  data() {
    return {
      listMore: false, // 4월 수정 데이터 추가
      chkOrdDelivId: '',
      sumDelivFirst: {},
      sumDelivRest: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupSumDeliv');
      this.modalActiveEvent('popupSumDeliv');
    },
    order(yn) {
      let ordId = '';
      let delivId = '';

      if (yn === 'Y') {
        ordId = this.chkOrdDelivId.split(':')[0];
        delivId = this.chkOrdDelivId.split(':')[1];
      }
      this.$emit('order', ordId, delivId);
      this.$emit('popupEvent', 'popupSumDeliv');
      this.modalActiveEvent('popupSumDeliv');
    },
    formatDate(date) {
      return this.selectDate = DateUtils.format(date, 'YYYY년 MM월 DD일');
    },
    formatHour(date) {
      return this.selectDate = DateUtils.format('99991231' + date, 'HH:mm');
    },
  },
  mounted() {
    this.sumDelivFirst = this.sumDelivList[0];
    this.chkOrdDelivId = this.sumDelivFirst.ordId+':'+this.sumDelivFirst.delivId;
    this.sumDelivRest = JSON.parse(JSON.stringify(this.sumDelivList));
    this.sumDelivRest.splice(0, 1);
    if (this.sumDelivRest.length <= 0) {
      this.listMore = true;
    }
    this.modalActiveEvent('popupSumDeliv');
  }
};
</script>
