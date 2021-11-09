<!--
views/od/SC-FO-PA-GS-MP-011
-->
<template>
  <!-- START : 신용카드 선택 레이어 -->
  <div id="popupCardList" class="wrap-layer card-list-layer" role="dialog" aria-labelledby="popupCardList" aria-modal="true" :class="[{active : this.modalActive.popupCardList}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>신용카드</h3></div>
      <div class="layer-content">
        <div class="inner-box scroll-area">
          <ul class="card-list">
            <li v-for="(crcoInfo) in crcoInfoList" v-bind:key="crcoInfo.crcoCd">
              <button type="button" @click="selectCard($event, crcoInfo)" v-bind:class="{active : crcoInfo.crcoCd == selectIdx}"> <!-- 활성화 할 경우 active 클래스 / aria-label="현재 선택된 카드" 추가 -->
                <span class="icon-card"><img v-bind:src="getImgNm(crcoInfo.cardCode)" v-bind:alt="crcoInfo.pytcCardNm"></span>
                {{crcoInfo.pytcCardNm}}
                <span v-for="crcoChargDcInfo in crcoChargDcInfoList" v-bind:key="crcoChargDcInfo.crcoCd">
                  <span class="point" v-if="crcoInfo.crcoCd === crcoChargDcInfo.crcoCd">
                    <template v-if="crcoChargDcInfo.dcTypeCd === 'A'">
                      {{toComma(Number(crcoChargDcInfo.crcoChargDcrt))}}원 청구할인
                    </template>
                    <template v-else>
                      {{Number(crcoChargDcInfo.crcoChargDcrt)}}% 청구할인
                    </template>
                  </span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="popupChoiceAction">선택</button>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 신용카드 선택 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    crcoInfoInfo: Object,
    crcoChargDcInfoList: Array,
    pytcCd: String,
    deviceType: String,
  },
  name: "PopupCardList",
  data() {
    return {
      crcoInfoList: null,
      crcoInfo: null,
      cardBuyCoCd: '',
      selectIdx: 41,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupCardList');
      this.modalActiveEvent('popupCardList');
    },
    popupChoiceAction() {
      this.$emit('choiceCardInfoEvent', this.crcoInfo);
      this.$emit('popupEvent', 'popupCardList');
      this.modalActiveEvent('popupCardList');
    },
    // 카드선택
    selectCard(event, crcoInfo) {
      const list = document.querySelector('.card-list');
      const buttons = list.querySelectorAll('button');
      const target = event.currentTarget;
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
        buttons[i].removeAttribute('aria-label');
      }
      target.classList.add('active');
      target.setAttribute('aria-label', crcoInfo.cardBuyCoCd);
      this.crcoInfo = crcoInfo;
    },
    // 카드사 조회
    async retrievelistCrco() {
      // console.log(this.pytcCd);
      const response = await ApiUtils.get('/fo/pa/retrievePytcRepCard' + ((this.deviceType === "PC") ? "Pc" : "Mob") +'/'+this.pytcCd);
      this.crcoInfoList = response.data.pytcRepCardList;
      // console.log("crcoInfoList : ", this.crcoInfoList);
      if (this.crcoInfoInfo != null) {
        this.selectIdx = this.crcoInfoInfo.crcoCd;
      }
    },
    getImgNm: function (cd) {
      // 이미지가 바로 로딩이 안되기 때문 require를 사용하여 이미지를 랜더링하여야 함.
      if (cd !== null && cd !== '') {
        return require('@/assets/images/icon/icon_card_logo'+cd+'.png');
      } else {
        return require('@/assets/images/icon/icon_card_logo16.png'); // 임시
      }
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
  },
  async mounted() {
    this.retrievelistCrco();
    this.modalActiveEvent('popupCardList');
  },
};
</script>
