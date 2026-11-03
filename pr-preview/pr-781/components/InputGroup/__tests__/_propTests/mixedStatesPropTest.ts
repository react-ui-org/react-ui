import type { PropTests } from '../../../../../tests/playwright/types';

export const mixedStatesPropTest: PropTests = [
  ['invalid', 'changed'],
  ['warning', 'changed'],
  ['changed', 'warning'],
  ['changed', 'valid'],
].map(([selectFieldState, textFieldState]) => ({
  name: `inputProps:state=${selectFieldState} textFieldInputProps:state=${textFieldState}`,
  props: {
    inputProps: {
      state: selectFieldState,
    },
    textFieldInputProps: {
      state: textFieldState,
    },
    validationTexts: ['Validation text.'],
  },
}));
