import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../Toolbar';
import ToolbarGroup from '../ToolbarGroup';
import ToolbarItem from '../ToolbarItem';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Toolbar>
        <ToolbarItem>item</ToolbarItem>
      </Toolbar>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Toolbar>
        <ToolbarItem>item 1</ToolbarItem>
        <ToolbarItem>item 2</ToolbarItem>
        <ToolbarItem>item 3</ToolbarItem>
      </Toolbar>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children and groups', () => {
    const tree = shallow((
      <Toolbar>
        <ToolbarItem>item 1</ToolbarItem>
        <ToolbarItem>item 2</ToolbarItem>
        <ToolbarItem>item 3</ToolbarItem>
        <ToolbarGroup>
          <ToolbarItem>group item 1</ToolbarItem>
          <ToolbarItem>group item 2</ToolbarItem>
          <ToolbarItem>group item 3</ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with group and all props', () => {
    const tree = shallow((
      <Toolbar align="middle" justify="space-between" dense nowrap>
        <ToolbarItem>item 1</ToolbarItem>
        <ToolbarItem>item 2</ToolbarItem>
        <ToolbarItem>item 3</ToolbarItem>
        <ToolbarGroup>
          <ToolbarItem>group item 1</ToolbarItem>
          <ToolbarItem>group item 2</ToolbarItem>
          <ToolbarItem>group item 3</ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    ));

    expect(tree).toMatchSnapshot();
  });
});
