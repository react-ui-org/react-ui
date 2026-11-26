import { mergeDeep } from '../mergeDeep';

describe('mergeDeep', () => {
  it('adds new attributes', () => {
    const obj1 = {};
    const obj2 = {
      props: {
        className: 'class',
        style: {
          color: 'white',
        },
      },
      state: {
        items: [1, 2],
        itemsSize: 2,
      },
    };
    const expectedObj = {
      props: {
        className: 'class',
        style: {
          color: 'white',
        },
      },
      state: {
        items: [1, 2],
        itemsSize: 2,
      },
    };

    expect(mergeDeep(obj1, obj2)).toEqual(expectedObj);
  });

  it('merges with existing attributes', () => {
    const obj1 = {
      props: {
        children: ['child1', 'child2'],
        className: 'class',
        parent: 'parent',
        style: {
          color: 'white',
        },
      },
      state: {
        items: [1, 2],
        itemsSize: 2,
      },
    };
    const obj2 = {
      props: {
        children: null,
        className: 'class1 class2',
        style: {
          backgroundColor: 'black',
        },
      },
      state: {
        items: [3, 4, 5],
        itemsSize: 3,
      },
    };
    const expectedObj = {
      props: {
        children: null,
        className: 'class1 class2',
        parent: 'parent',
        style: {
          backgroundColor: 'black',
          color: 'white',
        },
      },
      state: {
        items: [3, 4, 5],
        itemsSize: 3,
      },
    };

    expect(mergeDeep(obj1, obj2)).toEqual(expectedObj);
  });
});
