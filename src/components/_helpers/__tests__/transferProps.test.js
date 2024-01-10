import { transferProps } from '../transferProps';

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
    const originalConsoleError = console.error;
    console.error = (error) => {
      errorString = error;
    };
    expect(transferProps(props)).toEqual(expectedProps);
    expect(errorString).toEqual('Invalid prop(s) supplied to the "transferProps" function: "className", "contentEditable"');

    console.error = originalConsoleError;
  });
});
