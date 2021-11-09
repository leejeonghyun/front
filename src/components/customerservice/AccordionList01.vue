<template>
  <li>
    <a href="#" id="notice01" class="btn-accordion" aria-controls="noticeContent01" aria-expanded="false" title="공지사항 아코디언 탭" @click="accordionEvent">
      <p class="wrap-title fix new"> <!-- 'N'아이콘 사용시 new 클래스 추가 -->
        <span class="title">[공지] 개인정보처리방침 개정 안내입니다.</span>
        <i class="ico-new">N</i>
      </p>
      <span class="date">2019.11.01</span>
    </a>
    <div id="noticeContent01" class="cont-accordion" aria-labelledby="notice01" hidden="hidden">
      <img src="//via.placeholder.com/350x350" alt="" />
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용<br/>
      상세내용 상세내용
    </div>
  </li>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "AccordionList01",
  mixins: [AccordionMixin],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
