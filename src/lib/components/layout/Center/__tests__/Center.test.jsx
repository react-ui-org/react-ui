import React from 'react';
import { render } from '@testing-library/react';
import { Center } from '../Center';

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(rootElement).not.toHaveClass('rootPriorityOutline'),
    ],
    [
      { children: null },
      (rootElement) => expect(rootElement).toBeInTheDocument(),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Center
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
