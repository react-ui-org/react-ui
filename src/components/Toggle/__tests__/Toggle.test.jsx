import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../Toggle';
import { disabledPropTest } from '../../../../tests/jest/propTests/disabledPropTest';
import { refPropTest } from '../../../../tests/jest/propTests/refPropTest';
import { helpTextPropTest } from '../../../../tests/jest/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../tests/jest/providerTests/formLayoutProviderTest';
import { isLabelVisibleTest } from '../../../../tests/jest/propTests/isLabelVisibleTest';
import { labelPropTest } from '../../../../tests/jest/propTests/labelPropTest';
import { renderAsRequiredPropTest } from '../../../../tests/jest/propTests/renderAsRequiredPropTest';
import { requiredPropTest } from '../../../../tests/jest/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../tests/jest/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../tests/jest/propTests/validationTextPropTest';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  formLayoutProviderTest(<Toggle {...mandatoryProps} />);

  it.each([
    ...disabledPropTest,
    ...refPropTest(React.createRef()),
    ...helpTextPropTest,
    [
      {
        helpText: 'help text',
        id: 'id',
        validationText: 'validation text',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id__label');
        expect(within(rootElement).getByTestId('id'));
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
      },
    ],
    ...isLabelVisibleTest(),
    ...labelPropTest(),
    [
      { labelPosition: 'before' },
      (rootElement) => expect(rootElement).toHaveClass('hasRootLabelBefore'),
    ],
    [
      { labelPosition: 'after' },
      (rootElement) => expect(rootElement).not.toHaveClass('hasRootLabelBefore'),
    ],
    ...renderAsRequiredPropTest,
    ...requiredPropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Toggle
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls synthetic event onChange() on toggling', async () => {
    const spy = jest.fn();
    render((
      <Toggle
        {...mandatoryProps}
        onChange={spy}
      />
    ));

    await userEvent.click(screen.getByRole('checkbox'));
    expect(spy).toHaveBeenCalled();
  });
});
