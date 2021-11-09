<!--
views/od/SC-FO-OD-GS-MS-007
-->
<template>
    <dl>
        <dt class="name">
                <span class="inp-radio-bg">
                  <input :alt="value.sellAmt" :checked="selected" :id="id" :name="value.itemId" :value="value.itemId"
                         @click="checkboxClickAction" type="checkbox"/>
                  <label>{{value.itemNm}}</label>
                </span>
        </dt>
        <dd class="thumb">
            <a href="javascript:">
                <figure>
                    <img :alt="value.itemNm" :src="getItemImg(value.imgFileNm)">
                </figure>
            </a>
        </dd>
    </dl>
</template>
<script>
    import LayerPopupMixin from '@/mixins/LayerPopupMixin';
    import NumberUtils from '@/common/NumberUtils';
    import ImgUtils from '@/common/ImgUtils';
    import CookieUtils from '@/common/CookieUtils';
    import SiteUtils from '@/common/SiteUtils';

    export default {
        name: "CartBenefitProduct",
        props: {
            value: Object,
            selected: Boolean,
        },
        data() {
            return {
                swiperBenefitProduct: {
                    slidesPerView: 3.5,
                    mousewheel: true,
                },
                popup: {
                    open: false,
                    popupCartBenefitAlert: false,
                    popupFirstInfo: false,
                },
                totalPrice: [],
                check: [],
                firstBuy: 0,
            };
        },
        mixins: [LayerPopupMixin],
        components: {},
        filters: {
            comma: NumberUtils.toComma,
        },
        methods: {
            checkboxClickAction() {
                this.emitClick();
            },
            emitClick() {
                this.$emit('click');
            },
            getItemImg(url) {
                let path = '';
                try {
                    url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
                    path = ImgUtils.path(url);
                } catch (e) {
                    alert(e);
                    path = '@/assets/images/img/img_product_nothumb.jpg';
                }
                return path;
            },
            goItemDetail(itemId, storId, supplFirmCd) {
                if (CookieUtils.getMallId() === '1') {
                    location.href = SiteUtils.freshmo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
                } else {
                    location.href = SiteUtils.dalimo('/product_detail?itemId=' + itemId + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd);
                }
            },
        },
        computed: {
            dcRate() {
                const dcRate = -Math.ceil(((this.value.dcAmt - this.value.sellAmt) / this.value.sellAmt) * 100);
                return dcRate;
            },
            id() {
                return 'cart-first-product_' + this.value.itemId;
            },
        },
        mounted() {
        }
    };
</script>
