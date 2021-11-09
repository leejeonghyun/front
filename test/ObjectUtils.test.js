import ObjectUtils from '../src/common/ObjectUtils';

const object = { 'a': 1, 'b': '2', 'c': 3 };

test('ObjectUtils pick', () => {
  expect(ObjectUtils.pick(object, ['a', 'c'])).toStrictEqual({'a': 1, 'c': 3});
});

test('ObjectUtils omit', () => {
  expect(ObjectUtils.omit(object, ['a', 'c'])).toStrictEqual({'b': '2'});
});
