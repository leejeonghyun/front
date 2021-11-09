<template>
  <div class="wrap-mypage gsfresh"><!-- class gsfresh, dalisalda -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송시간" :prevType="true" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <!-- START : 로그인 전 -->
      <div class="cart-my-address">
        <p class="btn-login">
          <button type="button">로그인 후 정확한 배송시간을 확인할 수 있습니다</button>
        </p>
      </div>
      <!-- END : 로그인 전 -->
      <!-- START : 로그인 후 - 주소 -->
      <!-- <CartAddress @popupEvent="popupAction" /> -->
      <transition name="selectAddress"
        v-on:beforeEnter="slideupBeforeEnter"
        v-on:enter="slideupEnter"
        v-on:after-enter="slideupEnterAfterEnter"
        v-on:leave="slideupEnterLeave"
      >
        <!-- <PoupSelectAddress @popupEvent="popupAction" v-if="this.popup.popupAddrList" /> --> <!-- 팝업 - 배송지 목록 팝업 -->
        </transition>
      <!-- 새벽배송 START : 2020. 03. 23 로그인 후 배송지가 없음 -->
      <div class="cart-my-address">
        <p class="btn-login enter-address">
          <a href="#">배송지를 등록하면 정확한 배송시간을 확인할 수 있습니다</a>
        </p>
      </div>
      <!-- 새벽배송 END : 2020. 03. 23 로그인 후 배송지가 없음 -->
      <!-- END : 로그인 후 - 주소 -->
      <div class="content-inner-wrap">
        <section class="delivery-box no-border" v-for="delivSlot in delivSlotList" v-bind:key="delivSlot.delivTypeCd">
          <h1 v-if="delivSlot.delivTypeCd === '01' || delivSlot.delivTypeCd === '04'"><strong class="tit-sub-page">{{getDelivNm(delivSlot.delivTypeCd)}} <span class="txt">({{delivSlot.siteNm}})</span></strong></h1>
          <h1 v-else><strong class="tit-sub-page">배송가능한 정보가 존재하지 않습니다.</strong></h1>
          <table v-if="delivSlot.delivTypeCd === '01' || delivSlot.delivTypeCd === '04'" class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표">
            <caption>배송 날짜 및 배송 시간 지정</caption>
            <colgroup>
              <col style="width: 47px;">
              <col v-for="delivDt in delivSlot.odDelivDtList" v-bind:key="delivDt.delivDt" >
            </colgroup>
            <thead>
              <tr>
                <th scope="col">배송시간</th>
                <th scope="col" v-for="delivDt in delivSlot.odDelivDtList" v-bind:key="delivDt.delivDt">{{toFormat(delivDt.delivDt, 'MM/DD')}} ({{delivDt.dow}})</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(delivDtTmInfo, seqIdx) in delivSlot.odDelivDtTmList" v-bind:key="delivDtTmInfo.delivBeginTm" v-show="rowFlag(delivSlot.delivTypeCd, seqIdx)">
                <th scope="row">
                  <span v-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == true">{{toTimeFormat(delivDtTmInfo.delivBeginTm)}}<span class="br"> ~ </span>{{toTimeFormat(delivDtTmInfo.delivEndTm)}}</span>
                  <span v-else-if="checkRows(seqIdx, delivDtTmInfo.delivSeqs) == false">
                    free 타임
                    <span class="red">500P</span>
                    <button type="button" class="btn-infomation small" aria-label="free 타임 안내 팝업 활성화" aria-haspopup="dialog"><span class="hidden">안내</span></button>
                  </span>
                </th>
                <td v-for="(delivDtInfo, dtIdx) in delivSlot.odDelivDtList" v-bind:key="delivDtInfo.delivDt">
                  <span v-if="checkVisible(delivSlot.delivTypeCd, seqIdx, dtIdx, delivSlot.odDelivDtList.length) == '04'" class="disabled">휴무일</span>
                  <span v-else-if="checkVisible(delivSlot.delivTypeCd, seqIdx, dtIdx, delivSlot.odDelivDtList.length) == '02'" class="disabled">마감</span>
                  <span v-else-if="checkVisible(delivSlot.delivTypeCd, seqIdx, dtIdx, delivSlot.odDelivDtList.length) == '05'" class="disabled">준비중</span>
                  <span v-else-if="checkVisible(delivSlot.delivTypeCd, seqIdx, dtIdx, delivSlot.odDelivDtList.length) == '01'">가능</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <!--
        <section class="delivery-box no-border">
          <h1><strong class="tit-sub-page">당일배송 <span class="txt">(fresh 1호센터)</span></strong></h1>
          <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표">
            <caption>배송 날짜 및 배송 시간 지정</caption>
            <colgroup>
              <col style="width: 47px;">
              <col>
              <col>
              <col>
              <col>
              <col>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th scope="col">배송<br>시간</th>
                <th scope="col">11/27 (수)</th>
                <th scope="col">11/28 (목)</th>
                <th scope="col">11/29 (금)</th>
                <th scope="col">11/30 (토)</th>
                <th scope="col">12/01 (일)</th>
                <th scope="col">12/02 (월)</th>
                <th scope="col">12/03 (화)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">10:00 <span class="br">~</span> 14:30</th>
                <td class="disabled">마감</td>
                <td class="disabled">마감</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td class="disabled">준비중</td>
              </tr>
              <tr>
                <th scope="row">13:30 <span class="br">~</span> 18:30</th>
                <td class="disabled">마감</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td class="disabled">준비중</td>
              </tr>
              <tr>
                <th scope="row">17:00 <span class="br">~</span> 20:30</th>
                <td class="disabled">마감</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td class="disabled">준비중</td>
              </tr>
              <tr>
                <th scope="row">19:00 <span class="br">~</span> 22:00</th>
                <td class="disabled">마감</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td class="disabled">준비중</td>
              </tr>
              <tr class="bg">
                <th scope="row">
                  free 타임 <span class="red">500P</span>
                  <button type="button" class="btn-infomation small" aria-label="free 타임 안내 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupFreeTime')"><span class="hidden">안내</span></button>
                </th>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td class="disabled">준비중</td>
              </tr>
            </tbody>
          </table>
        </section>
        -->
        <!--
        <section class="delivery-box no-border">
          <h1><strong class="tit-sub-page">새벽배송 <span class="txt">(fresh 새벽센터)</span></strong></h1>
          <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표">
            <caption>배송 날짜 및 배송 시간 지정</caption>
            <colgroup>
              <col style="width: 90px;">
              <col>
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th scope="col">배송시간</th>
                <th scope="col">11/27 (수)</th>
                <th scope="col">11/28 (목)</th>
                <th scope="col">11/29 (금)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">01:00 ~ 07:00</th>
                <td class="disabled">마감</td>
                <td>가능</td>
                <td>가능</td>
              </tr>
            </tbody>
          </table>
        </section>
        -->
        <ul class="list-type-dot gray">
          <li>배송불가장소 : 병원, 시장, 학교 및 기숙사, 관공서 등</li>
        </ul>
        <!-- 새벽배송 START : 2020. 03. 23 새벽배송 불가 지역 -->
        <section class="delivery-box no-border">
          <h1><strong class="tit-sub-page">새벽배송 <!--<span class="txt">(fresh 새벽센터)</span>--></strong></h1> <!-- 4월수정 : 안내 타이틀 옆에는 센터명 비노출 되어 삭제 -->
          <p class="inform">현재 배송지는 새벽배송을 이용할 수 없습니다</p>
          <dl class="area-delivery-inform">
            <dt>새벽 배송 가능지역 안내</dt>
            <dd>서울 전지역</dd>
            <dd><em>경기 : </em><span>부천시, 광명시, 시흥시(은행/대야/신천), 분당구,<br />위례지구(위례신도시), 고양시</span></dd>
          </dl>
        </section>
        <!-- 새벽배송 END : 2020. 03. 23 새벽배송 불가 지역 -->
      </div>
    </main>
    <!-- <PopupFreeTime @popupEvent="popupAction" v-if="this.popup.popupFreeTime" /> --> <!-- 팝업 - 프리타임 안내 -->
    <Footer /> <!-- 4월수정 : footer 추가 -->
  </div>
</template>
<script>
  import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
  import Footer from '@/components/common/Footer'; // 푸터
  // import CartAddress from '@/components/cart/CartAddress'; // 주소
  // import PoupSelectAddress from '@/views/od/SC-FO-OD-GS-MP-001'; //  팝업 - 배송지 변경
  // import PopupFreeTime from '@/views/pa/SC-FO-PA-GS-MP-020'; // 팝업 - 프리타임 안내
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
  import LoginUtils from '@/common/LoginUtils';
  import CookieUtils from '@/common/CookieUtils';
  import ApiUtils from '@/common/ApiUtils';
  import DateUtils from '@/common/DateUtils';
  import StringUtils from '@/common/StringUtils';
  export default {
    name: "DeliveryTimeBeforeLogin",
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: 'GS fresh',
      titleTemplate: '배송시간 < %s'
    },
    data() {
      return {
        popup: { // 팝업
          open: false,
          popupAddrList: false, // 배송지
          popupFreeTime: false, // 프리타임 안내
        },
        freeTimeFlag: false,
        delivSlotList: null,
      };
    },
    components: {
      SubDefaultHeader,
      Footer,
      // CartAddress,
      // PoupSelectAddress,
      // PopupFreeTime,
    },
    methods: {
      // 팝업 활성/비활성
      popupAction(type) {
        this.popup[`${type}`] = !this.popup[`${type}`];
        this.popup.open = !this.popup.open;
      },
      /* 4월수정 START : 팝업 모션 추가 */
      slideupBeforeEnter(el) {
        el.style.opacity = 0;
        el.style.bottom = '-100%';
      },
      slideupEnter(el) {
        el.style.opacity = 0;
        el.style.bottom = '-100%';
      },
      slideupEnterAfterEnter(el) {
        el.style.opacity = 1;
        el.style.bottom = 0;
        el.focus();
      },
      slideupEnterLeave(el) {
        el.style.opacity = 0;
        el.style.bottom = '-100%';
      },
      async delivSlotSerh() {
        const input = {
          mallId: CookieUtils.getMallId(),
          storId: CookieUtils.getCookie('STOR_ID'),
          supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
        };
        const response = await ApiUtils.post("/fo/od/ordsmgnt/deliv-slot-list", input);
        this.delivSlotList = response.data.data;
      },
      getDelivNm(delivTypeCd) {
        let delivNm = '';
        if (delivTypeCd === '01') {
          delivNm = '당일배송';
        } else if (delivTypeCd === '04') {
          delivNm = '새벽배송';
        }
        return delivNm;
      },
      toFormat(dt, type) {
        return DateUtils.format(dt, type);
      },
      toTimeFormat(time) {
        if (!StringUtils.isEmpty(time)) {
          time = time.substring(0, 2) + ':' + time.substring(2, 4);
        }
        return time;
      },
      rowFlag(delivTypeCd, rowIdx) { // 프리타임 시간을 노출 안할 때 빈 tr 안보이게 처리
        if (this.delivSlotList) {
          for (let i = 0; i < this.delivSlotList.length; i++) {
            if (this.delivSlotList[i].delivTypeCd === delivTypeCd) {
              const delivSeqs = this.delivSlotList[i].odDelivDtTmList[rowIdx].delivSeqs;
                if ( !this.freeTimeFlag) {
                  if ( delivSeqs == '99') {
                    return false;
                  } else {
                    return true;
                  }
                } else {
                  return true;
                }
                return true;
            }
          }
        }
      },
      checkRows(rowIdx, delivSeqs) { // 배송시간에 대한 일반시간 노출과 프리타임 노출 체크
        if (!this.freeTimeFlag) {
          if ( delivSeqs == '99' ) {
            return true;
          } else {
            return true;
          }
        } else {
          if ( delivSeqs == '99') {
            return false;
          } else {
            return true;
          }
        }
      },
      checkVisible(delivTypeCd, rowidx, colIdx, cnt) { // 마감, 휴무일, 라디오버튼 체크
        if (this.delivSlotList) {
          for (let i = 0; i < this.delivSlotList.length; i++) {
            if (this.delivSlotList[i].delivTypeCd === delivTypeCd) {
              if ( this.delivSlotList[i].odDelivSeqsList[rowidx * cnt + colIdx].selSeqsYn === 'Y' ) {
                return '01';
              } else {
                return this.delivSlotList[i].odDelivSeqsList[rowidx * cnt + colIdx].seqsStatCd;
              }
              /*
              const holidayYn = this.delivSeqsList[rowidx * cnt + colIdx].holidayYn;
              const clsYn = this.delivSeqsList[rowidx * cnt + colIdx].clsYn;
              const delivSeqs = this.delivSeqsList[rowidx * cnt + colIdx].delivSeqs;
              if (holidayYn === 'Y') {
                  return 'H';
              } else if (clsYn == 'Y') {
                return 'C';
              } else {
                  return 'P';
              }
              */
            }
          }
        }
      },
    },
    mounted() {
        this.delivSlotSerh();
    },
    updated() {
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
    };
  },
  };
</script>
