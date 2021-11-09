<template>
  <div class="wrap-dalidream">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="선물 결제하기" prevType="true" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="membership-complete">
          <p class="txt present">카카오톡으로 선물이 전송되었습니다. <br>
            이용해주셔서 감사합니다.</p>
          <ul class="dream-details">
            <li><span>결제금액</span> 3,900원/월</li>
          </ul>
          <div class="btn-area horizon">
            <button type="button" class="btn-dali daligray">선물함</button>
            <button type="button" class="btn-dali daligreen">메인으로</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
  import CookieUtils from '@/common/CookieUtils';
  
  export default {
    name: "DaliGiveGiftComplete2",
    mixins: [],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '멤버십 선물함 < 달리살다 멤버십 < 마이페이지 < %s'
    },
    data() {
      return {};
    },
    components: {
      SubDefaultHeader,
    },
    methods: {},
    mounted() {}
  };
</script>
