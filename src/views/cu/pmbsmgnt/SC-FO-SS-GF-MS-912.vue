<template>
  <div class="wrap-dalidream">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림패스" prevType="true" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="membership-complete">
          <h1>달리드림패스</h1>
          <p class="txt">감사합니다. <br>
            지금부터 달리드림패스 혜택을 <br>
            이용하실 수 있습니다.
          </p>
          <ul class="dream-details">
            <li><span>이용기간</span>  2019.10.28 ~ 2020.01.27</li>
            <li><span>쿠폰적용기간</span>  2019.10.28 ~ 2020.01.27</li>
            <li><span>다음 자동결제 예정일</span> 2020.01.28</li>
            <li><span>결제금액</span> 3,900원/월</li>
          </ul>
          <div class="btn-area">
            <button type="button" class="btn-dali daligreen">달리드림 쇼핑하러 가기</button>
            <button type="button" class="btn-dali daligray">나의 내역 보기</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  import SubDefaultHeader from '@/components/common/SubDefaultHeader';
  import CookieUtils from '@/common/CookieUtils';

  export default {
    name: "DaliMembershipComplete",
    mixins: [],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '가입하기 < 달리살다 멤버십 < 마이페이지 < %s'
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
