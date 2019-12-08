import React from 'react';
import { shallow } from 'enzyme';
import CardList from '../CardList';

describe('rendering', () => {
  it('renders correctly with no children', () => {
    const tree = shallow((
      <CardList />
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a single child', () => {
    const tree = shallow((
      <CardList>
        <span>content</span>
      </CardList>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <CardList>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </CardList>
    ));

    expect(tree).toMatchSnapshot();
  });
});
