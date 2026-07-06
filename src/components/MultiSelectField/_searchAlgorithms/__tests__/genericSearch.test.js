import { genericSearch } from '../genericSearch';

const substringComparator = (optionLabel, searchString) => optionLabel.includes(searchString);

describe('genericSearch', () => {
  it('filters individual options by their labels', () => {
    const options = [
      {
        label: 'Apple',
        value: 'apple',
      },
      {
        label: 'Banana',
        value: 'banana',
      },
      {
        label: 'Grapefruit',
        value: 'grapefruit',
      },
    ];

    expect(genericSearch(options, 'an', substringComparator)).toEqual([
      {
        label: 'Banana',
        value: 'banana',
      },
    ]);
  });

  it('filters grouped options by the labels of the options inside the groups', () => {
    const options = [
      {
        label: 'Fruits',
        options: [
          {
            label: 'Apple',
            value: 'apple',
          },
          {
            label: 'Banana',
            value: 'banana',
          },
        ],
      },
      {
        label: 'Vegetables',
        options: [
          {
            label: 'Beetroot',
            value: 'beetroot',
          },
          {
            label: 'Carrot',
            value: 'carrot',
          },
        ],
      },
    ];

    expect(genericSearch(options, 'rro', substringComparator)).toEqual([
      {
        label: 'Vegetables',
        options: [
          {
            label: 'Carrot',
            value: 'carrot',
          },
        ],
      },
    ]);
  });

  it('omits groups with no matching options even if the group label matches', () => {
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
    ];

    expect(genericSearch(options, 'Fruits', substringComparator)).toEqual([]);
  });

  it('does not duplicate a group whose label matches the search string', () => {
    const options = [
      {
        label: 'Apples',
        options: [
          {
            label: 'Apple Golden',
            value: 'apple-golden',
          },
          {
            label: 'Pear',
            value: 'pear',
          },
        ],
      },
    ];

    expect(genericSearch(options, 'Apple', substringComparator)).toEqual([
      {
        label: 'Apples',
        options: [
          {
            label: 'Apple Golden',
            value: 'apple-golden',
          },
        ],
      },
    ]);
  });

  it('returns empty array when nothing matches', () => {
    const options = [
      {
        label: 'Apple',
        value: 'apple',
      },
      {
        label: 'Vegetables',
        options: [
          {
            label: 'Carrot',
            value: 'carrot',
          },
        ],
      },
    ];

    expect(genericSearch(options, 'zzz', substringComparator)).toEqual([]);
  });
});
