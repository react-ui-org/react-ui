import React from 'react';
import { shallow } from 'enzyme';
import ToolbarItem from '../ToolbarItem';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <ToolbarItem>
        <span>content</span>
      </ToolbarItem>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <ToolbarItem>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </ToolbarItem>
    ));

    expect(tree).toMatchSnapshot();
  });
});
