const StringUtils = {
  /**
   * 변수에 null, undefined, '' 이라면 true, 그 외는 false 반환
   *
   * @param {string} x 문자열
   * @return {boolean} true, false
   */
  isEmpty: function (x) {
    return (x) ? false : true;
  },
  /**
   * str이 빈 문자열이면 기본 문자열 반환
   *
   * @param {string} str 문자열
   * @param {string} defaultStr 기본 문자열
   * @return {string} string isEmpty()이면 기본 문자열
   */
  defaultString: function (str, defaultStr) {
    if (this.isEmpty(str)) {
      str = defaultStr;
    }
    return str;
  },
  /**
   * 문자열 앞뒤의 whitespace 제거
   *
   * @param {string} str 문자열
   * @return {string} string 결과 문자열
   */
  trim: function (str) {
    const string = this.defaultString(str, '');
    return string.trim();
  },
  /**
   * 문자열 앞쪽의 whitespace 제거
   *
   * @param {string} str
   * @return {string} string 결과 문자열
   */
  ltrim: function (str) {
    const string = this.defaultString(str, '');
    return string.replace(/^\s+/, '');
  },
  /**
   * 문자열 뒤쪽의 whitespace 제거
   *
   * @param {string} str
   * @return {string} string 결과 문자열
   */
  rtrim: function (str) {
    const string = this.defaultString(str, '');
    return string.replace(/\s+$/, '');
  },
  /**
   * byte 길이 utf-8 기준
   * ref: https://programmingsummaries.tistory.com/239
   *
   * @param {string} s
   * @return {string} string 바이트 길이
   */
  getByteLength: function (s) {
    let b = 0;
    let i = 0;
    let c = 0;
    for (; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;
  }
};

export default StringUtils;
