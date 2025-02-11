import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { helpTextPropTest } from '../../../../tests/jest/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../tests/jest/providerTests/formLayoutProviderTest';
import { isLabelVisibleTest } from '../../../../tests/jest/propTests/isLabelVisibleTest';
import { labelPropTest } from '../../../../tests/jest/propTests/labelPropTest';
import { layoutPropTest } from '../../../../tests/jest/propTests/layoutPropTest';
import { renderAsRequiredPropTest } from '../../../../tests/jest/propTests/renderAsRequiredPropTest';
import { requiredPropTest } from '../../../../tests/jest/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../tests/jest/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../tests/jest/propTests/validationTextPropTest';
import { Radio } from '../Radio';

const mandatoryProps = {
  label: 'label',
  options: [
    {
      label: 'option 1',
      value: 1,
    },
    {
      disabled: true,
      key: 'custom_key',
      label: 'option 2',
      value: 'option2',
    },
  ],
};

describe('rendering', () => {
  formLayoutProviderTest(<Radio {...mandatoryProps} />);

  it.each([
    [
      { disabled: true },
      (rootElement) => {
        expect(rootElement).toBeDisabled();
        expect(rootElement).toHaveClass('isRootDisabled');
        expect(within(rootElement).getByLabelText('option 1')).toBeDisabled();
      },
    ],
    [
      { disabled: false },
      (rootElement) => {
        expect(rootElement).not.toBeDisabled();
        expect(rootElement).not.toHaveClass('isRootDisabled');
        expect(within(rootElement).getByLabelText('option 1')).not.toBeDisabled();
      },
    ],
    ...helpTextPropTest,
    [
      {
        helpText: 'help text',
        id: 'id',
        validationText: 'validation text',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByTestId('id__label'));
        expect(within(rootElement).getByTestId('id__displayLabel'));
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
        expect(within(rootElement).getByTestId('id__item__1'));
        expect(within(rootElement).getByTestId('id__item__custom_key'));
        expect(within(rootElement).getByTestId('id__item__1__label'));
        expect(within(rootElement).getByTestId('id__item__custom_key__label'));
        expect(within(rootElement).getByText('option 1')).toHaveAttribute('id', 'id__item__1__labelText');
        expect(within(rootElement).getByText('option 2')).toHaveAttribute('id', 'id__item__custom_key__labelText');
      },
    ],
    ...isLabelVisibleTest('legend'),
    ...labelPropTest('legend'),
    ...layoutPropTest,
    [
      { options: mandatoryProps.options },
      (rootElement) => {
        expect(within(rootElement).getByLabelText('option 1')).not.toBeChecked();
        expect(within(rootElement).getByLabelText('option 2')).not.toBeChecked();
        expect(within(rootElement).getByLabelText('option 2')).toBeDisabled();
      },
    ],
    ...renderAsRequiredPropTest,
    ...requiredPropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
    [
      {
        onChange: () => {},
        value: 'option2',
      },
      (rootElement) => expect(within(rootElement).getByLabelText('option 2')).toBeChecked(),
    ],
    [
      {
        onChange: () => {},
        value: 1,
      },
      (rootElement) => expect(within(rootElement).getByLabelText('option 1')).toBeChecked(),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Radio
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls synthetic event onChange()', async () => {
    const spy = jest.fn();
    render((
      <Radio
        {...mandatoryProps}
        onChange={spy}
      />
    ));

    await userEvent.click(screen.getByText('option 1'));
    expect(spy).toHaveBeenCalled();
  });
});
