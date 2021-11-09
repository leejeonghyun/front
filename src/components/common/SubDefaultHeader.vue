<template>
    <MainHeader v-if="cmmSteId === '3'"
      :activeIdx="activeIdx"
      :headerData="headerData"
      :headertype="headertype"
      :headerTitle="headerText"
      :headerImg="headerImg"
      :activeAllChannel="activeAllChannel"
      :type="type"
      :active="active"
      :searchBtnBottom="searchBtnBottom"
      :mallActive="mallActive"
      :contentsIdName="contentsIdName"
      :cartView="cartView"
      :searchView="searchView"
      :tabbar="tabbar"
      :flowroute="flowroute"
      :pageIndex="pageIndex"
      :historyView="historyView"
      :homeView="homeView"
      :headerShow="headerShow"
    />
    <SubDefaultHeader v-else
      :headerText="headerText"
      :prevType="prevType"
      :prevHomeType="prevHomeType"
      :onlyTitleType="onlyTitleType"
      :tabbar="tabbar"
      :adText="adText"
      :mallActive="mallActive"
      :isLogin="isLogin"
      :chatbot="chatbot"
    />
</template>
<script>
import MainHeader from '@/components/common/M4MainHeader';
import SubDefaultHeader from '@/components/common/SubDefaultHeaderGSF'; // gsfresh 헤더
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'MainSubHeader',
  props: {
    /** -START- GS Fresh Header Propety **/
    headerText: {
      // 페이지 타이틀
      type: String,
      default: '',
    },
    prevType: {
      // 이전버튼만 있는 타입
      type: Boolean,
      default: false,
    },
    prevHomeType: {
      // 8월 수정 : 이전버튼, 홈 버튼만 있는 타입 추가
      type: Boolean,
      default: false,
    },
    onlyTitleType: {
      // 타이틀만 있는 타입 (탭바, 하단 플로팅 버튼 없음)
      type: Boolean,
      default: false,
    },
    adText: {
      // 하단 티커 마케팅 문구
      type: String,
      default: '',
    },
    isLogin: Boolean, // 로그인여부 (달리살다 퍼블용)
    chatbot: {
      // 고객센터 쳇봇 유무
      type: Boolean,
      default: false,
    },
    /** -END- GS Fresh Header Propety **/
    /** -START- Market For Header Propety **/
    activeIdx: {
      type: Number,
      default: 0,
    },
    headerData: Array,
    headertype: {
      type: Number,
      default: 3,
    },
    headerTitle: {
      type: String,
      default: ''
    },
    headerImg: {
      type: String,
      default: ''
    },
    activeAllChannel: {
      type: Boolean,
      default: true
    },
    type: String,
    active: {
      type: Number,
      default: 0
    },
    searchBtnBottom: {
      type: Boolean,
      default: false
    },
    contentsIdName: {
      type: String,
      default: ""
    },
    cartView: {
      type: Boolean,
      default: true
    },
    searchView: {
      type: Boolean,
      default: true
    },
    flowroute: {
      type: String,
      default: 'marketfor'
    },
    pageIndex: {
      hIndex: {
        type: Number,
        default: 0,
      },
      vIndex: {
        type: Number,
        default: 0,
      }
    },
    historyView: { // 추가
      type: Boolean,
      default: true
    },
    homeView: { // 20201112 추가
      type: Boolean,
      default: true
    },
    headerShow: {
      type: Boolean,
      dafault: false
    },
    /** -END- Market For Header Propety **/
    /** -START- 공통 Header Propety **/
    mallActive: { // mall active index 값
       type: Number,
       default: 5,
    },
    tabbar: {
      // 하단 탭바 여부
      type: Boolean,
      default: true,
    },
    /** -END- 공통 Header Propety **/
  },
  components: {
    MainHeader,
    SubDefaultHeader, // gsfresh 헤더
  },
  data() {
    return {
      cmmSteId: CookieUtils.getCmmSteId()
    };
  },
  computed: {},
  async created() {},
  methods: {},
  mounted() {},
  destroyed() {},
  updated() {},
};
</script>
