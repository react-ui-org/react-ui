import React from 'react';
import { shallow } from 'enzyme';
import List from '../List';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <List />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <List>
        <span>content</span>
      </List>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <List>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </List>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children and all props', () => {
    const tree = shallow((
      <List align="right" autoWidth>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </List>
    ));

    expect(tree).toMatchSnapshot();
  });
});
