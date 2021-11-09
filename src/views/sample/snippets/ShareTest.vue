<template>
  <div>
    <ul>
      <li>
        <button @click="shareTw">트위터</button>
      </li>
      <li>
        <button @click="shareFb">페이스북</button>
      </li>
      <li>
        <button @click="shareKa">카카오</button>
      </li>
      <li>
        <button @click="shareKs">카카오스토리(작업중)</button>
      </li>
      <li>
        <button @click="shareUrl">URL복사</button>
        <br />
        <!-- Target -->
        <input id="share-url" />
        <!-- Trigger -->
        <button class="btn" @click="shareUrl">
          <img src="@/assets/images/icon/ico_urlcopy.png" alt="Copy to clipboard" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import ShareUtils from '@/common/ShareUtils';

export default {
  data() {
    return {
      url: `https://m.gsfreshdev.com/md/product_detail?itemId=2345001711431&storId=2329&supplFirmCd=31008&ssevntId=1768&ssevntTimes=1&mallId=1`,
      image: `https://imagedev.gsecretail.com/md/data/image/resize/31/14/2345001711431/2345001711431_M_530.jpg`,
      shareText: `(광고)GSfresh GS리테일에서 운영하는
최고의 신선식품 전문 쇼핑앱 GS fresh에 초대합니다.
당일 3시간내 총알배송!
신규가입%2F앱 설치시 총 2만원 할인 쿠폰 증정!

[GS 프레시]호올스 쉐어백허니레몬 140g 2,500원`,
    };
  },
  mounted() {
    ShareUtils.init();
    this.shortenUrl();
  },
  methods: {
    shareTw() {
      ShareUtils.shareTwitter(this.url, this.shareText);
      console.log('hello twitter');
    },
    shareFb() {
      ShareUtils.shareFacebook(this.url, this.shareText, this.image);
      console.log('hello facebook');
    },
    shareKa() {
      const msg = '[GS fresh] 추부 깻잎';
      const title = '';
      const text2 = '';
      ShareUtils.shareKakaoTalk(this.url, this.shareText, this.image, title, text2);
      console.log('hello kakao');
    },
    shareKs() {
      const msg = '[GS fresh] 풀무원 브랜드 기획전';
      const snsUrl =
        'http://m.gsfreshdev.com/';

      ShareUtils.shareKakaoStory(msg, snsUrl);

      console.log('hello kakakstory');
    },
    shareUrl() {
      ShareUtils.shareUrl('share-url'); // input id
    },
    async shortenUrl() {
      document.getElementById('share-url').value = await ShareUtils.shorten(this.url);
    },
  },
};
</script>

<style scoped>
ul {
  width: 160px;
  margin: 50px auto;
}
.btn img {
  width: 48px;
  height: 48px;
}
</style>
