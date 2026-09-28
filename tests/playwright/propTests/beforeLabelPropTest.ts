import { element } from '../utils/element';
import type { PropTests } from '../types';

export const beforeLabelPropTest: PropTests = [
  {
    name: 'beforeLabel:node',
    props: { beforeLabel: element('TestIcon') },
  },
];
