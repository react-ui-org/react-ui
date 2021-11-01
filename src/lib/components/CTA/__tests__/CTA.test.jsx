import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { alignPropTest } from '../../../../../tests/propTests/alignPropTest';
import { CTA } from '../CTA';
import { CTACenter } from '../CTACenter';
import { CTAEnd } from '../CTAEnd';
import { CTAStart } from '../CTAStart';

const mandatoryProps = {
  children: <CTAStart>content text</CTAStart>,
};

describe('rendering', () => {
  it.each([
    ...alignPropTest,
    [
      {
        children: [
          <CTAStart key="1">start content text</CTAStart>,
          <CTAEnd key="2">end content text</CTAEnd>,
        ],
      },
      (rootElement) => {
        expect(within(rootElement).getByText('start content text'));
        expect(within(rootElement).getByText('end content text'));
      },
    ],
    [
      { children: <CTACenter>other content text</CTACenter> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <CTA
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
