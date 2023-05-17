import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { fullWidthPropTest } from '../../../../../tests/propTests/fullWidthPropTest';
import { labelPropTest } from '../../../../../tests/propTests/labelPropTest';
import { requiredPropTest } from '../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../tests/propTests/validationStatePropTest';
import { FormLayoutContext } from '../FormLayoutContext';
import { FormLayoutCustomField } from '../FormLayoutCustomField';

const defaultProps = {
  children: 'content',
};

describe('rendering', () => {
  it.each([
    [
      { layout: 'vertical' },
      (rootElement) => expect(rootElement).toHaveClass('isRootLayoutVertical'),
    ],
    [
      { layout: 'horizontal' },
      (rootElement) => expect(rootElement).toHaveClass('isRootLayoutHorizontal'),
    ],
  ])('renders with FormLayout props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FormLayoutContext.Provider
        value={{ ...testedProps }}
      >
        <FormLayoutCustomField>content</FormLayoutCustomField>
      </FormLayoutContext.Provider>
    ));

    assert(dom.container.firstChild);
  });

  it.each([
    ...childrenEmptyPropTest,
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
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeSmall'),
    ],
    [
      { innerFieldSize: 'medium' },
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeMedium'),
    ],
    [
      { innerFieldSize: 'large' },
      (rootElement) => expect(rootElement).toHaveClass('isRootSizeLarge'),
    ],
    ...labelPropTest(),
    [
      {
        label: 'label',
        labelForId: 'label-for-id',
      },
      (rootElement) => expect(within(rootElement).getByText('label')).toHaveAttribute('for', 'label-for-id'),
    ],
    ...requiredPropTest,
    ...validationStatePropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FormLayoutCustomField
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
