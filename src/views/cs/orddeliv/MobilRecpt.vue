<!--
Design: views\ss\SC-FO-SS-GF-MP-856.vue
Pg id: PG-FO-CS-O008
#Uri: /cs/orddeliv/mobil_recpt
-->
<!--
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
삭제예정파일입니다.
마이페이지  주문배송조회  주문배송 상세 SC-FO-SS-GF-MP-856  PG-FO-CS-O008 MobilRecpt      모바일영수증(팝업) <--SC-FO-SS-GF-MS-805
-->

<template>
  <div id="popupMobileBill" class="wrap-full-popup active" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupMobileBill" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupMobileBill}"> -->
    <div class="header-popup">
      <!-- 4월 수정 : 내용 변경 -->
      <strong>전자영수증</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="wrap-breakdown">
          <div class="wrap-heading">
            <h2 class="hidden">주문번호</h2>
            <!-- 4월 수정 : 삭제
              <button type="button" class="btn-border btn-small">이미지저장</button> -->
          </div>
          <!-- 4월 수정 : class 추가 -->
          <dl class="detail-breakdown order-top">
            <dt>주문 번호</dt>
            <dd>14052812AKA </dd>
            <dt>주문 일자</dt>
            <dd>2019.11.22 (화) 10:20:44</dd>
          </dl>
        </section>
        <!-- START : 구매자 정보 -->
        <!-- START: 4월 수정 -->
        <section class="section">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>구매자 정보</h2>
            </div>
            <dl class="detail-breakdown mt10">
              <dt>주문고객</dt>
              <dd>홍길동 <span class="line"></span> HONG92</dd>
               <!-- <dt>인수자</dt>
              <dd>홍길동</dd>
              <dt>결품발생시<br>처리방법</dt>
              <dd>대체상품</dd> -->
            </dl>
          </div>
        </section>
        <!-- END: 4월 수정 -->
        <!-- END : 구매자 정보 -->
        <!-- START : 주문상품 상세내역 -->
        <section class="section">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>주문상품 상세내역</h2>
            </div>
            <div>
              <!-- START : 당일배송 -->
              <table class="tbl-type-col">
                <caption>당일배송 주문상품 상세내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:20%">
                  <col style="width:25%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">당일배송 상품명/옵션</th>
                    <th scope="col">수량</th>
                    <th scope="col">구매금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><p class="asterisk">주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">12,400원</td>
                  </tr>
                  <tr>
                    <td><p class="asterisk">주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">17,900원</td>
                  </tr>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">31,400원</td>
                  </tr>
                </tbody>
              </table>
              <!-- END : 당일배송 -->
              <!-- START : 새벽배송 -->
              <table class="tbl-type-col">
                <caption>새벽배송 주문상품 상세내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:20%">
                  <col style="width:25%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">새벽배송 상품명/옵션</th>
                    <th scope="col">수량</th>
                    <th scope="col">구매금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">12,400원</td>
                  </tr>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">17,900원</td>
                  </tr>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">31,400원</td>
                  </tr>
                </tbody>
              </table>
              <!-- END : 새벽배송 -->
              <!-- START : 택배배송 -->
              <table class="tbl-type-col">
                <caption>택배배송 주문상품 상세내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:20%">
                  <col style="width:25%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">택배배송 상품명/옵션</th>
                    <th scope="col">수량</th>
                    <th scope="col">구매금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="title">
                    <td scope="row" colspan="3"><strong>GS fresh 전국택배</strong></td>
                  </tr>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">12,400원</td>
                  </tr>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">17,900원</td>
                  </tr>
                  <tr class="title">
                    <td scope="row" colspan="3"><strong>아모레퍼시픽</strong></td>
                  </tr>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">12,400원</td>
                  </tr>
                  <tr>
                    <td><p>주문한 상품명이 노출되는 영역 최대 두 줄까지 입력 가능 이후 말줄임 …</p></td>
                    <td class="center">1</td>
                    <td class="right">17,900원</td>
                  </tr>
                </tbody>
              </table>
              <!-- END : 택배배송 -->
            </div>
            <!-- START : 최종 결제금액 -->
            <div class="popup-bill">
              <div class="total-payment bill-payment">
                <ul class="accordion-payment border">
                  <li>
                    <p class="tit-accordion">
                      면세품 가액
                      <span class="price"><strong>35,800</strong>원</span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      과세물품 가액
                      <span class="price"><strong>29,000</strong>원<em>(부가세 1,200원 포함)</em></span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      상품구매합계
                      <span class="price"><strong>64,800</strong>원<em>(부가세 6,540원 포함)</em></span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      총 배송비
                      <span class="price"><strong>3,000</strong>원<em>(부가세 140원 포함)</em></span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion total-price">
                      최종결제금액
                      <!-- 4월 수정 : class 삭제 -->
                      <span class="price"><strong>67,800</strong>원<em>(부가세 7,880원 포함)</em></span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- END : 최종 결제금액 -->
          </div>
        </section>
        <!-- END : 주문상품 상세내역 -->
        <!-- START : 결제내역 -->
        <section class="section">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>결제내역</h2>
            </div>
            <div>
              <p class="info-detail"><span class="date">2019.11.22</span>신용카드(BC카드 9100-2000-****-**** /일시불)</p>
              <!-- START : 결제내역 -->
              <table class="tbl-type-col">
                <caption>결제내역 상세내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:auto">
                  <col style="width:28%">
                  <col style="width:33%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">판매자</th>
                    <th scope="col">가맹점</th>
                    <th scope="col">구매금액</th>
                    <th scope="col">증빙발급</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>㈜지에스 네트워크</td>
                    <td>㈜지에스 네트워크</td>
                    <td class="center">12,400원</td>
                    <td class="center"><button type="button" class="btn-border btn-small">신용카드매출전표</button></td>
                  </tr>
                  <tr>
                    <td>㈜지에스 네트워크</td>
                    <td>㈜지에스 네트워크</td>
                    <td class="center">12,400원</td>
                    <td class="center"><button type="button" class="btn-border btn-small">신용카드매출전표</button></td>
                  </tr>
                  <tr>
                    <td>㈜지에스 네트워크</td>
                    <td>㈜지에스 네트워크</td>
                    <td class="center">12,400원</td>
                    <td class="center"><button type="button" class="btn-border btn-small">신용카드매출전표</button></td>
                  </tr>
                </tbody>
              </table>
              <!-- 4월 수정 : 내용 추가 -->
              <p class="info-detail"><span class="date">2019.11.22</span>계좌이체(국민은행, 개인소득공제 / 자진발급분)</p>
              <table class="tbl-type-col">
                <caption>결제내역 상세내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:auto">
                  <col style="width:28%">
                  <col style="width:33%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">판매자</th>
                    <th scope="col">가맹점</th>
                    <th scope="col">구매금액</th>
                    <th scope="col">증빙발급</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>㈜지에스 네트워크</td>
                    <td>㈜지에스 네트워크</td>
                    <td class="center">12,400원</td>
                    <td class="center"><button type="button" class="btn-border btn-small">현금영수증</button></td>
                  </tr>
                </tbody>
              </table>
              <!-- // 4월 수정 : 내용 추가 -->
              <!-- END : 결제내역 -->
            </div>
          </div>
        </section>
        <!-- END : 결제내역 -->
        <ul class="list-type-dot-bg mg0">
          <!-- 4월 수정 : 내용 변경 -->
          <li>본 영수증은 증빙용으로 활용할 수 없으므로 법적 증빙서류가 필요하신 경우는 현금영수증, 신용카드 매출전표를 확인해주세요.</li>
        </ul>
        <!-- 4월 수정 : 하단 버튼 추가 -->
        <div class="bottom-btn-area">
          <button type="button" class="btn-md btn-bg darkgray">주문/배송조회</button>
          <button type="button" class="btn-md btn-bg lightgreen">이미지 저장</button>
        </div>
        <!-- // 4월 수정 : 하단 버튼 추가 -->
      </div>
      <!-- START : 2020.02.20 태그 변경 -->
      <a href="#" class="link-banner">
        <img src="@/assets/images/_temp/_img_banner_bill.jpg" alt="회원가입하면 베스트 상품 100원 부터!" />
      </a>
      <!-- END : 2020.02.20 태그 변경 -->
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupMobileBill",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '모바일영수증 < 마이페이지 < %s'
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupMobileBill');
      this.modalActiveEvent('popupMobileBill');
    },
  },
  mounted() {
    this.modalActiveEvent('popupMobileBill');
  }
};
</script>
