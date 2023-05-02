import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { disabledPropTest } from '../../../../tests/propTests/disabledPropTest';
import { refPropTest } from '../../../../tests/propTests/refPropTest';
import { helpTextPropTest } from '../../../../tests/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../tests/providerTests/formLayoutProviderTest';
import { isLabelVisible } from '../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../tests/propTests/labelPropTest';
import { requiredPropTest } from '../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../tests/propTests/validationTextPropTest';
import { CheckboxField } from './CheckboxField';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  formLayoutProviderTest(<CheckboxField {...mandatoryProps} />);

  it.each<TestingProps>([
    ...(disabledPropTest as unknown as TestingProps[]),
    ...(refPropTest(React.createRef()) as unknown as TestingProps[]),
    ...(helpTextPropTest as unknown as TestingProps[]),
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
    ...(isLabelVisible as unknown as TestingProps[]),
    ...(labelPropTest as unknown as TestingProps[]),
    ...(requiredPropTest as unknown as TestingProps[]),
    ...(validationStatePropTest as unknown as TestingProps[]),
    ...(validationTextPropTest as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <CheckboxField
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});

describe('functionality', () => {
  it('calls synthetic event onChange()', () => {
    const spy = sinon.spy();
    render((
      <CheckboxField
        {...mandatoryProps}
        onChange={spy}
      />
    ));

    userEvent.click(screen.getByLabelText('label'));
    expect(spy.calledOnce).toEqual(true);
  });
});

