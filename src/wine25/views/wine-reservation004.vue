<template>
  <div class="wrap wrap-wine25">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="수령점포 선택 및 약관동의" :tabbar="false" /><!-- 9월 수정 : 헤더 유형 변경 -->
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-select-store wrap-wine25-section" :class="{line : borderTop}">
        <h2 class="h-title">
          <strong>수령점포 선택</strong>
          <em class="essential">&#42;</em>
        </h2>
        <div class="wrap-fieldset">
          <span class="input-text-wine">
            <input type="text" title="선택한 점포명" readonly />
          </span>
          <button type="button" class="wine btn btn-border" aria-haspopup="dialog" @click="popupAction('popupSearchWineStore')">점포 선택</button>
        </div>
        <p class="area-desc">와인을 찾아가실 GS25를 선택하세요.</p>
        <p class="area-desc">와인당일배송 예약은 시범 운영기간 동안 <em class="essential">강남구, 서초구, 송파구 지역 GS25 한정</em>하여 운영합니다.</p>
        <div class="area-statement">
          <em class="heading">수령자명</em><strong>유아이</strong>
          <em class="heading">전화번호</em><strong>010-1234-5678</strong>
        </div>
        <p class="area-desc">전화번호는 회원정보 수정에서 변경할 수 있습니다.</p>
        <h2 class="h-title">
          <span class="inp-chk-wine">
            <input type="checkbox" name="" id="checkAgree" value="">
            <label for="checkAgree">이용 약관 동의<em class="essential">&#42;</em></label>
          </span>
        </h2>
        <div class="area-inform">
          <div class="term-content">
              <h3 class="title">개인정보 제3자 제공동의</h3>
              <p>회원의 개인정보는 당사의 개인정보 취급방침에 따라 안전하게 보호됩니다.</p>
              <ul>
                  <li>회사는 서비스 제공을 위하여 당사의 개인정보 취급 방침의 개인정보의 수집 및 이용목적에서 고지한 범위 내에서 수집, 활용하며 그 밖의 인권침해 및 사생활 침해가 우려되는 개인정보는 일체 수집하지 않습니다.</li>
                  <li>회사가 제공하는 서비스를 통하여 주문이 이루어진 경우 구매자 확인 및 해피콜 등 거래 이행을 위하여 관련된 정보를 필요한 범위 내에서 거래 업체에게 제공합니다.</li>
              </ul>
              <table>
                <colgroup>
                    <col width="72">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>제공받는자</th>
                        <td>㈜ 우리와인, GS25 점포의 경영주, 스토어매니져</td>
                    </tr>
                    <tr>
                        <th>목적</th>
                        <td><span class="txt-bold txt-underline">주문상품의 배송(예약), 고객상담 및 불만처리</span></td>
                    </tr>
                    <tr>
                        <th>항목</th>
                        <td>
                            주문정보, 주문자 정보 (성명, 연락처), 상품정보<br>
                            *예약자와 최종 수취인 정보가 다를 시 상품 결제 및 수령이 불가합니다.
                        </td>
                    </tr>
                    <tr>
                        <th>보유기간</th>
                        <td><span class="txt-bold txt-underline">예약확정 후 3개월까지</span></td>
                    </tr>
                </tbody>
              </table>
              <h3 class="title">※ 동의 거부권 등에 대한 고지</h3>
              <ul>
                  <li>개인정보 제공은 서비스 이용을 위해 꼭 필요합니다.</li>
                  <li>개인정보 제공을 거부하실 수  있으나 이 경우 서비스 이용이 제한될 수 있습니다.</li>
              </ul>
              <h3 class="title">주문 관련 확인 동의</h3>
              <ul>
                  <li>관계법령에 따라 와인의 경우 미성년자는 구매할 수 없으며 19세 이상 성인 인증을 해야 예약 가능합니다.</li>
                  <li>GS25 매장에서 예약 와인 수령 및 결제 시, 신분을 확인할 수 있는 수단(신분증, 주민등록증,여권 등)을 지참하여야 하며 예약 당사자와 신분증 내역이 다르면 수령 불가합니다.(예약 당사자 본인에 한해 수령 가능합니다.)</li>
                  <li>예약 와인의 경우 제3자에게의 양도, 위임이 불가합니다.</li>
                  <li>제품은 예약한 당일로부터 3일 이내 수령 가능하며 3일 이후에는 예약 취소됩니다.</li>
                  <li>같은 상품의 경우에도 온라인 판매 가격과 GS25 오프라인 매장의 판매가격은 다를 수 있으며, 상품의 판매가격은 당사의 판매 정책에 따라 수시로 변동 될 수 있습니다.</li>
              </ul>
          </div>
        </div>
        <h2 class="h-title">
          <strong>예약상품</strong>
          <em class="h-sub-title">총 <span class="essential">4</span>건 (<span class="essential">10</span>병)</em>
        </h2>
        <div class="wrap-wine-reserved-list" :class="`type-${type}`">
          <WineProductReserved />
          <WineProductReserved />
          <WineProductReserved />
        </div>
        <div class="area-total-price">
          <strong class="title">최종 예약 금액</strong>
          <span class="price"><em>59,230,000</em>원</span>
        </div>
        <div class="area-btn">
          <button type="button" class="strong">예약 진행하기</button>
        </div>
      </div>
      <div class="wrap-wine-bottom-btn reserved">
        <button class="btn btn-bg total">
          <i></i><span class="text">최종 예약 금액<em>59,230,000</em>원</span></button>
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
    <PopupSearchWineStore v-if="popup.popupSearchWineStore" @popupEvent="popupAction" /> <!-- 팝업 수령점포 찾기 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer';
import WineProductReserved from '@/wine25/components/WineProductReserved'; // 예약목록
import PopupSearchWineStore from '@/wine25/views/wine-reservation005_01'; //  팝업 - 수령점포 찾기
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  name: "WineSelectStore",
  mixins: [],
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '수령점포 선택 및 약관동의 < 와인25 < %s'
  },
  components: {
    SubDefaultHeader,
    Footer,
    WineProductReserved,
    PopupSearchWineStore,
  },
  data() {
    return {
      borderTop: true, // Border 설정
      type: 'desc', // 예약목록 타입 desc(상품설명), option(상품설명 + 수량 수정)
      popup: { // 팝업
        popupSearchWineStore: false,
      },
    };
  },
  methods: {
    // 팝업
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
  },
  // updated() {
  //   if (this.popup.open) {
  //     disableBodyScroll(this);
  //   } else {
  //     clearAllBodyScrollLocks(this);
  //   };
  // },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>
