import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { colorPropTest } from '../../../../../tests/propTests/colorPropTest';
import { Badge } from '../Badge';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  it.each([
    ...colorPropTest,
    [
      { label: 'label text' },
      (rootElement) => expect(within(rootElement).getByText('label text')),
    ],
    [
      { priority: 'filled' },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootPriorityOutline'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityOutline'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Badge
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
