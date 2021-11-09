import DateUtils from '../src/common/DateUtils';
import dayjs from 'dayjs';

test('DateUtils', () => {
  const today = dayjs();
  expect(DateUtils.getToday()).toBe(today.format('YYYY-MM-DD'));
  expect(DateUtils.getYesterday()).toBe(today.subtract(1, 'days').format('YYYY-MM-DD'));
  expect(DateUtils.getTomorrow()).toBe(dayjs().add(1, 'days').format('YYYY-MM-DD'));
});

test('Date format', () => {
  const date = dayjs('2019-12-24');
  expect(DateUtils.format(date, 'YYYY-MM-DD (dd)')).toBe('2019-12-24 (화)');
  expect(DateUtils.format(date, 'MM/DD<br>(dd)')).toBe('12/24<br>(화)');
});

test('Date 연산', () => {
  expect(DateUtils.add('2019-12-23', 1, 'months')).toBe('2020-01-23');
  expect(DateUtils.subtract('2019-12-23', 1, 'months')).toBe('2019-11-23');
});

test('Date 파싱', () => {
  expect(DateUtils.parse('2019-12-23')).toStrictEqual(new Date(2019, 11, 23));
});

test('Date 비교', () => {
  expect(DateUtils.isBefore('2019-12-23', '2019-12-24')).toBe(true);
  expect(DateUtils.isAfter('2019-12-23', '2019-12-24')).toBe(false);
  expect(DateUtils.isBetween('2019-12-23', '2019-12-22', '2019-12-24')).toBe(true);
  expect(DateUtils.isBetween('2019-12-27', '2019-12-22', '2019-12-24')).toBe(false);
  expect(DateUtils.isBetween('2019-12-22 01', '2019-12-22', '2019-12-24')).toBe(true);
  expect(DateUtils.isBetween('2019-12-23 23:59:59', '2019-12-22', '2019-12-24')).toBe(true);
});
