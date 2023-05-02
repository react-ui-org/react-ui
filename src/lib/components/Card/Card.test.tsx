import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { colorPropTest } from '../../../../tests/propTests/colorPropTest';
import { raisedPropTest } from '../../../../tests/propTests/raisedPropTest';
import { ScrollView } from '../ScrollView';
import { densePropTest } from '../../../../tests/propTests/densePropTest';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';

const mandatoryProps = {
  children: <CardBody>card body content</CardBody>,
};

describe('rendering', () => {
  it.each<TestingProps>([
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
    ...(colorPropTest as unknown as TestingProps[]),
    ...(densePropTest('Root') as unknown as TestingProps[]),
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toHaveClass('isRootDisabled'),
    ],
    [
      { disabled: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootDisabled'),
    ],
    ...(raisedPropTest as unknown as TestingProps[]),
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Card
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});
