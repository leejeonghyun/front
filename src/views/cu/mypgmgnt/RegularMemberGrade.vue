<template>
  <div class="wrap-mypage member" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="회원 등급" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- 수정 START : 2020.02.13 마크업 변경 -->
      <section class="section-area">
        <h2 class="hidden">회원 등급</h2>
        <div class="inner">
          <div class="wrap-certify">
            <div class="wrap-my-grade">
              <p class="name">
                <strong aria-label="이름">{{userNm}}</strong>님
              </p>
              <p class="grade" aria-label="회원 등급">
                <!-- 등급별 아이콘 클래스 vvip : vvip, vip : vip, Family : fam, Welcom : wel -->
                <span class="user-grade wel" id = "userGrd" :aria-label="custGrdNm"></span> {{custGrdNm}}
              </p>
                <span class="tag dalisalda" v-if="pmbsJoinPrcnCd == '0001'">달리드림 멤버십</span>
              <!--
              <p class="grade" aria-label="회원 등급">{{custGrdNm}}</p>
              <span class="tag dalisalda"  v-if="pmbsJoinPrcnCd == '0001'">달리드림 멤버십</span>
              -->
            </div>
            <div class="box-grade">
              <a class="inner-wrap-link" title="회원등급 안내 상세페이지로 이동">
                <div class="wrap-gauge"  v-if="custGrdCd != '01'">
                  <div class="top">
                    <p class="mygrade" aria-label="나의 회원 등급">{{custGrdNm}}</p>
                    <p class="nextgrade" aria-label="다음 단계 회원 등급">{{nextCustGrdNm}}</p>
                  </div>
                   <div class="gauge">
                    <span class="bar" :style="{width: gauge + '%'}" aria-label="게이지">
                      <span class="hidden">
                        다음 단계 회원 등급까지 {{gauge}}% 달성하였습니다.
                      </span>
                    </span>
                  </div>
                </div>
                <p class="desc"   v-if="custGrdCd != '01'"> <!--v-if="!vvip"> -->
                  <em class="point">{{toCommaCvert(rhrnGrdNeedAmt)}}원</em> 이상 구매 시 {{nextCustGrdNm}}회원으로<br/>
                   <span class="bold">{{custGrdTxt1}}</span>{{custGrdTxt2}}
                </p>
                <p class="desc"  v-else>
                 <span class="bold">{{custGrdTxt1}}</span>{{custGrdTxt2}}
                </p>
                <p class="total dalisalda"  v-if="pmbsJoinPrcnCd == '0001'">
                  <span class="label">달리드림 멤버십 총 누적 혜택</span>
                  <span class="date">{{toCommaCvert(pmbsDcAmt)}}</span>
                  <span class="unit">원</span>
                </p>
              </a>
              <div class="wrap-link">
             <!--   <a class="link" title="GS&POINT 페이지로 이동"  @click="gsPointList()">GS&POINT</a>
                <a class="link" title="THE POP 리워즈 페이지로 이동" @click="gsRewordsList()">THE POP 리워즈</a>
                <a class="link" title="쿠폰 페이지로 이동" @click="couponList()">쿠폰</a> -->
                <gs-link class="link" title="GS&POINT 페이지로 이동" to="/cu/regular_member_point_list">GS&POINT</gs-link>
                <gs-link class="link" title="THE POP 리워즈 페이지로 이동" to="/cu/regular_member_rewards_list">THE POP 리워즈</gs-link>
                <gs-link class="link" title="쿠폰 페이지로 이동" to="/ev/coupon_list">쿠폰</gs-link>
              </div>
            </div>
          </div>
            <!-- 9월 수정 START : 추가 -->
          <p class="member-grade-info">
            쿠폰, 카드행사, THE POP 리워즈, GS&POINT, 배송비를 제외한 결제 금액으로 산정됩니다. (배송 완료일 기준)
          </p>
          <!-- 9월 수정 END : 추가 -->
        </div>
      </section>
      <section class="section-area">
        <div class="wrap-grade">
          <div class="inner">
            <h2 class="title">등급 안내</h2>
            <!-- 4월 수정 START : txt-grade 각 등급별로 듀얼 클래스 추가, span으로 텍스트 감싸기 -->
            <ul class="list-grade">
              <li>
                <p class="txt-grade vvip"><span class="bg-line-brush">VVIP</span></p>
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  90만원 이상
                </p>
              </li>
              <li>
                <p class="txt-grade vip"><span class="bg-line-brush">VIP</span></p>
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  60만원 이상
                </p>
              </li>
              <li>
                <p class="txt-grade fam"><span class="bg-line-brush">FAMILY</span></p><!-- 수정 2020.03.02 텍스트 수정 -->
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  3만원 이상
                </p>
              </li>
              <li>
                <p class="txt-grade wel"><span class="bg-line-brush">WELCOME</span></p><!-- 수정 2020.03.02 텍스트 수정 -->
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  3만원 미만
                </p>
              </li>
            </ul>
            <!-- 4월 수정 END : txt-grade 각 등급별로 듀얼 클래스 추가, span으로 텍스트 감싸기 -->
            <ul class="list-grade-benefit">
              <li>
                <div class="grade">
                  <h3 class="title">VVIP 혜택</h3>
                  <p class="desc">직전 3개월 구매실적 90만원 이상</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                  <li>
                    <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                    <p class="desc">
                      THE POP 리워즈<br/>
                      2,500점
                    </p>
                  </li>
                  <li>
                    <i class="ico coupon vvip" aria-label="VVIP 할인쿠폰 아이콘"></i>
                    <p class="desc">
                      할인쿠폰<br/>
                      3천원 X 2매
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <div class="grade">
                  <h3 class="title">VIP 혜택</h3>
                  <p class="desc">직전 3개월 구매실적 60만원 이상</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                  <li>
                    <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                    <p class="desc">
                      THE POP 리워즈<br/>
                      1,000점
                    </p>
                  </li>
                  <li>
                    <i class="ico coupon vip" aria-label="VIP 할인쿠폰 아이콘"></i>
                    <p class="desc">
                      할인쿠폰<br/>
                      2천원 X 2매
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <div class="grade">
                  <h3 class="title">FAMILY 혜택</h3> <!-- 수정 2020.03.02 텍스트 수정 -->
                  <p class="desc">직전 3개월 구매실적 3만원 이상</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                  <!-- 수정 START : 2020.03.10 혜택 변경으로 인한 마크업 수정 -->
                  <li>
                    <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                    <p class="desc">
                      THE POP 리워즈<br/>
                      1,000점
                      <span>(최초 1회)</span>
                    </p>
                  </li>
                  <!-- 수정 END : 2020.03.10 혜택 변경으로 인한 마크업 수정 -->
                </ul>
              </li>
              <li>
                <div class="grade">
                  <h3 class="title">WELCOME 혜택</h3> <!-- 수정 2020.03.02 텍스트 수정 -->
                  <p class="desc">직전 3개월 구매실적 3만원 미만</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                </ul>
              </li>
              <!-- 9월 수정 START : 컨텐츠 추가 -->
              <li>
                <div class="grade">
                  <h3 class="title">스타 등급 혜택 안내</h3>
                  <p class="desc">
                    THE POP 등급과 별개로, 해당 채널 실적 기준 충족 시
                    <br/>THE POP VIP의 쿠폰/리워즈 혜택을 드립니다.
                  </p>
                </div>
                <dl class="grade-start">
                  <dt>
                    <div class="grade star gsstar">
                      <h3 class="title">GS25 스타 등급 혜택</h3>
                      <p class="desc">
                        직전 3개월 GS25 구매일 수 30일 이상
                        <br/>(1회 구매 1,000원 이상, 1일 다 회 이용 시, 1회 이용으로 인정)
                      </p>
                    </div>
                  </dt>
                  <dd>
                    <ul class="list-benefit">
                      <li>
                        <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                        <p class="desc">
                          THE POP 리워즈<br/>
                          1,000점
                        </p>
                      </li>
                      <li>
                        <i class="ico coupon vip" aria-label="VIP 할인쿠폰 아이콘"></i>
                        <p class="desc">
                          할인쿠폰<br/>
                          2천원 X 2매
                        </p>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl class="grade-start">
                  <dt>
                    <div class="grade star lalavla">
                      <h3 class="title">lalavla 스타 등급 혜택</h3>
                      <p class="desc">
                        직전 3개월 랄라블라 구매금액 8만원 이상
                      </p>
                    </div>
                  </dt>
                  <dd>
                    <ul class="list-benefit">
                      <li>
                        <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                        <p class="desc">
                          THE POP 리워즈<br/>
                          1,000점
                        </p>
                      </li>
                      <li>
                        <i class="ico coupon vip" aria-label="VIP 할인쿠폰 아이콘"></i>
                        <p class="desc">
                          할인쿠폰<br/>
                          2천원 X 2매
                        </p>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </li>
              <!-- 9월 수정 END : 컨텐츠 추가 -->
              <!-- 4월 수정 START : bottom-info 추가 -->
              <li class="bottom-info">
                <strong class="info-title">GS&amp;POINT와 THE POP 리워즈는 어떻게 다른가요?</strong>
                <p>GS&POINT는 구매 금액에 따라 적립 받는 포인트이며<br/>THE POP 리워즈는 등급제 혜택이나 이벤트 참여 시 지급해<br/>드리는 보상형 리워즈로 GS리테일 모든 브랜드에서<br/>현금처럼 사용할 수 있습니다. </p>
              </li>
              <!-- 4월 수정 END : bottom-info 추가 -->
            </ul>
            <!-- 9월 수정 START : 컨텐츠 추가 -->
            <ul class="wrap-list-dot mypage-grade">
              <li class="list-dot">등급 업데이트는 매월 1일자로 이루어집니다.</li>
              <li class="list-dot">고객등급은 GS 프레시몰, GS25, GS THE FRESH, lalavla 에서 직전 3개월 누적 구매 실적을 기준으로 선정됩니다.</li>
              <li class="list-dot">등급별 쿠폰은 매월 1회에 한해서 제공됩니다. (유효기간은 해당 월말까지이며, 미사용 쿠폰은 재발행 되지 않습니다.)</li>
              <li class="list-dot">쿠폰은 장바구니 쿠폰으로 지급됩니다. (3만원 이상 결제 시 사용가능)</li>
              <li class="list-dot">행사내용 및 혜택은 사전 고지 없이 변경될 수 있습니다.</li>
              <li class="list-dot">쿠폰, 카드행사할인, 포인트/리워즈, 배송비는 고객등급 산정기준에서 제외됩니다.</li>
            </ul>
            <!-- 9월 수정 END : 컨텐츠 추가 -->
          </div>
        </div>
      </section>
      <!-- 수정 START : 2020.02.13 마크업 변경 22-->
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "RegularMemberGrade",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원등급 < 회원정보 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '회원 등급',
      },
    ],
  },
  components: {
    SubDefaultHeader,
    Footer, // 푸터
  },
  data() {
    return {
  //    tab: {
       vvip: true,
       vip: false,
       general: false,
       welcome: false,
//      },
      custGrdNm: "",
      nextCustGrdNm: "",
      custGrdCd: "",
      goalCustGrd: "",
      userNm: "",
      pmbsJoinPrcnCd: "0000",
      gauge: 0, // 회원 등급 게이지,
      rhrnGrdNeedAmt: 0,
      accuSalesAmt: 0,
      pmbsDcAmt: 0,
      custGrdTxt1: "",
      custGrdTxt2: "",
      siteClass: '',
    };
  },
  methods: {
    tabAction(type) { // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
    },
    gsPointList: function() {
      this.$router.push('/cu/regular_member_point_list'); // 정회원
    },
    gsRewordsList: function() {
      this.$router.push('/cu/regular_member_rewards_list'); // 정회원
    },
    couponList: function() {
      this.$router.push('/ev/coupon_list');
    },
    toCommaCvert(val) {
     return NumberUtils.toComma(val);
    },
    getMove(mbrTypeCd) { // 잘못된경로 접근 시
      if (mbrTypeCd != "01") {
        this.$router.push('/cu/associate_member_grade'); // 간편회원 mbrTypeCd : 02
      }
    },
    getCustTxt: function () {
      if (this.custGrdCd == "01" && this.goalCustGrd == "01") {
          this.custGrdTxt1 = "THE POP 리워즈 2,500점, 3천원 할인쿠폰 2개 ";
          this.custGrdTxt2 = "혜택을 받고 있어요";
      } else if (this.custGrdCd != "01" && this.goalCustGrd == "01") {
          this.custGrdTxt1 = "THE POP 리워즈 2,500점, 3천원 할인쿠폰 2개";
          this.custGrdTxt2 = "를 추가로 받을 수 있어요";
      } else if (this.goalCustGrd == "02") {
          this.custGrdTxt1 = "THE POP 리워즈 1,000점, 2천원 할인쿠폰 2개";
          this.custGrdTxt2 = "를 추가로 받을 수 있어요";
      } else if (this.goalCustGrd == "03") {
          this.custGrdTxt1 = "THE POP 리워즈 1,000점(최초 1회)";
          this.custGrdTxt2 = "를 추가로 받을 수 있어요";
      }
      /* else {
          this.custGrdTxt1 = "THE POP 리워즈 1,000점";
          this.custGrdTxt2 = "을 추가로 받을 수 있어요";
      }
      */

      if (this.custGrdCd == '01') {
        document.getElementById('userGrd').className = 'user-grade vvip';
        this.vvip = true;
        this.vip = false;
        this.general = false;
        this.welcome = false;
      } else if (this.custGrdCd == '02') {
        document.getElementById('userGrd').className = 'user-grade vip';
        this.vvip = false;
        this.vip = true;
        this.general = false;
        this.welcome = false;
      } else if (this.custGrdCd == '03') {
        document.getElementById('userGrd').className = 'user-grade fam';
        this.vvip = false;
        this.vip = false;
        this.general = true;
        this.welcome = false;
      } else if (this.custGrdCd == '04') {
        document.getElementById('userGrd').className = 'user-grade wel';
        this.vvip = false;
        this.vip = false;
        this.general = false;
        this.welcome = true;
      }
    },
  },
  destroyed() {
  },
  mounted: async function() {
    this.siteClass = CookieUtils.getSiteClass();
    const CU0004Input = {
      commGrpCd: 'CU0004'
    };
    const CU0004 = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', CU0004Input);
    this.CU0004S = CU0004.data.data;
    const resultMemInfo = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null);
    this.userNm = resultMemInfo.data.data.custNm;
    this.pmbsJoinPrcnCd = resultMemInfo.data.data.pmbsJoinPrcnCd;
    this.pmbsDcAmt = resultMemInfo.data.data.pmbsDcAmt;

    this.getMove(resultMemInfo.data.data.mbrTypeCd); // 잘못된경로 접근시

    const resultGrdChgInfo = await ApiUtils.get('/fo/cu/mbrmgnt/grade-up-possible-purchase-amount', null);
    // console.log(JSON.stringify(resultGrdChgInfo.data.data.grdChgPosbPurchAmtListDto[0]));

    const grdDto = resultGrdChgInfo.data.data.grdChgPosbPurchAmtListDto.filter(e => e.bdSpCd === 'Z')[0]; // 전사 등급만 노출

    this.custGrdCd = grdDto.custGrdCd;
    this.goalCustGrd = grdDto.goalCustGrd;
    this.getCustTxt();
    for (let i=0; i < this.CU0004S.length; i++) {
      if (this.CU0004S[i].commCd == this.custGrdCd) {
        this.custGrdNm = this.CU0004S[i].commCdNm;
      }
      if (this.CU0004S[i].commCd == grdDto.goalCustGrd) {
        this.nextCustGrdNm = this.CU0004S[i].commCdNm;
      }
    }
    this.accuSalesAmt = grdDto.accuSalesAmt;
    this.rhrnGrdNeedAmt = grdDto.rhrnGrdNeedAmt;
    this.gauge = 100 - ((Number(this.rhrnGrdNeedAmt) * 100) / (Number(this.accuSalesAmt) + Number(this.rhrnGrdNeedAmt)));
  },
};
</script>
