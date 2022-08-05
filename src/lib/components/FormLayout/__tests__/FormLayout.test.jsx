import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { CheckboxField } from '../../CheckboxField';
import { Radio } from '../../Radio';
import { SelectField } from '../../SelectField';
import { TextArea } from '../../TextArea';
import { TextField } from '../../TextField';
import { Toggle } from '../../Toggle';
import { FormLayout } from '../FormLayout';
import { FormLayoutCustomField } from '../FormLayoutCustomField';

const defaultProps = {
  children: <FormLayoutCustomField id="nested-id">content</FormLayoutCustomField>,
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
    [
      { children: <FormLayoutCustomField>other content text</FormLayoutCustomField> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    [
      { children: <CheckboxField label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('checkbox')),
    ],
    [
      {
        children: (
          <Radio
            label="label"
            options={[{
              label: 'label',
              value: 'value',
            }]}
          />
        ),
      },
      (rootElement) => expect(within(rootElement).getByRole('radio')),
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
      (rootElement) => expect(within(rootElement).getByRole('combobox')),
    ],
    [
      { children: <TextArea label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('textbox')),
    ],
    [
      { children: <TextField label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('textbox')),
    ],
    [
      { children: <Toggle label="label" /> },
      (rootElement) => expect(within(rootElement).getByRole('checkbox')),
    ],
    [
      { fieldLayout: 'horizontal' },
      (rootElement) => {
        expect(rootElement).toHaveClass('rootFieldLayoutHorizontal');
        expect(within(rootElement).getByTestId('nested-id')).toHaveClass('rootLayoutHorizontal');
      },
    ],
    [
      { fieldLayout: 'vertical' },
      (rootElement) => {
        expect(rootElement).toHaveClass('rootFieldLayoutVertical');
        expect(within(rootElement).getByTestId('nested-id')).toHaveClass('rootLayoutVertical');
      },
    ],
    ...idPropTest,
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
