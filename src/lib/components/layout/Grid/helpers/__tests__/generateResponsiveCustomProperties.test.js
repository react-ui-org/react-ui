import { generateResponsiveCustomProperties } from '../generateResponsiveCustomProperties';

describe('generateResponsiveCustomProperties', () => {
  test('with prop that is undefined', () => {
    expect(
      generateResponsiveCustomProperties(undefined, null),
    ).toEqual(null);
  });

  test('with prop that is not an object', () => {
    expect(
      generateResponsiveCustomProperties('1fr 1fr', 'columns'),
    ).toEqual({ '--rui-local-columns-xs': '1fr 1fr' });
  });

  test('with prop that is an object', () => {
    expect(
      generateResponsiveCustomProperties({
        xs: '1fr',
        md: '1fr 2fr', /* eslint-disable-line sort-keys */
        xl: '1fr 2fr 1fr',
      }, 'columns'),
    ).toEqual({
      '--rui-local-columns-xs': '1fr',
      '--rui-local-columns-md': '1fr 2fr', /* eslint-disable-line sort-keys */
      '--rui-local-columns-xl': '1fr 2fr 1fr',
    });
  });
});
