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
import { fullWidthPropTest } from '../../../../tests/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../tests/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../tests/providerTests/formLayoutProviderTest';
import { isLabelVisible } from '../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../tests/propTests/requiredPropTest';
import { sizePropTest } from '../../../../tests/propTests/sizePropTest';
import { validationStatePropTest } from '../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../tests/propTests/validationTextPropTest';
import { variantPropTest } from '../../../../tests/propTests/variantPropTest';
import { SelectField } from './SelectField';

const mandatoryProps = {
  label: 'label',
  options: [
    {
      label: 'option 1',
      value: 1,
    },
    {
      disabled: true,
      key: 'key',
      label: 'option 2',
      value: 'option2',
    },
  ],
};

const optgroupOptions = [
  {
    key: 'optgroup_key',
    label: 'optgroup',
    options: [
      {
        label: 'option 3',
        value: 3,
      },
      {
        disabled: true,
        key: 'key',
        label: 'option 4',
        value: 'option4',
      },
    ],
  },
];

describe('rendering', () => {
  formLayoutProviderTest(<SelectField {...mandatoryProps} />);

  const ref = React.createRef() as React.RefObject<HTMLSelectElement>;

  it.each<TestingProps>([
    ...(disabledPropTest as unknown as TestingProps[]),
    ...(refPropTest(ref) as unknown as TestingProps[]),
    ...(fullWidthPropTest as unknown as TestingProps[]),
    ...(helpTextPropTest as unknown as TestingProps[]),
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
    ...(isLabelVisible as unknown as TestingProps[]),
    ...(labelPropTest as unknown as TestingProps[]),
    ...(layoutPropTest as unknown as TestingProps[]),
    [
      {
        id: 'id',
        options: mandatoryProps.options,
      },
      (rootElement) => {
        expect(within(rootElement).getByText('option 1')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByText('option 2')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByText('option 2')).toBeDisabled();
        expect(within(rootElement).getByText('option 1')).toHaveAttribute('id', 'id__item__1');
        expect(within(rootElement).getByText('option 2')).toHaveAttribute('id', 'id__item__key');
      },
    ],
    [
      {
        id: 'id',
        options: optgroupOptions,
      },
      (rootElement) => {
        expect(within(rootElement).getByText('option 3')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByText('option 4')).not.toHaveAttribute('checked');
        expect(within(rootElement).getByText('option 4')).toBeDisabled();
        expect(within(rootElement).getByText('option 3')).toHaveAttribute('id', 'id__item__3');
        expect(within(rootElement).getByText('option 4')).toHaveAttribute('id', 'id__item__key');
      },
    ],
    ...(requiredPropTest as unknown as TestingProps[]),
    ...(sizePropTest as unknown as TestingProps[]),
    ...(validationStatePropTest as unknown as TestingProps[]),
    ...(validationTextPropTest as unknown as TestingProps[]),
    ...(variantPropTest as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <SelectField
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});

describe('functionality', () => {
  it('calls synthetic event onChange() on changing selected option', () => {
    const spy = sinon.spy();

    const testedProps = {
      onChange: spy,
      value: 'option2',
    };

    render((
      <SelectField
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    userEvent.selectOptions(screen.getByDisplayValue('option 2'), '1');
    expect(spy.calledOnce).toEqual(true);
  });
});
