import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { fullWidthPropTest } from '../../../../../../tests/propTests/fullWidthPropTest';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../../tests/propTests/validationStatePropTest';
import { FormLayoutCustomField } from '../FormLayoutCustomField';

describe('rendering', () => {
  it.each([
    [
      { children: <div>other content text</div> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toHaveClass('isRootDisabled'),
    ],
    [
      { disabled: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootDisabled'),
    ],
    ...fullWidthPropTest,
    [
      {
        id: 'id',
        label: 'label',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByTestId('id__field'));
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__label');
      },
    ],
    [
      { innerFieldSize: 'small' },
      (rootElement) => expect(rootElement).toHaveClass('rootSizeSmall'),
    ],
    [
      { innerFieldSize: 'medium' },
      (rootElement) => expect(rootElement).toHaveClass('rootSizeMedium'),
    ],
    [
      { innerFieldSize: 'large' },
      (rootElement) => expect(rootElement).toHaveClass('rootSizeLarge'),
    ],
    ...labelPropTest,
    [
      {
        label: 'label',
        labelForId: 'label-for-id',
      },
      (rootElement) => expect(within(rootElement).getByText('label')).toHaveAttribute('for', 'label-for-id'),
    ],
    ...layoutPropTest,
    ...requiredPropTest,
    ...validationStatePropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FormLayoutCustomField
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
