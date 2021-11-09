<template>
  <div class="wrap-dalidream">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="달리드림패스" prevType="true" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="membership-complete withdrawal">
          <h1>달리드림패스 해지</h1>
          <!-- 무료체험 소진 후 이용내역 없는 회원 -->
          <p class="txt">홍길동님 프리미엄 혜택을 포기하실건가요?</p>
          <!-- //무료체험 소진 후 이용내역 없는 회원 -->
          <div class="benefit-details">
            <strong>현재 <em>홍길동</em> 님의 달리드림패스 혜택</strong>
            <ul class="benefit-list">
              <li class="ico-gift"><span>달리살다<br>상품 20%~40%<br>상시 할인</span></li>
              <li class="ico-gift"><span>웰컴<br>기프트 증정</span></li>
              <li class="ico-gift"><span>달리<br>사전예약</span></li>
              <li class="ico-gift"><span>달리<br>해외직구</span></li>
            </ul>
          </div>
          <p class="txt confirm">그래도 해지하시겠습니까?</p>
          <div class="btn-area">
            <button type="button" class="btn-dali daligray">아니오, 유지할게요</button>
            <button type="button" class="btn-dali daligreen" aria-label="멤버십 해지 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupDaliSelectClose')">네, 해지할게요</button>
          </div>
        </div>
        <PopupDaliSelectClose @popupEvent="popupAction" v-if="this.popup.popupDaliSelectClose" /> <!-- 팝업 - 해지 사유 -->
      </div>
    </main>
  </div>
</template>
<script>
  import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
  import PopupDaliSelectClose from '@/views/ss/SC-FO-SS-GF-MP-908'; // 팝업 - 해지 사유
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import CookieUtils from '@/common/CookieUtils';
  
  export default {
    name: "DaliWithdrawal2",
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '멤버십 해지 < 달리살다 멤버십 < 마이페이지 < %s'
    },
    data() {
      return {
        popup: {
          open: false,
          popupDaliSelectClose: false,
        },
        bgGray: true,
      };
    },
    components: {
      SubDefaultHeader, // 헤더
      PopupDaliSelectClose, // 팝업 - 해지 사유
    },
    methods: {
      popupAction(type) { // 팝업 활성/비활성
        this.popup[`${type}`] = !this.popup[`${type}`]; // popup
        this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false; // view - body
      },
    },
    updated() {},
    mounted() {
      // 배경 컬러 넣기
      const daliCont = document.querySelector('.wrap-dalidream');
      if (this.bgGray) {
        daliCont.classList.add('bg-gray');
      }
    },
  };
</script>
