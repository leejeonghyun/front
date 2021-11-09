<template>
    <!-- START : 공유하기 레이어  -->
    <div id="popupShare" class="wrap-layer description-layer wrap-share" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupShare}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>공유하기</h3>
          </div>
          <div class="layer-content">
            <ul class="wrap-list-share">
              <li class="twitter">
                <a href="#" title="앱으로이동">
                  트위터
                </a>
              </li>
              <li class="facebook">
                <a href="#" title="앱으로이동">
                  페이스북
                </a>
              </li>
              <li class="kakao">
                <a href="#" title="앱으로이동">
                  카카오톡
                </a>
              </li>
              <li class="kakao-story">
                <a href="#" title="앱으로이동">
                  카카오톡스토리
                </a>
              </li>
              <li class="url-copy">
                <a href="#">
                  URL 복사
                </a>
              </li>
              <!-- START : 모바일 앱일 경우 추가 -->
              <li class="more">
                <a href="#" title="추가앱활성화">
                  더보기
                </a>
              </li>
              <!-- END : 모바일 앱일 경우 추가 -->
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 공유하기 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupShareInfo",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupShare');
      this.modalActiveEvent('popupShare');
    },
  },
  mounted() {
    this.modalActiveEvent('popupShare');
  }
};
</script>
