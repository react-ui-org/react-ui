import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { colorPropTest } from '../../../../../../tests/propTests/colorPropTest';
import { idPropTest } from '../../../../../../tests/propTests/idPropTest';
import { Badge } from '../Badge';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  it.each([
    ...colorPropTest,
    ...idPropTest,
    [
      { label: 'label text' },
      (rootElement) => expect(within(rootElement).getByText('label text')),
    ],
    [
      { label: 111 },
      (rootElement) => expect(within(rootElement).getByText('111')),
    ],
    [
      { priority: 'filled' },
      (rootElement) => expect(rootElement).not.toHaveClass('rootPriorityOutline'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityOutline'),
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
