import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(isBetween);

const DateUtils = {
  /**
   * 오늘 날짜 반환 'YYYY-MM-DD' 포맷
   *
   * @return {string} string 오늘 날짜 문자열
   */
  getToday: function() {
    return this.format(dayjs());
  },
  /**
   * 어제 날짜 반환 'YYYY-MM-DD' 포맷
   *
   *  @return {string} string 어제 날짜 문자열
   */
  getYesterday: function() {
    return this.format(dayjs().subtract(1, 'days'));
  },
  /**
   * 내일 날짜 반환 'YYYY-MM-DD' 포맷
   *
   *  @return {string} string 내일 날짜 문자열
   */
  getTomorrow: function() {
    return this.format(dayjs().add(1, 'days'));
  },
  /**
   * 지정된 포맷으로 날짜 포맷 변환, 기본 포맷은 'YYYY-MM-DD'
   *
   * @param {date|string} date
   * @param {string} dateFormat
   * @return {string} string 지정된 포맷으로 변환된 날짜 문자열
   */
  format: function(date, dateFormat) {
    if (!dateFormat) {
      return dayjs(date).format('YYYY-MM-DD');
    }
    return dayjs(date).format(dateFormat);
  },
  /**
   * 날짜에 지정된 수와 단위(년, 월, 일, 시, 분, 초)만큼 더하기
   *
   * @param {date|string} date
   * @param {number} number 수
   * @param {'year'|'month'|'day'|'hour'|'minute'|'second'} scale
   * @return {string} string 더해진 날짜 문자열
   */
  add: function(date, number, scale) {
    return this.format(dayjs(date).add(number, scale));
  },

  subtract: function(date, number, scale) {
    return this.format(dayjs(date).subtract(number, scale));
  },

  parse: function(strDate) {
    return dayjs(strDate).toDate();
  },

  isBefore: function(day1, day2) {
    return dayjs(day1).isBefore(day2);
  },

  isAfter: function(day1, day2) {
    return dayjs(day1).isAfter(day2);
  },

  isBetween: function(date, startDate, endDate) {
    return dayjs(date).isBetween(dayjs(startDate), dayjs(endDate));
  }

};

export default DateUtils;
