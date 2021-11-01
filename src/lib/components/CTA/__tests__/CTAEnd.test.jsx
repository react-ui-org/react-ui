import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { CTAEnd } from '../CTAEnd';

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <CTAEnd
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
