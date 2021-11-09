<!--
Design: views/md/SC-FO-MD-GF-MP-011
Pg id:
Uri:
-->
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
                <a href="#" title="앱으로이동" @click="shareTw">
                  트위터
                </a>
              </li>
              <li class="facebook">
                <a href="#" title="앱으로이동" @click="shareFb">
                  페이스북
                </a>
              </li>
              <li class="kakao">
                <a href="#" title="앱으로이동" @click="shareKa">
                  카카오톡
                </a>
              </li>
              <li class="kakao-story">
                <a href="#" title="앱으로이동" @click="shareKs">
                  카카오톡스토리
                </a>
              </li>
              <li class="url-copy">
               <a href="#" @click="shareUrl">
                  URL 복사
                </a>
              </li>
              <input type="text" id="share-url" v-model="url" style="display:none;">
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
import ShareUtils from '@/common/ShareUtils';
import ItemTemplete from '@/common/ItemTemplete';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupShareInfo",
  props: {
    itemInfo: {
      type: Object,
      default: () => ({}),
    },
    itemValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      imgUrl: 'https://imagedev.gsecretail.com',
      imgSize: 300,
      url: '',
      image: '',
      shareText: '',
      shareTextBase: `(광고)GSfresh GS리테일에서 운영하는
최고의 신선식품 전문 쇼핑앱 GS 프레시몰에 초대합니다.
당일 3시간내 총알배송!
신규가입%2F앱 설치시 총 2만원 할인 쿠폰 증정!

`,
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupShare');
      this.modalActiveEvent('popupShare');
    },
    shareTw() {
      ShareUtils.shareTwitter(this.url, this.shareText);
      console.log('hello twitter');
    },
    shareFb() {
      ShareUtils.shareFacebook(this.url, this.shareText, this.image);
      console.log('hello facebook');
    },
    shareKa() {
      const msg = this.shareText;
      const snsUrl = this.url;
      const prodImg = this.image;
      const title = '';
      const text2 = '';
      ShareUtils.shareKakaoTalk(snsUrl, this.shareText, prodImg, title, text2);
      console.log('hello kakao');
    },
    shareKs() {
      const msg = this.shareText;
      const snsUrl = this.url;
      ShareUtils.shareKakaoStory(msg, snsUrl);
      console.log('hello kakakstory');
    },
    shareUrl() {
      ShareUtils.shareUrl('share-url'); // input id
    },
    setItemInfo() {
      console.log('this.$props.itemInfo.item.itemId : '+this.$props.itemInfo.item.itemId);
      if (this.$props.itemInfo.item.itemId != undefined) {
        const itemInfo = this.$props.itemInfo;
        const imageVal = this.getImg(this.imgUrl+itemInfo.itemImg[0].itemCtnsFileNm);
        const shareText = '[GS 프레시몰]'+itemInfo.item.itemNm;
        const url = 'https://m.gsfreshdev.com/product_detail?itemId='+itemInfo.item.itemId+'&storId='+itemInfo.item.storId+'&supplFirmCd='+itemInfo.item.supplFirmCd;
        this.url = url;
        this.image = imageVal;
        this.shareText = this.shareTextBase+shareText;
      } else if (this.$props.itemValue.itemId != undefined) {
        const itemValue = this.$props.itemValue;
        const imageVal = this.getImg(itemValue.itemImg);
        const shareText = '[GS 프레시몰]'+itemValue.itemNm;
        const url = 'https://m.gsfreshdev.com/product_detail?itemId='+itemValue.itemId+'&storId='+itemValue.storId+'&supplFirmCd='+itemValue.supplFirmCd;
        this.url = url;
        this.image = imageVal;
        this.shareText = this.shareTextBase+shareText;
      }
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
  },
  mounted() {
    this.modalActiveEvent('popupShare');
    ShareUtils.init();

    this.setItemInfo();
  }
};
</script>
