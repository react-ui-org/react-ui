import { element } from '../utils/element';
import type { PropTests } from '../types';

export const iconPropTest: PropTests = [
  {
    name: 'icon:node',
    props: { icon: element('TestIcon') },
  },
];
