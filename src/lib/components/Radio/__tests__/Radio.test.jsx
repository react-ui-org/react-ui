import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { helpTextPropTest } from '../../../../../tests/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../../tests/providerTests/formLayoutProviderTest';
import { isLabelVisible } from '../../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../tests/propTests/validationTextPropTest';
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
        expect(rootElement).toHaveClass('isRootDisabled');
        expect(within(rootElement).getByLabelText('option 1')).toBeDisabled();
      },
    ],
    [
      { disabled: false },
      (rootElement) => {
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
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
        expect(within(rootElement).getByTestId('id__item__1'));
        expect(within(rootElement).getByTestId('id__item__custom_key'));
        expect(within(rootElement).getByTestId('id__item__1__label'));
        expect(within(rootElement).getByTestId('id__item__custom_key__label'));
        expect(within(rootElement).getByText('option 1')).toHaveAttribute('id', 'id__item__1__labelText');
        expect(within(rootElement).getByText('option 2')).toHaveAttribute('id', 'id__item__custom_key__labelText');
      },
    ],
    ...isLabelVisible,
    ...labelPropTest,
    ...layoutPropTest,
    [
      { options: mandatoryProps.options },
      (rootElement) => {
        expect(within(rootElement).getByLabelText('option 1')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByLabelText('option 2')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByLabelText('option 2')).toBeDisabled();
      },
    ],
    ...requiredPropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
    [
      {
        onChange: () => {},
        value: 'option2',
      },
      (rootElement) => expect(within(rootElement).getByLabelText('option 2')).toHaveAttribute('checked'),
    ],
    [
      {
        onChange: () => {},
        value: 1,
      },
      (rootElement) => expect(within(rootElement).getByLabelText('option 1')).toHaveAttribute('checked'),
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
  it('calls synthetic event onChange()', () => {
    const spy = sinon.spy();
    render((
      <Radio
        {...mandatoryProps}
        onChange={spy}
      />
    ));

    userEvent.click(screen.getByText('option 1'));
    expect(spy.calledOnce).toEqual(true);
  });
});
