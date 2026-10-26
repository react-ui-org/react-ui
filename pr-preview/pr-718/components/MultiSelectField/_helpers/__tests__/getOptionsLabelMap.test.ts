import { getOptionsLabelMap } from '../getOptionsLabelMap';

describe('getOptionsLabelMap', () => {
  it('maps values to labels for individual options', () => {
    const options = [
      {
        label: 'Apple',
        value: 'apple',
      },
      {
        label: 'Banana',
        value: 'banana',
      },
    ];

    expect(getOptionsLabelMap(options)).toEqual(new Map([
      ['apple', 'Apple'],
      ['banana', 'Banana'],
    ]));
  });

  it('maps values to labels for grouped options', () => {
    const options = [
      {
        label: 'Fruits',
        options: [
          {
            label: 'Apple',
            value: 'apple',
          },
        ],
      },
      {
        label: 'Carrot',
        value: 'carrot',
      },
    ];

    expect(getOptionsLabelMap(options)).toEqual(new Map([
      ['apple', 'Apple'],
      ['carrot', 'Carrot'],
    ]));
  });

  it('keeps a value named like an object property as a plain key', () => {
    const options = [
      {
        label: 'Prototype',
        value: '__proto__',
      },
    ];

    expect(getOptionsLabelMap(options).get('__proto__')).toBe('Prototype');
  });
});
