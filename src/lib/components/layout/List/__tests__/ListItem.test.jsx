import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../ListItem';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <ListItem />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <ListItem>
        <span>content</span>
      </ListItem>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <ListItem>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </ListItem>
    ));

    expect(tree).toMatchSnapshot();
  });
});
