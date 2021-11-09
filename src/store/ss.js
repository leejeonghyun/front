import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
    state: {
        // 혜택광고 PUSH 알림 수신동의
        pushAgreeInfo: false,
        pushShopping: false,
        sh: {},
    },
    getters: {
        getSh: state => {
            return state.sh;
        },
    },
    mutations: {
        setPushAgree: (state, payload) => {
            if (payload != null && payload.length > 0) {
                const data = payload;
                const cmmSteId = CookieUtils.getCmmSteId();
                if (cmmSteId == '3') {
                    const result = data.find(value => value.cmmSteAgrmCd == 'M0');
                    if (result !== 0) {
                        state.pushAgreeInfo = (result.agrmAgrYn == "Y") ? true : false;
                    }
                } else {
                    const result = data.find(value => value.cmmSteAgrmCd == 'F0');
                    if (result !== 0) {
                        state.pushAgreeInfo = (result.agrmAgrYn == "Y") ? true : false;
                    }
                }
            }
        },
        setPushShopping: (state, payload) => {
            if (payload != null && payload.length > 0) {
                 // state.pushShopping = true;
                 const data = payload;
                const result = data.find(value => value.appAgrmCd == '01');
                if (result !== 0) {
                    state.pushShopping = (result.agrmAgrYn == "Y") ? true : false;
                }
            }
        },
        setSh: (state, payload) => {
            state.sh = payload;
        },
    },
    actions: {
        async getPushAgree({ commit, state }, payload) {
            console.log('==============getPushAgree================');
            try {
                const params = {
                    cmmMbrNo: payload.cmmMbrNo
                };
                await ApiUtils.get('/fo/cu/mbrmgnt/commerce-site-agreement-assent', params).then(res => {
                    commit('setPushAgree', res.data.data);
                });
            } catch (e) {
                console.log(e);
            }
        },
        async getPushShopping({ commit, state }, payload) {
            console.log('==============getPushShopping================');
            try {
                const params = {
                    cmmSteId: CookieUtils.getCmmSteId(),
                    dvcId: payload.dvcId,
                };
                await ApiUtils.get('/fo/cu/mbrmgnt/app-agreement-assent', params).then(res => {
                    commit('setPushShopping', res.data.data);
                });
            } catch (e) {
                console.log(e);
            }
        },
        async setPushAgree({ commit, state }, payload) {
            console.log('==============setPushAgree================');
            try {
                const CmmSteAgrmAgrInputDto = {
                    cmmMbrNo: payload.cmmMbrNo,
                    cmmSteAgrmCd: payload.cmmSteAgrmCd,
                    agrmAgrYn: payload.agrmAgrYn,
                    lastModUserId: payload.cmmMbrNo,
                };
                const response = await ApiUtils.post('/fo/cu/mbrmgnt/commerce-site-agreement-assent', CmmSteAgrmAgrInputDto);
                if (response.data.success === true) {
                    state.resultYn = 'Y';
                    commit('setPushAgree', response.data.data);
                }
            } catch (e) {
                console.log(e);
            }
            CookieUtils.deleteCookie('MbrJoinTodayYn');
            CookieUtils.deleteCookie('PushAgreeOpenYn');
        },
        async setPushShopping({ commit, state }, payload) {
            console.log('==============setPushShopping================');
            try {
                const AppAgrmAgrInputDto = {
                    cmmSteId: CookieUtils.getCmmSteId(),
                    dvcId: payload.dvcId,
                    appAgrmCd: payload.appAgrmCd,
                    agrmAgrYn: payload.agrmAgrYn,
                    lastModUserId: payload.cmmMbrNo,
                };
                const response = await ApiUtils.post('/fo/cu/mbrmgnt/app-agreement-assent', AppAgrmAgrInputDto);
                if (response.data.success === true) {
                    state.resultYn = 'Y';
                    commit('setPushShopping', response.data.data);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async setSh({ commit, state}, payload) {
            commit('setSh', payload);
        },
    }
};
