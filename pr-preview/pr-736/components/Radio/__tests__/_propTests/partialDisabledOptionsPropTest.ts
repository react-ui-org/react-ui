import type { PropTests } from '../../../../../tests/playwright/types';

const options = [
  {
    disabled: true,
    key: 'option1',
    label: 'label1',
    value: 'value1',
  },
  {
    disabled: false,
    key: 'option2',
    label: 'label2',
    value: 'value2',
  },
];

export const partialDisabledOptionsPropTest: PropTests = [
  {
    name: 'options:shape[basePartialDisabledWithDisabledValue]',
    props: {
      options,
      value: 'value1',
    },
  },
  {
    name: 'options:shape[basePartialDisabledWithoutDisabledValue]',
    props: {
      options,
      value: 'value2',
    },
  },
];
