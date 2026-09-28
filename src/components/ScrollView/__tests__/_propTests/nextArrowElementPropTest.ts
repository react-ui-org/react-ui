import {
  element,
  propTests,
} from '../../../../../tests/playwright';
import type { PropTests } from '../../../../../tests/playwright/types';

export const nextArrowElementPropTest: PropTests = [
  {
    name: 'nextArrowElement:node=customElement',
    props: {
      arrows: true,
      nextArrowElement: element('div', {
        children: 'Custom node arrow',
        style: {
          background: 'red',
          padding: '10px',
        },
      }),
    },
  },
  {
    name: 'nextArrowElement:node=string',
    props: {
      arrows: true,
      nextArrowElement: 'Custom string arrow',
    },
  },
  ...propTests.iconPropTest.map((test) => ({
    name: 'nextArrowElement:node=icon',
    props: {
      arrows: true,
      nextArrowElement: test.props.icon,
    },
  })),
];
