<template>
<ul class="list-accordion">
  <li>
    <a href="#" id="notice02" class="btn-accordion" aria-controls="noticeContent02" aria-expanded="false" title="공지사항 아코디언 탭" @click="accordionEvent">
      <p class="wrap-title new"> <!-- 'N'아이콘 사용시 new 클래스 추가 -->
        <span class="title">[공지] 제휴 서비스 종료 안내</span>
        <i class="ico-new">N</i>
      </p>
      <span class="date">2019.11.01</span>
    </a>
    <div id="noticeContent02" class="cont-accordion" aria-labelledby="notice02" hidden="hidden">
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용
    </div>
  </li>
  <li>
    <a href="#" id="notice03" class="btn-accordion" aria-controls="noticeContent03" aria-expanded="false" title="공지사항 아코디언 탭" @click="accordionEvent">
      <p class="wrap-title"> <!-- 'N'아이콘 사용시 new 클래스 추가 -->
        <span class="title">[공지] 개인정보처리방침 개정 안내입니다.</span>
        <i class="ico-new">N</i>
      </p>
      <span class="date">2019.11.01</span>
    </a>
    <div id="noticeContent03" class="cont-accordion" aria-labelledby="notice03" hidden="hidden">
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용
    </div>
  </li>
  <li>
    <a href="#" id="notice04" class="btn-accordion" aria-controls="noticeContent04" aria-expanded="false" title="공지사항 아코디언 탭" @click="accordionEvent">
      <p class="wrap-title"> <!-- 'N'아이콘 사용시 new 클래스 추가 -->
        <span class="title">[공지] 개인정보처리방침 개정 안내입니다.</span>
        <i class="ico-new">N</i>
      </p>
      <span class="date">2019.11.01</span>
    </a>
    <div id="noticeContent04" class="cont-accordion" aria-labelledby="notice04" hidden="hidden">
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용
    </div>
  </li>
  <li>
    <a href="#" id="notice05" class="btn-accordion" aria-controls="noticeContent05" aria-expanded="false" title="공지사항 아코디언 탭" @click="accordionEvent">
      <p class="wrap-title"> <!-- 'N'아이콘 사용시 new 클래스 추가 -->
        <span class="title">[공지] 개인정보처리방침 개정 안내입니다.</span>
        <i class="ico-new">N</i>
      </p>
      <span class="date">2019.11.01</span>
    </a>
    <div id="noticeContent05" class="cont-accordion" aria-labelledby="notice05" hidden="hidden">
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용
    </div>
  </li>
</ul>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "AccordionList",
  mixins: [AccordionMixin],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
