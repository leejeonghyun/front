<template>
  <div class="wrap wrap-wine25 non-floating-btn">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="와인 예약 내역" /><!-- 9월 수정 : 헤더 유형 변경 -->
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="non-reservation" :class="{line : borderTop}">
        <h2 class="visual-title">예약 내역이 없습니다.</h2>
        <figure>
          <img src="@/wine25/assets/images/_temp/non_reservation.png" alt="">
        </figure>
        <div class="area-btn">
          <button type="button" class="strong">와인 예약 하러 가기</button>
        </div>
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
export default {
  name: "WineNonReservation",
  mixins: [],
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '빈예약 내역 < 와인25 < %s'
  },
  components: {
    SubDefaultHeader,
    Footer,
  },
  data() {
    return {
      borderTop: true, // border
    };
  },
};
</script>
