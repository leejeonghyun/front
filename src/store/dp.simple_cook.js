import ApiUtils from '@/common/ApiUtils';
import LoginUtils from '@/common/LoginUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
    state: {
        // 메인데이터
        mainSimpleCookData: [],
        // 비정형 코너 정보 데이터
        rList: [],
        // setTimeout 설정시간
        setTimes: {
            setTime_simpleCookMain: 6500,
            setTime_etc: 5500
        },
        // 심플리쿡 코너 정보
        mainConrInfo: {
            dspConrId_1008: 1008,
            dspConrId_1009: 1009,
            // 심쿡특가
            dspConrId_1017: 1017,
            // 심쿡기획전1
            dspConrId_1018: 1018,
            // 심쿡기획전2
            dspConrId_1029: 1029,
            // MD 추천상품 영역
            dspConrId_1032: 1032,
            // 심플리쿡 브랜드메세지 영역
            dspConrId_1014: 1014,
            // 한번에담기
            dspConrId_1022: 1022,
            // 심플리쿡 카테고리 영역
            dspConrId_1030: 1030,
        },
        // 심플리쿡 인기 카테고리 코너 정보 리스트
        mainSimpleCookCtgList: [],
        // 심플리쿡 신상품 정보
        mainSimpleCookNewItemViewList: [],
        // 심플리쿡 식단예약 카테고리
        mainSimpleCookCtgResvList: [],
        // 심플리쿡 Best 상품 조회
        mainSimpleCookBestItemList: [],
        // 상품준비중 메세지
        noListText: '상품 준비 중입니다.',
    },
    getters: {
        getMainSimpleCookConrInfo: state => (dspConrId, type) => {
            const data = state.mainSimpleCookData;
            let tempRList;
            data.filter(x => x.dspConrId == dspConrId).map(value => {
                let item = '';
                if (value.dspSetUseYn == 'N') {
                    item = value.rmnConrSetInfoInq[0].rmnTplConrCompoSbjInq[0]
                        .rmnConrCntInfoInq;
                } else {
                    if (type == 'set') {
                        item = value.rmnConrSetInfoInq;
                    } else {
                        item = value.rmnConrSetInfoInq.map(list => list.rmnTplConrCompoSbjInq);
                    }
                }
                tempRList = item;
            });
            state.rList = tempRList;
            return tempRList;
        },
        getSimpleCookConrNm: state => (dspConrId) => {
            const data = state.mainSimpleCookData;
            data.filter(x => x.dspConrId == dspConrId).map(value => {
                state.dspConrNm = value.dspConrNm;
            });
            return state.dspConrNm;
        },
    },
    mutations: {
        setMainSimpleConrInfo: (state, payload) => {
            state.mainSimpleCookData = payload;
        },
    },
    actions: {
        // 심플리쿡 메인 코너 정보 조회
        async getMainSimpleCookConrInfo({ commit, state }, payload) {
            await LoginUtils.nonLoginPromise().then(function (response) {
                try {
                    const mallId = CookieUtils.getCookie('SIMPLE_MALL_ID');
                    const storId = CookieUtils.getCookie('SIMPLE_STOR_ID');
                    const supplFirmCd = CookieUtils.getCookie('SIMPLE_SUPPL_FIRM_CD');
                    const dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                    const params = {
                        ctgTypeCd: '02',
                        dspCtgId: 'N20001001',
                        dspConrTplId: '1007',
                        dspConrId: payload.dspConrId,
                        storId: storId,
                        supplFirmCd: supplFirmCd,
                        mallId: mallId,
                        dspScrSpCd: dspScrSpCd
                    };
                    ApiUtils.get('/dp/fr/displaymgnt/main-simple-cook-template-coner', params).then(res => {
                        commit('setMainSimpleConrInfo', res.data.data.rmnConrCrpInfoInq.rmnConrInfoInq);
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        },
        // 심플리쿡 메인 인가 카테고리 코너 정보 조회
        async getMainSimpleCookCategoryInfo({ state }, payload) {
            await LoginUtils.nonLoginPromise().then(function (response) {
                try {
                    const mallId = CookieUtils.getCookie('SIMPLE_MALL_ID');
                    const storId = CookieUtils.getCookie('SIMPLE_STOR_ID');
                    const supplFirmCd = CookieUtils.getCookie('SIMPLE_SUPPL_FIRM_CD');
                    const dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                    const params = {
                        ctgTypeCd: '01',
                        dspCtgLvlVal: "1",
                        mnScrExpsrYn: "Y",
                        mallId: mallId,
                        storId: storId,
                        supplFirmCd: supplFirmCd,
                        dspScrSpCd: dspScrSpCd
                    };
                    ApiUtils.get('/dp/fr/displaymgnt/main-simple-cook-category-info', params).then(res => {
                        state.mainSimpleCookCtgList = res.data.data;
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        },
        // 심플리쿡 메인 인가 카테고리 식단예약 정보 조회
        async getMainSimpleCookCategoryResvInfo({ state }, payload) {
            await LoginUtils.nonLoginPromise().then(function (response) {
                try {
                    const mallId = CookieUtils.getCookie('SIMPLE_MALL_ID');
                    const storId = CookieUtils.getCookie('SIMPLE_STOR_ID');
                    const supplFirmCd = CookieUtils.getCookie('SIMPLE_SUPPL_FIRM_CD');
                    const dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                    const params = {
                        ctgTypeCd: '01',
                        dspCtgLvlVal: "1",
                        mnScrExpsrYn: "Y",
                        mallId: mallId,
                        storId: storId,
                        supplFirmCd: supplFirmCd,
                        dspScrSpCd: dspScrSpCd
                    };
                    ApiUtils.get('/dp/fr/displaymgnt/main-simple-cook-category-resv-info', params).then(res => {
                        state.mainSimpleCookCtgResvList = res.data.data;
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        },
        // 심플리쿡 신상품 조회
        async getMainSimpleCookNewItemInfo({ state }, payload) {
            try {
                const mallId = CookieUtils.getCookie('SIMPLE_MALL_ID');
                const storId = CookieUtils.getCookie('SIMPLE_STOR_ID');
                const supplFirmCd = CookieUtils.getCookie('SIMPLE_SUPPL_FIRM_CD');
                const dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                const params = {
                    itemExpsrRestrPcs: 20,
                    mallId: mallId,
                    storId: storId,
                    supplFirmCd: supplFirmCd,
                    dspScrSpCd: dspScrSpCd,
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/main-simplecook-new-item-info', params);
                state.mainSimpleCookNewItemViewList = response.data.data;
            } catch (e) {
                console.log(e);
            }
        },
        // 심플리쿡 BEST 상품 조회
        async getMainSimpleCookBestItemInfo({ state }, payload) {
            try {
                const mallId = CookieUtils.getCookie('SIMPLE_MALL_ID');
                const storId = CookieUtils.getCookie('SIMPLE_STOR_ID');
                const supplFirmCd = CookieUtils.getCookie('SIMPLE_SUPPL_FIRM_CD');
                const dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                const params = {
                    mallId: mallId,
                    storId: storId,
                    supplFirmCd: supplFirmCd,
                    dspScrSpCd: dspScrSpCd,
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/main-simplecook-best-item-info', params);
                state.mainSimpleCookBestItemList = response.data.data;
            } catch (e) {
                console.log(e);
            }
        },
    }
};
