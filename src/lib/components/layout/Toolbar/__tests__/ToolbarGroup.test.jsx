import React from 'react';
import { shallow } from 'enzyme';
import ToolbarGroup from '../ToolbarGroup';
import ToolbarItem from '../ToolbarItem';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <ToolbarGroup>
        <ToolbarItem>item</ToolbarItem>
      </ToolbarGroup>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <ToolbarGroup>
        <ToolbarItem>item 1</ToolbarItem>
        <ToolbarItem>item 2</ToolbarItem>
        <ToolbarItem>item 3</ToolbarItem>
      </ToolbarGroup>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <ToolbarGroup align="middle" dense nowrap>
        <ToolbarItem>item</ToolbarItem>
      </ToolbarGroup>
    ));

    expect(tree).toMatchSnapshot();
  });
});
