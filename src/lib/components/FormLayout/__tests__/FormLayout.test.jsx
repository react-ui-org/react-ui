import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { Button } from '../../Button';
import { CheckboxField } from '../../CheckboxField';
import { InputGroup } from '../../InputGroup';
import { Radio } from '../../Radio';
import { SelectField } from '../../SelectField';
import { TextArea } from '../../TextArea';
import { TextField } from '../../TextField';
import { Toggle } from '../../Toggle';
import { FormLayout } from '../FormLayout';
import { FormLayoutCustomField } from '../FormLayoutCustomField';

const defaultProps = {
  children: <FormLayoutCustomField id="custom-field-id">content</FormLayoutCustomField>,
};

describe('rendering', () => {
  it('renders with no children', () => {
    const dom = render((
      <FormLayout />
    ));

    expect(dom.container.firstChild).toBeNull();
  });

  it.each([
    [
      { autoWidth: true },
      (rootElement) => expect(rootElement).toHaveClass('isRootAutoWidth'),
    ],
    [
      { autoWidth: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootAutoWidth'),
    ],
    ...childrenEmptyPropTest,
    ...idPropTest,
    [
      { children: <FormLayoutCustomField>other content text</FormLayoutCustomField> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    [
      { children: <CheckboxField label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('checkbox').closest('label')).toHaveClass('isRootInFormLayout'),
    ],
    [
      {
        children: (
          <InputGroup id="input-group-id" label="input group">
            <TextField key="text field" label="text field" />
            <Button key="button" label="button" />
          </InputGroup>
        ),
      },
      (rootElement) => expect(within(rootElement).getByTestId('input-group-id')).toHaveClass('isRootInFormLayout'),
    ],
    [
      {
        children: (
          <Radio
            id="radio-id"
            label="label"
            options={[{
              label: 'label',
              value: 'value',
            }]}
          />
        ),
      },
      (rootElement) => expect(within(rootElement).getByTestId('radio-id')).toHaveClass('isRootInFormLayout'),
    ],
    [
      {
        children: (
          <SelectField
            label="label"
            options={[{
              label: 'label',
              value: 'value',
            }]}
          />
        ),
      },
      (rootElement) => expect(within(rootElement).getByRole('combobox').closest('label')).toHaveClass('isRootInFormLayout'),
    ],
    [
      { children: <TextArea label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('textbox').closest('label')).toHaveClass('isRootInFormLayout'),
    ],
    [
      { children: <TextField label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('textbox').closest('label')).toHaveClass('isRootInFormLayout'),
    ],
    [
      { children: <Toggle label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('checkbox').closest('label')).toHaveClass('isRootInFormLayout'),
    ],
    [
      { fieldLayout: 'horizontal' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootFieldLayoutHorizontal');
        expect(within(rootElement).getByTestId('custom-field-id')).toHaveClass('isRootLayoutHorizontal');
      },
    ],
    [
      { fieldLayout: 'vertical' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootFieldLayoutVertical');
        expect(within(rootElement).getByTestId('custom-field-id')).toHaveClass('isRootLayoutVertical');
      },
    ],
    [
      {
        fieldLayout: 'horizontal',
        labelWidth: 'auto',
      },
      (rootElement) => expect(rootElement).toHaveClass('hasRootLabelWidthAuto'),
    ],
    [
      {
        fieldLayout: 'horizontal',
        labelWidth: 'default',
      },
      (rootElement) => expect(rootElement).toHaveClass('hasRootLabelWidthDefault'),
    ],
    [
      {
        fieldLayout: 'horizontal',
        labelWidth: 'limited',
      },
      (rootElement) => expect(rootElement).toHaveClass('hasRootLabelWidthLimited'),
    ],
    [
      {
        fieldLayout: 'horizontal',
        labelWidth: '300px',
      },
      (rootElement) => {
        expect(rootElement).toHaveStyle({ '--rui-custom-label-width': '300px' });
        expect(rootElement).toHaveClass('hasRootLabelWidthCustom');
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FormLayout
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
