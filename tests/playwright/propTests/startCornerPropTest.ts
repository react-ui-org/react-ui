import { element } from '../utils/element';
import type { PropTests } from '../types';

export const startCornerPropTest: PropTests = [
  {
    name: 'startCorner:node',
    props: { startCorner: element('TestIcon') },
  },
];
