<!--
views/od/SC-FO-OD-GS-MP-019
-->
<template>
  <div class="banner-sticky" v-bind:class="[siteClass]">
    <div class="price-gift">
      <p class="tit-price-gift">{{delivType.presList[0].promNm}}</p>
      <p class="txt-price-gift">
        <strong>현재 <em>{{comma(delivType.presList[0].ordAmt)}}</em>원</strong>
        <button type="button" class="btn-show" aria-label="금액대별 사은품 안내 팝업활성화" aria-haspopup="dialog" @click="popupAction"><span class="hidden">금액대별 사은품 안내</span></button>
      </p>
    </div>
    <ul class="price-graph">
      <li v-if="firstPromBeneZone !== null" :class="{'complate' : getPercent(delivType.presList[0].ordAmt, firstPromBeneZone, 'S') === 100}">
        <span class="graph"><span :style="getWidth(delivType.presList[0].ordAmt, firstPromBeneZone, 'S')" :aria-label="getLabel(delivType.presList[0].ordAmt, firstPromBeneZone, 'S')"></span></span>
        <strong>{{firstPromBeneZone.beneZoneBeginVal/10000}}</strong>
      </li>
      <li v-for="(promBeneZone, index) in promBeneZoneList" v-bind:key="index" :class="{'complate' : getPercent(delivType.presList[0].ordAmt, promBeneZone, 'E') === 100}">
        <span class="graph"><span :style="getWidth(delivType.presList[0].ordAmt, promBeneZone, 'E')" :aria-label="getLabel(delivType.presList[0].ordAmt, promBeneZone, 'E')"></span></span>
        <strong>{{promBeneZone.beneZoneEndVal === '0' ? '' : (promBeneZone.beneZoneEndVal)/10000}}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    delivType: Object,
    pmbsJoinPrcnCd: String,
  },
  name: "CartGiftBanner",
  data() {
    return {
      categoryOffsetTop: 0,
      promBeneZoneList: [],
      firstPromBeneZone: null,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('openSpecialGift', this.delivType);
    },
    stickyBanner(scroll) {
      const mainSections = document.querySelectorAll(".wrap-category-content");
      for ( let i = 0; i < (mainSections.length); i++ ) {
        if (mainSections[i].offsetTop - 100 <= scroll && mainSections[i].offsetTop + mainSections[i].clientHeight - 100 > scroll) {
          if (!!(mainSections[i].querySelector('.banner-sticky'))) mainSections[i].querySelector('.banner-sticky').classList.add("active");
        } else {
          if (!!(mainSections[i].querySelector('.banner-sticky'))) mainSections[i].querySelector('.banner-sticky').classList.remove("active");
        }
      }
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    getPercent(amt, promBeneZone, type) {
      let percent = 0;
      if (type === 'E') {
        if (Number(amt) < Number(promBeneZone.beneZoneBeginVal)) {
          percent = 0;
        } else if (Number(amt) >= Number(promBeneZone.beneZoneEndVal)) {
          percent = 100;
        } else {
          percent = (Number(amt) - Number(promBeneZone.beneZoneBeginVal)) / (Number(promBeneZone.beneZoneEndVal) - Number(promBeneZone.beneZoneBeginVal)) * 100;
        }
      } else {
        if (Number(amt) >= Number(promBeneZone.beneZoneBeginVal)) {
          percent = 100;
        } else {
          percent = (Number(amt)) / (Number(promBeneZone.beneZoneBeginVal)) * 100;
        }
      }
      return percent;
    },
    getWidth(amt, promBeneZone, type) {
      return 'width:' + this.getPercent(amt, promBeneZone, type) + '%';
    },
    getLabel(amt, promBeneZone, type) {
      let amt2 = 0;
      if (type === 'E') {
        amt2 = Number(promBeneZone.beneZoneEndVal) / 10000;
      } else {
        amt2 = Number(promBeneZone.beneZoneBeginVal) / 10000;
      }
      return amt2 + '만원까지 ' + this.getPercent(amt, promBeneZone, type) + '% 충족';
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this);
  },
  mounted() {
    // 배포가 안돼서 재배포를 위해 추가
    this.promBeneZoneList = JSON.parse(JSON.stringify(this.delivType.presList[0].promBeneZoneList));

    for (let idx=0; idx<this.promBeneZoneList.length; idx++) {
      if (idx === 0) {
        if (this.promBeneZoneList[idx].beneZoneBeginVal !== '0') {
          this.firstPromBeneZone = this.promBeneZoneList[idx];
        }
      }
      if ((idx + 1) === this.promBeneZoneList.length) {
        if (this.promBeneZoneList[idx].beneZoneEndVal === '0') {
          this.promBeneZoneList.splice(idx, 1);
        }
      }
    }
    const $this = this;
    const $stickyBanner = document.querySelector('.banner-sticky');
    if ( $stickyBanner ) {
      window.addEventListener('scroll', function() {
        $this.stickyBanner(window.pageYOffset);
      });
    }
  },
};
</script>
