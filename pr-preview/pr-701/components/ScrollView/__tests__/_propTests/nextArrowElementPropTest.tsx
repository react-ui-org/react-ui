import React from 'react';
import { propTests } from '../../../../../tests/playwright';
import type { PropTests } from '../../../../../tests/playwright/types';

export const nextArrowElementPropTest: PropTests = [
  {
    name: 'nextArrowElement:node=customElement',
    props: {
      arrows: true,
      nextArrowElement: (
        <div
          style={{
            background: 'red',
            padding: '10px',
          }}
        >
          Custom node arrow
        </div>
      ),
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
