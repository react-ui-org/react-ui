import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalCloseButton } from '../ModalCloseButton.tsx';
import { refPropTest } from '../../../../tests/jest/propTests/refPropTest';

describe('rendering', () => {
  it.each([
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toBeDisabled(),
    ],
    ...refPropTest(React.createRef()),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ModalCloseButton
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls synthetic event onClick()', async () => {
    const spy = jest.fn();
    render((
      <ModalCloseButton
        onClick={spy}
      />
    ));

    await userEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalled();
  });
});

