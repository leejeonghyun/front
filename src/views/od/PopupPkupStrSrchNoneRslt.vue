<!--
views/od/SC-FO-PA-GS-MP-008
-->
<template>
  <div id="popupPickupShop2" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupPickupShop2}, siteClass]">
    <!--  <div id="popupPickupShop2" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupPickupShop2}"> -->
    <div class="header-popup">
      <strong>GS THE FRESH 픽업 매장</strong>
    </div>
    <div class="full-popup-body">
      <div class="inner-full-popup">
        <!-- START : 검색 -->
        <div class="pickup-search">
          <span class="txt-use">
            <input type="text" value="천안 쌍용점" class="inp-txt" placeholder="장소명, 지번, 도로명으로 검색" title="픽업 매장 검색어">
            <button class="btn-reset" aria-label="검색어 초기화"><span class="hidden">검색어 초기화</span></button>
            <button type="button" class="btn-search"><span class="hidden">검색</span></button>
          </span>
        </div>
        <!-- END : 검색 -->
        <div class="delivery-map">
          <img src="@/assets/images/_temp/_img_map.jpg" alt="">
        </div>
        <!-- START : 하단 고정 버튼 (퀵메뉴) -->
        <div class="btn-fixed pickup-pop" :class="{open : this.showMore}">
          <div class="pickup-wrap">
            <dl class="pickup-store search">
              <dt>검색결과</dt>
              <dd><button type="button" class="btn-rec-shop">추천매장보기</button></dd>
            </dl>
            <div class="no-data">
              <p class="no-data-txt">검색결과가 없습니다.</p>
              <p>##센터에서 배송되는 권역과 동일 하지 않은 경우<br> 리스트가 노출되지 않습니다.</p>
            </div>
            <div class="near-store-wrap">
              <dl class="pickup-store">
                <dt>픽업 가능 매장</dt>
                <dd class="ico-alert2">현재 위치에서 가까운 매장을 확인해보세요</dd>
              </dl>
              <ul class="pickup-store-list" :class="{'scroll-area' : this.showMore}">
                <li class="pickup-store-info">
                  <div class="store-info">
                    <p class="store-name">GS THE FRESH  강남한티점 <span class="strore-distance">77m</span></p>
                    <p class="store-addr"><span class="code">06141</span>서울특별시 강남구 선릉로 62길 9</p>
                    <p><span class="ico-tel"><a href="tel:010-1234-5678" title="전화걸기">02-255-0822</a></span></p> <!-- edit: 전화번호 연결 추가 -->
                    <button type="button" class="btn-border btn-change-address" title="GS THE FRESH  강남한티점">선택</button>
                  </div>
                </li>
                <li class="pickup-store-info">
                  <div class="store-info">
                    <p class="store-name">GS THE FRESH 강남역삼점 <span class="strore-distance">100m</span></p>
                    <p class="store-addr"><span class="code">06141</span>서울특별시 강남구 선릉로 62길 9 서울특별시 강남구 선릉로 62길 9서울특별시 강남구 선릉로 62길 9</p>
                    <p><span class="ico-tel"><a href="tel:010-1234-5678" title="전화걸기">02-255-0822</a></span></p> <!-- edit: 전화번호 연결 추가 -->
                    <button type="button" class="btn-border btn-change-address" title="GS THE FRESH 강남역삼점">선택</button>
                  </div>
                </li>
                <li class="pickup-store-info">
                  <div class="store-info">
                    <p class="store-name">GS THE FRESH 암사캐슬점 <span class="strore-distance">110m</span></p>
                    <p class="store-addr"><span class="code">06141</span>서울특별시 강남구 선릉로 62길 9</p>
                    <p><span class="ico-tel"><a href="tel:010-1234-5678" title="전화걸기">02-255-0822</a></span></p> <!-- edit: 전화번호 연결 추가 -->
                    <button type="button" class="btn-border btn-change-address" title="GS THE FRESH 암사캐슬점">선택</button>
                  </div>
                </li>
                <li class="pickup-store-info">
                  <div class="store-info">
                    <p class="store-name">GS THE FRESH 암사캐슬점 <span class="strore-distance">110m</span></p>
                    <p class="store-addr"><span class="code">06141</span>서울특별시 강남구 선릉로 62길 9</p>
                    <p><span class="ico-tel"><a href="tel:010-1234-5678" title="전화걸기">02-255-0822</a></span></p> <!-- edit: 전화번호 연결 추가 -->
                    <button type="button" class="btn-border btn-change-address" title="GS THE FRESH 암사캐슬점">선택</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="wrap-btn-option-popup" :class="{open : this.showMore}">
            <button class="btn btn-option-popup" @click="popupShowMore">
              <span class="hidden">픽업 매장 더보기</span>
            </button>
          </div>
        </div>
        <!-- END : 하단 고정 버튼 (퀵메뉴) -->
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupPickupShop2",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: 'GS THE FRESH 픽업 매장 < %s'
  },
  data() {
    return {
      showMore: false,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupShowMore() {
      if (this.showMore === false) {
        this.showMore = true;
      } else {
        this.showMore = false;
      }
    },
    popupAction() {
      this.$emit('popupEvent', 'popupPickupShop2');
      this.modalActiveEvent('popupPickupShop2');
    },
  },
  mounted() {
    this.modalActiveEvent('popupPickupShop1');
  }
};
</script>
