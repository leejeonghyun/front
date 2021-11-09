<!--
views/od/SC-FO-PA-GS-MP-003
-->
<template>
    <!-- START : 주문예정금액 변동 안내 레이어 -->
    <div id="popupSimplycook" class="wrap-layer confirm-layer layer-simplycook" role="dialog" aria-labelledby="PopupSimplycook" aria-modal="true" :class="[{active : this.modalActive.popupSimplycook}, siteClass]">
      <div class="layer-bg"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>주문예정금액 변동 안내</h3>
          </div>
          <div class="layer-content">
            <p class="txt2">심플리쿡 상품을 제외하여 주문금액 합계가 변경되었습니다.</p>
            <ul class="simplycook-price-list">
              <li>기존 주문예정금액 <span class="price"><strong>{{comma(delivOrdSchedAmt)}}</strong>원</span></li>
              <li>심플리쿡 상품 <span class="price"><strong>-{{comma(spckItemAmt)}}</strong>원</span></li>
              <li>배송비(쇼핑대행료) <span class="price"><strong>{{comma(delivDlfee)}}</strong>원</span></li>
              <li v-if="todayDelivInfoList.spckExcldItemAddAmt > 0">상품배송비 <span class="price"><strong>{{comma(todayDelivInfoList.spckExcldItemAddAmt)}}</strong>원</span></li>
              <li class="total">최종 주문예정금액 <span class="price"><strong>{{comma(delivOrdSchedAmt - spckItemAmt + delivDlfee)}}</strong>원</span></li>
            </ul>
            <p class="txt txt2">당일배송 3만원 미만으로 배송비(쇼핑대행료) <span>{{delivDlfee}}</span>원이 부과됩니다. <span v-if="todayDelivInfoList.spckExcldItemAddAmt > 0">심플리쿡 상품배송비는 제외됩니다.</span> 심플리쿡 상품을 제외하고 주문을 계속하시겠습니까?</p>
            <p class="btn-shopping"><a href="javascript://" class="btn-border" @click="goShop">쇼핑하러 가기</a></p>
          </div>
        </div>
        <div class="btn-alert-bottom">
          <button class="btn-cancel" @click="cnclExcldSpck">취소</button>
          <button class="btn-confirm" @click="orderExcldSpck">주문계속하기</button>
        </div>
      </div>
    </div>
    <!-- END : 주문예정금액 변동 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import StringUtils from '@/common/StringUtils';

export default {
  name: "PopupSimplycook",
  props: {
    ordsItemList: Object,
    todayDelivInfoList: Object,
  },
  data() {
    return {
      delivOrdSchedAmt: 0,
      spckItemAmt: 0,
      delivDlfee: 0,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupSimplycook');
      this.modalActiveEvent('popupSimplycook');
    },
    cnclExcldSpck() {
      this.$emit('cnclExcldSpck');
      this.popupAction();
    },
    orderExcldSpck() {
      this.$emit('orderExcldSpck');
      this.popupAction();
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    goShop() {
      location.href = SiteUtils.to(CookieUtils.getMallId(), '/');
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
  },
  mounted() {
    this.modalActiveEvent('popupSimplycook');
    if (this.ordsItemList) {
      const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
      if (ordsDelivGrpInfoList) {
        for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
          const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList;
          if (ordsDelivSupplGrpInfoList) {
            for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
              if (ordsDelivSupplGrpInfoList[j].ordTypeCd === '10' && ordsDelivSupplGrpInfoList[j].delivTypeCd === '01') {
                this.delivOrdSchedAmt = ordsDelivSupplGrpInfoList[j].delivOrdSchedAmt;
                const ordsItemInfoList = ordsDelivSupplGrpInfoList[j].ordsItemInfoList;
                if (ordsItemInfoList) {
                  for (let k = 0; k < ordsItemInfoList.length; k++) {
                    if (ordsItemInfoList[k].spckItemYn === 'Y') {
                      /*
                      if (this.isNotEmpty(ordsItemInfoList[k].cmplPromId)) {
                        this.spckItemAmt += ordsItemInfoList[k].lastBeneSellAmt;
                      } else {
                        this.spckItemAmt += ordsItemInfoList[k].dcSellAmt;
                      }
                      */
                      this.spckItemAmt += ordsItemInfoList[k].lastBeneSellAmt;
                    }
                    const ordsItemCompoInfoList = ordsItemInfoList[k].ordsItemCompoInfoList;
                    if (ordsItemCompoInfoList) {
                      for (let l = 0; l < ordsItemCompoInfoList.length; l++) {
                        if (ordsItemCompoInfoList[l].spckItemYn === 'Y') {
                          this.spckItemAmt += ordsItemCompoInfoList[l].lastBeneSellAmt;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.todayDelivInfoList) {
      this.delivDlfee = this.todayDelivInfoList.spckExcldAddAmt + this.todayDelivInfoList.spckExcldItemAddAmt;
    }
  },
};
</script>
