import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { tagPropTest } from '../../../../tests/jest/propTests/tagPropTest';
import { PopoverWrapper } from '../PopoverWrapper.tsx';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...tagPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <PopoverWrapper
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
