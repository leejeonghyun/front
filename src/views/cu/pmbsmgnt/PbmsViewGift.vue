<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- 4월 수정 START : 헤더 타입 변경 -->
    <SubDefaultHeader headerText="달리드림 멤버십" :onlyTitleType="true" :tabbar="false" />
    <!-- 4월 수정 END : 헤더 타입 변경 -->
    <!-- END : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap dreampass">
        <!-- 4월 수정 : dreampass class 추가 -->
        <!-- 4월수정 START : 마크업 수정 -->
        <div class="kakaotalk-code">
          <div class="kakaotalk-msg-area">
            <p class="arrive">선물이 도착했어요.</p>
            <div class="gift-msg-area">
              <p class="txt">{{ this.giftCpnList.giftMsgCnts }}</p>
            </div>
          </div>
          <div class="inner-wrap">
            <span class="expiry-date"><label for="code">달리드림 멤버십 {{ this.giftCpnList.pmbsGiftQty * 30 }}일 회원권</label></span>
            <div class="input-area">
              <!-- 4월수정 START : 마크업 수정 -->
              <input
                id="share-url"
                type="text"
                value
                placeholder
                class="code"
                v-model="this.giftCpnList.giftTrcPinNo"
              />
              <!-- 4월수정 END : 마크업 수정 -->
              <button type="submit" class="btn-copy" @click="shareUrl">번호복사</button>
            </div>
            <div class="receive-info">
              <dl>
                <dt>보낸 사람</dt>
                <!-- <dd>홍길동</dd> -->
                <dd>{{ this.giftCpnList.custNm }}</dd>
                <dt>수신 일시</dt>
                <!-- <dd>2020.01.20</dd> -->
                <dd>{{ dateFormat(this.giftCpnList.pmbsGiftDt) }}</dd>
                <dt>유효기간</dt>
                <!-- <dd>2019.12.12까지 (유료기간내 미등록시 자동취소)</dd> -->
                <dd>{{ dateFormat(this.pmbsGiftDtExp) }} 까지 (유료기간내 미등록시 자동취소)</dd>
              </dl>
            </div>
            <div class="btn-area">
              <!-- 4월수정 START : 문구 수정 -->
              <button
                type="button"
                class="btn-dali daligreen"
                @click="goUrl('/cu/pbms_coupon')"
              >달리드림 멤버십 회원권 등록하러 가기</button>
              <!-- 4월수정 END : 문구 수정 -->
              <button
                type="button"
                class="btn-dali daligray"
                @click="goUrl('/cu/pbms_info')"
              >달리살다 바로가기</button>
            </div>
          </div>
        </div>
        <!-- 4월수정 END : 마크업 수정 -->
        <!-- START : 유의사항 -->
        <div class="code-note">
          <h3 class="tit-coupon">유의사항</h3>
          <ul>
            <!-- 4월수정 START : 문구 수정 -->
            <li>남다른 선택으로 시작하는 생활의 변화 달리살다에서는 친환경, 유기농 브랜드의 제품을 만나실 수 있으며, 달리드림 회원이 되시면 다양한 혜택을 받으실 수 있습니다.</li>
            <li>받으신 회원권은 달리살다 APP, 모바일웹 [ 마이페이지 &gt; 달리드림 멤버십 &gt; 회원권등록하기 ]에서 번호를 등록하여 사용하실 수 있습니다.</li>
            <li>달리드림 회원이 아닐 경우, 가입 후 회원권 사용이 가능합니다.</li>
            <!-- 4월수정 END : 문구 수정 -->
          </ul>
        </div>
        <!-- END : 유의사항 -->
      </div>
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ShareUtils from '@/common/ShareUtils';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'DaliKakaotalkCode',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '멤버십 선물함 < 달리살다 멤버십 < 마이페이지 < %s',
  },
  // props: ['cpnNo'],
  data() {
    return {
      cpnNo: '',
      giftCpnList: [],
      cpn1: '',
      cpn2: '',
      cpn3: '',
      cpn4: '',
      pmbsGiftDtExp: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
  },
  methods: {
    dateFormat(dateStr) {
      if (!StringUtils.isEmpty(dateStr)) {
        return DateUtils.format(dateStr, 'YYYY.MM.DD');
      }
    },
    cpnInfo: async function() {
      const PmbsGiftCpnIsseRegInputDto = { no: this.cpnNo };
      const giftCpnData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-gift-coupon-issue',
        PmbsGiftCpnIsseRegInputDto
      );
      this.giftCpnList = giftCpnData.data.data;
      if (this.giftCpnList == null) {
        this.$gsdialog.alert('올바른 쿠폰번호가 아닙니다. 다시 확인해주세요.');
      } else {
        this.cpn1 = this.giftCpnList.giftTrcPinNo.substring(0, 4);
        this.cpn2 = this.giftCpnList.giftTrcPinNo.substring(4, 8);
        this.cpn3 = this.giftCpnList.giftTrcPinNo.substring(8, 12);
        this.cpn4 = this.giftCpnList.giftTrcPinNo.substring(12);
        this.pmbsGiftDtExp = DateUtils.add(
          DateUtils.parse(this.giftCpnList.pmbsGiftDt),
          7,
          'day'
        );
      }
    },
    shareUrl() {
      ShareUtils.shareUrl('share-url'); // input id
    },
    goUrl(url) {
      location.href = url;
    },
  },
  mounted() {
    this.cpnNo = this.$route.query.no;
    this.cpnInfo();
  },
};
</script>
