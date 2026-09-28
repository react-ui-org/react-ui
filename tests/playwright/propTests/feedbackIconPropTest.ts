import { element } from '../utils/element';
import type { PropTests } from '../types';

export const feedbackIconPropTest: PropTests = [
  {
    name: 'feedbackIcon:node',
    props: { feedbackIcon: element('TestIcon') },
  },
];
