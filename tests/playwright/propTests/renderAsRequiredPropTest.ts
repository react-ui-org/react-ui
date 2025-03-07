import type { PropTests } from '../types';

export const renderAsRequiredPropTest: PropTests = [
  {
    name: 'renderAsRequired:boolean=true',
    props: { renderAsRequired: true },
  },
  {
    name: 'renderAsRequired:boolean=false',
    props: { renderAsRequired: false },
  },
];
