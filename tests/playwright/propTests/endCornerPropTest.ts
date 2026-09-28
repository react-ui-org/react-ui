import { element } from '../utils/element';
import type { PropTests } from '../types';

export const endCornerPropTest: PropTests = [
  {
    name: 'endCorner:node',
    props: { endCorner: element('TestIcon') },
  },
];
