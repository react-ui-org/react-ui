import type { PropTests } from '../../../../../tests/playwright/types';

export const typePropTest: PropTests = [
  {
    name: 'type:string=email',
    props: {
      type: 'email',
      value: 'email@domain.com',
    },
  },
  {
    name: 'type:string=number',
    props: {
      type: 'number',
      value: '1234',
    },
  },
  {
    name: 'type:string=password',
    props: {
      type: 'password',
      value: 'password',
    },
  },
  {
    name: 'type:string=tel',
    props: {
      type: 'tel',
      value: '123456789',
    },
  },
  {
    name: 'type:string=text',
    props: {
      type: 'text',
      value: 'test text value',
    },
  },
];
