import type { PropTests } from '../types';

export const renderAsRequiredPropTest: PropTests = [
  {
    name: 'renderAsRequired=true',
    props: { renderAsRequired: true },
  },
  {
    name: 'renderAsRequired=false',
    props: { renderAsRequired: false },
  },
];
