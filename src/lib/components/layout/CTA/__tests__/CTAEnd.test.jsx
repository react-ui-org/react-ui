import React from 'react';
import { shallow } from 'enzyme';
import { CTAEnd } from '../CTAEnd';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <CTAEnd>
        <span>content</span>
      </CTAEnd>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <CTAEnd>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </CTAEnd>
    ));

    expect(tree).toMatchSnapshot();
  });
});
