import React from 'react';
import { shallow } from 'enzyme';
import RowStart from '../RowStart';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <RowStart>
        <span>content</span>
      </RowStart>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <RowStart>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </RowStart>
    ));

    expect(tree).toMatchSnapshot();
  });
});
