import React from 'react';
import { shallow } from 'enzyme';
import Media from '../Media';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Media>
        <span>content</span>
      </Media>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Media>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </Media>
    ));

    expect(tree).toMatchSnapshot();
  });
});
