import type { PropTests } from '../types';

export const feedbackColorPropTest: PropTests = [
  {
    name: 'color:string=danger',
    props: { color: 'danger' },
  },
  {
    name: 'color:string=help',
    props: { color: 'help' },
  },
  {
    name: 'color:string=info',
    props: { color: 'info' },
  },
  {
    name: 'color:string=note',
    props: { color: 'note' },
  },
  {
    name: 'color:string=success',
    props: { color: 'success' },
  },
  {
    name: 'color:string=warning',
    props: { color: 'warning' },
  },
];
