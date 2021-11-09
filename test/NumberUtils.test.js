import NumberUtils from '../src/common/NumberUtils';

test('NumberUtils', () => {
  expect(NumberUtils.toComma(1000)).toBe('1,000');
  expect(NumberUtils.toComma(100)).toBe('100');
  expect(NumberUtils.toComma(1000000)).toBe('1,000,000');
  expect(NumberUtils.toComma(null)).toBe('0');
  expect(NumberUtils.toComma(undefined)).toBe('0');
  expect(NumberUtils.toComma('1000')).toBe('1,000');
});

