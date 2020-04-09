import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '../Toolbar';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Toolbar>
        <span>content</span>
      </Toolbar>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Toolbar>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </Toolbar>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <Toolbar align="middle">
        <span>content</span>
      </Toolbar>
    ));

    expect(tree).toMatchSnapshot();
  });
});
