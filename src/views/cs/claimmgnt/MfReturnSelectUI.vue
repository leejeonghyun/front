<template>
  <!-- ReturnSelectUI : 반품 사유 셀렉트 UI -->
  <div class="wrap-select-box" v-if="ordClaimInfo.returnSelectUI">
    <p class="txt-info">
      <span class="wrap-select w100">
        <label :for="'returnSelect_' + ckIdx"></label>
        <!-- TODO: 접근성 관련 수정 사항 : label 추가 -->
        <select
          :id="'returnSelect_' + ckIdx"
          :title="roletext +'사유를 선택'"
          v-model="ordItem.ordClaimResnCd"
          @change="selectReasonAction(ordItem)"
          :disabled="!this.itemInfo.chkYn || ordClaimInfo.selectDisabled"
        >
          <!-- 구분값으로 disabled 처리 함(신청, 상세) -->
          <option value disabled selected>{{roletext}} 사유를 선택해 주세요.</option>
          <option
            v-for="(list, index) in this.commCdList"
            :key="index"
            :value="list.commCd"
          >{{list.commCdNm}}</option>
        </select>
      </span>
    </p>
    <!-- START : 고객 단순 변심 -->
    <!-- 6월수정 START : 반품 사유 변경으로 조건 변경 -->
    <div class="wrap-return-reason" v-if="ordItem.selectOtherRefCd == 1">
      <p
        class="point"
        v-if="(ordItem.rtnDlfeeAmt > 0 && roletext === '반품') || (ordItem.exchDlfeeAmt > 0 && roletext === '교환')"
      >구매자가 {{roletext}} 배송비를 부담해야 합니다.</p>
      <span class="inp-chk small" v-if="ordClaimInfo.reasonYn">
        <input type="checkbox" v-model="ordItem.reasonOrdItem" @click="reasonApply(ordItem)" />
        <label>동일사유 적용하기</label>
      </span>
      <!-- 교환인 경우에만 옵션 선택 -->
      <!-- 단품이 한개 인 경우 select box 비노출 처리 추가 -->
      <MfExchStockList
        v-if="ordClaimInfo.exchangeStockYn && ordItem.skuMgntYn != 'N'"
        :ordInfo="ordItem"
        :ckIdx="ckIdx"
        :disabledInfo="ordClaimInfo.selectDisabled"
      />
    </div>
    <!-- END : 고객 단순 변심 -->
    <!-- START : 판매자 귀책사유 -->
    <div class="wrap-return-reason" v-if="ordItem.selectOtherRefCd == 2">
      <p class="point">판매자가 {{roletext}} 배송비를 부담합니다.</p>
      <span class="inp-chk small" v-if="ordClaimInfo.reasonYn">
        <input type="checkbox" v-model="ordItem.reasonOrdItem" @click="reasonApply(ordItem)" />
        <label>동일사유 적용하기</label>
      </span>
      <div class="wrap-textarea">
        <textarea
          name="ordClaimReqCnts"
          :id="'ordClaimReqCnts'+ckIdx"
          v-model="ordItem.ordClaimReqCnts"
          :placeholder="placeholder"
          @change="ordClaimReqAction"
          :disabled="ordClaimInfo.selectDisabled"
          maxlength="100"
        ></textarea>
      </div>
      <div
        class="wrap-photo"
        v-if="(ordClaimInfo.selectDisabled == true && this.previewList.length > 0) || ordClaimInfo.selectDisabled == false"
      >
        <swiper :options="swiperOptionScrollX">
          <swiper-slide v-if="ordClaimInfo.selectDisabled == false">
            <input
              type="file"
              class="hidden btn-add"
              :id="'uploadPhoto'+ckIdx"
              :ref="'fileInput'+ckIdx"
              @change="onFileUpload"
              accept="image/*"
            />
            <label :for="'uploadPhoto'+ckIdx">
              <span class="count" aria-label="이미지 등록개수">{{this.previewList.length}}</span> /
              <span class="total" aria-label="이미지 최대등록개수">{{maxImgCnt}}</span>
            </label>
          </swiper-slide>
          <swiper-slide v-for="(preview, index) in this.previewList" :key="index">
            <div class="thumb">
              <figure>
                <img :src="preview.attFileUrl" alt="고객등록이미지" />
              </figure>
              <button
                type="button"
                class="btn-delete"
                aria-label="이미지첨부삭제"
                @click="onFileDelete(index)"
                v-if="ordClaimInfo.attFileYn"
              ></button>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </div>
      <p class="list-dot" v-if="ordClaimInfo.selectDisabled == false">이미지는 최대 5MB이내 / 최대 5장 첨부 가능</p>
    </div>
    <!-- END : 판매자 귀책사유 -->
  </div>
</template>

<script>
import MfExchStockList from '@/components/order/MfExchStockList';
import ApiUtils from '@/common/ApiUtils';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: 'ReturnSelectUI',
  // ckIdx: 체크박스 인덱스, index: 추가 구성 상품 인덱스, inputCheck : 추가 구성품 반품 체크 상태, returnValue : 추가 구성품 반품 사유 셀렉트 활성화 인덱스
  /* props: ['ckIdx', 'index', 'inputCheck', 'returnValue'], */
  props: {
    ckIdx: String,
    itemInfo: Object,
    roletext: String,
    ordClaimInfo: Object,
  },
  data() {
    return {
      placeholder:
        '반품 사유를 자세히 적어주세요.\n직접적인 사유와 이미지를 첨부해주시면 교환 절차를 빠르게 진행할 수 있습니다.',
      swiperOptionScrollX: {
        slidesPerView: 'auto',
        freeMode: true,
        containerModifierClass: 'wrap-list-photo ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
      ordItem: {},
      commCdList: [],
      selected: '',
      imageList: [],
      previewList: [],
      maxImgCnt: 5, // 총 이미지 수
      selectOtherRefCd: '',
      ordClaimReqCnts: '',
      fileTokenId: '',
      reasonOrdItem: false,
    };
  },
  components: {
    swiper,
    swiperSlide,
    MfExchStockList,
  },
  methods: {
    reasonApply(data) {
      this.reasonOrdItem = !data.reasonOrdItem;
      // 동일사유 Set
      const params = {
        selectOtherRefCd: null,
        ordClaimResnCd: null,
        reasonOrdItem: null,
      };
      params.selectOtherRefCd = data.selectOtherRefCd;
      params.ordClaimResnCd = data.ordClaimResnCd;
      params.reasonOrdItem = this.reasonOrdItem;
      this.$emit('reasonOrdItemUpdate', params);
      this.$emit('getCheckedItemInfo');
    },
    isValidFile(file) {
      const maxSize = 5242880;
      if (file.target.files[0].size > maxSize) {
        this.$gsdialog.alert('이미지 첨부는 5MB 까지만 가능합니다.');
        this.$refs['fileInput' + this.$props.ckIdx].value = null;
        return false;
      }
      return true;
    },
    async onFileUpload(event) {
      if (!this.isValidFile(event)) {
        return;
      }
      // 업로드 파일 개수 체크
      if (
        this.isNotEmpty(this.previewList.length) &&
        this.previewList.length >= this.maxImgCnt
      ) {
        this.$gsdialog.alert(
          '이미지 파일은 최대 ' + this.maxImgCnt + '개까지 업로드가 가능합니다.'
        );
        return;
      }
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append('fileTokenId', this.fileTokenId);
      await ApiUtils.post('/fo/cm/filemgnt/file', formData)
        .then(res => {
          if (res.data === null) {
            this.$gsdialog.alert('이미지 업로드에 실패하였습니다.');
            return;
          } else {
            const returnData = res.data.data;
            console.log('이미지 데이터 ============= ', returnData);
            // 정상 등록 여부 체크 (resultCode : 1(정상), 2(파일사이즈초과), 3(파일확장자체크오류, 4(기타))
            if (returnData.resultCode == 2) {
              this.$gsdialog.alert('이미지 파일 크기가 5M를 초과 하였습니다.');
              return;
            } else if (returnData.resultCode == 3) {
              this.$gsdialog.alert('업로드가 불가능한 이미지 파일입니다.');
              return;
            } else if (returnData.resultCode == 4) {
              this.$gsdialog.alert('파일업로드에 실패하였습니다.');
              return;
            }
            if (this.fileTokenId === '') {
              this.fileTokenId = returnData.fileTokenId;
            }
            // 이미지 파일 Set
            this.previewList.push(returnData);
            this.ordItem.attFileId = this.fileTokenId;
            this.ordItem.claimAttFileList = this.previewList;
            // this.$set(this.ordItem, 'claimAttFileList', this.previewList);
          }
        })
        .catch(e => {
          this.$gsdialog.alert('파일업로드에 실패하였습니다.');
          this.$refs['fileInput' + this.$props.ckIdx].value = null;
        });
      this.$refs['fileInput' + this.$props.ckIdx].value = null;
    },
    onFileDelete(index) {
      this.previewList.splice(index, 1);
    },
    ordClaimReqAction(event) {
      this.$set(this.ordItem, 'ordClaimReqCnts', event.target.value);
      // this.$emit('getCheckedItemInfo');
    },
    selectReasonAction(ordItem) {
      const commCdData = this.commCdList;
      if (commCdData) {
        commCdData
          .filter(x => x.commCd == event.target.value)
          .map(value => {
            return (this.selectOtherRefCd = value.otherRefCd);
          });
      }
      if (ordItem.reasonOrdItem) {
        // 동일사유 Set
        const params = {};
        params.ordClaimResnCd = event.target.value;
        params.selectOtherRefCd = this.selectOtherRefCd;
        params.reasonOrdItem = ordItem.reasonOrdItem;
        this.$emit('reasonOrdItemUpdate', params);
      }
      // select box 데이터 set
      this.$set(this.ordItem, 'ordClaimResnCd', event.target.value);
      this.$set(this.ordItem, 'selectOtherRefCd', this.selectOtherRefCd);
      this.$emit('getCheckedItemInfo');
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    setRoleTxt() {
      const roletxt = this.$props.roletext;
      if (roletxt) {
        this.placeholder =
          roletxt +
          ' 사유를 자세히 적어주세요.\n직접적인 사유와 이미지를 첨부해주시면 교환 절차를 빠르게 진행할 수 있습니다.';
      }
    },
    async init() {
      await this.searchCommCd('CS0009'); // 귀책사유 코드
      this.ordItem = this.$props.itemInfo;
      if (!this.ordItem.ordClaimResnCd) {
        this.$set(this.ordItem, 'ordClaimResnCd', '');
      } else {
        if (this.commCdList) {
          this.commCdList
            .filter(x => x.commCd == this.ordItem.ordClaimResnCd)
            .map(value => {
              return (this.selectOtherRefCd = value.otherRefCd);
            });
          this.$set(this.ordItem, 'selectOtherRefCd', this.selectOtherRefCd);
        }
      }
      if (this.ordItem.claimAttFileList == null) {
        this.ordItem.claimAttFileList = [];
      } else {
        const attFileList = this.ordItem.claimAttFileList;
        if (attFileList.length > 0) {
          attFileList.map(value => {
            const attrFileObj = {};
            attrFileObj.attFileUrl = value.filePathNm;
            this.previewList.push(attrFileObj);
          });
        }
      }
      this.setRoleTxt();
    },
    async searchCommCd(commGrpCd) {
      // 공통코드 조회 -> 하드코딩 으로 변경
      const commCdObj = [
        {
          commCd: '01',
          commCdNm: '마음이 변했어요.',
          otherRefCd: '1',
        },
        {
          commCd: '10',
          commCdNm: '잘못 주문했어요.',
          otherRefCd: '1',
        },
        {
          commCd: '03',
          commCdNm: '상품이 불량이에요.',
          otherRefCd: '2',
        },
        {
          commCd: '07',
          commCdNm: '상품이 오배송 됐어요.',
          otherRefCd: '2',
        },
      ];
      this.commCdList = commCdObj;
      // bos 쪽에서 들어오는 경우가 있어 추가(상세인경우만 기타 노출)
      if (this.$props.ordClaimInfo.selectDisabled) {
        const commCdObjTemp = {
          commCd: '14',
          commCdNm: '기타',
          otherRefCd: '2',
        };
        this.commCdList.push(commCdObjTemp);
      }
      /* const params = {
        commGrpCd: commGrpCd,
      };
      await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params).then(res => {
        if (res.data.success) {
          const data = res.data.data;
          console.log('값 ::', data);
          data.map(value => {
            switch (value.commCd) {
              case '01':
                value.commCdNm = '마음이 변했어요.';
                value.otherRefCd = '1';
                this.commCdList.push(value);
                break;
              case '07':
                value.commCdNm = '잘못 주문했어요.';
                value.otherRefCd = '1';
                this.commCdList.push(value);
                break;
              case '03':
                value.commCdNm = '상품이 불량이에요.';
                value.otherRefCd = '2';
                this.commCdList.push(value);
                break;
              case '10':
                value.commCdNm = '상품이 오배송 됐어요.';
                value.otherRefCd = '2';
                this.commCdList.push(value);
                break;
              case '14':
                // 신청, 상세 구분.
                if (this.$props.ordClaimInfo.selectDisabled) {
                  this.commCdList.push(value);
                }
                break;
            }
          });
        }
      }); */
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>
