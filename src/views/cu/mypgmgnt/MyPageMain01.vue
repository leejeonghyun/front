<!--
views/ss/SC-FO-SS-GF-MM-900
-->
<template>
  <div class="wrap-mypage" :class="[{ 'popup-open': this.popup.open }, siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="마이페이지" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 사용자 정보 -->
      <section>
        <div class="my-content">
          <div class="information">
            <p class="grade">
              <strong>홍길동</strong>님은
              <a href="#" @click="memberGrade()"><em>WELCOME</em></a>
            </p>
            <button
              class="btn-signal"
              :class="{ active: showSignal.pushSignal }"
            >
              <span class="hidden">알림</span>
            </button>
            <button class="btn-border coupon">등급쿠폰받기</button>
            <a href="#" class="grade-notice">
              <p>
                5만원이상 구매 시, GOLD회원으로 <br />
                GS리워즈, 쿠폰(N)개 혜택을 추가로 받을 수 있어요
              </p>
            </a>
          </div>
          <div class="benefit">
            <span @click="gsPointList()"
              >GS&amp;POINT<br /><strong>{{ gsPoint }}</strong
              >P</span
            >
            <span @click="gsRewordsList()"
              >GS리워즈<br /><strong>{{ thePopRewards }}</strong
              >P</span
            >
            <span @click="couponList()"
              >쿠폰<br /><strong>{{ couponCount }}</strong
              >장</span
            >
          </div>
          <div class="wrap-barcode">
            <div
              class="barcode-area"
              :class="{ active: viewMore.barcodeDetail }"
            >
              <strong>GS &amp; POINT</strong>
              <div class="barcode">
                <img
                  src="@/assets/images/img/img_barcode.png"
                  alt="바코드 이미지"
                />
              </div>
            </div>
            <div class="wrap-btn" :class="{ active: viewMore.barcodeDetail }">
              <button
                class="btn-barcode"
                aria-label="바코드 보기"
                @click="moreAction('barcodeDetail')"
              >
                <span aria-live="assertive" aria-atomic="true">{{
                  viewMore.barcodeDetail ? '포인트카드 닫기' : '포인트카드 보기'
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- END : 사용자 정보 -->
      <!-- START : 주문/배송 조회 -->
      <section class="section">
        <div class="my-status">
          <!-- 8월 수정 START :  링크 추가 -->
          <a href="javascript:;" class="tit-mypage">
            <h2>주문/배송 조회</h2>
            <span class="standard">최근 3개월 기준</span>
          </a>
          <!-- 8월 수정 END : 링크 추가 -->
          <a href="#" class="btn-border address">배송지 관리</a>
          <div class="status">
            <a href="#" class="step">
              <span><strong>0</strong>결제완료</span>
              <span class="current"><strong>1</strong>상품관리중</span>
              <span><strong>0</strong>배송중</span>
              <span><strong>0</strong>배송완료</span>
            </a>
          </div>
          <div class="my-delivery">
            <a href="#">예약주문</a>
            <a href="#">취소/교환/환불</a>
          </div>
        </div>
      </section>
      <!-- END : 주문/배송 조회 -->
      <!-- START : 나의 활동관리 -->
      <section class="section">
        <h2 class="tit-mypage border">나의 활동관리</h2>
        <ul class="link-groups even">
          <li>
            <a href="#" @click="personalizePurchase()">자주 구매한 상품</a>
          </li>
          <li><a href="#" @click="myPageRecentItem()">최근 본 상품</a></li>
          <li><a href="#" @click="GiftBowing()">선물 조르기</a></li>
          <li><a href="#">참여 이벤트</a></li>
          <li><a href="#" @click="MyPageReviewList()">상품평</a></li>
          <li><a href="#">1:1문의</a></li>
          <li><a href="#">상품Q&amp;A</a></li>
          <li><a href="#">배송만족도평가</a></li>
        </ul>
      </section>
      <!-- END : 나의 활동관리 -->
      <!-- START : 나의 정보관리 -->
      <section class="section">
        <h2 class="tit-mypage border">나의 정보관리</h2>
        <ul class="link-groups">
          <li><a href="#" @click="dlvMove()">배송지 관리</a></li>
          <li><a href="#" @click="mbrInfoUpdate()">회원정보 수정</a></li>
          <li><a href="#">달리;드림패스</a></li>
          <li><a href="#">간편 결제 카드 설정</a></li>
          <li><a href="#" @click="loginSettings()">SNS 연결 설정</a></li>
          <li><a href="#">환경설정</a></li>
        </ul>
      </section>
      <!-- END : 나의 정보관리 -->
      <!-- START : 마이페이지 푸터 -->
      <MyPageFooter />
      <!-- END : 마이페이지 푸터 -->
    </main>
    <form
      class="form-horizontal"
      id="subKmc"
      name="subKmc"
      method="post"
      action=""
    >
      <input
        type="hidden"
        id="tr_cert"
        name="tr_cert"
        v-model="form.trCert"
        class="form-control"
      />
      <input
        type="hidden"
        id="tr_url"
        name="tr_url"
        v-model="form.trUrl"
        class="form-control"
      />
      <input
        type="hidden"
        id="tr_add"
        name="tr_add"
        v-model="form.trAdd"
        class="form-control"
      />
      <input type="hidden" id="rec_cert" name="rec_cert" value />
      <input type="hidden" id="certNum" name="certNum" value />
    </form>
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import MyPageFooter from '@/components/mypage/MyPageFooter'; // 마이페지이 푸터
/* END : 실 사용 컴포넌트 */
/* START : 기획&디자인확인용 */
/* END : 기획&디자인확인용 */
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'MyPageMain',
  data() {
    return {
      popup: {
        // 팝업
        open: false,
      },
      viewMore: {
        barcodeDetail: false, // 바코드 보기
      },
      showSignal: {
        pushSignal: true, // push 알림
      },
      form: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
      },
      gsPoint: '',
      thePopRewards: '',
      couponCount: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '마이페이지',
      },
    ],
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    MyPageFooter, // 마이페이지 푸터
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    moreAction(element) {
      this.viewMore[element] = !this.viewMore[element];
      element.classList.add('active');
    },
    dlvMove: function() {
      this.$router.push('/cu/delivery_place_list');
    },
    memberGrade: function() {
      // this.$router.push('/cu/regular_member_grade'); // 정회원
      this.$router.push('/cu/associate_member_grade'); // 준회원
    },
    gsPointList: function() {
      this.$router.push('/cu/regular_member_point_list');
    },
    gsRewordsList: function() {
      this.$router.push('/cu/regular_member_rewards_list');
    },
    couponList: function() {
      this.$router.push('/cu/my_page_coupon_list');
    },
    personalizePurchase: function() {
      // 자주구매한상품
      this.$router.push('/cu/my_page_personalize_purchase');
    },
    myPageRecentItem: function() {
      // 최근본상품
      this.$router.push('/cu/my_page_recent_item');
    },
    GiftBowing: function() {
      // 선물 조르기
      this.$router.push('/cu/gift_bowing');
    },
    MyPageReviewList: function() {
      // 상품평
      this.$router.push('/cu/my_page_review_list');
    },
    loginSettings: function() {
      // SNS연동/로그인설정
      // const resultPoint = await ApiUtils.get('/fo/cu/mypgmgnt/mypage-point-count', null); // GS 총 포인트
      // this.gsPoint = NumberUtils.toComma(resultPoint.data.data.totRestPt);
      // TODO 준회원/정회원 체크해서 정회원만 화면이동
      this.$router.push('/cu/login_settings');
    },
    mbrInfoUpdate: async function() {
      CookieUtils.setCookie('WEB_ID', 'test1234 ', 10); // TODO 삭제
      const result = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      );
      const webId = CookieUtils.getCookie('WEB_ID');
      if (StringUtils.isEmpty(webId)) {
        alert('본인 확인을 위하여\n휴대폰 본인인증을 진행합니다');
        const certType = { certType: 'C' };
        ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType)
          .then(res => {
            if (res.data === null) {
              console.error(res.data.msg);
              this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
              return;
            } else {
              this.form = res.data.data;
            }
          })
          .then(res => {
            subKmc.action = 'http://www.kmcert.com/kmcis/web/kmcisReq.jsp';
            subKmc.method = 'post';
            window.open(
              '',
              'KMCISWindow',
              'width=500, height=600, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250'
            );
            subKmc.target = 'KMCISWindow';
            subKmc.submit();
          });
      } else {
        this.$router.push('/cu/password_re_check'); // 비밀번호 확인화면으로 이동
      }
    },
  },
  mounted: async function() {
    // TODO - START
    const resultPoint = await ApiUtils.get(
      '/fo/cu/mypgmgnt/mypage-point-count',
      null
    ); // GS 총 포인트
    this.gsPoint = NumberUtils.toComma(resultPoint.data.data.totRestPt);
    const resultRewords = await ApiUtils.get(
      '/fo/cu/mypgmgnt/mypage-rewords-count',
      null
    ); //  리워즈 총 포인트
    this.thePopRewards = NumberUtils.toComma(
      resultRewords.data.data.rewordsPoint
    );
    const resultCoupon = await ApiUtils.get(
      '/fo/cu/mypgmgnt/use-possible-coupon-count',
      null
    ); // 사용가능쿠폰수
    this.couponCount = NumberUtils.toComma(
      resultCoupon.data.data.usePosbCpnCnt
    );
    // TODO - END
  },
};
</script>
<style lang="scss" scoped></style>
