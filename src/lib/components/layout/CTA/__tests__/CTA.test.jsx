import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { CTA } from '../CTA';
import { alignPropTest } from '../../../../../../tests/propTests/alignPropTest';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it.each([
    ...alignPropTest,
    [
      { children: <div>other content text</div> },
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
