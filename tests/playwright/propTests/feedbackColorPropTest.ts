import type { PropTests } from '../types';

export const feedbackColorPropTest: PropTests = [
  {
    name: 'color=danger',
    props: { color: 'danger' },
  },
  {
    name: 'color=help',
    props: { color: 'help' },
  },
  {
    name: 'color=info',
    props: { color: 'info' },
  },
  {
    name: 'color=note',
    props: { color: 'note' },
  },
  {
    name: 'color=success',
    props: { color: 'success' },
  },
  {
    name: 'color=warning',
    props: { color: 'warning' },
  },
];
