const ObjectUtils = {
  /**
   * 키 배열에 있는 항목만 포함하는 객체 반환
   *
   * @param {object} object 입력 객체
   * @param {array} list 선택할 key array
   * @return {object} object key list를 포함한 객체
   */
  pick: function(object, list) {
    const result = {};
    list.forEach((e) => {
      result[e] = object[e];
    });
    return result;
  },
  /**
   * 키 배열에 있는 항목만 제외하는 객체 반환
   *
   * @param {object} object 입력 객체
   * @param {array} list 제외할 key array
   * @return {object} object key list를 제외한 객체
   */
  omit: function(object, list) {
    list.forEach((e) => {
      delete object[e];
    });
    return object;
  }
};

export default ObjectUtils;
