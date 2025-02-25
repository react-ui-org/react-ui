import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectField } from '../SelectField';
import { disabledPropTest } from '../../../../tests/jest/propTests/disabledPropTest';
import { refPropTest } from '../../../../tests/jest/propTests/refPropTest';
import { fullWidthPropTest } from '../../../../tests/jest/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../tests/jest/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../tests/jest/providerTests/formLayoutProviderTest';
import { isLabelVisibleTest } from '../../../../tests/jest/propTests/isLabelVisibleTest';
import { labelPropTest } from '../../../../tests/jest/propTests/labelPropTest';
import { layoutPropTest } from '../../../../tests/jest/propTests/layoutPropTest';
import { renderAsRequiredPropTest } from '../../../../tests/jest/propTests/renderAsRequiredPropTest';
import { requiredPropTest } from '../../../../tests/jest/propTests/requiredPropTest';
import { sizePropTest } from '../../../../tests/jest/propTests/sizePropTest';
import { validationStatePropTest } from '../../../../tests/jest/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../tests/jest/propTests/validationTextPropTest';
import { variantPropTest } from '../../../../tests/jest/propTests/variantPropTest';

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

  it.each([
    ...disabledPropTest,
    ...refPropTest(React.createRef()),
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
    ...isLabelVisibleTest(),
    ...labelPropTest(),
    ...layoutPropTest,
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
    ...renderAsRequiredPropTest,
    ...requiredPropTest,
    ...sizePropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
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
  it('calls synthetic event onChange() on changing selected option', async () => {
    const spy = jest.fn();
    render((
      <SelectField
        {...mandatoryProps}
        onChange={spy}
        value="option2"
      />
    ));

    await userEvent.selectOptions(screen.getByDisplayValue('option 2'), '1');
    expect(spy).toHaveBeenCalled();
  });
});
