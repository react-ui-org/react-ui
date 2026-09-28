import { element } from '../utils/element';
import type { PropTests } from '../types';

export const validationTextPropTest: PropTests = [
  {
    name: 'validationText:string[long]',
    props: { validationText: 'Extra long validationText that exceeds regular length that anyone would expect to input in this property.' },
  },
  {
    name: 'validationText:string[normal]',
    props: { validationText: 'Some normal validationText.' },
  },
  {
    name: 'validationText:node[normal]',
    props: { validationText: element('div', { children: 'Node validation text' }) },
  },
];
