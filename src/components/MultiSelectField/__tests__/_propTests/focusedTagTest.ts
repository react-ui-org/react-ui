import type { PropTests } from '../../../../../tests/playwright/types';

export const focusedTagTest: PropTests = [
  {
    name: 'value:array[tagFocused]',
    onBeforeSnapshot: async (page, component) => {
      await component.getByRole('combobox').focus();
      // Backspace in the empty search input moves focus to the last tag
      await page.keyboard.press('Backspace');
    },
    props: { initialValue: ['value1', 'value2'] },
  },
];
