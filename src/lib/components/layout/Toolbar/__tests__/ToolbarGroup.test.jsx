import React from 'react';
import { shallow } from 'enzyme';
import ToolbarGroup from '../ToolbarGroup';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <ToolbarGroup>
        <span>content</span>
      </ToolbarGroup>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <ToolbarGroup>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </ToolbarGroup>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <ToolbarGroup align="middle">
        <span>content</span>
      </ToolbarGroup>
    ));

    expect(tree).toMatchSnapshot();
  });
});
