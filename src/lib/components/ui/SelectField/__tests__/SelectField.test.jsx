import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectField } from '../SelectField';
import { disabledPropTest } from '../../../../../../tests/propTests/disabledPropTest';
import { forwardedRefPropTest } from '../../../../../../tests/propTests/forwardedRefPropTest';
import { fullWidthPropTest } from '../../../../../../tests/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../../../tests/propTests/helpTextPropTest';
import { inFormLayoutProviderTest } from '../../../../../../tests/providerTests/inFormLayoutProviderTest';
import { isLabelVisible } from '../../../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../../tests/propTests/requiredPropTest';
import { sizePropTest } from '../../../../../../tests/propTests/sizePropTest';
import { validationStatePropTest } from '../../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../../tests/propTests/validationTextPropTest';
import { variantPropTest } from '../../../../../../tests/propTests/variantPropTest';

const mandatoryProps = {
  label: 'label',
  options: [
    {
      label: 'option 1',
      value: 1,
    },
    {
      disabled: true,
      label: 'option 2',
      value: 'option2',
    },
  ],
};

describe('rendering', () => {
  inFormLayoutProviderTest(<SelectField {...mandatoryProps} />);

  it.each([
    ...disabledPropTest,
    ...forwardedRefPropTest(React.createRef()),
    ...fullWidthPropTest,
    ...helpTextPropTest,
    [
      {
        helpText: 'help text',
        id: 'id',
        validationText: 'validation text',
      },
      (rootElement) => {
        expect(within(rootElement).getByTestId('id'));
        expect(rootElement).toHaveAttribute('id', 'id__label');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
        expect(within(rootElement).getByTestId('id__item__1'));
      },
    ],
    ...isLabelVisible,
    ...labelPropTest,
    ...layoutPropTest,
    [
      { options: mandatoryProps.options },
      (rootElement) => {
        expect(within(rootElement).getByText('option 1')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByText('option 2')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByText('option 2')).toBeDisabled();
      },
    ],
    ...requiredPropTest,
    ...sizePropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
    [
      {
        changeHandler: () => {},
        value: 'option2',
      },
      (rootElement) => expect(within(rootElement).getByDisplayValue('option 2')),
    ],
    [
      {
        changeHandler: () => {},
        value: 1,
      },
      (rootElement) => expect(within(rootElement).getByDisplayValue('option 1')),
    ],
    ...variantPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <SelectField
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls changeHandler() on changing selected option', () => {
    const spy = sinon.spy();
    render((
      <SelectField
        {...mandatoryProps}
        changeHandler={spy}
        value="option2"
      />
    ));

    userEvent.selectOptions(screen.getByDisplayValue('option 2'), '1');
    expect(spy.calledOnce).toEqual(true);
  });
});
