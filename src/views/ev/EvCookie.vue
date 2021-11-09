<template>
<div>
<br /><br /><br />
<div style="width:100%;text-align:center;">
<button @click="back" style="border:1px solid; margin:0px 10px;padding:5px;">뒤로</button>
<button @click="delCookie()" style="border:1px solid; margin:0px 10px;padding:5px;">로그아웃</button>
</div>
<br /><br /><br />
  <table>
    <tr>
      <td width="48%">
<table class="evCookie">
  <tbody>
    <tr>
      <th>구분</th>
      <td>PR</td>
      <td>EV</td>
      <td>VUE</td>
    </tr>
    <tr>
      <th>jwt 고객번호</th>
      <td>{{this.cookieInfo.getCustNo}}</td>
      <td>{{this.cookieInfo2.getCustNo}}</td>
      <td>{{info.custNo}}</td>
    </tr>
    <tr>
      <th>jwt 커머스회원번호</th>
      <td>{{this.cookieInfo.getCmmMbrNo}}</td>
      <td>{{this.cookieInfo2.getCmmMbrNo}}</td>
      <td>{{info.cmmMbrNo}}</td>
    </tr>
    <tr>
      <th>접속매체</th>
      <td>{{getMedia(this.cookieInfo.steConnMdaTypeCd)}}</td>
      <td>{{getMedia(this.cookieInfo2.steConnMdaTypeCd)}}</td>
      <td>{{getMedia(getCookie('STE_CONN_MDA_TYPE_CD'))}}</td>
    </tr>
    <tr>
      <th>회원이름</th>
      <td>{{this.cookieInfo.custNm}}</td>
      <td>{{this.cookieInfo2.custNm}}</td>
      <td>{{getCookie('CUST_NM')}}</td>
    </tr>
    <tr>
      <th>회원ID</th>
      <td>{{this.cookieInfo.webId}}</td>
      <td>{{this.cookieInfo2.webId}}</td>
      <td>{{getCookie('WEB_ID')}}</td>
    </tr>
    <tr>
      <th>회원유형</th>
      <td>{{getMbrTypeCd(this.cookieInfo.mbrTypeCd)}}</td>
      <td>{{getMbrTypeCd(this.cookieInfo2.mbrTypeCd)}}</td>
      <td>{{getMbrTypeCd(getCookie('MBR_TYPE_CD'))}}</td>
    </tr>
    <tr>
      <th>회원등급</th>
      <td>{{getCrmCustGrdCd(this.cookieInfo.custGrdCd)}}</td>
      <td>{{getCrmCustGrdCd(this.cookieInfo2.custGrdCd)}}</td>
      <td>{{getCrmCustGrdCd(getCookie('CUST_GRD_CD'))}}</td>
    </tr>
    <tr>
      <th>접속몰</th>
      <td>{{this.cookieInfo.mallId}}</td>
      <td>{{this.cookieInfo2.mallId}}</td>
      <td>{{getCookie('MALL_ID')}}</td>
    </tr>
    <tr>
      <th>스토어</th>
      <td>{{this.cookieInfo.storId}}</td>
      <td>{{this.cookieInfo2.storId}}</td>
      <td>{{getCookie('STOR_ID')}}</td>
    </tr>
    <tr>
      <th>공급업체</th>
      <td>{{this.cookieInfo.supplFirmCd}}</td>
      <td>{{this.cookieInfo2.supplFirmCd}}</td>
      <td>{{getCookie('SUPPL_FIRM_CD')}}</td>
    </tr>
    <tr>
      <th>유료멤법쉽</th>
      <td>{{getPmbsJoinPrcnCd(this.cookieInfo.pmbsJoinPrcnCd)}}</td>
      <td>{{getPmbsJoinPrcnCd(this.cookieInfo2.pmbsJoinPrcnCd)}}</td>
      <td>{{getPmbsJoinPrcnCd(getCookie('PMBS_JOIN_PRCN_CD'))}}</td>
    </tr>
    <tr>
      <th>채널ID</th>
      <td>{{this.cookieInfo.chanlId}}</td>
      <td>{{this.cookieInfo2.chanlId}}</td>
      <td>{{getCookie('CHANL_ID')}}</td>
    </tr>
    <tr>
      <th>심플리쿡-매장ID</th>
      <td>{{this.cookieInfo.simpleStorId}}</td>
      <td>{{this.cookieInfo2.simpleStorId}}</td>
      <td>{{getCookie('SIMPLE_STOR_ID')}}</td>
    </tr>
    <tr>
      <th>심플리쿡-공급업체코드</th>
      <td>{{this.cookieInfo.simpleSupplFirmCd}}</td>
      <td>{{this.cookieInfo2.simpleSupplFirmCd}}</td>
      <td>{{getCookie('SIMPLE_SUPPL_FIRM_CD')}}</td>
    </tr>
    <tr>
      <th>심플리쿡-접속몰</th>
      <td>{{this.cookieInfo.simpleMallId}}</td>
      <td>{{this.cookieInfo2.simpleMallId}}</td>
      <td>{{getCookie('SIMPLE_MALL_ID')}}</td>
    </tr>
    <tr>
      <th>새벽배송-매장ID</th>
      <td>{{this.cookieInfo.daybreakStorId}}</td>
      <td>{{this.cookieInfo2.daybreakStorId}}</td>
      <td>{{getCookie('DAYBREAK_STOR_ID')}}</td>
    </tr>
    <tr>
      <th>새벽배송-공급업체코드</th>
      <td>{{this.cookieInfo.daybreakSupplFirmCd}}</td>
      <td>{{this.cookieInfo2.daybreakSupplFirmCd}}</td>
      <td>{{getCookie('DAYBREAK_SUPPL_FIRM_CD')}}</td>
    </tr>
    <tr>
      <th>19세성인인증일시</th>
      <td>{{this.cookieInfo.adultAuthDate}}</td>
      <td>{{this.cookieInfo2.adultAuthDate}}</td>
      <td>{{getCookie('ADULT_AUTH_DATE')}}</td>
    </tr>
    <tr>
      <th>디바이스ID</th>
      <td>-</td>
      <td>-</td>
      <td>{{deviceId}}</td>
    </tr>
    <tr>
      <th>서버날짜</th>
      <td>{{this.cookieInfo.procDttm}}</td>
      <td>{{this.cookieInfo2.procDttm}}</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
      </td>
      <td width="52%">
<table class="evCookie">
  <tbody>
    <tr>
      <th>회원ID</th>
      <td>CUST_NO</td>
      <td>회원번호</td>
      <td>회원유형</td>
      <td>회원등급</td>
      <td>멤버쉽</td>
      <td>그룹</td>
    </tr>
    <tr>
      <th>gsfprom1</th>
      <th>Z000000004315</th>
      <td>1000000169</td>
      <td>정회원</td>
      <td>VVIP</td>
      <td></td>
      <td>52, 57</td>
    </tr>
    <tr>
      <th>gsfprom2</th>
      <th>Z000000004316</th>
      <td>1000000217</td>
      <td>정회원</td>
      <td>VVIP</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom4</th>
      <th>Z000000004318</th>
      <td>1000000218</td>
      <td>정회원</td>
      <td>VIP</td>
      <td></td>
      <td>52</td>
    </tr>
    <tr>
      <th>gsfprom5</th>
      <th>Z000000004319</th>
      <td>1000000219</td>
      <td>정회원</td>
      <td>VIP</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom10</th>
      <td>Z000000004324</td>
      <td>1000000223</td>
      <td>정회원</td>
      <td>웰컴</td>
      <td></td>
      <td>57</td>
    </tr>
    <tr>
      <th>gsfprom11</th>
      <td>Z000000004325</td>
      <td>1000000224</td>
      <td>정회원</td>
      <td>웰컴</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom14</th>
      <td>Z000000004328</td>
      <td>1000000455</td>
      <td>정회원</td>
      <td>웰컴</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom6</th>
      <td>Z000000004320</td>
      <td>1000000220</td>
      <td>정회원</td>
      <td>패밀리</td>
      <td></td>
      <td>57</td>
    </tr>
    <tr>
      <th>gsfprom7</th>
      <td>Z000000004321</td>
      <td>1000000221</td>
      <td>정회원</td>
      <td>패밀리</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom12</th>
      <td>Z000000004326</td>
      <td>1000000225</td>
      <td>정회원</td>
      <td>패밀리</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom13</th>
      <td>Z000000004327</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom20</th>
      <td>Z000000004334</td>
      <td>정회원</td>
      <td>패밀리</td>
      <td></td>
      <td>멤버쉽</td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom21</th>
      <td>Z000000004335</td>
      <td>정회원</td>
      <td>패밀리</td>
      <td></td>
      <td>멤버쉽</td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom22</th>
      <td>Z000000004336</td>
      <td>정회원</td>
      <td>패밀리</td>
      <td></td>
      <td>멤버쉽</td>
      <td></td>
    </tr>
    <tr>
      <th>gsfprom24</th>
      <td>Z000000004338</td>
      <td>정회원</td>
      <td>패밀리</td>
      <td></td>
      <td>멤버쉽</td>
      <td></td>
    </tr>
  </tbody>
</table>
      </td>
    </tr>
  </table>
<br /><br /><br />
<div style="width:100%;text-align:center;">
<input type="text" v-model="eventId" placeholder="이벤트 ID" style="border:1px solid; margin:0px 10px;padding:5px;" />
<button @click="getEvent()" style="border:1px solid; margin:0px 10px;padding:5px;">정보 비교</button>

</div>

<br /><br /><br />
<p>이벤트</p>
<table class="evCookie">
  <tbody>
    <tr style="background-color:#eeeeee;">
      <th>구분</th>
      <th>ERR_CODE</th>
      <th>ERR_MSG</th>
      <th></th>
    </tr>
    <tr>
      <td>EV</td>
      <td>{{evEventInfo.errorCode}}</td>
      <td>{{evEventInfo.errorMsg}}</td>
      <td></td>
    </tr>
    <tr style="background-color:#eeeeee;" v-if="prEventInfo.eventApplCnt">
      <th>구분</th>
      <th>몰</th>
      <th>매체</th>
      <th>스토어</th>
    </tr>
    <tr v-if="prEventInfo.eventApplCnt">
      <td>PR</td>
      <td :style="prEventInfo.eventApplStorCnt.mallCnt < 1 ? `background-color:yellow` : ``">{{prEventInfo.eventApplCnt.mallCnt}} / {{prEventInfo.eventApplCnt.totalMallCnt}}</td>
      <td>{{prEventInfo.eventApplCnt.mbrTypeCnt}} / {{prEventInfo.eventApplCnt.totalMbrTypeCnt}}</td>
      <td :style="prEventInfo.eventApplStorCnt.checkCnt < 1 ? `background-color:yellow` : ``">{{prEventInfo.eventApplStorCnt.checkCnt}} / {{prEventInfo.eventApplStorCnt.totalCnt}}</td>
    </tr>
  </tbody>
</table>

<br /><br /><br />
<p>이벤트</p>
<table class="evCookie">
  <tbody>
    <tr style="background-color:#eeeeee;">
      <th>구분</th>
      <th>결재상태</th>
      <th>진행상태</th>
      <th>이벤트시작</th>
      <th>이벤트종료</th>
    </tr>
    <tr>
      <td>PR</td>
      <td :style="!compare(prEventInfo.aprvStatCd, evEventInfo.aprvStatCd) ? `background-color:yellow` : ``">{{prEventInfo.aprvStatCd}}</td>
      <td :style="!compare(prEventInfo.eventProgStatCd, evEventInfo.eventProgStatCd) ? `background-color:yellow` : ``">{{prEventInfo.eventProgStatCd}}</td>
      <td :style="!compare(prEventInfo.eventBeginDttm, evEventInfo.eventBeginDttm) ? `background-color:yellow` : ``">{{prEventInfo.eventBeginDttm}}</td>
      <td :style="!compare(prEventInfo.eventEndDttm, evEventInfo.eventEndDttm) ? `background-color:yellow` : ``">{{prEventInfo.eventEndDttm}}</td>
    </tr>
    <tr>
      <td>EV</td>
      <td :style="!compare(prEventInfo.aprvStatCd, evEventInfo.aprvStatCd) ? `background-color:yellow` : ``">{{evEventInfo.aprvStatCd}}</td>
      <td :style="!compare(prEventInfo.eventProgStatCd, evEventInfo.eventProgStatCd) ? `background-color:yellow` : ``">{{evEventInfo.eventProgStatCd}}</td>
      <td :style="!compare(prEventInfo.eventBeginDttm, evEventInfo.eventBeginDttm) ? `background-color:yellow` : ``">{{evEventInfo.eventBeginDttm}}</td>
      <td :style="!compare(prEventInfo.eventEndDttm, evEventInfo.eventEndDttm) ? `background-color:yellow` : ``">{{evEventInfo.eventEndDttm}}</td>
    </tr>
    <tr style="background-color:#eeeeee;">
      <th>구분</th>
      <th>회원적용</th>
      <th>노출여부</th>
      <th>당첨확정</th>
      <th>경품지급</th>
    </tr>
    <tr>
      <td>PR</td>
      <td :style="!compare(prEventInfo.mbrApplUnitCd, evEventInfo.mbrApplUnitCd) ? `background-color:yellow` : ``">{{getMbrApplUnitCd(prEventInfo.mbrApplUnitCd)}}</td>
      <td :style="!compare(getNullN(prEventInfo.eventExpsrYn), getNullN(evEventInfo.eventExpsrYn)) ? `background-color:yellow` : ``">{{getNullN(prEventInfo.eventExpsrYn)}}</td>
      <td :style="!compare(getNullN(prEventInfo.winConfYn), getNullN(evEventInfo.winConfYn)) ? `background-color:yellow` : ``">{{getNullN(prEventInfo.winConfYn)}}</td>
      <td :style="!compare(prEventInfo.gvwyPrvdModeCd, evEventInfo.gvwyPrvdModeCd) ? `background-color:yellow` : ``">{{getGvwyPrvdModeCd(prEventInfo.gvwyPrvdModeCd)}}</td>
    </tr>
    <tr>
      <td>EV</td>
      <td :style="!compare(prEventInfo.mbrApplUnitCd, evEventInfo.mbrApplUnitCd) ? `background-color:yellow` : ``">{{getMbrApplUnitCd(evEventInfo.mbrApplUnitCd)}}</td>
      <td :style="!compare(getNullN(prEventInfo.eventExpsrYn), getNullN(evEventInfo.eventExpsrYn)) ? `background-color:yellow` : ``">{{getNullN(evEventInfo.eventExpsrYn)}}</td>
      <td :style="!compare(getNullN(prEventInfo.winConfYn), getNullN(evEventInfo.winConfYn)) ? `background-color:yellow` : ``">{{getNullN(evEventInfo.winConfYn)}}</td>
      <td :style="!compare(prEventInfo.gvwyPrvdModeCd, evEventInfo.gvwyPrvdModeCd) ? `background-color:yellow` : ``">{{getGvwyPrvdModeCd(evEventInfo.gvwyPrvdModeCd)}}</td>
    </tr>
    <tr style="background-color:#eeeeee;">
      <th>구분</th>
      <th>응모시작</th>
      <th>응모종료</th>
      <th>주문시작</th>
      <th>주문종료</th>
    </tr>
    <tr>
      <td>PR</td>
      <td :style="!compare(dateCut(prEventInfo.entryBeginDttm), evEventInfo.entryBeginDttm) ? `background-color:yellow` : ``">{{dateCut(prEventInfo.entryBeginDttm)}}</td>
      <td :style="!compare(dateCut(prEventInfo.entryEndDttm), evEventInfo.entryEndDttm) ? `background-color:yellow` : ``">{{dateCut(prEventInfo.entryEndDttm)}}</td>
      <td :style="!compare(dateCut(prEventInfo.eventOrdBeginDttm), evEventInfo.eventOrdBeginDttm) ? `background-color:yellow` : ``">{{dateCut(prEventInfo.eventOrdBeginDttm)}}</td>
      <td :style="!compare(dateCut(prEventInfo.eventOrdEndDttm), evEventInfo.eventOrdEndDttm) ? `background-color:yellow` : ``">{{dateCut(prEventInfo.eventOrdEndDttm)}}</td>
    </tr>
    <tr>
      <td>EV</td>
      <td :style="!compare(dateCut(prEventInfo.entryBeginDttm), evEventInfo.entryBeginDttm) ? `background-color:yellow` : ``">{{evEventInfo.entryBeginDttm}}</td>
      <td :style="!compare(dateCut(prEventInfo.entryEndDttm), evEventInfo.entryEndDttm) ? `background-color:yellow` : ``">{{evEventInfo.entryEndDttm}}</td>
      <td :style="!compare(dateCut(prEventInfo.eventOrdBeginDttm), evEventInfo.eventOrdBeginDttm) ? `background-color:yellow` : ``">{{evEventInfo.eventOrdBeginDttm}}</td>
      <td :style="!compare(dateCut(prEventInfo.eventOrdEndDttm), evEventInfo.eventOrdEndDttm) ? `background-color:yellow` : ``">{{evEventInfo.eventOrdEndDttm}}</td>
    </tr>
  </tbody>
</table>

<br /><br /><br />
<p>전시</p>
<table class="evCookie">
  <tbody>
    <tr>
      <td>
        PR
        <table class="evCookie">
          <tbody>
            <tr>
              <td>전시(01)</td>
              <td>몰(01)</td>
              <td>(로직내체크)</td>
            </tr>
            <tr>
              <td>전시(01)</td>
              <td>매체(02)</td>
              <td>(로직내체크)</td>
            </tr>
            <tr>
              <td>적용(02)</td>
              <td>몰(01)</td>
              <td>(로직내체크)</td>
            </tr>
            <tr>
              <td>적용(02)</td>
              <td>매체(02)</td>
              <td>(로직내체크)</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        EV
        <table class="evCookie">
          <tbody>
            <tr v-for="(item) in evMallMediaList" :key="`applEv`+item.eventApplSeqno">
              <td>{{getEventApplTypeCd(item.eventApplTypeCd)}}</td>
              <td>{{getEventApplSpCd(item.eventApplSpCd)}}</td>
              <td>{{getEventApplVal(item.eventApplSpCd, item.eventApplVal)}}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

<br /><br /><br />
<p>적용 회원</p>
<table class="evCookie">
  <tbody>
    <tr>
      <td>
        PR
        <table class="evCookie">
          <tbody>
            <tr v-for="(item) in prMbrList" :key="`applPr`+item.eventApplSeqno">
              <td>{{getEventApplTypeCd(item.eventApplTypeCd)}}</td>
              <td>{{getEventApplSpCd(item.eventApplSpCd)}}</td>
              <td>{{getEventApplVal(item.eventApplSpCd, item.eventApplVal)}}</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        EV
        <table class="evCookie">
          <tbody>
            <tr v-for="(item) in evMbrList" :key="`applEv`+item.eventApplSeqno">
              <td>{{getEventApplTypeCd(item.eventApplTypeCd)}}</td>
              <td>{{getEventApplSpCd(item.eventApplSpCd)}}</td>
              <td>{{getEventApplVal(item.eventApplSpCd, item.eventApplVal)}}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

<br /><br /><br />
<p>응모조건</p>
<table class="evCookie">
  <tbody>
    <tr style="background-color:#eeeeee;">
      <th>실적기간유형</th>
      <th>응모기간유형</th>
      <th>응모제한유형</th>
      <th>구매금액</th>
      <th>응모주문횟수</th>
      <th>응모제한횟수</th>
      <th>회원유형</th>
      <th>회원등급</th>
    </tr>
    <tr v-for="(item) in prEventInfo.eventEntryCondList" :key="`condPr`+item.eventEntryCondSeqno">
      <td>{{getEventEntryDurTypeCd(item.eventAchivDurTypeCd)}}</td>
      <td>{{getEventEntryDurTypeCd(item.eventEntryDurTypeCd)}}</td>
      <td>{{getEventEntryRestrTypeCd(item.eventEntryRestrTypeCd)}}</td>
      <td>{{item.entryCondPurchAmt}}원 이상</td>
      <td>{{item.entryOrdNum}}회 이상</td>
      <td>{{item.entryRestrNum == 0 ? "무제한" : item.entryRestrNum + "회"}}</td>
      <td>{{getMbrTypeCd(item.mbrTypeCd)}}</td>
      <td>{{getCrmCustGrdCd(item.crmCustGrdCd)}}</td>
    </tr>
  </tbody>
</table>

<br /><br /><br />
<p>경품</p>
<table class="evCookie">
  <tbody>
    <tr>
      <td>
        PR
        <table class="evCookie">
          <tbody>
            <tr style="background-color:#eeeeee;">
              <th>등수</th>
              <th>경품유형</th>
              <th>지급유형</th>
              <th>경품개수</th>
              <th>경품값</th>
            </tr>
            <tr v-for="(item) in prGvwyList" :key="`gvwyPr`+item.gvwySeqno">
              <td>{{item.eventGvwyRnk == 0 ? "등수없음" : item.eventGvwyRnk + "등"}}</td>
              <td>{{getGvwyTypeCd(item.gvwyTypeCd)}}</td>
              <td>{{getGvwyPrvdModeCd(prEventInfo.gvwyPrvdModeCd)}}</td>
              <td>{{item.gvwyPrvdQty == 0 ? "무제한" : item.gvwyPrvdQty + "개"}}</td>
              <td>{{item.gvwyApplVal}}</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        EV
        <table class="evCookie">
          <tbody>
            <tr style="background-color:#eeeeee;">
              <th>등수</th>
              <th>경품유형</th>
              <th>지급유형</th>
              <th>경품개수</th>
              <th>경품값</th>
            </tr>
            <tr v-for="(item) in evEventInfo.eventGvwyList" :key="`gvwyEv`+item.gvwySeqno">
              <td>{{item.eventGvwyRnk == 0 ? "등수없음" : item.eventGvwyRnk + "등"}}</td>
              <td>{{getGvwyTypeCd(item.gvwyTypeCd)}}</td>
              <td>{{getGvwyPrvdModeCd(evEventInfo.gvwyPrvdModeCd)}}</td>
              <td>{{item.gvwyPrvdQty == 0 ? "무제한" : item.gvwyPrvdQty + "개"}}</td>
              <td>{{item.gvwyApplVal}}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
</div>
</template>
<style>
.evCookie table {
  width:100%;
  border: 1px solid #333333 !important;
}
.evCookie td {
  text-align: center;
  padding: 10px !important;
  border: 1px solid #333333 !important;
}
.evCookie th {
  text-align: center;
  padding: 10px !important;
  border: 1px solid #333333 !important;
}
</style>
<script>
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import JwtUtils from '@/common/JwtUtils';
import TokenLogin from '@/common/sample/login/TokenLogin';
import LoginUtils from '@/common/LoginUtils';
import Tracker from '@/common/Tracker';
import ConsoleUtils from '@/common/ConsoleUtils';
import StringUtils from '@/common/StringUtils';

export default {
  data() {
    return {
      cookieInfo: [],
      cookieInfo2: [],
      media: CookieUtils.getCookie("media"),
      info: [],
      prEventInfo: {},
      evEventInfo: {},
      eventId: "",
      prGvwyList: [],
      evMallMediaList: [],
      evMbrList: [],
      prMbrList: [],
      deviceId: "",
      mdaTypeCheckCnt: 0,
    };
  },
  methods: {
    // CrossDomain Login
    getCrossOrigin() {
      const firstDomain = location.host.substring(location.host.indexOf('.'));
      const dsDomain = process.env.VUE_APP_COMMON_DS_MO;
      const dsFirstDomain = dsDomain.substring(dsDomain.indexOf('.'));
      let crossOrigin = '';
      if (firstDomain === dsFirstDomain) {
        crossOrigin = process.env.VUE_APP_COMMON_FR_MO;
      } else {
        crossOrigin = process.env.VUE_APP_COMMON_DS_MO;
      }
      return crossOrigin;
    },
    delCookie() {
      this.$store.state.mbr.user = null;
      JwtUtils.destroyRefreshToken();
      JwtUtils.destroyIdToken();
      CookieUtils.deleteCookie('CUST_NM');
      CookieUtils.deleteCookie('WEB_ID');
      CookieUtils.deleteCookie('CUST_GRD_CD');
      CookieUtils.deleteCookie('PMBS_JOIN_PRCN_CD');
      CookieUtils.deleteCookie('STOR_ID_OLD'); // 새벽 당일
      CookieUtils.deleteCookie('STOR_ID_LOGIN'); // 새벽 당일
      CookieUtils.deleteCookie('STOR_ID');
      CookieUtils.deleteCookie('SUPPL_FIRM_CD_OLD'); // 새벽 당일
      CookieUtils.deleteCookie('SUPPL_FIRM_CD_LOGIN'); // 새벽 당일
      CookieUtils.deleteCookie('SUPPL_FIRM_CD');
      CookieUtils.deleteCookie('MALL_ID');
      CookieUtils.deleteCookie('STE_CONN_MDA_TYPE_CD');
      CookieUtils.deleteCookie('MBR_TYPE_CD');
      CookieUtils.deleteCookie('ENC_VAL');
      CookieUtils.deleteCookie('CMM_STE_ID');
      CookieUtils.deleteCookie('CHANL_ID');
      CookieUtils.deleteCookie('SIMPLE_STOR_ID');
      CookieUtils.deleteCookie('SIMPLE_SUPPL_FIRM_CD');
      CookieUtils.deleteCookie('SIMPLE_MALL_ID');
      CookieUtils.deleteCookie('DAYBREAK_STOR_ID');
      CookieUtils.deleteCookie('DAYBREAK_SUPPL_FIRM_CD');
      CookieUtils.deleteCookie('ADULT_AUTH_DATE');
      alert("로그아웃 완료");
    },
    getCookie(code) {
      return CookieUtils.getCookie(code);
    },
    isLogin() {
      const idToken = JwtUtils.getIdToken();
      const isExpired = JwtUtils.isExpired(idToken);
      return !isExpired;
    },
    dateCut(dd) {
      if (dd) {
        return dd.substring(0, 19);
      }
    },
    compare(a, b) {
      return a == b;
    },
    getNullY(a) {
      if (!a) {
        return "Y";
      }
      return a;
    },
    getNullN(a) {
      if (!a) {
        return "N";
      }
      return a;
    },
    getMedia(media) {
      if (media) {
        if (media == "01") {
          return "PC";
        } else if (media == "02") {
          return "MO";
        } else if (media == "03") {
          return "GS 앱";
        } else if (media == "04") {
          return "달리살다 앱";
        }
      }
      return media;
    },
    getPmbsJoinPrcnCd(pmbsJoinPrcnCd) {
      if (pmbsJoinPrcnCd) {
        if (pmbsJoinPrcnCd == "0000") {
          return "미가입(0000)";
        } else if (pmbsJoinPrcnCd == "0001") {
          return "가입(0001)";
        }
      }
      return pmbsJoinPrcnCd;
    },
    getGvwyPrvdModeCd(gvwyPrvdModeCd) {
      if (gvwyPrvdModeCd) {
        if (gvwyPrvdModeCd == "01") {
          return "전체(01)";
        } else if (gvwyPrvdModeCd == "02") {
          return "기간내(02)";
        } else if (gvwyPrvdModeCd == "03") {
          return "당일(03)";
        }
      }
      return gvwyPrvdModeCd;
    },
    getEventEntryRestrTypeCd(eventEntryRestrTypeCd) {
      if (eventEntryRestrTypeCd) {
        if (eventEntryRestrTypeCd == "01") {
          return "제한없음(01)";
        } else if (eventEntryRestrTypeCd == "02") {
          return "기본조건(02)";
        } else if (eventEntryRestrTypeCd == "03") {
          return "회원유형(03)";
        } else if (eventEntryRestrTypeCd == "04") {
          return "주문조건(04)";
        }
      }
      return eventEntryRestrTypeCd;
    },
    getEventEntryDurTypeCd(eventEntryDurTypeCd) {
      if (eventEntryDurTypeCd) {
        if (eventEntryDurTypeCd == "01") {
          return "기간내(01)";
        } else if (eventEntryDurTypeCd == "02") {
          return "당일내(02)";
        } else if (eventEntryDurTypeCd == "03") {
          return "건당(03)";
        }
      }
      return eventEntryDurTypeCd;
    },
    getGvwyTypeCd(gvwyTypeCd) {
      if (gvwyTypeCd) {
        if (gvwyTypeCd == "1") {
          return "쿠폰(1)";
        } else if (gvwyTypeCd == "2") {
          return "포인트(2)";
        } else if (gvwyTypeCd == "3") {
          return "리워즈(3)";
        } else if (gvwyTypeCd == "4") {
          return "경품(4)";
        } else if (gvwyTypeCd == "5") {
          return "기프티콘(5)";
        }
      }
    },
    getEventApplTypeCd(eventApplTypeCd) {
      if (eventApplTypeCd) {
        if (eventApplTypeCd == "01") {
          return "전시(01)";
        } else {
          return "적용(02)";
        }
      }
    },
    getMbrApplUnitCd(mbrApplUnitCd) {
      if (mbrApplUnitCd) {
        if (mbrApplUnitCd == "01") {
          return "전체(01)";
        } else if (mbrApplUnitCd == "02") {
          return "유형(02)";
        } else if (mbrApplUnitCd == "03") {
          return "등급(03)";
        } else if (mbrApplUnitCd == "04") {
          return "그룹(04)";
        } else if (mbrApplUnitCd == "05") {
          return "회원(05)";
        } else if (mbrApplUnitCd == "06") {
          return "멤버십(06)";
        }
      }
      return mbrApplUnitCd;
    },
    getEventApplSpCd(eventApplSpCd) {
      if (eventApplSpCd) {
        if (eventApplSpCd == "01") {
          return "몰(01)";
        } else if (eventApplSpCd == "02") {
          return "매체(02)";
        } else if (eventApplSpCd == "03") {
          return "채널(03)";
        } else if (eventApplSpCd == "04") {
          return "회원유형(04)";
        } else if (eventApplSpCd == "05") {
          return "회원등급(05)";
        } else if (eventApplSpCd == "06") {
          return "회원그룹(06)";
        }
        return eventApplSpCd;
      }
    },
    getEventApplVal(eventApplSpCd, eventApplVal) {
      if (eventApplVal) {
        if (eventApplSpCd == "02") {
          if (eventApplVal == "01") {
            return "PC(01)";
          } else if (eventApplVal == "02") {
            return "모바일(02)";
          } else if (eventApplVal == "03") {
            return "앱(03)";
          }
        } else if (eventApplSpCd == "04") {
          if (eventApplVal == "01") {
            return "정회원(01)";
          } else if (eventApplVal == "02") {
            return "간편회원(02)";
          }
        } else if (eventApplSpCd == "05") {
          if (eventApplVal == "01") {
            return "VVIP(01)";
          } else if (eventApplVal == "02") {
            return "VIP(02)";
          } else if (eventApplVal == "03") {
            return "FAMILY(03)";
          } else if (eventApplVal == "04") {
            return "WELCOME(04)";
          }
        }
      }
      return eventApplVal;
    },
    getCrmCustGrdCd(cmmCustGrdCd) {
      if (cmmCustGrdCd == "01") {
        return "VVIP(01)";
      } else if (cmmCustGrdCd == "02") {
        return "VIP(02)";
      } else if (cmmCustGrdCd == "03") {
        return "FAMILY(03)";
      } else if (cmmCustGrdCd == "04") {
        return "WELCOME(04)";
      }
    },
    getMbrTypeCd(mbrTypeCd) {
      if (mbrTypeCd == "01") {
        return "정회원(01)";
      } else if (mbrTypeCd == "02") {
        return "간편회원(02)";
      }
    },
    async getEvent() {
      if (this.eventId != null) {
        console.log("배포누락때문에 임시로 주석 추가 차후 삭제 예정임");
        await ApiUtils.get('/fo/ev/eventmgnt/test/event/'+this.eventId)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
            this.prEventInfo = res.data.data.eventInfo;

            this.prMbrList = this.prEventInfo.eventApplList.filter((info) => {
              return info.eventApplTypeCd == "02" && !(info.eventApplSpCd == "01" || info.eventApplSpCd == "02");
            });

            this.prGvwyList = res.data.data.gvwyList;
          }
        })
        .catch(e => {
          this.$gsdialog.alert(e.response.data.statusMessage);
        });
        await ApiUtils.get('/ev/eventmgnt/event-detail/'+this.eventId, {mode: "BOS"})
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
            this.evEventInfo = res.data.data;

            this.evMallMediaList = this.evEventInfo.eventApplList.filter((info) => {
              return (info.eventApplTypeCd == "01" || info.eventApplTypeCd == "02") && (info.eventApplSpCd == "01" || info.eventApplSpCd == "02");
            });
            this.evMbrList = this.evEventInfo.eventApplList.filter((info) => {
              return info.eventApplTypeCd == "02" && !(info.eventApplSpCd == "01" || info.eventApplSpCd == "02");
            });
          }
        })
        .catch(e => {
          this.$gsdialog.alert(e.response.data.statusMessage);
        });
      }
    },
    fnDeviceId() {
      if (!localStorage.getItem("deviceId") && this.mdaTypeCheckCnt <= 3) {
        this.mdaTypeCheckCnt++;
        setTimeout(() => {
          this.deviceId = "device : " + this.mdaTypeCheckCnt + " : " + localStorage.getItem("deviceId");
          console.log("localStorage : " + this.mdaTypeCheckCnt + " -------------------------");
          console.log(localStorage);
          this.fnDeviceId();
        }, 2000);
      }
    },
    back() {
      history.back();
    },
  },
  computed: {
  },
  watch: {
  },
  created() {
    try {
      window.appCallAppInfo();
      console.log(window.appCallAppInfo);
    } catch (e) {
    }
  },
  async mounted() {
    this.fnDeviceId();
    const vm = this;
    await LoginUtils.nonLoginPromise().then(function (response) {
      ApiUtils.get('/fo/ev/eventmgnt/test/cookieInfo')
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          vm.cookieInfo = res.data.data;
        }
      })
      .catch(e => {
        vm.$gsdialog.alert(e.response.data.statusMessage);
      });
      ApiUtils.get('/ev/eventmgnt/test/cookieInfo')
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          vm.cookieInfo2 = res.data.data;
        }
      })
      .catch(e => {
        vm.$gsdialog.alert(e.response.data.statusMessage);
      });
      const user = TokenLogin.getUser();
      vm.info = user;
    });
  },
};
</script>
<!-- 삭제예정 -->
