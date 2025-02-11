import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { feedbackColorPropTest } from '../../../../tests/jest/propTests/feedbackColorPropTest';
import { raisedPropTest } from '../../../../tests/jest/propTests/raisedPropTest';
import { ScrollView } from '../../ScrollView';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { CardFooter } from '../CardFooter';
import { densePropTest } from '../../../../tests/jest/propTests/densePropTest';

const mandatoryProps = {
  children: <CardBody>card body content</CardBody>,
};

describe('rendering', () => {
  it.each([
    [
      {
        children: [
          <CardBody key={1}>card body content</CardBody>,
          <CardFooter key={2}>card footer content</CardFooter>,
        ],
      },
      (rootElement) => {
        expect(within(rootElement).getByText('card body content'));
        expect(within(rootElement).getByText('card footer content'));
      },
    ],
    [
      { children: <ScrollView>scroll view content</ScrollView> },
      (rootElement) => expect(within(rootElement).getByText('scroll view content')),
    ],
    ...feedbackColorPropTest,
    ...densePropTest('Root'),
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toHaveClass('isRootDisabled'),
    ],
    [
      { disabled: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootDisabled'),
    ],
    ...raisedPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Card
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
