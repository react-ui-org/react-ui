import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { disabledPropTest } from '../../../../../tests/propTests/disabledPropTest';
import { refPropTest } from '../../../../../tests/propTests/refPropTest';
import { helpTextPropTest } from '../../../../../tests/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../../tests/providerTests/formLayoutProviderTest';
import { isLabelVisibleTest } from '../../../../../tests/propTests/isLabelVisibleTest';
import { labelPropTest } from '../../../../../tests/propTests/labelPropTest';
import { requiredPropTest } from '../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../tests/propTests/validationTextPropTest';
import { CheckboxField } from '../CheckboxField';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  formLayoutProviderTest(<CheckboxField {...mandatoryProps} />);

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
    ...requiredPropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <CheckboxField
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
      <CheckboxField
        {...mandatoryProps}
        onChange={spy}
      />
    ));

    userEvent.click(screen.getByLabelText('label'));
    expect(spy.calledOnce).toEqual(true);
  });
});

