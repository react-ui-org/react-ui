import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { labelPropTest } from '../../../../tests/jest/propTests/labelPropTest';
import { Button } from '../../Button';
import { SelectField } from '../../SelectField';
import { TextField } from '../../TextField';
import { childrenEmptyPropTest } from '../../../../tests/jest/propTests/childrenEmptyPropTest';
import { isLabelVisibleTest } from '../../../../tests/jest/propTests/isLabelVisibleTest';
import { layoutPropTest } from '../../../../tests/jest/propTests/layoutPropTest';
import { InputGroup } from '../InputGroup';

const mandatoryProps = {
  children: [
    <TextField key="text field" label="text field" />,
    <SelectField
      key="select field"
      label="select field"
      options={[{
        label: 'option 1',
        value: 1,
      }]}
    />,
    <Button key="button" label="button" />,
  ],
  label: 'label',
};

describe('rendering', () => {
  it.each([
    ...childrenEmptyPropTest,
    [
      {},
      (rootElement) => {
        expect(within(rootElement).getByText('text field').closest('label')).toHaveClass('isRootGrouped');
        expect(within(rootElement).getByText('select field').closest('label')).toHaveClass('isRootGrouped');
        expect(within(rootElement).getByRole('button')).toHaveClass('isRootInInputGroup');
      },
    ],
    [
      { disabled: true },
      (rootElement) => {
        expect(rootElement).toBeDisabled();
        expect(within(rootElement).getByRole('textbox')).toBeDisabled();
        expect(within(rootElement).getByRole('combobox')).toBeDisabled();
        expect(within(rootElement).getByRole('button')).toBeDisabled();
      },
    ],
    [
      {
        id: 'id',
        label: 'label',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByTestId('id__group'));
        expect(within(rootElement).getByTestId('id__label'));
        expect(within(rootElement).getByTestId('id__displayLabel'));
      },
    ],
    ...isLabelVisibleTest('legend'),
    ...labelPropTest('legend'),
    ...layoutPropTest,
    [
      { size: 'small' },
      (rootElement) => {
        expect(within(rootElement).getByText('text field').closest('label')).toHaveClass('isRootSizeSmall');
        expect(within(rootElement).getByText('select field').closest('label')).toHaveClass('isRootSizeSmall');
        expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeSmall');
      },
    ],
    [
      { size: 'medium' },
      (rootElement) => {
        expect(within(rootElement).getByText('text field').closest('label')).toHaveClass('isRootSizeMedium');
        expect(within(rootElement).getByText('select field').closest('label')).toHaveClass('isRootSizeMedium');
        expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeMedium');
      },
    ],
    [
      { size: 'large' },
      (rootElement) => {
        expect(within(rootElement).getByText('text field').closest('label')).toHaveClass('isRootSizeLarge');
        expect(within(rootElement).getByText('select field').closest('label')).toHaveClass('isRootSizeLarge');
        expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeLarge');
      },
    ],
    [
      {
        validationTexts: [
          'validation text 1',
          'validation text 2',
        ],
      },
      (rootElement) => {
        expect(within(rootElement).getByText('validation text 1'));
        expect(within(rootElement).getByText('validation text 2'));
      },
    ],
    [
      { required: true },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootRequired');
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <InputGroup
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
