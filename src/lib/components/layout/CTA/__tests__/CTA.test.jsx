import React from 'react';
import { shallow } from 'enzyme';
import { CTA } from '../CTA';
import { CTACenter } from '../CTACenter';
import { CTAEnd } from '../CTAEnd';
import { CTAStart } from '../CTAStart';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <CTA>
        <CTACenter>content</CTACenter>
      </CTA>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <CTA>
        <CTAStart>content 1</CTAStart>
        <CTACenter>content 2</CTACenter>
        <CTAEnd>content 3</CTAEnd>
      </CTA>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <CTA align="middle">
        <CTAStart>content 1</CTAStart>
        <CTACenter>content 2</CTACenter>
        <CTAEnd>content 3</CTAEnd>
      </CTA>
    ));

    expect(tree).toMatchSnapshot();
  });
});
