import ApiUtils from '@/common/ApiUtils';
import LoginUtils from '@/common/LoginUtils';
export default {
    state: {
        // 선택한 상품정보 리스트
        itemSelectedList: [],
        // 상품상세에서 선택한 선택형 상품
        itemSelected: {},
        itemTestVal: "77777",
        isLogin: LoginUtils.isLogin()
    },
    getters: {},
    mutations: {
        setItemSelectedList: (state, params) => {
            console.log("setItemSelectedList :: " + params.itemData.itemId);
            // state.itemSelectedList.push(params.itemData);
            state.itemSelectedList = params.itemData;
        },
        delAddCompo: (state, params) => {
            console.log("delAddCompo :: " + params.parentIndex + " : " + params.addCompoData.itemId);
            state.itemSelectedList[params.parentIndex].addCompo = params.addCompoData;
        },
        setItemSelected: (state, params) => {
            console.log("setItemSelected :: " + params.itemData.itemId);
            state.itemSelected = params.itemData;
        },
        delItemSelected: (state) => {
            console.log("delItemSelected ");
            state.itemSelected = {};
        },
        delItemSelectedList: (state) => {
            console.log("delItemSelectedList ");
            state.itemSelectedList = [];
        },
    },
    actions: {
        async getItemSelectedInfo({ state }, payload) {
            try {} catch (e) {
                console.log(e);
            }
        },
    }
};
