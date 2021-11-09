import ApiUtils from '@/common/ApiUtils';

export default {
    state: {
        mallInfo: {
            DP_MALL_301: 301,
            DP_MALL_302: 302,
            DP_MALL_303: 303,
            DP_MALL_304: 304,
            DP_MALL_305: 305,
            DP_MALL_306: 306,
        },
        // 취소 신청
        MF_ORD_STAT_CD_CNCL_ACEPT: 21,
        // 취소 결제중
        MF_ORD_STAT_CD_CNCL_TDR: 23,
        // 반품 신청
        MF_ORD_STAT_CD_RTN_ACEPT: 31,
        // 반품 회수지시
        MF_ORD_STAT_CD_RTN_RET: 33,
        // 반품 회수완료
        MF_ORD_STAT_CD_RTN_RETFIN: 34,
        // 반품 결제중
        MF_ORD_STAT_CD_RTN_TDR: 35,
        commGrpCdList: [],
    },
    getters: {
    },
    mutations: {
        setCommCd: (state, payload) => {
            state.commGrpCdList = payload;
        },
    },
    actions: {
        async commCdSearch({ commit, state }, payload) {
            try {
                /**
                 * 사용 방법 :  this.commCdList = await this.$store.dispatch('commCdSearch', 'OD0100');
                 */
                const params = {
                    commGrpCd: payload,
                };
                const response = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', { ...params });
                if (response.data.success) {
                    commit('setCommCd', response.data.data);
                }
                return state.commGrpCdList;
            } catch (e) {
                console.log(e);
            }
        }
    }
    // eslint-disable-next-line eol-last
};
