import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import ArrayUtils from '@/common/ArrayUtils';
import LoginUtils from '@/common/LoginUtils';
export default {
  state: {
    // 인기검색어
    popularList: [],
    daybreakPopularList: [],
    m4AutocompleteList: [],
    popularMakeTime: '',
    daybreakPopularMakeTime: '',
    m4SearchMarketing: [],
    m4RecommendSearchList: [],
    recentAutoSave: true,
    recentSearchList: [],
    // 최근 저장건수
    recentMaxCnt: 10,
    // 최근 저장일수
    recentSaveDays: 30,
    gsfreshDawndeliYn: false, // 검색팝업 새벽배송 영역 노출 여부
    eventList: [],
    mallSearchInfoList: [
      {mall: 'all_m4', mallTitle: '통합검색', mallId: 300, popwordMall: '_ALL_', dspCtgId: process.env.VUE_APP_M4_SEARCH_ALL_DSPCTGID, dspConrTplId: process.env.VUE_APP_M4_SEARCH_ALL_DSPCONRTPLID, cmmSteId: '3', count: 0},
      // {mall: 'gsfresh_m4', mallTitle: 'GS 프레시몰', mallId: 1, popwordMall: 'gsfresh', dspCtgId: process.env.VUE_APP_M4_SEARCH_GSFRESH_DSPCTGID, dspConrTplId: process.env.VUE_APP_M4_SEARCH_GSFRESH_DSPCONRTPLID, cmmSteId: '1', count: 0},
      {mall: 'all', mallTitle: 'GS 프레시몰', mallId: 1, popwordMall: 'gsfresh', dspCtgId: process.env.VUE_APP_M4_SEARCH_GSFRESH_DSPCTGID, dspConrTplId: process.env.VUE_APP_M4_SEARCH_GSFRESH_DSPCONRTPLID, cmmSteId: '1', count: 0},
      {mall: 'dalisalda', mallTitle: '달리살다', mallId: 11, popwordMall: 'dalisalda', dspCtgId: process.env.VUE_APP_M4_SEARCH_DALISALDA_DSPCTGID, dspConrTplId: process.env.VUE_APP_M4_SEARCH_DALISALDA_DSPCONRTPLID, cmmSteId: '2', count: 0},
      {mall: 'gsshop', mallTitle: 'GS SHOP', mallId: 301, popwordMall: 'gsshop', dspCtgId: process.env.VUE_APP_M4_SEARCH_GSSHOP_DSPCTGID, dspConrTplId: process.env.VUE_APP_M4_SEARCH_GSSHOP_DSPCONRTPLID, cmmSteId: '3', count: 0},
      {mall: 'thebanchan', mallTitle: '더반찬', mallId: 302, popwordMall: 'thebanchan', dspCtgId: process.env.VUE_APP_M4_SEARCH_THEBANCHAN_DSPCTGID, dspConrTplId: process.env.VUE_APP_M4_SEARCH_THEBANCHAN_DSPCONRTPLID, cmmSteId: '3', count: 0},
      {mall: 'yamtable', mallTitle: '얌테이블', mallId: 303, popwordMall: 'yamtable', dspCtgId: process.env.VUE_APP_M4_SEARCH_YAMTABLE_DSPCTGID, dspConrTplId: process.env.VUE_APP_M4_SEARCH_YAMTABLE_DSPCONRTPLID, cmmSteId: '3', count: 0},
      // {mall: 'petsbe', mallTitle: '어바웃펫(펫츠비)', mallId: 303, popwordMall: 'petsbe', dspCtgId: '', dspConrTplId: '', cmmSteId: '3', count: 0},
      // {mall: 'lalavla', mallTitle: '랄라블라', mallId: 304, popwordMall: 'lalavla', dspCtgId: '', dspConrTplId: '', cmmSteId: '3', count: 0},
      // {mall: 'cookatmarket', mallTitle: '쿠캣', mallId: 305, popwordMall: 'cookatmarket', dspCtgId: 'N305002001', dspConrTplId: '1145', cmmSteId: '3', count: 0},
    ],
  },
  getters: {
    // 랜덤 마케팅문구
    getM4RandomMarketing: state => {
      // 마케팅문구
      const randomList = ArrayUtils.shuffle(state.m4SearchMarketing.filter(el=> el.linkUrl));
      // 기본문구
      const basicList = ArrayUtils.shuffle(state.m4SearchMarketing.filter(el=> !el.linkUrl));
      if (randomList && randomList.length > 0) {
        return randomList[0];
      } else if (basicList && basicList.length > 0) {
        return basicList[0];
      } else {
        return null;
      }
    },
    getM4PopularList: state => (type) => {
      // 인기검색어 9위~
      if (type === "list") {
        return state.popularList;
      }
      // 인기태그 : 인기검색어 1위~8위
      return state.popularList.filter((el, index) => index < 8);
    },
    getM4PopularMakeTime: state => () => {
      if (!state.popularMakeTime) {
        return null;
      }
      return DateUtils.format(state.popularMakeTime, 'YYYY.MM.DD HH:mm');
    },
    // 최근검색어와의 중복을 제거한 자동완성 추천단어
    m4filteredAutoCompleteList: (state, getters) => {
      const cookieList = getters.filteredRecommendSearchList;
      let m4AutocompleteList = state.m4AutocompleteList;
      cookieList.forEach(el => {
        m4AutocompleteList = m4AutocompleteList.filter(el2 => el2.keyword !== el.keyword);
      });
      return m4AutocompleteList;
    },
    getM4EventList: state => (length, type) => {
      return state['eventList'+type].filter((el, index) => (!length || index < length));
    },
  },
  mutations: {
    // 최근검색어 쿠키조회
    getM4RecentSearchCookie: (state) => {
      const cookieName = 'RECENT_SEARCH';
      state.recentSearchList = [];
      // 유효기간안의 검색어만 조회
      if (CookieUtils.getCookie(cookieName).length > 0) {
        const cookieList = JSON.parse(CookieUtils.getCookie(cookieName));
        state.recentSearchList = cookieList.filter(
          el => DateUtils.isBefore(
            DateUtils.getToday(),
            DateUtils.add(el.date, state.recentSaveDays, 'day')
          )
        );
      }
    },
    // 최근검색어 쿠키추가
    addM4RecentSearchCookie: (state, params) => {
      const cookieName = 'RECENT_SEARCH';
      // 검색어 없는경우
      if (!params.keyword && !(params.keyword).trim()) {
        return;
      }
      state.recentSearchList = state.recentSearchList.filter(el => el.keyword !== params.keyword);

      // 최근 검색어 최대건수 넘을경우 마지막 검색어 삭제
      if (state.recentSearchList.length >= state.recentMaxCnt) {
        state.recentSearchList.pop();
      }
      state.recentSearchList.unshift(params);
      CookieUtils.setCookie(cookieName, JSON.stringify(state.recentSearchList), 30);
    },
    // 최근검색어 쿠키삭제
    removeM4RecentSearchCookie: (state, params) => {
      const cookieName = 'RECENT_SEARCH';
      state.recentSearchList = state.recentSearchList.filter(el => el.keyword !== params.keyword);
      if (state.recentSearchList.length > 0) {
        CookieUtils.setCookie(cookieName, JSON.stringify(state.recentSearchList), 30);
      } else {
        CookieUtils.deleteCookie(cookieName);
      }
    },
    removeM4RecentSearchCookieAll: (state) => {
      const cookieName = 'RECENT_SEARCH';
      state.recentSearchList = [];
      CookieUtils.deleteCookie(cookieName);
    },
    // 최근검색어 자동저장 조회
    getM4RecentAutoSave: (state) => {
      const cookieName = 'RECENT_AUTO_SAVE';
      if (CookieUtils.getCookie(cookieName) && CookieUtils.getCookie(cookieName) === "false") {
        state.recentAutoSave = false;
      }
    },
    // 최근검색어 자동저장 설정
    setM4RecentAutoSave: (state, params) => {
      const cookieName = 'RECENT_AUTO_SAVE';
      state.recentAutoSave = params.value;
      CookieUtils.setCookie(cookieName, params.value, 30);
    },
  },
  actions: {
    // 마케팅문구, 추천검색어 조회
    async getM4MarketingInfo({ state }, payload) {
      if (!payload) {
        payload = 'all_m4';
      }

      // 마케팅문구, 추천검색어 초기화
      state.m4SearchMarketing = [];
      state.m4RecommendSearchList = [];

      const url = '/dp/mf/displaymgnt/m4-main-template-corner';
      const mallInfo = state.mallSearchInfoList.filter(e => e.mall == payload)[0];

      if (!mallInfo || mallInfo.dspCtgId === '') {
        return;
      }

      const paramsMarketing = {
        mallId: mallInfo.mallId,
        ctgTypeCd: '02',
        dspScrSpCd: '02',
        dspConrTplId: mallInfo.dspConrTplId,
        dspCtgId: mallInfo.dspCtgId,
        cmmSteId: mallInfo.cmmSteId,
        storId: '',
        supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD')
      };
      try {
        const response = await ApiUtils.get(url, paramsMarketing).then(res => {
          if (res.data.data.rmnConrCrpInfoInq) {
            res.data.data.rmnConrCrpInfoInq.rmnConrInfoInq.forEach(e => {
              if (e.dspConrNm === '마케팅문구') {
                state.m4SearchMarketing = e.rmnConrSetInfoInq[0].rmnTplConrCompoSbjInq[0].rmnConrCntInfoInq; // 마케팅문구
              } else {
                state.m4RecommendSearchList = e.rmnConrSetInfoInq[0].rmnTplConrCompoSbjInq[0].rmnConrCntInfoInq; // 추천검색어
              }
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 추천단어 조회(자동완성)
    async getM4AutocompleteList({ state, getters }, payload) {
      const url = '/search/v2/service/ark_trans.jsp';
      const params = {
        query: payload.keyword,
        target: 'common',
        convert: 'fw'
      };
      try {
        if (payload.keyword) {
          const response = await ApiUtils.get(url, params);
          state.m4AutocompleteList = [];
          if (response.data.result.length > 0 && response.data.result[0].totalcount > 0) {
            state.m4AutocompleteList = response.data.result[0].items;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 인기검색어
    async getM4PopularList({ state }, payload) {
      const mall = payload.mall;
      const url = '/search/v2/service/popword.jsp';
      const params = {
        collection: mall === 'daybreak' ? mall : state.mallSearchInfoList.filter(el => el.mall === mall)[0].popwordMall,
        range: 'd'
      };

      try {
        const response = await ApiUtils.get(url, params);
        const result = Object.keys(response.data).length > 0 ? true : false;
        if (mall === 'daybreak') {
          state.daybreakPopularList = [];
          // response 데이터 1건일때Object n건일때List 처리
          if (result && response.data.Data.Query) {
            if (response.data.Data.Query.constructor == Array) {
              state.daybreakPopularList = response.data.Data.Query;
            } else {
              state.daybreakPopularList[0] = response.data.Data.Query;
            }
            state.daybreakPopularMakeTime = response.data.Data.MakeTime;
          }
        } else {
          state.popularList = [];
          // response 데이터 1건일때Object n건일때List 처리
          if (result && response.data.Data.Query) {
            if (response.data.Data.Query.constructor == Array) {
              state.popularList = response.data.Data.Query;
            } else {
              state.popularList[0] = response.data.Data.Query;
            }
            state.popularMakeTime = response.data.Data.MakeTime;
          }
        }
      } catch (e) {
        if (mall === 'daybreak') {
          state.daybreakPopularList = [];
        } else {
          state.popularList = [];
        }
        console.log(e);
      }
    },
    // 기획전 조회
    async getM4EventList({ state }, payload) {
      const url = '/search/v2/service/event.jsp';
      const params = {
        query: payload.keyword,
        mall: payload.mall,
        listCount: 1,
        custGrdCd: CookieUtils.getCookie('CUST_GRD_CD'),
      };
      try {
        if (payload.keyword) {
          await ApiUtils.get(url, params)
          .then(response => {
              state.eventList = [];
              if (response.data.resultData[0].count > 0) {
                state.eventList = response.data.resultData[0].data;
              }
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 새벽배송 가능여부 조회
    async retrieveDawnDeliYn({ state, dispatch }) {
      if (LoginUtils.isLogin()) {
        try {
          // 기본 배송지 조회
          dispatch("getBaseDeliv").then(function() {
            // 새벽배송가능여부 조회
            if (state.zipcd) {
              dispatch("getDawndeliYn");
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    // 기본배송지 조회
    async getBaseDeliv({state}) {
      try {
        const result = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace');
        if (result.data.data != null) {
          result.data.data.forEach(function(data, idx) {
            if (data.baseDlvpYn == 'Y') {
              state.zipcd = data.zipcd;
              return;
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    // 새벽배송 가능여부
    async getDawndeliYn({state}) {
      try {
        const iDawnDelivInq = { mallId: CookieUtils.getCmmSteId() === '3' ? '' : CookieUtils.getCookie('MALL_ID'), zipCode: state.zipcd };
        const response = await ApiUtils.get('/fo/cu/mypgmgnt/store-list', iDawnDelivInq);
        const deliInfo = response.data.data;
        state.gsfreshDawndeliYn = deliInfo != null && deliInfo.filter(el => el.commCode === '04').length > 0 ? true : false;
      } catch (e) {
        console.error(e);
      }
    },
  }
};
