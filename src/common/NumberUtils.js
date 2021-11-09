const NumberUtils = {
  /**
   * 천단위로 쉼표를 표시한 문자열 반환
   *
   * @param {number} x 쉼표가 적용될 숫자
   * @return {string} string 쉼표가 적용된 문자열
   */
  toComma: function (x) {
    return (x) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
  }
};

export default NumberUtils;
