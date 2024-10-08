import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { feedbackColorPropTest } from '../../../../tests/propTests/feedbackColorPropTest';
import { neutralColorPropTest } from '../../../../tests/propTests/neutralColorPropTest';
import { Badge } from '../Badge';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  it.each([
    ...feedbackColorPropTest,
    ...neutralColorPropTest,
    [
      { label: 'label text' },
      (rootElement) => expect(within(rootElement).getByText('label text')),
    ],
    [
      { priority: 'filled' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityFilled'),
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
