import { element } from '../utils/element';
import type { PropTests } from '../types';

export const afterLabelPropTest: PropTests = [
  {
    name: 'afterLabel:node',
    props: { afterLabel: element('TestIcon') },
  },
];
