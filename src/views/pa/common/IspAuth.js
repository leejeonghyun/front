import ApiUtils from '@/common/ApiUtils';
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.initIspAuth();
  },
  methods: {
    initIspAuth() {
      window.BeforePost = function(payForm) {
        console.log(payForm);
        const makePayMessage = window.MakePayMessage;
        makePayMessage(payForm);
      };
      window.VP_Ret_Pay = function(ret) {
        // 필요한 폼 정보 셋팅을 위함
        console.log(ret);
        const payForm = document.getElementById("ispForm");
        console.log(payForm);
        let deviceType = "";
        if (payForm.deviceType.value === "PC") {
          deviceType = "WEB";
        } else {
          deviceType = "MOB";
        }
        /* if (ret) {
        } else {
          console.error(res.data.resultMsg);
          alert('ISP 결제 인증 중 에러가 발생하였습니다.');
        } */
        const data = {
          result: ret,
          deviceType: deviceType,
          authType: "02",
          cardInterest: "0",
          cardQuota: payForm.KVP_QUOTA_INF.value+'',
          cardNo: "",
          kvpCardCode: payForm.KVP_CARDCODE.value,
          kvpSessionKey: payForm.KVP_SESSIONKEY.value,
          kvpEncData: payForm.KVP_ENCDATA.value,
          vpCancelCode: payForm.VP_CANCEL_CODE.value,
          mallUserID: payForm.memNo.value,
          hashKey: payForm.hashKey.value
        };
        ApiUtils
          .post("/fo/pa/ispAuthCallback" + ((payForm.deviceType.value === "PC") ? "Pc" : "Mob"), data)
          .then(res => {
            let isFail = false;
            if (res.data === null || res.data.resultCode !== '0000') {
              isFail = true;
            }
            if (res.data !== null) {
              console.log(res.data);
            }
            if (isFail) {
              if (res.data !== null && res.data.resultMsg != null && res.data.resultMsg !== '') {
                alert(res.data.resultMsg);
              } else {
                alert('ISP 결제 인증 중 에러가 발생하였습니다.');
              }
            } else {
              if (!ret) {
                if (res.data !== null && res.data.resultMsg != null && res.data.resultMsg !== '') {
                  alert(res.data.resultMsg);
                } else {
                  alert('ISP 결제 인증이 실패되었습니다.');
                }
              } else {
                // alert('ISP 결제 인증이 완료되었습니다.');
              }
            }
          }
        );
      };
    },
  }
};
