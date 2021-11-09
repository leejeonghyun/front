import ApiUtils from '@/common/ApiUtils';
import LoginUtils from '@/common/LoginUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import SiteUtils from '@/common/SiteUtils';

export default {
    state: {
        // 로그인 여부
        isLogin: LoginUtils.isLogin(),
        // 새벽배송
        daybreak: CookieUtils.isDaybreak(),
        showDaybreak: false,
        // 새벽배송 정보info
        dayBreakInfo: {
            storId_dayBreak: 2287,
            supplFirmCd_dayBreak: 31005,
            storId_day: 2267 | 3009,
            supplFirmCd_day: 31007 | 70021
        },
        // 메인 비정형 코너 정보 데이터
        mainData: [],
        // 비정형 코너 정보 데이터
        rList: [],
        // setTimeout 설정시간
        setTimes: 3000,
        // setTimeout 설정시간
        setTimes_1: 5000,
        // 메인 코너 정보
        mainConrInfo: {
            dspConrId_1: 1,
            dspConrId_3: 3,
            dspConrId_4: 4,
            dspConrId_5: 5,
            dspConrId_6: 6,
            dspConrId_7: 7,
            dspConrId_9: 9,
            dspConrId_10: 10,
            dspConrId_1028: 1028,
            dspConrId_1044: 1044,
            dspConrId_1047: 1047,
            dspConrId_27: 27,
            dspConrId_28: 28,
            dspConrId_29: 29,
            dspConrId_30: 30,
            dspConrId_31: 31,
            dspConrId_32: 32,
            dspConrId_34: 34,
            dspConrId_39: 39,
            dspConrId_41: 41,
            dspConrId_113: 113,
            dspConrId_114: 114,
            dspConrId_117: 117,
            dspConrId_118: 118,
            dspConrId_120: 120,
            dspConrId_1020: 1020,
            // 해외직구
            dspConrId_1021: 1021,
            // 달리;커버
            dspConrId_1065: 1065,
            // 해외직구 메인배너
            dspConrId_1139: 1139,
        },
        dspConrNm: '',
        // 심플리쿡 코너 번호(GS fresh 메인 노출 영역)
        simpleCookConrId: 1023,
        // 심플리쿡 코너 정보 데이터
        simpleCookData: [],
        // 위대한세일 시간
        expire: '2020060517000000',
        // 새로나왔어요 코너 정보 데이터
        mainNewItemViewList: {
            rmnNewItemInq: [],
        },
        // 인기 카테고리코너 정보 데이터
        mainCtgList: [],
        // 카테고리 정보 (햄버거메뉴)
        menuDspCtgList: [],
        // 마켓포 코너 정보
        markForConrId: 134,
        // 마켓포 정보
        menuDspMarketForList: [],
        // 브랜드 정보
        menuDspBrandInfo: [],
        // 배송가능시간 여부(당일)
        deliveTime: {},
        // 배송가능시간 여부(새벽)
        deliveBreakTime: {},
        // 새벽배송시간 정보
        dayBreakData: {},
        // 상품 새벽배송시간
        dayBreakStr: '',
        // 트렌드 리스트
        trendyList: [],
        // 장바구니 개수
        bsktQty: 0,
        // 스피드마켓 코너
        promotionSpeedConrId: 1002,
        // 스피드마켓 코너 정보 데이터
        promotionSpeedList: [],
        // 레시피 목록 조회
        reicpList: [],
        // 레시피 마스터 목록
        reicpInfoData: {},
        // 로그인 정보
        gsPoint: '',
        thePopRewards: '',
        couponCount: '',
        custNo: '',
        cmmMbrNo: null,
        korName: '',
        userId: '',
        mbrTypeCd: '',
        custGrdNm: '',
        custGrdCd: '',
        nextCustGrdNm: '',
        adltCertDttm: '', // 성인인증 일시
        pmbsJoinPrcnCd: '0000',
        CU0004S: [],
        rhrnGrdNeedAmt: 0,
        accuSalesAmt: 0,
        pmbsDcAmt: 0,
        // 쿠폰 정보
        couponCount: 0,
        storId: '',
        // 배송지 데이터
        dlvpInqInputDto: {
            mbrDlvpSeqno: '',
            baseDlvpYn: "Y",
            dlvpNm: '',
            zipcd: '',
            lotnoAddr: '',
            stnmAddr: '',
            adrsNm: '',
            moblTelNo: '',
            telNo: '',
            useYn: "Y"
        },
        conrBreakDelivery: process.env.VUE_APP_CONR_BREAK_DELIVERY || '122', // 새벽배송 안내 배송 가능 지역
        // 하나 더 드려요
        mainOneMoreItemList: [],
        // 공통 GNB
        dpCommMenuList: [],
        dpCommGnbConrId: 85,
        // 달리살다; 햄버거 카테고리 정보
        daliMainMenuList: [],
        // 달리살다; 햄버거 카테고리 하위 정보
        lowDepthMenuList: [],
        // 달리살다; 햄버거 비정형 코너 정보
        nftpStorTplConrInfo: [],
        nftpStorTplConrInfo2: [],
        nftpStorTplConrInfo3: [],
        nftpConrInfo: [],
        nftpConrInfo2: [],
        // 달리살다; 햄버거 속성 정보
        itemAttrInfo: [],
        // 달리살다; 햄버거 속성항목 정보
        itemAttrItmInfo: {
            itemAttrId1: '12',
            itemAttrId2: '13',
            itemAttrId3: '14',
            itemAttrId4: '15',
        },
        // 달리살다; 햄버거 베스트 브랜드 목록 조회
        baseBrandList: [],
        ganadaBrandList: [],
        abcBrandList: [],
        brandList: [], // gnb 브랜드목록
        itemAttrInfoLow: [],
        // 주문배송개수
        orderQty: 0,
        // 사이드바 배송가능시간 정보
        sidebarDeliveTimeInfo: {
            toDayStr: '',
            deliveTime: '',
        },
        // 사이드바 햄버거메뉴 기획전추가
        sidebarSsevntList: [],
        cookieInfo: {},
        // 조보아 티버 메세지
        informationData: {},
        // 쿠폰 적용 가능 자주 구매 상품 안내 정보
        couponImteInfo: {},
        // 카드 적용 쿠폰 안내 조회
        cardApplCpnInfo: '',
        // 장바구니 증정 프로모션 안내 조회
        bsktPresPromInfo: '',
        oftenPurchaseList: [],
        deliveTimeInfo: '',
        // 개인화 영역 (최근 본 상품 리스트)
        recentlyProductsList: [],
        // 기본 배송지 유무
        bool_DeliveInfo: false,
        // 개인화 영역 (카테고리 목록)
        prvPurchCycleItemList: [],
        // 지금뜨고있어요 실시간 api 데이터
        mainFluctuationList: [],
        // 수동 + 자동 통합된 list
        mergeData: [],
        // 찜추가 메세지
        onText: 'My it brand에 추가되었습니다.',
        // 찜해제 메세지
        offText: 'My it brand에서 해제되었습니다.',
        // 로그인 필요 텍스트
        loginText: '로그인하시면 찜 기능을 사용하실 수 있습니다.',
        // 달리살다; 카테고리 데이터
        categoryList: [],
        // 달리살다; 카테고리 정보
        categoryInfo: {
            // 달리;먹다
            daliDspCtgId1: 'G11001',
            // 달리;바르다
            daliDspCtgId2: 'G11002',
            // 달리;챙기다
            daliDspCtgId3: 'G11003',
            // 달리; 쓰다
            daliDspCtgId4: 'G11004',
            // 달리; 해외직구
            daliDspCtgId5: 'G11005',
        },
        // 카테고리 setTimeout 설정시간
        ctgSetTimes: 3000,
        // 공통 GNB setTimeout 설정시간
        gnbSetTimes: 1200,
    },
    getters: {
        getMainConrInfo: state => (dspConrId, type) => {
            const data = state.mainData;
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
        getConrNm: state => (dspConrId) => {
            const data = state.mainData;
            data.filter(x => x.dspConrId == dspConrId).map(value => {
                state.dspConrNm = value.dspConrNm;
            });
            return state.dspConrNm;
        },
        getReicpItem: state => () => {
            return state.reicpInfoData;
        },
        getMainData: state => {
            return state.mainData;
        },
        getDayBreakTimeInfo: (state, getters) => () => {
            const date = new Date();
            const toDay = DateUtils.format(date, 'YYYY-MM-DD');
            const delivDt = DateUtils.format(state.deliveTime.delivDt, 'YYYY-MM-DD');

            const toDayArray = toDay.split('-');
            const delivDtArray = delivDt.split('-');

            const toDayDate = new Date(
                toDayArray[0],
                Number(toDayArray[1]) - 1,
                toDayArray[2]
            );
            const delivDtDate = new Date(
                delivDtArray[0],
                Number(delivDtArray[1]) - 1,
                delivDtArray[2]
            );
            let getTime = '';
            let intTime = '';
            if (state.daybreak) {
                if (state.deliveTime.delivEndTm != null) {
                    getTime = state.deliveTime.delivEndTm.substring(0, 2);
                    intTime = parseInt(getTime);
                }
            }
            const strTime = intTime < 12 ? '오전 ' : '오후 ';
            const week = ['일', '월', '화', '수', '목', '금', '토'];
            const dayOfWeek = week[new Date(delivDt).getDay()];
            const betweenDt =
                (delivDtDate.getTime() - toDayDate.getTime()) / 1000 / 60 / 60 / 24;
            let toDayStr = '';
            switch (betweenDt) {
                case 0:
                    if (intTime != '') {
                        toDayStr = '오늘 ' + strTime;
                    } else {
                        toDayStr = '오늘 ';
                    }
                    break;
                case 1:
                    if (intTime != '') {
                        toDayStr = '내일 ' + strTime;
                    } else {
                        toDayStr = '내일 ';
                    }
                    break;
                default:
                    toDayStr =
                        delivDtArray[1] + '/' + delivDtArray[2] + '(' + dayOfWeek + ')';
                    break;
            }
            const deliveTime = getters.getDeliveTimeInfo(state.deliveTime.delivBeginTm) +
                ' ~ ' +
                getters.getDeliveTimeInfo(state.deliveTime.delivEndTm);

            state.deliveTimeInfo = toDayStr + deliveTime;
            state.sidebarDeliveTimeInfo.toDayStr = toDayStr;
            state.sidebarDeliveTimeInfo.deliveTime = deliveTime;
        },
        getDayBreakInfo: (state, getters) => () => {
            const date = new Date();
            const toDay = DateUtils.format(date, 'YYYY-MM-DD');
            const delivDt = DateUtils.format(state.dayBreakData.delivDt, 'YYYY-MM-DD');

            const toDayArray = toDay.split('-');
            const delivDtArray = delivDt.split('-');

            const toDayDate = new Date(
                toDayArray[0],
                Number(toDayArray[1]) - 1,
                toDayArray[2]
            );
            const delivDtDate = new Date(
                delivDtArray[0],
                Number(delivDtArray[1]) - 1,
                delivDtArray[2]
            );
            let getTime = '';
            let intTime = '';
            if (state.dayBreakData.delivEndTm != null) {
                getTime = state.dayBreakData.delivEndTm.substring(0, 2);
                intTime = parseInt(getTime);
            }
            const strTime = (intTime < 12) ? '오전 ' : '오후 ';
            const week = ['일', '월', '화', '수', '목', '금', '토'];
            const dayOfWeek = week[new Date(delivDt).getDay()];

            const betweenDt =
                (delivDtDate.getTime() - toDayDate.getTime()) / 1000 / 60 / 60 / 24;
            let toDayStr = '';
            switch (betweenDt) {
                default:
                    toDayStr =
                        delivDtArray[1] + '/' + delivDtArray[2] + '(' + dayOfWeek + ')';
                    break;
            }
            if (state.dayBreakData.delivBeginTm != null) {
                const dateTimes = getters.getDeliveTimeInfo(state.dayBreakData.delivBeginTm) + '~' +
                    getters.getDeliveTimeInfo(state.dayBreakData.delivEndTm);
                state.dayBreakStr = toDayStr + dateTimes + ' 이전 도착';
            }
            console.log("새벽배송 상품안내 :::", state.dayBreakStr);
            return state.dayBreakStr;
        },
        getDeliveTimeInfo: state => (timeData) => {
            let rStrTime = '';
            if (timeData != null) {
                const rTime = timeData;
                rStrTime = rTime.substring(0, 2) + ':' + rTime.substring(2, 4);
            }
            return rStrTime;
        },
        getAdultCheck: () => {
            const adultDay = CookieUtils.getCookie('ADULT_AUTH_DATE');
            let adultCheck = false;
            if (adultDay != null && adultDay != "") {
                const today = DateUtils.getToday();
                const year = adultDay.substr(0, 4);
                const month = adultDay.substr(4, 2);
                const day = adultDay.substr(6, 2);
                if (DateUtils.isBefore(today, DateUtils.format((Number(year) + 1) + month + day, 'YYYY-MM-DD'))) {
                    adultCheck = true;
                }
            }
            return adultCheck;
        },
        getMainFluctuationList: (state, getters) => () => {
            const dspConrId = state.mainConrInfo.dspConrId_10;
            const data = getters.getMainConrInfo(dspConrId, 'set');
            if (data) {
                data.filter(obj => {
                    obj.rankStat = 'no-change';
                    return obj.rmnTplConrCompoSbjInq[1].rmnConrCntInfoInq.length > 0;
                });
            }
            if (state.mergeData.length >= 5) {
                return;
            }
            // const totalArray = new Array(5);
            const totalArray = ['0', '1', '2', '3', '4'];
            let cnt = 0;
            totalArray.map((value, index) => {
                const rObjData = {
                    dspConrId: 10,
                    dspCtgId: 'N1001001',
                    dspSetId: '',
                    dspSetNm: '',
                    rankStat: 'up',
                    rmnTplConrCompoSbjInq: [],
                };
                if (data) {
                    if (data[index]) {
                        state.mergeData.push(data[index]);
                    }
                    if (data.length < totalArray.length) {
                        const len = totalArray.length - data.length;
                        if (state.mainFluctuationList.length > 0) {
                            if (index >= data.length) {
                                const rObj = state.mainFluctuationList[cnt];
                                if (rObj != undefined) {
                                    rObjData.dspSetNm = rObj.content;
                                    rObjData.dspSetId = 999;
                                    const rObjTempData = {
                                        dspConrId: rObjData.dspConrId,
                                        dspConrSbjCd: "01",
                                        dspConrSbjId: rObjData.dspSetId,
                                        dspCtgId: "N1001001",
                                        dspSbjCnt: 10,
                                        dspSetId: rObjData.dspSetId,
                                        dspSetNm: rObjData.dspSetNm,
                                        rmnConrCntInfoInq: [],
                                    };
                                    rObjTempData.rmnConrCntInfoInq = rObj.products;
                                    rObjData.rmnTplConrCompoSbjInq.push(rObjTempData);
                                    state.mergeData.push(rObjData);
                                    cnt++;
                                }
                            }
                        }
                    }
                } else {
                    if (state.mainFluctuationList.length > 0) {
                        const rObj = state.mainFluctuationList[cnt];
                        if (rObj != undefined) {
                            rObjData.dspSetNm = rObj.content;
                            rObjData.dspSetId = 999;
                            const rObjTempData = {
                                dspConrId: rObjData.dspConrId,
                                dspConrSbjCd: "01",
                                dspConrSbjId: rObjData.dspSetId,
                                dspCtgId: "N1001001",
                                dspSbjCnt: 10,
                                dspSetId: rObjData.dspSetId,
                                dspSetNm: rObjData.dspSetNm,
                                rmnConrCntInfoInq: [],
                            };
                            rObjTempData.rmnConrCntInfoInq = rObj.products;
                            rObjData.rmnTplConrCompoSbjInq.push(rObjTempData);
                            state.mergeData.push(rObjData);
                            cnt++;
                        }
                    }
                }
            });
            console.log("병합 ::", state.mergeData);
        },
        getNftpStorTplConrInfo2: state => (dspConrId) => {
            const data = state.nftpStorTplConrInfo2;
            data.filter(x => x.dspConrId == dspConrId).map(value => {
                if (value.rnftpStorConrSetInfoInq != null && value.rnftpStorConrSetInfoInq != '') {
                    let item = '';
                    if (value.dspSetUseYn == 'N') {
                        item = value.rnftpStorConrSetInfoInq[0].rnftpStorTplConrCompoSbjInq[0].rnftpStorConrCntInfoInq;
                    } else {
                        if (value.rnftpStorConrSetInfoInq != null) {
                            item = value.rnftpStorConrSetInfoInq.map(list => list.rnftpStorTplConrCompoSbjInq);
                        } else {
                            item = '';
                        }
                    }
                    state.nftpConrInfo2 = item;
                }
            });
            return state.nftpConrInfo2;
        },
        getNftpStorTplConrInfo: state => (dspConrId) => {
            const data = state.nftpStorTplConrInfo;
            data.filter(x => x.dspConrId == dspConrId).map(value => {
                if (value.rnftpStorConrSetInfoInq != null && value.rnftpStorConrSetInfoInq != '') {
                    let item = '';
                    if (value.dspSetUseYn == 'N') {
                        item = value.rnftpStorConrSetInfoInq[0].rnftpStorTplConrCompoSbjInq[0].rnftpStorConrCntInfoInq;
                    } else {
                        if (value.rnftpStorConrSetInfoInq != null) {
                            item = value.rnftpStorConrSetInfoInq.map(list => list.rnftpStorTplConrCompoSbjInq);
                        } else {
                            item = '';
                        }
                    }
                    state.nftpConrInfo = item;
                }
            });
            return state.nftpConrInfo;
        },
    },
    mutations: {
        getDayBreak: (state) => {
            state.daybreak = !state.daybreak;
        },
        setMainConrInfo: (state, payload) => {
            state.mainData = payload;
        },
        setMainGnbInfo: (state, payload) => {
            state.dpCommMenuList = payload;
        },
        getMainSimpleCookinfo: (state, payload) => {
            state.simpleCookData = payload;
        },
        setConrInfo: (state, payload) => {
            state.trendyList = payload;
        },
        setDeliveTimeInfo: (state, payload) => {
            state.deliveTime = payload;
        },
        setCouponInfo: (state, payload) => {
            state.informationData.itemId = (payload.item_id != null) ? payload.item_id : "";
            state.informationData.informationMessage = (payload.information_message != null) ? payload.information_message : "";
            console.log("조보아티커 데이터 {}", state.informationData);
        },
    },
    actions: {
        async getCookiCheck({ state }, payload) {
            await ApiUtils.getIdToken();
            state.isLogin = LoginUtils.isLogin();
            try {
                state.cookieInfo.storId = CookieUtils.getCookie('STOR_ID');
                state.cookieInfo.supplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
                state.cookieInfo.mallId = CookieUtils.getCookie('MALL_ID');
                state.cookieInfo.dspScrSpCd = "02";
                state.cookieInfo.mdaType = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                state.cookieInfo.chanlId = CookieUtils.getCookie('CHANL_ID');
                state.cookieInfo.custGrdCd = CookieUtils.getCookie('CUST_GRD_CD');
                state.cookieInfo.mbrTypeCd = CookieUtils.getCookie('MBR_TYPE_CD');
                // 심플리쿡 쿠키 정보
                state.cookieInfo.simpleMallId = CookieUtils.getCookie('SIMPLE_MALL_ID');
                state.cookieInfo.simpleStorId = CookieUtils.getCookie('SIMPLE_STOR_ID');
                state.cookieInfo.simpleSupplFirmCd = CookieUtils.getCookie('SIMPLE_SUPPL_FIRM_CD');
                // 달리살다 쿠키 정보
                state.cookieInfo.daliStorId = CookieUtils.getCookie('DALI_STOR_ID');
                state.cookieInfo.daliSupplFirmCd = CookieUtils.getCookie('DALI_SUPPL_FIRM_CD');
            } catch (e) {
                console.log(e);
            }
        },
        async getCookieInfo({ state }, payload) {
            await ApiUtils.getIdToken();
            state.isLogin = LoginUtils.isLogin();
            try {
                state.cookieInfo.storId = CookieUtils.getCookie('STOR_ID');
                state.cookieInfo.supplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
                state.cookieInfo.mallId = CookieUtils.getCookie('MALL_ID');
                state.cookieInfo.dspScrSpCd = "02";
                state.cookieInfo.mdaType = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                state.cookieInfo.chanlId = CookieUtils.getCookie('CHANL_ID');
                state.cookieInfo.custGrdCd = CookieUtils.getCookie('CUST_GRD_CD');
                state.cookieInfo.mbrTypeCd = CookieUtils.getCookie('MBR_TYPE_CD');
            } catch (e) {
                console.log(e);
            }
        },
        // 메인 코너 정보 조회
        async getMainConrInfo({ commit, state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    ctgTypeCd: '02',
                    dspCtgId: 'N1001001',
                    dspConrTplId: '1020'
                    /* dspConrId: payload.dspConrId, */
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/main-template-corner', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    commit('setMainConrInfo', response.data.data.rmnConrCrpInfoInq.rmnConrInfoInq);
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 헤더 트랜드 영역
        async getConrInfo({ commit, state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    ctgTypeCd: '02',
                    dspCtgId: 'N1001001',
                    dspConrId: payload.dspConrId,
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/display-comm-banner-info', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    commit('setConrInfo', response.data.data.rdspCommConrInfo);
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 공통 GNB 정보 조회
        async getDisplayGnbInfo({ commit, state, dispatch }, payload) {
            try {
                const mallId = CookieUtils.getCookie('MALL_ID');
                let params = null;
                if (mallId == "1") {
                    await dispatch('getCookiCheck');
                    params = {
                        ctgTypeCd: '02',
                        dspCtgId: 'N1003001',
                        dspConrId: 82,
                    };
                    const response = await ApiUtils.get('/dp/fr/displaymgnt/display-gnb-domain-info', { ...params, ...state.cookieInfo });
                    if (response.data.success === true) {
                        const rList = response.data.data.rdspCommConrInfo;
                        if (rList != null && rList.length > 0) {
                            rList.map((list, index) => {
                                const data =
                                    list.rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0]
                                        .rdspCommConrCntInfo;
                                commit('setMainGnbInfo', data);
                            });
                        }
                    }
                } else if (mallId == "11") {
                    await dispatch('getCookieInfo');
                    const params = {
                        dspConrId: 85,
                        ctgTypeCd: "02",
                    };
                    const response = await ApiUtils.get('/dp/ds/displaymgnt/display-gnb-domain-info', { ...params, ...state.cookieInfo });
                    if (response.data.success === true) {
                        const rList = response.data.data.rdspCommConrInfo;
                        if (rList != null && rList.length > 0) {
                            rList.map((list, index) => {
                                const data =
                                    list.rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0]
                                        .rdspCommConrCntInfo;
                                commit('setMainGnbInfo', data);
                            });
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 심플리쿡 비정형 템플릿 코너 정보 조회
        async getNftpStorTplConrInfo({ commit, state, dispatch }, payload) {
            try {
                const mallId = CookieUtils.getCookie('MALL_ID');
                    let params = null;
                    if (mallId == "1") {
                        await dispatch('getCookiCheck');
                            params = {
                            ctgTypeCd: '02',
                            dspCtgId: 'N20001002',
                            dspConrId: payload.dspConrId,
                            mallId: state.cookieInfo.simpleMallId,
                            storId: state.cookieInfo.simpleStorId,
                            supplFirmCd: state.cookieInfo.simpleSupplFirmCd,
                            dspScrSpCd: state.cookieInfo.dspScrSpCd,
                            chanlId: state.cookieInfo.chanlId,
                            custGrdCd: state.cookieInfo.custGrdCd,
                            mbrTypeCd: state.cookieInfo.mbrTypeCd,
                            mdaType: state.cookieInfo.mdaType,
                        };
                        const response = await ApiUtils.get('/dp/fr/displaymgnt/nftp-dsp-template-corner', { ...params });
                        if (response.data.success === true) {
                            commit('getMainSimpleCookinfo', response.data.data.rnftpStorConrInfoInq);
                        }
                    } else if (mallId == "11") {
                        await dispatch('getCookieInfo');
                        const params = {
                            ctgTypeCd: '02',
                            dspCtgId: payload.dspCtgId,
                            dspConrId: payload.dspConrId,
                        };
                        const response = await ApiUtils.get('/dp/ds/displaymgnt/nftp-dsp-template-corner', { ...params, ...state.cookieInfo });
                        if (response.data.success === true) {
                            state.nftpStorTplConrInfo = response.data.data.rnftpStorConrInfoInq;
                        }
                    }
            } catch (e) {
                console.log(e);
            }
        },
        // 새로 나왔어요 코너 정보 조회
        async getMainNewItemInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    itemExpsrRestrPcs: 10,
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/main-new-item-info', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.mainNewItemViewList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 하나 더 드려요 정보 조회
        async getMainOneMoreItemInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const response = await ApiUtils.get('/dp/fr/displaymgnt/main-onemore-item-info', { ...state.cookieInfo });
                if (response.data.success === true) {
                    state.mainOneMoreItemList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 메인 인기카테고리 코너 정보 조회
        async getMainCategoryInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    ctgTypeCd: '01',
                    dspCtgLvlVal: "1",
                    mnScrExpsrYn: "Y",
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/main-category-info', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.mainCtgList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // MarketFor 카테고리 정보 조회(햄버거메뉴)
        async getMenuDspCategroyInfo({ state, dispatch }, payload) {
            try {
                const siteId = CookieUtils.getCmmSteId();
                if (siteId === '3') {
                    await dispatch('getMarketForCookieCheck');
                    const params = {
                        mallId: CookieUtils.getCookie('MARKETFOR_MALL_ID'),
                        cmmSteId: CookieUtils.getCmmSteId(),
                        dspScrSpCd: '02',
                    };
                    const response = await ApiUtils.get('/dp/mf/dspctgmgnt/m4-dsp-category-list', { ...state.cookieInfo, ...params });
                    if (response.data.success === true) {
                        state.menuDspCtgList = response.data.data;
                    }
                } else {
                    console.log('check');
                    await dispatch('getCookiCheck');
                    const response = await ApiUtils.get('/dp/fr/dspctgmgnt/dsp-category-list', { ...state.cookieInfo });
                    if (response.data.success === true) {
                        state.menuDspCtgList = response.data.data;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        // GS 카테고리 기획전 정보 조회
        async getSidebarSsevntInfo({ state }, payload) {
            try {
                const params = {
                    dspCtgId: payload.dspCtgId,
                };
                const siteId = CookieUtils.getCmmSteId();
                if (siteId === '3') {
                    const response = await ApiUtils.get('/dp/mf/dspctgmgnt/dsp-category-ssevnt-list', { ...params, ...state.cookieInfo });
                    if (response.data.success === true) {
                        if (state.sidebarSsevntList.length !== 0) {
                            state.sidebarSsevntList.pop();
                        }
                        state.sidebarSsevntList = response.data.data;
                    }
                } else {
                    const response = await ApiUtils.get('/dp/fr/dspctgmgnt/dsp-category-ssevnt-list', { ...params, ...state.cookieInfo });
                    if (response.data.success === true) {
                        if (state.sidebarSsevntList.length !== 0) {
                            state.sidebarSsevntList.pop();
                        }
                        state.sidebarSsevntList = response.data.data;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        // GS MARKET FOR 정보 조회 (햄버거 메뉴)
        async getMenuDspMarketForInfo({ state, dispatch }, payload) {
            try {
                const siteId = CookieUtils.getCmmSteId();
                if (siteId === '3') {
                    await dispatch('getMarketForCookieCheck');
                    const params = {
                        ctgTypeCd: '02',
                        dspCtgId: 'N300003002',
                        dspConrId: payload.dspConrId,
                        dspConrTplId: '1083',
                        dspScrSpCd: '02',
                    };
                    const response = await ApiUtils.get('/dp/mf/displaymgnt/nftp-dsp-template-corner', { ...params, ...state.cookieInfo, mallId: '300', storId: '' });
                    if (response.data.success === true) {
                        state.menuDspMarketForList = response.data.data.rnftpStorConrInfoInq;
                    }
                } else {
                    await dispatch('getCookiCheck');
                    state.menuDspMarketForList = []; // 초기화
                    const response = await ApiUtils.get('/dp/fr/displaymgnt/display-comm-move-bnr-marketfor', state.cookieInfo);
                    if (response.data.success === true) {
                        if (response.data.data != null) {
                            const marketfor = response.data.data;
                            let idx = null;
                            if (state.daybreak) {
                                // 56번 : 새벽배송 제거
                                idx = marketfor.findIndex(
                                    i => i.mallMoveBnrId === '56'
                                );
                                marketfor.splice(idx, 1);
                            } else {
                                // 60번 : gsFresh 제거
                                idx = marketfor.findIndex(
                                    i => i.mallMoveBnrId === '60'
                                );
                                marketfor.splice(idx, 1);
                            }
                            state.menuDspMarketForList = marketfor;
                            console.log("MARKET FOR :::", state.menuDspMarketForList);
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        // GS MARKET FOR 정보 조회(햄버거 메뉴)
        async getMenuDspMarketForInfoBackup({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const siteId = CookieUtils.getCmmSteId();
                if (siteId === '3') {
                    const params = {
                        ctgTypeCd: '02',
                        dspCtgId: 'N300003002',
                        dspConrId: payload.dspConrId,
                        dspConrTplId: '1083',
                    };
                    const response = await ApiUtils.get('/dp/mf/displaymgnt/nftp-dsp-template-corner', { ...params, ...state.cookieInfo, mallId: '300', storId: '' });
                    if (response.data.success === true) {
                        state.menuDspMarketForList = response.data.data.rnftpStorConrInfoInq;
                    }
                } else {
                    const params = {
                        ctgTypeCd: '02',
                        dspCtgId: 'N1003005',
                    };
                    const response = await ApiUtils.get('/dp/fr/displaymgnt/nftp-dsp-template-corner', { ...params, ...state.cookieInfo });
                    if (response.data.success === true) {
                        state.menuDspMarketForList = response.data.data.rnftpStorConrInfoInq;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        // GS 브랜드 정보 조회(햄버거 메뉴)
        async getMenuDspBrandInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    ctgTypeCd: '02',
                    dspTypeCd: '02',
                    dspCtgLvlVal: 1,
                };
                const response = await ApiUtils.get('/dp/fr/dspctgmgnt/brand-list', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.menuDspBrandInfo = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 트랜드 리스트 정보 조회 (카테고리 기준)
        async getTrendyInfo({ state }, payload) {
            try {
                const params = {
                    ctgTypeCd: '01',
                };
                const response = await ApiUtils.get('/dp/fr/dspctgmgnt/dsp-trendy-list', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.trendyList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 메인 배송가능시간 안내 정보
        async getDeliveTimeInfo({ state, getters }, payload) {
            try {
                const params = {
                    delivTypeCd: payload.delivTypeCd,
                    supplFirmCd: payload.supplFirmCd
                };
                const response = await ApiUtils.post('/fo/od/deliv-info/now-order-deliv-time',
                    params);
                console.log("배송가능시간 파라미터[" + params.delivTypeCd + "]", params);
                console.log("배송가능시간 정보[" + params.delivTypeCd + "]", response.data.data);
                console.log("값 {} ", response.data.success);
                if (response.data.success === true) {
                    state.deliveTime = response.data.data;
                    getters.getDayBreakTimeInfo();
                } else {
                    state.deliveTime = null;
                    state.deliveTimeInfo = null;
                    state.sidebarDeliveTimeInfo.deliveTime = null;
                    state.sidebarDeliveTimeInfo.toDayStr = null;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 새벽배송 상품배송가능시간 안내 정보
        async getItemDeliveTimeInfo({ state, getters }, payload) {
            try {
                const params = {
                    delivTypeCd: payload.delivTypeCd,
                    supplFirmCd: payload.supplFirmCd
                };
                const response = await ApiUtils.post('/fo/od/deliv-info/now-order-deliv-time',
                    params);
                console.log("상품시간안내 파라미터[" + params.delivTypeCd + "]", params);
                console.log("상품시간안내 정보[" + params.delivTypeCd + "]", response.data.data);
                if (response.data.success === true) {
                    state.dayBreakData = response.data.data;
                    getters.getDayBreakInfo();
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 장바구니 수량 조회
        getBsktQtyInfo({ state }, payload) {
            try {
                const params = {
                    sessnId: payload.odBsktUuid
                };
                ApiUtils.get('/fo/od/bsktmgnt/bskt-qty', params).then(response => {
                    if (response.data.success === true) {
                        state.bsktQty = response.data.data;
                    }
                });
                if (state.isLogin) {
                    ApiUtils.get('/fo/cu/mbrmgnt/member-stat').then(data => {
                        if (data && data.data && data.data.success) {
                            if (data.data.data.mbrStatCd == "0") { // 탈퇴 회원
                                LoginUtils.logout().then(e => {
                                    state.isLogin = false;
                                    // 20200825 - 앱쪽 로그아웃 호출
                                    window.appCallLogoutComplete();
                                    alert('회원탈퇴하여 로그아웃 되었습니다.');
                                    SiteUtils.go(location.host, '/');
                                });
                            }
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 스피드마켓 코너 정보
        async getPromotionSpeedInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    mallId: 1,
                    ctgTypeCd: '02',
                    dspCtgId: 'N1006001',
                    dspConrId: this.dspConrId,
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/nftp-dsp-template-corner', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.promotionSpeedList = response.data.data.rnftpStorConrInfoInq;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 스피드마켓 레시피 정보
        async getReicpInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    dspCtgId: 'N1006',
                };
                const response = await ApiUtils.get('/dp/fr/recipemgnt/promotion-speed-list', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.reicpList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 햄버거 메뉴 (로그인 정보)
        async getMemberInfo({ state }, payload) {
            try {
              const resultMemInfo = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', { cmmMbrNo: payload.cmmMbrNo }); // 회원정보 가져오기
              state.korName = resultMemInfo.data.data.custNm;
              state.userId = resultMemInfo.data.data.webId;
              state.mbrTypeCd = resultMemInfo.data.data.mbrTypeCd;
              state.pmbsJoinPrcnCd = resultMemInfo.data.data.pmbsJoinPrcnCd;
              state.custGrdCd = resultMemInfo.data.data.custGrdCd;
              state.pmbsDcAmt = resultMemInfo.data.data.pmbsDcAmt;
              state.custGrdNm = resultMemInfo.data.data.custGrdNm;
              state.adltCertDttm = resultMemInfo.data.data.adltCertDttm;
              console.log(resultMemInfo.data.data.custNm + ' 회원의 등급 : ' + resultMemInfo.data.data.custGrdNm);
            } catch (e) {
              console.log(e);
            }
          },
        async getCouponInfo({ state }, payload) {
            try {
                const resultCoupon = await ApiUtils.get('/fo/ev/cpnprominq/coupon-count', {cmmSteId: CookieUtils.getCmmSteId()});// [202017P] 2020.11.27 사용가능쿠폰목록조회 Market For 커머스사이트Id 추가
                state.couponCount = NumberUtils.toComma(resultCoupon.data.data.usePosbCpnCnt);
            } catch (e) {
                console.log(e);
            }
        },
        async getDeliveryplace({ state, dispatch }, payload) {
            try {
                const result = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', null);
                const deliveryplace = result.data.data;
                if (deliveryplace.length > 0) {
                    deliveryplace.map(value => {
                        if (value.baseDlvpYn == 'Y') { // 기본배송지 여부
                            state.bool_DeliveInfo = true;
                            state.dlvpInqInputDto.mbrDlvpSeqno = value.mbrDlvpSeqno;
                            state.dlvpInqInputDto.dlvpNm = value.dlvpNm;
                            state.dlvpInqInputDto.zipcd = value.zipcd;
                            state.dlvpInqInputDto.lotnoAddr = value.lotnoAddr;
                            state.dlvpInqInputDto.stnmAddr = value.stnmAddr;
                            state.dlvpInqInputDto.adrsNm = value.adrsNm;
                            state.dlvpInqInputDto.moblTelNo = value.moblTelNo;
                            state.dlvpInqInputDto.telNo = value.telNo;
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getDeliveryCount({ state }, payload) {
            try {
                const res = await ApiUtils.get('/fo/cs/claimmgnt/order-delivery-state-count', payload);
                const deliveryCount = res.data.data;
                if (deliveryCount != null) {
                    state.orderQty = Number(deliveryCount.ordTrdFinCnt) + Number(deliveryCount.cnt02) + Number(deliveryCount.cnt03);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getMemberPromotionInfo({ state }) {
            try {
                const response = await ApiUtils.get('/fo/ev/cpnprommgnt/member-promotion-information');
                if (response.data.success === true) {
                    console.log("조보아티커{메인}", response.data.data);
                    state.informationData.informationMessage = response.data.data.information_message;
                    state.informationData.purchaseYn = response.data.data.purchase_yn;
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getMarketForCookieCheck({ state }, payload) {
            await LoginUtils.nonLoginPromise().then(function (response) {
              try {
                const storId = CookieUtils.getCookie('STOR_ID');
                const supplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
                const mallId = CookieUtils.getCookie('MALL_ID');
                const dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');

                if (!state.marketForCookieInfo) state.marketForCookieInfo = {};

                state.marketForCookieInfo.dspScrSpCd = CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD');
                state.marketForCookieInfo.chanlId = CookieUtils.getCookie('CHANL_ID');
                state.marketForCookieInfo.custGrdCd = CookieUtils.getCookie('CUST_GRD_CD');
                state.marketForCookieInfo.mbrTypeCd = CookieUtils.getCookie('MBR_TYPE_CD');
                state.marketForCookieInfo.mallId = CookieUtils.getCookie('MALL_ID');
                state.marketForCookieInfo.storId = CookieUtils.getCookie('STOR_ID');
                state.marketForCookieInfo.supplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
                state.marketForCookieInfo.marketForMallId = CookieUtils.getCookie('MARKETFOR_MALL_ID');
                state.marketForCookieInfo.marketForStorId = CookieUtils.getCookie('MARKETFOR_STOR_ID');
                state.marketForCookieInfo.marketForSupplFirmCd = CookieUtils.getCookie('MARKETFOR_SUPPL_FIRM_CD');
                state.marketForCookieInfo.marketForMallMenuId = CookieUtils.getCookie('MARKETFOR_MALL_MENU_ID');
                // 달리살다 쿠키 정보
                state.marketForCookieInfo.daliStorId = CookieUtils.getCookie('DALI_STOR_ID');
                state.marketForCookieInfo.daliSupplFirmCd = CookieUtils.getCookie('DALI_SUPPL_FIRM_CD');
              } catch (e) {
                console.log(e);
              }
            });
          },
        // 쿠폰적용가능자주구매상품안내정보
        async getCouponImteInfo({ commit, dispatch }) {
            try {
                await ApiUtils.get('/fo/ev/cpnprommgnt/coupon-apply-possible-often-purchase-item-information').then(res => {
                    if (res.data.success) {
                        const data = res.data.data;
                        console.log("쿠폰적용가능자주구매상품안내정보{}", data);
                        if (data.item_id != null && data.item_id != "") {
                            commit('setCouponInfo', res.data.data);
                        } else {
                            dispatch('getCardApplCpnInfo');
                        }
                    }
                }).catch(e => {
                    console.log(e);
                });
            } catch (e) {
                console.log(e);
            }
        },
        // 카드적용쿠폰안내조회(retrieveCardApplCpnInfor)
        async getCardApplCpnInfo({ commit, state }) {
            try {
                const response = await ApiUtils.get('/fo/ev/cpnprommgnt/card-apply-coupon-information');
                console.log("카드적용쿠폰안내조회{}", response.data);
                if (response.data.success === true) {
                    const params = {
                        item_id: "",
                        information_message: response.data.data
                    };
                    commit('setCouponInfo', params);
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 장바구니증정프로모션안내조회(retrieveBsktPresPromInfor)
        async getBsktPresPromInfo({ state }) {
            try {
                const response = await ApiUtils.get('/fo/ev/bsktapplpresprominq/basket-present-promotion-information');
                if (response.data.success === true) {
                    console.log("조보아티커{위빅}", response.data.data);
                    state.bsktPresPromInfo = response.data.data.informationMessage;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 개인화 영역(자주본상품)
        async getMainSectionUser({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    custNo: payload.cmmMbrNo,
                };
                const response = await ApiUtils.get('/fo/md/itemaddinfomgnt/main-Purchase-Cycle-Products-list', { ...params, ...state.cookieInfo });
                console.log("개인화 영역[자주본상품]", response.data.data);
                if (response.data.success == true) {
                    state.oftenPurchaseList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 개인화 영역(최근 본 상품)
        async getMainRecentlyProducts({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    custNo: payload.cmmMbrNo,
                };
                const response = await ApiUtils.get('/fo/md/itemaddinfomgnt/main-Recently-Products-list', { ...params, ...state.cookieInfo });
                console.log("개인화 영역[최근본상품]", response.data.data);
                if (response.data.success == true) {
                    state.recentlyProductsList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 개인화 영역(카테고리 목록 / 구매주기도래)
        async getMainSectionUserProduct({ state, dispatch }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    custNo: payload.cmmMbrNo,
                    dspCtgId: payload.dspCtgId
                };
                const response = await ApiUtils.get('/dp/fr/displaymgnt/ctg-purchase-cycle-products-list', { ...params, ...state.cookieInfo });
                if (response.data.success == true) {
                    state.prvPurchCycleItemList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 지금뜨고있어요 검색 api
        async getMainFluctuationProducts({ state, dispatch, getters }, payload) {
            try {
                await dispatch('getCookiCheck');
                const params = {
                    collection: 'gsfresh',
                    sort: 'DATE/DESC',
                    supplFirmCd: state.cookieInfo.supplFirmCd
                };
                const response = await ApiUtils.outer.get('https://api.gsecretail.com/search/service/now.jsp?', { ...params });
                console.log("지금뜨고있어요 검색데이터 ::", response.data);
                if (response.data) {
                    state.mainFluctuationList = response.data;
                    getters.getMainFluctuationList();
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getMainFluctuationProducts1({ state, dispatch }, payload) {
            const listCnt = 5;
            const list = {
                searchData: [],
            };
            const rList = [];
            const params = {
                query: payload,
                supplFirmCd: state.cookieInfo.supplFirmCd,
                collection: 'gsfresh'
            };
            const response = await ApiUtils.get('/search/service/search.jsp?', { ...params });
            if (response.data.resultData) {
                const data = response.data.resultData;
                data.filter(e => e.collection == 'gsfresh').map(value => {
                    if (value.data.length > 0) {
                        value.data.map(item => {
                            list.searchData.push(item);
                        });
                    }
                });
                if (Object.keys(list).length > 0 && Object.keys(list).length < 5) {
                    // 코너에 가져올 데이터 개수
                    const cnt = listCnt - Object.keys(list).length;
                }
            }
            list.searchPopword = payload;
            list.upDonw = "U";
            console.log("지금뜨고있어요 :::", list);
        },
        // 달리살다; 비정형 템플릿 코너 정보 조회
        async getNftpStorTplConrInfo2({ state, dispatch }, payload) {
            try {
                await dispatch('getCookieInfo');
                const params = {
                    ctgTypeCd: '02',
                    dspCtgId: payload.dspCtgId,
                    dspConrId: payload.dspConrId,
                };
                const response = await ApiUtils.get('/dp/ds/displaymgnt/nftp-dsp-template-corner', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.nftpStorTplConrInfo2 = response.data.data.rnftpStorConrInfoInq;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 달리살다; GNB 브랜드 목록 조희
        async getBrandList({ state, dispatch }, payload) {
            try {
                let params = {
                    cmmMbrNo: payload.cmmMbrNo,
                };
                await dispatch('getCookieInfo');
                params = { ...params, ...payload };
                const response = await ApiUtils.get('/dp/ds/gnbBrandmgnt/gnbBrand-list', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.brandList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 달리리살다; 햄버거 메뉴 베스트 브랜드 정보 조회
        async getBaseBrandList({ state, dispatch }, payload) {
            try {
                await dispatch('getCookieInfo');
                let params = {
                    ctgTypeCd: '02',
                    dspTypeCd: '02',
                    dspCtgLvlVal: '1',
                    cmmMbrNo: payload.cmmMbrNo,
                };
                params = { ...params, ...payload };
                const response = await ApiUtils.get('/dp/ds/dspctgmgnt/dsp-menu-category-base-brand-list', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    if (payload.mnScrExpsrYn === 'Y') { // 베스트 브랜드
                        state.baseBrandList = response.data.data;
                    } else if (payload.linkSsevntId === 'N') { // 국내배송 브랜드
                        state.ganadaBrandList = response.data.data;
                    } else if (payload.linkSsevntId === 'Y') { // 해외직구 브랜드
                        state.abcBrandList = response.data.data;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 달리리살다; 햄버거 메뉴 해외 직구 브랜드 정보 조회
        async getAbcBrandList({ state, dispatch }, payload) {
            try {
                await dispatch('getCookieInfo');
                const params = {
                    ctgTypeCd: '02',
                    dspTypeCd: '02',
                    dspCtgLvlVal: '1',
                    linkSsevntId: 'Y',
                    cmmMbrNo: payload.cmmMbrNo,
                };
                const response = await ApiUtils.get('/dp/ds/dspctgmgnt/dsp-menu-category-base-brand-list', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.abcBrandList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 달리리살다; 햄버거 메뉴 국내배송 브랜드 정보 조회
        async getGanadaBrandList({ state, dispatch }, payload) {
            try {
                await dispatch('getCookieInfo');
                const params = {
                    ctgTypeCd: '02',
                    dspTypeCd: '02',
                    dspCtgLvlVal: '1',
                    linkSsevntId: 'N',
                    cmmMbrNo: payload.cmmMbrNo,
                };
                const response = await ApiUtils.get('/dp/ds/dspctgmgnt/dsp-menu-category-base-brand-list', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.ganadaBrandList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 달리살다; 햄버거메뉴
        async getDisplayMenuCategoryInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookieInfo');
                const params = {
                    ctgTypeCd: '01',
                    dspTypeCd: '01',
                    dspCtgLvlVal: 1,
                    dspConrId: state.daliCtgConerId,
                };
                const response = await ApiUtils.get('/dp/ds/dspctgmgnt/dsp-menu-category-info', { ...params, ...state.cookieInfo });
                if (response.data.success === true) {
                    state.daliMainMenuList = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 달리살다; 햄버거 메뉴 속성정보 조회
        async getItemAttrInfo({ state, dispatch }, payload) {
            try {
                await dispatch('getCookieInfo');
                const response = await ApiUtils.get('/dp/ds/dspctgmgnt/dsp-menu-category-item-attr-info', { ...state.cookieInfo });
                if (response.data.success === true) {
                    state.itemAttrInfo = response.data.data;
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 달리살다; 속성하위정보 일괄 조희
        async getItemAttrInfoLow({ state }, payload) {
            try {
                const response = await ApiUtils.get('/dp/ds/dspctgmgnt/dsp-menu-category-item-attr-info');
                const arr = response.data.data;
                const len = arr.length;
                let attr = [];
                for (let i = 0; i < len; i++) {
                    attr = attr.concat(arr[i].rmdItemAttrItmInq);
                }
                state.itemAttrInfoLow = attr;
            } catch (e) {
                console.log(e);
            }
        },
        // 기본배송지 조회
        async getBaseDeliv({state}) {
            if (LoginUtils.isLogin()) {
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
            }
        },
        // 더반찬 새벽배송 가능여부
        async retrieveDawnDeliYn({state}) {
            try {
            if (state.zipcd) {
                const iDawnDelivInq = { postNo: state.zipcd };
                const response = await ApiUtils.post('/fo/od/mf/bsktmgnt/getTheBanchanDawnDeliYn', iDawnDelivInq);
                const DawnDeliInfo = response.data.data;
                state.retrieveDawnDeliYn = (DawnDeliInfo !== null && DawnDeliInfo.dawndeliYn === 'Y') ? true : false;
            }
            } catch (e) {
            console.error(e);
            }
        },
    }
    // eslint-disable-next-line eol-last
};
