const ArrayUtils = {
  /**
   * 배열의 최소값 반환
   *
   * @param {array} list 숫자 배열
   * @return {number} 최소값
   */
  min: function (list) {
    return list.reduce((p, c) => Math.min(p, c));
  },
  /**
   * 배열의 최대값 반환
   *
   * @param {array} list 숫자 배열
   * @return {number} 최대값
   */
  max: function (list) {
    return list.reduce((p, c) => Math.max(p, c));
  },
  /**
   * 배열에 원소가 있는지 확인
   *
   * @param {array} list
   * @param {string|number} value
   * @return {boolean} value가 있으면 true 없으면 false
   */
  includes: function (list, value) {
    return list.includes(value);
  },
  /**
   * 중복을 제거한 배열 반환
   *
   * @param {array} list
   * @return {array} 유니크한 값 배열 반환
   */
  uniq: function (list) {
    return [...new Set(list)];
  },
  /**
   *  null, undefined, ''를 제외한 배열
   *
   * @param {array} list
   * @return {array} null, undefined, ''를 제외한 배열
   */
  compact: function (list) {
    return list.filter(Boolean);
  },
  /**
   * 숫자 배열 생성
   * @param {number} start
   * @param {number} stop
   * @param {number} step optional
   * @return {array} 숫자 배열
   */
  range: function (start, stop, step) {
    const a = [start];
    let b = start;
    while (b < stop) {
      a.push(b += step || 1);
    }
    return a;
  },
  /**
   * 배열을 랜덤으로 정렬
   * @param {array} list
   * @return {array} 배열
   */
  shuffle: function (list) {
    return list.slice().sort(() => Math.random() - 0.5);
  }
};

export default ArrayUtils;
