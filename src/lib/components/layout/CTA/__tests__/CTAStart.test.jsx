import React from 'react';
import { shallow } from 'enzyme';
import { CTAStart } from '../CTAStart';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <CTAStart>
        <span>content</span>
      </CTAStart>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <CTAStart>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </CTAStart>
    ));

    expect(tree).toMatchSnapshot();
  });
});
