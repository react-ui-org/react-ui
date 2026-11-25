import type { PropTests } from '../../../../../tests/playwright/types';

export const gridSpanPropTest: PropTests = [
  {
    name: 'columns:string="1fr 1fr" rows:string="1fr 1fr 1fr 1fr"',
    props: {
      columns: '1fr 1fr',
      rows: '1fr 1fr 1fr 1fr',
    },
  },
];
