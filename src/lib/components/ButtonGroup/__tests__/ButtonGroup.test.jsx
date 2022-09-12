import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { blockPropTest } from '../../../../../tests/propTests/blockPropTest';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { Button } from '../../Button';
import { ButtonGroup } from '../ButtonGroup';

const mandatoryProps = {
  children: <Button label="label" />,
};

describe('rendering', () => {
  it.each([
    ...blockPropTest,
    ...childrenEmptyPropTest,
    [
      { children: <Button label="label text" /> },
      (rootElement) => expect(within(rootElement).getByText('label text')),
    ],
    [
      { disabled: true },
      (rootElement) => expect(within(rootElement).getByRole('button')).toBeDisabled(),
    ],
    [
      { disabled: false },
      (rootElement) => expect(within(rootElement).getByRole('button')).not.toBeDisabled(),
    ],
    [
      { priority: 'filled' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('isRootPriorityFilled'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('isRootPriorityOutline'),
    ],
    [
      { priority: 'flat' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('isRootPriorityFlat'),
    ],
    [
      { size: 'small' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeSmall'),
    ],
    [
      { size: 'medium' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeMedium'),
    ],
    [
      { size: 'large' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeLarge'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ButtonGroup
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
