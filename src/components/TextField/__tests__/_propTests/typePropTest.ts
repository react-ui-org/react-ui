import type { PropTests } from '../../../../../tests/playwright/types';

export const typePropTest: PropTests = [
  {
    name: 'type=email',
    props: {
      type: 'email',
      value: 'email@domain.com',
    },
  },
  {
    name: 'type=number',
    props: {
      type: 'number',
      value: '1234',
    },
  },
  {
    name: 'type=password',
    props: {
      type: 'password',
      value: 'password',
    },
  },
  {
    name: 'type=tel',
    props: {
      type: 'tel',
      value: '123456789',
    },
  },
  {
    name: 'type=text',
    props: {
      type: 'text',
      value: 'test text value',
    },
  },
];
