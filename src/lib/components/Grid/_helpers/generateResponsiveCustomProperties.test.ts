import { generateResponsiveCustomProperties } from './generateResponsiveCustomProperties';

describe('generateResponsiveCustomProperties', () => {
  test('with prop that is undefined', () => {
    expect(
      generateResponsiveCustomProperties(undefined, null),
    ).toEqual(null);
  });

  test('with prop that is a spacing value', () => {
    expect(
      generateResponsiveCustomProperties(3, 'columns', 'spacing'),
    ).toEqual({ '--rui-local-columns-xs': 'var(--rui-dimension-space-3)' });
  });

  test('with prop that is not an object', () => {
    expect(
      generateResponsiveCustomProperties('1fr 1fr', 'columns'),
    ).toEqual({ '--rui-local-columns-xs': '1fr 1fr' });
  });

  test('with prop that is an object', () => {
    /* eslint-disable sort-keys */
    expect(
      generateResponsiveCustomProperties({
        xs: '1fr',
        md: '1fr 2fr',
        xl: '1fr 2fr 1fr',
      }, 'columns'),
    ).toEqual({
      '--rui-local-columns-xs': '1fr',
      '--rui-local-columns-md': '1fr 2fr',
      '--rui-local-columns-xl': '1fr 2fr 1fr',
    });
    /* eslint-enable sort-keys */
  });
});
