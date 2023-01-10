import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Button } from '../../Button';
import { SelectField } from '../../SelectField';
import { TextField } from '../../TextField';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { InputGroup } from '../InputGroup';

const mandatoryProps = {
  children: [
    <TextField key="Text field" label="Text field" />,
    <SelectField
      key="Select field"
      label="Select field"
      options={[{
        label: 'label',
        value: 'value',
      }]}
    />,
    <Button key="Button" label="Button" />,
  ],
  label: 'Input group label',
};

describe('rendering', () => {
  it.each([
    ...childrenEmptyPropTest,
    [
      {},
      (rootElement) => {
        expect(within(rootElement).getByText('Input group label'));
        expect(within(rootElement).getByText('Text field'));
        expect(within(rootElement).getByText('Select field'));
        expect(within(rootElement).getByText('Button'));
      },
    ],
    [
      { isLabelVisible: false },
      (rootElement) => expect(within(rootElement).getByText('Input group label')).toHaveClass('isLabelHidden'),
    ],
    [
      {},
      (rootElement) => expect(within(rootElement).getByText('Input group label').closest('label')).toHaveClass('isRootLayoutHorizontal'),
    ],
    [
      { layout: 'vertical' },
      (rootElement) => expect(within(rootElement).getByText('Input group label').closest('label')).toHaveClass('isRootLayoutVertical'),
    ],
    [
      { size: 'small' },
      (rootElement) => {
        expect(within(rootElement).getByText('Text field').closest('label')).toHaveClass('isRootSizeSmall');
        expect(within(rootElement).getByText('Select field').closest('label')).toHaveClass('isRootSizeSmall');
        expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeSmall');
      },
    ],
    [
      { size: 'medium' },
      (rootElement) => {
        expect(within(rootElement).getByText('Text field').closest('label')).toHaveClass('isRootSizeMedium');
        expect(within(rootElement).getByText('Select field').closest('label')).toHaveClass('isRootSizeMedium');
        expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeMedium');
      },
    ],
    [
      { size: 'large' },
      (rootElement) => {
        expect(within(rootElement).getByText('Text field').closest('label')).toHaveClass('isRootSizeLarge');
        expect(within(rootElement).getByText('Select field').closest('label')).toHaveClass('isRootSizeLarge');
        expect(within(rootElement).getByRole('button')).toHaveClass('isRootSizeLarge');
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
