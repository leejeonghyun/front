<template>
  <div>
    <form id="kmpiForm" @submit.prevent="funcProps('KMPI')">
        가격 : <input name="pay_ansim_price" type="text" value="49000"><br/>
        <input name="pay_apvl_seller_id" type="text" v-model="kform.payApvlSellerId"><br/>
        <input name="pay_apvl_chain_no" type="text" v-model="kform.payApvlChainNo"><br/>
        할부개월수 : <input name="pay_apvl_halbu" type="text" value="0"><br/>
        <input name="pay_POPSIZE" type="text" v-model="kform.payPopsize"><br/>
        <input name="MID" type="text" v-model="kform.mid"><br/>
        <input name="BUSINESSTYPE" type="text" v-model="kform.businesstype"><br/>
        <input name="MOBILE" type="text" v-model="kform.mobile"><br/>
        <input name="APVL_SELLER_ID_LT" type="text" v-model="kform.apvlSellerIdLt"><br/>
        <input name="SUB_APVL_SELLER_ID_LT" type="text" v-model="kform.subApvlSellerIdLt"><br/>
        <input name="APVL_SS_USEYN" type="text" v-model="kform.apvlSsUseyn"><br/>
        <input name="PAY" type="text" v-model="kform.pay"><br/>
        주문자 : <input name="ORDER_USERID" type="text"><br/>
        <input name="pan" type="text" v-model="kform.pan"><br/>
        <input name="pay_pan" type="text" v-model="kform.payPan"><br/>
        <input name="expiry" type="text" v-model="kform.expiry"><br/>
        <input name="purchase_amount" type="text"><br/>
        <input name="amount" type="text"><br/><!--KRW price-->
        <input name="description" type="text" v-model="kform.description"><br/>
        <input name="currency" type="text" v-model="kform.currency"><br/>
        <input name="device_category" type="text" v-model="kform.deviceCategory"><br/>
        <input name="hostid" type="text"><br/>
        <input name="hostpwd" type="text"><br/>
        <input name="name" type="text" v-model="kform.name"><br/>
        <input name="url" type="text" v-model="kform.url"><br/>
        <input name="useActiveX" type="text" v-model="kform.useactivex"><br/>
        <input name="returnUrl" type="text" v-model="kform.returnUrl"><br/>
        <input name="failReturn" type="text" v-model="kform.failreturn"><br/>
        <input name="apvl_chain_no" type="text" v-model="kform.apvlChainNo"><br/>
        <input name="apvl_seller_id" type="text" v-model="kform.apvlSellerId"><br/>
        <input name="apvl_halbu" type="text" value="0"><br/>
        <input name="POPSIZE" type="text" v-model="kform.popsize"><br/>
        <button>submit</button>
      </form>

      <!--<div v-for="item in auths" v-bind:key="item.text">
        <button v-on:click="funcProps(item.text)">{{item.text }}</button>
      </div>-->

      <Child propsdata="전달"></Child>
  </div>
</template>

<script>
    import Child from './TheBlank.vue';
    import ApiUtils from '@/common/ApiUtils';

    export default {
        components: {
           Child
        },
        data() {
            return {
                auths: [
                    { text: 'ISP' },
                    { text: 'XMPI' },
                    { text: 'KMPI' }
                ],
                kform: {
                    payApvlSellerId: '00927812446',
                    payApvlChainNo: '00927812446',
                    payPopsize: 'Y',
                    mid: 'CT00001',
                    businesstype: 'M',
                    mobile: 'N',
                    apvlSellerIdLt: '1234567890',
                    subApvlSellerIdLt: '1234567890',
                    apvlSsUseyn: 'N',
                    pay: 'ACS',
                    pan: '4599000000000000',
                    payPan: '4599000000000000',
                    expiry: '',
                    amount: '',
                    description: 'none',
                    currency: '410',
                    deviceCategory: '0',
                    name: 'GSfresh',
                    url: 'http://www.gsfresh.com,country:410',
                    useactivex: 'N',
                    returnUrl: 'http://localhost:8070/pa/authReturnTest',
                    failreturn: 'Y',
                    apvlChainNo: '00927812446',
                    apvlSellerId: '00927812446',
                    popsize: 'Y'
                }
            };
        },
        methods: {
            async funcProps(authType) {
                alert(authType);
                /* const data = {
                    authType: authType,
                    cardCode: '53'
                };
                axios
                    .post('http://localhost:8070/pa/cardAuthTest', data)
                    .then(res => {
                    if (res.data.result === 'FAIL') {
                        alert('인증정보를 불러올 수 없습니다.');
                        return;
                    }
                    if (authType === "XMPI") {

                    } else if (authType === "KMPI") {
                    this.kform = res.data;

                    kmpiForm.amount.value = res.data.amount+ " " + kmpiForm.pay_ansim_price.value;
                    kmpiForm.purchase_amount.value = kmpiForm.pay_ansim_price.value;
                    console.log(res.data);
                    kmpiForm.action = res.data.actionUrl;
                    kmpiForm.method = "post";
                    kmpiForm.target = "MPI_FRAME";
                    kmpiForm.submit();
                    }
                });*/
                const data = {
                    authType: authType,
                    cardCode: '53'
                };
                const res = await ApiUtils.post('/pa/cardAuthTest', data);
                console.log(res);
                if (res.data.result === 'FAIL') {
                    alert('인증정보를 불러올 수 없습니다.');
                    return;
                }
                if (authType === "XMPI") {

                } else if (authType === "KMPI") {
                    this.kform = res.data;

                    kmpiForm.amount.value = res.data.amount+ " " + kmpiForm.pay_ansim_price.value;
                    kmpiForm.purchase_amount.value = kmpiForm.pay_ansim_price.value;
                    console.log(res.data);
                    kmpiForm.action = res.data.actionUrl;
                    kmpiForm.method = "post";

                    // window.open("", "popup", "width=300, height=300, menubar=no, status=no, toolbar=no");
                    // kmpiForm.target = "pop";
                    kmpiForm.target = "MPI_FRAME";
                    kmpiForm.submit();
                }
            },
            parentsMethod: function(message) {
                alert(message);
            }
        }
    };
</script>

