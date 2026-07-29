import type { PropTests } from '../../../../../tests/playwright/types';

export const rowsPropTest: PropTests = [
  {
    name: 'rows:string="1fr 1fr"',
    props: {
      columns: '1fr 1fr',
      rows: '1fr 1fr',
    },
  },
  {
    name: 'rows:string="auto 200px"',
    props: {
      columns: '1fr 1fr',
      rows: 'auto 200px',
    },
  },
];
