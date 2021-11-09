<!-- 03. 룰렛 이벤트 -->
<template>
  <div class="wrap templete-event">
    <!-- START : 헤더 -->
    <SubDefaultHeader />
    <!-- END : 헤더 -->
    <!-- START : 이벤트 컨텐츠 -->
    <div class="contents">
      <!-- START : 이벤트 소개 영역 -->
      <div class="visual-area">
        <img src="//via.placeholder.com/350x350" alt="" />
      </div>
      <!-- END : 이벤트 소개 영역 -->
      <!-- START : 이벤트 컨텐츠 타입 -->
      <!--
        01.출석체크이벤트 : event-checkin
        02.스페셜 스탬프 이벤트 : event-stamp
        03.룰렛이벤트 : event-roulette
        04.고지형 이벤트_앱푸쉬알림수신동의 팝업 : -
        05.고지형 이벤트_신규회원쿠폰 : event-newby
        06.고지형 이벤트_정보 동의 템플릿 : event-privacy
        07.고지형 이벤트_광고수신동의 이벤트 : event-adagree
        08.고지형 이벤트_단순 응모 이벤트 : -
        09.광고수신동의이벤트 : -
        10.SNS 공유이벤트 : -
        11.댓글이벤트 : -
        12.댓글이벤트(포토) : -
        13.퀴즈이벤트 : -
        14.투표이벤트 : -
        15.친구추천(초대)이벤트 : -
        16.랭킹전이벤트 : -
        17.앱리뷰이벤트 : -
       -->
      <!-- 01.출석체크이벤트 -->
      <div class="event-cont event-checkin">
        <img src="@/assets/images/img/img_event_checkin_bg02.jpg" alt="" />
        <div class="wrap-daily-cal">
          <div class="daily-cal">
            <!--
              출석 전 : <div class="msg">
              출석 후 : <div class="msg hide">
             -->
            <div class="msg">
              <img src="@/assets/images/img/img_event_checkin_msg.png" alt="" />
            </div>
            <img
              src="@/assets/images/img/img_event_checkin_daily_cal.png"
              alt=""
            />
            <div class="inner">
              <p class="month">
                <span class="num">1</span>
                <span class="txt">월</span>
              </p>
              <div class="page tear" v-on:click="onDailyTear">
                <div class="inner">
                  <p class="date">
                    <span class="num">5</span>
                    <span class="txt">일</span>
                  </p>
                  <p class="text">아직 출석 전 입니다.</p>
                </div>
              </div>
              <div class="page complete">
                <div class="inner">
                  <p class="date">
                    <span class="num">5</span>
                    <span class="txt">일</span>
                    <span class="state">출석완료!</span>
                  </p>
                  <p class="text">
                    <span class="italic">축 당첨! </span>랜덤 포인트<span
                      class="bold"
                    >
                      3P 적립</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="wrap-state">
            <!-- 로그인 전 -->
            <!-- 로그인 후 참여해주세요. -->
            <!-- 로그인 후 -->
            이번달 출석 현황 <span>28회중</span> <strong>4회 출석완료</strong>
          </div>
        </div>
        <div class="wrap-calendar">
          <datepicker
            inline
            :format="formatter"
            :disabledDates="disabledDates"
            :language="language"
          ></datepicker>
          <div class="wrap-state">
            <div class="state-text">
              <span class="txt1">2020년 개근현황</span>
              <!-- 로그인 전 -->
              <!-- <span class="txt2">로그인 후 확인해주세요.</span> -->
              <!-- 로그인 후 -->
              <span class="txt2">4개월 개근 성공!</span>
            </div>
            <div class="state-stamp">
              <ul>
                <li>1월</li>
                <li>3월</li>
                <li>4월</li>
                <li>6월</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 02.스페셜 스탬프 이벤트 -->
      <!--
        .type1 : 비순차 진행
        .type2 : 순차 진행
      -->
      <div class="event-cont event-stamp type1 active">
        <img src="@/assets/images/img/img_event_stamp_type1_bg.png" alt="" />
        <div class="wrapper">
          <div class="inner">
            <!-- 아이템 활성화 : .active -->
            <div class="stamp stamp-00 active"><img src="@/assets/images/img/img_event_stamp_type1_00.png" alt="" /></div>
            <div class="stamp stamp-01"><img src="@/assets/images/img/img_event_stamp_type1_01.png" alt="" /></div>
            <div class="stamp stamp-02"><img src="@/assets/images/img/img_event_stamp_type1_02.png" alt="" /></div>
            <div class="stamp stamp-03"><img src="@/assets/images/img/img_event_stamp_type1_03.png" alt="" /></div>
            <div class="stamp stamp-04"><img src="@/assets/images/img/img_event_stamp_type1_04.png" alt="" /></div>
            <div class="stamp stamp-05"><img src="@/assets/images/img/img_event_stamp_type1_05.png" alt="" /></div>
            <div class="stamp stamp-06"><img src="@/assets/images/img/img_event_stamp_type1_06.png" alt="" /></div>
            <div class="stamp stamp-07"><img src="@/assets/images/img/img_event_stamp_type1_07.png" alt="" /></div>
            <div class="stamp stamp-08"><img src="@/assets/images/img/img_event_stamp_type1_08.png" alt="" /></div>
            <div class="stamp stamp-09"><img src="@/assets/images/img/img_event_stamp_type1_09.png" alt="" /></div>
            <div class="stamp complete"><img src="@/assets/images/img/img_event_stamp_type1_complete.png" alt="" /></div>
          </div>
        </div>
        <div class="stamp-state">미션 <span>10개</span> 중 <span>10개</span> 성공!</div>
      </div>
      <!-- END: Type 01 -->
      <!-- START: Type 02 -->
      <div class="event-cont event-stamp type2 ">
        <img src="@/assets/images/img/img_event_stamp_type2_bg.png" alt="" />
        <div class="wrapper">
          <div class="inner">
            <!-- 아이템 활성화 : .active -->
            <div class="stamp stamp-00 active"><img src="@/assets/images/img/img_event_stamp_type2_00.png" alt="" /></div>
            <div class="stamp stamp-01"><img src="@/assets/images/img/img_event_stamp_type2_01.png" alt="" /></div>
            <div class="stamp stamp-02"><img src="@/assets/images/img/img_event_stamp_type2_02.png" alt="" /></div>
            <div class="stamp stamp-03"><img src="@/assets/images/img/img_event_stamp_type2_03.png" alt="" /></div>
            <div class="stamp stamp-04"><img src="@/assets/images/img/img_event_stamp_type2_04.png" alt="" /></div>
            <div class="stamp stamp-05"><img src="@/assets/images/img/img_event_stamp_type2_05.png" alt="" /></div>
            <div class="stamp stamp-06"><img src="@/assets/images/img/img_event_stamp_type2_06.png" alt="" /></div>
            <div class="stamp stamp-07"><img src="@/assets/images/img/img_event_stamp_type2_07.png" alt="" /></div>
            <div class="stamp stamp-08"><img src="@/assets/images/img/img_event_stamp_type2_08.png" alt="" /></div>
            <div class="stamp stamp-09"><img src="@/assets/images/img/img_event_stamp_type2_09.png" alt="" /></div>
            <div class="stamp complete"><img src="@/assets/images/img/img_event_stamp_type2_complete.png" alt="" /></div>
          </div>
        </div>
        <div class="stamp-state">미션 <span>10개</span> 중 <span>10개</span> 성공!</div>
      </div>
      <!-- END: Type 02 -->
      <!-- 03. 룰렛 이벤트 -->
      <div class="event-cont event-roulette">
        <img src="@/assets/images/img/img_event_roulette_bg02.jpg" alt="" />
        <div class="roulette">
          <div class="inner">
            <div class="roulette-pin">
              <img
                src="@/assets/images/img/img_event_roulette_pin.png"
                alt=""
              />
            </div>
            <div class="roulette-panel">
              <img src="@/assets/images/img/img_event_roulette.png" alt="" />
            </div>
            <button class="roulette-start-btn" v-on:click="rouletteStart">
              <img
                src="@/assets/images/img/img_event_roulette_start.png"
                alt=""
              />
            </button>
            <!--
              v-on:click="rouletteStop(2)"
              param : 당첨된 아이템 번호(순서)
            -->
            <button class="roulette-stop-btn" v-on:click="rouletteStop(2)">
              <img
                src="@/assets/images/img/img_event_roulette_stop.png"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
      <!-- 04.고지형 이벤트_앱푸쉬알림수신동의 팝업 -->
      <div class="event-cont"></div>
      <!-- 05.고지형 이벤트_신규회원쿠폰 -->
      <div class="event-cont event-newby">
        <a href="#" class="btn btn-01"><img src="@/assets/images/img/img_event_newby_btn_01.png" alt="회원가입하기" /></a>
        <a href="#" class="btn btn-02"><img src="@/assets/images/img/img_event_newby_btn_02.png" alt="앱 다운로드" /></a>
      </div>
      <!-- 06.고지형 이벤트_정보 동의 템플릿 -->
      <div class="event-cont event-privacy">
        <div class="event-privacy-agree">
          <div class="wrap-event-info">
            <div class="btn-accordion btn-event-info" aria-controls="rowInputContent01" aria-expanded="false" @click="accordionEvent">
              <label for="agree-chk01" v-on:click="onClickCheckbox"><input type="checkbox" id="agree-chk01" /><span>개인정보 수집 이용 동의</span><em>(필수)</em></label>
            </div>
            <div id="rowInputContent01" class="event-info-cont" aria-labelledby="rowInput" hidden="true">
              <ul class="privacy-list">
                <li>개인정보 수집 항목 : 성명 휴대폰번호</li>
                <li>개인정보 수집 및 이용 목적 : 이벤트 응모, 추첨 및 이벤트 운영</li>
                <li>개인정보 보유 및 기간 : 이벤트 종료 후 1개월 이내 파기</li>
                <li>개인정보 수집 이용에 동의하지 않을 수 있으나, 미 동의 사용 이벤트 참여가 불가능 합니다.</li>
              </ul>
            </div>
          </div>
          <div class="wrap-event-info">
            <div class="btn-accordion btn-event-info" aria-controls="rowInputContent02" aria-expanded="false" @click="accordionEvent">
              <label for="agree-chk02" v-on:click="onClickCheckbox"><input type="checkbox" id="agree-chk02" /><span>개인정보 취급 위탁 동의 안내</span><em>(필수)</em></label>
            </div>
            <div id="rowInputContent02" class="event-info-cont" aria-labelledby="rowInput" hidden="true">
              <ul class="privacy-list">
                <li>개인정보 처리 위탁사 : 회사명</li>
                <li>개인정보 위탁 항목 : 성명, 휴대폰 번호</li>
                <li>개인정보 처리 위탁 내용 : 이벤트 대행을 통한 개인정보 처리 및 이벤트 안내 TM/SMS 진행</li>
                <li>개인정보 처리 위탁 기간 : 이벤트 종료 후 1개월 이내 파기</li>
                <li>개인정보 수집 이용에 동의하지 않을 수 있으나, 미 동의시 이벤트 참여가 불가능 합니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 07.고지형 이벤트_광고수신동의 이벤트 -->
      <div class="event-cont event-adagree">
        <div class="inner">
          <div class="chk-total">
            <span class="inp-chk">
              <label for="chkList00">전체동의</label>
              <input type="checkbox" name="" id="chkList00" value="">
            </span>
          </div>
          <div class="chk-list">
            <ul>
              <li>
                <span class="inp-chk">
                  <label for="chkList01">SMS</label>
                  <input type="checkbox" name="" id="chkList01" value="">
                </span>
              </li>
              <li>
                <span class="inp-chk">
                  <label for="chkList02">E-MAIL</label>
                  <input type="checkbox" name="" id="chkList02" value="">
                </span>
              </li>
              <li>
                <span class="inp-chk">
                  <label for="chkList03">우편 및 우편물</label>
                  <input type="checkbox" name="" id="chkList03" value="">
                </span>
              </li>
              <li>
                <span class="inp-chk">
                  <label for="chkList04">전화번호</label>
                  <input type="checkbox" name="" id="chkList04" value="">
                </span>
              </li>
              <li>
                <span class="inp-chk">
                  <label for="chkList05">PUSH알림 수신 동의</label>
                  <input type="checkbox" name="" id="chkList05" value="">
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 08.고지형 이벤트_단순 응모 이벤트 -->
      <div class="event-cont"></div>
      <!-- 09.광고수신동의이벤트 -->
      <div class="event-cont"></div>
      <!-- 10.SNS 공유이벤트 -->
      <div class="event-cont"></div>
      <!-- 11.댓글이벤트 -->
      <div class="event-cont"></div>
      <!-- 12.댓글이벤트(포토) -->
      <div class="event-cont"></div>
      <!-- 13.퀴즈이벤트 -->
      <div class="event-cont"></div>
      <!-- 14.투표이벤트 -->
      <div class="event-cont"></div>
      <!-- 15.친구추천(초대)이벤트 -->
      <div class="event-cont"></div>
      <!-- 16.랭킹전이벤트 -->
      <div class="event-cont"></div>
      <!-- 17.앱리뷰이벤트 -->
      <div class="event-cont"></div>
      <!-- END : 이벤트 컨텐츠 타입 -->
      <!-- START : 경품 안내 -->
      <!-- <div class="giveaway-info"></div> -->
      <!-- END : 경품 안내 -->
      <!-- START : 이벤트 안내 -->
      <div class="wrap-event-info">
        <div
          class="btn-accordion btn-event-info"
          aria-controls="rowInputContent"
          aria-expanded="true"
          @click="accordionEvent"
        >
          갓프레시 바캉스 안내사항
        </div>
        <div
          id="rowInputContent"
          class="event-info-cont"
          aria-labelledby="rowInput"
        >
          <dl class="event-info">
            <dt>
              이벤트 안내
            </dt>
            <dd>
              <ul>
                <li>해당 이벤트는 센터/새벽/전국택배몰 전용입니다.</li>
                <li>해당 이벤트는 결제 금액 5만원 이상 시 참여 가능합니다.</li>
                <li>
                  1일 1회 참여 가능하며, 주문 취소 또는 반품 시 재응모 불가 및
                  당첨내역이 취소됩니다.
                </li>
                <li>부정한 방법으로 응모 시, 이벤트 대상에서 제외됩니다.</li>
                <li>
                  2회 이상 부정 관련 제재로 등록 될 경우 모든 이벤트 참여에
                  제한이 있을 수 있습니다.
                </li>
              </ul>
            </dd>
          </dl>
          <dl class="event-info">
            <dt>
              당첨 안내
            </dt>
            <dd>
              <ul>
                <li>
                  당첨되신 경품 중 쿠폰의 경우 고객님의 아이디로 발급될
                  예정이며, 마이페이지 쿠폰함을 확인 부탁드립니다.
                </li>
                <li>고객 정보를 항상 최신 버전으로 업데이트 부탁드립니다.</li>
                <li>
                  SNS수신이 'N'으로 설정되어 있는 경우, 문자 수신이 어려울 수
                  있으니 설정 변경을 부탁드립니다.
                </li>
                <li>
                  이벤트 참여시 개인정보 이용에 동의하신 것으로 간주하며, 경품
                  발송을 위해 수집한 개인정보는 발송일 이후 60일 이내
                  파기됩니다.
                </li>
                <li>
                  모든 경품은 다르상품으로 변경/환불 불가한 점 참고
                  부탁드립니다.
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
      <!-- END : 이벤트 안내 -->
    </div>
    <!-- END : 이벤트 컨텐츠 -->
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 서브헤더
import Footer from '@/components/common/Footer';
import AccordionMixin from '@/mixins/AccordionMixin';
import gsap from 'gsap';
import Datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import DateUtils from '@/common/DateUtils';

export default {
  name: 'EventTemplete',
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '이벤트 템플릿 < 이벤트 < %s',
  },
  mixins: [AccordionMixin],
  data() {
    return {
      // START : 01.출석체크이벤트
      format: 'yyyy-MM-dd (dd)',
      language: {
        language: 'Korean',
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthsAbbr: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
        days: ['일', '월', '화', '수', '목', '금', '토'],
        ymd: !0,
        yearSuffix: '.',
      },
      disabledDates: {
        dates: [
          // 출석체크한 날짜 표시
          new Date(2020, 0, 10),
          new Date(2020, 0, 11),
          new Date(2020, 0, 12),
        ],
      },
      // END : 01.출석체크이벤트
    };
  },
  components: {
    SubDefaultHeader,
    Footer,
    Datepicker,
  },
  methods: {
    // START : 01.출석체크이벤트
    formatter(date) {
      this.$emit('changeDeliveryEvent', this.selectDate, this.selectDay);
      this.selectDate = DateUtils.format(date, 'YYYY-MM-DD');
      this.selectDay = DateUtils.format(date, '(dd)');
    },
    onDailyTear(e) {
      const el = e.currentTarget;
      el.classList.add('checkin');
      const elMsg = el.parentElement.parentElement.querySelector('.msg');
      elMsg.classList.add('hide');
    },
    // END : 01.출석체크이벤트
    // START : 03.룰렛이벤트
    rouletteStart(e) {
      console.log('rouletteStart', e.currentTarget);
      const options = {
        rotation: 360,
        repeat: -1,
        ease: 'linear',
      };
      gsap.to('.roulette-panel', options);

      const el = e.currentTarget;
      el.nextSibling.focus();
      el.remove();
    },
    rouletteSpin() {},
    rouletteStop(value) {
      console.log('rouletteStop');
      const deg = -45;
      const spin = 5;
      const options = {
        rotation: 360 * spin + deg * value,
        duration: 5,
        ease: 'easeOut',
        onComplete: function() {
          gsap.killTweensOf('.roulette-panel');
          console.log('endMotion');
        },
      };
      gsap.to('.roulette-panel', options);
    },
    // END : 03.룰렛이벤트
    // START : 06.고지형 이벤트_정보 동의 템플릿
    onClickCheckbox(e) {
      e.stopPropagation();
    }
    // END : 06.고지형 이벤트_정보 동의 템플릿
  },
  mounted() {},
};
</script>

<style></style>
<!-- DEPBOSFR-111 FO_전체배포(2차) -->
