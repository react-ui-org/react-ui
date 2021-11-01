import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { colorPropTest } from '../../../../../tests/propTests/colorPropTest';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { raisedPropTest } from '../../../../../tests/propTests/raisedPropTest';
import ScrollView from '../../ScrollView';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { CardFooter } from '../CardFooter';

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
    ...colorPropTest,
    [
      { dense: true },
      (rootElement) => expect(rootElement).toHaveClass('rootDense'),
    ],
    [
      { dense: false },
      (rootElement) => expect(rootElement).not.toHaveClass('rootDense'),
    ],
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toHaveClass('isDisabled'),
    ],
    [
      { disabled: false },
      (rootElement) => expect(rootElement).not.toHaveClass('isDisabled'),
    ],
    ...idPropTest,
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
