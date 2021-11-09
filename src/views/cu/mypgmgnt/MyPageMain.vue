<template>
  <div class="wrap-mypage public_domain" :class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="마이페이지" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 사용자 정보 -->
      <section class="section-area">
        <h2 class="hidden">회원 등급</h2>
        <div class="inner mypage_top">
          <div class="wrap-certify">
            <button class="btn-signal" :class="{ active: pushSignal }" @click="goNotice">
              <span class="hidden">알림</span>
            </button>
            <div class="wrap-my-grade">
              <div class="name">
                <em class="user-grade" v-show="getUserGrade" :class="getUserGrade"></em>
                <gs-link :to="goMemberGrade()">
                  <strong aria-label="이름">{{ korName }}</strong>님
                </gs-link>
                <span class="dreampass" v-if="pmbsJoinPrcnCd == '0001'">달리드림 멤버십</span>
              </div>
            </div>
            <!-- 정회원 -->
            <div v-if="fullMember">
              <div class="box-grade">
                <gs-link
                  to="/cu/regular_member_grade"
                  class="inner-wrap-link"
                  title="회원등급 안내 상세페이지로 이동"
                >
                  <div class="wrap-gauge">
                    <div
                      class="wrap-gauge-step"
                      :class="getGaugeStep(list.commCd)"
                      v-for="(list, index) in this.CU0004S"
                      :key="index"
                    >
                      <span class="grade-txt" aria-label="회원 등급">{{list.commCdNm}}</span>
                      <div class="gauge">
                        <span class="bar" :style="{width: gauge[index] + '%'}" aria-label="게이지">
                          <span class="hidden">다음 단계 회원 등급까지 {{gauge[index]}}% 달성하였습니다.</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <p class="desc" v-if="this.custGrdCd != '01'">
                    <strong class="point">{{ toCommaCvert(rhrnGrdNeedAmt) }}원</strong>
                    이상 구매 시, {{nextCustGrdNm}}회원으로
                    <br />
                    <strong>{{custGrdTxt1}}</strong>
                    {{custGrdTxt2}}
                  </p>
                  <p class="desc" v-else>
                    <em class="bold">{{ custGrdTxt1 }}</em>
                    {{ custGrdTxt2 }}
                  </p>
                  <p class="desc" v-if="dspNewMember">
                    신규가입
                    <strong class="point">{{fstVisitDttm}}</strong>까지
                    <br />새벽배송 / 당일배송만
                    <strong class="point">1만원 이상 무료 배송</strong>
                  </p>
                  <p class="total dalisalda" v-if="pmbsJoinPrcnCd == '0001'">
                    <span class="label">달리드림패스 총 누적 혜택</span>
                    <strong class="amounts">{{ toCommaCvert(pmbsDcAmt) }} 원</strong>
                  </p>
                </gs-link>
                <div class="wrap-link-group">
                  <gs-link
                    class="link gs-total-point"
                    title="GS&POINT 페이지로 이동"
                    to="/cu/regular_member_point_list"
                  >
                    <span class="my-link">GS&amp;POINT</span>
                    <span class="my-info">
                      <em>{{gsPoint}}</em> P
                    </span>
                  </gs-link>
                  <gs-link
                    class="link gs-rewards"
                    title="THE POP 리워즈 페이지로 이동"
                    to="/cu/regular_member_rewards_list"
                  >
                    <span class="my-link">THE POP 리워즈</span>
                    <span class="my-info">
                      <em>{{thePopRewards}}</em> 점
                    </span>
                  </gs-link>
                  <gs-link class="link gs-coupon" title="쿠폰 페이지로 이동" to="/ev/coupon_list">
                    <span class="my-link">쿠폰</span>
                    <span class="my-info">
                      <em>{{couponCount}}</em> 장
                    </span>
                  </gs-link>
                </div>
              </div>
              <div class="wrap-link-pointcard">
                <button
                  type="button"
                  class="pointcard"
                  aria-label="포인트카드 보기"
                  aria-haspopup="dialog"
                  @click="popupAction('popupPointCard')"
                >
                  <span>포인트카드</span>
                </button>
              </div>
              <!-- START : 포인트 카드 팝업 -->
              <PopupPointCard @popupEvent="popupAction" v-if="this.popup.popupPointCard" />
              <!-- END : 포인트 카드 팝업 -->
            </div>
            <div v-else>
              <div class="box-grade">
                <div class="inner-wrap-link">
                  <p class="desc">
                    GS&amp;POINT 적립 및 등급 쿠폰 혜택을 위해서는
                    <br />통합 회원 가입이 필요해요 : )
                  </p>
                </div>
                <div class="wrap-link-group">
                  <gs-link
                    class="link gs-total-point"
                    title="GS&amp;POINT 페이지로 이동"
                    to="/cu/associate_member_point"
                  >
                    <span class="my-link">GS&amp;POINT</span>
                    <span class="my-info">
                      <em class="link">인증하기</em>
                    </span>
                  </gs-link>
                  <gs-link
                    class="link gs-rewards"
                    title="THE POP 리워즈 페이지로 이동"
                    to="/cu/associate_member_rewards"
                  >
                    <span class="my-link">THE POP 리워즈</span>
                    <span class="my-info">
                      <em class="link">인증하기</em>
                    </span>
                  </gs-link>
                  <gs-link class="link gs-coupon" title="쿠폰 페이지로 이동" to="/ev/coupon_list">
                    <span class="my-link">쿠폰</span>
                    <span class="my-info">
                      <em>{{couponCount}}</em> 장
                    </span>
                  </gs-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 수정 END : 2020.02.24 마크업 변경 -->
      <!-- END : 사용자 정보 -->
      <!-- START : 나의 주문관리 -->
      <section class="section">
        <div class="tit-mypage">
          <h2>나의 주문관리</h2>
          <gs-link to="/cu/delivery_place_list" class="btn-border address">
            <span>배송지 관리</span>
          </gs-link>
        </div>
        <ul class="link-groups even">
          <li>
            <gs-link to="/cs/orddeliv/ord_deliv_list">주문/배송 조회</gs-link>
          </li>
          <li>
            <gs-link to="/cs/claimmgnt/claim_statement_list">취소/교환/반품</gs-link>
          </li>
        </ul>
      </section>
      <!-- END : 나의 주문관리 -->
      <!-- START : 나의 활동관리 -->
      <section class="section">
        <div class="tit-mypage">
          <h2>나의 활동관리</h2>
        </div>
        <ul class="link-groups even">
          <!-- 수정 START : 2020.02.24 마크업 변경 -->
          <!-- 2021.02.04 : 자주구매상품, 최근본 상품 비노출 처리 -->
          <li v-if="false">
            <gs-link to="/cu/my_page_personalize_purchase">자주 구매한 상품</gs-link>
          </li>
          <li v-if="false">
            <gs-link :to="myPageRecentItem()">최근 본 상품</gs-link>
          </li>
          <li>
            <gs-link to="/cu/gift_bowing">선물하기</gs-link>
          </li>
          <li>
            <gs-link to="/ev/event_join_list">참여 이벤트</gs-link>
          </li>
          <li>
            <gs-link :to="MyPageReviewList()">상품평</gs-link>
          </li>
          <li>
            <gs-link to="/cs/mbrinqr/mbr_inqr_list">1:1문의</gs-link>
          </li>
          <li>
            <gs-link :to="myPageItemQnaList()">상품Q&amp;A</gs-link>
          </li>
          <li>
            <gs-link to="/cs/deliv_stlv_list">배송만족도평가</gs-link>
          </li>
        </ul>
      </section>
      <!-- END : 나의 활동관리 -->
      <!-- START : 나의 정보관리 -->
      <section class="section">
        <div class="tit-mypage line">
          <h2>나의 정보관리</h2>
        </div>
        <ul class="link-groups">
          <!-- 수정 START : 2020.02.24 삭제 -->
          <li>
            <a @click="mbrInfoUpdate()">회원정보 수정</a>
          </li>
          <li>
            <gs-link to="/cu/pbms_info" v-if="pmbsJoinPrcnCd == '0001'">달리드림 멤버십</gs-link>
            <gs-link to="/cu/pbms_join" v-else>달리드림 멤버십</gs-link>
          </li>
          <li>
            <gs-link to="/cu/login_settings" v-if="mbrTypeCd == '01'">SNS 연결 설정</gs-link>
            <a @click="loginSettings()" v-else>SNS 연결 설정</a>
          </li>
          <li>
            <gs-link to="/ss/setting" v-if="isApp">환경설정</gs-link>
          </li>
          <!-- 수정 END : 2020.02.24 삭제 -->
        </ul>
      </section>
      <!-- END : 나의 정보관리 -->
      <!-- START : 마이페이지 푸터 -->
      <Footer />
      <!-- END : 마이페이지 푸터 -->
      <form class="form-horizontal" id="subKmc" name="subKmc" method="post" action>
        <input type="hidden" id="tr_cert" name="tr_cert" v-model="form.trCert" />
        <input type="hidden" id="tr_url" name="tr_url" v-model="form.trUrl" />
        <input type="hidden" id="tr_add" name="tr_add" v-model="form.trAdd" />
        <input type="hidden" id="rec_cert" name="rec_cert" value />
        <input type="hidden" id="certNum" name="certNum" value />
      </form>
    </main>
    <Loading v-show="loading > 0" />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer';
import PopupPointCard from '@/components/mypage/PointCard'; // 포인트 카드
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Loading from '@/components/common/Loading';

import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import JwtUtils from '@/common/JwtUtils';
import DateUtils from '@/common/DateUtils';
import CuUtils from '@/common/cu/CuUtils';
import ContextUtils from '@/common/ContextUtils';

export default {
  name: 'MyPageSubMain',
  data() {
    return {
      popup: {
        // 팝업
        open: false,
        popupPointCard: false, // 포인트 카드
      },
      fullMember: true, // 정회원, 비회원 구분
      daliMember: true, // 달리살다 회원
      pushSignal: false, // push 알림
      viewMore: {
        barcodeDetail: false, // 바코드 보기
      },
      gauge: [0, 0, 0, 0], // 회원 등급 게이지
      form: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
      },
      gsPoint: 0,
      thePopRewards: 0,
      couponCount: 0,
      korName: '',
      userId: '',
      mbrTypeCd: '',
      custGrdNm: '',
      custGrdCd: '',
      goalCustGrd: '',
      nextCustGrdNm: '',
      pmbsJoinPrcnCd: '0000',
      CU0004S: [],
      rhrnGrdNeedAmt: 0,
      accuSalesAmt: 0,
      pmbsDcAmt: 0,
      custGrdTxt1: '',
      custGrdTxt2: '',
      mdaType: CookieUtils.getMdaType(),
      mobileYn: false,
      siteClass: '',
      loading: 0,
      dspNewMember: false,
      fstVisitDttm: '',
      isApp: ContextUtils.isNative(),
    };
  },
  metaInfo: {
    title: '마이페이지',
    titleTemplate: '',
    meta: [
      // SEO setting
      { name: 'description', content: '회원 등급별 GS&POINT 적립, THE POP리워즈와 할인쿠폰 제공', vmid: 'description' },
      // SNS 용
      {
        property: 'og:title',
        content: '마이페이지',
        template: chunk => `${chunk}`,
        vmid: 'og:title'
      },
    ],
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader,
    Footer,
    PopupPointCard,
    Loading,
  },
  computed: {
    getUserGrade() {
      const custGrdCd = this.custGrdCd;
      let custGrdClass = '';
      if (custGrdCd) {
        switch (custGrdCd) {
          case '01':
            custGrdClass = 'vvip';
            break;
          case '02':
            custGrdClass = 'vip';
            break;
          case '03':
            custGrdClass = 'fam';
            break;
          case '04':
            custGrdClass = 'wel';
            break;
          default:
            custGrdClass = 'wel';
            break;
        }
      }
      return custGrdClass;
    },
  },
  methods: {
    // 2020.10.13 마켓포 추가
    goMemberGrade() {
      return this.mbrTypeCd == '01'
        ? '/cu/regular_member_grade'
        : '/cu/associate_member_grade';
    },
    getGaugeStep(data) {
      return this.custGrdCd == data ? 'mygrade' : '';
    },
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    dlvMove: function() {
      this.$router.push('/cu/delivery_place_list');
    },
    memberGrade: function() {
      if (this.mbrTypeCd == '01') {
        this.$router.push('/cu/regular_member_grade'); // 정회원 mbrTypeCd : 01
      } else {
        this.$router.push('/cu/associate_member_grade'); // 간편회원 mbrTypeCd : 02
      }
    },
    goNotice: function() {
      this.$router.push('/cu/m4_my_page_notice');
    },
    gsPointList: function() {
      if (this.mbrTypeCd == '01') {
        this.$router.push('/cu/regular_member_point_list'); // 정회원 mbrTypeCd : 01
      } else {
        this.$router.push('/cu/associate_member_point'); // 간편회원 mbrTypeCd : 02
      }
    },
    gsRewordsList: function() {
      if (this.mbrTypeCd == '01') {
        this.$router.push('/cu/regular_member_rewards_list'); // 정회원 mbrTypeCd : 01
      } else {
        this.$router.push('/cu/associate_member_rewards'); // 간편회원 mbrTypeCd : 02
      }
    },
    logOut() {
      // TODO 삭제
      JwtUtils.destroyRefreshToken();
      JwtUtils.destroyIdToken();

      // CookieUtils.deleteCookie("mall");

      this.$router.push('/cu/login');
    },
    toCommaCvert(val) {
      return NumberUtils.toComma(val);
    },
    couponList: function() {
      this.$router.push('/ev/coupon_list'); // '/cu/my_page_coupon_list');
    },
    getEvent: function() {
      this.$router.push('/ev/event_join_list'); // '/cu/my_page_coupon_list');
    },
    personalizePurchase: function() {
      // 자주구매한상품
      this.$router.push('/cu/my_page_personalize_purchase');
    },
    myPageRecentItem: function() {
      // 최근본상품
      // this.$router.push('/cu/my_page_recent_item');
      return CookieUtils.getCmmSteId() == '3'
        ? '/cu/my_page_m4_recent_item'
        : '/cu/my_page_recent_item';
    },
    myPageItemQnaList: function() {
      // 최근본상품
      // this.$router.push('/cu/my_page_recent_item');
      return '/cs/mbrinqr/m4_item_qna_list';
    },
    giftBowing: function() {
      // 선물 조르기
      this.$router.push('/cu/gift_bowing');
    },
    MyPageReviewList: function() {
      // 상품평
      // this.$router.push('/cu/my_page_review_list');
      return '/cu/my_page_m4_review_list';
    },
    setting: function() {
      this.$router.push('/ss/setting'); // 정회원 mbrTypeCd : 01
    },
    loginSettings: function() {
      // SNS연동/로그인설정
      // TODO 준회원/정회원 체크해서 정회원만 화면이동
      if (this.mbrTypeCd == '01') {
        this.$router.push('/cu/login_settings'); // 정회원 mbrTypeCd : 01
      } else {
        const confirmed = confirm(
          'SNS 연결 설정하시려면 통합회원으로 전환하셔야 합니다.\n통합화면으로 이동하시겠습니까?'
        );
        if (confirmed) {
          this.$router.push('/cu/associate_member_grade'); // 정회원 mbrTypeCd : 01
        }
      }
    },
    memberInfo: async function() {
      const resultMemInfo = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      );
      this.korName = resultMemInfo.data.data.custNm;
      this.userId = resultMemInfo.data.data.webId;
      this.mbrTypeCd = resultMemInfo.data.data.mbrTypeCd;
      this.pmbsJoinPrcnCd = resultMemInfo.data.data.pmbsJoinPrcnCd;
      this.pmbsDcAmt = resultMemInfo.data.data.pmbsDcAmt;

      this.fstVisitDttm = resultMemInfo.data.data.fstVisitDttm;
      if (this.fstVisitDttm) {
        const d = new Date(this.fstVisitDttm);
        d.setDate(d.getDate() + 30);
        const now = new Date();
        if (d >= now) {
          this.dspNewMember = true;
          this.fstVisitDttm = DateUtils.format(d, 'YYYY.MM.DD');
        }
      }
    },
    getCommonCodeInfo: async function() {
      const CU0004Input = {
        commGrpCd: 'CU0004',
      };
      try {
        const CU0004 = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', {
          ...CU0004Input,
        }); // 공통코드정보
        this.CU0004S = CU0004.data.data.reverse();
      } catch (e) {
        console.log(e);
      }
    },
    getCustTxt: function() {
      if (this.custGrdCd == '01' && this.goalCustGrd == '01') {
        this.custGrdTxt1 = 'THE POP 리워즈 2,500점, 3천원 할인쿠폰 2개 ';
        this.custGrdTxt2 = '혜택을 받고 있어요';
      } else if (this.custGrdCd != '01' && this.goalCustGrd == '01') {
        this.custGrdTxt1 = 'THE POP 리워즈 2,500점, 3천원 할인쿠폰 2개';
        this.custGrdTxt2 = '를 추가로 받을 수 있어요';
      } else if (this.goalCustGrd == '02') {
        this.custGrdTxt1 = 'THE POP 리워즈 1,000점, 2천원 할인쿠폰 2개';
        this.custGrdTxt2 = '를 추가로 받을 수 있어요';
      } else if (this.goalCustGrd == '03') {
        this.custGrdTxt1 = 'THE POP 리워즈 1,000점(최초 1회)';
        this.custGrdTxt2 = '를 추가로 받을 수 있어요';
      }
    },
    getGrdChgInfo: async function() {
      try {
        const resultGrdChgInfo = await ApiUtils.get(
            '/fo/cu/mbrmgnt/grade-up-possible-purchase-amount',
            null
          );
          // console.log(JSON.stringify(resultGrdChgInfo.data.data.grdChgPosbPurchAmtListDto[0]));

          const grdDto = resultGrdChgInfo.data.data.grdChgPosbPurchAmtListDto.filter(e => e.bdSpCd === 'Z')[0];
          console.log('grdDto', grdDto);

          this.custGrdCd = grdDto.custGrdCd;
          this.goalCustGrd = grdDto.goalCustGrd;
          this.getCustTxt();
          for (let i = 0; i < this.CU0004S.length; i++) {
            if (this.CU0004S[i].commCd == this.custGrdCd) {
              this.custGrdNm = this.CU0004S[i].commCdNm;
            }
            if (this.CU0004S[i].commCd == grdDto.goalCustGrd) {
              this.nextCustGrdNm = this.CU0004S[i].commCdNm;
            }
          }
          this.accuSalesAmt = grdDto.accuSalesAmt;
          this.rhrnGrdNeedAmt = grdDto.rhrnGrdNeedAmt;
          this.CU0004S.map((value, index) => {
          // 등급게이지 영역
          if (value.commCd == this.custGrdCd) {
            this.gauge[index] =
              100 -
              (Number(this.rhrnGrdNeedAmt) * 100) /
                (Number(this.accuSalesAmt) + Number(this.rhrnGrdNeedAmt));
          } else {
            this.gauge[index] = this.custGrdCd > value.commCd ? 0 : 100;
          }
          // 고객 다음 상위 등급
          if (value.commCd == this.goalCustGrd) {
            this.nextCustGrdNm = value.commCdNm;
          }
        });
          const resultPoint = await ApiUtils.get('/fo/cu/mbrmgnt/gs-point', null); // GS 총 포인트
          this.gsPoint = NumberUtils.toComma(resultPoint.data.data.totRestPt);

          const resultRewords = await ApiUtils.get('/fo/cu/mbrmgnt/rewards', null); // 리워즈 총 포인트
          this.thePopRewards = NumberUtils.toComma(resultRewords.data.data.restReward); // NumberUtils.toComma(resultRewords.data.data.rewordsPoint);

          const resultCoupon = await ApiUtils.get('/fo/ev/cpnprominq/coupon-count', { cmmSteId: CookieUtils.getCmmSteId() }); // 사용가능쿠폰수
          this.couponCount = NumberUtils.toComma(resultCoupon.data.data.usePosbCpnCnt);
      } catch (e) {
        console.log(e);
      }
    },
    init: async function() {
      this.loading++;
      await this.memberInfo();
      await this.getCommonCodeInfo();
      try {
        // 정회원/준회원 화면 변경
        if (this.mbrTypeCd == '01') {
          this.fullMember = true;
          await this.getGrdChgInfo(); // 고객 등급별 금액 조회
          await this.getCustTxt(); // 고객 등급별 안내 문구 조회
        } else if (this.mbrTypeCd == '02') {
          this.fullMember = false;
          const resultCoupon = await ApiUtils.get(
            '/fo/ev/cpnprominq/coupon-count',
            { cmmSteId: CookieUtils.getCmmSteId() } // [202017P] 2020.11.27 사용가능쿠폰목록조회 Market For 커머스사이트Id 추가-시작
          ); // 사용가능쿠폰수
          this.couponCount = NumberUtils.toComma(
            resultCoupon.data.data.usePosbCpnCnt
          );
        }
      } finally {
        this.loading--;
      }
    },
    goIng: function(div) {
      CookieUtils.deleteCookie('ordSearchOption');
      return '/cs/orddeliv/ord_deliv_list?selectDelivStatCd=' + div;
    },
    mbrInfoUpdatetemp: async function() {
      if (StringUtils.isEmpty(this.userId)) {
        alert('본인 확인을 위하여\n휴대폰 본인인증을 진행합니다');
        const certType = { certType: 'C' };
        ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType)
          .then(res => {
            if (res.data === null) {
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
    mbrInfoUpdate: async function() {
      //  alert(this.userId + "+++" + this.mbrTypeCd);
      console.log(' ==사용자 아이디== ' + this.userId);
      const mall = CookieUtils.getMallId();
      if (StringUtils.isEmpty(this.userId) && this.mbrTypeCd == '01') {
        this.$gsdialog.alert(
          '본인 확인을 위하여\n휴대폰 본인인증을 진행합니다'
        );
        const cmmSteId = CookieUtils.getCmmSteId();
        const certType = {
          certType: 'C',
          mallId: mall,
          mobType: 'M',
          cmmSteId: cmmSteId,
        };
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
            // 모바일웹 리턴 URL 추가
            if (this.mbrTypeCd == '01') {
              localStorage.setItem('reUrl', '/cu/regular_member_modify');
              localStorage.setItem('reqUrl', '/cu/regular_member_grade'); // 정회원 mbrTypeCd : 01
            } else {
              localStorage.setItem('reUrl', '/cu/associate_member_modify');
              localStorage.setItem('reqUrl', '/cu/associate_member_modify'); // 간편회원 mbrTypeCd : 02 D
            }
            const kmcIsWindow = '';
            const UserAgent = window.navigator.userAgent;
            const dvcId = localStorage.getItem('deviceId');
            // 모바일 접근 체크 //
            // 모바일일 경우 (변동사항 있을경우 추가 필요)
            if (!StringUtils.isEmpty(dvcId)) {
              const popupX = CuUtils.popupX('500');
              const popupY = CuUtils.popupY('600');
              window.open(
                '',
                'kmcIsWindow',
                'width=500, height=600, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no, left=' +
                  popupX +
                  ', top=' +
                  popupY
              );
              subKmc.target = 'kmcIsWindow';
            } else {
              if (
                UserAgent.match(
                  /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
                ) != null ||
                UserAgent.match(/LG|SAMSUNG|Samsung/) != null
              ) {
                subKmc.target = '';
              } else {
                const popupX = CuUtils.popupX('500');
                const popupY = CuUtils.popupY('600');
                window.open(
                  '',
                  'kmcIsWindow',
                  'width=500, height=600, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no, left=' +
                    popupX +
                    ', top=' +
                    popupY
                );
                subKmc.target = 'kmcIsWindow';
              }
            }
            subKmc.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
            subKmc.submit();
          });
      } else {
        this.$router.push('/cu/password_re_check'); // 비밀번호 확인화면으로 이동
      }
    },
    getMobileYn: function() {
      const UserAgent = window.navigator.userAgent;
      if (
        UserAgent.match(
          /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
        ) != null ||
        UserAgent.match(/LG|SAMSUNG|Samsung/) != null
      ) {
        this.mobileYn = true;
      } else {
        this.mobileYn = false;
      }
    },
    getNotiYn: function() {
      const params = {
        dvcId: localStorage.getItem('deviceId'),
      };
      ApiUtils.get('/fo/cu/infmmgnt/notifications-count', params).then(res => {
        if (res['data']['success']) {
          const listCnt = res['data']['data']['listCnt'];
          if (listCnt > 0) {
            this.pushSignal = true;
          } else {
            this.pushSignal = false;
          }
        }
      });
    },
  },
  created: async function() {
    this.siteClass = CookieUtils.getSiteClass();
    // 공통 부분 수정이 되어야되므로, 우선 하드코딩 처리 함
    this.init();
  },
  mounted: function() {
    const th = this;
    this.getMobileYn(); // 모바일 접속여부
    this.getNotiYn(); // 알림함 확인
    // 인증팝업 콜백 함수
    window.getSelfCertification = function getSelfCertification(
      strRecCert,
      strCertNum,
      callBack
    ) {
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', date).then(
        res => {
          // alert(JSON.stringify(res.data));
          if (!res.data.success) {
            console.error(res.data.data.resultMessage);
            th.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
            return;
          } else {
            // alert(JSON.stringify(res.data.data));
            if (res.data.data.resultCode == '00000') {
              ApiUtils.get('/fo/cu/mbrmgnt/member-information', null).then(
                res => {
                  // const mbrTypeCd = resultMemInfo.data.data.mbrTypeCd;
                  th.$store.reqUrl = window.location.hash;
                  if (res.data.data.mbrTypeCd == '01') {
                    th.$router.push('/cu/regular_member_modify'); // 정회원
                  } else if (res.data.data.mbrTypeCd == '02') {
                    th.$router.push('/cu/associate_member_modify'); // 준회원
                  } else {
                    th.$gsdialog.alert('정보가 존재하지 않습니다.', {
                      html: true,
                    });
                  }
                }
              );
            } else {
              alert(res.data.data.resultMessage);
            }

            if (callBack) {
              callBack();
            }
          }
        }
      );
    };
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
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
<style lang="scss" scoped></style>
