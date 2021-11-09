<!--
Design: views/md/SC-FO-MD-GF-MP-011.vue
Pg id:
Uri:
-->
<template>
  <!-- START : 공유하기 레이어 -->
  <div
    id="popupShareEvent"
    class="wrap-layer description-layer wrap-share event-temp"
    role="dialog"
    aria-modal="true"
    :class="[{active : this.modalActive.popupShareEvent}, siteClass]"
  >
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>공유하기</h3>
        </div>
        <div class="layer-content">
          <ul class="wrap-list-share">
            <li class="twitter" v-if="shareInfo.isShow.twitter">
              <a href="javascript://" title="앱으로이동" @click="shareTw">트위터</a>
            </li>
            <li class="facebook" v-if="shareInfo.isShow.facebook">
              <a href="javascript://" title="앱으로이동" @click="shareFb">페이스북</a>
            </li>
            <li class="kakao" v-if="shareInfo.isShow.kakao">
              <a href="javascript://" title="앱으로이동" @click="shareKa">카카오톡</a>
            </li>
            <li class="kakao-story" v-if="shareInfo.isShow.kakaoStory">
              <a href="javascript://" title="앱으로이동" @click="shareKs">카카오톡스토리</a>
            </li>
            <li class="url-copy">
              <a href="javascript://" @click="shareUrl">URL 복사</a>
            </li>
            <!-- START : 모바일 앱일 경우 추가 -->
            <li class="more" v-if="false">
              <a href="javascript://" title="추가앱활성화">더보기</a>
            </li>
            <!-- END : 모바일 앱일 경우 추가 -->
          </ul>
          <div id="url-section" v-show="false">
            <input class="hidden" id="share-url" v-model="shareInfo.url" />
          </div>
        </div>
      </div>
      <button
        class="btn-layer-close"
        @click="popupAction"
        @keydown.9="tabFocusRemove('popupAction')"
        aria-label="포커스 아웃 시 팝업 닫기"
      >
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 공유하기 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ShareUtils from '@/common/ShareUtils';
import ConsoleUtils from '@/common/ConsoleUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'PopupShareEvent',
  mixins: [LayerPopupMixin],
  props: {
    shareInfo: Object,
  },
  data() {
    return {
      twUrl: this.shareInfo.url,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo() {
    return {
      meta: [
        { property: 'aa:page', content: '이벤트^SNS 공유 이벤트' },
      ],
    };
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupShareEvent');
      this.modalActiveEvent('popupShareEvent');
    },
    shareTw() {
      ShareUtils.shareTwitter(this.twUrl, this.shareInfo.text1);
    },
    shareFb() {
      const img = this.shareInfo.img || '';
      ConsoleUtils.log("this.shareInfo.url", this.shareInfo.url);
      ConsoleUtils.log("this.shareInfo.text1", this.shareInfo.text1);
      ConsoleUtils.log("img", img);
      ShareUtils.shareFacebook(
        this.shareInfo.url,
        this.shareInfo.text1,
        img
      );
    },
    shareKa() {
      ShareUtils.shareKakaoTalk(
        this.twUrl,
        this.shareInfo.text1,
        this.shareInfo.img,
        this.shareInfo.title,
        this.shareInfo.text2
      );
    },
    shareKs() {
      ShareUtils.shareKakaoStory(this.shareInfo.title, this.shareInfo.url);
    },
    shareUrl() {
      document.getElementById('url-section').style = 'display: block;';
      ShareUtils.shareUrl('share-url');
    },
    async makeShort() {
      const params = {
      originUrl: this.shareInfo.url
      };
      const response = await ApiUtils.get('/fo/cm/commonmgnt/naver-short-url', params);
      this.shareInfo.url = response.data.data;
    },
  },
  mounted() {
    ShareUtils.init();
    this.makeShort();
    try {
      this.modalActiveEvent('popupShareEvent');
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
#url-section {
  display: none;
  text-align: center;
}
#share-url {
  width: 97%;
}
</style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
