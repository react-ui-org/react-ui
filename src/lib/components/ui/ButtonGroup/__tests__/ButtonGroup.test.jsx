import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import Button from '../../Button';
import { ButtonGroup } from '../ButtonGroup';

const mandatoryProps = {
  children: [<Button label="label" />],
};

describe('rendering', () => {
  it.each([
    [
      { block: true },
      (rootElement) => expect(rootElement).toHaveClass('isRootBlock'),
    ],
    [
      { block: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootBlock'),
    ],
    [
      { children: [<Button label="label text" />] },
      (rootElement) => expect(within(rootElement).getByText('label text')),
    ],
    [
      { children: [] },
      (rootElement) => expect(rootElement).toBeInTheDocument(),
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
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('rootPriorityFilled'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('rootPriorityOutline'),
    ],
    [
      { priority: 'flat' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('rootPriorityFlat'),
    ],
    [
      { size: 'small' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('rootSizeSmall'),
    ],
    [
      { size: 'medium' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('rootSizeMedium'),
    ],
    [
      { size: 'large' },
      (rootElement) => expect(within(rootElement).getByRole('button')).toHaveClass('rootSizeLarge'),
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
