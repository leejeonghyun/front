<template>
  <div id="kmotionFrame">
  </div>
</template>

<script>
import CommAuth from '@/views/pa/common/CommAuth';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
export default {
  data() {
    return {};
  },
  mixins: [
    CommAuth
  ],
  mounted: async function() {
    this.callKmotionScript();
    window.getAuthentication = function(data, thisParam) {
      parent.document.getElementById('frame_div').style.display = 'block';
      const that = thisParam;
      console.log(that.form);
      ApiUtils
        .post('/fo/pa/kmotionInitAuth', data)
        .then(function(res) {
          let isFail = false;
          console.log(res.data);
          if (res.data === null || res.data.resultCode !== '0000') {
            isFail = true;
          }
          if (res.data !== null) {
            console.log(res.data.xid);
            that.form.accpresUrl = that.form.accpresUrl+"-xid_"+res.data.xid;
            that.rform = res.data;
            // that.form.cardCode = cardCode;

            const param = {
              accpreq_url: that.form.accpreqUrl,
              key: that.rform.key,
              enc_data: that.rform.encDataSeed,
              accpres_url: that.form.accpresUrl,
              result_url: that.form.returnUrl,
              server_mode: that.form.serverMode,
              is_only_appcard: that.form.isOnlyAppcard,
              issue_code: that.form.issueCode
            };
            JSON.stringify(param);
            let jdata = JSON.stringify(param);
            jdata = encodeURIComponent(jdata);
            if ( StringUtils.isEmpty(that.rform.encData)) {
              alert("카드인증시 오류가 발생하였습니다(KB card). 동일현상이 반복되면 \nGS 프레시몰 고객센터(1661-2562)에 문의하시기 바랍니다.");
              return;
            } else {
              window.callKmotion = function(jdata) {
                const doACPAYMW7 = window.doACPAYMW7;
                doACPAYMW7(jdata, null);
              };
              callKmotion(jdata);
            }
          }
          if (isFail) {
            console.error(res.data.resultMsg);
            alert('인증 중 에러가 발생했습니다.');
          }
      });
    };
  }
};
</script>
