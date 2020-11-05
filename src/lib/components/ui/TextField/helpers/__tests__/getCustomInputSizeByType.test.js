import getCustomInputSizeByType from '../getCustomInputSizeByType';

describe('getCustomInputSizeByType', () => {
  test('with number input type, a size value, and no max value', () => {
    expect(
      getCustomInputSizeByType('number', 5, null),
    ).toEqual(5);
  });

  test('with number input type, a size value, and a max value', () => {
    expect(
      getCustomInputSizeByType('number', 5, 10),
    ).toEqual(2);
  });

  test('with text input type and no size value', () => {
    expect(
      getCustomInputSizeByType('text', null, null),
    ).toEqual(null);
  });

  test('with text input type and a size value', () => {
    expect(
      getCustomInputSizeByType('text', 5, null),
    ).toEqual(5);
  });
});
