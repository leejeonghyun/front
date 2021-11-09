import ApiUtils from '@/common/ApiUtils';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import ArrayUtils from '@/common/ArrayUtils';
export default {
  state: {
    // 진입몰
    baseMall: 'gsfresh', // gsfresh, dalisalda, simplycook(진입몰 X), daybreak
    userId: null,
    custNo: null,
    cookieInfo: {
      storId: null,
      supplFirmCd: null,
      mallId: null,
      dspScrSpCd: null,
      isPmbs: null
    },
    firstSearchYn: true,
    // 검색팝업 키워드
    searchKeyword: '',
    // 검색결과 키워드
    resultKeyword: '',
    // 검색어 제안
    suggestKeyword: '',
    // 기획전 정보
    searchMarketing: [],
    // 추천검색어
    recommendSearchList: [],
    // 자동저장여부
    recentAutoSave: true,
    // 최근검색어목록
    recentSearchList: [],
    // 최근검색어 저장 일수
    recentSaveDays: 30,
    // 최근검색어 저장 건수
    recentMaxCnt: 20,
    // 진입몰 순서가 정렬된 탭
    orderTab: [
      { tabId: 'all', tabName: '전체', count: 0, },
      { tabId: 'gsfresh', tabName: 'GS 프레시몰', count: 0, mallId: '1', storId: '3009', supplFirmCd: '70021', otherMallTitle: 'GS 프레시몰 상품도 함께보세요' },
      { tabId: 'dalisalda', tabName: '달리살다', count: 0, mallId: '11', storId: '3010', supplFirmCd: '70021', otherMallTitle: '친환경 달리살다 상품도 함께보세요' },
      { tabId: 'daybreak', tabName: '새벽배송', count: 0, mallId: '1', storId: '2287', supplFirmCd: '31005'},
      { tabId: 'simplycook', tabName: '심플리쿡', count: 0, mallId: '20', storId: '3006', supplFirmCd: '70021', otherMallTitle: '심플리쿡 상품도 함께보세요' }
    ],
    // 기본 몰정보 조회여부
    loadedBaseInfo: false,
    // 인기검색어
    gsfreshPopularList: [],
    dalisaldaPopularList: [],
    daybreakPopularList: [],
    simplycookPopularList: [],
    gsfreshPopularMakeTime: '',
    dalisaldaPopularMakeTime: '',
    daybreakPopularMakeTime: '',
    simplycookPopularMakeTime: '',
    popularTagShow: true,
    // 자동완성 매칭매장 *변경불가* 변경시 검색엔진 내부로직도 수정필요, 해당되는 storId 없으면 디폴트 gsfresh2
    autoCompleteTarget: [
      { target: 'gsfresh1', storList: '2329,2267' },
      { target: 'gsfresh2', storList: '316' },
      { target: 'gsfresh3', storList: '435,361,348,412,334,459,335,327,337' },
      { target: 'gsfresh4', storList: '346,342,375,374,339,490,328,317,345,441,330,322,367,323,420,332' },
      { target: 'gsfresh5', storList: '432,329,410,461,325,427,402,340,349,525,763,1096,324,805' },
      { target: 'gsfresh6', storList: '491,338,355,506,415,359,839,869,422,341,454,526,408' },
      { target: 'gsfresh7', storList: '433,2077,612,418,364,407,498,832,806,801,778,356' },
      { target: 'gsfresh8', storList: '784,333,944,1024,700,652,1008,795,2163,711' },
      { target: 'gsfresh9', storList: '336,429,363,917,425' },
    ],
    // 자동완성 추천단어
    autocompleteList: [],
    // 기획전
    eventList: [],
    // 검색결과내 기획전
    eventListInResult: [],
    eventResult: false, // 기획전 상품 조회완료 여부
    // 최근 본 상품
    recentItemList: [],
    // 신상품
    newItemList: [],
    daybreakDeliveTime: [],
  },
  getters: {
    // 랜덤 마케팅문구
    getRandomMarketing: state => {
      // 마케팅문구
      const randomList = ArrayUtils.shuffle(state.searchMarketing.filter(el=> el.linkUrl));
      // 기본문구
      const basicList = ArrayUtils.shuffle(state.searchMarketing.filter(el=> !el.linkUrl));
      if (randomList && randomList.length > 0) {
        return randomList[0];
      } else if (basicList && basicList.length > 0) {
        return basicList[0];
      } else {
        return null;
      }
    },
    // 현재 검색어가 포함된 최근검색어(쿠키)
    filteredRecommendSearchList: state => {
      if (!state.recentAutoSave) {
        return null;
      } else {
        return state.recentSearchList.filter(el => !state.searchKeyword || el.keyword.includes(state.searchKeyword));
      }
    },
    // 자동완성 타겟그룹
    getAutoCompleteTarget: state => (storId, mall) => {
      // 해당되는 storId 없으면 디폴트 gsfresh2
      let targetMall = 'gsfresh2';
      if ( mall === 'gsfresh') {
        state.autoCompleteTarget.some(el=>{
          if (el.storList.split(',').includes(storId)) {
            targetMall = el.target;
            return true;
          }
        });
        return targetMall;
      } else {
        return mall;
      }
    },
    // 최근검색어와의 중복을 제거한 자동완성 추천단어
    filteredAutoCompleteList: (state, getters) => {
      const cookieList = getters.filteredRecommendSearchList;
      let autoCompleteList = state.autocompleteList;
      if (cookieList && cookieList.length > 0) {
        cookieList.forEach(el => {
          autoCompleteList = autoCompleteList.filter(el2 => el2.keyword !== el.keyword);
        });
      }
      return autoCompleteList;
    },
    getEventList: state => (length, type) => {
      return state['eventList'+type].filter((el, index) => (!length || index < length));
    },
    // 진입몰이 첫번째 탭으로
    getOrderTab: state => (allContain, activeTab) => {
      const all = state.orderTab.filter(el => el.tabId === 'all')[0];
      const tempTab = state.orderTab.filter(el => el.tabId !== state.baseMall && el.tabId !== 'all');
      const baseMall = state.orderTab.filter(el => el.tabId === state.baseMall)[0];
      tempTab.unshift(baseMall);
      // 전체 포함시 전체가 가장 첫번째 탭으로
      if (allContain) {
        tempTab.unshift(all);
      }
      return tempTab.filter(el => !activeTab || el.tabId === activeTab);
    },
    getPopularList: state => (type, mall) => {
      // 인기검색어 9위~
      if (type === "list") {
        return state[mall + 'PopularList'].filter((el, index) => index >= 8);
      }
      // 인기태그 : 인기검색어 1위~8위
      return state[mall + 'PopularList'].filter((el, index) => index < 8);
    },
    getPopularMakeTime: state => (mall) => {
      if (!state[mall + 'PopularMakeTime']) {
        return null;
      }
      if (mall==='simplycook') {
        return DateUtils.format(state[mall + 'PopularMakeTime'], 'YYYY.MM.DD');
      }
      return DateUtils.format(state[mall + 'PopularMakeTime'], 'YYYY.MM.DD HH:mm');
    },
    getdaybreakDelivTime: state => {
      // 2/24(월) 오전 7시 이전 도착
      let daybreakTime = "";
      // console.log("getdaybreakDelivTime", state.daybreakDeliveTime);
      if (state.daybreakDeliveTime && state.daybreakDeliveTime.delivDt && state.daybreakDeliveTime.delivEndTm) {
        const delivDt = DateUtils.format(state.daybreakDeliveTime.delivDt, 'YYYY-MM-DD');
        let MD = '';
        const AH = DateUtils.format(state.daybreakDeliveTime.delivDt + state.daybreakDeliveTime.delivEndTm, 'a h:mm');
        if ( DateUtils.getToday() === delivDt) {
          MD = '오늘 ';
        } else if ( DateUtils.getTomorrow() === delivDt) {
          MD = '내일 ';
        } else {
          MD = DateUtils.format(state.daybreakDeliveTime.delivDt, 'M/D (dd)');
        }
        daybreakTime = MD + AH + " 이전 도착";
      }
      return daybreakTime;
    },
  },
  mutations: {
    // 최근검색어 쿠키조회
    getRecentSearchCookie: (state) => {
      const cookieName = state.baseMall + 'RecentSearch';
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
    addRecentSearchCookie: (state, params) => {
      // 최근검색어 : 접속한 몰 기준 ( baseMall + baseCookieName)
      const cookieName = state.baseMall + 'RecentSearch';
      // 검색어 없는경우
      if (!params.keyword && !(params.keyword).trim()) {
        return;
      }
      if (!state.recentAutoSave) {
        return;
      }
      state.recentSearchList = state.recentSearchList.filter(el => el.keyword !== params.keyword);

      // 최근 검색어 최대건수 넘을경우 마지막 검색어 삭제
      if (state.recentSearchList.length > state.recentMaxCnt) {
        state.recentSearchList.pop();
      }
      state.recentSearchList.unshift(params);
      CookieUtils.setCookie(cookieName, JSON.stringify(state.recentSearchList), 30);
    },
    // 최근검색어 쿠키삭제
    removeRecentSearchCookie: (state, params) => {
      // 최근검색어 : 접속한 몰 기준 ( baseMall + baseCookieName)
      const cookieName = state.baseMall + 'RecentSearch';
      state.recentSearchList = state.recentSearchList.filter(el => el.keyword !== params.keyword);
      if (state.recentSearchList.length > 0) {
        CookieUtils.setCookie(cookieName, JSON.stringify(state.recentSearchList), 30);
      } else {
        CookieUtils.deleteCookie(cookieName);
      }
    },
    removeRecentSearchCookieAll: (state) => {
      // 최근검색어 : 접속한 몰 기준 ( baseMall + baseCookieName)
      const cookieName = state.baseMall + 'RecentSearch';
      state.recentSearchList = [];
      CookieUtils.deleteCookie(cookieName);
    },
    // 최근검색어 자동저장 조회
    getRecentAutoSave: (state) => {
      // 최근검색어 : 접속한 몰 기준 ( baseMall + baseCookieName)
      const cookieName = state.baseMall + 'RecentAutoSave';
      if (CookieUtils.getCookie(cookieName) && CookieUtils.getCookie(cookieName) === "false") {
        state.recentAutoSave = false;
      }
    },
    // 최근검색어 자동저장 설정
    setRecentAutoSave: (state, params) => {
      // 최근검색어 : 접속한 몰 기준 ( baseMall + baseCookieName)
      const cookieName = state.baseMall + 'RecentAutoSave';
      state.recentAutoSave = params.value;
      CookieUtils.setCookie(cookieName, params.value, 30);
    },
    setSearchKeyword: (state, params) => {
      state.searchKeyword = params.keyword;
    },
    setResultKeyword: (state, params) => {
      state.resultKeyword = params.keyword;
      state.itemList = [];
      state.infiniteId += 1;
    },
  },
  actions: {
    // 마케팅문구, 추천검색어 조회
    async getMarketingInfo({ state, dispatch }) {
      try {
        console.log("getMarketingInfo", state.loadedBaseInfo);
        dispatch("getLoginUserInfo").then(() => {
          console.log("and re getMarketingInfo", state.loadedBaseInfo);
          const url = '/dp/fr/displaymgnt/display-comm-banner-info';
          const info = state.orderTab.filter(e => e.tabId === state.baseMall)[0];
          const paramsMarketing = {
            mallId: info.mallId,
            dspScrSpCd: '02',
            dspConrId: '1015', // 1015(마케팅문구) / 1016(추천검색어)
            dspCtgId: 'N1007003',
            storId: info.storId,
            supplFirmCd: info.supplFirmCd
          };
          console.log("paramsMarketing", paramsMarketing);
          const paramsRecommend = {
            mallId: info.mallId,
            dspScrSpCd: '02',
            dspConrId: '1016',
            dspCtgId: 'N1007003',
            storId: info.storId,
            supplFirmCd: info.supplFirmCd
          };
          console.log("paramsRecommend", paramsRecommend);
          ApiUtils.get(url, paramsMarketing).then((responseM) =>{
            if (responseM.data.data.rdspCommConrInfo) {
              state.searchMarketing = responseM.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo;
              console.log("getMarketingInfo", state.searchMarketing);
            }
          });
          ApiUtils.get(url, paramsRecommend).then((responseR)=>{
            if (responseR.data.data.rdspCommConrInfo) {
              state.recommendSearchList = responseR.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo;
              console.log("getMarketingInfo", state.recommendSearchList);
            }
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 추천단어 조회(자동완성)
    async getAutocompleteList({ state, getters }, payload) {
      // console.log("keyword: " + payload.keyword);
      const url = '/search/service/ark_trans.jsp';
      const params = {
        query: payload.keyword,
        target: getters.getAutoCompleteTarget(CookieUtils.getCookie('STOR_ID'), state.baseMall),
        convert: 'fw'
      };
      try {
        if (payload.keyword) {
          const response = await ApiUtils.get(url, params);
          // console.log("getAutocompleteList", response);
          state.autocompleteList = [];
          if (response.data.result[0].totalcount > 0) {
            state.autocompleteList = response.data.result[0].items;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 기획전 조회
    // 기획전 조회
    async getEventList({ state }, payload) {
      // console.log("getEventList payload: ", payload);
      const mall = payload.mall === 'all' ? state.baseMall : payload.mall;
      const info = state.orderTab.filter(e => e.tabId === mall)[0];
      const url = '/search/service/event.jsp';
      const params = {
        query: payload.keyword,
        mall: mall,
        listCount: 10,
        storId: info.storId,
        supplFirmCd: info.supplFirmCd,
        dspScrSpCd: '02',
        custGrdCd: CookieUtils.getCookie('CUST_GRD_CD'),
      };
      try {
        if (payload.keyword) {
          const response = await ApiUtils.get(url, params);
          // console.log("getEventList", response);
          if (payload.type ==="InResult") { // 검색결과내 기획전
            const frUrl = '/dp/fr/ssevntmgnt/ssevent-detail';
            const dsUrl = '/dp/ds/ssevntmgnt/ssevent-detail';
            state.eventListInResult = [];
            if (response.data.resultData[0].count > 0) {
              state.eventListInResult = response.data.resultData[0].data;
              let result = 0;
              state.eventListInResult.forEach(async (el, index)=>{
                const params = {
                  ssevntId: el.ssevntId,
                  itemLen: 3,
                  fieldsYn: 'N', // 최소 정보 필요
                  dspScrSpCd: '02',
                  mallId: info.mallId,
                  mdaType: CookieUtils.getMdaType(),
                  chnId: CookieUtils.getChanlId(),
                  storId: info.storId,
                  supplFirmCd: info.supplFirmCd,
                  custGrdCd: CookieUtils.getCookie('CUST_GRD_CD'),
                  custTypeCd: CookieUtils.getCookie('MBR_TYPE_CD'),
                };
                await ApiUtils.get(mall==='dalisalda'?dsUrl:frUrl, params)
                  .then(res => {
                    if (res.data.data && res.data.data.repItems) {
                      state.eventListInResult[index].dataList = res.data.data.repItems;
                    }
                    result++;
                  });
                if (state.eventListInResult.length === result) {
                  console.log("기획전 조회 끝!", state.eventListInResult);
                  state.eventResult = true;
                }
              });
            }
          } else { // 검색팝업내 기획전
            state.eventList = [];
            if (response.data.resultData[0].count > 0) {
              state.eventList = response.data.resultData[0].data;
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 인기검색어
    async getPopularList({ state }, payload) {
      const url = '/search/service/popword.jsp';
      const simplycookUrl = '/fo/md/iteminfomgnt/ctg-best-item-list';
      const info = state.orderTab.filter(e => e.tabId === 'simplycook')[0];
      const params = {
        collection: payload.mall,
        range: 'd'
      };
      // 심플리쿡은 Best 상품으로 조회
      const simplycookParams = {
        mallId: info.mallId,
        storId: info.storId,
        supplFirmCd: info.supplFirmCd,
        limit: 18,
        itemAggTypeCd: '00'
      };
      // Test
      // const simplycookParams = {
      //   mallId: '1',
      //   storId: '2267',
      //   supplFirmCd: '31007',
      //   limit: 18,
      //   dspCtgId: 'G1005'
      // };
      // console.log(params);
      try {
        if (payload.mall !=="simplycook") {
          const response = await ApiUtils.get(url, params);
          state[payload.mall + 'PopularList'] = [];
          // response 데이터 1건일때Object n건일때List 처리
          if (response.data.Data.Query) {
            if (response.data.Data.Query.constructor == Array) {
              state[payload.mall + 'PopularList'] = response.data.Data.Query;
            } else {
              state[payload.mall + 'PopularList'][0] = response.data.Data.Query;
            }
            state[payload.mall + 'PopularMakeTime'] = response.data.Data.MakeTime;
          }
        } else {
          const response = await ApiUtils.get(simplycookUrl, simplycookParams);
          state[payload.mall + 'PopularList'] = response.data.data;
          console.log("simplycookUrl response :", response);
          if (state[payload.mall + 'PopularList'][0] && state[payload.mall + 'PopularList'][0].aggDt) {
            state[payload.mall + 'PopularMakeTime'] = state[payload.mall + 'PopularList'][0].aggDt;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 최근본상품
    async getRecentItemList({ state, dispatch }, payload) {
      try {
        const info = state.orderTab.filter(e => e.tabId === state.baseMall)[0];
        const gsfreshInfo = state.orderTab.filter(e => e.tabId === 'gsfresh')[0];
        const daliInfo = state.orderTab.filter(e => e.tabId === 'dalisalda')[0];
        const simplyInfo = state.orderTab.filter(e => e.tabId === 'simplycook')[0];
        // 로그인시 url 조회, 비로그인시 로그인 전 localStorage이용
        if (!LoginUtils.isLogin()) {
          // 비로그인
          // localStorage.clear();
          const storeItems = JSON.parse(localStorage.getItem("mbrInqItemList"));
          console.log("storeItems is : ", storeItems);
          // 오늘 본 상품만 다시 저장
          if (storeItems) {
            let itemParams = '';
            let mallParams = 'mallId=';
            let storParams = '&storId=';
            let supplFirmParams = '&supplFirmCd=';
            let ssevntIdParams = '&ssevntId=';
            let ssevntTimeParams = '&ssevntTimes=';
            storeItems.forEach((el, index) => {
              console.log("index", index);
              console.log("storeItems.length", storeItems.length);
              const endDiv = (index == (storeItems.length -1))?'':',';
              console.log("endDiv", endDiv);
              itemParams += "&itemId=" + el.itemId;
              mallParams += el.mallId + endDiv;
              storParams += el.storId + endDiv;
              supplFirmParams += el.supplFirmCd + endDiv;
              ssevntIdParams += (el.ssevntId?ssevntId:'') + endDiv;
              ssevntTimeParams += (el.ssevntTimes?el.ssevntTimes:'') + endDiv;
            });
            // console.log("상품 다건 조회", responseItemList);
            console.log("itemParams", itemParams);
            ApiUtils.get('/fo/md/itemaddinfomgnt/multi-item-list?'+ mallParams + storParams + supplFirmParams + itemParams + ssevntIdParams + ssevntTimeParams)
              .then(res => {
                state.recentItemList = res.data.data;
                console.log("state.recentItemList", state.recentItemList);
                 /**
                 * 2020.12.08 수정
                 */
                const exactRecentItemList = state.recentItemList.filter(el => el.supplFirmCd === daliInfo.supplFirmCd
                  || el.supplFirmCd === gsfreshInfo.supplFirmCd
                  || el.supplFirmCd === simplyInfo.supplFirmCd);
                state.recentItemList = exactRecentItemList;
                if (!state.recentItemList || state.recentItemList.length === 0) {
                  dispatch("getNewItemList");
                }
              });
          } else {
            dispatch("getNewItemList");
          }
        } else { // 로그인
          const url = '/fo/md/itemaddinfomgnt/mbr-inquire-item-list';
          const params = {
            mallId: info.mallId,
            limit: 20,
            storId: info.storId,
            supplFirmCd: info.supplFirmCd,
          };
          ApiUtils.get(url, params).then(res => {
            console.log("getRecentItemList 로그인 url : ", res);
            state.recentItemList = res.data.data;
            /**
            * 2020.12.08 수정
            */
            const exactRecentItemList = state.recentItemList.filter(el => el.supplFirmCd === daliInfo.supplFirmCd
              || el.supplFirmCd === gsfreshInfo.supplFirmCd
              || el.supplFirmCd === simplyInfo.supplFirmCd);
            state.recentItemList = exactRecentItemList;
            if (!state.recentItemList || state.recentItemList.length === 0) {
              dispatch("getNewItemList");
            }
          });
        }
        dispatch("getDayBreakTimeInfo");
      } catch (e) {
        console.log(e);
      }
    },
    // 신상품
    async getNewItemList({ state }, payload) {
      const mall = (!payload || payload.mall === 'all') ? state.baseMall : payload.mall;
      const info = state.orderTab.filter(e => e.tabId === mall)[0];
      const url = '/dp/fr/displaymgnt/main-new-item-info';
      const params = {
        dspScrSpCd: '02', // DspScrSpCd : 01(pc), 02(모바일)
        itemExpsrRestrPcs: 20,
        mallId: info.mallId,
        storId: info.storId,
        supplFirmCd: info.supplFirmCd
      };
      try {
        const response = await ApiUtils.get(url, params);
        if (response.data.data && response.data.data.rmnNewItemInq) {
          // 신상품 정보들 중에 업체택배 상품에 한해서  store ID가 GSfresh는 3004, 달리살다는 3005, 심플리쿡은 3007만 나오도록 수정요청 by 원길재PM
          state.newItemList = response.data.data.rmnNewItemInq.filter(e =>
            (e.delivTypeCd !=='03'||(e.delivTypeCd ==='03' && e.storId === (info.mallId ==='1'?'3004':(info.mallId==='11'?'3005':'3007'))))
            && e.ofsYn !== 'Y' && e.sellPosbQty > 0
          );
        }
        console.log("getNewItemList 신상품 : ", response);
        console.log("state.newItemList", state.newItemList);
      } catch (e) {
        console.log(e);
      }
    },
    // 로그인정보 조회, 몰별 기본정보 조회, 개인화 항목 호출(검색 전 호출가능)
    async getLoginUserInfo({ state, dispatch }) {
      try {
        if (!state.loadedBaseInfo) {
          const response = await ApiUtils.post('/fo/cu/search/search-base-info');
          if (response.data.data) {
            response.data.data.forEach(el=>{
              const info = state.orderTab.filter(e => e.tabId === el.id)[0];
              info.storId = el.storId;
              info.supplFirmCd = el.supplFirmCd;
            });
          }
          if (LoginUtils.isLogin()) {
            // 로그인시 쿠키가져오기
            state.cookieInfo.storId = CookieUtils.getCookie('STOR_ID');
            state.cookieInfo.supplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
            state.cookieInfo.mallId = CookieUtils.getCookie('MALL_ID');
            state.cookieInfo.dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
            state.cookieInfo.isPmbs = (CookieUtils.getCookie('PMBS_JOIN_PRCN_CD') === '0001') ? true : false; // 0000:미가입 0001:달리드림 멤버십가입;
            // 회원정보가져오기
            ApiUtils.get('/fo/cu/mbrmgnt/member-information', null).then((response) => {
              if (response !== null) {
                console.log(response.data.data);
                state.userId = response.data.data.cmmMbrNo;
                state.custNo = response.data.data.custNo;
              }
            });
          } else {
            // 비로그인시 쿠키 생성
            console.log("비로그인시 쿠키 생성");
            await LoginUtils.nonLoginPromise().then(function (response) {
              state.cookieInfo.storId = CookieUtils.getCookie('STOR_ID');
              state.cookieInfo.supplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
              state.cookieInfo.mallId = CookieUtils.getCookie('MALL_ID');
              state.cookieInfo.dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
              state.cookieInfo.isPmbs = (CookieUtils.getCookie('PMBS_JOIN_PRCN_CD') === '0001') ? true : false; // 0000:미가입 0001:달리드림 멤버십가입;
              console.log("cookieInfo", state.cookieInfo);
            });
          }
          state.loadedBaseInfo = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 새벽배송 배송시간 조회
    async getDayBreakTimeInfo({state}) {
      // console.log("새벽배송인경우 새벽배송시간 조회");
      try {
        const params = {
          delivTypeCd: "04",
          supplFirmCd: "31005"
        };
        const response = await ApiUtils.post('/fo/od/deliv-info/now-order-deliv-time', params);
        console.log("새벽배송 배송시간", response);
        state.daybreakDeliveTime = response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
  }
};
