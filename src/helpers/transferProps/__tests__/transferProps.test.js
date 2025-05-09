import { transferProps } from '../transferProps.ts';

describe('transferProps', () => {
  it('returns all props when always blacklisted props are not present', () => {
    const props = {
      propA: 'value',
      propB: 'value',
    };
    const expectedProps = { ...props };

    expect(transferProps(props)).toEqual(expectedProps);
  });

  it('returns filtered props using always blacklisted props', () => {
    const props = {
      className: 'value',
      contentEditable: true,
      propA: 'value',
    };
    const expectedProps = { propA: 'value' };

    let errorString;
    // eslint-disable-next-line no-console
    const originalConsoleError = console.error;
    // eslint-disable-next-line no-console
    console.error = (error) => {
      errorString = error;
    };
    expect(transferProps(props)).toEqual(expectedProps);
    expect(errorString).toEqual('Invalid prop(s) supplied to the "transferProps" function: "className", "contentEditable"');

    // eslint-disable-next-line no-console
    console.error = originalConsoleError;
  });
});
