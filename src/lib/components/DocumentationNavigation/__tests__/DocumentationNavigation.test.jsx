import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DocumentationNavigation from '..';

describe('rendering', () => {
  const navigationTreeSingleItem = [
    {
      link: '#anchor',
      title: 'Single item',
    },
  ];
  const navigationTreeMultipleItems = [
    {
      link: '#anchor1',
      title: 'Multiple items 1',
    },
    {
      link: '#anchor2',
      title: 'Multiple items 2',
    },
    {
      link: '#anchor3',
      title: 'Multiple items 3',
    },
  ];
  const navigationTreeNestedItems = [
    {
      items: [
        {
          link: '#anchor1a',
          title: 'Nested items 1 a',
        },
        {
          link: '#anchor1b',
          title: 'Nested items 1 b',
        },
      ],
      link: '#anchor1',
      title: 'Nested items 1',
    },
    {
      link: '#anchor2',
      title: 'Nested items 2',
    },
    {
      link: '#anchor3',
      title: 'Nested items 3',
    },
  ];

  it('renders correctly with single item', () => {
    const tree = shallow(<DocumentationNavigation tree={navigationTreeSingleItem} />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with multiple items', () => {
    const tree = shallow(<DocumentationNavigation tree={navigationTreeMultipleItems} />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with nested items', () => {
    const tree = shallow(<DocumentationNavigation tree={navigationTreeNestedItems} />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
