import StringUtils from '../src/common/StringUtils';

test('StringUtils isEmpty', () => {
  expect(StringUtils.isEmpty(null)).toBe(true);
  expect(StringUtils.isEmpty(undefined)).toBe(true);
  expect(StringUtils.isEmpty('')).toBe(true);
  expect(StringUtils.isEmpty([])).toBe(false);
});

test('defaultString', () => {
  expect(StringUtils.defaultString(null, 'abc')).toBe('abc');
  expect(StringUtils.defaultString(undefined, '')).toBe('');
  expect(StringUtils.defaultString('', 'abc')).toBe('abc');
});

test('trim, ltrim, rtrim', () => {
  expect(StringUtils.ltrim(' hello ')).toBe('hello ');
  expect(StringUtils.rtrim(' hello ')).toBe(' hello');
  expect(' hello '.trim()).toBe('hello');
  const nullString = null;
  expect(StringUtils.ltrim(nullString)).toBe('');
  try{
    expect(nullString.trim()).toBe('');
  } catch (e) {}
});

test('getBytesLength', () => {
  expect(StringUtils.getByteLength('ABC')).toBe(3);
  expect(StringUtils.getByteLength('한글')).toBe(6);
  expect(StringUtils.getByteLength('e-커머스_Front(App-공통)')).toBe(29);
});
