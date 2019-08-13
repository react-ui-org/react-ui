import React from 'react';
import { shallow } from 'enzyme';
import RowLeft from '../RowLeft';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <RowLeft>
        <span>content</span>
      </RowLeft>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <RowLeft>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </RowLeft>
    ));

    expect(tree).toMatchSnapshot();
  });
});
