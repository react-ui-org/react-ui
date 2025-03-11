import type { PropTests } from '../../../../../tests/playwright/types';

const partiallyDisabledBaseOptions = [
  {
    disabled: false,
    key: 'key1',
    label: 'option1',
    value: 'value1',
  },
  {
    disabled: true,
    label: 'option2',
    value: 'value2',
  },
];

const groupedOptions = [
  {
    key: 'optgroup_key1',
    label: 'optgroup1',
    options: [
      {
        disabled: false,
        label: 'option1',
        value: 'value1',
      },
      {
        disabled: false,
        label: 'option2',
        value: 'value2',
      },
    ],
  },
];

const partiallyDisabledGroupOptions = [
  ...groupedOptions,
  {
    key: 'optgroup_key2',
    label: 'optgroup2',
    options: [
      {
        disabled: true,
        label: 'option3',
        value: 'value3',
      },
      {
        disabled: false,
        label: 'option4',
        value: 'value4',
      },
    ],
  },
];

export const openSelectFieldOptionsTest: PropTests = [
  {
    name: 'defaultOpenedOptions',
    onBeforeSnapshot: async (page, component) => {
      const select = component.getByRole('combobox');
      await select.click();
    },
    props: {},
  },
  {
    name: 'partiallyDisabledBaseOptions',
    onBeforeSnapshot: async (page, component) => {
      const select = component.getByRole('combobox');
      await select.click();
    },
    props: { options: partiallyDisabledBaseOptions },
  },
  {
    name: 'groupedOptions',
    onBeforeSnapshot: async (page, component) => {
      const select = component.getByRole('combobox');
      await select.click();
    },
    props: { options: groupedOptions },
  },
  {
    name: 'partiallyDisabledGroupOptions',
    onBeforeSnapshot: async (page, component) => {
      const select = component.getByRole('combobox');
      await select.click();
    },
    props: { options: partiallyDisabledGroupOptions },
  },
];
