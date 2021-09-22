import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { fullWidthPropTest } from '../../../../../../tests/propTests/fullWidthPropTest';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { requiredPropTest } from '../../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../../tests/propTests/validationStatePropTest';
import { FormLayoutCustomField } from '../FormLayoutCustomField';
import { FormLayoutProvider } from '..';

describe('rendering', () => {
  it.each([
    [
      { layout: 'vertical' },
      (rootElement) => expect(rootElement).toHaveClass('rootLayoutVertical'),
    ],
    [
      { layout: 'horizontal' },
      (rootElement) => expect(rootElement).toHaveClass('rootLayoutHorizontal'),
    ],
  ])('renders with FormLayout props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FormLayoutProvider {...testedProps}>
        <FormLayoutCustomField />
      </FormLayoutProvider>
    ));

    assert(dom.container.firstChild);
  });

  it.each([
    [
      { children: <div>other content text</div> },
      (rootElement) => expect(within(rootElement).getByText('other content text')),
    ],
    [
      { children: null },
      (rootElement) => expect(rootElement).toBeInTheDocument(),
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
