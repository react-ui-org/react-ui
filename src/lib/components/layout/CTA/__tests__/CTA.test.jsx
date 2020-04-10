import React from 'react';
import { shallow } from 'enzyme';
import CTA from '../CTA';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <CTA>
        <span>content</span>
      </CTA>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <CTA>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </CTA>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <CTA align="middle">
        <span>content</span>
      </CTA>
    ));

    expect(tree).toMatchSnapshot();
  });
});
