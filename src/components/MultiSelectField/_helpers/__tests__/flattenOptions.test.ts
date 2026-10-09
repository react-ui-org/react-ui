import { flattenOptions } from '../flattenOptions';

describe('flattenOptions', () => {
  it('keeps individual options in order', () => {
    expect(flattenOptions([
      {
        label: 'Apple',
        value: 'apple',
      },
      {
        disabled: true,
        key: 'b',
        label: 'Banana',
        value: 'banana',
      },
    ])).toEqual([
      {
        disabled: false,
        key: 'apple',
        label: 'Apple',
        value: 'apple',
      },
      {
        disabled: true,
        key: 'b',
        label: 'Banana',
        value: 'banana',
      },
    ]);
  });

  it('flattens grouped options and inherits the disabled state of the group', () => {
    expect(flattenOptions([
      {
        label: 'Fruit',
        options: [
          {
            label: 'Apple',
            value: 'apple',
          },
        ],
      },
      {
        disabled: true,
        label: 'Vegetables',
        options: [
          {
            label: 'Carrot',
            value: 'carrot',
          },
        ],
      },
    ])).toEqual([
      {
        disabled: false,
        key: 'apple',
        label: 'Apple',
        value: 'apple',
      },
      {
        disabled: true,
        key: 'carrot',
        label: 'Carrot',
        value: 'carrot',
      },
    ]);
  });

  it('disables all options when the field is disabled', () => {
    expect(flattenOptions([
      {
        label: 'Apple',
        value: 'apple',
      },
    ], true)).toEqual([
      {
        disabled: true,
        key: 'apple',
        label: 'Apple',
        value: 'apple',
      },
    ]);
  });
});
