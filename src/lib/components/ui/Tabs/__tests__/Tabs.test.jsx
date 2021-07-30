import React from 'react';
import { shallow } from 'enzyme';
import { Tabs } from '../Tabs';
import { TabsItem } from '../TabsItem';

describe('rendering', () => {
  it('renders correctly without children', () => {
    const tree = shallow(
      <Tabs />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    const tree = shallow(
      <Tabs id="my-tabs">
        <TabsItem label="item 1" href="/item-1" />
        <TabsItem label="item 2" href="/item-2" />
        <TabsItem label="item 3" href="/item-3" />
      </Tabs>,
    );

    expect(tree).toMatchSnapshot();
  });
});
