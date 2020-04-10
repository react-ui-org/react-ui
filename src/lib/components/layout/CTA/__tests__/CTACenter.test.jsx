import React from 'react';
import { shallow } from 'enzyme';
import CTACenter from '../CTACenter';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <CTACenter>
        <span>content</span>
      </CTACenter>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <CTACenter>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </CTACenter>
    ));

    expect(tree).toMatchSnapshot();
  });
});
