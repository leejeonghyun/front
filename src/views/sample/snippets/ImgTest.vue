<template>
  <div id="test">
    <img :src="show('/111.gif')" alt="peach" class="img" />
    <br />
    <img :src="show(logo)" alt="logo" class="img" />
    <br />
    <img
      :src="show('https://dalisalda.com/web/upload/jc/icon/footer_logo.png')"
      alt="dalisalda"
      class="img"
    />
    <br />
    <img class="img" v-lazy="`https://image.gsecretail.com/wd/image/origin/2020/08/08/20200808184856317_1CKX5SLT.jpg`" />
    <br />
    <img class="img" v-lazy="`https://image.gsecretail.com/wd/image/origin/2020/08/08/20200808161128117_HWK9L22J.png`" />
  </div>
</template>

<script>
import ImgUtils from '@/common/ImgUtils';

export default {
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '이미지 테스트 < 샘플 < %s',
    meta: [
      // SNS 설정
      {
        property: 'og:title',
        content: 'GS fresh Meta',
        vmid: 'og:title',
      },
      {
        property: 'og:url',
        content: location.href,
        vmid: 'og:url',
      },
      {
        property: 'og:image',
        content: 'https://m.gsfreshqa.com/images/login.png',
        vmid: 'og:image',
      },
    ],
  },
  data() {
    return {
      logo: '/logo.PNG',
    };
  },
  methods: {
    show(uri) {
      return ImgUtils.path(uri);
    },
  },
};
</script>

<style scoped>
#test {
  padding: 50px;
}
.img {
  width: 200px;
  border: 1px solid #bbb;
  border-radius: 5px;
  padding: 2px;
  margin-bottom: 300px;
}
</style>
