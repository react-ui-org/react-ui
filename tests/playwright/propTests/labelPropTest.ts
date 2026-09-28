import { element } from '../utils/element';
import type { PropTests } from '../types';

export const labelPropTest: PropTests = [
  {
    name: 'label:string[long]',
    props: { label: 'Extra long label that exceeds regular length that anyone would expect' },
  },
  {
    name: 'label:node[normal]',
    props: { label: element('div', { children: 'Label as node' }) },
  },
];
